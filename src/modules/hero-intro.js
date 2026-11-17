// Hero fade-in on page load (approved 2026-11-17).
//
// The hero text block fades in, then the "SCROLL FOR WORKS" cue. To avoid a
// flash of visible text before this script loads, the site head adds
// class "js-intro" to <html> and hides both blocks with CSS; this module fades
// them in and removes the class. The head also removes the class after a few
// seconds if this script never arrives, so the text can't stay hidden.
//
// Attaches by selector: .hero

import { motion } from '../core/motion.js';

export default {
  selector: '.hero',
  init(hero) {
    const gsap = window.gsap;
    const root = document.documentElement;
    const text = hero.querySelector('.hero-content');
    const cue = hero.querySelector('.hero-arrows');
    const targets = [text, cue].filter(Boolean);
    if (!targets.length) {
      root.classList.remove('js-intro');
      return;
    }

    const { duration, ease, cueDelay, maxFontWait } = motion.heroIntro;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Take over from the CSS hide, then reveal.
    gsap.set(targets, { autoAlpha: 0 });
    root.classList.remove('js-intro');

    const play = () => {
      if (reduce) {
        gsap.set(targets, { autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { duration, ease } });
      if (text) tl.to(text, { autoAlpha: 1 }, 0);
      if (cue) tl.to(cue, { autoAlpha: 1 }, text ? cueDelay : 0);
    };

    // Wait for web fonts (capped) so the headline doesn't fade in and then
    // jump when the font swaps.
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const timeout = new Promise((r) => setTimeout(r, maxFontWait * 1000));
    Promise.race([fontsReady, timeout]).then(play);
  },
};
