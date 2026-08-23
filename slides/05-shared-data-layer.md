---
clicks: 3
layout: default
---

# Object storage separates data from the engine
<p class="ja">オブジェクトストレージは、データをエンジンから分離します。</p>

<VizSharedDataLayer />

<div class="bi">
  <span class="en">Publish Parquet or GeoParquet once. Compatible engines can read the same objects without owning the canonical data.</span>
  <span class="deck-ja">ParquetまたはGeoParquetを一度公開すれば、複数の互換エンジンが同じオブジェクトを読み込めます。</span>
</div>

<!--
[Say in English]
"The vector problem is not only file size. In a traditional silo, the database engine and its native data are one operational unit. PostgreSQL, Oracle, and SQL Server each own durable bytes behind their own spatial types and access paths."

[Click 1]
"FDW, ODBC, and JDBC make those silos reachable. Arrow and ADBC can make result exchange faster and more standard. Both are useful, but neither step by itself separates the canonical bytes from the database engine."

[Click 2]
"The break happens when the publisher writes the persistent data under an open file contract in object storage. Parquet defines the columnar bytes, and GeoParquet adds geometry encoding and geospatial metadata. The data becomes its own shared layer."

[Click 3]
"Now DuckDB, Spark, Trino, Polars, and other compatible engines can read the same published objects directly. The engine can change without moving the canonical data. This does not mean every engine reads every format automatically; compatibility is still required. The next slide shows how GeoParquet and COG make those files efficient over HTTP."

[Sources]
- https://research.google.com/pubs/archive/36632.pdf
- https://www.cs.cmu.edu/~15721-f24/papers/Snowflake.pdf
- https://wesmckinney.com/blog/looking-back-15-years/
- https://www.postgresql.org/docs/16/ddl-foreign-data.html
- https://postgis.net/docs/using_postgis_dbmanagement.html
- https://docs.oracle.com/en/database/oracle/oracle-database/26/spatl/spatial-datatypes-metadata.html
- https://learn.microsoft.com/en-us/sql/relational-databases/spatial/spatial-data-types-overview
- https://pro.arcgis.com/en/pro-app/latest/help/data/geodatabases/overview/what-is-a-geodatabase-.htm
- https://arrow.apache.org/blog/2023/01/05/introducing-arrow-adbc/
- https://arrow.apache.org/docs/format/Intro.html
- https://arrow.apache.org/docs/format/Columnar.html#serialization-and-interprocess-communication-ipc
- https://www.vldb.org/pvldb/vol10/p1022-muehleisen.pdf
- https://parquet.apache.org/docs/file-format/
- https://github.com/opengeospatial/geoparquet/releases/tag/v0.1.0
- https://github.com/cogeotiff/cog-spec/blob/master/spec.md
-->
