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

To reproduce the GitHub Pages build locally, including the repository base path and excluding presenter notes:

```bash
pnpm build --base /cng-japan-2026/ --without-notes
pnpm preview
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
- `scripts/` contains deck validation and visual QA utilities.

## Deployment

Every push to `main` validates and builds the deck, then deploys the static SPA to GitHub Pages. The workflow uses the repository name as Slidev's base path, and Slidev uses hash routing so deep links work reliably on static hosting.
