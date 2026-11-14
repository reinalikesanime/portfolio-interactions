# portfolio-interactions

Custom interaction and animation code for the Reina Perez portfolio. The site itself (layout, styles, content) lives in Webflow; this repo holds only the motion and behavior layer.

## How it fits together

- **Webflow** owns structure, styles, variables and content (Basic site plan, so static pages, no CMS).
- **GSAP** comes from Webflow's hosted GSAP (Site Settings), used here as `window.gsap`. Not bundled.
- **This repo** builds one file, `dist/portfolio.js`, served from jsDelivr pinned to a commit id.
- Elements opt in with `data-module="name"`; `src/core/loader.js` starts the matching module.
- All motion values live in `src/core/motion.js`.
- Project order and next/previous navigation come from `src/projects.js`.

## Structure

```
src/
  main.js            entry: waits for DOM, starts modules
  core/loader.js     data-module discovery, lazy start via IntersectionObserver
  core/media.js      breakpoints, hover capability, reduced motion (gsap.matchMedia)
  core/motion.js     motion values (durations, easing, distances)
  modules/           one file per interaction; registered in modules/index.js
  thumbnails/        one module per animated project thumbnail
  projects.js        project list
webflow-loader.html  the snippet installed in Webflow's site footer
```

## Workflow

```
npm install
npm run dev      # local dev server on :5173 (enable with localStorage 'pi-dev')
npm run build    # outputs dist/portfolio.js
```

Release: build, commit `dist/`, push, then update `REF` (commit id) and `SRI` (sha384 hash) in the Webflow footer snippet. Releases are pinned by commit id; version numbers are recorded in CHANGELOG.md.

See `DECISIONS.md` for implementation decisions and `CHANGELOG.md` for completed work.
