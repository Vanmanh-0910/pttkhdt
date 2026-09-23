"""Trích xuất các khối ```mermaid trong báo cáo ra từng file .mmd riêng.

Tên file được đặt theo mục (heading) gần nhất phía trên để dễ tra cứu.
"""

import re
import sys
import unicodedata
from pathlib import Path

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "docs/nguon-tai-lieu/Bao_Cao_BTL_OOAD_NAL_Stay_Hoan_Chinh.md")
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else "docs/diagrams/src")
OUT.mkdir(parents=True, exist_ok=True)


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"[^\w\s.-]", "", text).strip().lower()
    text = re.sub(r"[\s_]+", "-", text)
    return re.sub(r"-{2,}", "-", text).strip("-")[:70]


lines = SRC.read_text(encoding="utf-8").splitlines()
heading = "diagram"
blocks = []
buffer = None

for line in lines:
    stripped = line.strip()
    if buffer is None and stripped.startswith("#"):
        heading = stripped.lstrip("#").strip()
    if stripped.startswith("```mermaid"):
        buffer = []
        continue
    if buffer is not None and stripped.startswith("```"):
        blocks.append((heading, "\n".join(buffer)))
        buffer = None
        continue
    if buffer is not None:
        buffer.append(line)

written = []
for index, (title, code) in enumerate(blocks, start=1):
    name = f"{index:02d}-{slugify(title)}.mmd"
    path = OUT / name
    path.write_text(code.rstrip() + "\n", encoding="utf-8")
    kind = code.strip().split("\n", 1)[0].split()[0] if code.strip() else "?"
    written.append((name, kind, len(code.splitlines())))

print(f"source={SRC}")
print(f"output_dir={OUT}")
print(f"total_diagrams={len(written)}")
for name, kind, count in written:
    print(f"  {name:<58} type={kind:<16} lines={count}")
