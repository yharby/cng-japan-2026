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
    <div class="canvas community-proof" data-view-box="0 0 800 460" role="group"
         :aria-label="tr('A Cloud Native Geospatial community message reports that one prompt and Portolan Claude skills turned existing field-boundary data into a Git-backed, browsable Portolan catalog. The public catalog links three collections and 2,630,704 latest field records.', 'Cloud Native Geospatialコミュニティの投稿では、1つのプロンプトとPortolan Claudeスキルにより、既存の農地区画データがGit管理の閲覧可能なPortolanカタログになったと報告されています。公開カタログは3つのCollectionと最新版2,630,704件をリンクしています。')">
      <figure class="shot-card">
        <img src="/community-harmonized-field-data.png"
             :alt="tr('Community screenshot describing the first Harmonized Field Boundary Data Portolan catalog and the bootstrap prompt used to create it', 'Harmonized Field Boundary Dataの最初のPortolanカタログと、作成に使ったブートストラップ用プロンプトを説明するコミュニティのスクリーンショット')" />
        <figcaption>{{ tr('COMMUNITY REPORT · 22 AUG 2026', 'コミュニティ報告 · 2026年8月22日') }}</figcaption>
      </figure>

      <div class="proof-story">
        <div class="eyebrow">{{ tr('FROM ONE PROMPT TO A PUBLICATION', '1つのプロンプトから公開へ') }}</div>

        <blockquote>
          “{{ tr('It was really easy with the Portolan Claude skills.', 'Portolan Claudeスキルで本当に簡単でした。') }}”
        </blockquote>

        <div class="step" :class="{ on: s >= 1, active: s === 1 }">
          <span class="step-number">1</span>
          <div>
            <strong>{{ tr('HUMAN SETS THE CONTRACT', '人が公開方針を決める') }}</strong>
            <p>{{ tr('existing source · fiboa-cli · Git-backed · repeatable updates', '既存ソース · fiboa-cli · Git管理 · 継続更新') }}</p>
          </div>
        </div>

        <div class="connector" :class="{ on: s >= 1 }"><lucide-arrow-down /></div>

        <div class="step" :class="{ on: s >= 1, active: s === 1 }">
          <span class="step-number">2</span>
          <div>
            <strong>{{ tr('SKILLS GUIDE THE WORK', 'スキルが作業を導く') }}</strong>
            <p>portolan-bootstrap · git-backed-catalog</p>
          </div>
        </div>

        <div class="connector" :class="{ on: s >= 2 }"><lucide-arrow-down /></div>

        <a class="step result source-link" :class="{ on: s >= 2, active: s >= 2 }"
           href="https://data.source.coop/ftw/harmonized-field-data/catalog.json"
           target="_blank" rel="noopener noreferrer" @click.stop>
          <span class="step-number"><lucide-external-link /></span>
          <div>
            <strong>{{ tr('PUBLIC PORTOLAN CATALOG', '公開PORTOLANカタログ') }}</strong>
            <p>{{ tr('3 linked collections · 2,630,704 latest records', '3 Collection · 最新2,630,704件') }}</p>
          </div>
        </a>

        <div class="license-note" :class="{ on: s >= 2 }">
          <lucide-badge-check />
          <span>{{ tr('Official, non-AI sources · license stays with each collection', '公的な非AIデータ · ライセンスは各Collectionに保持') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes proof-rise {
  from { opacity: 0.2; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}

.community-proof { display: grid !important; grid-template-columns: 455px 1fr; gap: 24px; }
.shot-card { position: relative; min-width: 0; margin: 0; overflow: hidden; border: 3px solid var(--c-fg); border-radius: 18px; background: white; box-shadow: 8px 8px 0 color-mix(in srgb, var(--c-portolan) 22%, transparent); }
.shot-card img { display: block; width: 100%; height: 100%; object-fit: contain; background: white; }
.shot-card figcaption { position: absolute; left: 12px; bottom: 12px; padding: 6px 9px; border-radius: 7px; background: color-mix(in srgb, var(--c-fg) 92%, transparent); color: var(--c-bg); font-size: 9px; font-weight: 900; letter-spacing: 0.065em; }
.proof-story { display: flex; flex-direction: column; min-width: 0; padding: 6px 0; }
.eyebrow { color: var(--c-portolan); font-size: 13px; font-weight: 900; letter-spacing: 0.07em; }
blockquote { margin: 12px 0 16px; padding: 13px 14px; border-left: 5px solid var(--c-accent); background: var(--c-panel); color: var(--c-fg); font-size: 18px; font-weight: 900; line-height: 1.22; }
.step { display: flex; align-items: center; gap: 11px; min-height: 68px; box-sizing: border-box; padding: 9px 11px; border: 2.5px solid var(--c-line); border-radius: 13px; background: var(--c-panel); opacity: 0.25; color: var(--c-fg); text-decoration: none; }
.step.on { animation: proof-rise 360ms ease-out both; }
.step.active { border-color: var(--c-accent); }
.step.result.active { border-color: var(--c-ok); }
.step-number { display: grid; place-items: center; width: 32px; height: 32px; flex: 0 0 auto; border-radius: 50%; background: var(--c-fg); color: var(--c-bg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 14px; font-weight: 900; }
.result .step-number { background: var(--c-ok); }
.step-number :deep(svg) { width: 15px; height: 15px; }
.step strong { display: block; color: inherit; font-size: 12px; font-weight: 900; letter-spacing: 0.04em; }
.step p { margin: 4px 0 0; color: var(--c-muted); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px; font-weight: 750; line-height: 1.25; }
.connector { display: grid; place-items: center; height: 20px; color: var(--c-line); opacity: 0.3; }
.connector.on { color: var(--c-portolan); opacity: 1; }
.connector :deep(svg) { width: 17px; height: 17px; stroke-width: 3; }
.license-note { display: flex; align-items: center; gap: 8px; margin-top: 11px; color: var(--c-muted); font-size: 9.5px; font-weight: 800; opacity: 0; }
.license-note.on { animation: proof-rise 360ms ease-out both; }
.license-note :deep(svg) { width: 17px; height: 17px; color: var(--c-ok); }
</style>
