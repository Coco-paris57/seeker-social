## Channel parity

Run date D = 2026-11-16 (Monday, GMT). I read `data/policy.json` first and do not raise again what it settles: the 15%/20% stay discounts, Booking.com promotion stacking (size only), the Camden/Shepherd's Bush Visibility Booster, the +10% Booking.com markup, P13 = one flat, the P02/P03/P06/P07 blocks, P14, and the deprioritised items (P09 Airbnb rules, P04 2 Dec, P12 17 Nov, P13 twin order).

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**, 12 apartments, 16 Nov-28 Feb, at **2026-11-16T07:17:39Z** -> scratch `live16/smoobu_rates16.json`. Compared with `live15/smoobu_rates15.json` (15 Nov 07:20:49Z) and `live10`-`live14`.
- **Smoobu GET `/api/reservations?modifiedFrom=2026-11-14&showCancellation=true&includePriceElements=true`** at 07:17:40Z: 8 records. Guest fields dropped -> `live16/smoobu_mod16_pe.json`.
- **PriceLabs:**
  - `get_user_logs` (listing, 15-16 Nov): 25 entries, all from Reyhan, 15 Nov 18:47-19:17Z.
  - `get_listing_prices` P05 3166592, 13-21 Feb.
  - Raw `data/snapshots/2026-11-16/raw/` (`last_refreshed_at`, booking status).
