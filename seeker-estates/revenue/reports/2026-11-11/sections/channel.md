## Channel parity

Run date D = 2026-11-11 (Wednesday, GMT). I read `data/policy.json` first. These are settled and not raised again: the 15%/20% stay discounts, Booking.com promotion stacking (I report its size only), Visibility Booster commission (Camden 18% for check-ins 1 Nov-18 Dec, so it is expected), P13 = one flat, the P02/P03/P06/P07 blocks, the P14 setup, P09 Airbnb rules (deprioritised) and the P04 2 Dec override (deprioritised).

**Sources (all read-only)**
- **Smoobu GET** `/api/rates`, 12 apartments, 11 Nov to 28 Feb, at **2026-11-11T07:18:48Z**, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11/smoobu_rates11.json`.
- **Smoobu GET** `/api/reservations?modifiedFrom=2026-11-09` with priceElements, at 07:18:49Z (11 bookings), saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11/smoobu_mod11_pe.json`. Guest fields and notices were dropped before saving.
- **`reservations.csv` 11 Nov vs 10 Nov (full-row diff):** +1 new row (P11 Booking.com 8-15 Dec) and 2 rows changed to cancelled (P20 Airbnb 21-25 Nov; P01 Airbnb 18-21 Dec). There are no other changes.
- **PriceLabs.** `get_user_logs` (listing, 10-11 Nov) returns 6 entries. All are Reyhan's P12 DSOs at 10 Nov 16:28Z (12-20 Nov +5% min 2; 30 Nov-3 Dec +5% min 2; 7-13 Dec min 3, copied to Vrbo Mile End). **Nothing was logged on P11, P20, P13, P05 or P04.** I also called `get_listing_date_overrides` for P20 3547481 (11 Nov-6 Dec). Other inputs: raw `data/snapshots/2026-11-1{0,1}/raw/prices_*.json`, `listings.csv` 11 Nov (`last_push`), and `kpi_pack.json` 11 Nov.
- **Live Airbnb.** 20 plain public airbnb.co.uk map searches (curl, no workarounds), 07:22:55Z-07:24:49Z. Files are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11/air/`: `log.txt`, plus one JSON per search with URL, dates, guests and timestamp.
  - Room = card total before taxes minus cleaning (P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129).
- **`data/snapshots/2026-11-11/channel_checks.csv`.** I copied it forward from 10 Nov (841 lines) under `.channel_checks.csv.lock` and appended **26 Airbnb rows plus 13 P11 Booking.com rows**, giving 880 lines. The Booking.com rows are the Standard nightly rates from Corentin's 10 Nov extranet calendar screenshot (last sync 12:50), with the screenshot named as source.
- **Booking.com live: NOT CHECKED.** One plain search (Camden Town, 15-18 Dec, 2 adults) at 07:25:39Z returned HTTP 202 with an AWS WAF challenge (`live11/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row). Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults until Corentin confirms them.**

### 1. P11 Camden Booking.com 8-15 Dec (Smoobu 162798595)

| Field (Smoobu priceElements) | Value |
|---|---|
| Created | 10 Nov 17:26 (Smoobu timestamp; lead 28 d), 7 nights. **Party: 2 adults, 0 children.** This answers the guest-count question put to Corentin. |
| Room / VAT / cleaning / commission | **£1,012.86** (VAT £168.81 = 1/6, incl.) / cleaning **£149** (the "~£149 outside the nightly rates" is cleaning, confirmed) / **£209.13 = 18.00% of £1,161.86** |
| Commission | 18% falls inside Camden Visibility Booster (check-ins 1 Nov-18 Dec), so it is **expected per policy; not flagged**. Of it, **£26.82 is commission on cleaning**. |

**The 0.5267 factor, night by night.** Booking.com Standard comes from Corentin's screenshot (sync 10 Nov 12:50). The fit is Standard × 0.85 × 0.85 × 0.9 × 0.9 × 0.9 = 0.5267025.

