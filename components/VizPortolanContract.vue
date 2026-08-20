<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="Portolan does not replace existing formats, specifications, or standards. It is an opinionated and checkable publishing practice built from STAC, cloud-native formats, HTTP range requests, and object storage. Its goals are AI-first access, easy implementation, scalability, low cost, and sovereignty.">
      <text x="400" y="31" text-anchor="middle" class="kicker">EXISTING PIECES, CHECKABLE PRACTICE</text>

      <!-- Draw the relationship first so the arrow stays behind both ideas. -->
      <path d="M347 164 H423" class="flow" />
      <path d="M409 153 L423 164 L409 175" class="flow" />
      <text x="385" y="143" text-anchor="middle" class="flow-label">COMBINES</text>

      <g class="building-blocks" :class="{ on: s >= 1 }">
        <text x="75" y="78" class="section-label">EXISTING BUILDING BLOCKS</text>
        <a href="https://github.com/radiantearth/stac-spec" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the STAC specification in a new tab" @click.stop>
          <text x="75" y="125" class="block-title link-label">STAC 1.1</text>
        </a>
        <a href="https://geoparquet.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open GeoParquet documentation in a new tab" @click.stop>
          <text x="75" y="164" class="block-copy link-label">GeoParquet</text>
        </a>
        <text x="183" y="164" class="block-copy">·</text>
        <a href="https://docs.ogc.org/is/21-026/21-026.html" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the COG standard in a new tab" @click.stop>
          <text x="201" y="164" class="block-copy link-label">COG</text>
        </a>
        <text x="244" y="164" class="block-copy">·</text>
        <a href="https://docs.protomaps.com/pmtiles/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open PMTiles documentation in a new tab" @click.stop>
          <text x="262" y="164" class="block-copy link-label">PMTiles</text>
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           aria-label="Open the HTTP range request documentation in a new tab" @click.stop>
          <text x="75" y="198" class="block-copy link-label">HTTP range requests</text>
        </a>
        <a href="https://cloudnativegeo.org/about/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Cloud Native Geospatial object storage overview in a new tab" @click.stop>
          <text x="75" y="232" class="block-copy link-label">Object storage</text>
        </a>
        <path d="M75 253 H329" class="under-rule" />
      </g>

      <g class="practice" :class="{ on: s >= 2 }">
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/README.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           aria-label="Open the Portolan specification in a new tab" @click.stop>
        <rect x="438" y="68" width="287" height="196" rx="5" class="link-target" />
        <image href="/portolan-mark.svg" x="457" y="91" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
        <text x="518" y="124" class="practice-name link-label">PORTOLAN</text>
        <text x="582" y="168" text-anchor="middle" class="practice-title">OPINIONATED</text>
        <text x="582" y="196" text-anchor="middle" class="practice-title">PUBLISHING PRACTICE</text>
        <text x="582" y="230" text-anchor="middle" class="practice-copy">publish · update · use</text>
        </a>
      </g>

      <g class="goals" :class="{ on: s >= 3 }">
        <text x="400" y="309" text-anchor="middle" class="goals-label">DESIGNED FOR</text>
        <path d="M63 331 H737" class="goals-rule" />

        <g transform="translate(92 370)">
          <text text-anchor="middle">AI-FIRST</text>
          <path d="M-34 17 H34" />
        </g>
        <g transform="translate(246 359)">
          <text text-anchor="middle">EASY TO</text>
          <text y="25" text-anchor="middle">IMPLEMENT</text>
          <path d="M-49 43 H49" />
        </g>
        <g transform="translate(400 370)">
          <text text-anchor="middle">SCALABLE</text>
          <path d="M-39 17 H39" />
        </g>
        <g transform="translate(550 370)">
          <text text-anchor="middle">LOW COST</text>
          <path d="M-41 17 H41" />
        </g>
        <g transform="translate(704 370)">
          <text text-anchor="middle">SOVEREIGN</text>
          <path d="M-45 17 H45" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes contract-focus {
  from { opacity: 0.38; transform: translateY(7px); }
  to { opacity: 1; }
}

.kicker { fill: var(--c-portolan); font-size: 18px; font-weight: 900; letter-spacing: 0.075em; }
.flow { fill: none; stroke: var(--c-portolan); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
.flow-label { fill: var(--c-portolan); font-size: 11px; font-weight: 900; letter-spacing: 0.06em; }
.building-blocks, .practice, .goals { opacity: 0.42; }
.building-blocks.on, .practice.on, .goals.on { animation: contract-focus 430ms ease-out both; }
.section-label, .goals-label { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.075em; }
.block-title { fill: var(--c-fg); font-size: 37px; font-weight: 900; }
.block-copy { fill: var(--c-muted); font-size: 18px; font-weight: 750; }
.under-rule { stroke: var(--c-line); stroke-width: 3; }
.practice rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 4; }
.practice-name { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.06em; }
.practice-title { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.035em; }
.practice-copy { fill: var(--c-portolan); font-size: 17px; font-weight: 850; }
.goals-rule { stroke: var(--c-line); stroke-width: 3; }
.goals text { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.025em; }
.goals path { stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; }
</style>
