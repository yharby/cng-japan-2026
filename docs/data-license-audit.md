# Data reuse and republication audit

Checked 23 August 2026. This is a practical provenance review for the talk and a future Portolan pilot, not legal advice. Recheck the exact asset and current terms immediately before publishing a mirror or derivative.

## Presentation rule

Only exact datasets with a **Green** result may appear as conversion, reuse, or pilot examples in the presentation. A catalog root with per-collection terms may appear only when every displayed linked collection is audited separately and the deck does not imply one blanket license. Sources that require extra permission or notification, and sources without a confirmed upstream redistribution grant, stay out of the deck.

- **Green** means the named asset or collection can be copied, transformed, and republished if its listed attribution and change-notice duties are met.
- **Illustrative** means the filename is a teaching label rather than a downloadable source.

Software licenses such as Apache-2.0 and MIT do not determine the license of data processed by that software. Data rights, provider terms, attribution, database rights, survey law, and trademarks must be checked separately.

## Yokohama pilot candidates

| Exact source | Status | Why it is suitable | Required notice |
| --- | --- | --- | --- |
| [City of Yokohama 2020 land-use survey](https://www.city.yokohama.lg.jp/business/bunyabetsu/kenchiku/toshikeikaku/yoko/sankou/11kisochousa.html), exact [Shapefile and CSV archive](https://www.city.yokohama.lg.jp/business/bunyabetsu/kenchiku/toshikeikaku/yoko/sankou/11kisochousa.files/0016_20250630.zip) | **Green, preferred pilot** | The first-party page explicitly publishes every open-data resource on the page under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The 2.5 MB archive is local to the venue and gives a clear Shapefile to GeoParquet conversion. | Credit `Figure 12, Current Land Use Map, City of Yokohama, CC BY 4.0`. State who converted the Shapefile, describe geometry or schema changes, link the source, and do not imply that the city created or endorsed the derivative. |
| [City of Yokohama monthly population by ward](https://data.city.yokohama.lg.jp/dataset/seisaku_suikei01), exact [March 2026 CSV](https://www.city.yokohama.lg.jp/city-info/yokohamashi/tokei-chosa/portal/opendata/suikei01.files/e1yokohama2603.csv) | **Green** | The dataset page declares Creative Commons Attribution, and the first-party [portal terms](https://data.city.yokohama.lg.jp/terms.html) permit commercial use, copying, public transmission, translation, transformation, and adaptation under CC BY 4.0. A monthly series demonstrates the **publish · update · use** lifecycle. | Credit `Population and households by sex and administrative ward, March 2026, City of Yokohama, CC BY 4.0`. State that the CSV was converted to Parquet and catalogued by the publisher. Document that rows are ward-level statistics rather than geometries. |
| [ESA WorldCover 2021 tile N33E138](https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_N33E138_Map.tif), covering Yokohama | **Green** | The first-party [data-access page](https://esa-worldcover.org/en/data-access) publishes WorldCover under CC BY 4.0. The exact asset is already a range-enabled Cloud Optimized GeoTIFF, so the pilot can catalog it directly or crop it while preserving COG structure. | Use `© ESA WorldCover project 2021 / Contains modified Copernicus Sentinel data (2021) processed by ESA WorldCover consortium`. If cropped, say so and preserve the product citation and license. |

Recommended pilot attribution:

```text
Figure 12, Current Land Use Map, City of Yokohama, CC BY 4.0.
Converted from Shapefile to GeoParquet and catalogued by [publisher].
Transformation details and checksums: [provenance URL].
```

## Other green sources shown in the deck

| Exact source | Status | Evidence and consequence |
| --- | --- | --- |
| [e-Stat population mesh](https://www.e-stat.go.jp/gis/statmap-search?aggregateUnit=S&datum=2011&page=1&serveyId=S002005112020&statsId=T001140&toukeiCode=00200521&toukeiYear=2020&type=1) | **Green** | The [e-Stat terms](https://www.e-stat.go.jp/en/terms-of-use) permit copying, public transmission, translation, modification, and commercial use and are CC BY 4.0-compatible. Cite the exact survey, ministry, e-Stat, and source URL; identify the converter and changes. |
| [Natural Earth raster downloads](https://www.naturalearthdata.com/downloads/10m-raster-data/) | **Green, public domain** | The first-party [terms](https://www.naturalearthdata.com/about/terms-of-use/) place all Natural Earth raster and vector data in the public domain and permit modification, dissemination, and commercial use. The single-strip drawing on slide 3 remains illustrative rather than a measured claim about a specific download. |
| [Harmonized Field Boundary Data](https://data.source.coop/ftw/harmonized-field-data/catalog.json), limited to the three Collections linked by the root checked on 23 August 2026 | **Green, per Collection** | The Netherlands Collection declares CC0-1.0. North Rhine-Westphalia declares DL-DE-BY-2.0, which permits commercial and non-commercial copying, alteration, processing, combination, and redistribution with the provider name, license notice/link, dataset URI, and a change notice. Flanders links the Flemish Model Licence for Free Reuse v1.0, which permits free commercial and non-commercial reuse with attribution; use the Collection attribution `Bron: Dept. LV`. Do not assign one blanket license to the root. Preserve the original provider, Collection URL, license, edition, conversion provenance, and any modification notice for each source. The deck's DuckDB example only counts the three explicitly linked latest GeoParquet assets and does not redistribute them. |
| [Netherlands Provinces Portolan reference](https://github.com/portolan-sdi/portolan-spec/tree/main/examples/catalog/portolan-reference/boundaries/netherlands-provinces) | **Green** | Its collection declares CC BY 4.0, names Kadaster as producer/licensor and PDOK as processor, and links the original. The [official PDOK API](https://api.pdok.nl/kadaster/bestuurlijkegebieden/ogc/v1?f=html&lang=en) also states CC BY 4.0. Credit `Kadaster / PDOK`, link the source and license, and identify changes. |
| [Boston Open Space reference collection](https://raw.githubusercontent.com/portolan-sdi/portolan-spec/main/examples/catalog/portolan-reference/boundaries/boston-open-space/collection.json) | **Green, public domain** | The collection declares PDDL 1.0. The City of Boston states that Analyze Boston datasets default to the [Public Domain Dedication and License](https://www.boston.gov/news/analyze-boston-puts-bostons-data-public-domain). Preserve the source and provenance even though attribution is not a license condition. |
| [Netherlands BAG buildings collection](https://data.source.coop/cholmes/portolan-nl/kadaster/panden/collection.json) | **Green, public domain** | The exact collection declares CC0-1.0, while the [first-party PDOK metadata](https://api.pdok.nl/kadaster/bag/ogc/v2?f=html&lang=en) uses Public Domain Mark 1.0. Treat the official Public Domain Mark as the source statement, credit Kadaster/PDOK, and document the mirror conversion. |

## Illustrative filenames

The following are diagram labels, not data sources, so no data license attaches to them:

- `national.csv` and its `2.4 GB` size
- the untiled single-strip raster drawing on slide 3
- `/data.parquet`
- `buildings.parquet`, `elevation.tif`, `map.pmtiles`, `part-004.parquet`, and `thumbnail.webp`
- the teaching-tree files `catalog.json`, `collection.json`, `item-a.json`, `item-b.json`, `B04.tif`, `data.parquet`, and `thumbnail.webp`
- the proposed `https://…/jp-pilot/` publication and its future assets

Their links in the presentation open a real source, format documentation, or specification, never a fictional download.

## Marks are separate from data

None of these data grants automatically permits use of an organization's logo or trademark. Keep organization names typographic unless an authorized mark and applicable permission have been confirmed. A data attribution beside a name must not imply partnership or endorsement.

## Publication gate

Before a candidate becomes a Portolan example, record these facts in `collection.json`, `README.md`, and provenance metadata:

1. Exact source asset URL, provider, version/date, and checksum.
2. Exact data license identifier and canonical license URL.
3. All upstream providers and third-party notices.
4. Confirmation that modification, redistribution, and commercial use are allowed.
5. Required attribution and an explicit description of the conversion.
6. Any database-right, privacy, survey-law, or service-stability condition.
7. Confirmation that no logo or endorsement is implied.
