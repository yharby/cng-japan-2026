<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="A Portolan catalog leads from catalog.json to the Japan STAC Item named Japan.json and then to GeoParquet and PMTiles assets. The Japan item contains 5,384,929 field boundaries under CC BY 4.0.">
      <text x="400" y="28" text-anchor="middle" class="kicker">A REAL PORTOLAN CATALOG PATH</text>

      <path d="M220 226 H268 M256 216 L268 226 L256 236" class="flow" />
      <path d="M512 226 H546 M534 216 L546 226 L534 236" class="flow" />

      <g class="catalog-root">
        <rect x="38" y="86" width="182" height="280" rx="20" class="catalog-body" />
        <text x="62" y="122" class="label">PORTOLAN CATALOG</text>
        <a href="https://data.source.coop/ftw/global-data/catalog.json" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Fields of the World root catalog.json file in a new tab" @click.stop>
        <lucide-folder-open x="62" y="145" width="42" height="42" class="folder" />
        <text x="116" y="176" class="file-name small-file link-label">catalog.json</text>
        </a>
        <a href="https://fieldsofthe.world/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Fields of the World website in a new tab" @click.stop>
        <image href="/fields-of-world-mark.svg" x="62" y="211" width="34" height="34" preserveAspectRatio="xMidYMid meet" />
        <text x="103" y="226" class="publisher link-label">Fields of the</text>
        <text x="103" y="244" class="publisher link-label">World</text>
        </a>
        <line x1="62" y1="260" x2="196" y2="260" class="rule" />
        <text x="62" y="282" class="meta">static files</text>
        <text x="62" y="310" class="meta">Portolan 0.1</text>
        <text x="62" y="338" class="meta">open license</text>
      </g>

      <g class="collection">
        <a href="https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.json"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           aria-label="Open the Japan STAC Item JSON in a new tab" @click.stop>
        <rect x="274" y="68" width="238" height="316" rx="22" class="collection-body link-target" />
        <text x="298" y="105" class="label">JAPAN STAC ITEM</text>
        <text x="298" y="143" class="file-name link-label">Japan.json</text>
        <text x="298" y="197" class="big">5,384,929</text>
        <text x="298" y="224" class="small">field boundaries</text>
        <g transform="translate(300 248)">
          <path d="M0 0 H54 V40 H0 Z M60 0 H116 V40 H60 Z M122 0 H184 V40 H122 Z M0 46 H44 V86 H0 Z M50 46 H112 V86 H50 Z M118 46 H184 V86 H118 Z" class="fields" />
          <path d="M18 0 V40 M81 0 V40 M146 0 V40 M16 46 V86 M76 46 V86 M150 46 V86" class="furrows" />
        </g>
        </a>
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Creative Commons Attribution 4.0 license in a new tab" @click.stop>
        <rect x="298" y="347" width="104" height="27" rx="13" class="license" />
        <text x="350" y="366" text-anchor="middle" class="license-text link-label">CC BY 4.0</text>
        </a>
      </g>

      <a href="https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.parquet"
         target="_blank" rel="noopener noreferrer" class="svg-source-link"
         aria-label="Open the Japan GeoParquet asset in a new tab" @click.stop>
      <g class="asset" :class="{ visited: s >= 1, active: s === 1 }">
        <rect x="552" y="95" width="208" height="125" rx="18" class="asset-body link-target" />
        <circle cx="587" cy="136" r="22" class="icon-disc" />
        <lucide-table-2 x="574" y="123" width="26" height="26" class="asset-icon" />
        <text x="620" y="130" class="asset-name link-label">GeoParquet</text>
        <text x="620" y="156" class="asset-use">analysis</text>
        <text x="576" y="195" class="asset-detail">841.6 MB · direct HTTPS</text>
      </g>
      </a>

      <a href="https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.pmtiles"
         target="_blank" rel="noopener noreferrer" class="svg-source-link"
         aria-label="Open the Japan PMTiles asset in a new tab" @click.stop>
      <g class="asset" :class="{ visited: s >= 2, active: s === 2 }">
        <rect x="552" y="240" width="208" height="125" rx="18" class="asset-body link-target" />
        <circle cx="587" cy="281" r="22" class="icon-disc" />
        <lucide-map x="574" y="268" width="26" height="26" class="asset-icon" />
        <text x="620" y="275" class="asset-name link-label">PMTiles</text>
        <text x="620" y="301" class="asset-use">maps</text>
        <text x="647" y="329" text-anchor="middle" class="asset-detail">one archive</text>
        <text x="647" y="350" text-anchor="middle" class="asset-detail">reusable style</text>
      </g>
      </a>

      <text x="400" y="430" text-anchor="middle" class="provenance">Publisher-provided global research data · not Japanese government data</text>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.09em; }
.flow { fill: none; stroke: var(--c-portolan); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
.catalog-body, .collection-body, .asset-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.catalog-body { stroke: var(--c-fg); }
.collection-body { stroke: var(--c-portolan); }
.label { fill: var(--c-muted); font-size: 12px; font-weight: 900; letter-spacing: 0.065em; }
.folder { color: var(--c-portolan); }
.file-name { fill: var(--c-fg); font-size: 21px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.small-file { font-size: 16px; }
.publisher { fill: var(--c-fg); font-size: 15px; font-weight: 900; }
.rule { stroke: var(--c-line); stroke-width: 2; }
.meta, .small, .asset-detail, .provenance { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
.big { fill: var(--c-accent); font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 34px; font-weight: 900; }
.small { font-size: 16px; }
.fields { fill: color-mix(in srgb, var(--c-ok) 17%, var(--c-panel)); stroke: var(--c-ok); stroke-width: 2; }
.furrows { stroke: var(--c-ok); stroke-width: 2; opacity: 0.72; }
.license { fill: var(--c-fg); }
.license-text { fill: var(--c-bg); font-size: 14px; font-weight: 900; }
.asset { opacity: 0.38; transition: opacity 300ms ease, transform 300ms ease; }
.asset.visited { opacity: 0.72; }
.asset.active { opacity: 1; transform: translateX(5px); }
.asset.active .asset-body, .asset.active .icon-disc { stroke: var(--c-accent); }
.icon-disc { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 2.5; }
.asset-icon { color: var(--c-fg); }
.asset.active .asset-icon { color: var(--c-accent); }
.asset-name { fill: var(--c-fg); font-size: 20px; font-weight: 900; }
.asset-use { fill: var(--c-accent); font-size: 16px; font-weight: 900; }
.provenance { font-size: 14px; }
</style>
