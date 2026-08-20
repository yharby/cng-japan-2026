import { computed, readonly, ref } from 'vue'

export type DeckLocale = 'en' | 'ja'

const STORAGE_KEY = 'cng-japan-2026-locale'
const configuredDefault = import.meta.env.VITE_DECK_LOCALE === 'ja' ? 'ja' : 'en'
const locale = ref<DeckLocale>(configuredDefault)
let initialized = false

function normalizeLocale(value: string | null | undefined): DeckLocale | null {
  return value === 'ja' || value === 'en' ? value : null
}

function applyDocumentLocale(value: DeckLocale) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.deckLocale = value
  document.documentElement.lang = value
}

export function initializeDeckLocale() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  const queryLocale = normalizeLocale(new URL(window.location.href).searchParams.get('lang'))
  const storedLocale = normalizeLocale(window.sessionStorage.getItem(STORAGE_KEY))
  locale.value = queryLocale ?? storedLocale ?? configuredDefault
  window.sessionStorage.setItem(STORAGE_KEY, locale.value)
  applyDocumentLocale(locale.value)
}

export function setDeckLocale(value: DeckLocale) {
  initializeDeckLocale()
  locale.value = value
  applyDocumentLocale(value)

  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(STORAGE_KEY, value)
  const url = new URL(window.location.href)
  url.searchParams.set('lang', value)
  window.history.replaceState(window.history.state, '', url)
}

export function useDeckLocale() {
  initializeDeckLocale()
  const isJapanese = computed(() => locale.value === 'ja')
  const tr = (english: string, japanese: string) => isJapanese.value ? japanese : english

  return {
    locale: readonly(locale),
    isJapanese,
    tr,
    setLocale: setDeckLocale,
    toggleLocale: () => setDeckLocale(locale.value === 'en' ? 'ja' : 'en'),
  }
}
