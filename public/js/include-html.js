// Simple HTML include loader
// Usage: <div data-include="path/to/file.html"></div>
// After all includes load, emits: document event 'includes:loaded'
(function () {
  async function loadIncludes() {
    const containers = Array.from(document.querySelectorAll('[data-include]'));
    if (containers.length === 0) {
      document.dispatchEvent(new Event('includes:loaded'));
      return;
    }

    await Promise.all(
      containers.map(async (el) => {
        const src = el.getAttribute('data-include');
        if (!src) return;
        try {
          const resp = await fetch(src, { credentials: 'same-origin' });
          if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${src}`);
          const html = await resp.text();
          el.innerHTML = html;
          // Execute any scripts in the included HTML
          const scripts = Array.from(el.querySelectorAll('script'));
          scripts.forEach((oldScript) => {
            const newScript = document.createElement('script');
            for (const { name, value } of Array.from(oldScript.attributes)) {
              newScript.setAttribute(name, value);
            }
            if (oldScript.src) {
              newScript.src = oldScript.src;
            } else {
              newScript.textContent = oldScript.textContent || '';
            }
            oldScript.replaceWith(newScript);
          });
        } catch (e) {
          console.error('Include error:', e);
          el.innerHTML = `<div class="text-rose-400 text-sm">Include error: ${String(e.message || e)}</div>`;
        }
      })
    );

    document.dispatchEvent(new Event('includes:loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
  } else {
    queueMicrotask(loadIncludes);
  }
})();