| Night | Standard | × 0.5267025 | Paid (screenshot) | Paid ÷ Standard | Smoobu (= PL `booked_price`) | Standard ÷ Smoobu |
|---|---|---|---|---|---|---|
| 8 Dec | 256 | 134.84 | 134.84 | 0.52672 | 232 | 1.103 |
| 9 Dec | 247 | 130.10 | 130.10 | 0.52672 | 224 | 1.103 |
| 10 Dec | 270 | 142.21 | 142.21 | 0.52670 | 245 | 1.102 |
| 11 Dec | 346 | 182.24 | 182.24 | 0.52671 | 314 | 1.102 |
| 12 Dec | 348 | 183.29 | 183.29 | 0.52670 | 316 | 1.101 |
| 13 Dec (darts) | 241 | 126.94 | not visible | (computed) | 219 | 1.100 |
| 14 Dec (darts) | 215 | 113.24 | not visible | (computed) | 195 | 1.103 |
| **Sum** | **£1,923** | **£1,012.86** | **= Smoobu room £1,012.86 to the penny** | **0.5267** | **£1,745** | |

- **The five visible nights match to the penny, and the 7-night sum matches exactly.** The factor is verified.
- **The fifth 10% is a separate multiplicative layer.** It is not Genius moving from 10% to 20%: a single 20% Genius would give 0.85 × 0.85 × 0.9 × 0.8 = 0.5202, which is £1,000.38, not £1,012.86.
  - The party is 2 guests, which fits occupancy pricing on the Weekly plan. The NR plan already has 1-4 guests -5% (policy 24 Oct), and P12 24 Oct showed -5% at 3 guests. 10% at 2 guests is plausible but unconfirmed.
  - **Which of the two it is stays NOT CHECKED** (extranet > Rates > Weekly plan > Occupancy pricing, or Promotions > Genius > dynamic).
- **Ratios at booking.**
  - Paid ÷ Booking.com Standard: **0.527**.
  - Paid ÷ Smoobu rate in force: **0.580** (£1,745).
  - Paid ÷ PriceLabs 10 Nov morning: **0.578** (£1,753; = Smoobu 10 Nov 07:26Z).
  - Paid ÷ (PriceLabs × 0.85 weekly): **0.680** (£1,490, a shortfall of **-£477.14**).
  - Against the model (Smoobu × 1.15 × 0.85 = £1,705.74) the gap is **-40.6%**. Policy says promotions explain it, so this is size only: **£910.14 off the £1,923 list (47.3%)**.
- **Smoobu rate at booking.** P11's last push was 10 Nov 09:27:10Z (`listings.csv`). The 16:28:54Z refresh, which already shows the stay booked, was not pushed. The 11 Nov raw `booked_price` on 8-14 Dec equals Smoobu today on every night (232/224/245/314/316/219/195), so I take £1,745 as the rate on sale at 12:50 and at booking.
- **NEW: the Booking.com list on Camden was Smoobu × 1.10, not × 1.15.**
  - All 13 Standard nights in the screenshot (2-4, 8-14 and 15-17 Dec) equal **ceil(Smoobu × 1.10)** exactly. Examples: 2/3/4 Dec Smoobu 234/269/319 give 258/296/351; 15/16/17 Dec give 222/233/258.
  - Earlier bookings fitted × 1.15: P11 20-22 Nov (booked 2 Nov) and P13 11-15 Dec (booked 9 Nov; ceil(× 1.15) = £975 × 0.729 = £710.78 vs £710.77 paid).
  - Either the global Smoobu Booking.com markup changed to +10% between 9 Nov 08:58 and 10 Nov 12:50, or Smoobu held prices about 4% lower at 12:50 than now. The second needs a push that `listings.csv` does not show.
  - **NOT CHECKED: Corentin to open Smoobu > Channel Manager > Booking.com > price settings.** On this stay, list at × 1.15 would have been £2,010, which gives **£1,058.67 paid (+£45.81)**.
- **Darts nights 13-14 Dec** (policy: raised, average above £300) sold at **£126.94 and £113.24 room** (Smoobu 219/195). The darts price level belongs to the pricelabs section. The 24 Oct "leave the override" decision is not re-raised.

**What each fix would have been worth on this stay** (room, VAT incl.; net of the 18% commission in brackets)

| Change | Factor | Room | Gain |
|---|---|---|---|
| As sold | 0.5267 | £1,012.86 | - |
| Smoobu markup back to +15% (if it really is +10%) | 0.5267 on £2,010 | £1,058.67 | +£45.81 (+£37.56) |
| Last Minute 15% back to policy 10% | 0.5577 | £1,072.43 | **+£59.57 (+£48.85)** |
| Fifth 10% removed (occupancy or Genius dynamic) | 0.5852 | £1,125.40 | +£112.54 (+£92.28) |
| Both of the above | 0.6197 | £1,191.59 | +£178.73 (+£146.56) |
| Dispatcher proposal (Last Minute and Mobile off the Weekly/Monthly plans, Last Minute 10%, Genius dynamic No) | see note | **£1,324-£1,402** | **+£311-£389 (+£255-£319)** |

