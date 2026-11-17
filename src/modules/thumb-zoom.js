// Thumbnail hover zoom (approved 2026-11-17).
//
// Hovering a thumbnail's image area (or keyboard focus on its tile) zooms the
// image(s) inside it in slightly; leaving zooms back out. Runs alongside other
// thumbnail effects (e.g. the Artful fade): it only animates scale. The image
// box clips the zoom. Mouse/trackpad only; nothing on touch or reduced motion.
//
// Attaches by selector: .project-tile-media (tiles without images are skipped).

import { motion } from '../core/motion.js';

export default {
  selector: '.project-tile-media',
  init(media, { mm }) {
    const gsap = window.gsap;
    const imgs = Array.from(media.querySelectorAll('img'));
    if (!imgs.length) return;
    const tile = media.closest('.project-tile') || media;
    const { scale, duration, ease } = motion.thumbZoom;

    const zoomIn = () => gsap.to(imgs, { scale, duration, ease, overwrite: 'auto' });
    const zoomOut = () => gsap.to(imgs, { scale: 1, duration, ease, overwrite: 'auto' });

    mm.add((ctx) => {
      if (!ctx.conditions.canHover || ctx.conditions.reduceMotion) return undefined;
      gsap.set(imgs, { transformOrigin: '50% 50%' });
      media.addEventListener('mouseenter', zoomIn);
      media.addEventListener('mouseleave', zoomOut);
      tile.addEventListener('focusin', zoomIn);
      tile.addEventListener('focusout', zoomOut);
      return () => {
        media.removeEventListener('mouseenter', zoomIn);
        media.removeEventListener('mouseleave', zoomOut);
        tile.removeEventListener('focusin', zoomIn);
        tile.removeEventListener('focusout', zoomOut);
        gsap.set(imgs, { clearProps: 'transform' });
      };
    });
  },
};
