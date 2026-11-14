// Shared media conditions for gsap.matchMedia().
// Breakpoint values are placeholders until they are matched to the Figma/Webflow
// breakpoints in the first design handoff.

export const conditions = {
  desktop: '(min-width: 992px)',
  tablet: '(min-width: 768px) and (max-width: 991px)',
  mobile: '(max-width: 767px)',
  canHover: '(hover: hover) and (pointer: fine)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
};

export function createMatchMedia(scope) {
  const mm = window.gsap.matchMedia(scope);
  return {
    add(fn) {
      mm.add(conditions, fn, scope);
    },
    revert() {
      mm.revert();
    },
  };
}
