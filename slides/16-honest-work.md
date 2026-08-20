---
clicks: 2
layout: default
---

# Less always-on infrastructure. The work remains.
<p class="ja">常時稼働の仕組みは減らせますが、作業はなくなりません。</p>

<VizHonestWork />

<!--
[Say in English]
"This is the architecture of the portal, not a claim that infrastructure disappears. In a service-first portal, legacy files and a spatial database feed a GIS server, gateway, APIs, and tiles. Every request travels through that service chain."

[Click 1]
"A static-first portal moves the expensive preparation to a publisher-controlled job. It writes GeoParquet, COG, or PMTiles to object storage, links them through STAC, and lets browsers, desktop tools, and agents read them directly. This keeps Yui Matsumura's important point: compute or an OGC API remains available on demand when users need it."

[Click 2]
"The query path can shrink, but the operating work remains. We still convert, document, and validate releases. We still operate storage, CDN, IAM, DNS, security, and monitoring. People still govern quality, updates, and release decisions."

[Sources]
- https://github.com/portolan-sdi/portolan-spec/blob/main/specs/portolan/core.md
- Speaker-provided `cng-infrastructure-concept.pdf`, consolidated and redrawn as a horizontal architecture comparison
- Speaker-provided event context for Yui Matsumura's on-demand compute point
-->
