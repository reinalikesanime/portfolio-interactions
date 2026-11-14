// Finds every element with data-module="name" and starts the matching module.
// Modules flagged `lazy: true` start only when their element nears the viewport.
//
// A module is: { init(el, ctx) -> optional cleanup function, lazy?: boolean }
// ctx.mm is a gsap.matchMedia() scoped to that element, with conditions from
// core/media.js, so every module handles desktop / touch / reduced motion.

import { createMatchMedia } from './media.js';

export function initModules(root, registry) {
  const els = root.querySelectorAll('[data-module]');
  const lazyObserver = new IntersectionObserver(onIntersect, { rootMargin: '200px 0px' });

  els.forEach((el) => {
    el.dataset.module.split(/\s+/).forEach((name) => {
      const mod = registry[name];
      if (!mod) {
        console.warn(`[portfolio] Unknown module "${name}"`, el);
        return;
      }
      if (mod.lazy) {
        el.__pendingModules = (el.__pendingModules || []).concat(name);
        lazyObserver.observe(el);
      } else {
        start(el, name, mod);
      }
    });
  });

  function onIntersect(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      (el.__pendingModules || []).forEach((name) => start(el, name, registry[name]));
      el.__pendingModules = [];
      lazyObserver.unobserve(el);
    });
  }
}

function start(el, name, mod) {
  el.__started = el.__started || new Set();
  if (el.__started.has(name)) return;
  el.__started.add(name);
  try {
    mod.init(el, { mm: createMatchMedia(el) });
  } catch (err) {
    console.error(`[portfolio] Module "${name}" failed`, err);
  }
}
