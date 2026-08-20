<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="One STAC item describes and links to a data asset. Portolan makes practical publishing choices explicit across layout and access, documentation and license, provenance, formats, and hosting.">
      <g class="envelope" :class="{ on: s >= 2 }">
        <rect x="34" y="43" width="732" height="374" rx="28" />
      </g>

      <g class="stac" :class="{ on: s >= 1 }">
        <rect x="100" y="91" width="220" height="158" rx="18" class="item" />
        <text x="210" y="130" text-anchor="middle" class="box-title">STAC Item</text>
        <path d="M158 192 C178 151 242 151 262 192 C240 222 180 222 158 192 Z" class="footprint" />
        <circle cx="210" cy="188" r="8" class="pin" />
        <text x="210" y="232" text-anchor="middle" class="box-note">metadata + geometry</text>

        <path d="M340 170 H460" class="arrow" />
        <path d="M446 159 L460 170 L446 181" class="arrow" />
        <text x="400" y="150" text-anchor="middle" class="arrow-label">asset href</text>

        <rect x="480" y="91" width="220" height="158" rx="18" class="asset" />
        <lucide-file-json-2 x="558" y="120" width="64" height="64" class="file-icon" />
        <text x="590" y="207" text-anchor="middle" class="file-label">data.parquet</text>
        <text x="590" y="232" text-anchor="middle" class="address">https://…</text>
      </g>

      <g class="additions" :class="{ on: s >= 2 }">
        <text x="400" y="294" text-anchor="middle" class="additions-head">PORTOLAN MAKES THE PUBLISHING CHOICES EXPLICIT</text>
        <g transform="translate(126 335)">
          <lucide-plus x="-1" y="-2" width="18" height="18" class="plus-icon" />
          <text x="27" y="13">LAYOUT + ACCESS</text>
        </g>
        <g transform="translate(442 335)">
          <lucide-plus x="-1" y="-2" width="18" height="18" class="plus-icon" />
          <text x="27" y="13">DOCS + LICENSE</text>
        </g>
        <g transform="translate(126 383)">
          <lucide-plus x="-1" y="-2" width="18" height="18" class="plus-icon" />
          <text x="27" y="13">PROVENANCE</text>
        </g>
        <g transform="translate(442 383)">
          <lucide-plus x="-1" y="-2" width="18" height="18" class="plus-icon" />
          <text x="27" y="13">FORMATS + HOSTING</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes gap-focus {
  from { opacity: 0.42; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}
@keyframes gap-pulse {
  0%, 100% { stroke-width: 3; }
  50% { stroke-width: 6; }
}

.envelope { opacity: 0.44; }
.envelope.on { animation: gap-focus 450ms ease-out both; }
.envelope rect { fill: none; stroke: var(--c-portolan); stroke-width: 4; }
.envelope.on rect { animation: gap-pulse 1.8s ease-in-out infinite; }
.stac { opacity: 0.62; }
.stac.on { animation: gap-focus 430ms ease-out both; }
.item, .asset { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.stac.on .item, .stac.on .asset { stroke: var(--c-fg); }
.box-title { fill: var(--c-fg); font-size: 24px; font-weight: 900; }
.box-note, .address { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.footprint { fill: var(--c-accent); opacity: 0.14; stroke: var(--c-accent); stroke-width: 3; }
.pin { fill: var(--c-accent); }
.arrow { fill: none; stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.arrow-label { fill: var(--c-accent); font-size: 17px; font-weight: 900; }
.file-icon { color: var(--c-portolan); }
.file-label { fill: var(--c-fg); font-size: 17px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.additions { opacity: 0.42; }
.additions.on { animation: gap-focus 460ms ease-out both; }
.plus-icon { color: var(--c-accent); }
.additions text { fill: var(--c-fg); font-size: 17px; font-weight: 900; letter-spacing: 0.035em; }
.additions .additions-head { fill: var(--c-muted); font-size: 17px; letter-spacing: 0.06em; }
</style>
