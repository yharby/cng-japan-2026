---
clicks: 2
layout: default
hideInToc: true
---

# Publish and update with the Portolan CLI
<p class="ja">Portolan CLIで公開し、同じ流れで更新できます。</p>

<VizGetStarted />

<div class="bi">
  <span class="en">Initialize → add → convert and check → push. Later, sync repeats the publisher-controlled round trip.</span>
  <span class="deck-ja">初期化 → 追加 → 変換・検証 → push。以後はsyncで公開者管理の往復処理を繰り返します。</span>
</div>

<!--
[Say in English]
"For data publishers, this is the released command-line path. PyPI currently selects 0.7.0 as the stable version; 1.0.0a0 is an alpha release and current main continues to move. The core publisher commands shown here are documented in both the published 0.7.0 README and the current repository."

[Click 1]
"Initialize the catalog and license, add a dataset, run check with fix to convert and validate it, then push the static catalog to object storage. The publisher supplies the data, metadata choices, credentials, and destination."

[Click 2]
"Later, sync performs the round trip described by the CLI: pull, initialize, scan, check, and push. Automation does not remove the release decision; the publisher still controls the update schedule and reviews the result."

[Sources]
- https://github.com/portolan-sdi/portolan-cli/blob/v0.7.0/README.md
- https://github.com/portolan-sdi/portolan-cli/blob/main/README.md
- https://github.com/portolan-sdi/portolan-cli/releases/tag/v1.0.0a0
- https://pypi.org/project/portolan-cli/
-->
