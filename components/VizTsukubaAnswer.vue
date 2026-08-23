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
         :aria-label="tr('A verified DuckDB query counts the latest GeoParquet records from the three Collections explicitly linked by the Harmonized Field Boundary Data catalog. It finds 2,630,704 records in total: 1,293,962 for the Netherlands, 742,010 for North Rhine-Westphalia, and 594,732 for Flanders. The Netherlands contributes 49.2 percent. Edition years, source coordinate systems, licenses and feature meanings differ.', '検証済みDuckDBクエリが、Harmonized Field Boundary Dataカタログに明示的にリンクされた3つのCollectionの最新GeoParquetレコードを集計します。合計2,630,704件で、オランダ1,293,962件、ノルトライン＝ヴェストファーレン742,010件、フランダース594,732件です。オランダは49.2%です。版の年、ソース座標系、ライセンス、地物の意味は異なります。')">
      <g class="terminal" :class="{ active: s >= 1 }">
        <rect x="24" y="24" width="492" height="358" rx="17" class="terminal-body" />
        <rect x="24" y="24" width="492" height="42" rx="17" class="terminal-top" />
        <path d="M24 49 H516 V66 H24 Z" class="terminal-top" />
        <circle cx="50" cy="45" r="5" class="dot red" />
        <circle cx="68" cy="45" r="5" class="dot amber" />
        <circle cx="86" cy="45" r="5" class="dot green" />
        <text x="270" y="50" text-anchor="middle" class="terminal-title">duckdb 1.5.5</text>

        <text x="46" y="94" class="mono prompt">$ duckdb</text>
        <text x="46" y="123" class="mono keyword">LOAD <tspan class="code">httpfs;</tspan></text>
        <text x="46" y="151" class="mono comment">-- {{ tr('resolved from 3 linked Collections', 'リンクされた3 Collectionから解決') }}</text>
        <text x="46" y="177" class="mono code">assets = [</text>
        <text x="66" y="201" class="mono string">'be_vlg/latest/be_vlg.parquet',</text>
        <text x="66" y="224" class="mono string">'de_nrw/latest/de_nrw.parquet',</text>
        <text x="66" y="247" class="mono string">'nl/latest/nl.parquet'</text>
        <text x="46" y="270" class="mono code">]</text>
        <text x="46" y="301" class="mono keyword">FROM <tspan class="code">read_parquet(assets,</tspan></text>
        <text x="78" y="324" class="mono code">union_by_name=true, filename=true)</text>
        <text x="46" y="349" class="mono keyword">SELECT <tspan class="code">collection, count(*)</tspan></text>
        <text x="46" y="372" class="mono keyword">GROUP BY <tspan class="code">1 ORDER BY 2 DESC;</tspan></text>
      </g>

      <g class="answer" :class="{ on: s >= 2 }">
        <rect x="540" y="24" width="236" height="252" rx="17" class="answer-body" />
        <text x="658" y="53" text-anchor="middle" class="answer-kicker">{{ tr('LATEST LINKED EDITIONS', 'リンクされた最新版') }}</text>
        <text x="658" y="95" text-anchor="middle" class="answer-number">2,630,704</text>
        <text x="658" y="119" text-anchor="middle" class="answer-label">{{ tr('field records', '農地区画レコード') }}</text>
        <line x1="566" y1="139" x2="750" y2="139" />
        <text x="562" y="166" class="row-name">NL</text><text x="750" y="166" text-anchor="end" class="row-value">1,293,962 · 49.2%</text>
        <text x="562" y="196" class="row-name">DE-NRW</text><text x="750" y="196" text-anchor="end" class="row-value">742,010 · 28.2%</text>
        <text x="562" y="226" class="row-name">BE-VLG</text><text x="750" y="226" text-anchor="end" class="row-value">594,732 · 22.6%</text>
        <text x="658" y="257" text-anchor="middle" class="answer-radius">{{ tr('3 EXPLICIT HTTPS ASSETS', '明示的なHTTPS資産 3件') }}</text>
      </g>

      <g class="caveat" :class="{ on: s >= 3 }">
        <rect x="540" y="294" width="236" height="88" rx="14" />
        <lucide-triangle-alert x="558" y="309" width="21" height="21" />
        <text x="588" y="325" class="caveat-title">{{ tr('SCOPE', '範囲') }}</text>
        <text x="558" y="350" class="caveat-copy">{{ tr('linked children only · latest editions', 'リンク済みchildのみ · 最新版') }}</text>
        <text x="558" y="371" class="caveat-copy">{{ tr('CRS · feature meaning · licenses differ', 'CRS · 地物の意味 · licenseは異なる') }}</text>
      </g>

      <g class="provenance">
        <a href="https://data.source.coop/ftw/harmonized-field-data/catalog.json"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Harmonized Field Boundary Data catalog used for this experiment', 'この実験で使用したHarmonized Field Boundary Dataカタログを開く')" @click.stop>
          <text x="24" y="418" class="source link-label">Harmonized Field Boundary Data catalog</text>
        </a>
        <text x="776" y="418" text-anchor="end" class="source">{{ tr('LIVE QUERY · 23 AUG 2026 · PER-COLLECTION LICENSES', '実クエリ · 2026年8月23日 · Collection別license') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes tsa-run { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
@keyframes tsa-answer { from { opacity: 0.16; transform: translateX(8px); } to { opacity: 1; transform: none; } }
.terminal-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2.5; }
.terminal-top { fill: var(--c-fg); }
.dot.red { fill: var(--c-accent); }
.dot.amber { fill: var(--c-warn); }
.dot.green { fill: var(--c-ok); }
.terminal-title { fill: var(--c-bg); font-size: 11px; font-weight: 800; opacity: 0.7; }
.prompt, .code { fill: var(--c-fg); font-size: 12px; font-weight: 700; }
.keyword { fill: var(--c-portolan); font-size: 12px; font-weight: 900; }
.string { fill: var(--c-ok); font-size: 11.5px; }
.comment { fill: var(--c-muted); font-size: 11px; font-weight: 700; }
.answer, .caveat { opacity: 0.16; }
.answer.on, .caveat.on { animation: tsa-answer 420ms ease-out both; }
.answer-body { fill: var(--c-panel); stroke: var(--c-ok); stroke-width: 3; }
.answer-kicker { fill: var(--c-ok); font-size: 10px; font-weight: 900; letter-spacing: 0.05em; }
.answer-number { fill: var(--c-accent); font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 29px; font-weight: 900; }
.answer-label { fill: var(--c-fg); font-size: 13px; font-weight: 900; }
.answer line { stroke: var(--c-line); stroke-width: 2; }
.row-name { fill: var(--c-portolan); font-size: 11px; font-weight: 900; }
.row-value { fill: var(--c-fg); font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 800; }
.answer-radius { fill: var(--c-muted); font-size: 9px; font-weight: 900; letter-spacing: 0.04em; }
.caveat rect { fill: color-mix(in srgb, var(--c-warn) 10%, var(--c-panel)); stroke: var(--c-warn); stroke-width: 2; }
.caveat :deep(svg) { color: var(--c-warn); }
.caveat-title { fill: var(--c-warn); font-size: 11px; font-weight: 900; letter-spacing: 0.055em; }
.caveat-copy { fill: var(--c-fg); font-size: 9.7px; font-weight: 750; }
.source { fill: var(--c-muted); font-size: 9.5px; font-weight: 800; letter-spacing: 0.02em; }
</style>
