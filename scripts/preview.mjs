#!/usr/bin/env node
// Preview the built deck at the base it was actually built with.
//
// `slidev build --base /cng-japan-2026/` bakes that prefix into every asset URL
// in `dist/index.html`, but a bare `vite preview` serves the folder at `/`.
// Every module then 404s, `#app` stays empty and the browser shows a white page
// with no error, so the Pages-reproduction build looked broken locally while the
// real deploy was fine. Read the base back out of the artifact and serve it
// there, so the preview URL can never disagree with what was built.
//
// Usage:
//   node scripts/preview.mjs [--port 4173] [--host]
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import { readBase } from './dist-base.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const DECK = resolve(HERE, '..')

let html
try {
  html = readFileSync(join(DECK, 'dist', 'index.html'), 'utf8')
} catch {
  console.error('No dist/index.html. Run `pnpm build` first.')
  process.exit(1)
}

const argv = process.argv.slice(2)
const flag = name => {
  const i = argv.indexOf(`--${name}`)
  return i < 0 ? undefined : argv[i + 1]
}

const base = readBase(html)
const server = await preview({
  root: DECK,
  base,
  build: { outDir: 'dist' },
  preview: {
    port: Number(flag('port') ?? 4173),
    host: argv.includes('--host') || undefined,
    open: argv.includes('--open'),
  },
})

server.printUrls()
