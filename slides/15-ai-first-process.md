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
[Say in Japanese]
「AIファーストとは、AIが推測で答えることではありません。公開されたリンクをたどり、計算を実行し、根拠を示せることです。」

[Say in English]
"Let us make AI-first concrete with an operational question. A team is planning a one-percent field-survey pilot within five kilometers of Tsukuba Station. They ask how many candidate visits to budget. The answer is not in the language model. The model must find and run a trustworthy path to it."

[Click 1]
"First, the agent opens the Portolan catalog. The catalog advertises both its STAC child links and a dedicated agents link. It does not need a private database connection or a portal-specific API."

[Click 2]
"Before choosing an asset, it reads the published AGENTS dot md. That guide says the directory is a Portolan and STAC object, the data assets live on Source Cooperative, this catalog carries metadata, and relative structural links must be resolved from the current object."

[Click 3]
"Next, it follows the child links to the Japan Item and checks the Item before touching the large asset. It finds the GeoParquet URL, the CRS, the available columns, the CC BY 4.0 license, and the required attribution."

[Click 4]
"Then the agent writes and runs a query plan. It uses bounding boxes as a coarse prefilter, tests polygon centroids against a five-kilometer radius, counts the candidate pool, and calculates a simple one-percent sample rounded up."

[Click 5]
"Finally, the agent reports the estimate together with the method, coordinate source, license, and limitations. That inspectable chain is the AI-first property. The model plans and explains; DuckDB computes."

[Sources]
- https://data.source.coop/ftw/global-data/catalog.json
- https://data.source.coop/ftw/global-data/AGENTS.md
- https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.json
- https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.parquet
- https://github.com/fieldsoftheworld/ftw-data-catalog
- https://duckdb.org/docs/stable/data/parquet/overview
- https://duckdb.org/docs/stable/core_extensions/spatial/functions
- https://www.wikidata.org/wiki/Q1069714
- https://creativecommons.org/licenses/by/4.0/
-->