- **Live Airbnb:** 10 plain public airbnb.co.uk map searches (curl), 07:18:58Z-07:19:56Z. URL, dates, guests and timestamp are in `live16/air/*.json` and `log.txt`. Room = card total before taxes minus cleaning (P04 synced £142, P13/P20 £150, P05 £195). Every card gross reconciles to an exact multiple of Smoobu (1.000 / 0.900 / 0.765).
- **channel_checks:** `data/snapshots/2026-11-16/channel_checks.csv` was copied forward from 15 Nov (1,150 lines) under `.channel_checks.csv.lock`, then **11 Airbnb rows were appended** (now 1,161 lines). The pack's "channel_checks: empty" was true when the pack was built (06:53), before this copy.
- **Booking.com live: NOT CHECKED.** One plain search (Shepherd's Bush, 18-23 Dec, 4 adults) at 07:22:34Z returned HTTP 202 with an AWS WAF challenge (`live16/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +10% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`.)

### 1. Three new Airbnb stays (added to a-airbnb-rules)

Smoobu price elements, no guest data. Every one has `basePrice`, `cleaningFee`, `commission`, and Airbnb's "Cancellation Host Fee" (= commission) and "Cancellation Payout" (= price - commission). Commission = 15.50% of room + cleaning on all three, which is the normal host fee.

| Smoobu id | Flat / apt | Stay | Created (Smoobu) | Lead | Guests | Room | Cleaning | Commission |
|---|---|---|---|---|---|---|---|---|
| 162911547 | P13 **3090701** | 10-13 Dec (3 n) | 15 Nov 17:08 | 25 d | 3 adults | £468.94 | £150 | £95.94 |
| 162920897 | P20 3547481 | 27 Dec-3 Jan (7 n) | 15 Nov 22:58 | 42 d | 3 adults + 1 child | £1,803.78 | £150 | £302.84 |
| 162914560 | P05 3166592 | 13-17 Feb (4 n) | 15 Nov 18:54 | 90 d | 4 adults + 4 children | £1,219.98 | £195 | £219.32 |

**Smoobu rate at booking.** Pushes on 15 Nov were P13 3090701 at 19:13:18Z, P05 at 19:14:37Z and P20 at 19:20:16Z (`raw/listing_data.json`). The PriceLabs logs show no edit on these flats before 19:12Z.
- **P13:** booked before the push, so the rate is the 07:20Z read: 194/209/210 = **£613**. The other twin, 3064856, was at £766 at that time.
- **P05:** booked before the push, so the rate is the 07:20Z read: 424/391/404/408 = **£1,627**.
- **P20:** booked after the push, so the rate is today's read: 352/411/426/433/433/358/361 = **£2,774**. On 15 Nov at 07:20Z it was £2,873.
- Script: `live16scripts/fit.py`.

**Paid vs Smoobu**
- **P13: exactly 0.765**, to the penny on 3090701's rates.
  - This is the hidden up-to-28-day tier (0.9 x 0.85).
  - Policy expects no discount: Shepherd's Bush last-minute is 10% only within 14 d, and there is no LOS rule at 3 nights.
  - Expected £613; **gap -23.5%, -£144.06.**
  - **Which listing:** the paid amount fits only 3090701, which is Airbnb **1587576514709814818** ("2 Bed Near Westfield with view & Terrace", `airbnb_listings_24oct`). On 3064856's rates it would be 0.612, and no clean stack fits. PriceLabs has the stay on 3090701 (ADR 156.31, booked 15 Nov) and shows 3064856 as Blocked (the linked twin).
  - Live check at 07:19:26Z: neither twin is offered for 10-13 Dec, so there is no double-sell.
  - Context: the cheaper twin sold, at 20% below the other twin, on dates a-peak-check flagged. Reyhan's 19:12Z copy-from-parent DSO (10-26 Dec) has since lifted both to £807 for these nights.
- **P20: 0.65025 = 0.9 x 0.85 x 0.85** (£1,803.79, 1p off).
  - Policy expects only weekly 15%: £2,357.90. **Gap -23.5%, -£554.12.** Of that, £235.79 is the 0.900 tier at 29-59 d, and **£318.33 is a further 15% that is not identified.**
  - Today's P20 7-night card at 49 d (4-11 Jan) shows only 0.900 x visible Weekly 15% = 0.765. The extra 15% is not on the card.
- **P05: 0.7498** of £1,627. There is no exact fit; the nearest is 0.88 x 0.85 = £1,217.00, £2.98 off.
  - It does fit to the penny, per night, as 0.88 x 0.85 of the PriceLabs `booked_price` 424/393/403/411 = £1,631 (`get_listing_prices`). But that field postdates the 19:14Z refresh, so I cannot confirm it as the rate at booking.
  - Today's P05 cards at 82 d and 93 d show tier **1.000** and only the visible **Early booking 12%**.
  - Policy expects £1,627. **Gap -25.0%, -£407.02**: £195.24 is the visible 12% (a-p05-earlybird, kept separate as in earlier runs) and **£211.78 is an unidentified further ~15%.**
  - PriceLabs: 13-16 Feb is registered (ADR 305, Booked). `price` is now 437/407/417/425 (Smoobu matches). Reyhan's -5% DSO for 1-28 Feb (min 4) was set at 19:14:20Z, after the booking.
- **Pattern:** the extra 15% now shows on bookings at **P06** (162877292, 0.65025 at 11 d, 14 Nov section), **P20** and **P05**. Those are exactly the three flats on the Airbnb Flexible-cancellation test since 24 Oct (`monitoring.airbnb_flexible_cancellation_test`). The P04 (14 Nov) and P13 (today) bookings, on flats outside the test, match their card tiers exactly. The cause is not identified, and the Airbnb reservation breakdown is NOT CHECKED. This is a lead, not a finding.

**a-airbnb-rules running cost:**
- £3,056.70 + £144.06 (P13) + £554.12 (P20) + £211.78 (P05 beyond its visible 12%) = **£3,966.66**.
- Of the £909.96 added today, £379.85 is the known 0.765/0.900 tiers and £530.11 is the unidentified extra 15% on P20/P05.
- The method is the same as on 14-15 Nov: Smoobu rate at booking x policy-recognised discounts, minus paid.
- PriceLabs registration: P20 27 Dec-2 Jan is **not yet in PriceLabs**. The 19:20Z refresh was before the 22:58 booking, so the raw still shows the nights open (user_price 354...). Smoobu shows them unavailable, so the Airbnb calendar is safe. That is for the pricelabs section.

### 2. P13 Booking.com 18-23 Dec, cancelled

- **Smoobu 162896042, apartment 3064856:**
  - Channel Booking.com, type **cancellation**, created 14 Nov 22:03, modifiedAt **15 Nov 12:24:19**.
  - 3 adults + 2 children.
  - price £997.10 = basePrice **£847.10** + cleaning £150. Commission £179.64 (18.02%; booster window, expected). VAT element £141.18 (basePrice / 6).
- This was the stay at 0.7203 of the Booking.com list with one unidentified promotion layer. That data gap closes with the booking.
- **18-22 Dec are open again on both twins, min 3:**
  - Smoobu 3064856: 226/230/212/214/216 = £1,098. Booking.com list at +10% = ceil(x 1.10) = **£1,210**.
  - Smoobu 3090701: £1,165.
  - From 19 Nov, Black Friday 30% (non-stacking) would show £847.00 on Booking.com, the same as the cancelled stay.
  - Booking.com display: NOT CHECKED (WAF).
  - Airbnb today (32 d, 4 adults): 3090701 £943.65 and 3064856 £889.38 room. Both are 0.900 x visible Long stay 10%, already above the cancelled £847.10.

**Booking.com since the 24 Oct markup cut** (`reservations.csv` 16 Nov, booked_on 24 Oct or later; P04 20-23 Nov triplicate counted once; room = basePrice incl. VAT). The same script reproduces yesterday's figures exactly.

| Measure | Bookings | Nights | Room £ | Commission £ | vs 15 Nov |
|---|---|---|---|---|---|
| Gross since cut | 24 | 99 | £17,520.78 | £3,571.78 | unchanged (no new Booking.com booking) |
| Still confirmed | **15** | 65 | £10,723.91 | £2,201.44 | -1 / -5 n / -£847.10 |
| Cancelled | **9** | 34 | £6,796.87 (**38.8%** of gross room) | £1,370.34 | +1 |
| Booked since +10% (12 Nov) | 4 gross, **3 confirmed** (P11 x2, P12) | 16 | £2,901.32 | £555.40 | P13 cancelled |
| Confirmed by flat | P04 2 / P11 5 / P12 6 / P13 **2** | 7 / 17 / 29 / 12 | £830.87 / £3,120.46 / £5,143.62 / £1,628.96 | | |

Pace over 22.74 days (24 Oct 13:38Z to 16 Nov 07:17Z) is **1.06 a day gross and 0.66 confirmed** (yesterday 1.10 / 0.74). There has been no new Booking.com booking in the last day.

### 3. Barking unsynced Airbnb 1455876748739910219, day 17: still selling sold nights

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 (card; cleaning not split) | Synced 1657859794156786222 (room) | Source (`live16/air/`) |
|---|---|---|---|---|
| 20-24 Nov | **booked** (Airbnb 162894484) | **bookable £741.40** (4 x £185.35; was £679.16) | not offered | p04_2024nov 07:18:58Z |
| 18-21 Nov | 18-19 open, 20 booked | **bookable £571.00** (includes booked 20 Nov) | not offered (20 Nov booked) | p04_1821nov 07:19:13Z |
| 6-19 Dec (13 n) | open £2,070 | bookable £2,275.22 after weekly £239.58 (unchanged) | £1,527.66 (gross £1,863 = 0.9 x Smoobu; weekly 18%) | p04_0619dec 07:19:23Z |

- **Yes, 20-24 Nov is still bookable on 1455.** The listing has a higher price today and still ignores the Smoobu calendar.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all dates now (at least 18-24 Nov), or unlist. Then map it to Smoobu 3562176.

### 4. P04 18-20 Nov 2-night sale: still live, and now set in PriceLabs

- Synced listing at 07:19:05Z: **2 nights £384.51 card, £242.51 room**. That is 0.726 of Smoobu 166/168 = £334, so 0.765 x a further 0.95 (not identified).
- **Cause found:** Reyhan added a PriceLabs DSO on Barking for **18-19 Nov, +10%, min stay 2** at 15 Nov 19:17:38Z (`get_user_logs`), pushed at 19:20Z. Smoobu now equals PriceLabs (166/168, min 2). The manual Smoobu 175/165 has been overwritten.
- **Conflict for Corentin to confirm:** this goes against the standing P04 rule "never open for fewer than 3 nights" (`listing_facts.P04.min_stay_rule`). I am not proposing a change. Corentin either keeps it as a deliberate orphan fill or asks for the DSO min stay to be set to 3.

### 5. Live checks: displayed vs expected

Expected = Smoobu x (1 + markup) x the discounts policy recognises:
- weekly 15% (7+ n)
- P13 Airbnb: last-minute 10% within 14 d, early bird 10% at 60+ d
- P20 Airbnb: last-minute 15% at 0-14 d
- Booking.com: list before promotions

Gap = displayed or paid / expected - 1, flagged above 3%. Cleaning is excluded everywhere.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed / paid room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P13 3090701 | Airbnb (booking) | 10-13 Dec (25) | 3 | £613 at booking | £613.00 | **paid £468.94** = 0.765 | -23.5% | FLAG | Smoobu 162911547 |
| P20 | Airbnb (booking) | 27 Dec-3 Jan, 7 n (42) | 4 | £2,774 at booking | £2,357.90 | **paid £1,803.78** = 0.9 x 0.85 x 0.85 | -23.5% | FLAG (extra 15% unidentified) | Smoobu 162920897 |
| P05 | Airbnb (booking) | 13-17 Feb (90) | 8 | £1,627 at booking | £1,627.00 | **paid £1,219.98** = 0.7498 (EB 12% + ~15%) | -25.0% | FLAG | Smoobu 162914560 |
| P04 synced | Airbnb | 18-20 Nov, 2 n (2) | 2 | £334 | £334.00 | £242.51 (£384.51) = 0.726 | -27.4% | FLAG + min-2 conflict | p04_1820nov 07:19:05Z |
| P04 unsynced 1455 | Airbnb | 20-24 Nov / 18-21 Nov | 2 | booked / partly booked | not for sale | £741.40 / £571.00 card | n/a | FLAG (double-sell) | p04_2024nov, p04_1821nov |
| P04 synced | Airbnb | 6-19 Dec, 13 n (20) | 2 | £2,070 | £1,759.50 | £1,527.66 = 0.9 x (1 - **0.18**) | -13.2% | FLAG | p04_0619dec 07:19:23Z |
| P13 3090701 / 3064856 | Airbnb | 18-23 Dec, 5 n (32) | 4 | £1,165 / £1,098 | same | £943.65 / £889.38 = 0.9 x visible Long stay 10% | -19.0% / -19.0% | FLAG | p13_1823dec 07:19:31Z |
| P13 | Airbnb | 10-13 Dec | 3 | booked | - | neither twin offered | - | ok | p13_1013dec 07:19:26Z |
| P20 | Airbnb | 20-23 Nov (4) | 2 | £856 (297/302/257) | £727.60 (LM15) | £654.83 (£804.83) = 0.765 | -10.0% | FLAG + delivery conflict | p20_2023nov 07:19:36Z |
| P20 | Airbnb | 4-11 Jan, 7 n (49) | 2 | £1,556 | £1,322.60 | £1,190.32 = 0.9 x visible Weekly 15% | -10.0% | FLAG | p20_0411jan_7n 07:19:49Z |
| P05 | Airbnb | 17-21 Feb (93) | 8 | £1,727 | £1,727.00 | £1,519.76 (Early booking -£207.24 = 12.0%) | -12.0% | FLAG (a-p05-earlybird) | p05_1721feb 07:19:53Z |
| P05 | Airbnb | 6-10 Feb (82) | 8 | £1,691 | £1,691.00 | £1,488.08 (Early booking -£202.92 = 12.0%) | -12.0% | FLAG | p05_0610feb 07:19:56Z |
| P13 | Booking.com | 18-23 Dec | 4 | £1,098 | £1,210 list | NOT CHECKED: AWS WAF 07:22:34Z | - | - | live16/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**Airbnb hidden layers (a-airbnb-rules), day 18: NOT fixed.**
- The tiers are unchanged: **0.765** up to 28 d, **0.900** at 29-59 d, **1.000** from 60 d.
- On 5+ and 7+ night stays the 0.85 is replaced by the visible LOS or weekly discount.
- Running cost **£3,966.66**.
- If the open cards above sell as they stand, the hidden tiers cost:
  - P04 18-20 Nov: £91.49
  - P20 20-23 Nov: £72.77
  - P20 4-11 Jan: £132.28
  - P13 18-23 Dec: £116.50 / £109.80
  - P04 6-19 Dec: £175.95
- Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list, and keep the visible discounts (`airbnb_visible_discounts`).

**Standing Airbnb items**

| Item | Status 16 Nov | Evidence |
|---|---|---|
| a-p05-earlybird: P05 Early booking 12% | Still on, and it applied on the new 90-d booking (£195.24) | -12.0% on the 6-10 Feb and 17-21 Feb cards |
| t-p05-los: P05 Long stay 10% (5+ n) | Not testable today. All new P05 checks were 4 n; yesterday -10.0% on 14-19 Jan | live15 p05_1419jan_5n |
| t-p04-weekly: P04 synced weekly 18% vs 15% | Not fixed | -£335.34 = 18.0% of £1,863; at 15% it would be £279.45, so **£55.89 over policy** |
| t-p13-los5: P13 LOS 5+ 10% | Still on, both twins | -£104.85 / -£98.82 on 18-23 Dec. Not in the 21 Oct changed rules; Corentin to confirm |
| t-p13-twins | **Worse**: 49 identical open nights in Smoobu (yesterday 45) | 13-15 Dec became identical (245/240/237) after Reyhan's copy-from-parent DSO on 3090701 for 10-26 Dec (19:12:34Z). This conflicts with `twin_listings` (keep prices slightly different); for Corentin to confirm |
| P06 extra 15% | Still unidentified, now also on P20 and P05 | See section 1. No P06 5-night run is open (16-17, 22-23, 29 Nov only) |

### 6. t-p20-delivery (this week), t-channel-gaps

- **t-p20-delivery: conflict for Corentin, and urgent.**
  - Smoobu blocks 18-19 Nov only. **20 Nov £297 and 21 Nov £302 (min 3) and 22 Nov £257 (min 2) are open**, against policy's 20-22 Nov delivery block (`listing_facts.P20.block_20_21_nov`).
  - Airbnb sells 20-23 Nov at £654.83 room (07:19:36Z). Arrival would be this Friday.
  - Min stay: 16-17 Nov is min 2 from Reyhan's DSO (15-17 Nov -2%, min 2, 19:16:17Z), and 22-24 Nov is min 2. Both go against policy min 3 until 30 Nov.
  - Either block 20-22 Nov in Smoobu, or Corentin updates policy.
- t-p20-5dec-orphan: 5 Dec £286, min 3, between bookings. Still unsellable.
- **t-channel-gaps (P11, Booking-only):**
  - 8 Dec is now **£308, min 1**, from Reyhan's DSO +50%, min 1 (18:48:33Z), so the 1-night orphan can now be sold.
  - 23 Dec £282, min 2. Target at least £320; not met.
  - 3 Jan £173, min 3. Target at least £204; not met.
  - Booking.com display: NOT CHECKED (WAF).
- t-smoobu-manual-1415: the manual Smoobu rates were overwritten by the 15 Nov evening push. P20 16-17 Nov went from 200/210 to 250/261, P04 18-19 Nov from 175/165 to 166/168, and P06 16-17 Nov from 222/233 to 264/268. All now equal PriceLabs `price`.

### 7. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+10%, confirmed) | £110.00 | £93.50 (15%); £90.20 at 18% booster |
| Booking.com P12 observed (7 n, 23 d; still confirmed) | £72.02 | £61.21; £51.01 ex-VAT |
| Airbnb model / live from 60 d | £100.00 | £84.50 |
| Airbnb live 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb 0.765 (up to 28 d; P13 booking) | £76.50 | £64.64 |
| **Airbnb P05 observed (0.7498, 90 d)** | **£74.98** | **£63.36** |
| **Airbnb P20 observed (0.650, 7 n, 42 d)** | **£65.03** | **£54.95** |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty, and the model ordering holds (direct £90 < Airbnb £100 < Booking £110; Booking nets £93.50 vs Airbnb £84.50).
- The observed prices break both rules. Every new Airbnb booking, every Airbnb card inside 60 d, and the observed Booking.com stays are below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 16 Nov), VAT-corrected.** Booking.com ADR x 1.2. 2 nights with a blank ref are dropped. Script `live16scripts/vat.py`; the unadjusted run reproduces the pack exactly. The leak compares to today's PriceLabs price, not the x1.10 list.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -23.4% (12 n) | **-11.6%** | Booking.com -4.6% (9 n); Airbnb -31.6% (3 n, the 0.765 stay now registered) |
| P11 | -38.0% (11 n) | **-25.6%** | all Booking.com |
| P12 | -37.1% (14 n) | **-24.6%** | all Booking.com |
| P13 | -42.4% (16 n) | **-36.5%** | Booking.com -42.7% (10 n); Airbnb -26.5% (6 n, includes 10-12 Dec) |

