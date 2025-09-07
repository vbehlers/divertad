Home Island (Vite + React)

What this is
- A small React “island” you can embed into your existing HTML pages without changing your current Tailwind/CDN setup.
- Builds a single ES module at `/public/home/home-island.js` you can load with one script tag.

How to build
1) cd pages/islands/home
2) npm install
3) npm run build

How to mount in a page (example: root index.html)
<div id="home-island"></div>
<script type="module" src="/home/home-island.js"></script>

Notes
- The island uses Tailwind utility classes but does not bundle Tailwind — keep your existing Tailwind CDN on the host page.
- No effect if the `#home-island` element is missing.
- You can create more islands by copying this folder and adjusting `outDir` and filenames in `vite.config.js`.

