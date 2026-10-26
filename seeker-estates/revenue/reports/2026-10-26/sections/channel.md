## Channel parity

Run date D = 2026-10-26 (GMT). I read `data/policy.json` first. Nothing it settles is raised again: the 15%/20% stay discounts, the Visibility Booster commission, Booking.com promotions stacking (I report their size only), P13 counted as one flat, the P02/P03/P06/P07 blocks, P14, the P20 discounts, nights after the handback dates, and the deprioritised list.

**Sources**
- `data/snapshots/2026-10-26/reservations.csv`, compared with the 25 Oct snapshot. Earlier snapshots from 18 Oct were used to date cancellations.
- Smoobu API, GET only:
  - `/api/reservations` with `modifiedFrom=2026-10-11` and cancellations included, at 07:23Z. Guest fields were stripped. The extract is in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/smoobu_mod26.json`.
  - `/api/rates` at 07:30–07:33Z.
- `data/snapshots/2026-10-24/prices.csv` and `2026-10-25/prices.csv` give the PriceLabs price on the day each booking was made. The `raw/` files are used for `last_refreshed_at`.
- PriceLabs, read-only, one call at a time, 26 Oct ~07:24Z: `get_customizations` for P12 (2699998), the account (empty), P06 (3288517), P08 (3318167) and P04 (3562176).
- **Live Airbnb pages, loaded by me on 26 Oct between 07:25Z and 07:33Z.** These were airbnb.co.uk search results inside a map box around each listing, with no filters. I read each listing's `structuredDisplayPrice`. The live output is in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live26/`.
  - The Airbnb card shows one all-in figure and no strikethrough on any of our listings.
  - **Cleaning fee:** I worked it out from pairs of stays rather than reading it off the page. For example, P20 for 3 nights and 4 nights from 1 Nov gives a nightly factor of 0.765 and a fee of £150.0. The P13 twins for 2 nights and 3 nights give 0.765 and £150.0. So "displayed" below means the room part of the total, before taxes, with the £150 cleaning fee taken off.
- Booking.com: **NOT CHECKED.** The search page redirected to a bot check at 07:25Z, and I did not try to get around it.
- `channel_checks.csv` is empty (`kpi_pack.json` → `missing`).

**Config status**
- `rm/config.py` CHANNELS now has Booking.com `markup: 0.15`, which matches policy. The pack's `channel_economics` (Booking £115 guest / £97.75 net per £100) is consistent with it.
- Airbnb 0% is confirmed in policy.
- **Vrbo +8% and Direct −10% are still unconfirmed defaults.** There is no direct-site URL.

### 1. Parity checks (guest-displayed price)

Expected price = Smoobu rate × (1 + markup) × (1 − discount). For Airbnb that is the Smoobu rate (0% markup). None of these stays reaches the 7-night discount, so no stay discount applies. The Smoobu rates were read live from `/api/rates`. All checks are for the guest counts shown, total before taxes.

