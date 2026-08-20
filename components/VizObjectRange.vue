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
         :aria-label="tr('Object storage principles on the left and an HTTP byte range request on the right. The final note separates byte ranges from HTTP multiplexing.', '左にオブジェクトストレージの原則、右にHTTPバイト範囲リクエスト。最後にバイト範囲とHTTP多重化の違いを示します。')">
      <path d="M401 42 V389" class="divider" />

      <g class="object-side" :class="{ on: s >= 1 }">
        <a href="https://cloudnativegeo.org/about/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the Cloud Native Geospatial object storage overview in a new tab', 'Cloud Native Geospatialのオブジェクトストレージ概要を新しいタブで開く')" @click.stop>
          <text x="200" y="39" text-anchor="middle" class="section-title link-label">{{ tr('OBJECT STORAGE', 'オブジェクトストレージ') }}</text>
        </a>
        <path d="M75 91 H325 V167 C325 189 269 207 200 207 C131 207 75 189 75 167 Z" class="bucket" />
        <path d="M75 91 C75 69 131 51 200 51 C269 51 325 69 325 91 C325 113 269 131 200 131 C131 131 75 113 75 91 Z" class="bucket-top" />
        <text x="200" y="153" text-anchor="middle" class="bucket-label">{{ tr('ONE OBJECT', '1つのオブジェクト') }}</text>
        <text x="200" y="177" text-anchor="middle" class="bucket-label bucket-label-sub">{{ tr('ONE STABLE KEY', '1つの安定キー') }}</text>

        <g class="principles">
          <circle cx="92" cy="258" r="7" />
          <text x="114" y="264">{{ tr('Stateless reads scale', 'ステートレスに拡張') }}</text>
          <circle cx="92" cy="301" r="7" />
          <text x="114" y="307">{{ tr('Public cloud or self-hosted', 'クラウド／セルフホスト') }}</text>
          <circle cx="92" cy="344" r="7" />
          <text x="114" y="350">{{ tr('Low-maintenance HTTP access', '低運用のHTTPアクセス') }}</text>
          <circle cx="92" cy="387" r="7" />
          <text x="114" y="393">{{ tr('One URL for tools and agents', 'ツールもAIも同じURL') }}</text>
        </g>
      </g>

      <g class="range-side" :class="{ on: s >= 2 }">
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the HTTP range request documentation in a new tab', 'HTTP範囲リクエストの文書を新しいタブで開く')" @click.stop>
          <text x="602" y="39" text-anchor="middle" class="section-title link-label">{{ tr('HTTP BYTE RANGES', 'HTTP バイト範囲') }}</text>
        </a>
        <rect x="454" y="66" width="296" height="112" rx="14" class="request-box" />
        <text x="480" y="102" class="mono strong">GET /data.parquet</text>
        <text x="480" y="136" class="mono">Range bytes=840000-1099999</text>
        <text x="480" y="163" class="mono ok">206 Partial Content</text>

        <rect x="454" y="224" width="296" height="55" rx="10" class="byte-bar" />
        <rect x="558" y="224" width="62" height="55" class="selected" />
        <path d="M589 192 V214" class="range-arrow" />
        <path d="M582 207 L589 214 L596 207" class="range-arrow" />
        <text x="602" y="310" text-anchor="middle" class="range-copy">{{ tr('Read the useful byte window', '必要なバイト範囲だけ読む') }}</text>
        <text x="602" y="339" text-anchor="middle" class="range-detail">{{ tr('The file format tells the client where to look', '形式の索引が読む場所を示す') }}</text>
      </g>

      <g class="protocol-note" :class="{ on: s >= 3 }">
        <path d="M76 421 H724" />
        <a href="https://www.rfc-editor.org/rfc/rfc9110.html" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 3 }" :tabindex="s >= 3 ? 0 : -1"
           :aria-label="tr('Open the HTTP semantics specification in a new tab', 'HTTP Semantics仕様を新しいタブで開く')" @click.stop>
          <text x="400" y="447" text-anchor="middle" class="link-label">{{ tr('HTTP/1.1 supports ranges · HTTP/2 AND HTTP/3 improve multiplexing · neither creates an index', 'HTTP/1.1は範囲取得 · HTTP/2・3は多重化を改善 · 索引は作らない') }}</text>
        </a>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes or-focus {
  from { opacity: 0.34; }
  to { opacity: 1; }
}
@keyframes or-rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.divider { stroke: var(--c-line); stroke-width: 3; }
.object-side, .range-side { opacity: 0.34; }
.object-side.on, .range-side.on { animation: or-focus 420ms ease-out both; }
.section-title { fill: var(--c-fg); font-size: 20px; font-weight: 900; letter-spacing: 0.07em; }
.bucket { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 3; }
.bucket-top { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 3; }
.bucket-label { fill: var(--c-fg); font-size: 15px; font-weight: 900; letter-spacing: 0.045em; }
.bucket-label-sub { fill: var(--c-portolan); font-size: 14px; }
.principles circle { fill: var(--c-accent); }
.principles text { fill: var(--c-fg); font-size: 16px; font-weight: 750; }
.request-box { fill: var(--c-fg); stroke: var(--c-fg); stroke-width: 2; }
.mono { fill: var(--c-bg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 14px; }
.mono.strong { font-weight: 900; }
.mono.ok { fill: var(--c-ok); font-weight: 900; }
.byte-bar { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.selected { fill: var(--c-accent); }
.range-arrow { fill: none; stroke: var(--c-accent); stroke-width: var(--w-connector-active); stroke-linecap: round; stroke-linejoin: round; }
.range-copy { fill: var(--c-fg); font-size: 22px; font-weight: 900; }
.range-detail { fill: var(--c-muted); font-size: 15px; font-weight: 700; }
.protocol-note { opacity: 0; }
.protocol-note.on { animation: or-rise 430ms ease-out both; }
.protocol-note path { stroke: var(--c-accent); stroke-width: 3; }
.protocol-note text { fill: var(--c-muted); font-size: 13px; font-weight: 850; letter-spacing: 0.02em; }
</style>
