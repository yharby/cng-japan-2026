<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="A request for one small Yokohama city block is separate from the city-wide 2.47 gigabyte ZIP with 20,424 entries that the portal returns.">
      <text x="400" y="31" text-anchor="middle" class="kicker">ONE SMALL REQUEST · ONE CITY-WIDE DOWNLOAD</text>

      <g class="request" :class="{ on: s >= 1 }">
        <text x="176" y="78" text-anchor="middle" class="section-label">WHAT I NEED</text>
        <rect x="45" y="96" width="262" height="238" rx="22" class="map-frame" />
        <path d="M92 96 V334 M166 96 V334 M238 96 V334 M45 148 H307 M45 220 H307 M45 282 H307" class="streets" />
        <rect x="174" y="228" width="56" height="46" rx="5" class="block" />
        <path d="M202 228 V274 M174 251 H230" class="block-street" />
        <path d="M238 250 C282 250 320 242 351 224" class="request-arrow" />
        <path d="M338 219 L351 224 L341 234" class="request-arrow" />
        <text x="176" y="366" text-anchor="middle" class="request-title">ONE YOKOHAMA BLOCK</text>
        <text x="176" y="392" text-anchor="middle" class="request-note">a small spatial request</text>
      </g>

      <g class="archive" :class="{ on: s >= 2 }">
        <text x="570" y="78" text-anchor="middle" class="section-label">WHAT THE PORTAL RETURNS</text>
        <path d="M383 118 H483 L510 94 H744 V334 H383 Z" class="zip-body" />
        <path d="M383 118 H744" class="zip-fold" />
        <text x="414" y="185" class="archive-size">2.47 GB</text>
        <text x="414" y="220" class="archive-title">YOKOHAMA CITY-WIDE ZIP</text>
        <g class="entry-lines">
          <path d="M416 255 H552 M416 280 H618 M416 305 H523" />
          <circle cx="650" cy="255" r="5" />
          <circle cx="650" cy="280" r="5" />
          <circle cx="650" cy="305" r="5" />
        </g>
        <text x="570" y="366" text-anchor="middle" class="entry-count">20,424 ZIP entries</text>
        <text x="570" y="392" text-anchor="middle" class="archive-note">the whole package first</text>
      </g>

      <g class="download" :class="{ on: s >= 2 }">
        <path d="M360 424 H762" class="download-rule" />
        <text x="561" y="446" text-anchor="middle">ONE BLOCK REQUEST → 2.47 GB DOWNLOAD</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes oz-pulse {
  0%, 100% { stroke-width: 4; }
  50% { stroke-width: 8; }
}
@keyframes oz-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}

.kicker, .section-label { fill: var(--c-muted); font-weight: 900; letter-spacing: 0.08em; }
.kicker { font-size: 18px; }
.section-label { font-size: 16px; }
.map-frame, .zip-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.request.on .map-frame { stroke: var(--c-accent); animation: oz-pulse 1.5s ease-in-out infinite; }
.streets { fill: none; stroke: var(--c-bg); stroke-width: 15; }
.block { fill: color-mix(in srgb, var(--c-accent) 22%, var(--c-bg)); stroke: var(--c-accent); stroke-width: 4; }
.request.on .block { animation: oz-pulse 1.5s ease-in-out infinite; }
.block-street { fill: none; stroke: var(--c-bg); stroke-width: 5; }
.request-arrow { fill: none; stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.request-title, .archive-title { fill: var(--c-fg); font-size: 20px; font-weight: 900; letter-spacing: 0.035em; }
.request-note, .archive-note { fill: var(--c-muted); font-size: 17px; font-weight: 700; }
.zip-fold { fill: none; stroke: var(--c-fg); stroke-width: 3; }
.archive-size { fill: var(--c-fg); font-size: 54px; font-weight: 900; }
.entry-lines path { fill: none; stroke: var(--c-line); stroke-width: 8; stroke-linecap: round; }
.entry-lines circle { fill: var(--c-accent); }
.entry-count { fill: var(--c-fg); font-size: 24px; font-weight: 900; }
.archive.on .zip-body { stroke: var(--c-accent); animation: oz-pulse 1.5s ease-in-out infinite; }
.download { opacity: 0; }
.download.on { animation: oz-rise 420ms ease-out both; }
.download-rule { stroke: var(--c-accent); stroke-width: 3; }
.download text { fill: var(--c-accent); font-size: 16px; font-weight: 900; letter-spacing: 0.045em; }
</style>
