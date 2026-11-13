## Channel parity

Run date D = 2026-11-13 (Friday, GMT). I read `data/policy.json` first. These items are settled and are not raised again: the 15%/20% stay discounts, Booking.com promotion stacking (size reported only), the Camden Visibility Booster at 18%, P13 = one flat, the P02/P03/P06/P07 blocks, the P14 setup, the deprioritised P09 Airbnb rules and P04 2 Dec override, and the new **Booking.com +10% markup (t-bcom-markup-110, done)**.

**Sources (all read-only)**
- **Smoobu GET** `/api/rates` for 12 apartments, 13 Nov to 28 Feb, at **2026-11-13T07:21:10Z** (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live13/smoobu_rates13.json`). Diffed against yesterday's `live12/smoobu_rates12.json` (07:19:49Z).
- **Smoobu GET** `/api/reservations?modifiedFrom=2026-11-11&showCancellation=true&includePriceElements=true` at 07:21:10Z, 6 records, guest fields dropped (`.../live13/smoobu_mod13_pe.json`). No new booking and no cancellation; the only changes vs yesterday are `modifiedAt` stamps with unchanged prices. This agrees with the Dispatcher's full-row diff.
- **PriceLabs.** `get_user_logs` 12-13 Nov: **0 entries** at listing, group and account level (the same filter returns the 9 Reyhan DSOs of 11 Nov, so it works). One live `get_listing_prices` on P20 3547481, 13-30 Nov (last refreshed 12 Nov 09:23:20Z). Note: the group and account log calls went out in parallel by mistake; both returned 200.
- **Live Airbnb.** 20 plain public airbnb.co.uk map searches (curl, no workarounds) between 07:22:56Z and 07:24:49Z. Each has its own JSON (URL, dates, guests, timestamp) in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live13/air/`, plus `log.txt`. Room = card total before taxes minus cleaning (P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129).
- **`data/snapshots/2026-11-13/channel_checks.csv`.** Copied forward from 12 Nov (985 lines) under `.channel_checks.csv.lock`; **26 Airbnb rows appended** (1,011 lines). Each row names URL, stay, guests, timestamp and the Smoobu rates compared.
- **Booking.com live: NOT CHECKED.** One plain search (Camden Town, 8-15 Dec, 2 adults) at 07:25:43Z returned HTTP 202 with an AWS WAF challenge (`live13/bk/search.html`). Not circumvented.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +10% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) remain unconfirmed defaults until Corentin confirms them.**

### 1. Booking.com after the +10% markup (12 Nov)

**Can Smoobu's API show that Booking.com gets Smoobu x 1.10? No. NOT CHECKED.**
- `GET /api/apartments/3064196` has no channel or markup field (only `price.minimal`/`maximal`, both null).
- `GET /api/rates` returns one price per night. Adding `channel_id`/`channelId` returns identical numbers (P05 20-21 Nov 551/565 either way). `/api/channels` and `/api/apartments/{id}/channels` are 404.
- The only API route is indirect: a new Booking.com reservation's priceElements against the Smoobu rate at booking time. **There has been no Booking.com booking since 10 Nov** (`reservations.csv`, latest `booked_on` 2026-11-10), so there is nothing to test yet. The Abbey Rd 467 -> 514 in the Smoobu UI (Corentin, 12 Nov) remains the only evidence. Verifying needs the Booking.com extranet calendar (Rates & availability) or a guest page, and both are behind the WAF from here.

**Camden stack (a-p11-bcom-stack) at +10%, per £100 Smoobu base** (stack = Weekly 15% x Last Minute 15% x Mobile 10% x fifth 10% x Genius 10% = 0.5267 of list; 18% booster commission; VAT-inclusive basis as in `channel_economics`):

