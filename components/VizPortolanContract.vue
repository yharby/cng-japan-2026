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
         :aria-label="tr('Portolan combines existing standards and infrastructure into one repeatable publish, update, and use lifecycle. Publishers convert and describe data, preserve provenance and revalidate updates, and let software, people, and agents use the same static publication. The design goals are AI-first, easy to implement, scalable, lower operating cost, and sovereign deployment.', 'Portolanは既存の標準とインフラを、公開・更新・利用の反復可能なライフサイクルにまとめます。公開者はデータを変換して記述し、来歴を保ちながら更新を再検証し、ソフトウェア・人・エージェントが同じ静的公開物を利用できるようにします。設計目標はAIファースト、実装容易性、拡張性、運用コスト低減、主権的な展開です。')">
      <defs>
        <marker id="contract-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <text x="400" y="27" text-anchor="middle" class="kicker">{{ tr('ONE PRACTICE ACROSS THE DATA LIFECYCLE', 'データのライフサイクルを一つの実践で') }}</text>

      <!-- Connectors precede nodes so they remain behind the content. -->
      <path d="M267 150 H306 M497 150 H536" class="flow" marker-end="url(#contract-arrow)" />

      <g class="phase publish" :class="{ on: s >= 1, active: s === 1 }">
        <rect x="38" y="67" width="229" height="201" rx="20" class="phase-body" />
        <text x="62" y="101" class="phase-num">01</text>
        <text x="106" y="101" class="phase-title">{{ tr('PUBLISH', '公開') }}</text>
        <path d="M62 119 H243" class="phase-rule" />
        <text x="62" y="151" class="phase-copy">{{ tr('convert to open formats', 'オープン形式へ変換') }}</text>
        <text x="62" y="184" class="phase-copy">{{ tr('write STAC + docs', 'STAC + 文書を作成') }}</text>
        <text x="62" y="217" class="phase-copy">{{ tr('check + upload', '検証 + アップロード') }}</text>
        <text x="62" y="250" class="phase-result">{{ tr('STATIC PUBLICATION', '静的な公開物') }}</text>
      </g>

      <g class="phase update" :class="{ on: s >= 2, active: s === 2 }">
        <rect x="306" y="67" width="191" height="201" rx="20" class="phase-body" />
        <text x="330" y="101" class="phase-num">02</text>
        <text x="374" y="101" class="phase-title">{{ tr('UPDATE', '更新') }}</text>
        <path d="M330 119 H473" class="phase-rule" />
        <text x="330" y="151" class="phase-copy">{{ tr('change the source', '原典を更新') }}</text>
        <text x="330" y="184" class="phase-copy">{{ tr('preserve provenance', '来歴を保持') }}</text>
        <text x="330" y="217" class="phase-copy">{{ tr('recheck + sync', '再検証 + 同期') }}</text>
        <text x="330" y="250" class="phase-result">{{ tr('STABLE LINKS', '安定リンク') }}</text>
      </g>

      <g class="phase use" :class="{ on: s >= 3, active: s === 3 }">
        <rect x="536" y="67" width="226" height="201" rx="20" class="phase-body" />
        <text x="560" y="101" class="phase-num">03</text>
        <text x="604" y="101" class="phase-title">{{ tr('USE', '利用') }}</text>
        <path d="M560 119 H738" class="phase-rule" />
        <text x="560" y="151" class="phase-copy">{{ tr('discover the catalog', 'カタログを発見') }}</text>
        <text x="560" y="184" class="phase-copy">{{ tr('range-read the assets', 'Assetを範囲読込') }}</text>
        <text x="560" y="217" class="phase-copy">{{ tr('cite sources + limits', '出典 + 限界を提示') }}</text>
        <text x="560" y="250" class="phase-result">{{ tr('ONE SOURCE FOR ALL', '全員が同じ公開物を利用') }}</text>
      </g>

      <g class="identity" :class="{ on: s >= 1 }">
        <image href="/portolan-mark.svg" x="42" y="293" width="42" height="42" preserveAspectRatio="xMidYMid meet" />
        <text x="98" y="310" class="identity-title">PORTOLAN</text>
        <text x="98" y="333" class="identity-copy">{{ tr('opinionated · checkable · no new data format', '明確な方針 · 検証可能 · 新しいデータ形式ではない') }}</text>
        <text x="758" y="321" text-anchor="end" class="foundation">STAC 1.1.0 · GeoParquet · COG · HTTP · {{ tr('object storage', 'オブジェクトストレージ') }}</text>
      </g>

      <g class="goals" :class="{ on: s >= 3 }">
        <path d="M42 360 H758" class="goals-rule" />
        <foreignObject x="42" y="377" width="716" height="76">
          <div xmlns="http://www.w3.org/1999/xhtml" class="goal-row">
            <div class="goal-item">{{ tr('AI-FIRST', 'AI第一') }}</div>
            <div class="goal-item">{{ tr('EASY TO IMPLEMENT', '実装しやすい') }}</div>
            <div class="goal-item">{{ tr('SCALABLE', '拡張可能') }}</div>
            <div class="goal-item">{{ tr('LOW COST', '低コスト') }}</div>
            <div class="goal-item">{{ tr('SOVEREIGN', '主権') }}</div>
          </div>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes contract-focus {
  from { opacity: 0.28; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.kicker { fill: var(--c-portolan); font-size: 16px; font-weight: 900; letter-spacing: 0.075em; }
.flow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.phase, .identity, .goals { opacity: 0.28; }
.phase.on, .identity.on, .goals.on { animation: contract-focus 430ms ease-out both; }
.phase-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.phase.active .phase-body { stroke: var(--c-accent); }
.phase-num { fill: var(--c-accent); font-size: 15px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.phase-title { fill: var(--c-fg); font-size: 20px; font-weight: 900; letter-spacing: 0.05em; }
.phase-rule { stroke: var(--c-line); stroke-width: 2; }
.phase.active .phase-rule { stroke: var(--c-accent); }
.phase-copy { fill: var(--c-fg); font-size: 14px; font-weight: 780; }
.phase-result { fill: var(--c-portolan); font-size: 11px; font-weight: 900; letter-spacing: 0.065em; }
.identity-title { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.06em; }
.identity-copy { fill: var(--c-muted); font-size: 11px; font-weight: 800; }
.foundation { fill: var(--c-muted); font-size: 11px; font-weight: 850; }
.goals-rule { stroke: var(--c-line); stroke-width: 3; }
.goal-row { display: flex; align-items: stretch; justify-content: space-between; gap: 12px; height: 100%; }
.goal-item { display: flex; align-items: center; justify-content: center; flex: 1; padding: 0 4px 9px; border-bottom: 4px solid var(--c-accent); color: var(--c-fg); font-size: 13px; font-weight: 900; line-height: 1.15; text-align: center; letter-spacing: 0.025em; }
</style>