- **Correction to the Dispatcher's £1,471** (Weekly + Genius = 0.765). Once Last Minute and Mobile no longer apply to Weekly, the **Standard plan would carry Last Minute 10% × Mobile × Genius = 0.729, which is £1,401.87**. That is cheaper than Weekly + Genius, and Booking.com shows the guest the cheapest plan. So the realistic result is £1,401.87.
  - If the fifth layer is Weekly occupancy pricing and it stays, the result is Weekly + Mobile + Genius + occupancy at 0.6885, i.e. £1,323.99.
  - **£1,471 is not reachable unless Standard also drops one promotion.**

**The new 15% Last Minute "Portfolio deal" (created 6 Nov) and policy's 10% (24 Oct)**
- Promotions page (screenshot 10 Nov): Last Minute **15%**, 0-28 days, bookable 6 Nov-now, stays 6 Nov 2026-6 Feb 2027. It has 1 booking, this one.
- Policy has Corentin's **24 Oct Last Minute 10% within 30 days** (`monitoring.booking_last_minute_24oct`).
- **This is a conflict for Corentin to confirm, not a new proposal.** Who created it is NOT CHECKED. Which flats the portfolio deal covers is NOT CHECKED. Whether the 24 Oct 10% deal still exists alongside it is NOT CHECKED.
- No other post-6 Nov Booking.com booking was inside 0-28 days: P13 7-10 Dec was at 30 d and P13 11-15 Dec at 32 d.

**Booking.com since the 24 Oct markup cut** (+30% -> +15%, 13:38Z; 17.7 days to 07:18Z). Same method as yesterday: the three duplicate P04 20-23 Nov rows count as one; room £ is Smoobu basePrice, VAT incl.

| Measure | Bookings | Nights | Room £ | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **20** (19) | **78** (71) | **£13,772.36** (£12,759.50) | £17,610 | **0.782** (0.805) |
| Still confirmed | **14** (13) | **59** (52) | **£9,515.85** (£8,502.99) | £12,737 | **0.747** (0.774) |
| Net of all cancellations (incl. pre-cut, 25 n / £5,051.37) | | **+34 n** (+27) | **+£4,464.48** (+£3,451.62) | | |

- Brackets show yesterday's figures. P11 counts at £1,753 PL (10 Nov morning).
- Pace: **1.13 a day gross, 0.79 a day confirmed** (about 0.33 a day before the cut). There was no new Booking.com cancellation overnight, so 6 of 20 are cancelled (30%).
- The P11 stay alone pulls the confirmed ratio down 2.7 points. Last Minute 10% (24 Oct) and the 15% portfolio deal (6 Nov) both overlap the period, so the pace change cannot be credited to the cut alone.

### 2. Airbnb cancellations: P20 21-25 Nov and P01 18-21 Dec

| Smoobu id | Stay | Created | Cancelled | Room / cleaning / commission | Notes |
|---|---|---|---|---|---|
| 162781746 P20 | 21-25 Nov, 4 n | 9 Nov 22:34 | **11 Nov 04:37:07** (10 days before arrival) | £638.54 / £150 / £122.22 | Booked at 0.650 of Smoobu. P20 is in the Flexible-cancellation test (policy, 24 Oct), and this cancellation would be free under Flexible. Smoobu shows a "Cancellation Payout £666.32" element, but the same element (= total - commission) also appears on live bookings, so it is **not evidence of a payout** (NOT CHECKED). |
| 160573351 P01 | 18-21 Dec, 3 n | 19 Oct 00:52 | **10 Nov 14:40:51** | £720.90 / £149 / £134.83 | 2 adults + 2 children. **36 s later (14:41:27) the P01 "Blocked channel" 160657036 was modified to 30 Nov-21 Dec** (Smoobu modified list), which closes 18-20 Dec. |

