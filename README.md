# D'Armas Clínica Dental — Landing Page

Landing page premium construida con **Astro 7 + Tailwind CSS 4 + GSAP (ScrollTrigger + SplitText) + Lenis**.

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:4321)
npm run build    # build de producción → dist/
npm run preview  # servir el build localmente
```

## Antes de publicar — pendientes ⚠️

Los datos de la clínica viven en **`src/data/clinica.ts`** (contacto, equipo, especialidades, FAQs — ya con datos reales).

- [ ] Dominio real en `astro.config.mjs` (campo `site`) — afecta sitemap, canonical y OG
- [ ] Coordenadas exactas de la clínica en `geo` (hoy: aproximadas de Altamira; el mapa embebido ancla al Palí de Altamira, la referencia de la dirección)
- [ ] Cifra de "sonrisas/pacientes" si quieren añadirla a las estadísticas

## Estructura

- `src/data/clinica.ts` — datos centrales (NAP, especialidades, FAQs); todo el sitio lee de aquí
- `src/layouts/Layout.astro` — SEO, Open Graph, JSON-LD (schema.org `Dentist` + `FAQPage`)
- `src/components/` — secciones de la landing
- `src/scripts/animations.ts` — Lenis smooth scroll + animaciones GSAP (respeta `prefers-reduced-motion`)
- `src/assets/brand/` — logos vectoriales (SVG extraídos del manual de marca)
- `src/assets/photos/` — fotos optimizadas automáticamente por `astro:assets`

## Marca

Colores del manual: `#065663` · `#1B98A6` · `#5BD8E0` · blanco. Tipografía web: Fraunces (display) + Inter (cuerpo), self-hosted vía Fontsource.
