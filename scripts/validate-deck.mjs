#!/usr/bin/env node
// Deck validator for the split-file 24 slide deck.
//
// The deck root is a chain of `src:` includes, so this walks the include list
// in slide order and validates each included file in its own right. Slides 1
// to 16 are the 20-minute talk. Slides 17 to 24 are reachable appendices that
// are kept out of the PDF by `--range 1-16` and excluded from the click budget.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DECK = resolve(HERE, '..')

// The contract. Clicks for slides 1 to 16 sum to 38.
export const SLIDES = [
  { n: 1, file: 'slides/01-cover.md', comp: 'VizCover', mode: null, clicks: 0 },
  { n: 2, file: 'slides/02-bio.md', comp: 'VizBio', mode: null, clicks: 0 },
  { n: 3, file: 'slides/03-legacy-files.md', comp: 'VizLegacyFiles', mode: null, clicks: 3 },
  { n: 4, file: 'slides/04-object-storage-range.md', comp: 'VizObjectRange', mode: null, clicks: 3 },
  { n: 5, file: 'slides/05-cloud-formats.md', comp: 'VizCloudFormats', mode: null, clicks: 4 },
  { n: 6, file: 'slides/06-files-need-catalog.md', comp: 'VizFilesNeedCatalog', mode: null, clicks: 2 },
  { n: 7, file: 'slides/07-stac-model.md', comp: 'VizStacModel', mode: null, clicks: 3 },
  { n: 8, file: 'slides/03-japan-pieces.md', comp: 'VizJapanAlready', mode: null, clicks: 3 },
  { n: 9, file: 'slides/04-portolan-contract.md', comp: 'VizPortolanContract', mode: null, clicks: 3 },
  { n: 10, file: 'slides/05-stac-profile.md', comp: 'VizTheGap', mode: null, clicks: 2 },
  { n: 11, file: 'slides/07-three-doors.md', comp: 'VizLayout', mode: null, clicks: 3 },
  { n: 12, file: 'slides/08-testable-rules.md', comp: 'VizValidation', mode: null, clicks: 3 },
  { n: 13, file: 'slides/09-japan-catalog.md', comp: 'VizJapanCatalog', mode: null, clicks: 2 },
  { n: 14, file: 'slides/16-honest-work.md', comp: 'VizHonestWork', mode: null, clicks: 2 },
  { n: 15, file: 'slides/17-japan-pilot.md', comp: 'VizPilot', mode: null, clicks: 4 },
  { n: 16, file: 'slides/18-close.md', comp: 'VizClose', mode: null, clicks: 1 },
  { n: 17, file: 'slides/06-open-toolchain.md', comp: 'VizEcosystem', mode: null, clicks: 3, appendix: true },
  { n: 18, file: 'slides/10-three-scales.md', comp: 'VizScaleExamples', mode: null, clicks: 3, appendix: true },
  { n: 19, file: 'slides/11-live-catalog.md', comp: 'VizLiveBrowser', mode: null, clicks: 1, appendix: true },
  { n: 20, file: 'slides/12-ten-skills.md', comp: 'VizSkillSuite', mode: null, clicks: 4, appendix: true },
  { n: 21, file: 'slides/13-skill-workflow.md', comp: 'VizSkillFlow', mode: null, clicks: 4, appendix: true },
  { n: 22, file: 'slides/14-get-started.md', comp: 'VizGetStarted', mode: null, clicks: 2, appendix: true },
  { n: 23, file: 'slides/15-current-scope.md', comp: 'VizScope', mode: null, clicks: 2, appendix: true },
  { n: 24, file: 'slides/19-appendix-http.md', comp: 'VizProtocol', mode: null, clicks: 4, appendix: true },
]

export const CLICK_BUDGET = 38

// Slides that carry no `.bi` evidence line at all, by contract.
const NO_BI = new Set([1, 2, 8, 9, 10, 16])

