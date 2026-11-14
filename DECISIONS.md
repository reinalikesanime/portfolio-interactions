# Implementation decisions

Technical decisions, with the reason and who approved them. Creative decisions belong to Reina and are not recorded as mine.

| Date | Decision | Reason | Approved |
|---|---|---|---|
| 2026-11-13 | Webflow Basic site plan, static pages, no CMS | Existing plan; edits go through Claude rather than Webflow's editor | Reina |
| 2026-11-13 | Project list in `src/projects.js` instead of CMS | Basic plan has no CMS; one place to order projects | Reina |
| 2026-11-13 | Motion lives in custom code; native Webflow Interactions only where clearly simpler (flagged when used) | Reina tweaks animations through Claude, not in Webflow directly | Reina |
| 2026-11-13 | GSAP from Webflow's hosted GSAP, not bundled | Avoids shipping two copies; free and hosted by Webflow | Proposed in plan |
| 2026-11-13 | Public GitHub repo `portfolio-interactions`, served via jsDelivr at pinned tags | Free CDN, versioned rollbacks | Reina |
| 2026-11-13 | Modules attached with `data-module`, lazy-started near viewport | Survives layout changes in Webflow; keeps initial load light | Proposed in plan |

## Pending decisions

- Smooth scrolling library (Lenis proposed): confirm once scroll designs are in.
- Page transitions: Barba.js vs. View Transitions API, once transition designs are in.
- Breakpoint values in `src/core/media.js`: match to Figma frames.
- Thumbnail method per project: decided one project at a time, starting with a pilot.
