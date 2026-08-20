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

## Validate and build

```bash
pnpm test
pnpm preview
```

There is one production build. `vite.config.mjs` reads the public base from
`deck.config.mjs`, so local previews and GitHub Pages use the same
`/cng-japan-2026/` artifact. Development remains at `/`.

`pnpm test` validates the source, builds the production artifact, and renders all
24 slides without waiting for external iframe traffic. Each slide is rendered in
both the light and dark colour schemes, because a component style can escape its
scope and blank the deck in one scheme while the other stays perfect. To check a
deployment:

```bash
pnpm smoke https://yharby.github.io/cng-japan-2026/
```

Export the 16-slide main talk to PDF:

```bash
pnpm export
```

## Repository structure

- `slides.md` defines the slide order and deck-level configuration.
- `deck.config.mjs` defines shared build, export, and QA constants.
- `slides/` contains individual slide sources and speaker notes.
- `components/` contains the Vue visualizations.
- `style.css` contains all global presentation styles.
- `public/` contains static images and logos.
- `scripts/` contains export, source validation, and the render smoke test.

## Deployment

Every push to `main` validates the source, builds the same artifact used locally,
renders all slides, and deploys it with GitHub Pages Actions. Hash routing keeps
deep links static-host friendly.