| Basis | Guest pays (room) | Net at 18% | Net at 15% |
|---|---|---|---|
| Model: list x1.10, no promotions | £110.00 | £90.20 | £93.50 |
| Model weekly (x1.10 x 0.85) | £93.50 | £76.67 | £79.47 |
| **Weekly stay, full stack** | **£57.94** | **£47.51** | £49.25 |
| Weekly, Last Minute at policy 10% | £61.35 | £50.30 | £52.14 |
| Under 7 nights, full stack (LM x Mobile x fifth x Genius) | £68.16 | £55.89 | £57.94 |
| Under 7 nights, non-Genius guest | £75.73 | £62.10 | £64.37 |
| For comparison: same weekly stack at the old x1.15 | £60.57 | £49.67 | - |

- Moving from x1.15 to x1.10 costs the full-stack weekly stay **£2.63 per £100 base** (£60.57 -> £57.94).
- **P11 8-14 Dec, reopened and now synced.** PriceLabs (`prices.csv` 13 Nov, available = True) and Smoobu agree after the 13 Nov 06:35Z refresh and push. Smoobu is **202/197/220/263/266/186/201 = £1,535** (yesterday £1,885, -£350). The Booking.com list at ceil(x1.10) would be £1,693.
  - A rebooking under the full stack would pay **£891.71**, against the **£1,439.05** model (list x 0.85 weekly). Last Minute at 10%: £944.16 (+£52.45). Without Genius and the fifth 10%: £1,100.87 (+£209.16).
  - Booking.com's actual price for those dates: NOT CHECKED (WAF).
- Promotion status today: NOT CHECKED (no extranet screenshot after 10 Nov; WAF). The conflict for Corentin is unchanged: the Last Minute 15% portfolio deal vs policy 10% (`monitoring.booking_last_minute_24oct`). The markup itself is settled.

**Booking.com since the 24 Oct markup cut** (24 Oct 13:38Z to 13 Nov 07:21Z, 19.7 days; `reservations.csv` 13 Nov; P04 20-23 Nov triplicate counted once; room £ = Smoobu basePrice, VAT incl.):

| Measure | Bookings | Nights | Room £ |
|---|---|---|---|
| Gross since cut | 20 (unchanged) | 78 | £13,772.36 |
| Still confirmed | 13 (unchanged) | 52 | £8,502.99 |
| Cancelled | 7 (35%) | 26 | £5,269.37 |
| **Since +10% (12 Nov)** | **0** | 0 | £0 |

- Pace: 1.01 a day gross and 0.66 a day confirmed (yesterday 1.07 / 0.69), against about 0.33 a day before the cut. Paid/PL-at-booking on confirmed stays: 0.774 (12 Nov method; no new data).
- **No Booking.com booking has been made for 2.6 days** (last 10 Nov, P11 8-15 Dec, since cancelled). One day at +10% is too short to judge.

### 2. Barking (P04): unsynced Airbnb 1455876748739910219, day 14

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 (card; cleaning not split) | Synced 1657859794156786222 (room) | Source (`live13/air/`) |
|---|---|---|---|---|
| 18-21 Nov | open £405, min 3 | **bookable £525.80** (3 x £175.27, unchanged since 10 Nov) | £309.82 (card £451.82) = 0.765 | p04_1821nov 07:22:56Z |
| 6-19 Dec (13 n) | open £2,382 | **bookable** £2,514.80 - weekly £239.58 = **£2,275.22** (unchanged) | £1,757.92 | p04_0619dec 07:23:06Z |
| 13-14 Nov (1 n) | open, min 2 | not shown | not shown (correct) | p04_1314nov_1n 07:23:11Z |

- **Still bookable on day 14. t-p04-doublebook is NOT fixed.** Its price has not moved since 10 Nov.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all open nights (or unlist); then map it to Smoobu 3562176.

### 3. Live Airbnb: displayed vs expected (hidden layers, day 15)

