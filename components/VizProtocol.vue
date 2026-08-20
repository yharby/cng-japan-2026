<script setup lang="ts">
// $clicks is auto-injected by Slidev's context-injection Vite plugin.
// Do NOT import it. Do NOT name Slidev's slide-context composable anywhere in
// this file either, the plugin skips injection for any file that mentions it,
// and the deck validator rejects the literal for the same reason.
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Appendix comparison of browser HTTP 1.1 and HTTP 2 concurrency. HTTP 1.1 shows six browser connections and a queue. HTTP 2 shows many multiplexed streams on one connection. A measured object-storage workload needs 200 to 250 requests in flight to saturate 100 gigabits per second. A warning notes that S3 multi-range requests may return the whole object.">
      <text x="400" y="30" text-anchor="middle" class="kicker">CONCURRENCY LIVES IN THE PROTOCOL</text>

      <g class="h1">
        <text x="72" y="76" class="lane-title warn-text">HTTP/1.1 · BROWSER</text>
        <text x="728" y="76" text-anchor="end" class="lane-caption">six connections per host</text>
        <g v-for="i in 6" :key="`pipe-${i}`">
          <rect :x="72 + (i - 1) * 82" y="96" width="64" height="72" rx="9" class="pipe" />
          <path :d="`M${84 + (i - 1) * 82} 132 H${124 + (i - 1) * 82}`" class="pipe-flow" />
        </g>
        <g class="queue" :class="{ on: s >= 1 }">
          <circle v-for="i in 8" :key="`q-${i}`" :cx="568 + ((i - 1) % 4) * 48" :cy="112 + Math.floor((i - 1) / 4) * 42" r="13" class="queue-dot" />
          <text x="640" y="188" text-anchor="middle" class="queue-label">requests wait</text>
        </g>
      </g>

      <line x1="56" y1="214" x2="744" y2="214" class="divider" />

      <g class="h2" :class="{ on: s >= 2 }">
        <text x="72" y="250" class="lane-title ok-text">HTTP/2 · MULTIPLEXED</text>
        <text x="728" y="250" text-anchor="end" class="lane-caption">100+ streams recommended</text>
        <rect x="72" y="270" width="656" height="82" rx="41" class="one-pipe" />
        <g class="streams">
          <path v-for="i in 9" :key="`stream-${i}`"
                :d="`M100 ${284 + (i - 1) * 7} C270 ${270 + (i - 1) * 9}, 480 ${306 + (i - 1) * 3}, 700 ${284 + (i - 1) * 7}`"
                class="stream" :style="{ animationDelay: (i * 70) + 'ms' }" />
        </g>
      </g>

      <g class="measure" :class="{ on: s >= 3 }">
        <text x="64" y="402" class="measure-num">200–250</text>
        <text x="345" y="392" class="measure-line">requests in flight</text>
        <text x="345" y="420" class="measure-sub">for 100 Gbit/s saturation</text>
      </g>

      <g class="footgun" :class="{ on: s >= 4 }">
        <rect x="610" y="374" width="150" height="68" rx="12" class="warn-box" />
        <text x="685" y="398" text-anchor="middle" class="foot-title">S3 MULTI-RANGE</text>
        <text x="685" y="424" text-anchor="middle" class="foot-line">may return all bytes</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes protocol-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
@keyframes protocol-flow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -30; }
}
@keyframes protocol-pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.35; }
}

.kicker { fill: var(--c-muted); font-size: 18px; font-weight: 800; letter-spacing: 0.08em; }
.lane-title { font-size: 23px; font-weight: 900; letter-spacing: 0.05em; }
.warn-text { fill: var(--c-warn); }
.ok-text { fill: var(--c-ok); }
.lane-caption { fill: var(--c-muted); font-size: 19px; font-weight: 800; }
.pipe { fill: var(--c-panel); stroke: var(--c-warn); stroke-width: 3; }
.pipe-flow { stroke: var(--c-warn); stroke-width: 7; stroke-linecap: round; }
.queue, .h2, .measure, .footgun { opacity: 0; }
.queue.on, .h2.on, .measure.on, .footgun.on { animation: protocol-rise 480ms ease-out both; }
.queue-dot { fill: var(--c-warn); animation: protocol-pulse 1.8s ease-in-out infinite; }
.queue-label { fill: var(--c-warn); font-size: 18px; font-weight: 900; }
.divider { stroke: var(--c-line); stroke-width: 3; }
.one-pipe { fill: var(--c-panel); stroke: var(--c-ok); stroke-width: 4; }
.stream { fill: none; stroke: var(--c-ok); stroke-width: 3; stroke-dasharray: 16 10; animation: protocol-flow 1.4s linear infinite; }
.measure-num { fill: var(--c-fg); font-size: 44px; font-weight: 900; }
.measure-line { fill: var(--c-fg); font-size: 24px; font-weight: 900; }
.measure-sub { fill: var(--c-muted); font-size: 18px; font-weight: 700; }
.warn-box { fill: var(--c-warn); opacity: 0.14; stroke: var(--c-warn); stroke-width: 2; }
.foot-title { fill: var(--c-warn); font-size: 14px; font-weight: 900; letter-spacing: 0.04em; }
.foot-line { fill: var(--c-fg); font-size: 14px; font-weight: 800; }
</style>