// Components superseded by the rebuild. Referencing one is a defect even if
// the file still sits on disk.
export const RETIRED = [
  'VizSilo', 'VizBucketScale', 'VizOnePattern', 'VizReveal', 'VizDecouple', 'VizTheBill', 'VizTwoJobs',
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

// Attribution that must survive anywhere in the deck, notes included.
export const REQUIRED = [
  'Source Cooperative', 'Matsumura', 'Imaki', 'flateau',
]

const FM = /^---\n([\s\S]*?)\n---/

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
  const path = join(DECK, spec.file)
  if (!existsSync(path)) {
    errors.push(`slide ${spec.n}: missing file ${spec.file}`)
    return ''
  }
  const src = readFileSync(path, 'utf8')
  const label = `slide ${spec.n}`
  errors.push(...checkSource(src, label, warnings))

  const fm = frontmatter(src)
  const body = bodyOf(src)

  const cm = fm.match(/^clicks:\s*(\d+)\s*$/m)
  const clicks = cm ? Number(cm[1]) : 0
  if (clicks !== spec.clicks) {
    errors.push(`${label}: clicks is ${clicks}, contract says ${spec.clicks}`)
  }

  // Component usage. Props are allowed, and the same component may appear on
  // more than one slide, so match the tag and read its attributes.
  const tags = [...body.matchAll(/<(Viz[A-Za-z]+)([^>]*)\/>/g)]
  if (tags.length !== 1) {
    errors.push(`${label}: expected exactly one Viz component, found ${tags.length}`)
  } else {
    const [, name, attrs] = tags[0]
    if (name !== spec.comp) {
      errors.push(`${label}: expected <${spec.comp} />, found <${name} />`)
    }
    const mm = attrs.match(/mode="([^"]+)"/)
    const mode = mm ? mm[1] : null
    if (mode !== spec.mode) {
      errors.push(`${label}: mode is ${mode ?? 'absent'}, contract says ${spec.mode ?? 'absent'}`)
    }
  }

  // At most one evidence block, the measured legibility constraint.
  const bi = [...body.matchAll(/class="bi"/g)].length
  const maxBi = NO_BI.has(spec.n) ? 0 : 1
  if (bi > maxBi) {
    errors.push(`${label}: ${bi} .bi blocks, contract allows ${maxBi}`)
  }

  // Bilingual does not mean duplicating every evidence sentence. The Japanese
  // subtitle carries the takeaway; the optional English evidence line carries
  // one precise proof point. This budget keeps the diagram at conference scale.
  const visible = stripNotes(body)
  const jaParagraphs = [...visible.matchAll(/<p[^>]*class="[^"]*\bja\b[^"]*"[^>]*>/g)].length
  const jaSpans = [...visible.matchAll(/<span[^>]*class="[^"]*\bja\b[^"]*"[^>]*>/g)].length
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
    for (const marker of ['[Say in Japanese]', '[Say in English]', '[Sources]']) {
      if (!body.includes(marker)) errors.push(`${label}: speaker notes are missing ${marker}`)
    }
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
  const file = join(DECK, 'components', `${name}.vue`)
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

  if (!body.includes('isPrintMode')) {
    errors.push(`${label}: does not use isPrintMode, the PDF captures a half drawn frame`)
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

  // The include chain must list every contract slide, in order.
  const root = readFileSync(join(DECK, 'slides.md'), 'utf8')
  const includes = [...root.matchAll(/^src:\s*\.\/(.+?)\s*$/gm)].map((m) => m[1])
  if (includes.length !== SLIDES.length) {
    errors.push(`slides.md declares ${includes.length} includes, contract says ${SLIDES.length}`)
  }
  for (const [i, spec] of SLIDES.entries()) {
    if (includes[i] !== spec.file) {
      errors.push(`slides.md include ${i + 1} is ${includes[i] ?? 'nothing'}, expected ${spec.file}`)
    }
  }

  let corpus = root
  for (const spec of SLIDES) corpus += `\n${checkSlide(spec, errors, warnings)}`

  const budget = SLIDES.filter((s) => !s.appendix).reduce((a, s) => a + s.clicks, 0)
  if (budget !== CLICK_BUDGET) {
    errors.push(`contract table sums to ${budget} clicks, budget is ${CLICK_BUDGET}`)
  }

  for (const req of REQUIRED) {
    if (!corpus.includes(req)) errors.push(`required string missing from the deck, "${req}"`)
  }

  for (const name of [...new Set(SLIDES.map((s) => s.comp))]) {
    const needsClicks = SLIDES.some((s) => s.comp === name && s.clicks > 0)
    checkComponent(name, errors, needsClicks)
  }

  const deliverables = [
    'public/qr-portolan.svg',
  ]
  for (const rel of deliverables) {
    if (!existsSync(join(DECK, rel))) errors.push(`missing delivery asset, ${rel}`)
  }

  // Retired components must be gone from disk too, or the next build agent
  // reuses one by mistake.
  const present = readdirSync(join(DECK, 'components'))
  for (const name of RETIRED) {
    if (present.includes(`${name}.vue`)) {
      errors.push(`retired component still on disk, components/${name}.vue`)
    }
  }

  return { errors, warnings }
}

// Only run the CLI when this file is the entry point. `sweep.mjs` imports
// SLIDES from here, and an unguarded run would exit that process.
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
