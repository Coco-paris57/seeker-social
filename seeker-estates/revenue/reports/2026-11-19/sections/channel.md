## Channel parity

Run date D = 2026-11-19 (Thursday, GMT). `data/policy.json` was read first. These are settled and not re-raised: the 15%/20% stay discounts, Booking.com promotion stacking (reported for size only), the Visibility Booster, the **+15% Booking.com markup (policy `booking_markup` 0.15, since 18 Nov)**, the derived rate plans, P13 = one flat, the P02/P03/P06/P07 blocks, P14 and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 15 apartments, 19 Nov-28 Feb, at **2026-11-19T07:18:44Z**. Saved to scratch `ch19/smoobu_rates19.json`.
- **Smoobu GET `/api/reservations`** (modifiedFrom 17 Nov, with cancellations): 7 records, guest fields dropped (`ch19/smoobu_mod19.json`). The only new bookings are the two P04 Airbnb stays. **No Booking.com booking has been created since 16 Nov 22:52.**
- **PriceLabs:**
  - `get_user_logs` for 17-19 Nov returned 12 entries, all DSOs added by Reyhan on 18 Nov between 12:13Z and 12:18Z (see §4).
  - `get_listing_prices` P04 19 Nov: price £151, refreshed 18 Nov 12:20:20Z.
  - The 18 Nov raw files were last refreshed 17 Nov 09:09Z.
- **Live Airbnb:** 21 plain public airbnb.co.uk map searches (curl), every page read, 07:20:25Z-07:23:37Z.
  - The URL, dates, guests and timestamp for each are in `ch19/air/*.json`.
  - `data/snapshots/2026-11-19/channel_checks.csv` was copied forward from 18 Nov and **24 rows were appended** under `.channel_checks.csv.lock`.
  - Room = first price line minus cleaning (P04 synced £142, P13/P20 £150, P05 £195), before taxes.
