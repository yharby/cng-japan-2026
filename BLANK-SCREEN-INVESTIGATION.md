# Blank / white screen investigation

Handoff notes for the next agent. Repo: `cng-japan-2026`, a Slidev 52.19.0 deck
deployed to `https://yharby.github.io/cng-japan-2026/`.

Read the **Do not repeat these** section before touching anything. Most of the
obvious hypotheses are already eliminated with evidence.

---

## 1. Status

| Question | Answer |
| --- | --- |
| Is the live GitHub Pages site blank? | **No.** All 24 slides render. Verified repeatedly. |
| Is `pnpm dev` blank? | **No.** All 24 slides render. |
| Was there a real, reproducible white screen? | **Yes**, one. `pnpm preview` after a base-prefixed build. Root cause found and fixed. |
| Is there a second, still-unreproduced white screen? | **Open.** Reported as "flashes the slide, then goes white". Never reproduced in an automated clean browser. See section 5. |

---

## 2. Confirmed root cause, fixed

**`pnpm preview` served a base-prefixed build at `/`.**

`slidev build --base /cng-japan-2026/` bakes that prefix into every asset URL in
`dist/index.html`. A bare `vite preview` serves `dist` at `/`. So the documented
flow in `README.md` and `AGENTS.md`

```bash
pnpm build --base /cng-japan-2026/ --without-notes
pnpm preview
```

produced: every JS/CSS module 404s, `#app` stays empty, page is white, **no error
banner and the build still exits 0**.

Reproduction, before the fix:

```
[http 404] http://localhost:4174/cng-japan-2026/assets/index-UlXQ3Zi4.js
[http 404] http://localhost:4174/cng-japan-2026/assets/rolldown-runtime-hePW80VL.js
...
bodyTextLen: 0, appHtmlLen: 0
```

### The fix

| File | What it does |
| --- | --- |
| `scripts/dist-base.mjs` | `readBase(html)` pulls the base out of the entry `<script type="module" src>` in `dist/index.html`. |
| `scripts/preview.mjs` | `pnpm preview` reads that base and serves Vite's preview there. The preview URL can no longer disagree with the artifact. |
| `scripts/smoke.mjs` | Serves `dist` at its own base, walks all 24 slides over hash routes, fails on a blank slide or any same-origin 404. Also takes a URL to check a live deployment. |
| `package.json` | Added `build:pages`, `smoke`. `test` is now `validate && build && smoke`. |
| `.github/workflows/deploy.yml` | Smoke runs against the artifact before deploy, and against the live site after deploy. |

Commands now:

```bash
pnpm build:pages     # slidev build --out dist --base /cng-japan-2026/ --without-notes
pnpm preview         # serves at whatever base dist was built with
pnpm smoke           # render-check ./dist
pnpm smoke <url>     # render-check a deployment
pnpm test            # validate + build + smoke
```

---

## 3. Second bug found and fixed: QA scripts on the wrong routes

Commit `214f37c` added `routerMode: hash`. `scripts/sweep.mjs`,
`scripts/states.mjs`, and `scripts/overflow.mjs` still navigated to
`http://localhost:PORT/7?clicks=3`.

Under hash routing that path **silently serves slide 1** and screenshots it
happily. Every visual QA run since that commit was checking slide 1 twenty-four
times. Now fixed to `/#/7?clicks=3`.

If you write any new browser script for this deck: **the route lives after the
hash.** `${base}/#/${n}?clicks=${k}`.

---

## 4. Do not repeat these

Every row was actually run. None of them reproduced a blank screen. Re-running
them is wasted time.

