<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const assetBase = import.meta.env.BASE_URL

const steps = computed(() => [
  {
    title: tr('Publisher overview', '公開者向け概要'),
    label: tr('Overview', '概要'),
    short: tr('access · quality · usage', 'アクセス · 品質 · 利用状況'),
    image: `${assetBase}carto-sdi-overview.png`,
    copy1: tr('See the work waiting for the publisher.', '公開者が対応すべき作業を確認します。'),
    copy2: tr('Keep storage and usage context together.', 'ストレージと利用状況を一緒に把握します。'),
  },
  {
    title: tr('Datasets', 'データセット'),
    short: tr('contents · visibility', '内容 · 公開範囲'),
    image: `${assetBase}carto-sdi-datasets.png`,
    copy1: tr('Manage catalog contents and visibility.', 'カタログの内容と公開範囲を管理します。'),
    copy2: tr('The publisher still controls every change.', 'すべての変更は公開者が管理します。'),
  },
  {
    title: tr('Grants', 'アクセス許可'),
    short: tr('requests · scoped access', '申請 · 限定アクセス'),
    image: `${assetBase}carto-sdi-grants.png`,
    copy1: tr('Approve requests and issue scoped access.', '申請を承認し、限定アクセスを付与します。'),
    copy2: tr('Private data stays in publisher storage.', '非公開データは公開者のストレージに残ります。'),
  },
  {
    title: tr('Usage signals', '利用状況'),
    short: tr('readers · tools · denials', '利用者 · ツール · 拒否'),
    image: `${assetBase}carto-sdi-usage.png`,
    copy1: tr('Measure readers, tools, denials and bytes.', '利用者、ツール、拒否、バイト数を計測します。'),
    copy2: tr('Turn runtime activity into publisher signals.', '実行時の活動を公開者向け情報に変えます。'),
  },
  {
    title: tr('Data quality', 'データ品質'),
    short: tr('health · ratings · issues', '健全性 · 評価 · 課題'),
    image: `${assetBase}carto-sdi-quality.png`,
    copy1: tr('Make health, reviews and issues comparable.', '健全性、評価、課題を比較可能にします。'),
    copy2: tr('Turn quality signals into publisher actions.', '品質シグナルを公開者のアクションにつなげます。'),
  },
  {
    title: tr('Governance', 'ガバナンス'),
    short: tr('identity · groups · roles', 'ID · グループ · ロール'),
    image: `${assetBase}carto-sdi-governance.png`,
    copy1: tr('Manage identity groups, roles and access.', 'IDグループ、ロール、アクセスを管理します。'),
    copy2: tr('Keep policy connected to every catalog.', 'ポリシーを各カタログに結び付けます。'),
  },
  {
    title: tr('Commercial workflows', '商用ワークフロー'),
    label: tr('Commercial', '商用'),
    short: tr('plans · metering', 'プラン · 契約 · 計測'),
    image: `${assetBase}carto-sdi-monetization.png`,
    copy1: tr('Manage plans, subscriptions and metering.', 'プラン、契約、利用量計測を管理します。'),
    copy2: tr('Add automation, scale and integrations.', '自動化、スケール、連携を追加します。'),
  },
])

const s = computed(() => (isPrintMode.value ? steps.value.length - 1 : Math.min($clicks.value, steps.value.length - 1)))
const active = computed(() => steps.value[s.value])
</script>

<template>
  <div class="stage control-stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('A seven-step walkthrough of CARTO SDI, from publisher overview and access to data quality, governance, and commercial workflows.', 'CARTO SDIの7つのステップを、公開者向け概要とアクセスからデータ品質、ガバナンス、商用ワークフローまでたどります。')">
      <defs>
        <clipPath id="carto-control-walkthrough-shot">
          <rect x="232" y="12" width="560" height="355" rx="12" />
        </clipPath>
      </defs>

      <g transform="translate(0 40)">
        <circle cx="25" cy="21" r="5" class="status-dot" />
        <text x="38" y="26" class="section-label">CARTO SDI</text>

        <g v-for="(step, i) in steps" :key="step.title" :transform="`translate(22 ${62 + i * 47})`"
           class="step" :class="{ active: i === s, done: i < s, future: i > s }">
          <circle cx="14" cy="-7" r="12" class="step-disc" />
          <text x="14" y="-2" text-anchor="middle" class="step-number">{{ String(i + 1).padStart(2, '0') }}</text>
          <text x="43" y="-10" class="step-title">{{ step.label || step.title }}</text>
          <text x="43" y="14" class="step-copy">{{ step.short }}</text>
        </g>

        <rect x="226" y="6" width="572" height="367" rx="17" class="screen-matte" />
        <image v-for="(step, i) in steps" :key="step.image" :href="step.image"
               x="232" y="12" width="560" height="355" preserveAspectRatio="xMidYMid meet"
               clip-path="url(#carto-control-walkthrough-shot)" class="screen" :class="{ active: i === s }" />
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
.status-dot { fill: var(--c-ok); }
.section-label { fill: var(--c-muted); font-size: 13px; font-weight: 900; letter-spacing: 0.075em; }
.step { transition: opacity 220ms ease, transform 220ms ease; }
.step.future { opacity: 0.28; }
.step.done { opacity: 0.62; }
.step.active { opacity: 1; }
.step-disc { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2; }
.step.active .step-disc { fill: var(--c-accent); stroke: var(--c-accent); }
.step.done .step-disc { fill: var(--c-ok); stroke: var(--c-ok); }
.step-number { fill: var(--c-muted); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; font-weight: 900; }
.step.active .step-number, .step.done .step-number { fill: var(--c-bg); }
.step-title { fill: var(--c-fg); font-size: 13px; font-weight: 900; }
.step-copy { fill: var(--c-muted); font-size: 10.5px; font-weight: 800; }
.active-message { flex: 0 0 auto; display: flex; gap: 0.65em; align-items: baseline; margin-top: 0.15em; font-size: 0.82em; font-weight: 700; line-height: 1.25; }
.active-message strong { color: var(--c-portolan); font-size: 1.22em; font-weight: 900; white-space: nowrap; }
</style>
