---
clicks: 3
layout: default
---

# STAC organizes assets with linked JSON
<p class="ja">STACは、JSONのリンクでデータとメタデータを整理します。</p>

<VizStacModel />

<div class="bi">
  <span class="en">Catalogs link collections, collections link items, and items link the data assets.</span>
</div>

<!--
[Say in Japanese]
「STACは、JSONのリンクでカタログ、コレクション、アイテム、アセットを整理します。」

[Say in English]
"STAC gives us a small, open metadata model. It does not move the data. It links to the files where they already live."

[Click 1]
"A catalog is the root of the graph. It links to collections. A collection describes one dataset, including its spatial and temporal extent, license, and providers."

[Click 2]
"An item describes one observation at one place and time. Large single-file vector collections do not always need item records, but the object model remains the same."

[Click 3]
"Assets are the actual data files. The item or collection links to a GeoParquet file, a COG, a thumbnail, or another useful representation. A static STAC catalog can be plain JSON in the same bucket."

[Sources]
- https://github.com/radiantearth/stac-spec/blob/master/catalog-spec/catalog-spec.md
- https://github.com/radiantearth/stac-spec/blob/master/collection-spec/collection-spec.md
- https://github.com/radiantearth/stac-spec/blob/master/item-spec/item-spec.md
- https://github.com/radiantearth/stac-spec/blob/master/commons/assets.md
- docs/reference/cng-japan/research-stac.md
-->