| Hypothesis | How it was tested | Result |
| --- | --- | --- |
| A specific slide is broken | All 24 slides, `#/1`..`#/24`, on dev + live Pages | All render, 177–707 chars of text each |
| Deep links break on static hosting | `/`, `/2`, `/#/2`, `/#/overview`, `/#/presenter/1`, `/#/print`, `/index.html`, `/print` | All render. Already fixed by `routerMode: hash` in `214f37c` |
| `transition: view-transition` blanks the deck | 40 ArrowRight steps through the deck on live Pages | 0 blanks, hash advanced correctly every step |
| View transitions unsupported (Firefox / old Safari) | Read `@slidev/client/composables/useViewTransition.ts` | **Slidev guards it** with `'startViewTransition' in document` and falls back. Not a bug. My first stub test was a false positive because it left the key present with an `undefined` value, which the guard cannot catch. Do not re-test this by stubbing. |
| Broken asset base on Pages | `grep` of `dist/assets/*.js` for public paths | Vite rewrites SVG `<image href="/x.svg">` correctly to `/cng-japan-2026/x.svg`. No bare root paths survive the build |
| Screen size / resolution | 16 viewport+DPR combos: 1280×720@1x/2x, 1440×900@2x, 1512×982@2x, 1728×1117@2x, 2560×1440@2x, 3024×1964@2x, 3840×2160@2x, 1920×1080@1x, 1024×640@2x, 800×600, 640×360, 500×300, 380×700@3x, 2560×700@2x, 900×1600@2x | `--slidev-slide-scale` stayed sane (0.31–3.91) everywhere. No collapse |
| Live window resizing | Real OS window driven over CDP `Browser.setWindowBounds` through 11 sizes plus a 25-step rapid resize storm | No blank, no scale collapse |
| GPU compositing | Chrome launched with `--enable-gpu --use-angle=metal --enable-gpu-rasterization`, and with software rendering | Identical, stable output |
| Delayed whiteout | 30-second watch at 500ms intervals, sampling text length, `#app` children, `--slidev-slide-scale`, `.slidev-page` opacity / visibility / display / transform, container size, view-transition names, and PNG byte size | Completely flat for 30s. PNG size identical frame to frame |
| Dark mode, reduced motion, mobile UA | Separate browser contexts per variant | All render |
| Headless vs headed, bundled Chromium vs real Chrome | `channel: 'chrome'`, `headless: false` | All render |
| Build failure | `pnpm build`, `pnpm build:pages` | Both succeed in ~1.5s, 619 modules |
| Vite 8 / Slidev 52 mismatch | Checked installed tree | Single `vite@8.2.1`, no duplicates. Not an issue |

---

## 5. The open question: "flashes, then goes white"

Reported while this investigation was running, against
`http://localhost:4180/cng-japan-2026/#/1`.

**Most likely cause: my own testing churn, not the deck.** During the session I
repeatedly killed and restarted the preview server, and ran `pnpm test`, which
rebuilds `dist/` with base `/`, **underneath a preview server that had already
read base `/cng-japan-2026/` at startup**. A browser tab open across that window
gets a cached `index.html` whose asset URLs no longer resolve. That is exactly a
flash-then-white.

State was reset afterwards and both servers verified clean:

```
node scripts/smoke.mjs http://localhost:4180/cng-japan-2026/   -> PASS, 24 slides
node scripts/smoke.mjs http://localhost:3031/                  -> PASS, 24 slides
```

`scripts/preview.mjs` reads the base **once at startup**. If you rebuild with a
different base while it runs, restart it. `pnpm smoke` will catch the mismatch.

### If it still happens, get these before forming any hypothesis

The deck is clean in an automated browser under every condition in section 4, so
the next differences worth testing are all in the **real browser profile**:

1. Open the same URL in an **Incognito window** (extensions off). If it renders,
   an extension is injecting into the page. Bisect by disabling them.
2. DevTools **Console** at the moment it whites out, and the **Network** tab
   filtered to `Status >= 400`.
3. Whether the URL still shows the right hash after the whiteout.
4. Whether it survives a hard reload with cache disabled.

Do not start proposing fixes before you have 1 and 2. Section 4 is the record of
what guessing costs on this repo.

---

## 6. Environment notes

- `node_modules/` was **absent** on a fresh clone. Run
  `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 pnpm install --frozen-lockfile`.
- `playwright-chromium` is a devDependency but CI skips the browser download, so
  the workflow now runs `pnpm exec playwright install --with-deps chromium`
  before the smoke step.
- Node 24.19.0 is the current LTS. The workflow pins `node-version: 24`.
- pnpm 11.22.0 is current and already pinned in `packageManager`.
- The Chrome extension bridge (`mcp__claude-in-chrome__*`) was **not connected**
  in this session. All browser work went through `playwright-chromium`, which
  can drive real Chrome via `channel: 'chrome'`.
- `[pageerror] Wake Lock permission request denied` appears on every headless
  run. It is the environment, not the deck. `smoke.mjs` filters it.
- Dependabot PR #1 (`actions/setup-node` 6 → 7) was merged, commit `ba06010`.

## 7. Useful one-liners

```bash
# render-check any URL, all 24 slides
node scripts/smoke.mjs https://yharby.github.io/cng-japan-2026/

# what base is the current build actually using
grep -oE 'src="[^"]*index-[^"]*\.js"' dist/index.html

# is the preview server serving what dist claims
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4180/cng-japan-2026/
```
