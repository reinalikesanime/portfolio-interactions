// Thumbnail hover fade (approved 2026-11-14).
//
// Two stacked images in the thumbnail: the default state and the hover state.
// Mouse/trackpad: hover (or keyboard focus) fades the hover image in; leaving
// fades it back out. Touch devices: the hover image fades in once, as the
// thumbnail scrolls into view.
//
// Webflow markup:
//   div.project-tile[data-module="thumb-fade"]
//     div.project-tile-media
//       img.thumb-img                         (default state)
//       img.thumb-img[data-thumb-state="hover"]  (hover state, starts transparent)

import { motion } from '../core/motion.js';

export default {
  init(tile, { mm }) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const hoverImg = tile.querySelector('[data-thumb-state="hover"]');
    if (!hoverImg) return;

    const { duration, ease, touchStart } = motion.thumbFade;
    gsap.set(hoverImg, { opacity: 0 });
    const show = () => gsap.to(hoverImg, { opacity: 1, duration, ease, overwrite: true });
    const hide = () => gsap.to(hoverImg, { opacity: 0, duration, ease, overwrite: true });

    mm.add((ctx) => {
      if (ctx.conditions.canHover) {
        tile.addEventListener('mouseenter', show);
        tile.addEventListener('mouseleave', hide);
        tile.addEventListener('focusin', show);
        tile.addEventListener('focusout', hide);
        return () => {
          tile.removeEventListener('mouseenter', show);
          tile.removeEventListener('mouseleave', hide);
          tile.removeEventListener('focusin', show);
          tile.removeEventListener('focusout', hide);
          gsap.set(hoverImg, { opacity: 0 });
        };
      }
      // Touch: play once when the thumbnail scrolls into view.
      if (!ScrollTrigger) {
        gsap.set(hoverImg, { opacity: 1 });
        return undefined;
      }
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        trigger: tile.querySelector('.project-tile-media') || tile,
        start: touchStart,
        once: true,
        onEnter: show,
      });
      return () => {
        st.kill();
        gsap.set(hoverImg, { opacity: 0 });
      };
    });
  },
};
