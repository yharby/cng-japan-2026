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
         :aria-label="tr('The background workflow for an AI agent estimating a one-percent field-survey pilot near Tsukuba. The agent opens the catalog, reads its AGENTS dot md guidance, follows the Japan Item, inspects metadata and the GeoParquet asset, computes with DuckDB, then reports the estimate with limits and sources.', 'つくば周辺で1%の農地区画調査を行う際のAIエージェントの裏側の流れです。エージェントはカタログを開き、AGENTS.mdのガイドを読み、日本のItemをたどり、メタデータとGeoParquetを確認し、DuckDBで計算して、限界と出典とともに見積もりを報告します。')">
      <defs>
        <marker id="aqp-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <g class="question">
        <rect x="28" y="20" width="744" height="88" rx="18" />
        <circle cx="69" cy="64" r="22" />
        <lucide-message-circle x="56" y="51" width="26" height="26" />
        <text x="104" y="50" class="question-label">{{ tr('ASK THE AGENT', 'エージェントに質問') }}</text>
        <text x="104" y="77" class="question-copy">{{ tr('How many visits for a 1% field survey near Tsukuba?', 'つくば周辺の1%農地調査には何件の訪問が必要ですか？') }}</text>
      </g>

      <path d="M160 234 H177 M314 234 H331 M468 234 H485 M622 234 H639" class="flow" marker-end="url(#aqp-arrow)" />

      <g class="phase" :class="{ on: s >= 1, active: s === 1 }">
        <a href="https://data.source.coop/ftw/global-data/catalog.json" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 1 }" :tabindex="s >= 1 ? 0 : -1"
           :aria-label="tr('Open the Fields of the World Portolan catalog in a new tab', 'Fields of the WorldのPortolanカタログを新しいタブで開く')" @click.stop>
          <rect x="24" y="144" width="136" height="180" rx="16" class="card link-target" />
          <circle cx="50" cy="174" r="15" class="number" />
          <text x="50" y="179" text-anchor="middle" class="number-text">1</text>
          <text x="72" y="179" class="phase-title link-label">{{ tr('OPEN', '開く') }}</text>
          <lucide-network x="44" y="206" width="22" height="22" class="phase-icon" />
          <text x="72" y="221" class="mono file">catalog.json</text>
          <text x="44" y="258" class="phase-copy">{{ tr('find agent guide', 'agentガイドを発見') }}</text>
          <text x="44" y="286" class="phase-copy">{{ tr('find child links', 'childリンクを発見') }}</text>
        </a>
      </g>

      <g class="phase" :class="{ on: s >= 2, active: s === 2 }">
        <a href="https://data.source.coop/ftw/global-data/AGENTS.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open the published Fields of the World AGENTS dot md in a new tab', '公開されたFields of the WorldのAGENTS.mdを新しいタブで開く')" @click.stop>
          <rect x="178" y="144" width="136" height="180" rx="16" class="card link-target" />
          <circle cx="204" cy="174" r="15" class="number" />
          <text x="204" y="179" text-anchor="middle" class="number-text">2</text>
          <text x="226" y="179" class="phase-title link-label">{{ tr('READ', '読む') }}</text>
          <lucide-bot x="198" y="206" width="22" height="22" class="phase-icon" />
          <text x="226" y="221" class="mono file">AGENTS.md</text>
          <text x="198" y="258" class="phase-copy">{{ tr('resolve relative links', '相対リンクを解決') }}</text>
          <text x="198" y="286" class="phase-copy">{{ tr('metadata → data', 'metadata → data') }}</text>
        </a>
      </g>

      <g class="phase" :class="{ on: s >= 3, active: s === 3 }">
        <a href="https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.json"
           target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 3 }" :tabindex="s >= 3 ? 0 : -1"
           :aria-label="tr('Open the Japan STAC Item in a new tab', '日本のSTAC Itemを新しいタブで開く')" @click.stop>
          <rect x="332" y="144" width="136" height="180" rx="16" class="card link-target" />
          <circle cx="358" cy="174" r="15" class="number" />
          <text x="358" y="179" text-anchor="middle" class="number-text">3</text>
          <text x="380" y="179" class="phase-title link-label">{{ tr('INSPECT', '確認') }}</text>
          <lucide-file-search x="352" y="206" width="22" height="22" class="phase-icon" />
          <text x="380" y="221" class="mono file">Japan.json</text>
          <text x="352" y="248" class="phase-copy">license · CRS</text>
          <text x="352" y="272" class="phase-copy">schema</text>
          <text x="352" y="296" class="mono file">GeoParquet href</text>
        </a>
      </g>

      <g class="phase" :class="{ on: s >= 4, active: s === 4 }">
        <a href="https://duckdb.org/docs/stable/core_extensions/spatial/functions" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
           :aria-label="tr('Open the DuckDB spatial function documentation in a new tab', 'DuckDB空間関数の文書を新しいタブで開く')" @click.stop>
          <rect x="486" y="144" width="136" height="180" rx="16" class="card link-target" />
          <circle cx="512" cy="174" r="15" class="number" />
          <text x="512" y="179" text-anchor="middle" class="number-text">4</text>
          <text x="534" y="179" class="phase-title link-label">{{ tr('COMPUTE', '計算') }}</text>
          <lucide-square-terminal x="506" y="206" width="22" height="22" class="phase-icon" />
          <text x="534" y="221" class="mono file">DuckDB CLI</text>
          <text x="506" y="258" class="phase-copy">{{ tr('5 km gives 4,726', '5 kmで4,726件') }}</text>
          <text x="506" y="286" class="phase-copy">{{ tr('1% rounds to 48', '1%を48件に切上げ') }}</text>
        </a>
      </g>

      <g class="phase" :class="{ on: s >= 5, active: s === 5 }">
        <rect x="640" y="144" width="136" height="180" rx="16" class="card" />
        <circle cx="666" cy="174" r="15" class="number" />
        <text x="666" y="179" text-anchor="middle" class="number-text">5</text>
        <text x="688" y="179" class="phase-title">{{ tr('REPORT', '報告') }}</text>
        <lucide-clipboard-check x="660" y="206" width="22" height="22" class="phase-icon" />
        <text x="688" y="221" class="phase-copy">{{ tr('48 visits', '48件の訪問') }}</text>
        <text x="660" y="258" class="phase-copy">{{ tr('method + limits', '手法 + 限界') }}</text>
        <text x="660" y="286" class="phase-copy">{{ tr('license + sources', 'license + 出典') }}</text>
      </g>

      <g class="roles" :class="{ on: s >= 5 }">
        <rect x="28" y="352" width="744" height="70" rx="13" />
        <text x="62" y="382" class="role-model">{{ tr('MODEL', 'モデル') }}</text>
        <text x="62" y="405" class="role-copy">{{ tr('plans and explains', '計画して説明') }}</text>
        <path d="M224 387 H270" class="role-arrow" marker-end="url(#aqp-arrow)" />
        <text x="300" y="382" class="role-engine">{{ tr('OPEN DATA + DUCKDB', '公開データ + DUCKDB') }}</text>
        <text x="300" y="405" class="role-copy">{{ tr('compute the result', '結果を計算') }}</text>
        <path d="M520 387 H566" class="role-arrow" marker-end="url(#aqp-arrow)" />
        <text x="596" y="382" class="role-answer">{{ tr('AUDITABLE ANSWER', '検証可能な回答') }}</text>
        <text x="596" y="405" class="role-copy">{{ tr('links and limits included', 'リンクと限界を明記') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes aqp-focus {
  from { opacity: 0.18; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

@keyframes aqp-rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.question rect { fill: var(--c-fg); stroke: var(--c-fg); stroke-width: 2.5; }
.question circle { fill: var(--c-accent); }
.question :deep(svg) { color: var(--c-bg); }
.question-label { fill: var(--c-bg); font-size: 11px; font-weight: 900; letter-spacing: 0.075em; }
.question-copy { fill: var(--c-bg); font-size: 20px; font-weight: 900; }
.flow, .role-arrow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.phase { opacity: 0.18; }
.phase.on { animation: aqp-focus 380ms ease-out both; }
.card { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2.5; }
.phase.active .card { stroke: var(--c-accent); stroke-width: 3; }
.number { fill: var(--c-fg); }
.phase.active .number { fill: var(--c-accent); }
.number-text { fill: var(--c-bg); font-size: 13px; font-weight: 900; }
.phase-title { fill: var(--c-fg); font-size: 12px; font-weight: 900; letter-spacing: 0.04em; }
.phase-icon { color: var(--c-portolan); }
.phase.active .phase-icon { color: var(--c-accent); }
.file { fill: var(--c-fg); font-size: 10.5px; font-weight: 850; }
.phase-copy { fill: var(--c-muted); font-size: 11px; font-weight: 750; }
.roles { opacity: 0; }
.roles.on { animation: aqp-rise 420ms ease-out both; }
.roles rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 2.5; }
.role-model, .role-engine, .role-answer { font-size: 11px; font-weight: 900; letter-spacing: 0.035em; }
.role-model { fill: var(--c-accent); }
.role-engine { fill: var(--c-portolan); }
.role-answer { fill: var(--c-ok); }
.role-copy { fill: var(--c-muted); font-size: 10.5px; font-weight: 750; }
</style>
