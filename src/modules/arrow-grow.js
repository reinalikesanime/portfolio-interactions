// Hero arrows grow as the page scrolls (approved 2026-11-17).
//
// Each arrow in the SVG is one path made of two shapes: the stem and the head.
// This module splits each path into a stem and a head, then, tied to scroll:
// the stem lengthens downward from its top, and the head rides its tip, until
// the arrows reach their designed shape. Scrolling back up shortens them again.
// The arrows start invisible: stems grow from zero and the heads fade in early
// in the growth. Reduced motion: arrows stay at their full designed shape.
//
// Attaches by selector: .hero-arrows-icon

import { motion } from '../core/motion.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// Split "M...Z M...Z" into its subpaths.
function subpaths(d) {
  return d
    .split(/(?=M)/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default {
  selector: '.hero-arrows-icon',
  init(icon, { mm }) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const svg = icon.querySelector('svg');
    if (!svg || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Build stem + head paths from each arrow path (once).
    const arrows = [];
    Array.from(svg.querySelectorAll('path')).forEach((path) => {
      const parts = subpaths(path.getAttribute('d') || '');
      if (parts.length !== 2) return;
      const fill = path.getAttribute('fill') || 'currentColor';
      const make = (d) => {
        const p = document.createElementNS(SVG_NS, 'path');
        p.setAttribute('d', d);
        p.setAttribute('fill', fill);
        svg.appendChild(p);
        return p;
      };
      const stem = make(parts[0]);
      const head = make(parts[1]);
      path.remove();
      arrows.push({ stem, head });
    });
    if (!arrows.length) return;

    const { startLength, scrollDistance, headFadeIn } = motion.arrowGrow;

    mm.add((ctx) => {
      if (ctx.conditions.reduceMotion) return undefined;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          start: 0,
          end: scrollDistance,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      arrows.forEach(({ stem, head }) => {
        const len = stem.getBBox().height;
        tl.fromTo(
          stem,
          { scaleY: startLength, transformOrigin: '50% 0%' },
          { scaleY: 1, duration: 1, immediateRender: true, overwrite: false },
          0
        );
        tl.fromTo(
          head,
          { y: -len * (1 - startLength) },
          { y: 0, duration: 1, immediateRender: true, overwrite: false },
          0
        );
        if (startLength === 0 && headFadeIn > 0) {
          tl.fromTo(
            head,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: headFadeIn, immediateRender: true, overwrite: false },
            0
          );
        }
      });

      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
        gsap.set(
          arrows.flatMap((a) => [a.stem, a.head]),
          { clearProps: 'transform,opacity,visibility' }
        );
      };
    });
  },
};
