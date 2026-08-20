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
         :aria-label="tr('Two runnable paths available today. Install the Portolan Claude plugin and ask for the reading-portolan skill, or install rashid and check a local catalog. A separate footer marks the Portolan CLI lifecycle on current main as upcoming 1.0 work.', '今日実行できる2つの方法。Portolan Claudeプラグインを入れreading-portolanスキルを使うか、rashidを入れてローカルカタログを検査します。下段はcurrent mainのPortolan CLIライフサイクルを今後の1.0作業として示します。')">
      <g class="lane analyze">
        <text x="42" y="42" class="lane-num">01</text>
        <text x="92" y="42" class="lane-title">{{ tr('ANALYZE TODAY', '今日、分析する') }}</text>
        <text x="758" y="42" text-anchor="end" class="lane-ja">{{ tr('WITH A SKILL', 'スキルで調べる') }}</text>
        <line x1="42" y1="58" x2="758" y2="58" class="rule accent" />

        <a href="https://github.com/portolan-sdi/portolan-skills/blob/main/README.md" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the Portolan Skills installation guide in a new tab', 'Portolan Skillsのインストールガイドを新しいタブで開く')" @click.stop>
        <rect x="42" y="76" width="716" height="92" rx="14" class="terminal link-target" />
        <text x="64" y="108" class="command link-label">$ claude plugin marketplace add portolan-sdi/portolan-skills</text>
        <text x="64" y="142" class="command">$ claude plugin install portolan</text>
        </a>
        <text x="42" y="198" class="ask-label">{{ tr('ASK', '質問') }}</text>
        <a href="https://github.com/portolan-sdi/portolan-skills/blob/main/skills/reading-portolan/SKILL.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the reading-portolan SKILL.md file in a new tab', 'reading-portolanのSKILL.mdを新しいタブで開く')" @click.stop>
          <text x="98" y="198" class="ask link-label">{{ tr('Use portolan:reading-portolan to answer this question.', 'portolan:reading-portolan でこの質問に答えて。') }}</text>
        </a>
        <text x="42" y="224" class="other">{{ tr('Gemini, Codex, and other agents can use the same SKILL.md files.', 'Gemini、Codex、その他のエージェントも同じSKILL.mdを使えます。') }}</text>
      </g>

      <g class="lane validate" :class="{ on: s >= 1 }">
        <text x="42" y="266" class="lane-num ok-text">02</text>
        <text x="92" y="266" class="lane-title">{{ tr('VALIDATE TODAY', '今日、検証する') }}</text>
        <text x="758" y="266" text-anchor="end" class="lane-ja">{{ tr('BEFORE PUBLISHING', '公開前に確認する') }}</text>
        <line x1="42" y1="282" x2="758" y2="282" class="rule ok" />
        <a href="https://github.com/portolan-sdi/rashid" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 1 }" :tabindex="s >= 1 ? 0 : -1"
           :aria-label="tr('Open the Rashid validator repository in a new tab', 'Rashidバリデーターのリポジトリを新しいタブで開く')" @click.stop>
        <text x="64" y="320" class="command dark link-label">$ uv tool install rashid</text>
        <text x="64" y="354" class="command dark">$ rashid check ./catalog</text>
        </a>
        <text x="520" y="338" class="verdict">{{ tr('exit 0 = no MUST broken', 'exit 0 = MUST違反なし') }}</text>
      </g>

      <g class="upcoming" :class="{ on: s >= 2 }">
        <line x1="42" y1="386" x2="758" y2="386" class="rule muted" />
        <text x="42" y="418" class="upcoming-label">{{ tr('CURRENT MAIN · UPCOMING 1.0', 'CURRENT MAIN · 次期 1.0') }}</text>
        <a href="https://github.com/portolan-sdi/portolan-cli" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :class="{ 'is-disabled': s < 2 }" :tabindex="s >= 2 ? 0 : -1"
           :aria-label="tr('Open the Portolan CLI repository in a new tab', 'Portolan CLIリポジトリを新しいタブで開く')" @click.stop>
        <text x="758" y="418" text-anchor="end" class="upcoming-flow link-label">portolan init → add → check → push</text>
        </a>
        <text x="42" y="445" class="upcoming-note">{{ tr('Publishing workflow; the check is rashid-backed.', '公開ワークフロー。検証はrashidが担当。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }

.lane.validate, .upcoming { opacity: 0; }
.lane.validate.on, .upcoming.on { animation: reveal 420ms ease-out both; }
.lane-num { fill: var(--c-accent); font-size: 20px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.lane-title { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.055em; }
.lane-ja { fill: var(--c-muted); font-size: 15px; font-weight: 750; font-family: 'Noto Sans JP', sans-serif; }
.rule { stroke-width: 3; stroke-linecap: round; }
.rule.accent { stroke: var(--c-accent); }
.rule.ok { stroke: var(--c-ok); }
.rule.muted { stroke: var(--c-line); }
.terminal { fill: var(--c-fg); }
.command { fill: var(--c-bg); font-size: 15px; font-weight: 800; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.command.dark { fill: var(--c-fg); font-size: 18px; }
.ask-label { fill: var(--c-accent); font-size: 15px; font-weight: 900; letter-spacing: 0.08em; }
.ask { fill: var(--c-fg); font-size: 18px; font-weight: 850; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.other { fill: var(--c-muted); font-size: 16px; font-weight: 750; }
.ok-text { fill: var(--c-ok); }
.verdict { fill: var(--c-ok); font-size: 16px; font-weight: 850; }
.upcoming-label { fill: var(--c-warn); font-size: 15px; font-weight: 900; letter-spacing: 0.045em; }
.upcoming-flow { fill: var(--c-fg); font-size: 18px; font-weight: 900; font-family: ui-monospace, 'JetBrains Mono', Menlo, monospace; }
.upcoming-note { fill: var(--c-muted); font-size: 15px; font-weight: 750; }
</style>
