<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()

const deckUrl = 'https://yharby.github.io/cng-japan-2026/#/27'
const links = computed(() => [
  { label: tr('WEBSITE', 'ウェブサイト'), value: 'portolan-sdi.org', url: 'https://portolan-sdi.org/', x: 42, y: 54 },
  { label: tr('ALL PROJECTS', '全プロジェクト'), value: 'github.com/portolan-sdi', url: 'https://github.com/portolan-sdi', x: 294, y: 54 },
  { label: tr('SPECIFICATION', '仕様'), value: 'portolan-spec', url: 'https://github.com/portolan-sdi/portolan-spec', x: 42, y: 138 },
  { label: tr('PUBLISHER CLI', '公開CLI'), value: 'portolan-cli', url: 'https://github.com/portolan-sdi/portolan-cli', x: 294, y: 138 },
  { label: tr('VALIDATOR', '検証ツール'), value: 'rashid', url: 'https://github.com/portolan-sdi/rashid', x: 42, y: 222 },
  { label: tr('AGENT SKILLS', 'エージェントスキル'), value: 'portolan-skills', url: 'https://github.com/portolan-sdi/portolan-skills', x: 294, y: 222 },
  { label: tr('PUBLIC REGISTRY', '公開レジストリ'), value: 'portolan-registry', url: 'https://github.com/portolan-sdi/portolan-registry', x: 42, y: 306 },
  { label: tr('CATALOG BROWSER', 'カタログブラウザ'), value: 'browser.portolan-sdi.org', url: 'https://browser.portolan-sdi.org/', x: 294, y: 306 },
])
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group" :data-print-ready="isPrintMode ? 'true' : 'false'"
         :aria-label="tr('Thank you and questions. Eight clickable resources link to the Portolan website, GitHub organization, specification, publisher CLI, Rashid validator, agent skills, public registry, and catalog browser. A QR code on the right opens this closing slide in the published presentation.', 'ありがとうございました。質疑応答です。8つのクリック可能なリンクから、Portolanウェブサイト、GitHub組織、仕様、公開CLI、Rashid検証ツール、エージェントスキル、公開レジストリ、カタログブラウザへ移動できます。右側のQRコードは公開プレゼンテーションのこの最終スライドを開きます。')">
      <text x="42" y="26" class="kicker">{{ tr('PROJECT LINKS', 'プロジェクトリンク') }}</text>
      <text x="536" y="26" text-anchor="end" class="link-hint">{{ tr('CLICK ANY CARD', 'カードをクリック') }}</text>

      <g class="directory">
        <a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"
           class="svg-source-link"
           :aria-label="tr(`Open ${link.label} in a new tab`, `${link.label}を新しいタブで開く`)" @click.stop>
          <g :transform="`translate(${link.x} ${link.y})`">
            <rect width="242" height="72" rx="12" class="resource-card link-target" />
            <text x="16" y="22" class="resource-label">{{ link.label }}</text>
            <text x="16" y="47" class="resource-value link-label">{{ link.value }}</text>
            <path d="M216 19 H226 V29 M226 19 L213 32" class="external-mark" />
          </g>
        </a>
      </g>

      <a :href="deckUrl" target="_blank" rel="noopener noreferrer" class="svg-source-link"
         :aria-label="tr('Open this closing slide in the published deck', '公開デッキのこの最終スライドを開く')" @click.stop>
        <rect x="558" y="54" width="200" height="324" rx="22" class="deck-card link-target" />
        <text x="658" y="88" text-anchor="middle" class="deck-label link-label">{{ tr('THIS DECK', 'このデッキ') }}</text>
        <rect x="581" y="106" width="154" height="154" rx="8" class="qr-frame" />
        <image href="/qr-deck.svg" x="588" y="113" width="140" height="140" preserveAspectRatio="xMidYMid meet" />
        <text x="658" y="294" text-anchor="middle" class="deck-url">yharby.github.io</text>
        <text x="658" y="315" text-anchor="middle" class="deck-url">cng-japan-2026/#/27</text>
        <text x="658" y="354" text-anchor="middle" class="deck-note">{{ tr('SCAN · CLICK · SHARE', 'スキャン · クリック · 共有') }}</text>
      </a>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.1em; }
.link-hint { fill: var(--c-muted); font-size: 10px; font-weight: 900; letter-spacing: 0.08em; }
.resource-card { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.resource-label { fill: var(--c-muted); font-size: 9.5px; font-weight: 900; letter-spacing: 0.09em; }
.resource-value { fill: var(--c-fg); font-size: 14px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.external-mark { fill: none; stroke: var(--c-portolan); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.deck-card { fill: var(--c-fg); }
.deck-label { fill: var(--c-bg); font-size: 16px; font-weight: 900; letter-spacing: 0.08em; }
.qr-frame { fill: var(--c-bg); }
.deck-url { fill: var(--c-bg); font-size: 10.5px; font-weight: 800; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.deck-note { fill: var(--c-bg); opacity: 0.68; font-size: 9px; font-weight: 900; letter-spacing: 0.08em; }
</style>
