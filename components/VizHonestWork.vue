<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Two complete direct-read paths. The traditional path runs from a source through an always-on service or database and portal or query app to the user. The smaller permanent path publishes files and metadata over HTTPS to the user, while an upstream source may remain and optional compute can be added on demand. Publisher work continues across conversion, licensing and provenance, validation and visual QA, and hosting, monitoring, and updates.">
      <g class="before">
        <text x="36" y="34" class="path-label">ALWAYS-ON DIRECT-READ PATH</text>
        <text x="764" y="34" text-anchor="end" class="path-ja">従来の公開経路</text>
        <line x1="82" y1="104" x2="718" y2="104" class="path-line" />

        <g transform="translate(82 104)">
          <circle r="30" class="node" />
          <text y="7" text-anchor="middle" class="node-short">SOURCE</text>
        </g>
        <g transform="translate(292 104)">
          <circle r="42" class="node warn" />
          <text y="-4" text-anchor="middle" class="node-short">SERVICE</text>
          <text y="17" text-anchor="middle" class="node-short">/ DB</text>
          <text y="66" text-anchor="middle" class="always">always on</text>
        </g>
        <g transform="translate(508 104)">
          <circle r="42" class="node warn" />
          <text y="-4" text-anchor="middle" class="node-short">PORTAL</text>
          <text y="17" text-anchor="middle" class="node-short">/ APP</text>
          <text y="66" text-anchor="middle" class="always">always on</text>
        </g>
        <g transform="translate(718 104)">
          <circle r="30" class="node" />
          <text y="7" text-anchor="middle" class="node-short">USER</text>
        </g>
      </g>

      <g class="after" :class="{ on: s >= 1 }">
        <line x1="36" y1="194" x2="764" y2="194" class="divider" />
        <text x="36" y="226" class="path-label ok-text">SMALLER PERMANENT PATH</text>
        <text x="764" y="226" text-anchor="end" class="path-ja">常設部分を小さくする</text>
        <line x1="92" y1="272" x2="694" y2="272" class="path-line ok-line" />
        <g transform="translate(92 272)">
          <circle r="36" class="node source-node" />
          <text y="-4" text-anchor="middle" class="node-short">SOURCE</text>
          <text y="17" text-anchor="middle" class="node-short">SYSTEM</text>
          <text y="59" text-anchor="middle" class="upstream-note">may stay upstream</text>
        </g>
        <g transform="translate(300 272)">
          <circle r="42" class="node ok-node" />
          <text y="-4" text-anchor="middle" class="node-short">FILES +</text>
          <text y="17" text-anchor="middle" class="node-short">METADATA</text>
        </g>
        <g transform="translate(496 272)">
          <circle r="34" class="node ok-node" />
          <text y="7" text-anchor="middle" class="node-short">HTTPS</text>
        </g>
        <g transform="translate(694 272)">
          <circle r="30" class="node" />
          <text y="7" text-anchor="middle" class="node-short">USER</text>
        </g>

        <path d="M496 232 C540 184 640 184 694 232" class="optional-path" />
        <rect x="510" y="174" width="180" height="32" rx="16" class="optional-pill" />
        <text x="600" y="195" text-anchor="middle" class="optional">ON-DEMAND COMPUTE</text>
      </g>

      <g class="work" :class="{ on: s >= 2 }">
        <text x="36" y="354" class="work-label">PUBLISHER WORK CONTINUES</text>
        <line x1="36" y1="372" x2="764" y2="372" class="work-line" />
        <text x="92" y="406" text-anchor="middle" class="work-item">convert</text>
        <text x="286" y="398" text-anchor="middle" class="work-item">license +</text>
        <text x="286" y="420" text-anchor="middle" class="work-item">provenance</text>
        <text x="490" y="398" text-anchor="middle" class="work-item">validate +</text>
        <text x="490" y="420" text-anchor="middle" class="work-item">visual QA</text>
        <text x="690" y="398" text-anchor="middle" class="work-item">host + monitor</text>
        <text x="690" y="420" text-anchor="middle" class="work-item">+ update</text>
        <circle v-for="x in [92, 286, 490, 690]" :key="x" :cx="x" cy="372" r="6" class="work-dot" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.after, .work { opacity: 0; }
.after.on, .work.on { animation: reveal 420ms ease-out both; }
.path-label { fill: var(--c-fg); font-size: 18px; font-weight: 900; letter-spacing: 0.055em; }
.path-ja { fill: var(--c-muted); font-size: 15px; font-weight: 750; font-family: 'Noto Sans JP', sans-serif; }
.path-line { stroke: var(--c-line); stroke-width: 5; stroke-linecap: round; }
.node { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 4; }
.node.warn { stroke: var(--c-warn); }
.node-short { fill: var(--c-fg); font-size: 14px; font-weight: 900; letter-spacing: 0.025em; }
.always { fill: var(--c-warn); font-size: 14px; font-weight: 800; }
.divider { stroke: var(--c-line); stroke-width: 2; }
.ok-text { fill: var(--c-ok); }
.ok-line { stroke: var(--c-ok); }
.ok-node { stroke: var(--c-ok); }
.source-node { stroke: var(--c-muted); }
.upstream-note { fill: var(--c-muted); font-size: 13px; font-weight: 800; }
.optional-path { fill: none; stroke: var(--c-accent); stroke-width: 3; stroke-dasharray: 7 6; }
.optional-pill { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2; }
.optional { fill: var(--c-accent); font-size: 12px; font-weight: 900; letter-spacing: 0.025em; }
.work-label { fill: var(--c-accent); font-size: 17px; font-weight: 900; letter-spacing: 0.055em; }
.work-line { stroke: var(--c-line); stroke-width: 3; }
.work-dot { fill: var(--c-accent); }
.work-item { fill: var(--c-fg); font-size: 16px; font-weight: 850; }
</style>
