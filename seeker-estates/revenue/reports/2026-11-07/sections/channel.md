## Channel parity

Run date D = 2026-11-07 (Saturday, GMT). I read `data/policy.json` first and do not re-raise what it settles: the 15%/20% stay discounts, Booking.com promotion stacking (sizes only), the Visibility Booster, P13 as one flat, the P02/P03/P06/P07 blocks, P14, the P20 Airbnb discounts on record, and the deprioritised items.

**Sources (all read-only)**
- **Smoobu GET**
  - `/api/rates` for 12 apartments at **2026-11-07T07:19:09Z**: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live07/smoobu_rates07.json`.
  - `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:19:11Z. Guest fields were not saved: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live07/smoobu_mod07_pe.json`.
  - Yesterday's comparison file: `.../scratchpad/live06/smoobu_rates06.json` (6 Nov 07:18:10Z).
- **Reservations diff.** Full-row diff of `reservations.csv` for 7 Nov against 6 Nov. It has exactly three new rows, all Airbnb: P06 18–22 Nov, P20 19–26 Dec, and P13 20–25 Dec (cancelled). **There is no new Booking.com row.**
- **PriceLabs**
  - `get_user_logs` (listing, 5–7 Nov): 16 entries, all made 5 Nov 10:53–10:57Z. **None after 6 Nov 06:00Z.**
  - `get_listing_date_overrides` for P20 3547481.
  - Raw files: `data/snapshots/2026-11-0{5,6,7}/raw/prices_{3288517,3547481,3090701,3064856}.json`.
  - `listings.csv` 7 Nov (`last_push`).
- **Live Airbnb.** 25 plain public airbnb.co.uk map searches (curl, no workarounds), 07:21:02Z–07:23:48Z.
  - Files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live07/air/` (`log.txt` plus one JSON per search; each holds the URL, dates, guests and timestamp).
  - **27 rows appended under lock to `data/snapshots/2026-11-07/channel_checks.csv`**, after copying it forward from 6 Nov (now 585 lines).
  - "Room" means the card total before taxes minus cleaning. Cleaning used: P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129, P09 £125. All match Smoobu priceElements, and every ratio below fits to the penny.
