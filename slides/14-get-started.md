---
clicks: 2
layout: default
hideInToc: true
---

# Portolan CLI turns many inputs into one checked catalog
<p class="ja">Portolan CLIは多様な入力を一つの検証済みカタログに変換します。</p>

<VizGetStarted />

<div class="bi">
  <span class="en">Files or services become GeoParquet, COG, and linked STAC on object storage.</span>
  <span class="deck-ja">ファイルやサービスをGeoParquet、COG、リンクされたSTACとしてオブジェクトストレージへ公開します。</span>
</div>

<!--
[Say in English]
"The CLI is not only an uploader. Release 0.7.0 accepts local vector and raster files and can extract WFS and ArcGIS REST services. It converts vectors to GeoParquet, rasters to COG, generates linked STAC metadata, and prepares one static publication. PyPI selects 0.7.0 as stable; the latest main remains the 1.0.0a0 alpha."

[Click 1]
"The result is a catalog on object storage with stable URLs and open assets. QGIS can read the data formats, Python can query them, and an AI agent can discover the same linked metadata. The publication is shared; the engines remain replaceable."

[Click 2]
"The concrete publisher flow stays simple: initialize, add files or extract a service, check and convert, then push. Later, sync performs pull, initialize, scan, check, and push. The publisher still controls the source, license, credentials, destination, review, and release."

[Sources]
- https://github.com/portolan-sdi/portolan-cli/blob/v0.7.0/README.md
- https://github.com/portolan-sdi/portolan-cli/blob/c80a200121e41e20f725840d7b5298b3aef1d61c/docs/reference/input-formats.md
- https://github.com/portolan-sdi/portolan-cli/blob/c80a200121e41e20f725840d7b5298b3aef1d61c/docs/guides/extract-wfs.md
- https://github.com/portolan-sdi/portolan-cli/blob/c80a200121e41e20f725840d7b5298b3aef1d61c/docs/guides/extract-arcgis.md
- https://github.com/portolan-sdi/portolan-cli/releases/tag/v1.0.0a0
- https://pypi.org/project/portolan-cli/
-->
