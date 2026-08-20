#!/usr/bin/env node
// A CSS `transform` inside a keyframe OVERRIDES an SVG `transform="translate(...)"`
// presentation attribute on the same element, so the element animates from
// wherever the keyframe puts it, usually the origin. It looks fine in source
// and lands in the corner on screen.
//
// This finds every element that carries a transform attribute and a class whose
// animation uses a keyframe that sets transform.
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const DECK = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(DECK, 'components')

let found = 0
for (const file of readdirSync(dir).filter((f) => f.endsWith('.vue'))) {
  const src = readFileSync(join(dir, file), 'utf8')
  // Scan CSS from the style blocks only. The template is full of `{ on: s >= 1 }`
  // bindings, and letting those into a brace matching scan silently misaligns
  // every rule after the first one.
  const css = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n')

  // keyframes that move things
  const moving = new Set()
  for (const m of css.matchAll(/@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\}/g)) {
    if (/transform\s*:/.test(m[2])) moving.add(m[1])
  }
  if (!moving.size) continue

  // Selectors whose animation uses one of those keyframes. A compound selector
  // such as `.book.drop.on` requires ALL three classes, so record the set, not
  // just the first name, or every `.book` in the file reads as risky.
  const risky = []
  for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const anim = m[2].match(/animation\s*:\s*([\w-]+)/)
    if (!anim || !moving.has(anim[1])) continue
    for (const sel of m[1].split(',')) {
      const names = [...sel.matchAll(/\.([\w-]+)/g)].map((c) => c[1])
      if (names.length) risky.push(names)
    }
  }
  if (!risky.length) continue

  // elements carrying both a transform attribute and a risky class
  // Attribute values can contain ">", as in :class="{ on: s >= 1 }", so scan
  // quote aware rather than stopping at the first ">".
  for (const tag of src.matchAll(/<(\w+)((?:[^>"]|"[^"]*")*)>/g)) {
    const attrs = tag[2]
    if (!/\btransform="/.test(attrs)) continue
    const classes = [...attrs.matchAll(/class="([^"]*)"/g), ...attrs.matchAll(/:class="([^"]*)"/g)]
      .flatMap((c) => c[1].split(/[\s,'"{}:]+/))
      .filter(Boolean)
    const have = new Set(classes)
    const hit = risky.filter((names) => names.every((n) => have.has(n)))
    if (hit.length) {
      const line = src.slice(0, tag.index).split('\n').length
      console.log(`${file}:${line} <${tag[1]}> has transform= and animated selector .${hit[0].join('.')}`)
      found++
    }
  }
}

console.log(found ? `${found} transform clashes` : 'no transform clashes')
