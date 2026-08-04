#!/usr/bin/env python3
"""Генерация blur-заглушек для фото шаблонов.

Запуск из public/templates:  python3 ../../scripts/gen-blur.py
Перезаписывает lib/blur-data.ts. Требует macOS sips.
"""
import base64
import os
import subprocess
import tempfile

out = {}
for f in sorted(os.listdir(".")):
    if not f.endswith(".webp"):
        continue
    slug = f[:-5]
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as t:
        tmp = t.name
    subprocess.run(
        ["sips", "-Z", "16", "-s", "format", "jpeg", "-s", "formatOptions", "40", f, "--out", tmp],
        check=True,
        capture_output=True,
    )
    out[slug] = "data:image/jpeg;base64," + base64.b64encode(open(tmp, "rb").read()).decode()
    os.unlink(tmp)

lines = [f'  "{k}":\n    "{v}",' for k, v in out.items()]
body = (
    "/**\n * Сгенерированные blur-заглушки (16px) для фото шаблонов.\n"
    " * Пересоздать: см. README, раздел про фото шаблонов.\n */\n"
    "export const BLUR: Record<string, string> = {\n" + "\n".join(lines) + "\n};\n"
)
open("../../lib/blur-data.ts", "w").write(body)
print("generated", len(out))
