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
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         :aria-label="tr('Two horizontal portal architectures. The static-first route moves from source data through a publisher-controlled job to open assets in object storage, STAC discovery, and clients. Optional compute or an OGC API can branch from the published assets on demand. The service-first route moves from legacy files and a spatial database through a GIS server, gateway, APIs and tiles, and clients. The static query path can be smaller, but publishing jobs, object storage, CDN, IAM, DNS, monitoring, governance, updates, and accountable people remain.', '2つのポータル構成を横方向に比較します。静的配信を優先する経路では、原典データから公開者管理のジョブ、オブジェクトストレージ上のオープン資産、STACによる発見、クライアントへ進みます。必要に応じて公開資産から計算やOGC APIを追加できます。サービス中心の経路では、従来ファイルと空間データベースからGISサーバー、ゲートウェイ、APIとタイル、クライアントへ進みます。静的クエリ経路は小さくできますが、公開ジョブ、オブジェクトストレージ、CDN、IAM、DNS、監視、ガバナンス、更新、責任を持つ人は残ります。')">
      <defs>
        <marker id="honest-new-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="new-marker" />
        </marker>
        <marker id="honest-old-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="old-marker" />
        </marker>
        <marker id="honest-optional-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="optional-marker" />
        </marker>
      </defs>

      <text x="400" y="25" text-anchor="middle" class="kicker">{{ tr('A NEW PORTAL CAN MAKE STATIC DELIVERY THE DEFAULT', '新しいポータルは静的配信を既定にできる') }}</text>

      <g class="modern" :class="{ on: s >= 1 }">
        <rect x="28" y="43" width="744" height="170" rx="20" class="zone modern-zone" />
        <text x="50" y="70" class="zone-title modern-title">{{ tr('STATIC-FIRST PORTAL', '静的配信優先ポータル') }}</text>
        <text x="750" y="70" text-anchor="end" class="zone-note">{{ tr('direct reads · optional compute', '直接読取 · 必要時のみ計算') }}</text>

        <!-- Connectors precede nodes so arrows stay behind the architecture. -->
        <path d="M140 123 H162" class="new-flow" marker-end="url(#honest-new-arrow)" />
        <path d="M262 123 H288" class="new-flow" marker-end="url(#honest-new-arrow)" />
        <path d="M438 123 H466" class="new-flow" marker-end="url(#honest-new-arrow)" />
        <path d="M566 123 H608" class="new-flow" marker-end="url(#honest-new-arrow)" />
        <path d="M363 156 V181 H493" class="optional-flow" marker-end="url(#honest-optional-arrow)" />
        <path d="M662 181 H698 V156" class="optional-flow" marker-end="url(#honest-optional-arrow)" />

        <g transform="translate(48 92)">
          <rect width="92" height="64" rx="12" class="node" />
          <lucide-files x="34" y="7" width="24" height="24" class="node-icon" />
          <text x="46" y="48" text-anchor="middle" class="node-label">{{ tr('SOURCE DATA', '原典データ') }}</text>
        </g>
        <g transform="translate(162 92)">
          <rect width="100" height="64" rx="12" class="node publish-node" />
          <lucide-settings-2 x="38" y="7" width="24" height="24" class="node-icon" />
          <text x="50" y="46" text-anchor="middle" class="node-label">{{ tr('PUBLISH JOB', '公開ジョブ') }}</text>
          <text x="50" y="58" text-anchor="middle" class="node-detail">{{ tr('batch · serverless', 'バッチ · サーバーレス') }}</text>
        </g>
        <g transform="translate(288 86)">
          <rect width="150" height="76" rx="14" class="node storage-node" />
          <lucide-cloud x="63" y="7" width="24" height="24" class="node-icon" />
          <text x="75" y="46" text-anchor="middle" class="node-label">{{ tr('OBJECT STORAGE', 'オブジェクトストレージ') }}</text>
          <text x="75" y="62" text-anchor="middle" class="node-detail">GeoParquet · COG · PMTiles</text>
        </g>
        <g transform="translate(466 92)">
          <rect width="100" height="64" rx="12" class="node stac-node" />
          <lucide-waypoints x="38" y="7" width="24" height="24" class="node-icon" />
          <text x="50" y="46" text-anchor="middle" class="node-label">STAC</text>
          <text x="50" y="58" text-anchor="middle" class="node-detail">{{ tr('discover + link', '発見 + リンク') }}</text>
        </g>
        <g transform="translate(608 92)">
          <rect width="142" height="64" rx="12" class="node client-node" />
          <lucide-monitor-smartphone x="59" y="7" width="24" height="24" class="node-icon" />
          <text x="71" y="46" text-anchor="middle" class="node-label">{{ tr('CLIENTS', 'クライアント') }}</text>
          <text x="71" y="58" text-anchor="middle" class="node-detail">{{ tr('web · desktop · agents', 'Web · デスクトップ · AI') }}</text>
        </g>

        <rect x="493" y="165" width="169" height="32" rx="16" class="optional-pill" />
        <text x="577.5" y="185" text-anchor="middle" class="optional-text">{{ tr('COMPUTE / OGC API ON DEMAND', '必要時のみ計算 / OGC API') }}</text>
      </g>

      <g class="traditional">
        <rect x="28" y="228" width="744" height="108" rx="20" class="zone traditional-zone" />
        <text x="50" y="255" class="zone-title traditional-title">{{ tr('SERVICE-FIRST PORTAL', 'サービス中心ポータル') }}</text>
        <text x="750" y="255" text-anchor="end" class="zone-note">{{ tr('services stay in every request path', '全リクエストがサービスを通る') }}</text>

        <path d="M176 290 H205" class="old-flow" marker-end="url(#honest-old-arrow)" />
        <path d="M326 290 H363" class="old-flow" marker-end="url(#honest-old-arrow)" />
        <path d="M472 290 H510" class="old-flow" marker-end="url(#honest-old-arrow)" />
        <path d="M634 290 H670" class="old-flow" marker-end="url(#honest-old-arrow)" />

        <g transform="translate(48 270)">
          <rect width="128" height="48" rx="11" class="old-node" />
          <text x="64" y="21" text-anchor="middle" class="old-label">{{ tr('FILES + SPATIAL DB', 'ファイル + 空間DB') }}</text>
          <text x="64" y="37" text-anchor="middle" class="old-detail">SHP · GPKG · SQL</text>
        </g>
        <g transform="translate(205 270)">
          <rect width="121" height="48" rx="11" class="old-node always-node" />
          <text x="60.5" y="21" text-anchor="middle" class="old-label">{{ tr('GIS SERVER', 'GISサーバー') }}</text>
          <text x="60.5" y="37" text-anchor="middle" class="old-detail">{{ tr('query + render', 'クエリ + 描画') }}</text>
        </g>
        <g transform="translate(363 270)">
          <rect width="109" height="48" rx="11" class="old-node always-node" />
          <text x="54.5" y="21" text-anchor="middle" class="old-label">{{ tr('GATEWAY', 'ゲートウェイ') }}</text>
          <text x="54.5" y="37" text-anchor="middle" class="old-detail">{{ tr('proxy + auth', 'プロキシ + 認証') }}</text>
        </g>
        <g transform="translate(510 270)">
          <rect width="124" height="48" rx="11" class="old-node" />
          <text x="62" y="21" text-anchor="middle" class="old-label">{{ tr('APIs + TILES', 'API + タイル') }}</text>
          <text x="62" y="37" text-anchor="middle" class="old-detail">WFS · WMS · MVT</text>
        </g>
        <g transform="translate(670 270)">
          <rect width="80" height="48" rx="11" class="old-node" />
          <text x="40" y="29" text-anchor="middle" class="old-label">{{ tr('CLIENTS', '利用者') }}</text>
        </g>
      </g>

      <g class="responsibility" :class="{ on: s >= 2 }">
        <text x="400" y="368" text-anchor="middle" class="responsibility-title">{{ tr('THE QUERY PATH SHRINKS. THE OPERATING WORK REMAINS.', 'クエリ経路は小さくなる。運用作業は残る。') }}</text>
        <path d="M282 385 V442 M529 385 V442" class="responsibility-divider" />

        <g transform="translate(50 389)">
          <lucide-package-check x="0" y="0" width="26" height="26" class="responsibility-icon" />
          <text x="37" y="19" class="responsibility-head">{{ tr('PUBLISH', '公開') }}</text>
          <text x="0" y="48" class="responsibility-copy">{{ tr('conversion · metadata · validation', '変換 · メタデータ · 検証') }}</text>
        </g>
        <g transform="translate(306 389)">
          <lucide-server-cog x="0" y="0" width="26" height="26" class="responsibility-icon" />
          <text x="37" y="19" class="responsibility-head">{{ tr('OPERATE', '運用') }}</text>
          <text x="0" y="48" class="responsibility-copy">{{ tr('storage · CDN · IAM · DNS · monitor', 'ストレージ · CDN · IAM · DNS · 監視') }}</text>
        </g>
        <g transform="translate(552 389)">
          <lucide-users-round x="0" y="0" width="26" height="26" class="responsibility-icon" />
          <text x="37" y="19" class="responsibility-head">{{ tr('GOVERN', 'ガバナンス') }}</text>
          <text x="0" y="48" class="responsibility-copy">{{ tr('quality · updates · accountable people', '品質 · 更新 · 責任を持つ人') }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes architecture-reveal {
  from { opacity: 0.28; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.modern { opacity: 0.28; }
.modern.on, .responsibility.on { animation: architecture-reveal 430ms ease-out both; }
.responsibility { opacity: 0; }
.kicker { fill: var(--c-portolan); font-size: 15px; font-weight: 900; letter-spacing: 0.07em; }
.zone { fill: var(--c-panel); stroke-width: 3; }
.modern-zone { stroke: var(--c-ok); }
.traditional-zone { stroke: var(--c-line); }
.zone-title { font-size: 15px; font-weight: 900; letter-spacing: 0.055em; }
.modern-title { fill: var(--c-ok); }
.traditional-title { fill: var(--c-warn); }
.zone-note { fill: var(--c-muted); font-size: 10.5px; font-weight: 800; }
.new-flow, .old-flow, .optional-flow { fill: none; stroke-width: var(--w-connector-active); stroke-linecap: round; stroke-linejoin: round; }
.new-flow { stroke: var(--c-ok); }
.old-flow { stroke: var(--c-warn); }
.optional-flow { stroke: var(--c-accent); stroke-dasharray: 5 5; }
.new-marker { fill: none; stroke: var(--c-ok); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.old-marker { fill: none; stroke: var(--c-warn); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.optional-marker { fill: none; stroke: var(--c-accent); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.node, .old-node { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2.5; }
.publish-node, .storage-node, .stac-node, .client-node { stroke: var(--c-ok); }
.always-node { stroke: var(--c-warn); }
.node-icon { color: var(--c-fg); }
.node-label, .old-label { fill: var(--c-fg); font-size: 10px; font-weight: 900; }
.node-detail, .old-detail { fill: var(--c-muted); font-size: 7.5px; font-weight: 800; }
.optional-pill { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2; }
.optional-text { fill: var(--c-accent); font-size: 8.5px; font-weight: 900; letter-spacing: 0.015em; }
.responsibility-title { fill: var(--c-accent); font-size: 14px; font-weight: 900; letter-spacing: 0.055em; }
.responsibility-divider { stroke: var(--c-line); stroke-width: 2; }
.responsibility-icon { color: var(--c-portolan); }
.responsibility-head { fill: var(--c-fg); font-size: 13.5px; font-weight: 900; letter-spacing: 0.04em; }
.responsibility-copy { fill: var(--c-fg); font-size: 10.5px; font-weight: 750; }
</style>
