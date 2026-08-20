<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { isPrintMode } = useNav()
const ready = computed(() => isPrintMode.value || true)
</script>

<template>
  <div class="stage bio-stage" :class="{ ready }">
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         aria-label="Youssef Harby is a Software Engineer at CARTO. Contact: youssef@carto.com.">
      <defs>
        <clipPath id="portrait-clip">
          <circle cx="160" cy="201" r="95" />
        </clipPath>
      </defs>
      <circle cx="160" cy="201" r="99" class="portrait-disc" />
      <image href="/youssef-harby.jpg" x="65" y="106" width="190" height="190"
             preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait-clip)" />

      <path d="M286 92 H744" class="bio-rule" />
      <text x="286" y="152" class="name">Youssef Harby</text>
      <a href="https://carto.com/" target="_blank" rel="noopener noreferrer"
         class="svg-source-link" aria-label="Open the CARTO website in a new tab" @click.stop>
        <text x="286" y="196" class="role link-label">Software Engineer at CARTO</text>
      </a>
      <a href="mailto:youssef@carto.com" class="svg-source-link"
         aria-label="Email Youssef Harby" @click.stop>
        <text x="286" y="228" class="email link-label">youssef@carto.com</text>
      </a>

      <line x1="286" y1="252" x2="744" y2="252" class="detail-rule" />
      <lucide-users-round x="286" y="272" width="26" height="26" class="detail-icon" />
      <g class="memberships">
        <a href="https://www.osgeo.org/member/zakhary/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open Youssef Harby's OSGeo member profile in a new tab" @click.stop>
          <text x="326" y="286" class="detail link-label">OSGeo Charter Member</text>
        </a>
        <a href="https://www.ogc.org/about-ogc/members/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the OGC membership page in a new tab" @click.stop>
          <text x="326" y="316" class="detail link-label">OGC Member</text>
        </a>
        <text x="414" y="316" class="detail separator">·</text>
        <a href="https://cloudnativegeo.org/" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" aria-label="Open the Cloud-Native Geospatial website in a new tab" @click.stop>
          <text x="430" y="316" class="detail link-label">Cloud-Native Geospatial Member</text>
        </a>
      </g>

      <lucide-git-pull-request x="286" y="333" width="26" height="26" class="detail-icon contributor-icon" />
      <a href="https://github.com/yharby" target="_blank" rel="noopener noreferrer"
         class="svg-source-link" aria-label="Open Youssef Harby's GitHub profile in a new tab" @click.stop>
        <text x="326" y="350" class="contributor link-label">CNG builder · FOSS contributor</text>
      </a>

      <a href="https://youssefharby.com/" target="_blank" rel="noopener noreferrer"
         class="svg-source-link" aria-label="Open Youssef Harby's website in a new tab" @click.stop>
        <rect x="112" y="326" width="96" height="96" rx="2" class="qr-frame link-target" />
        <image href="/qr-youssefharby.svg" x="120" y="334" width="80" height="80" preserveAspectRatio="xMidYMid meet" />
      </a>
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
.name { fill: var(--c-fg); font-size: 44px; font-weight: 900; }
.role { fill: var(--c-muted); font-size: 23px; font-weight: 750; }
.email { fill: var(--c-accent); font-size: 18px; font-weight: 750; }
.detail-rule { stroke: var(--c-line); stroke-width: 2; }
.detail-icon { color: var(--c-portolan); }
.contributor-icon { color: var(--c-ok); }
.detail { fill: var(--c-fg); font-size: 13px; font-weight: 800; }
.separator { fill: var(--c-muted); }
.contributor { fill: var(--c-fg); font-size: 14px; font-weight: 850; }
.qr-frame { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 2; }
</style>
