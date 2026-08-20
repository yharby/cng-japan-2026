import { defineConfig } from 'vite'
import { DECK } from './deck.config.mjs'

export default defineConfig(({ command, isPreview }) => ({
  // Development stays at `/`; production builds and previews share the one
  // GitHub Pages base declared in deck.config.mjs.
  base: command === 'build' || isPreview ? DECK.base : '/',
}))
