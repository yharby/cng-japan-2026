<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Object storage principles on the left and an HTTP byte range request on the right. The final note separates byte ranges from HTTP multiplexing.">
      <path d="M401 42 V389" class="divider" />

      <g class="object-side" :class="{ on: s >= 1 }">
        <text x="200" y="39" text-anchor="middle" class="section-title">OBJECT STORAGE</text>
        <path d="M75 91 H325 V167 C325 189 269 207 200 207 C131 207 75 189 75 167 Z" class="bucket" />
        <path d="M75 91 C75 69 131 51 200 51 C269 51 325 69 325 91 C325 113 269 131 200 131 C131 131 75 113 75 91 Z" class="bucket-top" />
        <text x="200" y="158" text-anchor="middle" class="bucket-label">ONE OBJECT · ONE STABLE KEY</text>

        <g class="principles">
          <circle cx="92" cy="258" r="7" />
          <text x="114" y="264">Stateless reads scale independently</text>
          <circle cx="92" cy="301" r="7" />
          <text x="114" y="307">Public cloud or self-hosted</text>
          <circle cx="92" cy="344" r="7" />
          <text x="114" y="350">Low-maintenance HTTP access</text>
          <circle cx="92" cy="387" r="7" />
          <text x="114" y="393">Tools and agents use the same URL</text>
        </g>
      </g>

      <g class="range-side" :class="{ on: s >= 2 }">
        <text x="602" y="39" text-anchor="middle" class="section-title">HTTP BYTE RANGES</text>
        <rect x="454" y="66" width="296" height="112" rx="14" class="request-box" />
        <text x="480" y="102" class="mono strong">GET /data.parquet</text>
        <text x="480" y="136" class="mono">Range bytes=840000-1099999</text>
        <text x="480" y="163" class="mono ok">206 Partial Content</text>

        <rect x="454" y="224" width="296" height="55" rx="10" class="byte-bar" />
        <rect x="558" y="224" width="62" height="55" class="selected" />
        <path d="M589 192 V214" class="range-arrow" />
        <path d="M579 204 L589 214 L599 204" class="range-arrow" />
        <text x="602" y="310" text-anchor="middle" class="range-copy">Read the useful byte window</text>
        <text x="602" y="339" text-anchor="middle" class="range-detail">The file format tells the client where to look</text>
      </g>

      <g class="protocol-note" :class="{ on: s >= 3 }">
        <path d="M76 421 H724" />
        <text x="400" y="447" text-anchor="middle">HTTP/1.1 supports ranges · HTTP/2 AND HTTP/3 improve multiplexing · neither creates an index</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes or-focus {
  from { opacity: 0.34; }
  to { opacity: 1; }
}
@keyframes or-rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.divider { stroke: var(--c-line); stroke-width: 3; }
.object-side, .range-side { opacity: 0.34; }
.object-side.on, .range-side.on { animation: or-focus 420ms ease-out both; }
.section-title { fill: var(--c-fg); font-size: 20px; font-weight: 900; letter-spacing: 0.07em; }
.bucket { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 3; }
.bucket-top { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 3; }
.bucket-label { fill: var(--c-fg); font-size: 16px; font-weight: 900; }
.principles circle { fill: var(--c-accent); }
.principles text { fill: var(--c-fg); font-size: 16px; font-weight: 750; }
.request-box { fill: var(--c-fg); stroke: var(--c-fg); stroke-width: 2; }
.mono { fill: var(--c-bg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 14px; }
.mono.strong { font-weight: 900; }
.mono.ok { fill: var(--c-ok); font-weight: 900; }
.byte-bar { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.selected { fill: var(--c-accent); }
.range-arrow { fill: none; stroke: var(--c-accent); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.range-copy { fill: var(--c-fg); font-size: 22px; font-weight: 900; }
.range-detail { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.protocol-note { opacity: 0; }
.protocol-note.on { animation: or-rise 430ms ease-out both; }
.protocol-note path { stroke: var(--c-accent); stroke-width: 3; }
.protocol-note text { fill: var(--c-muted); font-size: 13px; font-weight: 850; letter-spacing: 0.02em; }
</style>
