// ESM version for Vite dev server: simple scale on scroll with GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function init() {
  const stage = document.querySelector('.stage');
  const title = document.querySelector('h1.display-title');
  if (!stage || !title) return;

  // Smooth transform rendering
  gsap.set(title, { willChange: 'transform' });

  // Scroll: shrink from 1 -> 0.4 over 1000px
  gsap.to(title, {
    scale: 0.4,
    transformOrigin: 'top center',
    ease: 'none',
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: '+=1000',
      scrub: 0.6,
      markers: true,
      invalidateOnRefresh: true,
    },
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  window.addEventListener('DOMContentLoaded', init);
}

