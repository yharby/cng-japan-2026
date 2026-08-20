#!/usr/bin/env node
// Blank-screen guard for the built deck.
//
// A Slidev SPA fails silently. When the asset base baked into `dist/index.html`
// does not match the path the site is served from, every module 404s, `#app`
// stays empty and the browser shows a white page with no error banner. The
// build still exits 0, so nothing upstream of this script notices.
//
// This serves `dist` at exactly the base recorded in `dist/index.html`, walks
// every slide over hash routes, and fails if a slide renders no text or if any
// same-origin request 404s.
//
// Usage:
//   node scripts/smoke.mjs            # serve ./dist and check it
//   node scripts/smoke.mjs <url>      # check an already running deployment
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { dirname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import { readBase } from './dist-base.mjs'
import { SLIDES } from './validate-deck.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(HERE, '..', 'dist')

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
}

async function serveDist(base) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost')
    let path = decodeURIComponent(url.pathname)
    if (!path.startsWith(base)) {
      res.writeHead(404).end('outside base')
      return
    }
    path = path.slice(base.length) || 'index.html'
    const file = join(DIST, normalize(path).replace(/^(\.\.[/\\])+/, ''))
    try {
      if ((await stat(file)).isDirectory()) throw new Error('dir')
      const ext = file.slice(file.lastIndexOf('.'))
      res.writeHead(200, { 'content-type': TYPES[ext] ?? 'application/octet-stream' })
      res.end(await readFile(file))
    } catch {
      // A real static host returns its own 404 page here. Keep the status so a
      // missing asset is visible to the browser instead of being papered over.
      res.writeHead(404, { 'content-type': 'text/plain' }).end('not found')
    }
  })
  await new Promise(r => server.listen(0, r))
  return { server, port: server.address().port }
}

const explicit = process.argv[2]
let server, origin

if (explicit) {
  origin = explicit.replace(/\/$/, '') + '/'
} else {
  const html = await readFile(join(DIST, 'index.html'), 'utf8').catch(() => {
    console.error('FAIL smoke, no dist/index.html. Run `pnpm build` first.')
    process.exit(1)
  })
  const base = readBase(html)
  const started = await serveDist(base)
  server = started.server
  origin = `http://localhost:${started.port}${base}`
  console.log(`serving dist at ${origin} (base ${base})`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

const failures = []
let missing = []
page.on('response', r => {
  if (r.status() >= 400 && r.url().startsWith(new URL(origin).origin)) missing.push(`${r.status()} ${r.url()}`)
})
page.on('pageerror', e => {
  // Headless Chromium refuses the wake lock; that is the environment, not the deck.
  if (!/Wake Lock/i.test(e.message)) missing.push(`pageerror ${e.message}`)
})

for (const spec of SLIDES) {
  missing = []
  await page.goto(`${origin}#/${spec.n}`, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForTimeout(600)
  const text = (await page.evaluate(() => (document.body.innerText || '').trim())).length
  const mounted = await page.evaluate(() => document.querySelector('#app')?.children.length ?? 0)
  if (text < 40 || mounted === 0) {
    failures.push(`slide ${spec.n} rendered blank, text=${text} #app children=${mounted}`)
  }
  for (const m of [...new Set(missing)]) failures.push(`slide ${spec.n}, ${m}`)
}

await browser.close()
server?.close()

if (failures.length) {
  console.error(`FAIL smoke, ${failures.length} problem(s)`)
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}
console.log(`PASS smoke, ${SLIDES.length} slides rendered from the built artifact`)
