"""Generate the Seeker Estates logo proposals as self-contained SVGs.

Text is converted to outlines (no font dependency), so the files can go
straight to a printer, Google Ads, Booking.com, signage, etc.

    python3 website/tools/make_logos.py

Needs: pip install fonttools brotli
"""
import io
import os

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "src", "assets", "fonts")
OUT_BRAND = os.path.join(ROOT, "brand")
OUT_SITE = os.path.join(ROOT, "src", "assets", "img")

# Palette A — "Mayfair Green" (recommended). See brand/BRAND-PROPOSAL.md.
GREEN = "#0F3D2E"
IVORY = "#F6F1E7"
CLAY = "#C8582F"
INK = "#13221C"
WHITE = "#FFFFFF"


def load(name, **axes):
    f = TTFont(os.path.join(FONTS, name))
    if axes:
        f = instancer.instantiateVariableFont(f, axes)
    return f


SERIF = load("fraunces-latin-wght-normal.woff2", wght=600)
SANS = load("plus-jakarta-sans-latin-700-normal.woff2")
SANS6 = load("plus-jakarta-sans-latin-600-normal.woff2")


def text_path(font, text, size, x, y, tracking=0.0):
    """Return (svg path d, advance width) for text set at baseline (x, y)."""
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font["hmtx"]
    s = size / upm
    pen = SVGPathPen(gs)
    cx = 0.0
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, x + cx, y))
        gs[g].draw(tp)
        cx += hmtx[g][0] * s
        if i < len(text) - 1:
            cx += tracking * size
    return pen.getCommands(), cx


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" '
        f'width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{body}</svg>\n"
    )


# ---------------------------------------------------------------- marks
def mark_keyhole(x, y, size, fill, hole=None, mid="k"):
    """Concept A: a London doorway arch with a keyhole cut through it.
    The keyhole's round head is the old magnifying-glass lens, simplified."""
    s = size / 64.0
    arch = "M12 62V30A20 20 0 0 1 52 30V62Z"
    key = "M32 22.5a7.5 7.5 0 0 0-3.6 14.08L26.5 50h11l-1.9-13.42A7.5 7.5 0 0 0 32 22.5Z"
    t = f'transform="translate({x:.2f} {y:.2f}) scale({s:.4f})"'
    if hole:  # two-colour version: keyhole filled
        return f'<g {t}><path d="{arch}" fill="{fill}"/><path d="{key}" fill="{hole}"/></g>'
    return (
        f'<defs><mask id="{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">'
        f'<rect width="64" height="64" fill="#fff"/><path d="{key}" fill="#000"/></mask></defs>'
        f'<g {t}><path d="{arch}" fill="{fill}" mask="url(#{mid})"/></g>'
    )


def mark_lens(x, y, size, ring, roof):
    """Concept B: the current magnifying glass, redrawn as one modern line icon
    with a roofline inside the lens."""
    s = size / 64.0
    return (
        f'<g transform="translate({x:.2f} {y:.2f}) scale({s:.4f})" fill="none" '
        f'stroke-linecap="round" stroke-linejoin="round">'
        f'<circle cx="27" cy="27" r="20" stroke="{ring}" stroke-width="6"/>'
        f'<path d="M41.5 41.5 58 58" stroke="{ring}" stroke-width="7"/>'
        f'<path d="M16 31 27 21l11 10M20 28v9h14v-9" stroke="{roof}" stroke-width="4"/>'
        f"</g>"
    )


# ---------------------------------------------------------------- lockups
def lockup_a(fg, accent, name, bg=None, hole=None):
    pad = 8
    mark = mark_keyhole(pad, pad, 72, fg, hole=hole, mid=f"k-{name}")
    d1, w1 = text_path(SERIF, "Seeker", 50, pad + 88, pad + 46)
    d2, w2 = text_path(SANS, "ESTATES", 12.5, pad + 91, pad + 70, tracking=0.42)
    w = pad + 88 + max(w1, w2) + pad + 4
    h = 72 + 2 * pad
    back = f'<rect width="100%" height="100%" rx="10" fill="{bg}"/>' if bg else ""
    body = back + mark + f'<path d="{d1}" fill="{fg}"/><path d="{d2}" fill="{accent}"/>'
    return svg(w, h, body, "Seeker Estates")


