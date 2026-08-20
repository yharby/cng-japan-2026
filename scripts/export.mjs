#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DECK } from '../deck.config.mjs'

const locale = process.argv[2] === 'ja' ? 'ja' : 'en'
const output = locale === 'ja' ? DECK.exportFileJa : DECK.exportFile

mkdirSync(dirname(output), { recursive: true })

const result = spawnSync('pnpm', [
  'exec', 'slidev', 'export',
  '--output', output,
  '--per-slide',
  '--wait', '1500',
  '--timeout', '60000',
], {
  stdio: 'inherit',
  env: { ...process.env, VITE_DECK_LOCALE: locale },
})

process.exit(result.status ?? 1)
