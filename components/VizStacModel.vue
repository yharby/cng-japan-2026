<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="The STAC model. A catalog links collections. A collection describes one dataset and links items. An item describes one place and time and links assets containing the actual data.">
      <defs>
        <marker id="sm-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" class="marker-fill" />
        </marker>
      </defs>

      <path d="M214 190 H281" class="link" marker-end="url(#sm-arrow)" />
      <path d="M475 190 H542" class="link" marker-end="url(#sm-arrow)" />
      <path d="M637 235 V296" class="link" marker-end="url(#sm-arrow)" />

      <g class="node catalog">
        <rect x="43" y="116" width="171" height="148" rx="20" />
        <text x="128" y="156" text-anchor="middle" class="node-kind">CATALOG</text>
        <text x="128" y="193" text-anchor="middle" class="node-file">catalog.json</text>
        <text x="128" y="226" text-anchor="middle" class="node-copy">links the graph</text>
      </g>

      <g class="node collection" :class="{ on: s >= 1 }">
        <rect x="281" y="96" width="194" height="188" rx="20" />
        <text x="378" y="138" text-anchor="middle" class="node-kind">COLLECTION</text>
        <text x="378" y="175" text-anchor="middle" class="node-file">collection.json</text>
        <text x="378" y="209" text-anchor="middle" class="node-copy">one dataset</text>
        <text x="378" y="235" text-anchor="middle" class="node-copy">extent · license · providers</text>
      </g>

      <g class="node item" :class="{ on: s >= 2 }">
        <rect x="542" y="96" width="190" height="139" rx="20" />
        <text x="637" y="137" text-anchor="middle" class="node-kind">ITEM</text>
        <text x="637" y="173" text-anchor="middle" class="node-file">item.json</text>
        <text x="637" y="205" text-anchor="middle" class="node-copy">one place and time</text>
      </g>

      <g class="node asset" :class="{ on: s >= 3 }">
        <rect x="542" y="296" width="190" height="116" rx="20" />
        <text x="637" y="337" text-anchor="middle" class="node-kind">ASSETS</text>
        <text x="637" y="370" text-anchor="middle" class="node-file">*.parquet · *.tif</text>
        <text x="637" y="397" text-anchor="middle" class="node-copy">the actual data</text>
      </g>

      <g class="legend">
        <path d="M62 391 H457" />
        <text x="62" y="421">STAC is linked JSON metadata. Assets stay in object storage.</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes sm-focus {
  from { opacity: 0.27; }
  to { opacity: 1; }
}

.link { fill: none; stroke: var(--c-line); stroke-width: 4; }
.marker-fill { fill: var(--c-accent); }
.node rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.catalog rect { stroke: var(--c-accent); }
.collection, .item, .asset { opacity: 0.27; }
.collection.on, .item.on, .asset.on { animation: sm-focus 430ms ease-out both; }
.collection.on rect, .item.on rect, .asset.on rect { stroke: var(--c-accent); }
.node-kind { fill: var(--c-accent); font-size: 17px; font-weight: 900; letter-spacing: 0.08em; }
.node-file { fill: var(--c-fg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 17px; font-weight: 850; }
.node-copy { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
.legend path { stroke: var(--c-accent); stroke-width: 3; }
.legend text { fill: var(--c-fg); font-size: 17px; font-weight: 800; }
</style>
