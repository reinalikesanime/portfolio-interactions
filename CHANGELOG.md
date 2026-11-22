# Changelog

## v0.8.2 — 2026-11-22

- Fix: page nav clicks were also handled by Webflow's built-in anchor scrolling, which pulled sections to the top of the screen (and could highlight the wrong title). Webflow's handler is now blocked for page nav links.
- Any section that fits on screen now lands centered (was: only sections under 70% of the screen height). Sections taller than the screen put their heading at eye level (30% down).

## v0.8.1 — 2026-11-22

- Page nav clicks now land the section at eye level instead of flush to the top (Reina): sections that fit on screen are centered; taller ones put their heading about 30% down the screen. The highlight line moved to 45% to match, so the clicked title is always the one that lights up.

## v0.8.0 — 2026-11-22

- New Artful work page (/artful), built from Figma node 1398:2. Image areas are gray placeholders as designed; text is the Figma copy.
- Artful thumbnail and title on the homepage now open the page (tile wrapped in a link; hover effects unchanged).
- Load fade-in: title block first, then the page nav + content (same timing as the homepage).
- PAGE NAV stays fixed while scrolling (sticky, 64px from the top). The current section's title turns semibold and fully opaque with a 0.3s fade; others stay at 60%. Clicking a title scrolls smoothly to its section (instant with reduced motion) and updates the address (#research etc.).
- VIEW NEXT: MEDIPAL is in place but not linked yet (no MediPal page).
- Head: Switzer 700 added (bold phrase in Context & Challenge).

## v0.7.0 — 2026-11-17

- Twitch: Redesign and WoofWatch thumbnails now show Reina's Figma frame (phone on its start screen) and play her screen recording on hover, over the phone screen with rounded corners; looping. Leaving stops it and returns to the start screen. Touch: plays while on screen.
- Videos are Reina's original recordings, only resized to 354x770 and with audio removed (no smoothing, no loop blend — per Reina).
- The video stays hidden until it is actually playing, so the still is always the Figma export.
- Hover zoom now scales the whole thumbnail stage, so phone and video stay aligned.
- Removed the old static phone mockups from tiles 2 and 3.

## v0.6.0 (arrows start invisible + thumbnail hover zoom)

- Arrows updated to Figma's thinner version (1px stems, smaller heads; SVG 171x40 at -2.91px).
- `arrow-grow`: arrows start invisible (stem length 0), heads fade in over the first 15% of growth; full shape at 300px of scroll.
- `thumb-zoom` module (selector `.project-tile-media`): hover/focus zooms the image(s) inside to 104% (0.6s, power2.out), back on leave; runs alongside the Artful fade. Mouse/trackpad only; skipped on touch and reduced motion; tiles without images skipped.
- Tested headless: arrow geometry/visibility at 0/20/45/150/300px, fade + zoom together, caption hover ignored.

## 2026-11-17 (Webflow only): navbar scrolls with the page

- `.site-nav` position fixed -> absolute: the navbar (name + links) sits 64px from the top of the page and scrolls away with the hero. The `nav-theme` module still runs but has no visible effect now.

## v0.5.0 (hero fade-in + growing arrows)

- `hero-intro` module: on load, hero text fades in (1.2s, power2.out), then the "SCROLL FOR WORKS" cue 0.4s later. Waits up to 1s for web fonts. Site head hides both blocks via `html.js-intro` until then; failsafe removes the class after 4s if the script never loads. Reduced motion: shown immediately.
- `arrow-grow` module: splits each arrow into stem + head; over the first 300px of scrolling, stems grow from 30% to full length (top anchored) and heads ride the tips. Reverses on scroll up. Reduced motion: full arrows.
- Loader: modules can attach by CSS selector (`selector` property), since some original Webflow elements reject attribute edits.
- Tested headless: fade timing, arrow geometry at 0/150/300/600px and scrolling back, reduced motion; no errors.

## 2026-11-17 (Webflow only): landing page redesign, round 3

