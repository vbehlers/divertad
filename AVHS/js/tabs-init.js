// Tabs initializer that works with static markup and HTML includes
// - Finds each `.tabs-component` and wires up animated tab switching
// - Idempotent: safe to call multiple times (marks components as initialized)
// - Runs on DOMContentLoaded and when `includes:loaded` fires from include-html.js

(function () {
  let groupIdCounter = 0;
  const registered = new Set();

  function ensureVTStyleEl() {
    let el = document.getElementById('tabs-vt-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'tabs-vt-styles';
      document.head.appendChild(el);
    }
    return el;
  }

  function registerVTAnimations(...names) {
    const toAdd = names.filter((n) => !registered.has(n));
    if (toAdd.length === 0) return;
    toAdd.forEach((n) => registered.add(n));
    const blocks = toAdd
      .map((n) =>
        `::view-transition-old(${n}) {\n  animation-duration: var(--tab-transition-duration);\n  animation-timing-function: var(--tab-transition-ease);\n  animation-name: vt-scale-y-out;\n  transform-origin: top;\n}\n::view-transition-new(${n}) {\n  animation-duration: var(--tab-transition-duration);\n  animation-timing-function: var(--tab-transition-ease);\n  animation-name: vt-scale-y-in;\n  transform-origin: top;\n}`
      )
      .join('\n');
    ensureVTStyleEl().appendChild(document.createTextNode(blocks + '\n'));
  }

  function initTabsIn(root = document) {
    const components = Array.from(root.querySelectorAll('.tabs-component'));
    if (components.length === 0) return;

    components.forEach((tabsComponent) => {
      if (tabsComponent.dataset.tabsInitialized === 'true') return;

      const tabButtons = Array.from(
        tabsComponent.querySelectorAll('.tab-button')
      );
      const tabPanels = Array.from(
        tabsComponent.querySelectorAll('.tab-panel')
      );
      const indicator = tabsComponent.querySelector(
        '.active-tab-indicator'
      );
      const nav = tabsComponent.querySelector('nav');

      if (tabButtons.length === 0 || tabPanels.length === 0 || !indicator) {
        // Nothing to wire up
        return;
      }

      let activeTab =
        tabsComponent.querySelector('.tab-button.active') || tabButtons[0];
      let activePanel =
        tabsComponent.querySelector('.tab-panel:not(.hidden)') || tabPanels[0];

      if (!activeTab || !activePanel) return;

      // Unique view-transition names per component to avoid collisions
      const id = groupIdCounter++;
      const vtPanelName = `tab-content-${id}`;
      // Only panels participate in View Transitions; nav/indicator/buttons use CSS transitions.
      tabPanels.forEach((p) => {
        p.style.viewTransitionName = vtPanelName;
      });
      // Ensure the dynamic VT names use our unified duration and motion
      registerVTAnimations(vtPanelName);

      function updateIndicator(tab) {
        const nav = indicator.parentElement;
        if (nav && getComputedStyle(nav).position === 'static') {
          nav.style.position = 'relative';
        }
        // Smoothly move the indicator using CSS transitions instead of VT
        indicator.style.transition = `left var(--tab-transition-duration) var(--tab-transition-ease), width var(--tab-transition-duration) var(--tab-transition-ease)`;
        indicator.style.left = `${tab.offsetLeft}px`;
        indicator.style.width = `${tab.offsetWidth}px`;
      }

      // Initial layout
      updateIndicator(activeTab);

      // Keep indicator aligned on layout changes (resize/font load)
      const ro = new ResizeObserver(() => updateIndicator(activeTab));
      if (nav) ro.observe(nav);
      window.addEventListener('resize', () => updateIndicator(activeTab));

      // Hook up clicks by index mapping within this component
      tabButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
          if (button === activeTab) return;
          const targetPanel = tabPanels[i];
          if (!targetPanel) return;

          const updateDOM = () => {
            // Buttons
            activeTab.classList.remove('active', 'text-blue-600');
            button.classList.add('active', 'text-blue-600');

            // Panels
            activePanel.classList.add('hidden');
            targetPanel.classList.remove('hidden');

            // Indicator
            updateIndicator(button);

            activeTab = button;
            activePanel = targetPanel;
          };

          // Use View Transitions with a global animation lock so all animations finish in unison
          if (!document.startViewTransition) {
            if (window.__tabsAnimating) return;
            window.__tabsAnimating = true;
            document.documentElement.classList.add('is-tabs-animating');

            const scope = tabsComponent.closest('.vt-page-scope');

            // Prepare animations
            activePanel.classList.add('vt-anim-out');
            targetPanel.classList.remove('hidden');
            targetPanel.classList.add('vt-anim-in');
            if (scope) scope.classList.add('vt-anim-in');

            // Buttons
            activeTab.classList.remove('active', 'text-blue-600');
            button.classList.add('active', 'text-blue-600');

            // Indicator tween
            updateIndicator(button);

            let finished = 0;
            const total = 2; // wait for both panels
            function done() {
              finished += 1;
              if (finished < total) return;
              // Cleanup
              activePanel.classList.remove('vt-anim-out');
              activePanel.classList.add('hidden');
              targetPanel.classList.remove('vt-anim-in');
              if (scope) scope.classList.remove('vt-anim-in');

              activeTab = button;
              activePanel = targetPanel;
              window.__tabsAnimating = false;
              document.documentElement.classList.remove('is-tabs-animating');
            }

            activePanel.addEventListener('animationend', done, { once: true });
            targetPanel.addEventListener('animationend', done, { once: true });
            return;
          }

          if (window.__tabsAnimating) return; // ignore re-entrant clicks
          window.__tabsAnimating = true;
          document.documentElement.classList.add('is-tabs-animating');

          const vt = document.startViewTransition(updateDOM);
          // Expose a promise and flag for consumers if needed
          window.__tabsTransition = vt;
          vt.finished.finally(() => {
            window.__tabsAnimating = false;
            document.documentElement.classList.remove('is-tabs-animating');
          });
        });
      });

      // Mark as initialized to avoid double-binding
      tabsComponent.dataset.tabsInitialized = 'true';
    });
  }

  // Expose helpers
  window.initTabsIn = initTabsIn;
  window.isTabsAnimating = () => Boolean(window.__tabsAnimating);

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      queueMicrotask(fn);
    }
  }

  // Run on page load
  ready(() => initTabsIn(document));

  // Also run after HTML includes complete (from include-html.js)
  document.addEventListener('includes:loaded', () => initTabsIn(document));
})();
