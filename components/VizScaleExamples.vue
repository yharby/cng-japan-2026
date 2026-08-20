<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const scopes = computed(() => [
  { kind: tr('CITY', '都市'), name: 'BOSTON OPEN SPACE', metric: '1,012', metricLabel: tr('FEATURES', 'フィーチャ'), collections: tr('1 collection', '1 コレクション'), license: 'PDDL 1.0 · PUBLIC DOMAIN', x: 42, reveal: 1, url: 'https://raw.githubusercontent.com/portolan-sdi/portolan-spec/main/examples/catalog/portolan-reference/boundaries/boston-open-space/collection.json', file: 'collection.json', assetA: 'GeoParquet', assetB: 'PMTiles' },
  { kind: tr('COUNTRY', '国'), name: 'NETHERLANDS BAG', metric: '11.4M', metricLabel: tr('BUILDINGS', '建物'), collections: tr('1 collection', '1 コレクション'), license: 'PDM 1.0 · PUBLIC DOMAIN', x: 286, reveal: 2, url: 'https://data.source.coop/cholmes/portolan-nl/kadaster/panden/collection.json', file: 'collection.json', assetA: 'GeoParquet', assetB: 'PMTiles' },
  { kind: tr('GLOBAL', '世界'), name: 'GHSL POPULATION', metric: '3,984', metricLabel: tr('ITEMS', 'アイテム'), collections: tr('12 collections', '12 コレクション'), license: 'CC BY 4.0', x: 530, reveal: 3, url: 'https://data.source.coop/nlebovits/ghsl/catalog.json', file: 'catalog.json', assetA: 'COG', assetB: 'STAC Items' },
])
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('Three exact, green-licensed publications show the same static catalog and cloud-native asset pattern at city, country and global scope: Boston Open Space, Netherlands BAG buildings, and GHSL Population.', '都市・国・世界の規模で、同じ静的カタログとクラウドネイティブ資産のパターンを示す3つのライセンス確認済み公開物です。Boston Open Space、Netherlands BAG建物、GHSL Populationです。')">
      <text x="400" y="27" text-anchor="middle" class="kicker">{{ tr('EXACT GREEN-LICENSED PUBLICATIONS · 20 AUGUST 2026', 'ライセンス確認済みの公開物 · 2026年8月20日') }}</text>

      <g v-for="scope in scopes" :key="scope.kind" class="scope"
         :class="{ visited: s >= scope.reveal, active: s === scope.reveal }"
         :transform="`translate(${scope.x} 55)`">
        <a :href="scope.url" target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr(`Open the ${scope.name} catalog.json file in a new tab`, `${scope.name}のcatalog.jsonを新しいタブで開く`)" @click.stop>
        <rect width="228" height="300" rx="20" class="scope-body link-target" />
        <rect width="228" height="9" rx="5" class="tone" />
        <text x="20" y="42" class="kind">{{ scope.kind }}</text>
        <text x="20" y="78" class="name compact link-label">{{ scope.name }}</text>
        <line x1="20" y1="95" x2="208" y2="95" class="rule" />

        <text x="20" y="137" class="features">{{ scope.metric }}</text>
        <text x="20" y="160" class="feature-label">{{ scope.metricLabel }}</text>
        <text x="20" y="187" class="collection-count">{{ scope.collections }}</text>
        <text x="20" y="209" class="license-status cleared">{{ scope.license }}</text>

        <text x="20" y="229" class="pattern-label">{{ tr('THE SAME PATTERN', '同じパターン') }}</text>
        <rect x="20" y="239" width="98" height="39" rx="8" class="catalog-chip" />
        <text x="69" y="263" text-anchor="middle" class="catalog-text link-label">{{ scope.file }}</text>
        <path d="M122 258 H136 M129 252 L136 258 L129 264" class="mini-arrow" />
        <rect x="142" y="233" width="66" height="22" rx="7" class="asset-chip" />
        <text x="175" y="248" text-anchor="middle" class="asset-text">{{ scope.assetA }}</text>
        <rect x="142" y="263" width="66" height="22" rx="7" class="asset-chip" />
        <text x="175" y="278" text-anchor="middle" class="asset-text">{{ scope.assetB }}</text>
        </a>
      </g>

      <g class="registry-truth">
        <a href="https://portolan-sdi.org/#registry"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Portolan registry catalog export in a new tab', 'Portolanレジストリのカタログエクスポートを新しいタブで開く')" @click.stop>
        <rect x="42" y="378" width="716" height="68" rx="16" class="truth-body link-target" />
        <text x="400" y="405" text-anchor="middle" class="truth-main">{{ tr('CITY · COUNTRY · GLOBAL', '都市 · 国 · 世界') }}</text>
        <text x="400" y="431" text-anchor="middle" class="truth-sub link-label">{{ tr('exact collection links · reusable data · explicit licenses', '正確なCollectionリンク · 再利用可能なデータ · 明示ライセンス') }}</text>
        </a>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.09em; }
.scope { opacity: 0.38; transition: opacity 300ms ease, transform 300ms ease; }
.scope.visited { opacity: 0.72; }
.scope.active { opacity: 1; }
.scope-body { fill: color-mix(in srgb, var(--c-warn) 8%, var(--c-bg)); stroke: var(--c-line); stroke-width: 3; }
.scope.active .scope-body { stroke: var(--c-accent); }
.tone { fill: var(--c-accent); }
.kind { fill: var(--c-muted); font-size: 14px; font-weight: 900; letter-spacing: 0.13em; }
.scope.active .kind { fill: var(--c-accent); }
.name { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.025em; }
.name.compact { font-size: 16px; }
.rule { stroke: var(--c-line); stroke-width: 2; }
.features { fill: var(--c-fg); font-size: 36px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.feature-label { fill: var(--c-accent); font-size: 13px; font-weight: 900; letter-spacing: 0.12em; }
.collection-count { fill: var(--c-muted); font-size: 16px; font-weight: 800; }
.license-status { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 850; letter-spacing: 0.015em; }
.license-status.cleared { fill: var(--c-ok); }
.pattern-label { fill: var(--c-muted); font-size: 12px; font-weight: 900; letter-spacing: 0.08em; }
.catalog-chip { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2; }
.catalog-text { fill: var(--c-fg); font-size: 9.5px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.mini-arrow { fill: none; stroke: var(--c-accent); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.asset-chip { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2; }
.asset-text { fill: var(--c-fg); font-size: 10px; font-weight: 900; }
.truth-body { fill: var(--c-fg); }
.truth-main { fill: var(--c-bg); font-size: 18px; font-weight: 900; letter-spacing: 0.06em; }
.truth-sub { fill: color-mix(in srgb, var(--c-warn) 18%, var(--c-bg)); font-size: 16px; font-weight: 800; }
</style>
