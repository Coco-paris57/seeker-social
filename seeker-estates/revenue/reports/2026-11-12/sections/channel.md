## Channel parity

Run date D = 2026-11-12 (Thursday, GMT). I read `data/policy.json` first. These items are settled and are not raised again: the 15%/20% stay discounts, Booking.com promotion stacking (size reported only), the Camden Visibility Booster at 18%, P13 = one flat, the P02/P03/P06/P07 blocks, the P14 setup, and the deprioritised P09 Airbnb rules and P04 2 Dec override.

**Sources (all read-only)**
- **Smoobu GET** `/api/rates` for 12 apartments, 12 Nov to 28 Feb, at **2026-11-12T07:19:49Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live12/smoobu_rates12.json`.
- **Smoobu GET** `/api/reservations?modifiedFrom=2026-11-10&showCancellation=true&includePriceElements=true` at 07:19:50Z, 6 bookings. Saved to `.../scratchpad/live12/smoobu_mod12_pe.json` with guest fields and notices dropped. I diffed it against yesterday's `live11/smoobu_mod11_pe.json`.
- **PriceLabs.** `get_user_logs` for listing, group and account from 11 to 12 Nov: 9 listing entries, all Reyhan's DSOs between 15:38Z and 17:16Z on 11 Nov; none at group or account level. There were **no entries on P11**. I also read the raw `data/snapshots/2026-11-12/raw/prices_*.json` files (refresh times) and `kpi_pack.json`.
- **Live Airbnb.** 23 plain public airbnb.co.uk map searches (curl, no workarounds) between 07:21:22Z and 07:23:53Z. Each search has its own JSON (URL, dates, guests, timestamp) in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live12/air/`, plus `log.txt`. Room = card total before taxes minus cleaning (P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129).
- **`data/snapshots/2026-11-12/channel_checks.csv`.** I copied it forward from 11 Nov (918 lines) under `.channel_checks.csv.lock` and appended **28 Airbnb rows**, giving 946 lines. Each row names its URL, stay, guests, timestamp and the Smoobu rates it was compared with.
- **Booking.com live: NOT CHECKED.** One plain search (Camden Town, 8-15 Dec, 2 adults) at 07:24:48Z returned HTTP 202 with an AWS WAF challenge (`live12/bk/search.html`). I did not try to get past it. No new Booking.com screenshot rows exist after the 10 Nov extranet calendar.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row). Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults until Corentin confirms them.**

### 1. P11 Camden Booking.com 8-15 Dec: cancelled (Smoobu 162798595)

| Smoobu field | 11 Nov 07:18Z | 12 Nov 07:19Z |
|---|---|---|
| `type` | modification of booking | **cancellation** |
| `modifiedAt` | 10 Nov 17:26:40 | **11 Nov 18:03:27** (Smoobu time; time zone not stated, probably CET as on 11 Nov, so about 17:03Z) |
| `guest-app-url` | set | cleared |
| price / priceElements | £1,161.86 = room £1,012.86 + cleaning £149; commission £209.13; VAT £168.81 incl. | **unchanged**. There is no "Cancellation Payout" or "Cancellation Host Fee" element (Airbnb cancellations carry them; this one does not). `price-paid` = No, no prepayment, no deposit. |

- **Timing.** The stay was cancelled about 24.6 h after it was created, 27 days before arrival.
- **Who cancelled and why: NOT CHECKED.** Smoobu's API has no cancelled-by or reason field, and I saw none in the record. The Booking.com extranet reservation page (Reservations > 5529197123) would show it. Whether any cancellation fee was charged is also NOT CHECKED. Smoobu shows no payout element.
- **Back on sale in Smoobu: yes.** 8-14 Dec are open, min 3, at **261 / 250 / 274 / 329 / 332 / 231 / 208 = £1,885** (yesterday 232-195 = £1,745, +£140). The darts nights are **13 Dec £231, 14 Dec £208, 15 Dec £215** (min 3). Darts pricing belongs to the pricelabs section. The 24 Oct decision ("leave the darts override") is not re-raised.
- **PriceLabs still shows 8-14 Dec as Booked**, with ADR 120.58 = £1,012.86 / 1.2 / 7 (raw `prices_3064196.json`, refreshed 15:38:27Z, before the cancellation). Its prices on those nights already equal Smoobu. Its occupancy and last-minute logic will not treat the nights as open until the next refresh.
- **Booking.com price now: NOT CHECKED** (WAF). If the same stack applied to a rebooking, here is what it would pay:
  - Last Minute 0-28 d applies, because 8 Dec is now 26 d out.
  - **List at Smoobu × 1.10: £2,077 × 0.5267 = £1,093.96.** At × 1.15 the list is £2,172 and the stay pays £1,144.00.
  - Model (Smoobu × 1.15 × 0.85 weekly) = **£1,842.59**.