- From Figma FINAL 1313:515 (updated): nav name semibold; hero block at 266px, headline 68px / 885px wide (kept "A multidisciplinary"), subtitle 24px; new "SCROLL FOR WORKS" label + new arrows at 614px; grid bottom padding 101px; descriptions Switzer Light (300 added to font loading).
- Thumbnail 1 (Artful): unchanged, hover fade kept.
- Thumbnail 2 (Twitch: Redesign): video + purple stage removed; static iPhone mockup (Figma 1369:1273 at 2x incl. shadow) on #EEE. thumb-video module and video files kept in repo, unused.
- Thumbnail 3 (WoofWatch): static phone mockup (Figma 1369:1334 at 2x incl. shadow) on #EDEDED.
- Thumbnail 4: #EEE placeholder; caption duplicates Artful as in Figma.
- Verified live at 1440x900 against Figma positions; no console errors.

## v0.4.0 (second thumbnail: prototype video on hover)

- `thumb-video` module: video rests on its first frame; hover (image only) or keyboard focus plays it from the start, looping; leaving pauses and resets to the first frame. Touch: plays while at least half on screen, resets when scrolled away. Reduced motion on touch: stays on first frame. Lazy: starts loading near the viewport.
- Video `assets/thumbnails/thumb2-prototype.mp4` (16s, 60fps, 324x704, 918 KB) from the 2026-11-14 6:13 PM recording: Figma's prototype only updated the scroll every 2-4 frames (jump-and-hold judder). Fixed by dropping held frames and motion-interpolating to 60fps (scene-cut detection keeps instant screen changes clean). Ends with a 0.4s crossfade into the exact first frame for a seamless loop. Poster: `thumb2-prototype-poster.jpg`.
- Served from jsDelivr (Webflow can't host plain video files).
- Webflow: tile 2 = purple stage (#843EFD), phone mockup (Figma 1356:1191 at 2x, asset thumb2-phone.png), video in the screen area (left 4%, top 1.6%, 91% x 96.7%, radius 16.8%/7.7%; sized ~0.5px past the green edge, verified 0 green pixels at 4x), CSS dynamic island (#0D0D0D).

## 2026-11-14 (Webflow only): Artful thumbnail images v2

- Swapped the first tile's images to Figma 1343:487 (default) and 1343:494 (hover), exported at 2x as artful-thumb-default-v2 / artful-thumb-hover-v2. Picture frame now stays the same size between states. The v1 assets remain in the Webflow asset library.

## v0.3.1 (Artful thumbnail live)

- Hover now limited to the image (caption no longer triggers it). Mouse-out fade confirmed.
- `thumb-fade` can be attached to the hover image itself (Webflow rejected attribute edits on the original tile elements).
- Webflow: Artful images uploaded as assets (Figma 1332:420 / 1332:424 at 2x, 1332x900 JPG) and stacked in the first tile.

## v0.3.0 (thumbnail hover fade: Artful)

- `thumb-fade` module: two stacked images per thumbnail; hover or keyboard focus fades the hover image in over 0.6s (power2.out), leaving fades it out. Touch devices: fades in once when the thumbnail's middle reaches the bottom of the screen.
- Settings in `motion.thumbFade`.
- Tested headless: mouse hover in/out, keyboard focus, touch (390x844) scroll-in, with Webflow's overwrite setting reproduced.

## 2026-11-14 (Webflow only): thumbnail grid update

- From updated Figma (grid 1332:391): 30px column/row gaps, 40px left margin, 20px between image and caption.
- Caption is now stacked: title (Switzer semibold, #060606) over a description (regular, #060606 at 60%, max 595px wide). Year removed; class renamed project-tile-year -> project-tile-description.
- Placeholder copy from Figma: "ARTFUL" / "Tangible IoT design for intergenerational connection." on all four tiles.

## 2026-11-14 (Webflow only, no code change): thumbnail grid

- Replaced the project stack with a 2-column thumbnail grid from Figma: 4 tiles, gray 666x450 media placeholder, caption row (title Switzer semibold 20px left, year regular right), 23px gaps, 39/40px side margins.
- Hero height 890 -> 826px to match the new frame.
- Added Switzer 600 to the font loading. Removed the stack's Webflow classes.
- Grid sizing is fluid: tiles keep the 666:450 shape at other widths (tablet/phone layouts still on hold).

## v0.2.2 (project stack: clear screen when you arrive)

- Removed the resting 214px peek so each card fills the whole screen when reached; the next card rises from the bottom edge to cover it (Reina's choice after reviewing staging).

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
