Animation Notes — Tabs and View Transitions

Overview
- Goal: Smooth, consistent Y-scale transitions for tab changes while moving whole sections as a unit where desired.
- Approach: Section-level View Transitions (via `.vt-page-scope`) + panel-level VT (only when no parent scope) with a CSS/JS fallback for browsers without VT.

Current State
- Section-level VT: Applied to two `.module-2` blocks in `embed/about4.html` so those sections animate as a unit.
- Panels: `tabs-init.js` assigns a unique `viewTransitionName` to panels; when a parent scope is named, the parent transition “wins” (expected VT behavior).
- Fallback: When `document.startViewTransition` is unavailable, panels and the nearest section animate via CSS classes (`vt-anim-in/out`) with the same timing.
- Indicator/buttons: Use CSS transitions with the shared duration/ease.

Key Files
- embed/about4.html — page using includes + scopes
- embed/include-html.js — loads includes and re-runs scripts
- embed/tabs-init.js — wires tab groups, sets VT names, fallback logic
- embed/tabs.css — timing vars, keyframes, VT part rules, fallback class animations

Options (choose per section)
- Section-only animation (recommended here): keep `.vt-page-scope` on the section. Inner `.tab-panel` won’t animate as separate VT parts (by design), but the whole block moves together.
- Panel-only animation: remove `.vt-page-scope` and let `.tab-panel` handle VT. Good for demos (like `tabs.html`), less suitable for full sections.
- Library-driven: If you need both parent+panel animation simultaneously and cross-browser parity, use Motion One or Framer Motion.

Tuning (shared motion)
- Variables in `embed/tabs.css`:
  - `--tab-transition-duration`: 280ms (bump to 360–420ms if you want more presence)
  - `--tab-transition-ease`: cubic-bezier(0.2, 0, 0, 1) (punchier: `cubic-bezier(0.22, 1, 0.36, 1)`)
- Y-scale keyframes: `vt-scale-y-in/out` (consider 0.94–1 for stronger motion).

Open Questions / TODOs
- Apply `.vt-page-scope` to the third section (School Policies)?
- Increase duration/ease and scale delta for more obvious motion?
- Ensure no global CSS (e.g., `embed/page-transitions.css`) re-enables page-wide transitions unintentionally.
- Consider Motion One (vanilla) if simultaneous parent+panel animation is required.

Quick Tips
- Avoid nesting `.vt-page-scope` inside another when expecting inner panels to animate separately — closest named ancestor wins.
- Includes can contain scripts — `include-html.js` re-executes them. Keep shared scripts (e.g., `tabs-init.js`) on the page, not inside includes.

