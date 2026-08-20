# Data reuse and republication audit

Checked 20 August 2026. This is a practical provenance review for the talk and a future Portolan pilot, not legal advice. Recheck the exact asset and current terms immediately before publishing a mirror or derivative.

## Status key

- **Green** — the named data can be copied, transformed, and republished if the listed conditions are met.
- **Conditional** — reuse is possible, but an extra action or a per-collection check is required first.
- **Hold** — do not mirror or relicense from the current evidence.
- **Illustrative** — the filename is a teaching label, not a real downloadable dataset.

Software licenses such as Apache-2.0 and MIT do not determine the license of data processed by that software. Data rights, provider terms, attribution, database rights, survey law, and trademarks must be checked separately.

## Japanese candidates

| Source shown in the deck | Status for a Portolan example | Reuse conclusion | Required action and notice |
| --- | --- | --- | --- |
| [e-Stat population mesh](https://www.e-stat.go.jp/gis/statmap-search?aggregateUnit=S&datum=2011&page=1&serveyId=S002005112020&statsId=T001140&toukeiCode=00200521&toukeiYear=2020&type=1) | **Green** | The [e-Stat terms](https://www.e-stat.go.jp/en/terms-of-use) permit copying, public transmission, translation, modification, and commercial use. They are compatible with CC BY 4.0. Numerical data and simple tables are also described as freely usable. | Cite the exact survey, ministry, e-Stat, and source URL. State who converted or edited it, and do not imply that the Government of Japan made the derivative. Check any separately identified third-party content. |
| [JAXA AW3D30](https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d30/aw3d30_e.htm) GeoTIFF | **Conditional** | The linked [JAXA Research Data Terms](https://earth.jaxa.jp/en/data/policy/) permit free use, modification, redistribution, and commercial use. Download requires registration. | Credit JAXA and AW3D/AW3D30 on every derivative. Notify JAXA in advance of commercial use; notifying JAXA of other public outputs is requested where possible. Record the source version and date because the terms can change. |
| [JAXA Earth API](https://data.earth.jaxa.jp/en/) as a generic source | **Hold until an exact collection is selected** | JAXA says that more than 100 JAXA and third-party datasets are exposed as COG/STAC and that the license must be checked in each dataset's STAC metadata. There is no platform-wide data license. | Select a named collection, preserve its STAC `license` and license link, verify all providers, and then apply the collection-specific terms. If the API created the output, acknowledge use of JAXA Earth API. |
| [GSI optimal_bvmap](https://github.com/gsi-cyberjapan/optimal_bvmap) PMTiles | **Green**, with a stability warning | Its README applies the [GSI content terms](https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html). The underlying [PDL1.0](https://www.digital.go.jp/resources/open_data/public_data_license_v1.0) permits reproduction, public transmission, adaptation, and commercial use and is CC BY 4.0-compatible. The project explicitly says this trial is not treated as a Basic Survey Result. | Credit `Geospatial Information Authority of Japan optimized vector tiles` / `国土地理院最適化ベクトルタイル`, link the source, identify the repackager and changes, and do not imply GSI endorsement. Freeze a source date and checksum because this is a trial whose URL, schema, and content may change. |
| [Pacific Spatial Flateau](https://source.coop/pacificspatial/flateau) | **Green — preferred ready-made pilot** | Pacific Spatial publishes its converted PLATEAU GeoParquet and GeoPackage under CC BY 4.0, which permits redistribution, adaptation, and commercial use with attribution. | Credit Pacific Spatial Solutions, link the source and [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), mark further changes, and preserve the upstream PLATEAU provenance. |
| Underlying [Project PLATEAU 3D city models](https://www.mlit.go.jp/plateau/open-data/) | **Green**, with per-file checks | The [PLATEAU policy](https://www.mlit.go.jp/plateau/site-policy/) expressly includes the 3D city-model open data. Unless marked otherwise, PDL1.0 applies; PLATEAU also permits use under CC BY 4.0-compatible terms. | Cite MLIT Project PLATEAU, the exact city dataset and municipality, and state the transformation and its author. Check special third-party notices and any Survey Act note attached to the exact source product. |

Recommended attribution skeletons:

```text
Source: [exact survey], [ministry], via e-Stat ([URL]).
Converted to GeoParquet and republished by [publisher]; this derivative was not created by the Government of Japan.

Original AW3D30 data supplied by the Japan Aerospace Exploration Agency (JAXA).
Converted to COG and catalogued in STAC by [publisher]; JAXA did not create or endorse this derivative.

Source: GSI optimized vector tiles, Geospatial Information Authority of Japan
([URL]), PDL1.0. Repackaged and catalogued by [publisher]; not an official GSI product.

Flateau © Pacific Spatial Solutions, Inc. 2023, CC BY 4.0,
derived from Project PLATEAU 3D City Models ([exact city source]).
Further cataloguing and changes by [publisher].
```

## Other real catalogs in the deck

| Catalog or dataset | Status | Evidence and consequence |
| --- | --- | --- |
| [Fields of the World — Global](https://data.source.coop/ftw/global-data/catalog.json), including the Japan GeoParquet and PMTiles assets | **Green** | The live root catalog states that the data and catalog metadata are published under CC BY 4.0 by Taylor Geospatial Institute and collaborators. The [source repository](https://github.com/fieldsoftheworld/ftw-data-catalog) repeats that grant. Reuse may be commercial, but attribution, license link, change indication, provenance, and non-endorsement must be preserved. |
| [Netherlands Provinces Portolan reference](https://github.com/portolan-sdi/portolan-spec/tree/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces) | **Green** | Its collection declares CC BY 4.0, names Kadaster as producer/licensor and PDOK as processor, and links the original source. The [official PDOK API](https://api.pdok.nl/kadaster/bestuurlijkegebieden/ogc/v1?f=html&lang=en) also states CC BY 4.0. Credit `Kadaster / PDOK` (preferably `CC-BY Kadaster NL`), link the original and license, and identify changes. |
| [Pergamino catalog](https://data.source.coop/nlebovits/pergamino-ide/catalog.json) | **Conditional by collection** | Its own README says CC BY-SA 4.0 applies to the municipal IDE, but also says that several layers come from national and provincial organizations and retain their original terms. A derived database must preserve attribution and ShareAlike where that license applies; verify every selected collection's upstream provider before mirroring it. |
| [Moldova catalog](https://data.source.coop/nlebovits/moldova-geodata/catalog.json) | **Hold** | Its README candidly says the source publishes no license text and that CC BY 4.0 is the mirror publisher's unconfirmed assertion. `Fees: NONE` and `AccessConstraints: NONE` are not a redistribution license. Obtain confirmation from AGCC/INGEOCAD or choose another example. |
| [Microsoft ML Road Detections catalog](https://data.source.coop/nlebovits/microsoft-ml-road-detections/catalog.json) | **Green under ODbL obligations** | The collection declares ODbL 1.0 and points to Microsoft's source. ODbL permits copying, adaptation, and redistribution, including commercially, but a public adapted database must remain under ODbL and carry the required attribution/notices. Do not relicense the database as CC BY 4.0. |
| [St. Louis data browser](https://cholmes.github.io/stlouis-data-browser/#/transportation-infrastructure-and-utilities/catalog.json) | **Hold by default; verify per collection** | The browser is an entry point across many collections, not a single licensed dataset. A browser URL or public download does not prove permission to mirror all assets. Select one collection, follow its providers/source/license links, and audit that collection before conversion or republication. |

The three scale catalogs and the St. Louis browser remain valid discovery and architecture examples in the appendix. Their presence in the deck is not a claim that every asset may be republished.

## Illustrative filenames

The following are diagram labels, not data sources, so no data license attaches to them:

- `national.csv` and its `2.4 GB` size
- `/data.parquet`
- `buildings.parquet`, `elevation.tif`, `map.pmtiles`, `part-004.parquet`, and `thumbnail.webp`
- the teaching-tree files `catalog.json`, `collection.json`, `item-a.json`, `item-b.json`, `B04.tif`, `data.parquet`, and `thumbnail.webp`
- the proposed `https://…/jp-pilot/` publication and its future assets

Their links in the presentation open format or specification documentation, not a fictional download.

## Marks are separate from data

None of these data grants automatically permits use of an organization's logo or trademark. PDL1.0 and the e-Stat terms expressly exclude marks; JAXA's policy requires permission for its registered logo. Keep JAXA, GSI, e-Stat, municipalities, and other organizations as typographic source labels unless an authorized mark and applicable permission have been confirmed.

## Publication gate

Before a candidate becomes a Portolan example, record these facts in `collection.json`, `README.md`, and provenance metadata:

1. Exact source asset URL, provider, version/date, and checksum.
2. Exact data license identifier and canonical license URL.
3. All upstream providers and third-party notices.
4. Whether modification, redistribution, commercial use, and sublicensing are allowed.
5. Required attribution and an explicit description of the conversion.
6. Any notification, registration, Survey Act, privacy, or service-stability condition.
7. Confirmation that no logo or endorsement is implied.
