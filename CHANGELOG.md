# Changelog

## v0.2.0 (landing: hero + project stack, desktop)

- Webflow: nav (fixed), hero (Figma FINAL 1313:515 at 1440), project stack with 3 gray placeholder cards.
- Fonts: Switzer via Fontshare API; Redaction 10 via Fontsource/jsDelivr (OFL). Loaded in site head.
- `project-stack` module: pinned full-screen stack; next card slides up 1:1 with scroll; covered card darkens; following card moves into the 214px peek. Keyboard focus scrolls to the focused card. Reduced motion: plain vertical list.
- `nav-theme` module: per-section `data-nav-theme="light|dark"`; nav text switches between palette colors.
- Tested headless at 1440x900: card positions at each scroll step, darkening, nav switching, focus, reduced motion, no console errors.
- Placeholders awaiting design: darkening amount (0.5), light nav color (#f8f8f8), nav color fade (0.3s), card content, project links, nav link targets.

## v0.1.0 (setup)

- Project scaffold: Vite build to a single IIFE file, module loader, media conditions, empty motion settings, empty project list.
- Webflow footer loader snippet with live mode (pinned commit + integrity hash) and per-browser preview mode.
- Webflow: loader snippet installed in site footer custom code; GSAP Core, ScrollTrigger and SplitText enabled in Site Settings.
- No design work implemented.

## Outstanding

- Site not yet published: the loader can't be checked live until a publish (needs Reina's go-ahead).