**Knock-on effects (Smoobu as truth)**
- **P11 forward occupancy, next 30 (12 Nov-11 Dec).** 12 confirmed nights = **40.0%** (12 Nov and 13 Nov are blocked, not booked).
  - The pack's 0.552 = (12 + 4 cancelled nights, 8-11 Dec) / 29. It counts the cancelled stay because PriceLabs still shows it booked (`rm/checks.py link_bookings`).
- **P11 7-day pickup: 0.** The pack already shows 0. Gross pickup was 1 booking, 7 n, £1,012.86, now cancelled.
- **18 Oct base-rise tally (method owner: occupancy section).** If the stay counted as +7 n / +£1,012.86 yesterday, P11 moves from -4 n / -£1,342.41 to about **-11 n / -£2,355.27**. This is my derivation, not a re-run of the occupancy method.
- **t-cleaning-commission.** The £26.82 on 8-15 Dec (18% of £149) will not be charged if the stay is cancelled; whether Booking.com waived commission on this cancellation is NOT CHECKED. That leaves 3 entries from yesterday's running list, P12 £22.50, P11 £26.82 and P13 £30.00 (£79.32). Whether the P13 £30.00 entry belongs to the P13 11-15 Dec stay, cancelled 9 Nov, is NOT CHECKED. The question to Corentin is unchanged: £22.50-£30.00 per Booking.com booking.

**Booking.com since the 24 Oct markup cut** (24 Oct 13:38Z to 12 Nov 07:19Z, 18.7 days). Source: `reservations.csv` 12 Nov. The three duplicate P04 20-23 Nov rows count as one, and room £ is Smoobu basePrice, VAT incl. Yesterday's figures are in brackets.

| Measure | Bookings | Nights | Room £ | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | 20 (20) | 78 (78) | £13,772.36 (same) | £17,610 | 0.782 (0.782) |
| **Still confirmed** | **13** (14) | **52** (59) | **£8,502.99** (£9,515.85) | £10,984 | **0.774** (0.747) |
| Cancelled | **7** (6), 35% | 26 | £5,269.37 | | |
| Net of all cancellations (incl. pre-cut, 25 n / £5,051.37) | | **+27 n** (+34) | **+£3,451.62** (+£4,464.48) | | |

- Pace: **1.07 a day gross and 0.69 a day confirmed**, against about 0.33 a day before the cut.
- Taking out the 0.5267 stay lifts the confirmed ratio back to 0.774.

**a-p11-bcom-stack / t-bcom-markup-110: any sign of change? None seen, and NOT CHECKED at source.**
- There are no PriceLabs log entries on P11 since 10 Nov, and no new extranet screenshot.
- Booking.com is behind the WAF, so the Last Minute 15% portfolio deal (6 Nov, 0-28 d), Genius dynamic, the fifth 10% and the Smoobu Booking.com markup (× 1.10 seen on 10 Nov vs policy +15%) are all **unverified today**. They stay open for every future Camden booking: any booking now for 15 Dec-6 Feb inside 28 days gets Last Minute 15%.
- The conflict for Corentin to confirm (not a new proposal) still stands: the 15% portfolio deal against policy's 10% (`monitoring.booking_last_minute_24oct`).
- **Correction to yesterday's "P11 refresh not pushed".** Smoobu now equals the PriceLabs 15:38Z refresh on **every open P11 night** (and on every open night of all 12 apartments). Examples: 29 Nov £242, 2 Dec £258, 23 Dec £293, 3 Jan £182. The prices reached Smoobu even though `listings.csv` `last_push` still reads 07:46:49Z. The 20-night / £325 under-price gap is gone.

