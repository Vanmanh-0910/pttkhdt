#!/usr/bin/env bash
# Render toàn bộ sơ đồ Mermaid trong docs/diagrams/src thành SVG và PNG.
#
# Cách dùng:
#   ./render-diagrams.sh            # render tất cả
#   ./render-diagrams.sh 12         # chỉ render sơ đồ có tiền tố 12
#
# Yêu cầu: đã chạy `npm install @mermaid-js/mermaid-cli` trong thư mục dự án.

set -uo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$ROOT/docs/diagrams/src"
SVG_DIR="$ROOT/docs/diagrams/svg"
PNG_DIR="$ROOT/docs/diagrams/png"
CONFIG="$ROOT/docs/diagrams/mermaid-config.json"
MMDC="$ROOT/node_modules/.bin/mmdc"
FILTER="${1:-}"

if [[ ! -x "$MMDC" ]]; then
  echo "Không tìm thấy mmdc tại $MMDC" >&2
  echo "Hãy chạy: npm install @mermaid-js/mermaid-cli" >&2
  exit 1
fi

mkdir -p "$SVG_DIR" "$PNG_DIR"

ok=0
fail=0
failed_files=()

for file in "$SRC_DIR"/*.mmd; do
  [[ -e "$file" ]] || continue
  base="$(basename "$file" .mmd)"

  if [[ -n "$FILTER" && "$base" != *"$FILTER"* ]]; then
    continue
  fi

  printf '%-64s' "$base"

  if "$MMDC" --input "$file" --output "$SVG_DIR/$base.svg" \
      --configFile "$CONFIG" --backgroundColor white >/dev/null 2>"$SRC_DIR/$base.svg.log" \
   && "$MMDC" --input "$file" --output "$PNG_DIR/$base.png" \
      --configFile "$CONFIG" --backgroundColor white --scale 3 >/dev/null 2>"$SRC_DIR/$base.png.log"
  then
    echo "OK"
    rm -f "$SRC_DIR/$base.svg.log" "$SRC_DIR/$base.png.log"
    ok=$((ok + 1))
  else
    echo "FAILED"
    fail=$((fail + 1))
    failed_files+=("$base")
  fi
done

echo
echo "Thành công: $ok | Thất bại: $fail"

if (( fail > 0 )); then
  echo "Các sơ đồ lỗi:"
  for name in "${failed_files[@]}"; do
    echo "  - $name (xem log: docs/diagrams/src/$name.*.log)"
  done
  exit 1
fi
