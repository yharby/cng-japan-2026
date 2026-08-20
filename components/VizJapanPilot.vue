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
    <svg class="canvas" viewBox="0 0 800 460" role="group"
         :aria-label="tr('A concrete Japanese pilot plan. Choose one license-audited input from JAXA AW3D30, GSI, or Pacific Spatial. Publish one Portolan catalog with linked JSON, documentation, and a cloud-native asset. It is complete only when the license is stated, rashid passes, range requests and CORS work, and a registry pull request is open.', '具体的な日本パイロット案です。ライセンス確認済みのJAXA AW3D30、GSI、Pacific Spatialから入力を1つ選び、リンクされたJSON、文書、クラウドネイティブ資産を持つPortolanカタログを1つ公開します。ライセンス明記、rashid合格、rangeとCORSの動作、registry PRの4条件で完了です。')">
      <text x="400" y="28" text-anchor="middle" class="kicker">{{ tr('CHOOSE ONE · PUBLISH ONE · CHECK FOUR', '1つ選ぶ · 1つ公開 · 4項目で確認') }}</text>

      <g class="candidates" :class="{ on: s >= 1 }">
        <rect x="28" y="54" width="205" height="330" rx="12" class="panel" />
        <text x="48" y="84" class="panel-title">{{ tr('CANDIDATES', '候補入力') }}</text>

        <a href="https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d30/aw3d30_e.htm" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the JAXA AW3D30 dataset page in a new tab', 'JAXA AW3D30データセットページを新しいタブで開く')" @click.stop>
          <g class="candidate-row">
            <rect x="44" y="104" width="173" height="70" rx="7" class="link-target" />
            <lucide-satellite x="58" y="123" width="32" height="32" class="candidate-icon" />
            <text x="103" y="125" class="candidate-name link-label">JAXA AW3D30</text>
            <text x="103" y="145" class="candidate-format">GeoTIFF → COG</text>
            <text x="103" y="162" class="candidate-license conditional">{{ tr('NOTICE IF COMMERCIAL', '商用時は事前通知') }}</text>
          </g>
        </a>

        <a href="https://github.com/gsi-cyberjapan/optimal_bvmap" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr(`Open GSI's PMTiles trial repository in a new tab`, 'GSIのPMTiles試行リポジトリを新しいタブで開く')" @click.stop>
          <g class="candidate-row">
            <rect x="44" y="188" width="173" height="70" rx="7" class="link-target" />
            <lucide-layout-grid x="58" y="207" width="32" height="32" class="candidate-icon" />
            <text x="103" y="209" class="candidate-name link-label">GSI</text>
            <text x="103" y="229" class="candidate-format">PMTiles</text>
            <text x="103" y="246" class="candidate-license">PDL1.0 · {{ tr('ATTRIBUTION', '出典表示') }}</text>
          </g>
        </a>

        <a href="https://source.coop/repositories/pacificspatial/flateau/description" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr(`Open Pacific Spatial's Flateau dataset on Source Cooperative in a new tab`, 'Source Cooperative上のPacific Spatial Flateauデータセットを新しいタブで開く')" @click.stop>
          <g class="candidate-row">
            <rect x="44" y="272" width="173" height="70" rx="7" class="link-target" />
            <lucide-building-2 x="58" y="291" width="32" height="32" class="candidate-icon" />
            <text x="103" y="293" class="candidate-name candidate-small link-label">PACIFIC SPATIAL</text>
            <text x="103" y="313" class="candidate-format compact-format">PLATEAU → GeoParquet</text>
            <text x="103" y="330" class="candidate-license">CC BY 4.0</text>
          </g>
        </a>

        <text x="130" y="367" text-anchor="middle" class="caveat">{{ tr('not Portolan deployments', 'Portolan導入事例ではない') }}</text>
      </g>

      <path d="M233 219 H274 M267 213 L274 219 L267 225" class="flow" :class="{ on: s >= 2 }" />

      <g class="catalog" :class="{ on: s >= 2 }">
        <rect x="274" y="54" width="252" height="330" rx="12" class="panel" />
        <lucide-folder-open x="294" y="71" width="34" height="34" class="catalog-icon" />
        <text x="340" y="84" class="panel-title">{{ tr('JP PILOT CATALOG', '日本パイロットの公開物') }}</text>
        <text x="340" y="103" class="catalog-url">https://…/jp-pilot/</text>

        <a href="https://github.com/radiantearth/stac-spec/blob/master/catalog-spec/catalog-spec.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the STAC Catalog specification in a new tab', 'STAC Catalog仕様を新しいタブで開く')" @click.stop>
          <g class="file-row">
            <lucide-file-json-2 x="298" y="128" width="25" height="25" />
            <text x="336" y="147" class="file-name link-label">catalog.json</text>
          </g>
        </a>
        <a href="https://github.com/radiantearth/stac-spec/blob/master/collection-spec/collection-spec.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the STAC Collection specification in a new tab', 'STAC Collection仕様を新しいタブで開く')" @click.stop>
          <g class="file-row">
            <lucide-file-json-2 x="298" y="170" width="25" height="25" />
            <text x="336" y="189" class="file-name link-label">collection.json</text>
          </g>
        </a>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/README.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open a reference catalog README.md file in a new tab', '参照カタログのREADME.mdを新しいタブで開く')" @click.stop>
          <g class="file-row">
            <lucide-file-text x="298" y="212" width="25" height="25" />
            <text x="336" y="231" class="file-name link-label">README.md</text>
          </g>
        </a>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces/AGENTS.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open a reference catalog AGENTS.md file in a new tab', '参照カタログのAGENTS.mdを新しいタブで開く')" @click.stop>
          <g class="file-row">
            <lucide-file-text x="298" y="254" width="25" height="25" />
            <text x="336" y="273" class="file-name link-label">AGENTS.md</text>
          </g>
        </a>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/specs/portolan/formats.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Portolan format requirements in a new tab', 'Portolan形式要件を新しいタブで開く')" @click.stop>
          <g class="file-row">
            <lucide-database x="298" y="296" width="25" height="25" />
            <text x="336" y="315" class="file-name asset-name link-label">COG / GeoParquet asset</text>
          </g>
        </a>
        <text x="400" y="359" text-anchor="middle" class="catalog-note">{{ tr('linked JSON · docs · stable asset URL', 'リンクJSON · 文書 · 安定した資産URL') }}</text>
      </g>

      <path d="M526 219 H564 M557 213 L564 219 L557 225" class="flow" :class="{ on: s >= 3 }" />

      <g class="done" :class="{ on: s >= 3 }">
        <rect x="564" y="54" width="208" height="330" rx="12" class="panel" />
        <text x="584" y="84" class="panel-title">{{ tr('DONE WHEN', '完了条件') }}</text>

        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/specs/portolan/core.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Portolan core requirements in a new tab', 'Portolan中核要件を新しいタブで開く')" @click.stop>
          <g class="check-row">
            <lucide-circle-check-big x="584" y="116" width="27" height="27" />
            <text x="624" y="136" class="check-name link-label">{{ tr('license stated', 'ライセンス明記') }}</text>
          </g>
        </a>
        <a href="https://github.com/portolan-sdi/rashid" target="_blank" rel="noopener noreferrer"
           class="svg-source-link" :aria-label="tr('Open the Rashid validator repository in a new tab', 'Rashid検証ツールのリポジトリを新しいタブで開く')" @click.stop>
          <g class="check-row">
            <lucide-circle-check-big x="584" y="174" width="27" height="27" />
            <text x="624" y="194" class="check-name link-label">rashid PASS</text>
          </g>
        </a>
        <a href="https://github.com/portolan-sdi/portolan-spec/blob/main/specs/portolan/core.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the Portolan HTTP access requirements in a new tab', 'Portolan HTTPアクセス要件を新しいタブで開く')" @click.stop>
          <g class="check-row">
            <lucide-circle-check-big x="584" y="232" width="27" height="27" />
            <text x="624" y="252" class="check-name link-label">range + CORS</text>
          </g>
        </a>
        <a href="https://github.com/portolan-sdi/portolan-skills/blob/main/skills/register-catalog/SKILL.md"
           target="_blank" rel="noopener noreferrer" class="svg-source-link"
           :aria-label="tr('Open the catalog registration skill in a new tab', 'カタログ登録スキルを新しいタブで開く')" @click.stop>
          <g class="check-row">
            <lucide-circle-check-big x="584" y="290" width="27" height="27" />
            <text x="624" y="310" class="check-name link-label">registry PR</text>
          </g>
        </a>
        <text x="668" y="359" text-anchor="middle" class="done-note">{{ tr('all four are public facts', '4項目すべてを公開確認') }}</text>
      </g>

      <g class="footer">
        <path d="M28 408 H772" />
        <text x="400" y="440" text-anchor="middle">{{ tr('Only the dataset and accountable publisher remain to be chosen.', '未決定なのは、データセットと責任を持つ公開者だけ。') }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes jp-focus {
  from { opacity: 0.3; transform: translateY(5px); }
  to { opacity: 1; transform: none; }
}

.kicker { fill: var(--c-muted); font-size: 17px; font-weight: 900; letter-spacing: 0.08em; }
.candidates, .catalog, .done { opacity: 0.3; }
.candidates.on, .catalog.on, .done.on { animation: jp-focus 420ms ease-out both; }
.panel { fill: var(--c-panel); stroke: var(--c-line); stroke-width: 2.5; }
.candidates.on .panel, .catalog.on .panel { stroke: var(--c-portolan); }
.done.on .panel { stroke: var(--c-ok); }
.panel-title { fill: var(--c-fg); font-size: 14px; font-weight: 900; letter-spacing: 0.055em; }
.panel-note, .catalog-note, .done-note { fill: var(--c-muted); font-size: 10px; font-weight: 750; }
.caveat { fill: var(--c-muted); font-size: 9px; font-weight: 750; }
.candidate-row rect { fill: var(--c-bg); stroke: var(--c-line); stroke-width: 1.75; }
.candidate-icon, .catalog-icon { color: var(--c-portolan); }
.candidate-name { fill: var(--c-fg); font-size: 16px; font-weight: 900; }
.candidate-small { font-size: 11px; letter-spacing: 0.015em; }
.candidate-format { fill: var(--c-muted); font-size: 10px; font-weight: 800; }
.candidate-license { fill: var(--c-ok); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 850; letter-spacing: 0.015em; }
.candidate-license.conditional { fill: var(--c-warn); }
.compact-format { font-size: 9px; }
.flow { fill: none; stroke: var(--c-line); stroke-width: var(--w-connector); stroke-linecap: round; stroke-linejoin: round; }
.flow.on { stroke: var(--c-portolan); }
.catalog-url { fill: var(--c-muted); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700; }
.file-row { color: var(--c-portolan); }
.file-name { fill: var(--c-fg); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 850; }
.asset-name { font-size: 11px; }
.check-row { color: var(--c-ok); }
.check-name { fill: var(--c-fg); font-size: 14px; font-weight: 850; }
.footer path { stroke: var(--c-accent); stroke-width: 2.5; }
.footer text { fill: var(--c-fg); font-size: 17px; font-weight: 850; }
</style>