- **Booking.com: NOT CHECKED (live).** One plain search (Camden, 10–12 Nov, 2 adults) at 07:25:05Z returned HTTP 202 with an AWS WAF challenge (`live07/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row).
  - Config: Booking.com +15% and Airbnb 0% are confirmed in policy.
  - **Vrbo +8% and Direct −10% (`rm/config.py` CHANNELS) are still unconfirmed defaults** until Corentin confirms them.

### 1. Barking (P04): unsynced Airbnb 1455876748739910219 still sells over the in-residence guest (day 8)

Smoobu 3562176:
- **Airbnb 161888271, 6–9 Nov, confirmed** (guest in residence; room £355.72, cleaning £142).
- 7–8 Nov are booked (£155/£156).
- Open from 9 Nov at £157/157/158, min 3. No new P04 reservation in Smoobu.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 | Synced 1657859794156786222 | Source (`live07/air/`) |
|---|---|---|---|---|
| **7–10 Nov** | 7–8 booked (161888271), 9 open | **bookable, 3 × £172.47 = £517.40** | not offered (correct) | p04_0710nov 07:21:02Z |
| **8–11 Nov** | 8 booked, 9–10 open | **bookable, £519.00** | not offered (correct) | p04_0811nov 07:21:08Z |
| 9–12 Nov | open, £472 | £539.00 | £503.07 card = £361.07 room (0.765) | p04_0912nov 07:21:16Z |
| 6–19 Dec (13 n) | open, £2,466 | £2,514.80 − weekly £239.58 = £2,275.22 | £2,361.40 − "Weekly stay discount" £399.49 = £1,961.91 | p04_0619dec 07:21:24Z |

- **Still double-sellable: yes, eighth consecutive day.** 1455 sells the in-residence guest's nights 7 and 8 Nov.
  - Exposure is £355.72 room plus relocation, until checkout on 9 Nov.
  - From 9 Nov, every night 1455 sells is also open on the synced Airbnb listing and on Booking.com, so any booking on 1455 overlaps.
- **Booking on 1455: none visible.**
  - Both cards covering 7–8 Nov were bookable at 07:21Z, so no guest had booked 7 or 8 Nov on 1455.
  - 1455's own reservation list is outside Smoobu: NOT CHECKED.
- 1455's price is frozen at £172–180/night (Smoobu £155–158).
- **t-p04-doublebook: NOT fixed.**

### 2. New Airbnb bookings (6 Nov): paid vs price on sale at booking

Smoobu fields only. No guest data was used or saved.

| Smoobu id | Ref | Stay (lead) | Created (Smoobu clock, GMT) | Party | Room | Cleaning | Commission | Price on sale at booking | Paid ÷ price | Layers |
|---|---|---|---|---|---|---|---|---|---|---|
| 162710482 | P06 3288517 | 18–22 Nov, 4 n (12 d) | 6 Nov 21:22 | 4+2 | **£856.79** | £129 | £152.80 | **£1,120** (247+264+301+308) | **0.765** | Hidden 0.765 (2–14 d); no stay discount applies |
| 162694102 | P20 3547481 | 19–26 Dec, 7 n (43 d) | 6 Nov 09:33 | 1 | **£1,428.00** | £150 | £244.59 | **£1,977** (278+257+281+285+292+294+290) | **0.7223** | 0.85 × 0.85 (see below) |
| 162696296 | P13 3090701 | 20–25 Dec, 5 n (44 d) | 6 Nov 11:08, **cancelled 11:18:25** | 3 | £917.73 | £150 | £165.50 | **£1,133** (221+226+227+235+224) | **0.810** | Hidden 0.9 × visible "Long stay discount" 10% |

**Where the price on sale at booking comes from**
- **P06.** PriceLabs pushed at 6 Nov 08:40:14Z (`listings.csv`), taking Smoobu 18–21 Nov from 277/295/342/430 (Smoobu 6 Nov 07:18Z) to **247/264/301/308**. The 7 Nov raw `prices_3288517` (refreshed 08:40:13Z) has `price` 247/264/301/308 and Smoobu 7 Nov holds the same.
  - The 6 Nov raw still showed these nights as "Blocked" with prices of 277–430.
  - Why the price fell £30–122 a night on the refresh is NOT CHECKED. The likely cause is that PriceLabs recalculated once the nights stopped being blocked: uncustomized 302→263 on 18 Nov, 375→325 on 20 Nov.
  - Against the pre-push £1,344 the ratio would be 0.638. That figure is not the price on sale.
- **P20.** Last push before booking was 6 Nov 01:29:54Z. The 6 Nov raw `prices_3547481` equals Smoobu 6 Nov 07:18Z equals the 7 Nov raw `booked_price`: £1,977. The 7 Nov raw shows ADR £204 = £1,428 / 7.
- **P13.** Last push before booking was 6 Nov 08:48:31Z. The 7 Nov raw `prices_3090701` and Smoobu agree: £1,133.

**P06 18–22 Nov: −£263.21 vs Smoobu (−23.5%)**
- The only layer is the hidden 0.765 Airbnb rule: 1120 × 0.765 = £856.80, and per-night rounding gives £856.79.
- No stay discount applies to 4 nights.
- These nights were opened when Smoobu block 143402691 was shortened (5 Nov 17:31:32). P06 is an intentional-block property in policy, so this was **raised 6 Nov for Corentin to confirm** and is not a new proposal.
- 22 Nov onward is still blocked.
- For the 18 Oct base-rise tally (P06 is in it): this booking is **+4 n / +£856.79**, sold at 0.765 of the post-rise price.

**P20 19–26 Dec (Christmas, 7 n): −£252.45 vs the policy expectation, of which −£84.41 is beyond even the usual hidden pattern**
- Policy expects weekly 15% only: 1977 × 0.85 = **£1,680.45**. Paid **£1,428.00 = −15.0%**.
- The usual live pattern for a 7-night stay at 33 days is hidden 0.9 × weekly 0.85 = 0.765, which would be £1,512.41. Paid is 5.6% under that.
- **Exact fit: 0.85 per night (rounded) × 0.85 weekly.** Nights × 0.85, rounded, are 236+218+239+242+248+250+247 = £1,680, and £1,680 × 0.85 = **£1,428.00** to the penny. A 0.9 hidden layer does not fit: it would imply a 19.7% weekly rate.
- Today's live P20 7-night checks give conflicting patterns:
  - **10–17 Dec (33 d):** £1,738.80 room before discount (0.9 × £1,932), "Weekly stay discount" −£260.84 (15.0%), ratio **0.765**.
  - **3–10 Jan (57 d):** £1,618.00 (1.0 × Smoobu), weekly −£242.70 (15.0%), ratio **0.85**.
  - **3–6 Jan (57 d, 3 n):** **0.9**.
- So the hidden layer appears and disappears with stay length and lead time in ways I cannot model from guest-side pages. **The breakdown Airbnb applied to 162694102 is NOT CHECKED**; it needs Airbnb > Reservations > 162694102 > price details.
- **Reyhan's 21–26 Dec −5%** (override created 4 Nov 01:30:03Z) and the 19–20 Dec −5% (27 Oct) are already inside the £1,977. At 0.7223 they cost about **£75 room** on this stay: £1,977 / 0.95 = £2,081, a £104 Smoobu difference.
- Christmas positioning: P20 is now booked 19–25 Dec. The −5% now affects only 26 Dec (open, min 4, £310). 27 Dec is min 6 at £369, and 28–31 Dec min 5–6 at £480–483.

**P13 20–25 Dec, booked and cancelled after 10 minutes**
- Smoobu 162696296: Airbnb, apartment 3090701, created 6 Nov 11:08, status "cancellation", `modifiedAt` 6 Nov 11:18:25.
  - `price` £1,067.73 = basePrice £917.73 + cleaning £150.
  - Commission £165.50 = 15.5% of £1,067.73.
  - "Cancellation Payout £902.23" is Smoobu's generic Airbnb payout label, not evidence of a payout being retained.
  - Retained payout is NOT CHECKED (Airbnb > Earnings).
- **The nights are back on sale at the identical price.**
  - Live card 20–25 Dec (4 guests, 07:22:11Z): 5 × £233.94 = £1,169.70 − "**Long stay discount**" £101.97 = **£1,067.73**, on 3090701.
  - The twin 3064856 shows £1,017.51.
  - Smoobu 7 Nov has both twins open on 20–25 Dec.
- Price build-up: £1,133 × 0.9 (hidden) = £1,019.70, minus 10% visible 5-night discount = £917.73.
- The 5-night 10% matches "LOS 5+ −10%" in policy `pricing_rules_listing_B` (21 Oct screenshot). The 21 Oct change list does not say it was kept, so **Corentin to confirm it is intended**. It is visible to guests, which Corentin prefers.
- Min stay: 20 Dec min 2 and 21–26 Dec min 3 (Smoobu). The 5-night stay was allowed.

### 3. Live Airbnb: displayed vs expected (hidden layers, day 9)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises: weekly 15% on all listings; P13 last-minute 10% within 14 days and early bird 10% at 60+ days. Gap = displayed room ÷ expected − 1. Flag if over 3%.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live07/air/`, 7 Nov) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 9–12 Nov (2) | 2 | £472 | £472.00 | £361.07 (£503.07) = 0.765 | −23.5% | FLAG | p04_0912nov 07:21:16Z |
| P04 synced | Airbnb | 6–19 Dec, 13 n (29) | 2 | £2,466 | £2,096.10 (weekly 15%) | £1,819.91 = 0.9 × (1 − **0.18**) | −13.2% | FLAG | p04_0619dec 07:21:24Z |
| P04 unsynced 1455 | Airbnb | 7–10 / 8–11 Nov | 2 | booked 7–8 | not for sale | £517.40 / £519.00 card (cleaning unknown) | n/a | FLAG (double-sell) | §1 |
| P05 | Airbnb | **9–10 Nov (2)** | 7 and 2 | **£1,376** (min 1, open) | £1,376.00 | £511.80 − **"Special offer" −£63.36** → room **£253.44** (0.184) | **−81.6%** | FLAG | p05_0910nov_1n 07:21:25Z, _a2 07:21:25Z |
| P05 | Airbnb | 16–18 Nov (9) | 7 | £756 | £756.00 | £578.33 (£773.33) = 0.765 | −23.5% | FLAG | p05_1618nov 07:21:26Z |
| P05 | Airbnb | 6–9 Jan (60) | 7 | £1,225 | £1,225.00 | £1,078.00 (visible **"Early booking discount" −£147.00 = 12.0%**) | −12.0% | FLAG (visible, not in policy) | p05_0609jan 07:21:27Z |
| P06 | Airbnb | 9–11 Nov (2) | 3 | £404 | £404.00 | £309.06 (£438.06) = 0.765 | −23.5% | FLAG | p06_0911nov 07:21:38Z |
| P06 | Airbnb | 15–17 Nov (8) | 3 | £474 | £474.00 | £362.60 (£491.60) = 0.765 | −23.5% | FLAG (nights opened against block; §2) | p06_1517nov 07:21:50Z |
| P08 | Airbnb | 7–8 Nov (0), 1 n | 4 | £225, min 2 | not sellable (min 2) | not offered (0 cards) | — | ok (a-handback-lastnights not done) | p08_0708nov 07:21:52Z |
| P09 | Airbnb | 8–10 Nov (1) | 2 | £223 | £223.00 | £170.59 (£295.59) = 0.765; after "Discount from Airbnb" −£7.39 the guest total is £288.20 | −23.5% | FLAG | p09_0810nov 07:21:56Z |
| P12 | Airbnb | 17–20 Nov (10) | 2 | £749 | £749.00 | £572.98 (£722.98) = 0.765 | −23.5% | FLAG | p12_1720nov 07:21:59Z |
| P12 | Airbnb | 7–10 Dec (30) | 2 | £834 | £834.00 | £750.60 (£900.60) = 0.900 | −10.0% | FLAG | p12_0710dec 07:22:02Z |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (1) | 4 | £488 | £439.20 (LM10) | £373.31 (£523.31) = 0.765 | −15.0% | FLAG | p13_0811nov 07:22:05Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (1) | 4 | £459 | £413.10 (LM10) | £351.13 (£501.13) = 0.765 | −15.0% | FLAG | same |
| P13 3090701 / 3064856 | Airbnb | 9–12 Dec (32) | 4 | £651 / £615 | same | £585.90 / £553.50 = 0.900 | −10.0% | FLAG | p13_0912dec 07:22:08Z |
| P13 3090701 / 3064856 | Airbnb | 20–25 Dec (43) | 4 | £1,133 / £1,071 | same (no policy discount for 5 n) | £917.73 / £867.51 = 0.9 × 0.9 (visible "Long stay discount" 10%) | −19.0% | FLAG (10% visible, confirm) | p13_2025dec 07:22:11Z |
| P20 | Airbnb | 20–23 Nov (13) | 2 | £718 | £718.00 | £549.26 (£699.26) = 0.765 | −23.5% | FLAG (and t-p20-delivery) | p20_2023nov 07:22:14Z |
| P20 | Airbnb | 7–10 Dec (30) | 2 | £864 | £864.00 | £777.60 = 0.900 | −10.0% | FLAG | p20_0710dec 07:22:20Z |
| P20 | Airbnb | 10–13 Dec (33) | 2 | £856 | £856.00 | £770.40 = 0.900 | −10.0% | FLAG | p20_1013dec 07:22:26Z |
| P20 | Airbnb | 10–17 Dec, 7 n (33) | 2 | £1,932 | £1,642.20 (weekly) | £1,477.96 = 0.9 × 0.85 | −10.0% | FLAG | p20_1017dec 07:22:36Z |
| P20 | Airbnb | 3–6 Jan (57) | 2 | £702 | £702.00 | £631.80 = 0.900 | −10.0% | FLAG | p20_0306jan 07:23:38Z |
| P20 | Airbnb | 3–10 Jan, 7 n (57) | 2 | £1,618 | £1,375.30 (weekly) | £1,375.30 = 1.0 × 0.85 | 0.0% | ok | p20_0310jan 07:23:26Z |
| P20 | Airbnb | 2–9 Jan, 14–21 Dec | 2 | — | — | listing not in first 5 result pages (14–21 Dec includes booked 19 Dec) | — | NOT CHECKED | p20_0209jan, p20_1421dec |
| all | Booking.com displayed | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:25:05Z | — | — | live07/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Hidden layers: unchanged on every synced listing (day 9). a-airbnb-rules is NOT fixed.**
- **0.765 at lead 1–14 days.** At lead 1 this is now 0.765 (P09, P13). Yesterday lead 0 showed 0.85.
- **0.900 at 30–57 days** on 2–5-night stays.
- 7-night stays are inconsistent:
  - 0.765 at 33 d
  - **1.0 × weekly at 57 d**
  - 0.7225 on the P20 Christmas booking at 43 d (§2)
