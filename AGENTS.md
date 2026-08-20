# AGENTS.md

## Purpose
- This repository contains Youssef Harby's Slidev talk for Cloud Native Geospatial Japan 2026.
- Event: JAMSTEC Yokohama, 24 August 2026.
- Exact title: **Portolan: An SDI Without Servers**.
- Speaker identity: **Youssef Harby — Software Engineer at CARTO — youssef@carto.com**.
- Public site: `https://yharby.github.io/cng-japan-2026/`.

## Core Positioning
- Portolan does not replace existing standards and is not a new data format.
- Describe it as an **opinionated, checkable STAC publishing profile and practice**.
- It combines existing open standards, formats, protocols, and infrastructure.
- Use **publish · update · use** as the lifecycle language.
- The five design goals are **AI-FIRST · EASY TO IMPLEMENT · SCALABLE · LOW COST · SOVEREIGN**.
- Treat these as design goals, not guaranteed outcomes.
- Prefer “lower operating cost” and “sovereign deployment” in explanations.
- Portolan reduces always-on infrastructure; publishing, governance, and operations remain.

## Main Narrative (slides 1–16)
1. Cover: exact agenda title, event, speaker, CARTO identity.
2. Minimal bio: portrait, role, email.
3. Legacy files: a small subset can require downloading the whole CSV/GeoTIFF.
4. Object storage + HTTP byte ranges let clients read less.
5. GeoParquet + COG make practical partial reads for vector and raster data.
6. Open files alone do not provide catalog discovery or metadata.
7. STAC organizes Catalog → Collection → Item → Asset using linked JSON.
8. Independent Japanese examples show the building blocks already work.
9. Portolan combines those existing pieces into a publishing practice.
10. STAC describes data; Portolan defines layout, access, docs, provenance, and hosting rules.
11. One publication serves software, people, and AI agents.
12. Publishing rules are machine-checkable; Rashid validates conformance.
13. Show the Japanese field-boundary catalog example.
14. Be explicit about remaining infrastructure and publishing work.
15. Invite a small Japanese pilot.
16. Close with one action: publish one dataset using open files, stable URLs, and checkable rules.

## Appendix
- Slides 17–24 contain toolchain, scale examples, live catalog, skills, install/scope details, and HTTP background.
- Keep appendix slides after the 16-slide talk; `package.json` exports only slides 1–16.
- Do not move product inventories or install instructions into the main story unless talk duration changes.

## Source Layout
- `slides.md`: deck configuration and definitive slide order.
- `slides/`: one Markdown source per slide, including speaker notes and `[Sources]` blocks.
- `components/`: Vue visualizations; most use Slidev `useNav()` for click states.
- `styles/`: global palette, bilingual typography, and slide CSS.
- `public/`: static logos, portrait, and QR assets.
- `scripts/`: source validation and optional visual QA utilities.
- `og-image.png`: committed social preview generated from the cover.

## Editorial Rules
- Use simple, literal titles that state the slide's claim; avoid slogans and clichés.
- Keep one idea per slide and reveal causality left-to-right.
- Preserve the vector/raster parallel where it explains the same access problem.
- Keep Japanese subtitles readable and consistent; they support rather than replace English titles.
- Never call the five goals “ideologies.”
- Never imply the Japanese examples are Portolan deployments.
- Do not claim servers disappear; object storage, CDN, IAM, DNS, monitoring, and publishing jobs still exist.
- Keep factual claims source-backed in speaker notes; preserve the `[Sources]` section format.
- Do not restore the obsolete bio, old email, or old role.

## Visual Rules
- Canvas is 16:9; validate at 1280×720 and presentation distance.
- Use the existing navy, red, green, and neutral palette in `styles/palette.css`.
- Prefer diagrams, flows, and restrained cards over dense bullet lists.
- One dominant headline; avoid duplicate titles or competing callouts.
- Use `v-click` states to reveal a sequence, not decoration.
- Reuse existing components and assets before creating new visual systems.

## Common Changes
- Add a slide: create `slides/NN-name.md`, create/reuse a component, then add a `src` entry in `slides.md`.
- Remove a slide: remove its `src` entry first; delete files only if they are no longer referenced.
- Reorder slides only in `slides.md`; then update the narrative list and main-slide count here if needed.
- If the main talk count changes, update the export `--range` in `package.json` and click budget in `scripts/validate-deck.mjs`.
- Keep repository-relative/public asset paths compatible with the `/cng-japan-2026/` Pages base.

## Commands and QA
- Install: `pnpm install` (Node >=20.19, pnpm version pinned in `package.json`).
- Develop: `pnpm dev`; public deck is `/`, presenter mode is `/#/presenter/`.
- Validate source: `pnpm validate`.
- Production build: `pnpm build`.
- Reproduce Pages: `pnpm build --base /cng-japan-2026/ --without-notes`.
- Preview production: `pnpm preview`.
- Export main talk: `pnpm export`.
- Before committing, require `pnpm validate`, a successful Pages-base build, and visual inspection of changed slides.

## Deployment
- `.github/workflows/deploy.yml` deploys every push to `main` via GitHub Pages Actions.
- Do not commit `dist/` or use a `gh-pages` branch.
- The workflow builds with `/${{ github.event.repository.name }}/` and excludes presenter notes.
- Keep `routerMode: hash`; it makes deep links reliable on static GitHub Pages hosting.
- Keep Pages permissions limited to `contents: read`, `pages: write`, and `id-token: write`.
- Keep the DOMPurify override until upstream ranges are patched; monitor the unpatched `image-size` alert inherited through PPTXGenJS.
