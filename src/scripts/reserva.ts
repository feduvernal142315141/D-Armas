// ─────────────────────────────────────────────────────────────
// Reserva en línea → API pública de ClinicFlow ({api}/public/booking)
// La sesión la emite el formulario (POST /leads → booking.sessionToken) y
// viaja solo en la cabecera X-Booking-Session: nunca en la URL.
// La disponibilidad la decide el backend; aquí no se calcula ni se convierte
// ninguna hora (todo se muestra en la hora local de la clínica).
// ─────────────────────────────────────────────────────────────

type Textos = Record<string, string>;
type Resp = { status: number; datos: Record<string, any> };
type Servicio = { serviceId: string; name: string; durationMinutes: number };
type Doctor = { doctorId: string; displayName: string; specialty: string | null; photoUrl: string | null };
type Dia = { date: string; times: string[] };
type Cita = {
  status: string;
  bookingReference: string;
  clinicName: string;
  serviceName: string;
  durationMinutes: number;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
};
type Vista = 'invitacion' | 'servicio' | 'doctor' | 'fecha' | 'confirmar' | 'reservada' | 'final';

type Opciones = {
  api: string;
  /** Vuelve al formulario (sesión vencida o inválida), con un aviso opcional */
  alFormulario: (aviso?: string) => void;
  /** Muestra el agradecimiento normal, sin agenda */
  alGracias: () => void;
};

const ALMACEN = 'darmas-reserva';
const PASOS: Vista[] = ['servicio', 'doctor', 'fecha', 'confirmar'];
const DIAS_PAGINA = 7;
const AVISO_EXPIRA = 5 * 60_000;

const nuevoId = () =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;

// Las fechas del API son días de calendario (YYYY-MM-DD): se operan en UTC
// para que la zona del navegador no las desplace.
const aFecha = (fecha: string) => new Date(`${fecha}T00:00:00Z`);
const sumarDias = (fecha: string, dias: number) =>
  new Date(aFecha(fecha).getTime() + dias * 86_400_000).toISOString().slice(0, 10);
const diasEntre = (desde: string, hasta: string) =>
  Math.round((aFecha(hasta).getTime() - aFecha(desde).getTime()) / 86_400_000);

const hora12 = (hora: string) => {
  const [h, m] = hora.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
};

// Instante UTC de una hora local de la clínica (solo para el archivo .ics)
const aUtc = (fecha: string, hora: string, zona: string) => {
  const [y, mo, d] = fecha.split('-').map(Number);
  const [h, mi] = hora.split(':').map(Number);
  const base = Date.UTC(y, mo - 1, d, h, mi);
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: zona,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).formatToParts(new Date(base));
  const p = Object.fromEntries(partes.map((x) => [x.type, Number(x.value)]));
  const local = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return new Date(base - (local - base));
};

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  clase = '',
  texto = '',
  hijos: (Node | null)[] = [],
): HTMLElementTagNameMap[K] {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto) nodo.textContent = texto;
  nodo.append(...hijos.filter((h): h is Node => !!h));
  return nodo;
}