Expected = Smoobu x (1 + 0%) x only the discounts policy recognises: weekly 15% (7+ n); P13 last-minute 10% within 14 d and early bird 10% at 60+ d; P20 last-minute 15% at 0-14 d. Gap = displayed room / expected - 1, flagged above 3%. Cleaning excluded from both.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live13/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 18-21 Nov (5) | 2 | £405 | £405.00 | £309.82 (£451.82) = 0.765 | -23.5% | FLAG | p04_1821nov 07:22:56Z |
| P04 synced | Airbnb | 6-19 Dec, 13 n (23) | 2 | £2,382 | £2,024.70 | £1,757.92 = 0.9 x (1 - **0.18** weekly, -£385.88) | -13.2% | FLAG | p04_0619dec 07:23:06Z |
| P04 unsynced 1455 | Airbnb | 18-21 Nov / 6-19 Dec | 2 | open | not for sale | £525.80 / £2,275.22 card | n/a | FLAG (double-sell) | as above |
| P05 | Airbnb | 10-13 Jan (58) | 7 | £1,139 | £1,139.00 | £1,093.88 (visible Early booking -£45.12 = 12% of 12 Jan) | -4.0% | FLAG | p05_1013jan 07:24:23Z |
| P05 | Airbnb | 12-15 Jan (60) | 7 | £1,127 | £1,127.00 | £991.76 (visible Early booking -£135.24 = 12.0%) | -12.0% | FLAG | p05_1215jan 07:24:21Z |
| P05 | Airbnb | 12-17 Jan, 5 n (60) | 6 | £1,909 | £1,909.00 | £1,718.10 (visible Long stay -£190.90 = 10.0%) | -10.0% | FLAG | p05_1217jan_5n 07:24:26Z |
| P06 | Airbnb | 15-17 Nov (2) | 3 | £444 | £444.00 | £339.66 (£468.66) = 0.765 | -23.5% | FLAG | p06_1517nov 07:24:49Z |
| P12 | Airbnb | 17-20 Nov (4) | 2 | £766 | £766.00 | £585.99 (£735.99) = 0.765 | -23.5% | FLAG | p12_1720nov 07:24:31Z |
| P12 | Airbnb | 7-10 Dec (24) | 2 | £812 | £812.00 | £621.18 (£771.18) = 0.765 | -23.5% | FLAG | p12_0710dec 07:24:37Z |
| P13 3090701 / 3064856 | Airbnb | 17-18 Nov, 1 n (4) | 4 | £216 / £228 | £194.40 / £205.20 (LM10) | £165.24 / £174.42 = 0.765 | -15.0% | FLAG | p13_1718nov_1n 07:24:00Z |
| P13 3090701 / 3064856 | Airbnb | 27-28 Nov, 1 n (14) | 4 | £272 / £287 | £244.80 / £258.30 (LM10) | £208.08 / £219.55 = 0.765 | -15.0% | FLAG | p13_2728nov_1n 07:24:03Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Dec (27) | 4 | £612 / £803 | same | £496.52 / £651.55 (0.765 on 10-11 Dec, 0.9 on 12 Dec) | -18.9% / -18.9% | FLAG | p13_1013dec 07:24:06Z |
| P13 3090701 / 3064856 | Airbnb | 10-15 Dec, 5 n (27) | 4 | £1,029 / £1,197 | same | £833.49 / £969.57 = 0.9 x visible Long stay 10% (-£92.61 / -£107.73) | -19.0% | FLAG | p13_1015dec_5n 07:24:11Z |
| P13 3090701 / 3064856 | Airbnb | 12-15 Jan (60) | 4 | £560 / £560 | £504.00 / £504.00 (EB10) | £504.00 / £504.00 (visible Early booking -£56.00) | 0.0% | ok (but twins identical, card £654.00 both) | p13_1215jan 07:24:18Z |
| P20 | Airbnb | 14-17 Nov (1) | 2 | £702 | £596.70 (LM15) | £537.03 (£687.03) = 0.765 | -10.0% | FLAG | p20_1417nov 07:23:34Z |
| P20 | Airbnb | 15-17 Nov, 2 n (2) | 2 | £432 (min 2) | £367.20 | £330.48 (£480.48) = 0.765 | -10.0% | FLAG (+ min-2 conflict) | p20_1517nov 07:23:39Z |
| P20 | Airbnb | 20-25 Nov (7) | 2 | £1,190 | £1,011.50 | £910.34 (£1,060.34) = 0.765 | -10.0% | FLAG | p20_2025nov 07:23:19Z |
| P20 | Airbnb | 20-23 Nov (7) | 2 | £698 | £593.30 | £533.97 (£683.97) = 0.765 | -10.0% | FLAG | p20_2023nov 07:23:29Z |
| P20 | Airbnb | 21-24 Nov (8) | 2 | £704 | £598.40 | £538.55 (£688.55) = 0.765 | -10.0% | FLAG | p20_2124nov 07:23:24Z |
| P20 | Airbnb | 14-17 Dec (31) | 2 | £830 | £830.00 | £747.00 (£897.00) = 0.900 | -10.0% | FLAG | p20_1417dec 07:23:49Z |
| P11 | Booking.com | 8-15 Dec, open | 2 | £1,535 | £1,439.05 (ceil x1.10 x 0.85 weekly) | NOT CHECKED: AWS WAF 07:25:43Z | - | - | live13/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**a-airbnb-rules: unchanged on day 15, NOT fixed.**
- **0.765 (= 0.9 x 0.85)** on nights up to 28 d out, applied per night (P13 10-11 Dec at 27-28 d are 0.765, 12 Dec at 29 d is 0.9). **0.900** on nights 29-59 d out. **1.000** from 60 d (P05 and P13 12 Jan gross = Smoobu exactly; only the visible discount applies).
- On a 5-night P13 stay at 27 d the whole stay is 0.9 plus the visible LOS 10% (the 0.85 does not appear), the same pattern as 12 Nov.
- **Running cost stays £2,363.11** (confirmed stays only; no new Airbnb booking overnight).
- If P20 20-25 Nov sells today, the layer costs **£101.16** vs policy (£1,011.50 - £910.34).
- Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list; keep the visible discounts.