| Ref | Channel | Stay (searched 26 Oct) | Guests | Smoobu rate | Expected | Displayed (room, total − £150 cleaning) | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P12 | Airbnb | 1–4 Nov (6 days out) | 2 | 248+222+225 = £695 | £695.00 | £550.44 (total £700.44) | **−20.8%** | FLAG | live26/p12b.json 07:28Z |
| P13 3090701 | Airbnb | 1–4 Nov | 4 | 176+171+175 = £522 | £522.00 | £399.32 (£549.32) | **−23.5%** | FLAG | live26/p13a.json 07:31Z |
| P13 3064856 | Airbnb | 1–4 Nov | 4 | 145+141+144 = £430 | £430.00 | £328.94 (£478.94) | **−23.5%** | FLAG | live26/p13a.json |
| P20 | Airbnb | 1–4 Nov | 2 | 252+256+255 = £763 | £763.00 | £583.69 (£733.69) | **−23.5%** | FLAG | live26/p20a.json 07:31Z |
| P12 | Airbnb | 23–26 Nov (28 days out) | 2 | 263+247+250 = £760 | £760.00 | £655.60 (£805.60) | **−13.7%** | FLAG | live26/p12n.json 07:32Z |
| P13 3090701 | Airbnb | 23–26 Nov | 4 | 206+198+204 = £608 | £608.00 | £519.39 (£669.39) | **−14.6%** | FLAG | live26/p13n.json |
| P13 3064856 | Airbnb | 23–26 Nov | 4 | 194+186+216 = £596 | £596.00 | £510.21 (£660.21) | **−14.4%** | FLAG | live26/p13n.json |
| P20 | Airbnb | 23–26 Nov | 2 | £862 | £862.00 | NOT CHECKED: not in the map results | — | — | live26/p20n.json |
| P12 | Airbnb | 7–10 Dec (42 days out) | 2 | 265+249+265 = £779 | £779.00 | £701.10 (£851.10) | **−10.0%** | FLAG | live26/p12dd.json 07:33Z |
| P13 3090701 | Airbnb | 7–10 Dec | 4 | 214+207+206 = £627 | £627.00 | £564.30 (£714.30) | **−10.0%** | FLAG | live26/p13d.json |
| P13 3064856 | Airbnb | 7–10 Dec | 4 | 227+219+218 = £664 | £664.00 | £597.60 (£747.60) | **−10.0%** | FLAG | live26/p13d.json |
| P20 | Airbnb | 7–10 Dec | 2 | 323+330+297 = £950 | £950.00 | £855.00 (£1,005.00) | **−10.0%** | FLAG | live26/p20d.json |
| all | Booking.com | — | — | — | — | NOT CHECKED: bot check on booking.com at 07:25Z; no `channel_checks` row | — | — | — |
| all | Vrbo | — | — | — | — | NOT CHECKED: no checks row, no page loaded | — | — | — |
| all | Direct site | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**What the Airbnb pattern shows**
- At 42 days out, all four Airbnb listings show exactly **0.900 × the Smoobu rate**. Policy lists no discount that applies to a 3-night stay 42 days out:
  - P13 early bird starts at 60+ days and its last-minute rule covers 14 days.
  - P20's Airbnb discounts are weekly, monthly and last-minute within 14 days.
  - The Smoobu Airbnb price adjustment is 0%.
- A flat −10% that is the same on four listings points to **one global setting** that policy does not record.
- Closer to the date the factor gets smaller:
  - About 0.855 at 28 days (P12, P13).
  - 0.765 at 6 days on P13 and P20, which is 0.9 × 0.85.
  - 0.792 on P12, which is 0.9 × 0.88.
- Airbnb shows guests **no strikethrough** for any of these discounts (`originalPrice` null on every card). Policy says Corentin prefers discounts guests can see (`airbnb_visible_discounts`).
- Policy (`airbnb_discount`) says that since 21 Oct Airbnb should be close to PriceLabs once the stay discounts are taken off. The remaining gap is therefore **unexplained, as policy defines it**.

**Fees and minimum stay as displayed vs Smoobu**
- Airbnb cleaning is £150 on P12, P13 (both listings) and P20 for stays of 3 nights or more. This matches policy for P13 (£150 since 21 Oct).
- P12 2-night stays solve to about £125 cleaning at the same 0.792 factor. It may be a short-stay cleaning fee; NOT CHECKED.
- Minimum stays match Smoobu:
  - P20 appeared only for 3-night searches (Smoobu min 3).
  - P12 and P13 were bookable for 2 nights (Smoobu min 2).
- Cleaning on the new bookings (Smoobu `price-details`): P06 Airbnb £129, P08 Airbnb £149, P12 Booking.com £150.

### 2. Paid vs PriceLabs: new bookings made 25 Oct

| Ref | Channel | Stay | Created (Smoobu) | PriceLabs on 25 Oct (24 Oct) | Expected room (model) | Paid room | Paid ÷ PriceLabs on 25 Oct | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| P06 | Airbnb | 5–8 Nov, 3 n, 3 adults | 25 Oct 13:10 | 331+361+365 = £1,057 (£1,061) | £1,057.00 | £804.77 (total £933.77 − £129 cleaning) | 0.761 | **−23.9% (−£252.23)** | FLAG (unexplained under policy) | reservations.csv; Smoobu; prices.csv 24/25 Oct |
| P08 | Airbnb | 31 Oct–5 Nov, 5 n, 2 adults | 25 Oct 14:09 | 167+150+159+163+164 = £803 (£816) | £803.00 | £676.60 (£825.60 − £149) | 0.843 | **−15.7% (−£126.40)** | FLAG (unexplained) | same |
| P12 | Booking.com | 26–30 Oct, 4 n, 2 adults, NR | 25 Oct 09:19 | 161+166+173+179 = £679 (£651) | £679 × 1.15 = £780.85 (list £782 per policy) | £434.76 | 0.640 (0.668 vs 24 Oct) | **−44.3% (−£346.09)** | Size reported; stacking is settled | policy `booking_discount_stack_25oct` |

