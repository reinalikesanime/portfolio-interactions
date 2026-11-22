// Work-page section nav (approved 2026-11-22).
//
// The nav column stays fixed beside the content (CSS position: sticky on
// .cs-nav, top 64px). As the reader scrolls, the title of the section they're
// in turns semibold and fully opaque; the rest stay regular at 60%. Opacity
// fades quickly; the weight swaps at the start of the fade. Clicking a title
// scrolls to that section (smoothly; instantly with reduced motion), landing
// it centered on screen if it fits, otherwise with its heading at eye level.
// Webflow's built-in anchor scrolling is blocked for these links (it would
// pull the section to the top).
//
// Webflow markup:
//   aside.cs-nav > a.cs-nav-link[href="#section-id"]  (one per section)
//   section#section-id                                 (anywhere on the page)
//
// Attaches by selector: .cs-nav

import { motion } from '../core/motion.js';

export default {
  selector: '.cs-nav',
  init(nav) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const cfg = motion.pageNav;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const items = Array.from(nav.querySelectorAll('a[href^="#"]'))
      .map((link) => ({ link, section: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
      .filter((it) => it.section);
    if (!items.length) return;

    // Scroll position that brings a section to its landing spot.
    const targetY = (section) => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const fits = rect.height <= vh;
      let top = fits ? (vh - rect.height) / 2 : vh * cfg.eyeLevel;
      top = Math.min(top, vh * cfg.activeLine - 8); // stay above the highlight line
      return Math.max(0, rect.top + window.scrollY - top);
    };

    let current = -1;
    const setActive = (index, instant) => {
      if (index === current) return;
      current = index;
      items.forEach((it, i) => {
        const on = i === index;
        it.link.style.fontWeight = on ? '600' : '400';
        if (on) it.link.setAttribute('aria-current', 'true');
        else it.link.removeAttribute('aria-current');
        gsap.to(it.link, {
          opacity: on ? cfg.activeOpacity : cfg.inactiveOpacity,
          duration: instant || reduce ? 0 : cfg.duration,
          ease: cfg.ease,
          overwrite: 'auto',
        });
      });
    };

    const update = (instant) => {
      const line = window.innerHeight * cfg.activeLine;
      let index = 0; // before any section reaches the line: the first one
      items.forEach((it, i) => {
        if (it.section.getBoundingClientRect().top <= line) index = i;
      });
      // At the very bottom of the page, the last section counts as current
      // even if it's too short to reach the line.
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 2) index = items.length - 1;
      setActive(index, instant);
    };

    const onClick = (e) => {
      const it = items.find((x) => x.link === e.currentTarget);
      if (!it) return;
      e.preventDefault();
      // Webflow has its own anchor-link scrolling (to the top of the target)
      // that listens higher up; stop it so it doesn't fight this scroll.
      e.stopPropagation();
      window.scrollTo({ top: targetY(it.section), behavior: reduce ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', it.link.hash);
    };
    items.forEach((it) => it.link.addEventListener('click', onClick));

    if (ScrollTrigger) {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate: () => update(false),
        onRefresh: () => update(true),
      });
    } else {
      window.addEventListener('scroll', () => update(false), { passive: true });
      window.addEventListener('resize', () => update(true));
    }
    update(true);

    // Arriving with a section in the address (e.g. /artful#research).
    if (location.hash) {
      const it = items.find((x) => x.link.hash === location.hash);
      if (it) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetY(it.section), behavior: 'auto' });
        });
      }
    }
  },
};
