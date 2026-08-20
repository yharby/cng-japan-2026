<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))

const steps = [
  { x: 72, name: 'portolan-spec', role: 'DEFINES', at: 1 },
  { x: 203, name: 'portolan-cli', role: 'BUILDS', at: 1 },
  { x: 334, name: 'rashid', role: 'VALIDATES', at: 2 },
  { x: 465, name: 'STATIC HTTP', role: 'PUBLISHES', at: 2 },
  { x: 580, name: 'registry', role: 'REGISTERS', at: 3 },
  { x: 735, name: 'browser', role: 'EXPLORES', at: 3 },
]
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="The Portolan lifecycle is: the specification defines, the CLI builds, rashid validates, static HTTP publishes, the registry registers, and the browser explores. Portolan Skills supports agent work across build, validate and publish.">
      <text x="400" y="34" text-anchor="middle" class="kicker">ONE OPEN LIFECYCLE</text>

      <!-- Directional connectors are drawn behind the milestones. -->
      <path d="M72 183 H735" class="flow" />
      <path v-for="x in [137, 268, 399, 530, 661]" :key="x" :d="`M${x - 9} 174 L${x} 183 L${x - 9} 192`" class="arrow-head" />

      <g v-for="(step, i) in steps" :key="step.name" class="step"
         :class="{ on: s >= step.at }" :transform="`translate(${step.x} 183)`">
        <circle r="35" class="step-disc" />
        <text y="7" text-anchor="middle" class="step-num">{{ i + 1 }}</text>
        <text y="-68" text-anchor="middle" class="step-name">{{ step.name }}</text>
        <text y="76" text-anchor="middle" class="step-role">{{ step.role }}</text>
      </g>

      <g class="skills" :class="{ on: s >= 3 }">
        <path d="M177 310 V331 H530 V310" class="skills-bracket" />
        <path d="M203 310 V275 M334 310 V275 M465 310 V275" class="skills-link" />
        <text x="353" y="368" text-anchor="middle" class="skills-title">portolan-skills</text>
        <text x="353" y="396" text-anchor="middle" class="skills-copy">agent support for build · validate · publish</text>
      </g>

      <g class="outcome">
        <path d="M574 345 H754" />
        <text x="664" y="374" text-anchor="middle" class="outcome-main">A FINDABLE CATALOG</text>
        <text x="664" y="401" text-anchor="middle" class="outcome-note">open parts · one predictable path</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes eco-focus {
  from { opacity: 0.38; }
  to { opacity: 1; }
}

.kicker { fill: var(--c-muted); font-size: 18px; font-weight: 900; letter-spacing: 0.09em; }
.flow { fill: none; stroke: var(--c-line); stroke-width: 5; stroke-linecap: round; }
.arrow-head { fill: none; stroke: var(--c-portolan); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.step { opacity: 0.42; }
.step.on { animation: eco-focus 430ms cubic-bezier(0.2, 0.8, 0.3, 1) both; }
.step-disc { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.step.on .step-disc { fill: var(--c-portolan); stroke: var(--c-portolan); }
.step-num { fill: var(--c-fg); font-size: 22px; font-weight: 900; }
.step.on .step-num { fill: var(--c-bg); }
.step-name { fill: var(--c-fg); font-size: 15px; font-weight: 900; font-family: 'JetBrains Mono', ui-monospace, monospace; }
.step-role { fill: var(--c-muted); font-size: 15px; font-weight: 900; letter-spacing: 0.045em; }
.step.on .step-role { fill: var(--c-portolan); }
.skills { opacity: 0.42; }
.skills.on { animation: eco-focus 460ms ease-out both; }
.skills-bracket, .skills-link { fill: none; stroke: var(--c-ok); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.skills-link { stroke-width: 3; stroke-dasharray: 6 6; }
.skills-title { fill: var(--c-fg); font-size: 24px; font-weight: 900; font-family: 'JetBrains Mono', ui-monospace, monospace; }
.skills-copy { fill: var(--c-muted); font-size: 16px; font-weight: 700; }
.outcome path { stroke: var(--c-portolan); stroke-width: 3; }
.outcome-main { fill: var(--c-fg); font-size: 18px; font-weight: 900; letter-spacing: 0.045em; }
.outcome-note { fill: var(--c-muted); font-size: 14px; font-weight: 700; }
</style>
