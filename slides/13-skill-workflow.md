---
clicks: 4
layout: default
hideInToc: true
---

# Skills guide agents through repeatable work
<p class="ja">スキルは魔法ではなく、AIのための作業マニュアルです。</p>

<VizSkillFlow />

<div class="bi">
  <span class="en">The agent inspects metadata, schema, and CRS before DuckDB queries remote GeoParquet and reuses published map assets.</span>
  <span class="deck-ja">エージェントはメタデータ、スキーマ、CRSを確認し、DuckDBでGeoParquetを遠隔クエリして公開済み地図Assetを再利用します。</span>
</div>

<!--
[Say in English]
"A skill is not a new engine. It is a work manual for the AI. We start at the catalog and follow its links."

[Click 1]
"Next, inspect the schema and the coordinate system. Do this before a large query."

[Click 2]
"Now DuckDB can query the data. Filter early, and begin with a small limit."

[Click 3]
"For a map, reuse the published PMTiles and style. MapLibre does that work."

[Click 4]
"Finally, show the SQL, the measured result, and the map. Another person can check the answer. The skill guides; the engines execute."

[Sources]
- https://github.com/portolan-sdi/portolan-skills/blob/main/skills/reading-portolan/SKILL.md
- https://duckdb.org/docs/stable/core_extensions/httpfs/https
- https://maplibre.org/
-->