**Standing Airbnb items (all unchanged)**

| Item | Status 13 Nov | Evidence |
|---|---|---|
| a-p05-earlybird: P05 12% early booking | Still on | -£135.24 on 12-15 Jan (60 d); -£45.12 on 10-13 Jan (only the 12 Jan night is at 60 d) |
| t-p05-los: P05 10% long stay from 5 n | Still on | -£190.90 on 12-17 Jan; at 60 d it replaces early booking instead of stacking |
| t-p04-weekly: P04 synced weekly 18% vs 15% | Not fixed | -£385.88 = 18.0% of £2,143.80; at 15% = £321.57, so **£64.31 over policy** on 6-19 Dec |
| t-p13-los5: P13 LOS 5+ 10% | Still on, both twins | -£92.61 / -£107.73 on 10-15 Dec. Not in the 21 Oct changed rules; Corentin to confirm |
| t-p13-twins | Not fixed | Smoobu: **48 open nights identical** (20 in January from 12 Jan, all 28 in February; yesterday 49). Airbnb shows the twins at the same £654.00 card on 12-15 Jan. Conflict with `twin_listings` for Corentin; fix is a PriceLabs DSO on 3090701 (pricelabs section). |

### 4. P04 2-night sale and P20 dates

**t-p04-min2-nov: lapsed tonight, nothing sold.**
- 12 Nov passed unsold (no new booking, Dispatcher and Smoobu).
- 13 Nov is open at £130 min 2, but 14-17 Nov is booked (Booking.com, 14-18 Nov), so no 2-night stay fits. Airbnb does not offer 13-14 Nov (07:23:11Z).
- 18-24 Nov are min 3. No P04 night under min 3 can be sold from tomorrow. The conflict with `min_stay_rule` ends with no sale. Nothing to change unless Reyhan repeats the min 2.

**t-p20-delivery: still a conflict for Corentin, unchanged.**
- Smoobu blocks only 18-19 Nov. 20 Nov £241 and 21 Nov £242 (min 3) are open, against policy's 20-22 Nov delivery block.
- Airbnb sells 20-25 Nov at **£910.34 room** (yesterday £932.53), 20-23 Nov at £533.97 and 21-24 Nov at £538.55.
- **Smoobu now equals PriceLabs' `price` on 20-24 Nov (241/242/215/247/245) but not its `user_price` (242/251/220/254/252)** (live `get_listing_prices`, refreshed 12 Nov 09:23:20Z). The cause is NOT CHECKED (pricelabs section). The £224.50/night figure in the brief is not today's: 20-24 Nov averages **£238.00** in Smoobu.
- **Min stay conflict widened:** Smoobu has **15 Nov at min 2** (yesterday min 3; PriceLabs live still says min 3), as well as 16-17 and 22-24 Nov at min 2. Policy says min 3 until 30 Nov. Airbnb sells 15-17 Nov as a 2-night stay (£330.48 room, 07:23:39Z).
- t-p20-5dec-orphan: 5 Dec £313, min 3, between bookings; still unsellable.

