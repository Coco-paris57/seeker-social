# Seeker Estates: new website & brand

A fast, static, SEO-first replacement for seekerestates.com, with three jobs:

1. **Guests book direct**: the booking bar and every "Book" button go to the Smoobu booking engine with UTM tags.
2. **Landlords see the service and pricing**: `/landlords/`, `/pricing/`, and a free **earnings calculator** (`/revenue-calculator/`, Houst-style) that turns into a lead form.
3. **Google Ads landing pages**: one page per intent (`/stays/`, `/mid-term-stays/`, `/landlords/`, `/revenue-calculator/`) and per area (`/areas/canary-wharf/` …).

There is no property list any more. Guests choose areas, then book in Smoobu.

## Folder map

| Path | What it is |
|---|---|
| `site_config.py` | **Edit this first.** Contact details, booking URL, form endpoint, Google tags, facts, prices, calculator assumptions, areas. Every `# CONFIRM` needs a decision before launch. |
| `pages.py` | All page copy |
| `components.py` | Header, footer, icons, forms, SEO schema, page shell |
| `src/assets/` | CSS, JS, fonts (self-hosted, OFL), logos, illustrations |
| `build.py` | Generates `site/` |
| `site/` | **The built website: upload this folder.** |
| `brand/` | Logo proposals (open `brand/index.html`), SVG files, fonts |
| `tools/` | Logo generator (`make_logos.py`) and PNG renderer (`render_images.js`) |

## Build

```bash
python3 website/build.py            # → website/site/
python3 website/build.py --preview  # → website/preview/ (links end in index.html, open from disk)
python3 website/build.py --images   # also re-render og.png, logo.png and icons (needs Playwright + Pillow)
```

The HTML build needs only the Python standard library.

## Deploy

`site/` is plain HTML/CSS/JS. Any static host works: Netlify, Cloudflare Pages, Vercel or GitHub Pages. Point `seekerestates.com` at it.
- `404.html`, `sitemap.xml`, `robots.txt`, `site.webmanifest` and a Netlify/Cloudflare `_headers` file are generated.
- After going live, submit `https://seekerestates.com/sitemap.xml` in Google Search Console.
- Add 301 redirects from the old site's URLs (for example the old property pages and `/reservation/`) to `/stays/` or the matching area page, so you keep existing Google ranking.

## Before launch: decisions needed (`# CONFIRM` in `site_config.py`)

1. **Pricing.** The proposed plans are 15% + VAT fully managed, 12% + VAT mid-term only, guaranteed rent quoted per property, £0 set-up, 12-month initial term, 60 days' notice. Market range: Houst from 12% (18% flexible), Pass the Keys 12–15%, GuestReady from 12%.
2. **Public email**, plus optional phone, WhatsApp, social links and the legal line (company name and number).
3. **Form endpoint.** Without one, forms open the visitor's email app. With Formspree, Basin, HubSpot or a Make/Zapier webhook, leads arrive silently and the Google Ads conversion fires.
4. **Google tags.** GA4 ID, Google Ads ID and the two conversion labels (lead, book click). The cookie banner and Consent Mode v2 switch on automatically once an ID is set.
5. **Facts.** 90% occupancy (last 12 months), 520+ reviews, 8.9 on Booking.com, 19 homes.
6. **Calculator assumptions** (`CALC`). Tune them to your own portfolio data. The method is shown to visitors, so keep it honest.
7. **Booking bar parameters.** Check whether Smoobu's hosted site pre-fills dates from `?arrival=&departure=&guests=`. If it doesn't, guests simply pick dates again.
8. **Journey times** on area pages are approximate. Verify any you quote in ads.
9. **Privacy policy** is a template. Have it reviewed.
10. **Photos.** The site uses drawn illustrations because there's no photography yet. Swap in real photos: replace the `<img>` inside any `.arch` frame, or the `area_art()` call on area pages.

## SEO built in

- A unique `<title>` and meta description per page, written for the search terms you'll run ads on ("serviced apartments Canary Wharf", "property management London", "Airbnb income calculator London").
- Canonical URLs, Open Graph and Twitter cards, and a 1200×630 share image.
- JSON-LD on every page: Organization, LodgingBusiness, Service + Offer, FAQPage, BreadcrumbList, WebApplication (calculator), ItemList (areas).
- Semantic HTML, one `<h1>` per page, breadcrumbs, internal links between area, guest and landlord pages.
- Fast: no framework, self-hosted fonts (also GDPR-friendly), about 45 KB of uncompressed CSS and JS, SVG illustrations.

## Google Ads: suggested campaign → landing page

| Campaign | Example keywords | Landing page |
|---|---|---|
| Guests, brand + direct | seeker estates, serviced apartments london book direct | `/stays/` |
| Guests, areas | serviced apartment canary wharf, apartment near excel london, marylebone apartment rental | `/areas/<area>/` |
| Guests, events | apartment near the o2, stay near wembley stadium, apartment near harry potter studio tour | matching area page |
| Corporate / monthly | corporate housing london, furnished monthly rental london | `/mid-term-stays/` |
| Landlords, management | airbnb management london, serviced accommodation management, short let management london | `/landlords/` |
| Landlords, calculator | airbnb income calculator london, how much can I earn on airbnb london | `/revenue-calculator/` |
| Landlords, guaranteed rent | guaranteed rent london landlords | `/pricing/` |

Keep the brand rules: never "fully insured" (say "public liability insured"), never mention licensing or redress schemes, never promise a yield multiple.
