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
         :aria-label="tr('STAC 1.1.0 supplies the catalog, collection, item, asset, metadata, and link model. Portolan version 0.1.2 profiles how that static STAC publication is structured, documented, traced, optimized, hosted, and visualized. The catalog declares the versioned Portolan schema URI, and the specification remains pre-1.0.', 'STAC 1.1.0はCatalog、Collection、Item、Asset、メタデータ、リンクのモデルを提供します。Portolan v0.1.2は、その静的STAC公開物の構造、文書、来歴、最適化、ホスティング、可視化をプロファイルします。カタログはバージョン付きPortolanスキーマURIを宣言し、仕様は現在もpre-1.0です。')">
      <defs>
        <marker id="gap-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <text x="400" y="27" text-anchor="middle" class="kicker">STAC 1.1.0 {{ tr('BASELINE', '基盤') }} + PORTOLAN v0.1.2 {{ tr('PROFILE', 'プロファイル') }}</text>

      <g class="stac" :class="{ on: s >= 1 }">
        <a href="https://stacspec.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the STAC specification website in a new tab', 'STAC仕様サイトを新しいタブで開く')" @click.stop>
          <image href="/stac-logo.png" x="50" y="38" width="210" height="132" preserveAspectRatio="xMidYMid meet" />
          <text x="155" y="174" text-anchor="middle" class="role link-label">{{ tr('DESCRIBES + LINKS', '記述 + リンク') }}</text>
        </a>
        <text x="155" y="202" text-anchor="middle" class="object-path">Catalog → Collection → Item → Asset</text>
      </g>

      <path d="M294 118 H482" class="arrow" marker-end="url(#gap-arrow)" />
      <text x="388" y="99" text-anchor="middle" class="arrow-label">{{ tr('same STAC objects', '同じSTACオブジェクト') }}</text>

      <g class="portolan" :class="{ on: s >= 2 }">
        <a href="https://github.com/portolan-sdi/portolan-spec/releases/tag/v0.1.2"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open Portolan specification release 0.1.2 in a new tab', 'Portolan仕様リリース0.1.2を新しいタブで開く')" @click.stop>
          <rect x="510" y="47" width="250" height="149" rx="20" class="portolan-body link-target" />
          <image href="/portolan-mark.svg" x="534" y="71" width="52" height="52" preserveAspectRatio="xMidYMid meet" />
          <text x="602" y="91" class="portolan-name link-label">PORTOLAN</text>
          <text x="602" y="117" class="portolan-version">v0.1.2 · pre-1.0</text>
          <text x="635" y="158" text-anchor="middle" class="portolan-role">{{ tr('PROFILES THE PUBLICATION', '公開方法をプロファイル') }}</text>
          <text x="635" y="180" text-anchor="middle" class="portolan-note">{{ tr('opinionated · versioned · checkable', '明確な方針 · バージョン管理 · 検証可能') }}</text>
        </a>
      </g>

      <g class="profile" :class="{ on: s >= 2 }">
        <rect x="30" y="231" width="740" height="195" rx="24" />
        <text x="400" y="260" text-anchor="middle" class="profile-head">{{ tr('THE PROFILE MAKES SIX PUBLISHING CHOICES EXPLICIT', 'プロファイルが六つの公開判断を明確にする') }}</text>

        <g transform="translate(62 298)"><circle cx="10" cy="7" r="7" /><text x="30" y="13">{{ tr('STRUCTURE + LINKS', '構造 + リンク') }}</text></g>
        <g transform="translate(302 298)"><circle cx="10" cy="7" r="7" /><text x="30" y="13">{{ tr('FORMATS + STATISTICS', '形式 + 統計') }}</text></g>
        <g transform="translate(548 298)"><circle cx="10" cy="7" r="7" /><text x="30" y="13">{{ tr('ACCESS + HOSTING', 'アクセス + ホスティング') }}</text></g>
        <g transform="translate(62 345)"><circle cx="10" cy="7" r="7" /><text x="30" y="13">{{ tr('LICENSE + PROVENANCE', 'ライセンス + 来歴') }}</text></g>
        <g transform="translate(302 345)"><circle cx="10" cy="7" r="7" /><text x="30" y="13">README + AGENTS</text></g>
        <g transform="translate(548 345)"><circle cx="10" cy="7" r="7" /><text x="30" y="13">{{ tr('VISUALIZATION', '可視化') }}</text></g>

        <path d="M62 381 H738" class="schema-rule" />
        <text x="400" y="407" text-anchor="middle" class="schema">schemas.portolan-sdi.org/portolan/v0.1.2/schema.json</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes gap-focus {
  from { opacity: 0.3; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.kicker { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.065em; }
.stac, .portolan, .profile { opacity: 0.3; }
.stac.on, .portolan.on, .profile.on { animation: gap-focus 430ms ease-out both; }
.role { fill: var(--c-portolan); font-size: 14px; font-weight: 900; letter-spacing: 0.07em; }
.object-path { fill: var(--c-fg); font-size: 13px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.arrow { fill: none; stroke: var(--c-accent); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-accent); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.arrow-label { fill: var(--c-accent); font-size: 12px; font-weight: 900; }
.portolan-body { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 3; }
.portolan-name { fill: var(--c-fg); font-size: 20px; font-weight: 900; letter-spacing: 0.06em; }
.portolan-version { fill: var(--c-muted); font-size: 12px; font-weight: 800; }
.portolan-role { fill: var(--c-fg); font-size: 14px; font-weight: 900; letter-spacing: 0.04em; }
.portolan-note { fill: var(--c-portolan); font-size: 11px; font-weight: 800; }
.profile > rect { fill: var(--c-panel); stroke: var(--c-portolan); stroke-width: 3; }
.profile-head { fill: var(--c-muted); font-size: 14px; font-weight: 900; letter-spacing: 0.055em; }
.profile circle { fill: var(--c-accent); }
.profile g text { fill: var(--c-fg); font-size: 12px; font-weight: 900; letter-spacing: 0.025em; }
.schema-rule { stroke: var(--c-line); stroke-width: 2; }
.schema { fill: var(--c-portolan); font-size: 11.5px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', monospace; }
</style>
