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
         :aria-label="tr(`Portolan's closing idea has three parts: use an open file format, give it a stable URL, and follow checkable rules. A large QR call to action links to portolan-sdi.org and invites the audience to publish one dataset.`, 'Portolanの結論は3つです。オープン形式を使い、安定URLを与え、検証可能なルールに従います。大きなQRコードはportolan-sdi.orgへリンクし、1つのデータセットを公開するよう促します。')">
      <text x="400" y="34" text-anchor="middle" class="kicker">{{ tr('A SMALL, REPEATABLE CONTRACT', '小さく、繰り返せる約束') }}</text>

      <path d="M180 170 H620" class="rail" />
      <circle cx="180" cy="170" r="76" class="disc" />
      <circle cx="400" cy="170" r="76" class="disc" />
      <circle cx="620" cy="170" r="76" class="disc final-disc" />

      <lucide-file-check-2 x="146" y="136" width="68" height="68" class="idea-icon" />
      <lucide-link-2 x="366" y="136" width="68" height="68" class="idea-icon" />
      <lucide-circle-check-big x="586" y="136" width="68" height="68" class="idea-icon final-icon" />

      <text x="180" y="278" text-anchor="middle" class="word">{{ tr('OPEN FORMAT', 'オープン形式') }}</text>
      <text x="400" y="278" text-anchor="middle" class="word">{{ tr('STABLE URL', '安定URL') }}</text>
      <text x="620" y="278" text-anchor="middle" class="word accent-text">{{ tr('CHECKABLE RULES', '検証可能なルール') }}</text>

      <a href="https://portolan-sdi.org/" target="_blank" rel="noopener noreferrer"
         class="svg-source-link" :class="{ 'is-disabled': s < 1 }"
         :tabindex="s >= 1 ? 0 : -1" :aria-label="tr('Open the Portolan website in a new tab', 'Portolanのウェブサイトを新しいタブで開く')" @click.stop>
      <g class="action" :class="{ on: s >= 1 }">
        <rect x="144" y="314" width="512" height="116" rx="22" class="action-card" />
        <image href="/qr-portolan.svg" x="162" y="330" width="84" height="84" preserveAspectRatio="xMidYMid meet" />
        <line x1="268" y1="334" x2="268" y2="410" class="action-divider" />
        <text x="294" y="365" class="site link-label">portolan-sdi.org</text>
        <text x="294" y="398" class="invite">{{ tr('Publish one dataset', 'データセットを1つ公開しよう') }}</text>
        <image href="/portolan-mark.svg" x="608" y="350" width="30" height="30" preserveAspectRatio="xMidYMid meet" />
      </g>
      </a>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.09em; }
.rail { stroke: var(--c-line); stroke-width: var(--w-rail); stroke-linecap: round; }
.disc { fill: var(--c-panel); stroke: var(--c-fg); stroke-width: 4; }
.final-disc { stroke: var(--c-accent); }
.idea-icon { color: var(--c-fg); }
.final-icon { color: var(--c-accent); }
.word { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.04em; }
.accent-text { fill: var(--c-accent); }
.action { opacity: 0; }
.action.on { animation: reveal 420ms ease-out both; }
.action-card { fill: var(--c-fg); }
.action-divider { stroke: var(--c-bg); stroke-width: 2; opacity: 0.3; }
.site { fill: var(--c-bg); font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; font-size: 25px; font-weight: 900; }
.invite { fill: var(--c-bg); font-size: 20px; font-weight: 800; opacity: 0.84; }
</style>
