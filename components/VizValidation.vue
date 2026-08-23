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
         :aria-label="tr('Portolan release 0.1.2 contains 128 requirements: 106 are assigned to deterministic validator enforcement and 22 to publishing process. Rashid checks catalog structure, metadata, and real data bytes, while publishers still judge source meaning, translation quality, and publishing decisions.', 'Portolanリリース0.1.2には128要件があり、106件は決定的なバリデーター検証、22件は公開プロセスに割り当てられています。Rashidはカタログ構造、メタデータ、実データのバイト列を検査し、原典の意味、翻訳品質、公開判断は公開者が引き続き評価します。')">
      <text x="400" y="28" text-anchor="middle" class="kicker">{{ tr('WHAT MACHINES CAN CHECK · WHAT PEOPLE MUST JUDGE', '機械が検証すること · 人が判断すること') }}</text>

      <g class="status">
        <a href="https://github.com/portolan-sdi/portolan-spec/releases/tag/v0.1.2" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open Portolan specification release 0.1.2 in a new tab', 'Portolan仕様リリース0.1.2を新しいタブで開く')" @click.stop>
        <rect x="42" y="45" width="326" height="46" rx="12" class="status-release link-target" />
        <text x="62" y="63" class="status-text release-text link-label">{{ tr('RELEASE v0.1.2', 'リリース v0.1.2') }}</text>
        <text x="338" y="81" text-anchor="end" class="status-number">128</text>
        </a>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/specs/portolan/requirements.yaml" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the current Portolan requirements file in a new tab', '現在のPortolan要件ファイルを新しいタブで開く')" @click.stop>
        <rect x="432" y="45" width="326" height="46" rx="12" class="status-main link-target" />
        <path d="M595 51 V85" class="status-divider" />
        <text x="452" y="63" class="status-text main-text link-label">{{ tr('VALIDATOR', '検証') }}</text>
        <text x="568" y="82" text-anchor="end" class="status-number validator-number">106</text>
        <text x="616" y="63" class="status-text process-text">{{ tr('PROCESS', 'プロセス') }}</text>
        <text x="738" y="82" text-anchor="end" class="status-number process-number">22</text>
        </a>
      </g>

      <text x="42" y="124" class="section-label">{{ tr('MACHINE-CHECKABLE', '機械で検証可能') }}</text>
      <path d="M154 221 H214 M426 221 H478" class="flow" />
      <path d="M207 215 L214 221 L207 227 M471 215 L478 221 L471 227" class="flow" />

      <g class="rashid">
        <a href="https://github.com/portolan-sdi/rashid" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the Rashid validator repository in a new tab', 'Rashid検証ツールのリポジトリを新しいタブで開く')" @click.stop>
        <circle cx="98" cy="221" r="56" class="rashid-disc" />
        <lucide-badge-check x="70" y="188" width="56" height="56" class="rashid-icon" />
        <text x="98" y="258" text-anchor="middle" class="rashid-name link-label">rashid</text>
        </a>
      </g>

      <g class="machine-step" :class="{ visited: s >= 1, active: s === 1 }">
        <rect x="220" y="156" width="200" height="130" rx="18" class="step-body" />
        <text x="236" y="190" class="step-title step-title-compact">{{ tr('STRUCTURE + META', '構造 + メタデータ') }}</text>
        <text x="236" y="223" class="step-copy step-copy-compact">{{ tr('STAC tree · required files', 'STACツリー · 必須ファイル') }}</text>
        <text x="236" y="252" class="step-copy step-copy-compact">{{ tr('roles · license · provenance', '役割 · ライセンス · 来歴') }}</text>
      </g>

      <g class="machine-step" :class="{ visited: s >= 2, active: s === 2 }">
        <rect x="484" y="138" width="274" height="166" rx="18" class="step-body" />
        <text x="506" y="174" class="step-title">{{ tr('REAL DATA BYTES', '実データのバイト列') }}</text>
        <text x="506" y="204" class="step-copy">{{ tr('Parquet layout · COG statistics', 'Parquet配置 · COG統計') }}</text>
        <rect x="506" y="226" width="104" height="40" rx="10" class="opt-chip" />
        <text x="558" y="251" text-anchor="middle" class="opt-title">--schema</text>
        <rect x="626" y="226" width="104" height="40" rx="10" class="opt-chip live-chip" />
        <text x="678" y="251" text-anchor="middle" class="opt-title">--live</text>
        <text x="621" y="290" text-anchor="middle" class="opt-copy">{{ tr('optional deeper checks', '任意の詳細検査') }}</text>
      </g>

      <g class="human-step" :class="{ visited: s >= 3, active: s === 3 }">
        <rect x="42" y="344" width="716" height="94" rx="18" class="human-body" />
        <lucide-user-round-check x="66" y="366" width="50" height="50" class="human-icon" />
        <text x="132" y="378" class="human-title">{{ tr('HUMAN JUDGMENT', '人による判断') }}</text>
        <text x="132" y="410" class="human-copy">{{ tr('upstream meaning · translation quality · publishing decisions', '原典の意味 · 翻訳品質 · 公開判断') }}</text>
        <text x="730" y="396" text-anchor="end" class="human-note">{{ tr('not everything should be automated', 'すべてを自動化しない') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.075em; }
.status-release, .status-main { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.status-release { stroke: var(--c-ok); }
.status-main { stroke: var(--c-portolan); }
.status-text { font-size: 10.5px; font-weight: 900; letter-spacing: 0.055em; }
.release-text { fill: var(--c-ok); }
.main-text { fill: var(--c-portolan); }
.process-text { fill: var(--c-warn); }
.status-number { fill: var(--c-fg); font-size: 24px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.validator-number { fill: var(--c-portolan); }
.process-number { fill: var(--c-warn); }
.status-divider { stroke: var(--c-line); stroke-width: 2; }
.section-label { fill: var(--c-muted); font-size: 14px; font-weight: 900; letter-spacing: 0.1em; }
.flow { fill: none; stroke: var(--c-line); stroke-width: var(--w-connector); stroke-linecap: round; stroke-linejoin: round; }
.rashid-disc { fill: var(--c-fg); }
.rashid-icon { color: var(--c-ok); }
.rashid-name { fill: var(--c-bg); font-size: 17px; font-weight: 900; }
.machine-step, .human-step { opacity: 0.36; transition: opacity 300ms ease, transform 300ms ease; }
.machine-step.visited, .human-step.visited { opacity: 0.72; }
.machine-step.active, .human-step.active { opacity: 1; transform: translateY(-4px); }
.step-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.machine-step.active .step-body { stroke: var(--c-accent); }
.step-title { fill: var(--c-fg); font-size: 17px; font-weight: 900; letter-spacing: 0.035em; }
.step-title-compact { font-size: 16px; letter-spacing: 0.02em; }
.machine-step.active .step-title { fill: var(--c-accent); }
.step-copy { fill: var(--c-muted); font-size: 13px; font-weight: 700; }
.step-copy-compact { font-size: 11px; }
.opt-chip { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2; }
.live-chip { stroke: var(--c-warn); }
.opt-title { fill: var(--c-fg); font-size: 15px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.opt-copy { fill: var(--c-muted); font-size: 13px; font-weight: 700; }
.human-body { fill: color-mix(in srgb, var(--c-warn) 9%, var(--c-bg)); stroke: var(--c-line); stroke-width: 3; }
.human-step.active .human-body { stroke: var(--c-warn); }
.human-icon { color: var(--c-warn); }
.human-title { fill: var(--c-warn); font-size: 18px; font-weight: 900; letter-spacing: 0.05em; }
.human-copy { fill: var(--c-fg); font-size: 15px; font-weight: 800; }
.human-note { fill: var(--c-muted); font-size: 13px; font-weight: 700; }
</style>