export function crearReserva(raiz: HTMLElement, op: Opciones) {
  const t = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const idioma = document.documentElement.lang || 'es';
  const q = <T extends HTMLElement = HTMLElement>(sel: string) => raiz.querySelector<T>(sel)!;

  const cabecera = q('[data-rv-cabecera]');
  const aviso = q('[data-rv-aviso]');
  const error = q('[data-rv-error]');
  const errorTexto = q('[data-rv-error-texto]');
  const reintentar = q<HTMLButtonElement>('[data-rv-reintentar]');
  const cargando = q('[data-rv-cargando]');
  const confirmarBtn = q<HTMLButtonElement>('[data-rv-confirmar]');

  let token = '';
  let expira = 0;
  let vista: Vista | null = null;
  let ocupado = false;
  let bloqueado = false;
  let recuperando = false;
  let ultima: (() => Promise<void>) | null = null;
  let reloj: ReturnType<typeof setInterval> | undefined;

  let ctx: Record<string, any> = {};
  let servicios: Servicio[] = [];
  let recomendado: string | null = null;
  let servicio: Servicio | null = null;
  let doctores: Doctor[] = [];
  let cualquiera = false;
  // undefined = sin elegir · null = cualquier doctor
  let doctor: Doctor | null | undefined;
  let desde = '';
  let dias: Dia[] = [];
  let zona = '';
  let dia: string | null = null;
  let hora: string | null = null;
  let clave: string | null = null;
  let cita: Cita | null = null;

  // ── Sesión ──────────────────────────────────────────────
  const guardar = () => {
    try {
      sessionStorage.setItem(ALMACEN, JSON.stringify({ token, expira }));
    } catch {
      /* sin almacenamiento: la sesión vive solo en memoria */
    }
  };

  const olvidar = () => {
    token = '';
    clearInterval(reloj);
    try {
      sessionStorage.removeItem(ALMACEN);
    } catch {
      /* nada que limpiar */
    }
  };

  const salir = (motivo?: string) => {
    olvidar();
    raiz.hidden = true;
    op.alFormulario(motivo);
  };

  const vigilar = () => {
    clearInterval(reloj);
    const revisar = () => {
      const enFlujo = vista !== null && vista !== 'reservada' && vista !== 'final';
      const resta = expira - Date.now();
      if (enFlujo && resta <= 0) return salir(t.errSesionExpirada);
      aviso.hidden = !(enFlujo && resta < AVISO_EXPIRA);
    };
    reloj = setInterval(revisar, 20_000);
    revisar();
  };

  // ── API ─────────────────────────────────────────────────
  const pedir = async (ruta: string, cuerpo?: unknown): Promise<Resp> => {
    try {
      const res = await fetch(`${op.api}/public/booking${ruta}`, {
        method: cuerpo ? 'POST' : 'GET',
        headers: { 'X-Booking-Session': token, ...(cuerpo ? { 'Content-Type': 'application/json' } : {}) },
        credentials: 'omit',
        body: cuerpo ? JSON.stringify(cuerpo) : undefined,
      });
      const datos = await res.json().catch(() => ({}));
      if (res.status === 429 && datos.retryAfterSeconds == null) {
        datos.retryAfterSeconds = Number(res.headers.get('Retry-After')) || 30;
      }
      return { status: res.status, datos };
    } catch {
      return { status: 0, datos: {} };
    }
  };

  // ── Estado de la interfaz ───────────────────────────────
  const setError = (texto: string, conReintento = false) => {
    errorTexto.textContent = texto;
    error.hidden = !texto;
    reintentar.hidden = !conReintento;
  };

  const setCargando = (on: boolean) => {
    raiz.classList.toggle('is-loading', on);
    raiz.setAttribute('aria-busy', String(on));
    cargando.hidden = !on;
    confirmarBtn.disabled = on || bloqueado;
    const texto = confirmarBtn.querySelector('span');
    if (texto) texto.textContent = on && vista === 'confirmar' ? t.confirmando : t.confirmar;
  };

  const mostrar = (nueva: Vista) => {
    vista = nueva;
    raiz.hidden = false;
    raiz.querySelectorAll<HTMLElement>('[data-rv-vista]').forEach((v) => (v.hidden = v.dataset.rvVista !== nueva));
    const paso = PASOS.indexOf(nueva);
    cabecera.hidden = paso < 0;
    if (paso >= 0) {
      q('[data-rv-paso]').textContent = t.paso.replace('{n}', String(paso + 1)).replace('{total}', String(PASOS.length));
      q('[data-rv-barra]').style.width = `${((paso + 1) / PASOS.length) * 100}%`;
    }
    setError('');
    if (token) vigilar();
    raiz.querySelector<HTMLElement>(`[data-rv-vista="${nueva}"] h3`)?.focus({ preventScroll: true });
  };

  const final = (titulo: string, texto: string) => {
    q('[data-rv-final-titulo]').textContent = titulo;
    q('[data-rv-final-texto]').textContent = texto;
    mostrar('final');
  };

  // Límite de uso: nada se envía hasta que pase la espera
  const esperar = (segundos: number) => {
    bloqueado = true;
    confirmarBtn.disabled = true;
    let restantes = Math.max(1, Math.ceil(segundos));
    const pintar = () => setError(`${t.errLimite} ${t.errEspera.replace('{s}', String(restantes))}`);
    pintar();
    const cuenta = setInterval(() => {
      restantes -= 1;
      if (restantes > 0) return pintar();
      clearInterval(cuenta);
      bloqueado = false;
      confirmarBtn.disabled = false;
      setError('');
    }, 1000);
  };

  // Una sola operación a la vez: bloquea dobles clics y recuerda la última
  // para el botón "Reintentar" (misma operación, misma idempotencyKey).
  const ejecutar = async (accion: () => Promise<void>) => {
    if (ocupado || bloqueado) return;
    ocupado = true;
    ultima = accion;
    setError('');
    setCargando(true);
    try {
      await accion();
    } finally {
      ocupado = false;
      setCargando(false);
    }
  };

  // ── Errores: se decide por errorCode, no por el texto ───
  const fallo = async (r: Resp): Promise<void> => {
    if (r.status === 0 || r.status >= 500) return setError(t.errRed, true);
    if (r.status === 410) return salir(t.errSesionExpirada);
    if (r.status === 401) return salir(t.errSesionInvalida);

    switch (r.datos.errorCode) {
      case 'BOOKING_UNAVAILABLE':
        olvidar();
        raiz.hidden = true;
        return op.alGracias();
      case 'BOOKING_SESSION_CONSUMED':
        return verReserva();
      case 'BOOKING_NEEDS_CLINIC_CONFIRMATION':
        return final(t.requiereClinicaTitulo, t.requiereClinica);
      case 'BOOKING_ALREADY_HANDLED':
        return final(t.requiereClinicaTitulo, t.errYaAtendida);
      case 'BOOKING_NO_RESERVATION':
        return mostrar('invitacion');
      case 'SLOT_UNAVAILABLE':
        // Nueva elección de hora → nueva idempotencyKey
        hora = null;
        clave = null;
        if (!recuperando) {
          recuperando = true;
          const ok = await cargarDisponibilidad();
          recuperando = false;
          if (!ok) return;
        }
        mostrar('fecha');
        return setError(t.errHorarioOcupado);
      case 'BOOKING_INVALID':
        doctor = undefined;
        dia = hora = clave = null;
        if (!recuperando) {
          recuperando = true;
          const ok = await cargarServicios();
          recuperando = false;
          if (!ok) return;
        }
        mostrar('servicio');
        return setError(t.errInvalida);
    }
    if (r.status === 429) return esperar(r.datos.retryAfterSeconds);
    // El mensaje del backend solo viene en español: sirve de respaldo ahí
    setError((idioma === 'es' && r.datos.message) || t.errValidacion);
  };

  // ── Carga de datos ──────────────────────────────────────
  const cargarServicios = async () => {
    const r = await pedir('/services');
    if (r.status !== 200) return fallo(r).then(() => false);
    servicios = r.datos.services ?? [];
    recomendado = r.datos.recommendedServiceId ?? ctx.recommendedServiceId ?? null;
    if (servicio && !servicios.some((s) => s.serviceId === servicio!.serviceId)) servicio = null;
    servicio ??= servicios.find((s) => s.serviceId === recomendado) ?? null;
    pintarServicios();
    return true;
  };

  const cargarDisponibilidad = async () => {
    if (!servicio) return false;
    const ultimo = ctx.lastBookableDate as string | undefined;
    const cantidad = ultimo ? Math.min(DIAS_PAGINA, Math.max(1, diasEntre(desde, ultimo) + 1)) : DIAS_PAGINA;
    const params = new URLSearchParams({ serviceId: servicio.serviceId, from: desde, days: String(cantidad) });
    if (doctor) params.set('doctorId', doctor.doctorId);
    const r = await pedir(`/availability?${params}`);
    if (r.status !== 200) return fallo(r).then(() => false);
    dias = r.datos.days ?? [];
    zona = r.datos.timezone || ctx.timezone || '';
    const conHoras = dias.filter((d) => d.times.length);
    if (!conHoras.some((d) => d.date === dia)) {
      dia = conHoras[0]?.date ?? null;
      hora = null;
    }
    pintarFecha();
    return true;
  };

  const verReserva = async () => {
    const r = await pedir('/reservations/current');
    if (r.status !== 200) return fallo(r);
    pintarReserva(r.datos as Cita);
  };

  // ── Pintado ─────────────────────────────────────────────
  const opcion = (nombre: string, detalle: string, activa: boolean, alElegir: () => void, extra: (Node | null)[] = []) => {
    const boton = el('button', 'rv-opcion', '', [
      extra[0] ?? null,
      el('span', 'min-w-0', '', [
        el('span', 'rv-opcion-nombre block', nombre),
        detalle ? el('span', 'rv-opcion-detalle block', detalle) : null,
      ]),
      extra[1] ?? null,
    ]);
    boton.type = 'button';
    boton.setAttribute('aria-pressed', String(activa));
    boton.addEventListener('click', alElegir);
    return boton;
  };

  const pintarServicios = () => {
    q('[data-rv-servicios]').replaceChildren(
      ...servicios.map((s) =>
        opcion(s.name, t.minutos.replace('{n}', String(s.durationMinutes)), s.serviceId === servicio?.serviceId, () => elegirServicio(s), [
          null,
          s.serviceId === recomendado ? el('span', 'rv-etiqueta', t.sugerido) : null,
        ]),
      ),
    );
  };

  const avatar = (d: Doctor | null) => {
    const caja = el('span', 'rv-avatar');
    caja.setAttribute('aria-hidden', 'true');
    if (d?.photoUrl) {
      const img = el('img');
      img.src = d.photoUrl;
      img.alt = '';
      img.loading = 'lazy';
      caja.append(img);
    } else if (d) {
      // Iniciales sin el tratamiento (Dr., Dra.)
      const palabras = d.displayName.replace(/^(dra?|doctora?)\.?\s+/i, '').split(/\s+/);
      caja.textContent = palabras.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
    } else {
      caja.textContent = '★';
    }
    return caja;
  };

  const pintarDoctores = () => {
    q('[data-rv-doctores]').replaceChildren(
      ...(cualquiera ? [opcion(t.cualquiera, t.cualquieraDetalle, doctor === null, () => elegirDoctor(null), [avatar(null)])] : []),
      ...doctores.map((d) =>
        opcion(d.displayName, d.specialty ?? '', doctor?.doctorId === d.doctorId, () => elegirDoctor(d), [avatar(d)]),
      ),
    );
  };

  const fechaCorta = new Intl.DateTimeFormat(idioma, { weekday: 'short', timeZone: 'UTC' });
  const fechaMes = new Intl.DateTimeFormat(idioma, { month: 'short', timeZone: 'UTC' });
  const fechaLarga = new Intl.DateTimeFormat(idioma, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const ciudad = () => zona.split('/').pop()?.replace(/_/g, ' ') ?? '';

  const pintarFecha = () => {
    q('[data-rv-dias]').replaceChildren(
      ...dias.map((d) => {
        const fecha = aFecha(d.date);
        const boton = el('button', 'rv-dia', '', [
          el('span', '', fechaCorta.format(fecha).replace('.', '')),
          el('strong', '', String(fecha.getUTCDate())),
          el('span', '', fechaMes.format(fecha).replace('.', '')),
        ]);
        boton.type = 'button';
        boton.disabled = !d.times.length;
        boton.setAttribute('aria-pressed', String(d.date === dia));
        boton.setAttribute('aria-label', fechaLarga.format(fecha));
        boton.addEventListener('click', () => {
          if (d.date === dia) return;
          dia = d.date;
          hora = null;
          pintarFecha();
        });
        return boton;
      }),
    );

    const horas = dias.find((d) => d.date === dia)?.times ?? [];
    q('[data-rv-dia-titulo]').textContent = dia ? fechaLarga.format(aFecha(dia)) : '';
    q('[data-rv-horas]').replaceChildren(
      ...horas.map((h) => {
        const boton = el('button', 'rv-hora', hora12(h));
        boton.type = 'button';
        boton.setAttribute('aria-pressed', String(h === hora));
        boton.addEventListener('click', () => elegirHora(h));
        return boton;
      }),
    );
    q('[data-rv-sin-horarios]').hidden = dias.some((d) => d.times.length);
    q('[data-rv-zona]').textContent = zona ? t.horaDe.replace('{ciudad}', ciudad()) : '';

    const primero = ctx.firstBookableDate as string | undefined;
    const ultimo = ctx.lastBookableDate as string | undefined;
    q<HTMLButtonElement>('[data-rv-anterior]').disabled = !primero || desde <= primero;
    q<HTMLButtonElement>('[data-rv-siguiente]').disabled = !!ultimo && sumarDias(desde, DIAS_PAGINA) > ultimo;
  };

  const filas = (destino: HTMLElement, pares: [string, string][]) => {
    destino.replaceChildren(...pares.map(([dt, dd]) => el('div', '', '', [el('dt', '', dt), el('dd', '', dd)])));
  };

  const pintarResumen = () => {
    if (!servicio || !dia || !hora) return;
    filas(q('[data-rv-resumen]'), [
      [t.lblServicio, `${servicio.name} · ${t.minutos.replace('{n}', String(servicio.durationMinutes))}`],
      [t.lblDoctor, doctor ? doctor.displayName : t.doctorAsignar],
      [t.lblFecha, fechaLarga.format(aFecha(dia))],
      [t.lblHora, `${hora12(hora)} · ${t.horaDe.replace('{ciudad}', ciudad())}`],
    ]);
  };

  const pintarReserva = (c: Cita) => {
    cita = c;
    zona = c.timezone;
    const cancelada = c.status === 'CANCELLED';
    q('[data-rv-reservada-titulo]').textContent = cancelada ? t.canceladaTitulo : t.reservadaTitulo;
    q('[data-rv-reservada-icono]').classList.toggle('is-cancelada', cancelada);
    q('[data-rv-referencia]').textContent = c.bookingReference;
    filas(q('[data-rv-detalle]'), [
      [t.lblServicio, `${c.serviceName} · ${t.minutos.replace('{n}', String(c.durationMinutes))}`],
      [t.lblDoctor, c.doctorName],
      [t.lblFecha, fechaLarga.format(aFecha(c.date))],
      [t.lblHora, `${hora12(c.startTime)} – ${hora12(c.endTime)} · ${t.horaDe.replace('{ciudad}', ciudad())}`],
      [t.lblClinica, c.clinicName],
    ]);
    q('[data-rv-calendario]').hidden = cancelada;
    const mensaje = encodeURIComponent(t.waCambio.replace('{ref}', c.bookingReference));
    raiz.querySelectorAll<HTMLAnchorElement>('[data-rv-wa]').forEach((a) => {
      a.href = `https://wa.me/${raiz.dataset.whatsapp}?text=${mensaje}`;
    });
    mostrar('reservada');
  };

  // ── Pasos del flujo ─────────────────────────────────────
  const entrar = async () => {
    const r = await pedir('/context');
    if (r.status !== 200) return fallo(r);
    ctx = r.datos;
    if (ctx.sessionExpiresAt) expira = Date.parse(ctx.sessionExpiresAt);
    guardar();
    if (ctx.hasReservation) return verReserva();
    if (ctx.bookingAvailable === false) {
      olvidar();
      raiz.hidden = true;
      return op.alGracias();
    }
    q('[data-rv-gracias]').textContent = t.gracias.replace('{nombre}', ctx.firstName ?? '').replace(/,\s*!/, '!');
    mostrar('invitacion');
  };

  const elegirServicio = (s: Servicio) =>
    ejecutar(async () => {
      if (servicio?.serviceId !== s.serviceId) {
        doctor = undefined;
        dia = hora = clave = null;
      }
      servicio = s;
      pintarServicios();
      const r = await pedir(`/doctors?serviceId=${encodeURIComponent(s.serviceId)}`);
      if (r.status !== 200) return fallo(r);
      doctores = r.datos.doctors ?? [];
      cualquiera = !!r.datos.anyDoctorAvailable;
      if (!doctores.length && !cualquiera) return final(t.sinServiciosTitulo, t.sinServiciosTexto);
      pintarDoctores();
      mostrar('doctor');
    });

  const elegirDoctor = (d: Doctor | null) =>
    ejecutar(async () => {
      if (doctor === undefined || doctor?.doctorId !== d?.doctorId) dia = hora = clave = null;
      doctor = d;
      pintarDoctores();
      desde = ctx.firstBookableDate || new Date().toISOString().slice(0, 10);
      if (await cargarDisponibilidad()) mostrar('fecha');
    });

  const paginar = (direccion: 1 | -1) =>
    ejecutar(async () => {
      const anterior = desde;
      desde = sumarDias(desde, direccion * DIAS_PAGINA);
      dia = hora = null;
      if (!(await cargarDisponibilidad())) desde = anterior;
    });

  const elegirHora = (h: string) => {
    // Cada elección concreta estrena su propia idempotencyKey
    if (h !== hora || !clave) clave = nuevoId();
    hora = h;
    pintarFecha();
    pintarResumen();
    mostrar('confirmar');
  };

  const confirmar = () =>
    ejecutar(async () => {
      if (!servicio || !dia || !hora || !clave) return;
      const cuerpo = () => ({
        serviceId: servicio!.serviceId,
        doctorId: doctor ? doctor.doctorId : null,
        date: dia,
        time: hora,
        idempotencyKey: clave,
      });
      let r = await pedir('/reservations', cuerpo());
      if (r.datos.errorCode === 'BOOKING_IDEMPOTENCY_KEY_REUSED') {
        clave = nuevoId();
        r = await pedir('/reservations', cuerpo());
      }
      if (r.status !== 201 && r.status !== 200) return fallo(r);
      pintarReserva(r.datos as Cita);
    });

  // ── Archivo de calendario (.ics) ────────────────────────
  const descargarIcs = () => {
    if (!cita) return;
    const sello = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const limpio = (s: string) => s.replace(/[\\;,]/g, '\\$&').replace(/\r?\n/g, '\\n');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DArmas Clinica Dental//Reserva//ES',
      'BEGIN:VEVENT',
      `UID:${cita.bookingReference}@darmas`,
      `DTSTAMP:${sello(new Date())}`,
      `DTSTART:${sello(aUtc(cita.date, cita.startTime, cita.timezone))}`,
      `DTEND:${sello(aUtc(cita.date, cita.endTime, cita.timezone))}`,
      `SUMMARY:${limpio(`${cita.serviceName} · ${cita.clinicName}`)}`,
      `DESCRIPTION:${limpio(`${cita.doctorName}\n${t.lblReferencia}: ${cita.bookingReference}`)}`,
      `LOCATION:${limpio(raiz.dataset.direccion || cita.clinicName)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const enlace = el('a');
    enlace.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    enlace.download = `cita-${cita.bookingReference}.ics`;
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
  };

  // ── Eventos ─────────────────────────────────────────────
  q('[data-rv-agendar]').addEventListener('click', () =>
    ejecutar(async () => {
      if (!(await cargarServicios())) return;
      if (!servicios.length) return final(t.sinServiciosTitulo, t.sinServiciosTexto);
      mostrar('servicio');
    }),
  );
  q('[data-rv-llamenme]').addEventListener('click', () => {
    olvidar();
    raiz.hidden = true;
    op.alGracias();
  });
  q('[data-rv-atras]').addEventListener('click', () => {
    const paso = PASOS.indexOf(vista as Vista);
    if (paso >= 0 && !ocupado) mostrar(paso === 0 ? 'invitacion' : PASOS[paso - 1]);
  });
  q('[data-rv-anterior]').addEventListener('click', () => paginar(-1));
  q('[data-rv-siguiente]').addEventListener('click', () => paginar(1));
  confirmarBtn.addEventListener('click', confirmar);
  reintentar.addEventListener('click', () => ultima && ejecutar(ultima));
  q('[data-rv-calendario]').addEventListener('click', descargarIcs);

  return {
    /** Tras el 202 del formulario con `booking` */
    abrir(booking: { sessionToken: string; expiresAt: string }) {
      token = booking.sessionToken;
      expira = Date.parse(booking.expiresAt) || Date.now() + 30 * 60_000;
      guardar();
      raiz.hidden = false;
      ejecutar(entrar);
    },
    /** Al recargar: retoma la sesión guardada. Devuelve false si no hay ninguna vigente */
    restaurar() {
      try {
        const guardado = JSON.parse(sessionStorage.getItem(ALMACEN) || 'null');
        if (!guardado?.token || guardado.expira <= Date.now()) {
          sessionStorage.removeItem(ALMACEN);
          return false;
        }
        token = guardado.token;
        expira = guardado.expira;
      } catch {
        return false;
      }
      raiz.hidden = false;
      ejecutar(entrar);
      return true;
    },
  };
}