### 2. Barking (P04): unsynced Airbnb 1455876748739910219, day 13

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 (card; cleaning not split) | Synced 1657859794156786222 (room) | Source (`live12/air/`) |
|---|---|---|---|---|
| 18-21 Nov | open £424, min 3 | **bookable £525.80** (3 × £175.27, same as 10 and 11 Nov) | £324.36 (card £466.36) = 0.765 | p04_1821nov 07:21:35Z |
| 6-19 Dec (13 n) | open £2,384 | **bookable** £2,514.80 - weekly £239.58 = **£2,275.22** (unchanged) | £1,759.39 (§3) | p04_0619dec 07:21:45Z |
| 12-15 Nov | 12-13 open, 14 booked | not shown | not shown (correct, 14 Nov booked) | p04_1215nov 07:21:22Z |

- **Still bookable on day 13: yes** (18-21 Nov and 6-19 Dec). **t-p04-doublebook is NOT fixed.**
- The listing's price has not moved since 10 Nov, which suggests no one is managing it.
- **Conflict (new) for Corentin to confirm, not a new proposal.** Reyhan's DSO on 11 Nov at 17:16:19Z set **11-24 Nov min 2** on Barking. A later DSO restored min 3 on 18-24 Nov only.
  - Smoobu now has **min 2 on 12-17 Nov**, and synced Airbnb sells **12-14 Nov as a 2-night stay** (£378.05 card, 07:21:27Z).
  - Policy `listing_facts.P04.min_stay_rule` says never open for less than 3 nights.

### 3. Live Airbnb: displayed vs expected (hidden layers, day 14)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- weekly 15% (7+ nights);
- P13: last-minute 10% within 14 d, early bird 10% at 60+ d;
- P20: last-minute 15% at 0-14 d.