**a-airbnb-rules: how I treat a cancellation.** The running cost counts revenue that was actually lost against policy on stays that will happen. A cancelled stay pays nothing, so it has no shortfall against policy, and its nights go back on sale.
- I therefore **remove P20's -£196.16**. The realised running cost is **£2,559.27 - £196.16 = £2,363.11** (confirmed stays only). I keep -£196.16 as a separate memo line, "sold-then-cancelled, not counted".
- **P01 18-21 Dec is not in the tally and never was.** It was booked 19 Oct, before the 21 Oct promotion removal that the tally starts from (the 21 Oct section called it "9.7% implied"). So there is no adjustment for P01.
- The P09 memo (-£139.31) stays excluded as deprioritised.
- No new Airbnb booking arrived overnight, so nothing is added. **£2,363.11 stands.**

**What is open now**
- **P20 21-24 Nov reopened.** Smoobu is open on **20-24 Nov as one 5-night run**: 20 Nov £234 min 3; 21 £301 min 3; 22 £247, 23 £294, 24 £279, all min 2. 25 Nov is the check-in of 25 Nov-5 Dec.
  - Airbnb sells it now: **20-25 Nov £1,036.56 room** (card £1,186.56, 2 adults, 07:23:18Z) and **21-24 Nov £644.12 room** (07:23:26Z). Both are 0.765 of Smoobu.
  - **The 20 Nov orphan has gone.**
  - The prices are the 10 Nov 09:27Z push. PriceLabs P20 has not refreshed since (raw 3547481 `last_refreshed` 09:27:29Z still shows 21-24 Nov Booked), so its last-minute and occupancy logic does not yet know the nights are free.
  - PriceLabs DSOs (`get_listing_date_overrides`): **22-24 Nov -5%, min 2** and **16-17 Nov -5%, min 2**, updated 8 Nov 12:40-12:41Z.
- **P01: nothing is open before the 20 Dec handback.** Smoobu shows every night 11 Nov-22 Dec unavailable, and 18-20 Dec is now inside block 160657036.
  - The block was extended 36 s after the cancellation, so it was done on purpose (by a person or a rule). Corentin to confirm that 18-20 Dec (Smoobu £284/£279/£243) should stay closed. The policy handback date is 20 Dec, and before it the rule is "maximise revenue normally". The occupancy section owns this.
  - **This takes back P01's whole 18 Oct base-rise gain** (+3 n / +£720.90). The occupancy section owns the tally.

### 3. Barking (P04): unsynced Airbnb 1455876748739910219, day 12

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 (card, cleaning unknown) | Synced 1657859794156786222 (room) | Source (`live11/air/`) |
|---|---|---|---|---|
| 11-14 Nov (lead 0) | open £416, min 3 | **bookable £578.20** (3 × £192.73) | £353.60 (card £495.60) = 0.850 | p04_1114nov 07:23:10Z |
| 18-21 Nov | open £427 | **bookable £525.80** (same as 10 Nov) | £326.64 (£468.64) = 0.765 | p04_1821nov 07:22:55Z |
| 6-19 Dec (13 n) | open £2,464 | **bookable** £2,514.80 - weekly £239.58 = £2,275.22 (same as 10 Nov) | £1,818.44 = 0.9 × (1 - 0.18) | p04_0619dec 07:23:05Z |

- **Still bookable on day 12: yes**, on every open Smoobu window I checked.
- No P04 booking appears in the Smoobu diff, so there is **no visible booking on 1455**. Its own reservation list is outside Smoobu (NOT CHECKED).
- **t-p04-doublebook: NOT fixed.**

### 4. Live Airbnb: displayed vs expected (hidden layers, day 13)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- weekly 15% (7+ nights);
- P13: last-minute 10% within 14 d, early bird 10% at 60+ d;
- P20: last-minute 15% at 0-14 d.

