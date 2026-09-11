# Seeker Estates — Platform Mechanics & Publishing Stack

**Compiled:** 10 September 2026
**Status note:** the subagent researching this was cut off by a rate limit; this file was rebuilt from targeted searches plus platform documentation knowledge. Items marked **[VERIFY]** must be confirmed in the relevant dashboard before you rely on them commercially.

---

## 1. The headline answer on auto-publishing

**You cannot get "AI drafts → human approves → auto-publishes" on all three networks with equal ease. The three networks are not equally open.**

| Network | Fully automated publishing? | Route |
|---|---|---|
| **Facebook Page** | ✅ Yes, easily | Pages API / any scheduler. Lowest friction of the three. |
| **Instagram** | ✅ Yes, with setup | Instagram Content Publishing API — needs a **Business** account linked to a **Facebook Page**. Publishes feed images, carousels and **Reels**. Stories support is more limited. **[VERIFY]** current rate cap — historically ~25–50 API posts per 24h, far above your needs. |
| **TikTok** | ⚠️ Partially | The **Content Posting API** requires a *separate audit* on top of developer signup, and approval "can take weeks." **Until an app is audited, every direct post is forced to `SELF_ONLY`** — only you can see it. The unaudited route that works is **draft mode (`MEDIA_UPLOAD`)**: the video lands in your TikTok inbox as a draft and a human taps publish in the app. |

**Practical conclusion:** TikTok is the constraint. Do not design a workflow that assumes hands-off TikTok publishing on day one. Design for **"agent drafts → human approves → auto-publishes to IG + FB, and taps publish on a pre-loaded TikTok draft."** That last tap takes about eight seconds and it is not worth an engineering project to remove.