Gap = displayed room ÷ expected - 1, flagged above 3%. Cleaning is excluded from both. Searches were run 12 Nov.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live12/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 12-14 Nov (0) | 2 | £293 (min 2) | £293.00 | £236.05 (£378.05) = 0.806 | -19.4% | FLAG (+ min-2 conflict) | p04_1214nov_2n 07:21:27Z |
| P04 synced | Airbnb | 18-21 Nov (6) | 2 | £424 | £424.00 | £324.36 (£466.36) = 0.765 | -23.5% | FLAG | p04_1821nov 07:21:35Z |
| P04 synced | Airbnb | 6-19 Dec, 13 n (24) | 2 | £2,384 | £2,026.40 | £1,759.39 = 0.9 × (1 - **0.18** weekly, -£386.21) | -13.2% | FLAG | p04_0619dec 07:21:45Z |
| P04 unsynced 1455 | Airbnb | 18-21 Nov / 6-19 Dec | 2 | open | not for sale | £525.80 / £2,275.22 card | n/a | FLAG (double-sell) | as above |
| P05 | Airbnb | 9-12 Jan (58) | 7 | £1,201 | £1,201.00 | £1,156.24 (visible Early booking -£44.76 = 12% of the 11 Jan night) | -3.7% | FLAG | p05_0912jan 07:23:19Z |
| P05 | Airbnb | 10-13 Jan (59) | 7 | £1,146 | £1,146.00 | £1,056.48 (visible Early booking -£89.52 = 12% of the 11-12 Jan nights) | -7.8% | FLAG | p05_1013jan 07:23:16Z |
| P05 | Airbnb | 11-16 Jan, 5 n (60) | 6 | £1,882 | £1,882.00 | £1,693.80 (visible Long stay -£188.20 = 10.0%) | -10.0% | FLAG | p05_1116jan_5n 07:23:22Z |
| P05 | Airbnb | 21-22 Dec, 1 n (39) | 7 | £2,198 (min 1) | £2,198.00 | £1,978.20 = 0.900 | -10.0% | FLAG | p05_2122dec_1n 07:23:24Z |
| P05 | Airbnb | 29-30 Dec, 1 n (47) | 7 | £2,777 (min 1) | £2,777.00 | £2,499.30 = 0.900 | -10.0% | FLAG | p05_2930dec_1n 07:23:27Z |
| P06 | Airbnb | 15-17 Nov (3) | 3 | £490 | £490.00 | £374.84 (£503.84) = 0.765 | -23.5% | FLAG | p06_1517nov 07:23:49Z |
| P09 | Airbnb | 12-13 Nov, 1 n (0) | 2 | £117 open, min 2 | not sellable | not offered | - | orphan passes unsold tonight | p09_1213nov_1n 07:23:53Z |
| P12 | Airbnb | 17-20 Nov (5) | 2 | £757 | £757.00 | £579.09 (£729.09) = 0.765 | -23.5% | FLAG | p12_1720nov 07:23:32Z |
| P12 | Airbnb | 7-10 Dec (25) | 2 | £816 | £816.00 | £624.23 (£774.23) = 0.765 | -23.5% | FLAG | p12_0710dec 07:23:37Z |
| P13 3090701 / 3064856 | Airbnb | 17-18 Nov, 1 n (5) | 4 | £216 / £228 | £194.40 / £205.20 (LM10) | £165.24 / £174.42 = 0.765 | -15.0% | FLAG | p13_1718nov_1n 07:23:04Z |
| P13 3090701 / 3064856 | Airbnb | 27-28 Nov, 1 n (15) | 4 | £245 / £322 | £245 / £322 | £187.42 / £246.33 = 0.765 | -23.5% | FLAG | p13_2728nov_1n 07:23:06Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Dec (28) | 4 | £644 / £758 | same | £553.27 / £647.64 (0.765 on 10 Dec, 0.9 on 11-12 Dec) | -14.1% / -14.6% | FLAG | p13_1013dec 07:22:54Z |
| P13 3090701 / 3064856 | Airbnb | 10-15 Dec, 5 n (28) | 4 | £1,064 / £1,155 | same | £861.84 / £935.55 = 0.9 × visible Long stay 10% (-£95.76 / -£103.95) | -19.0% | FLAG | p13_1015dec_5n 07:22:51Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Jan (59) | 4 | £536 / £527 | £498.80 / £489.80 (EB10 on 11-12 Jan) | £498.80 / £489.80 (visible Early booking -£37.20) | 0.0% | ok | p13_1013jan 07:23:01Z |
| P20 | Airbnb | 13-16 Nov (1) | 2 | £813 | £691.05 (LM15) | £621.94 (£771.94) = 0.765 | -10.0% | FLAG | p20_1316nov 07:22:36Z |
| P20 | Airbnb | 20-25 Nov (8) | 2 | £1,219 | £1,036.15 (LM15) | £932.53 (£1,082.53) = 0.765 | -10.0% | FLAG | p20_2025nov 07:22:18Z |
| P20 | Airbnb | 20-23 Nov (8) | 2 | £713 | £606.05 | £545.44 (£695.44) = 0.765 | -10.0% | FLAG | p20_2023nov 07:22:31Z |
| P20 | Airbnb | 21-24 Nov (9) | 2 | £725 | £616.25 | £554.62 (£704.62) = 0.765 | -10.0% | FLAG | p20_2124nov 07:22:26Z |
| P20 | Airbnb | 14-17 Dec (32) | 2 | £817 | £817.00 | £735.30 (£885.30) = 0.900 | -10.0% | FLAG | p20_1417dec 07:22:46Z |
| P11 | Booking.com | 8-15 Dec, now open | 2 | £1,885 | £1,842.59 (× 1.15 × 0.85 weekly) | NOT CHECKED: AWS WAF 07:24:48Z | - | - | live12/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**Hidden layers: unchanged on day 14. a-airbnb-rules is NOT fixed.**
- **0.765** on nights up to 28 d out. It is applied per night: P13 10 Dec at 28 d is 0.765, and 11-12 Dec are 0.9.
- **0.900** on nights 29-59 d out.
- **1.000** at about 58 d and beyond (P05 9-12 Jan; P13 10 Jan).
- The 2-night same-day P04 stay showed 0.806, which does not match yesterday's 0.850 same-day factor. NOT CHECKED: the cleaning on a 2-night Barking stay may differ from £142.
- **Running cost stays £2,363.11** (confirmed stays only). There was no new Airbnb booking overnight (Dispatcher diff: one change, the P11 cancellation).
- On the newly open P20 20-25 Nov run, the layer is worth **£103.62** against policy if it sells today.

