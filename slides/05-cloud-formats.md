---
clicks: 4
layout: default
---

# GeoParquet and COG make partial reads practical
<p class="ja">クラウドネイティブ形式は、必要なバイトの場所を示します。</p>

<VizCloudFormats />

<div class="bi">
  <span class="en">File indexes reduce bytes. HTTP/2 and HTTP/3 improve how range requests share a connection.</span>
</div>

<!--
[Say in Japanese]
「クラウドネイティブ形式は、必要なデータがファイル内のどこにあるかを示します。」

[Say in English]
"Object storage supplies the scalable address. The file format supplies the map of the bytes."

[Click 1]
"GeoParquet stores column chunks in row groups and a footer describes their locations and statistics. A query can read the footer first, select columns and row groups, and request only those byte ranges. Arrow-compatible memory paths can then reduce conversion and copying after the bytes arrive."

[Click 2]
"A Cloud Optimized GeoTIFF puts internal tiles and lower-resolution overviews in a range-friendly order. A client can preview the raster or read one window without opening every full-resolution pixel."

[Click 3]
"Both files remain ordinary objects with stable URLs. No data API has to translate every request."

[Click 4]
"DuckDB, QGIS, xarray, a browser, or an agent can follow the same path. HTTP 1.1 already supports range reads. HTTP 2 and HTTP 3 can improve multiplexing, but they do not create row groups, tiles, or indexes inside the file."

[Sources]
- https://parquet.apache.org/docs/file-format/
- https://geoparquet.org/
- https://docs.ogc.org/is/21-026/21-026.html
- https://guide.cloudnativegeo.org/
- https://www.rfc-editor.org/rfc/rfc9110
- https://www.rfc-editor.org/rfc/rfc9113.html
- https://www.rfc-editor.org/rfc/rfc9114.html
- https://duckdb.org/docs/stable/core_extensions/httpfs/https
- https://qgis.org/
- https://docs.xarray.dev/
- docs/reference/cng-japan/research-arrow-parquet.md
- docs/reference/cng-japan/research-http-range.md
-->
