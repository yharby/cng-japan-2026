<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const scopes = computed(() => [
  { kind: tr('CITY', '都市'), name: 'PERGAMINO', features: '1.0M', collections: tr('183 collections', '183 コレクション'), license: tr('CC BY-SA · CHECK LAYER', 'CC BY-SA · レイヤ確認'), licenseTone: 'conditional', x: 42, reveal: 1, url: 'https://data.source.coop/nlebovits/pergamino-ide/catalog.json' },
  { kind: tr('COUNTRY', '国'), name: 'MOLDOVA', features: '21.2M', collections: tr('75 collections', '75 コレクション'), license: tr('LICENSE UNCONFIRMED', 'ライセンス未確認'), licenseTone: 'blocked', x: 286, reveal: 2, url: 'https://data.source.coop/nlebovits/moldova-geodata/catalog.json' },
  { kind: tr('GLOBAL', '世界'), name: 'MICROSOFT ROADS', features: '256.6M', collections: tr('1 collection', '1 コレクション'), license: 'ODbL 1.0 · SHARE ALIKE', licenseTone: 'cleared', x: 530, reveal: 3, url: 'https://data.source.coop/nlebovits/microsoft-ml-road-detections/catalog.json' },
])
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('Three equal registry examples show the same static catalog and cloud-native asset pattern at city, country and global scope. Their reuse rights differ: Pergamino must be checked per layer, Moldova is unconfirmed, and Microsoft Roads uses ODbL share alike. Registry discovery is neither a license clearance nor a Portolan conformance result.', '都市・国・世界の3つのレジストリ例は同じ静的カタログとクラウドネイティブ資産のパターンを示しますが、再利用条件は異なります。Pergaminoはレイヤごとの確認が必要、Moldovaは未確認、Microsoft RoadsはODbLの継承条件があります。レジストリ掲載はライセンス確認でもPortolan準拠でもありません。')">
      <text x="400" y="27" text-anchor="middle" class="kicker">{{ tr('REGISTRY EXAMPLES · 18 AUGUST 2026', 'レジストリ例 · 2026年8月18日') }}</text>

      <g v-for="scope in scopes" :key="scope.kind" class="scope"
         :class="{ visited: s >= scope.reveal, active: s === scope.reveal }"
         :transform="`translate(${scope.x} 55)`">
        <a :href="scope.url" target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr(`Open the ${scope.name} catalog.json file in a new tab`, `${scope.name}のcatalog.jsonを新しいタブで開く`)" @click.stop>
        <rect width="228" height="300" rx="20" class="scope-body link-target" />
        <rect width="228" height="9" rx="5" class="tone" />
        <text x="20" y="42" class="kind">{{ scope.kind }}</text>
        <text x="20" y="78" class="name link-label" :class="{ compact: scope.kind === 'GLOBAL' }">{{ scope.name }}</text>
        <line x1="20" y1="95" x2="208" y2="95" class="rule" />

        <text x="20" y="137" class="features">{{ scope.features }}</text>
        <text x="20" y="160" class="feature-label">{{ tr('FEATURES', 'フィーチャ') }}</text>
        <text x="20" y="187" class="collection-count">{{ scope.collections }}</text>
        <text x="20" y="209" class="license-status" :class="scope.licenseTone">{{ scope.license }}</text>

        <text x="20" y="229" class="pattern-label">{{ tr('THE SAME PATTERN', '同じパターン') }}</text>
        <rect x="20" y="239" width="83" height="39" rx="8" class="catalog-chip" />
        <text x="61" y="263" text-anchor="middle" class="catalog-text link-label">catalog.json</text>
        <path d="M108 258 H126 M119 252 L126 258 L119 264" class="mini-arrow" />
        <rect x="132" y="233" width="76" height="22" rx="7" class="asset-chip" />
        <text x="170" y="248" text-anchor="middle" class="asset-text">GeoParquet</text>
        <rect x="132" y="263" width="76" height="22" rx="7" class="asset-chip" />
        <text x="170" y="278" text-anchor="middle" class="asset-text">PMTiles</text>
        </a>
      </g>

      <g class="registry-truth">
        <a href="https://github.com/portolan-sdi/portolan-registry/blob/main/exports/catalogs.json"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Portolan registry catalog export in a new tab', 'Portolanレジストリのカタログエクスポートを新しいタブで開く')" @click.stop>
        <rect x="42" y="378" width="716" height="68" rx="16" class="truth-body link-target" />
        <text x="400" y="405" text-anchor="middle" class="truth-main">{{ tr('11 ROOTS · 596 COLLECTIONS · 383.1M FEATURES', '11 ルート · 596 コレクション · 383.1M フィーチャ') }}</text>
        <text x="400" y="431" text-anchor="middle" class="truth-sub link-label">{{ tr('Registry discovery ≠ Portolan conformance', 'レジストリでの発見 ≠ Portolan準拠') }}</text>
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
.license-status.conditional { fill: var(--c-warn); }
.license-status.blocked { fill: var(--c-accent); }
.pattern-label { fill: var(--c-muted); font-size: 12px; font-weight: 900; letter-spacing: 0.08em; }
.catalog-chip { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2; }
.catalog-text { fill: var(--c-fg); font-size: 11px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.mini-arrow { fill: none; stroke: var(--c-accent); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.asset-chip { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2; }
.asset-text { fill: var(--c-fg); font-size: 10px; font-weight: 900; }
.truth-body { fill: var(--c-fg); }
.truth-main { fill: var(--c-bg); font-size: 18px; font-weight: 900; letter-spacing: 0.06em; }
.truth-sub { fill: color-mix(in srgb, var(--c-warn) 18%, var(--c-bg)); font-size: 16px; font-weight: 800; }
</style>
