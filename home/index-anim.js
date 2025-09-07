// Vanilla demo: always-visible animations so you can confirm behavior.
(function () {
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function init() {
    const title = document.querySelector('h1.display-title');
    if (!title) return;

    // Load-in: slide + fade so you immediately see motion
    title.style.transition = 'transform 600ms cubic-bezier(.22,.8,.36,1), opacity 600ms cubic-bezier(.22,.8,.36,1)';
    title.style.transformOrigin = 'top center';
    title.style.willChange = 'transform, opacity';
    title.style.opacity = '0';
    title.style.transform = 'translateY(32px)';
    requestAnimationFrame(() => {
      // next frame -> animate to final
      title.style.opacity = '1';
      title.style.transform = 'none';
    });

    // Scroll shrink: tie directly to page scroll for simplicity
    const total = 1000; // px of page scroll from 1 -> 0.6
    const minScale = 0.6;

    function onScroll() {
      const p = clamp(window.scrollY / total, 0, 1);
      const scale = 1 + (minScale - 1) * p;
      title.style.transform = `scale(${scale})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }
})();

