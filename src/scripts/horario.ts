import { clinica } from '../data/clinica';

export type TextosHorario = {
  abierto: string;
  cerrado: string;
  cierra: string;
  abre: string;
  hoy: string;
  manana: string;
};

/**
 * Estado de apertura de la clínica calculado en su zona horaria.
 * Devuelve un texto listo para mostrar, p. ej.:
 *  "Abierto ahora · cierra a las 4:30 p. m."
 *  "Cerrado · abre mañana 8:30 a. m." / "Cerrado · abre el lunes 8:30 a. m."
 */
export function estadoApertura(lang: string, s: TextosHorario) {
  const { dias, abre, cierra, tz } = clinica.horario;
  const habiles = dias as readonly number[];
  const aMin = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };
  const hora = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number);
    return new Intl.DateTimeFormat(lang, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(
      new Date(Date.UTC(2000, 0, 1, h, m))
    );
  };

  const ahora = new Date();
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(ahora);
  const get = (t: string) => partes.find((p) => p.type === t)?.value || '';
  const diaIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minAhora = (Number(get('hour')) % 24) * 60 + Number(get('minute'));

  const abierto = habiles.includes(diaIdx) && minAhora >= aMin(abre) && minAhora < aMin(cierra);
  if (abierto) return { abierto, texto: `${s.abierto} · ${s.cierra} ${hora(cierra)}` };

  // Próxima apertura: hoy (antes de abrir), mañana o el siguiente día hábil
  let offset = 0;
  if (!(habiles.includes(diaIdx) && minAhora < aMin(abre))) {
    offset = 1;
    while (!habiles.includes((diaIdx + offset) % 7)) offset++;
  }
  let cuando: string;
  if (offset === 0) cuando = s.hoy;
  else if (offset === 1) cuando = s.manana;
  else {
    const d = new Date(ahora);
    d.setDate(d.getDate() + offset);
    const dia = new Intl.DateTimeFormat(lang, { weekday: 'long', timeZone: tz }).format(d);
    cuando = lang.startsWith('es') ? `el ${dia}` : dia;
  }
  return { abierto, texto: `${s.cerrado} · ${s.abre} ${cuando} ${hora(abre)}` };
}

/** Lee los textos desde los data-* de un elemento (data-abierto, data-cerrado, ...) */
export const textosDesde = (el: HTMLElement): TextosHorario => ({
  abierto: el.dataset.abierto || '',
  cerrado: el.dataset.cerrado || '',
  cierra: el.dataset.cierra || '',
  abre: el.dataset.abre || '',
  hoy: el.dataset.hoy || '',
  manana: el.dataset.manana || '',
});