- None of these layers is shown to guests, except P13's 5-night "Long stay discount" and P05's early booking.
- **Realised cost yesterday: −£263.21 (P06) and −£252.45 (P20 vs policy) = −£515.66 room on two bookings.**

**P05 9 Nov: NOT fixed (eighth check).** The card is identical since 31 Oct: £316.80 room − 20% Special offer = £253.44. Smoobu holds £1,376 (PriceLabs `price` 1376, uncustomized 334, min 1). **−£1,122.56 if it sells.**

**P05 12% early booking: still on.** £147.00 = 12.0% of £1,225 on 6–9 Jan (60–62 d). **a-p05-earlybird: NOT fixed.**

**P04 weekly 18% vs 15%: NOT fixed.** £399.49 on £2,219.40 = **18.0%**, which is **£66.58 more** than policy's 15% on this stay.

**P06 9 Nov £2: closed.** Smoobu, PriceLabs `price`/`user_price`/`booked_price` all read £200. Airbnb 9–11 Nov sells at 0.765 × (200+204).

### 4. Booking.com since the 24 Oct markup cut (+30% → +15%, 13:38Z; 13.7 days to 07:19Z)

**Change since yesterday: none.** The `reservations.csv` diff has no Booking.com row added, changed or cancelled. **6 Nov is the first day since the cut with no Booking.com booking or cancellation.**

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **17** | **64** | **£11,563.53** | £14,374 | **0.804** |
| Still confirmed | **13** | **51** | **£8,531.60** | £10,962 | **0.778** |
| Net of all cancellations (incl. pre-cut cancellations, 25 n / £5,051.37) | | **+26 n** | **+£3,480.23** | | |

