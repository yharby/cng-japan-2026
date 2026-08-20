<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const ready = computed(() => isPrintMode.value || true)
</script>

<template>
  <div class="stage cover-stage" :class="{ ready }">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('Portolan: An SDI Without Servers, presented at Cloud Native Geospatial Japan 2026 by Youssef Harby, Software Engineer at CARTO.', 'Portolan: サーバーのないSDI。Cloud Native Geospatial Japan 2026、登壇者はCARTOのソフトウェアエンジニア、Youssef Harby。')">
      <path d="M76 64 H724" class="cover-rule" />

      <a href="https://portolan-sdi.org/" target="_blank" rel="noopener noreferrer"
         class="svg-source-link" :aria-label="tr('Open the Portolan website in a new tab', 'Portolanのウェブサイトを新しいタブで開く')" @click.stop>
      <g class="portolan-lockup">
        <image href="/portolan-mark.svg" x="642" y="104" width="62" height="62" preserveAspectRatio="xMidYMid meet" />
        <text x="673" y="188" text-anchor="middle" class="link-label">Portolan</text>
      </g>
      </a>

      <text x="76" y="142" class="event">CLOUD NATIVE GEOSPATIAL JAPAN 2026</text>
      <text x="76" y="181" class="place">{{ tr('JAMSTEC Yokohama · 24 August 2026', 'JAMSTEC 横浜 · 2026年8月24日') }}</text>

      <g class="speaker">
        <text x="76" y="323">Youssef Harby</text>
        <a href="https://carto.com/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the CARTO website in a new tab', 'CARTOのウェブサイトを新しいタブで開く')" @click.stop>
          <text x="76" y="358" class="speaker-role link-label">{{ tr('Software Engineer at CARTO', 'CARTO ソフトウェアエンジニア') }}</text>
          <image href="/carto-logo-positive.svg" x="612" y="332" width="112" height="43" preserveAspectRatio="xMidYMid meet" class="carto-logo" />
        </a>
        <a href="mailto:youssef@carto.com" class="svg-source-link"
           :aria-label="tr('Email Youssef Harby', 'Youssef Harbyにメールする')" @click.stop>
          <text x="76" y="391" class="speaker-email link-label">youssef@carto.com</text>
        </a>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes cv-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}

.cover-stage { opacity: 0; }
.cover-stage.ready { animation: cv-rise 520ms ease-out both; }
.cover-rule { stroke: var(--c-accent); stroke-width: 4; }
.portolan-lockup text { fill: var(--c-portolan); font-size: 22px; font-weight: 850; letter-spacing: -0.015em; }
.event { fill: var(--c-fg); font-size: 23px; font-weight: 900; letter-spacing: 0.075em; }
.place { fill: var(--c-muted); font-size: 20px; font-weight: 700; }
.speaker text { fill: var(--c-fg); font-size: 31px; font-weight: 850; }
.speaker .speaker-role { fill: var(--c-muted); font-size: 20px; font-weight: 700; }
.speaker .speaker-email { fill: var(--c-accent); font-size: 18px; font-weight: 750; }
.carto-logo { opacity: 0.96; }
</style>

<!-- Deliberately unscoped. The dark-mode rule needs an `html.dark` ancestor, and
     inside a scoped block Vue compiles `:global(html.dark) .carto-logo` down to
     bare `html.dark`, dropping the descendant part. That put the inversion on the
     whole document and rendered every slide as a plain white rectangle. -->
<style>
html.dark .carto-logo { filter: brightness(0) invert(1); }
</style>
