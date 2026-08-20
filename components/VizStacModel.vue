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
         :aria-label="tr('A common STAC directory tree. A root catalog links a collection for one related dataset. The collection links multiple GeoJSON items for places and times. Items link asset files in object storage.', '一般的なSTACのディレクトリツリー。ルートCatalogが関連データセットのCollectionへ、Collectionが場所と時間を表す複数のGeoJSON Itemへ、Itemがオブジェクトストレージ上のAssetファイルへリンクします。')">
      <defs>
        <marker id="sm-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <path d="M185 225 H230" class="link primary-link" marker-end="url(#sm-arrow)" />
      <path d="M490 200 H544 V320 H490" class="link branch" />
      <path d="M544 260 H570" class="link" marker-end="url(#sm-arrow)" />

      <a href="https://github.com/radiantearth/stac-spec/blob/master/catalog-spec/catalog-spec.md"
         target="_blank" rel="noopener noreferrer" class="svg-source-link"
         :aria-label="tr('Open the STAC Catalog specification in a new tab', 'STAC Catalog仕様を新しいタブで開く')" @click.stop>
        <g class="catalog-node">
          <rect x="35" y="158" width="150" height="134" rx="14" class="link-target" />
          <lucide-network x="91" y="177" width="38" height="38" class="node-icon" />
          <text x="110" y="238" text-anchor="middle" class="node-kind">CATALOG</text>
          <text x="110" y="266" text-anchor="middle" class="node-file link-label">catalog.json</text>
          <text x="110" y="285" text-anchor="middle" class="node-copy">{{ tr('start here', 'ここから開始') }}</text>
        </g>
      </a>

      <g class="collection-shell" :class="{ on: s >= 1 }">
        <rect x="230" y="48" width="285" height="360" rx="14" class="shell" />

        <a href="https://github.com/radiantearth/stac-spec/blob/master/collection-spec/collection-spec.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the STAC Collection specification in a new tab', 'STAC Collection仕様を新しいタブで開く')" @click.stop>
          <g class="collection-header">
            <rect x="248" y="66" width="249" height="78" rx="8" class="link-target" />
            <text x="267" y="91" class="node-kind">COLLECTION</text>
            <text x="267" y="117" class="node-file link-label">collection.json</text>
            <text x="267" y="137" class="metadata">{{ tr('shared extent · license · providers', '共通の範囲 · ライセンス · 提供者') }}</text>
          </g>
        </a>

        <a href="https://github.com/radiantearth/stac-spec/blob/master/item-spec/item-spec.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link items-link"
           :aria-label="tr('Open the STAC Item specification in a new tab', 'STAC Item仕様を新しいタブで開く')" @click.stop>
          <g class="items" :class="{ on: s >= 2 }">
            <g class="item-card">
              <rect x="254" y="162" width="236" height="86" rx="8" class="link-target" />
              <path d="M273 218 L286 184 L319 194 L309 229 Z" class="footprint" />
              <text x="338" y="190" class="item-kind">ITEM A</text>
              <text x="338" y="215" class="node-file link-label">item-a.json</text>
              <text x="338" y="237" class="node-copy">{{ tr('one place + time', '1地点・1時点') }}</text>
            </g>
            <g class="item-card">
              <rect x="254" y="278" width="236" height="86" rx="8" class="link-target" />
              <path d="M273 333 L282 296 L318 304 L310 344 Z" class="footprint second" />
              <text x="338" y="306" class="item-kind">ITEM B</text>
              <text x="338" y="331" class="node-file link-label">item-b.json</text>
              <text x="338" y="353" class="node-copy">{{ tr('another place + time', '別の地点・時点') }}</text>
            </g>
          </g>
        </a>
      </g>

      <a href="https://github.com/radiantearth/stac-spec/blob/master/commons/assets.md"
         target="_blank" rel="noopener noreferrer" class="svg-source-link"
         :aria-label="tr('Open the STAC Asset specification in a new tab', 'STAC Asset仕様を新しいタブで開く')" @click.stop>
        <g class="assets" :class="{ on: s >= 3 }">
          <rect x="570" y="102" width="190" height="265" rx="14" class="asset-shell link-target" />
          <text x="590" y="134" class="node-kind">{{ tr('ACTUAL FILES', '実データ') }}</text>
          <text x="590" y="158" class="node-copy">{{ tr('stable URLs in storage', 'ストレージ上の安定URL') }}</text>

          <g class="asset-row">
            <rect x="589" y="181" width="152" height="45" rx="6" />
            <lucide-image x="602" y="192" width="23" height="23" class="asset-icon" />
            <text x="637" y="209" class="asset-file link-label">B04.tif</text>
            <text x="724" y="209" text-anchor="end" class="asset-type">COG</text>
          </g>
          <g class="asset-row">
            <rect x="589" y="238" width="152" height="45" rx="6" />
            <lucide-table-2 x="602" y="249" width="23" height="23" class="asset-icon" />
            <text x="637" y="266" class="asset-file link-label">data.parquet</text>
          </g>
          <g class="asset-row">
            <rect x="589" y="295" width="152" height="45" rx="6" />
            <lucide-image x="602" y="306" width="23" height="23" class="asset-icon" />
            <text x="637" y="323" class="asset-file link-label">thumbnail.webp</text>
          </g>
          <text x="665" y="357" text-anchor="middle" class="asset-note">{{ tr('one Item can link many Assets', '1つのItemから複数Assetへ') }}</text>
        </g>
      </a>

      <g class="legend">
        <path d="M35 418 H760" />
        <text x="35" y="442">{{ tr('Typical route. JSON describes + links; Asset URLs point to files.', '典型的な経路。JSONが記述・リンクし、Asset URLがファイルを指す。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes sm-focus {
  from { opacity: 0.22; }
  to { opacity: 1; }
}

.link { fill: none; stroke: var(--c-line); stroke-width: var(--w-connector); stroke-linecap: round; stroke-linejoin: round; }
.primary-link { stroke: var(--c-portolan); }
.branch { stroke-width: 2; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.catalog-node rect, .collection-header rect, .item-card rect, .asset-shell {
  fill: var(--c-panel);
  stroke: var(--c-line);
  stroke-width: 2.5;
}
.catalog-node rect { stroke: var(--c-accent); }
.catalog-node .node-icon { color: var(--c-accent); }
.collection-shell, .items, .assets { opacity: 0.22; }
.collection-shell.on, .items.on, .assets.on { animation: sm-focus 430ms ease-out both; }
.collection-shell.on > .shell, .collection-shell.on .collection-header rect,
.items.on .item-card rect, .assets.on .asset-shell { stroke: var(--c-accent); }
.collection-shell .shell { fill: none; stroke: var(--c-line); stroke-width: 2; stroke-dasharray: 7 7; }
.collection-header rect { fill: var(--c-bg); }
.node-kind { fill: var(--c-accent); font-size: 15px; font-weight: 900; letter-spacing: 0.07em; }
.node-file, .asset-file { fill: var(--c-fg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 850; }
.node-file { font-size: 15px; }
.node-copy { fill: var(--c-muted); font-size: 12px; font-weight: 700; }
.metadata { fill: var(--c-portolan); font-size: 10px; font-weight: 800; }
.item-kind { fill: var(--c-accent); font-size: 13px; font-weight: 900; letter-spacing: 0.06em; }
.footprint { fill: color-mix(in srgb, var(--c-portolan) 22%, transparent); stroke: var(--c-portolan); stroke-width: 1.75; }
.footprint.second { fill: color-mix(in srgb, var(--c-ok) 18%, transparent); stroke: var(--c-ok); }
.asset-row rect { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 1.75; }
.asset-icon { color: var(--c-portolan); }
.asset-file { font-size: 12px; }
.asset-type { fill: var(--c-muted); font-size: 10px; font-weight: 900; }
.asset-note { fill: var(--c-muted); font-size: 10px; font-weight: 750; }
.legend path { stroke: var(--c-accent); stroke-width: 2.5; }
.legend text { fill: var(--c-fg); font-size: 16px; font-weight: 800; }
</style>
