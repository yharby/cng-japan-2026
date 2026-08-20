<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage duel-stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('A split comic scene shows two sides of STAC flexibility. The original STAC catalog hero on the left represents extensibility and static or dynamic delivery. An original Choice Chaos jester on the right represents the operational ambiguity of choosing structures, extensions, access rules, and update practices.', '分割されたコミック場面がSTACの柔軟性の二面性を示します。左のオリジナルSTACカタログヒーローは拡張性と静的または動的な配信を表し、右のオリジナルの「選択の混乱」道化師は、構成、拡張仕様、アクセス規則、更新方法を選ぶ際の運用上の曖昧さを表します。')">
      <defs>
        <clipPath id="sf-left-panel">
          <rect x="0" y="0" width="400" height="460" />
        </clipPath>
        <clipPath id="sf-right-panel">
          <rect x="400" y="0" width="400" height="460" />
        </clipPath>
        <linearGradient id="sf-left-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="shade-strong" />
          <stop offset="0.44" class="shade-light" />
          <stop offset="1" class="shade-medium" />
        </linearGradient>
        <linearGradient id="sf-right-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="shade-strong" />
          <stop offset="0.55" class="shade-clear" />
          <stop offset="1" class="shade-medium" />
        </linearGradient>
      </defs>

      <g class="panel hero-panel" :class="{ on: s >= 1 }" clip-path="url(#sf-left-panel)">
        <image href="/stac-superhero.png" x="0" y="0" width="400" height="460"
               preserveAspectRatio="xMaxYMid slice" />
        <rect x="0" y="0" width="400" height="460" fill="url(#sf-left-shade)" />
        <text x="28" y="48" class="panel-kicker">{{ tr('THE SUPERPOWER', 'スーパーパワー') }}</text>
        <text x="28" y="88" class="panel-title">{{ tr('FLEXIBLE', '柔軟') }}</text>
        <text x="28" y="122" class="panel-title">{{ tr('EXTENSIBLE', '拡張可能') }}</text>
        <text x="28" y="153" class="panel-copy">{{ tr('static JSON or STAC API', '静的JSON または STAC API') }}</text>
      </g>

      <g class="panel chaos-panel" :class="{ on: s >= 2 }" clip-path="url(#sf-right-panel)">
        <image href="/stac-choice-chaos.png" x="400" y="0" width="400" height="460"
               preserveAspectRatio="xMidYMid slice" />
        <rect x="400" y="0" width="400" height="460" fill="url(#sf-right-shade)" />
        <text x="772" y="48" text-anchor="end" class="panel-kicker warn">{{ tr('THE DOWNSIDE', 'その弱点') }}</text>
        <text x="772" y="88" text-anchor="end" class="panel-title">{{ tr('CHOICE', '選択の') }}</text>
        <text x="772" y="122" text-anchor="end" class="panel-title">{{ tr('CHAOS', '混乱') }}</text>

        <g class="questions">
          <text x="430" y="178">{{ tr('WHICH STRUCTURE?', 'どの構成？') }}</text>
          <text x="430" y="211">{{ tr('WHICH EXTENSIONS?', 'どの拡張仕様？') }}</text>
          <text x="430" y="244">{{ tr('WHICH ACCESS RULES?', 'どのアクセス規則？') }}</text>
          <text x="430" y="277">{{ tr('HOW DO UPDATES WORK?', '更新方法は？') }}</text>
        </g>
      </g>

      <path d="M391 0 L418 92 L389 172 L416 254 L388 340 L410 460 L382 460 L397 342 L374 255 L401 171 L377 90 L390 0 Z"
            class="lightning" />

      <g class="resolution" :class="{ on: s >= 2 }">
        <rect x="105" y="354" width="590" height="86" rx="18" />
        <text x="400" y="387" text-anchor="middle" class="resolution-title">{{ tr('SAME STANDARD · DIFFERENT PRACTICES', '同じ標準 · 異なる実践') }}</text>
        <text x="400" y="418" text-anchor="middle" class="resolution-copy">{{ tr('We still need a shared publishing playbook.', '共有された公開手順が、まだ必要です。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes sf-panel-enter {
  from { opacity: 0.22; filter: grayscale(1); }
  to { opacity: 1; filter: none; }
}
@keyframes sf-resolution-enter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}

.duel-stage { border-radius: 18px; box-shadow: 0 18px 44px color-mix(in srgb, var(--c-fg) 24%, transparent); }
.panel { opacity: 0.22; filter: grayscale(1); }
.panel.on { animation: sf-panel-enter 480ms ease-out both; }
.shade-strong { stop-color: var(--c-fg); stop-opacity: 0.9; }
.shade-medium { stop-color: var(--c-fg); stop-opacity: 0.58; }
.shade-light { stop-color: var(--c-fg); stop-opacity: 0.14; }
.shade-clear { stop-color: var(--c-fg); stop-opacity: 0; }
.panel-kicker { fill: var(--c-bg); font-size: 16px; font-weight: 900; letter-spacing: 0.09em; }
.panel-kicker.warn { fill: var(--c-warn); }
.panel-title { fill: var(--c-bg); font-size: 28px; font-weight: 900; font-style: italic; letter-spacing: 0.04em; }
.panel-copy { fill: var(--c-bg); font-size: 14px; font-weight: 800; }
.questions text { fill: var(--c-bg); font-size: 14px; font-weight: 900; letter-spacing: 0.035em; paint-order: stroke; stroke: var(--c-fg); stroke-width: 5px; stroke-linejoin: round; }
.lightning { fill: var(--c-accent); stroke: var(--c-bg); stroke-width: 3; }
.resolution { opacity: 0; }
.resolution.on { animation: sf-resolution-enter 460ms ease-out both; }
.resolution rect { fill: var(--c-fg); stroke: var(--c-warn); stroke-width: 4; }
.resolution-title { fill: var(--c-bg); font-size: 19px; font-weight: 900; letter-spacing: 0.055em; }
.resolution-copy { fill: var(--c-bg); font-size: 16px; font-weight: 750; opacity: 0.88; }
</style>
