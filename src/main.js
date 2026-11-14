import { initModules } from './core/loader.js';
import { modules } from './modules/index.js';

function boot() {
  if (!window.gsap) {
    console.warn('[portfolio] window.gsap not found. Enable GSAP in Webflow Site Settings.');
    return;
  }
  initModules(document, modules);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
