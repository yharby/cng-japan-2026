#!/usr/bin/env node
// Validate the split-file deck by deriving its order from slides.md and its
// main-talk boundary and click budget from deck.config.mjs.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DECK } from '../deck.config.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const FM = /^---\n([\s\S]*?)\n---/
const workspaceConfig = readFileSync(join(ROOT, 'pnpm-workspace.yaml'), 'utf8')
const lockfile = readFileSync(join(ROOT, 'pnpm-lock.yaml'), 'utf8')

// slides.md is the single source of truth for slide order. Tooling derives the
// component, click count, and appendix boundary from the included files.
const rootSource = readFileSync(join(ROOT, 'slides.md'), 'utf8')
const slideFiles = [...rootSource.matchAll(/^src:\s*\.\/(.+?)\s*$/gm)].map((match) => match[1])

export const SLIDES = slideFiles.map((file, index) => {
  const source = readFileSync(join(ROOT, file), 'utf8')
  const frontmatter = source.match(FM)?.[1] ?? ''
  return {
    n: index + 1,
    file,
    comp: source.match(/<(Viz[A-Za-z]+)\b/)?.[1] ?? null,
    clicks: Number(frontmatter.match(/^clicks:\s*(\d+)\s*$/m)?.[1] ?? 0),
    appendix: index >= DECK.mainSlides && index + 1 !== DECK.closingSlide,
  }
})

// Components superseded by the rebuild. Referencing one is a defect even if
// the file still sits on disk.
export const RETIRED = [
  'VizSilo', 'VizBucketScale', 'VizOnePattern', 'VizReveal', 'VizDecouple', 'VizTheBill', 'VizTwoJobs',
  'VizJapanAlready', 'VizPilot',
]

// Forbidden claims. Every entry traces to a correction made in review, so a
// match is a reintroduced error, not a style nit. Patterns, not plain strings,
// because the last overclaim shipped as a headline number and walked straight
// past a check written for prose.
export const FORBIDDEN = [
  // stale research from the first build
  [/llms\.txt/i, 'llms.txt was never verified'],
  [/versions\.json/i, 'versions.json was never verified'],
  [/RaQuet/i, 'RaQuet was never verified'],
  [/\bFinland\b|\bCanada\b|\bSaudi\b/i, 'unverified national adopter'],
  [/registered STAC extension/i, 'not a registered extension'],
  [/GeoParquet 2\.0 (is )?released/i, 'GeoParquet 2.0 is not released'],
  [/\b2 ?TB\b/i, 'unverified figure'],
  [/53x|53 times/i, 'unverified figure'],
  // adoption overclaims, prose and number led
  [/organi[sz]ations adopted/i, 'adoption overclaim'],
  [/\b11 catalogs?\b/i, 'the 11 figure is 2 producer published and 9 mirrors'],
  [/(four|4) independent/i, '2 of 11 are producer published, not 4'],
  [/(seven|7) mirrors?/i, '9 mirrors, 6 of them under one account'],
  // corrected numbers
  [/3,?359/, 'the ratio is 3,360'],
  [/9\.6 times/i, 'different contents, not compression'],
  [/883,?063 buildings/i, 'they are building footprint records'],
  // corrected claims
  // Ban the false half only. "STAC tells you what and where" is the correction
  // and appears on slide 12 on purpose.
  [/STAC tells you what[^.]{0,30}(never|not) where/i, 'STAC links the asset at its current URL'],
  [/never where/i, 'STAC links the asset at its current URL'],
  [/which bucket/i, 'STAC links the asset at its current URL'],
  [/one copy\.? every engine/i, 'managed derivatives, compatible engines'],
  [/\bzero servers?\b/i, 'no database or query service in the query path'],
  [/\bno servers?\b(?!.{0,40}(in the query path|title))/i, 'no database or query service in the query path'],
  [/you cannot get part of it/i, 'the portal offers one archive'],
  [/same trick/i, 'different structures, one goal'],
  [/six formats/i, 'different structures, one goal'],
  // Negated forms are the correction itself, so exempt "not" and "never".
  // Stay inside one sentence AND inside one text node, or the gap operator walks
  // across markup and pairs an unrelated label with a CSS class named spark.
  [/Spark[^.<>]{0,60}(?<!not )(?<!never )(zero.copy|one buffer|shares)/i, 'Spark is a separate JVM process'],
  [/(?<!not )(?<!never )(zero.copy|one buffer|shares)[^.<>]{0,60}Spark/i, 'Spark is a separate JVM process'],
  [/Portolan (converts|mandates)/i, 'Portolan neither converts CityGML nor mandates derivatives'],
  [/kWh|carbon|CO2|energy saving/i, 'energy is not quantified in this deck'],
  // the PMTiles cap is on the root directory, not on the whole index
  [/whole index[^.]{0,40}16,?384/i, 'the spec caps the header plus root directory, not the whole index'],
  [/16,?384[^.]{0,40}whole index/i, 'the spec caps the header plus root directory, not the whole index'],
  // demo overclaims
  [/query this block right now/i, 'the demo answers one question from footer metadata'],
  [/the same block was fetched/i, 'the demo answers one question from footer metadata'],
  [/734,?850 bytes fetched the block/i, 'the demo answers one question from footer metadata'],
]

