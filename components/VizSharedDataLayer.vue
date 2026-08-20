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
         :aria-label="tr('Three interoperability boundaries for vector and table data. Foreign data wrappers federate sources through PostgreSQL. ODBC and JDBC return conventional results, while ADBC returns Arrow batches and Arrow IPC moves record batches between processes. Parquet and GeoParquet give persistent data a contract that compatible engines can read directly.', 'ベクター・表データにおける三つの相互運用境界。FDWはPostgreSQLを通して外部ソースを連携します。ODBCとJDBCは従来型の結果を返し、ADBCはArrowバッチを返し、Arrow IPCはプロセス間でレコードバッチを移動します。ParquetとGeoParquetは、互換エンジンが直接読める永続データ契約を提供します。')">
      <defs>
        <marker id="sdl-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <path d="M267 47 V395 M533 47 V395" class="divider" />

      <g class="boundary federate" :class="{ on: s >= 1 }">
        <a href="https://www.postgresql.org/docs/16/ddl-foreign-data.html" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the PostgreSQL foreign data documentation in a new tab', 'PostgreSQL外部データの文書を新しいタブで開く')" @click.stop>
          <text x="134" y="34" text-anchor="middle" class="section-title link-label">{{ tr('FEDERATE', '連携') }}</text>
        </a>
        <text x="134" y="53" text-anchor="middle" class="section-sub">FDW · SQL/MED</text>

        <g class="source-chip">
          <rect x="30" y="68" width="94" height="42" rx="7" />
          <text x="77" y="94" text-anchor="middle">Oracle</text>
        </g>
        <g class="source-chip">
          <rect x="144" y="68" width="94" height="42" rx="7" />
          <text x="191" y="94" text-anchor="middle">SQL Server</text>
        </g>
        <path d="M77 110 L112 147 M191 110 L156 147" class="flow" marker-end="url(#sdl-arrow)" />
        <rect x="112" y="116" width="44" height="25" rx="5" class="mini-pill" />
        <text x="134" y="133" text-anchor="middle" class="mini-pill-text">FDW</text>

        <g class="engine-card">
          <rect x="63" y="147" width="142" height="67" rx="10" />
          <text x="134" y="175" text-anchor="middle" class="card-title">PostgreSQL</text>
          <text x="134" y="198" text-anchor="middle" class="card-copy">{{ tr('query coordinator', 'クエリ調整役') }}</text>
        </g>

        <g class="outcome-card">
          <rect x="37" y="241" width="194" height="69" rx="9" />
          <text x="134" y="268" text-anchor="middle" class="outcome-title">{{ tr('Foreign tables', '外部テーブル') }}</text>
          <text x="134" y="291" text-anchor="middle" class="outcome-copy">{{ tr('one SQL view of sources', '複数ソースを一つのSQLで') }}</text>
        </g>
        <g class="status-pill warn">
          <rect x="37" y="332" width="194" height="35" rx="6" />
          <text x="134" y="355" text-anchor="middle">{{ tr('SERVER + WRAPPERS STAY', 'サーバーとWRAPPERは残る') }}</text>
        </g>
      </g>

      <g class="boundary exchange" :class="{ on: s >= 2 }">
        <a href="https://arrow.apache.org/blog/2023/01/05/introducing-arrow-adbc/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the ADBC introduction in a new tab', 'ADBCの紹介を新しいタブで開く')" @click.stop>
          <text x="400" y="34" text-anchor="middle" class="section-title link-label">{{ tr('EXCHANGE', '交換') }}</text>
        </a>
        <text x="400" y="53" text-anchor="middle" class="section-sub">{{ tr('CLIENT RESULT PATH', 'クライアント結果経路') }}</text>

        <g class="database-service">
          <rect x="305" y="68" width="190" height="42" rx="7" />
          <text x="400" y="94" text-anchor="middle">{{ tr('DATABASE SERVICE', 'データベースサービス') }}</text>
        </g>
        <path d="M400 110 V127 M400 127 H345 V146 M400 127 H455 V146" class="flow" marker-end="url(#sdl-arrow)" />

        <g class="result-card legacy-result">
          <rect x="293" y="146" width="104" height="76" rx="9" />
          <text x="345" y="174" text-anchor="middle" class="result-title">ODBC · JDBC</text>
          <path d="M317 189 H373 M317 201 H373 M335 183 V207 M354 183 V207" />
          <text x="345" y="216" text-anchor="middle" class="result-copy">{{ tr('rows / conversion', '行 / 変換') }}</text>
        </g>

        <g class="result-card arrow-result">
          <rect x="403" y="146" width="104" height="76" rx="9" />
          <text x="455" y="174" text-anchor="middle" class="result-title">ADBC</text>
          <path d="M427 184 H483 V207 H427 Z M445 184 V207 M464 184 V207" />
          <text x="455" y="216" text-anchor="middle" class="result-copy">{{ tr('Arrow batches', 'Arrowバッチ') }}</text>
        </g>

        <a href="https://arrow.apache.org/docs/format/Intro.html" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open the Apache Arrow sharing and IPC documentation in a new tab', 'Apache Arrow共有・IPCの文書を新しいタブで開く')" @click.stop>
          <rect x="403" y="232" width="104" height="28" rx="5" class="ipc-pill link-target" />
          <text x="455" y="251" text-anchor="middle" class="ipc-text link-label">Arrow IPC</text>
        </a>

        <a href="https://duckdb.org/2023/08/04/adbc" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open the DuckDB ADBC and ODBC benchmark in a new tab', 'DuckDBのADBC・ODBCベンチマークを新しいタブで開く')" @click.stop>
          <g class="benchmark">
            <rect x="293" y="278" width="214" height="59" rx="9" class="link-target" />
            <text x="400" y="299" text-anchor="middle" class="bench-kicker link-label">DUCKDB SF1 · {{ tr('ONE 2023 TEST', '2023年の一試験') }}</text>
            <text x="400" y="324" text-anchor="middle" class="bench-value">28.149s → 0.724s · 38×</text>
          </g>
        </a>
        <g class="status-pill warn">
          <rect x="293" y="349" width="214" height="35" rx="6" />
          <text x="400" y="372" text-anchor="middle">{{ tr('DATABASE STAYS IN PATH', 'DBは経路に残る') }}</text>
        </g>
      </g>

      <g class="boundary publish" :class="{ on: s >= 3 }">
        <a href="https://parquet.apache.org/docs/file-format/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the Apache Parquet file format documentation in a new tab', 'Apache Parquetファイル形式の文書を新しいタブで開く')" @click.stop>
          <text x="666" y="34" text-anchor="middle" class="section-title link-label">{{ tr('PUBLISH', '公開') }}</text>
        </a>
        <text x="666" y="53" text-anchor="middle" class="section-sub">{{ tr('PERSISTENT DATA CONTRACT', '永続データ契約') }}</text>

        <g class="consumer-chip">
          <rect x="548" y="68" width="68" height="42" rx="7" />
          <text x="582" y="94" text-anchor="middle">DuckDB</text>
        </g>
        <g class="consumer-chip">
          <rect x="632" y="68" width="68" height="42" rx="7" />
          <text x="666" y="94" text-anchor="middle">Polars</text>
        </g>
        <g class="consumer-chip">
          <rect x="716" y="68" width="56" height="42" rx="7" />
          <text x="744" y="94" text-anchor="middle">QGIS</text>
        </g>
        <path d="M582 110 L609 145 M666 110 V145 M744 110 L723 145" class="flow" marker-end="url(#sdl-arrow)" />

        <g class="data-contract">
          <rect x="557" y="145" width="218" height="101" rx="11" />
          <text x="666" y="171" text-anchor="middle" class="card-title">{{ tr('PERSISTENT FILES', '永続化ファイル') }}</text>
          <g class="format-chip">
            <rect x="571" y="185" width="86" height="31" rx="6" />
            <text x="614" y="206" text-anchor="middle">Parquet</text>
          </g>
          <g class="format-chip">
            <rect x="665" y="185" width="96" height="31" rx="6" />
            <text x="713" y="206" text-anchor="middle">GeoParquet</text>
          </g>
          <text x="666" y="236" text-anchor="middle" class="card-copy">{{ tr('stable bytes · stable URL', '安定バイト · 安定URL') }}</text>
        </g>

        <g class="outcome-card">
          <rect x="557" y="268" width="218" height="69" rx="9" />
          <text x="666" y="295" text-anchor="middle" class="outcome-title">{{ tr('Engines read directly', 'エンジンが直接読む') }}</text>
          <text x="666" y="318" text-anchor="middle" class="outcome-copy">{{ tr('no database translation step', 'DB変換ステップなし') }}</text>
        </g>
        <g class="status-pill ok">
          <rect x="557" y="349" width="218" height="35" rx="6" />
          <text x="666" y="372" text-anchor="middle">{{ tr('DATA IS ENGINE-INDEPENDENT', 'データはエンジン非依存') }}</text>
        </g>
      </g>

      <g class="summary" :class="{ on: s >= 3 }">
        <path d="M31 412 H769" />
        <text x="400" y="439" text-anchor="middle">{{ tr('CONNECTIVITY IMPROVES ACCESS · PERSISTENT FORMATS DECOUPLE DATA', '接続性はアクセスを改善 · 永続形式はデータを分離') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes sdl-focus {
  from { opacity: 0.27; }
  to { opacity: 1; }
}

@keyframes sdl-rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.divider { stroke: var(--c-line); stroke-width: 2.5; }
.boundary { opacity: 0.27; }
.boundary.on { animation: sdl-focus 420ms ease-out both; }
.section-title { fill: var(--c-fg); font-size: 18px; font-weight: 900; letter-spacing: 0.06em; }
.section-sub { fill: var(--c-muted); font-size: 9.5px; font-weight: 900; letter-spacing: 0.05em; }
.source-chip rect, .consumer-chip rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.source-chip text, .consumer-chip text { fill: var(--c-fg); font-size: 11.5px; font-weight: 850; }
.flow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; stroke-linejoin: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.mini-pill { fill: var(--c-fg); }
.mini-pill-text { fill: var(--c-bg); font-size: 9px; font-weight: 900; }
.engine-card rect, .database-service rect { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 2.5; }
.database-service text { fill: var(--c-fg); font-size: 11px; font-weight: 900; letter-spacing: 0.035em; }
.card-title { fill: var(--c-fg); font-size: 15px; font-weight: 900; }
.card-copy { fill: var(--c-muted); font-size: 10.5px; font-weight: 750; }
.outcome-card rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.outcome-title { fill: var(--c-fg); font-size: 14px; font-weight: 900; }
.outcome-copy { fill: var(--c-muted); font-size: 10.5px; font-weight: 750; }
.result-card rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.arrow-result rect { stroke: var(--c-portolan); }
.result-card path { fill: none; stroke: var(--c-muted); stroke-width: 1.6; }
.arrow-result path { stroke: var(--c-portolan); }
.result-title { fill: var(--c-fg); font-size: 12px; font-weight: 900; }
.result-copy { fill: var(--c-muted); font-size: 8.8px; font-weight: 750; }
.ipc-pill { fill: var(--c-portolan-soft); stroke: var(--c-portolan); stroke-width: 2; }
.ipc-text { fill: var(--c-portolan); font-size: 10.5px; font-weight: 900; }
.benchmark rect { fill: var(--c-fg); stroke: var(--c-fg); stroke-width: 2; }
.bench-kicker { fill: var(--c-bg); font-size: 9px; font-weight: 850; letter-spacing: 0.035em; }
.bench-value { fill: var(--c-ok); font-size: 15px; font-weight: 900; }
.status-pill rect { stroke-width: 2; }
.status-pill text { font-size: 9.5px; font-weight: 900; letter-spacing: 0.035em; }
.status-pill.warn rect { fill: color-mix(in srgb, var(--c-warn) 12%, var(--c-bg)); stroke: var(--c-warn); }
.status-pill.warn text { fill: var(--c-warn); }
.status-pill.ok rect { fill: color-mix(in srgb, var(--c-ok) 12%, var(--c-bg)); stroke: var(--c-ok); }
.status-pill.ok text { fill: var(--c-ok); }
.data-contract > rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 2.5; }
.format-chip rect { fill: var(--c-bg); stroke: var(--c-portolan); stroke-width: 2; }
.format-chip text { fill: var(--c-portolan); font-size: 10.5px; font-weight: 900; }
.summary { opacity: 0; }
.summary.on { animation: sdl-rise 430ms ease-out both; }
.summary path { stroke: var(--c-portolan); stroke-width: 2.5; }
.summary text { fill: var(--c-muted); font-size: 10.5px; font-weight: 850; letter-spacing: 0.025em; }
</style>
