"""Shared layout, icons and building blocks for the Seeker Estates site."""
import html
import json
import random
import re

import site_config as C

E = html.escape
# Preview builds (hosted where self-hosted font files may be blocked) also pull the same faces from Google Fonts.
GFONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap">'

# ------------------------------------------------------------------ icons
_I = {
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "key": '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    "star": '<path fill="currentColor" stroke="none" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    "calendar": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    "home": '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    "pound": '<path d="M18 7a4 4 0 0 0-8 0v14M6 21h12M6 13h8"/>',
    "chart": '<path d="M3 3v18h18"/><path d="m7 15 4-5 4 3 5-7"/>',
    "users": '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"/>',
    "briefcase": '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    "sparkle": '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M19 15v4M17 17h4"/>',
    "wifi": '<path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.1a6 6 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0M12 20h.01"/>',
    "bed": '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
    "id": '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M15 9h3M15 13h3M6 16.5c.8-1.5 1.9-2 3-2s2.2.5 3 2"/>',
    "wrench": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    "camera": '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    "file": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    "pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "chat": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "scale": '<path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8"/>',
    "train": '<rect x="4" y="3" width="16" height="13" rx="3"/><path d="M4 11h16M8 19l-2 3M16 19l2 3M8.5 13.5h.01M15.5 13.5h.01"/>',
    "lock": '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    "tag": '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "door": '<path d="M5 21V10a7 7 0 0 1 14 0v11z"/><circle cx="12" cy="11" r="1.6"/><path d="M12 12.6V15"/>',
    "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
}


def icon(name, cls=""):
    c = f' class="{cls}"' if cls else ""
    return (f'<svg{c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{_I[name]}</svg>')


def stars(n=5):
    return '<span class="stars" aria-label="5 out of 5">' + icon("star") * n + "</span>"


# ------------------------------------------------------------------ urls
class Ctx:
    """Per-page context used to build relative links (works on any host,
    in a subfolder, or opened straight from disk with preview=True)."""
    preview = False
    absolute = False  # root-relative links (for 404.html, served at any URL)

    def __init__(self, path):
        self.path = path  # "" for home, "landlords/" etc.

    @property
    def depth(self):
        return self.path.count("/")

    def url(self, target):
        if self.absolute:
            return "/" + target
        rel = "../" * self.depth + target
        if self.preview and (target == "" or target.endswith("/")):
            rel += "index.html"
        return rel or "./"

    def asset(self, p):
        if self.absolute:
            return "/assets/" + p
        return "../" * self.depth + "assets/" + p

    def abs(self, target=None):
        return f"{C.SITE_URL}/{self.path if target is None else target}"


# ------------------------------------------------------------------ nav
NAV = [
    ("stays/", "Stays"),
    ("mid-term-stays/", "Monthly stays"),
    ("areas/", "Areas"),
    ("landlords/", "Landlords"),
    ("pricing/", "Pricing"),
    ("about/", "About"),
]


def header(ctx, audience):
    cur = ' aria-current="page"'
    links = "".join(
        f'<li><a href="{ctx.url(p)}"{cur if ctx.path.startswith(p) else ""}>{E(t)}</a></li>'
        for p, t in NAV)
    if audience == "owner":
        top = (f'Own a London property? <a href="{ctx.url("revenue-calculator/")}">See what it could earn in 30 seconds →</a>')
        cta = (f'<a class="btn btn--ghost btn--sm" href="{ctx.url("revenue-calculator/")}">Earnings calculator</a>'
               f'<a class="btn btn--clay btn--sm" href="{ctx.url("landlords/")}#enquire">Get a free appraisal</a>')
    else:
        top = (f'Book direct and save {C.FACTS["direct_discount"]} compared with Airbnb and Booking.com. '
               f'<a href="{ctx.url('book/')}" data-book>Check availability →</a>')
        cta = (f'<a class="btn btn--ghost btn--sm" href="{ctx.url("landlords/")}">List your property</a>'
               f'<a class="btn btn--sm" href="{ctx.url('book/')}" data-book>Book a stay</a>')
    return f"""
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="topbar">{top}</div>
  <nav class="wrap nav" aria-label="Main">
    <a class="brand" href="{ctx.url('')}" aria-label="{C.BRAND} — home"><img src="{ctx.asset('img/logo.svg')}" alt="{C.BRAND}" width="273" height="88"></a>
    <ul class="nav-links">{links}</ul>
    <div class="nav-cta">{cta}</div>
    <button class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span></button>
  </nav>
</header>"""


