<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const current = computed(() => [
  ['GeoParquet', tr('vector data', 'ベクターデータ'), 'https://geoparquet.org/'],
  ['COG', tr('raster data', 'ラスターデータ'), 'https://docs.ogc.org/is/21-026/21-026.html'],
  ['Parquet', tr('companion tables', '補助テーブル'), 'https://parquet.apache.org/docs/file-format/'],
  ['PMTiles', tr('visualization derivative', '可視化用派生データ'), 'https://docs.protomaps.com/pmtiles/'],
])

const later = computed(() => [
  ['COPC', tr('point clouds', '点群'), 'https://copc.io/'],
  ['GeoZarr', tr('multidimensional arrays', '多次元配列'), 'https://github.com/zarr-developers/geozarr-spec'],
  ['STAC-GeoParquet', tr('full catalog index', '完全なカタログ索引'), 'https://github.com/stac-utils/stac-geoparquet'],
])
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('A clear scope boundary. Portolan currently validates GeoParquet vectors, COG rasters, companion Parquet tables, and PMTiles visualization derivatives. It does not yet define normative rules for COPC, GeoZarr, or a full STAC-GeoParquet catalog index.', '明確な対象範囲です。Portolanは現在、GeoParquetベクター、COGラスター、補助Parquetテーブル、PMTiles可視化用派生データを検証します。COPC、GeoZarr、完全なSTAC-GeoParquetカタログ索引の規範ルールはまだ定義していません。')">
      <text x="400" y="34" text-anchor="middle" class="version">{{ tr('IMPLEMENTED SCOPE · v0.1.1', '実装済みの範囲 · v0.1.1') }}</text>

      <line x1="400" y1="62" x2="400" y2="424" class="boundary" />
      <circle cx="400" cy="78" r="8" class="boundary-dot" />

      <text x="58" y="92" class="heading now">{{ tr('VALIDATED NOW', '現在検証可能') }}</text>
      <text x="58" y="120" class="heading-ja">{{ tr('IMPLEMENTED', '実装済み') }}</text>

      <text x="444" y="92" class="heading later">{{ tr('NO NORMATIVE RULES YET', '規範ルールは未定') }}</text>
      <text x="444" y="120" class="heading-ja">{{ tr('PLANNED, NOT IMPLEMENTED', '計画段階・未実装') }}</text>

      <g class="items" :class="{ on: s >= 1 }">
        <g v-for="(item, i) in current" :key="item[0]" :transform="`translate(58 ${166 + i * 66})`">
          <lucide-circle-check-big x="0" y="-21" width="28" height="28" class="scope-icon current-icon" />
          <a :href="item[2]" target="_blank" rel="noopener noreferrer" class="svg-source-link"
             :class="{ 'is-disabled': s < 1 }" :tabindex="s >= 1 ? 0 : -1"
             :aria-label="tr(`Open ${item[0]} documentation in a new tab`, `${item[0]}のドキュメントを新しいタブで開く`)" @click.stop>
          <text x="42" y="0" class="item-title link-label">{{ item[0] }}</text>
          </a>
          <text x="42" y="25" class="item-note">{{ item[1] }}</text>
        </g>
      </g>

      <g class="items" :class="{ on: s >= 2 }">
        <g v-for="(item, i) in later" :key="item[0]" :transform="`translate(444 ${178 + i * 82})`">
          <lucide-circle-minus x="0" y="-21" width="28" height="28" class="scope-icon later-icon" />
          <a :href="item[2]" target="_blank" rel="noopener noreferrer" class="svg-source-link"
             :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
             :aria-label="tr(`Open ${item[0]} documentation in a new tab`, `${item[0]}のドキュメントを新しいタブで開く`)" @click.stop>
          <text x="42" y="0" class="item-title link-label">{{ item[0] }}</text>
          </a>
          <text x="42" y="25" class="item-note">{{ item[1] }}</text>
        </g>
        <text x="444" y="414" class="honesty">{{ tr('Roadmap ≠ implemented scope', 'ロードマップ ≠ 実装済みの範囲') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.version { fill: var(--c-muted); font-size: 17px; font-weight: 850; letter-spacing: 0.085em; }
.boundary { stroke: var(--c-line); stroke-width: 3; }
.boundary-dot { fill: var(--c-accent); }
.heading { font-size: 21px; font-weight: 900; letter-spacing: 0.045em; }
.heading.now { fill: var(--c-ok); }
.heading.later { fill: var(--c-warn); font-size: 19px; }
.heading-ja { fill: var(--c-muted); font-size: 15px; font-weight: 750; font-family: 'Noto Sans JP', sans-serif; }
.items { opacity: 0; }
.items.on { animation: reveal 420ms ease-out both; }
.current-icon { color: var(--c-ok); }
.later-icon { color: var(--c-warn); }
.item-title { fill: var(--c-fg); font-size: 21px; font-weight: 900; }
.item-note { fill: var(--c-muted); font-size: 17px; font-weight: 750; }
.honesty { fill: var(--c-warn); font-size: 17px; font-weight: 850; }
</style>
