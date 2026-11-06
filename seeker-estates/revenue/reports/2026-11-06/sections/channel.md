## Channel parity

Run date D = 2026-11-06 (Friday, GMT). I read `data/policy.json` first and do not re-raise what it settles: the 15%/20% stay discounts, Booking.com promotion stacking (I report sizes only), the Visibility Booster, P13 as one flat, the P02/P03/P06/P07 blocks, P14, the P20 Airbnb discounts on record, and the deprioritised items (P04 2 Dec, P12 17 Nov, P09 Airbnb rules).

**Sources (all read-only)**
- **Smoobu GET.**
  - `/api/rates` for 12 apartments at **2026-11-06T07:18:10Z**: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live06/smoobu_rates06.json`.
  - `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:18:11Z, with guest fields dropped: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live06/smoobu_mod06_pe.json`.
- **Reservations diff.** Full-row diff of `reservations.csv`, 6 Nov against 5 Nov. There are exactly two changes, plus one 2025 row that left the 365-day window:
  - P09 Airbnb 1–10 Nov: confirmed → cancelled.
  - New P12 Booking.com 11–13 Dec.
- **PriceLabs.**
  - `get_user_logs` (listing, 5–6 Nov): 16 entries, all by Reyhan, 5 Nov 10:53–10:57Z. **None is for P06.**
  - `get_listing_date_overrides` for P06 3288517 and P09 3318172 (Nov).
  - Raw files `data/snapshots/2026-11-0{5,6}/raw/`.
- **Live Airbnb.** 25 plain public airbnb.co.uk searches (curl, no workarounds) between 07:19:49Z and 07:21:58Z.
  - Files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live06/air/` (`log.txt` plus one JSON per search).
  - **29 rows were appended under lock to `data/snapshots/2026-11-06/channel_checks.csv`.** The file was copied forward from 5 Nov first. Each row records the URL, stay, guests, timestamp and Smoobu rates.
  - "Displayed room" = card total before taxes, minus cleaning. Cleaning used: P20/P13/P12 £150; P05 £195; P08 £149; synced Barking £142; P06 £129; **P09 £125**. The P09 figure is now on record from Smoobu priceElements on P09 Airbnb bookings, and it fits the ratios below to the penny.
- **Booking.com: NOT CHECKED (live).** One plain search (Marylebone, 8–10 Nov, 2 adults) at 07:22:16Z returned HTTP 202 with an AWS WAF challenge (`live06/bk/search.html`). I did not try to get past it. The Booking.com figures below are amounts paid on Smoobu reservations, not displayed prices.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row).
  - PriceLabs does hold Vrbo listings for P13, P11 and P12: Reyhan's overrides were copied to `_units_0001_…` Vrbo ids on 5 Nov.
  - Config: Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults** (`rm/config.py` CHANNELS) until Corentin confirms them.

### 1. P06 Marylebone 9 Nov: the £2 is gone from Smoobu and Airbnb (t-p06-2pound: FIXED in Smoobu; cause still unknown)

| Night | Smoobu 5 Nov 07:13Z | **Smoobu 6 Nov 07:18Z** | PriceLabs `price` (refreshed 5 Nov 10:33:59Z) | PL `user_price` |
|---|---|---|---|---|
| 8 Nov | £200 | **£200** (min 2, open) | 213 | 200 |
| 9 Nov | **£2** | **£200** (min 2, open) | 219 | **2** |
| 10 Nov | £241 | £226 | 226 | 241 |
| 11 Nov | £255 | £238 | 238 | 255 |

**What PriceLabs shows**
- `get_listing_date_overrides` for P06 has **no fixed £2 override**. 8–14 Nov carry only the −5% override (Reyhan, 4 Nov 01:28Z). 15–22 Nov carry min-stay 2 only (4 Nov 12:52:23Z).
- `get_user_logs` has no P06 entry on 5–6 Nov.
- PriceLabs pushed P06 at 5 Nov 10:34:00Z (`listing_data.json`).
- On every flat checked, `user_price` repeats the value Smoobu held before the refresh:
  - P05 9 Nov: `user_price` 1403 = Smoobu 5 Nov.
  - P12 11 Dec: `user_price` 270 = Smoobu 5 Nov.
