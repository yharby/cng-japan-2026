<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  title: string
  text: string
}>()

const caption = ref<HTMLElement | null>(null)
const scale = ref(1)
let fitRun = 0

const captionStyle = computed(() => ({ fontSize: `${0.82 * scale.value}em` }))

async function fitOnOneLine() {
  const run = ++fitRun
  scale.value = 1
  await nextTick()

  const element = caption.value
  if (!element || run !== fitRun) return

  const available = element.clientWidth
  const required = element.scrollWidth
  scale.value = required > available ? Math.max(0.01, (available - 2) / required) : 1
}

watch(() => [props.title, props.text], fitOnOneLine, { flush: 'post' })

onMounted(() => {
  fitOnOneLine()
  window.addEventListener('resize', fitOnOneLine)
})

onBeforeUnmount(() => window.removeEventListener('resize', fitOnOneLine))
</script>

<template>
  <div ref="caption" class="slide-caption" :style="captionStyle">
    <strong>{{ title }}</strong>
    <span>{{ text }}</span>
  </div>
</template>

<style scoped>
.slide-caption {
  flex: 0 0 auto;
  display: flex;
  width: 100%;
  min-width: 0;
  gap: 0.65em;
  align-items: baseline;
  margin-top: 0.15em;
  font-weight: 700;
  line-height: 1.25;
  white-space: nowrap;
}

.slide-caption strong {
  flex: 0 0 auto;
  color: var(--c-portolan);
  font-size: 1.22em;
  font-weight: 900;
}

.slide-caption span { flex: 0 0 auto; }
</style>
