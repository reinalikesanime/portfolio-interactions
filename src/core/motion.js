// Single source of truth for motion values (durations, easing, distances).
// Every module reads from here, so a request like "make the darkening subtler"
// is one change in one place.
//
// Values marked PLACEHOLDER have no Figma source yet and are waiting on Reina.

export const motion = {
  stack: {
    // How much of the next card shows at the bottom of the screen (px).
    // From Figma: cards offset by 214px in the 1440-wide frame.
    peek: 214,
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
