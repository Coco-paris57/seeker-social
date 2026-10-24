# Does the ID check + £1,000 hold / damage waiver stop guests booking? (24 Oct 2026)

**Question (Corentin, 24 Oct):** Seeker Estates asks every guest for ID verification **and** either a **£1,000 card hold** or a **non-refundable damage waiver of £99 / £109 / £119** (1 / 2 / 3+ bed) (`data/policy.json` → `guest_requirements`, Corentin 24 Oct 2026). Does this stop guests booking?

**Short answer.** The requirement is **not** what drives Booking.com's 33% cancellation rate. Our data shows at most a modest post-booking effect, about **4–6% of bookings**, and that is an upper bound. The bigger risk can't be measured from our data: guests who see the terms and **never book**, and Airbnb/CMA compliance. Published evidence suggests that a fee guests find out about late loses roughly **a third** of those guests. The waiver also adds about **14–17% to a typical stay**, and the hold is larger than the whole stay value for **68%** of our 2026 bookings. Recommended: drop the hold-or-waiver choice for short stays, or fold the waiver into the nightly rate. Show the ID step before booking. Details and options below.

Rules followed: read-only. No guest names, emails or phones were read into this report (PII fields were dropped at fetch). Each claim is tagged with its source. **Inference** marks my reasoning; it is not data. Web sources were retrieved 24 Oct 2026, and most are vendor-published (noted).

## Sources

| Tag | Source |
|---|---|
| SN | `data/snapshots/2026-10-24/reservations.csv` (Smoobu export, 669 rows, booked 25 Sep 2025 – 23 Oct 2026) |
| SA | Smoobu API `GET /api/reservations` via `rm/smoobu.py`, read-only, 24 Oct 2026. Arrivals 1 Sep 2025 – 31 Dec 2027, 806 records, blocks excluded. Fields kept: type, channel, apartment, arrival, `created-at`, `modifiedAt`. P04 is excluded because its `created-at` is the 20 Oct import date (`booking-funnel.md`) |
| PJ | `data/policy.json` |
| R1 | `reports/2026-10-21/demand-review.md` |
| R2 | `reports/2026-10-24/demand/airbnb-live.md`, `listings-reviews.md` |
| W | WebSearch, 24 Oct 2026. URLs inline |

---

## 1. Published evidence

### 1a. Late or hidden fees and abandonment
| Finding | Source (date) | Caveat |
|---|---|---|
| 63% of 2,000 UK travellers are frustrated by hidden fees that appear late. "More than a third" of guests who hit unexpected charges abandon the booking | Profitroom, *The Booking Breaking Point*, 2026. https://profitroom.com/booking-breaking-point | Hotel software vendor |
| 61% of US consumers name hidden or unexpected fees as their top booking frustration. 31% give last-stage price changes as the reason they didn't complete a purchase | Fullstory survey (1,000+), 2026, via Lodging Magazine. https://lodgingmagazine.com/fullstory-survey-highlights-how-rising-costs-impact-travelers/ | Vendor survey, US |
| 29% of UK respondents had abandoned an online travel purchase because of hidden fees | UK survey, Nov 2019 (Statista). https://fr.statista.com/statistics/1133890/reasons-for-abandoning-online-bookings-united-kingdom/ | Older |
| Airbnb made total-price display the default worldwide and reports higher conversion. No percentage is published | Airbnb newsroom https://news.airbnb.com/airbnb-is-introducing-total-price-display-and-updating-guest-checkout ; Zacks, 2025 https://www.zacks.com/stock/news/2452979/abnbs-price-display-feature-boosts-transparency-time-to-hold-stock | Company claim |

### 1b. Deposits vs waivers
| Finding | Source | Caveat |
|---|---|---|
| "83% of guests prefer properties with a damage waiver over a deposit" | Enso Connect blog. https://ensoconnect.com/blog/protect-vacation-rentals-and-earn-with-damage-waivers/ | Waiver vendor. No method, sample or date published. Directional only |
| Typical waivers are about $30–100 a stay, against deposits of $200–500+ | Enso Connect (above); Safely https://safely.com/articles/vacation-rental-damage-waiver/ | Vendors, US market |
| A deposit "adds an extra step… could deter some of your ideal guests", and a deposit set too high sends guests to a competitor | Minut https://minut.com/blog/short-term-rental-security-deposit ; Truvi https://truvi.com/blog/vacation-rental-damage-deposits/ | Guidance, not measured |
| **No independent survey found** giving the % of travellers who avoid listings with a deposit | W, 4 queries | Gap |

