#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DECK } from '../deck.config.mjs'

mkdirSync(dirname(DECK.exportFile), { recursive: true })

const result = spawnSync('pnpm', [
  'exec', 'slidev', 'export',
  '--output', DECK.exportFile,
  '--per-slide',
  '--range', `1-${DECK.mainSlides}`,
  '--wait', '1500',
  '--timeout', '60000',
], { stdio: 'inherit' })

process.exit(result.status ?? 1)