- **P06 and P08** are 3 and 5 nights, so no policy stay discount applies.
  - The live factors above (about 0.765–0.79 at 6–11 days) are the same kind of reduction.
  - P06's 0.761 is in line with P13 and P20's 0.765 at 6 days.
  - P08 (0.843) has its own Airbnb rules, which have not been seen.
- **PriceLabs had already cut prices before the Airbnb layer.**
  - P08 still has the PriceLabs last-minute **18% gradual within 15 days**, and 31 Oct was 6 days out.
  - P06 has all three customizations switched off, so the algorithm defaults apply. PriceLabs' `effective` field shows a market-driven last-minute discount of 40% on the same day, falling to 0% at 12 days, plus a market-driven occupancy adjustment and the default booking recency factor.
  - So both stays were discounted for being last-minute twice.
- **P12 Booking.com stack.** Starting from the £782 list price, each layer in order:

| Layer | Amount off | Price after |
|---|---|---|
| Non-refundable −10% | −£78.20 | £703.80 |
| Last Minute 15% | −£105.57 | £598.23 |
| Mobile 10% | −£59.82 | £538.41 |
| **Genius 15% (Level 2&3, still on at Mile End)** | −£80.76 | £457.65 |
| Occupancy −5% | −£22.88 | £434.76 (exact) |

  - The effective discount is 44.4% off list.
  - Commission is £87.71, which is 15.0% of £584.76 (room plus cleaning). Not a flag.
  - With Genius at Level 1 (10%), as at Camden and Shepherd's Bush since 21 Oct, the booking would have paid £460.33 (+£25.57).
- **P12's PriceLabs last-minute was set to 0% after this booking.** On 26 Oct, P12's last-minute is "No Discount" (value 0). Near-term P12 prices rose overnight, for example 1 Nov £182 → £248 and 2 Nov £167 → £222 (`prices.csv` 25 vs 26 Oct). The 25 Oct booking was priced on the old, lower PriceLabs rates.

**State of the 25 Oct discount cut (a-discount-cut: custom 0% on last-minute, occupancy and booking recency)**

| Listing | Last-minute | Occupancy | Booking recency |
|---|---|---|---|
| P12 | **0% (done)** | Custom profile, still −5% to −15% at low occupancy within 15 days | Default (5–15%) |
| P04 | Down from 25% to **5%** gradual | Still **Aggressive** (−30% at 10% occupancy within 15 days) | Default |
| P06 | Off, so market-driven defaults apply (not 0%) | Market-driven | Default |
| P08 | **18% gradual still on** | Market-driven | Default |
| Account level | No customizations | — | — |

The cut is **partly applied**. Booking recency is still on the default on all four listings checked. Switching a customization off does not give 0%; the algorithm's default takes over.

### 3. Monitoring

**a) Booking.com bookings per day since the 24 Oct markup cut (+30% → +15%, overwrite at 13:38)**

Counts are organic: the six P04 Channex import rows dated 20 Oct are excluded. Windows use `booked_on` and Smoobu `created-at`.

| Window | Bookings (confirmed now) | Nights / room £ | Per day |
|---|---|---|---|
| 24 Sep–23 Oct (30 days before) | 11 made, 10 still confirmed | 44 n / £6,835.78 | 0.33 |
| 11–23 Oct (13 days before) | **0** | — | **0.00** |
| 24 Oct 13:38 → 25 Oct end (about 34 h) | **3**: P12 5–12 Nov, P04 14–18 Nov, P12 26–30 Oct | 15 n / £1,805.35 | about 2.1 |
| 26 Oct to 07:23Z | 0 | — | — |

