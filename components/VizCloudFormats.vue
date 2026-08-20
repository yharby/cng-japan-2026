<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="GeoParquet and Cloud Optimized GeoTIFF files are stored as objects. Clients use HTTP range requests to read selected row groups, columns, tiles, or overviews.">
      <defs>
        <marker id="cf-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" class="marker-fill" />
        </marker>
      </defs>

      <path d="M214 214 C252 258 316 274 360 290" class="connector" marker-end="url(#cf-arrow)" />
      <path d="M586 214 C548 258 484 274 440 290" class="connector" marker-end="url(#cf-arrow)" />
      <path d="M400 374 V397" class="range-flow" marker-end="url(#cf-arrow)" />

      <g class="format vector" :class="{ on: s >= 1 }">
        <text x="205" y="38" text-anchor="middle" class="format-title">GEOPARQUET</text>
        <rect x="68" y="61" width="274" height="155" rx="16" class="format-frame" />
        <text x="90" y="91" class="mini-label">FOOTER + ROW GROUPS + COLUMNS</text>
        <g class="parquet-grid">
          <rect x="91" y="111" width="62" height="72" />
          <rect x="160" y="111" width="62" height="72" />
          <rect x="229" y="111" width="89" height="72" />
          <path d="M91 135 H318 M91 159 H318" />
        </g>
        <rect x="160" y="135" width="62" height="24" class="hot" />
        <text x="205" y="201" text-anchor="middle" class="mini-copy">selected columns and row groups</text>
      </g>

      <g class="format raster" :class="{ on: s >= 2 }">
        <text x="595" y="38" text-anchor="middle" class="format-title">COG</text>
        <rect x="458" y="61" width="274" height="155" rx="16" class="format-frame" />
        <text x="480" y="91" class="mini-label">TILES + INTERNAL OVERVIEWS</text>
        <g class="tile-grid">
          <rect x="484" y="111" width="96" height="72" />
          <path d="M516 111 V183 M548 111 V183 M484 135 H580 M484 159 H580" />
          <rect x="548" y="135" width="32" height="24" class="hot" />
          <rect x="616" y="119" width="72" height="54" />
          <path d="M640 119 V173 M664 119 V173 M616 137 H688 M616 155 H688" />
        </g>
        <text x="595" y="201" text-anchor="middle" class="mini-copy">selected tiles or a small overview</text>
      </g>

      <g class="storage" :class="{ on: s >= 3 }">
        <path d="M304 289 H496 V342 C496 359 453 373 400 373 C347 373 304 359 304 342 Z" class="bucket" />
        <path d="M304 289 C304 272 347 258 400 258 C453 258 496 272 496 289 C496 306 453 320 400 320 C347 320 304 306 304 289 Z" class="bucket-top" />
        <text x="400" y="338" text-anchor="middle" class="bucket-title">OBJECT STORAGE</text>
        <text x="400" y="360" text-anchor="middle" class="bucket-copy">stable URLs · scalable reads</text>
      </g>

      <g class="clients" :class="{ on: s >= 4 }">
        <text x="400" y="399" text-anchor="middle" class="range-label">HTTP RANGE REQUESTS</text>
        <g transform="translate(103 412)">
          <rect width="126" height="36" rx="8" />
          <text x="63" y="24" text-anchor="middle">DuckDB</text>
        </g>
        <g transform="translate(252 412)">
          <rect width="126" height="36" rx="8" />
          <text x="63" y="24" text-anchor="middle">QGIS</text>
        </g>
        <g transform="translate(422 412)">
          <rect width="126" height="36" rx="8" />
          <text x="63" y="24" text-anchor="middle">xarray</text>
        </g>
        <g transform="translate(571 412)">
          <rect width="126" height="36" rx="8" />
          <text x="63" y="24" text-anchor="middle">AI agent</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes cf-focus {
  from { opacity: 0.32; }
  to { opacity: 1; }
}
@keyframes cf-rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.connector { fill: none; stroke: var(--c-line); stroke-width: 4; }
.range-flow { fill: none; stroke: var(--c-accent); stroke-width: 4; }
.marker-fill { fill: var(--c-accent); }
.format { opacity: 0.32; }
.format.on { animation: cf-focus 420ms ease-out both; }
.format-title { fill: var(--c-fg); font-size: 21px; font-weight: 900; letter-spacing: 0.07em; }
.format-frame { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.format.on .format-frame { stroke: var(--c-accent); }
.mini-label { fill: var(--c-muted); font-size: 12px; font-weight: 900; letter-spacing: 0.04em; }
.mini-copy { fill: var(--c-muted); font-size: 14px; font-weight: 750; }
.parquet-grid rect, .tile-grid rect { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.parquet-grid path, .tile-grid path { fill: none; stroke: var(--c-line); stroke-width: 2; }
.vector > .hot, .tile-grid .hot { fill: var(--c-accent) !important; fill-opacity: 0.22; stroke: var(--c-accent); }
.storage { opacity: 0.32; }
.storage.on { animation: cf-focus 430ms ease-out both; }
.bucket { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 3; }
.bucket-top { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 3; }
.bucket-title { fill: var(--c-fg); font-size: 18px; font-weight: 900; letter-spacing: 0.05em; }
.bucket-copy { fill: var(--c-muted); font-size: 14px; font-weight: 750; }
.clients { opacity: 0; }
.clients.on { animation: cf-rise 430ms ease-out both; }
.clients rect { fill: var(--c-fg); }
.clients text { fill: var(--c-bg); font-size: 14px; font-weight: 850; }
.range-label { fill: var(--c-accent) !important; font-size: 12px !important; letter-spacing: 0.07em; }
</style>