- Pace: **1.24 bookings a day gross, 0.95 a day confirmed** (yesterday 1.33 / 1.02), against about 0.33 a day before the cut.
- Last Minute 10% started the same day as the cut, so the rise cannot be credited to the cut alone.
- PriceLabs-at-booking values are carried from the 30 Oct–6 Nov sections. The three P04 20–23 Nov cancelled rows count as one booking.

**`rate_leak_next_30` (kpi_pack 7 Nov) with the VAT correction.**
- PriceLabs ADR on Booking.com nights excludes VAT, so I multiply them by 1.2.
- Channel per night comes from `reservations.csv` 7 Nov (confirmed); nights come from `prices.csv` 7 Nov–6 Dec.
- My unadjusted figures reproduce the pack exactly (script `.../scratchpad/live07scripts/vat.py`).

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights, adjusted | Airbnb nights |
|---|---|---|---|---|
| P11 | −24.2% | **−9.0%** | 9 n, −9.0% | — |
| P04 | −31.0% | −18.2% | 11 n, −17.8% | 1 n, −23.5% |
| P12 | −34.2% | −23.1% | 12 n, −23.6% | 2 n, −19.9% |
| P13 | −44.7% | −39.8% | 8 n, −46.7% | 6 n, −31.2% |

- Airbnb-only flats need no VAT change: P01 −39.8%, P05 −8.6%, P06 −38.6% (2 n), P08 −35.7%, P09 −32.4%, P10 −28.8%, P20 −38.9%.
- **The P06 18–22 Nov and P20 19–26 Dec bookings are not yet in `prices.csv`.** P06 was refreshed 6 Nov 08:40Z, before its 21:22 booking. P20's Christmas falls outside the 30-day window.
- These gaps include the policy stay discounts and the hidden Airbnb layers (§3).