Gap = displayed room ÷ expected - 1. Flag if over 3%. Cleaning is excluded from both.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live11/air/`, 11 Nov) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 11-14 Nov (0) | 2 | £416 | £416.00 | £353.60 (£495.60) = 0.850 | -15.0% | FLAG | p04_1114nov 07:23:10Z |
| P04 synced | Airbnb | 18-21 Nov (7) | 2 | £427 | £427.00 | £326.64 (£468.64) = 0.765 | -23.5% | FLAG | p04_1821nov 07:22:55Z |
| P04 synced | Airbnb | 6-19 Dec, 13 n (25) | 2 | £2,464 | £2,094.40 | £1,818.44 = 0.9 × (1 - **0.18** weekly, £399.16) | -13.2% | FLAG | p04_0619dec 07:23:05Z |
| P04 unsynced 1455 | Airbnb | 11-14 Nov / 18-21 Nov / 6-19 Dec | 2 | open | not for sale | £578.20 / £525.80 / £2,275.22 card | n/a | FLAG (double-sell) | as above |
| P05 | Airbnb | 16-18 Nov (5) | 7 | £771 | £771.00 | £589.81 (£784.81) = 0.765 | -23.5% | FLAG | p05_1618nov 07:23:49Z |
| P05 | Airbnb | 21-22 Dec, 1 n (40) | 7 | £2,230 (min 1) | £2,230.00 | £2,007.00 = 0.900 | -10.0% | FLAG | p05_2122dec_1n 07:24:00Z |
| P05 | Airbnb | 29-30 Dec, 1 n (48) | 7 | £2,786 (min 1) | £2,786.00 | £2,507.40 = 0.900 | -10.0% | FLAG | p05_2930dec_1n 07:24:03Z |
| P05 | Airbnb | 9-12 Jan (59) | 7 | £1,179 | £1,179.00 | £1,088.76: visible **"Early booking discount" £90.24 = 12.0% of the 10-11 Jan nights only** (£752) | -7.7% | FLAG | p05_0912jan 07:23:57Z |
| P05 | Airbnb | 10-13 Jan (60) | 7 | £1,124 | £1,124.00 | £989.12 (visible **Early booking £134.88 = 12.0%**) | -12.0% | FLAG (visible, not in policy) | p05_1013jan 07:23:51Z |
| P05 | Airbnb | 11-16 Jan, 5 n (61) | 6 | £1,897 | £1,897.00 | £1,707.30 (visible **"Long stay discount" £189.70 = 10.0%**) | -10.0% | FLAG (visible, not in policy) | p05_1116jan_5n 07:23:54Z |
| P06 | Airbnb | 15-17 Nov (4) | 3 | £475 | £475.00 | £363.37 (£492.37) = 0.765 | -23.5% | FLAG | p06_1517nov 07:24:45Z |
| P09 | Airbnb | 12-13 Nov, 1 n | 2 | £120 open, min 2 | not sellable (min 2) | not offered | - | orphan | p09_1213nov_1n 07:24:49Z |
| P12 | Airbnb | 17-20 Nov (6) | 2 | £804 | £804.00 | £615.06 (£765.06) = 0.765 | -23.5% | FLAG | p12_1720nov 07:24:27Z |
| P12 | Airbnb | 7-10 Dec (26) | 2 | £826 | £826.00 | £631.88 (£781.88) = 0.765 | -23.5% | FLAG | p12_0710dec 07:24:32Z |
| P13 3090701 (1587576514709814818) | Airbnb | 11-13 Nov (0) | 4 | £361 | £324.90 (LM10) | £290.08 (£542.00 - **visible "Special offer" £101.92** = £440.08) = 0.804 | -10.7% | **FLAG (new)** | p13_1113nov 07:24:05Z |
| P13 3064856 (1571600691689064213) | Airbnb | 11-13 Nov (0) | 4 | £404 | £363.60 (LM10) | £343.40 (£493.40) = 0.850 | -5.6% | FLAG | p13_1113nov 07:24:05Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Dec (29) | 4 | £698 / £736 | same | £628.20 / £662.40 = 0.900 | -10.0% | FLAG | p13_1013dec 07:24:08Z |
| P13 3090701 / 3064856 | Airbnb | 10-15 Dec, 5 n (29) | 4 | £1,134 / £1,148 | same | £918.54 / £929.88 = 0.9 × visible "Long stay discount" 10% (£102.06 / £103.32) | -19.0% | FLAG (10% visible, confirm) | p13_1015dec_5n 07:24:14Z |
| P13 3090701 / 3064856 | Airbnb | 10-13 Jan (60) | 4 | **£551 / £551** | £495.90 (EB10) | **£495.90 / £495.90** (visible "Early booking discount" £55.10) | 0.0% | ok on price; **twins identical** | p13_1013jan 07:24:22Z |
| P20 | Airbnb | 20-25 Nov (9) | 2 | £1,355 | £1,151.75 (LM15) | £1,036.56 (£1,186.56) = 0.765 | -10.0% | FLAG | p20_2025nov 07:23:18Z |
| P20 | Airbnb | 21-24 Nov (10) | 2 | £842 | £715.70 (LM15) | £644.12 (£794.12) = 0.765 | -10.0% | FLAG | p20_2124nov 07:23:26Z |
| P20 | Airbnb | 14-17 Dec (33) | 2 | £870 | £870.00 | £783.00 (£933.00) = 0.900 | -10.0% | FLAG | p20_1417dec 07:23:36Z |
| P11 | Booking.com list (Standard) | 8-14 Dec (booked 10 Nov) | n/a (calendar) | £1,745 | £2,006.75 (× 1.15) | **£1,923** (screenshot, sync 10 Nov 12:50; room only, cleaning £149 separate) | **-4.2%** | FLAG (× 1.10, §1) | Corentin screenshot 10 Nov; `channel_checks.csv` |
| P11 | Booking.com paid | 8-15 Dec (28) | 2 | £1,745 | £1,705.74 (× 1.15 × 0.85 weekly) | £1,012.86 (Smoobu basePrice) | -40.6% | size only (stacking settled) | Smoobu 162798595 + screenshot |
| all | Booking.com displayed (guest view) | - | - | - | - | NOT CHECKED: AWS WAF challenge 07:25:39Z | - | - | live11/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**Hidden layers: unchanged on day 13. a-airbnb-rules is NOT fixed.**
- **0.765** for nights up to 28 d out.
- **0.900** for nights 29-59 d out.
- **0.850** for the whole stay on same-day check-ins.
- **1.000 at 59-60 d+** (P05 9 Jan at 59 d was at 1.000).

**Standing items**
- **P05 12% early booking: still on** (£134.88 on 10-13 Jan). It applies per night at 60 d+, so on 9-12 Jan only the 10 and 11 Jan nights get it. a-p05-earlybird is NOT fixed.
- **P05 10% long-stay from 5 nights: still on** (£189.70 on 11-16 Jan). t-p05-los is NOT fixed.
- **P05 21 Dec (£2,007) and 29 Dec (£2,507.40 room) are bookable at min 1.** These are the +300% soft blocks (a-p05-dec). The pricing call belongs to the pricelabs section.
- **P04 synced weekly 18% vs policy 15%: NOT fixed.** £399.16 = 18.0% of £2,217.60. On 6-19 Dec that is **£66.53 more than policy**.
- **P13 visible 10% LOS 5+: still on** on both twins (10-15 Dec). Corentin to confirm it is intended (21 Oct listing-B rule).
- **NEW: P13 3090701 shows a visible "Special offer" of -£101.92 on 11-13 Nov.** It was not there yesterday (10-13 Nov was a plain 0.850).
  - Policy says all manual Airbnb promotions were removed on 21 Oct, so a Special offer (host-created) is **unexplained**.
  - The pre-offer nightly of £271 (£392 room) is 8.6% above Smoobu, so the breakdown does not resolve cleanly.
  - Size on this stay: -£34.82 vs policy expectation. Who created it is NOT CHECKED.
- **P13 twins (t-p13-twins): not fixed, and wider.**
  - **22 of 29 open January nights (10-31 Jan) and all 28 open February nights are identical** (Smoobu 07:18Z, checked to 28 Feb). November (4) and December (18) all differ.
  - Policy `twin_listings` says the prices must differ: **conflict for Corentin to confirm.**

### 5. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed) | £115.00 | £97.75 |
| Booking.com since cut, confirmed (0.747) | £74.71 | ~£59.77-63.50 (20-15% commission) |
| **Booking.com P11 8-15 Dec (0.578, 18%)** | £57.78 | **£47.38** |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.000 (nights 60 d+) | £100.00 | £84.50 |
| Airbnb live 0.900 (nights 29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.850 (same-day stays) | £85.00 | £71.83 |
| Airbnb live 0.765 (nights up to 28 d) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct is not the cheapest.** Airbnb inside 60 days (£76.50-90) and Booking.com as sold (£57.78-74.71) are both below the £90 direct model.
- **Booking.com as sold nets £47-64, below Airbnb's £64.64-84.50.**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

**`rate_leak_next_30` (kpi_pack 11 Nov), corrected for VAT and with Smoobu as truth.** Booking.com ADR is multiplied by 1.2. Nights not in a confirmed Smoobu reservation are dropped. My unadjusted figures reproduce the pack exactly (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live11scripts/vat.py`, using `reservations.csv` + `prices.csv` for 11 Nov-10 Dec).

