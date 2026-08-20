<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="A left-to-right flow. GeoParquet and Cloud Optimized GeoTIFF indexes point to useful bytes in object storage. Clients request those ranges over HTTP. HTTP 1.1 supports ranges, while HTTP 2 and HTTP 3 improve multiplexing without replacing the file index.">
      <defs>
        <marker id="cf-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" class="marker-fill" />
        </marker>
      </defs>

      <path d="M258 104 H302 M258 235 H302 M302 104 V235 M302 170 H329" class="connector" marker-end="url(#cf-arrow)" />
      <path d="M497 170 H530" class="range-flow" marker-end="url(#cf-arrow)" />

      <g class="format vector" :class="{ on: s >= 1 }">
        <a href="https://geoparquet.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open GeoParquet documentation in a new tab" @click.stop>
        <rect x="36" y="48" width="222" height="112" rx="10" class="format-frame link-target" />
        <text x="54" y="76" class="format-title link-label">GEOPARQUET</text>
        <text x="54" y="98" class="mini-label">FOOTER · ROW GROUPS · COLUMNS</text>
        <g class="parquet-grid">
          <rect x="54" y="113" width="50" height="28" />
          <rect x="110" y="113" width="50" height="28" />
          <rect x="166" y="113" width="74" height="28" />
          <rect x="110" y="113" width="50" height="14" class="hot" />
        </g>
        </a>
      </g>

      <g class="format raster" :class="{ on: s >= 2 }">
        <a href="https://docs.ogc.org/is/21-026/21-026.html" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Cloud Optimized GeoTIFF standard in a new tab" @click.stop>
        <rect x="36" y="179" width="222" height="112" rx="10" class="format-frame link-target" />
        <text x="54" y="207" class="format-title link-label">COG</text>
        <text x="54" y="229" class="mini-label">TILES · INTERNAL OVERVIEWS</text>
        <g class="tile-grid">
          <rect x="54" y="244" width="86" height="29" />
          <path d="M82 244 V273 M111 244 V273 M54 258 H140" />
          <rect x="111" y="258" width="29" height="15" class="hot" />
          <rect x="165" y="248" width="75" height="25" />
          <path d="M190 248 V273 M215 248 V273 M165 260 H240" />
        </g>
        </a>
      </g>

      <g class="storage" :class="{ on: s >= 3 }">
        <a href="https://guide.cloudnativegeo.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Cloud Native Geospatial guide in a new tab" @click.stop>
        <text x="413" y="58" text-anchor="middle" class="stage-label">PUBLISH</text>
        <path d="M329 123 H497 V214 C497 232 459 246 413 246 C367 246 329 232 329 214 Z" class="bucket link-target" />
        <path d="M329 123 C329 105 367 91 413 91 C459 91 497 105 497 123 C497 141 459 155 413 155 C367 155 329 141 329 123 Z" class="bucket-top link-target" />
        <text x="413" y="181" text-anchor="middle" class="bucket-title link-label">OBJECT</text>
        <text x="413" y="203" text-anchor="middle" class="bucket-title link-label">STORAGE</text>
        <text x="413" y="222" text-anchor="middle" class="bucket-copy">stable URLs</text>
        <text x="413" y="239" text-anchor="middle" class="bucket-copy">scalable reads</text>
        </a>
      </g>

      <g class="ranges" :class="{ on: s >= 4 }">
        <text x="649" y="58" text-anchor="middle" class="stage-label range-label">USE</text>
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
           aria-label="Open the HTTP range request documentation in a new tab" @click.stop>
          <rect x="536" y="76" width="226" height="87" rx="10" class="request-box link-target" />
          <text x="554" y="105" class="request-code link-label">GET /data.parquet</text>
          <text x="554" y="132" class="request-code">Range bytes=840000-1099999</text>
          <text x="554" y="153" class="response-code">206 Partial Content</text>
        </a>
        <rect x="536" y="181" width="226" height="38" rx="6" class="byte-bar" />
        <rect x="614" y="181" width="50" height="38" class="selected" />
        <text x="649" y="244" text-anchor="middle" class="range-copy">format index → useful byte window</text>

        <a href="https://duckdb.org/docs/stable/core_extensions/httpfs/https" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
           aria-label="Open DuckDB HTTP file documentation in a new tab" @click.stop>
        <g transform="translate(536 262)" class="client-chip">
          <rect width="104" height="31" rx="6" />
          <text x="52" y="21" text-anchor="middle" class="link-label">DuckDB</text>
        </g>
        </a>
        <a href="https://qgis.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
           aria-label="Open the QGIS website in a new tab" @click.stop>
        <g transform="translate(658 262)" class="client-chip">
          <rect width="104" height="31" rx="6" />
          <text x="52" y="21" text-anchor="middle" class="link-label">QGIS</text>
        </g>
        </a>
        <a href="https://docs.xarray.dev/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
           aria-label="Open xarray documentation in a new tab" @click.stop>
        <g transform="translate(536 300)" class="client-chip">
          <rect width="104" height="31" rx="6" />
          <text x="52" y="21" text-anchor="middle" class="link-label">xarray</text>
        </g>
        </a>
        <g transform="translate(658 300)" class="client-chip">
          <rect width="104" height="31" rx="6" />
          <text x="52" y="21" text-anchor="middle">AI agent</text>
        </g>

        <g class="protocol-strip">
          <rect x="36" y="354" width="726" height="82" rx="8" />
          <line x1="278" y1="367" x2="278" y2="423" />
          <line x1="520" y1="367" x2="520" y2="423" />
          <a href="https://www.rfc-editor.org/rfc/rfc9110.html" target="_blank" rel="noopener noreferrer"
             class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
             aria-label="Open the HTTP semantics specification in a new tab" @click.stop>
          <text x="157" y="383" text-anchor="middle" class="protocol-name link-label">HTTP/1.1</text>
          </a>
          <text x="157" y="409" text-anchor="middle" class="protocol-copy">range reads</text>
          <a href="https://www.rfc-editor.org/rfc/rfc9113.html" target="_blank" rel="noopener noreferrer"
             class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
             aria-label="Open the HTTP/2 specification in a new tab" @click.stop>
          <text x="399" y="383" text-anchor="middle" class="protocol-name link-label">HTTP/2</text>
          </a>
          <text x="399" y="409" text-anchor="middle" class="protocol-copy">multiplexed streams</text>
          <a href="https://www.rfc-editor.org/rfc/rfc9114.html" target="_blank" rel="noopener noreferrer"
             class="svg-source-link" :class="{ 'is-disabled': s < 4 }" :tabindex="s >= 4 ? 0 : -1"
             aria-label="Open the HTTP/3 specification in a new tab" @click.stop>
          <text x="641" y="383" text-anchor="middle" class="protocol-name link-label">HTTP/3</text>
          </a>
          <text x="641" y="409" text-anchor="middle" class="protocol-copy">multiplexing over QUIC</text>
          <text x="399" y="430" text-anchor="middle" class="protocol-note">protocols improve connection use · the format index reduces bytes</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes cf-focus {
  from { opacity: 0.32; }
  to { opacity: 1; }
}
@keyframes cf-rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.connector { fill: none; stroke: var(--c-line); stroke-width: 4; }
.range-flow { fill: none; stroke: var(--c-accent); stroke-width: 4; }
.marker-fill { fill: var(--c-portolan); }
.format { opacity: 0.32; }
.format.on { animation: cf-focus 420ms ease-out both; }
.format-title { fill: var(--c-fg); font-size: 18px; font-weight: 900; letter-spacing: 0.06em; }
.format-frame { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.format.on .format-frame { stroke: var(--c-portolan); }
.mini-label { fill: var(--c-muted); font-size: 10px; font-weight: 900; letter-spacing: 0.035em; }
.parquet-grid rect, .tile-grid rect { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.parquet-grid path, .tile-grid path { fill: none; stroke: var(--c-line); stroke-width: 2; }
.parquet-grid .hot, .tile-grid .hot { fill: var(--c-accent); fill-opacity: 0.22; stroke: var(--c-accent); }
.storage { opacity: 0.32; }
.storage.on { animation: cf-focus 430ms ease-out both; }
.stage-label { fill: var(--c-muted); font-size: 12px; font-weight: 900; letter-spacing: 0.08em; }
.bucket { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 3; }
.bucket-top { fill: var(--c-bg); stroke: var(--c-portolan); stroke-width: 3; }
.bucket-title { fill: var(--c-fg); font-size: 16px; font-weight: 900; letter-spacing: 0.055em; }
.bucket-copy { fill: var(--c-muted); font-size: 12px; font-weight: 750; }
.ranges { opacity: 0; }
.ranges.on { animation: cf-rise 430ms ease-out both; }
.range-label { fill: var(--c-accent); }
.request-box { fill: var(--c-fg); }
.request-code { fill: var(--c-bg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; font-weight: 750; }
.response-code { fill: var(--c-ok); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; font-weight: 900; }
.byte-bar { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.selected { fill: var(--c-accent); fill-opacity: 0.62; }
.range-copy { fill: var(--c-fg); font-size: 13px; font-weight: 850; }
.client-chip rect { fill: var(--c-fg); }
.client-chip text { fill: var(--c-bg); font-size: 12px; font-weight: 850; }
.protocol-strip rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 2.5; }
.protocol-strip line { stroke: var(--c-line); stroke-width: 2; }
.protocol-name { fill: var(--c-portolan); font-size: 15px; font-weight: 900; letter-spacing: 0.055em; }
.protocol-copy { fill: var(--c-fg); font-size: 13px; font-weight: 850; }
.protocol-note { fill: var(--c-muted); font-size: 11px; font-weight: 750; }
</style>
