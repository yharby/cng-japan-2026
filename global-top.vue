<script setup lang="ts">
import { useNav } from '@slidev/client'
import { useDeckLocale } from './composables/useDeckLocale'

const { isPrintMode } = useNav()
const { locale, setLocale, tr } = useDeckLocale()
</script>

<template>
  <nav v-if="!isPrintMode" class="deck-language-switch" :aria-label="tr('Presentation language', 'プレゼンテーション言語')">
    <button type="button" :class="{ active: locale === 'en' }" :aria-pressed="locale === 'en'"
            @click.stop="setLocale('en')">
      EN
    </button>
    <span aria-hidden="true"></span>
    <button type="button" :class="{ active: locale === 'ja' }" :aria-pressed="locale === 'ja'"
            @click.stop="setLocale('ja')">
      日本語
    </button>
  </nav>
</template>

<style scoped>
.deck-language-switch {
  position: fixed;
  z-index: 50;
  top: 0.52rem;
  right: 0.72rem;
  display: flex;
  align-items: center;
  gap: 0.34rem;
  padding: 0.2rem 0.32rem;
  border: 1px solid var(--c-line);
  background: color-mix(in srgb, var(--c-bg) 92%, transparent);
  color: var(--c-muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.46rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.68;
  backdrop-filter: blur(4px);
  transition: opacity 150ms ease;
}

.deck-language-switch:hover,
.deck-language-switch:focus-within {
  opacity: 1;
}

.deck-language-switch span {
  width: 1px;
  height: 0.58rem;
  background: var(--c-line);
}

.deck-language-switch button {
  padding: 0.12rem 0.16rem;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

.deck-language-switch button.active {
  border-bottom-color: var(--c-portolan);
  color: var(--c-fg);
}

.deck-language-switch button:focus-visible {
  outline: 2px solid var(--c-portolan);
  outline-offset: 2px;
}
</style>
