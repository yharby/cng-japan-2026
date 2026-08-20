<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 0 : $clicks.value))
const browserUrl = 'https://cholmes.github.io/stlouis-data-browser/#/transportation-infrastructure-and-utilities/catalog.json'
const showLive = computed(() => !isPrintMode.value && s.value >= 1)
const loaded = ref(false)
const timedOut = ref(false)
let loadTimer: ReturnType<typeof setTimeout> | undefined

watch(showLive, (value) => {
  loaded.value = false
  timedOut.value = false
  if (loadTimer) clearTimeout(loadTimer)
  if (value) {
    loadTimer = setTimeout(() => {
      timedOut.value = true
    }, 8000)
  }
})

function onLoad() {
  loaded.value = true
  timedOut.value = false
  if (loadTimer) clearTimeout(loadTimer)
}

onBeforeUnmount(() => {
  if (loadTimer) clearTimeout(loadTimer)
})
</script>

<template>
  <div class="stage live-browser-stage">
    <div class="browser canvas" role="group" aria-label="St. Louis live catalog demonstration with a deterministic preview before the live website loads">
      <div class="browser-bar">
        <span class="status-dot" :class="{ live: showLive && loaded }" aria-hidden="true" />
        <span class="state-label">{{ showLive ? (loaded ? 'LIVE' : 'LOADING') : 'PREVIEW' }}</span>
        <span class="address">cholmes.github.io/stlouis-data-browser/…/transportation…</span>
        <a class="open-link" :href="browserUrl" target="_blank" rel="noopener noreferrer">OPEN ↗</a>
      </div>

      <div class="browser-body">
        <div class="fallback" role="img" aria-label="Preview of the St. Louis transportation catalog">
          <svg class="fallback-canvas" viewBox="0 0 800 410" aria-hidden="true">
            <rect width="800" height="410" class="fallback-bg" />
            <rect x="0" y="0" width="242" height="410" class="side" />
            <text x="28" y="44" class="side-kicker">ST. LOUIS</text>
            <text x="28" y="76" class="side-title">OPEN DATA</text>
            <line x1="28" y1="98" x2="214" y2="98" class="side-rule" />
            <text x="28" y="133" class="side-label">67 COLLECTIONS</text>
            <text x="28" y="164" class="side-label">STATIC CATALOG</text>
            <text x="28" y="195" class="side-label">CLOUD-NATIVE ASSETS</text>

            <rect x="28" y="230" width="186" height="43" rx="8" class="search" />
            <text x="44" y="257" class="search-text">Search collections</text>
            <rect x="28" y="295" width="158" height="12" rx="6" class="list-line active" />
            <rect x="28" y="322" width="184" height="12" rx="6" class="list-line" />
            <rect x="28" y="349" width="136" height="12" rx="6" class="list-line" />

            <text x="276" y="50" class="catalog-kicker">TRANSPORTATION, INFRASTRUCTURE + UTILITIES</text>
            <text x="276" y="87" class="catalog-title">Catalog collections</text>
            <line x1="276" y1="108" x2="756" y2="108" class="catalog-rule" />

            <g transform="translate(276 136)">
              <rect width="480" height="64" rx="12" class="result" />
              <circle cx="32" cy="32" r="14" class="result-icon" />
              <text x="60" y="28" class="result-title">Street network and transportation</text>
              <text x="60" y="48" class="result-copy">GeoParquet · PMTiles · metadata</text>
            </g>
            <g transform="translate(276 216)">
              <rect width="480" height="64" rx="12" class="result" />
              <circle cx="32" cy="32" r="14" class="result-icon muted-icon" />
              <text x="60" y="28" class="result-title">Roads, bridges and public assets</text>
              <text x="60" y="48" class="result-copy">open files · stable HTTPS addresses</text>
            </g>
            <g transform="translate(276 296)">
              <rect width="480" height="64" rx="12" class="result" />
              <circle cx="32" cy="32" r="14" class="result-icon muted-icon" />
              <text x="60" y="28" class="result-title">Browse the real catalog on click</text>
              <text x="60" y="48" class="result-copy">the preview stays underneath while loading</text>
            </g>
          </svg>
        </div>

        <iframe
          v-if="showLive"
          class="browser-content"
          :class="{ ready: loaded && !timedOut }"
          :src="browserUrl"
          title="St. Louis transportation open data catalog"
          loading="eager"
          allow="fullscreen"
          @load="onLoad"
        />

        <div v-if="showLive && !loaded" class="load-note">
          <span>{{ timedOut ? 'Preview kept — open the live catalog in a new tab.' : 'Loading the live catalog…' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-browser-stage { --browser-cream: color-mix(in srgb, var(--c-warn) 10%, var(--c-bg)); }
.browser { display: flex !important; flex-direction: column; overflow: hidden; border: 3px solid var(--c-fg); border-radius: 16px; background: var(--c-bg); box-sizing: border-box; }
.browser-bar { flex: 0 0 44px; display: flex; align-items: center; gap: 10px; min-width: 0; padding: 0 16px; background: var(--c-fg); color: var(--c-bg); }
.status-dot { width: 11px; height: 11px; flex: 0 0 auto; border-radius: 50%; background: var(--c-accent); }
.status-dot.live { background: var(--c-ok); }
.state-label { flex: 0 0 auto; color: var(--browser-cream); font-size: 12px; font-weight: 900; letter-spacing: 0.09em; }
.address { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 700; opacity: 0.78; }
.open-link { margin-left: auto; flex: 0 0 auto; color: var(--browser-cream); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 900; letter-spacing: 0.07em; text-decoration: none; }
.browser-body { position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; }
.fallback, .browser-content { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.browser-content { opacity: 0; background: transparent; transition: opacity 350ms ease; }
.browser-content.ready { opacity: 1; }
.fallback { overflow: hidden; }
.fallback-canvas { display: block; width: 100%; height: 100%; }
.fallback-bg { fill: var(--c-panel); }
.side { fill: var(--browser-cream); }
.side-kicker { fill: var(--c-accent); font-size: 17px; font-weight: 900; letter-spacing: 0.11em; }
.side-title { fill: var(--c-fg); font-size: 28px; font-weight: 900; }
.side-rule, .catalog-rule { stroke: var(--c-fg); stroke-width: 3; }
.side-label { fill: var(--c-fg); font-size: 15px; font-weight: 800; letter-spacing: 0.035em; }
.search { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.search-text { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
.list-line { fill: var(--c-fg); opacity: 0.2; }
.list-line.active { fill: var(--c-accent); opacity: 1; }
.catalog-kicker { fill: var(--c-accent); font-size: 14px; font-weight: 900; letter-spacing: 0.055em; }
.catalog-title { fill: var(--c-fg); font-size: 27px; font-weight: 900; }
.catalog-rule { stroke: var(--c-line); stroke-width: 2; }
.result { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.result-icon { fill: var(--c-accent); }
.muted-icon { fill: var(--c-muted); opacity: 0.5; }
.result-title { fill: var(--c-fg); font-size: 16px; font-weight: 900; }
.result-copy { fill: var(--c-muted); font-size: 13px; font-weight: 700; }
.load-note { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); min-width: 360px; padding: 10px 18px; border: 2px solid var(--c-accent); border-radius: 999px; background: var(--c-bg); color: var(--c-fg); text-align: center; font-size: 14px; font-weight: 800; }
</style>
