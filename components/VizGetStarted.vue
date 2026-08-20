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
         :aria-label="tr('The published Portolan CLI workflow for data publishers. Install portolan-cli, initialize a catalog, add a dataset, run check fix to convert and validate it, and push the catalog to object storage. For later updates, sync performs pull, initialize, scan, check, and push. PyPI currently selects stable version 0.7.0; version 1.0.0a0 is an alpha release.', 'データ公開者向けPortolan CLIの公開済みワークフローです。portolan-cliをインストールし、カタログを初期化し、データセットを追加し、check fixで変換・検証して、オブジェクトストレージへpushします。後の更新ではsyncがpull、init、scan、check、pushを実行します。PyPIの現在の安定版選択は0.7.0で、1.0.0a0はアルファ版です。')">
      <defs>
        <marker id="start-arrow" viewBox="0 0 8 8" markerWidth="8" markerHeight="8"
                refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="marker-head" />
        </marker>
      </defs>

      <text x="42" y="29" class="release">{{ tr('PYPI STABLE SELECTION', 'PYPI安定版選択') }} · v0.7.0</text>
      <text x="758" y="29" text-anchor="end" class="alpha">{{ tr('ALPHA', 'アルファ版') }} · v1.0.0a0</text>

      <a href="https://pypi.org/project/portolan-cli/" target="_blank" rel="noopener noreferrer"
         class="svg-source-link" :aria-label="tr('Open the Portolan CLI package page in a new tab', 'Portolan CLIのパッケージページを新しいタブで開く')" @click.stop>
        <rect x="42" y="47" width="716" height="54" rx="12" class="install link-target" />
        <text x="64" y="81" class="command link-label">$ uv tool install portolan-cli</text>
        <text x="735" y="81" text-anchor="end" class="install-note">Python ≥3.10</text>
      </a>

      <g class="publish" :class="{ on: s >= 1 }">
        <text x="42" y="135" class="lane-num">01</text>
        <text x="88" y="135" class="lane-title">{{ tr('PUBLISH', '公開') }}</text>
        <text x="758" y="135" text-anchor="end" class="lane-note">{{ tr('local files → checked static catalog', 'ローカルファイル → 検証済み静的カタログ') }}</text>
        <path d="M190 220 H215 M375 220 H400 M560 220 H585" class="flow" marker-end="url(#start-arrow)" />

        <g class="step" transform="translate(42 158)">
          <rect width="148" height="124" rx="14" />
          <text x="18" y="31" class="step-num">1</text>
          <text x="18" y="63" class="step-command">portolan init</text>
          <text x="18" y="93" class="step-copy">{{ tr('license + catalog', 'ライセンス + Catalog') }}</text>
        </g>
        <g class="step" transform="translate(227 158)">
          <rect width="148" height="124" rx="14" />
          <text x="18" y="31" class="step-num">2</text>
          <text x="18" y="63" class="step-command">portolan add data/</text>
          <text x="18" y="93" class="step-copy">{{ tr('track the dataset', 'データセットを登録') }}</text>
        </g>
        <g class="step" transform="translate(412 158)">
          <rect width="148" height="124" rx="14" />
          <text x="18" y="31" class="step-num">3</text>
          <text x="18" y="58" class="step-command">portolan check</text>
          <text x="18" y="80" class="step-command">--fix</text>
          <text x="18" y="108" class="step-copy">{{ tr('convert + validate', '変換 + 検証') }}</text>
        </g>
        <g class="step" transform="translate(597 158)">
          <rect width="161" height="124" rx="14" />
          <text x="18" y="31" class="step-num">4</text>
          <text x="18" y="61" class="step-command">portolan push</text>
          <text x="18" y="83" class="step-command small">s3://bucket/catalog</text>
          <text x="18" y="108" class="step-copy">{{ tr('publish to storage', 'ストレージへ公開') }}</text>
        </g>
      </g>

      <g class="update" :class="{ on: s >= 2 }">
        <text x="42" y="321" class="lane-num update-num">02</text>
        <text x="88" y="321" class="lane-title">{{ tr('UPDATE', '更新') }}</text>
        <text x="758" y="321" text-anchor="end" class="lane-note">{{ tr('one repeatable round trip', '一つの反復可能な往復処理') }}</text>
        <a href="https://github.com/portolan-sdi/portolan-cli/blob/v0.7.0/README.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open the published Portolan CLI 0.7.0 workflow in a new tab', '公開済みPortolan CLI 0.7.0のワークフローを新しいタブで開く')" @click.stop>
          <rect x="42" y="340" width="716" height="72" rx="14" class="sync link-target" />
          <text x="64" y="371" class="command link-label">$ portolan sync s3://bucket/catalog -c dataset</text>
          <text x="64" y="396" class="sync-note">pull → init → scan → check → push</text>
        </a>
        <text x="400" y="445" text-anchor="middle" class="summary">{{ tr('The publisher keeps control of the storage, credentials, update schedule, and release decision.', '公開者がストレージ、認証情報、更新スケジュール、リリース判断を管理します。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }

.release, .alpha { fill: var(--c-muted); font-size: 11px; font-weight: 900; letter-spacing: 0.055em; }
.alpha { fill: var(--c-warn); }
.install { fill: var(--c-fg); }
.command { fill: var(--c-bg); font-size: 16px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.install-note { fill: var(--c-ok); font-size: 12px; font-weight: 900; }
.publish, .update { opacity: 0; }
.publish.on, .update.on { animation: reveal 420ms ease-out both; }
.lane-num { fill: var(--c-accent); font-size: 17px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.update-num { fill: var(--c-ok); }
.lane-title { fill: var(--c-fg); font-size: 19px; font-weight: 900; letter-spacing: 0.06em; }
.lane-note { fill: var(--c-muted); font-size: 12px; font-weight: 800; }
.flow { fill: none; stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.marker-head { fill: none; stroke: var(--c-portolan); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.step rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2.5; }
.step-num { fill: var(--c-accent); font-size: 13px; font-weight: 900; }
.step-command { fill: var(--c-fg); font-size: 11.5px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.step-command.small { font-size: 9.5px; }
.step-copy { fill: var(--c-muted); font-size: 10.5px; font-weight: 750; }
.sync { fill: var(--c-panel); stroke: var(--c-ok); stroke-width: 2.5; }
.update .command { fill: var(--c-fg); font-size: 15px; }
.sync-note { fill: var(--c-ok); font-size: 12px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.summary { fill: var(--c-muted); font-size: 11.5px; font-weight: 800; }
</style>
