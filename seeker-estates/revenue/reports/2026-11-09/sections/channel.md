## Channel parity

Run date D = 2026-11-09 (Monday, GMT). I read `data/policy.json` first. This section does not re-raise anything policy settles: the 15%/20% stay discounts, Booking.com promotion stacking (sizes only), the Visibility Booster, P13 as one flat, the P02/P03/P06/P07 blocks, P14, and the deprioritised P09 Airbnb-rules memo.

**Sources (all read-only)**
- **Smoobu GET**
  - `/api/rates` for 12 apartments at **2026-11-09T07:19:31Z**: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09/smoobu_rates09.json`. Yesterday's rates (8 Nov 07:17:50Z): `.../scratchpad/live08/smoobu_rates08.json`.
  - `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:19:32Z: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09/smoobu_mod09_pe.json`. No guest fields were saved.
- **Reservations diff.** `reservations.csv` 9 Nov vs 8 Nov has exactly one new row and no cancellations: P05 Airbnb 15–21 Dec.
- **PriceLabs**
  - `get_user_logs` (listing, 8–9 Nov): 8 entries, all by Reyhan, 8 Nov 12:38:36–12:41:48Z. These are P11 −5% on 10 Nov–18 Dec (min 2); P13 3064856 −5% on 10–20 Dec (min 2), copied to 3090701 and the Vrbo copy; P20 −5% on 13–17 and 20–24 Nov (min 2); P04 −5% on 9–24 Nov (min 3). Nothing touches P05.
  - `get_listing_date_overrides` 3166592 (P05).
  - Raw `data/snapshots/2026-11-0{8,9}/raw/prices_3166592.json`.
  - `kpi_pack.json` 9 Nov (`settings.last_push`, `rate_leak_next_30`, `channel_economics`).
- **Live Airbnb.** 23 plain public airbnb.co.uk map searches (curl, no workarounds), 07:21:02Z–07:23:11Z.
  - Files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09/air/` (`log.txt` plus one JSON per search; each holds the URL, dates, guests and timestamp).
  - **28 rows appended under lock to `data/snapshots/2026-11-09/channel_checks.csv`**, after copying the file forward from 8 Nov (703 → 731 lines).
  - "Room" means the card total before taxes minus cleaning. Cleaning used: P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129.