- Airbnb-only flats need no correction: P01 -36.5%, P05 -3.5%, P06 -41.0%, P09 -25.4%, P10 -19.7%, P20 -41.7%.
- The VAT effect today is 15.9 / 12.4 / 12.5 points on P04/P11/P12 Booking.com nights and 9.5 on P13, in or above the brief's 8-14.

### 8. Fees and min stay

- **Cleaning** on the new stays is P13 £150, P20 £150, P05 £195. All match the fees on record, and every synced card reconciles to Smoobu plus that fee.
- P04 Booking.com 161276416 still carries a £129 cleaning element. The Barking Booking.com fee is not on record (NOT CHECKED).
- **Min stay as displayed matches Smoobu:**
  - P04 18-20 Nov is offered as 2 nights (policy conflict, section 4).
  - P20 20-23 Nov at min 3. 22 Nov is min 2 (policy conflict).
  - P13 18-23 Dec and P05 at min 4 / min 3 as in Smoobu.
- On 1455, cleaning and min stay are NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers, day 18 (a-airbnb-rules), running cost £3,966.66** (+£909.96 today from P13 £144.06, P20 £554.12, P05 £211.78).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the unlisted last-minute and lead-time rules.
   - Then read the Airbnb reservation breakdowns for 162920897 / 162914560 / 162877292 to name the extra 15% that hits only the Flexible-test flats.
