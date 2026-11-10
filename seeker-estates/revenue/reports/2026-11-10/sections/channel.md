## Channel parity

Run date D = 2026-11-10 (Tuesday, GMT). `data/policy.json` read first. Not re-raised: 15%/20% stay discounts, Booking.com promotion stacking (size only), Visibility Booster (P13 on to 20 Dec, so 20% commission is expected), P13 = one flat, P02/P03/P06/P07 blocks, P14 setup, P09 Airbnb rules (deprioritised), P04 2 Dec override (deprioritised).

**Sources (all read-only)**
- Smoobu GET `/api/rates` (12 apartments) at **2026-11-10T07:26:23Z** -> `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10/smoobu_rates10.json`; `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:26:25Z -> `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10/smoobu_mod10_pe.json` (guest fields not saved).
- `reservations.csv` 10 Nov vs 9 Nov: +1 row (P20 Airbnb 21-25 Nov), 2 status changes to cancelled (P12 Bdc 11-13 Dec; P13 Bdc 11-15 Dec, which appears already cancelled), 1 row aged out (P12 6-9 Nov 2025).
- PriceLabs `get_user_logs` (listing, 9-10 Nov): 49 entries, all Reyhan, 9 Nov 14:06-14:10Z and 21:20-22:30Z. Raw `data/snapshots/2026-11-0{9,10}/raw/prices_*.json`; `listings.csv` 10 Nov (`last_push`); `kpi_pack.json` 10 Nov.
- Live Airbnb: 25 plain public airbnb.co.uk map searches (curl, no workarounds), 07:29:13Z-07:32:36Z. Files are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10/air/` (`log.txt` plus one JSON per search, each with URL, dates, guests and timestamp). **29 rows appended under `.channel_checks.csv.lock` to `data/snapshots/2026-11-10/channel_checks.csv`** (copied forward from 9 Nov, 776 -> 805 lines). Room = card total before taxes minus cleaning (P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129).
- **Booking.com live: NOT CHECKED.** One plain search (Shepherd's Bush, 11-15 Dec, 4 adults) at 07:31:41Z returned HTTP 202 with an AWS WAF challenge (`live10/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults until Corentin confirms them.**

### 1. P20 Waterford Court Airbnb 21-25 Nov, £638.54 (Smoobu 162781746)

| Field (Smoobu) | Value |
|---|---|
| Created | 9 Nov 22:34 (lead 12 d), 4 nights, 4 adults |
| Room / cleaning / commission | **£638.54** / £150 / £122.22 (= 15.5% of £788.54) |
| On sale at booking | **£982** (266 + 219 + 250 + 247). This comes from the PriceLabs push at 9 Nov 21:26:36Z (`listings.csv`), the last push before the booking. Smoobu at 07:26Z today and the 10 Nov raw `price` both give 266/219/250/247. |
| Before that push | £1,058 (246/235/244/333; Smoobu 9 Nov 07:19Z = 9 Nov raw `price`) |
| PriceLabs `user_price` at booking | £994 (255/242/250/247) |
| **Paid / on sale** | **0.6502** (vs `user_price` 0.642; vs pre-push 0.604) |
| Fit | **0.765 × 0.85 = 0.65025, which gives £638.55 (1p off).** This is the same stack as P20 6-14 Dec. |

- **Hidden layer.** The card-level layer at this lead is 0.765 (P20 20-23 Nov card, 9 Nov). The booking took one more 0.85. P20's Airbnb discount page (`listing_facts.P20.airbnb_discounts_22oct`) has last-minute 15% for 0-14 days. Policy says not to flag that part, so the expected price is £982 × 0.85 = **£834.70**.
- **Shortfall against policy: -£196.16 (-23.5%).** Against Smoobu with no discount the shortfall is -£343.46.
- **a-airbnb-rules running cost: £2,363.11 + £196.16 = £2,559.27.** The P09 memo is still excluded; including it gives £2,698.58.
- **Orphans.** **20 Nov is a 1-night orphan**: 18-19 Nov blocked, 21 Nov booked, Smoobu £259, **min 3**. Reyhan set min 3 on 20-21 Nov at 21:25:39Z. Airbnb does not offer it (`p20_2021nov_1n`, 07:30:47Z). **25 Nov is not an orphan**: it is the check-in of 25 Nov-5 Dec (booked 28 Oct). **5 Dec stays an orphan** at £309, min 3 (t-p20-5dec-orphan NOT fixed). P20 is now full 21 Nov-14 Dec except 5 Dec.
- **t-p20-delivery.** The policy delivery block is 20-22 Nov (`listing_facts.P20.block_20_21_nov`). Smoobu blocks 18-19 Nov instead, and this booking **puts a guest in the flat on 21 and 22 Nov, the policy delivery dates**. 20 Nov is open as well. **Corentin to confirm whether the delivery moved to 18-19 Nov or clashes with this stay.** This is a conflict, not a new proposal.
  - Min stay: Reyhan's 9 Nov DSOs went back to min 3 on 13-15 Nov, 20-21 Nov and from December. 16-17 Nov is still **min 2**, against policy min 3 to 30 Nov (conflict for Corentin).

### 2. Booking.com cancellations (Smoobu fields only)

| Smoobu id | Ref / listing | Stay | Created | Cancelled (modified) | Party | Room (VAT) | Cleaning | Commission | On sale at booking | Paid / on sale | Paid / list (×1.15) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 162688853 | P12 2699998 | 11-13 Dec, 2 n | 5 Nov 22:39 | 9 Nov 23:30:03 | 2 ad | £513.81 (£85.64) | £150 | £99.57 = 15.0% of room + cleaning | £614 (6 Nov section) | 0.837 | 0.727 |
| 162759785 | **P13 3064856** ("Top-Floor 2Bed with Private Terrace in W12") | 11-15 Dec, 4 n (lead 32 d) | 9 Nov 08:58 | 9 Nov 20:36:35 | 4 ad + 1 ch | **£710.77** (£118.46 = 1/6) | £150 | **£172.15 = 20.0% of £860.77** | **£847** (224/225/200/198) | **0.839** | **0.730** |

- **P13 price at booking.** The last push before 08:58 was 8 Nov 12:40:37Z (`kpi_pack` 9 Nov). Smoobu at 9 Nov 07:19Z and the 9 Nov raw `price` both give £847. PriceLabs `user_price` / `booked_price` were £872 (231 + 231 + 206 + 204), so paid ÷ `user_price` = 0.815. 3090701 is the linked twin (one flat).
- **P13 stack (size only).** Non-refundable 10% × Mobile 10% × Genius L1 10% = 0.729, which gives £710.08 against £974.05 list (paid +0.1%). The party is 5 guests, so there is no NR occupancy reduction. Last Minute (0-30 d) does not apply at 32 d, and Black Friday cannot be booked before 19 Nov. Smoobu's notice flags Genius. **Effective discount 27.0% off list.**
- **Commission.** P13's 20% is inside the booster window (to 20 Dec), so it is expected. P12's is 15%. Cleaning commission would have been £30.00 (P13) and £22.50 (P12). No commission is due on cancelled stays (Smoobu shows no cancellation payout element on either).
- **P12 13 Dec (t-p12-13dec-orphan): resolved by the cancellation.** Smoobu 7-13 Dec is open as one 7-night run, min 3. Reyhan set -5% / min 3 on 7-14 Dec at 22:30:10Z. 14 Dec+ is the handback block. 13 Dec can sell as part of a stay arriving 11 Dec or earlier. Airbnb sells 11-14 Dec at £821.70 room (0.9 of Smoobu £913; `p12_1114dec`, 07:30:23Z).
- **P13 11-15 Dec is back on Airbnb** on both twins at 0.9 (£838.80 / £792.00 room; `p13_1115dec`, 07:30:31Z).
- **18 Oct base-rise tally.** P12 is in the list. If the 11-13 Dec booking was counted in yesterday's +13 n / +£5,123.51, it becomes **+11 n / +£4,609.70** (+15 n / +£5,466.49 incl. P06). The occupancy section owns the method.

### 3. Barking (P04): unsynced Airbnb 1455876748739910219, day 11

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 | Synced 1657859794156786222 | Source (`live10/air/`) |
|---|---|---|---|---|
| 10-13 Nov (lead 0) | open £417, min 3 | **bookable £557.40** | £496.45 card = £354.45 room (0.850) | p04_1013nov 07:29:37Z |
| 14-17 Nov | booked (Bdc 14-18 Nov) | not offered | not offered | p04_1417nov 07:32:28Z |
| 18-21 Nov | open £433 | **bookable £525.80** | £473.24 card = £331.24 room (0.765) | p04_1821nov 07:29:47Z |
| 26-29 Nov | booked (Bdc 25 Nov-2 Dec) | not offered | not offered | p04_2629nov 07:32:36Z |
| 6-19 Dec (13 n) | open £2,447 | **bookable** £2,514.80 - weekly £239.58 = £2,275.22 | £2,344.30 - weekly £396.41 = £1,947.89 | p04_0619dec 07:29:56Z |

- **Still selling: yes, day 11.** It is bookable on every open Smoobu date I checked. It was not offered on the two Smoobu-booked windows I checked (14-17 and 26-29 Nov). On 8 Nov it was still selling a Smoobu-booked night, so its calendar is being closed somewhere I cannot see (manual blocks or an iCal link; NOT CHECKED).
- **Booking on 1455: none visible.** The 10-13 Nov, 18-21 Nov and 6-19 Dec stays are all bookable, and Smoobu has no new P04 reservation. 1455's own reservation list is not in Smoobu (NOT CHECKED).
- Its price is frozen (10-13 Nov £185.80 a night, the same as yesterday). Reyhan cut P04 base 220 -> 200 and changed DSOs (see §6), so 1455 is now **34% dearer than the synced listing for 10-13 Nov** (£557.40 vs £416.45 incl. cleaning). It is dearer, but every booking on it would still be a double booking. **t-p04-doublebook: NOT fixed.**

### 4. Live Airbnb: displayed vs expected (hidden layers, day 12)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises: weekly 15%; P13 last-minute 10% within 14 d and early bird 10% at 60+ d; P20 last-minute 15% (0-14 d). Gap = displayed room ÷ expected - 1. Flag if over 3%. Room = card before taxes minus cleaning.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live10/air/`, 10 Nov) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 10-13 Nov (0) | 2 | £417 | £417.00 | £354.45 (£496.45) = 0.850 | -15.0% | FLAG | p04_1013nov 07:29:37Z |
| P04 synced | Airbnb | 18-21 Nov (8) | 2 | £433 | £433.00 | £331.24 (£473.24) = 0.765 | -23.5% | FLAG | p04_1821nov 07:29:47Z |
| P04 synced | Airbnb | 6-19 Dec, 13 n (26) | 2 | £2,447 | £2,079.95 | £1,805.89 = 0.9 × (1 - **0.18** weekly, £396.41) | -13.2% | FLAG | p04_0619dec 07:29:56Z |
| P04 unsynced 1455 | Airbnb | 10-13 Nov / 18-21 Nov / 6-19 Dec | 2 | open | not for sale | £557.40 / £525.80 / £2,275.22 card (cleaning unknown) | n/a | FLAG (double-sell) | as above |
| P05 | Airbnb | 16-18 Nov (6) | 7 | £770 | £770.00 | £589.04 (£784.04) = 0.765 | -23.5% | FLAG | p05_1618nov 07:29:13Z |
| P05 | Airbnb | 29 Nov-3 Dec (19) | 7 | £2,025 | £2,025.00 | £1,549.11 = 0.765 | -23.5% | FLAG | p05_2903dec_4n 07:29:15Z |
| P05 | Airbnb | 7-9 Dec (27/28) | 7 | £947 | £947.00 | £724.45 = 0.765 | -23.5% | FLAG | p05_0709dec 07:29:18Z |
| P05 | Airbnb | 13-15 Dec (33) | 7 | £1,021 | £1,021.00 | £918.90 = 0.900 | -10.0% | FLAG | p05_1315dec 07:29:21Z |
| P05 | Airbnb | **21-22 Dec, 1 n (41)** | 7 | **£2,207** (min 1) | £2,207.00 | **£1,986.30** (£2,181.30) = 0.900 | -10.0% | FLAG (and deterrent price, §5) | p05_2122dec_1n 07:29:24Z |
| P05 | Airbnb | 9-12 Jan (60) | 7 | £1,166 | £1,166.00 | £1,026.08 (visible **"Early booking discount" £139.92 = 12.0%**) | -12.0% | FLAG (visible, not in policy) | p05_0912jan 07:29:27Z |
| P05 | Airbnb | **11-16 Jan, 5 n (62)** | 6 | £1,907 | £1,907.00 | £1,716.30 (visible **"Long stay discount" £190.70 = 10.0%**) | -10.0% | FLAG (visible, not in policy) | p05_1116jan_5n 07:29:29Z |
| P05 | Airbnb | 11-17 Jan, 6 n (62) | 6 | £2,307 | £2,307.00 | £2,076.30 (Long stay £230.70 = 10.0%) | -10.0% | FLAG | p05_1117jan_6n 07:29:32Z |
| P06 | Airbnb | 15-17 Nov (5) | 3 | £479 | £479.00 | £366.44 (£495.44) = 0.765 | -23.5% | FLAG | p06_1517nov 07:30:08Z |
| P09 | Airbnb | 12-13 Nov, 1 n | 2 | £123 open, min 2 | not sellable (min 2) | not offered | - | orphan (§6) | p09_1213nov_1n 07:30:13Z |
| P12 | Airbnb | 17-20 Nov (7) | 2 | £751 | £751.00 | £574.51 (£724.51) = 0.765 | -23.5% | FLAG | p12_1720nov 07:30:18Z |
| P12 | Airbnb | 11-14 Dec (31) | 2 | £913 | £913.00 | £821.70 (£971.70) = 0.900 | -10.0% | FLAG | p12_1114dec 07:30:23Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Nov (0) | 4 | £533 / £563 | £479.70 / £506.70 (LM10) | £453.05 / £478.55 = 0.850 | -5.6% | FLAG | p13_1013nov 07:30:25Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Dec (30) | 4 | £729 / £688 | same | £656.10 / £619.20 = 0.900 | -10.0% | FLAG | p13_1013dec 07:30:28Z |
| P13 3090701 / 3064856 | Airbnb | 11-15 Dec (31) | 4 | £932 / £880 | same | £838.80 / £792.00 = 0.900 | -10.0% | FLAG | p13_1115dec 07:30:31Z |
| P13 3090701 / 3064856 | Airbnb | 10-15 Dec, 5 n (30) | 4 | £1,166 / £1,101 | same | £944.46 / £891.81 = 0.9 × visible "Long stay discount" 10% (£104.94 / £99.09) | -19.0% | FLAG (10% visible, confirm) | p13_1015dec_5n 07:30:37Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Jan (61) | 4 | **£559 / £559** | £503.10 (EB10) | **£503.10 / £503.10** (visible "Early booking discount" £55.90) | 0.0% | ok on price; **twins identical** | p13_1013jan 07:30:44Z |
| P20 | Airbnb | 20-21 Nov, 1 n | 2 | £259 open, min 3 | not sellable (min 3) | not offered | - | orphan (§1) | p20_2021nov_1n 07:30:47Z |
| P20 | Airbnb | 14-17 Dec (34) | 2 | £874 | £874.00 | £786.60 (£936.60) = 0.900 | -10.0% | FLAG | p20_1417dec 07:30:57Z |
| P20 | Airbnb | 9-12 Jan (60) | 2 | £735 | £735.00 | £735.00 = 1.000 | 0.0% | ok | p20_0912jan 07:31:09Z |
| all | Booking.com displayed | - | - | - | - | NOT CHECKED: AWS WAF challenge 07:31:41Z | - | - | live10/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**Hidden layers: unchanged on day 12, so a-airbnb-rules is NOT fixed.** Each night is priced by its own lead time:
- **0.765** for nights up to 28 d out (P05 7-9 Dec at 27/28 d is all 0.765);
- **0.900** for nights 29-59 d out;
- **1.000** for nights 60 d+ out, or the visible early-booking discount instead;
- **0.850** for the whole stay on same-day check-ins (P04 and both P13 twins, 10-13 Nov).

Bookings keep taking one more 0.85 than the cards show (P20 21-25 Nov today; P20 6-14 Dec; P05 15-21 Dec took 0.9 × LOS 0.9).

**Standing items**
- **P05 12% early booking: still on** (£139.92 = 12.0% of £1,166, 9-12 Jan at 60 d). a-p05-earlybird is NOT fixed.
- **P05 10% long-stay starts at 5 nights.** 11-16 Jan (5 n) gets £190.70 = 10.0%; 29 Nov-3 Dec (4 n) gets none. It does not combine with early booking: the 62-d 5- and 6-night cards show long-stay only. **t-p05-los: NOT fixed.**
- **P04 synced weekly 18% vs policy 15%: NOT fixed.** £396.41 = 18.0% of £2,202.30, which is **£66.07 more** than policy on 6-19 Dec.
- **P13 visible 10% LOS 5+ still on** on both twins (10-15 Dec). Corentin to confirm it is intended (21 Oct listing-B rule).
- **P13 twins (t-p13-twins).** **January: 23 of 29 nights open on both are identical (9-31 Jan)**, and so are all 9 open February nights (1-9 Feb). 3-8 Jan now differ (£167-169 vs £176-178). The 10-13 Jan cards are identical (£709.00 / £653.10). November (5 nights) and December (18 nights) all differ. Reyhan's 9 Nov 10-26 Dec -2% was copied parent -> child again. Policy `listing_facts.P13.twin_listings` says the prices must differ: **conflict for Corentin to confirm.**

### 5. P05: 9 Nov closed unsold; 21 / 29 Dec single nights

- **a-p05-9nov: CLOSE. The night passed unsold.** `reservations.csv` 10 Nov has no P05 row covering 9 Nov, and Smoobu's modified list has no new P05 booking. The -£1,121.40 exposure (Airbnb £281.60 room vs Smoobu £1,403) was not realised. Revenue for the night: £0.
- **21 Dec (orphan, Smoobu £2,207, min 1)** is bookable on Airbnb at **£1,986.30 room** (0.9; card £2,181.30). Neighbouring nights are £669-690.
  - The price comes from Reyhan's **+300% DSO, min 1** (9 Nov 14:08:13Z). It is under the old max of £2,500, so the max raise did not cause it.
  - In practice this blocks the orphan from selling; at least it does not undersell. No Special offer is visible on it today.
- **29 Dec (£2,855, min 1)** comes from the same +300% DSO (14:08:30Z). Above £2,500 it is possible only because of the **max 2,500 -> 3,500 change** (14:08:54Z). Airbnb was not checked for 29 Dec.
- These are Reyhan's pricing choices. The pricelabs section owns the call; I only report the channel effect.

### 6. Booking.com since the 24 Oct markup cut (+30% -> +15%, 13:38Z; 16.7 days to 07:26Z)

**Change since yesterday:** +1 gross booking (P13 11-15 Dec, already cancelled) and the P12 11-13 Dec cancellation. Method as before: the three duplicate P04 20-23 Nov rows count as one.

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **19** (18) | **71** (67) | **£12,759.50** (£12,048.73) | £15,857 | **0.805** |
| Still confirmed | **13** (14) | **52** (54) | **£8,502.99** (£9,016.80) | £10,984 | **0.774** |
| Net of all cancellations (incl. pre-cut cancellations, 25 n / £5,051.37) | | **+27 n** (+29) | **+£3,451.62** (+£3,965.43) | | |

- Brackets show yesterday's figures. Pace: **1.14 a day gross, 0.78 a day confirmed** (about 0.33 a day before the cut).
- **6 of 19 post-cut bookings are cancelled (32%).** Two of them were cancelled within 4 days (P12, booked 5 Nov) and within 12 hours (P13).
- Last Minute 10% started the same day as the cut, so the rise cannot be credited to the cut alone.

**`rate_leak_next_30` (kpi_pack 10 Nov) with the VAT correction**
- Booking.com nights are multiplied by 1.2. My unadjusted figures reproduce the pack exactly (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10scripts/vat.py`, using `reservations.csv` + `prices.csv` for 10 Nov-9 Dec).

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights | Airbnb nights |
|---|---|---|---|---|
| P11 | -16.3% | **+0.5%** | 8 n | - |
| P04 | -30.9% | -17.1% | 11 n | - |
| P12 | -31.4% | -20.3% | 9 n, -19.6% | 2 n, -23.3% |
| P13 | -44.0% | -38.2% | 10 n, -41.0% | 6 n, -34.3% |

- Airbnb-only flats need no VAT change: P01 -38.4%, P05 -4.1%, P06 -36.3%, P08 -42.5%, P09 -31.3%, P10 -26.4%, P20 -44.7%.
- **P20's figure excludes the new 21-25 Nov booking**: the 10 Nov raw was refreshed at 21:26Z, before the booking. Its 0.65 will widen the gap tomorrow.
- 3 nights with a blank ref in `prices.csv` (-17.5%) are not attributed.
- The gaps include the policy stay discounts and the hidden Airbnb layers.

### 7. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com since cut, confirmed (0.774, VAT incl.) | £77.41 | ~£62-66 (15-20% commission) |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.000 (nights 60 d+) | £100.00 | £84.50 |
| Airbnb live 0.900 (nights 29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.850 (same-day stays) | £85.00 | £71.83 |
| Airbnb live 0.765 (nights up to 28 d) | £76.50 | £64.64 |
| **Airbnb P20 21-25 Nov (0.6502, 15.5%)** | £65.02 | **£54.94** |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest.** Airbnb sells at £76.50-90 inside 60 days, and Booking.com as sold at about £77.
- **Booking.com as sold nets about £62-66, below the Airbnb model (£84.50).**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 8. Fees, min stay, PriceLabs changes since 9 Nov 06:00Z, plan items

- **Cleaning** matches on every card and on the new booking (P20 £150). Airbnb commission is 15.5% of room + cleaning, so £23.25 of P20's commission falls on cleaning.
- **t-cleaning-commission: unchanged.** No new confirmed Booking.com booking. Running list per booking: P12 £22.50, P11 £26.82, P13 £30.00. Corentin's call.
- **Min stay as displayed matches Smoobu:** P20 20 Nov (min 3) and P09 12 Nov (min 2) are not offered; P05 21 Dec (min 1) is offered; P13 5-night stays are allowed; P04 min 3.
- **t-channel-gaps (P11): NOT fixed.** 23 Dec is **£276** (target >= £320, min 2); 3 Jan is **£174** (target >= £204, min 3). Reyhan's +5% on 23-25 Dec (9 Nov 14:06:15Z) did not reach the target. Booking.com visibility is NOT CHECKED (WAF).
  - New: Smoobu "Blocked channel" 162775668 on P11 for 10-14 Nov, created 9 Nov 18:37. Its reason is NOT CHECKED (owner: occupancy).
- **t-p09-1112block: NOT fixed.** 11 Nov is still blocked; 12 Nov is a 1-night orphan (£123, min 2) that Airbnb does not offer. 12 Nov is the day after tomorrow.
- **Push freshness** (`listings.csv` 10 Nov). P20/P13/P11/P05/P06/P14/P04 were pushed 9 Nov 21:22-21:27Z, after Reyhan's edits; P12 at 22:30:30Z; P08 and P09 not since 9 Nov 07:50-08:49Z. Smoobu at 07:26Z equals the 10 Nov raw `price` on every P20, P13 and P12 night checked.
- **Reyhan's 9 Nov PriceLabs edits that touch channel items** (`get_user_logs`):
  - P04 base 220 -> 200 (21:26:45Z) plus DSOs -4% 9-24 Nov, -3% 6-22 Dec, -8% January / February. **This is a base decision for Corentin to confirm.** It also replaces Corentin's 24 Oct -8% on 1-25 Nov.
  - P14 min 500 -> 450 (21:24:24Z). **This conflicts with `special_setups.P14` (the £500 minimum is deliberate); Corentin to confirm.**
  - P05 max 2,500 -> 3,500 and +300% on 21 and 29 Dec (§5).
  - P20 min 3 restored on 13-15 and 20-21 Nov (§1).
  - P13 10-26 Dec -2%, min 3 (copied to the twin).
  - P12 7-14 Dec -5%, min 3.
  - None of these touches the Airbnb layers, 1455, or the P05, P04 and P13 Airbnb discounts.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers, day 12** (0.765 for nights up to 28 d, 0.9 for 29-59 d, 0.85 on same-day stays, plus a further 0.85 on bookings).
   - Today: **P20 21-25 Nov -£196.16** against policy. **Cumulative £2,559.27.**
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and booked-within rules that are not in policy, and keep only visible discounts (`airbnb_visible_discounts`). Then Airbnb > listing 1791529331262420081 > Pricing > Discounts: confirm whether last-minute 15% is still set, since it stacks on top.
2. **Critical: P04 unsynced Airbnb 1455876748739910219, day 11.** Bookable on 10-13 Nov, 18-21 Nov and 6-19 Dec, all open synced inventory. No booking visible on it.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all nights, or snooze/unlist. Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176.
3. **High: Booking.com cancellations.** P12 11-13 Dec (-£513.81) and P13 11-15 Dec (-£710.77; it would have paid 0.730 of list). Confirmed post-cut revenue is now £8,502.99 from 13 bookings. Both dates are reopened on Airbnb, and P12 13 Dec is no longer an orphan.
   - Nothing to change on parity. Cancellation reasons and rate plan (NR vs flexible) are NOT CHECKED. Booking.com extranet > Reservations > 162688853 / 162759785 > rate plan.
4. **Medium: P05 visible 12% early booking** (£139.92 on 9-12 Jan) and **10% long-stay from 5 nights** (£190.70 on 11-16 Jan). Neither is in policy.
   - Confirm, or set: Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird / LOS 5+ (or Airbnb listing 1618929775762183214 > Pricing > Discounts).
5. **Medium: P04 synced weekly 18% vs 15%** (£66.07 on 6-19 Dec).
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
6. **Medium: P13 visible LOS 5+ 10%** (£104.94 / £99.09 on 10-15 Dec). Corentin to confirm (Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+).
7. **Medium: unsellable orphans** P20 20 Nov (£259, min 3), P20 5 Dec (£309, min 3) and P09 12 Nov (£123, min 2).
   - Setting: PriceLabs DSO min stay 1 on those dates (owner: pricelabs section; P04 is excluded by policy).
8. **Medium: P11 23 Dec £276 / 3 Jan £174 vs targets £320 / £204** (t-channel-gaps). Set with a PriceLabs 3064196 DSO.
9. **Question: t-cleaning-commission**, £22.50-30.00 per Booking.com booking. Accept or challenge in Booking.com extranet > Finance.
10. **Conflicts for Corentin (Reyhan's edits vs policy), not new proposals:**
    - P20 21-25 Nov sold over the policy delivery dates 20-22 Nov, and 16-17 Nov is still min 2 vs policy min 3 (t-p20-delivery).
    - P13 twins identical 9 Jan-9 Feb.
    - P14 min 500 -> 450.
    - P04 base 220 -> 200, replacing the 24 Oct -8% override.

Closed today: **a-p05-9nov** (night passed unsold) and **t-p12-13dec-orphan** (cancellation reopened 11-12 Dec).

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:31:41Z; not circumvented). The P13 stack is inferred from paid ÷ list.
2. Airbnb's internal price breakdown for P20 162781746 (0.765 × 0.85), 162719002 and P05 162753757: NOT CHECKED.
3. Smoobu rate between the 21:26:36Z push and the P20 booking at 22:34 was not observed. £982 assumes no later push (`listings.csv` shows none).
4. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). How its calendar is now closed on Smoobu-booked dates is unknown.
5. Reasons for the P12 and P13 cancellations and their rate plans: NOT CHECKED. Also not checked: the P11 10-14 Nov block 162775668 and the P09 11 Nov block 162726554.
6. P20 delivery: whether it moved to 18-19 Nov is unknown (Corentin).
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
8. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT. `kpi_pack` `rate_leak_next_30` for P20 predates the 21-25 Nov booking.
9. Airbnb 29 Dec P05 card (£2,855 night): not searched.