// Sources that were removed because their exact reuse grant was conditional,
// mixed, unstable, or unconfirmed. They may remain in the private research
// history, but never in audience slides, notes, URLs, or accessibility copy.
export const EXCLUDED_EXAMPLES = [
  /\bJAXA\b|AW3D30|data\.earth\.jaxa\.jp/i,
  /\bGSI\b|optimal_bvmap|gsi-cyberjapan/i,
  /Pacific Spatial|Flateau|\bPLATEAU\b/i,
  /Pergamino|pergamino-ide/i,
  /Moldova|moldova-geodata/i,
  /St\.? Louis|stlouis/i,
  /Microsoft Roads|RoadDetections/i,
]

// Attribution that must survive anywhere in the deck, notes included.
export const REQUIRED = [
  'Matsumura', 'Fields of the World', 'Taylor Geospatial Institute', 'Microsoft AI for Good',
]

function frontmatter(src) {
  const m = src.match(FM)
  return m ? m[1] : ''
}

function bodyOf(src) {
  return src.replace(FM, '')
}

// Visible copy is the headline, the Japanese takeaway, and the evidence spans.
// Everything else is frontmatter, markup or speaker notes, where a colon is
// ordinary and correct.
function visibleCopy(body) {
  const noNotes = body.replace(/<!--[\s\S]*?-->/g, '')
  const out = []
  for (const m of noNotes.matchAll(/^#{1,3} (.+)$/gm)) out.push(m[1])
  for (const m of noNotes.matchAll(/<(?:p|span)[^>]*>([^<]+)</g)) out.push(m[1])
  return out.map((s) => s.trim()).filter(Boolean)
}

function stripNotes(s) {
  return s.replace(/<!--[\s\S]*?-->/g, '')
}

/**
 * Source level checks that apply to any single markdown file.
 *
 * Forbidden claims are an error in anything the room can see, and a warning in
 * speaker notes, because a note legitimately quotes a banned phrase in order to
 * warn against it. Warnings are printed and do not fail the run.
 */
export function checkSource(src, label, warnings = []) {
  const errors = []
  const body = bodyOf(src)
  const spoken = stripNotes(body)
  const notes = (body.match(/<!--[\s\S]*?-->/g) ?? []).join('\n')

  for (const [i, line] of body.split('\n').entries()) {
    if (line.includes('—') || line.includes('–')) {
      errors.push(`${label} line ${i + 1}: contains an em dash or en dash`)
    }
  }

  for (const text of visibleCopy(body)) {
    const isAgendaTitle = text === 'Portolan: An SDI Without Servers'
    if (/[:;：；]/.test(text) && !isAgendaTitle) {
      errors.push(`${label}: visible copy contains a colon or semicolon, "${text}"`)
    }
  }

  for (const [re, why] of FORBIDDEN) {
    const onScreen = spoken.match(re)
    if (onScreen) {
      errors.push(`${label}: forbidden claim on screen, "${onScreen[0]}", ${why}`)
      continue
    }
    const inNotes = notes.match(re)
    if (inNotes) {
      warnings.push(`${label}: notes mention "${inNotes[0].replace(/\s+/g, ' ')}", ${why}`)
    }
  }

  for (const re of EXCLUDED_EXAMPLES) {
    const hit = src.match(re)
    if (hit) errors.push(`${label}: excluded data example appears in the presentation, "${hit[0]}"`)
  }

  for (const name of RETIRED) {
    if (new RegExp(`<${name}\\b`).test(src)) {
      errors.push(`${label}: references retired component <${name} />`)
    }
  }

  for (const h of body.matchAll(/^(#{1,2}) (.+)$/gm)) {
    const after = body.slice(h.index + h[0].length, h.index + h[0].length + 200)
    if (!after.includes('class="ja"')) {
      errors.push(`${label}: heading has no <p class="ja"> sibling, "${h[2].trim()}"`)
    }
  }

  return errors
}

function checkSlide(spec, errors, warnings) {
  const path = join(ROOT, spec.file)
  if (!existsSync(path)) {
    errors.push(`slide ${spec.n}: missing file ${spec.file}`)
    return ''
  }
  const src = readFileSync(path, 'utf8')
  const label = `slide ${spec.n}`
  errors.push(...checkSource(src, label, warnings))

  const fm = frontmatter(src)
  const body = bodyOf(src)

  // Component usage. Props are allowed, but each slide has one visualization.
  const tags = [...body.matchAll(/<(Viz[A-Za-z]+)([^>]*)\/>/g)]
  if (tags.length !== 1) {
    errors.push(`${label}: expected exactly one Viz component, found ${tags.length}`)
  }

  // At most one evidence block, the measured legibility constraint.
  const bi = [...body.matchAll(/class="bi"/g)].length
  if (bi > 1) {
    errors.push(`${label}: ${bi} .bi blocks, maximum is 1`)
  }

  // The language switch shows one title and one evidence sentence at a time.
  // Keep both translations in source so either audience window is complete.
  const visible = stripNotes(body)
  const jaParagraphs = [...visible.matchAll(/<p[^>]*class="[^"]*\bja\b[^"]*"[^>]*>/g)].length
  const jaSpans = [...visible.matchAll(/<span[^>]*class="([^"]*)"[^>]*>/g)]
    .filter((match) => match[1].split(/\s+/).includes('ja')).length
  const deckJaEvidence = [...visible.matchAll(/<span[^>]*class="[^"]*\bdeck-ja\b[^"]*"[^>]*>([^<]+)<\/span>/g)]
  if (jaParagraphs !== 1) {
    errors.push(`${label}: expected exactly one Japanese subtitle paragraph, found ${jaParagraphs}`)
  }
  if (jaSpans !== 0) {
    errors.push(`${label}: Japanese evidence is duplicated in .bi, keep only the short subtitle`)
  }

  const evidence = [...visible.matchAll(/<span[^>]*class="[^"]*\ben\b[^"]*"[^>]*>([^<]+)<\/span>/g)]
  if (bi === 1 && evidence.length !== 1) {
    errors.push(`${label}: .bi must contain exactly one English evidence line`)
  }
  if (bi === 1 && deckJaEvidence.length !== 1) {
    errors.push(`${label}: .bi must contain exactly one Japanese .deck-ja evidence line`)
  }
  if (bi === 0 && deckJaEvidence.length !== 0) {
    errors.push(`${label}: Japanese evidence exists outside a .bi block`)
  }
  for (const [, copy] of evidence) {
    const words = copy.trim().split(/\s+/).filter(Boolean).length
    if (words > 24) errors.push(`${label}: English evidence is ${words} words, maximum is 24`)
  }

  // The evidence line is static. Every click in the budget belongs to the
  // diagram, so no click directive may sit on deck copy.
  if (/v-click|<v-clicks/.test(body)) {
    errors.push(`${label}: copy carries a click directive, clicks belong to the diagram`)
  }

  if (!/<!--[\s\S]*?-->/.test(body)) {
    errors.push(`${label}: no speaker note block`)
  }

  if (!spec.appendix) {
    for (const marker of ['[Say in English]', '[Sources]']) {
      if (!body.includes(marker)) errors.push(`${label}: speaker notes are missing ${marker}`)
    }
  }
  if (body.includes('[Say in Japanese]')) {
    errors.push(`${label}: presenter scripts must remain English-only; remove [Say in Japanese]`)
  }

  const clickMarkers = [...body.matchAll(/\[Click\s+(\d+)\]/g)].map((m) => Number(m[1]))
  const expectedMarkers = Array.from({ length: spec.clicks }, (_, i) => i + 1)
  if (clickMarkers.join(',') !== expectedMarkers.join(',')) {
    errors.push(`${label}: note click markers are [${clickMarkers.join(', ')}], expected [${expectedMarkers.join(', ')}]`)
  }

  if (spec.appendix && !/^hideInToc:\s*true\s*$/m.test(fm)) {
    errors.push(`${label}: appendix must carry hideInToc, true`)
  }

  return src
}

function checkComponent(name, errors, needsClicks = false) {
  const file = join(ROOT, 'components', `${name}.vue`)
  if (!existsSync(file)) {
    errors.push(`missing component file, components/${name}.vue`)
    return
  }
  const body = readFileSync(file, 'utf8')
  const label = `${name}.vue`

  // SVG labels are on screen, so a banned claim in a component is an error
  // with no notes exemption.
  for (const [re, why] of FORBIDDEN) {
    const hit = body.match(re)
    if (hit) errors.push(`${label}: forbidden claim in the drawing, "${hit[0]}", ${why}`)
  }
  for (const re of EXCLUDED_EXAMPLES) {
    const hit = body.match(re)
    if (hit) errors.push(`${label}: excluded data example appears in the drawing, "${hit[0]}"`)
  }

  if (!body.includes('isPrintMode')) {
    errors.push(`${label}: does not use isPrintMode, the PDF captures a half drawn frame`)
  }
  if (!body.includes('useDeckLocale') || !body.includes('tr(')) {
    errors.push(`${label}: does not use the shared English/Japanese locale helper`)
  }
  if (needsClicks && !body.includes('$clicks')) {
    errors.push(`${label}: slide declares clicks but the component never reads $clicks`)
  }
  // Naming Slidev's slide context composable, even in a comment, makes the
  // injection plugin skip the file and $clicks goes undefined with no error.
  if (/useSlideContext/.test(body)) {
    errors.push(`${label}: names the slide context composable, which disables $clicks injection`)
  }
  const hasDeckViewBox = /viewBox="0 0 (800 460|600 400)"/.test(body)
  const hasBrowserFallback = name === 'VizLiveBrowser' && /viewBox="0 0 800 410"/.test(body)
  if (!hasDeckViewBox && !hasBrowserFallback) {
    errors.push(`${label}: no supported deck or browser-fallback viewBox`)
  }

  const scanned = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/url\(#[^)]*\)/g, '')
  if (/#[0-9a-fA-F]{3,8}\b/.test(scanned)) {
    errors.push(`${label}: contains a hard coded hex color, dark mode will break`)
  }
  if (/[—–]/.test(scanned)) {
    errors.push(`${label}: contains an em dash or en dash`)
  }

  // Vue renames scoped keyframes, so a keyframe and the animation using it
  // must sit in the same scoped block.
  const styles = [...body.matchAll(/<style scoped>([\s\S]*?)<\/style>/g)].map((m) => m[1])
  const allStyle = styles.join('\n')
  for (const m of allStyle.matchAll(/animation:\s*([A-Za-z][\w-]*)/g)) {
    const kf = m[1]
    if (!new RegExp(`@keyframes\\s+${kf}\\b`).test(allStyle)) continue
    const together = styles.some(
      (s) => new RegExp(`@keyframes\\s+${kf}\\b`).test(s) && new RegExp(`animation:\\s*${kf}\\b`).test(s),
    )
    if (!together) {
      errors.push(`${label}: keyframe ${kf} and its animation are in different scoped blocks`)
    }
  }

  // Marker ids share one document across the whole deck, unlike a shadow DOM.
  for (const m of body.matchAll(/<marker[^>]*\bid="([^"]+)"/g)) {
    if (!/^[a-z]{2,}-/.test(m[1])) {
      errors.push(`${label}: marker id "${m[1]}" is not prefixed, it can collide deck wide`)
    }
  }
}

export function checkDeck() {
  const errors = []
  const warnings = []

  // PPTXGenJS 4.0.1 declares image-size but its shipped code never imports it.
  // Keep that unused, archived dependency out of the graph: all published
  // versions are affected by CVE-2025-71329 and CVE-2025-71330.
  if (!/^  ["']pptxgenjs@4\.0\.1>image-size["']: ["']-["']$/m.test(workspaceConfig)) {
    errors.push('pnpm override removing the unused PPTXGenJS image-size dependency is missing')
  }
  if (/^  image-size@/m.test(lockfile) || /^      image-size:/m.test(lockfile)) {
    errors.push('pnpm-lock.yaml contains vulnerable image-size dependency')
  }

  if (SLIDES.length < DECK.mainSlides) {
    errors.push(`slides.md declares ${SLIDES.length} slides, fewer than the ${DECK.mainSlides}-slide main talk`)
  }
  if (DECK.closingSlide > SLIDES.length) {
    errors.push(`closing slide ${DECK.closingSlide} is outside the ${SLIDES.length}-slide deck`)
  }

  let corpus = rootSource
  for (const spec of SLIDES) corpus += `\n${checkSlide(spec, errors, warnings)}`

  const budget = SLIDES.filter((s) => !s.appendix).reduce((a, s) => a + s.clicks, 0)
  if (budget !== DECK.clickBudget) {
    errors.push(`main talk sums to ${budget} clicks, budget is ${DECK.clickBudget}`)
  }

  for (const req of REQUIRED) {
    if (!corpus.includes(req)) errors.push(`required string missing from the deck, "${req}"`)
  }

  for (const name of [...new Set(SLIDES.map((s) => s.comp).filter(Boolean))]) {
    const needsClicks = SLIDES.some((s) => s.comp === name && s.clicks > 0)
    checkComponent(name, errors, needsClicks)
  }

  const deliverables = [
    'public/qr-portolan.svg',
  ]
  for (const rel of deliverables) {
    if (!existsSync(join(ROOT, rel))) errors.push(`missing delivery asset, ${rel}`)
  }

  // Retired components must be gone from disk too, or the next build agent
  // reuses one by mistake.
  const present = readdirSync(join(ROOT, 'components'))
  for (const name of RETIRED) {
    if (present.includes(`${name}.vue`)) {
      errors.push(`retired component still on disk, components/${name}.vue`)
    }
  }

  return { errors, warnings }
}

// Only run the CLI when this file is the entry point. The smoke test imports
// SLIDES, and an unguarded run would exit that process.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const target = process.argv[2]
  const warnings = []
  const errs = target ? checkSource(readFileSync(target, 'utf8'), target, warnings) : null
  const result = errs ? { errors: errs, warnings } : checkDeck()
  const what = target ?? 'deck'

  for (const w of result.warnings) console.warn(`  warn ${w}`)

  if (result.errors.length) {
    console.error(`FAIL ${what}`)
    for (const e of result.errors) console.error(`  - ${e}`)
    process.exit(1)
  }
  console.log(`PASS ${what}`)
}
