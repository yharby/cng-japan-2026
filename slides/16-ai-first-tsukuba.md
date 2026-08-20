---
clicks: 3
layout: default
---

# Published data turns a survey question into a reproducible estimate
<p class="ja">公開データが、調査計画の質問を再現可能な見積もりに変えます。</p>

<VizTsukubaAnswer />

<div class="bi">
  <span class="en">DuckDB found 4,726 candidate predicted fields. A simple 1% pilot means budgeting 48 visits before access and permission checks.</span>
  <span class="deck-ja">DuckDBは候補となる予測農地区画4,726件を抽出しました。単純な1%試行では、立入・許可確認前に48件を見込みます。</span>
</div>

<!--
[Say in Japanese]
「答えはモデルの記憶ではなく、公開されたGeoParquetから計算されました。」

[Say in English]
"This is the real experiment, run on 21 August 2026 with DuckDB 1.5.5 against the live Japan GeoParquet over HTTPS. The business question is how many candidate visits to budget for a simple one-percent field-survey pilot. The compact terminal on screen shows the important operations; here is the exact query."

```sql
LOAD spatial;
SET geometry_always_xy = true;

WITH candidates AS (
  SELECT geometry, confidence
  FROM read_parquet(
    'https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.parquet'
  )
  WHERE bbox.xmax >= 140.055 AND bbox.xmin <= 140.168
    AND bbox.ymax >= 36.037 AND bbox.ymin <= 36.129
), nearby AS (
  SELECT *
  FROM candidates
  WHERE ST_Distance_Sphere(
    ST_Centroid(geometry),
    ST_Point(140.1114111, 36.0827667)
  ) <= 5000
)
SELECT
  count(*) AS predicted_fields,
  ceil(count(*) * 0.01)::INTEGER AS pilot_visits,
  round(median(ST_Area(ST_Transform(
    geometry, 'EPSG:4326', 'EPSG:32654', always_xy := true
  )))) AS median_area_m2
FROM nearby;
```

[Click 1]
"DuckDB reads the GeoParquet asset directly from its public URL. The bounding-box predicate narrows the candidates before the centroid-distance test and projected-area calculation."

[Click 2]
"The measured candidate pool is 4,726 predicted field boundaries. One percent is 47.26, so the budget estimate rounds up to 48 visits. The median polygon area is 2,981 square meters, useful context for survey planning. DuckDB produced these numbers; the agent turns them into a decision estimate."

[Click 3]
"The caveat matters. This is a simple one-percent budget estimate, not a statistically representative sampling design. The radius is not the legal boundary of Tsukuba city. Access, permission, and routing are not modeled, and the polygons are research predictions, not cadastral truth. Credit Fields of the World, Taylor Geospatial Institute, and Microsoft AI for Good Research Lab under CC BY 4.0."

[Sources]
- https://data.source.coop/ftw/global-data/catalog.json
- https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.json
- https://data.source.coop/ftw/global-data/predictions/vectors/alpha/results-by-admin-conf/admin:country_code=JP/Japan.parquet
- https://github.com/fieldsoftheworld/ftw-data-catalog
- https://duckdb.org/docs/stable/data/parquet/overview
- https://duckdb.org/docs/stable/core_extensions/spatial/overview
- https://duckdb.org/docs/stable/core_extensions/spatial/functions
- https://www.wikidata.org/wiki/Q1069714
- https://creativecommons.org/licenses/by/4.0/
-->
