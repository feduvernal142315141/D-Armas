import { gsap } from 'gsap';

/**
 * Tarjetas "spotlight" (.spot): el borde y un halo interior siguen al puntero,
 * también por proximidad desde fuera de la tarjeta; en escritorio las tarjetas
 * grandes (sin .spot-sm) se inclinan en 3D. Estilos en global.css.
 */
export function initSpotlight(root: HTMLElement) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-spot]')];
  if (!cards.length) return;

  if (!fino) {
    // Táctil: el halo se enciende al tocar
    cards.forEach((card) => {
      card.addEventListener('pointerdown', () => card.style.setProperty('--glow', '1'));
      card.addEventListener('pointerup', () => card.style.setProperty('--glow', '0.3'));
    });
    return;
  }

  const glowDe = new Map<HTMLElement, (v: number) => void>();
  const rxDe = new Map<HTMLElement, (v: number) => void>();
  const ryDe = new Map<HTMLElement, (v: number) => void>();
  const yDe = new Map<HTMLElement, (v: number) => void>();

  cards.forEach((card) => {
    glowDe.set(card, gsap.quickTo(card, '--glow', { duration: 0.5, ease: 'power2.out' }));
    if (!reduce && !card.classList.contains('spot-sm')) {
      rxDe.set(card, gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3.out' }));
      ryDe.set(card, gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3.out' }));
      yDe.set(card, gsap.quickTo(card, 'y', { duration: 0.7, ease: 'power3.out' }));
    }
  });

  root.addEventListener('pointermove', (e) => {
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      const dentro = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      // Intensidad según distancia al borde más cercano (0 lejos → 1 dentro)
      const dx = Math.max(-x, 0, x - r.width);
      const dy = Math.max(-y, 0, y - r.height);
      const dist = Math.hypot(dx, dy);
      glowDe.get(card)?.(dentro ? 1 : Math.max(0, 1 - dist / 220) * 0.6);

      const tilt = Number(card.dataset.tilt ?? 7);
      ryDe.get(card)?.(dentro ? (x / r.width - 0.5) * tilt : 0);
      rxDe.get(card)?.(dentro ? -(y / r.height - 0.5) * tilt : 0);
      yDe.get(card)?.(dentro ? -6 : 0);
    });
  });
  root.addEventListener('pointerleave', () => {
    cards.forEach((card) => {
      glowDe.get(card)?.(0);
      rxDe.get(card)?.(0);
      ryDe.get(card)?.(0);
      yDe.get(card)?.(0);
    });
  });
}
