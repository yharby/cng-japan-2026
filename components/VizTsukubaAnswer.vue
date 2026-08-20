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
         :aria-label="tr('A real DuckDB command line experiment against the public Fields of the World Japan GeoParquet. It finds 4,726 predicted field polygons whose centroids are within five kilometers of Tsukuba Station. A simple one-percent survey pilot therefore needs a budget estimate of 48 candidate visits. Access, permission, routing and representative sampling still require review.', 'Fields of the Worldの公開日本GeoParquetを対象にした実際のDuckDBコマンドライン実験です。つくば駅から5 km以内に重心がある予測農地区画4,726件を抽出し、単純な1%調査では候補訪問48件という見積もりになります。立入、許可、経路、代表性のある標本設計は別途確認が必要です。')">
      <g class="terminal" :class="{ active: s >= 1 }">
        <rect x="24" y="24" width="492" height="358" rx="17" class="terminal-body" />
        <rect x="24" y="24" width="492" height="42" rx="17" class="terminal-top" />
        <path d="M24 49 H516 V66 H24 Z" class="terminal-top" />
        <circle cx="50" cy="45" r="5" class="dot red" />
        <circle cx="68" cy="45" r="5" class="dot amber" />
        <circle cx="86" cy="45" r="5" class="dot green" />
        <text x="270" y="50" text-anchor="middle" class="terminal-title">duckdb 1.5.5</text>

        <text x="46" y="94" class="mono prompt">$ duckdb</text>
        <text x="46" y="125" class="mono keyword">LOAD spatial;</text>
        <text x="46" y="151" class="mono keyword">SET <tspan class="code">geometry_always_xy = true;</tspan></text>
        <text x="46" y="178" class="mono comment">-- {{ tr('resolved from Japan.json', 'Japan.jsonから解決') }}</text>
        <text x="46" y="201" class="mono code">asset = <tspan class="string">'Japan.parquet'</tspan></text>
        <text x="46" y="231" class="mono keyword">FROM <tspan class="code">read_parquet(asset)</tspan></text>
        <text x="46" y="259" class="mono keyword">WHERE <tspan class="code">bbox prefilter</tspan></text>
        <text x="46" y="285" class="mono keyword">  AND <tspan class="code">distance(centroid, station) &lt;= 5000</tspan></text>
        <text x="46" y="313" class="mono keyword">SELECT <tspan class="code">count(*), ceil(count(*) * 1%);</tspan></text>

        <g class="run-state" :class="{ on: s >= 1 }">
          <rect x="46" y="336" width="444" height="28" rx="6" />
          <lucide-cloud-download x="58" y="343" width="15" height="15" />
          <text x="82" y="355">{{ tr('GeoParquet read directly over HTTPS', 'HTTPS経由でGeoParquetを直接読み込み') }}</text>
        </g>
      </g>

      <g class="answer" :class="{ on: s >= 2 }">
        <rect x="540" y="24" width="236" height="244" rx="17" class="answer-body" />
        <text x="658" y="54" text-anchor="middle" class="answer-kicker">{{ tr('SURVEY ESTIMATE', '調査見積もり') }}</text>
        <text x="658" y="112" text-anchor="middle" class="answer-number">48</text>
        <text x="658" y="139" text-anchor="middle" class="answer-label">{{ tr('candidate visits', '候補訪問件数') }}</text>
        <line x1="574" y1="161" x2="742" y2="161" />
        <text x="658" y="196" text-anchor="middle" class="answer-metric">4,726</text>
        <text x="658" y="219" text-anchor="middle" class="answer-small">{{ tr('predicted-field pool', '予測農地区画の候補母数') }}</text>
        <text x="658" y="244" text-anchor="middle" class="answer-radius">{{ tr('1% · rounded up', '1% · 切り上げ') }}</text>
      </g>

      <g class="caveat" :class="{ on: s >= 3 }">
        <rect x="540" y="286" width="236" height="96" rx="14" />
        <lucide-triangle-alert x="558" y="304" width="21" height="21" />
        <text x="588" y="320" class="caveat-title">{{ tr('SCOPE', '範囲') }}</text>
        <text x="558" y="347" class="caveat-copy">{{ tr('access · permission · routing remain', '立入 · 許可 · 経路確認は残る') }}</text>
        <text x="558" y="370" class="caveat-copy">{{ tr('simple sample · predictions only', '単純標本 · 予測データのみ') }}</text>
      </g>

      <g class="provenance">
        <a href="https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.parquet"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Japan GeoParquet used for this experiment in a new tab', 'この実験で使用した日本GeoParquetを新しいタブで開く')" @click.stop>
          <text x="24" y="418" class="source link-label">Fields of the World Japan GeoParquet</text>
        </a>
        <text x="776" y="418" text-anchor="end" class="source">{{ tr('LIVE EXPERIMENT · 21 AUG 2026 · CC BY 4.0', '実データ実験 · 2026年8月21日 · CC BY 4.0') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes tsa-run {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: none; }
}

@keyframes tsa-answer {
  from { opacity: 0.16; transform: translateX(8px); }
  to { opacity: 1; transform: none; }
}

.terminal-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2.5; }
.terminal-top { fill: var(--c-fg); }
.dot.red { fill: var(--c-accent); }
.dot.amber { fill: var(--c-warn); }
.dot.green { fill: var(--c-ok); }
.terminal-title { fill: var(--c-bg); font-size: 11px; font-weight: 800; opacity: 0.7; }
.prompt, .code { fill: var(--c-fg); font-size: 13px; font-weight: 700; }
.keyword { fill: var(--c-portolan); font-size: 13px; font-weight: 900; }
.string { fill: var(--c-ok); }
.comment { fill: var(--c-muted); font-size: 11.5px; font-weight: 700; }
.run-state { opacity: 0; }
.run-state.on { animation: tsa-run 380ms ease-out both; }
.run-state rect { fill: color-mix(in srgb, var(--c-ok) 15%, var(--c-panel)); stroke: var(--c-ok); stroke-width: 1.5; }
.run-state :deep(svg) { color: var(--c-ok); }
.run-state text { fill: var(--c-fg); font-size: 10.5px; font-weight: 800; }
.answer, .caveat { opacity: 0.16; }
.answer.on, .caveat.on { animation: tsa-answer 420ms ease-out both; }
.answer-body { fill: var(--c-panel); stroke: var(--c-ok); stroke-width: 3; }
.answer-kicker { fill: var(--c-ok); font-size: 11px; font-weight: 900; letter-spacing: 0.06em; }
.answer-number { fill: var(--c-accent); font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 43px; font-weight: 900; }
.answer-label { fill: var(--c-fg); font-size: 15px; font-weight: 900; }
.answer line { stroke: var(--c-line); stroke-width: 2; }
.answer-metric { fill: var(--c-fg); font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 24px; font-weight: 900; }
.answer-small { fill: var(--c-muted); font-size: 11.5px; font-weight: 750; }
.answer-radius { fill: var(--c-portolan); font-size: 11px; font-weight: 900; }
.caveat rect { fill: color-mix(in srgb, var(--c-warn) 10%, var(--c-panel)); stroke: var(--c-warn); stroke-width: 2; }
.caveat :deep(svg) { color: var(--c-warn); }
.caveat-title { fill: var(--c-warn); font-size: 11px; font-weight: 900; letter-spacing: 0.055em; }
.caveat-copy { fill: var(--c-fg); font-size: 10.8px; font-weight: 750; }
.source { fill: var(--c-muted); font-size: 10px; font-weight: 800; letter-spacing: 0.025em; }
</style>
