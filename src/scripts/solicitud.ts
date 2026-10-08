// ─────────────────────────────────────────────────────────────
// Formulario de prospectos → API pública de ClinicFlow
//   GET  {api}/public/clinics/{slug}/lead-form   servicios del selector
//   POST {api}/public/clinics/{slug}/leads       alta del prospecto (202)
// Sin sesión ni cookies; la única cabecera es Content-Type.
// ─────────────────────────────────────────────────────────────

import { crearReserva } from './reserva';

type Textos = Record<
  | 'enviar'
  | 'enviando'
  | 'reintentar'
  | 'servicioNinguno'
  | 'nombre'
  | 'contacto'
  | 'telefono'
  | 'correo'
  | 'mensaje'
  | 'caracteres'
  | 'privacidad'
  | 'revisa'
  | 'validacion'
  | 'captcha'
  | 'captchaPendiente'
  | 'limite'
  | 'espera'
  | 'red',
  string
>;

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

const API = (import.meta.env.PUBLIC_API_URL || '').replace(/\/+$/, '');
const SLUG = import.meta.env.PUBLIC_CLINIC_SLUG || '';
const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '';
const POLITICA = import.meta.env.PUBLIC_PRIVACY_POLICY_VERSION || '';

const TIMEOUT_ENVIO = 45_000;
// El backend rechaza <, > y caracteres de control en cualquier texto
const PROHIBIDOS = /[<>\u0000-\u001F\u007F]/;
const TELEFONO = /^[0-9 +().-]+$/;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const recortar = (valor: string | null, max: number) => (valor ? valor.slice(0, max) : null);

const nuevoId = () =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;

