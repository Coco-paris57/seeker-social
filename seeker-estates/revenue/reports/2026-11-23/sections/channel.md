## Channel parity

Run date D = 2026-11-23 (Monday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster;
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans (`booking_rate_plans`);
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments, 23 Nov-28 Feb, fetched **2026-11-23T07:19:38Z** (scratch `ch23/smoobu_rates23.json`).
- **Smoobu GET `/api/reservations`** (modifiedFrom 22 Nov, with cancellations): 7 records, plus GET price-elements for each. I kept amounts only and dropped guest fields and references (`ch23/smoobu_mod23.json`, `ch23/pe23.json`).
- **PriceLabs** (one call at a time):
  - `get_user_logs` (listing, 22-23 Nov) returns 15 entries, all Reyhan;
  - `get_pms_reservations` (bookings made 22-23 Nov) returns 5 records, which match Smoobu;
  - the raw `listing_data` file from the 22 and 23 Nov snapshots.
- **Live Airbnb:** 23 plain public airbnb.co.uk map searches (curl), every page read, 07:22:44Z-07:28:07Z.
  - URL, dates, guests and timestamp for each are in `ch23/air/*.json`.
  - I also read four room pages, P20, Scott Ellis Gardens, 1455 and P06, at 07:26:07Z-07:26:15Z (`ch23/pg/`).
  - `data/snapshots/2026-11-23/channel_checks.csv` was absent. I copied it forward from 22 Nov (247 lines) and **appended 21 rows** under `.channel_checks.csv.lock` (268 lines).
  - Room = first price line minus cleaning (P04 synced £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195), before taxes.
- **Booking.com live: NOT CHECKED.** One plain search (Barking, 17-20 Dec, 2 adults) at 07:29:39Z returned HTTP 202 with an AWS WAF challenge (`ch23/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are confirmed in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**
- **Clock:** Smoobu's created times and PriceLabs `booked_date` are UTC+1. For example, the P11 block was cancelled at 01:06:49 on the Smoobu clock and 00:06:50Z in PriceLabs. Below I give UTC.

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch23s/`.)

### 1. P04 Booking.com, 10-14 Dec: the first booking since +15%, and it does show the +15%

| Item | Value | Source |
|---|---|---|
| Stay | 4 nights, lead 18 d, made 22 Nov 21:54Z | Smoobu; PriceLabs `get_pms_reservations` |
| Room paid | **£488.35**, including VAT £81.39 (1/6). Ex-VAT £406.96, which is the PriceLabs `rental_revenue`. | Smoobu price-elements |
| Cleaning | **£129** (P04's Airbnb cleaning is £142) | Smoobu price-details |
| Commission | **£92.60 = 15.00% of £617.35** (room plus cleaning, so £19.35 of it is on cleaning). Barking has no booster, so nothing to flag. | Smoobu |
| Smoobu at booking | 141 / 148 / 150 / 141 = **£580**. P04 pushes were 21 Nov 09:45:42Z and then 23 Nov 00:15:15Z, after the booking. | `listing_data` 22 and 23 Nov; Smoobu 22 Nov 07:20Z |
| Paid per £100 Smoobu | **£84.20** (VAT incl.), or £70.17 ex-VAT. Net after 15% is **£71.57**. | |

**How the stack reconciles: within £0.08, not to the penny**
- Standard = ceil(Smoobu x 1.15) per night = 163 + 171 + 173 + 163 = **£670**. Paid / Standard = **0.7289**.
- Three 10% layers (0.729) give **£488.43, which is £0.08 off**. No combination of 0-4 layers from {Mobile 10%, Genius 10/15/20%, Last Minute 10/15%, Early Booker, Domestic, occupancy 5/10%, Black Friday 30%} on any plan reconciles to the penny on £580. The searches covered Standard, NR, Weekly, Monthly and NR Weekly, with per-night and whole-stay rounding (`ch23s/stack.py`).
- The 8p may come from a mid-day price set. P04's Airbnb listing shows such a set today (see §3), and PriceLabs `booked_price` reads 149 for 11 Dec, where Smoobu at 07:20Z read 148.
- **Most likely stack: Mobile 10% x Genius L1 10% x one of Non-refundable 10% or Last Minute 10%** (lead 18 d is inside the 30-day Last Minute).
  - There is no occupancy -5%. That fits the NR occupancy rule in policy (`non_refundable_rate`) at this party size.
  - It is not Weekly (4 nights).
  - It is not Monthly: 0.8 x 0.81 = 0.648 does not fit, so the 24 Oct Monthly-plan problem did not happen this time.
  - **Which plan and which promotions: NOT CHECKED** (no extranet breakdown).
- **Does it evidence +15%? Yes. This is the first booking that does.**
  - On the x1.10 list (£640), the same stack gives £466.56, which is £21.79 under what was paid.
  - No clean stack fits x1.10 (0.7631).
  - The P11 27-30 Nov stay (21 Nov section) did not show it.
- **Size of the stack (policy `booking_stacked_promotions`, size only): -27.1% off Standard = £181.65.**
  - Against the model of Smoobu x1.15 = £667, the gap is -£178.65 (-26.8%).
  - Against Smoobu, the room paid is **0.842x**. That is still under the Smoobu rate, but up from 0.74-0.77x on the last P11 stays.
- Same flat, same nights on Airbnb at the hidden 0.765 tier: £443.70 room, about £374.93 net. **Booking.com netted about £40 more on this stay.** The "Booking.com nets at least Airbnb" rule holds on observed prices.

**Running totals since the 24 Oct markup cut** (`reservations.csv` 23 Nov, booked_on 24 Oct or later; the P04 20-23 Nov triplicate is counted once; room is VAT incl.)

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **27** (was 26) | 111 | £19,388.61 | £3,936.78 |
| Still confirmed | **17** | 73 | £11,986.45 | £2,430.67 |
| Cancelled | **10** (unchanged) | 38 | £7,402.16 (38.2% of gross room) | £1,506.11 |
| Booked since +15% (18 Nov) | 2 / 2 | 7 | £1,027.08 | £216.39 |

- This verifies the Dispatcher's 27 / 17 / 10.
- Pace over 29.74 days (24 Oct 13:38Z to 23 Nov 07:19Z) is **0.91 a day gross and 0.57 confirmed** (yesterday 0.90 / 0.56).

**P11 Camden (Booking-only): two Smoobu block changes, one of them new**
- **Resolved: t-p11-block-2211.**
  - The 22-27 Nov "Blocked channel" record was cancelled at 00:06:49Z on 23 Nov (Smoobu; PriceLabs `cancelled_on` 00:06:50Z).
  - Fifteen seconds later, at 00:07:04Z, Reyhan added a DSO on 23-26 Nov setting min 2 (`get_user_logs`; also copied to the Vrbo copy).
  - Smoobu now shows 23-26 Nov open at 184 / 200 / 197 / 219, min 2. Booking.com display: NOT CHECKED (WAF).
- **New: Smoobu "Blocked channel" on P11 from 5 Jan 2027 to 31 Jul 2029.** It was created 22 Nov at about 11:18Z. Smoobu shows 5 and 6 Jan as unavailable.
  - This is not one of the policy's handbacks (P01/P08/P09/P10/P12) or intentional blocks.
  - It closes all of Camden's January-February inventory, the period for which the 18% booster was extended (policy 21 Oct).
  - Who set it and why: NOT CHECKED. **Corentin to confirm: is Camden being handed back from 5 Jan? If so, add it to `handbacks`; if not, remove it in Smoobu > Calendar > 3064196.**
- **t-channel-gaps (P11): Christmas has improved; 3 Jan is worse.**
  - 23 / 24 / 25 Dec are **£290 / £280 / £291** (yesterday £266 / £242 / £251; targets about £320 / £295 / £305).
  - 3 Jan is **£144** (yesterday £157; target about £195). 4 Jan is £155.
  - At +15%, the Standard rates would be £334 / £322 / £335 / £166, before promotions. Display: NOT CHECKED (WAF).

### 2. P06 Airbnb, two new stays: the hidden 0.765 tier is confirmed on P06, but the stays do not reconcile

| Stay | Made (lead) | Room paid | Cleaning | Commission | Smoobu 22 Nov 07:20Z | Paid / Smoobu |
|---|---|---|---|---|---|---|
| 29 Nov-2 Dec, 3 n | 22 Nov 18:24Z (7 d) | **£513.04** | £129 | £99.52 (15.5% of £642.04) | 286 + 271 + 304 = £861 | **0.5959** |
| 3-6 Dec, 3 n | 22 Nov 22:13Z (11 d) | **£768.82** | £129 | £139.16 (15.5% of £897.82) | 323 + 358 + 359 = £1,040 | **0.7393** |

- Smoobu price-elements show no stay discount: there is only basePrice, cleaning, commission and the usual "Cancellation Payout" label.
- P06's pushes were 21 Nov 09:45:40Z and then 23 Nov 00:11:32Z. There are no P06 PriceLabs edits on 22 Nov (`get_user_logs`).
- **Live check: P06's hidden tier is 0.765.** The 2-3 Dec orphan card (lead 9, 07:23:51Z) shows room **£266.98 = 0.765 x £349 exactly**, with no visible discount. £349 is today's Smoobu, including Reyhan's new +25% DSO (see below). This is the same Smoobu Airbnb lead-time rule as P04 and P20.
- **Neither stay reconciles to a clean stack on the 22 Nov prices** (`ch23s/p06fit.py`).
  - After the 0.765 tier, a further **22.1%** (29 Nov) and **3.4%** (3 Dec) is left unexplained. Neither is a standard layer.
  - Two possible fits on implied list prices: 29 Nov-2 Dec as 0.765 x 0.85 = 0.65025 on £789, and 3-6 Dec as 0.765 on £1,005. Both would need Smoobu to have been lower at booking than at 07:20Z. That is possible: P04's Airbnb listing shows a different mid-day price set today (§3).
  - PriceLabs `booked_price` cannot settle this. It changes from day to day (P06 28 Nov read 335 yesterday and 351 today), so it is not the price at booking.
  - Other possible causes: a host special offer, or a P06-specific rule within 7 days. **NOT CHECKED**: this needs the Airbnb reservation price breakdown.
- **a-airbnb-rules: the rule applies, so both stays are added as estimates.**
  - The amount the 0.765 tier took off whatever list was used is 0.3072 x paid: **£157.60 + £236.18 = £393.78**. This is the lower bound.
  - The full gap against the 22 Nov 07:20Z Smoobu is £347.96 + £271.18 = **£619.14**. This is the upper bound.
- **2 Dec orphan:** it is open as 1 night (min 1), from Reyhan's DSO on 2 Dec of **+25%, min 1**, set 00:11:07Z on 23 Nov. It sells at £266.98 room + £129 cleaning. P06 nights are not in the policy's intentional block for these dates (P06 was reopened). The DSO goes to the pricelabs section as confirm or revert.

### 3. 1455, day 24: it now also sells the new Booking.com nights

| Stay (2 adults) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch23/air/`) |
|---|---|---|---|---|
| 23-25 Nov | booked (guest in residence, 22-25 Nov) | **bookable £443.70** (same as yesterday) | not offered | p04_2325nov 07:22:44Z |
| 23-26 Nov / 27-30 Nov | booked | not offered | not offered | p04_2326nov, p04_2730nov |
| **10-14 Dec (sold on Booking.com yesterday)** | booked | **bookable £753.17** | not offered | p04_1014dec 07:22:53Z |
| **10-13 Dec** | booked | **bookable £600.94** | not offered | p04_1013dec 07:23:01Z |
| 17-20 Dec | open | **bookable £607.83** (static since 22 Nov) | offered, £338.89 room | p04_1720dec 07:23:09Z |
| 6-9 Dec | open | bookable £589.47 | offered, £362.60 room | p04_0609dec 07:23:27Z |
| 14-21 Dec | open | not offered | offered | p04_1421dec |

- The room page for 1455 is still live (07:26:12Z, `pg/p04u_room.html`).
- **Yes, still selling.** It sells two sets of booked nights: tonight's stay (23-25 Nov, 2 nights, below P04's 3-night rule) and the new Booking.com stay.
- At risk: £488.35 + £129 (Booking.com 10-14 Dec), the current 22-25 Nov stay, and relocation costs.
- Setting (unchanged): Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 23 Nov-5 Jan **now**, or unlist it. Then map it to Smoobu 3562176.

**New: the synced P04 Airbnb listing 1657859794156786222 is not on today's Smoobu prices.**
- Working back from the cards at the 0.765 / 0.9 tiers, the prices Airbnb has are 6-9 Dec **£474**, 17-20 Dec **£443** and 14-21 Dec **£1,006**.
- Smoobu at 07:20Z on 22 Nov was £454 / £442 / £1,002, and today at 07:19Z it is **£511 / £477 / £1,085**.
- So Airbnb still has neither the 23 Nov 00:15Z push nor exactly the 22 Nov morning set. P06, P20, P05, P13 and Scott Ellis cards all match today's Smoobu exactly.
- Cause NOT CHECKED (a Smoobu to Airbnb sync lag on this listing, or a P04-only rule).
- Setting: Smoobu > Channel Manager > Airbnb > 3562176 > check the sync log / resend prices.

### 4. Scott Ellis Gardens: the first reservation is on Airbnb at exactly 0.72x Smoobu

| Item | Value | Source |
|---|---|---|
| Stay | Airbnb, **21-26 Dec, 5 nights**, made 22 Nov 10:48Z (lead 29 d) | Smoobu; PriceLabs `get_pms_reservations` |
| Room / cleaning / commission | **£1,481.76** / £150 / £252.92 (**15.5%** of £1,631.76) | Smoobu price-elements |
| Smoobu at booking | 394 + 419 + 410 + 415 + 420 = **£2,058** (push 21 Nov 19:37Z; next push 23 Nov 00:20Z) | Smoobu 22 Nov 07:20Z |
| Fit | **£2,058 x 0.9 x 0.8 = £1,481.76 exactly.** That is the hidden 0.9 tier plus the 20% "Special offer". | `ch23s/p06fit.py` |
| Gap vs policy | Policy expects no discount for 5 nights, so the expected price is £2,058. **-£576.24 (-28.0%)**: £205.80 from the hidden tier and £370.44 from the Special offer. | |

- **Base price history** (`get_user_logs`, Reyhan): 425 → **475** at 22 Nov 09:18:27Z, then 475 → **450** at 23 Nov 00:17:37Z.
  - The Dispatcher's "425 → 450" missed the intermediate step.
  - The 475 was never pushed before the booking. The 0.72 fit is on the 21 Nov prices, and the next push was 00:20Z on 23 Nov.
- **Is the 20% Special offer still on? Yes, on all three checked cards (07:27:31Z-07:27:52Z). The room page still shows `isNewListing` true and 6 guests.**

| Stay (4 adults) | Lead | Smoobu | Line (room + £150) | Special offer | Room after | vs Smoobu |
|---|---|---|---|---|---|---|
| 9-12 Dec | 16 d | £1,195 | £1,225.50 | -£215.10 | £860.40 | -£334.60 (-28.0%) |
| 16-19 Dec | 23 d | £1,280 | £1,302.00 | -£230.40 | £921.60 | -£358.40 (-28.0%) |
| 6-9 Jan | 44 d | £974 | £1,026.60 | -£175.32 | £701.28 | -£272.72 (-28.0%) |
| 27-30 Dec | 34 d | £1,745 (27 Dec min 7) | not offered (matches min stay) | - | - | - |

- Smoobu is up 15-31% on these stays since yesterday (base 450 plus the overnight refresh), and the cards follow it at 0.72.
- On P20 the new-listing 20% ended after 3 reservations (`listing_facts.P20`). If the same happens here, this is 1 of 3.
- Net per £100 Smoobu is **£60.84**. The 15.5% commission is now confirmed from this booking.
- **a-airbnb-rules: add £205.80 (confirmed, from the exact fit).** The Special offer £370.44 is visible and separate (t-scott-ellis-2011). Corentin to keep it or end it.

### 5. a-airbnb-rules, P20 guests, P04 weekly, long stay, twins

**a-airbnb-rules: day 25, NOT fixed.**
- **£3,918.29 + £205.80 (Scott Ellis 21-26 Dec, exact) = £4,124.09 confirmed.**
- P06 adds £393.78 as an estimate (up to £619.14; §2).
- Including the earlier estimates (P20 £126.10, P04 £44.85): £4,089.24 + £205.80 + £393.78 = **£4,688.82**.

Tiers seen today:

| Tier | Where | Lead |
|---|---|---|
| 0.765 | P06 2-3 Dec | 9 d |
| 0.765 | P20 5-6 Dec | 12 d |
| 0.765 | P20 14-19 Dec | 21 d |
| 0.765 | P04 6-9 Dec and 17-20 Dec (on Airbnb's own price set) | 13-24 d |
| 0.900 | P04 14-21 Dec | 21 d |
| 0.900 | P13 14-19 Dec | 21 d |
| 0.900 | P13 3-8 Jan | 41 d |
| 0.900 | P05 5-10 Jan | 43 d |
| 0.900 | P20 26 Dec | 33 d |
| 0.900 | Scott Ellis (all) | 16-44 d |
| 1.000 | P05 13-17 Feb | 82 d |

- Setting (unchanged): Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time and last-minute rules behind 0.765 / 0.85 / 0.9 (now including 3288517 and 3588993), and keep the visible discounts.

**P20 guest count: day 5, not changed.**
- The room page shows **"6 guests"** (`personCapacity` 6, 4 occurrences; 07:26:07Z). Policy `listing_facts.P20.max_guests` is 4.
- New: the 26-27 Dec card is offered to **6 guests at £497.20 room against £457.20 for 2 guests (+£40, an extra-guest fee)**. The fee's threshold and source are NOT CHECKED.
- Corentin to confirm or revert. Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.
- P20 23-24 Nov is open at min 2 in Smoobu, against `listing_facts.P20.min_stay` of 3 nights to 30 Nov. It was not checked live today. 24-27 Nov is not offered (25-30 Nov booked).

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 14-21 Dec: -£162.98 = 18.0% of £905.40. At 15% it would be £135.81, so **£27.17 over policy**.
- The card is on Airbnb's own P04 price set (§3).

**Long stay 10% on 5 nights: still on.**
- P05 5-10 Jan: -£174.87 (10% of £1,748.70).
- P13 3-8 Jan: -£77.58 on each twin.
- P13 14-19 Dec: -£88.56 (3090701).
- It is not in policy; Corentin to keep or zero it.
- P05 13-17 Feb: the visible Early booking 12% is -£202.56 (a-p05-earlybird), and the card is £1,485.44.
- It did not apply to Scott Ellis 21-26 Dec (5 nights, 0.72 exact).

**t-p13-twins: unchanged. 66 of 68 jointly open nights are identical in Smoobu.**
- They differ only on 27 Nov (262 / 183) and 1 Dec (232 / 163).
- 3-8 Jan shows **£698.22 on both** twins.
- 14-19 Dec: only 3090701 appeared in the search (£797.04). 3064856 is open in Smoobu at the same £984 but was not offered. Why: NOT CHECKED.
- Reyhan's new P13 DSOs (`get_user_logs`, 23 Nov 00:07-00:08Z) were all copied from parent to 3090701, so they keep the twins identical:
  - 14-16 Dec -2% min 2;
  - 20-21 Dec min 2;
  - 2-31 Jan -8% min 3.
- This conflicts with `listing_facts.P13.twin_listings`. Setting: PriceLabs 3090701 > DSO about +3% on 23 Nov-28 Feb, set after any parent edit.

**Other Reyhan edits since 22 Nov 06:00Z** (for the pricelabs section; confirm or revert):
- P04 6-23 Dec -2% min 3 (00:14:34Z);
- P06 2 Dec +25% min 1;
- P11 23-26 Nov min 2;
- Scott Ellis base 475, then 450;
- the P13 DSOs above.

### 6. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup; the P20 last-minute 15% applies at 0-14 days; weekly 15% at 7+ nights). Booking.com expected = Standard = ceil(Smoobu x1.15), before promotions.

| Ref | Channel | Stay (lead) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P04 | Booking.com (booked) | 10-14 Dec, 4 n (18) | 5 | £580 | £670 Standard | **£488.35 paid** | -27.1% | size only (stack is policy); evidences +15% | Smoobu price-elements; PriceLabs `get_pms_reservations` |
| P06 | Airbnb (booked) | 29 Nov-2 Dec (7) | 3 | £861 | £861.00 | **£513.04 paid** | -40.4% | FLAG (0.765 tier + 22% unexplained) | Smoobu price-elements |
| P06 | Airbnb (booked) | 3-6 Dec (11) | 3 | £1,040 | £1,040.00 | **£768.82 paid** | -26.1% | FLAG (0.765 tier + 3.4% unexplained) | Smoobu price-elements |
| Scott Ellis 3588993 | Airbnb (booked) | 21-26 Dec, 5 n (29) | 5 | £2,058 | £2,058.00 | **£1,481.76 paid** | -28.0% | FLAG (0.9 x Special offer 20%) | Smoobu price-elements |
| P04 synced | Airbnb | 6-9 Dec (13) | 2 | £511 | £511.00 | £362.60 | -29.0% | FLAG (0.765 + Airbnb on an old price set) | p04_0609dec 07:23:27Z |
| P04 synced | Airbnb | 17-20 Dec (24) | 2 | £477 | £477.00 | £338.89 | -29.0% | FLAG | p04_1720dec 07:23:09Z |
| P04 synced | Airbnb | 14-21 Dec, 7 n (21) | 2 | £1,085 | £922.25 | £742.42 | -19.5% | FLAG (weekly 18%) | p04_1421dec 07:23:18Z |
| P04 unsynced 1455 | Airbnb | 23-25 Nov / 10-13 Dec / 10-14 Dec | 2 | booked | not for sale | £443.70 / £600.94 / £753.17 card | n/a | FLAG (double-sell) | p04_2325nov, p04_1013dec, p04_1014dec |
| P04 unsynced 1455 | Airbnb | 17-20 Dec / 6-9 Dec | 2 | £477 / £511 | n/a (unsynced copy) | £607.83 / £589.47 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_1720dec, p04_0609dec |
| P06 | Airbnb | 2-3 Dec, 1 n (9) | 2 | £349 | £349.00 | £266.98 | -23.5% | FLAG | p06_0203dec 07:23:51Z |
| P20 | Airbnb | 5-6 Dec (12) | 2 | £591 | £502.35 (LM 15%) | £452.11 | -10.0% | FLAG | p20_0506dec 07:25:07Z |
| P20 | Airbnb | 14-19 Dec, 5 n (21) | 2 | £1,561 | £1,561.00 | £1,194.16 | -23.5% | FLAG | p20_1419dec 07:25:16Z |
| P20 | Airbnb | 26-27 Dec (33) | 2 | £508 | £508.00 | £457.20 | -10.0% | FLAG | p20_2627dec 07:25:44Z |
| P20 | Airbnb | 26-27 Dec (33) | **6** | £508 | not for sale (max 4) | £497.20 (+£40) | - | FLAG (guests) | p20_2627dec6 07:25:58Z |
| P05 | Airbnb | 5-10 Jan, 5 n (43) | 6 | £1,943 | £1,943.00 | £1,573.83 | -19.0% | FLAG | p05_0510jan 07:26:01Z |
| P05 | Airbnb | 13-17 Feb, 4 n (82) | 6 | £1,688 | £1,688.00 | £1,485.44 | -12.0% (visible Early booking) | FLAG | p05_1317feb6 07:26:24Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (21) | 4 | £984 / £984 | same | not offered / £797.04 | - / -19.0% | FLAG | p13_1419dec 07:26:47Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (41) | 4 | £862 / £862 | same | £698.22 / £698.22 | -19.0% / -19.0% | FLAG + identical twins | p13_0308jan 07:27:05Z |
| Scott Ellis 3588993 | Airbnb | 9-12 Dec (16) | 4 | £1,195 | £1,195.00 | £860.40 | -28.0% | FLAG | se_0912dec 07:27:31Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (23) | 4 | £1,280 | £1,280.00 | £921.60 | -28.0% | FLAG | se_1619dec 07:27:41Z |
| Scott Ellis 3588993 | Airbnb | 6-9 Jan (44) | 4 | £974 | £974.00 | £701.28 | -28.0% | FLAG | se_0609jan 07:27:52Z |
| all | Booking.com live | - | - | - | e.g. P04 17-20 Dec Standard ceil(x1.15) | NOT CHECKED: AWS WAF 07:29:39Z | - | - | ch23/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| P05 5-10 Jan | £369.17 |
| P20 14-19 Dec | £366.84 |
| Scott Ellis 16-19 Dec | £358.40 |
| Scott Ellis 9-12 Dec | £334.60 |
| Scott Ellis 6-9 Jan | £272.72 |
| P05 13-17 Feb | £202.56 |
| P13 14-19 Dec | £186.96 |
| P04 14-21 Dec | £179.83 |

### 7. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed in policy) | £115.00 | £97.75 |
| **Booking.com observed, P04 10-14 Dec (15%)** | **£84.20** (VAT incl.) | **£71.57** |
| Booking.com observed, P11 27-30 Nov (A / B), 18% | £77.18 / £74.10 | £63.29 / £60.76 |
| Airbnb model / live at 82 d | £100.00 | £84.50 |
| Airbnb 0.900 | £90.00 | £76.05 |
| Airbnb 0.880 (P05 Early booking) | £88.00 | £74.36 |
| Airbnb 0.810 (0.9 x long stay) | £81.00 | £68.44 |
| Airbnb 0.765 (P04, P06, P20) | £76.50 | £64.64 |
| Airbnb 0.720 (Scott Ellis, confirmed 15.5%) | £72.00 | £60.84 |
| Airbnb 0.596 (P06 29 Nov-2 Dec paid) | £59.59 | £50.35 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- On observed prices, **Booking.com P04 (£71.57) now nets more than Airbnb at 0.765 (£64.64)**, and Scott Ellis and P06 net the least.
- Every observed Airbnb price inside 82 days is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 23 Nov; per property, the top-level field is null), VAT-corrected**
- Booking.com booked ADR in PriceLabs is ex-VAT, so Booking.com nights are multiplied by 1.2. The 3 nights with a blank ref (Scott Ellis) are dropped.
- The unadjusted run reproduces the pack (`ch23s/vat23.py`).
- The pack compares with today's PriceLabs price, which rose overnight on P04, P06, P11, P13, P20 and Scott Ellis. It does not compare with the price on the booking date, so today's gaps are wider than at booking.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -18.8% (11 n) | **-2.6%** | all Booking.com |
| P11 | -33.5% (11 n) | **-20.2%** | all Booking.com |
| P12 | -38.6% (12 n) | **-26.3%** | all Booking.com |
| P13 | -33.3% (11 n) | **-28.6%** | Booking.com -33.5% (5 n); Airbnb -24.9% (6 n) |

Airbnb-only flats need no correction: P01 -39.1%, P05 -12.3%, P06 -34.0%, P09 -21.6%, P20 -40.1%.

### 8. Fees and min stay

**Cleaning**
- The new stays carry P06 £129 (both), Scott Ellis £150 (confirmed by the reservation) and **P04 Booking.com £129**, against £142 on P04 Airbnb. The P04 Booking.com amount is not in policy, and Smoobu's per-channel fee is NOT CHECKED.
- Synced cards reconcile with P04 £142, P06 £129, P13/P20/Scott Ellis £150 and P05 £195.

**Min stay as displayed matches Smoobu**
- Scott Ellis 27-30 Dec is not offered (27 Dec min 7).
- P06 2 Dec is sold as 1 night (min 1, DSO).
- P13 3-8 Jan is sold as 5 nights.
- **1455 sells 23-25 Nov as 2 nights** while P04's rule is min 3.
- Booking.com plan minimums: NOT CHECKED (WAF).

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 25. £4,124.09 confirmed (+£205.80, Scott Ellis 21-26 Dec, exact 0.9 x 0.8); £4,688.82 including estimates (P06 +£393.78, up to £619.14).**
   - P06's tier is confirmed live at 0.765. The two P06 stays paid 0.60x / 0.74x of Smoobu, and that does not reconcile (NOT CHECKED: Airbnb breakdown).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment (incl. 3288517, 3588993) > Default pricing rules. Remove the lead-time and last-minute rules; keep the visible discounts.
2. **Critical: unsynced 1455, day 24.** It now sells the **just-booked Booking.com nights 10-14 Dec (£753.17) and 10-13 Dec (£600.94)**, as well as tonight's 23-25 Nov stay (£443.70, 2 nights) and the open 17-20 Dec (£607.83) and 6-9 Dec (£589.47).
   - At risk: £617.35 (Booking.com, incl. cleaning) and the current stay, plus relocation.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 23 Nov-5 Jan now, or unlist. Then map it to 3562176.
3. **High: Scott Ellis Gardens on Airbnb at 0.72x.** The first booking is 21-26 Dec at £1,481.76 against Smoobu £2,058 (-£576.24). The 20% Special offer is still on every card (-£272 to -£358 per 3-night card).
   - Corentin to confirm the offer is wanted (new-listing promotion; if it ends after 3 bookings as on P20, this is 1 of 3).
   - Setting: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.
   - Reyhan's base changes 425 → 475 → 450 also go to Corentin as confirm or revert.
4. **High: P11 Camden blocked in Smoobu from 5 Jan 2027 to 31 Jul 2029** (new "Blocked channel" record, created 22 Nov about 11:18Z; not in policy). This is all of Camden's January-February inventory, during the extended 18% booster.
   - Corentin to confirm a handback (then add it to `handbacks`), or remove it in Smoobu > Calendar > 3064196.
   - The 22-27 Nov block is gone (cancelled 00:06:49Z), and 23-26 Nov is now open at min 2 (Reyhan DSO).
5. **High: Booking.com, the first evidence that +15% reaches Booking.com.** P04 10-14 Dec paid £488.35, which is £84.20 per £100 Smoobu (net £71.57).
   - That is within £0.08 of ceil(x1.15) £670 x three 10% layers (Mobile x Genius L1 x NR or Last Minute). At x1.10 it would have been £466.56.
   - Commission is 15.0%. The stack is 27.1% (£181.65), size only.
   - Totals: 27 gross / 17 confirmed / 10 cancelled; confirmed pace 0.57 a day.
   - Still needed from the extranet: this reservation's rate plan and promotions, and the Standard Rate calendar screenshot.
6. **Medium: the synced P04 Airbnb listing is on a stale price set** (£474 / £443 / £1,006 against Smoobu now £511 / £477 / £1,085, about -7%). Setting: Smoobu > Channel Manager > Airbnb > 3562176: check the sync and resend prices.
7. **High (Corentin, confirm or revert):**
   - P20 shows 6 guests (day 5) and now prices 6 guests (+£40 on 26 Dec), against policy max 4.
   - P20 23-24 Nov is min 2 against policy min 3.
   - Reyhan's new DSOs: P04 6-23 Dec -2%, P06 2 Dec +25% min 1, P13 Jan -8% / 14-16 Dec -2% (copied to the twin), P11 23-26 Nov min 2.
8. **High: P04 Airbnb weekly 18%** (14-21 Dec, -£162.98, £27.17 over policy) and **long stay 10% on 5 nights** (P05 -£174.87, P13 -£77.58 / -£88.56).
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%, Long stay 0%.
   - P05 Early booking 12% is -£202.56.
9. **Medium: P13 twins.** 66 of 68 nights are identical, and 3-8 Jan is identical on both (£698.22). Reyhan's new DSOs were copied to the twin. Setting: PriceLabs 3090701 DSO about +3%.
   - t-channel-gaps: P11 3 Jan is £144 against a target of about £195 (worse); Christmas £290 / £280 / £291 is improving.

Data gaps:
1. Booking.com live prices, derived-plan display, plan minimum stays, same-date ordering, and whether Scott Ellis is on Booking.com: NOT CHECKED (AWS WAF 07:29:39Z, not circumvented).
2. The P04 Booking.com rate plan and promotions (the fit is £0.08 short), and the exact Smoobu prices at 21:54Z on 22 Nov: NOT CHECKED. A mid-day price set is possible.
3. Why the P06 stays paid 0.60x / 0.74x (a special offer, an intermediate price set, or a 7-day rule): NOT CHECKED (no Airbnb breakdown).
4. Who created the P11 5 Jan 2027-31 Jul 2029 block, and why: NOT CHECKED.
5. Why the synced P04 Airbnb listing is not on today's Smoobu prices: NOT CHECKED.
6. Source and threshold of the P20 and P05 extra-guest fees; the source of the Scott Ellis Special offer: NOT CHECKED.
7. P13 3064856 not offered for 14-19 Dec although open: NOT CHECKED.
8. 1455 cleaning fee and minimum stay: NOT CHECKED.
9. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
