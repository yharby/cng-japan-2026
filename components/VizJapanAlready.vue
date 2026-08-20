<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="Three independent examples feed one shared conclusion. JAXA publishes static COG and STAC, GSI publishes PMTiles, and Pacific Spatial converts PLATEAU for 211 cities to GeoParquet.">
      <text x="400" y="30" text-anchor="middle" class="kicker">THREE INDEPENDENT EXAMPLES</text>

      <g transform="translate(145 185)" class="example" :class="{ on: s >= 1 }">
        <a href="https://data.earth.jaxa.jp/en/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the JAXA Earth data catalog in a new tab" @click.stop>
        <text y="-108" text-anchor="middle" class="org link-label">JAXA</text>
        <circle r="76" class="disc link-target" />
        <lucide-satellite x="-38" y="-38" width="76" height="76" class="example-icon" />
        <g class="details">
          <text y="101" text-anchor="middle" class="metric">80 collections</text>
          <text y="127" text-anchor="middle" class="detail">static COG + STAC</text>
        </g>
        </a>
      </g>

      <g transform="translate(400 185)" class="example" :class="{ on: s >= 2 }">
        <a href="https://github.com/gsi-cyberjapan/optimal_bvmap" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open GSI's PMTiles trial repository in a new tab" @click.stop>
        <text y="-108" text-anchor="middle" class="org link-label">GSI</text>
        <circle r="76" class="disc link-target" />
        <lucide-layout-grid x="-38" y="-38" width="76" height="76" class="example-icon" />
        <path d="M-44 50 H44" class="archive" />
        <g class="details">
          <text y="101" text-anchor="middle" class="metric">PMTiles archive</text>
          <text y="127" text-anchor="middle" class="detail">trial since 2023</text>
        </g>
        </a>
      </g>

      <g transform="translate(655 185)" class="example" :class="{ on: s >= 3 }">
        <a href="https://source.coop/repositories/pacificspatial/flateau/description" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open Pacific Spatial's Flateau dataset on Source Cooperative in a new tab" @click.stop>
        <text y="-108" text-anchor="middle" class="org org-small link-label">PACIFIC SPATIAL</text>
        <circle r="76" class="disc link-target" />
        <lucide-building-2 x="-38" y="-38" width="76" height="76" class="example-icon" />
        <g class="details">
          <text y="101" text-anchor="middle" class="metric">211 cities</text>
          <text y="127" text-anchor="middle" class="detail">PLATEAU → GeoParquet</text>
          <text y="149" text-anchor="middle" class="credit">Hiroo Imaki and team</text>
        </g>
        </a>
      </g>

      <!-- A bracket, not a rail: the examples support one shared pattern. -->
      <path d="M145 350 V365 H655 V350 M400 365 V383" class="bracket" />
      <g class="conclusion" :class="{ on: s >= 3 }">
        <text x="400" y="424" text-anchor="middle" class="conclusion-main">STATIC · CLOUD-NATIVE · DIRECT ACCESS</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes ja-focus {
  from { opacity: 0.42; }
  to { opacity: 1; }
}

.kicker { fill: var(--c-muted); font-size: 18px; font-weight: 900; letter-spacing: 0.08em; }
.example { opacity: 0.42; }
.example.on { animation: ja-focus 460ms cubic-bezier(0.2, 0.8, 0.3, 1) both; }
.disc { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.example.on .disc { stroke: var(--c-accent); }
.example-icon { color: var(--c-portolan); }
.archive { fill: none; stroke: var(--c-ok); stroke-width: 7; stroke-linecap: round; }
.org { fill: var(--c-fg); font-size: 28px; font-weight: 900; }
.org-small { font-size: 20px; }
.details { opacity: 0; }
.example.on .details { opacity: 1; }
.metric { fill: var(--c-fg); font-size: 21px; font-weight: 900; }
.detail { fill: var(--c-muted); font-size: 16px; font-weight: 700; }
.credit { fill: var(--c-muted); font-size: 13px; font-weight: 700; }
.bracket { fill: none; stroke: var(--c-line); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.conclusion { opacity: 0.48; }
.conclusion.on { animation: ja-focus 480ms ease-out both; }
.conclusion-main { fill: var(--c-accent); font-size: 22px; font-weight: 900; letter-spacing: 0.055em; }
</style>
