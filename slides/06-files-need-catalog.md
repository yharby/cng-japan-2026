---
clicks: 2
layout: default
---

# Files alone are not a catalog
<p class="ja">ファイルだけでは、データセットを説明できません。</p>

<VizFilesNeedCatalog />

<div class="bi">
  <span class="en">Fast files can still lack shared discovery, extent, roles, license, and provenance.</span>
  <span class="deck-ja">高速なファイル形式だけでは、検索、範囲、役割、ライセンス、来歴を共有できません。</span>
</div>

<!--
[Say in Japanese]
「高速に読めるファイルがあっても、それだけではデータセットを説明できません。」

[Say in English]
"Now the bucket fills with GeoParquet files, COGs, map files, thumbnails, and partitions. The bytes are easier to read, but the collection is still a pile of object keys."

[Click 1]
"A consumer still needs basic context. What dataset is this? Which area and date does it cover? Which file is for analysis and which is a preview? What license and provenance apply?"

[Click 2]
"We need shared metadata and links. We should be able to add that organization without making another always-on portal mandatory."

[Sources]
- https://github.com/radiantearth/stac-spec
- https://github.com/radiantearth/stac-spec/blob/master/best-practices.md
- https://geoparquet.org/
- https://parquet.apache.org/docs/file-format/
- https://docs.ogc.org/is/21-026/21-026.html
- https://docs.protomaps.com/pmtiles/
- https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#webp_image
- docs/reference/cng-japan/research-stac.md
-->
