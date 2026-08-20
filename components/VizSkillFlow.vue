<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const steps = computed(() => [
  { title: tr('CATALOG', 'カタログ'), note: tr('links', 'リンク'), x: 72, reveal: 0 },
  { title: tr('INSPECT', '検査'), note: tr('schema + CRS', 'スキーマ + CRS'), x: 236, reveal: 1 },
  { title: tr('QUERY', '検索'), note: tr('filter + LIMIT', 'フィルタ + LIMIT'), x: 400, reveal: 2 },
  { title: tr('REUSE', '再利用'), note: tr('PMTiles + style', 'PMTiles + スタイル'), x: 564, reveal: 3 },
  { title: tr('PROVE', '実証'), note: tr('SQL + map', 'SQL + 地図'), x: 728, reveal: 4 },
])
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('A continuous evidence flow: catalog, inspect schema and CRS, query with an early filter and limit, reuse PMTiles and style, then prove the answer with SQL and a map. The skill supplies instructions and checks. DuckDB and MapLibre do the execution.', 'カタログからスキーマとCRSを検査し、早期フィルタとLIMITで検索、PMTilesとスタイルを再利用し、SQLと地図で実証する一貫した流れです。スキルが手順とチェックを提供し、DuckDBとMapLibreが実行します。')">
      <text x="400" y="34" text-anchor="middle" class="eyebrow">{{ tr('QUESTION → EVIDENCE', '問い → 根拠') }}</text>

      <line x1="72" y1="166" x2="728" y2="166" class="rail" />

      <g v-for="(step, i) in steps" :key="step.title">
        <g v-if="i > 0" class="connector" :class="{ on: s >= step.reveal }">
          <line :x1="steps[i - 1].x + 46" y1="166" :x2="step.x - 46" y2="166" />
          <path :d="`M${step.x - 52} 160 L${step.x - 46} 166 L${step.x - 52} 172`" />
        </g>

        <g class="step" :class="{ on: s >= step.reveal, final: i === steps.length - 1 }">
          <text :x="step.x" y="102" text-anchor="middle" class="step-title">{{ step.title }}</text>
          <circle :cx="step.x" cy="166" r="42" class="node" />
          <text :x="step.x" y="176" text-anchor="middle" class="step-num">{{ i + 1 }}</text>
          <text :x="step.x" y="232" text-anchor="middle" class="step-note">{{ step.note }}</text>
        </g>
      </g>

      <g class="engine duck" :class="{ on: s >= 2 }">
        <line x1="400" y1="246" x2="400" y2="274" />
        <a href="https://duckdb.org/docs/stable/core_extensions/httpfs/https" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open DuckDB HTTP file documentation in a new tab', 'DuckDB HTTPファイルのドキュメントを新しいタブで開く')" @click.stop>
          <text x="400" y="302" text-anchor="middle" class="link-label">DuckDB</text>
        </a>
      </g>
      <g class="engine map" :class="{ on: s >= 3 }">
        <line x1="564" y1="246" x2="564" y2="274" />
        <a href="https://maplibre.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 3 }" :tabindex="s >= 3 ? 0 : -1"
           :aria-label="tr('Open the MapLibre website in a new tab', 'MapLibreのウェブサイトを新しいタブで開く')" @click.stop>
          <text x="564" y="302" text-anchor="middle" class="link-label">MapLibre</text>
        </a>
      </g>

      <g class="manual">
        <path d="M72 334 V354 H728 V334" />
        <a href="https://github.com/portolan-sdi/portolan-skills/blob/main/skills/reading-portolan/SKILL.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the reading-portolan SKILL.md file in a new tab', 'reading-portolanのSKILL.mdを新しいタブで開く')" @click.stop>
        <text x="400" y="390" text-anchor="middle" class="link-label">{{ tr('Skill = instructions + checks', 'スキル = 手順 + チェック') }}</text>
        <text x="400" y="424" text-anchor="middle" class="manual-note">{{ tr('The skill guides. The engines execute.', 'スキルが導き、エンジンが実行する。') }}</text>
        </a>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.eyebrow { fill: var(--c-muted); font-size: 17px; font-weight: 850; letter-spacing: 0.09em; }
.rail { stroke: var(--c-line); stroke-width: var(--w-rail); stroke-linecap: round; opacity: 0.5; }
.step, .connector, .engine { opacity: 0; }
.step.on, .connector.on, .engine.on { animation: reveal 420ms ease-out both; }
.connector line, .connector path { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; stroke-linejoin: round; }
.node { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 4; }
.final .node { fill: var(--c-accent); stroke: var(--c-accent); }
.step-title { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.055em; }
.step-num { fill: var(--c-fg); font-size: 26px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.final .step-num { fill: var(--c-bg); }
.step-note { fill: var(--c-muted); font-size: 16px; font-weight: 750; }
.engine line { stroke: var(--c-ok); stroke-width: var(--w-connector); stroke-linecap: round; }
.engine text { fill: var(--c-ok); font-size: 18px; font-weight: 900; }
.manual path { fill: none; stroke: var(--c-accent); stroke-width: var(--w-connector); stroke-linecap: round; stroke-linejoin: round; }
.manual text { fill: var(--c-accent); font-size: 24px; font-weight: 900; }
.manual .manual-note { fill: var(--c-muted); font-size: 17px; font-weight: 750; }
</style>