### 5. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com since cut, confirmed (0.778) | £77.80 | ~£63–66 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.0 (P20 7 n at 57 d, before weekly) | £100.00 | £84.50 |
| Airbnb live 0.900 (30–57 d) | £90.00 | £76.05 |
| Airbnb P13 5 n (0.81) | £81.00 | £68.45 |
| Airbnb live 0.765 (1–14 d) / P06 18–22 Nov | £76.50 | **£64.64** |
| Airbnb P20 19–26 Dec (0.7223) | £72.23 | **£61.03** |
| Airbnb P05 9 Nov if sold (0.184) | £18.42 | £15.57 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb at ≤57 days sells at £76.50–£90, and Booking.com as sold at £78–84.
- **Booking.com as sold nets about £63–66, below the Airbnb model (£84.50).**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 6. Fees, min stay and plan items

- **Cleaning** matches on every card.
  - Airbnb commission is **15.5% of room + cleaning** on all three new bookings: £152.80, £244.59, £165.50. Cleaning share: £20.00 on P06 and £23.25 on P20. This is Airbnb's standard host fee and matches config.
- **Min stay** matches what is displayed: P05 9 Nov min 1, P04 min 3, P13 5-night Christmas, P08 7 Nov min 2 (not offered).
- **t-cleaning-commission: unchanged** (no new Booking.com booking). Booking.com commissions cleaning: £22.50 on P12 and £26.82 on P11 per booking. Corentin's call.
- **t-p20-delivery: unchanged, awaiting Corentin.**
  - Smoobu 18–19 Nov blocked; 20 Nov open at £239, min 3.
  - Airbnb sells 20–23 Nov (£699.26 card).
  - `policy.json` still says 20–22 Nov is the delivery block.