**New, for the pricelabs section: Smoobu sits below PriceLabs on near-term nights, and channels follow Smoobu.** No PriceLabs log entry and no P20/P04 refresh since 12 Nov 09:23Z, yet Smoobu changed overnight. P20 13-17 Nov is 250/270/222/210/222 against PriceLabs user_price 276/291/246/237/245 (-£121 over 5 nights). The same pattern shows on P04 18-20 Nov (130/135/140 vs 147/150/155), P12 17-19 Nov and P06 15-17 Nov (`prices.csv`). The Airbnb cards match Smoobu (P04 £451.82 = (405 x 0.765) + 142; P20 £687.03 = 702 x 0.765 + 150), so guests see the lower number. Cause NOT CHECKED. It could be a Smoobu-side edit; the timing matches Corentin's 12 Nov work on Smoobu pricing, but that is not shown.

### 5. Net to owner per £100 base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+10%, confirmed 12 Nov) | £110.00 | £93.50 (15%); £90.20 at Camden 18% |
| Booking.com Camden weekly full stack | £57.94 | £47.51 (18%) |
| Booking.com Camden under 7 n full stack | £68.16 | £55.89 (18%) |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.000 (60 d+) | £100.00 | £84.50 |
| Airbnb live 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.765 (up to 28 d) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty, and the model ordering holds (direct £90 < Airbnb £100 < Booking £110; Booking nets £93.50 against Airbnb's £84.50).
- **Observed prices break both rules.** Airbnb inside 60 d (£76.50-90) and the Camden Booking stack (£57.94-68.16) are below the £90 direct model. The Camden stack nets £47.51-55.89, under Airbnb's £64.64-84.50.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 13 Nov), corrected for VAT** (Booking.com ADR x 1.2; nights outside confirmed Smoobu stays dropped). The unadjusted run reproduces the pack exactly (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live13scripts/vat.py`). Note: `rate_leak` compares to the PriceLabs price and does not use the x1.10 markup; only `channel_economics` does.

| Flat | Pack gap | Corrected gap | Notes |
|---|---|---|---|
| P11 | -18.2% (8 n) | **-1.8%** | all Booking.com; the cancelled 8-15 Dec stay is no longer counted |
| P04 | -24.3% (11 n) | **-9.2%** | all Booking.com (14-18 Nov, Monthly-plan stack) |
| P12 | -24.9% (10 n) | **-12.9%** | Booking.com -9.8% (8 n); Airbnb -25.1% (2 n) |
| P13 | -42.6% (16 n) | **-36.7%** | Booking.com -40.9% (10 n); Airbnb -30.5% (6 n) |
| P20 | -46.6% (15 n) | -46.6% | Airbnb only |

- Airbnb-only flats need no correction: P01 -38.6%, P05 -8.5%, P06 -39.1%, P09 -26.3%, P10 -24.5%.
- 3 nights with a blank ref (3090701 child) at -23.7% are not attributed.
- The VAT effect here is 10-16 points, a little above the 8-14 in the brief.

### 6. Fees, min stay, sync

- **Cleaning** on every synced Airbnb card fits the fees on record. On the unsynced P04 1455 listing cleaning is not split (NOT CHECKED).
- **Min stay as displayed matches Smoobu:** P04 13 Nov (min 2, blocked by 14 Nov) is not offered; P20 15-17 Nov at min 2 is offered (conflict, §4); P13 17 and 27 Nov at min 1 are offered.
- **Sync:** P11 8-14 Dec now open in PriceLabs and Smoobu (synced; was "Booked" in PriceLabs yesterday). On P20/P04/P12/P06, Smoobu is below PriceLabs on near-term nights (§4).
- **t-channel-gaps (P11): NOT fixed, moving away.** After today's P11 refresh: **23 Dec £276** (was £293; target at least £320, min 2) and **3 Jan £172** (was £182; target at least £204, min 3). Booking.com visibility NOT CHECKED (WAF). The 0.81% vs 1.70% CTR is from 21 Oct only.
- Darts 13-16 Dec in Smoobu: 186/201/209/216, average £203 (17 Dec £233). The pricing call belongs to the pricelabs section, under the 24 Oct "leave the darts override" decision.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers, day 15 (a-airbnb-rules).** 0.765 up to 28 d and 0.9 at 29-59 d on every synced flat. Running cost £2,363.11, plus £101.16 on P20 20-25 Nov if it sells.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list.
2. **Critical: Camden Booking.com stack (a-p11-bcom-stack), now on x1.10.** A rebooking of the reopened 8-14 Dec (Smoobu £1,535) under the stack pays **£891.71 vs the £1,439.05 model**. That is £47.51 net per £100 base, against Airbnb's £64.64-84.50.
   - Settings, all NOT CHECKED today: Booking.com extranet > Promotions > Last Minute portfolio deal > 10% (policy; **conflict for Corentin**; +£52.45 on this stay). Promotions > Mobile and Last Minute > untick Weekly/Monthly plans. Genius > dynamic off, and identify the fifth 10% (+£209.16 for both).
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 14.** Still bookable 18-21 Nov (£525.80) and 6-19 Dec (£2,275.22).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all open nights or unlist; then map to Smoobu 3562176.
4. **High: Smoobu below PriceLabs on near-term nights, and channels follow it.** P20 13-17 Nov is -£121 vs PriceLabs, plus P04, P12 and P06 (`prices.csv`). Cause NOT CHECKED (pricelabs section).
   - If it was a Smoobu-side edit: Smoobu > Rates calendar (check the P20 15 Nov min 2 too). Otherwise PriceLabs > Sync Now.
5. **High: t-p20-delivery, Corentin to confirm.** 20-21 Nov are open and selling on Airbnb (£910.34 for 20-25 Nov) against the policy 20-22 Nov delivery block. Min 2 on 15-17 and 22-24 Nov against policy min 3.
   - Either block 20-22 Nov in Smoobu, or update policy.
6. **Medium: P05 visible 12% early booking and 10% long stay** (-£135.24 on 12-15 Jan; -£190.90 on 12-17 Jan).
   - Setting: Airbnb listing 1618929775762183214 > Pricing > Discounts (or Smoobu Airbnb rules). Corentin to keep or zero.
7. **Medium: P13 LOS 5+ 10%** (-£92.61 / -£107.73 on 10-15 Dec) and **twins identical on 48 nights** (Jan-Feb). Both are conflicts for Corentin.
   - Settings: Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+; PriceLabs DSO on 3090701 for 12 Jan-28 Feb.
8. **Medium: P04 synced weekly 18% vs 15%** (£64.31 over policy on 6-19 Dec).
   - Setting: Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

Closed or changed today:
- t-p04-min2-nov lapsed with no sale.
- P11 8-14 Dec is synced (open in PriceLabs).
- 0 Booking.com bookings since +10%.

Data gaps:
1. Booking.com Standard = Smoobu x 1.10: NOT CHECKED. The Smoobu API has no channel-rate field and there is no Booking.com booking since 10 Nov to test; the extranet or guest page is needed (WAF 07:25:43Z, not circumvented).
2. Booking.com promotions (Last Minute 15% vs 10%, fifth 10%, Genius) and the 8-14 Dec resale price: NOT CHECKED. No extranet screenshot exists after 10 Nov.
3. Why Smoobu sits below PriceLabs on near-term P20/P04/P12/P06 nights, and why P20 15 Nov is min 2: NOT CHECKED.
4. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu).
5. P20 delivery dates (18-19 vs 20-22 Nov): Corentin.
6. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
