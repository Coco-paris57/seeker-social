"""Build the Seeker Estates website into ./site (static, deploy anywhere).

    python3 website/build.py            # production build → website/site/
    python3 website/build.py --preview  # links end in index.html, for opening from disk
    python3 website/build.py --images   # also re-render og.png / logo.png / icons (needs Playwright + Pillow)

No dependencies for the HTML build — standard-library Python only.
"""
import datetime
import json
import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import site_config as C  # noqa: E402
from components import Ctx  # noqa: E402

SRC = os.path.join(HERE, "src")


def write(out, rel, data, mode="w"):
    path = os.path.join(out, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, mode) as f:
        f.write(data)


def build(out, preview=False):
    Ctx.preview = preview
    import pages  # imported after Ctx.preview is set
    if os.path.isdir(out):
        shutil.rmtree(out)
    shutil.copytree(os.path.join(SRC, "assets"), os.path.join(out, "assets"))

    urls = []
    for path, html in pages.all_pages():
        rel = path if path.endswith(".html") else os.path.join(path, "index.html")
        write(out, rel, html)
        if not path.endswith(".html"):
            urls.append(path)

    today = datetime.date.today().isoformat()

    def prio(p):
        if p == "":
            return "1.0"
        if p in ("landlords/", "revenue-calculator/", "stays/", "pricing/", "book/"):
            return "0.9"
        return "0.7" if p.startswith("areas/") or p == "mid-term-stays/" else "0.5"

    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in urls:
        if p == "privacy/":
            continue
        sm.append(f"  <url><loc>{C.SITE_URL}/{p}</loc><lastmod>{today}</lastmod><priority>{prio(p)}</priority></url>")
    sm.append("</urlset>")
    write(out, "sitemap.xml", "\n".join(sm) + "\n")
    write(out, "robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {C.SITE_URL}/sitemap.xml\n")
    write(out, "site.webmanifest", json.dumps({
        "name": C.BRAND, "short_name": "Seeker", "start_url": "/", "display": "standalone",
        "background_color": "#F6F1E7", "theme_color": "#0F3D2E",
        "icons": [{"src": "/assets/img/favicon.svg", "sizes": "any", "type": "image/svg+xml"},
                  {"src": "/assets/img/icon-512.png", "sizes": "512x512", "type": "image/png"}]}, indent=2))
    ico = os.path.join(SRC, "favicon.ico")
    if os.path.exists(ico):
        shutil.copy(ico, os.path.join(out, "favicon.ico"))
    # 301s from the old WordPress site (Netlify / Cloudflare Pages format), so Google keeps its ranking.
    redirects = [
        ("/reservation/*", "/book/"), ("/reservation", "/book/"),
        ("/property-list/*", "/stays/"), ("/property-list", "/stays/"),
        ("/property/st-johns-wood-nw8*", "/areas/st-johns-wood/"), ("/property/wellington-road-nw8*", "/areas/st-johns-wood/"),
        ("/property/finchley-road-nw8*", "/areas/st-johns-wood/"), ("/property/warwick-avenue-w9*", "/areas/st-johns-wood/"),
        ("/property/paddington-w2*", "/areas/notting-hill-bayswater/"), ("/property/marble-arch-w2*", "/areas/notting-hill-bayswater/"),
        ("/property/gloucester-terrace*", "/areas/notting-hill-bayswater/"), ("/property/mayfair-w1k*", "/areas/marylebone/"),
        ("/property/*", "/stays/"), ("/category/*", "/stays/"), ("/thank-you/*", "/"), ("/thank-you", "/"),
    ]
    write(out, "_redirects", "".join(f"{a}  {b}  301\n" for a, b in redirects))
    # Netlify / Cloudflare Pages: long cache on fingerprint-free assets is risky, keep it modest.
    write(out, "_headers", "/assets/*\n  Cache-Control: public, max-age=604800\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n")
    print(f"built {len(urls) + 1} pages → {os.path.relpath(out)}")


def render_images():
    """og.png, logo.png and PNG icons from the SVG/HTML sources (Playwright + Pillow)."""
    subprocess.run(["node", os.path.join(HERE, "tools", "render_images.js")], check=True)
    from PIL import Image
    img = Image.open(os.path.join(SRC, "assets", "img", "icon-512.png"))
    img.save(os.path.join(SRC, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
    print("rendered images")


if __name__ == "__main__":
    if "--images" in sys.argv:
        render_images()
    preview = "--preview" in sys.argv
    build(os.path.join(HERE, "preview" if preview else "site"), preview=preview)