- **Booking.com live: NOT CHECKED.** One plain search (Barking, 20-23 Dec, 2 adults) at 07:24:44Z returned HTTP 202 with an AWS WAF challenge (`ch19/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts in `ch19s/`.)

### 1. The two new P04 Airbnb bookings (both made 18 Nov)

**Both came through the synced listing 1657859794156786222 (inference).**
- Both reached Smoobu 3562176 through its Airbnb API connection, with cleaning and commission split out. 1455876748739910219 is not connected to Smoobu.
- On 18 Nov, 1455 offered neither 18-20 Nov as 2 nights nor any stay from 27 Dec to 2 Jan.
- The synced 18-20 Nov card from 18 Nov reconciles to the penny (below).
- Airbnb confirmation of the listing: NOT CHECKED.

| Stay | Booked (UK) | Lead | Guests | Room paid | Cleaning | Commission | Smoobu/PriceLabs that night | Layers (fit) | Policy-expected room | Gap |
|---|---|---|---|---|---|---|---|---|---|---|
| 27 Dec-4 Jan, 8 n | 18 Nov 09:27 | 39 d | 4 | **£1,076.74** (£134.59/n) | £142 | £188.91 (15.5%) | **£1,459** (175/192/193/194/201/194/164/146) | **0.900 hidden tier x 0.82 weekly 18%** = 0.738: £1,459 x 0.738 = £1,076.742, **exact to the penny** | £1,240.15 (weekly 15%) | **-£163.41 (-13.2%)** |
| 18-20 Nov, 2 n | 18 Nov 15:19 | 0 d | 3 | **£254.15** | **£129** | £59.39 (15.5%) | 07:19Z: £317 (158/159). The 12:20Z push moved 19 Nov to £151 (PriceLabs); 18 Nov after the push: NOT CHECKED | **0.850**: £299 x 0.85 = £254.15 exact, if 18 Nov was £148 after the push | £299 (2 n, no stay discount; estimate) | **-£44.85 (est.)**; -£62.85 against the 07:19Z price |

**27 Dec-4 Jan**
- The £1,459 is the price that was live when the stay was booked. Smoobu at 07:19Z on 18 Nov equals the PriceLabs prices from the 17 Nov 09:09Z refresh, and the next P04 push came at 12:20:21Z, after the booking.
- The gap splits into two parts. The hidden 0.900 tier costs **£124.02**, and weekly 18% instead of 15% costs **£39.39**.
- **NYE minimum stays did apply.** 27 Dec has min 7 (28-31 Dec min 5), and the stay is 8 nights.
- After the 12:20Z refresh, PriceLabs prices these nights at £1,550. The guest paid 0.695 of that figure.
- The 7 nights from 27 Dec to 2 Jan were £1,313 in Smoobu, against £1,076.74 paid for 8 nights.

**18-20 Nov**
- The £129 cleaning fee, against £142 on stays of 3 or more nights, fits an Airbnb short-stay cleaning fee.
- This also resolves yesterday's unexplained 0.809 on the synced 18-20 Nov card. With £129 cleaning, £398.45 - £129 = £269.45 = 0.850 x £317 exactly.
- The 0.850 at lead 0 is not shown to guests as a discount. It differs from the 0.765 seen at 1-28 days.
- The stay sold Reyhan's min-2 window. PriceLabs log, 18 Nov 12:18:46Z: DSO 18-19 Nov +5%, min 2. This conflicts with `listing_facts.P04.min_stay_rule`. **Corentin to confirm or revert** (it has sold, and the nights are now past).

**a-airbnb-rules: day 21, NOT fixed.**
- £3,966.66 + £163.41 = **£4,130.07 confirmed**.
- Adding the 18-20 Nov estimate of £44.85 gives **£4,174.92**.

**20-24 Nov booking (made 14 Nov):** Smoobu shows it modified 18 Nov 17:30. The total is unchanged at £631.59 (£489.59 + £142), with 2 adults and 2 children. What changed: NOT CHECKED.

### 2. 1455, day 20: the sold 20-24 Nov is still on sale, with arrival TOMORROW

| Stay (2 adults) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch19/air/`) |
|---|---|---|---|---|
| 20-24 Nov | **booked** (Airbnb, £489.59 + £142) | **bookable £780.30** (4 x £195.08; 18 Nov £741.40) | not offered | p04_2024nov 07:20:25Z |
| 21-24 Nov | booked | **bookable £613.70** | not offered | p04_2124nov 07:20:29Z |
| 20-23 Nov | booked | **bookable £617.95** | not offered | p04_2023nov 07:20:34Z |
| 20-23 / 22-26 / 20-26 Dec | open | not offered | offered | p04_2023dec, p04_2226dec, p04_2026dec |
| 27 Dec-2 Jan, 27 Dec-4 Jan | **booked (new)** | **not offered** | not offered | p04_2702jan 07:20:57Z, p04_2704jan 07:21:01Z |
| 6-13 Dec / 13-20 Dec / 4-7 Jan | open | £1,290.26 / £1,282.97 / £639.20 | offered | p04_0613dec, p04_1320dec, p04_0407jan |

- **Yes. A second guest can still book the sold 20-24 Nov, and the first guest arrives tomorrow.** The new 27 Dec-4 Jan sale is not exposed today: 1455 stays closed over Christmas and New Year.
- The 1455 weekly cards fit cleaning £119 with 10% weekly: £130.14 = 10% x (£1,420.40 - £119) and £129.33 = 10% x (£1,412.30 - £119). On that basis the 20-24 Nov room is £661.30. This is a fit; the cleaning fee itself is not shown.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 19 Nov-5 Jan **today** (or unlist). Then map it to Smoobu 3562176.

### 3. Booking.com: +15% markup, derived plans, bookings, running totals

**Live display: NOT CHECKED (AWS WAF).** I cannot confirm today whether the Standard Rate is at ceil(Smoobu x 1.15).
- The 18 Nov screenshots were still at x1.10 (2 Dec £471 = ceil(£428 x 1.10)).
- At +15%, Standard should be **£493**. Smoobu 2 Dec is still £428.
- Derived plans for 2 Dec at £493 Standard: NR £443.70, Weekly £419.05, Monthly £394.40, NR Weekly £404.26. Display NOT CHECKED.
- **Plan minimum stays 3/7/28/7 (t-bcom-minstay-1811): NOT CHECKED** (WAF).

**No Booking.com booking since 18 Nov**, so there is nothing to compare against Standard or the derived plans. The last one was created 16 Nov 22:52, about 56 h ago.

Expected Booking.com Standard for the key open nights (Smoobu 19 Nov 07:18Z):

