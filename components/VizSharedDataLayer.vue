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
         :aria-label="tr('Before publication, each database silo couples its engine to engine-owned data. FDW, ODBC, JDBC, Arrow, and ADBC connect silos or exchange results, but the durable bytes remain coupled to an engine. Publishing Parquet and GeoParquet in object storage creates a separate persistent data layer that compatible engines such as DuckDB, Spark, Trino, and Polars can read directly.', '公開前は、各データベースサイロがエンジンとエンジン所有のデータを結合しています。FDW、ODBC、JDBC、Arrow、ADBCはサイロを接続し、結果を交換しますが、永続的なバイト列はエンジンと結合したままです。ParquetとGeoParquetをオブジェクトストレージで公開すると、DuckDB、Spark、Trino、Polarsなどの互換エンジンが直接読める独立した永続データ層になります。')">
      <defs>
        <marker id="sdl-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <text x="400" y="28" text-anchor="middle" class="kicker">{{ tr('FROM ENGINE-OWNED DATA TO A SHARED DATA LAYER', 'エンジン所有データから共有データ層へ') }}</text>

      <g class="silos" :class="{ on: s >= 1 }">
        <text x="28" y="66" class="section-title">{{ tr('BEFORE · DATA + ENGINE SILOS', '以前 · データ + エンジンのサイロ') }}</text>

        <g class="silo" transform="translate(28 88)">
          <rect width="232" height="78" rx="13" class="silo-shell" />
          <path d="M0 56 H232" class="silo-split" />
          <lucide-database x="12" y="18" width="32" height="32" class="silo-icon" />
          <text x="58" y="31" class="silo-name">PostgreSQL</text>
          <text x="58" y="50" class="silo-type">{{ tr('ENGINE', 'エンジン') }}</text>
          <text x="116" y="67" text-anchor="middle" class="silo-data">{{ tr('native spatial data', '固有の空間データ') }}</text>
        </g>

        <g class="silo" transform="translate(28 179)">
          <rect width="232" height="78" rx="13" class="silo-shell" />
          <path d="M0 56 H232" class="silo-split" />
          <lucide-database x="12" y="18" width="32" height="32" class="silo-icon" />
          <text x="58" y="31" class="silo-name">Oracle</text>
          <text x="58" y="50" class="silo-type">{{ tr('ENGINE', 'エンジン') }}</text>
          <text x="116" y="67" text-anchor="middle" class="silo-data">SDO_GEOMETRY</text>
        </g>

        <g class="silo" transform="translate(28 270)">
          <rect width="232" height="78" rx="13" class="silo-shell" />
          <path d="M0 56 H232" class="silo-split" />
          <lucide-database x="12" y="18" width="32" height="32" class="silo-icon" />
          <text x="58" y="31" class="silo-name">SQL Server</text>
          <text x="58" y="50" class="silo-type">{{ tr('ENGINE', 'エンジン') }}</text>
          <text x="116" y="67" text-anchor="middle" class="silo-data">{{ tr('native spatial data', '固有の空間データ') }}</text>
        </g>
      </g>

      <g class="exchange" :class="{ on: s >= 2 }">
        <text x="342" y="102" text-anchor="middle" class="bridge-title">{{ tr('CONNECT', '接続') }}</text>
        <text x="342" y="127" text-anchor="middle" class="bridge-tech">FDW · ODBC · JDBC</text>
        <path d="M278 148 H406" class="bridge-line" />
        <text x="342" y="185" text-anchor="middle" class="bridge-title">{{ tr('EXCHANGE', '交換') }}</text>
        <text x="342" y="210" text-anchor="middle" class="bridge-tech">Arrow · ADBC</text>
        <path d="M278 231 H406" class="bridge-line" />
        <path d="M298 263 L386 351 M386 263 L298 351" class="break-mark" />
        <rect x="278" y="365" width="128" height="52" rx="11" class="bridge-warning" />
        <text x="342" y="387" text-anchor="middle" class="warning-head">{{ tr('REACHABLE', '到達可能') }}</text>
        <text x="342" y="405" text-anchor="middle" class="warning-copy">{{ tr('bytes still coupled', 'バイト列は結合したまま') }}</text>
      </g>

      <g class="publish" :class="{ on: s >= 3 }">
        <text x="430" y="66" class="section-title">{{ tr('AFTER · DATA IS ITS OWN LAYER', '以後 · データは独立した層') }}</text>

        <g class="engine" transform="translate(438 91)">
          <rect width="118" height="43" rx="10" />
          <text x="59" y="27" text-anchor="middle">DuckDB</text>
        </g>
        <g class="engine" transform="translate(654 91)">
          <rect width="118" height="43" rx="10" />
          <text x="59" y="27" text-anchor="middle">Spark</text>
        </g>
        <g class="engine" transform="translate(438 323)">
          <rect width="118" height="43" rx="10" />
          <text x="59" y="27" text-anchor="middle">Trino</text>
        </g>
        <g class="engine" transform="translate(654 323)">
          <rect width="118" height="43" rx="10" />
          <text x="59" y="27" text-anchor="middle">Polars</text>
        </g>

        <g class="storage">
          <rect x="530" y="168" width="150" height="120" rx="20" />
          <lucide-cloud x="584" y="183" width="42" height="42" class="storage-icon" />
          <text x="605" y="239" text-anchor="middle" class="storage-title">{{ tr('OBJECT STORAGE', 'オブジェクトストレージ') }}</text>
          <text x="605" y="262" text-anchor="middle" class="storage-file">Parquet · GeoParquet</text>
          <text x="605" y="279" text-anchor="middle" class="storage-note">{{ tr('shared persistent data', '共有永続データ') }}</text>
        </g>

        <path d="M527 134 L568 174" class="engine-flow" marker-end="url(#sdl-arrow)" />
        <path d="M683 134 L642 174" class="engine-flow" marker-end="url(#sdl-arrow)" />
        <path d="M527 323 L568 282" class="engine-flow" marker-end="url(#sdl-arrow)" />
        <path d="M683 323 L642 282" class="engine-flow" marker-end="url(#sdl-arrow)" />

        <rect x="464" y="382" width="282" height="51" rx="11" class="after-outcome" />
        <text x="605" y="403" text-anchor="middle" class="after-copy">{{ tr('ONE DATASET · MANY COMPATIBLE ENGINES', '1つのデータ · 複数の互換エンジン') }}</text>
        <text x="605" y="421" text-anchor="middle" class="after-note">{{ tr('change the engine, not the canonical data', 'エンジンを変えても正式データは移動不要') }}</text>
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
.section-title { fill: var(--c-fg); font-size: 15px; font-weight: 900; letter-spacing: 0.04em; }
.silos, .exchange, .publish { opacity: 0.24; }
.silos.on, .exchange.on, .publish.on { animation: sdl-focus 420ms ease-out both; }
.silo-shell { fill: var(--c-panel); stroke: var(--c-warn); stroke-width: 2.5; }
.silo-split { fill: none; stroke: var(--c-warn); stroke-width: 2; }
.silo-icon { color: var(--c-warn); }
.silo-name { fill: var(--c-fg); font-size: 14px; font-weight: 900; }
.silo-type { fill: var(--c-warn); font-size: 9px; font-weight: 900; letter-spacing: 0.08em; }
.silo-data { fill: var(--c-muted); font-size: 11px; font-weight: 800; }
.bridge-title { fill: var(--c-fg); font-size: 12px; font-weight: 900; letter-spacing: 0.08em; }
.bridge-tech { fill: var(--c-portolan); font-size: 10px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.bridge-line { fill: none; stroke: var(--c-portolan); stroke-width: 2.5; stroke-linecap: round; }
.break-mark { fill: none; stroke: var(--c-accent); stroke-width: 5; stroke-linecap: round; opacity: 0.75; }
.bridge-warning { fill: color-mix(in srgb, var(--c-warn) 10%, var(--c-bg)); stroke: var(--c-warn); stroke-width: 2; }
.warning-head { fill: var(--c-warn); font-size: 11px; font-weight: 900; letter-spacing: 0.08em; }
.warning-copy { fill: var(--c-muted); font-size: 9px; font-weight: 800; }
.engine rect { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2.2; }
.engine text { fill: var(--c-fg); font-size: 13px; font-weight: 900; }
.engine-flow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.storage rect { fill: var(--c-portolan-soft); stroke: var(--c-portolan); stroke-width: 3; }
.storage-icon { color: var(--c-portolan); }
.storage-title { fill: var(--c-portolan); font-size: 12px; font-weight: 900; letter-spacing: 0.045em; }
.storage-file { fill: var(--c-fg); font-size: 11px; font-weight: 900; }
.storage-note { fill: var(--c-muted); font-size: 8.5px; font-weight: 800; }
.after-outcome { fill: color-mix(in srgb, var(--c-ok) 9%, var(--c-bg)); stroke: var(--c-ok); stroke-width: 2; }
.after-copy { fill: var(--c-ok); font-size: 10.5px; font-weight: 900; letter-spacing: 0.04em; }
.after-note { fill: var(--c-muted); font-size: 8.5px; font-weight: 800; }
</style>