- So the £2 in `user_price` most likely records the earlier £2, not a live setting.

**What I cannot explain.** Smoobu 8 and 9 Nov sit at **£200, which is the P06 minimum** (`listing_data` min 200), not at PriceLabs' 213 and 219. Whether someone set them by hand in Smoobu is NOT CHECKED: Smoobu has no change log in the API. The kpi_pack flags the same rows (`sync_issues` P06: 8 Nov −£13, 9 Nov −£19).

**Is £2 bookable anywhere? No, on Airbnb as of 07:21Z.**

| Stay | Guests | Airbnb 1671691529957957272 card | Room | ÷ Smoobu | Source |
|---|---|---|---|---|---|
| 8–10 Nov | 3 and 2 | £435.00 | £306.00 | 0.765 × (200+200) | `p06_0810nov` 07:20:24Z, `_a2` 07:20:37Z |
| 9–11 Nov | 3 and 2 | £454.89 | £325.89 | 0.765 × (200+226) | `p06_0911nov` 07:20:48Z, `_a2` 07:21:00Z |

- **Airbnb is following Smoobu for P06 again.** Yesterday the cards still carried 4 Nov rates.
- 9 Nov now shows on Airbnb as £153 room (0.765 × £200).
- **Booking.com: NOT CHECKED** (WAF). If the calendar is synced, list = £200 × 1.15 = £230.
- Smoobu shows 9 Nov still open, so the £2 night **did not sell** on any channel.

### 2. Barking (P04): unsynced Airbnb 1455876748739910219 still sells today's Airbnb guest's nights (day 7)

Smoobu 3562176:
- Booking.com 161785771 (3–6 Nov) checks out today.
- **Airbnb 161888271, 6–9 Nov, confirmed** (modified 30 Oct 18:31:33; room £355.72, cleaning £142) **arrives today**.
- Open from 9 Nov at £140/140/140, min 3.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 | Synced 1657859794156786222 | Source (`live06/air/`) |
|---|---|---|---|---|
| **6–9 Nov** | booked (Airbnb 161888271) | **bookable, 3 × £171.40 = £514.20** | not offered (correct) | p04_0609nov 07:19:49Z |
| **7–10 Nov** | 7–8 booked, 9 open | **bookable, £517.40** | not offered (correct, min 3) | p04_0710nov 07:19:55Z |
| 9–12 Nov | open, £420 | £539.00 | £463.30 card = £321.30 room (0.765) | p04_0912nov 07:20:03Z |
| 6–19 Dec (13 n) | open, £2,446 | £2,514.80 − weekly £239.58 = £2,275.22 | £2,343.40 − "Weekly stay discount" £396.25 = £1,947.15 | p04_0619dec 07:20:13Z |

- **Still double-sellable: yes, seventh consecutive day.** 1455 offers 6–9 Nov, the exact stay of the Airbnb guest arriving today, and 7–10 Nov. **£355.72 room is at risk**, plus relocation cost.
- 1455's price is frozen. It shows £171.40/night, the same as yesterday, against Smoobu £153–155.
- **Booking on 1455: none visible.** 1455 is not in Smoobu, so its reservations cannot be read. Both cards covering 6–10 Nov were still bookable at 07:19Z, so no guest had booked those nights on 1455. **No double-booking has happened yet.**
- **t-p04-doublebook: NOT fixed.**

### 3. P09 Torrent Lodge: Airbnb 1–10 Nov cancelled mid-stay

**Smoobu reservation 158710021** (no guest data used):
- Channel Airbnb; 1–10 Nov (9 n); created 4 Oct 11:26.
- **Status "cancellation", `modifiedAt` 2026-11-05 09:32:47** (Smoobu clock).
- Price fields (unchanged by the cancellation):
  - `price` £985.60 = basePrice **£860.60** + cleaningFee **£125**
  - `commission-included` £152.77
  - priceElements: "Cancellation Host Fee" £152.77, "Cancellation Payout" **£832.83** (= 985.60 − 152.77)
  - `prepayment` null
