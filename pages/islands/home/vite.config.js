import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build as a tiny ES module with a stable filename into /public/home
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../../public/home',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: 'src/main.jsx',
      name: 'HomeIsland',
      formats: ['es'],
      fileName: () => 'home-island.js'
    }
  },
});

