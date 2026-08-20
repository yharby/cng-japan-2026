---
clicks: 3
layout: default
---

# Connections cross silos. Open files decouple the data.
<p class="ja">接続はサイロを越え、オープンファイルはデータをエンジンから分離します。</p>

<VizSharedDataLayer />

<div class="bi">
  <span class="en">FDW and drivers connect engines. Arrow and ADBC improve result exchange. Parquet and GeoParquet make persistent data portable.</span>
  <span class="deck-ja">FDWとドライバーはエンジンを接続し、ArrowとADBCは結果交換を改善します。ParquetとGeoParquetは永続データを可搬にします。</span>
</div>

<!--
[Say in English]
"The vector problem is not only file size. PostgreSQL, Oracle, SQL Server, and geodatabases expose different spatial types, dialects, drivers, and operational boundaries. Interoperability has three levels: connect the silos, exchange results efficiently, or publish the persistent data under an open contract."

[Click 1]
"FDW, ODBC, and JDBC cross product boundaries. That is useful federation and connectivity, but a database or client driver still coordinates the request. Connections make silos reachable; they do not make the durable bytes portable."

[Click 2]
"Arrow defines a columnar in-memory representation, and ADBC lets a database client receive Arrow batches directly. That can remove expensive result conversion. The query service still executes the query, so this improves exchange rather than decoupling persistent data."

[Click 3]
"Parquet moves the shared contract to persistent bytes. GeoParquet adds geometry encoding and geospatial metadata. DuckDB, QGIS, Polars, and other compatible engines can read the same published vector asset directly. Arrow remains the complementary memory and interchange layer after the bytes arrive. The next slide shows how GeoParquet and COG make those files efficient over HTTP."

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