- **t-channel-gaps (P11): partly done.**
  - 23 Dec is **£305** (yesterday £300; target ≥ £317): £12 short, min 2.
  - 3 Jan is **£188** (target ≥ £204): not fixed.
  - Booking.com visibility is NOT CHECKED (WAF).
- **Smoobu below PriceLabs (t-smoobu-below-pl): resolved by the 6 Nov 08:40–08:49Z push**, not at 10:3x. The pack shows 0 sync issues.
  - P04 9–11 Nov £157/157/158 (was £140).
  - P09 8–10 Nov £113/110/111 (was £100).
  - P06 8–9 Nov £200 = PriceLabs 200.
  - P11 10–12 Nov and P13 8–12 Nov equal PriceLabs (`prices.csv`, Smoobu `/rates`).
  - The pricelabs section owns push timing.

### Issues ordered by £ impact

1. **Critical: P04 unsynced Airbnb 1455876748739910219 sells 7–10 and 8–11 Nov over Airbnb guest 161888271 (in residence 6–9 Nov).** Day 8. £355.72 room at risk plus relocation. From 9 Nov every booking on 1455 overlaps the synced inventory. No booking on 1455 is visible yet.
   **Setting:** Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 7–8 Nov now and all nights while unsynced (or snooze or unlist the listing). Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176.
2. **High: hidden Airbnb layers (0.765 at 1–14 d, 0.900 at 30–57 d, inconsistent on 7-night stays) on every synced listing, day 9.** −£515.66 realised on yesterday's P06 and P20 bookings alone.
   **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules: remove the last-minute and booked-within/early-bird rules that are not in policy. Replace them with visible Airbnb discounts (`airbnb_visible_discounts`).
   For P20, pull Airbnb > Reservations > 162694102 > price details to see the 0.85 layer.
3. **High: P05 9 Nov sells on Airbnb at £253.44 room against Smoobu £1,376.** Eighth check. −£1,122.56 if it sells.
   **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom nightly price and the Special offer.
4. **Medium: P20 Christmas paid £84.41 below even the usual 0.765 pattern** (0.7223 = 0.85 × 0.85). Reyhan's −5% on 19–26 Dec cost about £75 of it. It now only touches 26 Dec.
   **Setting:** the Airbnb layer as in item 2. PriceLabs 3547481 26 Dec −5% is Corentin's call (Reyhan's edit; not a new proposal).
5. **Medium (conflict for Corentin): P06 18–22 Nov sold (£856.79) on nights opened by shortening block 143402691** (5 Nov 17:31), against P06's intentional-block policy. 15–17 Nov is still selling on Airbnb. Confirm, or re-block 15–17 Nov in Smoobu > Calendar > Marylebone.
6. **Medium: P05 visible 12% early booking** (£147.00 on 6–9 Jan). Not in policy.
   **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird.
7. **Medium: P13 5-night visible "Long stay discount" 10%** (£101.97 on 20–25 Dec, shown on both twins). It matches the 21 Oct listing-B rule. Confirm it is intended (Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+).
8. **Medium: P04 synced weekly 18% vs 15%** (£66.58 on 6–19 Dec).
   **Setting:** Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
9. **Medium: P11 23 Dec £305 / 3 Jan £188 vs targets £317 / £204** (t-channel-gaps). Set via PriceLabs 3064196 DSO.
10. **Question: t-cleaning-commission.** £22.50–£26.82 per Booking.com booking. Accept or challenge in Booking.com extranet > Finance.
11. **Closed:** P06 9 Nov £2; Smoobu-below-PriceLabs nights (overwritten 6 Nov 08:40–08:49Z).

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:25:05Z; not circumvented).
2. Airbnb's internal breakdown of P20 162694102 (which layer made 0.85 × 0.85): NOT CHECKED. Needs the Airbnb reservation price details.
3. P13 162696296: who cancelled and whether any payout is retained: NOT CHECKED (Smoobu holds only the generic payout fields).
4. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). Its cards show 7–8 Nov unbooked at 07:21Z.
5. Why PriceLabs dropped P06 18–21 Nov by £30–122 a night at the 6 Nov 08:40Z refresh: NOT CHECKED. The likely cause is recalculation after the nights were unblocked.
6. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct −10% are unconfirmed defaults.
7. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT. Booking.com PriceLabs-at-booking totals are carried from earlier sections.
