<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const assetBase = import.meta.env.BASE_URL
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('Portolan is the open publishing foundation. CARTO SDI adds five managed commercial capabilities: private data sharing and governance, data monetization, monitoring and statistics, conformance with legacy interoperability formats, and writable datasets.', 'Portolanはオープンな公開基盤です。CARTO SDIは、非公開データ共有とガバナンス、データ収益化、モニタリングと統計、従来の相互運用形式への準拠、書き込み可能なデータセットという5つの商用マネージド機能を追加します。')">
      <text x="400" y="32" text-anchor="middle" class="kicker">{{ tr('OPEN FOUNDATION · COMMERCIAL EXTENSIONS', 'オープンな基盤 · 商用の拡張機能') }}</text>

      <!-- Connectors sit behind the capability labels. -->
      <g class="extension-rail" :class="{ on: s >= 1 }">
        <path d="M400 321 V272 M96 272 H704" />
        <path d="M96 272 V252 M248 272 V252 M400 272 V252 M552 272 V252 M704 272 V252" />
        <circle v-for="x in [96, 248, 400, 552, 704]" :key="x" :cx="x" cy="272" r="5" />
      </g>

      <g class="capabilities" :class="{ on: s >= 1 }">
        <g transform="translate(96 112)" class="capability">
          <circle r="38" class="capability-disc" />
          <lucide-shield-check x="-20" y="-20" width="40" height="40" class="capability-icon" />
          <text y="70" text-anchor="middle" class="capability-title">{{ tr('PRIVATE SHARING', '非公開共有') }}</text>
          <text y="94" text-anchor="middle" class="capability-title">{{ tr('+ GOVERNANCE', '+ ガバナンス') }}</text>
          <text y="122" text-anchor="middle" class="capability-note">{{ tr('access · policy', 'アクセス · ポリシー') }}</text>
        </g>

        <g transform="translate(248 112)" class="capability">
          <circle r="38" class="capability-disc" />
          <lucide-badge-dollar-sign x="-20" y="-20" width="40" height="40" class="capability-icon" />
          <text y="70" text-anchor="middle" class="capability-title">{{ tr('DATA', 'データ') }}</text>
          <text y="94" text-anchor="middle" class="capability-title">{{ tr('MONETIZATION', '収益化') }}</text>
          <text y="122" text-anchor="middle" class="capability-note">{{ tr('commercial access', '商用アクセス') }}</text>
        </g>

        <g transform="translate(400 112)" class="capability">
          <circle r="38" class="capability-disc" />
          <lucide-chart-no-axes-combined x="-20" y="-20" width="40" height="40" class="capability-icon" />
          <text y="70" text-anchor="middle" class="capability-title">{{ tr('MONITORING', 'モニタリング') }}</text>
          <text y="94" text-anchor="middle" class="capability-title">{{ tr('+ STATISTICS', '+ 統計') }}</text>
          <text y="122" text-anchor="middle" class="capability-note">{{ tr('usage · health', '利用状況 · 健全性') }}</text>
        </g>

        <g transform="translate(552 112)" class="capability">
          <circle r="38" class="capability-disc" />
          <lucide-waypoints x="-20" y="-20" width="40" height="40" class="capability-icon" />
          <text y="70" text-anchor="middle" class="capability-title">{{ tr('LEGACY FORMAT', '従来形式への') }}</text>
          <text y="94" text-anchor="middle" class="capability-title">{{ tr('CONFORMANCE', '準拠') }}</text>
          <text y="122" text-anchor="middle" class="capability-note">{{ tr('interoperability', '相互運用性') }}</text>
        </g>

        <g transform="translate(704 112)" class="capability">
          <circle r="38" class="capability-disc" />
          <lucide-database-plus x="-20" y="-20" width="40" height="40" class="capability-icon" />
          <text y="70" text-anchor="middle" class="capability-title">{{ tr('WRITABLE', '書き込み可能な') }}</text>
          <text y="94" text-anchor="middle" class="capability-title">{{ tr('DATASETS', 'データセット') }}</text>
          <text y="122" text-anchor="middle" class="capability-note">{{ tr('managed updates', '管理された更新') }}</text>
        </g>
      </g>

      <g class="product-label" :class="{ on: s >= 1 }">
        <rect x="310" y="292" width="180" height="52" rx="26" />
        <image :href="`${assetBase}carto-logo-positive.svg`" x="334" y="301" width="88" height="34"
               preserveAspectRatio="xMidYMid meet" class="product-logo" aria-hidden="true" />
        <text x="434" y="324">SDI</text>
      </g>

      <g class="foundation">
        <rect x="52" y="362" width="696" height="72" rx="15" class="foundation-body" />
        <text x="82" y="392" class="foundation-name">PORTOLAN</text>
        <text x="82" y="416" class="foundation-copy">{{ tr('open files · stable URLs · checkable publishing rules', 'オープンファイル · 安定したURL · 検証可能な公開ルール') }}</text>
        <text x="718" y="403" text-anchor="end" class="foundation-label">{{ tr('PUBLISHING FOUNDATION', '公開基盤') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes carto-extension-reveal {
  from { opacity: 0.24; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}

.kicker { fill: var(--c-muted); font-size: 16px; font-weight: 900; letter-spacing: 0.09em; }
.extension-rail { opacity: 0.24; }
.extension-rail.on { animation: carto-extension-reveal 420ms ease-out both; }
.extension-rail path { fill: none; stroke: var(--c-accent); stroke-width: var(--w-connector-active); stroke-linecap: round; stroke-linejoin: round; }
.extension-rail circle { fill: var(--c-accent); }
.capabilities { opacity: 0.24; }
.capabilities.on { animation: carto-extension-reveal 460ms ease-out both; }
.capability-disc { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.capabilities.on .capability-disc { stroke: var(--c-accent); }
.capability-icon { color: var(--c-fg); }
.capabilities.on .capability-icon { color: var(--c-accent); }
.capability-title { fill: var(--c-fg); font-size: 13px; font-weight: 900; letter-spacing: 0.025em; }
.capability-note { fill: var(--c-muted); font-size: 11px; font-weight: 750; }
.product-label { opacity: 0.24; }
.product-label.on { animation: carto-extension-reveal 420ms 80ms ease-out both; }
.product-label rect { fill: var(--c-accent); }
.product-logo { filter: brightness(0) invert(1); }
.product-label text { fill: var(--c-bg); font-size: 15px; font-weight: 900; letter-spacing: 0.06em; }
.foundation-body { fill: var(--c-fg); }
.foundation-name { fill: var(--c-bg); font-size: 23px; font-weight: 900; letter-spacing: 0.055em; }
.foundation-copy { fill: var(--c-bg); opacity: 0.78; font-size: 14px; font-weight: 700; }
.foundation-label { fill: var(--c-bg); opacity: 0.64; font-size: 11px; font-weight: 900; letter-spacing: 0.08em; }
</style>

<style>
html.dark .product-label .product-logo { filter: none; }
</style>
