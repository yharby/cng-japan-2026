---
clicks: 3
layout: default
hideInToc: true
---

# Rashid gives humans and AI agents the same checklist
<p class="ja">Rashidは人とAIエージェントに同じチェックリストを提供します。</p>

<VizValidation />

<div class="bi">
  <span class="en">Rashid checks 106 requirements. The remaining 22 stay explicit for publisher review.</span>
  <span class="deck-ja">Rashidが106要件を検証し、残り22要件は公開者が明示的にレビューします。</span>
</div>

<!--
[Say in English]
"After the CLI creates the candidate publication, Rashid applies one deterministic checklist. A person, CI job, or AI agent can run the same checks and receive the same conformance result. Release 0.1.2 has 128 requirements: 106 assigned to validator enforcement and 22 assigned to publishing process."

[Click 1]
"First, Rashid checks the STAC tree, required files, roles, license, provenance, and other metadata rules. Stable rule IDs, file paths, and fix hints make each finding actionable for a human or agent."

[Click 2]
"Next, it can inspect real GeoParquet and COG bytes. Schema and live hosting passes add deeper checks for data shape, range support, CORS, and actual URLs."

[Click 3]
"The remaining process checklist stays visible. The publisher still judges upstream meaning, translation quality, whether the license applies to the chosen asset, and whether publication is responsible. Machine conformance is necessary; it is not editorial judgment."

[Sources]
- https://github.com/portolan-sdi/portolan-spec/blob/v0.1.2/specs/portolan/requirements.yaml
- https://github.com/portolan-sdi/portolan-spec/releases/tag/v0.1.2
- https://github.com/portolan-sdi/rashid/releases/tag/v0.1.7
- https://github.com/portolan-sdi/rashid/blob/bb2906b17b5775b11196189a448746fbf2d4ad52/README.md
- https://github.com/portolan-sdi/rashid/blob/bb2906b17b5775b11196189a448746fbf2d4ad52/docs/rules.md
-->