def footer(ctx):
    areas = "".join(f'<li><a href="{ctx.url("areas/" + a["slug"] + "/")}">{E(a["name"])}</a></li>' for a in C.AREAS[:6])
    contact = [f'<li><a href="mailto:{e}">{e}</a></li>' for e in C.EMAILS]
    if C.PHONE:
        contact.append(f'<li><a href="tel:{C.PHONE.replace(" ", "")}">{E(C.PHONE)}</a></li>')
    for label, u in (("Instagram", C.INSTAGRAM), ("Facebook", C.FACEBOOK), ("TikTok", C.TIKTOK)):
        if u:
            contact.append(f'<li><a href="{u}" rel="noopener" target="_blank">{label}</a></li>')
    legal = E(C.COMPANY_LEGAL) if C.COMPANY_LEGAL else C.BRAND
    return f"""
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="{ctx.url('')}"><img src="{ctx.asset('img/logo-reversed.svg')}" alt="{C.BRAND}" width="273" height="88" loading="lazy"></a>
        <p class="footer-tag">{E(C.TAGLINE)}</p>
        <p class="small">Serviced apartments and managed homes across London. Short stays, mid-term stays and property management for landlords.</p>
      </div>
      <div>
        <h4>Guests</h4>
        <ul>
          <li><a href="{ctx.url('book/')}" data-book>Book direct</a></li>
          <li><a href="{ctx.url('stays/')}">Stay with us</a></li>
          <li><a href="{ctx.url('mid-term-stays/')}">Mid-term &amp; corporate stays</a></li>
          <li><a href="{ctx.url('areas/')}">All areas</a></li>
          {areas}
        </ul>
      </div>
      <div>
        <h4>Landlords</h4>
        <ul>
          <li><a href="{ctx.url('landlords/')}">Property management</a></li>
          <li><a href="{ctx.url('pricing/')}">Pricing</a></li>
          <li><a href="{ctx.url('revenue-calculator/')}">Earnings calculator</a></li>
          <li><a href="{ctx.url('landlords/')}#enquire">Free appraisal</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="{ctx.url('about/')}">About us</a></li>
          <li><a href="{ctx.url('faq/')}">FAQ</a></li>
          <li><a href="{ctx.url('contact/')}">Contact</a></li>
          {''.join(contact)}
        </ul>
      </div>
    </div>
    <div class="footer-base">
      <span>© <span data-year>2026</span> {legal}. All rights reserved.</span>
      <span><a href="{ctx.url('privacy/')}">Privacy &amp; cookies</a></span>
    </div>
  </div>
</footer>"""


def mobile_cta(ctx, audience):
    if audience == "owner":
        return (f'<div class="mobile-cta"><a class="btn btn--ghost" href="{ctx.url("revenue-calculator/")}">Calculator</a>'
                f'<a class="btn btn--clay" href="{ctx.url("landlords/")}#enquire">Free appraisal</a></div>')
    return (f'<div class="mobile-cta"><a class="btn btn--ghost" href="{ctx.url("landlords/")}">Landlords</a>'
            f'<a class="btn" href="{ctx.url('book/')}" data-book>Book direct</a></div>')


# ------------------------------------------------------------------ schema
def org_schema():
    same = [u for u in (C.INSTAGRAM, C.FACEBOOK, C.TIKTOK) if u]
    d = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": C.SITE_URL + "/#org",
        "name": C.BRAND,
        "url": C.SITE_URL + "/",
        "logo": C.SITE_URL + "/assets/img/logo.png",
        "email": C.EMAIL,
        "slogan": C.TAGLINE,
        "areaServed": {"@type": "City", "name": "London"},
    }
    if C.PHONE:
        d["telephone"] = C.PHONE
    if same:
        d["sameAs"] = same
    return d


def lodging_schema():
    return {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "@id": C.SITE_URL + "/#lodging",
        "name": C.BRAND,
        "description": "Serviced apartments and homes across London for short and mid-term stays. Book direct.",
        "url": C.SITE_URL + "/",
        "image": C.SITE_URL + "/assets/img/og.png",
        "email": C.EMAIL,
        "priceRange": "££",
        "address": {"@type": "PostalAddress", "addressLocality": "London", "addressCountry": "GB"},
        "areaServed": [{"@type": "Place", "name": a["name"] + ", London"} for a in C.AREAS],
        "amenityFeature": [{"@type": "LocationFeatureSpecification", "name": n, "value": True}
                           for n in ("Free Wi-Fi", "Fully equipped kitchen", "Fresh linen and towels", "Self check-in")],
        "parentOrganization": {"@id": C.SITE_URL + "/#org"},
    }


