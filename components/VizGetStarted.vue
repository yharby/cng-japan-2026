<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Two runnable paths available today. Install the Portolan Claude plugin and ask for the reading-portolan skill, or install rashid and check a local catalog. A separate footer marks the Portolan CLI lifecycle on current main as upcoming 1.0 work.">
      <g class="lane analyze">
        <text x="42" y="42" class="lane-num">01</text>
        <text x="92" y="42" class="lane-title">ANALYZE TODAY</text>
        <text x="758" y="42" text-anchor="end" class="lane-ja">スキルで調べる</text>
        <line x1="42" y1="58" x2="758" y2="58" class="rule accent" />

        <rect x="42" y="76" width="716" height="92" rx="14" class="terminal" />
        <text x="64" y="108" class="command">$ claude plugin marketplace add portolan-sdi/portolan-skills</text>
        <text x="64" y="142" class="command">$ claude plugin install portolan</text>
        <text x="42" y="198" class="ask-label">ASK</text>
        <text x="98" y="198" class="ask">Use portolan:reading-portolan to answer this question.</text>
        <text x="42" y="224" class="other">Gemini, Codex, and other agents can use the same SKILL.md files.</text>
      </g>

      <g class="lane validate" :class="{ on: s >= 1 }">
        <text x="42" y="266" class="lane-num ok-text">02</text>
        <text x="92" y="266" class="lane-title">VALIDATE TODAY</text>
        <text x="758" y="266" text-anchor="end" class="lane-ja">公開前に確認する</text>
        <line x1="42" y1="282" x2="758" y2="282" class="rule ok" />
        <text x="64" y="320" class="command dark">$ uv tool install rashid</text>
        <text x="64" y="354" class="command dark">$ rashid check ./catalog</text>
        <text x="520" y="338" class="verdict">exit 0 = no MUST broken</text>
      </g>

      <g class="upcoming" :class="{ on: s >= 2 }">
        <line x1="42" y1="386" x2="758" y2="386" class="rule muted" />
        <text x="42" y="418" class="upcoming-label">CURRENT MAIN · UPCOMING 1.0</text>
        <text x="758" y="418" text-anchor="end" class="upcoming-flow">portolan init → add → check → push</text>
        <text x="42" y="445" class="upcoming-note">Publishing workflow; the check is rashid-backed.</text>
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
