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

Each browser window keeps its own audience language. For a bilingual room, open
all three views in the same browser profile and advance the deck from presenter
mode:

```text
Presenter:         http://localhost:3030/?lang=en#/presenter/
English audience:  http://localhost:3030/?lang=en#/1
Japanese audience: http://localhost:3030/?lang=ja#/1
```

The published equivalents are:

```text
https://yharby.github.io/cng-japan-2026/?lang=en#/presenter/
https://yharby.github.io/cng-japan-2026/?lang=en#/1
https://yharby.github.io/cng-japan-2026/?lang=ja#/1
```

The on-slide selector can also change either audience window independently.
Slidev presenter mode synchronizes the slide and click state while the two
audience windows retain their independent language choices. Two ordinary
audience tabs do not control each other; the presenter view is the controller.
Audience-facing titles, subtitles, and diagrams support English and Japanese;
presenter scripts in the speaker notes are English-only.

Slides 1–19 form the main narrative, slides 20–27 are optional appendix depth,
and slide 28 closes with Q&A and one publishing action.

## Validate and build

```bash
pnpm test
pnpm preview
```

There is one production build. `vite.config.mjs` reads the public base from
`deck.config.mjs`, so local previews and GitHub Pages use the same
`/cng-japan-2026/` artifact. Development remains at `/`.

`pnpm test` validates the source, builds the production artifact, and renders all
28 slides without waiting for external iframe traffic. Each slide is rendered in
English and Japanese, in both the light and dark colour schemes, and the test
verifies presenter-to-audience synchronization without merging the two audience
locales. This catches translation overflow as well as a component style escaping
its scope and blanking only one theme. To check a deployment:

```bash
pnpm smoke https://yharby.github.io/cng-japan-2026/
```

Export the complete 28-slide presentation to English, Japanese, or both PDFs:

```bash
pnpm export:en
pnpm export:ja
pnpm export:all
```

The generated files are `dist/cng-japan-2026.pdf` and
`dist/cng-japan-2026-ja.pdf`. The `dist/` directory is not committed.

## Repository structure

- `slides.md` defines the slide order and deck-level configuration.
- `deck.config.mjs` defines the main-narrative boundary, closing-slide position, click budget, and shared build, export, and QA constants.
- `slides/` contains individual slide sources and speaker notes.
- `components/` contains the Vue visualizations.
- `composables/useDeckLocale.ts` owns the per-window language state.
- `docs/data-license-audit.md` records which real datasets may be converted or republished and under what conditions.
- `global-top.vue` provides the audience language selector.
- `style.css` contains all global presentation styles.
- `public/` contains static images, official CARTO and Portolan marks, the official STAC artwork, and the original generated STAC hero and Choice Chaos comic illustrations.
- `scripts/` contains export, source validation, and the render smoke test.

The Portolan mark follows the current solid two-pennant implementation from the
project website. Generic interface glyphs use the open-source Lucide collection
through Slidev's Iconify integration; explanatory geometry remains bespoke. The
Fields of the World mark is reused under CC BY-SA 4.0 from the project's website
repository.

## Deployment

Every push to `main` validates the source, builds the same artifact used locally,
renders all slides, and deploys it with GitHub Pages Actions. Hash routing keeps
deep links static-host friendly.
