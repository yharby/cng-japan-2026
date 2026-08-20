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
         :aria-label="tr('Two legacy download paths. A national CSV must be downloaded and parsed before a small row selection. An illustrative untiled raster must read a large strip before a small window can be analyzed.', '従来型ファイルの2つの読み込み経路。全国CSVは少数行の抽出にも全体のダウンロードと解析が必要です。タイル化されていない例示ラスターは、小さな範囲の解析にも大きなストリップを読む必要があります。')">
      <path d="M400 56 V376" class="divider" />

      <g class="lane vector" :class="{ on: s >= 1 }">
        <text x="201" y="42" text-anchor="middle" class="lane-title">{{ tr('VECTOR AND TABLE DATA', 'ベクター・表データ') }}</text>
        <a href="https://www.e-stat.go.jp/gis/statmap-search?aggregateUnit=S&amp;datum=2011&amp;page=1&amp;serveyId=S002005112020&amp;statsId=T001140&amp;toukeiCode=00200521&amp;toukeiYear=2020&amp;type=1"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the e-Stat population mesh source page in a new tab', 'e-Stat人口メッシュのソースページを新しいタブで開く')" @click.stop>
          <text x="201" y="68" text-anchor="middle" class="lane-source link-label">{{ tr('e-Stat population mesh CSV', 'e-Stat 人口メッシュ CSV') }}</text>
        </a>

        <path d="M54 102 H258 L294 138 V302 H54 Z" class="file" />
        <path d="M258 102 V138 H294" class="fold" />
        <a href="https://www.rfc-editor.org/rfc/rfc4180" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the CSV format documentation in a new tab', 'CSV形式の文書を新しいタブで開く')" @click.stop>
          <text x="174" y="139" text-anchor="middle" class="file-name link-label">national.csv</text>
        </a>
        <text x="174" y="171" text-anchor="middle" class="scenario">{{ tr('2.4 GB example', '2.4 GB の例') }}</text>
        <g class="rows">
          <path d="M84 204 H264 M84 232 H264 M84 260 H264" />
          <path d="M130 192 V274 M214 192 V274" />
        </g>

        <path d="M304 205 H362" class="flow" />
        <path d="M354 199 L362 205 L354 211" class="flow" />
        <text x="333" y="187" text-anchor="middle" class="flow-label">{{ tr('FULL READ', '全読込') }}</text>

        <g transform="translate(312 231)">
          <rect width="70" height="28" rx="6" class="memory" />
          <rect y="38" width="70" height="28" rx="6" class="memory" />
          <rect y="76" width="70" height="28" rx="6" class="memory" />
          <text x="35" y="19" text-anchor="middle">pandas</text>
          <text x="35" y="57" text-anchor="middle">Polars</text>
          <text x="35" y="95" text-anchor="middle">GeoPandas</text>
        </g>

        <text x="201" y="341" text-anchor="middle" class="need">{{ tr('Need a few rows', '必要なのは数行だけ') }}</text>
        <text x="201" y="368" text-anchor="middle" class="cost">{{ tr('download · parse · allocate · filter', '取得 · 解析 · メモリ確保 · 抽出') }}</text>
      </g>

      <g class="lane raster" :class="{ on: s >= 2 }">
        <text x="602" y="42" text-anchor="middle" class="lane-title">{{ tr('RASTER DATA', 'ラスターデータ') }}</text>
        <a href="https://www.naturalearthdata.com/downloads/10m-raster-data/"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the public-domain Natural Earth raster downloads in a new tab', 'パブリックドメインのNatural Earthラスターを新しいタブで開く')" @click.stop>
          <text x="602" y="68" text-anchor="middle" class="lane-source link-label">Natural Earth raster TIFF</text>
        </a>

        <rect x="452" y="102" width="300" height="200" rx="10" class="raster-frame" />
        <path d="M452 127 H752 M452 152 H752 M452 177 H752 M452 202 H752 M452 227 H752 M452 252 H752 M452 277 H752" class="strips" />
        <rect x="614" y="189" width="54" height="42" rx="4" class="window" />
        <text x="641" y="216" text-anchor="middle" class="window-label">ROI</text>
        <path d="M641 236 V322" class="flow" />
        <path d="M635 314 L641 322 L647 314" class="flow" />
        <text x="641" y="345" text-anchor="middle" class="need">{{ tr('Need one window', '必要なのは一範囲だけ') }}</text>
        <text x="602" y="368" text-anchor="middle" class="cost">{{ tr('one strip · no overview preview · many tiles at scale', '1ストリップ · 概観なし · 大規模では多数タイル') }}</text>
      </g>

      <g class="summary" :class="{ on: s >= 3 }">
        <rect x="84" y="397" width="632" height="47" rx="12" />
        <text x="400" y="428" text-anchor="middle">{{ tr('SMALL QUESTION · LARGE DOWNLOAD · LARGE MEMORY', '小さな問い · 大きな取得 · 大きなメモリ') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes lf-focus {
  from { opacity: 0.36; }
  to { opacity: 1; }
}
@keyframes lf-rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.divider { stroke: var(--c-line); stroke-width: 3; }
.lane { opacity: 0.36; }
.lane.on { animation: lf-focus 420ms ease-out both; }
.lane-title { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.06em; }
.lane-source { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.file, .raster-frame { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.vector.on .file, .raster.on .raster-frame { stroke: var(--c-accent); }
.fold, .rows path { fill: none; stroke: var(--c-line); stroke-width: 3; }
.rows path { stroke-width: 4; }
.file-name { fill: var(--c-fg); font-size: 22px; font-weight: 900; }
.scenario { fill: var(--c-accent); font-size: 16px; font-weight: 900; }
.flow { fill: none; stroke: var(--c-accent); stroke-width: var(--w-connector-active); stroke-linecap: round; stroke-linejoin: round; }
.flow-label { fill: var(--c-accent); font-size: 11px; font-weight: 900; letter-spacing: 0.06em; }
.memory { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2; }
.memory + text, .memory ~ text { fill: var(--c-fg); font-size: 11px; font-weight: 800; }
.strips { stroke: var(--c-line); stroke-width: 2; }
.window { fill: color-mix(in srgb, var(--c-accent) 20%, var(--c-bg)); stroke: var(--c-accent); stroke-width: 4; }
.window-label { fill: var(--c-accent); font-size: 13px; font-weight: 900; }
.need { fill: var(--c-fg); font-size: 21px; font-weight: 900; }
.cost { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
.summary { opacity: 0; }
.summary.on { animation: lf-rise 430ms ease-out both; }
.summary rect { fill: var(--c-fg); }
.summary text { fill: var(--c-bg); font-size: 16px; font-weight: 900; letter-spacing: 0.05em; }
</style>