- **Booking.com: NOT CHECKED (live).** One plain search (Shepherd's Bush, 10–13 Dec, 4 adults) at 07:24:13Z returned HTTP 202 with an AWS WAF challenge (`live09/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row).
- **Config status.** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% (`rm/config.py` CHANNELS) are still unconfirmed defaults** until Corentin confirms them.

### 1. P05 9 Nov (tonight): NOT fixed, tenth check; unsold at 07:21Z

| Source | 9 Nov |
|---|---|
| PriceLabs DSO 3166592 | **+300%, min 1** (updated 30 Oct 22:09:42Z) |
| Smoobu 07:19:31Z | **£1,403, open, min 1** (yesterday £1,378) |
| Airbnb card, 7 and 2 adults (`p05_0910nov_1n` 07:21:02Z, `_a2` 07:21:05Z) | "1 night × £547.00", **"Special offer" −£70.40**, total £476.60. Room = **£281.60** (0.201 of Smoobu) |

- **Change since yesterday.** The pre-offer room went from £316.80 to £352.00, which is £316.80 / 0.9. So the 0.9 hidden layer fell away at lead 0. The 20% Special offer is still applied (£70.40 = 20% of £352).
- **Did it sell? Not as of 07:21Z.** The card is still bookable, and Smoobu has no reservation for P05 on 9 Nov. A same-day sale later today can only be seen in tomorrow's diff.
- **If it sells: −£1,121.40** against Smoobu (£1,403 − £281.60).
- The +300% DSO is a deterrent price. The Airbnb custom price and Special offer override it.

### 2. P05 Airbnb 15–21 Dec, £2,962.17: price at booking and layers

Smoobu 162753757:
- Created **8 Nov 21:42**, 6 nights, lead 37 d, 6 adults.
- Room **£2,962.17**, cleaning £195, commission **£489.36 = 15.5% of £3,157.17**.
- Airbnb price details: NOT CHECKED.

**On sale at booking: £3,657** (569 + 576 + 604 + 613 + 650 + 645). Three sources agree:
- Smoobu at 07:19:31Z today.
- 9 Nov raw `prices_3166592` `price` (refreshed 8 Nov 12:39:52Z, before the booking).
- `kpi_pack` `last_push` 2026-11-08T08:53:20Z, with no later push.

Reyhan's 7 Nov −2% DSO (13–19 Dec, updated 12:30:56Z) is inside the 15–19 Dec figures. Before the 08:53Z push, Smoobu held £3,700 (8 Nov 07:17:50Z).

**Paid ÷ on sale = 0.8100** (£2,962.17 / £3,657 = 0.81 exactly), made of two layers:
1. **Hidden 0.9**, which applies to nights 29–59 days out (see §3).
2. **A visible Airbnb "Long stay discount" of 10%** on P05. It shows today on a 6-night card: 11–17 Jan, £234.50 = 10.0% of £2,345 (`p05_1117jan_6n` 07:21:19Z).

£3,657 × 0.9 × 0.9 = **£2,962.17** (to the penny).

**Policy expectation.** A 6-night stay gets no stay discount; the 15% weekly discount starts at 7 nights. So the expected price is £3,657.
- **Shortfall: −£694.83 (−19.0%).** This splits into the hidden layer (£365.70) and the visible 10% long-stay discount (£329.13).
- The P05 long-stay rule is not in policy. Whether it starts at 5 or 6 nights is NOT CHECKED (only a 6-night card was seen).

**Market context**
- Paid **£493.70 a night**; on sale £609.50.
- PriceLabs 4-BR Nearby Listings (`market.csv` 8 Nov, last P05 row): P25 £461, P50 £575, **P75 £720**. So the paid rate sits between P25 and P50.
- 8 Nov comps (`comps.csv`) for 13–20 Dec stays: £453–1,083 a night, median about £980. **The sale was about 50% under the comp median.**

**a-airbnb-rules running cost: £1,668.28 + £694.83 = £2,363.11.**
- Of this, £365.70 is the hidden layer and £329.13 the visible P05 long-stay discount.
- The P09 memo is still excluded. Including it would give £2,502.42.
- **18 Oct base-rise tally:** P05 is in it, so this booking adds **+6 n / +£2,962.17**. By yesterday's method that gives +13 n / +£5,123.51 like-for-like (+17 n / +£5,980.30 incl. P06). The occupancy section owns the method.

### 3. Live Airbnb: displayed vs expected (hidden layers, day 11)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises: weekly 15%, plus for P13 last-minute 10% within 14 d and early bird 10% at 60+ d. Gap = displayed room ÷ expected − 1. Flag if over 3%.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live09/air/`, 9 Nov) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 9–12 Nov (0) | 2 | £442 | £442.00 | £375.70 (£517.70) = 0.850 | −15.0% | FLAG | p04_0912nov 07:21:25Z |
| P04 synced | Airbnb | 10–13 Nov (1) | 2 | £450 | £450.00 | £344.24 (£486.24) = 0.765 | −23.5% | FLAG | p04_1013nov 07:21:32Z |
| P04 synced | Airbnb | 6–19 Dec, 13 n (27) | 2 | £2,599 | £2,209.15 | £1,918.08 = 0.9 × (1 − **0.18** weekly, £421.02) | −13.2% | FLAG | p04_0619dec 07:21:42Z |
| P04 unsynced 1455 | Airbnb | 9–12 Nov (0) | 2 | open | not for sale on this listing | **bookable, £539.00** card (cleaning unknown) | n/a | FLAG (double-sell) | p04_0912nov 07:21:25Z |
| P05 | Airbnb | **9–10 Nov (0)** | 7 and 2 | **£1,403** | £1,403.00 | £352.00 − Special offer £70.40 = **£281.60** | **−79.9%** | FLAG | p05_0910nov_1n(_a2) |
| P05 | Airbnb | 16–18 Nov (7) | 7 | £762 | £762.00 | £582.93 (£777.93) = 0.765 | −23.5% | FLAG | p05_1618nov 07:21:08Z |
| P05 | Airbnb | 29 Nov–3 Dec (20) | 7 | £2,073 | £2,073.00 | £1,585.83 = 0.765 | −23.5% | FLAG | p05_2903dec_4n 07:21:10Z |
| P05 | Airbnb | 7–9 Dec (28/29) | 7 | £913 | £913.00 | £759.06 = 464 × 0.765 + 449 × 0.9 | −16.9% | FLAG | p05_0709dec 07:21:13Z |
| P05 | Airbnb | 8–11 Jan (60) | 7 | £1,218 | £1,218.00 | £1,071.84 (visible **"Early booking discount" £146.16 = 12.0%**) | −12.0% | FLAG (visible, not in policy) | p05_0811jan 07:21:16Z |
| P05 | Airbnb | 11–17 Jan, 6 n (63) | 6 | £2,345 | £2,345.00 | £2,110.50 (visible **"Long stay discount" £234.50 = 10.0%**) | −10.0% | FLAG (visible, not in policy) | p05_1117jan_6n 07:21:19Z |
| P06 | Airbnb | 15–17 Nov (6) | 3 | £498 | £498.00 | £380.96 (£509.96) = 0.765 | −23.5% | FLAG | p06_1517nov 07:21:54Z |
| P09 | Airbnb | 11–12 Nov, 1 n | 2 | blocked (162726554) | not sellable | not offered | — | ok | p09_1112nov_1n 07:22:01Z |
| P09 | Airbnb | 12–13 Nov, 1 n | 2 | £126 open, min 2 | not sellable (min 2) | not offered | — | orphan (see §6) | p09_1213nov_1n 07:21:59Z |
| P12 | Airbnb | 17–20 Nov (8) | 2 | £785 | £785.00 | £600.52 (£750.52) = 0.765 | −23.5% | FLAG | p12_1720nov 07:22:07Z |
| P12 | Airbnb | 7–10 Dec (28–30) | 2 | £882 | £882.00 | £755.19 = 286 × 0.765 + (291 + 305) × 0.9 | −14.4% | FLAG | p12_0710dec 07:22:12Z |
| P13 3090701 / 3064856 | Airbnb | 9–12 Nov (0) | 4 | £489 / £520 | £440.10 / £468.00 (LM10) | £415.65 / £442.00 = 0.850 | −5.6% | FLAG | p13_0911nov 07:22:14Z |
| P13 3090701 / 3064856 | Airbnb | 10–13 Dec (31) | 4 | £697 / £658 | same | £627.30 / £592.20 = 0.900 | −10.0% | FLAG | p13_1013dec 07:22:17Z |
| P13 3090701 / 3064856 | Airbnb | 10–15 Dec, 5 n (31) | 4 | £1,119 / £1,056 | same | £906.39 / £855.36 = 0.9 × visible "Long stay discount" 10% (£100.71 / £95.04) | −19.0% | FLAG (10% visible, confirm) | p13_1015dec_5n 07:22:22Z |
| P13 3090701 / 3064856 | Airbnb | 10–13 Jan (62) | 4 | **£556 / £556** | £500.40 (EB10) | **£500.40 / £500.40** (visible "Early booking discount" £55.60) | 0.0% | ok on price; **twins identical** | p13_1013jan 07:22:30Z |
| P20 | Airbnb | 20–23 Nov (11) | 2 | £720 | £720.00 | £550.79 (£700.79) = 0.765 | −23.5% | FLAG (and t-p20-delivery) | p20_2023nov 07:22:35Z |
| P20 | Airbnb | 14–17 Dec (35) | 2 | £822 | £822.00 | £739.80 = 0.900 | −10.0% | FLAG | p20_1417dec 07:22:44Z |
| P20 | Airbnb | 8–11 Jan (60) | 2 | £700 | £700.00 | £700.00 = 1.000 | 0.0% | ok | p20_0811jan 07:22:57Z |
| P20 | Airbnb | 8–15 Jan, 7 n (60) | 2 | £1,631 | £1,386.35 | £1,386.35 = 1.0 × weekly 0.85 | 0.0% | ok | p20_0815jan_7n 07:23:11Z |
| all | Booking.com displayed | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:24:13Z | — | — | live09/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Hidden layers: unchanged, day 11. a-airbnb-rules is NOT fixed.** Today's cards narrow down where each band starts and ends.
- **The layer is applied per night, by each night's lead time.**
  - Nights up to **28 d** out get **0.765**.
  - Nights **29–59 d** out get **0.900**.
  - Nights **60 d+** out get **1.000**, or the visible early-booking discount.
  - Two mixed-lead stays fit this to the penny: P05 7–9 Dec (night 28 d at 0.765, night 29 d at 0.9) and P12 7–10 Dec.
- **Same-day check-in (lead 0): the whole stay is 0.850.** This was seen on P04 9–12 Nov and both P13 twins 9–12 Nov.
- **P04's 13-night stay is all at 0.9** (no 0.765 on 6–7 Dec) before the 18% weekly discount. P04's synced listing is on a different host account, so its rules may differ.
- **Bookings keep taking more than the cards show.**
  - P05 15–21 Dec: 0.9 × LOS 0.9.
  - P20 6–14 Dec: 0.765 × 0.85.
  - P09 7–11 Nov: 0.85 × 0.85.

**Standing items**
- **P05 12% early booking: still on** (£146.16 = 12.0% of £1,218 on 8–11 Jan, 60 d). a-p05-earlybird is NOT fixed.
- **New: P05 visible 10% "Long stay discount"** on a 6-night stay. This is the second layer on the 15–21 Dec booking.
  - It does not combine with early booking. The 11–17 Jan card (63 d) shows only the long-stay discount.
- **P04 weekly 18% vs 15%: NOT fixed.** £421.02 = 18.0% of £2,339.10, which is **£70.17 more** than policy on 6–19 Dec.
- **P13 visible 10% LOS 5+: still on** on both twins (10–15 Dec: £100.71 / £95.04). Corentin to confirm it is intended (21 Oct listing-B rule).
- **P13 twins**
  - **November: no longer identical.** Smoobu has 3090701 about 6% under 3064856 (9 Nov £160 vs £170; 17 Nov £197 vs £209). Yesterday the twins were identical on 8–12 and 17 Nov. The cards differ too (£566 vs £592 on 9–12 Nov).
  - **January: still identical** on all 32 open nights, 8 Jan–8 Feb (Smoobu). The 10–13 Jan cards are identical (£706.00 / £650.40).
  - Policy `listing_facts.P13.twin_listings` says the listings must keep slightly different prices. This stays a **conflict for Corentin to confirm**. Reyhan's 8 Nov 10–20 Dec −5% was again copied from parent to child; December still differs.
- **P04 unsynced 1455876748739910219: still selling, day 10** (§4).

### 4. Barking (P04): unsynced Airbnb 1455876748739910219, day 10

The in-residence guest (Smoobu 161888271, 6–9 Nov) left today. From 9 Nov, Smoobu 3562176 is open at £143/149/150… (min 3). Smoobu has no new P04 reservation.

| Stay (2 adults) | Smoobu | Unsynced 1455 | Synced 1657859794156786222 | Source (`live09/air/`) |
|---|---|---|---|---|
| 9–12 Nov | open, £442 | **bookable, £539.00** | £517.70 card = £375.70 room (0.85) | p04_0912nov 07:21:25Z |
| 10–13 Nov | open, £450 | **bookable, £557.40** | £486.24 card = £344.24 room (0.765) | p04_1013nov 07:21:32Z |
| 6–19 Dec (13 n) | open, £2,599 | **bookable**, £2,514.80 − weekly £239.58 = £2,275.22 | £2,481.10 − weekly £421.02 = £2,060.08 | p04_0619dec 07:21:42Z |

- **Still selling: yes, tenth day.** Every night it sells is also open on the synced listing and on Booking.com, so any booking on 1455 is a double booking.
- **Booking on 1455: none visible for 9–13 Nov or 6–19 Dec.** All the cards were bookable at 07:21–07:22Z. 1455's own reservation list is outside Smoobu: NOT CHECKED.
- 1455's price is still frozen (£179.67–185.80 a night, the same totals as yesterday).
- **t-p04-doublebook: NOT fixed.**

### 5. Booking.com since the 24 Oct markup cut (+30% → +15%, 13:38Z; 15.7 days to 07:19Z)

**Change since yesterday: none.** There are no new Booking.com bookings and no cancellations (`reservations.csv` diff; Smoobu modifiedFrom list).

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **18** | **67** | **£12,048.73** | £15,010 | **0.803** |
| Still confirmed | **14** | **54** | **£9,016.80** | £11,598 | **0.777** |
| Net of all cancellations (incl. pre-cut cancellations, 25 n / £5,051.37) | | **+29 n** | **+£3,965.43** | | |

- Pace: **1.14 bookings a day gross, 0.89 a day confirmed**, against about 0.33 a day before the cut. This is the first zero day since the cut.
- Last Minute 10% started the same day as the cut, so the rise cannot be credited to the cut alone.
- The figures are carried from the 8 Nov section; nothing changed.

**`rate_leak_next_30` (kpi_pack 9 Nov) with the VAT correction**
- PriceLabs ADR on Booking.com nights excludes VAT, so I multiply them by 1.2.
- My unadjusted figures reproduce the pack exactly (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09scripts/vat.py`, using `reservations.csv` and `prices.csv` 9 Nov–8 Dec).

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights, adjusted | Airbnb nights |
|---|---|---|---|---|
| P11 | −18.6% | **−2.3%** | 8 n | — |
| P04 | −31.6% | −17.9% | 11 n | — |
| P12 | −32.4% | −21.3% | 10 n, −20.6% | 2 n, −25.3% |
| P13 | −42.9% | −37.4% | 9 n, −40.8% | 6 n, −33.2% |

- Airbnb-only flats need no VAT change: P01 −37.9%, P05 −3.6%, P06 −35.8%, P08 −41.4%, P09 −32.1%, P10 −26.4%, P20 −45.1%.
- The new P05 15–21 Dec booking falls outside the 30-day window.
- The gaps include the policy stay discounts and the hidden Airbnb layers. The pack's `rate_leak_after_los` removes the stay discounts.

### 6. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com since cut, confirmed (0.777) | £77.70 | ~£62–66 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.0 (nights 60+ d) | £100.00 | £84.50 |
| Airbnb live 0.900 (nights 29–59 d) | £90.00 | £76.05 |
| Airbnb live 0.850 (same-day stays) | £85.00 | £71.83 |
| Airbnb live 0.765 (nights 1–28 d) | £76.50 | £64.64 |
| **Airbnb P05 15–21 Dec (0.81, 15.5%)** | £81.00 | **£68.45** |
| Airbnb P20 6–14 Dec (0.6502) | £65.02 | £54.94 |
| Airbnb P05 9 Nov if sold (0.201) | £20.07 | £16.96 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb sells at £76.50–90 inside 60 days, and Booking.com as sold at £76–78.
- **Booking.com as sold nets about £62–66, below the Airbnb model (£84.50).**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 7. Fees, min stay, pushes and plan items

- **Cleaning** matches on every card: P05 £195 on the new booking, the same as the Smoobu priceElements. Airbnb commission is 15.5% of room + cleaning, so the £195 cleaning carries £30.23 on 162753757.
- **t-cleaning-commission: no new Booking.com booking, so unchanged.** Running list: P12 £22.50, P11 £26.82, P13 £30.00 per booking. Corentin's call.
- **t-p20-delivery: NOT resolved.**
  - Smoobu 18–19 Nov is still blocked; 20–24 Nov is open at £239/246/235/244/333, min 2. Airbnb sells 20–23 Nov (£700.79 card).
  - Reyhan's 8 Nov 12:40–12:41Z DSOs re-applied **min stay 2** with −5% on 13–17 and 20–24 Nov.
  - This still conflicts with `listing_facts.P20.min_stay` (3 nights to 30 Nov) and with the policy delivery block of 20–22 Nov. **Corentin to confirm both.**
- **t-channel-gaps (P11): NOT fixed.**
  - 23 Dec is **£281** (unchanged; target ≥ £320), min 2.
  - 3 Jan is **£174** (yesterday £178; target ≥ £204), min 3.
  - Reyhan's new P11 −5% runs 10 Nov–18 Dec, so it does not cover these nights. Booking.com visibility is NOT CHECKED (WAF).
- **P09 11–12 Nov:** Smoobu block 162726554 (11 Nov) is still in place; its reason is NOT CHECKED. 12 Nov is a 1-night orphan (£126, min 2) and Airbnb offers neither night. **t-p09-1112block: NOT fixed.**
- **P20 5 Dec orphan:** £281, min 3, still unsellable.
- **Push freshness** (`kpi_pack` `settings.last_push`)
  - Every flat sold on Airbnb or Booking.com was pushed on 8 Nov: P09 07:56Z, P06 08:00Z, P05/P12 08:53Z, P08 08:53Z, P11/P13/P20/P04 12:40–12:42Z.
  - None had pushed again by the pack time on 9 Nov. P01/P02/P03/P07/P10/P14 pushed between 00:24 and 05:28Z.
  - At 07:19Z Smoobu matches the 9 Nov raw PriceLabs price on every P05 night checked.
- **Min stay as displayed matches Smoobu:** P05 9 Nov min 1; P04 min 3; P13 5-night stays allowed; P09 11 and 12 Nov not offered.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers, day 11.** Per night: 0.765 for nights up to 28 d, 0.9 for 29–59 d; whole stay 0.85 on same-day check-ins.
   - New booking P05 15–21 Dec lost **−£694.83** against policy (£365.70 hidden, £329.13 visible P05 long-stay 10%). **Cumulative £2,363.11.**
   - **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules: remove the last-minute and booked-within rules that are not in policy, and keep visible discounts only (`airbnb_visible_discounts`).
   - For P05 also: Airbnb > Abbey Rd listing 1618929775762183214 > Pricing > Discounts > Length-of-stay: remove the 5/6-night 10%, or Corentin confirms it.
2. **High: P05 9 Nov (tonight) still sells on Airbnb at £281.60 room against Smoobu £1,403.** Tenth check; unsold at 07:21Z. **−£1,121.40 if it sells today.**
   - **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom nightly price and the Special offer, or block the night.
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 10.** Bookable on 9–13 Nov and 6–19 Dec, all of it open synced inventory. No booking visible on it. Any booking is a double booking.
   - **Setting:** Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all nights (or snooze or unlist the listing). Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176.
4. **Medium: P05 visible 12% early booking** (£146.16 on 8–11 Jan). Not in policy.
   - **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird.
5. **Medium: P04 synced weekly 18% vs 15%** (£70.17 on 6–19 Dec).
   - **Setting:** Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
6. **Medium: P13 visible 5-night "Long stay discount" 10%** (£100.71 on 10–15 Dec). Confirm it is intended (Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+).
7. **Medium: P11 23 Dec £281 / 3 Jan £174 vs targets £320 / £204** (t-channel-gaps). Set via PriceLabs 3064196 DSO.
8. **Medium: orphans unsellable on min stay.**
   - P09 12 Nov (£126, min 2).
   - P20 5 Dec (£281, min 3).
   - **Setting:** PriceLabs DSO min stay 1 on those dates (owner: pricelabs section).
9. **Question: t-cleaning-commission.** £22.50–£30.00 per Booking.com booking. Accept or challenge in Booking.com extranet > Finance.
10. **Conflicts for Corentin (Reyhan's edits vs policy), not new proposals:**
    - P13 twins identical in January. November now differs.
    - P20 min 2 on 13–17 and 20–24 Nov vs policy min 3, and the 18–19 Nov block vs the 20–22 Nov block in policy (t-p20-delivery).
    - P04 −5% on 9–24 Nov (8 Nov) replaces Corentin's 24 Oct −8% on 1–25 Nov (pricelabs section to confirm the effect).

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:24:13Z; not circumvented).
2. Airbnb's internal price breakdown for P05 162753757 (the 0.9 × 0.9), P20 162719002 and P09 162720486: NOT CHECKED.
3. Whether P05 9 Nov sells after 07:21Z today: NOT CHECKED. It will show in tomorrow's Smoobu diff.
4. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). Its cards show 9–13 Nov and 6–19 Dec unbooked at 07:21Z.
5. P05 long-stay discount threshold (5+ or 6+ nights) and its interaction with early booking: only one 6-night card was seen.
6. The reason for P09 block 162726554 (11 Nov): NOT CHECKED.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct −10% are unconfirmed defaults.
8. Market percentiles: `kpi_pack` `market_percentiles` is null and `market.csv` 9 Nov does not exist yet. The P05 P25/P50/P75 come from the 8 Nov file (cleaning inclusion unknown).
9. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT. Booking.com PriceLabs-at-booking totals are carried from earlier sections.
