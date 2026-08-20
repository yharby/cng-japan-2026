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
         :aria-label="tr('Database products expose different spatial types, SQL dialects, and access paths. FDW, ODBC, and JDBC connect the silos while a database remains in the query path. Arrow and ADBC standardize efficient columnar result exchange, but the service still executes the query. Parquet and GeoParquet give persistent vector and table data an open contract that compatible engines can read directly.', 'データベース製品ごとに空間型、SQL方言、アクセス経路が異なります。FDW、ODBC、JDBCはサイロを接続しますが、データベースはクエリ経路に残ります。ArrowとADBCは列指向の結果交換を効率化しますが、クエリはサービスが実行します。ParquetとGeoParquetは、互換エンジンが直接読める永続的なオープン契約をベクター・表データに与えます。')">
      <defs>
        <marker id="sdl-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <text x="400" y="28" text-anchor="middle" class="kicker">{{ tr('THREE BOUNDARIES · THREE DIFFERENT JOBS', '三つの境界 · 三つの異なる役割') }}</text>

      <g class="silos" :class="{ on: s >= 1 }">
        <text x="28" y="65" class="section-title">{{ tr('1 · CONNECT THE SILOS', '1 · サイロを接続') }}</text>
        <g class="source" transform="translate(28 88)">
          <rect width="118" height="64" rx="10" />
          <text x="59" y="27" text-anchor="middle" class="source-name">PostgreSQL</text>
          <text x="59" y="49" text-anchor="middle" class="source-type">geometry · geography</text>
        </g>
        <g class="source" transform="translate(158 88)">
          <rect width="118" height="64" rx="10" />
          <text x="59" y="27" text-anchor="middle" class="source-name">Oracle</text>
          <text x="59" y="49" text-anchor="middle" class="source-type">SDO_GEOMETRY</text>
        </g>
        <g class="source" transform="translate(28 166)">
          <rect width="118" height="64" rx="10" />
          <text x="59" y="27" text-anchor="middle" class="source-name">SQL Server</text>
          <text x="59" y="49" text-anchor="middle" class="source-type">geometry · geography</text>
        </g>
        <g class="source" transform="translate(158 166)">
          <rect width="118" height="64" rx="10" />
          <text x="59" y="27" text-anchor="middle" class="source-name">Esri geodatabase</text>
          <text x="59" y="49" text-anchor="middle" class="source-type">vendor data model</text>
        </g>
        <path d="M304 108 V210" class="bracket" />
        <path d="M294 108 H304 M294 210 H304" class="bracket" />
        <text x="326" y="135" class="connector-label">FDW</text>
        <text x="326" y="165" class="connector-label">ODBC</text>
        <text x="326" y="195" class="connector-label">JDBC</text>
        <rect x="28" y="254" width="342" height="46" rx="10" class="outcome warn" />
        <text x="199" y="283" text-anchor="middle" class="outcome-text">{{ tr('CONNECTED · ENGINE + DRIVERS REMAIN', '接続済み · エンジンとドライバーは残る') }}</text>
      </g>

      <path d="M398 55 V329" class="divider" />

      <g class="exchange" :class="{ on: s >= 2 }">
        <text x="430" y="65" class="section-title">{{ tr('2 · EXCHANGE RESULTS', '2 · 結果を交換') }}</text>
        <rect x="430" y="88" width="150" height="64" rx="10" class="service" />
        <text x="505" y="116" text-anchor="middle" class="service-title">{{ tr('DATABASE SERVICE', 'データベースサービス') }}</text>
        <text x="505" y="138" text-anchor="middle" class="service-note">{{ tr('executes the query', 'クエリを実行') }}</text>
        <path d="M580 120 H629" class="flow" marker-end="url(#sdl-arrow)" />
        <rect x="644" y="88" width="128" height="64" rx="10" class="arrow-batch" />
        <text x="708" y="115" text-anchor="middle" class="batch-title">Arrow</text>
        <text x="708" y="138" text-anchor="middle" class="batch-note">{{ tr('columnar batches', '列指向バッチ') }}</text>
        <text x="606" y="103" text-anchor="middle" class="adbc">ADBC</text>
        <rect x="430" y="171" width="342" height="59" rx="10" class="outcome neutral" />
        <text x="601" y="197" text-anchor="middle" class="outcome-head">{{ tr('FASTER, STANDARD RESULT PATH', '高速で標準的な結果経路') }}</text>
        <text x="601" y="218" text-anchor="middle" class="outcome-note">{{ tr('the database still stays in the path', 'データベースは経路に残る') }}</text>
      </g>

      <g class="publish" :class="{ on: s >= 3 }">
        <text x="430" y="275" class="section-title">{{ tr('3 · PUBLISH THE DATA CONTRACT', '3 · データ契約を公開') }}</text>
        <g class="file">
          <path d="M430 297 H575 L608 330 V402 H430 Z" />
          <path d="M575 297 V330 H608" class="fold" />
          <text x="519" y="333" text-anchor="middle" class="file-title">Parquet</text>
          <text x="519" y="358" text-anchor="middle" class="file-title geo">+ GeoParquet</text>
          <text x="519" y="383" text-anchor="middle" class="file-note">{{ tr('columns · geometry · metadata', '列 · ジオメトリ · メタデータ') }}</text>
        </g>
        <path d="M620 349 H654" class="flow" marker-end="url(#sdl-arrow)" />
        <g class="readers">
          <rect x="670" y="294" width="102" height="34" rx="7" />
          <rect x="670" y="337" width="102" height="34" rx="7" />
          <rect x="670" y="380" width="102" height="34" rx="7" />
          <text x="721" y="316" text-anchor="middle">DuckDB</text>
          <text x="721" y="359" text-anchor="middle">QGIS</text>
          <text x="721" y="402" text-anchor="middle">Polars</text>
        </g>
      </g>

      <g class="summary" :class="{ on: s >= 3 }">
        <path d="M28 435 H772" />
        <text x="400" y="456" text-anchor="middle">{{ tr('CONNECTIONS CROSS SILOS · OPEN PERSISTENT FILES DECOUPLE THE DATA', '接続はサイロを越える · 永続的なオープンファイルはデータを分離する') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes sdl-focus {
  from { opacity: 0.24; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

.kicker { fill: var(--c-muted); font-size: 16px; font-weight: 900; letter-spacing: 0.08em; }
.section-title { fill: var(--c-fg); font-size: 17px; font-weight: 900; letter-spacing: 0.045em; }
.silos, .exchange, .publish { opacity: 0.24; }
.silos.on, .exchange.on, .publish.on { animation: sdl-focus 420ms ease-out both; }
.source rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.source-name { fill: var(--c-fg); font-size: 12px; font-weight: 900; }
.source-type { fill: var(--c-muted); font-size: 9px; font-weight: 750; }
.bracket { fill: none; stroke: var(--c-portolan); stroke-width: 3; stroke-linecap: round; }
.connector-label { fill: var(--c-portolan); font-size: 13px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.outcome { stroke-width: 2; }
.outcome.warn { fill: color-mix(in srgb, var(--c-warn) 11%, var(--c-bg)); stroke: var(--c-warn); }
.outcome.neutral { fill: var(--c-panel); stroke: var(--c-portolan); }
.outcome-text, .outcome-head { fill: var(--c-fg); font-size: 11px; font-weight: 900; letter-spacing: 0.035em; }
.outcome-note { fill: var(--c-muted); font-size: 10.5px; font-weight: 750; }
.divider { stroke: var(--c-line); stroke-width: 3; }
.service { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 2.5; }
.service-title { fill: var(--c-fg); font-size: 10.5px; font-weight: 900; letter-spacing: 0.03em; }
.service-note { fill: var(--c-muted); font-size: 10px; font-weight: 750; }
.flow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.arrow-batch { fill: var(--c-portolan-soft); stroke: var(--c-portolan); stroke-width: 2.5; }
.batch-title { fill: var(--c-portolan); font-size: 17px; font-weight: 900; }
.batch-note { fill: var(--c-muted); font-size: 9.5px; font-weight: 750; }
.adbc { fill: var(--c-accent); font-size: 10px; font-weight: 900; }
.file path:first-child { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 2.5; }
.file .fold { fill: none; stroke: var(--c-portolan); stroke-width: 2.5; }
.file-title { fill: var(--c-fg); font-size: 18px; font-weight: 900; }
.file-title.geo { fill: var(--c-portolan); font-size: 16px; }
.file-note { fill: var(--c-muted); font-size: 9px; font-weight: 750; }
.readers rect { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2; }
.readers text { fill: var(--c-fg); font-size: 11px; font-weight: 900; }
.summary { opacity: 0; }
.summary.on { animation: sdl-focus 430ms ease-out both; }
.summary path { stroke: var(--c-accent); stroke-width: 3; }
.summary text { fill: var(--c-muted); font-size: 10.5px; font-weight: 900; letter-spacing: 0.025em; }
</style>
