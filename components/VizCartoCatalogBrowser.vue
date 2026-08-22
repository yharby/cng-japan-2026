<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const assetBase = import.meta.env.BASE_URL

const steps = computed(() => [
  {
    title: tr('Browse catalogs', 'カタログを探す'),
    label: tr('Catalogs', 'カタログ'),
    short: tr('organizations · regions', '組織 · 地域'),
    image: `${assetBase}carto-sdi-browser-catalogs.png`,
    copy1: tr('Choose a catalog across organizations and regions.', '組織や地域からカタログを選びます。'),
    copy2: tr('Open one cloud publication from a single entry point.', '単一の入り口から1つのクラウド公開を開きます。'),
  },
  {
    title: tr('Discover datasets', 'データセットを発見する'),
    label: tr('Discovery', 'データ発見'),
    short: tr('search · filters · metadata', '検索 · フィルター · メタデータ'),
    image: `${assetBase}carto-sdi-browser-datasets.png`,
    copy1: tr('Search and filter datasets by what they contain.', '内容に基づいてデータセットを検索、絞り込みます。'),
    copy2: tr('Compare format, geometry and feature context.', '形式、ジオメトリ、フィーチャの情報を比較します。'),
  },
  {
    title: tr('Explore on the map', 'マップで探索する'),
    label: tr('Map', 'マップ'),
    short: tr('layers · progress · interaction', 'レイヤー · 進捗 · 操作'),
    image: `${assetBase}carto-sdi-browser-map.png`,
    copy1: tr('Put datasets on the map and watch each layer load.', 'データセットをマップに追加し、レイヤーの読み込みを確認します。'),
    copy2: tr('Explore multiple cloud assets in one view.', '複数のクラウド資産を1つの画面で探索します。'),
  },
  {
    title: tr('Ask with AI', 'AIで質問する'),
    label: tr('AI explorer', 'AI探索'),
    short: tr('questions · maps · tables', '質問 · マップ · テーブル'),
    image: `${assetBase}carto-sdi-browser-ai.png`,
    copy1: tr('Start with natural-language questions grounded in the catalog.', 'カタログに基づく自然言語の質問から始めます。'),
    copy2: tr('Use accessible data with source-aware answers.', 'アクセス可能なデータを出典を意識した回答で利用します。'),
  },
  {
    title: tr('Ground the answer', '回答を根拠づける'),
    label: tr('Grounded result', '根拠付き結果'),
    short: tr('sources · map · summaries', '出典 · マップ · 要約'),
    image: `${assetBase}carto-sdi-browser-ai-result.png`,
    fit: 'xMidYMid meet',
    copy1: tr('Turn a question into a source-linked answer.', '質問を出典に結びついた回答へ変えます。'),
    copy2: tr('Keep its map and summaries beside it.', 'マップと要約を横に表示します。'),
  },
])

const s = computed(() => (isPrintMode.value ? steps.value.length - 1 : Math.min($clicks.value, steps.value.length - 1)))
const active = computed(() => steps.value[s.value])
</script>

<template>
  <div class="stage browser-stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('A five-step walkthrough of the CARTO SDI catalog browser, from choosing catalogs and discovering datasets to mapping data and receiving a grounded AI result.', 'CARTO SDIカタログブラウザーの5つのステップを、カタログ選択、データ発見、マップ探索、根拠付きAI結果までたどります。')">
      <defs>
        <clipPath id="carto-catalog-browser-shot">
          <rect x="232" y="12" width="560" height="355" rx="12" />
        </clipPath>
      </defs>

      <g transform="translate(0 40)">
        <circle cx="25" cy="21" r="5" class="status-dot" />
        <text x="38" y="26" class="section-label">CARTO SDI · CATALOG</text>

        <g v-for="(step, i) in steps" :key="step.title" :transform="`translate(22 ${69 + i * 57})`"
           class="step" :class="{ active: i === s, done: i < s, future: i > s }">
          <circle cx="14" cy="-7" r="12" class="step-disc" />
          <text x="14" y="-2" text-anchor="middle" class="step-number">{{ String(i + 1).padStart(2, '0') }}</text>
          <text x="43" y="-10" class="step-title">{{ step.label }}</text>
          <text x="43" y="14" class="step-copy">{{ step.short }}</text>
        </g>

        <rect x="226" y="6" width="572" height="367" rx="17" class="screen-matte" />
        <image v-for="(step, i) in steps" :key="step.image" :href="step.image"
               x="232" y="12" width="560" height="355" :preserveAspectRatio="step.fit ?? 'xMidYMin slice'"
               clip-path="url(#carto-catalog-browser-shot)" class="screen" :class="{ active: i === s }" />
      </g>
    </svg>
  </div>
  <div class="active-message">
    <strong>{{ active.title }}</strong>
    <span>{{ active.copy1 }} {{ active.copy2 }}</span>
  </div>
</template>

<style scoped>
.screen { opacity: 0; transition: opacity 280ms ease; }
.screen.active { opacity: 1; }
.screen-matte { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 3; }
.status-dot { fill: var(--c-portolan); }
.section-label { fill: var(--c-muted); font-size: 13px; font-weight: 900; letter-spacing: 0.075em; }
.step { transition: opacity 220ms ease, transform 220ms ease; }
.step.future { opacity: 0.28; }
.step.done { opacity: 0.62; }
.step.active { opacity: 1; }
.step-disc { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.step.active .step-disc { fill: var(--c-portolan); stroke: var(--c-portolan); }
.step.done .step-disc { fill: var(--c-ok); stroke: var(--c-ok); }
.step-number { fill: var(--c-muted); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; font-weight: 900; }
.step.active .step-number, .step.done .step-number { fill: var(--c-bg); }
.step-title { fill: var(--c-fg); font-size: 13px; font-weight: 900; }
.step-copy { fill: var(--c-muted); font-size: 10.5px; font-weight: 800; }
.active-message { flex: 0 0 auto; display: flex; gap: 0.65em; align-items: baseline; margin-top: 0.15em; font-size: 0.82em; font-weight: 700; line-height: 1.25; }
.active-message strong { color: var(--c-portolan); font-size: 1.22em; font-weight: 900; white-space: nowrap; }
</style>
