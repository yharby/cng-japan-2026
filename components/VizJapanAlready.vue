<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Three independent examples feed one shared conclusion. JAXA publishes static COG and STAC, GSI publishes PMTiles, and Pacific Spatial converts PLATEAU for 211 cities to GeoParquet.">
      <text x="400" y="30" text-anchor="middle" class="kicker">THREE INDEPENDENT EXAMPLES</text>

      <g transform="translate(145 185)" class="example" :class="{ on: s >= 1 }">
        <text y="-108" text-anchor="middle" class="org">JAXA</text>
        <circle r="76" class="disc" />
        <circle r="57" class="orbit" />
        <path d="M-26 5 L7-27 L29-5 L-4 28 Z" class="sat" />
        <path d="M-33 -22 L-13 -12 M15 14 L35 24" class="signal" />
        <g class="details">
          <text y="101" text-anchor="middle" class="metric">80 collections</text>
          <text y="127" text-anchor="middle" class="detail">static COG + STAC</text>
        </g>
      </g>

      <g transform="translate(400 185)" class="example" :class="{ on: s >= 2 }">
        <text y="-108" text-anchor="middle" class="org">GSI</text>
        <circle r="76" class="disc" />
        <g class="tiles">
          <rect x="-39" y="-39" width="36" height="36" rx="5" />
          <rect x="3" y="-39" width="36" height="36" rx="5" />
          <rect x="-39" y="3" width="36" height="36" rx="5" />
          <rect x="3" y="3" width="36" height="36" rx="5" />
        </g>
        <path d="M-44 50 H44" class="archive" />
        <g class="details">
          <text y="101" text-anchor="middle" class="metric">PMTiles archive</text>
          <text y="127" text-anchor="middle" class="detail">trial since 2023</text>
        </g>
      </g>

      <g transform="translate(655 185)" class="example" :class="{ on: s >= 3 }">
        <text y="-108" text-anchor="middle" class="org org-small">PACIFIC SPATIAL</text>
        <circle r="76" class="disc" />
        <path d="M-44 41 V-7 L-22-26 L0-7 L22-33 L44-7 V41 Z" class="city" />
        <path d="M-31 13 H-17 M-7 13 H7 M17 13 H31 M-31 29 H-17 M-7 29 H7 M17 29 H31" class="windows" />
        <g class="details">
          <text y="101" text-anchor="middle" class="metric">211 cities</text>
          <text y="127" text-anchor="middle" class="detail">PLATEAU → GeoParquet</text>
          <text y="149" text-anchor="middle" class="credit">Hiroo Imaki and team</text>
        </g>
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
.orbit { fill: none; stroke: var(--c-accent); stroke-width: 2; stroke-dasharray: 7 7; }
.sat { fill: var(--c-accent); }
.signal { fill: none; stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; }
.tiles rect { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 3; }
.archive { fill: none; stroke: var(--c-ok); stroke-width: 7; stroke-linecap: round; }
.city { fill: var(--c-accent); opacity: 0.16; stroke: var(--c-accent); stroke-width: 4; }
.windows { stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; }
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