def faq_schema(items):
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": q,
                        "acceptedAnswer": {"@type": "Answer", "text": _strip(a)}} for q, a in items],
    }


def crumbs_schema(ctx, crumbs):
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": ctx.abs(p)}
                            for i, (p, n) in enumerate(crumbs)],
    }


def _strip(s):
    return re.sub(r"<[^>]+>", "", s).strip()


# ------------------------------------------------------------------ blocks
def crumbs(ctx, items):
    lis = []
    for i, (p, n) in enumerate(items):
        if i == len(items) - 1:
            lis.append(f'<li aria-current="page">{E(n)}</li>')
        else:
            lis.append(f'<li><a href="{ctx.url(p)}">{E(n)}</a></li>')
    return f'<nav class="crumbs" aria-label="Breadcrumb"><ol>{"".join(lis)}</ol></nav>'


def faq_block(items):
    return '<div class="faq">' + "".join(
        f"<details><summary>{E(q)}</summary><div><p>{a}</p></div></details>" for q, a in items) + "</div>"


def section_head(eyebrow, title, lead="", center=False):
    cls = "section-head section-head--center" if center else "section-head"
    l = f'<p class="lead">{lead}</p>' if lead else ""
    return f'<div class="{cls} reveal"><span class="eyebrow">{eyebrow}</span><h2>{title}</h2>{l}</div>'


def cta_band(ctx, audience="guest", title=None, text=None):
    if audience == "owner":
        t = title or "See what your property could earn."
        x = text or "A free, no-obligation appraisal with real numbers for your street — not a sales pitch."
        a = (f'<a class="btn btn--clay" href="{ctx.url("landlords/")}#enquire">Get a free appraisal</a>'
             f'<a class="btn btn--light" href="{ctx.url("revenue-calculator/")}">Try the calculator</a>')
    else:
        t = title or "Your London home is ready."
        x = text or f"Book direct for our best rate — {C.FACTS['direct_discount']} below the price on Airbnb and Booking.com, with the same homes and the same team."
        a = (f'<a class="btn btn--clay" href="{ctx.url('book/')}" data-book>Check availability</a>'
             f'<a class="btn btn--light" href="{ctx.url("contact/")}">Ask us a question</a>')
    return f'<section class="section--tight"><div class="wrap"><div class="cta-band reveal"><div><h2>{t}</h2><p>{x}</p></div><div class="actions">{a}</div></div></div></section>'


def bookbar(cls=""):
    opts = "".join(f'<option value="{n}"{" selected" if n == 2 else ""}>{n} guest{"s" if n > 1 else ""}</option>' for n in range(1, 9))
    return f"""<form class="bookbar {cls}" aria-label="Check availability">
  <label>Check in<input type="date" name="arrival" required></label>
  <label>Check out<input type="date" name="departure" required></label>
  <label>Guests<select name="guests">{opts}</select></label>
  <button class="btn btn--clay" type="submit">Check availability {icon('arrow')}</button>
</form>
<p class="bookbar-note"><strong>Direct-booking rate:</strong> {C.FACTS['direct_discount']} below Airbnb &amp; Booking.com prices · secure booking via our booking partner</p>"""


def mini_estimator(ctx):
    beds = "".join(f'<option value="{k}"{" selected" if k == "2" else ""}>{v["label"]}</option>' for k, v in C.CALC["beds"].items())
    return f"""<form class="mini-est" action="{ctx.url('revenue-calculator/')}" aria-label="Quick earnings estimate">
  <label>Postcode<input name="postcode" placeholder="e.g. NW8 9QE" autocomplete="postal-code"></label>
  <label>Bedrooms<select name="beds">{beds}</select></label>
  <button class="btn btn--clay" type="submit">Estimate {icon('arrow')}</button>
</form>
<p class="bookbar-note">Free and instant. No email needed to see your estimate.</p>"""


