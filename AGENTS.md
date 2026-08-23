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

## Current Technical Baseline
- These facts were verified against the upstream projects on 21 August 2026; recheck them before changing version labels or command examples.
- Portolan Spec is **v0.1.2** and remains pre-1.0. The released manifest contains **128 requirements: 106 validator-enforced and 22 process-enforced**.
- STAC **1.1.0** is the object-model baseline. Use the official STAC artwork stored as `public/stac-logo.png`; its upstream source is `https://stacspec.org/public/images-original/STAC-04.png`.
- The data-publisher CLI examples follow the released **portolan-cli v0.7.0** workflow. PyPI currently selects v0.7.0 as stable, while **v1.0.0a0** is explicitly alpha.
- Keep the publisher flow concrete: `init` → `add` → `check --fix` → `push`; use `sync` for the later publisher-controlled update round trip.
- Do not present CLI automation as removing publisher responsibility. The publisher still controls source data, metadata, credentials, destination, update timing, review, and release decisions.

## Main Narrative (slides 1–19, then slide 26)
1. Cover: exact agenda title, event, speaker, CARTO identity.
2. Minimal bio: portrait, role, email.
3. Legacy files: a small subset can require downloading the whole CSV/GeoTIFF.
4. Object storage + HTTP byte ranges let clients read less.
5. Distinguish federation, result exchange, and persistent-data decoupling: FDW and ADBC improve interoperability, while Parquet and GeoParquet give vector/table data an engine-independent contract.
6. GeoParquet + COG make practical partial reads for vector and raster data.
7. Open files alone do not provide catalog discovery or metadata.
8. Use one short comic-relief beat: an original catalog superhero introduces STAC as linked JSON that organizes scattered assets without moving them.
9. STAC organizes Catalog → Collection → Item → Asset using linked JSON.
10. Turn the joke into the central tension: STAC is deliberately flexible and extensible, but the core standard does not enforce one operational publishing playbook.
11. Portolan combines those existing pieces into a publishing practice.
12. STAC describes data; Portolan defines layout, access, docs, provenance, and hosting rules.
13. One publication serves software, people, and AI agents.
14. Open toolchain: show the replaceable implementation pieces.
15. Ten skills: inventory the supporting capabilities after the open toolchain is understood.
16. Show the community screenshot proving that one prompt plus Portolan skills produced the Git-backed Harmonized Field Boundary Data catalog.
17. Use that same catalog for the AI-agent question: follow only the three linked Collections, inspect metadata, plan a query, compute with DuckDB, and report sources and limits.
18. Show the verified DuckDB count across those three explicit latest GeoParquet assets and distinguish the computed result from model planning.
19. Compare a horizontal static-first portal architecture with a service-first portal, then make remaining publishing, operational, and governance work explicit.
26. Close with Q&A and one action: publish one dataset using open files, stable URLs, and checkable rules.

## Appendix
- The appendix is intentionally ordered from evidence to implementation detail:
  20. Live catalog: open the same Harmonized Field Boundary Data publication shown on slide 16.
  21. Publisher CLI: show how file and service inputs become one checked static catalog, then show the released publish and update commands.
  22. Rashid checklist: show how people, CI, and AI agents run the same deterministic checks while publishers retain process judgment.
  23. Current scope: separate implemented validation from roadmap formats.
  24. CARTO SDI interface: click through six continuous steps covering the publisher overview, datasets, grants, usage, quality, and governance.
  25. CARTO SDI catalog browser: click through catalog selection, dataset discovery, map exploration, and AI-assisted questions using the latest `dev` interface.
- Keep appendix slides between the 19-slide main narrative and the final closing slide. `deck.config.mjs` defines both the main narrative boundary and the closing-slide position for validation.
- All export commands include the complete 26-slide presentation, including the appendix. Do not restore an `--range` restriction in `scripts/export.mjs`.
- Do not move product inventories or install instructions into the main story unless talk duration changes.
- Do not delete a main slide merely to shorten the talk. First consolidate repeated claims inside its visualization or speaker notes; delete only when the slide has no distinct narrative job.

## Source Layout
- `slides.md`: deck configuration and definitive slide order.
- `deck.config.mjs`: shared deployment base, main-slide boundary, click budget, and output paths.
- `vite.config.mjs`: applies the shared base to production builds and previews while keeping development at `/`.
- `slides/`: one Markdown source per slide, including speaker notes and `[Sources]` blocks.
- `components/`: Vue visualizations; most use Slidev `useNav()` for click states.
- `composables/useDeckLocale.ts`: per-window English/Japanese state and URL persistence.
- `global-top.vue`: language selector shared by audience views.
- `style.css`: the single global palette, typography, and layout entrypoint.
- `public/`: static logos, portrait, and QR assets.
- `scripts/`: export, source validation, and the all-slide render check.
- `docs/data-license-audit.md`: reuse, conversion, attribution, and republication status for real datasets shown in the deck.
- `og-image.png`: committed social preview generated from the cover.

