#!/usr/bin/env bash
# Re-render the torn front page PNG from its HTML source.
# Fonts are baked into the PNG at render time, so nothing here
# needs to exist on the iPad.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SRC="front-heath.source.html"
OUT="front-heath.jpg"

"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --default-background-color=00000000 \
  --force-device-scale-factor=1.5 \
  --window-size=1240,1748 \
  --screenshot="_raw.png" \
  "file://$PWD/$SRC" 2>/dev/null

# The halftone screen is high-frequency detail that PNG cannot compress
# (5MB+). Newsprint texture hides JPEG artifacts, and the page is always
# displayed downscaled, so JPEG at 80 is visually identical at a fifth
# the size -- which matters for first load on the iPad over LAN.
sips -s format jpeg -s formatOptions 80 "_raw.png" --out "$OUT" >/dev/null
rm -f "_raw.png"

echo "wrote $OUT ($(ls -lh "$OUT" | awk '{print $5}'))"
sips -g pixelWidth -g pixelHeight "$OUT" | tail -2
