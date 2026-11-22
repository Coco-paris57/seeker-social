## Channel parity

Run date D = 2026-11-22 (Sunday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster;
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans;
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments (now including 3588993 Scott Ellis Gardens), 22 Nov-28 Feb, fetched **2026-11-22T07:20:28Z** (scratch `ch22/smoobu_rates22.json`).
- **Smoobu GET `/api/reservations`** (modifiedFrom 21 Nov, with cancellations): 6 records, plus GET price-elements. I kept amounts only and dropped guest fields and references (`ch22/smoobu_mod22.json`, `ch22/pe22.json`).
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` for bookings made 21-22 Nov returns 1 record: the cancelled P04 17-20 Dec stay.
  - `get_user_logs` for 21-22 Nov returns 10 entries, all on Scott Ellis Gardens 3588993.
  - The raw `listing_data` and `prices_*` files from the 22 Nov snapshot.
- **Live Airbnb:** 23 plain public airbnb.co.uk map searches (curl), every page read, 07:22:24Z-07:27:06Z.
  - URL, dates, guests and timestamp for each are in `ch22/air/*.json`.
  - I also read two room pages: P20 at 07:27:52Z and Scott Ellis Gardens at 07:27:55Z (`ch22/pg/`).
  - `data/snapshots/2026-11-22/channel_checks.csv` was absent. I copied it forward from 21 Nov (198 lines) and **appended 25 rows** under `.channel_checks.csv.lock` (223 lines).
  - Room = first price line minus cleaning (P04 synced £142, P13/P20/Scott Ellis £150, P05 £195), before taxes. The P05 8-guest rows include the £20 a night extra-guest fee.
- **Booking.com live: NOT CHECKED.** One plain search (Camden, 30 Nov-3 Dec, 2 adults) at 07:28:10Z returned HTTP 202 with an AWS WAF challenge (`ch22/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are confirmed in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch22s/`.)

### 1. 1455, day 23: the guest in residence to 24 Nov, and 1455 still sells those nights

| Stay (2 adults) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch22/air/`) |
|---|---|---|---|---|
| 22-24 Nov | booked (guest in residence) | **bookable £442.85** | not offered | p04_2224nov 07:22:24Z |
| 22-25 Nov | 22-23 booked, 24 open (£142), 25 booked | **bookable £605.20** | not offered | p04_2225nov 07:22:29Z |
| 23-25 Nov | 23 booked, 24 open | **bookable £443.70** | not offered | p04_2325nov 07:22:34Z |
| 24-27 Nov / 25-28 Nov | 25-28 booked | not offered | not offered | p04_2427nov, p04_2528nov |
| 17-20 Dec (reopened after cancellation) | open | **bookable £607.83** | offered £338.12 room | p04_1720dec 07:22:53Z |
| 6-13 Dec | open | £1,290.26 (same as 19-21 Nov: static) | offered | p04_0613dec |
| 20-23 / 20-26 Dec | open | not offered | offered | p04_2023dec, p04_2026dec |

- **Yes, still selling.** On the last full night of the stay, 1455 offers 22-24 Nov, 22-25 Nov and 23-25 Nov. Two of these are 2 nights, below P04's 3-night rule. A second guest could book a flat that someone is staying in.
- At risk: the 20-24 Nov stay (£631.59 room plus cleaning) and relocation costs.
- The later booked nights (25-28 Nov) still look closed on 1455.
- New today: 1455 also sells **17-20 Dec**, which is open in Smoobu. Because 1455 is not synced, a booking there would not close Smoobu, the synced listing or Booking.com, so the same nights could be sold twice.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 22 Nov-5 Jan **now**, or unlist it. Then map it to Smoobu 3562176.

### 2. Overnight cancellations: P04 17-20 Dec and P05 Valentine's 13-17 Feb

**P04 Barking, Airbnb, 17-20 Dec (3 n): booked and then cancelled 10 minutes later**

| Item | Value | Source |
|---|---|---|
| Stay | 3 adults, lead 26 d. Booked **19:20Z** (`booked_date` 20:20 is the Smoobu clock), cancelled **19:30:11Z** | PriceLabs `get_pms_reservations`; Smoobu |
| Room / cleaning / commission | **£338.12** / £142 / £74.42 (15.5% of £480.12) | Smoobu price-elements |
| Listing | **Synced 1657859794156786222.** It is the only listing connected to Smoobu 3562176, and it uses the synced £142 cleaning fee. Today that listing's 17-20 Dec card shows a room price of exactly £338.12. | Smoobu; p04_1720dec |
| Smoobu at booking | 142 / 147 / 153 = **£442**. P04's last push was 21 Nov 09:45:42Z, before the booking, and those are still today's prices. | `listing_data`; Smoobu rates |
| Fit | **0.765 each night, rounded down: 108.63 + 112.45 + 117.04 = £338.12 exactly.** This is the hidden 2-28 day tier. | `ch22s` |
| Gap vs policy | Policy expects no discount for 3 nights at 26 days' lead, so the expected price is £442. **The gap is -£103.88 (-23.5%).** | |

- This stay is cancelled, so it is not added to a-airbnb-rules. 17-20 Dec is open again at £442, min 3.
- The "Cancellation Payout £405.70" label is the same Airbnb label seen on live stays (price minus commission). Whether any payout is kept: NOT CHECKED.

**P05 St John's Wood, Airbnb, 13-17 Feb (4 n, Valentine's): cancelled 21 Nov 19:12:44 (Smoobu clock)**
- It was booked on 15 Nov at 90 days' lead, for 4 adults and 4 children.
- It paid **£1,219.98** room, £195 cleaning and £219.32 commission.
- Smoobu at booking was **£1,627**, so it paid **0.7498** of Smoobu (16 Nov section).
- Policy expects £1,627 (4 nights, no stay discount). The gap was **-£407.02**, made of:
  - £195.24 from the visible Early booking 12% (a-p05-earlybird, tracked separately);
  - **£211.78 from an unexplained further ~15%.**
- **That £211.78 was counted in a-airbnb-rules** (16 Nov: £3,056.70 + £909.96 = £3,966.66, which included it). The stay is now cancelled, so I take it out (see §4).
- Today's card is on sale again (83 d lead, `p05_1317feb6` / `p05_1317feb8` 07:25:04Z / 07:24:54Z):
  - Smoobu is now 435 / 407 / 416 / 421 = **£1,679**, min 4.
  - Airbnb tier is 1.000, with a visible **Early booking 12% (-£201.48)**. The card is **£1,477.52** at 6 guests, or £1,557.52 at 8 guests (+£80, the £20 a night fee).
  - That is **£257.54 more than the cancelled stay paid**. The early-booking 12% is the only discount on the card. The extra 15% seen at booking is not shown, and its source is still NOT CHECKED.

### 3. Booking.com

- **No new Booking.com booking since 21 Nov.** Evidence:
  - PriceLabs `get_pms_reservations` for 21-22 Nov returns only the P04 Airbnb stay.
  - Smoobu shows no newly created Booking.com reservation.
  - The `reservations.csv` diff from 21 to 22 Nov shows only the P04 and P05 Airbnb changes, plus a P02 stay from Nov 2025 dropping out of the 365-day window.
- Two **existing** P12 Booking.com stays were modified, with amounts unchanged:
  - 21-26 Nov: £1,012.36 room, £150 cleaning, £174.35 commission;
  - 27-30 Nov: £653.39 room, £150 cleaning, £120.51 commission, 6 adults.
- **+15%: still not evidenced.**
  - The only booking made since 18 Nov is the P11 27-30 Nov stay. It paid £77.18 / £74.10 per £100 Smoobu (sets A/B, 21 Nov section), which is at or below the old x1.10 level (£76.23).
  - There is no new booking to test it against, and the live display is NOT CHECKED (WAF).

**Running totals since the 24 Oct markup cut** (`reservations.csv` 22 Nov, booked_on 24 Oct or later; the P04 20-23 Nov triplicate is counted once)

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **26** (unchanged) | 107 | £18,900.26 | £3,844.18 |
| Still confirmed | **16** | 69 | £11,498.10 | £2,338.07 |
| Cancelled | **10** | 38 | £7,402.16 (39.2% of gross room) | £1,506.11 |
| Booked since +15% (18 Nov) | 1 / 1 | 3 | £538.73 | £123.79 |

Pace over 28.74 days (24 Oct 13:38Z to 22 Nov 07:20Z) is **0.90 a day gross and 0.56 confirmed** (yesterday 0.94 / 0.58). Confirmed pace is still falling.

**New: P11 Camden is closed 22-26 Nov.**
- Smoobu has a "Blocked channel" record for apartment 3064196, 22-27 Nov, created 22 Nov 00:44 (Smoobu clock, about 23:44Z on 21 Nov).
- The 5 nights closed were open yesterday: Smoobu 184 / 180 / 195 / 192 / 214 = £965.
- PriceLabs `prices.csv` still shows 23-26 Nov as available.
- P11 is Booking-only, and this is not one of the policy's intentional blocks (P02/P03/P06/P07). There is no PriceLabs log entry for it.
- Who set it, and why: NOT CHECKED. **Corentin to confirm it is intentional.**

**t-channel-gaps (P11): Smoobu moved further below the targets.**
- 23 / 24 / 25 Dec are £266 / £242 / £251 (yesterday £285 / £256 / £267; targets about £320 / £295 / £305).
- 3 Jan is **£157** (yesterday £166; target about £195).
- At +15%, the Standard rates would be £306 / £279 / £289 / £181, before promotions. Display: NOT CHECKED (WAF).
- There is no new PriceLabs edit on P11 since 21 Nov, so this is Reyhan's earlier P11 DSOs (2 Jan-28 Feb -8%, and others) plus repricing. Those go to Corentin as confirm or revert (pricelabs section).

### 4. a-airbnb-rules, Scott Ellis Gardens, P20 guests, P04 weekly, long stay, P05 extra guest, twins

**a-airbnb-rules: day 24, NOT fixed. Adjusted for the P05 cancellation.**
- **£4,130.07 - £211.78 (P05 13-17 Feb, cancelled) = £3,918.29 confirmed.**
- Including yesterday's estimates (P20 19-22 Nov £126.10, P04 18-20 Nov £44.85): £4,301.02 - £211.78 = **£4,089.24**.
- There is no new confirmed Airbnb booking. The P04 17-20 Dec stay (-£103.88) was cancelled, so it is not counted.
- Separately, a-p05-earlybird falls by the £195.24 from the cancelled stay.

Tiers seen today:

| Tier | Where | Lead |
|---|---|---|
| 0.765 | P04 17-20 Dec (the same rate as the cancelled booking), P04 20 Dec inside 20-23 Dec, P20 5 Dec, P20 14-19 Dec | 13-28 d |
| **0.850** | P20 22-24 / 22-25 Nov | 0 d |
| 0.900 | P13 14-19 Dec | 22 d |
| 0.900 | P13 3-8 Jan | 42 d |
| 0.900 | P20 26 Dec | 34 d |
| 0.900 | P04 21-22 Dec and 6-13 Dec | 14-29 d |
| 0.900 | P04 20-26 Dec | 28 d |
| 0.900 | P05 5-10 Jan | 44 d |
| **0.900** | **Scott Ellis Gardens** | 17, 24 and 45 d |
| 1.000 | P05 13-17 Feb | 83 d |

- Setting (unchanged): Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time and last-minute rules behind 0.765 / 0.85 / 0.9, and keep the visible discounts.
- This now also applies to Scott Ellis Gardens (below).

**Scott Ellis Gardens (3588993, NW8): live on Airbnb, clearly identified. Booking.com: NOT CHECKED.**
- **The listing:** Airbnb **1823298025501355473**, "3 Bed Flat for 6, St John's Wood and Little Venice", host **551951609** ("Seeker Estates LTD"). The room page shows `isNewListing` true, 0 reviews and 6 guests (`ch22/pg/se_room.html`, 07:27:55Z).
- **How I identified it:**
  - It is 36 m from the PriceLabs coordinates.
  - It has 3 bedrooms.
  - On all three test stays, the first price line equals **Smoobu x 0.900 + £150** to the penny.
- **Guests see a further "Special offer" of exactly 20%**, probably Airbnb's new-listing promotion (source NOT CHECKED). So the guest room price is **0.72 x Smoobu**:

| Stay (4 adults, min_bedrooms 3) | Lead | Smoobu | Line (room + £150) | Special offer | Room after | vs Smoobu |
|---|---|---|---|---|---|---|
| 9-12 Dec | 17 d | £1,038 | £1,084.20 | -£186.84 | £747.36 | -£290.64 (-28.0%) |
| 16-19 Dec | 24 d | £1,088 | £1,129.20 | -£195.84 | £783.36 | -£304.64 (-28.0%) |
| 6-9 Jan | 45 d | £894 | £954.60 | -£160.92 | £643.68 | -£250.32 (-28.0%) |

- **Prices are sane.** Smoobu is £289-555 a night, and there is no £4,000 anywhere in Smoobu 22 Nov-28 Feb. So the earlier £4,000 `user_price` did not reach the guest.
- Reyhan's changes on 21 Nov were base 295 → 325 → **425** (19:33Z / 19:36Z) and 8 min-stay DSOs (12:46Z).
- On P20 in October, the new-listing 20% ended after 3 reservations (`listing_facts.P20.airbnb_new_listing_promotion`). Until it ends here, the listing nets **£60.84 per £100 Smoobu** (0.72 x 0.845; the commission rate on this listing is NOT CHECKED).
- **The 6-guest capacity and the cleaning fee are not in policy yet** (t-scott-ellis-2011). Corentin to confirm.
- The 0.900 tier at 17-24 days differs from the 0.765 tier on P04 and P20, so this apartment's Smoobu Airbnb rules are not the same set. NOT CHECKED.

**P20 guest count: day 4, not changed.**
- The room page shows **"6 guests"** (`personCapacity` 6, 4 occurrences; 07:27:52Z). Policy `listing_facts.P20.max_guests` is 4.
- Corentin to confirm or revert. Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.

**P20 22-24 Nov (tonight)**
- Smoobu is now 283 / 279 / 271, which matches PriceLabs (the 21 Nov mismatch is gone).
- The 2-night stay sells at **£477.70 = 0.85 x £562**. That is correct on price under the 0-14 day 15% last-minute, but it is still **min 2 against policy min 3 to 30 Nov** (Smoobu min 2).
- 22-25 Nov sells at £708.05 (0.85 x £833).

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 6-13 Dec: -£166.86 = 18.0% of £927.00. At 15% it would be £139.05, so **£27.81 over policy**.
- The 20-26 Dec long stay 10% is -£91.53, so the card is 0.810 of Smoobu.

**Long stay 10% on 5 nights: still on.**
- P05 5-10 Jan: -£171.99 (10% of £1,719.90).
- P13 14-19 Dec: -£89.64 on each twin.
- P13 3-8 Jan: -£76.14 on each twin.

**P05 extra-guest fee: unchanged, £20 a night at 8 guests and £0 at 6.**
- 5-10 Jan is +£100; 13-17 Feb is +£80.
- Long stay and early booking are taken from the room before the fee.
- Where the fee is set: NOT CHECKED.

**t-p13-twins: worse. 66 of 68 jointly open nights are now identical in Smoobu** (yesterday 58 of 68).
- They differ only on 27 Nov (264 / 185) and 1 Dec (225 / 158). The 13-20 Dec gap has closed.
- Both Airbnb checks now show identical cards on both twins:
  - 14-19 Dec: **£806.76 on both** (yesterday £856.98 / £808.38);
  - 3-8 Jan: £685.26 on both.
- This conflicts with `listing_facts.P13.twin_listings` ("never making them identical"). Setting: PriceLabs 3090701 > DSO about +3% on 22 Nov-28 Feb, set after any parent edit.

**PriceLabs edits since 21 Nov (`get_user_logs`, 10 entries, all Reyhan, all Scott Ellis Gardens).**
- There are no new edits on the other flats, and no removals were logged. So yesterday's confirm-or-revert list (P11, P05, P13, P04 24-26 Dec min 2) still stands.

### 5. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup). The last-minute 15% applies at 0-14 days and weekly 15% at 7+ nights.

| Ref | Channel | Stay (lead) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb (booked + cancelled) | 17-20 Dec, 3 n (26) | 3 | £442 | £442.00 | **£338.12 paid** | -23.5% | FLAG (cancelled) | Smoobu price-elements; PriceLabs `get_pms_reservations` |
| P04 synced | Airbnb | 17-20 Dec (25) | 2 | £442 | £442.00 | £338.12 | -23.5% | FLAG | p04_1720dec 07:22:53Z |
| P04 synced | Airbnb | 6-13 Dec, 7 n (14) | 2 | £1,030 | £875.50 | £760.14 | -13.2% | FLAG (weekly 18%) | p04_0613dec 07:23:01Z |
| P04 synced | Airbnb | 20-26 Dec, 6 n (28) | 2 | £1,017 | £1,017.00 | £823.77 | -19.0% | FLAG | p04_2026dec 07:23:10Z |
| P04 synced | Airbnb | 20-23 Dec (28) | 2 | £466 | £466.00 | £399.15 | -14.3% | FLAG | p04_2023dec 07:23:18Z |
| P04 unsynced 1455 | Airbnb | 22-24 / 22-25 / 23-25 Nov | 2 | booked | not for sale | £442.85 / £605.20 / £443.70 card | n/a | FLAG (double-sell, guest in residence) | p04_2224nov, p04_2225nov, p04_2325nov |
| P04 unsynced 1455 | Airbnb | 17-20 Dec | 2 | £442 | n/a (unsynced copy) | £607.83 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_1720dec |
| P04 both | Airbnb | 24-27 / 25-28 Nov | 2 | booked | not for sale | not offered | - | ok | p04_2427nov, p04_2528nov |
| P20 | Airbnb | 22-24 Nov, 2 n (0) | 2 | £562 | £477.70 (LM 15%) | £477.70 | 0.0% | ok on price; FLAG min 2 against policy 3 | p20_2224nov 07:23:26Z |
| P20 | Airbnb | 22-25 Nov (0) | 2 | £833 | £708.05 | £708.05 | 0.0% | ok | p20_2225nov 07:23:40Z |
| P20 | Airbnb | 5-6 Dec (13) | 2 | £520 | £442.00 (LM 15%) | £397.80 | -10.0% | FLAG | p20_0506dec 07:23:56Z |
| P20 | Airbnb | 14-19 Dec, 5 n (22) | 2 | £1,557 | £1,557.00 | £1,191.09 | -23.5% | FLAG | p20_1419dec 07:24:04Z |
| P20 | Airbnb | 26-27 Dec (34) | 2 | £539 | £539.00 | £485.10 | -10.0% | FLAG | p20_2627dec 07:24:34Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (22) | 4 | £996 / £996 | same | £806.76 / £806.76 | -19.0% / -19.0% | FLAG + identical twins | p13_1419dec 07:25:58Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (42) | 4 | £846 / £846 | same | £685.26 / £685.26 | -19.0% / -19.0% | FLAG + identical twins | p13_0308jan 07:26:15Z |
| P05 | Airbnb | 13-17 Feb, 4 n (83) | 6 | £1,679 | £1,679.00 | £1,477.52 | -12.0% (visible Early booking) | FLAG | p05_1317feb6 07:25:04Z |
| P05 | Airbnb | 13-17 Feb, 4 n (83) | 8 | £1,679 | £1,679.00 | £1,557.52 (+£80 extra guest) | -12.0% excluding the fee | FLAG | p05_1317feb8 07:24:54Z |
| P05 | Airbnb | 5-10 Jan, 5 n (44) | 6 | £1,911 | £1,911.00 | £1,547.91 | -19.0% | FLAG | p05_0510jan6 07:25:36Z |
| P05 | Airbnb | 5-10 Jan, 5 n (44) | 8 | £1,911 | £1,911.00 | £1,647.91 (+£100) | -19.0% excluding the fee | FLAG | p05_0510jan 07:25:26Z |
| Scott Ellis 3588993 | Airbnb | 9-12 Dec (17) | 4 | £1,038 | £1,038.00 | £747.36 | -28.0% | FLAG | se_0912dec 07:26:56Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (24) | 4 | £1,088 | £1,088.00 | £783.36 | -28.0% | FLAG | se_1619dec 07:27:06Z |
| Scott Ellis 3588993 | Airbnb | 6-9 Jan (45) | 4 | £894 | £894.00 | £643.68 | -28.0% | FLAG | se_0609jan 07:26:40Z |
| all | Booking.com live | - | - | - | e.g. P11 23-25 Dec Standard £306 / £279 / £289 | NOT CHECKED: AWS WAF 07:28:10Z | - | - | ch22/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| P20 14-19 Dec | £365.91 |
| P05 5-10 Jan | £363.09 |
| Scott Ellis 16-19 Dec | £304.64 |
| Scott Ellis 9-12 Dec | £290.64 |
| Scott Ellis 6-9 Jan | £250.32 |
| P05 13-17 Feb | £201.48 |
| P04 20-26 Dec | £193.23 |
| P13 14-19 Dec | £189.24 each |

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed in policy) | £115.00 | £97.75 |
| Booking.com observed, P11 27-30 Nov (A / B), 18% commission (no new booking) | £77.18 / £74.10 | £63.29 / £60.76 |
| Airbnb model / live at 58 d or more | £100.00 | £84.50 |
| Airbnb 0.900 | £90.00 | £76.05 |
| Airbnb 0.880 (P05 Early booking 12%) | £88.00 | £74.36 |
| Airbnb 0.850 (P20 lead 0) | £85.00 | £71.83 |
| Airbnb 0.810 (0.9 x long stay) | £81.00 | £68.44 |
| Airbnb 0.765 (P04 17-20 Dec, P20) | £76.50 | £64.64 |
| **Airbnb 0.720 (Scott Ellis 0.9 x Special offer 20%)** | £72.00 | **£60.84** (15.5% assumed) |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- On observed prices, Booking.com (£63) still nets about the same as Airbnb at 0.765 (£65). Scott Ellis nets the least of any channel.
- Every observed Airbnb price inside 58 days is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 22 Nov; per property, the top-level field is null), VAT-corrected**
- Booking.com booked ADR in PriceLabs is ex-VAT, so Booking.com nights are multiplied by 1.2. The 2 nights with a blank ref are dropped.
- The unadjusted run reproduces the pack. Script `vat22.py`.
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -20.3% (9 n) | **-5.9%** | Booking.com -3.3% (8 n); Airbnb -27.1% (1 n) |
| P11 | -37.3% (10 n) | **-24.8%** | all Booking.com |
| P12 | -39.3% (13 n) | **-27.1%** | all Booking.com |
| P13 | -35.8% (12 n) | **-30.7%** | Booking.com -37.1% (6 n); Airbnb -24.7% (6 n) |

Airbnb-only flats need no correction: P01 -38.2%, P05 -10.9%, P06 -39.4%, P09 -20.8%, P20 -38.9%.

### 7. Fees and min stay

**Cleaning**
- Synced cards reconcile with P04 £142, P13/P20 £150 and P05 £195.
- Scott Ellis reconciles with £150, inferred from the fit. It is not in policy.
- The cancelled P04 and P05 stays carried £142 / £195.
- 1455 cleaning: NOT CHECKED (the cards do not split it).

**Min stay as displayed matches Smoobu**
- P20 22-24 Nov sells as 2 nights (policy min 3 to 30 Nov).
- P05 13-17 Feb is min 4.
- P04 17-20 Dec is min 3.
- **1455 sells 22-24 Nov and 23-25 Nov as 2 nights.**
- Booking.com plan minimums: NOT CHECKED (WAF).

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 24. £3,918.29 confirmed after removing the cancelled P05 Valentine's stay (-£211.78); £4,089.24 including estimates.**
   - The cancelled P04 17-20 Dec stay sold at exactly **0.765 x £442 (-£103.88)**. Today's card is the same price.
   - Largest open-card gaps: P20 14-19 Dec £365.91 and P05 5-10 Jan £363.09.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time and last-minute rules (0.765 / 0.85 / 0.9 tiers) and keep the visible discounts. This includes Scott Ellis Gardens.
2. **Critical: unsynced 1455, day 23.** It still sells 22-24 Nov (£442.85), 22-25 Nov (£605.20) and 23-25 Nov (£443.70) while the guest is in the flat. Since the cancellation it also sells 17-20 Dec (£607.83), which would not close Smoobu.
   - At risk: £631.59 plus relocation.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 22 Nov-5 Jan now, or unlist. Then map it to 3562176.
3. **High: Scott Ellis Gardens is live on Airbnb (1823298025501355473) at 0.72 x Smoobu**, about -£250 to -£305 on each 3-night card. That is 0.9 tier x a 20% "Special offer".
   - The 20% is probably the new-listing promotion. Corentin to confirm it is wanted, and that it ends after 3 bookings as on P20.
   - Setting: Smoobu > Channel Manager > Airbnb > 3588993 > Default pricing rules (remove the 0.9 tier). If the offer is not wanted: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.
   - Corentin also to confirm 6 guests, £150 cleaning and whether the flat is on Booking.com (NOT CHECKED).
4. **High: Booking.com.**
   - +15% is still not evidenced. There has been no new booking since the P11 27-30 Nov stay, which paid at or below the x1.10 level.
   - The confirmed pace has fallen to 0.56 a day; 10 of 26 bookings (39.2% of room) are cancelled.
   - New: **P11 22-26 Nov is closed by a "Blocked channel" record (5 nights, £965 Smoobu)** that is not in policy and has no PriceLabs log. Corentin to confirm it is intentional, or remove it in Smoobu > Calendar > 3064196.
   - Still needed from the extranet: the 27-30 Nov reservation detail (rate plan and promotions) and a Standard Rate calendar screenshot.
5. **High: P04 Airbnb weekly 18% and long stay 10%.**
   - 6-13 Dec -£166.86, which is £27.81 over policy; 20-26 Dec long stay -£91.53.
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%, Long stay 0% (or keep it and record it).
6. **High: long stay 10% on 5 nights.**
   - P05 5-10 Jan -£171.99; P13 -£89.64 / -£76.14 on each twin.
   - It is not in policy; Corentin to keep or zero it.
   - The P05 Early booking 12% is on the reopened Valentine's card (-£201.48).
   - The P05 £20 a night 8-guest fee has an unknown source.
7. **High (Corentin, confirm or revert):**
   - P20 Airbnb shows 6 guests against policy 4 (day 4).
   - P20 22-24 Nov is on sale for 2 nights against policy min 3.
   - Reyhan's earlier PriceLabs discounts are still in place (nothing new since 21 Nov except the Scott Ellis setup).
8. **Medium: P13 twins.**
   - 66 of 68 nights are identical in Smoobu (was 58), and both checked cards are identical (£806.76 and £685.26). This conflicts with the twin rule.
   - Setting: PriceLabs 3090701 DSO about +3%.
   - t-channel-gaps: P11 3 Jan is now £157 against a target of about £195.

Data gaps:
1. Booking.com live prices, whether +15% has reached Booking.com, derived-plan display, plan minimum stays, same-date ordering, and whether Scott Ellis Gardens is on Booking.com: NOT CHECKED (AWS WAF 07:28:10Z, not circumvented).
2. Source of the P11 22-27 Nov "Blocked channel" record: NOT CHECKED.
3. Source of the Scott Ellis "Special offer" 20% and its commission rate: NOT CHECKED.
4. Source of the extra ~15% on the cancelled P05 Valentine's stay, and whether any cancellation payout is kept on P04 / P05: NOT CHECKED.
5. 1455 cleaning fee and minimum stay; why it closes 25-28 Nov but sells 22-25 Nov: NOT CHECKED.
6. Source and guest threshold of the P05 extra-guest fee: NOT CHECKED.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