## Editorial Rules
- Use simple, literal titles that state the slide's claim; avoid slogans and clichés.
- Keep one idea per slide and reveal causality left-to-right.
- Preserve the vector/raster parallel where it explains the same access problem.
- Keep Japanese subtitles readable and consistent; they support rather than replace English titles.
- Keep presenter scripts English-only. Do not add `[Say in Japanese]` blocks; Japanese remains audience-facing in subtitles, diagrams, and localized deck views.
- Keep slide 8 playful but original. Do not replace its generated hero with Superman or another recognizable copyrighted character or emblem; keep the official STAC artwork as a separate, accurate asset.
- On slide 10, use the original split-screen STAC hero versus Choice Chaos jester to personify flexibility and its operational downside. Do not replace them with Superman, Batman's Joker, or another recognizable copyrighted character.
- On slide 10, acknowledge that STAC publishes best-practice guidance. The gap is not “no best practices”; it is that the core standard does not enforce one layout, access pattern, hosting model, or operational playbook.
- Never call the five goals “ideologies.”
- Treat the Harmonized Field Boundary Data catalog as a community publication, not a CARTO deployment or an AI-generated dataset.
- Its root has no blanket data license. Preserve each linked Collection's provider, license, attribution, CRS, and provenance.
- Do not claim servers disappear; object storage, CDN, IAM, DNS, monitoring, and publishing jobs still exist.
- Slide 19 is the architecture and honesty checkpoint. Preserve its horizontal arrows: source → publish job → object storage/open assets → STAC → clients, with optional compute branching on demand. Contrast that with files/database → GIS server → gateway → APIs/tiles → clients.
- On slide 19, say that the query path can shrink; never imply that infrastructure or human accountability disappears.
- Keep factual claims source-backed in speaker notes; preserve the `[Sources]` section format.
- Public access is not license clearance. Only Green sources from `docs/data-license-audit.md` may appear as conversion, reuse, or pilot examples. Before proposing one, verify the exact asset or STAC collection license, upstream providers, attribution, modification notice, and commercial-use terms.
- Keep illustrative filenames visibly distinct from real downloadable assets. Do not infer a data license from a software repository license, a host, or a logo.
- Data licenses do not grant trademark rights. Keep organization names typographic unless authorized logo use is documented.
- Do not restore the obsolete bio, old email, or old role.

## Visual Rules
- Canvas is 16:9; validate at 1280×720 and presentation distance.
- Use the existing navy, red, green, and neutral variables in `style.css`.
- Prefer diagrams, flows, and restrained cards over dense bullet lists.
- One dominant headline; avoid duplicate titles or competing callouts.
- Use `v-click` states to reveal a sequence, not decoration.
- Reuse existing components and assets before creating new visual systems.
- When a component reads `$clicks` through `useNav()`, keep the matching `clicks:` count in the slide frontmatter. The opening frame may be intentionally muted; visually inspect the final revealed state as well.

## Common Changes
- Add a slide: create `slides/NN-name.md`, create/reuse a component, then add a `src` entry in `slides.md`.
- Remove a slide: remove its `src` entry first; delete files only if they are no longer referenced.
- Reorder slides only in `slides.md`; then update the narrative list and main-slide count here if needed.
- If the main talk count or click budget changes, update it once in `deck.config.mjs`.
- Keep repository-relative/public asset paths compatible with the `/cng-japan-2026/` Pages base.

## Commands and QA
- Install: `pnpm install` (Node >=20.19, pnpm version pinned in `package.json`).
- Develop: `pnpm dev`; public deck is `/`, presenter mode is `/#/presenter/`.
- Validate source: `pnpm validate`.
- Production/Pages build: `pnpm build`.
- Preview production: `pnpm preview`; Vite uses the same base as the build.
- Render check: `pnpm smoke`, or `pnpm smoke <url>` against a deployment.
- Full check: `pnpm test` runs validate, build, and smoke.
- Export the full English presentation: `pnpm export` or `pnpm export:en`.
- Export the full Japanese presentation: `pnpm export:ja`; export both complete 26-slide presentations: `pnpm export:all`.
- Before committing, require `pnpm test` and visual inspection of changed slides.
- Do not override the production base on the command line. `deck.config.mjs` is the source of truth.
- Restart `pnpm preview` after rebuilding; a preview is a view of one completed static artifact.
- Browser QA must use hash routes, `/#/<n>?clicks=<k>`.
- `pnpm smoke` walks every slide in English and Japanese, in both light and dark. Never drop any pass.
- Do not pair `:global(...)` with a descendant selector inside a scoped `<style>`. Vue keeps only
  the `:global()` argument and drops the rest, so a rule meant for one element lands on `html`.
  `:global(html.dark) .carto-logo` compiled to bare `html.dark` and painted the whole deck white.
  Put ancestor-conditioned rules such as `html.dark .thing` in a plain unscoped `<style>` block.

## Deployment
- `.github/workflows/deploy.yml` deploys every push to `main` via GitHub Pages Actions.
- Do not commit `dist/` or use a `gh-pages` branch.
- The workflow runs the same `pnpm build` used locally; the shared config supplies the Pages base and includes presenter notes for the published presenter view.
- Keep `routerMode: hash`; it makes deep links reliable on static GitHub Pages hosting.
- Keep Pages permissions limited to `contents: read`, `pages: write`, and `id-token: write`.
- Keep the smoke step in the workflow. It asserts the configured base, same-origin assets, mounted app, visible slide geometry, an unfiltered root element, and a non-blank screenshot, in light and dark.
- Keep the DOMPurify override until upstream ranges are patched. Keep the scoped `pptxgenjs@4.0.1>image-size` removal override while PPTXGenJS declares that unused, archived dependency; reassess it when upgrading PPTXGenJS.
