#!/usr/bin/env node
// Capture every click state, including state zero. Final-frame screenshots can
// look perfect while a middle step is blank, clipped, or reveals the wrong idea.
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import { SLIDES } from './validate-deck.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const port = process.argv[2] ?? '3040'
const start = Number(process.argv[3] ?? 1)
const end = Number(process.argv[4] ?? SLIDES.length)
const width = Number(process.argv[5] ?? 1280)
const height = Number(process.argv[6] ?? 720)
const OUT = resolve(HERE, '..', 'shots', `states-${width}x${height}`)
const base = `http://localhost:${port}`

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
  colorScheme: 'light',
})

for (const spec of SLIDES.filter((slide) => slide.n >= start && slide.n <= end)) {
  const sel = `.slidev-page-${spec.n}`
  for (let click = 0; click <= spec.clicks; click++) {
    await page.goto(`${base}/${spec.n}?clicks=${click}`, { waitUntil: 'networkidle' })
    await page.waitForSelector(`${sel} .canvas`, { timeout: 15000 })
    await page.waitForTimeout(700)
    const n = String(spec.n).padStart(2, '0')
    await page.locator(sel).screenshot({ path: join(OUT, `${n}-${click}-${spec.comp}.png`) })
  }
  console.log(`states slide ${spec.n}, 0 through ${spec.clicks}`)
}

await browser.close()
console.log(`done, click states saved in ${OUT}`)
