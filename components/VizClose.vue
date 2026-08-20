<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Portolan's closing idea has three parts: use an open file format, give it a stable URL, and follow checkable rules. A large QR call to action links to portolan-sdi.org and invites the audience to publish one dataset.">
      <text x="400" y="34" text-anchor="middle" class="kicker">A SMALL, REPEATABLE CONTRACT</text>

      <path d="M180 170 H620" class="rail" />
      <circle cx="180" cy="170" r="76" class="disc" />
      <circle cx="400" cy="170" r="76" class="disc" />
      <circle cx="620" cy="170" r="76" class="disc final-disc" />

      <path d="M150 130 H196 L210 144 V207 H150 Z M196 130 V144 H210" class="format-icon" />
      <text x="180" y="174" text-anchor="middle" class="format-mark">OPEN</text>

      <path d="M370 151 C352 151 344 163 344 175 C344 188 353 197 366 197 H384 M430 189 C448 189 456 177 456 165 C456 152 447 143 434 143 H416 M374 170 H426" class="link-icon" />

      <path d="M582 170 L608 194 L658 140" class="check-icon" />

      <text x="180" y="278" text-anchor="middle" class="word">OPEN FORMAT</text>
      <text x="400" y="278" text-anchor="middle" class="word">STABLE URL</text>
      <text x="620" y="278" text-anchor="middle" class="word accent-text">CHECKABLE RULES</text>

      <g class="action" :class="{ on: s >= 1 }">
        <rect x="144" y="314" width="512" height="116" rx="22" class="action-card" />
        <image href="/qr-portolan.svg" x="162" y="330" width="84" height="84" preserveAspectRatio="xMidYMid meet" />
        <line x1="268" y1="334" x2="268" y2="410" class="action-divider" />
        <text x="294" y="365" class="site">portolan-sdi.org</text>
        <text x="294" y="398" class="invite">Publish one dataset</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.09em; }
.rail { stroke: var(--c-line); stroke-width: 6; stroke-linecap: round; }
.disc { fill: var(--c-panel); stroke: var(--c-fg); stroke-width: 4; }
.final-disc { stroke: var(--c-accent); }
.format-icon, .link-icon, .check-icon { fill: none; stroke: var(--c-fg); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
.format-mark { fill: var(--c-fg); font-size: 13px; font-weight: 900; letter-spacing: 0.06em; }
.check-icon { stroke: var(--c-accent); stroke-width: 7; }
.word { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.04em; }
.accent-text { fill: var(--c-accent); }
.action { opacity: 0; }
.action.on { animation: reveal 420ms ease-out both; }
.action-card { fill: var(--c-fg); }
.action-divider { stroke: var(--c-bg); stroke-width: 2; opacity: 0.3; }
.site { fill: var(--c-bg); font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; font-size: 25px; font-weight: 900; }
.invite { fill: var(--c-bg); font-size: 20px; font-weight: 800; opacity: 0.84; }
</style>
