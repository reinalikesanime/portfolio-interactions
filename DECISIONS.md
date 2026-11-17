# Implementation decisions

Technical decisions, with the reason and who approved them. Creative decisions belong to Reina and are not recorded as mine.

| Date | Decision | Reason | Approved |
|---|---|---|---|
| 2026-11-13 | Webflow Basic site plan, static pages, no CMS | Existing plan; edits go through Claude rather than Webflow's editor | Reina |
| 2026-11-13 | Project list in `src/projects.js` instead of CMS | Basic plan has no CMS; one place to order projects | Reina |
| 2026-11-13 | Motion lives in custom code; native Webflow Interactions only where clearly simpler (flagged when used) | Reina tweaks animations through Claude, not in Webflow directly | Reina |
| 2026-11-13 | GSAP from Webflow's hosted GSAP, not bundled | Avoids shipping two copies; free and hosted by Webflow | Proposed in plan |
| 2026-11-13 | Public GitHub repo `portfolio-interactions`, served via jsDelivr pinned to commit ids, with integrity hash | Free CDN, exact rollbacks; tag pushes are blocked from Claude's session, commit ids are equally fixed | Reina |
| 2026-11-13 | Preview via `pi-ref` browser flag loading any pushed commit, instead of a localhost dev server | Claude's dev server runs in the cloud, so Reina's browser can't reach localhost | Claude (technical) |
| 2026-11-13 | Modules attached with `data-module`, lazy-started near viewport | Survives layout changes in Webflow; keeps initial load light | Proposed in plan |

## Design clarifications (from Reina)

| Date | Item | Decision |
|---|---|---|
| 2026-11-13 | Hero headline copy | "A multidisciplinary designer with an inclusive approach." (Figma reads "An"; corrected in build) |
| 2026-11-13 | Text color | All text #060606, including the hero headline (Figma has it at #000000) |
| 2026-11-13 | Project stack motion | Physical stack: each card slides up over the previous one (not a wipe) |
| 2026-11-13 | Card size | Full screen |
| 2026-11-13 | Peeking | Next card peeks below the current one (Figma: 214px at 1440 wide). Superseded below. |
| 2026-11-13 | Scroll feel | Exact, moves 1:1 with the scrollbar, no smoothing (to confirm) |
| 2026-11-13 | Card text | Cards will carry text; designed with each thumbnail |
| 2026-11-13 | Nav | Always visible; color changes to stay legible over each background. Superseded 2026-11-17. |
| 2026-11-13 | Covered card | Darkens gradually as the next card slides over it |
| 2026-11-13 | Nav color method | Per card: each card marked light/dark, nav switches between palette colors |
| 2026-11-13 | Tablet/phone | On hold; build desktop first |
| 2026-11-13 | Clear screen when you arrive | Each card fills the whole screen (width and height) when reached; the next card rises from the bottom edge and covers it. No resting peek (peek: 0). |
| 2026-11-14 | Landing projects layout | Scrolling project stack replaced by a static 2x2 thumbnail grid (Figma FINAL 1313:515, grid 1332:391) so everything is visible at a glance. No interactions yet. `project-stack` module kept in the repo, unused, in case it's wanted later. |
| 2026-11-14 | Artful thumbnail hover | Crossfade from Figma 1332:420 to 1332:424, 0.6s. Touch devices: plays as the thumbnail scrolls into view. Mouse-out fades back (confirmed). Hover area: image only (confirmed). |
| 2026-11-14 | Second thumbnail | Figma 1348:1136 (purple 666x450) + phone mockup 1356:1191; recording replaces the green screen. Plays only on hover, otherwise first frame. Touch: plays while on screen (matches Artful). Dynamic island redrawn in CSS over the video (measured from Figma). |
| 2026-11-17 | Second thumbnail | Replaced by static Twitch mockup; no interactions on thumbnails 2-4 for now. Hover video retired (code kept). |
| 2026-11-17 | Hero fade-in | Hero text and scroll cue fade in gently on load (opacity only). Timings are placeholders (1.2s, cue +0.4s). |
| 2026-11-17 | Arrows grow on scroll | Arrows start invisible (Reina) and grow into their designed shape as the page scrolls. Placeholder: full at 300px of scroll. |
| 2026-11-17 | Nav position | Navbar stays at the top of the page and scrolls away (no longer pinned). |
| 2026-11-17 | Thumbnail hover zoom | Image inside each thumbnail zooms in subtly on hover, alongside existing effects. Placeholder: 104%, 0.6s. Hover devices only. |

## Pending decisions

- Light nav color for dark cards (chosen when cards are designed).
- Spacing below the grid (40px used; Figma frame ends before the grid does).

- Smooth scrolling library (Lenis proposed): confirm once scroll designs are in.
- Page transitions: Barba.js vs. View Transitions API, once transition designs are in.
- Breakpoint values in `src/core/media.js`: match to Figma frames.
- Thumbnail method per project: decided one project at a time, starting with a pilot.

## 2026-11-17 — Video thumbnails (Twitch: Redesign, WoofWatch)
- Reina: videos play on hover, with only the start screen as the static image.
- Reina: use the recordings she sent as-is; do not use the smoothed version. Encoded only for web (354x770, H.264, muted). No loop crossfade, so the loop jumps from last frame to start screen.
- Static image = Figma export of each tile frame (1364:1246, 1364:1261) at 2x. Video overlays the Figma content frame (Twitch 243.52,41 177x367.46; WoofWatch 244.05,32.05 177x385; radius 18.83px), object-fit cover like Figma's FILL.
- Video hidden until playing (implementation choice so the still always matches Figma exactly).
- Zoom applies to the whole .thumb-stage on video tiles.
