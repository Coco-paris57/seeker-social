## Channel parity

Run date D = 2026-11-28 (Saturday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster;
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans;
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments, 28 Nov-28 Feb, fetched **2026-11-28T07:19:13Z** (`ch28/smoobu_rates28.json`). The "before" set is 27 Nov 07:19Z (`ch27/smoobu_rates27.json`).
- **Smoobu GET `/api/reservations`** (modifiedFrom 27 Nov, with cancellations) returned **4 records**:
  - P12 Booking.com 7-14 Dec, **cancelled** (modified 27 Nov 08:31Z);
  - P06 Airbnb 8-12 Dec, **new** (created 27 Nov 21:21Z);
  - P04 Airbnb 10-13 Dec (yesterday's booking, unchanged);
  - P06 Airbnb 29 Nov-2 Dec, modified 27 Nov 10:19Z. Amounts are unchanged (£513.04 / £129 / £99.52).
  - I pulled price elements for P06 and P12. I kept amounts only and dropped guest fields and references (`ch28/smoobu_mod28.json`, `ch28/pe28.json`).
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` (booked 27-28 Nov) returns 2 records, both Airbnb: P06 8-12 Dec £948.60 (booked 27 Nov 22:21 Smoobu-local) and P04 10-13 Dec. **No new Booking.com booking.**
  - `get_pms_reservations` (P12, stays to 15 Dec) shows 7-14 Dec as **cancelled 27 Nov 08:31:49Z**, revenue £1,193.68 ex-VAT. **PriceLabs has registered both changes.** The P06 price file still shows 8-11 Dec as available, because there has been no refresh since 15:02Z.
  - `get_user_logs` (listing, 27-28 Nov) returns **9 entries, all Reyhan, 27 Nov 14:56-15:02Z** (§4). **The 15:00Z batch was edit-triggered.**
- **Live Airbnb:** 30 plain public airbnb.co.uk map searches (curl), every page read, 07:20:55Z-07:26:55Z (`ch28/air/*.json`: URL, dates, search guests, timestamp). I also read four room pages at 07:27:16Z-07:27:21Z (`ch28/pg/`).
  - `data/snapshots/2026-11-28/channel_checks.csv` was absent. I copied it forward from 27 Nov (514 lines) and **appended 35 rows** under `.channel_checks.csv.lock` (549 lines).
  - Room = first price line minus cleaning, before taxes. Cleaning: P04 £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195, P12 £150 (3+ n).
- **Booking.com live: NOT CHECKED.** One plain search (Mile End, 7-10 Dec, 2 adults) at 07:27:07Z returned HTTP 202 with an AWS WAF challenge (`ch28/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**
- **Clock:** Smoobu's created and modified times are UTC+1, and PriceLabs repeats them with a "Z" suffix. Below I give UTC.

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch28s/`.)

### 1. P06 Marylebone Airbnb 8-12 Dec (new, made 27 Nov 21:21Z, lead 11 d)

Price elements: room **£948.60**, cleaning £129, commission **£167.03 = 15.50%** of £1,077.60.

| Base for 8-11 Dec | Nights | Total | Paid per £100 | Fit |
|---|---|---|---|---|
| Smoobu 27 Nov 07:19Z (before the 15:02Z push) | 304 / 317 / 312 / 333 | £1,266 | **£74.93** | none |
| **PriceLabs price after Reyhan's -2% DSO (pushed 15:02Z, 6 h before the booking)** | 298 / 310 / 306 / 326 | **£1,240** | **£76.50** | **exact: 0.765 x £1,240 = £948.60, to the penny** |
| Smoobu now (28 Nov 07:19Z, booked nights) | 334 / 343 / 334 / 364 | £1,375 | £68.99 | none (0.69 x £1,375 = £948.75) |

**Hidden layers.** The booking is the same 0.765 tier as every other Airbnb card:
- **the hidden 0.9** (Smoobu Airbnb default pricing rule, not shown to guests) = **£124.00**;
- **last-minute 15%** (inside 14 days) = **£167.40**;
- then Reyhan's **-2% PriceLabs DSO** (3-13 Dec, 27 Nov 15:02Z) took another £26 off the base. That is £19.89 off the payout.

**Net:** £948.60 x 0.845 = £801.57, or **£64.64 per £100** of the price Airbnb priced from. That is £19.86 below the Airbnb model (£84.50).

**Which base:** the booking fits PriceLabs' DSO price, not the Smoobu values on those nights today. Today Airbnb cards read Smoobu everywhere I can test (§3). So Smoobu most likely held £1,240 at 21:21Z, and its booked-night values changed afterwards. The mechanism is NOT CHECKED: PriceLabs has not pushed P06 since 15:02Z.

**a-airbnb-rules (day 30): P06 adds £124.00 confirmed** (exact fit; the hidden 0.9 alone, 0.1 x £1,240). The last-minute 15% (£167.40) is not in policy for P06, so I report it separately and do not add it.
- **New totals: £4,297.59 confirmed** (£4,173.59 + £124.00).
- **£4,914.02 including estimates** (£4,790.02 + £124.00).

**P06 gaps around the stay:**

| Nights | Smoobu | Min stay | Live result | Status |
|---|---|---|---|---|
| **6-7 Dec** (between the 3-6 Dec and 8-12 Dec stays) | £271 / £262 | 3 | 6-8 Dec **not offered** on Airbnb (07:22:34Z) | **unsellable orphan** |
| 12 Dec (1 night before the 13 Dec block) | £283 | 3 | - | unsellable at min 3 |
| 2 Dec | £328 | 1 | 2-3 Dec **not offered** (07:22:08Z) | cause NOT CHECKED |

- Reyhan's DSO set min 3 on 3-13 Dec.
- Setting: a PriceLabs DSO on 3288517 for 6-7 Dec with min stay 2 (Corentin to decide).

### 2. Booking.com: P12 cancellation, totals, t-bcom-markup-2511

**P12 Mile End 7-14 Dec (7 n) cancelled 27 Nov 08:31Z**, 10 days before arrival. It was made 14 Nov.
- **What it had paid:** £1,432.42 room (VAT incl., VAT £238.74) on Smoobu at booking 259 / 249 / 267 / 287 / 317 / 323 / 287 = **£1,989** (14 Nov read; source `reports/2026-11-15/sections/channel.md`).
  - Paid per £100 Smoobu: **£72.02** (VAT incl.), £60.01 ex-VAT.
  - Commission £237.36 = 15.00% of room + cleaning, so **net room £61.22 per £100**.
  - The stack fit was Σceil(Smoobu x1.10) x Weekly 0.85 x 0.90 x 0.90 x 0.95 (made under the +10% markup).
- **Now open** at Smoobu 262 / 266 / 264 / 265 / 279 / 284 / 265 = **£1,885**, 5.2% under the price at booking. 7-10 Dec carries Reyhan's -2% DSO (min 2), set at 14:56Z, after the cancellation.
  - Booking.com Standard expected = Σceil(x1.15) = **£2,170** (Weekly plan £1,844.50). Display: NOT CHECKED (WAF).
  - Airbnb sells it now: 7-14 Dec **£1,442.01** (visible Weekly 15%, 0.765 of Smoobu); 7-10 Dec £605.88; 10-13 Dec £633.41; 7-13 Dec £1,239.29.
  - A full-week Airbnb rebooking at today's card would net about the same as the cancelled stay: £1,442.01 x 0.845 = £1,218.50, against £1,432.42 x 0.85 = £1,217.56.

**Running totals since the 24 Oct markup cut (verified)**
- Source: `reservations.csv` 28 Nov, Booking.com, booked_on 24 Oct or later. The P04 20-23 Nov triplicate is counted once. Room is VAT incl.
- Scott Ellis is unmapped and not in the file.

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **29** (unchanged) | 116 | £20,435.82 | £4,151.60 |
| Still confirmed | **16** (-1) | 64 | £10,435.10 | £2,191.36 |
| Cancelled | **13** (+1: P12 7-14 Dec) | 52 | £10,000.72 (48.9% of gross room) | £1,960.24 |
| Booked since +15% (18 Nov) | 4 gross / 3 confirmed | 12 / 8 | £2,074.29 / £1,585.94 | £431.21 / £338.61 |
| Scott Ellis (unmapped), extra | +1 confirmed | 5 | £2,238.40 | £358.26 |

- **Cancellation rate: 13 of 29 = 44.8% by count** (yesterday 41.4%), 52 of 116 nights = 44.8%, **48.9% of room value**. Including Scott Ellis: 13 of 30 = 43.3%.
- Of the cancelled room value, **P12 December arrivals are £4,813.45 across 5 stays** (3-7, 4-7, 4-8, 7-14 and 11-13 Dec). The only confirmed P12 December stay is 4-7 Dec.
- Pace over 34.74 days (24 Oct 13:38Z to 28 Nov 07:19Z): **0.83 a day gross, 0.46 confirmed** (yesterday 0.86 / 0.50).
- **No new Booking.com booking for 3 days.** The last was P11 25-27 Nov, made 25 Nov.

**t-bcom-markup-2511: unchanged, 0 of 4 confirmed Booking.com bookings made since 18 Nov fit x1.15** (incl. Scott Ellis).
- There was no new booking to test. The cancelled P12 stay was made under +10%, so it is not evidence either way.
- Setting: Smoobu > Channel Manager > Booking.com > price overwrite on 2699998, 3588993 and 3064196. Check each reads +15%.
- Corentin to screenshot the P12 Standard Rate for 7-10 Dec: Smoobu £792, so x1.15 = **£911** and x1.10 = £872.

**P11 Camden (Booking-only)**
- **The Smoobu block from 5 Jan 2027 is still there** (0 of 55 nights open, 5 Jan-28 Feb).
- **3-4 Jan is still unsellable**: £148 / £163 at min 3, between the booked 2 Jan and the blocked 5 Jan.
- **Christmas:** 23 / 24 / 25 Dec is now **£277 / £255 / £262** (yesterday £277 / £255 / £264). Standard at x1.15 would be £319 / £294 / £302.
  - No P11 entry in `get_user_logs` for 27-28 Nov, so Reyhan's 25 Nov removal of the override still stands. Corentin to confirm or revert.
  - Display: NOT CHECKED (WAF).

### 3. P04 / P05 / P06: Smoobu vs PriceLabs, and which price the Airbnb cards show

The Dispatcher counted **49 nights >£2 apart (P04 21, P05 20, P06 8)**. My count over all 60 days, booked nights included, is P04 28, P05 44, P06 42.
- **PriceLabs `user_price` / `booked_price` equal yesterday's Smoobu (27 Nov 07:19Z) on every open night.**
- PriceLabs `price` = `user_price` after Reyhan's new DSOs: P06 -2%, P04 -5%, P05 -10%. Example: P06 8 Dec £304 x 0.98 = £298.
- Today's Smoobu matches neither: P05 29 Nov £442 vs PriceLabs £464 vs yesterday £473; P04 13 Dec £166 vs £141; P06 6 Dec £271 vs £326. What wrote these values into Smoobu after the 15:00-15:02Z push: NOT CHECKED.

**The Airbnb cards show the Smoobu price**, to the penny, on every testable stay:

| Stay | Smoobu | PriceLabs | Airbnb room before visible discount | Fits |
|---|---|---|---|---|
| P04 6-9 Dec | £482 | £492 | £433.80 = 0.9 x 482 | Smoobu |
| P04 6-10 Dec | £641 | £653 | £490.36 = 0.765 x 641 | Smoobu |
| P04 13-16 Dec | £435 | £411 | £391.50 = 0.9 x 435 | Smoobu |
| P04 14-17 Jan | £428 | £419 | £385.20 = 0.9 x 428 | Smoobu |
| P05 29 Nov-2 Dec | £1,303 | £1,372 | £1,172.70 = 0.9 x 1,303 | Smoobu |
| P05 7-9 Dec | £767 | £827 | £690.30 = 0.9 x 767 | Smoobu |
| P05 13-15 Dec | £890 | £942 | £680.85 = 0.765 x 890 | Smoobu |
| P06 | - | - | no open sellable stay (2-3 Dec and 6-8 Dec not offered) | the 8-12 Dec booking fits the PriceLabs DSO price (§1) |

- On P05 the stale Smoobu is **below** PriceLabs: -£69 list on 29 Nov-2 Dec, -£60 on 7-9 Dec, -£52 on 13-15 Dec.
- On P04 13 Dec it is **above** (+£25).
- Fix: a PriceLabs push of P04/P05/P06 (Corentin; I did not trigger one). Then re-read Smoobu.

### 4. Reyhan's new PriceLabs discounts (27 Nov 14:56-15:02Z), confirm or revert

These conflict with Corentin's direction ("cut PriceLabs discounts"). They are for Corentin to **confirm or revert**, not new proposals.

| Listing | Dates | DSO | Min stay | Time (UTC) |
|---|---|---|---|---|
| P12 2699998 (+ Vrbo copy) | 30 Nov-6 Dec, 7-10 Dec | -2% | 2 | 14:56 |
| P05 3166592 | 29 Nov-2 Dec | -10% | 3 | 15:00 |
| P05 3166592 | 4-31 Jan | -10% | 3 | 15:00 |
| P05 3166592 | 1-28 Feb | -8% | 4 | 15:00 |
| P06 3288517 | 3-13 Dec | -2% | 3 | 15:02 |
| P04 3562176 | 6-26 Dec | -5% | 3 | 15:02 |

On Airbnb each one stacks under the hidden 0.9 and the visible discounts. The P06 one is already in a booking (-£19.89).

### 5. 1455, day 29: still selling booked nights, still closed from 20 Dec

| Stay (2 adults searched) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 room after visible discounts | Source (`ch28/air/`) |
|---|---|---|---|---|
| 6-9 Dec | open £482 | bookable £589.47 | £368.73 | p04_0609dec 07:20:55Z |
| 6-10 Dec | open £641 | bookable £743.23 | £490.36 | p04_0610dec 07:21:01Z |
| **10-13 Dec** | **booked (Airbnb 1657, 27 Nov)** | **bookable £600.94** | not offered | p04_1013dec 07:21:08Z |
| **11-14 Dec** | **11-12 Dec booked** | **bookable £596.35** | not offered | p04_1114dec 07:21:14Z |
| 13-16 Dec | open £435 | bookable £574.17 | £332.77 | p04_1316dec 07:21:21Z |
| 14-21 Dec | open £983 | **not offered** | £725.45 | p04_1421dec 07:21:28Z |
| 17-20 Dec | open £431 | bookable £607.83 | £329.70 | p04_1720dec 07:21:34Z |
| 20-23 Dec | open £435 | **not offered** | £332.77 | p04_2023dec 07:21:41Z |
| 20-26 Dec | open £883 | **not offered** | £715.23 | p04_2026dec 07:21:48Z |
| 23-26 Dec | open £448 | **not offered** | £342.71 | p04_2326dec 07:21:55Z |
| 14-17 Jan | open £428 | bookable £617.60 | £385.20 | p04_1417jan 07:22:00Z |

- **Did Corentin block 10-12 Dec on 1455? No.** 10-13 and 11-14 Dec are still bookable on 1455 at unchanged prices. The 3 nights were sold on 1657 on 27 Nov, so a 1455 booking would be a **true double-booking that Smoobu would not see** (day 2 of this exposure).
- **Still closed from 20 Dec? Yes.** 1657 sells 20-23 / 20-26 / 23-26 Dec. 17-20 Dec is still bookable on 1455.
  - A hidden 1455 booking from 20 Dec: **NOT VERIFIED**. A map search cannot tell a booking from a block.
- 1455 room page is live (07:27:21Z, capacity 6). None of its prices has moved since 22 Nov.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar.
  - Block 10-12 Dec now.
  - Check 20-26 Dec for a reservation.
  - Then block or unlist, and map it to 3562176.

### 6. Scott Ellis, P20 guests, P04 weekly, long stay, twins

**Scott Ellis Gardens: the 20% Special offer is still on (day 7).**
- 10-13 Dec: -£194.58.
- 16-19 Dec: -£229.68.
- 7-10 Jan: -£179.64.
- New card, 13-15 Dec: -£130.32.
- With the hidden 0.9 it is **0.72x Smoobu on every card**. The room page still has `isNewListing` true and capacity 6 (07:27:18Z).
- Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.

**P20 capacity: day 10, not changed.**
- The room page shows **capacity 6** (07:27:16Z). Policy max is 4.
- 26-27 Dec sells for **6 adults searched**: room £548.50 (= 0.9 x £565 + **£40 extra guests**), then Last-minute -£76.28, giving £472.22. The 2-adult search gives £432.22, so 6 guests pays **+£40**.
- Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4 (Corentin to confirm or revert).

**P04 weekly 18%: not fixed.**
- 14-21 Dec: -£159.25 = 18.0% of £884.70. At 15% it would be £132.71, so **£26.54 over policy**.
- Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

**Long stay 10% on 5-6 nights: still on** (not in policy; Corentin to keep or zero it).
- P04 20-26 Dec: -£79.47.
- P05 5-10 Jan: -£158.22.
- P13 14-19 Dec: -£93.78 (3064856) / -£86.76 (3090701).
- P13 3090701 3-8 Jan: -£77.04.
- Setting: each Airbnb listing > Pricing > Discounts > Long stay 0%.

**P13 twins: narrower in December.**
- In Smoobu, 32 of 67 jointly open nights are identical.
- **14-21 Dec: 3090701 is 7.4-7.7% below** (yesterday 10.5-11.0%).
- **3-27 Jan: 5.0-6.0% above** (yesterday 6.6-7.5%).
- Cards for 14-19 Dec: £844.02 / £780.84 (-7.5%).
- 3-8 Jan: **3064856 is not offered today** (open, £811, min 3). Yesterday it was 3090701 that was missing. 3090701 shows £693.36. Cause NOT CHECKED.
- No P13 log entry. Setting: a PriceLabs DSO on one twin to bring them within about 3% (Corentin to decide).

### 7. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup; weekly 15% at 7+ nights). Booking.com expected = Standard = Σceil(Smoobu x1.15), before promotions. "Search guests" is the search parameter, not a reservation party. The source for every Airbnb row is `ch28/air/<tag>.json` and the matching `channel_checks.csv` row (28 Nov). Displayed room = after visible discounts, before taxes, cleaning excluded.

| Ref | Channel | Stay (lead) | Search guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P06 | Airbnb (new, 27 Nov) | 8-12 Dec (11) | - | £1,240 priced (Smoobu read £1,266 / now £1,375) | £1,240.00 | **£948.60 paid** | -23.5% | FLAG (0.9 x LM 15%) | Smoobu price elements; PriceLabs reservations |
| P12 | Booking.com (cancelled 27 Nov) | 7-14 Dec, 7 n | - | £1,989 at booking | £1,861.50 (list x weekly) | £1,432.42 paid, then cancelled | -23.0% | FLAG (cancelled) | Smoobu price elements; `reports/2026-11-15` |
| P04 1657 | Airbnb | 6-9 Dec (8) | 2 | £482 | £482.00 | £368.73 | -23.5% | FLAG | p04_0609dec 07:20:55Z |
| P04 1657 | Airbnb | 6-10 Dec (8) | 2 | £641 | £641.00 | £490.36 | -23.5% | FLAG | p04_0610dec 07:21:01Z |
| P04 1657 | Airbnb | 13-16 Dec (15) | 2 | £435 | £435.00 | £332.77 | -23.5% | FLAG | p04_1316dec 07:21:21Z |
| P04 1657 | Airbnb | 14-21 Dec, 7 n (16) | 2 | £983 | £835.55 | £725.45 | -13.2% | FLAG (0.9 + weekly 18%) | p04_1421dec 07:21:28Z |
| P04 1657 | Airbnb | 17-20 Dec (19) | 2 | £431 | £431.00 | £329.70 | -23.5% | FLAG | p04_1720dec 07:21:34Z |
| P04 1657 | Airbnb | 20-23 Dec (22) | 2 | £435 | £435.00 | £332.77 | -23.5% | FLAG | p04_2023dec 07:21:41Z |
| P04 1657 | Airbnb | 20-26 Dec, 6 n (22) | 2 | £883 | £883.00 | £715.23 (Long stay 10%) | -19.0% | FLAG | p04_2026dec 07:21:48Z |
| P04 1657 | Airbnb | 23-26 Dec (25) | 2 | £448 | £448.00 | £342.71 | -23.5% | FLAG | p04_2326dec 07:21:55Z |
| P04 1657 | Airbnb | 14-17 Jan (47) | 2 | £428 | £428.00 | £385.20 | -10.0% | FLAG | p04_1417jan 07:22:00Z |
| **P04 unsynced 1455** | Airbnb | **10-13 / 11-14 Dec** | 2 | **booked** | not for sale | **£600.94 / £596.35 card incl. cleaning** | n/a | **FLAG (double-booking)** | p04_1013dec, p04_1114dec |
| P04 unsynced 1455 | Airbnb | 6-9 / 6-10 / 13-16 / 17-20 Dec, 14-17 Jan | 2 | open | n/a (unsynced copy) | £589.47 / £743.23 / £574.17 / £607.83 / £617.60 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_* as above |
| P04 unsynced 1455 | Airbnb | 14-21 / 20-23 / 20-26 / 23-26 Dec | 2 | open | - | not offered | - | FLAG (possible off-Smoobu booking) | p04_1421dec, p04_2023dec, p04_2026dec, p04_2326dec |
| P06 | Airbnb | 2-3 Dec, 1 n (4) | 2 | £328 (min 1) | £328.00 | not offered | - | FLAG (NOT CHECKED why) | p06_0203dec 07:22:08Z |
| P06 | Airbnb | 6-8 Dec, 2 n (8) | 2 | £533 (min 3) | not sellable at min 3 | not offered | - | FLAG (orphan) | p06_0608dec 07:22:34Z |
| P12 | Airbnb | 30 Nov-3 Dec (2) | 2 | £788 | £788.00 | £602.81 | -23.5% | FLAG | p12_3003dec 07:23:42Z |
| P12 | Airbnb | 7-10 Dec (9) | 2 | £792 | £792.00 | £605.88 | -23.5% | FLAG | p12_0710dec 07:23:01Z |
| P12 | Airbnb | 10-13 Dec (12) | 2 | £828 | £828.00 | £633.41 | -23.5% | FLAG | p12_1013dec 07:23:16Z |
| P12 | Airbnb | 7-13 Dec, 6 n (9) | 2 | £1,620 | £1,620.00 | £1,239.29 | -23.5% | FLAG | p12_0713dec 07:23:30Z |
| P12 | Airbnb | 7-14 Dec, 7 n (9) | 2 | £1,885 | £1,602.25 | £1,442.01 (Weekly 15%) | -10.0% | FLAG | p12_0714dec 07:26:55Z |
| P20 | Airbnb | 14-18 Dec, 4 n (16) | 2 | £1,227 | £1,227.00 | £938.65 | -23.5% | FLAG | p20_1418dec 07:23:56Z |
| P20 | Airbnb | 26-27 Dec (28) | 2 | £565 | £565.00 | £432.22 | -23.5% | FLAG | p20_2627dec 07:24:20Z |
| P20 | Airbnb | 26-27 Dec (28) | **6** | £565 | not for sale (max 4) | £472.22 (+£40) | - | FLAG (guests) | p20_2627dec6 07:24:32Z |
| P05 | Airbnb | 29 Nov-2 Dec (1) | 6 | £1,303 (PriceLabs £1,372) | £1,303.00 | £996.79 | -23.5% | FLAG | p05_2902dec 07:24:35Z |
| P05 | Airbnb | 7-9 Dec, 2 n (9) | 6 | £767 (PriceLabs £827) | £767.00 | £586.75 | -23.5% | FLAG | p05_0709dec 07:24:42Z |
| P05 | Airbnb | 13-15 Dec, 2 n (15) | 6 | £890 (PriceLabs £942) | £890.00 | £680.85 | -23.5% | FLAG | p05_1315dec 07:24:50Z |
| P05 | Airbnb | 5-10 Jan, 5 n (38) | 6 | £1,758 | £1,758.00 | £1,423.98 | -19.0% | FLAG | p05_0510jan 07:25:00Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (16) | 4 | £1,042 / £964 | same | £844.02 / £780.84 | -19.0% / -19.0% | FLAG | p13_1419dec 07:25:19Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (36) | 4 | £811 / £856 | same | not offered / £693.36 | - / -19.0% | FLAG | p13_0308jan 07:25:34Z |
| Scott Ellis 3588993 | Airbnb | 10-13 Dec (12) | 4 | £1,081 | £1,081.00 | £778.32 | -28.0% | FLAG | se_1013dec 07:25:55Z |
| Scott Ellis 3588993 | Airbnb | 13-15 Dec (15) | 6 | £724 | £724.00 | £521.28 | -28.0% | FLAG | p05_1315dec 07:24:50Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (18) | 4 | £1,276 | £1,276.00 | £918.72 | -28.0% | FLAG | se_1619dec 07:26:02Z |
| Scott Ellis 3588993 | Airbnb | 7-10 Jan (40) | 4 | £998 | £998.00 | £718.56 | -28.0% | FLAG | se_0710jan 07:26:10Z |
| P12 / all | Booking.com live | 7-10 Dec | - | £792 | Standard £911 | NOT CHECKED: AWS WAF 07:27:07Z | - | - | ch28/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest against Smoobu are:

| Card | Gap |
|---|---|
| P12 7-13 Dec | £380.71 |
| Scott Ellis 16-19 Dec | £357.28 |
| P05 5-10 Jan | £334.02 |
| P05 29 Nov-2 Dec | £306.21 |
| Scott Ellis 10-13 Dec | £302.68 |
| P20 14-18 Dec | £288.35 |
| Scott Ellis 7-10 Jan | £279.44 |
| P05 13-15 Dec | £209.15 |
| P13 3064856 14-19 Dec | £197.98 |
| P12 10-13 Dec | £194.59 |

### 8. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, in policy) | £115.00 | £97.75 |
| Booking.com observed, Scott Ellis 30 Dec-4 Jan (15%) | £88.06 (VAT incl.) | £74.85 |
| Booking.com observed, P12 4-7 Dec (15%) | £84.33 | £71.68 |
| **Booking.com observed, P12 7-14 Dec (cancelled 27 Nov, 15%, made under +10%)** | **£72.02** (VAT incl.; £60.01 ex-VAT) | **£61.22** |
| Booking.com observed, P11 25-27 Nov (18% booster) | £66.83 | £54.80 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb 0.900 | £90.00 | £76.05 |
| **Airbnb observed, P06 8-12 Dec (new; on £1,240 priced base)** | **£76.50** | **£64.64** |
| Airbnb observed, P04 10-13 Dec | £76.50 | £64.64 |
| Airbnb 0.765 (cards) | £76.50 | £64.64 |
| Airbnb 0.738 (P04 weekly 18%) | £73.80 | £62.36 |
| Airbnb 0.720 (Scott Ellis) | £72.00 | £60.84 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- **Observed, the cancelled P12 week (£61.22) netted less than an Airbnb 0.765 stay (£64.64).** That breaks the "Booking.com nets at least Airbnb" rule for that stack (weekly + two 10% + 5%).
- The 3-night P12 / Scott Ellis Booking.com stays still net more than Airbnb 0.765.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 28 Nov; per property, the top-level field is null), VAT-corrected**
- PriceLabs booked ADR is ex-VAT for Booking.com, so Booking.com nights are multiplied by 1.2. The 6 blank-ref nights (Scott Ellis) are dropped.
- The unadjusted run reproduces the pack exactly (`ch28s/vat28.py`).
- The pack compares with today's PriceLabs price (now including Reyhan's DSOs), not the price on the booking date.
- PriceLabs has not yet re-read P06 8-11 Dec (no refresh since 15:02Z), so the new stay is not in P06's 4 nights.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -22.2% (7 n) | **-10.8%** | Booking.com -1.1% (5 n); Airbnb -32.3% (2 n, 10-13 Dec) |
| P11 | -29.1% (11 n) | **-14.9%** | all Booking.com, 18% booster |
| P12 | -20.2% (3 n) | **-4.2%** | all Booking.com (4-7 Dec); 7-13 Dec dropped out with the cancellation |
| P13 | -31.1% (12 n) | **-25.0%** | Booking.com -25.4% (6 n); Airbnb -24.6% (6 n) |

Airbnb-only flats need no correction: P01 -28.9% (1 n), P05 -13.9% (16 n), P06 -32.2% (4 n), P20 -39.6% (19 n).

### 9. Fees and min stay

**Cleaning**
- The new P06 booking charged the expected £129.
- The cards reconcile with P04 £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195 and P12 £150.
- 1455 cleaning: NOT CHECKED (its card total is not split).

**Min stay**
- P12 7-10 Dec min 2 (Reyhan's DSO) and 11-13 Dec min 3 in Smoobu. Airbnb offers 3-, 6- and 7-night stays across them.
- P06 6-7 Dec (min 3, 2-night gap) is not offered, which is consistent with the setting.
- Exceptions: P06 2 Dec (min 1) and P13 3064856 3-8 Jan are not offered although open with min stay met. NOT CHECKED why.
- 1455 min stay and Booking.com plan minimums: NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 30. £4,297.59 confirmed (+£124.00, P06 8-12 Dec, exact 0.765 x £1,240); £4,914.02 including estimates.**
   - P06 paid £948.60 and nets **£64.64 per £100**. Last-minute 15% (£167.40) and Reyhan's -2% (£19.89) are on top.
   - Every Airbnb card inside about 45 days is still 0.765 / 0.9 of Smoobu. Card gaps go up to £380.71 (P12 7-13 Dec) and £357.28 (Scott Ellis 16-19 Dec).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time rule behind the hidden 0.9 and keep the visible discounts.
2. **Critical: unsynced 1455 is still selling 10-13 / 11-14 Dec (booked on 1657), day 29.** It is still closed from 20 Dec while 1657 sells 20-26 Dec (£715.23).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar. Block 10-12 Dec, check 20-26 Dec, then block or unlist and map it to 3562176.
3. **High: Booking.com cancellations at 44.8% (13 of 29; 48.9% of room value) since 24 Oct.**
   - P12 7-14 Dec (£1,432.42) cancelled 10 days out. It reopens £1,885 in Smoobu for the last managed week before the 13 Dec handback.
   - Confirmed pace is 0.46 a day, and there has been no Booking.com booking for 3 days.
   - Ask Corentin whether Mile End should stay on flexible cancellation for the final week (Booking.com extranet > Property > Policies) or take only Non-refundable for 7-13 Dec.
4. **High: Smoobu is out of step with PriceLabs on P04/P05/P06, and Airbnb shows the Smoobu price.**
   - P05 is undersold by up to £69 list per 3-night stay against PriceLabs.
   - Fix: push P04/P05/P06 from PriceLabs (Corentin), then re-check.
5. **High (Corentin, confirm or revert): Reyhan's 9 DSOs of 27 Nov** (P05 -10% / -10% / -8%, P04 -5%, P06 -2%, P12 -2%). They conflict with "cut PriceLabs discounts". PriceLabs > each listing > Calendar > Date-specific overrides.
6. **High: Scott Ellis Special offer 20% still on** (-£130.32 to -£229.68 per card; 0.72x Smoobu). Airbnb > listing 1823298025501355473 > Pricing > Discounts.
7. **High: Booking.com +15% not evidenced (t-bcom-markup-2511)**: still 0 of 4 confirmed since 18 Nov. Smoobu > Channel Manager > Booking.com > overwrite on 2699998 / 3588993 / 3064196. Corentin to screenshot P12 7-10 Dec Standard (x1.15 = £911).
8. **High: P04 Barking discounts not in policy.**
   - Weekly 18% (14-21 Dec, £26.54 over policy).
   - Long stay 10% (20-26 Dec, -£79.47).
   - Last-minute 15%.
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts.
9. **High (Corentin, confirm or revert):**
   - P20 capacity 6 (+£40 for 6 guests on 26 Dec), day 10.
   - P11 23-25 Dec override removal (£277 / £255 / £262).
   - P11 block from 5 Jan and the unsellable 3-4 Jan (£311): Smoobu > Calendar > 3064196.
10. **Medium: P06 6-7 Dec orphan** (£533 in Smoobu, min 3, not offered). PriceLabs DSO min 2 on 6-7 Dec. 12 Dec (£283) is a 1-night orphan before the intentional block.
11. **Medium: Long stay 10% on 5-6 nights** (P05 -£158.22; P13 -£93.78 / -£86.76 / -£77.04). P13 twins 7.5% apart in December and 5-6% in January.

Data gaps:
1. Booking.com live prices, Standard vs Smoobu, derived-plan display, plan minimum stays and same-date ordering: NOT CHECKED (AWS WAF 07:27:07Z, not circumvented).
2. What Smoobu held for P06 8-11 Dec at 21:21Z on 27 Nov. The fit says £1,240; the Smoobu GET now says £1,375. What rewrote Smoobu for P04/P05/P06 after the 15:00-15:02Z push: NOT CHECKED.
3. Whether 1455 has its own booking from 20 Dec, and its cleaning fee and min stay: NOT CHECKED (map search only).
4. Why P06 2-3 Dec and P13 3064856 3-8 Jan were not offered although open: NOT CHECKED.
5. Whether the Booking.com overwrite reads +15% on 2699998 / 3588993 / 3064196: NOT CHECKED (not exposed by the Smoobu GET API).
6. The P12 7-14 Dec stack's two 10% layers (Last Minute / Mobile / Genius L1) cannot be told apart without the extranet breakdown: NOT CHECKED.
7. Vrbo (incl. the Mile End Vrbo copy that received Reyhan's DSO) and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