def lead_form(ctx, kind="landlord", title="Get your free appraisal", button="Request my appraisal"):
    beds = "".join(f'<option value="{k}"{" selected" if k == "2" else ""}>{v["label"]}</option>' for k, v in C.CALC["beds"].items())
    if kind == "landlord":
        extra = f"""
  <div class="form-row">
    <label class="field"><span>Property postcode</span><input class="input" name="postcode" required autocomplete="postal-code" data-calc-field="postcode"></label>
    <label class="field"><span>Bedrooms</span><select class="select input" name="beds" data-calc-field="beds">{beds}</select></label>
  </div>
  <label class="field"><span>Right now the property is…</span>
    <select class="select input" name="situation">
      <option>Empty / about to be empty</option><option>Let to a long-term tenant</option>
      <option>On Airbnb, self-managed</option><option>With another management company</option><option>Being bought or refurbished</option>
    </select></label>
  <label class="field"><span>Which option interests you?</span>
    <select class="select input" name="plan">
      <option>Not sure yet — advise me</option><option>Fully managed</option><option>Guaranteed rent</option><option>Mid-term lets only</option>
    </select></label>
  <input type="hidden" name="estimate" data-calc-field="estimate">"""
    else:
        extra = """
  <label class="field"><span>I'm a…</span>
    <select class="select input" name="topic"><option>Guest with a booking question</option><option>Company booking a mid-term stay</option><option>Landlord / property owner</option><option>Other</option></select></label>
  <label class="field"><span>Message</span><textarea class="input" name="message" required></textarea></label>"""
    phone_req = " required" if kind == "landlord" else ""
    return f"""<form class="form" data-lead="{kind}" novalidate>
  <h3>{title}</h3>
  <div class="form-row">
    <label class="field"><span>Your name</span><input class="input" name="name" required autocomplete="name"></label>
    <label class="field"><span>Email</span><input class="input" type="email" name="email" required autocomplete="email"></label>
  </div>
  <label class="field"><span>Phone</span><input class="input" type="tel" name="phone"{phone_req} autocomplete="tel"></label>
  {extra}
  <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
  <label class="consent"><input type="checkbox" name="consent" required> <span>I agree that {C.BRAND} may contact me about this enquiry. See our <a href="{ctx.url('privacy/')}">privacy policy</a>.</span></label>
  <button class="btn btn--clay btn--block" type="submit">{button}</button>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>"""


# ------------------------------------------------------------------ art
def area_art(area, w=300, h=400):
    """Deterministic illustrated tile for an area card / hero."""
    bg, accent = area["palette"]
    rnd = random.Random(area["slug"])
    sky = (f'<defs><linearGradient id="g-{area["slug"]}" x1="0" y1="0" x2="0" y2="1">'
           f'<stop offset="0" stop-color="{bg}"/><stop offset=".7" stop-color="{bg}"/>'
           f'<stop offset="1" stop-color="{accent}" stop-opacity=".55"/></linearGradient></defs>'
           f'<rect width="{w}" height="{h}" fill="url(#g-{area["slug"]})"/>')
    sun = f'<circle cx="{rnd.randint(70, 230)}" cy="{rnd.randint(110, 170)}" r="34" fill="{accent}" opacity=".9"/>'
    base = h * .62
    shapes = []
    x = -10
    while x < w:
        bw = rnd.randint(26, 54)
        bh = rnd.randint(40, 120)
        shapes.append(f'<rect x="{x}" y="{base - bh:.0f}" width="{bw}" height="{bh + 70}" fill="#000" opacity=".22"/>')
        x += bw + rnd.randint(-4, 6)
    m = area["motif"]
    fg = []
    if m == "towers":
        for tx, th in ((60, 190), (110, 230), (160, 170), (200, 210)):
            fg.append(f'<rect x="{tx}" y="{base - th + 60:.0f}" width="34" height="{th + 10}" fill="#000" opacity=".35"/>')
            fg.append(f'<path d="M{tx} {base - th + 60:.0f} l17 -18 l17 18z" fill="#000" opacity=".35"/>')
    elif m == "terrace":
        for i in range(6):
            tx = i * 52
            fg.append(f'<rect x="{tx}" y="{base - 30:.0f}" width="50" height="100" fill="#000" opacity=".3"/>')
            fg.append(f'<path d="M{tx + 17} {base + 6:.0f} v-14 a8 8 0 0 1 16 0 v14z" fill="{accent}" opacity=".85"/>')
    elif m == "dome":
        fg.append(f'<path d="M90 {base + 20:.0f} a60 60 0 0 1 120 0z" fill="#000" opacity=".35"/>')
        fg.append(f'<rect x="80" y="{base + 20:.0f}" width="140" height="{h}" fill="#000" opacity=".35"/>')
        fg.append(f'<rect x="146" y="{base - 60:.0f}" width="8" height="30" fill="#000" opacity=".35"/>')
    elif m == "hill":
        fg.append(f'<path d="M-20 {h} Q {w * .35:.0f} {base - 40:.0f} {w + 20} {h}z" fill="#000" opacity=".3"/>')
        fg.append(f'<circle cx="{w * .35:.0f}" cy="{base + 4:.0f}" r="4" fill="{accent}"/>')
    elif m == "stadium":
        fg.append(f'<path d="M40 {base + 50:.0f} q110 -70 220 0z" fill="#000" opacity=".3"/>')
        fg.append(f'<path d="M60 {base + 30:.0f} q90 -160 180 0" fill="none" stroke="{accent}" stroke-width="5" opacity=".8"/>')
    ground = f'<rect y="{base + 70:.0f}" width="{w}" height="{h}" fill="#000" opacity=".25"/>'
    shade = f'<rect width="{w}" height="{h}" fill="url(#s-{area["slug"]})"/><defs><linearGradient id="s-{area["slug"]}" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></linearGradient></defs>'
    return (f'<svg class="area-art" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
            + sky + sun + "".join(shapes) + "".join(fg) + ground + shade + "</svg>")