Sources: [PostPeer — TikTok Content Posting API 2026](https://www.postpeer.dev/blog/best-tiktok-posting-api), [Vorp Labs](https://vorplabs.com/agent-tools/tiktok-content-posting-api), [Netrows setup guide](https://www.netrows.com/blog/tiktok-content-posting-api-guide-2026)

---

## 2. Recommended stack

### Option A — Metricool (recommended starting point)
Metricool is available as a **connector inside Claude** with a `createScheduledPost` tool, which means the marketing agent can schedule directly from a chat once you connect it. It also exposes `getBestTimeToPostByNetwork`, `getScheduledPosts`, `updateScheduledPost` and analytics tools — so the same agent that writes the post can read last week's performance.

**Pricing (2026):** Free (1 brand) → Starter $25/mo or $20/mo annual (5 brands) → Starter $45/mo (10 brands) → Advanced $67/mo (15 brands). For Seeker Estates, **one brand is enough — the free or $20/mo tier covers it.** Add-ons: Advanced Analytics $12–36/mo. X/Twitter connection is a $10/mo add-on (irrelevant to you).
Source: [Metricool pricing 2026](https://checkthat.ai/brands/metricool/pricing), [Efficient App review](https://efficient.app/apps/metricool)

**Why it wins for you:** it is the only scheduler in the Claude connector registry that can publish to all three of your networks, so it removes an entire integration project. **[VERIFY]** in your own Metricool account whether TikTok publishes directly or as a draft push — this varies by their audit status and has changed before.

### Option B — direct APIs
Only worth it if Metricool's TikTok handling disappoints and volume justifies it. Meta app review for Instagram Content Publishing takes days-to-weeks; TikTok audit takes weeks. Cheap per-post API relays exist (PostPeer ~$8.50/1,000 posts, Post for Me ~$10/1,000, Upload-Post ~$24/mo unlimited) but they mostly solve TikTok by using draft mode too — i.e. they don't actually beat the constraint.

### Option C — no automation at first
Genuinely defensible for the first 30 days. A human posting from the phone gets full music-library access (see §4), can respond to comments in the first 30 minutes (which materially affects reach), and gives you a feel for the accounts before you automate. **Recommendation: run 30 days manual, then connect Metricool.**

---

## 3. Account setup — do this before anything else

1. **Instagram → Business account**, linked to a Facebook Page, both inside **Meta Business Suite** under one Business Portfolio. This is a hard prerequisite for API publishing and for ads.
2. **TikTok → Business account.** Note the music trade-off in §4 before you switch.
3. **One Business Portfolio** owning: FB Page, IG account, ad account, Pixel, and the domain. Do not let these sit under a personal profile — it creates a single point of failure tied to one person's login.
4. **Google Business Profile** — often overlooked and disproportionately valuable for "serviced apartments London" style local search. Free.
5. **Bio + link**: use a link-in-bio with analytics (Stan, Beacons, or your own `/stay` landing page with UTMs). A self-hosted landing page beats a third-party tool because you keep the pixel data and the SEO.
6. **UTM discipline from post one.** `?utm_source=instagram&utm_medium=social&utm_campaign=oct26-frieze`. Without this you will be unable to prove social drove any booking, and in six months you will not remember.

---

## 4. The music trap — read this before switching accounts

**This is the single most common operational surprise for hospitality brands.**

- **TikTok:** Business accounts are restricted to the **Commercial Music Library (CML)** — roughly a million cleared tracks, but *not* the trending chart music that drives most viral audio trends. Creator accounts get the full library but are not licensed for commercial use, and TikTok has been increasingly willing to mute or remove business videos using non-CML audio.
- **Instagram:** business/professional accounts see a **reduced music catalogue** compared with creator and personal accounts, for the same licensing reason.

**Consequences for your content plan:**
1. Do not build your format around chasing trending audio. It is the one lever a compliant business account cannot pull.
2. Lean into formats where audio is not the driver: **voiceover, on-screen text, ambient/diegetic sound (kettle, tube announcement, rain on a window), and CML instrumental beds.**
3. Build a small library of 8–12 CML tracks that match your brand and reuse them. Repetition is a feature — it becomes sonic branding.

Sources: [Soundstripe on the TikTok CML](https://www.soundstripe.com/blogs/tiktok-music-library-explained), [Status on business-account music](https://brands.joinstatus.com/tiktok-commerical-music-library), [Foxi on Reels music copyright](https://www.foximusic.com/blog/instagram-reels-music-copyright-legal-guide/)

---

## 5. Paid advertising risk — Special Ad Categories **[VERIFY]**

Meta restricts targeting on ads about **housing** (alongside credit, employment, social issues, politics): no age/gender targeting, restricted location targeting, and a shrunken lookalike toolkit.

**The distinction that matters to Seeker Estates:**
- **Guest-facing ads** ("stay in our Canary Wharf apartment") are ordinarily **travel/accommodation**, not housing. Normally unrestricted.
- **Landlord-facing ads** ("let us manage your property", "guaranteed rent") sit much closer to a housing opportunity and are considerably more likely to be flagged.

Historically the housing restrictions applied primarily to ads targeting the **US and Canada**, with expansion to other markets over time. **Do not assume your UK landlord ads are exempt.** Before spending, run one small landlord-targeted ad and see whether Meta forces the Housing category on it. If it does, your targeting options narrow sharply and your landlord acquisition should lean more on organic, LinkedIn and direct outreach than on Meta paid.

Sources: [Jon Loomer on Special Ad Categories](https://www.jonloomer.com/special-ad-categories-meta-ads/), [Meta housing ads guide 2026](https://mediastrobe.medium.com/meta-housing-ads-2026-the-complete-guide-to-geo-targeting-under-special-ad-category-restrictions-c008de7252ca)

**Also relevant:** TfL has clamped down on short-term-let advertising on the London transport network — a reminder that this sector attracts regulatory attention in London specifically. Keep every claim in every ad literally true. Source: [London.gov.uk](https://www.london.gov.uk/press-releases/assembly/tom-copley/tfl-clamps-down-on-unscrupulous-short-term-lets-ad)

---

## 6. Format specs — the working cheat sheet

| | Instagram Reels | TikTok | Facebook |
|---|---|---|---|
| Aspect | 9:16, 1080×1920 | 9:16, 1080×1920 | 9:16 Reels / 4:5 feed |
| Length sweet spot | 7–20s for reach, 30–60s for depth | 15–34s | 15–45s |
| Caption limit | 2,200 chars | ~2,200 chars (4,000 in some regions) | 63,206 chars |
| Hashtags | **3–5 relevant** beats 30 generic in 2026 | 3–5, in-caption | Barely matter; 1–2 max |
| Carousels | up to 20 images | photo carousels up to 35 images | up to 10 |
| Safe zone | keep text out of top 15% / bottom 25% — UI covers it | same, TikTok's UI is more aggressive on the right side | — |

**Distribution principles that hold across all three in 2026:**
- **Watch-time and completion rate dominate.** A 9-second video watched twice beats a 40-second video abandoned at 6.
- **Saves and shares outrank likes.** Design posts to be *sent to someone* ("send this to whoever's booking London") or *saved for later* (guides, lists, checklists).
- **Search matters now.** Captions and on-screen text are indexed. Write "where to stay near ExCeL London" as literal words on the screen, not just as a hashtag.
- **Off-platform links still suppress reach in-feed.** Keep links in the bio and in comments, not in the caption body.
- **The first 30 minutes matter.** Reply to every comment in that window. This is the cheapest reach lever available and it is entirely human labour.
- **Best UK posting times:** weekday 7–9am (commute), 12–1pm, and 6–9pm; Sunday evening is unusually strong for travel-planning content. **[VERIFY]** against your own data after 30 days — and Metricool's `getBestTimeToPostByNetwork` will tell you for your specific audience.

---

## 7. What to track weekly (and what to ignore)

**Track:**
1. **Reach** per post and % from non-followers (the growth signal)
2. **Saves + shares** (the quality signal)
3. **Profile visits → link clicks** (the intent signal)
4. **Direct booking enquiries attributed to social** via UTM (the money signal)
5. **Landlord enquiries** (the second-objective signal — track separately, never blended into guest metrics)

**Ignore:** follower count as a primary KPI, likes, and vanity impressions. A 4,000-follower account producing eight landlord enquiries a month is worth more to Seeker Estates than a 40,000-follower account producing none.

---

## 8. Open items to confirm before scaling

- [ ] **[VERIFY]** Metricool's TikTok publishing mode (direct vs draft) in your account
- [ ] **[VERIFY]** Whether Meta forces the Housing Special Ad Category on UK landlord-acquisition ads
- [ ] **[VERIFY]** Current Instagram Content Publishing API rate limits if you go direct
- [ ] Decide Business vs Creator account on Instagram, knowing the music trade-off
- [ ] Confirm which of the three accounts already exist and who controls them