| Flat | Pack gap | Corrected gap | Notes |
|---|---|---|---|
| P11 | -24.2% (10 n) | **-9.0%** | includes 8-10 Dec at 0.5267 |
| P04 | -25.7% (11 n) | **-10.8%** | all Booking.com |
| P12 | -25.1% (10 n) | **-13.1%** | Booking.com -10.4% on 8 n; Airbnb -23.8% on 2 n |
| P13 | -43.9% (16 n) | **-38.1%** | Booking.com -41.0% on 10 n; Airbnb -34.1% on 6 n |
| P20 | -44.6% (17 n) | **-46.3% (14 n)** | the pack counts 3 nights of the cancelled 21-25 Nov stay (22-24 Nov), which PriceLabs still shows Booked |

- The Airbnb-only flats are unchanged: P01 -37.9%, P05 -5.6%, P06 -35.6%, P08 -45.2%, P09 -30.6%, P10 -24.9%.
- 3 nights with a blank ref in `prices.csv` (-17.2%) are not attributed.
- The gaps include the policy stay discounts and the hidden layers.

### 6. Fees, min stay, sync, plan items

- **Cleaning** on every Airbnb card matches the fees on record. P11's new booking has cleaning £149 on Booking.com (Smoobu).
- **t-cleaning-commission: +£26.82** (P11 8-15 Dec, 18% of £149). Running list per booking: P12 £22.50, P11 £26.82, P13 £30.00, P11 £26.82. Corentin's call (Booking.com extranet > Finance).
- **Min stay as displayed matches Smoobu.** P09 12 Nov (min 2) is not offered; P05 21 and 29 Dec (min 1) are offered; P20 20-25 Nov and 21-24 Nov are offered.
- **P11 PriceLabs refresh not pushed (sync).** The 16:28:54Z refresh sits above Smoobu on **20 open nights by £325 in total** (`kpi_pack` `sync_issues`). Examples: 29 Nov £241 vs £217, 2 Dec £260 vs £234, 23 Dec £289 vs £274, 3 Jan £183 vs £174. Booking.com is selling these about 4-11% below PriceLabs' current price.
  - Setting: PriceLabs > 3064196 > Sync Now. The pricelabs section owns this; I can only read.
