## Channel parity

Run date D = 2026-10-25 (UK now on GMT). I read `data/policy.json` first.

**Sources**
- `data/snapshots/2026-10-25/reservations.csv` (snapshot taken 06:54Z, 672 rows), diffed against the 24 Oct snapshot. It has 3 new rows: P12 Booking.com 5–12 Nov, P04 Booking.com 14–18 Nov, and P09 Booking.com 23–24 Apr 2027. The P09 row has `booked_on` 13 Jul, so it is a window effect only.
- Smoobu API, GET only, 25 Oct 07:20Z. I pulled `/api/reservations` with cancellations (fields used: `created-at`, `modifiedAt`, `price`, `price-details`, `commission-included`, guest counts). No guest names were copied.
- `data/snapshots/2026-10-24/prices.csv` and `2026-10-25/prices.csv`. `booked_price` is the PriceLabs "Your Price" at booking.
- `reports/2026-10-25/kpi_pack.json`: `channel_economics`. `missing.channel_checks` = "empty".
- PriceLabs, read-only, 25 Oct ~07:20Z: `get_customizations` for 2699998 (P12) and 3562176 (P04), and `get_user_logs` (listing) for 24–25 Oct.
- Booking.com discount stacks: `policy.json` `booking_discount_stack_24oct` and `booking_monthly_rate_issue_24oct` (Corentin's screenshots).

**Not raised (settled by `policy.json`)**
- 15%/20% stay discounts.
- Visibility Booster commission.
- Booking.com promotions stacking (I report their size, not whether they are allowed).
- P13 counts as one flat.
- P02/P03/P06/P07 blocks.
- P14.
- P20 discounts and the 28–31 Oct booking.
- Nights after the handback dates.
- Everything in the deprioritised list.

**Config status**
- `rm/config.py` CHANNELS still has Booking.com `markup: 0.20`. `policy.json channel_pricing.booking_markup` = **0.15 since 24 Oct** (overwrite at 13:38). The config and the pack's `channel_economics` are now stale (see section 4).
- Airbnb 0% adjustment is confirmed.
- **Vrbo +8% and Direct −10% are unconfirmed defaults.**

### Parity checks (displayed guest price)

| Ref | Channel | Date | Smoobu rate | Expected | Displayed | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| all | Airbnb | — | — | — | NOT CHECKED: WebFetch could not resolve airbnb.co.uk (ENOTFOUND, 25 Oct 07:21Z); a direct page fetch was refused by the sandbox; `channel_checks` empty | — | — | — |
| all | Booking.com | — | — | — | NOT CHECKED: booking.com returned HTTP 202 with no content (bot challenge), 25 Oct 07:20Z; no checks row | — | — | — |
| all | Vrbo | — | — | — | NOT CHECKED: no checks row, no page loaded | — | — | — |
| all | Direct site | — | — | — | NOT CHECKED: no direct-site URL, no checks row | — | — | — |

No observation exists for the displayed discount stacks, the direct < OTA ordering, the displayed fees or the displayed minimum stays, so all of these are NOT CHECKED.

### Paid vs PriceLabs, bookings made after 21 Oct (all channels)

Smoobu `created-at` shows 3 bookings after 21 Oct and none on 25 Oct up to 07:20Z. Both Booking.com bookings were created **after** the 13:38 markup overwrite on 24 Oct: P12 at 16:33 and P04 at 20:26.

| Ref | Channel | Stay | PriceLabs at booking | Expected guest room price (model) | Paid (room) | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|
| P12 | Booking.com | 5–12 Nov, 7 n, 3 adults, booked 24 Oct 16:33 | £1,456 (Corentin screenshot). `booked_price` 6–11 Nov = £1,274, so 5 Nov is about £182 | £1,456 × 1.15 × 0.85 weekly = **£1,423.24** (screenshot list £1,678 ≈ 1,456 × 1.15, +0.2% rounding) | **£932.90** (£133.27/n) | **−34.4% (−£490.34)** | FLAG | `reservations.csv`; Smoobu 161252871; `prices.csv` 25 Oct; policy stack |
| P04 | Booking.com | 14–18 Nov, 4 n, 2 adults + 2 children, booked 24 Oct 20:26 | £617 (policy). `booked_price` 15–17 Nov = £451, so 14 Nov is about £166 | £617 × 1.15 = **£709.55** (no LOS discount at 4 n; list £711) | **£437.69** (£109.42/n) | **−38.3% (−£271.86)** | FLAG | Smoobu 161276416; `prices.csv`; policy |
| P09 | Airbnb | 13–15 Nov, 2 n, 3 adults, booked 23 Oct 13:33 | £162 + £167 = £329 (`booked_price` 14 Nov = £167) | £329 | £253.21 | **−23.0% (−£75.79)** | FLAG (unexplained under policy) | Smoobu 161131246; carried from 24 Oct |

**Booking.com paid price decomposed** (multiplicative, from the policy's recorded stacks, starting at the Booking.com list price; the £ figures are each layer in order):

| Layer | P12 (from £1,678) | P04 (from £711) |
|---|---|---|
| Smoobu markup +15% (Smoobu → list) | +£218.4 (£1,456 → £1,674) | +£92.5 (£617 → £710) |
| Rate plan | Weekly −15%: −£251.70 (settled LOS discount) | **Monthly −20% on a 4-night stay: −£142.20 (rate-plan error)** |
| Last Minute (Booking.com) | 15%: −£213.94 | not applied |
| Mobile 10% | −£121.24 | −£54.04 (after occupancy) |
| Genius 10% | −£109.11 | −£48.63 |
| Occupancy pricing −5% | −£49.10 (3 of 6 guests) | −£28.44 (4 of 6 guests) |
| Paid | £932.91 (actual £932.90) | £437.69 (exact) |
| Effective discount vs list | **44.4%** | **38.4%** |
| Paid ÷ PriceLabs | **0.641** | **0.709** |

- **There is a further PriceLabs layer below the list price.** P12 and P04 still have PriceLabs last-minute 25% gradual within 15 days, Booking Recency Factor (default 5–15%) and the Aggressive occupancy profile. P12's price at booking also carried a −4% override (policy). P04 carried the −8% override for 1–24 Nov, set 24 Oct 11:23Z, before the booking. So P12, 12 days out, was cut for last-minute twice: by PriceLabs and by Booking.com.
- **Commission is not a flag.** Smoobu `commission-included` P12 £162.44 / total £1,082.90 = 15.0%. P04 £85.00 / £566.69 = 15.0%. Commission is charged on room plus cleaning.
- **Fees as booked (Smoobu `price-details`):** cleaning P12 £150, P04 £129. Smoobu cleaning settings were not seen.
- **P04 Booking.com Last Minute was not in the stack,** although 14 Nov was 21 days out and Corentin added Last Minute 10% for 0–30 days on 24 Oct. There are three possible causes: the deal was not live by 20:26, it was not set on P04, or it excludes the Monthly plan. NOT CHECKED.
- **P12's Last Minute was 15%,** but the 24 Oct change was recorded as 10%. P12 may have two Last Minute deals; Booking.com applies only one.

### Monitoring

**1. Booking.com bookings per day, before and after the 24 Oct markup cut (+30% → +15%)**

Organic counts exclude the P04 Channex import rows dated 20 Oct. Counts are by Smoobu `booked_on` / `created-at`.

| Window | Confirmed bookings | Per day |
|---|---|---|
| 24 Sep–23 Oct (30 days before) | 10 / 44 n / £6,835.78 | 0.33 |
| 11–23 Oct (13 days before) | **0** | **0.00** |
| 24 Oct, after 13:38 (cut day) | **2** / 11 n / £1,370.59 | 2 in about 10 h |
| 25 Oct to 07:20Z | 0 | — |

- The 13-day Booking.com drought ended within 3 hours of the overwrite.
- The cut cannot be credited on its own yet. P12 also had the Booking.com Last Minute deal. P04 sold through a mis-configured Monthly plan at 0.62 of list. Both paid less than they would have at the old markup on Standard rates (P12 at +30% with the same stack: ~£1,055).
- Cancellations: none since 24 Oct (no cancelled status change in the diff; Smoobu `modifiedAt` shows no new cancellation).

**2. Airbnb, last 14 vs prior 14 days (promotions removed 21 Oct; monitoring runs to 4 Nov)**

| Window (`booked_on`) | Confirmed | Nights | £ | Later cancelled |
|---|---|---|---|---|
| Last 14 (11–24 Oct) | 17 | 104 | £19,243.00 | 1 |
| Prior 14 (27 Sep–10 Oct) | 13 | 94 | £14,977.74 | 5 |

- Per flat, last 14 / prior 14 (bookings): P01 2/0, P02 1/2, P05 1/2, P06 2/3, P08 1/1, P09 2/2, P10 0/1, P12 2/0, P13 4/1, P20 2/1.
- **Daily pace is the signal:**
  - 11–19 Oct: 15 confirmed in 9 days (1.67/day).
  - **20–24 Oct: 2 in 5 days (0.40/day).**
  - 24 Oct: 0.
  - Since the removal (22–24 Oct): 1 booking in 3 days, against about 5 at the earlier pace.
- 20 Oct was already 0, before the removal, so the drop cannot be attributed only to removing the promotions. Yesterday's trigger (0–1 a day on 23–25 Oct) has now been met on 23 and 24 Oct.

**3. Airbnb flexible-cancellation test (P20, P06, P05 from 24 Oct): baseline**

| Group | Last 14 (11–24 Oct) | Prior 14 | Since 24 Oct |
|---|---|---|---|
| Test: P20, P06, P05 | 5 bookings / 26 n / £7,905.83 (1 later cancelled) | 6 / 29 n / £7,428.58 (2 cancelled) | 0 |
| Other Airbnb flats | 12 / 78 n / £11,337.17 (0 cancelled) | 7 / 65 n / £7,549.16 (3 cancelled) | 0 |

- Baseline: test group 0.12 bookings per flat per day (5 ÷ 3 flats ÷ 14 days).
- The groups are not like for like. P06 has 55% of its next 30 nights closed on purpose. P01 and P10 are 100% booked for the next 30 days. P08, P09, P10 and P12 are handbacks.
- Compare on 7 Nov. Use bookings per **open** night, and cancellations per booking (the flexible policy is likely to raise them).

### 4. Net to owner per £100 base

`channel_economics` in the pack is still built on +20% with no promotions. Its figures are Airbnb £84.50, Booking £102.00, Vrbo £99.36, Direct £90.00, with no warnings. Recomputed:

| Channel | Basis | Guest price per £100 | Net per £100 |
|---|---|---|---|
| Booking.com, list | +15% (policy), 15% commission | £115.00 | £97.75 (£94.30 at the 18% booster) |
| Booking.com, observed P12 | 0.641 paid ÷ base | £64.07 | **£54.46** (£64.07 before the weekly discount) |
| Booking.com, observed P04 | 0.709 | £70.94 | **£60.30** |
| Airbnb, observed P09 | 0.770, 15.5% fee | £76.96 | **£65.03** |
| Direct | −10% (unconfirmed) | £90.00 | £90.00 |

- **Booking.com is not netting at least what Airbnb nets.** Comparing like for like before stay discounts, P12 gives £64.07 against Airbnb £65.03 (P09 evidence) or £84.50 (config).
- **Direct is not the cheapest guest price** for a Genius mobile guest on Booking.com: £64–71 per £100 against direct £90 (unconfirmed default).

### Issues ordered by £ impact

1. **Booking.com discounts stack on top of PriceLabs discounts: −£490 on P12 alone (−34% vs model).** Corentin's 24 Oct direction was to keep the Booking.com discounts and cut the PriceLabs side. **This has not been done.**
   - At 25 Oct ~07:20Z, P12 and P04 still show PriceLabs last-minute −25% within 15 days (gradual), Booking Recency Factor on (default), and occupancy profile "Aggressive" (`get_customizations`).
   - `get_user_logs` for 24–25 Oct shows new negative overrides instead: P09 −5% for 26–31 Oct, P04 −5% for 6–22 Dec and 1–28 Feb (min stay 4), P20 −5% (that one is in policy). The P09 and P04 Dec/Feb overrides are not recorded in `policy.json`.
   - Settings to change, per listing: PriceLabs > Customizations > Last-Minute Prices (switch off, or reduce to ≤10%), Booking Recency Factor (off), Occupancy-Based Adjustment (from Aggressive to Recommended or off).
   - Alternatively, remove Booking.com Last Minute so that only one last-minute layer is left. Corentin chose to keep Booking.com's, so cut the PriceLabs one.
2. **P04 sold a 4-night stay on the Monthly rate: −£142 at list price (−£109 on the paid price) on top of the −£272 gap.**
   - Corentin has since reopened Standard, NR and Weekly and rebuilt Monthly with a 28-night minimum (Dispatcher). Not verified: no extranet view.
   - Settings: Booking.com extranet > P04 > Rates & Availability. Confirm that Monthly (ID 68413541) is not bookable for fewer than 28 nights on any date in Nov–Dec. Also check whether the rebuilt plan kept its ID, because a new ID needs mapping in Smoobu, or it must stay "Not XML" and derived.
3. **The Airbnb gap is systematic: P09 is −23% under PriceLabs after the promotion removal.** The Airbnb-led forward book is the largest structural exposure (24 Oct: −£4,592).
   - Setting: Smoobu > Channel Manager > Airbnb > Torrent Lodge (3318172) > Default pricing rules, plus the P09 Airbnb Discounts page. Then do the same for P01, P05, P06, P08, P10 and P12.
4. **Airbnb pace is 0.4/day for 20–24 Oct** against 1.67/day for 11–19 Oct. Watch it. One more zero day on 25 Oct would make 4 of the last 6 days zero.
5. **Stale model.**
   - Update `rm/config.py` CHANNELS `booking.markup` from 0.20 to 0.15 so that `channel_economics` reflects policy.
   - The policy note `booking_markup_scope` still says "+20%" while `booking_markup_note` says +30% for about 11 months before 24 Oct. Corentin should confirm which was live before 24 Oct, because it changes every pre-24 Oct Booking.com paid-vs-price comparison.

Data gaps:
1. No OTA page was reachable on 25 Oct and `channel_checks.csv` is empty. Displayed prices, displayed discount stacks, direct < OTA ordering, displayed fees and displayed minimum stays are all NOT CHECKED.
2. The extranet calendar has not been seen since the 24 Oct 13:38 overwrite. It is not confirmed that Booking.com now shows 1.15x.
3. Which Booking.com Last Minute deal is live per property (10% vs 15%; why it is absent from the P04 stack) is NOT CHECKED. P12/P04 Booking.com promotions other than those in the two booking screenshots are not known.
4. Smoobu Airbnb pricing rules are unknown for every flat except P13 (both listings) and P20. P09's −23% cannot be split.
5. The 5 Nov (P12) and 14 Nov (P04) check-in-night PriceLabs prices come from Corentin's screenshot totals minus `booked_price`, not from PriceLabs directly.
6. Smoobu Booking.com cleaning settings were not seen (booked: P12 £150, P04 £129).
7. Unconfirmed config defaults: Vrbo +8%, Direct −10%. There is no direct-site URL.
8. One day after the markup cut is too short to separate the effect of the markup from the Booking.com Last Minute deal and the P04 rate-plan error.
