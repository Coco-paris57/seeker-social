"""Download the property photos listed in site_config.PHOTOS and save web-ready copies.

    python3 website/tools/import_photos.py          # skips photos already imported
    python3 website/tools/import_photos.py --force  # re-download everything

Writes src/assets/img/homes/<key>-640.webp and <key>-1200.webp (camera metadata
removed). Needs Pillow. Run build.py afterwards.
"""
import io
import os
import sys
import urllib.request

from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
import site_config as C  # noqa: E402

OUT = os.path.join(HERE, "src", "assets", "img", "homes")
WIDTHS = (640, 1200)


def main(force=False):
    os.makedirs(OUT, exist_ok=True)
    for p in C.PHOTOS:
        targets = [os.path.join(OUT, f"{p['key']}-{w}.webp") for w in WIDTHS]
        if not force and all(os.path.exists(t) for t in targets):
            continue
        req = urllib.request.Request(p["src"], headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            img = Image.open(io.BytesIO(r.read()))
        img = ImageOps.exif_transpose(img).convert("RGB")
        for w, t in zip(WIDTHS, targets):
            out = img.copy()
            if out.width > w:
                out = out.resize((w, round(out.height * w / out.width)), Image.LANCZOS)
            out.save(t, "WEBP", quality=80, method=6)
        print("imported", p["key"], img.size)


if __name__ == "__main__":
    main(force="--force" in sys.argv)