**Standing Airbnb items**

| Item | Status 12 Nov | Evidence |
|---|---|---|
| a-p05-earlybird: P05 12% early booking | **Still on, not fixed** | -£89.52 on 10-13 Jan; -£44.76 on 9-12 Jan, applied per night at 60 d+ |
| t-p05-los: P05 10% long stay from 5 n | **Still on, not fixed** | -£188.20 on 11-16 Jan; at 60 d it replaces early booking rather than stacking with it |
| t-p04-weekly: P04 synced weekly 18% vs 15% | **Not fixed** | -£386.21 = 18.0% of £2,145.60; policy 15% = £321.84, so **£64.37 over policy** on 6-19 Dec |
| t-p13-los5: P13 visible LOS 5+ 10% | **Still on**, both twins | -£95.76 / -£103.95 on 10-15 Dec. It is not in the 21 Oct changed rules; Corentin to confirm |
| t-p13-special-offer: 3090701 "Special offer" | **Not seen today** on any of 5 P13 searches (17-18 Nov, 27-28 Nov, 10-13 Dec, 10-15 Dec, 10-13 Jan). The 11-13 Nov dates it sat on have passed; 12-13 Nov cannot be searched (13 Nov booked, min 2). | Removed or simply date-bound: NOT CHECKED. Who created it: NOT CHECKED. |
| t-p13-twins | **Not fixed** | Smoobu: **21 of 29 open January nights (11-31 Jan) and all 28 open February nights identical**. November and December all differ. 10 Jan now differs (£164 / £155). Reyhan's 11 Nov 15:38Z DSO 10-26 Dec -5% min 3 was copied from parent to child, so it keeps the December gap. Conflict with `twin_listings` for Corentin. |
| a-p05-dec | P05 21 Dec £2,198 and 29 Dec £2,777 still bookable at min 1 (£1,978.20 / £2,499.30 room) | Pricing call belongs to the pricelabs section |

### 4. P20 20-24 Nov after the PriceLabs re-sync (t-p20-delivery)

- **PriceLabs now shows the cancellation.** In the raw `prices_3547481.json` refresh at 11 Nov 17:16:22Z, 20-24 Nov are open. 20 Nov `unbookable` went from 1 to 0, so the orphan is gone.
  - Prices fell: 21 Nov £301 -> £251, 22 Nov £247 -> £220, 23 Nov £294 -> £254, 24 Nov £279 -> £252. 20 Nov rose from £234 to £242.
  - Smoobu equals PriceLabs on every night.
- **Airbnb, as a result:** 20-25 Nov **£932.53 room** (yesterday £1,036.56, -£104.03); 21-24 Nov **£554.62** (yesterday £644.12, -£89.50). Both are still 0.765 of Smoobu.
- **Reyhan's DSO on 11 Nov at 17:15:58Z set 20-21 Nov -5%, min 3.** Pricing these dates means they are being treated as for sale.
  - Policy `listing_facts.P20.block_20_21_nov` says 20-22 Nov is the delivery block. Smoobu blocks only 18-19 Nov.
  - **t-p20-delivery is still a conflict for Corentin to confirm**, now sharper. Either the delivery moved to 18-19 Nov (then update policy), or 20-22 Nov must be blocked in Smoobu before someone books it.
- **Min stay is also still a conflict:** 16-17 and 22-24 Nov are min 2 in Smoobu, against policy min 3 until 30 Nov. Reyhan's new 13-15 Nov DSO is min 3.
- **t-p20-5dec-orphan: NOT fixed.** 5 Dec is £313, min 3, PriceLabs `unbookable` 1.

