<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const s = computed(() => (isPrintMode.value ? 99 : $clicks.value))
</script>

<template>
  <div class="stage">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="A web portal, map service, database and parallel discovery catalog are operated around the same public data. The catalog is not shown as an inline request hop.">
      <text x="400" y="31" text-anchor="middle" class="kicker">SEVERAL SERVICES · THE SAME PUBLIC DATA</text>

      <!-- Connectors first: the solid request path and the dashed discovery path. -->
      <path d="M64 222 C100 185 120 154 158 144 M302 144 H574 M646 189 C620 213 580 226 536 230" class="request-path" />
      <path d="M64 232 C106 270 122 306 158 318 M302 318 C346 318 355 286 377 265" class="discovery-path" />
      <path d="M574 318 C555 292 540 270 525 255" class="data-path" />

      <g class="user">
        <circle cx="48" cy="226" r="24" />
        <circle cx="48" cy="218" r="8" class="head" />
        <path d="M34 240 C38 226 58 226 62 240" class="person" />
        <text x="48" y="268" text-anchor="middle">USER</text>
      </g>

      <g class="service portal" :class="{ operated: s >= 1 }">
        <rect x="158" y="99" width="144" height="90" rx="16" />
        <text x="230" y="135" text-anchor="middle" class="role">FRONT END</text>
        <text x="230" y="164" text-anchor="middle" class="product">web portal</text>
        <g class="clock"><circle cx="285" cy="112" r="13" /><path d="M285 105 V112 L291 116" /></g>
      </g>

      <g class="service map-service" :class="{ operated: s >= 1 }">
        <rect x="574" y="99" width="144" height="90" rx="16" />
        <text x="646" y="135" text-anchor="middle" class="role role-compact">MAP SERVICE</text>
        <text x="646" y="164" text-anchor="middle" class="product">serves views</text>
        <g class="clock"><circle cx="701" cy="112" r="13" /><path d="M701 105 V112 L707 116" /></g>
      </g>

      <g class="bytes">
        <circle cx="452" cy="232" r="83" />
        <path d="M410 218 H494 V274 H410 Z M410 218 L430 198 H494 V218" class="file" />
        <text x="452" y="299" text-anchor="middle">PUBLIC DATA</text>
      </g>

      <g class="service catalog" :class="{ operated: s >= 1 }">
        <rect x="158" y="273" width="144" height="90" rx="16" />
        <text x="230" y="309" text-anchor="middle" class="role">CATALOG</text>
        <text x="230" y="338" text-anchor="middle" class="product">discovery path</text>
        <g class="clock"><circle cx="285" cy="286" r="13" /><path d="M285 279 V286 L291 290" /></g>
      </g>

      <g class="service database" :class="{ operated: s >= 1 }">
        <rect x="574" y="273" width="144" height="90" rx="16" />
        <text x="646" y="309" text-anchor="middle" class="role">DATABASE</text>
        <text x="646" y="338" text-anchor="middle" class="product">stores the data</text>
        <g class="clock"><circle cx="701" cy="286" r="13" /><path d="M701 279 V286 L707 290" /></g>
      </g>

      <text x="111" y="298" text-anchor="middle" class="discovery-label">DISCOVERY</text>
      <text x="402" y="119" text-anchor="middle" class="request-label">REQUEST PATH</text>

      <g class="summary" :class="{ on: s >= 2 }">
        <path d="M122 410 H678" />
        <text x="400" y="401" text-anchor="middle">UP TO FOUR OPERATED COMPONENTS</text>
        <text x="400" y="438" text-anchor="middle" class="summary-note">deployment · monitoring · updates</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes sx-pop {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@keyframes sx-pulse {
  0%, 100% { stroke-width: 3; }
  50% { stroke-width: 6; }
}

.kicker { fill: var(--c-muted); font-size: 18px; font-weight: 900; letter-spacing: 0.08em; }
.request-path { fill: none; stroke: var(--c-accent); stroke-width: 5; stroke-linecap: round; }
.discovery-path { fill: none; stroke: var(--c-muted); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 8 8; }
.data-path { fill: none; stroke: var(--c-fg); stroke-width: 4; stroke-linecap: round; }
.service > rect { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 3; }
.service.operated > rect { stroke: var(--c-accent); animation: sx-pulse 1.7s ease-in-out infinite; }
.role { fill: var(--c-fg); font-size: 20px; font-weight: 900; letter-spacing: 0.045em; }
.role-compact { font-size: 18px; }
.product { fill: var(--c-muted); font-size: 16px; font-weight: 700; }
.clock { opacity: 0; }
.operated .clock { animation: sx-pop 380ms ease-out both; }
.clock circle { fill: var(--c-bg); stroke: var(--c-accent); stroke-width: 2.5; }
.clock path { fill: none; stroke: var(--c-accent); stroke-width: 2.5; stroke-linecap: round; }
.bytes circle { fill: var(--c-fg); }
.file { fill: none; stroke: var(--c-bg); stroke-width: 4; stroke-linejoin: round; }
.bytes text { fill: var(--c-bg); font-size: 16px; font-weight: 900; letter-spacing: 0.035em; }
.user circle { fill: var(--c-panel); stroke: var(--c-fg); stroke-width: 3; }
.user .head { fill: var(--c-fg); stroke: none; }
.person { fill: none; stroke: var(--c-fg); stroke-width: 4; stroke-linecap: round; }
.user text, .request-label, .discovery-label { fill: var(--c-muted); font-size: 13px; font-weight: 900; letter-spacing: 0.06em; }
.request-label { fill: var(--c-accent); }
.summary { opacity: 0; }
.summary.on { animation: sx-pop 430ms ease-out both; }
.summary path { stroke: var(--c-accent); stroke-width: 3; }
.summary text { fill: var(--c-accent); font-size: 19px; font-weight: 900; letter-spacing: 0.055em; }
.summary .summary-note { fill: var(--c-muted); font-size: 16px; letter-spacing: 0.035em; }
</style>