- The cut has been followed by 3 bookings in about 34 hours, after 13 days with none.
- All three sold at **0.556–0.616 of Booking.com list** (0.64–0.71 of PriceLabs), through stacked promotions. Two other things also changed in the same window: the Booking.com Last Minute deal was added on 24 Oct, and P04 sold through its Monthly plan. So the markup cut **cannot be credited on its own**.
- **Net of the cancellation since the cut:** the 3 bookings minus P12 22–29 Nov (£1,314.40, 7 n) leaves **+8 nights and +£490.95 room revenue**.

**b) Booking.com cancellations, last 14 days (Smoobu `type: cancellation`, by `modifiedAt`)**

| Cancelled | Ref | Stay | Nights | Room £ | Booked |
|---|---|---|---|---|---|
| 18 Oct 11:03 | P12 | 5–10 Dec | 5 | £1,292.09 | 20 Sep |
| 20 Oct 13:27 | P04 | 2–7 Nov | 5 | £682.02 | Channex import row (no commission or guest data); counted as an import artefact |
| 22 Oct 11:27 | P12 | 1–8 Nov | 7 | £1,382.86 | 3 Oct |
| 23 Oct 06:57 | P11 | 19–27 Nov | 8 | £1,736.41 | 19 Sep |
| **25 Oct 11:57** | **P12** | **22–29 Nov** | 7 | **£1,314.40** | 15 Sep |

- Organic total: **4 cancellations, 27 nights, £5,725.76**, against 3 new bookings (15 n, £1,805.35) in the same 14 days.
- **P12 alone: 3 cancellations, 19 nights, £3,989.35.**
- P12 22–29 Nov is open again, with PriceLabs now at £1,886 for the 7 nights.
- Re-sold on Booking.com at the 24 Oct P12 stack (0.641 × PriceLabs), it would bring about £1,209, less than the £1,314.40 that was lost.
- Possible pattern, NOT CHECKED: guests who booked flexible rates at +30% cancel and rebook at the lower +15% price. I did not link guests across bookings, and the guest counts differ.

**c) Airbnb, last 14 vs prior 14 days (promotions removed 21 Oct; monitoring runs to 4 Nov)**

| Window (`booked_on`) | Confirmed | Nights | £ | Later cancelled |
|---|---|---|---|---|
| Last 14 (12–25 Oct) | 19 | 112 | £20,724.37 | 1 |
| Prior 14 (28 Sep–11 Oct) | 12 | 90 | £13,244.74 | 5 |

- Daily pace:
  - 12–19 Oct: 15 confirmed in 8 days (1.88/day).
  - **20–25 Oct: 4 in 6 days (0.67/day).** By day: 0, 1, 0, 1, 0, 2.
  - Since the removal (22–25 Oct): 3 in 4 days (0.75/day).
  - 25 Oct: 2 (P08, P06), after a zero on 24 Oct.
- Per flat, last 14 / prior 14: P01 2/0, P02 1/2, P05 1/1, P06 3/3, P08 2/1, P09 2/2, P10 0/1, P12 2/0, P13 4/1, P20 2/1.
- The last 14 days look better overall. The slowdown is in the last 6 days, and it started on 20 Oct, before the 21 Oct removal.

**d) Airbnb flexible-cancellation test (P20, P06, P05 since 24 Oct)**

| Group | Since 24 Oct | Last 14 (12–25 Oct) | Prior 14 |
|---|---|---|---|
| Test: P20, P06, P05 | **1**: P06 5–8 Nov, 3 n, £804.77, booked 25 Oct 13:10 | 6 confirmed / 29 n / £8,710.60 (1 cancelled) | 5 / 25 n / £5,695.58 (2 cancelled) |
| Other Airbnb flats | 1 (P08 31 Oct–5 Nov) | 13 / 83 n / £12,013.77 (0 cancelled) | 7 / 65 n / £7,549.16 (3 cancelled) |

- **P06's booking should not be credited to the flexible policy.** These were P06's only open nights in the next 30; the rest are intentionally blocked (KPI: 59% closed on purpose, and 100% of open nights now booked). It also paid 0.761 of PriceLabs.
- P05 and P20: 0 bookings since 24 Oct.
- There have been no Airbnb cancellations in the test group since 24 Oct (Smoobu cancellations list).
- Compare on 7 Nov using bookings per open night and cancellations per booking.

### 4. Net to owner per £100 base

