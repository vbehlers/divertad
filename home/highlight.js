// Fluid, transform-based auto-fit for one-line H1.
// Scales a child span so text fills available width/height continuously.
(function () {
  const stage = document.querySelector('.stage');
  const title = stage && stage.querySelector('h1.display-title');
  if (!stage || !title) return;

  // Ensure an inner span to scale (keeps padding intact)
  let inner = title.querySelector('.fit-inner');
  if (!inner) {
    inner = document.createElement('span');
    inner.className = 'fit-inner';
    // Move existing child nodes into the inner span
    while (title.firstChild) inner.appendChild(title.firstChild);
    title.appendChild(inner);
  }
  // Base styles applied via JS to avoid CSS edits
  Object.assign(title.style, {
    position: 'relative'
  });
  Object.assign(inner.style, {
    position: 'absolute',
    left: '50%',
    top: '0',
    display: 'inline-block',
    transformOrigin: 'top center',
    whiteSpace: 'nowrap'
  });

  const computeAvailable = () => {
    const cs = getComputedStyle(title);
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    const pt = parseFloat(cs.paddingTop) || 0;
    const pb = parseFloat(cs.paddingBottom) || 0;
    const width = title.clientWidth - pl - pr;
    // Height limited by stage height minus title vertical paddings
    const height = stage.clientHeight - pt - pb;
    return { width: Math.max(0, width), height: Math.max(0, height) };
  };

  let rafId = null;
  const fit = () => {
    rafId && cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      // Reset transform to measure natural size (and center horizontally)
      inner.style.transform = 'translateX(-50%) scale(1)';
      // Force layout read
      const naturalWidth = inner.scrollWidth;
      const naturalHeight = inner.scrollHeight;
      const { width: maxW, height: maxH } = computeAvailable();
      if (naturalWidth === 0 || naturalHeight === 0 || maxW <= 0 || maxH <= 0) return;
      const scaleW = maxW / naturalWidth;
      // Width-first fit for a single line; stays fluid
      const scale = scaleW > 0 ? scaleW : 1;
      inner.style.transform = `translateX(-50%) scale(${scale})`;
    });
  };

  // Observe container/title resize
  const ro = new ResizeObserver(fit);
  ro.observe(stage);
  ro.observe(title);

  // Watch for content changes
  const mo = new MutationObserver(fit);
  mo.observe(inner, { characterData: true, childList: true, subtree: true });

  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  fit();
})();