- **t-channel-gaps (P11): NOT fixed.**
  - 23 Dec is **£274** in Smoobu (£289 in the unpushed PriceLabs price), against a target of at least £320, min 2.
  - 3 Jan is **£174** (£183 unpushed), against a target of at least £204, min 3.
  - Even after a push, both stay under target. Booking.com visibility on those dates is NOT CHECKED (WAF).
- **t-p20-delivery: conflict, now live.**
  - The policy delivery block is 20-22 Nov (`listing_facts.P20.block_20_21_nov`). After the cancellation, **20, 21 and 22 Nov are open and bookable on Airbnb** (20-25 Nov £1,036.56 room). Smoobu blocks only 18-19 Nov.
  - **Corentin to confirm** whether the delivery moved to 18-19 Nov (then nothing to do) or is still 20-22 Nov (then block 20-22 Nov in Smoobu).
  - Min stay: 16-17 and 22-24 Nov are **min 2** (PriceLabs DSOs updated 8 Nov 12:40-12:41Z) against policy min 3 to 30 Nov. **Conflict for Corentin.**
- **t-p09-1112block: NOT fixed.** 12 Nov is tomorrow: Smoobu £120, min 2, and Airbnb does not offer it as a 1-night stay (11 Nov is unavailable).
- **t-p20-5dec-orphan: NOT fixed.** 5 Dec is still open at £311, min 3.

### Issues ordered by £ impact

