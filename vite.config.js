import { defineConfig } from 'vite';

// Builds one IIFE file (dist/portfolio.js) that Webflow loads via jsDelivr.
// GSAP is NOT bundled: it is provided by Webflow's hosted GSAP (Site Settings),
// exposed as window.gsap, so the site never ships two copies.
export default defineConfig({
  server: {
    port: 5173,
    cors: true, // the Webflow staging site loads src/main.js from here in dev mode
  },
  build: {
    target: 'es2019',
    sourcemap: true,
    lib: {
      entry: 'src/main.js',
      name: 'Portfolio',
      formats: ['iife'],
      fileName: () => 'portfolio.js',
    },
  },
});