2. **Critical: P04 unsynced Airbnb 1455876748739910219, day 17.** It still sells the booked 20-24 Nov (£741.40) and 18-21 Nov (£571.00), and 6-19 Dec is open (£2,275.22).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all, or unlist. Then map it to Smoobu 3562176.
3. **High: t-p20-delivery, Corentin to confirm before Friday.** 20-22 Nov is open and on sale on Airbnb (£654.83 room for 20-23 Nov), against the policy delivery block.
   - Setting: Smoobu > Waterford Court > block 20-22 Nov, or update policy.
4. **High: P04 18-19 Nov min 2, a conflict with the standing rule.** It comes from Reyhan's PriceLabs DSO (+10%, min 2, 15 Nov 19:17Z) and is selling on Airbnb at 0.726 (£242.51 for 2 n).
   - For Corentin to confirm: keep it, or set PriceLabs > Barking > DSO 18-19 Nov min stay to 3.
5. **High: Booking.com cancellations 9 of 24 (38.8% of room) since the cut;** P13 18-23 Dec (£847.10) was cancelled 15 Nov 12:24.
   - 18-22 Dec is back on sale. Booking.com price NOT CHECKED. Airbnb already shows it above the cancelled rate.
6. **Medium: P05 visible Early booking 12%** (£195.24 on the new booking; -12% on the Feb cards).
   - Setting: Airbnb listing 1618929775762183214 > Pricing > Discounts (or Smoobu Airbnb rules). Corentin to keep or zero.
