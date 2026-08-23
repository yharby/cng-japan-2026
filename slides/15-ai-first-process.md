---
clicks: 5
layout: default
---

# What happens after you ask an agent a data question?
<p class="ja">AIエージェントにデータの質問をすると、裏側で何が起こるのでしょうか。</p>

<VizAgentQuestionPath />

<div class="bi">
  <span class="en">The model turns a decision question into a traceable computation. Public metadata guides it. DuckDB calculates it.</span>
  <span class="deck-ja">モデルが意思決定の質問を追跡可能な計算に変え、公開メタデータが導き、DuckDBが計算します。</span>
</div>

<!--
[Say in English]
"Now let us use the same community catalog. The question is simple: across the three collections linked by this public root, how many latest field records are published, and which collection contributes the most? The answer is not something the model should guess. It must follow the publication contract."

[Click 1]
"First, the agent opens catalog dot JSON and follows its three explicit child links. This matters because a storage prefix can contain work that is not yet part of the public catalog. The linked graph is the publication boundary."

[Click 2]
"Next, it reads the published AGENTS dot md. The guide explains stable latest paths, source coordinate systems, schema differences, and the rule that licenses and structural links belong to the objects that carry them."

[Click 3]
"Then it inspects the three Collection objects. It resolves one latest GeoParquet URL per linked collection and records each source provider, CRS, row count, and license. There is no blanket license for the root."

[Click 4]
"The agent writes a DuckDB query over those three explicit URLs, using union by name because source schemas differ. Counting Parquet rows is the engine's job; choosing only catalog-linked assets is the agent's planning job."

[Click 5]
"Finally, it reports 2,630,704 latest records. The Netherlands collection is largest with 1,293,962, or 49.2 percent. The answer includes the exact URLs, query, date, and the caveat that edition years, coordinate systems, and licenses differ."

[Sources]
- https://data.source.coop/ftw/harmonized-field-data/catalog.json
- https://data.source.coop/ftw/harmonized-field-data/AGENTS.md
- https://data.source.coop/ftw/harmonized-field-data/be_vlg/collection.json
- https://data.source.coop/ftw/harmonized-field-data/de_nrw/collection.json
- https://data.source.coop/ftw/harmonized-field-data/nl/collection.json
- https://github.com/fieldsoftheworld/harmonized-field-data-catalog
- https://duckdb.org/docs/stable/data/parquet/overview
-->
