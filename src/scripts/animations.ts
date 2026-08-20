import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Smooth scroll (Lenis) ─────────────────────────────
if (!reduceMotion) {
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anclas internas con smooth scroll y offset del nav
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href') || '');
      if (target) {
        e.preventDefault();
        // El offset del nav fijo lo aporta el scroll-mt-24 de cada sección
        // (Lenis ya lo tiene en cuenta); no añadir offset manual o se duplica.
        lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
      }
    });
  });
}

// ── Nav: estado glass al hacer scroll ─────────────────
const nav = document.getElementById('nav');
if (nav) {
  ScrollTrigger.create({
    start: 60,
    onToggle: (self) => nav.classList.toggle('scrolled', self.isActive),
  });
}

if (!reduceMotion) {
  // ── Intro del hero ──────────────────────────────────
  // Estados iniciales con set() + animación con to(): el estado oculto de CSS
  // (html.js .hero-seq) haría que .from() capturara opacity 0 como valor final.
  const heroTitle = document.querySelector('[data-hero-title]');
  if (heroTitle) {
    const split = SplitText.create(heroTitle, { type: 'lines,words', linesClass: 'overflow-hidden' });
    gsap.set(split.words, { yPercent: 110 });
    gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
    gsap.set('[data-hero-card]', { opacity: 0, y: 60, rotate: 3 });
    gsap.set('[data-hero-chip]', { opacity: 0, y: 20, scale: 0.9 });
    gsap.set('.hero-seq', { opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(split.words, { yPercent: 0, duration: 1.1, stagger: 0.035 }, 0.15)
      .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.7)
      .to('[data-hero-card]', { opacity: 1, y: 0, rotate: 0, duration: 1.2 }, 0.55)
      .to('[data-hero-chip]', { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12 }, 1.05);
  }

  // ── Titulares por palabras (máscara de línea + stagger) ──
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines,words', linesClass: 'overflow-hidden' });
    gsap.from(split.words, {
      yPercent: 110,
      rotate: 3,
      transformOrigin: '0% 100%',
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.035,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // ── Reveals genéricos por scroll ────────────────────
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      delay: parseFloat(el.dataset.delay || '0'),
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });

  // ── Parallax sutil en imágenes marcadas (solo desktop:
  // en móvil el desplazamiento recorta los retratos) ────
  const desktop = window.matchMedia('(min-width: 1024px)').matches;
  desktop && gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  // ── Deriva lenta para marcas de agua (diente) en escritorio ──
  desktop && gsap.utils.toArray<HTMLElement>('[data-parallax-slow]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: -50 },
      {
        y: 70,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
      }
    );
  });

  // ── Contadores animados ─────────────────────────────
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter || '0');
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: () => {
        el.textContent = Math.round(obj.n).toLocaleString(document.documentElement.lang || 'es');
      },
    });
  });
} else {
  // Sin motion: mostrar todo de inmediato
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    el.textContent = parseFloat(el.dataset.counter || '0').toLocaleString(
      document.documentElement.lang || 'es'
    );
  });
}
