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

    mm.add((ctx) => {
      if (ctx.conditions.reduceMotion) return undefined;

      // Pinned layout. Scroll length = one screen per card, so each transition
      // takes exactly one screen of scrolling.
      gsap.set(section, { height: `${n * 100}vh` });
      gsap.set(sticky, { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' });
      gsap.set(cards, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });
      gsap.set(shades, { backgroundColor: shadeColor });

      // Positions are computed directly from scroll progress (no tweens), so
      // the result is the same however the visitor got there: scrolling either
      // way, jumping, or resizing the window. It also can't be affected by
      // Webflow Interactions' global GSAP settings.
      //
      // "time" runs from 0 to n-1; segment t (t..t+1) is card t+1 covering card t.
      const setY = cards.map((card) => gsap.quickSetter(card, 'y', 'px'));
      const setShade = shades.map((shade) => (shade ? gsap.quickSetter(shade, 'opacity') : () => {}));
      const clamp01 = gsap.utils.clamp(0, 1);

      const render = (time) => {
        const h = vh();
        for (let i = 0; i < n; i++) {
          let y;
          if (i === 0) y = 0;
          else if (time >= i - 1) y = (h - peek) * (1 - clamp01(time - (i - 1))); // peek -> cover
          else if (time >= i - 2) y = h - peek * clamp01(time - (i - 2)); // offscreen -> peek
          else y = h; // waiting offscreen
          setY[i](y);
          setShade[i](coveredShade * clamp01(time - i)); // darkens while the next card covers it
        }
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => render(self.progress * (n - 1)),
        onRefresh: (self) => render(self.progress * (n - 1)),
      });
      render(st.progress * (n - 1));

      // Keyboard: when focus moves into a card (e.g. its link), scroll to that card's turn.
      const onFocusIn = (e) => {
        const i = cards.findIndex((card) => card.contains(e.target));
        if (i < 0) return;
        const top = st.start + (i / (n - 1)) * (st.end - st.start);
        window.scrollTo({ top, behavior: 'instant' });
      };
      section.addEventListener('focusin', onFocusIn);

      return () => {
        section.removeEventListener('focusin', onFocusIn);
        st.kill();
        gsap.set(cards, { clearProps: 'transform' });
        gsap.set(shades, { clearProps: 'opacity' });
      };
    });
  },
};