**Inference.** Our £1,000 hold is 2–5× the typical deposit these US vendors quote. Our £99–119 waiver sits at or above the top of their typical waiver range.

### 1c. ID verification and online check-in drop-off
| Finding | Source | Caveat |
|---|---|---|
| Autohost claims **>95% completion**, and says poorly designed flows can see **>30% abandonment** | Autohost blog https://www.autohost.ai/blog/seamless-guest-verification-experience | Vendor. The 30% is unsourced |
| Truvi (formerly Superhog, rebranded Jan 2025) publishes **no** completion or waiver-uptake rates. A guest who skips verification is not passed on as verified | Short Term Rentalz https://shorttermrentalz.com/news/truvi-rebrand-superhog-risk-management/ ; Enso help https://help.ensoconnect.com/en/articles/11824404 | No data |
| 51% of passengers would share biometric data with hotels or car-rental firms | IATA Global Passenger Survey, 2021, via IAPP https://iapp.org/news/b/survey-73-of-passengers-support-biometrics-for-airport-processes | Not holiday-let specific |
| Know Your Guest and Chekin: no completion data found | W | Gap |

**Inference.** On its own, an ID check is now normal and well tolerated. The vendor figure implies about 5% of guests don't complete it. Friction comes from combining it with a large hold or fee.

### 1d. Law and platform rules
- **UK drip pricing (DMCC Act 2024, in force 6 April 2025).** Mandatory fees must be in the headline price. Partitioned pricing is also prohibited. First penalty: £4.2m against AA Driving School's owner (CMS, Lewis Silkin Aug 2026: https://cms.law/en/gbr/legal-updates/price-transparency-guidance-lands-as-cma-launches-first-consumer-law-investigations-using-its-new-dmcc-act-powers ; https://www.lewissilkin.com/insights/2026/08/19/the-drip-drip-drip-of-enforcement-cma-opens-three-more-investigations-into-hid-102nqe4).
- **CMA price-transparency guidance:**
  - Automatically refundable deposits and card holds "would not be considered mandatory charges". So **the £1,000 hold need not be in the headline price**.
  - Labelling a charge "optional" does not make it optional.
  - Even optional charges should be included when "it is reasonably foreseeable that most consumers will need or want to pay them".
  - Source: Pinsent Masons https://www.pinsentmasons.com/out-law/news/cma-pricing-transparency-protect-consumers ; BCLP https://www.bclplaw.com/en-us/events-insights-news/new-cma-draft-guidance-on-price-transparency-what-you-need-to-know.html.
  - **Inference, not legal advice:** if most guests pick the waiver to avoid a £1,000 hold, the CMA could treat the waiver as a charge that belongs in the headline price. A solicitor should confirm this.
