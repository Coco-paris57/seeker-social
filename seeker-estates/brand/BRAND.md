# Seeker Estates — brand system v2 (October 2026)

**Read this before making any post, carousel, Reel or graphic.** It replaces v1 (navy, Lora/Poppins, magnifying-glass logo). v1 is kept in `archive-v1/` for reference only — do not use its colours, fonts or logo.

**Tagline:** London homes, properly run.
**Positioning:** whole London homes with hotel standards for guests; honest, fully managed lets or guaranteed rent for landlords. Mid-term stays (91+ nights) first, short stays second.
**Voice:** Professional. Premium. Reliable. Plain English, short sentences. Never cheap, never desperate, never argumentative, never misrepresent.
**Faceless brand:** no founder or staff on camera. On-screen text, optional voiceover, real ambient sound.

---

## 1. Logo — the keyhole arch
A London doorway arch with a keyhole cut through it (the old magnifying-glass lens, simplified).

| Need | File |
|---|---|
| Logo on light / ivory | `logo-transparent.png` (= `logo/png/seeker-estates-logo-green-1200px.png`) |
| Logo on green / dark / photos | `logo-white.png` (= `logo/png/seeker-estates-logo-ivory-1200px.png`) |
| Mark in a tile over busy footage | `logo-tile-white.png` (ivory tile, green arch, clay keyhole) |
| Vector (any size, print) | `logo/svg/` |
| Arch only (small spaces, watermarks) | `logo/png/seeker-estates-mark-*.png` |
| Arch above the name (square spaces) | `logo/png/seeker-estates-stacked-*-2048px.png` |
| Profile pictures (all networks) | `logo/social/profile-picture-green-with-name-1080.png` (preferred) |

Rules: clear space ≥ the height of the keyhole on every side. Never stretch, rotate, recolour outside the palette, add shadows/outlines, or put the green logo on dark or busy images (use the ivory logo or the tile).

## 2. Colour
| Token | Hex | Use |
|---|---|---|
| **Green** | `#0F3D2E` | Main colour. Dark grounds, covers, title cards, end cards. |
| **Ivory** | `#F6F1E7` | Light grounds, inside slides; text on green. |
| **Clay** | `#C8582F` | Accent only: keyhole, rules, small shapes. Never body text. |
| **Clay 700** | `#A9441F` | Accent text on ivory, labels, location tags, buttons. |
| **Peach** | `#F0A483` | Accent text on green (italic words, labels). |
| **Sand** | `#EADFCB` | Soft secondary ground; text on clay. |
| **Ink** | `#13221C` | Body text on ivory. **Muted** `#4E5E56` for secondary text. |
| Green 600 | `#1F5A44` | Subtle shapes on green (maps, arches). |

Machine-readable: `tokens.json`. Balance: ~60% green or ivory ground, ~30% the other, ≤10% clay/peach.

## 3. Type (free, OFL — files in `fonts/`)
- **Fraunces** semi-bold (560/600) for headlines; **Fraunces italic** (480) for the 1–4 accent words, coloured clay 700 on ivory or peach on green. Example: "Section 21 is gone. *Here's what that means.*"
- **Plus Jakarta Sans** — 400 body, 600 UI, **700 UPPERCASE + letter-spacing 0.18–0.22em** for labels and tags.
- No third font. No script fonts. No all-caps body text. Sentence case headlines.
- Web: `.woff2`; design tools, ffmpeg drawtext, Pillow: `.ttf` (`Fraunces-SemiBold.ttf`, `Fraunces-Italic.ttf`, `PlusJakartaSans-*.ttf`).

## 4. Formats & safe zones
| Format | Size | Notes |
|---|---|---|
| Carousel (IG/FB, TikTok photo mode) | 1080×1350 | Cover → inside pages → CTA page. Max 45 words per inside page. |
| Reel / TikTok / Story | 1080×1920, 30 fps, H.264, ≤ 60 s | Text only inside the safe zone: **288 px top, 480 px bottom**. Hook on screen by 0.5 s. |
| Square feed | 1080×1080 | Same layout as carousel, shorter headline. |

## 5. Templates (use these — don't redesign each post)
`templates/post.html` + `templates/render.js` render on-brand PNGs from a JSON spec:

