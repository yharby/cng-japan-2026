<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const steps = [
  { title: 'CATALOG', note: 'links', x: 72, reveal: 0 },
  { title: 'INSPECT', note: 'schema + CRS', x: 236, reveal: 1 },
  { title: 'QUERY', note: 'filter + LIMIT', x: 400, reveal: 2 },
  { title: 'REUSE', note: 'PMTiles + style', x: 564, reveal: 3 },
  { title: 'PROVE', note: 'SQL + map', x: 728, reveal: 4 },
]
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="A continuous evidence flow: catalog, inspect schema and CRS, query with an early filter and limit, reuse PMTiles and style, then prove the answer with SQL and a map. The skill supplies instructions and checks. DuckDB and MapLibre do the execution.">
      <text x="400" y="34" text-anchor="middle" class="eyebrow">QUESTION → EVIDENCE</text>

      <line x1="72" y1="166" x2="728" y2="166" class="rail" />

      <g v-for="(step, i) in steps" :key="step.title">
        <g v-if="i > 0" class="connector" :class="{ on: s >= step.reveal }">
          <line :x1="steps[i - 1].x + 46" y1="166" :x2="step.x - 46" y2="166" />
          <path :d="`M${step.x - 56} 157 L${step.x - 46} 166 L${step.x - 56} 175`" />
        </g>

        <g class="step" :class="{ on: s >= step.reveal, final: i === steps.length - 1 }">
          <text :x="step.x" y="102" text-anchor="middle" class="step-title">{{ step.title }}</text>
          <circle :cx="step.x" cy="166" r="42" class="node" />
          <text :x="step.x" y="176" text-anchor="middle" class="step-num">{{ i + 1 }}</text>
          <text :x="step.x" y="232" text-anchor="middle" class="step-note">{{ step.note }}</text>
        </g>
      </g>

      <g class="engine duck" :class="{ on: s >= 2 }">
        <line x1="400" y1="246" x2="400" y2="274" />
        <a href="https://duckdb.org/docs/stable/core_extensions/httpfs/https" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           aria-label="Open DuckDB HTTP file documentation in a new tab" @click.stop>
          <text x="400" y="302" text-anchor="middle" class="link-label">DuckDB</text>
        </a>
      </g>
      <g class="engine map" :class="{ on: s >= 3 }">
        <line x1="564" y1="246" x2="564" y2="274" />
        <a href="https://maplibre.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 3 }" :tabindex="s >= 3 ? 0 : -1"
           aria-label="Open the MapLibre website in a new tab" @click.stop>
          <text x="564" y="302" text-anchor="middle" class="link-label">MapLibre</text>
        </a>
      </g>

      <g class="manual">
        <path d="M72 334 V354 H728 V334" />
        <a href="https://github.com/portolan-sdi/portolan-skills/blob/main/skills/reading-portolan/SKILL.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           aria-label="Open the reading-portolan SKILL.md file in a new tab" @click.stop>
        <text x="400" y="390" text-anchor="middle" class="link-label">Skill = instructions + checks</text>
        <text x="400" y="424" text-anchor="middle" class="manual-note">The skill guides. The engines execute.</text>
        </a>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.eyebrow { fill: var(--c-muted); font-size: 17px; font-weight: 850; letter-spacing: 0.09em; }
.rail { stroke: var(--c-line); stroke-width: 4; stroke-linecap: round; opacity: 0.28; }
.step, .connector, .engine { opacity: 0; }
.step.on, .connector.on, .engine.on { animation: reveal 420ms ease-out both; }
.connector line, .connector path { fill: none; stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.node { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 4; }
.final .node { fill: var(--c-accent); stroke: var(--c-accent); }
.step-title { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.055em; }
.step-num { fill: var(--c-fg); font-size: 26px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.final .step-num { fill: var(--c-bg); }
.step-note { fill: var(--c-muted); font-size: 16px; font-weight: 750; }
.engine line { stroke: var(--c-ok); stroke-width: 3; stroke-linecap: round; }
.engine text { fill: var(--c-ok); font-size: 18px; font-weight: 900; }
.manual path { fill: none; stroke: var(--c-accent); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.manual text { fill: var(--c-accent); font-size: 24px; font-weight: 900; }
.manual .manual-note { fill: var(--c-muted); font-size: 17px; font-weight: 750; }
</style>