- **Airbnb.** "Most hosts are not allowed to charge security deposits, either through our Resolution Center or outside the Airbnb platform." Some software-connected hosts may collect one, but it "must be shown in the appropriate fee field". Hosts may not collect other fees off-platform, with limited exceptions such as taxes (Airbnb Help 2827 https://www.airbnb.com/help/article/2827/what-is-the-airbnb-policy-for-collecting-fees-in-person, snippet only; airbnb.* is blocked here, so the full page is NOT CHECKED). **Inference:** a waiver collected off Airbnb after booking may breach this policy. Whether Seeker qualifies and discloses it in the fee field is **NOT CHECKED**.
- **Booking.com.** Hosts can set a damage deposit in the extranet under Property policies, so it shows before booking. Alternatively, the Booking.com damage programme involves no collection from guests: the host sets a maximum damage amount (Hostaway https://support.hostaway.com/hc/en-us/articles/46573841013403 ; Truvi https://truvi.com/blog/booking-com-damage-policy/ ; Holidu https://www.holidu.co.uk/magazine/how-to-claim-damages-on-booking). Whether our deposit is shown in our Booking.com policies is **NOT CHECKED**.

---

## 2. Our data: cancellations and timing

### 2a. Cancellation rate by channel (SN, all booking dates)
| Channel | Bookings | Cancelled | Rate |
|---|---|---|---|
| Booking.com | 343 | 113 | **32.9%** |
| Airbnb | 312 | 54 | **17.3%** |
| Agoda | 8 | 6 | 75% (small n) |
| Direct / Website / VRBO | 6 | 2 | – |

This matches the 32.7% vs 17.2% found in R1.

### 2b. Days from booking to cancellation (SA)
The CSV has no cancellation date, so `modifiedAt − created-at` is used from the Smoobu API. **Caveat:** `modifiedAt` is the *last* change to the record. A later edit would make the gap look longer, so the 0–3 day shares below are minimums. Inference: any such bias is small, because records are rarely edited after cancellation.

| Gap after booking | Booking.com (112) | Airbnb (55) |
|---|---|---|
| < 24 h | 25 (22%) | 14 (25%) |
| 1–3 days | 11 (10%) | 10 (18%) |
| 4–7 days | 11 (10%) | 4 (7%) |
| 8–30 days | 25 (22%) | 10 (18%) |
| > 30 days | 40 (36%) | 17 (31%) |
| Median gap | 14.1 days | 5.1 days |
| Median days from booking to arrival, cancelled bookings | **59.5** | **69** |
| Median days from booking to arrival, all bookings (`reservation` type) | 19.5 | 24 |

Of the 15 Booking.com cancellations within 24 h, most came within 6 h of booking.

### 2c. Many early cancellations are rebookings, not lost guests
I checked whether each early cancellation was followed within 7 days by another booking for the same property with an arrival ±1 day. This is a heuristic.

| | Cancelled 0–3 d | of which rebooked | **Early and not rebooked** | Share of all channel bookings |
|---|---|---|---|---|
| Booking.com | 36 | 14 | **22** | **6.4%** of 343 |
| Airbnb | 24 | 9 | **15** | **4.8%** of 312 |

**Inference.** About 4.8–6.4% of bookings are cancelled within 3 days and not replaced. That is the **ceiling** on cancellations the ID/deposit request could cause. It also includes normal buyer's remorse, price shopping, and Airbnb's 24-hour free-cancellation window for bookings made 7+ days ahead (from 1 Oct 2025 per ainora.lt https://ainora.lt/blog/vacation-rental-cancellation-statistics-2026, unverified). The real requirement-driven share is somewhere between 0 and that ceiling. **When the ID/deposit request is sent is NOT CHECKED.** The brief says it is typically sent 0–3 days after booking.

### 2d. What actually drives the 33%: far-out, free-cancellation bookings (SA)
| Days from booking to arrival | Booking.com: n / cancel % / cancelled 0–3 d % | Airbnb: n / cancel % / cancelled 0–3 d % |
|---|---|---|
| ≤ 7 days | 79 / **4%** / 4% | 67 / 7% / 7% |
| 8–30 days | 82 / 26% / 13% | 108 / 9% / 6% |
| > 30 days | 186 / **47%** / 12% | 140 / 29% / 9% |

**Inference.** The requirement applies to every booking. If it caused the cancellations, the rate would be similar at every lead time. Instead, Booking.com cancellations rise from 4% to 47% with lead time. That is the usual pattern of free-cancellation, book-now-decide-later behaviour, and it fits the flexible rate being free to cancel until about 4–5 days before arrival (`listings-reviews.md`, P13 mystery shop). Two-thirds of Booking.com cancellations come more than 3 days after booking. Most of the Booking.com/Airbnb gap is therefore cancellation-policy driven, not requirement driven.

### 2e. Over time (SA, by quarter booked)
| Quarter | Booking.com cancel % | Early, not rebooked % | Airbnb cancel % | Early, not rebooked % |
|---|---|---|---|---|
| 2025 Q4 | 33% (n 72) | 4.2% | 8% (12) | 0% |
| 2026 Q1 | 26% (91) | 5.5% | 24% (88) | 6.8% |
| 2026 Q2 | 42% (72) | 8.3% | 21% (115) | 3.5% |
| 2026 Q3 | 33% (97)* | 8.2% | 10% (70)* | 7.1% |
| 2026 Q4 (to 23 Oct) | 20% (5)* | 0% | 7% (28)* | 3.6% |

\* These quarters include future stays that can still cancel, so their rates will rise.

**Inference.**
- On Booking.com, the early, not-rebooked share roughly doubled from about 4–5% to about 8% from Q2 2026.
- Airbnb shows no trend.
- That is consistent with a requirement introduced or tightened around spring 2026, but the start date of the requirement is **unknown**. The numbers are small (5–8 per quarter), so this is a weak signal, not proof.

### 2f. Size of the ask against the booking (SN, confirmed, booked in 2026)
| | Booking.com (182) | Airbnb (247) |
|---|---|---|
| Median booking total | £657 | £756 |
| 25th percentile | £360 | £516 |
| Median nights | 4 | 4 |
| Stays of ≤ 3 nights | 42% | 39% |

- **68% of 2026 bookings total less than £1,000**, so the hold is bigger than the stay itself for most guests.
- The £109 2-bed waiver is **17% of a median Booking.com stay** and 14% of a median Airbnb stay. On a 25th-percentile stay it is 21–30%.
- **Inference:** a guest who learns about the waiver after booking experiences it as a late 14–30% price rise. That is exactly the scenario where §1a finds about a third of guests abandon.

---

## 3. Reviews: deposit, ID or check-in friction

Searched: `data/policy.json`, all `reports/2026-10-21/*.md`, and `reports/2026-10-24/demand/*.md`, for deposit, waiver, hold, ID, verification, passport, check-in and key.

- **No review mentions the deposit, waiver, card hold or ID verification.**
- Check-in friction that *is* recorded is about keys, not the requirement:
  - P12 Booking.com, 11 Oct, 6/10: "really difficult to get the key" (PJ `P12.booking_reviews_24oct`). Keys are collected from a shop about 10 minutes' walk away and this cannot be changed (PJ `P12.check_in`).
- Airbnb check-in category scores range from 4.27 (P12) to 4.94 (P05) (R2 `airbnb-live.md`).
- Value scores are low on P13 3064856 (3.92) and P10 (3.6) (R2). **Inference only:** extra charges could pull "value" down, but no review text was available, because Airbnb review text is NOT CHECKED (R2).
- **Limit:** review text was mostly unavailable (R2). Absence of complaints is weak evidence. Guests who dropped out never stayed, so they never reviewed.

---

## 4. SIMULATED guest panel: illustration only, NOT evidence

> **SIMULATION.** The personas and reactions below are invented by Claude to illustrate the mechanisms in §1–2. They are not survey data, not real guests, and must not be quoted as findings.

| Persona (property type) | No requirement | £109 waiver (disclosed after booking) | £1,000 hold |
|---|---|---|---|
| UK couple, 2-night city break (P06 Marylebone, P11 Camden) | Books | Annoyed; may cancel inside the free window and rebook a comp | Likely cancels: hold exceeds a £500 stay |
| Family of 5, half-term (P05 Abbey Rd 4BR) | Books | Accepts £119 grudgingly | Accepts if on a credit card; anxious about the refund |
| Contractor crew of 4, 2 weeks (P04 Barking) | Books | Fine; small against the stay | Problem on a debit or company card |
| Corporate traveller, 4 nights (P20 Canary Wharf) | Books | Can't expense a "waiver"; asks for an invoice | Corporate card OK |
| US tourists, 5 nights (P13 Shepherd's Bush) | Books | Used to resort fees; accepts | Accepts; card limit high |
| Student/young group, weekend (P12 Mile End) | Books | Price-sensitive; cancels | Can't hold £1,000; cancels |
| EU visitor, Booking.com flexible rate, booked 60 days out (P11) | Books | Uses the request as a reason to cancel a speculative booking | Cancels |
| Medical/relocation guest, 1 month (P09 Greenwich) | Books | Accepts | Accepts; wants written refund terms |
| Privacy-conscious older traveller (any) | Books | Waiver OK; the **selfie/ID upload** is the barrier | Same |

Pattern illustrated (not measured): short, cheap, young or speculative bookings are most at risk. Long stays and large groups barely notice.

---

## 5. Estimate of impact (evidence-backed, with uncertainty)

1. **Cancellations after booking.** At most about **5–6% of OTA bookings**: Booking.com ≤ 6.4%, Airbnb ≤ 4.8% (§2c). Probably less, because that figure also includes normal remorse. At 2026 volumes (about 430 confirmed bookings Jan–Oct, SN), that is a ceiling of about 20–25 lost bookings a year. At the £657–756 median that is roughly **£15–19k a year, ceiling**. Inference: there is a weak sign that this rose on Booking.com from Q2 2026 (§2e).
2. **The 33% Booking.com cancellation rate is mainly not caused by the requirement.** Two-thirds of those cancellations come more than 3 days after booking. Cancellation is concentrated on stays booked 30+ days out (47%), and is only 4% for stays booked within 7 days (§2d). Fixing the cancellation policy (R1 action 3) matters more.
3. **Lost bookings before booking can't be measured from our data.**
   - If guests discover the terms only after booking, published surveys suggest about **29% to "more than a third"** of them abandon (§1a). With free cancellation they can do so at no cost.
   - If the terms are disclosed up front, the waiver works like a **14–17% price rise** on a median stay. Our PriceLabs position is already near or below the 25th percentile on several units (R1, daily reports), so this moves us from cheapest to mid-market on total price. Inference: this conversion effect is probably larger than the cancellation effect, but it is unquantified.
4. **Compliance risk may outweigh the conversion effect** (§1d): Airbnb's off-platform fee and deposit rules, and CMA treatment of a waiver most guests "need or want".

**Not the main cause of the current zero-booking spell.** The requirement is long-standing, and our reservation data shows it is not new as of October. The Oct 2026 collapse lines up with the Booking.com +20% markup and stacked-promotion issues and the listing-quality problems in the sibling reports (`booking-funnel.md`, `airbnb-live.md`). That is an inference: the start date of the requirement is unknown.

---

## 6. Options

| # | Option | Expected effect | Trade-off |
|---|---|---|---|
| 1 | **Disclose before booking** on every channel. Airbnb: the security-deposit fee field, if eligible. Booking.com: Extranet → Property → Policies → Damage deposit, plus the house rules. Also put it in the listing description and the first photo caption | Removes the "late fee" shock, so fewer cancellations within 0–3 days (§1a, §2c). Required anyway for Airbnb deposits (§1d) | Some guests filter out before booking. Volume could fall a little, but cancellations, admin and review risk fall too |
| 2 | **Waiver only, folded into the nightly rate or cleaning fee** (≈ £109 spread over the stay) | Headline price is DMCC-compliant. No post-booking ask. Matches the vendor-reported preference for waivers (83%, weak) | Search price rises about 14–17% on a 4-night stay, a rank and conversion hit on price-sorted search. Less leverage over damage |
| 3 | **Lower the hold to £250–300**, or a sliding hold (e.g. £100 per night, capped at £500) | The hold stops exceeding the stay value (now true for 68% of bookings) | Less cover for serious damage. Needs insurance or AirCover for the tail risk |
| 4 | **Apply only to higher-risk stays**: ≥ 7 nights, ≥ 5 guests, weekends at P05/P13/P12, or first-time guests with no reviews | Most bookings (median 4 nights) keep zero friction. The panel suggests long stays and groups tolerate it best (simulation) | Need rules in Smoobu or the verification tool. Rules can feel discriminatory if worded badly |
| 5 | **Use platform-native protection**. Booking.com: damage programme or the extranet damage deposit. Airbnb: rely on AirCover for Hosts, with no off-platform deposit | No extra guest steps. Compliant with Airbnb policy (§1d) | Claims processes are slower and less certain. Booking.com's damage-programme cap must be set. Airbnb's cover has exclusions |
| 6 | **Keep ID verification but drop the money step on short stays**, and make ID a one-tap flow within 24 h of booking | ID alone is low friction (about 5% non-completion, vendor figure, §1c) | Damage risk on short stays falls back on the cleaning check and the platforms |
| 7 | **Cut speculative Booking.com cancellations directly**: push the non-refundable rate (it doesn't show on P11/P12, PJ) and shorten the free-cancellation window | Targets the real driver of the 33% (§2d) | Fewer far-out bookings; trades volume for certainty |

**Suggested combination (inference).** Do 1 and 5 now, because they are compliance-led. Make 6 or 4 the default. Keep the waiver as an alternative only for stays of 7+ nights or 5+ guests. Pursue 7 separately for the cancellation leak.

## 7. Open checks (to turn inferences into facts)
1. The date the ID and deposit requirement began, and the hour the request is sent after booking. With these, the §2e test can compare before and after properly.
2. Which tool collects it (Truvi, Autohost, Smoobu guest portal, Chekin?), plus its completion and drop-off report and waiver vs hold uptake. This is the most direct evidence available.
3. Whether the requirement and its amounts appear on each Airbnb and Booking.com listing before booking (NOT CHECKED, OTA pages blocked).
4. Whether Seeker is allowed to collect a deposit or fee off-Airbnb, per Airbnb Help 2827.
5. A solicitor's view on whether the waiver counts as a mandatory charge under the DMCC Act.
