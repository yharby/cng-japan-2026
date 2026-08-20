<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage hero-stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('An original comic-book catalog superhero gathers scattered geospatial files into a linked network. The official STAC logo appears beside the words linked JSON to the rescue.', 'オリジナルのカタログヒーローが散在する地理空間ファイルをリンクされたネットワークにまとめます。公式STACロゴとともに、リンクされたJSONが救援に来たことを示します。')">
      <defs>
        <linearGradient id="hero-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" class="shade-solid" />
          <stop offset="0.48" class="shade-fade" />
          <stop offset="1" class="shade-clear" />
        </linearGradient>
      </defs>

      <image href="/stac-superhero.png" x="0" y="0" width="800" height="460"
             preserveAspectRatio="xMidYMid slice" />
      <rect x="0" y="0" width="800" height="460" fill="url(#hero-shade)" />

      <g class="setup">
        <text x="54" y="79" class="small-copy">{{ tr('SCATTERED FILES', '散在するファイル') }}</text>
        <text x="54" y="117" class="small-copy">{{ tr('MISSING CONTEXT', '不足する文脈') }}</text>
        <path d="M54 137 H270" class="setup-rule" />
      </g>

      <g class="reveal" :class="{ on: s >= 1 }">
        <path d="M48 162 L396 145 L368 330 L34 345 Z" class="burst" />
        <text x="66" y="213" class="hero-word">STAC!</text>
        <rect x="62" y="233" width="118" height="84" rx="10" class="logo-card" />
        <image href="/stac-logo.png" x="70" y="239" width="102" height="72"
               preserveAspectRatio="xMidYMid meet" />
        <text x="196" y="258" class="rescue-copy">{{ tr('LINKED JSON', 'リンクJSON') }}</text>
        <text x="196" y="288" class="rescue-copy">{{ tr('TO THE RESCUE', '救援に登場') }}</text>
        <text x="64" y="376" class="punchline">{{ tr('Cape optional. Stable links required.', 'マントは任意。安定リンクは必須。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes hero-enter {
  from { opacity: 0; transform: translateX(-28px) rotate(-2deg) scale(0.94); }
  to { opacity: 1; transform: none; }
}

.hero-stage { border-radius: 18px; box-shadow: 0 18px 44px color-mix(in srgb, var(--c-fg) 24%, transparent); }
.shade-solid { stop-color: var(--c-fg); stop-opacity: 0.98; }
.shade-fade { stop-color: var(--c-fg); stop-opacity: 0.72; }
.shade-clear { stop-color: var(--c-fg); stop-opacity: 0; }
.small-copy { fill: var(--c-bg); font-size: 18px; font-weight: 900; letter-spacing: 0.09em; }
.setup-rule { stroke: var(--c-accent); stroke-width: 5; }
.reveal { opacity: 0; transform-origin: 160px 255px; }
.reveal.on { animation: hero-enter 520ms cubic-bezier(.2,.9,.2,1.1) both; }
.burst { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 7; stroke-linejoin: round; }
.hero-word { fill: var(--c-accent); font-size: 58px; font-weight: 900; font-style: italic; letter-spacing: 0.02em; }
.logo-card { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.rescue-copy { fill: var(--c-fg); font-size: 17px; font-weight: 900; letter-spacing: 0.055em; }
.punchline { fill: var(--c-bg); font-size: 16px; font-weight: 850; }
</style>
