---
clicks: 3
layout: default
---

# A small subset can still require the whole file
<p class="ja">小さな問いでも、ファイル全体のダウンロードが必要になることがあります。</p>

<VizLegacyFiles />

<div class="bi">
  <span class="en">Traditional row files and non-optimized rasters make transfer and memory follow file size, not the subset requested.</span>
  <span class="deck-ja">従来型の行データや未最適化のラスターでは、要求範囲ではなくファイルサイズに応じて転送量とメモリ使用量が増えます。</span>
</div>

<!--
[Say in Japanese]
「必要なデータは少しでも、従来のファイルでは全体のダウンロードから始まることがあります。」

[Say in English]
"Start with two ordinary questions. On the left, I need a small subset from a national table. On the right, I need one raster window. The 2.4 gigabyte CSV is an illustrative national-file scenario, not a measured e-Stat file size. The access pattern is the point."

[Click 1]
"A CSV, Shapefile, or GeoPackage is normally fetched and parsed before the filter can discard most records. Each library then chooses its own in-memory representation, which can add allocation and conversion work."

[Click 2]
"The raster lane illustrates an untiled TIFF with no overview pyramid. Natural Earth provides a public-domain raster TIFF source that is easy to convert, but the single-strip drawing is a teaching layout rather than a measured claim about that download. A COG reorganizes raster blocks and overviews so a client can request the useful window."

[Click 3]
"In both lanes, the question is small but the transfer and memory footprint follow the packaging."

[Sources]
- https://www.e-stat.go.jp/gis/statmap-search?aggregateUnit=S&datum=2011&page=1&serveyId=S002005112020&statsId=T001140&toukeiCode=00200521&toukeiYear=2020&type=1
- https://www.e-stat.go.jp/en/terms-of-use
- https://www.naturalearthdata.com/downloads/10m-raster-data/
- https://www.naturalearthdata.com/about/terms-of-use/
- https://www.rfc-editor.org/rfc/rfc4180
- https://wesmckinney.com/blog/apache-arrow-pandas-internals/
-->
