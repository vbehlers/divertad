// Minimal: page-load intro, then scroll-driven scale (big -> small).
(function () {
  function vanillaFallback() {
    const stage = document.querySelector('.stage');
    const title = document.querySelector('h1.display-title');
    if (!stage || !title) return;
    title.style.transformOrigin = 'top center';
    title.style.willChange = 'transform';

    const distance = 1000; // px of scroll to go 1 -> 0.4
    const minScale = 0.4;

    function update() {
      const rect = stage.getBoundingClientRect();
      const start = rect.top + window.scrollY; // stage top in page coords
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      const scale = 1 + (minScale - 1) * p;
      title.style.transform = `scale(${scale})`;
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function gsapInit() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return false;
    gsap.registerPlugin(ScrollTrigger);

    const stage = document.querySelector('.stage');
    const title = document.querySelector('h1.display-title');
    if (!stage || !title) return false;

    gsap.set(title, { willChange: 'transform' });
    gsap.to(title, {
      scale: 0.4,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=1000',
        scrub: 0.6,
        pin: false,
        markers: true,
        invalidateOnRefresh: true,
      },
    });
    return true;
  }

  function init() {
    // Try GSAP first, else fall back to vanilla
    if (!gsapInit()) vanillaFallback();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }
})();
