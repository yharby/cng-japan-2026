<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const ready = computed(() => isPrintMode.value || true)
</script>

<template>
  <div class="stage bio-stage" :class="{ ready }">
    <svg class="canvas" viewBox="0 0 800 460" role="img"
         aria-label="Youssef Harby is a Software Engineer at CARTO. Contact: youssef@carto.com.">
      <defs>
        <clipPath id="portrait-clip">
          <circle cx="186" cy="201" r="102" />
        </clipPath>
      </defs>
      <circle cx="186" cy="201" r="105" class="portrait-disc" />
      <image href="/youssef-harby.jpg" x="84" y="99" width="204" height="204"
             preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait-clip)" />

      <path d="M340 120 H724" class="bio-rule" />
      <text x="340" y="190" class="name">Youssef Harby</text>
      <text x="340" y="239" class="role">Software Engineer at CARTO</text>
      <text x="340" y="287" class="email">youssef@carto.com</text>
    </svg>
  </div>
</template>

<style scoped>
@keyframes bio-rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.bio-stage { opacity: 0; }
.bio-stage.ready { animation: bio-rise 460ms ease-out both; }
.portrait-disc { fill: var(--c-panel); stroke: var(--c-accent); stroke-width: 4; }
.bio-rule { stroke: var(--c-accent); stroke-width: 4; }
.name { fill: var(--c-fg); font-size: 50px; font-weight: 900; }
.role { fill: var(--c-muted); font-size: 25px; font-weight: 750; }
.email { fill: var(--c-accent); font-size: 21px; font-weight: 750; }
</style>
