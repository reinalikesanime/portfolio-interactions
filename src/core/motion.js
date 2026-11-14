// Single source of truth for motion values (durations, easing, distances).
// Every module reads from here, so a request like "make the darkening subtler"
// is one change in one place.
//
// Values marked PLACEHOLDER have no Figma source yet and are waiting on Reina.

export const motion = {
  stack: {
    // How much of the next card rests at the bottom of the screen (px).
    // 0 = no resting peek: each card fills the whole screen when reached, and
    // the next card rises from the bottom edge to cover it (Reina, 2026-11-13,
    // "clear screen when you arrive"). Was 214 (Figma offset).
    peek: 0,
    // Opacity of the dark overlay on a card once it's fully covered.
    // PLACEHOLDER: "darkens gradually" approved; exact amount not designed yet.
    coveredShade: 0.5,
    // Shade color (the site's ink color).
    shadeColor: '#060606',
  },
  nav: {
    // Nav text color for each background theme set with data-nav-theme.
    // "light" background -> dark text. "dark" background -> light text.
    // PLACEHOLDER: light text color not chosen yet; using the page background.
    textColor: {
      light: '#060606',
      dark: '#f8f8f8',
    },
    // Color crossfade when the theme changes (seconds).
    // PLACEHOLDER: not specified in design.
    colorDuration: 0.3,
  },
};
