# Seeker Estates: new website & brand

A fast, static, SEO-first replacement for seekerestates.com, with three jobs:

1. **Guests book direct**: the booking bar and every "Book" button lead to the on-site `/book/` page, which embeds the Smoobu booking engine with dates and UTM tags.
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
| `tools/` | Logo generator (`make_logos.py`), PNG renderer (`render_images.js`), photo importer (`import_photos.py`, needs Pillow) |

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

## Status of launch items

| Item | Status |
|---|---|
| Pricing (15% / 12% + VAT, guaranteed rent quoted, £0 set-up) | Confirmed |
| Facts (90% occupancy, 520+ reviews, 8.9 Booking.com, 19 homes) | Confirmed |
| Public emails | corentin@ and reyhan@seekerestates.com shown on the site |
| Forms | Free [FormSubmit](https://formsubmit.co) AJAX endpoint, emailed to corentin@ with reyhan@ in cc, honeypot spam filter. **The first live submission sends an activation email to corentin@: click "Activate" once.** |
| Booking | On-site `/book/` page frames Smoobu's embeddable booking tool (`booking.smoobu.com/9A843651`, the same engine as the current `/reservation/` page), auto-sized with iframe-resizer, passing dates, guests, UTM and gclid. The hosted `seekerestates.myweb.smoobu.com` refuses to be framed, so it is only the new-tab fallback. **Check on the live domain:** that the engine loads, and whether it pre-fills the dates (if not, guests pick dates again in Smoobu). |
| Google tags | Waiting for GA4 ID, Ads ID and conversion labels |
| Property photos | Only the 2 photos on the old site's `/reservation/` page (St John's Wood and Wellington Road, NW8): home page gallery, `/stays/` and St John's Wood heroes. To add more, list them in `PHOTOS` in `site_config.py`, run `tools/import_photos.py` and rebuild. |
| Optional | Phone, WhatsApp, social links, company legal line, Search Console verification code |
| Privacy policy | Template, needs a review |
| Journey times on area pages | Approximate, verify any you quote in ads |

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