function iniciar(raiz: HTMLElement) {
  const form = raiz.querySelector<HTMLFormElement>('[data-solicitud-form]');
  if (!form) return;

  const textos = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  // Los mensajes del backend vienen en español: solo se muestran en ese idioma
  const mensajeServidor = document.documentElement.lang === 'es';
  const base = `${API}/public/clinics/${encodeURIComponent(SLUG)}`;

  const exito = raiz.querySelector<HTMLElement>('[data-solicitud-exito]');
  const noDisponible = raiz.querySelector<HTMLElement>('[data-solicitud-nodisponible]');
  const estado = form.querySelector<HTMLElement>('[data-solicitud-estado]');
  const boton = form.querySelector<HTMLButtonElement>('[data-solicitud-enviar]');
  const botonTexto = boton?.querySelector<HTMLElement>('span');
  const campoServicio = form.querySelector<HTMLElement>('[data-solicitud-servicio]');
  const captcha = form.querySelector<HTMLElement>('[data-solicitud-captcha]');
  const servicio = form.elements.namedItem('interestServiceId') as HTMLSelectElement;
  const campo = (nombre: string) => form.elements.namedItem(nombre) as HTMLInputElement;

  let enviando = false;
  let bloqueado = false;
  // Se conserva entre reintentos del mismo envío; cambia si la persona edita algo
  let submissionId: string | null = null;
  let captchaToken: string | null = null;
  let captchaId: string | undefined;

  const mostrarExito = () => {
    form.hidden = true;
    if (!exito) return;
    exito.hidden = false;
    exito.focus();
  };

  const mostrarNoDisponible = () => {
    form.hidden = true;
    if (noDisponible) noDisponible.hidden = false;
  };

  const setEstado = (texto: string) => {
    if (!estado) return;
    estado.textContent = texto;
    estado.hidden = !texto;
  };

  const setBoton = (texto: string, deshabilitado: boolean) => {
    if (botonTexto) botonTexto.textContent = texto;
    if (boton) boton.disabled = deshabilitado;
  };

  const setError = (nombre: string, texto: string) => {
    const input = campo(nombre);
    const error = form.querySelector<HTMLElement>(`[data-error-for="${nombre}"]`);
    if (error) {
      error.textContent = texto;
      error.hidden = !texto;
    }
    if (texto) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  // ── Datos del formulario (GET /lead-form) ───────────────
  const cargar = async () => {
    try {
      const res = await fetch(`${base}/lead-form`, { credentials: 'omit' });
      if (res.status === 404) return mostrarNoDisponible();
      if (!res.ok) throw new Error(String(res.status));
      const datos = (await res.json()) as { services?: { id: string; name: string }[] };
      const servicios = datos.services ?? [];
      if (!servicios.length) throw new Error('sin servicios');
      servicio.replaceChildren(
        new Option(textos.servicioNinguno, ''),
        ...servicios.map((s) => new Option(s.name, s.id)),
      );
      servicio.disabled = false;
    } catch {
      // Sin catálogo el formulario sigue sirviendo: el servicio es opcional
      if (campoServicio) campoServicio.hidden = true;
    }
    if (SITE_KEY) cargarCaptcha();
  };

  // ── Captcha Turnstile (solo si hay site key) ────────────
  const cargarCaptcha = () => {
    if (!captcha) return;
    captcha.hidden = false;
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      const turnstile = (window as unknown as { turnstile?: Turnstile }).turnstile;
      captchaId = turnstile?.render(captcha, {
        sitekey: SITE_KEY,
        language: document.documentElement.lang,
        callback: (token: string) => (captchaToken = token),
        'expired-callback': () => (captchaToken = null),
        'error-callback': () => (captchaToken = null),
      });
    };
    document.head.append(script);
  };

  const reiniciarCaptcha = () => {
    captchaToken = null;
    if (captchaId) (window as unknown as { turnstile?: Turnstile }).turnstile?.reset(captchaId);
  };

  // ── Validación (mismas reglas que el contrato) ──────────
  const validar = () => {
    const nombre = campo('fullName').value.trim();
    const telefono = campo('phone').value.trim();
    const correo = campo('email').value.trim();
    const mensaje = campo('message').value.trim();
    const errores: Record<string, string> = { fullName: '', phone: '', email: '', message: '', acceptedPrivacyPolicy: '' };

    if (nombre.length < 2 || nombre.length > 120) errores.fullName = textos.nombre;
    else if (PROHIBIDOS.test(nombre)) errores.fullName = textos.caracteres;

    if (!telefono && !correo) {
      errores.phone = textos.contacto;
      errores.email = textos.contacto;
    }
    if (telefono) {
      const digitos = telefono.replace(/\D/g, '').length;
      if (!TELEFONO.test(telefono) || digitos < 7 || digitos > 15) errores.phone = textos.telefono;
    }
    if (correo) {
      if (PROHIBIDOS.test(correo)) errores.email = textos.caracteres;
      else if (!CORREO.test(correo)) errores.email = textos.correo;
    }

    if (mensaje.length > 1000) errores.message = textos.mensaje;
    else if (/[<>]/.test(mensaje)) errores.message = textos.caracteres;

    if (!campo('acceptedPrivacyPolicy').checked) errores.acceptedPrivacyPolicy = textos.privacidad;

    let primero: HTMLElement | null = null;
    for (const [nombreCampo, texto] of Object.entries(errores)) {
      setError(nombreCampo, texto);
      if (texto && !primero) primero = campo(nombreCampo);
    }
    primero?.focus();
    return !primero;
  };

  const cuerpo = () => {
    const params = new URLSearchParams(location.search);
    const utm = (clave: string) => recortar(params.get(clave)?.trim() || null, 150);
    // Saltos de línea y tabulaciones son caracteres de control para el backend
    const mensaje = campo('message').value.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim();
    return {
      fullName: campo('fullName').value.trim(),
      phone: campo('phone').value.trim() || null,
      email: campo('email').value.trim() || null,
      interestServiceId: servicio.disabled ? null : servicio.value || null,
      message: mensaje || null,
      marketingConsent: campo('marketingConsent').checked,
      acceptedPrivacyPolicy: true,
      privacyPolicyVersion: POLITICA,
      submissionId,
      attribution: {
        utmSource: utm('utm_source'),
        utmMedium: utm('utm_medium'),
        utmCampaign: utm('utm_campaign'),
        utmContent: utm('utm_content'),
        utmTerm: utm('utm_term'),
        pageUrl: recortar(location.href, 500),
        referrer: recortar(document.referrer || null, 500),
      },
      captchaToken,
      website: campo('website').value,
    };
  };

  // ── Límite de envíos: botón inactivo durante la espera ──
  const esperar = (segundos: number) => {
    bloqueado = true;
    let restantes = Math.max(1, Math.ceil(segundos));
    const pintar = () => setEstado(`${textos.limite} ${textos.espera.replace('{s}', String(restantes))}`);
    setBoton(textos.enviar, true);
    pintar();
    const reloj = setInterval(() => {
      restantes -= 1;
      if (restantes > 0) return pintar();
      clearInterval(reloj);
      bloqueado = false;
      setEstado('');
      setBoton(textos.enviar, false);
    }, 1000);
  };

  // ── Envío (POST /leads) ─────────────────────────────────
  const enviar = async () => {
    if (enviando || bloqueado) return;
    setEstado('');
    if (!validar()) return setEstado(textos.revisa);
    if (SITE_KEY && !captchaToken) return setEstado(textos.captchaPendiente);

    submissionId ??= nuevoId();
    enviando = true;
    setBoton(textos.enviando, true);

    const aborto = new AbortController();
    const temporizador = setTimeout(() => aborto.abort(), TIMEOUT_ENVIO);
    let res: Response | null = null;
    try {
      res = await fetch(`${base}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(cuerpo()),
        signal: aborto.signal,
      });
    } catch {
      /* sin respuesta: se trata abajo como error reintentable */
    }
    clearTimeout(temporizador);
    enviando = false;

    if (res?.status === 202) {
      // `booking` solo viene si la clínica toma reservas en línea
      const datos = (await res.json().catch(() => null)) as {
        booking?: { sessionToken: string; expiresAt: string } | null;
      } | null;
      setBoton(textos.enviar, false);
      if (!reserva || !datos?.booking?.sessionToken) return mostrarExito();
      form.hidden = true;
      return reserva.abrir(datos.booking);
    }

    reiniciarCaptcha();

    // Sin respuesta o 5xx: reintento con el MISMO submissionId
    if (!res || res.status >= 500) {
      setEstado(textos.red);
      return setBoton(textos.reintentar, false);
    }

    submissionId = null;
    setBoton(textos.enviar, false);
    const error = (await res.json().catch(() => ({}))) as {
      errorCode?: string;
      message?: string;
      retryAfterSeconds?: number;
    };

    if (res.status === 404) return mostrarNoDisponible();
    if (res.status === 429) {
      return esperar(error.retryAfterSeconds ?? (Number(res.headers.get('Retry-After')) || 60));
    }
    if (error.errorCode === 'LEAD_FORM_CAPTCHA_FAILED') return setEstado(textos.captcha);
    setEstado((mensajeServidor && error.message) || textos.validacion);
  };

  // ── Reserva en línea (tras el envío, si la clínica la ofrece) ──
  const zonaReserva = raiz.querySelector<HTMLElement>('[data-reserva]');
  const reserva =
    zonaReserva &&
    crearReserva(zonaReserva, {
      api: API,
      alGracias: mostrarExito,
      // Sesión vencida o inválida: el formulario conserva lo escrito
      alFormulario: (aviso) => {
        if (exito) exito.hidden = true;
        form.hidden = false;
        submissionId = null;
        setBoton(textos.enviar, false);
        setEstado(aviso ?? '');
      },
    });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    enviar();
  });

  // Editar tras un fallo convierte el siguiente envío en uno nuevo
  form.addEventListener('input', (e) => {
    submissionId = null;
    if (!bloqueado && !enviando) setBoton(textos.enviar, false);
    const nombre = (e.target as HTMLInputElement).name;
    if (!nombre || nombre === 'website') return;
    setError(nombre, '');
    // Teléfono y correo comparten el aviso de "al menos uno"
    if (nombre === 'phone' || nombre === 'email') {
      const otro = nombre === 'phone' ? 'email' : 'phone';
      const aviso = form.querySelector<HTMLElement>(`[data-error-for="${otro}"]`);
      if (aviso?.textContent === textos.contacto) setError(otro, '');
    }
  });

  if (!API || !SLUG) return mostrarNoDisponible();

  // Al recargar con una sesión de reserva vigente se retoma donde quedó
  if (reserva?.restaurar()) form.hidden = true;

  // El catálogo se pide al acercarse a la sección, no en cada visita
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((x) => x.isIntersecting)) return;
        io.disconnect();
        cargar();
      },
      { rootMargin: '1500px 0px' },
    );
    io.observe(raiz);
  } else {
    cargar();
  }
}

const raiz = document.querySelector<HTMLElement>('[data-solicitud]');
if (raiz) iniciar(raiz);
