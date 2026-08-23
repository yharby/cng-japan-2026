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
         :aria-label="tr('Portolan CLI accepts local vector files, local raster files, WFS, and ArcGIS REST services. It converts vectors to GeoParquet and rasters to COG, generates a linked STAC catalog, and publishes it to object storage for QGIS, Python, and AI agents. The released publisher flow is init, add or extract, check fix, and push; sync repeats the publisher-controlled update round trip.', 'Portolan CLIは、ローカルのベクターファイル、ラスターファイル、WFS、ArcGIS RESTサービスを入力として受け取ります。ベクターをGeoParquet、ラスタをCOGへ変換し、リンクされたSTACカタログを生成してオブジェクトストレージへ公開し、QGIS、Python、AIエージェントから利用できます。公開フローはinit、addまたはextract、check fix、pushで、syncが公開者管理の更新処理を繰り返します。')">
      <defs>
        <marker id="cli-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <g class="source-card" transform="translate(42 50)">
        <rect width="180" height="58" rx="9" />
        <text x="16" y="23" class="source-type">{{ tr('VECTOR FILES', 'ベクターファイル') }}</text>
        <text x="16" y="45" class="source-value">.shp · .gpkg · .geojson</text>
      </g>
      <g class="source-card" transform="translate(42 121)">
        <rect width="180" height="58" rx="9" />
        <text x="16" y="23" class="source-type">{{ tr('RASTER FILES', 'ラスターファイル') }}</text>
        <text x="16" y="45" class="source-value">.tif · .tiff · .jp2</text>
      </g>
      <g class="source-card" transform="translate(42 192)">
        <rect width="180" height="58" rx="9" />
        <text x="16" y="23" class="source-type">{{ tr('SERVICES', 'サービス') }}</text>
        <text x="16" y="45" class="source-value">WFS · ArcGIS REST</text>
      </g>

      <path d="M222 79 C246 79 252 126 278 126 M222 150 H278 M222 221 C246 221 252 174 278 174"
            class="source-flow" />

      <a href="https://github.com/portolan-sdi/portolan-cli/tree/v0.7.0" target="_blank"
         rel="noopener noreferrer" class="svg-source-link"
         :aria-label="tr('Open the released Portolan CLI 0.7.0 source in a new tab', 'Portolan CLI 0.7.0のソースを新しいタブで開く')" @click.stop>
        <rect x="278" y="94" width="194" height="112" rx="12" class="cli-box link-target" />
        <text x="375" y="132" text-anchor="middle" class="cli-title link-label">portolan-cli</text>
        <text x="375" y="157" text-anchor="middle" class="cli-role">{{ tr('extract · convert · catalog', '抽出 · 変換 · カタログ化') }}</text>
        <rect x="300" y="171" width="150" height="24" rx="8" class="cli-command-box" />
        <text x="375" y="188" text-anchor="middle" class="cli-command">add / extract</text>
      </a>

      <path d="M472 150 H515" class="publish-flow" :class="{ on: s >= 1 }" marker-end="url(#cli-arrow)" />

      <g class="publication" :class="{ on: s >= 1 }">
        <rect x="515" y="50" width="243" height="200" rx="18" class="catalog-box" />
        <text x="536" y="80" class="catalog-kicker">{{ tr('OBJECT STORAGE', 'オブジェクトストレージ') }}</text>
        <text x="536" y="116" class="catalog-title">catalog.json</text>
        <path d="M536 130 H737" class="catalog-divider" />
        <text x="536" y="159" class="catalog-format">GeoParquet</text>
        <text x="704" y="159" text-anchor="end" class="catalog-format">COG</text>
        <text x="536" y="188" class="catalog-copy">{{ tr('linked STAC · stable URLs', 'リンクSTAC · 安定URL') }}</text>
        <text x="536" y="220" class="catalog-note">{{ tr('one checked publication', '一つの検証済み公開物') }}</text>

        <path d="M637 250 V267" class="consumer-flow" marker-end="url(#cli-arrow)" />
        <rect x="515" y="272" width="68" height="34" rx="9" class="consumer-chip" />
        <rect x="595" y="272" width="75" height="34" rx="9" class="consumer-chip" />
        <rect x="682" y="272" width="76" height="34" rx="9" class="consumer-chip agent-chip" />
        <text x="549" y="294" text-anchor="middle" class="consumer-label">QGIS</text>
        <text x="632" y="294" text-anchor="middle" class="consumer-label">PYTHON</text>
        <text x="720" y="294" text-anchor="middle" class="consumer-label">AI AGENT</text>
      </g>

      <g class="commands" :class="{ on: s >= 1 }">
        <text x="42" y="345" class="lane-label publish-label">{{ tr('PUBLISH', '公開') }}</text>
        <rect x="126" y="320" width="632" height="42" rx="10" class="command-box" />
        <text x="146" y="347" class="command-text">$ portolan init → add / extract → check --fix → push</text>
      </g>

      <g class="update" :class="{ on: s >= 2 }">
        <text x="42" y="401" class="lane-label update-label">{{ tr('UPDATE', '更新') }}</text>
        <a href="https://github.com/portolan-sdi/portolan-cli/blob/v0.7.0/README.md" target="_blank"
           rel="noopener noreferrer" class="svg-source-link"
           :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open the released Portolan CLI 0.7.0 workflow in a new tab', '公開済みPortolan CLI 0.7.0のフローを新しいタブで開く')" @click.stop>
          <rect x="126" y="376" width="632" height="42" rx="10" class="sync-box link-target" />
          <text x="146" y="403" class="sync-text link-label">$ portolan sync = pull → init → scan → check → push</text>
        </a>
        <text x="400" y="449" text-anchor="middle" class="summary">{{ tr('The publisher still controls source data, license, credentials, destination, review, and release.', '公開者が原データ、ライセンス、認証情報、公開先、レビュー、リリースを管理します。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0.28; transform: translateY(6px); } to { opacity: 1; transform: none; } }

.source-card rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 2; }
.source-type { fill: var(--c-fg); font-size: 11px; font-weight: 900; letter-spacing: 0.08em; }
.source-value { fill: var(--c-portolan); font-size: 11.5px; font-weight: 800; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.source-flow { fill: none; stroke: var(--c-portolan); stroke-width: 2.1; stroke-linecap: round; opacity: 0.62; }
.cli-box { fill: color-mix(in srgb, var(--c-portolan) 7%, var(--c-panel)); stroke: var(--c-portolan); stroke-width: 2.5; }
.cli-title { fill: var(--c-fg); font-size: 21px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; letter-spacing: 0.04em; }
.cli-role { fill: var(--c-portolan); font-size: 11px; font-weight: 850; letter-spacing: 0.12em; }
.cli-command-box { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 1.5; }
.cli-command { fill: var(--c-muted); font-size: 10.5px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.publish-flow { fill: none; stroke: var(--c-portolan); stroke-width: 2.4; stroke-dasharray: 7 7; opacity: 0.28; transition: opacity 300ms ease; }
.publish-flow.on { opacity: 1; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.publication, .commands, .update { opacity: 0.28; transition: opacity 300ms ease, transform 300ms ease; }
.publication.on, .commands.on, .update.on { animation: reveal 380ms ease-out both; }
.catalog-box { fill: var(--c-panel); stroke: var(--c-fg); stroke-width: 2.5; }
.catalog-kicker { fill: var(--c-muted); font-size: 11px; font-weight: 900; letter-spacing: 0.09em; }
.catalog-title { fill: var(--c-fg); font-size: 22px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.catalog-divider { stroke: var(--c-line); stroke-width: 2; }
.catalog-format { fill: var(--c-ok); font-size: 13px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.catalog-copy { fill: var(--c-fg); font-size: 12px; font-weight: 800; }
.catalog-note { fill: var(--c-muted); font-size: 11px; font-weight: 800; }
.consumer-flow { fill: none; stroke: var(--c-portolan); stroke-width: 2.1; }
.consumer-chip { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.agent-chip { stroke: var(--c-accent); }
.consumer-label { fill: var(--c-fg); font-size: 10.5px; font-weight: 900; letter-spacing: 0.04em; }
.lane-label { fill: var(--c-fg); font-size: 12px; font-weight: 900; letter-spacing: 0.08em; }
.publish-label { fill: var(--c-accent); }
.update-label { fill: var(--c-ok); }
.command-box { fill: var(--c-fg); }
.command-text { fill: var(--c-bg); font-size: 13px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.sync-box { fill: var(--c-panel); stroke: var(--c-ok); stroke-width: 2.2; }
.sync-text { fill: var(--c-fg); font-size: 12.5px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.summary { fill: var(--c-muted); font-size: 11px; font-weight: 800; }
</style>
