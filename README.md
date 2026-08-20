# Portolan: An SDI Without Servers

Slidev source for Youssef Harby's presentation at Cloud Native Geospatial Japan 2026, held at JAMSTEC Yokohama on 24 August 2026.

The published presentation is available at:

https://yharby.github.io/cng-japan-2026/

## Local development

Requirements:

- Node.js 20.19 or newer
- pnpm 11.22.0 (declared in `package.json`)

Install dependencies and start Slidev:

```bash
pnpm install
pnpm dev
```

Slidev opens the public presentation at `http://localhost:3030/`. Presenter mode is available at `http://localhost:3030/#/presenter/`.

## Validation and builds

```bash
pnpm validate
pnpm build
pnpm preview
```

`pnpm preview` reads the base path out of `dist/index.html` and serves the build
there, so the preview URL always matches what was built. Serving a base-prefixed
build at `/` is what produces a blank white page with no error.

To reproduce the GitHub Pages build locally, including the repository base path
and excluding presenter notes:

```bash
pnpm build:pages
pnpm preview
```

`pnpm smoke` renders every slide of the current `dist/` in a headless browser and
fails if a slide comes up blank or an asset 404s. `pnpm test` runs validate,
build, and smoke together. Point it at a deployment to check the live site:

```bash
pnpm smoke https://yharby.github.io/cng-japan-2026/
```

Export the 16-slide main talk to PDF:

```bash
pnpm export
```

## Repository structure

- `slides.md` defines the slide order and deck-level configuration.
- `slides/` contains individual slide sources and speaker notes.
- `components/` contains the Vue visualizations.
- `styles/` contains the shared presentation styles.
- `public/` contains static images and logos.
- `scripts/` contains deck validation, the render smoke test, and visual QA utilities.

## Deployment

Every push to `main` validates the source, builds the deck, renders the built
artifact in a headless browser, then deploys the static SPA to GitHub Pages and
renders the live site once more. The workflow uses the repository name as
Slidev's base path, and Slidev uses hash routing so deep links work reliably on
static hosting.
