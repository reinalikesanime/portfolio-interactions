// Single source of truth for motion values (durations, easing, distances).
// Every module reads from here, so a request like "make reveals slower and
// softer" is one change in one place.
//
// Intentionally empty: values will be taken from the Figma interaction notes
// and motion references, not invented.

export const motion = {
  duration: {},
  ease: {},
  distance: {},
  stagger: {},
};
