import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Root Vite config. We don't force a single index.html at root; instead,
// we support opening /home/index.html directly in dev and include it as
// a build input for completeness.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home/index.html'),
        highlight: resolve(__dirname, 'home/highlight.html'),
        samples: resolve(__dirname, 'public/index.html'),
      },
    },
  },
});
