---
clicks: 3
layout: default
---

# STAC organizes assets with linked JSON
<p class="ja">STACは、JSONのリンクでデータとメタデータを整理します。</p>

<VizStacModel />

<div class="bi">
  <span class="en">Catalogs link collections, collections link items, and items link the data assets.</span>
  <span class="deck-ja">CatalogはCollectionへ、CollectionはItemへ、ItemはデータAssetへリンクします。</span>
</div>

<!--
[Say in Japanese]
「STACは、JSONのリンクでカタログ、コレクション、アイテム、アセットを整理します。」

[Say in English]
"STAC gives us a small, open metadata model. It does not move the data. It links to the files where they already live."

[Click 1]
"A catalog is usually the starting point, like a directory tree. It may link other catalogs, collections, or items. This common path enters a collection, which describes one related dataset with its extent, license, and providers."

[Click 2]
"An item is a GeoJSON feature describing one place and time. A collection can link many items. Large single-file vector collections do not always need item records, but the object model remains the same."

[Click 3]
"The GeoJSON is an index, not the data itself. Assets point to files such as imagery bands, GeoParquet, thumbnails, or other useful representations through stable URLs."

[Sources]
- https://stacspec.org/en/tutorials/intro-to-stac/
- https://github.com/radiantearth/stac-spec/blob/master/catalog-spec/catalog-spec.md
- https://github.com/radiantearth/stac-spec/blob/master/collection-spec/collection-spec.md
- https://github.com/radiantearth/stac-spec/blob/master/item-spec/item-spec.md
- https://github.com/radiantearth/stac-spec/blob/master/commons/assets.md
- docs/reference/cng-japan/research-stac.md
-->