# ------------------------------------------------------------------ page shell
def page(ctx, *, title, description, body, audience="guest", schema=(), scripts=(), noindex=False, og_type="website"):
    cfg = {
        "root": ctx.url(""),
        "email": C.EMAIL,
        "cc": ",".join(C.EMAILS[1:]),
        "bookingUrl": C.BOOKING_URL,
        "bookingEmbedUrl": C.BOOKING_EMBED_URL,
        "bookPage": ctx.url("book/"),
        "bookingParams": C.BOOKING_PARAMS,
        "formEndpoint": C.FORM_ENDPOINT,
        "ga4": C.GA4_ID, "adsId": C.ADS_ID,
        "adsLeadLabel": C.ADS_LEAD_LABEL, "adsBookLabel": C.ADS_BOOK_LABEL,
    }
    if "calculator.js" in scripts:
        cfg["calc"] = C.CALC
    ld = "".join(f'<script type="application/ld+json">{json.dumps(s, ensure_ascii=False)}</script>' for s in schema)
    js = "".join(f'<script src="{ctx.asset("js/" + s)}" defer></script>' for s in scripts)
    verify = f'<meta name="google-site-verification" content="{C.GOOGLE_SITE_VERIFICATION}">' if C.GOOGLE_SITE_VERIFICATION else ""
    robots = "noindex, follow" if noindex else "index, follow, max-image-preview:large"
    body = re.sub(r'href="~/([^"]*)"', lambda m: f'href="{ctx.url(m.group(1))}"', body)
    page_id = ctx.path.strip("/").replace("/", "-") or "home"
    return f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add("js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<meta name="description" content="{E(description)}">
<link rel="canonical" href="{ctx.abs()}">
<meta name="robots" content="{robots}">
{verify}
<meta name="theme-color" content="#0F3D2E">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="{C.BRAND}">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="{ctx.abs()}">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(description)}">
<meta property="og:image" content="{C.SITE_URL}/assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{ctx.asset('img/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="{ctx.url('favicon.ico')}" sizes="32x32">
<link rel="apple-touch-icon" href="{ctx.asset('img/apple-touch-icon.png')}">
<link rel="manifest" href="{ctx.url('site.webmanifest')}">
<link rel="preload" href="{ctx.asset('fonts/fraunces-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{ctx.asset('fonts/plus-jakarta-sans-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{ctx.asset('css/site.css')}">
{GFONTS if ctx.preview else ""}
<script>window.SEEKER={json.dumps(cfg)};</script>
{ld}
</head>
<body data-page="{page_id}" data-audience="{audience}">
{header(ctx, audience)}
<main id="main">
{body}
</main>
{footer(ctx)}
{mobile_cta(ctx, audience)}
<script src="{ctx.asset('js/site.js')}" defer></script>
{js}
</body>
</html>
"""