def lockup_b(fg, accent, name, bg=None):
    pad = 8
    mark = mark_lens(pad, pad, 72, fg, accent)
    d1, w1 = text_path(SANS, "seeker", 52, pad + 86, pad + 50, tracking=-0.02)
    d2, w2 = text_path(SANS6, "ESTATES", 12, pad + 89, pad + 70, tracking=0.5)
    w = pad + 86 + max(w1, w2) + pad + 4
    h = 72 + 2 * pad
    back = f'<rect width="100%" height="100%" rx="10" fill="{bg}"/>' if bg else ""
    return svg(w, h, back + mark + f'<path d="{d1}" fill="{fg}"/><path d="{d2}" fill="{fg}" opacity=".7"/>', "Seeker Estates")


def lockup_c(fg, accent, name, bg=None):
    pad = 10
    d1, w1 = text_path(SERIF, "seeker", 64, pad, pad + 52)
    r = 7.5
    dot = f'<circle cx="{pad + w1 + r + 3:.1f}" cy="{pad + 52 - r:.1f}" r="{r}" fill="{accent}"/>'
    d2, w2 = text_path(SANS, "ESTATES · LONDON", 11, pad + 3, pad + 76, tracking=0.46)
    w = pad + max(w1 + 2 * r + 6, w2) + pad
    h = 80 + 2 * pad
    back = f'<rect width="100%" height="100%" rx="10" fill="{bg}"/>' if bg else ""
    return svg(w, h, back + f'<path d="{d1}" fill="{fg}"/>{dot}<path d="{d2}" fill="{fg}" opacity=".7"/>', "Seeker Estates")


def icon_a(bg, fg, hole, rx=14):
    """Square app/favicon tile for concept A."""
    body = f'<rect width="64" height="64" rx="{rx}" fill="{bg}"/>' + mark_keyhole(10, 8, 44, fg, hole=hole)
    return svg(64, 64, body, "Seeker Estates")


def write(path, data):
    with open(path, "w") as f:
        f.write(data)
    print("wrote", os.path.relpath(path, ROOT))


if __name__ == "__main__":
    os.makedirs(OUT_BRAND, exist_ok=True)
    os.makedirs(OUT_SITE, exist_ok=True)
    B = OUT_BRAND
    # Concept A — Keyhole Arch (recommended)
    write(f"{B}/concept-a-keyhole-arch.svg", lockup_a(GREEN, CLAY, "a1"))
    write(f"{B}/concept-a-keyhole-arch-reversed.svg", lockup_a(IVORY, "#E9A27F", "a2", bg=GREEN))
    write(f"{B}/concept-a-icon.svg", icon_a(GREEN, IVORY, CLAY))
    # Concept B — Modern Lens (evolution of the current logo)
    write(f"{B}/concept-b-modern-lens.svg", lockup_b("#10213A", "#FF6B4A", "b1"))
    write(f"{B}/concept-b-modern-lens-reversed.svg", lockup_b("#EEF2F6", "#FF8A6E", "b2", bg="#10213A"))
    # Concept C — Wordmark
    write(f"{B}/concept-c-wordmark.svg", lockup_c("#4A1C17", "#C9A24D", "c1"))
    write(f"{B}/concept-c-wordmark-reversed.svg", lockup_c("#F6EFE6", "#D9B566", "c2", bg="#4A1C17"))
    # Site assets (concept A)
    S = OUT_SITE
    write(f"{S}/logo.svg", lockup_a(GREEN, CLAY, "s1"))
    write(f"{S}/logo-reversed.svg", lockup_a(IVORY, "#E9A27F", "s2"))
    write(f"{S}/favicon.svg", icon_a(GREEN, IVORY, CLAY))
    write(f"{S}/mark.svg", svg(64, 64, mark_keyhole(0, 0, 64, GREEN, mid="m"), "Seeker Estates"))