- **Is any payout retained? NOT CHECKED.** The "Cancellation Host Fee / Cancellation Payout" labels also appear on *confirmed* Airbnb bookings, for example P04 161888271 and P06 162228256. They are Smoobu's generic Airbnb payout fields: £832.83 is the original expected payout, not evidence of a payout after cancellation. The actual payout needs Airbnb > Earnings/Transaction history for this reservation.
- **What happened** (guest arrived 1 Nov; the record was cancelled 5 Nov 09:32): a mid-stay cancellation or early departure processed as a cancellation. Which nights were actually stayed (1–4 or 1–5 Nov) is NOT CHECKED.

**Reyhan's response.** At 5 Nov 10:56:24Z Reyhan added a "fixed" override for 5–12 Nov (`get_user_logs`). `get_listing_date_overrides` shows it holds **min-stay 2 only, with no price**. P09 was pushed at 10:56:57Z.

**What Smoobu and Airbnb now sell**

| Night | 6 Nov | 7 Nov | 8 Nov | 9 Nov | 10 Nov | 11 Nov | 12 Nov |
|---|---|---|---|---|---|---|---|
| Smoobu 07:18Z (all open, min 2) | £110 | £130 | **£100** | **£100** | **£100** | £116 | £125 |
| PriceLabs `price` (5 Nov 10:56Z) | — | 130 | 112 | 110 | 109 | 116 | 125 |

- On 8–10 Nov Smoobu sits at the **£100 PriceLabs minimum**, £9–12 below PriceLabs' price (pack `sync_issues`). The cause is NOT CHECKED (same pattern as P06 8–9 Nov and P04 9–11 Nov).
- Original-stay nights now resaleable, 6–9 Nov: Smoobu £440.

| Stay (2 adults) | Airbnb 1681417771483132994 card | Room before Airbnb discount | ÷ Smoobu | Guest total after "Discount from Airbnb" | Source |
|---|---|---|---|---|---|
| 6–8 Nov (lead 0) | £329.00 | £204.00 | **0.850** | £320.77 (−£8.23) | p09_0608nov 07:21:14Z |
| 6–12 Nov (6 n, lead 0) | £682.60 | £557.60 | **0.850** | £665.53 (−£17.07) | p09_0612nov 07:21:19Z |
| 8–10 Nov (lead 2) | £278.00 | £153.00 | **0.765** | £271.05 (−£6.95) | p09_0810nov 07:21:22Z |

**Effect.**
- If nothing is retained, **−£860.60 room / −9 booked nights** for a flat whose last night is 26 Nov.
- The most that can be resold is the 4 original nights 6–9 Nov: £440 Smoobu, i.e. **£374 room on Airbnb at 0.85** before commission.
- kpi_pack last-30 (7 Oct–5 Nov) may still count 1–5 Nov as booked (PriceLabs). Use Smoobu as truth.
- The "Discount from Airbnb" line is labelled as Airbnb-funded. Whether it reduces the host payout is NOT CHECKED.

### 4. P12 Mile End Booking.com 11–13 Dec: discount stack and commission

| Smoobu id | Stay | Created | Party | Room (VAT incl.) | VAT | Cleaning | Commission | Genius flag |
|---|---|---|---|---|---|---|---|---|
| 162688853 | 11–13 Dec (2 n, lead 36 d) | **5 Nov 22:39** | 2 adults | **£513.81** | £85.64 (= 1/6) | £150 | **£99.57** | yes |

**Price at booking: £614** (302 + 312).
- Reyhan replaced the −15% override with **−5% on 30 Nov–12 Dec at 5 Nov 10:53:48Z**.
- P12 was pushed at 10:54:30Z (`listing_data.json` `last_date_pushed`; no later push).
- Smoobu today holds 302/312 on these now-booked nights.
- The 6 Nov raw (`prices_2699998.json`, refreshed 5 Nov 10:54:30Z) gives `price` 302/312.

