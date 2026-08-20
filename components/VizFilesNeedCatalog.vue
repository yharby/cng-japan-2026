<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Cloud optimized files in object storage are useful but not self describing. Consumers still need dataset identity, spatial and temporal extent, asset roles, license, and provenance.">
      <g class="objects">
        <g transform="translate(65 74) rotate(-6)">
          <rect width="190" height="98" rx="13" />
          <text x="22" y="43" class="file-name">buildings.parquet</text>
          <text x="22" y="70" class="file-detail">841.6 MB</text>
        </g>
        <g transform="translate(301 44) rotate(4)">
          <rect width="190" height="98" rx="13" />
          <text x="22" y="43" class="file-name">elevation.tif</text>
          <text x="22" y="70" class="file-detail">COG</text>
        </g>
        <g transform="translate(548 84) rotate(-3)">
          <rect width="190" height="98" rx="13" />
          <text x="22" y="43" class="file-name">map.pmtiles</text>
          <text x="22" y="70" class="file-detail">vector map</text>
        </g>
        <g transform="translate(126 224) rotate(3)">
          <rect width="190" height="98" rx="13" />
          <text x="22" y="43" class="file-name">part-004.parquet</text>
          <text x="22" y="70" class="file-detail">which dataset?</text>
        </g>
        <g transform="translate(484 226) rotate(-5)">
          <rect width="190" height="98" rx="13" />
          <text x="22" y="43" class="file-name">thumb.webp</text>
          <text x="22" y="70" class="file-detail">preview</text>
        </g>
      </g>

      <g class="questions" :class="{ on: s >= 1 }">
        <text x="400" y="182" text-anchor="middle">?</text>
        <text x="400" y="215" text-anchor="middle" class="question-copy">area · time · license · provenance · asset role</text>
      </g>

      <g class="need" :class="{ on: s >= 2 }">
        <rect x="88" y="367" width="624" height="67" rx="16" />
        <text x="400" y="396" text-anchor="middle" class="need-title">THE FILES NEED SHARED METADATA AND LINKS</text>
        <text x="400" y="421" text-anchor="middle" class="need-copy">without requiring another always-on portal</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes fn-pop {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes fn-rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.objects rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.file-name { fill: var(--c-fg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15px; font-weight: 850; }
.file-detail { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
.questions { opacity: 0; transform-origin: center; }
.questions.on { animation: fn-pop 430ms ease-out both; }
.questions > text:first-child { fill: var(--c-accent); font-size: 94px; font-weight: 900; }
.question-copy { fill: var(--c-fg); font-size: 17px; font-weight: 850; letter-spacing: 0.035em; }
.need { opacity: 0; }
.need.on { animation: fn-rise 440ms ease-out both; }
.need rect { fill: var(--c-fg); }
.need-title { fill: var(--c-bg); font-size: 18px; font-weight: 900; letter-spacing: 0.045em; }
.need-copy { fill: var(--c-bg); opacity: 0.74; font-size: 14px; font-weight: 700; }
</style>
