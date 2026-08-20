<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const ready = computed(() => isPrintMode.value || true)
</script>

<template>
  <div class="stage cover-stage" :class="{ ready }">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Portolan: An SDI Without Servers, presented at Cloud Native Geospatial Japan 2026 by Youssef Harby, Software Engineer at CARTO.">
      <path d="M76 64 H724" class="cover-rule" />

      <g class="mark" transform="translate(700 154)">
        <circle r="50" class="mark-ring" />
        <path d="M0-39 L11-9 L0 0 L-11-9 Z M39 0 L9 11 L0 0 L9-11 Z M0 39 L-11 9 L0 0 L11 9 Z M-39 0 L-9-11 L0 0 L-9 11 Z" />
      </g>

      <text x="76" y="142" class="event">CLOUD NATIVE GEOSPATIAL JAPAN 2026</text>
      <text x="76" y="181" class="place">JAMSTEC Yokohama · 24 August 2026</text>

      <g class="speaker">
        <text x="76" y="323">Youssef Harby</text>
        <text x="76" y="358" class="speaker-role">Software Engineer at CARTO</text>
        <text x="76" y="391" class="speaker-email">youssef@carto.com</text>
        <image href="/carto-logo-positive.svg" x="612" y="332" width="112" height="43" preserveAspectRatio="xMidYMid meet" class="carto-logo" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes cv-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}

.cover-stage { opacity: 0; }
.cover-stage.ready { animation: cv-rise 520ms ease-out both; }
.cover-rule { stroke: var(--c-accent); stroke-width: 4; }
.mark-ring { fill: color-mix(in srgb, var(--c-accent) 9%, var(--c-bg)); stroke: var(--c-accent); stroke-width: 3; }
.mark path { fill: var(--c-accent); }
.event { fill: var(--c-fg); font-size: 23px; font-weight: 900; letter-spacing: 0.075em; }
.place { fill: var(--c-muted); font-size: 20px; font-weight: 700; }
.speaker text { fill: var(--c-fg); font-size: 31px; font-weight: 850; }
.speaker .speaker-role { fill: var(--c-muted); font-size: 20px; font-weight: 700; }
.speaker .speaker-email { fill: var(--c-accent); font-size: 18px; font-weight: 750; }
.carto-logo { opacity: 0.96; }
</style>

<!-- Deliberately unscoped. The dark-mode rule needs an `html.dark` ancestor, and
     inside a scoped block Vue compiles `:global(html.dark) .carto-logo` down to
     bare `html.dark`, dropping the descendant part. That put the inversion on the
     whole document and rendered every slide as a plain white rectangle. -->
<style>
html.dark .carto-logo { filter: brightness(0) invert(1); }
</style>