| Basis | Value | Paid ÷ basis |
|---|---|---|
| PriceLabs 5 Nov raw (01:25:58Z refresh, before Reyhan's −5% change): `price` 270 + 279 | £549 | **0.936** |
| **PriceLabs/Smoobu at booking (10:54Z push)** | **£614** | **0.837** |
| Booking.com list = Smoobu × 1.15, rounded up per night (348 + 359) | £707 | **0.72675** |
| Ex-VAT room £428.18 vs PriceLabs at booking | £614 | 0.697 |

**Discount stack.**
- **£707 × 0.85 × 0.90 × 0.95 = £513.81 exactly** (513.812). That is three layers, **27.3% off list (−£193.19)**.
- Best reading: **Genius 15%** (Level 2&3, still on at Mile End per policy 25 Oct; Genius flag set) **× Mobile 10% × occupancy −5% (2 guests)**. This is the same pattern as the 26–30 Oct booking.
- No Last Minute layer: the lead is 36 days, outside the 30-day window.
- No weekly rate: the stay is 2 nights.
- Which 15%/10% layers applied cannot be seen from Smoobu, because Booking.com is behind the WAF.
- Calculated on the 5 Nov raw £549 instead, the ratio is 0.936. That basis is stale: it predates the −5% change.

**Commission basis.**
- £99.57 = **15.000% × (room £513.81 + cleaning £150)** = £99.5715.
- **It is 15%, not 18%.** There is no Visibility Booster at Mile End on record.
- Cleaning is inside the commissionable base: **£22.50 per booking**, i.e. 4.4% of room. This item is open since 4 Nov.
- **Net to owner:** £513.81 − £99.57 = £414.24, which is **£67.47 per £100 PriceLabs price at booking** (VAT inside, as in the pack).

### 5. Live Airbnb: displayed ÷ Smoobu (hidden layers, day 8)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- P13: last-minute 10% within 14 days; early bird 10% at 60+ days.
- All listings: weekly 15%.

Gap = displayed room ÷ expected − 1. Flag if over 3%.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live06/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 20–23 Nov (14) | 2 | £769 | £769.00 | £588.28 (£738.28) = 0.765 | **−23.5%** | FLAG | p20_2023nov 07:21:49Z |
| P20 | Airbnb | 7–10 Dec (31) | 2 | £731 | £731.00 | £657.90 (£807.90) = 0.900 | −10.0% | FLAG | p20_0710dec 07:21:58Z |
| P12 | Airbnb | 17–20 Nov (11) | 2 | £751 | £751.00 | £574.50 (£724.50) = 0.765 | **−23.5%** | FLAG | p12_1720nov 07:21:31Z |
| P12 | Airbnb | 7–10 Dec (31) | 2 | £759 | £759.00 | £683.10 (£833.10) = 0.900 | −10.0% | FLAG | p12_0710dec 07:21:34Z |
| P12 | Airbnb | 11–13 Dec | 2 | booked (Bdc 162688853) | — | not offered (correct) | — | ok | p12_1113dec 07:21:27Z |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (2) | 4 | £450 | £405.00 (LM10) | £344.25 (£494.25) = 0.765 | −15.0% | FLAG | p13_0811nov 07:21:37Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (2) | 4 | £464 | £417.60 (LM10) | £354.96 (£504.96) = 0.765 | −15.0% | FLAG | same |
| P13 3090701 / 3064856 | Airbnb | 9–12 Dec (33) | 4 | £659 / £623 | same | £593.10 / £560.70 = 0.900 | −10.0% | FLAG | p13_0912dec 07:21:40Z |
| P13 3090701 / 3064856 | Airbnb | 4–7 Jan (59) | 4 | £562 / £552 | £523.30 / £513.30 (EB10 on 5–6 Jan) | £523.30 / £513.30 (visible "Early booking discount" −£38.70 each) | 0.0% | ok | p13_0407jan 07:21:46Z |
| P05 | Airbnb | **9–10 Nov (3)** | 7 and 2 | **£1,383** (min 1, open) | £1,383.00 | £511.80 − **"Special offer" −£63.36** → room **£253.44** (0.183) | **−81.7%** | FLAG | p05_0910nov_1n 07:21:23Z, _a2 07:21:24Z |
| P05 | Airbnb | 16–18 Nov (10) | 7 | £757 | £757.00 | £579.10 (£774.10) = 0.765 | **−23.5%** | FLAG | p05_1618nov 07:21:24Z |
| P05 | Airbnb | 4–7 Jan (59) | 7 | £1,256 | £1,256.00 | £1,155.80 (visible **"Early booking discount" −£100.20 = 12.0% of the 5–6 Jan nights**) | −8.0% | FLAG (visible, not in policy) | p05_0407jan 07:21:25Z |
| P08 | Airbnb | 6–8 Nov (0) | 4 | £368 | £368.00 | £312.80 (£461.80) = **0.850** | −15.0% | FLAG | p08_0608nov 07:21:26Z |
| P06 | Airbnb | 8–10 Nov (2) | 3 / 2 | £400 | £400.00 | £306.00 (£435.00) = 0.765 | −23.5% | FLAG | §1 |
| P06 | Airbnb | 9–11 Nov (3) | 3 / 2 | £426 | £426.00 | £325.89 (£454.89) = 0.765 | −23.5% | FLAG | §1 |
| P06 | Airbnb | **15–17 Nov (9)** | 3 | £529 | £529.00 | £404.68 (£533.68) = 0.765 | −23.5% | FLAG (and see §6) | p06_1517nov 07:21:12Z |
| P09 | Airbnb | 6–8 / 6–12 Nov (0) | 2 | £240 / £656 | same | £204.00 / £557.60 = 0.850 | −15.0% | FLAG | §3 |
| P09 | Airbnb | 8–10 Nov (2) | 2 | £200 | £200.00 | £153.00 = 0.765 | −23.5% | FLAG | §3 |
| P04 synced | Airbnb | 9–12 Nov (3) | 2 | £420 | £420.00 | £321.30 = 0.765 | −23.5% | FLAG | §2 |
| P04 synced | Airbnb | 6–19 Dec, 13 n (30) | 2 | £2,446 | £2,079.10 (weekly 15%) | £1,805.15 = 0.900 × (1 − 0.18) | −13.2% | FLAG | §2 |
| P04 unsynced 1455 | Airbnb | 6–9 Nov | 2 | booked | not for sale | £514.20 card (cleaning unknown) | n/a | FLAG (double-sell) | §2 |
| P12 | Booking.com (paid, not displayed) | 11–13 Dec (36) | 2 | £614 | £707 list | £513.81 paid | −27.3% vs list | FLAG (promotions; policy: size only) | Smoobu 162688853 |
| all | Booking.com displayed | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:22:16Z | — | — | live06/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Hidden layers: still present on every synced listing (day 8).** The multipliers are unchanged, to the penny:
- **0.850 at lead 0** (P08, P09). P09 6–12 Nov shows that the lead-0 rate applies to the whole stay.
- **0.765 at 2–14 days**
- **0.900 at 31–33 days**
- **1.000 at 59–61 days**, with only visible early-booking discounts

None is shown to guests as a discount line. **a-airbnb-rules: NOT fixed.**

**P05 9 Nov: NOT fixed (seventh check).** The card is identical to every check since 31 Oct: £316.80 room − 20% Special offer = £253.44. Smoobu now holds £1,383 (was £1,403).

**P05 12% early booking: still on.** It applies only to nights at a lead of 60 days or more: £100.20 = 12% of £421 + £414. **a-p05-earlybird: NOT fixed.**

**P04 weekly 18% vs 15%: NOT fixed.** £396.25 on £2,201.40 room = **18.0%**, **£66.04 more** than policy's 15%.

### 6. Calendar change found today: P06 15–21 Nov opened (conflict with standing decision; for Corentin to confirm)

- Smoobu "Blocked channel" 143402691 on P06 was **modified 5 Nov 17:31:32** and now runs **22 Nov 2026 – 31 Dec 2027**. On 5 Nov it started 15 Nov (channel §7, 5 Nov).
- **15–21 Nov are now open** in Smoobu at £265/264/270/277/295/342/430, min 2.
- **Airbnb is selling them**: 15–17 Nov £533.68 card, `p06_1517nov`.
- This matches Reyhan's 4 Nov 12:52Z min-stay override on 15–22 Nov.
- `policy.json` lists P06 (Marylebone) as blocked on purpose.
- **Not a proposal:** Corentin to confirm that P06 is meant to sell 15–21 Nov. If not, re-block in Smoobu.

### 7. Booking.com since the 24 Oct markup cut (+30% → +15%, 13:38Z; 12.7 days to 07:18Z)

**Change since yesterday:** +1 booking, P12 11–13 Dec, 2 n, £513.81, PriceLabs at booking £614, **0.837**. No cancellations (`reservations.csv` diff).

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **17** | **64** | **£11,563.53** | £14,374 | **0.804** |
| Still confirmed | **13** | **51** | **£8,531.60** | £10,962 | **0.778** |
| Net of all cancellations (incl. pre-cut cancellations 25 n / £5,051.37) | | **+26 n** | **+£3,480.23** | | |

- Confirmed rows booked on or after 24 Oct in `reservations.csv` 6 Nov: 13 / 51 n / £8,531.60. This matches.
- Pace: **1.33 bookings a day gross, 1.02 a day confirmed**, against about 0.33 a day before the cut.
- Last Minute 10% started the same day as the cut, so the rise cannot be credited to the cut alone.
- PriceLabs-at-booking values for earlier bookings are carried from the 30 Oct to 5 Nov sections.

**`rate_leak_next_30` (kpi_pack 6 Nov) with the VAT correction.**
- PriceLabs ADR on Booking.com nights excludes VAT, so those nights are ×1.2.
- Channel per night comes from `reservations.csv` 6 Nov (confirmed); nights come from `prices.csv` 6 Nov–5 Dec. My unadjusted figures reproduce the pack exactly.

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights, adjusted | Airbnb nights |
|---|---|---|---|---|
| P11 | −27.0% | **−12.3%** | 9 n, −12.3% | — |
| P04 | −29.1% | −17.0% | 11 n, −16.0% | 2 n, −23.3% |
| P12 | −35.8% | −25.1% | 12 n, −25.5% | 2 n, −22.0% |
| P13 | −46.7% | −41.5% | 8 n, −46.7% | 5 n, −34.0% |

- Airbnb-only flats need no VAT change: P01 −37.6%, P05 −9.9%, P06 −31.4%, P08 −28.7%, P09 −32.4%, P10 −30.2%, P20 −38.0%.
- P01, P06, P09 and P10 have figures again because LISTING_NO_DATA is gone.
- These gaps include the policy weekly/monthly discounts and the hidden Airbnb layers (§5). They show where to look; the checks above establish the causes.

### 8. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com P12 11–13 Dec (0.837; 15% on room + cleaning) | £83.68 | **£67.47** |
| Booking.com since cut, confirmed (0.778) | £77.80 | ~£63–66 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 59–61 d | £100 (P13 £90, P05 £88 on 60+ d nights) | £84.50 (£76.05 / £74.36) |
| Airbnb live 31–33 d (0.900) | £90.00 | £76.05 |
| Airbnb live 2–14 d (0.765) | £76.50 | £64.64 |
| Airbnb live lead 0 (0.850) | £85.00 | £71.83 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb at ≤33 days is £76.50–£90, and Booking.com as sold is £78–84.
- **Booking.com as sold nets about £63–67, below the Airbnb model (£84.50).**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 9. Fees, min stay and plan items

- **Cleaning** matches on every card (exact fit of the ratios). P09's £125 is now confirmed from Smoobu priceElements. P12 Booking.com cleaning is £150.
- **Min stay** matches what is displayed:
  - P05 9 Nov min 1 sells as 1 night.
  - P04 min 3: 1455 sells 3-night stays; the synced listing does not offer 7–10 Nov.
  - P09 min 2 is honoured in 2-night cards.
- **t-p20-delivery: unchanged, awaiting Corentin.**
  - Smoobu 18–19 Nov blocked; 20 Nov open at £238, min 3.
  - Airbnb sells 20–23 Nov (£738.28 card).
  - Policy still says 20–22 Nov.
- **t-channel-gaps (P11): partly fixed.**
  - Reyhan's +7% on 23 Dec (5 Nov 10:54:34Z, Smoobu and Vrbo) moved Smoobu 23 Dec from **£294 to £300**. Target was ≥£317, so £17 short. Min stay is now 2 (was 3).
  - 3 Jan is **£189** (target £204): not fixed.
  - Booking.com visibility is NOT CHECKED.
- **Smoobu below PriceLabs on near dates (pack `sync_issues`):**
  - P04 9–11 Nov £140 vs 152–158
  - P06 8–9 Nov £200 vs 213/219
  - P09 8–10 Nov £100 vs 109–112
  - P11 10–12 Nov £175–189 vs 189–212

  All four listings were last pushed 5 Nov about 10:3x–10:5xZ. The cause is NOT CHECKED (manual Smoobu edits are not visible via the API). The pricelabs section owns this.

### Issues ordered by £ impact

1. **Critical: P04 unsynced Airbnb 1455876748739910219 sells 6–9 and 7–10 Nov over the Airbnb guest arriving today (161888271).** Day 7. £355.72 room at risk, plus relocation. No booking on 1455 is visible yet.
   **Setting:** Airbnb host 551951609 > listing 1455876748739910219 > Calendar: **block 6–9 Nov now** and every night while it is unsynced (or snooze the listing). Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or unlist it.
2. **High: hidden Airbnb layers 0.765 (2–14 d) / 0.900 (31–33 d) / 0.850 (lead 0) on every synced listing.** Day 8: 23.5% off every short-lead Airbnb night.
   **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (and any global rule): remove the last-minute and early-bird/≤60-day rules. Use visible Airbnb discounts instead (`airbnb_visible_discounts`).
3. **High: P05 9 Nov sells on Airbnb at £253.44 room against Smoobu £1,383.** Seventh check: −£1,129.56 if it sells.
   **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom price and the Special offer.
4. **High (record): P09 Airbnb 1–10 Nov cancelled mid-stay (5 Nov 09:32:47).** Up to −£860.60 room. 6–12 Nov are open; resale ceiling for 6–9 Nov is £374 room on Airbnb.
   **Action:** check Airbnb > Earnings for reservation 158710021 (payout retained?).
   **Setting:** Smoobu > Rates > Torrent Lodge 8–10 Nov sit at the £100 floor, below PriceLabs £109–112. Nothing to change if a fast sale is the aim before the 26 Nov handback.
5. **Medium: P12 Booking.com 11–13 Dec stack 27.3% off list (−£193.19)** = Genius 15% × Mobile 10% × occupancy −5% (best reading). Plus £22.50 commission on cleaning. Stacking is policy, so this is size only.
   **Setting:** Booking.com extranet > Mile End > Promotions > Genius: Level 1 only, as at Camden and Shepherd's Bush since 21 Oct. Commission on cleaning is Corentin's call.
6. **Medium (conflict for Corentin): P06 15–21 Nov opened** (block 143402691 shortened 5 Nov 17:31) and selling on Airbnb, against the intentional-block policy. Confirm, or re-block in Smoobu > Calendar > Marylebone.
7. **Medium: P05 visible 12% early bird** (£100.20 on 4–7 Jan). Not in policy.
   **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird.
8. **Medium: P04 synced weekly 18% vs 15%** (£66.04 on 6–19 Dec).
   **Setting:** Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
9. **Medium: P11 23 Dec £300 / 3 Jan £189 vs targets £317 / £204** (t-channel-gaps).
10. **Closed: P06 9 Nov £2.** Now £200 in Smoobu, and Airbnb follows Smoobu again. The cause is not identified.

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:22:16Z; not circumvented). Whether £2 or £230 showed for P06 9 Nov on Booking.com is unknown. The P12 11–13 Dec stack is inferred from paid ÷ (Smoobu × 1.15, rounded up per night). It fits to the penny, but the named layers are not visible.
2. P09 158710021: whether any payout is retained, and which nights were stayed: NOT CHECKED (Smoobu holds only the original payout fields).
3. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). Its cards show it unbooked on 6–10 Nov at 07:19Z.
4. Who changed P06 9 Nov to £200 and shortened block 143402691, and why Smoobu sits at the min floor on P04/P06/P09 near dates: NOT CHECKED (no Smoobu change log via the API).
5. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct −10% are unconfirmed defaults; Vrbo listings exist in PriceLabs for P11/P12/P13.
6. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT. Earlier PriceLabs-at-booking values are carried from previous sections.