1. **Critical: Booking.com promotion stack on Camden. The 8-15 Dec stay sold at 0.5267 of list** (£1,012.86 against £1,705.74 model, and against £1,490 PriceLabs after weekly).
   - Worth **+£59.57** (Last Minute to 10%) up to **+£311-£389** (Dispatcher's proposal; the realistic figure, not £1,471, because Standard + Last Minute + Mobile + Genius = 0.729 becomes the cheapest plan).
   - Settings:
     - Booking.com extranet > Promotions > Last Minute (portfolio deal, created 6 Nov) > discount 10% (policy 24 Oct; **conflict for Corentin**) and untick the Weekly and Monthly rate plans.
     - Promotions > Mobile rate > untick Weekly and Monthly.
     - Rates > Weekly plan > Occupancy pricing: check what 2 guests get.
     - Genius > dynamic = No.
2. **Critical: hidden Airbnb layers, day 13** (0.765 up to 28 d, 0.9 at 29-59 d, 0.85 on same-day stays). **Realised running cost £2,363.11** after removing P20's cancelled -£196.16. Today's live cards show the same factors on every synced flat.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that are not in policy, and keep only visible discounts (`airbnb_visible_discounts`).
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 12.** It is still bookable on 11-14 Nov, 18-21 Nov and 6-19 Dec, all of it open synced inventory.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all nights, or snooze/unlist. Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176.
4. **High: P11 Booking.com list = Smoobu × 1.10, not × 1.15**, on all 13 screenshot nights. That is about 4.3% of Booking.com list on every flat if the markup is global (+£45.81 on this stay alone).
   - Setting: Smoobu > Channel Manager > Booking.com > price settings. Confirm +15% (policy 24 Oct), then do a full resync.
5. **High: P11 unpushed PriceLabs refresh**: 20 open nights £325 below PriceLabs (Sync Now on 3064196). Plus t-channel-gaps 23 Dec / 3 Jan.
6. **Medium: P05 visible 12% early booking** (£134.88 on 10-13 Jan) and **10% long-stay from 5 nights** (£189.70 on 11-16 Jan). Neither is in policy.
   - Setting: Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird / LOS 5+, or Airbnb listing 1618929775762183214 > Pricing > Discounts.
7. **Medium: P04 synced weekly 18% vs 15%** (£66.53 on 6-19 Dec).
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
8. **Medium: P13 3090701 new visible "Special offer" -£101.92** (11-13 Nov; -£34.82 vs policy) and **visible LOS 5+ 10%** on both twins (£102.06 / £103.32 on 10-15 Dec).
   - Setting: Airbnb listing 1587576514709814818 > Calendar 11-12 Nov > Promotions / Special offers: remove it, or confirm. Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+.
9. **Medium: unsellable orphans** P09 12 Nov (£120, min 2, tomorrow) and P20 5 Dec (£311, min 3). Setting: PriceLabs DSO min stay 1 on those dates (owner: pricelabs section).
10. **Question: t-cleaning-commission.** £26.82 more today; it is £22.50-30.00 per Booking.com booking.
11. **Conflicts for Corentin (not new proposals):**
    - Booking.com Last Minute 15% portfolio deal (6 Nov) vs policy's 10% (24 Oct).
    - The P20 delivery dates 20-22 Nov are open and bookable again, and P20 is min 2 on 16-17 and 22-24 Nov vs policy min 3.
    - P13 twins identical on 10-31 Jan and February.
    - P01 18-20 Dec closed by the block extension right after the cancellation, before the 20 Dec handback.

Closed today: **the P20 20 Nov orphan** (dissolved by the cancellation; 20-24 Nov is now a 5-night run).

Data gaps:
1. Booking.com guest-view prices and promotions: NOT CHECKED (AWS WAF 07:25:39Z; not circumvented). The P11 figures come from Corentin's 10 Nov screenshots and Smoobu.
2. P11 fifth 10% layer (Weekly occupancy pricing vs Genius dynamic): NOT CHECKED. Also not checked: who created the 15% Last Minute portfolio deal, which flats it covers, and whether the 24 Oct 10% deal still exists.
3. The Smoobu Booking.com markup setting is NOT CHECKED. The × 1.10 reading assumes Smoobu at 12:50 equalled Smoobu now. This is supported by PriceLabs `booked_price` = Smoobu on 8-14 Dec and by no push after 09:27:10Z.
4. Booking time: the Smoobu `created-at` is 17:26, but its time zone is not stated. PriceLabs already shows the stay booked at 16:28:54Z, which suggests CET (16:26Z).
5. Whether the P20 and P01 cancellations paid anything: NOT CHECKED. The Smoobu "Cancellation Payout" element also appears on live bookings.
6. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu).
7. The P13 3090701 Special offer: who created it, and why the pre-offer nightly is 8.6% above Smoobu: NOT CHECKED.
8. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults. Vrbo Notting Hill 4438728 (last push 24 Feb) is P02, intentionally blocked, so there is no action.
9. P20 delivery date (18-19 vs 20-22 Nov): Corentin.
