---
clicks: 3
layout: default
---

# Portolan separates machine checks from publisher judgment
<p class="ja">Portolanは、機械検証と公開者の判断を分けます。</p>

<VizValidation />

<div class="bi">
  <span class="en">Released v0.1.2 has 128 requirements. 106 are validator-enforced and 22 are process-enforced.</span>
  <span class="deck-ja">リリース版v0.1.2は128要件です。106件はバリデーター、22件は公開プロセスで確認します。</span>
</div>

<!--
[Say in English]
"Release 0.1.2 has 128 normative requirements. The manifest assigns 106 to deterministic validator enforcement and 22 to publishing process. That boundary tells us what Rashid can prove and what the publisher must still own."

[Click 1]
"First, Rashid checks the STAC tree, required files, roles, license, provenance, and other metadata rules."

[Click 2]
"Next, it can inspect real GeoParquet and COG bytes. Schema and live hosting passes add deeper checks for data shape, range support, CORS, and actual URLs."

[Click 3]
"The publisher still judges upstream meaning, translation quality, whether the license really applies to the chosen asset, and whether publication is responsible. Machine conformance is necessary; it is not editorial judgment."

[Sources]
- https://github.com/portolan-sdi/portolan-spec/blob/v0.1.2/specs/portolan/requirements.yaml
- https://github.com/portolan-sdi/portolan-spec/releases/tag/v0.1.2
- https://github.com/portolan-sdi/rashid/releases/tag/v0.1.7
-->