| Flat / nights | Smoobu | Standard x1.15 (ceil per night) | At old x1.10 | NR / Weekly / Monthly / NR Weekly |
|---|---|---|---|---|
| P04 20-26 Dec (7 n, min 3-4) | £1,233 (171/174/169/180/183/179/177) | **£1,421** | £1,360 | £1,278.90 / £1,207.85 / £1,136.80 / £1,165.22 |
| P11 23 / 24 / 25 Dec | £285 / £263 / £273 | £328 / £303 / £314 | £314 / £290 / £301 | x0.90 / x0.85 / x0.80 / x0.82 |
| P11 3 Jan | £172 | £198 | £190 | - |
| P20 20 / 21 / 22 Nov (delivery block) | £334 / £282 / £292 | £385 / £325 / £336 | £368 / £311 / £322 | - |

**Running totals since the 24 Oct markup cut**

Source: `reservations.csv` 19 Nov, booked_on 24 Oct or later. The P04 20-23 Nov triplicate is counted once. The figures are unchanged since 17 Nov.

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross since cut | 25 | 104 | £18,361.53 | £3,720.39 |
| Still confirmed | **16** | 70 | £11,564.66 | £2,350.05 |
| Cancelled | 9 | 34 | £6,796.87 (**37.0%** of gross room) | £1,370.34 |
| Booked since +10% (12 Nov) | 5 gross / 4 confirmed | 26 / 21 | £4,589.17 / £3,742.07 | £883.65 / £704.01 |
| Booked since +15% (18 Nov) | **0** | - | - | - |

Pace over 25.73 days (24 Oct 13:38Z to 19 Nov 07:18Z): **0.97 a day gross and 0.62 confirmed**, both still falling.

### 4. t-p20-delivery, P20 22-24 Nov, t-channel-gaps, long-stay, P04 weekly, twins, Reyhan's 18 Nov DSOs

**t-p20-delivery: still on sale with arrival TOMORROW. Corentin to confirm today.**
- Smoobu has **20 Nov £334 and 21 Nov £282 (min 3), and 22 Nov £292 (min 2) open** (18 Nov: 317/331/278). This goes against `listing_facts.P20.block_20_21_nov`.
- Airbnb sells **20-23 Nov at £694.62 room** (0.765 x £908; 07:21:40Z). The 2-night 20-22 Nov is not offered (min 3 holds).
- Booking.com: NOT CHECKED.
- Setting: Smoobu > Waterford Court (3547481) > block 20-22 Nov, or Corentin updates policy.

**P20 22-24 Nov min 2: on sale.**
- Smoobu 22/23 Nov is £292/£284, min 2, against policy's min 3 to 30 Nov.
- Airbnb sells 22-24 Nov at **£440.64 room** (0.765; 07:21:53Z). Corentin to confirm or revert.

**Reyhan's 18 Nov DSOs (PriceLabs log): Corentin to confirm or revert where they cross policy.**
- **P13 1 Dec: +25% min 1 on both twins (12:14:53Z) replaced the intentional +50% (`intentional_overrides.P13`).**
  - Smoobu 1 Dec fell from £278 to £232 on 3064856 and from £194 to £163 on 3090701.
  - £278 / 1.5 x 1.25 = £231.67, which fits the replacement.
- P20 5 Dec and 26 Dec: +100% min 1 (12:17Z). The orphans are now £531 and £569 (18 Nov: £265 / £272). Booking.com Standard would be £611 / £655. No policy conflict; the price level is for the PriceLabs and occupancy sections.
- P13 27 Nov +25% (both twins), P05 29 Nov-2 Dec -2% min 3, and P11 3-4 Dec, 14-15 Dec and 16-18 Dec -2%. Not channel issues.

**t-channel-gaps (P11, Booking-only): not met.**
- In Smoobu: 23-25 Dec £285 / £263 / £273 (targets about £320 / £295 / £305), and 3 Jan £172 (target about £195). 8 Dec is £292, min 1.
- If +15% has reached Booking.com, the Standard prices are £328 / £303 / £314 / £198, but they are cut by the stacked promotions. Display NOT CHECKED.

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 6-13 Dec: -£164.59 = 18.0% of £914.40.
- 13-20 Dec: -£167.19 = 18.0%.
- It cost **£39.39** on the 27 Dec-4 Jan sale.
- **Long stay 10% on 6 n 20-26 Dec: -£95.04**, so the card is 0.810 of Smoobu.

