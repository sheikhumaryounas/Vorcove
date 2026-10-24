import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
export const getLenis = () => lenis;

export const playVideo = v => {
  if (reduceMotion || !v) return;
  const p = v.play();
  if (p) p.catch(() => {});
};

// smooth scrolling (Lenis) driven by the GSAP ticker; in-page links scroll smoothly too
export function startSmoothScroll() {
  if (reduceMotion) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = t => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const onClick = e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !lenis) return;
    const id = a.getAttribute('href');
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -84 });
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

// scroll-driven effects (GSAP ScrollTrigger)
export function startScrollEffects() {
  if (reduceMotion) return () => {};
  const ctx = gsap.context(() => {
    // product video frames grow to full size as they scroll into view
    gsap.utils.toArray('[data-zoom]').forEach(el => {
      gsap.fromTo(el, { scale: 0.84, borderRadius: 44 }, {
        scale: 1, borderRadius: 24, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 30%', scrub: true }
      });
    });
    // hero copy drifts up and fades as the page scrolls past it
    gsap.to('.hero .slide-inner', {
      yPercent: -14, opacity: 0.2, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    // background photos move slower than the page
    gsap.utils.toArray('.why-bg img').forEach(img => {
      gsap.fromTo(img, { yPercent: -8, scale: 1.18 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    // big footer wordmark slides in from the side
    gsap.fromTo('.giant', { xPercent: -6 }, {
      xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
    });
  });
  return () => ctx.revert();
}

// fade-up reveal for every .rv element as it enters the screen
export function startReveal() {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv, .about-media').forEach(el => io.observe(el));
  return () => io.disconnect();
}