7. **Medium: P13 LOS 5+ 10% and twins identical on 49 nights** (13-15 Dec newly identical after the 19:12Z copy-from-parent DSO). Both are conflicts for Corentin.
   - Settings: Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+; PriceLabs DSO on 3090701 to keep a small gap.
8. **Medium: P04 synced weekly 18% vs 15%** (£55.89 over policy on 6-19 Dec).
   - Setting: Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.
9. **Medium: t-channel-gaps P11.** 23 Dec £282 (target at least £320) and 3 Jan £173 (target at least £204). 8 Dec is now fixed in practice (£308, min 1).

Closed or changed today:
- The manual Smoobu rates were overwritten by the push.
- P04 20-24 Nov and P13 10-12 Dec are registered in PriceLabs.
- The P13 Booking.com 0.7203 mystery closed with its cancellation.
- P11 8 Dec is now open as 1 night.

Data gaps:
1. Airbnb reservation price breakdowns for P20 162920897, P05 162914560 and P06 162877292 (the extra ~15%): NOT CHECKED (host app not accessible).
2. P05 rate at booking: £1,627 (Smoobu 07:20Z) vs PriceLabs `booked_price` £1,631, which fits to the penny. Whether a change happened between 07:20Z and 18:54 on the Smoobu side: UNKNOWN (Smoobu change history not read).
3. P20 rate at booking assumes Smoobu was unchanged from the 19:20Z push to 22:58. There was no PriceLabs log or refresh in between, but the Smoobu history was not read.
4. Booking.com live prices, promotions on the reopened P13 18-22 Dec, and same-date ordering: NOT CHECKED (AWS WAF, not circumvented).
5. Source of the 0.95 on the P04 18-20 Nov card: NOT CHECKED.
6. Listing 1455's reservations, cleaning and min stay: NOT CHECKED (not in Smoobu).
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
