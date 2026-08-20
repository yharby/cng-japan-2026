<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const current = [
  ['GeoParquet', 'vector data', 'https://geoparquet.org/'],
  ['COG', 'raster data', 'https://docs.ogc.org/is/21-026/21-026.html'],
  ['Parquet', 'companion tables', 'https://parquet.apache.org/docs/file-format/'],
  ['PMTiles', 'visualization derivative', 'https://docs.protomaps.com/pmtiles/'],
]

const later = [
  ['COPC', 'point clouds', 'https://copc.io/'],
  ['GeoZarr', 'multidimensional arrays', 'https://github.com/zarr-developers/geozarr-spec'],
  ['STAC–GeoParquet', 'full catalog index', 'https://github.com/stac-utils/stac-geoparquet'],
]
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="A clear scope boundary. Portolan currently validates GeoParquet vectors, COG rasters, companion Parquet tables, and PMTiles visualization derivatives. It does not yet define normative rules for COPC, GeoZarr, or a full STAC-GeoParquet catalog index.">
      <text x="400" y="34" text-anchor="middle" class="version">IMPLEMENTED SCOPE · v0.1.1</text>

      <line x1="400" y1="62" x2="400" y2="424" class="boundary" />
      <circle cx="400" cy="78" r="8" class="boundary-dot" />

      <text x="58" y="92" class="heading now">VALIDATED NOW</text>
      <text x="58" y="120" class="heading-ja">現在、検証できる</text>

      <text x="444" y="92" class="heading later">NO NORMATIVE RULES YET</text>
      <text x="444" y="120" class="heading-ja">規範的なルールは未定</text>

      <g class="items" :class="{ on: s >= 1 }">
        <g v-for="(item, i) in current" :key="item[0]" :transform="`translate(58 ${166 + i * 66})`">
          <lucide-circle-check-big x="0" y="-21" width="28" height="28" class="scope-icon current-icon" />
          <a :href="item[2]" target="_blank" rel="noopener noreferrer" class="svg-source-link"
             :class="{ 'is-disabled': s < 1 }" :tabindex="s >= 1 ? 0 : -1"
             :aria-label="`Open ${item[0]} documentation in a new tab`" @click.stop>
          <text x="42" y="0" class="item-title link-label">{{ item[0] }}</text>
          </a>
          <text x="42" y="25" class="item-note">{{ item[1] }}</text>
        </g>
      </g>

      <g class="items" :class="{ on: s >= 2 }">
        <g v-for="(item, i) in later" :key="item[0]" :transform="`translate(444 ${178 + i * 82})`">
          <lucide-circle-minus x="0" y="-21" width="28" height="28" class="scope-icon later-icon" />
          <a :href="item[2]" target="_blank" rel="noopener noreferrer" class="svg-source-link"
             :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
             :aria-label="`Open ${item[0]} documentation in a new tab`" @click.stop>
          <text x="42" y="0" class="item-title link-label">{{ item[0] }}</text>
          </a>
          <text x="42" y="25" class="item-note">{{ item[1] }}</text>
        </g>
        <text x="444" y="414" class="honesty">Roadmap ≠ implemented scope</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.version { fill: var(--c-muted); font-size: 17px; font-weight: 850; letter-spacing: 0.085em; }
.boundary { stroke: var(--c-line); stroke-width: 3; }
.boundary-dot { fill: var(--c-accent); }
.heading { font-size: 21px; font-weight: 900; letter-spacing: 0.045em; }
.heading.now { fill: var(--c-ok); }
.heading.later { fill: var(--c-warn); font-size: 19px; }
.heading-ja { fill: var(--c-muted); font-size: 15px; font-weight: 750; font-family: 'Noto Sans JP', sans-serif; }
.items { opacity: 0; }
.items.on { animation: reveal 420ms ease-out both; }
.current-icon { color: var(--c-ok); }
.later-icon { color: var(--c-warn); }
.item-title { fill: var(--c-fg); font-size: 21px; font-weight: 900; }
.item-note { fill: var(--c-muted); font-size: 17px; font-weight: 750; }
.honesty { fill: var(--c-warn); font-size: 17px; font-weight: 850; }
</style>
