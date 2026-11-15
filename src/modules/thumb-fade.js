// Thumbnail hover fade (approved 2026-11-14).
//
// Two stacked images in the thumbnail: the default state and the hover state.
// Mouse/trackpad: hovering the image (or keyboard focus on the tile) fades the
// hover image in; leaving fades it back out. The caption doesn't trigger it. Touch devices: the hover image fades in once, as the
// thumbnail scrolls into view.
//
// Webflow markup (data-module can sit on the tile, the media box, or the hover
// image itself):
//   div.project-tile
//     div.project-tile-media
//       img.thumb-img                                    (default state)
//       img.thumb-img[data-thumb-state="hover"][data-module="thumb-fade"]

import { motion } from '../core/motion.js';

export default {
  init(el, { mm }) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const hoverImg = el.matches('[data-thumb-state="hover"]') ? el : el.querySelector('[data-thumb-state="hover"]');
    if (!hoverImg) return;
    const media = hoverImg.closest('.project-tile-media') || hoverImg.parentElement;
    const tile = media.closest('.project-tile') || media;

    const { duration, ease, touchStart } = motion.thumbFade;
    gsap.set(hoverImg, { opacity: 0 });
    const show = () => gsap.to(hoverImg, { opacity: 1, duration, ease, overwrite: true });
    const hide = () => gsap.to(hoverImg, { opacity: 0, duration, ease, overwrite: true });

    mm.add((ctx) => {
      if (ctx.conditions.canHover) {
        media.addEventListener('mouseenter', show);
        media.addEventListener('mouseleave', hide);
        tile.addEventListener('focusin', show);
        tile.addEventListener('focusout', hide);
        return () => {
          media.removeEventListener('mouseenter', show);
          media.removeEventListener('mouseleave', hide);
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
        trigger: media,
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
