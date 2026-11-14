# Changelog

## v0.2.1 (fix: project stack on the live site)

- Live-site bug: Webflow's GSAP Interactions set a global overwrite:'auto', which cancelled the third card's second movement, so the last transition never ran. Also: after a window resize, cards waiting their turn kept their old positions.
- Fix: card positions and darkening are now computed directly from scroll progress instead of tweened. Same result whether scrolling down, back up, jumping or resizing; unaffected by Webflow's GSAP settings.
- Tested headless with Webflow's overwrite setting reproduced: all scroll steps, scroll back, resize mid-scroll, focus, reduced motion.

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
