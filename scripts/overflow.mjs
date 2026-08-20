#!/usr/bin/env node
// Overflow report. Anything sticking out of its slide box is a layout bug a
// single screenshot can hide, because the slide container clips it.
import { chromium } from 'playwright-chromium'
import { SLIDES } from './validate-deck.mjs'

const port = process.argv[2] ?? '3040'
const width = Number(process.argv[3] ?? 1280)
const height = Number(process.argv[4] ?? 720)
const base = `http://localhost:${port}`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height } })

for (const spec of SLIDES) {
  const sel = `.slidev-page-${spec.n}`
  await page.goto(`${base}/${spec.n}?clicks=${spec.clicks}`, { waitUntil: 'networkidle' })
  await page.waitForSelector(sel, { state: 'attached', timeout: 15000 })
  await page.waitForTimeout(900)
  const bad = await page.evaluate((sel) => {
    const slide = document.querySelector(sel)
    if (!slide) return ['no slide element']
    const box = slide.getBoundingClientRect()
    const out = []
    for (const el of slide.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const over = []
      if (r.right > box.right + 1) over.push(`right by ${Math.round(r.right - box.right)}`)
      if (r.left < box.left - 1) over.push(`left by ${Math.round(box.left - r.left)}`)
      if (r.bottom > box.bottom + 1) over.push(`bottom by ${Math.round(r.bottom - box.bottom)}`)
      if (r.top < box.top - 1) over.push(`top by ${Math.round(box.top - r.top)}`)
      if (!over.length) continue
      const cls = typeof el.className === 'string' ? el.className : el.getAttribute('class')
      out.push(`${el.tagName.toLowerCase()}.${cls || '(none)'} ${over.join(', ')}`)
    }
    return [...new Set(out)]
  }, sel)
  if (bad.length) {
    console.log(`slide ${spec.n} (${spec.comp}) DOM`)
    for (const b of bad.slice(0, 8)) console.log(`  ${b}`)
  }

  // SVG content clips inside the <svg> element rather than pushing the DOM box
  // out, so a label running past the viewBox is invisible to the DOM check.
  // Measure every drawn node in viewBox units instead.
  const svgBad = await page.evaluate((sel) => {
    const svg = document.querySelector(`${sel} svg.canvas`)
    if (!svg) return []
    // Screen space, not user space. getBBox() ignores ancestor transforms, so
    // a group translated into place reads as overflowing when it is fine.
    const box = svg.getBoundingClientRect()
    const scale = svg.viewBox.baseVal.width / box.width
    const out = []
    for (const el of svg.querySelectorAll('text, rect, circle, ellipse, image, path, foreignObject')) {
      let node = el
      let hidden = false
      while (node && node !== svg) {
        const cs = getComputedStyle(node)
        if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) hidden = true
        node = node.parentElement
      }
      if (hidden) continue
      const r = el.getBoundingClientRect()
      if (!r.width && !r.height) continue
      const u = (px) => Math.round(px * scale)
      const over = []
      if (r.right > box.right + 0.5) over.push(`right by ${u(r.right - box.right)}`)
      if (r.left < box.left - 0.5) over.push(`left by ${u(box.left - r.left)}`)
      if (r.bottom > box.bottom + 0.5) over.push(`bottom by ${u(r.bottom - box.bottom)}`)
      if (r.top < box.top - 0.5) over.push(`top by ${u(box.top - r.top)}`)
      if (!over.length) continue
      const what = el.tagName === 'text' ? `"${(el.textContent || '').slice(0, 44)}"` : el.getAttribute('class') || el.tagName
      out.push(`${el.tagName} ${what} ${over.join(', ')}`)
    }
    return [...new Set(out)]
  }, sel)
  // A label wider than the panel it sits on is the commonest defect here, and it
  // never leaves the viewBox, so the check above cannot see it. For each text,
  // find a sibling rect that it visibly sits on, then require containment.
  const panelBad = await page.evaluate((sel) => {
    const svg = document.querySelector(`${sel} svg.canvas`)
    if (!svg) return []
    const out = []
    const overlap = (a, b) => {
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      return w > 0 && h > 0 ? (w * h) / (a.width * a.height) : 0
    }
    for (const t of svg.querySelectorAll('text')) {
      const cs = getComputedStyle(t)
      if (cs.display === 'none' || Number(cs.opacity) === 0) continue
      const tr = t.getBoundingClientRect()
      if (!tr.width || !tr.height) continue
      const parent = t.parentElement
      if (!parent) continue
      for (const rect of parent.querySelectorAll(':scope > rect')) {
        const rr = rect.getBoundingClientRect()
        const cover = overlap(tr, rr)
        if (cover < 0.5 || cover > 0.999) continue
        out.push(`"${(t.textContent || '').trim().slice(0, 40)}" runs past its panel, ${Math.round(cover * 100)}% inside`)
      }
    }
    return [...new Set(out)]
  }, sel)
  if (panelBad.length) {
    console.log(`slide ${spec.n} (${spec.comp}) label vs panel`)
    for (const b of panelBad.slice(0, 8)) console.log(`  ${b}`)
  }

  if (svgBad.length) {
    console.log(`slide ${spec.n} (${spec.comp}) SVG viewBox`)
    for (const b of svgBad.slice(0, 10)) console.log(`  ${b}`)
  }
}

await browser.close()
console.log('overflow pass done')
