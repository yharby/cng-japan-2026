---
clicks: 3
layout: default
---

# Interoperability can still leave the engine in the middle
<p class="ja">相互運用できても、エンジンが中心に残ることがあります。</p>

<VizSharedDataLayer />

<div class="bi">
  <span class="en">FDW federates sources. ADBC and Arrow IPC reduce exchange overhead. Parquet and GeoParquet give persistent data an engine-independent contract.</span>
  <span class="deck-ja">FDWはデータを連携し、ADBCとArrow IPCは交換コストを減らします。ParquetとGeoParquetは永続データをエンジンから分離します。</span>
</div>

<!--
[Say in Japanese]
「相互運用性には複数の層があります。接続できることと、データがエンジンから独立していることは同じではありません。」

[Say in English]
"Interoperability is not one thing. We can federate sources, standardize how query results move, or give the persistent data itself an open contract. All three are useful, but only the last one removes a database service from this direct read path. This slide stays in the vector and table lane."

[Click 1]
"A PostgreSQL foreign data wrapper implements part of SQL/MED. It lets PostgreSQL query an external source as a foreign table. This is valuable federation, but PostgreSQL remains the coordinator. Each source still needs a suitable wrapper, connection, credentials, and compatible pushdown behavior. FDW connects silos; it does not by itself give the durable data an engine-independent representation."

[Click 2]
"ODBC and JDBC standardize database access, but their common result paths are row-oriented or require conversion for Arrow consumers. ADBC is a vendor-neutral client API that returns Arrow batches. Arrow IPC defines how record batches move between processes; the C Data Interface covers zero-copy sharing inside one process. The database service still executes the query, but the result path can be much cheaper. In DuckDB's 2023 TPC-H SF1 test on an Apple M1 Max, ADBC took 0.724 seconds and ODBC 28.149 seconds, a 38 times difference. That is one benchmark, not a universal speedup."

[Click 3]
"A stronger form of decoupling gives the persistent data its own open contract. Dremel described querying columnar data in place, and the wider community later described deconstructing vertically integrated databases. Parquet defines the durable columnar bytes; GeoParquet adds interoperable geometry and geospatial metadata. Compatible engines can read the published vector asset directly. Arrow remains the complementary memory and interchange layer after bytes arrive. COG reaches a similar engine-independent outcome for raster through GeoTIFF tiling, overviews, and HTTP ranges, not through Arrow. The next slide joins the vector and raster lanes."

[Sources]
- https://research.google.com/pubs/archive/36632.pdf
- https://www.cs.cmu.edu/~15721-f24/papers/Snowflake.pdf
- https://wesmckinney.com/blog/looking-back-15-years/
- https://www.postgresql.org/docs/16/ddl-foreign-data.html
- https://arrow.apache.org/blog/2023/01/05/introducing-arrow-adbc/
- https://arrow.apache.org/docs/format/Intro.html
- https://arrow.apache.org/docs/format/Columnar.html#serialization-and-interprocess-communication-ipc
- https://duckdb.org/2023/08/04/adbc
- https://www.vldb.org/pvldb/vol10/p1022-muehleisen.pdf
- https://parquet.apache.org/docs/file-format/
- https://github.com/opengeospatial/geoparquet/releases/tag/v0.1.0
- https://github.com/cogeotiff/cog-spec/blob/master/spec.md
-->
