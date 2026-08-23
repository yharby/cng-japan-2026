<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 0 : $clicks.value))
const browserUrl = 'https://browser.portolan-sdi.org/#/external/data.source.coop/ftw/harmonized-field-data/catalog.json'
const showLive = computed(() => !isPrintMode.value && s.value >= 1)
const loaded = ref(false)
const timedOut = ref(false)
let loadTimer: ReturnType<typeof setTimeout> | undefined
let revealTimer: ReturnType<typeof setTimeout> | undefined

watch(showLive, (value) => {
  loaded.value = false
  timedOut.value = false
  if (loadTimer) clearTimeout(loadTimer)
  if (revealTimer) clearTimeout(revealTimer)
  if (value) {
    loadTimer = setTimeout(() => {
      timedOut.value = true
    }, 8000)
  }
})

function onLoad() {
  if (revealTimer) clearTimeout(revealTimer)
  revealTimer = setTimeout(() => {
    loaded.value = true
    timedOut.value = false
    if (loadTimer) clearTimeout(loadTimer)
  }, 4000)
}

onBeforeUnmount(() => {
  if (loadTimer) clearTimeout(loadTimer)
  if (revealTimer) clearTimeout(revealTimer)
})
</script>

<template>
  <div class="stage live-browser-stage">
    <div class="browser canvas" role="group" :aria-label="tr('Harmonized Field Boundary Data live Portolan catalog with a deterministic preview before the live website loads', 'Harmonized Field Boundary DataのPortolanライブカタログ。サイトの読み込み前は安定したプレビューを表示します。')">
      <div class="browser-bar">
        <span class="status-dot" :class="{ live: showLive && loaded }" aria-hidden="true" />
        <span class="state-label">{{ showLive ? (loaded ? tr('LIVE', 'ライブ') : tr('LOADING', '読込中')) : tr('PREVIEW', 'プレビュー') }}</span>
        <span class="address">browser.portolan-sdi.org/…/harmonized-field-data/catalog.json</span>
        <a class="open-link source-link" :href="browserUrl" target="_blank" rel="noopener noreferrer"
           :aria-label="tr('Open the Harmonized Field Boundary Data catalog in a new tab', 'Harmonized Field Boundary Dataカタログを新しいタブで開く')" @click.stop>
          <span>{{ tr('OPEN', '開く') }}</span><lucide-external-link aria-hidden="true" />
        </a>
      </div>

      <div class="browser-body">
        <div class="fallback" role="img" :aria-label="tr('Preview of the Harmonized Field Boundary Data catalog', 'Harmonized Field Boundary Dataカタログのプレビュー')">
          <svg class="fallback-canvas" viewBox="0 0 800 410" aria-hidden="true">
            <rect width="800" height="410" class="fallback-bg" />
            <rect x="0" y="0" width="242" height="410" class="side" />
            <text x="28" y="44" class="side-kicker">HARMONIZED FIELDS</text>
            <text x="28" y="76" class="side-title">{{ tr('OFFICIAL DATA', '公的データ') }}</text>
            <line x1="28" y1="98" x2="214" y2="98" class="side-rule" />
            <text x="28" y="133" class="side-label">{{ tr('3 LINKED COLLECTIONS', '3 LINK済みCollection') }}</text>
            <text x="28" y="164" class="side-label">{{ tr('2,630,704 LATEST RECORDS', '最新版2,630,704件') }}</text>
            <text x="28" y="195" class="side-label">GeoParquet · PMTiles</text>

            <rect x="28" y="230" width="186" height="43" rx="8" class="search" />
            <text x="44" y="257" class="search-text">{{ tr('Search collections', 'コレクションを検索') }}</text>
            <rect x="28" y="295" width="158" height="12" rx="6" class="list-line active" />
            <rect x="28" y="322" width="184" height="12" rx="6" class="list-line" />
            <rect x="28" y="349" width="136" height="12" rx="6" class="list-line" />
            <text x="28" y="389" class="reuse-warning">{{ tr('LICENSE FOLLOWS EACH SOURCE', 'LICENSEは各ソースに保持') }}</text>

            <text x="276" y="50" class="catalog-kicker">{{ tr('GOVERNMENT SOURCES · FIBOA SCHEMA', '政府ソース · FIBOAスキーマ') }}</text>
            <text x="276" y="87" class="catalog-title">{{ tr('Harmonized field boundaries', '調和された農地区画') }}</text>
            <line x1="276" y1="108" x2="756" y2="108" class="catalog-rule" />

            <g transform="translate(276 136)">
              <rect width="480" height="64" rx="12" class="result" />
              <circle cx="32" cy="32" r="14" class="result-icon" />
              <text x="60" y="28" class="result-title">{{ tr('The Netherlands · 2025', 'オランダ · 2025') }}</text>
              <text x="60" y="48" class="result-copy">{{ tr('1,293,962 fields · CC0-1.0 · EPSG:28992', '1,293,962件 · CC0-1.0 · EPSG:28992') }}</text>
            </g>
            <g transform="translate(276 216)">
              <rect width="480" height="64" rx="12" class="result" />
              <circle cx="32" cy="32" r="14" class="result-icon muted-icon" />
              <text x="60" y="28" class="result-title">{{ tr('North Rhine-Westphalia · 2026', 'ノルトライン＝ヴェストファーレン · 2026') }}</text>
              <text x="60" y="48" class="result-copy">{{ tr('742,010 field blocks · DL-DE-BY-2.0', '742,010件のfield block · DL-DE-BY-2.0') }}</text>
            </g>
            <g transform="translate(276 296)">
              <rect width="480" height="64" rx="12" class="result" />
              <circle cx="32" cy="32" r="14" class="result-icon muted-icon" />
              <text x="60" y="28" class="result-title">{{ tr('Flanders · 2023-2025', 'フランダース · 2023-2025') }}</text>
              <text x="60" y="48" class="result-copy">{{ tr('594,732 latest fields · Flemish free-reuse license', '最新版594,732件 · フランダース無料再利用license') }}</text>
            </g>
          </svg>
        </div>

        <iframe
          v-if="showLive"
          class="browser-content"
          :class="{ ready: loaded && !timedOut }"
          :src="browserUrl"
          :title="tr('Harmonized Field Boundary Data Portolan catalog', 'Harmonized Field Boundary Data Portolanカタログ')"
          loading="eager"
          allow="fullscreen"
          @load="onLoad"
        />

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
.open-link { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; flex: 0 0 auto; color: var(--browser-cream); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 900; letter-spacing: 0.07em; text-decoration: none; }
.open-link svg { width: 15px; height: 15px; }
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
.reuse-warning { fill: var(--c-ok); font-size: 10px; font-weight: 900; letter-spacing: 0.035em; }
.catalog-kicker { fill: var(--c-accent); font-size: 14px; font-weight: 900; letter-spacing: 0.055em; }
.catalog-title { fill: var(--c-fg); font-size: 27px; font-weight: 900; }
.catalog-rule { stroke: var(--c-line); stroke-width: 2; }
.result { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.result-icon { fill: var(--c-accent); }
.muted-icon { fill: var(--c-muted); opacity: 0.5; }
.result-title { fill: var(--c-fg); font-size: 16px; font-weight: 900; }
.result-copy { fill: var(--c-muted); font-size: 13px; font-weight: 700; }
</style>
