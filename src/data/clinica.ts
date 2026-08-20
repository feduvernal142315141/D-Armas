// ─────────────────────────────────────────────────────────────
// DATOS CENTRALES DE LA CLÍNICA (independientes del idioma)
// El contenido textual traducible vive en src/i18n/{es,en}.ts
// ─────────────────────────────────────────────────────────────

export const clinica = {
  nombre: "D'Armas Clínica Dental",
  nombreCorto: "D'Armas",

  telefono: '+50584849885',
  telefonoDisplay: '+505 8484 9885',
  whatsapp: '50584849885',

  // Coordenadas exactas de la ficha de Google Maps "Clínica Dental D'Armas"
  geo: { lat: 12.1199625, lng: -86.2508395 },
  // Enlace directo a la ficha (CID estable de Google Maps)
  mapsUrl: 'https://maps.google.com/?cid=6251988315430785853',
  // Embed anclado a las coordenadas exactas (evita homónimas fuera del país)
  mapsEmbed: 'https://www.google.com/maps?q=12.1199625,-86.2508395&z=18&hl=es&output=embed',

  // Horario de atención (para el estado "Abierto ahora" del mapa)
  horario: { dias: [1, 2, 3, 4, 5], abre: '08:30', cierra: '16:30', tz: 'America/Managua' },

  facebook: 'https://www.facebook.com/share/1FoRZ5jqaA/',
  tiktok: 'https://www.tiktok.com/@clinica.darmas',
  instagram: '',

  // Valores de los contadores (las etiquetas se traducen en i18n)
  stats: [
    { valor: 20, sufijo: '+' },
    { valor: 5, sufijo: '' },
    { valor: 3, sufijo: '' },
  ],
} as const;

// Enlaces profundos de navegación: abren la app nativa si está instalada
const { lat, lng } = clinica.geo;
export const mapLinks = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
  waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`,
  apple: `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(clinica.nombre)}`,
} as const;

export const waLink = (mensaje: string) =>
  `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(mensaje)}`;
