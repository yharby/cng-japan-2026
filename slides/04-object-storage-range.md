---
clicks: 3
layout: default
---

# Object storage and byte ranges let clients read less
<p class="ja">オブジェクトストレージとバイト範囲で、必要な部分だけを取得できます。</p>

<VizObjectRange />

<div class="bi">
  <span class="en">A byte range is standard HTTP. The format index tells the client which bytes matter.</span>
</div>

<!--
[Say in Japanese]
「オブジェクトストレージとHTTPのバイト範囲を使うと、必要な部分だけを取得できます。」

[Say in English]
"The first change is the storage model. An object has a stable key and is read through HTTP. The publisher can use a commercial cloud, a domestic provider, or a self-hosted S3-compatible system. Cloud native describes the access pattern, not the landlord."

[Click 1]
"Object storage keeps the read path simple. Reads are stateless, scale independently, and use URLs that ordinary tools and AI agents can follow. The publisher operates less request-specific infrastructure."

[Click 2]
"A client can send a Range header and receive 206 Partial Content. That only saves work when the file has an index that identifies the useful bytes."

[Click 3]
"Byte ranges already work in HTTP 1.1. HTTP 2 and HTTP 3 improve how requests share connections. They do not create row groups, tiles, or indexes inside the file."

[Sources]
- https://cloudnativegeo.org/about/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests
- https://www.rfc-editor.org/rfc/rfc9110.html
- docs/reference/cng-japan/research-object-storage.md
- docs/reference/cng-japan/research-http-range.md
-->
