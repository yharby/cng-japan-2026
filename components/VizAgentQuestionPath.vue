<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('An AI agent answers how many latest field records are published across the three Collections linked by the Harmonized Field Boundary Data catalog. It follows the public catalog boundary, reads AGENTS dot md, inspects each Collection, counts explicit GeoParquet assets with DuckDB, and reports the result with source-specific licenses and limits.', 'AIエージェントが、Harmonized Field Boundary Dataカタログにリンクされた3つのCollectionの最新版レコード数を回答します。公開カタログの境界をたどり、AGENTS.mdを読み、各Collectionを確認し、明示的なGeoParquet資産をDuckDBで集計し、ソース別ライセンスと限界を付けて報告します。')">
      <defs>
        <marker id="aqp-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <g class="question">
        <rect x="24" y="18" width="752" height="68" rx="17" />
        <circle cx="58" cy="52" r="17" />
        <lucide-message-circle-question x="47" y="41" width="22" height="22" />
        <text x="88" y="45" class="question-label">{{ tr('QUESTION', '質問') }}</text>
        <text x="88" y="70" class="question-copy">{{ tr('How many latest field records, and which collection is largest?', '最新版は何件で、最大のCollectionはどれ？') }}</text>
      </g>

      <path d="M160 201 H172 M312 201 H324 M464 201 H476 M616 201 H628" class="flow" marker-end="url(#aqp-arrow)" />

      <g class="phase" :class="{ on: s >= 1, active: s === 1 }">
        <rect x="22" y="116" width="138" height="178" rx="15" class="card" />
        <circle cx="45" cy="139" r="14" class="number" /><text x="45" y="144" text-anchor="middle" class="number-text">1</text>
        <text x="66" y="144" class="phase-title">{{ tr('DISCOVER', '発見') }}</text>
        <a href="https://data.source.coop/ftw/harmonized-field-data/catalog.json" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the Harmonized Field Boundary Data root catalog', 'Harmonized Field Boundary Dataのルートカタログを開く')" @click.stop>
          <lucide-network x="40" y="164" width="24" height="24" class="phase-icon" />
          <text x="71" y="181" class="mono file link-label">catalog.json</text>
        </a>
        <text x="40" y="217" class="phase-copy">{{ tr('3 child links', '3つのchildリンク') }}</text>
        <text x="40" y="241" class="phase-copy">{{ tr('public boundary', '公開範囲') }}</text>
        <text x="40" y="265" class="phase-copy">{{ tr('no bucket glob', 'bucket globなし') }}</text>
      </g>

      <g class="phase" :class="{ on: s >= 2, active: s === 2 }">
        <rect x="174" y="116" width="138" height="178" rx="15" class="card" />
        <circle cx="197" cy="139" r="14" class="number" /><text x="197" y="144" text-anchor="middle" class="number-text">2</text>
        <text x="218" y="144" class="phase-title">{{ tr('READ GUIDE', 'ガイド確認') }}</text>
        <a href="https://data.source.coop/ftw/harmonized-field-data/AGENTS.md" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the catalog agent guidance', 'カタログのエージェントガイドを開く')" @click.stop>
          <lucide-notebook-tabs x="192" y="164" width="24" height="24" class="phase-icon" />
          <text x="223" y="181" class="mono file link-label">AGENTS.md</text>
        </a>
        <text x="192" y="217" class="phase-copy">{{ tr('latest paths', 'latestの経路') }}</text>
        <text x="192" y="241" class="phase-copy">{{ tr('schema quirks', 'schemaの差異') }}</text>
        <text x="192" y="265" class="phase-copy">{{ tr('tested pattern', '検証済み手順') }}</text>
      </g>

      <g class="phase" :class="{ on: s >= 3, active: s === 3 }">
        <rect x="326" y="116" width="138" height="178" rx="15" class="card" />
        <circle cx="349" cy="139" r="14" class="number" /><text x="349" y="144" text-anchor="middle" class="number-text">3</text>
        <text x="370" y="144" class="phase-title">{{ tr('INSPECT', '確認') }}</text>
        <lucide-folder-search x="344" y="164" width="24" height="24" class="phase-icon" />
        <text x="375" y="181" class="mono file">3 Collections</text>
        <text x="344" y="217" class="phase-copy">GeoParquet URLs</text>
        <text x="344" y="241" class="phase-copy">CRS · provider</text>
        <text x="344" y="265" class="phase-copy">{{ tr('license each', '個別license') }}</text>
      </g>

      <g class="phase" :class="{ on: s >= 4, active: s === 4 }">
        <rect x="478" y="116" width="138" height="178" rx="15" class="card" />
        <circle cx="501" cy="139" r="14" class="number" /><text x="501" y="144" text-anchor="middle" class="number-text">4</text>
        <text x="522" y="144" class="phase-title">{{ tr('COMPUTE', '計算') }}</text>
        <lucide-database-zap x="496" y="164" width="24" height="24" class="phase-icon" />
        <text x="527" y="181" class="mono file">DuckDB</text>
        <text x="496" y="217" class="phase-copy">3 explicit URLs</text>
        <text x="496" y="241" class="phase-copy">union_by_name</text>
        <text x="496" y="265" class="phase-copy">count(*)</text>
      </g>

      <g class="phase" :class="{ on: s >= 5, active: s === 5 }">
        <rect x="630" y="116" width="148" height="178" rx="15" class="card" />
        <circle cx="653" cy="139" r="14" class="number" /><text x="653" y="144" text-anchor="middle" class="number-text">5</text>
        <text x="674" y="144" class="phase-title">{{ tr('REPORT', '報告') }}</text>
        <lucide-clipboard-check x="648" y="164" width="24" height="24" class="phase-icon" />
        <text x="679" y="181" class="mono file">2,630,704</text>
        <text x="648" y="217" class="phase-copy">NL · 49.2%</text>
        <text x="648" y="241" class="phase-copy">{{ tr('method + date', '手法 + 日付') }}</text>
        <text x="648" y="265" class="phase-copy">{{ tr('licenses + limits', 'license + 限界') }}</text>
      </g>

      <g class="roles" :class="{ on: s >= 5 }">
        <rect x="28" y="332" width="744" height="88" rx="14" />
        <text x="58" y="365" class="role-model">{{ tr('MODEL', 'モデル') }}</text>
        <text x="58" y="390" class="role-copy">{{ tr('follows links · plans · explains', 'リンク追跡 · 計画 · 説明') }}</text>
        <path d="M235 376 H282" class="role-arrow" marker-end="url(#aqp-arrow)" />
        <text x="311" y="365" class="role-engine">{{ tr('CATALOG + DUCKDB', 'カタログ + DUCKDB') }}</text>
        <text x="311" y="390" class="role-copy">{{ tr('define scope · compute result', '範囲定義 · 結果計算') }}</text>
        <path d="M524 376 H570" class="role-arrow" marker-end="url(#aqp-arrow)" />
        <text x="598" y="365" class="role-answer">{{ tr('AUDITABLE ANSWER', '検証可能な回答') }}</text>
        <text x="598" y="390" class="role-copy">{{ tr('URLs · query · limits', 'URL · クエリ · 限界') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes aqp-focus { from { opacity: 0.18; transform: translateY(7px); } to { opacity: 1; transform: none; } }
@keyframes aqp-rise { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
.question rect { fill: var(--c-fg); stroke: var(--c-fg); stroke-width: 2.5; }
.question circle { fill: var(--c-accent); }
.question :deep(svg) { color: var(--c-bg); }
.question-label { fill: var(--c-bg); font-size: 10px; font-weight: 900; letter-spacing: 0.075em; }
.question-copy { fill: var(--c-bg); font-size: 17px; font-weight: 900; }
.flow, .role-arrow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.phase { opacity: 0.18; }
.phase.on { animation: aqp-focus 380ms ease-out both; }
.card { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2.5; }
.phase.active .card { stroke: var(--c-accent); stroke-width: 3; }
.number { fill: var(--c-fg); }
.phase.active .number { fill: var(--c-accent); }
.number-text { fill: var(--c-bg); font-size: 12px; font-weight: 900; }
.phase-title { fill: var(--c-fg); font-size: 10px; font-weight: 900; letter-spacing: 0.035em; }
.phase-icon { color: var(--c-portolan); }
.phase.active .phase-icon { color: var(--c-accent); }
.file { fill: var(--c-fg); font-size: 9px; font-weight: 850; }
.phase-copy { fill: var(--c-muted); font-size: 9.5px; font-weight: 750; }
.roles { opacity: 0; }
.roles.on { animation: aqp-rise 420ms ease-out both; }
.roles rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 2.5; }
.role-model, .role-engine, .role-answer { font-size: 10px; font-weight: 900; letter-spacing: 0.035em; }
.role-model { fill: var(--c-accent); }
.role-engine { fill: var(--c-portolan); }
.role-answer { fill: var(--c-ok); }
.role-copy { fill: var(--c-muted); font-size: 9.5px; font-weight: 750; }
</style>
