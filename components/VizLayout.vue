<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="One Netherlands Provinces collection has three separate entrances. Software uses collection.json, people use README.md, and AI agents use AGENTS.md. Each entrance leads to the same published assets.">
      <text x="400" y="30" text-anchor="middle" class="kicker">ONE COLLECTION · THREE ENTRANCES</text>

      <g class="collection">
        <rect x="218" y="50" width="364" height="66" rx="16" class="collection-body" />
        <path d="M246 72 H264 L273 81 H292 V101 H246 Z" class="folder-icon" />
        <text x="422" y="92" text-anchor="middle" class="collection-name">netherlands-provinces/</text>
      </g>

      <path d="M400 116 V146 M159 146 H641 M159 146 V170 M400 146 V170 M641 146 V170" class="branches" />

      <g class="door" :class="{ visited: s >= 1, active: s === 1 }">
        <rect x="54" y="170" width="210" height="172" rx="18" class="door-card" />
        <path d="M76 193 H242 V322 H76 Z" class="door-line" />
        <text x="159" y="218" text-anchor="middle" class="audience">SOFTWARE</text>
        <text x="159" y="263" text-anchor="middle" class="file small-file">collection.json</text>
        <text x="159" y="296" text-anchor="middle" class="job">metadata · links</text>
      </g>

      <g class="door" :class="{ visited: s >= 2, active: s === 2 }">
        <rect x="295" y="170" width="210" height="172" rx="18" class="door-card" />
        <path d="M317 193 H483 V322 H317 Z" class="door-line" />
        <text x="400" y="218" text-anchor="middle" class="audience">PEOPLE</text>
        <text x="400" y="263" text-anchor="middle" class="file">README.md</text>
        <text x="400" y="296" text-anchor="middle" class="job">meaning · license</text>
      </g>

      <g class="door" :class="{ visited: s >= 3, active: s === 3 }">
        <rect x="536" y="170" width="210" height="172" rx="18" class="door-card" />
        <path d="M558 193 H724 V322 H558 Z" class="door-line" />
        <text x="641" y="218" text-anchor="middle" class="audience">AI AGENTS</text>
        <text x="641" y="263" text-anchor="middle" class="file">AGENTS.md</text>
        <text x="641" y="296" text-anchor="middle" class="job">queries · caveats</text>
      </g>

      <g class="assets">
        <text x="400" y="374" text-anchor="middle" class="asset-label">THE SAME PUBLISHED ASSETS</text>
        <line x1="92" y1="389" x2="708" y2="389" class="asset-line" />
        <text x="400" y="419" text-anchor="middle" class="asset-text">GeoParquet · PMTiles · styles · thumbnail · original source</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 18px; font-weight: 900; letter-spacing: 0.08em; }
.collection-body { fill: var(--c-panel); stroke: var(--c-fg); stroke-width: 3; }
.folder-icon { fill: color-mix(in srgb, var(--c-accent) 14%, var(--c-panel)); stroke: var(--c-accent); stroke-width: 2.5; stroke-linejoin: round; }
.collection-name, .file { fill: var(--c-fg); font-family: ui-monospace, 'JetBrains Mono', monospace; font-weight: 900; }
.collection-name { font-size: 21px; }
.branches { fill: none; stroke: var(--c-line); stroke-width: 4; stroke-linecap: round; }
.door { opacity: 0.38; transition: opacity 300ms ease, transform 300ms ease; transform-origin: center; }
.door.visited { opacity: 0.7; }
.door.active { opacity: 1; transform: translateY(-5px); }
.door-card { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 3; }
.door-line { fill: none; stroke: var(--c-line); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
.door.active .door-card, .door.active .door-line { stroke: var(--c-accent); }
.door.active .audience { fill: var(--c-accent); }
.audience { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.08em; }
.file { font-size: 22px; }
.small-file { font-size: 19px; }
.job { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.asset-label { fill: var(--c-muted); font-size: 13px; font-weight: 900; letter-spacing: 0.12em; }
.asset-line { stroke: var(--c-line); stroke-width: 2; }
.asset-text { fill: var(--c-fg); font-size: 17px; font-weight: 800; }
</style>
