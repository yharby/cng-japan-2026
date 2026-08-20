<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const gates = [
  { titleEn: 'PREPARE', titleJa: '準備', noteEn: 'convert + document', noteJa: '変換 + 文書化', x: 122, reveal: 1, url: 'https://github.com/portolan-sdi/portolan-skills/blob/main/skills/portolan-bootstrap/SKILL.md' },
  { titleEn: 'VALIDATE', titleJa: '検証', noteEn: 'rashid check', noteJa: 'rashid検証', x: 308, reveal: 2, url: 'https://github.com/portolan-sdi/rashid' },
  { titleEn: 'PUBLISH', titleJa: '公開', noteEn: 'HTTPS · range · CORS', noteJa: 'HTTPS · range · CORS', x: 494, reveal: 3, url: 'https://github.com/portolan-sdi/portolan-spec/blob/main/specs/portolan/core.md' },
  { titleEn: 'REGISTER', titleJa: '登録', noteEn: 'registry pull request', noteJa: 'registry PR', x: 680, reveal: 4, url: 'https://github.com/portolan-sdi/portolan-skills/blob/main/skills/register-catalog/SKILL.md' },
]
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('Choose the first Japanese pilot by agreeing a candidate dataset, an accountable publisher, and a public URL. Then pass four gates: prepare, validate, publish over HTTPS with range requests and CORS, and register. Success means a clear license, a rashid pass, working range requests and CORS, and a registry pull request.', '最初の日本パイロットとして、候補データセット、責任を持つ公開者、公開URLを合意します。その後、準備、検証、HTTPS・レンジリクエスト・CORSでの公開、登録の4段階を通過します。成功条件は明確なライセンス、rashid合格、動作するレンジリクエストとCORS、registry PRです。')">
      <g class="proposal">
        <text x="400" y="32" text-anchor="middle" class="eyebrow">{{ tr('AGREE THE PILOT BEFORE BUILDING IT', '構築前にパイロットを合意する') }}</text>
        <text x="50" y="76" class="field-label">{{ tr('CANDIDATE DATASET', '候補データセット') }}</text>
        <line x1="50" y1="98" x2="278" y2="98" class="blank" />
        <text x="316" y="76" class="field-label">{{ tr('ACCOUNTABLE PUBLISHER', '責任を持つ公開者') }}</text>
        <line x1="316" y1="98" x2="550" y2="98" class="blank" />
        <text x="588" y="76" class="field-label">{{ tr('PUBLIC URL', '公開URL') }}</text>
        <line x1="588" y1="98" x2="750" y2="98" class="blank" />
        <text x="50" y="122" class="field-ja">{{ tr('候補データ', '') }}</text>
        <text x="316" y="122" class="field-ja">{{ tr('担当する公開者', '') }}</text>
        <text x="588" y="122" class="field-ja">{{ tr('公開URL', '') }}</text>
      </g>

      <line x1="122" y1="242" x2="680" y2="242" class="route" />
      <g v-for="(gate, i) in gates" :key="gate.titleEn" class="gate" :class="{ on: s >= gate.reveal, final: i === gates.length - 1 }">
        <g v-if="i > 0" class="gate-link" :class="{ on: s >= gate.reveal }">
          <line :x1="gates[i - 1].x + 42" y1="242" :x2="gate.x - 42" y2="242" />
        </g>
        <a :href="gate.url" target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :class="{ 'is-disabled': s < gate.reveal }" :tabindex="s >= gate.reveal ? 0 : -1"
           :aria-label="tr(`Open the ${gate.titleEn.toLowerCase()} instructions in a new tab`, `${gate.titleJa}の手順を新しいタブで開く`)" @click.stop>
        <circle :cx="gate.x" cy="242" r="39" class="gate-disc link-target" />
        <text :x="gate.x" y="250" text-anchor="middle" class="gate-num">{{ i + 1 }}</text>
        <text :x="gate.x" y="178" text-anchor="middle" class="gate-title link-label">{{ tr(gate.titleEn, gate.titleJa) }}</text>
        <text :x="gate.x" y="202" text-anchor="middle" class="gate-ja">{{ tr(gate.titleJa, '') }}</text>
        <text :x="gate.x" y="304" text-anchor="middle" class="gate-note">{{ tr(gate.noteEn, gate.noteJa) }}</text>
        </a>
      </g>

      <g class="success" :class="{ on: s >= 4 }">
        <line x1="50" y1="346" x2="750" y2="346" class="success-rule" />
        <text x="50" y="380" class="success-label">{{ tr('SUCCESS', '成功条件') }}</text>
        <text x="750" y="380" text-anchor="end" class="success-items">{{ tr('clear license · rashid pass · range + CORS · registry PR', '明確なライセンス · rashid合格 · range + CORS · registry PR') }}</text>
        <text x="400" y="421" text-anchor="middle" class="finish">{{ tr('One complete example. Then learn and improve.', '完全な例を1つ。そこから学び、改善する。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.eyebrow { fill: var(--c-muted); font-size: 17px; font-weight: 850; letter-spacing: 0.085em; }
.field-label { fill: var(--c-fg); font-size: 15px; font-weight: 900; letter-spacing: 0.035em; }
.field-ja { fill: var(--c-muted); font-size: 14px; font-weight: 750; font-family: 'Noto Sans JP', sans-serif; }
.blank { stroke: var(--c-accent); stroke-width: 3; stroke-linecap: round; }
.route { stroke: var(--c-line); stroke-width: var(--w-connector); stroke-linecap: round; opacity: 0.55; }
.gate, .gate-link, .success { opacity: 0; }
.gate.on, .gate-link.on, .success.on { animation: reveal 420ms ease-out both; }
.gate-link line { stroke: var(--c-portolan); stroke-width: var(--w-connector-active); stroke-linecap: round; }
.gate-disc { fill: var(--c-bg); stroke: var(--c-fg); stroke-width: 4; }
.final .gate-disc { fill: var(--c-accent); stroke: var(--c-accent); }
.gate-num { fill: var(--c-fg); font-size: 24px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.final .gate-num { fill: var(--c-bg); }
.gate-title { fill: var(--c-fg); font-size: 18px; font-weight: 900; letter-spacing: 0.045em; }
.gate-ja { fill: var(--c-muted); font-size: 14px; font-weight: 750; font-family: 'Noto Sans JP', sans-serif; }
.gate-note { fill: var(--c-muted); font-size: 15px; font-weight: 800; }
.success-rule { stroke: var(--c-ok); stroke-width: 3; }
.success-label { fill: var(--c-ok); font-size: 17px; font-weight: 900; letter-spacing: 0.07em; }
.success-items { fill: var(--c-fg); font-size: 17px; font-weight: 850; }
.finish { fill: var(--c-accent); font-size: 20px; font-weight: 900; }
</style>
