<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { useDeckLocale } from '../composables/useDeckLocale'

const { isPrintMode } = useNav()
const { tr } = useDeckLocale()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const phases = computed(() => [
  { name: tr('BUILD', '構築'), hint: tr('publish', '公開'), count: 4, x: 40, y: 52, reveal: 1, start: 72, skills: ['git-backed-catalog', 'portolan-bootstrap', 'portolan-cli', 'sourcecoop'] },
  { name: tr('USE', '利用'), hint: tr('read + analyze', '読込 + 分析'), count: 2, x: 470, y: 52, reveal: 2, start: 86, skills: ['reading-portolan', 'portolan-consume'] },
  { name: tr('IMPROVE', '改善'), hint: tr('repair + review', '修復 + レビュー'), count: 2, x: 470, y: 260, reveal: 3, start: 86, skills: ['portolan-migrate', 'portolan-thumbnails'] },
  { name: tr('NETWORK', '連携'), hint: tr('register + respond', '登録 + 対応'), count: 2, x: 40, y: 260, reveal: 4, start: 86, skills: ['register-catalog', 'report-catalog-issue'] },
])

const skillUrl = (skill: string) => `https://github.com/portolan-sdi/portolan-skills/blob/main/skills/${skill}/SKILL.md`
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('Ten Portolan skills form a lifecycle. Build flows to Use, Use to Improve, Improve to Network, and Network back to Build. The four phases contain four, two, two and two exact skill files.', '10個のPortolanスキルがライフサイクルを形成します。構築から利用、改善、連携を経て構築に戻ります。4つのフェーズに、4・2・2・2個のSKILL.mdがあります。')">
      <defs>
        <marker id="cycle-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8"
                orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M1 1 L7 4 L1 7" class="arrow-head" />
        </marker>
      </defs>

      <text x="400" y="26" text-anchor="middle" class="kicker">{{ tr('TEN SKILLS · ONE REPEATABLE LIFECYCLE', '10個のスキル · 繰り返せるライフサイクル') }}</text>

      <path d="M334 128 H462" class="cycle-line" marker-end="url(#cycle-arrow)" />
      <path d="M615 210 V252" class="cycle-line" marker-end="url(#cycle-arrow)" />
      <path d="M466 336 H338" class="cycle-line" marker-end="url(#cycle-arrow)" />
      <path d="M185 260 V218" class="cycle-line" marker-end="url(#cycle-arrow)" />

      <g class="center-note">
        <rect x="346" y="213" width="108" height="44" rx="22" class="center-body" />
        <text x="400" y="232" text-anchor="middle" class="center-main">{{ tr('OPEN SKILLS', 'オープンスキル') }}</text>
        <text x="400" y="248" text-anchor="middle" class="center-sub">{{ tr('guide each step', '各ステップを支援') }}</text>
      </g>

      <g v-for="phase in phases" :key="phase.name" :transform="`translate(${phase.x} ${phase.y})`">
        <g class="phase" :class="{ visited: s >= phase.reveal, active: s === phase.reveal }">
          <rect width="290" height="154" rx="18" class="phase-body" />
          <rect width="9" height="154" rx="5" class="tone-bar" />
          <text x="26" y="35" class="phase-name">{{ phase.name }}</text>
          <text x="26" y="56" class="phase-hint">{{ phase.hint }}</text>
          <circle cx="258" cy="31" r="17" class="count-disc" />
          <text x="258" y="37" text-anchor="middle" class="count">{{ phase.count }}</text>

          <g class="skill-list">
            <g v-for="(skill, i) in phase.skills" :key="skill">
              <circle cx="30" :cy="phase.start + i * 23 - 5" r="4" class="skill-dot" />
              <a :href="skillUrl(skill)" target="_blank" rel="noopener noreferrer" class="svg-source-link"
                 :class="{ 'is-disabled': s < phase.reveal }" :tabindex="s >= phase.reveal ? 0 : -1"
                 :aria-label="tr(`Open ${skill} SKILL.md in a new tab`, `${skill}のSKILL.mdを新しいタブで開く`)" @click.stop>
                <text x="45" :y="phase.start + i * 23" class="skill-name link-label">{{ skill }}</text>
              </a>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.075em; }
.cycle-line { fill: none; stroke: var(--c-line); stroke-width: var(--w-connector); stroke-linecap: round; }
.arrow-head { fill: none; stroke: var(--c-line); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.center-body { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2.5; }
.center-main { fill: var(--c-accent); font-size: 13px; font-weight: 900; letter-spacing: 0.06em; }
.center-sub { fill: var(--c-muted); font-size: 11px; font-weight: 700; }
.phase { opacity: 0.34; transition: opacity 300ms ease, transform 300ms ease; transform-origin: center; }
.phase.visited { opacity: 0.72; }
.phase.active { opacity: 1; transform: scale(1.025); }
.phase-body { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.phase.active .phase-body { stroke: var(--c-accent); }
.tone-bar { fill: var(--c-accent); }
.phase-name { fill: var(--c-fg); font-size: 22px; font-weight: 900; letter-spacing: 0.07em; }
.phase.active .phase-name { fill: var(--c-accent); }
.phase-hint { fill: var(--c-muted); font-size: 13px; font-weight: 800; }
.count-disc { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
.phase.active .count-disc { stroke: var(--c-accent); }
.count { fill: var(--c-fg); font-size: 15px; font-weight: 900; }
.skill-list { opacity: 0; transition: opacity 250ms ease; }
.phase.visited .skill-list { opacity: 1; }
.skill-dot { fill: var(--c-accent); }
.skill-name { fill: var(--c-fg); font-size: 15px; font-weight: 800; font-family: ui-monospace, 'JetBrains Mono', monospace; }
</style>
