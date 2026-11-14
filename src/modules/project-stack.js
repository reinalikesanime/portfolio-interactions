// Landing page project stack (approved 2026-11-13).
//
// Physical stack: the section pins a full-screen panel while you scroll. Each
// card slides up from its "peek" position to cover the previous card, which
// darkens as it's covered. The following card moves into the peek position at
// the same time. Motion is tied 1:1 to the scrollbar (no smoothing, no easing).
//
// Webflow markup:
//   section.project-stack[data-module="project-stack"]
//     div.project-stack-sticky
//       div.project-card  (one per project, in order)
//         div.project-card-shade
//
// Without JS, or with reduced motion, the cards stay a plain vertical list
// (their Webflow styles: full-screen blocks in normal flow).

import { motion } from '../core/motion.js';

export default {
  init(section, { mm }) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!ScrollTrigger) {
      console.warn('[project-stack] ScrollTrigger not loaded; enable it in Webflow Site Settings > GSAP.');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const sticky = section.querySelector('.project-stack-sticky');
    const cards = gsap.utils.toArray(section.querySelectorAll('.project-card'));
    const shades = cards.map((card) => card.querySelector('.project-card-shade'));
    const n = cards.length;
    if (!sticky || n < 2) return;

    const { peek, coveredShade, shadeColor } = motion.stack;
    const vh = () => window.innerHeight;
    // Resting position of card i before its turn: next card peeks, later ones wait offscreen.
    const restY = (i) => (i === 0 ? 0 : i === 1 ? vh() - peek : vh());

    mm.add((ctx) => {
      if (ctx.conditions.reduceMotion) return undefined;

      // Pinned layout. Scroll length = one screen per card, so each transition
      // takes exactly one screen of scrolling.
      gsap.set(section, { height: `${n * 100}vh` });
      gsap.set(sticky, { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' });
      gsap.set(cards, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });
      gsap.set(shades, { backgroundColor: shadeColor, opacity: 0 });
      cards.forEach((card, i) => gsap.set(card, { y: () => restY(i) }));

      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // immediateRender: false so later steps don't overwrite the resting
      // positions set above before the visitor reaches them.
      const step = { immediateRender: false };
      for (let t = 0; t < n - 1; t++) {
        // Next card slides up from the peek position to cover the current one.
        tl.fromTo(cards[t + 1], { y: () => vh() - peek }, { y: 0, ...step }, t);
        // Current card darkens as it's covered.
        if (shades[t]) tl.fromTo(shades[t], { opacity: 0 }, { opacity: coveredShade, ...step }, t);
        // The card after that moves up into the peek position.
        if (cards[t + 2]) tl.fromTo(cards[t + 2], { y: () => vh() }, { y: () => vh() - peek, ...step }, t);
      }

      // Keyboard: when focus moves into a card (e.g. its link), scroll to that card's turn.
      const onFocusIn = (e) => {
        const i = cards.findIndex((card) => card.contains(e.target));
        const st = tl.scrollTrigger;
        if (i < 0 || !st) return;
        const top = st.start + (i / (n - 1)) * (st.end - st.start);
        window.scrollTo({ top, behavior: 'instant' });
      };
      section.addEventListener('focusin', onFocusIn);

      return () => section.removeEventListener('focusin', onFocusIn);
    });
  },
};
