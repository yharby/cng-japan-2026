<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const current = [
  ['GeoParquet', 'vector data'],
  ['COG', 'raster data'],
  ['Parquet', 'companion tables'],
  ['PMTiles', 'visualization derivative'],
]

const later = [
  ['COPC', 'point clouds'],
  ['GeoZarr', 'multidimensional arrays'],
  ['STAC–GeoParquet', 'full catalog index'],
]
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
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
          <circle cx="14" cy="-7" r="13" class="check-disc" />
          <path d="M7 -7 L12 -2 L21 -13" class="check" />
          <text x="42" y="0" class="item-title">{{ item[0] }}</text>
          <text x="42" y="25" class="item-note">{{ item[1] }}</text>
        </g>
      </g>

      <g class="items" :class="{ on: s >= 2 }">
        <g v-for="(item, i) in later" :key="item[0]" :transform="`translate(444 ${178 + i * 82})`">
          <circle cx="14" cy="-7" r="13" class="later-disc" />
          <line x1="7" y1="-7" x2="21" y2="-7" class="dash" />
          <text x="42" y="0" class="item-title">{{ item[0] }}</text>
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
.check-disc { fill: var(--c-ok); }
.check { fill: none; stroke: var(--c-bg); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.later-disc { fill: var(--c-bg); stroke: var(--c-warn); stroke-width: 3; }
.dash { stroke: var(--c-warn); stroke-width: 3; stroke-linecap: round; }
.item-title { fill: var(--c-fg); font-size: 21px; font-weight: 900; }
.item-note { fill: var(--c-muted); font-size: 17px; font-weight: 750; }
.honesty { fill: var(--c-warn); font-size: 17px; font-weight: 850; }
</style>