**P05 long-stay**
- **Long stay discount 10% on 5 n is still on:** 5-10 Jan -£192.78, 18-23 Jan -£203.00.
- Weekly is 15.0% on 4-11 Jan (-£402.32 = 15% of £2,682). This matches policy.
- Early-bird (a-p05-earlybird) is not shown at 47-64 d.
- **New today: about £20 a night extra in all three P05 cards (8 adults) that is not in Smoobu or PriceLabs.**
  - The extra is £100 on 5 n and £140 on 7 n. The discounts are computed excluding it: £192.78 = 10% x £1,927.80.
  - It fits an extra-guest fee (PriceLabs `extra_person_fee` = 0). Where it was set: NOT CHECKED.
  - Tier boundary today: 18 Jan at 60 d fits 1.000 (and 0.900 at 47-52 d).

**P13 long-stay (t-p13-los5):** 10.0% on 5 n on both twins.
- 14-19 Dec: -£110.79 / -£99.63.
- 3-8 Jan: -£77.13 / -£77.13.

**t-p13-twins: worse today. 60 of 68 jointly open nights are identical in Smoobu** (18 Nov: 43 of 68).
- They now differ only on 27 Nov, 1 Dec and 13-18 Dec. 3090701 dropped to equal 3064856 on 3-4 Jan (182/181 to 172/171).
- **The Airbnb cards for 3-8 Jan are identical (£921.30 on both).**
- This conflicts with `listing_facts.P13.twin_listings` (Airbnb may block duplicates). Corentin to confirm. Setting: PriceLabs 3090701 > DSO about +3% on 19 Dec-28 Feb, set on the child after any parent edit.

### 5. Parity table

