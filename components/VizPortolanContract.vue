<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Portolan does not replace existing formats, specifications, or standards. It is an opinionated and checkable publishing practice built from STAC, cloud-native formats, HTTP range requests, and object storage. Its goals are AI-first access, easy implementation, scalability, low cost, and sovereignty.">
      <text x="400" y="31" text-anchor="middle" class="kicker">EXISTING PIECES, CHECKABLE PRACTICE</text>

      <!-- Draw the relationship first so the arrow stays behind both ideas. -->
      <path d="M347 164 H423" class="flow" />
      <path d="M409 153 L423 164 L409 175" class="flow" />
      <text x="385" y="143" text-anchor="middle" class="flow-label">COMBINES</text>

      <g class="building-blocks" :class="{ on: s >= 1 }">
        <text x="75" y="78" class="section-label">EXISTING BUILDING BLOCKS</text>
        <text x="75" y="125" class="block-title">STAC 1.1</text>
        <text x="75" y="164" class="block-copy">GeoParquet · COG · PMTiles</text>
        <text x="75" y="198" class="block-copy">HTTP range requests</text>
        <text x="75" y="232" class="block-copy">Object storage</text>
        <path d="M75 253 H329" class="under-rule" />
      </g>

      <g class="practice" :class="{ on: s >= 2 }">
        <rect x="438" y="68" width="287" height="196" rx="25" />
        <g transform="translate(482 116)">
          <circle r="23" class="rose-ring" />
          <path d="M0-20 L6-4 L0 0 L-6-4 Z M20 0 L4 6 L0 0 L4-6 Z M0 20 L-6 4 L0 0 L6 4 Z M-20 0 L-4-6 L0 0 L-4 6 Z" class="rose" />
        </g>
        <text x="518" y="124" class="practice-name">PORTOLAN</text>
        <text x="582" y="168" text-anchor="middle" class="practice-title">OPINIONATED</text>
        <text x="582" y="196" text-anchor="middle" class="practice-title">PUBLISHING PRACTICE</text>
        <text x="582" y="230" text-anchor="middle" class="practice-copy">publish · update · use</text>
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

.kicker { fill: var(--c-accent); font-size: 18px; font-weight: 900; letter-spacing: 0.075em; }
.flow { fill: none; stroke: var(--c-accent); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
.flow-label { fill: var(--c-accent); font-size: 11px; font-weight: 900; letter-spacing: 0.06em; }
.building-blocks, .practice, .goals { opacity: 0.42; }
.building-blocks.on, .practice.on, .goals.on { animation: contract-focus 430ms ease-out both; }
.section-label, .goals-label { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.075em; }
.block-title { fill: var(--c-fg); font-size: 37px; font-weight: 900; }
.block-copy { fill: var(--c-muted); font-size: 18px; font-weight: 750; }
.under-rule { stroke: var(--c-line); stroke-width: 3; }
.practice rect { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 4; }
.rose-ring { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2; }
.rose { fill: var(--c-accent); }
.practice-name { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.06em; }
.practice-title { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.035em; }
.practice-copy { fill: var(--c-muted); font-size: 17px; font-weight: 750; }
.goals-rule { stroke: var(--c-line); stroke-width: 3; }
.goals text { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.025em; }
.goals path { stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; }
</style>
