#!/usr/bin/env node
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { chromium } from 'playwright-chromium'
import { DECK } from '../deck.config.mjs'
import { SLIDES } from './validate-deck.mjs'

const ROOT = resolve(import.meta.dirname, '..')
const DIST = resolve(ROOT, DECK.dist)
const MIME = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function buildUrl(input) {
  const url = new URL(input)
  url.hash = ''
  if (!url.pathname.endsWith('/')) url.pathname += '/'
  return url
}

async function serveArtifact() {
  const index = await readFile(resolve(DIST, 'index.html'), 'utf8').catch(() => null)
  if (!index) throw new Error('dist/index.html is missing; run `pnpm build` first')

  const entry = index.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1]
  if (!entry?.startsWith(`${DECK.base}assets/`)) {
    throw new Error(`artifact entry uses ${entry ?? 'no base'}, expected ${DECK.base}`)
  }

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost')
    if (!url.pathname.startsWith(DECK.base)) {
      response.writeHead(404).end('outside deployment base')
      return
    }

    const relative = decodeURIComponent(url.pathname.slice(DECK.base.length)) || 'index.html'
    const file = resolve(DIST, relative)
    if (file !== DIST && !file.startsWith(`${DIST}${sep}`)) {
      response.writeHead(403).end('outside dist')
      return
    }

    try {
      if ((await stat(file)).isDirectory()) throw new Error('directory')
      response.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
      response.end(await readFile(file))
    } catch {
      response.writeHead(404).end('not found')
    }
  })

  await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen))
  const address = server.address()
  return {
    server,
    url: buildUrl(`http://127.0.0.1:${address.port}${DECK.base}`),
  }
}

const explicit = process.argv[2]
const local = explicit ? null : await serveArtifact()
const baseUrl = explicit ? buildUrl(explicit) : local.url
const failures = []

// Both colour schemes get walked. A scoped component style that escapes onto a
// global element only bites under one of them, so a light-only check proves
// nothing about the dark path. The deck once rendered pure white in dark mode
// because `:global(html.dark) .carto-logo` compiled to plain `html.dark`, which
// put `filter: brightness(0) invert(1)` on the whole document.
const SCHEMES = ['light', 'dark']

const browser = await chromium.launch()

async function walk(colorScheme) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    colorScheme,
  })
  const page = await context.newPage()
  const note = (message) => failures.push(`[${colorScheme}] ${message}`)

  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(baseUrl.origin)) {
      note(`${response.status()} ${response.url()}`)
    }
  })
  page.on('requestfailed', (request) => {
    const reason = request.failure()?.errorText ?? ''
    if (request.url().startsWith(baseUrl.origin) && reason !== 'net::ERR_ABORTED') {
      note(`request failed ${request.url()} ${reason}`)
    }
  })
  page.on('pageerror', (error) => {
    if (!/Wake Lock/i.test(error.message)) note(`page error ${error.message}`)
  })

  try {
    for (const slide of SLIDES) {
      const url = new URL(baseUrl)
      url.hash = `/${slide.n}`
      await page.goto(url.href, { waitUntil: 'domcontentloaded', timeout: 30000 })

      const selector = `.slidev-page-${slide.n}`
      await page.locator(selector).waitFor({ state: 'visible', timeout: 15000 })
      await page.waitForTimeout(500)

      const state = await page.locator(selector).evaluate((element) => {
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()
        return {
          display: style.display,
          visibility: style.visibility,
          opacity: Number(style.opacity),
          width: rect.width,
          height: rect.height,
          text: (element.textContent ?? '').trim().length,
          mounted: document.querySelector('#app')?.children.length ?? 0,
          // A filter on the root element repaints every pixel of the deck, so
          // it hides the slide while every other signal still looks healthy.
          rootFilter: getComputedStyle(document.documentElement).filter,
        }
      })
      const screenshotBytes = (await page.screenshot()).length

      if (state.rootFilter !== 'none') {
        note(`slide ${slide.n} has a filter on the root element, ${state.rootFilter}`)
      }

      if (
        state.mounted === 0
        || state.display === 'none'
        || state.visibility === 'hidden'
        || state.opacity === 0
        || state.width < 600
        || state.height < 300
        || state.text < 40
        || screenshotBytes < 10_000
      ) {
        note(`slide ${slide.n} is visually blank: ${JSON.stringify({ ...state, screenshotBytes })}`)
      }
    }
  } catch (error) {
    note(error.message)
  } finally {
    await context.close()
  }
}

try {
  for (const scheme of SCHEMES) await walk(scheme)
} finally {
  await browser.close()
  local?.server.close()
}

const unique = [...new Set(failures)]
if (unique.length) {
  console.error(`FAIL smoke (${unique.length})`)
  for (const failure of unique) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`PASS smoke: ${SLIDES.length} slides in ${SCHEMES.join(' and ')} at ${baseUrl.href}`)
