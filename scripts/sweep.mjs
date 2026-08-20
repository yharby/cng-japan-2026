#!/usr/bin/env node
// Rendering sweep. Drives a running dev server and screenshots every slide at
// its final click state, which is where clipping and overlap show up. Reading
// coordinates in source finds some overflow, only rendering finds the rest.
//
// Two things this got wrong once, both silent.
//   - The deck uses `routerMode: hash`, so the slide route lives after the
//     hash and the click index is a QUERY parameter inside it, `/#/7?clicks=3`.
//     The path form `/7` silently serves slide 1 and screenshots happily.
//   - Slidev keeps neighbouring slides in the DOM, so `.slidev-page` matches
//     more than one element and the first is often the previous slide. Always
//     select `.slidev-page-<n>`.
//
// Usage, with a dev server already running on PORT:
//   node scripts/sweep.mjs [port] [theme]
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import { SLIDES } from './validate-deck.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, '..', 'shots')

const port = process.argv[2] ?? '3040'
const theme = process.argv[3] ?? 'light'
const base = `http://localhost:${port}`

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
  colorScheme: theme === 'dark' ? 'dark' : 'light',
})

for (const spec of SLIDES) {
  const sel = `.slidev-page-${spec.n}`
  await page.goto(`${base}/#/${spec.n}?clicks=${spec.clicks}`, { waitUntil: 'networkidle' })
  await page.waitForSelector(sel, { timeout: 15000 })
  // Entrances run about 500ms and some loops are slower, so settle before the
  // shot or the frame catches a half drawn diagram.
  await page.waitForTimeout(1600)
  const n = String(spec.n).padStart(2, '0')
  await page.locator(sel).screenshot({ path: join(OUT, `${theme}-${n}-${spec.comp}.png`) })
  console.log(`shot ${theme} slide ${spec.n} at click ${spec.clicks}, ${spec.comp}`)
}

await browser.close()
console.log(`done, ${SLIDES.length} shots in ${OUT}`)