```bash
node seeker-estates/brand/templates/render.js spec.json posts/2026-10-21_example/
```
```json
[
 {"file":"slide-1.png","format":"cover","label":"Landlord day · Wednesday","headline":"Section 21 is gone.\n*Here's what that means* for your London flat.","footnote":"Renters' Rights Act 2025 · in force since 1 May 2026"},
 {"file":"slide-2.png","format":"inside","label":"Landlord day","headline":"Every tenancy is now *periodic.*","body":"Up to 45 words…","footnote":"General information, not legal advice.","page":"2 / 6"},
 {"file":"slide-6.png","format":"cta","label":"Landlord day","headline":"Want the numbers *for your home?*","url":"seekerestates.com","body":"Free earnings calculator · link in bio","footnote":"General information, not legal advice."}
]
```
Formats: `cover` (ivory), `cover-dark` (green), `inside`, `cta` (green end page), `reel-title`, `story`, `tag` (location tag, transparent). `*word*` = italic accent, `\n` = line break, `"theme": "light"|"dark"|"clay"` overrides. Examples of every format: `samples/`.

Alternate covers: ivory for landlord/practical pillars, green for product/London pillars, so the grid reads as a rhythm.

## 6. Motion (Reels, TikTok)
- **Monday "London This Week"** opens with `motion/title-sting_london-this-week.mp4` (2.5 s): the arch draws, keyhole pops, title rises. Same sting every week.
- Brand moves: arch draws/opens, keyhole pop (slight overshoot), words rise 70 px with a stagger, **arch-shaped curtain wipes** between scenes, hard cuts between solid colours (never cross-fade two solid grounds — it goes muddy).
- On-screen text: Fraunces on a green bar or directly on green/ivory; max 880 px wide; centred around 40% height.
- **Location tag** (`samples/location-tag_example.png`): ivory text on clay 700 pill, ~68% height: `E14 · CANARY WHARF · JUBILEE / ELIZABETH`. **Postcode district only** (E14, NW8…), never the full postcode or street — same rule as the website map.
- Reference edit: `motion/seeker-estates-rebrand-30s.mp4`. Motion source files are HTML with a `render(t)` function; export with `motion/render.js file.html out.mp4`.
- Audio: real ambient sound or a cleared library track. Never trending audio (business accounts can't).

## 7. Imagery
Real photos of our homes, bright and uncluttered; no stock people, no fake interiors. When no photo fits, use typography on green/ivory rather than a stock image. Arch-shaped crops (rounded top) are a brand device for photos in graphics.

## 8. Captions & links
- First line = the hook, with the search words written plainly ("where to stay near ExCeL London").
- 3–5 hashtags. **No links in the caption body.** CTA line last.
- **Booking link (bio + first comment):** `https://seekerestates.com/book/?utm_source={network}&utm_medium=social&utm_campaign={yyyy-mm}-{slug}`
  (replaces the old `seekerestates.myweb.smoobu.com` link — the booking engine now lives on our own site).
- **Landlord CTA link:** `https://seekerestates.com/revenue-calculator/?utm_source={network}&utm_medium=social&utm_campaign={yyyy-mm}-{slug}`
- WhatsApp: +44 7397 573367 → `https://wa.me/447397573367`. Email: corentin@seekerestates.com.

## 9. Facts we can say (confirmed Oct 2026)
19 homes across London (+ Kings Langley near the Studio Tour) · 520+ guest reviews · 8.9 on Booking.com · 90% average occupancy · average stay 6 nights · book direct = 10% below Airbnb/Booking.com · ID-verified guests, security deposit, **public liability insured** · Fully managed 15% + VAT, mid-term 12% + VAT, guaranteed rent quoted per property, £0 set-up.

**Never say:** "fully insured"; anything about licensing or redress schemes; yield multiples ("double your rent"). Landlord posts end with "General information, not legal advice." Seeker Estates Ltd · Company no. 15310020.

## 10. File map
```
brand/
  BRAND.md            this guide
  tokens.json         colours, fonts, links (machine-readable)
  logo-*.png          new logo under the old file names (backward compatible)
  logo/               full logo pack: svg/, png/, social/
  fonts/              Fraunces + Plus Jakarta Sans (.ttf and .woff2, OFL)
  templates/          post.html + render.js (carousel, reel title, story, tag)
  samples/            rendered examples of every template + title card
  motion/             title sting, rebrand video, render.js
  archive-v1/         old brand (do not use)
```
