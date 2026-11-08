## Channel parity

Run date D = 2026-11-08 (Sunday, GMT). I read `data/policy.json` first. This section does not re-raise anything policy settles: the 15%/20% stay discounts, Booking.com promotion stacking (sizes only), the Visibility Booster (P11, and P13 check-ins 21 Oct–20 Dec), P13 as one flat, the P02/P03/P06/P07 blocks, P14, and the deprioritised items (`airbnb_rules_p09`: the P09 figures are a memo only).

**Sources (all read-only)**
- **Smoobu GET**
  - `/api/rates` for 12 apartments at **2026-11-08T07:17:50Z**: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live08/smoobu_rates08.json`.
  - `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:17:52Z: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live08/smoobu_mod08_pe.json`. No guest fields were saved.
  - Yesterday's rates for comparison: `.../scratchpad/live07/smoobu_rates07.json` (7 Nov 07:19:09Z).
- **Reservations diff.** `reservations.csv` 8 Nov vs 7 Nov has exactly 3 new rows and no cancellations: P09 Airbnb 7–11 Nov, P13 Booking.com 7–10 Dec, P20 Airbnb 6–14 Dec.
- **PriceLabs**
  - `get_user_logs` (listing, 6–8 Nov): 25 entries, all by Reyhan, 7 Nov 12:27:39–12:33:52Z. None after that.
  - `get_listing_date_overrides` 3064856.
  - Raw `data/snapshots/2026-11-0{7,8}/raw/prices_{3318172,3547481,3064856,3090701}.json`.
  - `listings.csv` (`last_push`).
- **Live Airbnb.** 21 plain public airbnb.co.uk map searches (curl, no workarounds), 07:20:17Z–07:22:23Z.
  - Files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live08/air/` (`log.txt` plus one JSON per search; each holds the URL, dates, guests and timestamp).
  - **26 rows appended under lock to `data/snapshots/2026-11-08/channel_checks.csv`**, after copying the file forward from 7 Nov (now 658 lines).
  - "Room" means the card total before taxes minus cleaning. Cleaning used: P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129. Every ratio fits to the penny.
- **Booking.com: NOT CHECKED (live).** One plain search (Shepherd's Bush, 10–13 Dec, 4 adults) at 07:22:54Z returned HTTP 202 with an AWS WAF challenge (`live08/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row).
- **Config status.** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% (`rm/config.py` CHANNELS) are still unconfirmed defaults** until Corentin confirms them.

### 1. Barking (P04): unsynced Airbnb 1455876748739910219 still sells (day 9)

Smoobu 3562176 has Airbnb 161888271 (6–9 Nov) in residence. 8 Nov is booked; from 9 Nov the nights are open at £148/152/152, min 3. Smoobu has no new P04 reservation.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 | Synced 1657859794156786222 | Source (`live08/air/`) |
|---|---|---|---|---|
| **8–11 Nov** | 8 booked, 9–10 open | **bookable, 3 × £173.00 = £519.00** | not offered (correct) | p04_0811nov 07:20:17Z |
| 9–12 Nov | open, £452 | bookable, £539.00 | £487.78 card = £345.78 room (0.765) | p04_0912nov 07:20:24Z |
| 10–13 Nov | open, £458 | bookable, £557.40 | £492.37 card = £350.37 room (0.765) | p04_1013nov 07:20:30Z |
| 6–19 Dec (13 n) | open, £2,602 | £2,514.80 − weekly £239.58 = £2,275.22 | £2,483.80 − weekly £421.53 = £2,062.27 | p04_0619dec 07:20:39Z |

- **Still selling: yes, ninth day.** 1455 sells tonight (8 Nov), the in-residence guest's last night.
- From 9 Nov every night 1455 sells is also open on the synced listing and on Booking.com, so any booking on 1455 is a double booking.
- **Booking on 1455: none visible.** All three November cards were bookable at 07:20Z, so no guest holds 8–12 Nov on 1455. 1455's own reservation list is outside Smoobu: NOT CHECKED.
- 1455's price is still frozen (£173–186 a night against Smoobu's £148–154).
- **t-p04-doublebook: NOT fixed.**

### 2. New bookings (7 Nov): paid vs price on sale at booking

Smoobu fields only; no guest data was used. "On sale" means the Smoobu rate after the last PriceLabs push before the booking was created (Smoobu clock, GMT).

