---
clicks: 4
layout: default
hideInToc: true
---

# Range requests and connection speed are different
<p class="ja">Rangeリクエストと、通信の多重化は別の話です。</p>

<VizProtocol />

<div class="bi">
  <span class="en">Our 18 August tests found HTTP/1.1 on S3 and Azure Blob, while Google Cloud Storage negotiated newer versions.</span>
</div>

<!--
[Say in Japanese]
「Rangeリクエストと、通信の多重化は別の話です。」

[Say in English]
"This is one technical detail for questions. A range request lets a client ask for part of one file. HTTP 2 and HTTP 3 can improve how many requests share a connection. They do not make an unindexed file easy to query. In our tests, S3 and Azure Blob negotiated HTTP 1.1, while Google Cloud Storage negotiated newer versions. The format still needs a useful index, and the client still needs to make good requests."

[Click 1]
"First, separate byte selection from the connection protocol."

[Click 2]
"Then look at what each host negotiated in our test."

[Click 3]
"Many small requests can still add latency."

[Click 4]
"A good cloud-native layout reduces the amount of work the client must do."

[Sources]
- docs/reference/cng-japan/research-http-range.md
- https://www.rfc-editor.org/rfc/rfc9110
-->