| Channel | Basis | Guest price | Net |
|---|---|---|---|
| Booking.com, model (pack) | +15%, 15% commission | £115.00 | £97.75 (£94.30 at the 18% booster) |
| Booking.com, observed P12 25 Oct | 0.640 × PriceLabs | £64.03 | **£54.42** |
| Airbnb, model (pack) | 0%, 15.5% fee | £100.00 | £84.50 |
| Airbnb, live at 42 days | 0.900 | £90.00 | **£76.05** |
| Airbnb, live at 28 days | about 0.855 | £85.50 | £72.25 |
| Airbnb, live at 6 days (P13, P20) | 0.765 | £76.50 | **£64.64** |
| Direct | −10% (unconfirmed) | £90.00 | £90.00 |

- **Booking.com does not net at least what Airbnb nets:** £54.42 against £64.64 for comparable near-term stays.
- **Direct is not the cheapest guest price.** Airbnb at 42 days (£90) equals direct, and closer to the date Airbnb (£76.50) and Booking.com Genius-mobile (£64) are below it.
- The pack's `channel_economics.warnings` list is empty. It should carry both breaches.

### Issues ordered by £ impact

1. **Airbnb shows 10–23.5% under the Smoobu rate on every listing checked (P12, both P13 listings, P20), with no strikethrough.**
   - Exposure: a flat −10% on all forward Airbnb sales, plus up to −15% more within about 14 days. P06 (−£252) and P08 (−£126) show it on real bookings.
   - Settings to check:
     - (a) Smoobu > Channel Manager > Airbnb > price settings: the global price adjustment. Policy says 0%, but the identical 0.900 on four listings suggests something global.
     - (b) Airbnb > each listing > Pricing > Discounts and Promotions. Look for any 10% offer and for last-minute discounts.
     - (c) Smoobu Airbnb Default pricing rules (last-minute and length-of-stay rules) for P06, P08 and P12, which have not been seen.
   - Corentin prefers discounts guests can see. If the 10% is wanted, raise the Smoobu Airbnb price adjustment and show the discount, rather than cutting the price where guests cannot see it.
2. **Booking.com stack on P12: −£346 on a £782 list price (paid 0.640 × PriceLabs).**
   - P12 cancellations: 3 in 14 days, −£3,989.35, with 22–29 Nov reopened.
   - Setting: Booking.com extranet > Mile End > Promotions > Genius > untick Level 2&3. Keep Level 1 at 10%, as at Camden and Shepherd's Bush. That would have been worth +£25.57 on the 25 Oct booking.
3. **The PriceLabs-side cut is only partly applied.**
   - P08: PriceLabs > Customizations > Last-Minute Prices, change from 18% gradual to Custom 0%.
   - P04: Occupancy-Based Adjustment from Aggressive to a custom 0% profile. Last-minute is 5% now; set it to 0%.
   - P06: switch each customization on and set it to Custom 0%. With them off, the market-driven defaults apply (40% same day).
   - P12: occupancy still goes to −15%.
   - All four: Booking Recency Factor is still on the default (5–15%); set Custom 0%.
4. **Booking.com post-cut pace is real but bought with discounts.** 3 bookings in about 34 hours against 0 in 13 days, all at 0.56–0.62 of list. Keep tracking per day; separating the effect of the markup from the Last Minute deal needs more days.

Data gaps:
1. Booking.com, Vrbo and the direct site were not checked: there was a bot check on booking.com (not circumvented), no direct URL, and `channel_checks.csv` is empty. So displayed Booking.com stacks, the direct < OTA ordering on displayed prices, and Booking.com fees and minimum stays are NOT CHECKED.
2. The Airbnb room/cleaning split comes from solving pairs of stays. It is consistent to £0.1 on P13 and P20, but it is not read from an itemised page.
3. P20 23–26 Nov was not returned by the map search.
4. Which setting creates the flat −10% on Airbnb is not known. The Smoobu Airbnb rules are unknown for every flat except P13 and P20.
5. PriceLabs `last_refreshed_at` for P06 is 25 Oct 07:59Z. The 26 Oct PriceLabs snapshot still shows P06 5–7 Nov and P08 31 Oct–4 Nov as open, although both were booked in Smoobu on 25 Oct. Smoobu holds the bookings; PriceLabs has not resynced yet.
6. Booking.com cancellations before 11 Oct were not pulled, so there is no prior-14-day cancellation baseline.
7. Vrbo +8% and Direct −10% are unconfirmed defaults.