| Smoobu id | Ref | Stay (lead) | Created | Party | Room | Cleaning | Commission | On sale at booking | Paid ÷ on sale | Layers (fit) |
|---|---|---|---|---|---|---|---|---|---|---|
| 162720486 | P09 3318172 | 7–11 Nov, 4 n (0 d) | 7 Nov 13:23 | 1 | **£362.69** | £125 | £75.59 (15.5% of £487.69) | **£502** (154+119+115+114) | **0.7225** | 0.85 × 0.85 → £362.70 (1p) |
| 162719002 | P20 3547481 | 6–14 Dec, 8 n (29 d) | 7 Nov 12:03 | 4 | **£1,494.25** | £150 | £254.86 (15.5% of £1,644.25) | **£2,298** (293+306+277+281+273+288+295+285) | **0.6502** | 0.765 × weekly 0.85 → £1,494.27 (2p) |
| 162720431 | **P13 3064856** | 7–10 Dec, 3 n (30 d) | 7 Nov 13:20 | 6 | **£485.20** (VAT incl., VAT £80.87 = 1/6) | £150 | **£127.04 = 20.0% of £635.20 (room + cleaning)** | **£636** (252+193+191) | **0.763** (list 0.663) | see below |

**P09 7–11 Nov (handback nights; P09 handback is 26 Nov)**
- The P09 push was at 7 Nov 08:16:19Z (`listings.csv`), before creation at 13:23. Smoobu today holds 7 Nov £154 (07:19Z yesterday it was £132) and 8–10 Nov £119/115/114. The 8 Nov raw `booked_price` for 9–10 Nov is 115/114.
- Against the pre-push £466 (132/113/110/111) the ratio would be 0.778. That fits no layer combination, so £502 is taken as the price on sale.
- **Layers: 0.85 × 0.85 = 0.7225** on a same-day booking. It is not the 0.765 seen at lead 1–14 days. No stay discount applies to 4 nights.
- Shortfall against Smoobu: **−£139.31**. P09's Airbnb rules are deprioritised (`airbnb_rules_p09`), so this is a **memo and is not added to a-airbnb-rules**.
- For the 18 Oct base-rise tally (P09 is in it): **+4 n / +£362.69**, sold at 0.7225 of the post-rise price.
- Smoobu also shows a new "Blocked channel" block 162726554 on P09 for 11–12 Nov, created 7 Nov 18:37. Its reason is NOT CHECKED (owner: occupancy/pricelabs).