### 5. Net to owner per £100 base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed) | £115.00 | £97.75 |
| Booking.com since cut, still confirmed (0.774) | £77.41 | about £61.93-65.80 (20-15% commission) |
| Booking.com P11 stack (0.578 of Smoobu at 18%; the stay is cancelled, but the stack still applies) | £57.78 | £47.38 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.000 (nights about 58 d+) | £100.00 | £84.50 |
| Airbnb live 0.900 (nights 29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.765 (nights up to 28 d) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` list is empty, but observed prices break both rules:
  - **Direct is not the cheapest.** Airbnb inside 60 d (£76.50-90) and Booking.com as sold (£57.78-77.41) are both below the £90 direct model.
  - **Booking.com as sold nets about £47-66, below Airbnb's £64.64-84.50.**
- Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF, and there is no Vrbo or direct URL.

**`rate_leak_next_30` (kpi_pack 12 Nov), corrected for VAT and with Smoobu as truth.** Booking.com ADR is multiplied by 1.2, and nights not in a confirmed Smoobu reservation are dropped. The unadjusted figures reproduce the pack (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live12scripts/vat.py`, using `reservations.csv` + `prices.csv`).

| Flat | Pack gap | Corrected gap | Notes |
|---|---|---|---|
| P11 | -34.5% (11 n) | **-9.5% (8 n)** | The pack counts 9-11 Dec of the cancelled stay at £120.58 ex VAT (-57.6% on 3 n) |
| P04 | -23.6% (11 n) | **-8.3%** | all Booking.com |
| P12 | -26.1% (10 n) | **-14.3%** | Booking.com -10.4% (8 n); Airbnb -29.0% (2 n) |
| P13 | -42.5% (16 n) | **-36.6%** | Booking.com -40.8% (10 n); Airbnb -30.4% (6 n) |
| P20 | -47.1% (14 n) | -47.1% | Airbnb only; the cancelled stay is no longer counted |

- The Airbnb-only flats need no correction: P01 -38.7%, P05 -6.8%, P06 -39.6%, P08 -48.2%, P09 -27.8%, P10 -24.6%.
- 3 nights with a blank ref (3090701 child, 14-16 Nov) at -23.7% are not attributed.
- These gaps include the policy stay discounts and the hidden layers.

### 6. Fees, min stay, sync

- **Cleaning** on every Airbnb card fits the fees on record. The exception is the P04 2-night card, where the split is NOT CHECKED (§3).
- **Min stay as displayed matches Smoobu:**
  - P04 12-14 Nov at min 2 is offered (conflict, §2);
  - P09 12 Nov at min 2 is not offered;
  - P05 21 and 29 Dec at min 1 are offered;
  - P13 17 and 27 Nov at min 1 are offered.
- **Sync.** Smoobu = PriceLabs on every open night of all 12 apartments at 07:19Z. The one stale point is **PriceLabs availability on P11 8-14 Dec** (still Booked). Setting: PriceLabs > 3064196 > Sync Now / refresh (pricelabs section; I can only read).
- **t-channel-gaps (P11): NOT fixed, but closer.**
  - **23 Dec £293** (was £274), against a target of at least £320, min 2.
  - **3 Jan £182** (was £174), against a target of at least £204, min 3.
  - Booking.com visibility on those dates is NOT CHECKED (WAF). Booking.com CTR 0.81% vs 1.70% is from the 21 Oct screenshot only; nothing newer exists.
- **t-p09-1112block:** 12 Nov is tonight at £117, min 2, and Airbnb does not offer it as 1 night. **It passes unsold.**

### Issues ordered by £ impact

1. **Critical: the Booking.com promotion stack on Camden still applies to every future booking** (a-p11-bcom-stack). 8-15 Dec is back on sale.
   - If it rebooks under the same stack it pays about **£1,093.96 against the £1,842.59 model**.
   - Settings, all unchanged and NOT CHECKED today:
     - Booking.com extranet > Promotions > Last Minute portfolio deal (6 Nov) > 10% (policy 24 Oct; **conflict for Corentin**), and untick the Weekly/Monthly plans.
     - Promotions > Mobile rate > untick Weekly/Monthly.
     - Rates > Weekly plan > Occupancy pricing (2 guests).
     - Genius > dynamic = No.
