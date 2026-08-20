#!/usr/bin/env node
// The asset base baked into a Slidev build.
//
// The base is the only thing that separates a working deploy from a white page,
// and a build carries it in its entry script URL. Both `preview.mjs` and
// `smoke.mjs` read it back out of the artifact rather than trusting a flag,
// because a flag can disagree with what was actually built.
export function readBase(html) {
  const m = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)
  if (!m) throw new Error('no module script in dist/index.html, is this a Slidev build?')
  const src = m[1]
  const cut = src.lastIndexOf('/assets/')
  if (cut < 0) throw new Error(`unexpected entry path, ${src}`)
  return `${src.slice(0, cut)}/`
}