**P20 6–14 Dec (8 n, 29 d lead)**
- Booked at 12:03, before the 12:33:57Z push (Reyhan's edits). The last push before booking was 7 Nov 01:30:12Z. The Smoobu rates at 07:19Z, the 7 Nov raw `price` and the 8 Nov raw `booked_price` all give £2,298.
- Policy expects weekly 15% only: £2,298 × 0.85 = **£1,953.30**. Paid **£1,494.25 = −£459.05 (−23.5%)**.
- Fit: hidden 0.765 × visible "Weekly stay discount" 0.85 = 0.65025, which gives £1,494.27. Equivalent forms are 0.85 × 0.765 and 0.9 × 0.7225.
- Live 7-night cards at a similar lead showed 0.9 × weekly only (0.765 overall; 10–17 Dec at 33 d, yesterday). This booking took **one extra 0.85**, the same pattern as the 19–26 Dec booking (0.85 × 0.85).
- Lead is 29 days, next to the original Smoobu "last-minute −15% within 28 days" rule (policy `airbnb_smoobu_settings_21oct`). Airbnb's breakdown is NOT CHECKED: it needs Airbnb > Reservations > 162694102 / 162719002 > price details.
- **P20 5 Dec is now a 1-night orphan** between 25 Nov–5 Dec and 6–14 Dec. Smoobu has it at £279, min 3, available; PriceLabs flags it `unbookable=1` (279 < user_price 332). It cannot sell on min 3.

**P13 7–10 Dec, Booking.com: which listing, stack, commission**
- **Listing: Smoobu 3064856** ("Top-Floor 2Bed with Private Terrace in W12", Smoobu reservation `apartment.id`). The 8 Nov raw `prices_3064856` shows 7–9 Dec Booked, `booked_date` 7 Nov, ADR £134.78 = £485.20 / 1.2 / 3, which confirms PriceLabs strips VAT. 3090701 shows the nights unavailable because they are linked (one flat, policy).
- **On sale at booking: £636** (252/193/191).
  - The 3064856 push was at 7 Nov 12:30:42Z, after Reyhan's 12:30 edits and before creation at 13:20. Smoobu today holds 252/193/191, equal to the 8 Nov raw `price`.
  - PriceLabs `booked_price` reads 240/193/191 (£624); this differs only on 7 Dec. Before the push (07:19Z) Smoobu held 195/194/191 (£580).
  - The −7% DSO on 7–9 Dec (updated 5 Nov 10:55Z) is inside all three figures. Reyhan's 12:30 change moved 10–20 Dec from −7% to −2%; it does not touch this stay.
- **Discount stack.**
  - Expected per model: £636 × 1.15 = **£731.40** list; no stay discount applies to 3 nights.
  - Paid £485.20 = **0.663 of list, −£246.20 (−33.7%)**.
  - There is no exact fit. Promotions on record (policy `booking_promotions_p13_21oct` and 24 Oct monitoring) are Mobile 10%, Last Minute 15% (0–30 d; lead was exactly 30 d), Last Minute 10% (within 30 d, added 24 Oct), Genius L1 10%, NR −10%, and Booster. Early Booker, Domestic and EEA have been off since 21 Oct. Black Friday is not bookable until 19 Nov.
  - Against £731.40, the closest fit is four 10% layers (0.6561), £479.87 (paid +1.1%). Against the pre-push £580, three 10% layers (0.729) give £486.24 (−0.2%).
  - Smoobu's notice flags Genius. The guest count is 6, so there is no occupancy reduction.
  - The extranet reservation breakdown is NOT CHECKED. This is size only; stacking is settled.
- **Commission basis: 20.0% of room + cleaning** (£127.04 / £635.20). This matches the other P13 Booking.com bookings (12–16 Oct and 18–27 Nov, both 20.0%).
  - P13's Visibility Booster covers check-ins 21 Oct–20 Dec, so 20% is expected and not flagged.
  - Commission on the £150 cleaning is **£30.00** (t-cleaning-commission).

**a-airbnb-rules running cost (realised, vs policy expectation)**
- £1,209.23 (to 6 Nov) + **£459.05 (P20 6–14 Dec)** = **£1,668.28 cumulative**.
- The P09 memo (−£139.31, deprioritised) is excluded. Including it would give £1,807.59.

### 3. Live Airbnb: displayed vs expected (hidden layers, day 10)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises: weekly 15% everywhere; P13 last-minute 10% within 14 d and early bird 10% at 60+ d. Gap = displayed room ÷ expected − 1. Flag if over 3%.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live08/air/`, 8 Nov) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 9–12 Nov (1) | 2 | £452 | £452.00 | £345.78 (£487.78) = 0.765 | −23.5% | FLAG | p04_0912nov 07:20:24Z |
| P04 synced | Airbnb | 10–13 Nov (2) | 2 | £458 | £458.00 | £350.37 (£492.37) = 0.765 | −23.5% | FLAG | p04_1013nov 07:20:30Z |
| P04 synced | Airbnb | 6–19 Dec, 13 n (28) | 2 | £2,602 | £2,211.70 | £1,920.27 = 0.9 × (1 − **0.18**) | −13.2% | FLAG | p04_0619dec 07:20:39Z |
| P04 unsynced 1455 | Airbnb | 8–11 Nov (0) | 2 | 8 Nov booked | not for sale | £519.00 card (cleaning unknown) | n/a | FLAG (double-sell) | p04_0811nov 07:20:17Z |
| P05 | Airbnb | **9–10 Nov (1)** | 7 and 2 | **£1,378** (min 1, open) | £1,378.00 | £511.80 − **"Special offer" £63.36** → room **£253.44** (0.184) | **−81.6%** | FLAG | p05_0910nov_1n 07:20:41Z, _a2 07:20:42Z |
| P05 | Airbnb | 16–18 Nov (8) | 7 | £756 | £756.00 | £578.33 (£773.33) = 0.765 | −23.5% | FLAG | p05_1618nov 07:20:44Z |
| P05 | Airbnb | 7–10 Jan (60) | 7 | £1,233 | £1,233.00 | £1,085.04 (visible **"Early booking discount" £147.96 = 12.0%**) | −12.0% | FLAG (visible, not in policy) | p05_0710jan 07:20:46Z |
| P06 | Airbnb | 15–17 Nov (7) | 3 | £529 | £529.00 | £404.68 (£533.68) = 0.765 | −23.5% | FLAG | p06_1517nov 07:21:07Z |
| P09 | Airbnb | 12–14 Nov | 2 | 13 Nov booked | not sellable | not offered | — | ok | p09_1113nov 07:21:12Z |
| P12 | Airbnb | 17–20 Nov (9) | 2 | £788 | £788.00 | £602.82 (£752.82) = 0.765 | −23.5% | FLAG | p12_1720nov 07:21:16Z |
| P12 | Airbnb | 8–11 Dec (30) | 2 | £900 | £900.00 | £810.00 (£960.00) = 0.900 | −10.0% | FLAG | p12_0710dec 07:21:21Z |
| P13 3090701 / 3064856 | Airbnb | 9–12 Nov (1) | 4 | £519 / **£519** | £467.10 (LM10) | £397.02 / £397.02 = 0.765 | −15.0% | FLAG (twins identical) | p13_0911nov 07:21:25Z |
| P13 3090701 / 3064856 | Airbnb | 10–13 Dec (32) | 4 | £716 / £677 | same | £644.40 / £609.30 = 0.900 | −10.0% | FLAG | p13_0912dec 07:21:27Z |
| P13 3090701 / 3064856 | Airbnb | 10–15 Dec, 5 n (32) | 4 | £1,150 / £1,087 | same | £931.50 / £880.47 = 0.9 × visible "Long stay discount" 10% | −19.0% | FLAG (10% visible, confirm) | p13_1015dec_5n 07:21:31Z |
| P13 3090701 / 3064856 | Airbnb | 20–25 Dec, 5 n (42) | 4 | £1,148 / £1,086 | same | £929.88 / £879.66 = 0.81 | −19.0% | FLAG | p13_2025dec 07:21:35Z |
| P20 | Airbnb | 20–23 Nov (12) | 2 | £756 | £756.00 | £578.33 (£728.33) = 0.765 | −23.5% | FLAG (and t-p20-delivery) | p20_2023nov 07:21:40Z |
| P20 | Airbnb | 14–17 Dec (36) | 2 | £879 | £879.00 | £791.10 = 0.900 | −10.0% | FLAG | p20_1417dec 07:21:49Z |
| P20 | Airbnb | 8–11 Jan (61) | 2 | £704 | £704.00 | £704.00 = 1.000 | 0.0% | ok | p20_0811jan 07:22:00Z |
| P20 | Airbnb | 8–15 Jan, 7 n (61) | 2 | £1,647 | £1,399.95 | £1,399.95 = 1.0 × weekly 0.85 | 0.0% | ok | p20_0815jan_7n 07:22:10Z |
| P20 | Airbnb | 14–21 Dec, 7 n | 2 | 19 Dec booked | — | not offered | — | NOT CHECKED (not sellable) | p20_1421dec_7n 07:22:23Z |
| all | Booking.com displayed | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:22:54Z | — | — | live08/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Hidden layers: unchanged, day 10. a-airbnb-rules is NOT fixed.**
- **0.765 at lead 1–14 d** on every synced listing checked: P04, P05, P06, P12, P13, P20.
- **0.900 at 28–42 d.**
- **1.000 at 60–61 d.** Yesterday 57 d still showed 0.9, so the 0.9 band ends at about 60 d.
- Bookings take more than the cards show: P20 0.765 × 0.85 at 29 d, and P09 0.85 × 0.85 same-day (§2).

**Standing items**
- **P05 9 Nov: NOT fixed (ninth check; the night is tomorrow).**
  - The card is unchanged since 31 Oct: £316.80 − 20% Special offer = £253.44 room. Smoobu holds £1,378 at min 1.
  - **−£1,124.56 if it sells.**
- **P05 12% early booking: still on** (£147.96 = 12.0% of £1,233, 7–10 Jan, 60 d). a-p05-earlybird is NOT fixed.
- **P04 weekly 18% vs 15%: NOT fixed.** £421.53 = 18.0% of £2,341.80, which is **£70.25 more** than policy on 6–19 Dec.
- **P13 visible 10% LOS 5+: still on** on both twins (£103.50 on 10–15 Dec; £103.32 / £97.74 on 20–25 Dec). Corentin to confirm it is intended (21 Oct listing-B rule).
- **P13 twins now identical on 8–12 and 17 Nov.** Smoobu 3064856 = 3090701 on 6 open nights (yesterday none in November).
  - Cause: Reyhan's 7 Nov 12:30 −5% was written to 3064856 and copied to 3090701 as a child ("Copied from parent listing").
  - Policy `listing_facts.P13.twin_listings` says the two Airbnb listings must keep slightly different prices. This is a **conflict for Corentin to confirm**, not a new proposal. January was already identical yesterday.

### 4. Booking.com since the 24 Oct markup cut (+30% → +15%, 13:38Z; 14.7 days to 07:17Z)

**Change since yesterday: +1 booking** (P13 3064856, 7–10 Dec, created 7 Nov 13:20). No Booking.com cancellations.

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **18** (17 + 1) | **67** | **£12,048.73** | £15,010 | **0.803** |
| Still confirmed | **14** | **54** | **£9,016.80** | £11,598 | **0.777** |
| Net of all cancellations (incl. pre-cut cancellations, 25 n / £5,051.37) | | **+29 n** | **+£3,965.43** | | |

- Pace: **1.22 bookings a day gross, 0.95 a day confirmed**, against about 0.33 a day before the cut. Last Minute 10% started the same day as the cut, so the rise cannot be credited to the cut alone.
- PriceLabs-at-booking values are carried from the 30 Oct–7 Nov sections; P13 is added at £636.

**`rate_leak_next_30` (kpi_pack 8 Nov) with the VAT correction**
- PriceLabs ADR on Booking.com nights excludes VAT, so I multiply them by 1.2.
- My unadjusted figures reproduce the pack exactly (`.../scratchpad/live08scripts/vat.py`, using `reservations.csv` and `prices.csv` 8 Nov–7 Dec).

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights, adjusted | Airbnb nights |
|---|---|---|---|---|
| P11 | −20.0% | **−4.0%** | 9 n | — |
| P04 | −31.0% | −17.2% | 11 n | — |
| P12 | −34.2% | −23.3% | 11 n, −23.2% | 2 n, −23.7% |
| P13 | −41.2% | −36.0% | 8 n, −41.3% | 6 n, −30.0% |

- Airbnb-only flats need no VAT change: P01 −38.3%, P05 −4.2%, P06 −28.3%, P08 −39.4%, P09 −31.5%, P10 −27.2%, P20 −40.2%.
- The new P13 7–10 Dec and P20 6–14 Dec bookings fall outside the 30-day window. P09 9–10 Nov is inside it.
- The gaps include the policy stay discounts and the hidden Airbnb layers. The pack's `rate_leak_after_los` removes the stay discounts.

### 5. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com since cut, confirmed (0.777) | £77.70 | ~£62–66 |
| Booking.com P13 7–10 Dec (0.763, 20% commission) | £76.29 | **£61.03** |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.0 (60+ d) | £100.00 | £84.50 |
| Airbnb live 0.900 (28–42 d) | £90.00 | £76.05 |
| Airbnb live 0.765 (1–14 d) | £76.50 | £64.64 |
| Airbnb P09 7–11 Nov (0.7225) | £72.25 | £61.05 |
| Airbnb P20 6–14 Dec (0.6502) | £65.02 | **£54.94** |
| Airbnb P05 9 Nov if sold (0.184) | £18.39 | £15.54 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb sells at £65–90 inside 60 days, and Booking.com as sold at £76–78.
- **Booking.com as sold nets about £61–66, below the Airbnb model (£84.50).**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 6. Fees, min stay and plan items

- **Cleaning** matches on every card (Smoobu priceElements).
  - Airbnb commission is 15.5% of room + cleaning on both new Airbnb bookings. Cleaning share: £19.38 on P09 and £23.25 on P20.
- **t-cleaning-commission: one more instance.** P13 Booking.com commission includes **£30.00 on the £150 cleaning** (20%). Running list: P12 £22.50, P11 £26.82, P13 £30.00 per booking. Unchanged; Corentin's call.
- **t-p20-delivery: NOT resolved.**
  - Smoobu 18–19 Nov is still blocked. 20–24 Nov is open at £252/257/247/333/333, and Airbnb sells 20–23 Nov (£728.33 card).
  - Reyhan's 7 Nov 12:32–12:33Z DSOs set **min stay 2** on 7–9, 13–17 and 20–24 Nov (Smoobu now min 2 on 13–24 Nov).
  - This conflicts with `listing_facts.P20.min_stay` ("3 nights from 25 Oct to 30 Nov") and leaves `policy.json` saying the delivery block is 20–22 Nov. **Corentin to confirm both.**
- **t-channel-gaps (P11): worse, NOT fixed.**
  - 23 Dec is **£281** (yesterday £305; target ≥ £320), min 2.
  - 3 Jan is **£178** (yesterday £188; target ≥ £204), min 3.
  - Reyhan's P11 −2% runs 10 Nov–18 Dec, so it does not cover these nights. The fall comes from PriceLabs' own recalculation (owner: pricelabs section).
  - Booking.com visibility is NOT CHECKED (WAF).
- **P20 5 Dec 1-night orphan:** min 3 at £279, unbookable (§2).
- **Min stay as displayed matches Smoobu:** P05 9 Nov min 1; P04 min 3; P13 5-night stays allowed; P09 12–14 Nov not offered (13 Nov booked).

### Issues ordered by £ impact

1. **High: P05 9 Nov (tomorrow) sells on Airbnb at £253.44 room against Smoobu £1,378.** Ninth check. **−£1,124.56 if it sells tonight.**
   **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom nightly price and the Special offer, or block the night.
2. **Critical: hidden Airbnb layers (0.765 at 1–14 d, 0.900 at 28–42 d), day 10.** Bookings are taking an extra 0.85 on top. Today's P20 6–14 Dec booking lost **−£459.05** against policy; **cumulative £1,668.28**. The P09 memo (−£139.31) is excluded as deprioritised.
   **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules: remove the last-minute and booked-within rules that are not in policy, and keep visible discounts only (`airbnb_visible_discounts`).
   Then pull Airbnb > Reservations > 162719002 and 162694102 > price details to identify the second 0.85.
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 9.** It sells tonight (8 Nov) over in-residence guest 161888271, and every night from 9 Nov overlaps synced inventory. No booking on it yet. £355.72 room plus relocation at risk on the current stay, and any future booking is a double booking.
   **Setting:** Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all nights (or snooze or unlist the listing). Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176.
4. **Medium (size only): P13 Booking.com 7–10 Dec paid £485.20, −£246.20 (−33.7%) under the £731.40 model.** Commission is 20% under the Booster (expected).
   **Setting to check:** Booking.com extranet (Shepherd's Bush) > Promotions: confirm that Last Minute 15% (0–30 d) and Last Minute 10% (within 30 d) are not both live. Reservation detail > price breakdown.
5. **Medium: P20 5 Dec orphan night, £279, unsellable at min 3.**
   **Setting:** PriceLabs 3547481 > DSO 5 Dec min stay 1, or the orphan-gap min-stay rule (owner: pricelabs section).
6. **Medium: P05 visible 12% early booking** (£147.96 on 7–10 Jan). Not in policy.
   **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird.
7. **Medium: P13 visible 5-night "Long stay discount" 10%** (£103.50 on 10–15 Dec). Confirm it is intended (Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+).
8. **Medium: P04 synced weekly 18% vs 15%** (£70.25 on 6–19 Dec).
   **Setting:** Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
9. **Medium: P11 23 Dec £281 / 3 Jan £178 vs targets £320 / £204** (t-channel-gaps; worse than yesterday). Set via PriceLabs 3064196 DSO.
10. **Question: t-cleaning-commission.** £22.50–£30.00 per Booking.com booking. Accept or challenge in Booking.com extranet > Finance.
11. **Conflicts for Corentin (Reyhan's 7 Nov edits vs policy), not new proposals:**
    - P13 twins identical on 8–12 and 17 Nov.
    - P20 min 2 on 7–24 Nov vs policy min 3, and the delivery block is 18–19 Nov vs 20–22 Nov in policy (t-p20-delivery).
    - P04 −3% on 9–24 Nov replaces Corentin's 24 Oct −8% on 1–25 Nov (pricelabs section to confirm the effect).

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:22:54Z; not circumvented). The P13 7–10 Dec stack does not decompose exactly; it needs the extranet reservation breakdown.
2. Airbnb's internal breakdown of P20 162719002 and 162694102, and P09 162720486 (the extra 0.85): NOT CHECKED.
3. The exact Smoobu rate live at P09 13:23 and P13 13:20: inferred from the last push before creation and today's Smoobu values. PriceLabs `booked_price` differs on P13 7 Dec (£240 vs £252).
4. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). Its cards show 8–12 Nov unbooked at 07:20Z.
5. The reason for P09 block 162726554 (11–12 Nov, created 7 Nov 18:37): NOT CHECKED.
6. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct −10% are unconfirmed defaults.
7. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT; the P13 ADR (£134.78 = £485.20 / 1.2 / 3) confirms it for that booking. Booking.com PriceLabs-at-booking totals are carried from earlier sections.