| Ref | Channel | Stay (lead) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source (`ch19/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb (booked) | 27 Dec-4 Jan, 8 n (39) | 4 | £1,459 (18 Nov) | £1,240.15 | **£1,076.74 paid** | -13.2% | FLAG | Smoobu reservation, created 18 Nov 09:27 |
| P04 synced | Airbnb (booked) | 18-20 Nov, 2 n (0) | 3 | £317 at 07:19Z / est. £299 at booking | £299 (est.) | **£254.15 paid** | -15.0% (est.) | FLAG + min-2 conflict | Smoobu reservation, created 18 Nov 15:19 |
| P04 synced | Airbnb | 20-26 Dec, 6 n (31) | 2 | £1,056 | £1,056.00 | £855.36 | -19.0% | FLAG | p04_2026dec 07:20:38Z |
| P04 synced | Airbnb | 20-23 Dec (31) | 2 | £514 | £514.00 | £462.60 | -10.0% | FLAG | p04_2023dec 07:20:44Z |
| P04 synced | Airbnb | 22-26 Dec (33) | 2 | £711 | £711.00 | £639.90 | -10.0% | FLAG | p04_2226dec 07:20:51Z |
| P04 synced | Airbnb | 6-13 Dec, 7 n (17) | 2 | £1,016 | £863.60 | £749.81 | -13.2% | FLAG | p04_0613dec 07:21:04Z |
| P04 synced | Airbnb | 13-20 Dec, 7 n (24) | 2 | £1,032 | £877.20 | £761.61 | -13.2% | FLAG | p04_1320dec 07:21:10Z |
| P04 synced | Airbnb | 4-7 Jan (46) | 2 | £446 | £446.00 | £401.40 | -10.0% | FLAG | p04_0407jan 07:21:17Z |
| P04 unsynced 1455 | Airbnb | 20-24 / 21-24 / 20-23 Nov | 2 | booked | not for sale | £780.30 / £613.70 / £617.95 card | n/a | FLAG (double-sell, arrival 20 Nov) | p04_2024nov, p04_2124nov, p04_2023nov |
| P04 unsynced 1455 | Airbnb | Christmas-NYE incl. sold 27 Dec-4 Jan | 2 / 4 | open / booked | - | not offered | - | ok (closed) | p04_2026dec, p04_2702jan, p04_2704jan |
| P20 | Airbnb | 20-23 Nov (1) | 2 | £908 | £771.80 (LM 15%) | £694.62 | -10.0% | FLAG + delivery conflict | p20_2023nov 07:21:40Z |
| P20 | Airbnb | 20-22 Nov, 2 n | 2 | min 3 | - | not offered | - | ok | p20_2022nov 07:21:31Z |
| P20 | Airbnb | 22-24 Nov (3) | 2 | £576 | £489.60 (LM 15%) | £440.64 | -10.0% | FLAG + min-2 conflict | p20_2224nov 07:21:53Z |
| P20 | Airbnb | 14-19 Dec, 5 n (25) | 2 | £1,550 | £1,550.00 | £1,228.13 | -20.8% | FLAG | p20_1419dec 07:22:10Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (25) | 4 | £1,231 / £1,107 | same | £997.11 / £896.67 | -19.0% / -19.0% | FLAG | p13_1419dec 07:22:36Z |
| P13 3064856 / 3090701 | Airbnb | 18-21 Dec (29) | 4 | £731 / £704 | same | £657.90 / £633.60 | -10.0% / -10.0% | FLAG | p13_1821dec 07:22:51Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (45) | 4 | £857 / £857 | same | £694.17 / £694.17 | -19.0% / -19.0% | FLAG + identical twins | p13_0308jan 07:23:01Z |
| P05 | Airbnb | 5-10 Jan, 5 n (47) | 8 | £2,142 | £2,142.00 | £1,735.02 (+£100 extra-guest fit) | -19.0% | FLAG | p05_0510jan 07:23:23Z |
| P05 | Airbnb | 4-11 Jan, 7 n (46) | 8 | £2,980 | £2,533.00 | £2,279.68 (+£140) | -10.0% | FLAG | p05_0411jan 07:23:37Z |
| P05 | Airbnb | 18-23 Jan, 5 n (60) | 8 | £2,030 | £2,030.00 | £1,827.00 (+£100; Long stay only) | -10.0% | FLAG | p05_1823jan 07:23:29Z |
| all | Booking.com live | - | - | - | e.g. P04 2 Dec Standard £493 | NOT CHECKED: AWS WAF 07:24:44Z | - | - | ch19/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

P05 rows in `channel_checks.csv` include the roughly £20 a night extra (only cleaning was removed).

The open-card £ gaps overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| P05 5-10 Jan | £406.98 |
| P20 14-19 Dec | £321.87 |
| P05 4-11 Jan | £253.32 |
| P13 14-19 Dec | £233.89 / £210.33 |
| P05 18-23 Jan | £203.00 |
| P04 20-26 Dec | £200.64 |
| P13 3-8 Jan | £162.83 each |

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed in policy) | £115.00 | £97.75 |
| Booking.com if still x1.10 (18 Nov screenshots) | £110.00 | £93.50 |
| Airbnb model / live at 60 d or more | £100.00 | £84.50 |
| Airbnb 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb 0.850 (lead 0, P04 18-20 Nov sale) | £85.00 | £71.83 |
| Airbnb 0.900 x Long stay (5-6 n) | £81.00 | £68.45 |
| Airbnb 0.765 (1-28 d) | £76.50 | £64.64 |
| Airbnb 0.738 (P04 27 Dec-4 Jan sale, 7+ n at 29-59 d) | £73.80 | £62.36 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- The observed Airbnb prices inside 60 days are at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 19 Nov), VAT-corrected**
- Booking.com booked ADR in PriceLabs is ex-VAT, so Booking.com nights are multiplied by 1.2. The 2 nights with a blank ref are dropped.
- The unadjusted run reproduces the pack. Script `ch19s/vat.py`.
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -17.0% (11 n) | **-4.4%** | Booking.com +4.4% (8 n); Airbnb -27.1% (3 n) |
| P11 | -40.0% (10 n) | **-28.0%** | all Booking.com |
| P12 | -39.1% (14 n) | **-26.9%** | all Booking.com |
| P13 | -42.4% (15 n) | **-36.8%** | Booking.com -43.4% (9 n); Airbnb -27.0% (6 n) |

Airbnb-only flats need no correction: P01 -38.4%, P05 -9.5%, P06 -45.0%, P09 -26.4%, P20 -39.5%.

### 7. Fees and min stay

**Cleaning**
- Synced cards reconcile with P04 £142, P13/P20 £150 and P05 £195.
- **P04 2-night stays carry £129** (booking 18-20 Nov; it also reconciles the 18 Nov card exactly).
- 1455 fits £119 (not shown separately).
- P05 has a new ~£20 a night extra at 8 guests that Smoobu and PriceLabs do not set.
- Booking.com fees: NOT CHECKED.

**Min stay as displayed matches Smoobu**
- P20 20-22 Nov is not offered as 2 nights (min 3).
- P04 20-23 Dec sells at 3 nights and 22-26 Dec at 4 nights.
- P20 22-24 Nov sells as 2 nights (a policy conflict).
- On 1455, min stay is NOT CHECKED.
- Booking.com plan minimums: NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 21. Total £4,130.07 confirmed (+£44.85 est. = £4,174.92).**
   - Today adds **£163.41 from P04 27 Dec-4 Jan** (0.900 x weekly 18%, exact to the penny) and an estimated £44.85 from P04 18-20 Nov (0.850 at lead 0).
   - Largest open-card gaps: P05 5-10 Jan £406.98, P20 14-19 Dec £321.87, P05 4-11 Jan £253.32.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute rule (0.850 at 0 d, 0.765 at 1-28 d) and the 0.900 lead-time rule (29-59 d). Keep the visible discounts.
2. **Critical: unsynced 1455, day 20. It sells the booked 20-24 Nov at £780.30, and the first guest arrives tomorrow.**
   - At risk: the £631.59 stay, plus relocation if a second guest books.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 19 Nov-5 Jan today, or unlist. Then map it to 3562176.
3. **High: Booking.com +15% not shown to have reached Booking.com (live NOT CHECKED, WAF).** At x1.10 instead of x1.15, Standard is about 4.3% low. For example, P04 20-26 Dec is £1,360 against £1,421 (-£61), and 2 Dec is £471 against £493.
   - Setting: Smoobu > pricing > Booking.com overwrite +15% (policy `booking_markup_note`). Corentin to send an extranet screenshot of the Standard Rate for 2 Dec and 20 Dec, plus the plan minimum stays (t-bcom-nr-base-1811, t-bcom-minstay-1811).
4. **High: P04 Airbnb weekly 18% and Long stay 10%.**
   - Weekly 18% cost £39.39 on the sale today. Open cards: 6-13 Dec -£164.59, 13-20 Dec -£167.19, Long stay on 20-26 Dec -£95.04.
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%, and Long stay 0% (or keep and record it).
5. **High: Long stay 10% on 5 n on P05 (-£192.78 / -£203.00) and the P13 twins (-£110.79 / -£99.63 / -£77.13 x 2).** It is not in policy.
   - Separately, P05's new ~£20 a night extra-guest fit (£100-£140 a stay, paid by the guest) has an unknown source.
   - Corentin to keep or zero the Long stay discount.
6. **High: t-p20-delivery: 20-22 Nov is on sale and arrival is tomorrow (Airbnb 20-23 Nov £694.62 room).** Also the min-2 conflicts:
   - P20 22-24 Nov is on sale at £440.64.
   - P04 18-19 Nov min 2 sold at £254.15.
   - Corentin to confirm or revert. Setting: Smoobu > Waterford Court > block 20-22 Nov; PriceLabs DSO min 3.
7. **High: P13 1 Dec intentional +50% replaced by Reyhan's +25% (18 Nov 12:14Z).** Smoobu 1 Dec is down £46 (3064856) and £31 (3090701). Corentin to confirm or revert. Setting: PriceLabs 3064856 (child copies) > DSO 1 Dec +50%, min 1.
8. **Medium: P13 twins identical on 60 of 68 nights, with identical Airbnb cards on 3-8 Jan (£921.30).** t-channel-gaps on P11 is not met (23 Dec £285 against about £320; 3 Jan £172 against about £195).
9. **Medium: Booking.com pace.** No Booking.com booking in about 56 h. 37.0% of gross room since the cut has been cancelled.

Data gaps:
1. Booking.com live prices, whether the +15% has reached Booking.com, derived-plan display, plan minimum stays and same-date ordering: NOT CHECKED (AWS WAF, not circumvented).
2. P04 18 Nov Smoobu price after the 12:20Z push (needed to firm up the £299 / 0.850 fit): NOT CHECKED. Smoobu gives no price history.
3. Which Airbnb listing took the two P04 bookings is an inference from the Smoobu API split and the cards. The Airbnb reservation pages: NOT CHECKED.
4. What changed in the 18 Nov 17:30 modification of P04 20-24 Nov: NOT CHECKED.
5. Source of the P05 ~£20 a night extra at 8 guests: NOT CHECKED.
6. 1455 cleaning fee and minimum stay: NOT CHECKED (cards do not split cleaning; £119 is a fit).
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
