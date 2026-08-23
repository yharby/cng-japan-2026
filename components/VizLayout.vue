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
         :aria-label="tr('One Netherlands Provinces collection has three separate entrances. Software uses collection.json, people use README.md, and AI agents use AGENTS.md. Each entrance leads to the same published assets.', 'Netherlands Provincesコレクションには3つの入口があります。ソフトウェアはcollection.json、人はREADME.md、AIエージェントはAGENTS.mdを使い、すべて同じ公開資産につながります。')">
      <text x="400" y="30" text-anchor="middle" class="kicker">{{ tr('ONE COLLECTION · THREE ENTRANCES', '1つのコレクション · 3つの入口') }}</text>

      <g class="collection">
        <a href="https://github.com/portolan-sdi/portolan-spec/tree/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces example folder in a new tab', 'Netherlands Provincesのサンプルフォルダーを新しいタブで開く')" @click.stop>
        <rect x="218" y="50" width="364" height="66" rx="16" class="collection-body link-target" />
        <lucide-folder-open x="236" y="67" width="42" height="42" class="folder-icon" />
        <text x="432" y="92" text-anchor="middle" class="collection-name link-label">netherlands-provinces/</text>
        </a>
      </g>

      <path d="M400 116 V146 M159 146 H641 M159 146 V170 M400 146 V170 M641 146 V170" class="branches" />

      <g class="door" :class="{ visited: s >= 1, active: s === 1 }">
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/collection.json"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces collection.json file in a new tab', 'Netherlands Provincesのcollection.jsonを新しいタブで開く')" @click.stop>
        <rect x="54" y="170" width="210" height="172" rx="18" class="door-card link-target" />
        <path d="M76 193 H242 V322 H76 Z" class="door-line" />
        <text x="159" y="218" text-anchor="middle" class="audience">{{ tr('SOFTWARE', 'ソフトウェア') }}</text>
        <text x="159" y="263" text-anchor="middle" class="file small-file link-label">collection.json</text>
        <text x="159" y="296" text-anchor="middle" class="job">{{ tr('metadata · links', 'メタデータ · リンク') }}</text>
        </a>
      </g>

      <g class="door" :class="{ visited: s >= 2, active: s === 2 }">
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/README.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces README.md file in a new tab', 'Netherlands ProvincesのREADME.mdを新しいタブで開く')" @click.stop>
        <rect x="295" y="170" width="210" height="172" rx="18" class="door-card link-target" />
        <path d="M317 193 H483 V322 H317 Z" class="door-line" />
        <text x="400" y="218" text-anchor="middle" class="audience">{{ tr('PEOPLE', '人') }}</text>
        <text x="400" y="263" text-anchor="middle" class="file link-label">README.md</text>
        <text x="400" y="296" text-anchor="middle" class="job">{{ tr('meaning · license', '意味 · ライセンス') }}</text>
        </a>
      </g>

      <g class="door" :class="{ visited: s >= 3, active: s === 3 }">
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/AGENTS.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces AGENTS.md file in a new tab', 'Netherlands ProvincesのAGENTS.mdを新しいタブで開く')" @click.stop>
        <rect x="536" y="170" width="210" height="172" rx="18" class="door-card link-target" />
        <path d="M558 193 H724 V322 H558 Z" class="door-line" />
        <text x="641" y="218" text-anchor="middle" class="audience">{{ tr('AI AGENTS', 'AIエージェント') }}</text>
        <text x="641" y="263" text-anchor="middle" class="file link-label">AGENTS.md</text>
        <text x="641" y="296" text-anchor="middle" class="job">{{ tr('queries · caveats', 'クエリ · 注意点') }}</text>
        </a>
      </g>

      <g class="assets">
        <text x="400" y="374" text-anchor="middle" class="asset-label">{{ tr('THE SAME PUBLISHED ASSETS', '同じ公開資産') }}</text>
        <line x1="92" y1="389" x2="708" y2="389" class="asset-line" />
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/netherlands-provinces.parquet"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces GeoParquet file in a new tab', 'Netherlands ProvincesのGeoParquetファイルを新しいタブで開く')" @click.stop>
          <text x="134" y="419" class="asset-text link-label">GeoParquet</text>
        </a>
        <text x="234" y="419" class="asset-text">·</text>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/netherlands-provinces.pmtiles"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces PMTiles file in a new tab', 'Netherlands ProvincesのPMTilesファイルを新しいタブで開く')" @click.stop>
          <text x="250" y="419" class="asset-text link-label">PMTiles</text>
        </a>
        <text x="328" y="419" class="asset-text">·</text>
        <a href="https://github.com/portolan-sdi/portolan-spec/tree/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/styles"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces styles folder in a new tab', 'Netherlands Provincesのstylesフォルダーを新しいタブで開く')" @click.stop>
          <text x="344" y="419" class="asset-text link-label">styles</text>
        </a>
        <text x="400" y="419" class="asset-text">·</text>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/thumbnail.png"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces thumbnail in a new tab', 'Netherlands Provincesのサムネイルを新しいタブで開く')" @click.stop>
          <text x="416" y="419" class="asset-text link-label">thumbnail</text>
        </a>
        <text x="506" y="419" class="asset-text">·</text>
        <a href="https://github.com/portolan-sdi/portolan-spec/tree/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Netherlands Provinces source links in a new tab', 'Netherlands Provincesの原典リンクを新しいタブで開く')" @click.stop>
          <text x="522" y="419" class="asset-text link-label">{{ tr('original source', '原典') }}</text>
        </a>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 18px; font-weight: 900; letter-spacing: 0.08em; }
.collection-body { fill: var(--c-panel); stroke: var(--c-fg); stroke-width: 3; }
.folder-icon { color: var(--c-portolan); }
.collection-name, .file { fill: var(--c-fg); font-family: ui-monospace, 'JetBrains Mono', monospace; font-weight: 900; }
.collection-name { font-size: 21px; }
.branches { fill: none; stroke: var(--c-line); stroke-width: var(--w-connector); stroke-linecap: round; }
.door { opacity: 0.38; transition: opacity 300ms ease, transform 300ms ease; transform-origin: center; }
.door.visited { opacity: 0.7; }
.door.active { opacity: 1; transform: translateY(-5px); }
.door-card { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 3; }
.door-line { fill: none; stroke: var(--c-line); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
.door.active .door-card, .door.active .door-line { stroke: var(--c-accent); }
.door.active .audience { fill: var(--c-accent); }
.audience { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.08em; }
.file { font-size: 22px; }
.small-file { font-size: 15px; }
.job { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.asset-label { fill: var(--c-muted); font-size: 13px; font-weight: 900; letter-spacing: 0.12em; }
.asset-line { stroke: var(--c-line); stroke-width: 2; }
.asset-text { fill: var(--c-fg); font-size: 17px; font-weight: 800; }
</style>
