// Nav color switching, per section (approved 2026-11-13: "Per card").
//
// Any element can declare the background it puts behind the nav:
//   data-nav-theme="light"  -> nav uses dark text
//   data-nav-theme="dark"   -> nav uses light text
// The nav takes the theme of the topmost such element under its center.
// Elements later in the page sit on top (this matches the project stack, where
// later cards cover earlier ones).
//
// Webflow markup: nav.site-nav[data-module="nav-theme"]

import { motion } from '../core/motion.js';

export default {
  init(nav) {
    const sources = Array.from(document.querySelectorAll('[data-nav-theme]'));
    if (!sources.length) return;

    const { textColor, colorDuration } = motion.nav;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setTransition = () => {
      nav.style.transition = reduce.matches ? 'none' : `color ${colorDuration}s`;
    };
    setTransition();
    reduce.addEventListener?.('change', setTransition);

    let current = null;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = nav.getBoundingClientRect();
      const y = box.top + box.height / 2;
      const x = window.innerWidth / 2;
      let theme = 'light';
      for (const el of sources) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y && r.left <= x && r.right >= x) {
          theme = el.dataset.navTheme === 'dark' ? 'dark' : 'light';
        }
      }
      if (theme !== current) {
        current = theme;
        nav.dataset.theme = theme;
        nav.style.color = textColor[theme];
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Cards move via transforms during scroll; the scroll listener covers that.
    update();
  },
};
