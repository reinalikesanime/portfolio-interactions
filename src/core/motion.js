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
  thumbFade: {
    // Hover crossfade on project thumbnails (approved 2026-11-14: fade, 0.6s).
    duration: 0.6,
    // Gentle slow-down at the end.
    ease: 'power2.out',
    // Touch devices: play once when this much of the thumbnail is on screen
    // ("center bottom" = the image's middle reaches the bottom of the screen).
    touchStart: 'center bottom',
  },
  heroIntro: {
    // Page-load fade-in of the hero text, then the "SCROLL FOR WORKS" cue
    // (approved 2026-11-17: "gently fade in"). Opacity only, no movement.
    // PLACEHOLDER timings: not specified in design.
    duration: 1.2,
    ease: 'power2.out',
    cueDelay: 0.4, // cue starts this long after the hero text
    maxFontWait: 1, // seconds to wait for web fonts before fading in anyway
  },
  arrowGrow: {
    // Hero arrows grow into their full shape as the page scrolls
    // (approved 2026-11-17). Stems lengthen downward, heads ride the tips.
    // PLACEHOLDER values: not specified in design.
    // Arrows start invisible at the top of the page (Reina, 2026-11-17): stems
    // grow from zero length and the heads fade in over the first part.
    startLength: 0, // stem length at the top of the page (share of full)
    headFadeIn: 0.15, // share of the growth over which the heads fade in
    scrollDistance: 300, // px of scrolling to reach full length
  },
  thumbZoom: {
    // Subtle zoom of the image inside a thumbnail on hover (approved
    // 2026-11-17), alongside any existing hover effect. Mouse/trackpad only.
    // PLACEHOLDER amount: "subtle" requested, exact value not specified.
    scale: 1.04,
    duration: 0.6, // matches the Artful fade
    ease: 'power2.out',
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
