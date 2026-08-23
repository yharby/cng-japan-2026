---
clicks: 3
layout: default
---

# The catalog boundary makes the answer reproducible
<p class="ja">カタログの境界が、答えを再現可能にします。</p>

<VizTsukubaAnswer />

<div class="bi">
  <span class="en">DuckDB counted 2,630,704 latest records across three linked collections. The Netherlands contributes 49.2%.</span>
  <span class="deck-ja">DuckDBはリンクされた3 Collectionの最新版2,630,704件を集計し、オランダが49.2%を占めました。</span>
</div>

<!--
[Say in English]
"This is the real experiment, run on 23 August 2026 with DuckDB 1.5.5. I used the three latest GeoParquet URLs resolved from the root's child Collections. I did not glob the whole storage prefix, because unlinked files are not part of the public catalog. Here is the exact query."

```sql
LOAD httpfs;
WITH counts AS (
  SELECT regexp_extract(filename,
           '/harmonized-field-data/([^/]+)/latest/', 1) AS collection,
         count(*) AS fields
  FROM read_parquet([
    'https://data.source.coop/ftw/harmonized-field-data/be_vlg/latest/be_vlg.parquet',
    'https://data.source.coop/ftw/harmonized-field-data/de_nrw/latest/de_nrw.parquet',
    'https://data.source.coop/ftw/harmonized-field-data/nl/latest/nl.parquet'
  ], union_by_name = true, filename = true)
  GROUP BY 1
)
SELECT
  collection, fields,
  round(fields * 100.0 / sum(fields) OVER (), 1) AS share_pct,
  sum(fields) OVER () AS total_fields
FROM counts ORDER BY fields DESC;
```

[Click 1]
"DuckDB reads the three latest GeoParquet assets directly over HTTPS. Union by name is necessary because the source schemas differ. The filename keeps each count attached to its Collection."

[Click 2]
"The measured total is 2,630,704 records: 1,293,962 for the Netherlands, 742,010 for North Rhine-Westphalia, and 594,732 for Flanders. The Netherlands share is 49.2 percent. DuckDB produced the numbers; the agent selected and explained the evidence."

[Click 3]
"The scope matters. These are records in the latest editions of the three linked collections, not a count of unique farms or a time series. One source contains field blocks rather than individual crop fields. CRS and licenses differ. Credit RVO / PDOK for the Netherlands, Land Nordrhein-Westfalen / Open.NRW under DL-DE-BY-2.0 for NRW, and Dept. LV for Flanders."

[Sources]
- https://data.source.coop/ftw/harmonized-field-data/catalog.json
- https://data.source.coop/ftw/harmonized-field-data/AGENTS.md
- https://data.source.coop/ftw/harmonized-field-data/be_vlg/collection.json
- https://data.source.coop/ftw/harmonized-field-data/de_nrw/collection.json
- https://data.source.coop/ftw/harmonized-field-data/nl/collection.json
- https://github.com/fieldsoftheworld/harmonized-field-data-catalog
- https://duckdb.org/docs/stable/data/parquet/overview
-->
