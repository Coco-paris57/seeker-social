# Seeker Estates — handover (10 Sep 2026, 23:40 UK)

> **UPDATE 17 Oct 2026: rebrand.** New website live at https://seekerestates.com and a new brand system: **read `brand/BRAND.md` (v2) first**. New logo (keyhole arch), colours (green #0F3D2E, ivory #F6F1E7, clay #C8582F), fonts (Fraunces + Plus Jakarta Sans), post templates (`brand/templates/`), new Monday title sting (`brand/motion/`). The old navy/Lora/magnifier brand is archived in `brand/archive-v1/`; don't use it.
> **Booking link changed:** use `https://seekerestates.com/book/?utm_source={network}&utm_medium=social&utm_campaign={yyyy-mm}-{slug}` (the Smoobu engine is embedded there). Landlord CTA: `https://seekerestates.com/revenue-calculator/` (+ same UTM). WhatsApp +44 7397 573367.

Read this first. This folder is the complete working state of the Seeker Estates social media operation, moved from the original Cowork session. Skills `seeker-weekly-content-run`, `seeker-london-desk`, `seeker-landlord-desk`, `seeker-studio` are saved on Corentin's account and describe the operating rules; Metricool, Dropbox and Cloudinary are connected as claude.ai connectors.

## Immediate next actions (in order)
1. Commit this whole folder into `Coco-paris57/seeker-social` (this session should have push access to it). Keep `posts/` folders as-is — Metricool fetches media from raw.githubusercontent.com URLs of this repo.
2. Push `posts/2026-09-15_barking/` (already produced) and schedule it in Metricool for **Tue 15 Sep 2026 12:30 Europe/London**, brand id 6916164:
   - One post for Instagram + TikTok with `autoPublish: false` (Instagram is a personal account; Corentin taps the Metricool app notification). TikTok photo mode: `tiktokData.photoCoverIndex: 0`.
   - One post for Facebook with `autoPublish: true`.
   - Media: the 7 slide PNGs as raw GitHub URLs. Caption in `caption.txt`, link only in `firstCommentText` from `first-comment.txt` (use utm_source=facebook for the Facebook copy).
   - Metricool re-hosts media at creation; reuse its static.metricool.com URLs for the second post.
3. Already scheduled (do NOT duplicate): Bayeux carousel, Fri 11 Sep 08:30 — IG+TikTok post id 374154227 (manual tap), Facebook post id 374154307 (auto).
4. Week 1 remaining posts (see `outputs/Week-1-Approval-Pack.docx`): Sat 12 launch reel (needs Corentin's flagship + turnover footage), Mon 14 London This Week (title sting in `brand/`, needs stock/B-roll), Wed 16 Section 21 carousel (typographic — build with the studio skill), Thu 17 turnover reel (needs footage), Sat 19 Open House (build Thu from openhouse.org.uk).

## Facts confirmed by Corentin (10 Sep)
- Model: mid-term stays 91+ nights first, short lets up to 90 nights/yr. 19 properties (see `build/properties.py`). Faceless brand — never on camera. Tone: Professional, Premium, Reliable; never cheap.
- Say: ID-verified guests, security deposit, public liability insured. Never say "fully insured". Never mention licensing or redress schemes.
- Booking link: ~~https://seekerestates.myweb.smoobu.com~~ → **https://seekerestates.com/book/** (+UTM) since 17 Oct 2026.
- Instagram stays personal (no Business switch). Facebook, Instagram, TikTok all connected in Metricool.
- Media pipeline: chat attachments → studio edits here → push to GitHub repo → Metricool fetches. Dropbox connector is text-only; Cloudinary needs base64 through chat (too costly). GitHub is the rail.

## Folder map
- `research/` four research files (events to Mar 2027, benchmarks, landlord market, platform mechanics)
- `build/posts.py` the 68-post calendar data · `build/properties.py` · `build/mkxlsx*.py` rebuild the spreadsheet · `build/cal_template.html` calendar artifact template
- `brand/` logo cut-outs, title card + sting, style samples, BRAND.md
- `posts/` produced posts (Bayeux 11 Sep, Barking 15 Sep)
- `outputs/` the spreadsheet, information request, week-1 pack
- Artifacts (persist on the account): "The Seeker Estates Newsroom" hub, "Seeker Estates Calendar" (db-backed status tracking).
