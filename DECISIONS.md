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

## Pending decisions

- Landing project stack (reference: sai-ku.com): wipe vs. slide, card height, whether cards peek, scroll smoothing, card text, nav over cards, phone/tablet behavior.

- Smooth scrolling library (Lenis proposed): confirm once scroll designs are in.
- Page transitions: Barba.js vs. View Transitions API, once transition designs are in.
- Breakpoint values in `src/core/media.js`: match to Figma frames.
- Thumbnail method per project: decided one project at a time, starting with a pilot.
