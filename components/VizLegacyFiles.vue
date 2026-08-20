<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Two legacy download paths. A national CSV must be downloaded and parsed before a small row selection. A non cloud optimized JAXA GeoTIFF tile must be opened as one strip before a small raster window can be analyzed.">
      <path d="M400 56 V376" class="divider" />

      <g class="lane vector" :class="{ on: s >= 1 }">
        <text x="201" y="42" text-anchor="middle" class="lane-title">VECTOR AND TABLE DATA</text>
        <text x="201" y="68" text-anchor="middle" class="lane-source">e-Stat population mesh CSV</text>

        <path d="M54 102 H258 L294 138 V302 H54 Z" class="file" />
        <path d="M258 102 V138 H294" class="fold" />
        <text x="174" y="139" text-anchor="middle" class="file-name">national.csv</text>
        <text x="174" y="171" text-anchor="middle" class="scenario">2.4 GB example</text>
        <g class="rows">
          <path d="M84 204 H264 M84 232 H264 M84 260 H264" />
          <path d="M130 192 V274 M214 192 V274" />
        </g>

        <path d="M304 205 H362" class="flow" />
        <path d="M349 194 L362 205 L349 216" class="flow" />
        <text x="333" y="187" text-anchor="middle" class="flow-label">FULL READ</text>

        <g transform="translate(312 231)">
          <rect width="70" height="28" rx="6" class="memory" />
          <rect y="38" width="70" height="28" rx="6" class="memory" />
          <rect y="76" width="70" height="28" rx="6" class="memory" />
          <text x="35" y="19" text-anchor="middle">pandas</text>
          <text x="35" y="57" text-anchor="middle">Polars</text>
          <text x="35" y="95" text-anchor="middle">GeoPandas</text>
        </g>

        <text x="201" y="341" text-anchor="middle" class="need">Need a few rows</text>
        <text x="201" y="368" text-anchor="middle" class="cost">download · parse · allocate · filter</text>
      </g>

      <g class="lane raster" :class="{ on: s >= 2 }">
        <text x="602" y="42" text-anchor="middle" class="lane-title">RASTER DATA</text>
        <text x="602" y="68" text-anchor="middle" class="lane-source">JAXA AW3D30 GeoTIFF</text>

        <rect x="452" y="102" width="300" height="200" rx="10" class="raster-frame" />
        <path d="M452 127 H752 M452 152 H752 M452 177 H752 M452 202 H752 M452 227 H752 M452 252 H752 M452 277 H752" class="strips" />
        <rect x="614" y="189" width="54" height="42" rx="4" class="window" />
        <text x="641" y="216" text-anchor="middle" class="window-label">ROI</text>
        <path d="M641 236 V322" class="flow" />
        <path d="M630 309 L641 322 L652 309" class="flow" />
        <text x="641" y="345" text-anchor="middle" class="need">Need one window</text>
        <text x="602" y="368" text-anchor="middle" class="cost">one strip · no overview preview · many tiles at scale</text>
      </g>

      <g class="summary" :class="{ on: s >= 3 }">
        <rect x="84" y="397" width="632" height="47" rx="12" />
        <text x="400" y="428" text-anchor="middle">SMALL QUESTION · LARGE DOWNLOAD · LARGE MEMORY</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes lf-focus {
  from { opacity: 0.36; }
  to { opacity: 1; }
}
@keyframes lf-rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.divider { stroke: var(--c-line); stroke-width: 3; }
.lane { opacity: 0.36; }
.lane.on { animation: lf-focus 420ms ease-out both; }
.lane-title { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.06em; }
.lane-source { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.file, .raster-frame { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.vector.on .file, .raster.on .raster-frame { stroke: var(--c-accent); }
.fold, .rows path { fill: none; stroke: var(--c-line); stroke-width: 3; }
.rows path { stroke-width: 4; }
.file-name { fill: var(--c-fg); font-size: 22px; font-weight: 900; }
.scenario { fill: var(--c-accent); font-size: 16px; font-weight: 900; }
.flow { fill: none; stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.flow-label { fill: var(--c-accent); font-size: 11px; font-weight: 900; letter-spacing: 0.06em; }
.memory { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2; }
.memory + text, .memory ~ text { fill: var(--c-fg); font-size: 11px; font-weight: 800; }
.strips { stroke: var(--c-line); stroke-width: 2; }
.window { fill: color-mix(in srgb, var(--c-accent) 20%, var(--c-bg)); stroke: var(--c-accent); stroke-width: 4; }
.window-label { fill: var(--c-accent); font-size: 13px; font-weight: 900; }
.need { fill: var(--c-fg); font-size: 21px; font-weight: 900; }
.cost { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
.summary { opacity: 0; }
.summary.on { animation: lf-rise 430ms ease-out both; }
.summary rect { fill: var(--c-fg); }
.summary text { fill: var(--c-bg); font-size: 16px; font-weight: 900; letter-spacing: 0.05em; }
</style>