2. **Critical: hidden Airbnb layers, day 14** (0.765 up to 28 d, 0.9 at 29-59 d). The running cost is **£2,363.11**, unchanged. Every synced flat shows them again today, and they are worth £103.62 on the reopened P20 20-25 Nov alone.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that are not in policy, and keep only visible discounts.
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 13.** It is still bookable on 18-21 Nov (£525.80) and 6-19 Dec (£2,275.22).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all nights, or unlist. Then map it to Smoobu apartment 3562176.
4. **High: t-bcom-markup-110**, Booking.com list = Smoobu × 1.10 vs +15%. There is no new evidence either way. On the reopened 8-15 Dec it is worth +£50.04 paid under the same stack (£1,144.00 vs £1,093.96).
   - Setting: Smoobu > Channel Manager > Booking.com > price settings. Confirm +15%, then do a full resync.
5. **High: t-p20-delivery.** 20-22 Nov (the policy delivery block) is open, bookable on Airbnb at £932.53 for 20-25 Nov, and was priced by Reyhan on 11 Nov.
   - **Corentin to confirm:** either block 20-22 Nov in Smoobu, or update policy to an 18-19 Nov delivery. The P20 min 2 on 16-17 and 22-24 Nov vs policy min 3 is part of the same conflict.
6. **Medium: P05 visible 12% early booking and 10% long stay** (-£89.52 on 10-13 Jan; -£188.20 on 11-16 Jan).
   - Setting: Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird / LOS 5+, or Airbnb listing 1618929775762183214 > Pricing > Discounts.
7. **Medium: P04 synced weekly 18% vs 15%** (£64.37 over policy on 6-19 Dec).
   - Setting: Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.
8. **Medium: P13 LOS 5+ 10%** on both twins (£95.76 / £103.95 on 10-15 Dec) and **twins identical** on 11 Jan-28 Feb (49 nights). Both are conflicts for Corentin.
   - Settings: Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+; PriceLabs DSO on 3090701 for 11 Jan-28 Feb (pricelabs section).
   - The P13 Special offer was not seen today (status unresolved).
9. **Medium: the P04 min-2 conflict** (Reyhan DSO 11-17 Nov min 2 vs policy "never below 3"). It is live on Airbnb for 12-14 Nov.
   - **Corentin to confirm.** If policy stands: PriceLabs > Barking > DSO 11-17 Nov > min stay 3.
10. **Question: t-cleaning-commission.** The 8-15 Dec £26.82 drops out on cancellation, leaving 3 entries (£22.50-£30.00 per booking) to accept or challenge (Booking.com extranet > Finance).

Closed or changed today:
- The P11 "refresh not pushed" price gap is closed: Smoobu = PriceLabs 15:38Z.
- The P20 cancellation is now in PriceLabs.
- P09 12 Nov passed unsold.

Data gaps:
1. Booking.com guest view, promotions, and the 8-15 Dec resale price: NOT CHECKED (AWS WAF 07:24:48Z; not circumvented). No extranet screenshot exists after 10 Nov.
2. Who cancelled P11 8-15 Dec, why, and whether any fee or commission was charged: NOT CHECKED. Smoobu has no such field; see extranet reservation 5529197123.
3. The Smoobu Booking.com markup setting (× 1.10 vs × 1.15), the source of the fifth 10%, and the scope and creator of the 15% Last Minute portfolio deal: NOT CHECKED.
4. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). Also not checked: the cleaning on a 2-night P04 synced stay (0.806 factor).
5. The P13 3090701 Special offer (removed or date-bound, and who set it): NOT CHECKED.
6. The P20 delivery date (18-19 vs 20-22 Nov): Corentin.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
8. The 18 Oct base-rise tally for P11 is my derivation (-11 n / -£2,355.27). The occupancy section owns the method.
