## Channel parity

Run date D = 2026-11-26 (Thursday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster (Camden 18%, check-ins 1 Nov-18 Dec);
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans;
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks;
- P04 2 Dec +200% (deprioritised).

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments, 26 Nov-28 Feb, fetched **2026-11-26T07:22:04Z** (`ch26/smoobu_rates26.json`). Yesterday's 25 Nov 07:24Z set (`ch25/smoobu_rates25.json`) is the "before" set. I also made a P11-only call for 24-30 Nov to get the 25 Nov rate.
- **Smoobu GET `/api/reservations`** (modifiedFrom 25 Nov, with cancellations) returned 6 records. I pulled price elements for P11 25-27 Nov, P11 27-30 Nov and the P04 cancellation. I kept amounts only and dropped guest fields, guest counts and references (`ch26/smoobu_mod26.json`, `ch26/pe26.json`).
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` (smoobu, booked 25-26 Nov) returns **1 record: P11 Booking.com 25-27 Nov**, rental revenue £233.89 (= £280.67 / 1.2, ex-VAT). **No new Airbnb booking.**
  - `get_user_logs` (listing, 25-26 Nov) returns 3 entries, all Reyhan (see §6).
  - `get_listing_date_overrides` for P04 and P11.
- **Live Airbnb:** 28 plain public airbnb.co.uk map searches (curl), every page read, 07:24:20Z-07:29:40Z (`ch26/air/*.json`: URL, dates, search guests and timestamp). I also read four room pages at 07:30:25Z-07:30:30Z (`ch26/pg/`).
  - `data/snapshots/2026-11-26/channel_checks.csv` was absent. I copied it forward from 25 Nov (399 lines) and **appended 30 rows** under `.channel_checks.csv.lock` (429 lines).
  - Room = first price line minus cleaning, before taxes. Cleaning: P04 £142 (£129 on the 1-night stay; see §8), P06 £129, P13/P20/Scott Ellis £150, P05 £195, P12 £125 for 1 night and £150 for 3.
- **Booking.com live: NOT CHECKED.** One plain search (Camden Town, 30 Nov-3 Dec, 2 adults) at 07:31:52Z returned HTTP 202 with an AWS WAF challenge (`ch26/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**
  - PriceLabs has a Vrbo copy of Camden (12037367) that receives Reyhan's DSOs. What it displays: NOT CHECKED.
- **Clock:** Smoobu's created and modified times are UTC+1. Below I give UTC.

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch26s/`.)

### 1. Booking.com: the new P11 booking, the P04 cancellation, totals

**P11 Camden 25-27 Nov (2 n), Booking.com, made 25 Nov 18:13 Smoobu clock (17:13Z), confirmed, same-day.**

| Item | Value | Source |
|---|---|---|
| Room paid | **£280.67** incl. VAT £46.78 (1/6); ex-VAT £233.89 (= PriceLabs rental revenue) | Smoobu price elements; PriceLabs `get_pms_reservations` |
| Cleaning | £149 (Camden; the other flats charge £150) | Smoobu |
| Commission | **£77.34 = 18.0% of £429.67 (room + cleaning)** | Smoobu |
| Smoobu at booking | P11 was pushed 25 Nov 10:42Z, after yesterday's 07:24Z read and before the booking. Smoobu now shows 25 Nov **£166** and 26 Nov **£254**, so the stay was priced at **£420**. The £166 can only have come from the 10:42Z push, because 25 Nov was already past at the 26 Nov 06:59Z refresh. Alternatives: £395 if 26 Nov was still £229 at 17:13Z; £436 on yesterday's 07:24Z set (207 + 229). | `smoobu_rates26`, P11 rates call, `smoobu_rates25`, `listing_data` |
| **Paid per £100 Smoobu** | **£66.83** VAT incl. (£64.37 on £436). Net after 18%: **£54.80** (£52.79) | |
| Expected Standard (+15%) | ceil(x1.15) = 191 + 293 = **£484**. Paid / Standard = 0.580 (**-42.0%**, size only) | policy `booking_markup` |

- **Commission:** 27.6% of the room is an artefact. Booking.com charges its commission on room + cleaning, and **18.0% is exactly the Camden Visibility Booster** (policy, check-ins 1 Nov-18 Dec). So this is **not a commission flag**. The two other P11 stays this month were charged on the same basis (27-30 Nov: £123.79 = 18.0% of £687.73).
- **Stack fit (`ch26s/stack25.py`, `ch26s/ratio.py`): neither x1.10 nor x1.15 fits to the penny on any of the three Smoobu sets.** The closest fits are:
  - £420 set: x1.10 = £463, Monthly x Genius 20% x occupancy 5% gives £281.50 (+£0.83); x1.15 = £484, Monthly x three 10-15% layers x occupancy 5% gives £281.40 (+£0.73).
  - £395 set: x1.10 = £435 x 0.646 gives £281.01; x1.15 = £455 x 0.6177 gives £281.07.
  - £436 set: x1.15 = £503 x NR Weekly x Genius 20% x Last Minute 15% gives £280.47 (-£0.20).
- **The P11 booking does not settle t-bcom-markup-2511.** Whatever the plan, the guest paid 0.58-0.61 of the list price: Booking.com promotions took roughly 40% off Standard on a same-day booking.
- **Caveat:** §3 shows that Smoobu's stored rates no longer match what the synced P04 Airbnb listing shows. If the same happens on Booking.com, every stack fit built on Smoobu `/rates` is weaker evidence than it looks.

**P04 Barking Booking.com 10-14 Dec (4 n): CANCELLED.**
- £488.35 room + £129 cleaning = £617.35; commission £92.60 (15.0%); made 22 Nov; modified 25 Nov 12:56 Smoobu clock (11:56Z).
- This was **the only booking since 18 Nov that fitted x1.15** (ceil(x1.15) x three 10% layers, within £0.08).
- 10-14 Dec is now open: Smoobu 165 / 174 / 156 / 147 = £642, PriceLabs £633.

**t-bcom-markup-2511 evidence, updated: 0 of 4 confirmed Booking.com bookings made since 18 Nov fit x1.15.**

| Booking | Made | Status | Fit |
|---|---|---|---|
| P11 27-30 Nov | 20 Nov | confirmed | at or below the x1.10 level (21 Nov section) |
| P04 10-14 Dec | 22 Nov | **cancelled 25 Nov** | the only x1.15 fit |
| P12 4-7 Dec | 24 Nov | confirmed | ceil(x1.10) x 0.765, to the penny |
| Scott Ellis 30 Dec-4 Jan (unmapped) | 24 Nov | confirmed | ceil(x1.10) x 0.80, to the penny |
| **P11 25-27 Nov** | 25 Nov | confirmed | **inconclusive** (no exact fit at x1.10 or x1.15) |

- Setting (unchanged): Smoobu > Channel Manager > Booking.com > price overwrite on 2699998, 3588993 and 3064196: check each reads +15%, as Barking did.
- Corentin to screenshot one Standard Rate calendar, e.g. P12 30 Nov-3 Dec. Smoobu now has P12 at 274 / 273 / 279 = £826, so x1.15 = **£951** and x1.10 = £910.

**Running totals since the 24 Oct markup cut** (`reservations.csv` 26 Nov, Booking.com, booked_on 24 Oct or later; the P04 20-23 Nov triplicate is counted once; room is VAT incl.; Scott Ellis is unmapped and not in the file)

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **29** (was 28) | 116 | £20,435.82 | £4,151.60 |
| Still confirmed | **17** (unchanged: +P11, -P04) | 71 | £11,867.52 | £2,428.72 |
| Cancelled | **12** (was 11) | 45 | £8,568.30 (**41.9%** of gross room) | £1,722.88 |
| Booked since +15% (18 Nov) | 4 gross / 3 confirmed | 12 / 8 | £2,074.29 / £1,585.94 | £431.21 / £338.61 |
| Scott Ellis (unmapped), extra | +1 confirmed | 5 | £2,238.40 | £358.26 |

- **Cancellation rate: 12 of 29 = 41.4% by count** (yesterday 39.3%), 45 of 116 nights = 38.8%, 41.9% of room value. Including Scott Ellis: 12 of 30 = 40.0%.
- Cancellations by flat: P11 4, P12 4, P13 2, P04 2.
- Pace over 32.74 days (24 Oct 13:38Z to 26 Nov 07:22Z): **0.89 a day gross, 0.52 confirmed** (yesterday 0.88 / 0.54). With Scott Ellis: 0.92 / 0.55.
- The P12 27-30 Nov and P11 27-30 Nov records were modified on 25 Nov (21:15 / 23:51 Smoobu clock). Their amounts are unchanged.

**P11 Camden (Booking-only)**
- The Smoobu block **from 5 Jan 2027 is still there** (0 of 55 nights open from 5 Jan to 28 Feb). **3-4 Jan is still unsellable**: £150 / £164 at min 3, between the booked 2 Jan and the blocked 5 Jan.
- **Christmas fell:** 23 / 24 / 25 Dec is now **£278 / £256 / £265** (yesterday £291 / £267 / £304; -£63 over the 3 nights). Reyhan replaced the 23-25 Dec price override with a min-stay-only DSO (min 2) at 25 Nov 10:41Z (§6). At +15%, Standard would be £320 / £295 / £305.
- 3 Jan is £150, against a target of about £195.
- Display: NOT CHECKED (WAF).
- 25-27 Nov is now sold, and 27-30 Nov was already booked, so 25 Nov-29 Nov is full. 30 Nov is open at £226 (min 2).

### 2. 1455, day 27: no booked night on sale today, but it still sells open nights and hides two weeks

| Stay (2 adults searched) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch26/air/`) |
|---|---|---|---|---|
| 27-30 Nov (Booking.com 25 Nov-2 Dec) | booked | not offered | not offered | p04_2730nov 07:24:20Z |
| 2-3 Dec (1 n) | open £403 (min 1) | not offered | offered | p04_0203dec 07:24:32Z |
| 3-6 Dec (Booking.com 3-6 Dec) | booked | not offered | not offered | p04_0306dec 07:24:26Z |
| 6-9 Dec | open £490 | **bookable £589.47** (unchanged since 22 Nov) | offered | p04_0609dec 07:24:35Z |
| 10-13 Dec | open £495 (cancellation freed it) | **bookable £600.94** (unchanged) | offered | p04_1013dec 07:24:42Z |
| 10-14 Dec | open £642 | **bookable £753.17** (unchanged total; now shown as £865.10 minus a Last-minute discount of £111.93) | offered | p04_1014dec 07:24:49Z |
| 14-21 Dec (7 n) | open £1,038 | **not offered** (also not on 25 Nov) | offered | p04_1421dec 07:24:57Z |
| 17-20 Dec | open £455 | **bookable £607.83** (unchanged) | offered | p04_1720dec 07:25:04Z |
| 23-26 Dec | open £479 | **not offered** | offered | p04_2326dec 07:25:11Z |
| 27-30 Dec / 30 Dec-2 Jan (Airbnb 27 Dec-4 Jan) | booked | not offered | not offered | p04_2730dec 07:25:19Z, p04_3002jan 07:25:25Z |
| 4-7 Jan | open £413 | **bookable £639.20** (new search) | offered | p04_0407jan 07:25:30Z |

- **Which nights it sells now:** 6-9, 10-14 and 17-20 Dec, and 4-7 Jan (searched stays). The room page is live (07:30:28Z, capacity 6).
- **Is any of them booked on the synced listing or other channels? No.** Every night 1455 sells is open in Smoobu, and 1455 is not offered on any searched booked stay (27-30 Nov, 3-6 Dec, 27 Dec-2 Jan). With 10-14 Dec cancelled, **no booked night is on sale on 1455 today.**
- **The risk is still there.** 1455's prices have not moved since 22 Nov, so it takes nothing from Smoobu. If it takes a booking for 6-9 / 10-14 / 17-20 Dec or 4-7 Jan, Smoobu will not know, and the synced 1657 and Booking.com will keep selling those nights.
- **New concern: 14-21 Dec and 23-26 Dec are open on 1657 but not offered on 1455.** That could be a 1455 booking that Smoobu does not know about (a double-booking risk in the other direction), a block, or a min-stay rule. NOT CHECKED: "not offered" in a map search does not prove the calendar is closed.
- Setting (unchanged): Airbnb host 551951609 > listing 1455876748739910219 > Calendar. Check 14-21 and 23-26 Dec for a reservation, then block 26 Nov-5 Jan or unlist. Then map it to Smoobu 3562176.

### 3. P04: Airbnb (synced 1657) shows the PriceLabs price, not Smoobu's

All 8 offered 1657 cards reconcile to **PriceLabs** (`prices.csv` 26 Nov) x the Airbnb tier. None reconciles to Smoobu.

| Stay | Smoobu now | PriceLabs | 1657 line room | = | Displayed room (after) |
|---|---|---|---|---|---|
| 2-3 Dec | £403 | £424 | £381.60 | 0.9 x PL | £324.36 (Last-minute -15%) |
| 6-9 Dec | £490 | £523 | £400.09 (no line) | 0.765 x PL | £400.09 |
| 10-13 Dec | £495 | £486 | £371.78 (no line) | 0.765 x PL | £371.78 |
| 10-14 Dec | £642 | £633 | £569.70 | 0.9 x PL | £484.23 (Last-minute -15%) |
| 14-21 Dec | £1,038 | £1,043 | £938.70 | 0.9 x PL | £769.73 (Weekly -18%) |
| 17-20 Dec | £455 | £458 | £350.37 (no line) | 0.765 x PL | £350.37 |
| 23-26 Dec | £479 | £473 | £425.70 | 0.9 x PL | £383.31 (Last-minute about -10%) |
| 4-7 Jan | £413 | £419 | £377.10 | 0.9 x PL | £377.10 |

- **Answer: Airbnb shows the PriceLabs price** (to the penny on every stay), so the 25 Nov 17:02Z push reached Airbnb. Smoobu's `/rates` holds different values on the same nights: 6-10 Dec is 6-7% below PriceLabs, 11 Dec is £174 vs £155, and 23-26 Dec is £479 vs £473.
- **Why Smoobu's stored rate differs from what Airbnb received: NOT CHECKED.** It could be a manual Smoobu edit after the push, or a Smoobu rate store that was not updated.
- **What Booking.com shows: NOT CHECKED (WAF).** Corentin to read the Barking Standard Rate for 6-9 Dec: x1.15 on PriceLabs = 201 / 201 / 202 = £604; on Smoobu = 188 / 188 / 189 = £565.
- The PriceLabs side changed because Reyhan replaced the P04 -5% DSO on 6-26 Dec with a min-stay-only DSO (min 3) at 25 Nov 17:02Z. The log labels it "fixed", but no price is stored. This effectively **reverts the -5%** (§6).
- 1657's last-minute discount now shows as a strikethrough on 2-3, 10-14 and 23-26 Dec, but is folded into the nightly rate on 6-9, 10-13 and 17-20 Dec. Yesterday 6-9 and 17-20 Dec showed it as a strikethrough. Same tier either way.

### 4. a-airbnb-rules (day 28) and Scott Ellis

**No new Airbnb booking.**
- PriceLabs `get_pms_reservations` for bookings made 25-26 Nov shows P11 Booking.com only.
- Smoobu modified-since 25 Nov has one Airbnb record: Scott Ellis 21-26 Dec, modified 25 Nov 11:06 Smoobu clock. Its amount is unchanged at £1,631.76.
- `reservations.csv` adds only P11 and the P04 cancellation.
- **The total stays £4,124.09 confirmed / £4,688.82 including estimates.**

The tiers are unchanged. The hidden 0.9 under Smoobu (or PriceLabs, on P04) is on every card inside about 45 days, plus 15% last-minute (shown or not shown), weekly 18% (P04) or long stay 10%:

| Tier (guest room / rate) | Where | Lead |
|---|---|---|
| 0.850 (1.0 x Last-minute 15%) | **P12 26 Nov (tonight)** | 0 d |
| 0.765 | P05 7-9 Dec, P06 2-3 Dec, P12 30 Nov-3 Dec, P20 14-19 Dec, P04 (on PL) 2-3 / 6-9 / 10-14 / 17-20 Dec | 4-21 d |
| 0.765 on Smoobu, i.e. 0.9 x LM 15% on P20's own 0-14 day rule | P20 5-6 Dec | 9 d |
| 0.810 (0.9 x LM about 10%) | P04 23-26 Dec (on PL) | 27 d |
| 0.810 (0.9 x long stay 10%) | P05 5-10 Jan, P13 14-19 Dec and 3-8 Jan (both twins) | 18-40 d |
| 0.738 (0.9 x weekly 18%) | P04 14-21 Dec (on PL) | 18 d |
| 0.900 | P20 26 Dec, P04 4-7 Jan (on PL) | 30-39 d |
| 0.880 (1.0 x visible Early booking 12%) | P05 13-17 Feb | 79 d |
| 0.720 (0.9 x Special offer 20%) | Scott Ellis 10-13 Dec, 16-19 Dec | 14-20 d |
| 0.800 (1.0 x Special offer 20%) | Scott Ellis 13-17 Feb | 79 d |

- P20 14-19 Dec (lead 18) shows a visible "Last-minute discount" of 15%. P20's policy last-minute is 0-14 days.
- Setting (unchanged): Smoobu > Channel Manager > Airbnb > each apartment (incl. 3288517, 3588993, 2699998, 3562176) > Default pricing rules. Remove the lead-time rule behind the hidden 0.9 and keep the visible discounts.

**Scott Ellis Gardens: the 20% Special offer is still on**
- It shows on all three offered cards: 10-13 Dec £1,071.00 to £856.80 (-£214.20); 16-19 Dec £1,177.20 to £941.76 (-£235.44); 13-17 Feb £1,508 to £1,206.40 (-£301.60).
- The room page still has `isNewListing` true and capacity 6 (07:30:27Z).
- 7-10 Jan was **not offered**, although Smoobu has it open (£1,016, min 3, met). Cause NOT CHECKED. Yesterday the same search offered it at £704.88.
- 27-30 Dec is not offered (27 Dec min 7; matches Smoobu).
- Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.

### 5. P20 guests, P04 weekly, long stay, twins

**P20 guest count: day 8, not changed.**
- The room page shows **capacity 6** (07:30:25Z). Policy `listing_facts.P20.max_guests` is 4.
- 26-27 Dec sells for **6 adults searched at £548.50 room, against £508.50 for 2 adults (+£40)** (07:27:23Z / 07:27:08Z).
- Corentin to confirm or revert. Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.

**P04 weekly 18%: not fixed.**
- 14-21 Dec: -£168.97 = 18.0% of £938.70. At 15% it would be £140.81, so **£28.16 over policy**.
- Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

**Long stay 10% on 5 nights: still on (not in policy; Corentin to keep or zero it).**
- P05 5-10 Jan: -£163.71.
- P13 3-8 Jan: -£72.99 (3064856) / -£78.48 (3090701).
- P13 14-19 Dec: -£93.51 / -£83.52.
- P05 13-17 Feb: the visible Early booking 12% is -£201.12.
- Setting: each Airbnb listing > Pricing > Discounts > Long stay 0%.

**t-p13-twins: December flipped.**
- In Smoobu, **34 of 68 jointly open nights are identical** (yesterday 36).
- **13-21 Dec: 3090701 is now 10.4-10.9% *below* 3064856** (yesterday 2.6-3.2% above).
- 3-25 Jan: 3090701 is 7.2-8.1% above.
- 27 Nov and 1 Dec: 3090701 is 13% below.
- Cards:
  - 14-19 Dec: **£841.59 / £751.68** (-10.7%; 3064856 rose from £984 to £1,039 in Smoobu, 3090701 fell from £1,013 to £928)
  - 3-8 Jan: **£656.91 / £706.32** (+7.5%)
- No P13 edit is logged on 25-26 Nov. Both twins refreshed at 06:09Z today. Cause NOT CHECKED (pricelabs section).
- A 10% gap is wider than "slightly different". Setting: PriceLabs DSO on 3090701 (or 3064856) to bring December and January within about 3% (Corentin to decide).

### 6. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup; P20's own last-minute 15% at 0-14 days; weekly 15% at 7+ nights). Booking.com expected = Standard = ceil(Smoobu x1.15), before promotions. "Search guests" is the search parameter, not a reservation party. The source for every Airbnb row is `ch26/air/<tag>.json` and the matching `channel_checks.csv` row (26 Nov).

| Ref | Channel | Stay (lead) | Search guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P11 | Booking.com (new, 25 Nov) | 25-27 Nov, 2 n (0) | - | £420 at booking (£436 / £395 alternatives) | £484 Standard | **£280.67 paid** | -42.0% | size only (stack is policy); no exact x1.10 / x1.15 fit | Smoobu price elements; PriceLabs reservations |
| P04 | Booking.com | 10-14 Dec | - | £642 (open again) | £741 Standard | cancelled (was £488.35) | - | - | Smoobu modified-since |
| P04 synced 1657 | Airbnb | 2-3 Dec, 1 n (6) | 2 | £403 (PL £424) | £403.00 | £324.36 | -19.5% | FLAG | p04_0203dec 07:24:32Z |
| P04 synced 1657 | Airbnb | 6-9 Dec (10) | 2 | £490 (PL £523) | £490.00 | £400.09 | -18.3% | FLAG (follows PL) | p04_0609dec 07:24:35Z |
| P04 synced 1657 | Airbnb | 10-13 Dec (14) | 2 | £495 (PL £486) | £495.00 | £371.78 | -24.9% | FLAG | p04_1013dec 07:24:42Z |
| P04 synced 1657 | Airbnb | 10-14 Dec (14) | 2 | £642 (PL £633) | £642.00 | £484.23 | -24.6% | FLAG | p04_1014dec 07:24:49Z |
| P04 synced 1657 | Airbnb | 14-21 Dec, 7 n (18) | 2 | £1,038 (PL £1,043) | £882.30 | £769.73 | -12.8% | FLAG (0.9 + weekly 18%) | p04_1421dec 07:24:57Z |
| P04 synced 1657 | Airbnb | 17-20 Dec (21) | 2 | £455 (PL £458) | £455.00 | £350.37 | -23.0% | FLAG | p04_1720dec 07:25:04Z |
| P04 synced 1657 | Airbnb | 23-26 Dec (27) | 2 | £479 (PL £473) | £479.00 | £383.31 | -20.0% | FLAG | p04_2326dec 07:25:11Z |
| P04 synced 1657 | Airbnb | 4-7 Jan (39) | 2 | £413 (PL £419) | £413.00 | £377.10 | -8.7% | FLAG | p04_0407jan 07:25:30Z |
| P04 unsynced 1455 | Airbnb | 6-9 / 10-13 / 10-14 / 17-20 Dec, 4-7 Jan | 2 | open | n/a (unsynced copy) | £589.47 / £600.94 / £753.17 / £607.83 / £639.20 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_* as above |
| P04 unsynced 1455 | Airbnb | 14-21 / 23-26 Dec | 2 | open | - | not offered | - | FLAG (possible off-Smoobu booking) | p04_1421dec, p04_2326dec |
| P04 both | Airbnb | 27-30 Nov, 3-6 Dec, 27 Dec-2 Jan | 2 | booked | - | not offered | - | ok | p04_2730nov, p04_0306dec, p04_2730dec, p04_3002jan |
| P06 | Airbnb | 2-3 Dec, 1 n (6) | 2 | £317 | £317.00 | £242.50 | -23.5% | FLAG | p06_0203dec 07:25:37Z |
| P12 | Airbnb | **26-27 Nov (tonight)** | 2 | £301 | £301.00 | £255.85 | -15.0% | FLAG (unsold) | p12_2627nov 07:26:06Z |
| P12 | Airbnb | 30 Nov-3 Dec (4) | 2 | £826 | £826.00 | £631.88 | -23.5% | FLAG | p12_3003dec 07:26:14Z |
| P20 | Airbnb | 5-6 Dec (9) | 2 | £562 | £477.70 (LM 15%) | £429.93 | -10.0% | FLAG | p20_0506dec 07:26:32Z |
| P20 | Airbnb | 14-19 Dec, 5 n (18) | 2 | £1,579 | £1,579.00 | £1,207.93 | -23.5% | FLAG | p20_1419dec 07:26:40Z |
| P20 | Airbnb | 26-27 Dec (30) | 2 | £565 | £565.00 | £508.50 | -10.0% | FLAG | p20_2627dec 07:27:08Z |
| P20 | Airbnb | 26-27 Dec (30) | **6** | £565 | not for sale (max 4) | £548.50 (+£40) | - | FLAG (guests) | p20_2627dec6 07:27:23Z |
| P05 | Airbnb | 7-9 Dec, 2 n (11) | 6 | £834 | £834.00 | £638.00 | -23.5% | FLAG | p05_0709dec 07:27:25Z |
| P05 | Airbnb | 5-10 Jan, 5 n (40) | 6 | £1,819 | £1,819.00 | £1,473.39 | -19.0% | FLAG | p05_0510jan 07:27:37Z |
| P05 | Airbnb | 13-17 Feb, 4 n (79) | 6 | £1,676 | £1,676.00 | £1,474.88 | -12.0% (visible Early booking) | FLAG | p05_1317feb6 07:28:03Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (18) | 4 | £1,039 / £928 | same | £841.59 / £751.68 | -19.0% / -19.0% | FLAG | p13_1419dec 07:28:26Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (38) | 4 | £811 / £872 | same | £656.91 / £706.32 | -19.0% / -19.0% | FLAG | p13_0308jan 07:28:44Z |
| Scott Ellis 3588993 | Airbnb | 10-13 Dec (14) | 4 | £1,190 | £1,190.00 | £856.80 | -28.0% | FLAG | se_1013dec 07:29:08Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (20) | 4 | £1,308 | £1,308.00 | £941.76 | -28.0% | FLAG | se_1619dec 07:29:16Z |
| Scott Ellis 3588993 | Airbnb | 13-17 Feb, 4 n (79) | 6 | £1,508 | £1,508.00 | £1,206.40 | -20.0% | FLAG (Special offer) | p05_1317feb6 07:28:03Z |
| Scott Ellis 3588993 | Airbnb | 7-10 Jan (42) | 4 | £1,016 (open, min 3) | £1,016.00 | not offered | - | FLAG (NOT CHECKED why) | se_0710jan 07:29:25Z |
| Scott Ellis 3588993 | Airbnb | 27-30 Dec | 4 | 27 Dec min 7 | - | not offered | - | ok | se_2730dec 07:29:40Z |
| all | Booking.com live | - | - | - | e.g. P12 30 Nov-3 Dec Standard £951 | NOT CHECKED: AWS WAF 07:31:52Z | - | - | ch26/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest against Smoobu are:

| Card | Gap |
|---|---|
| P20 14-19 Dec | £371.07 |
| Scott Ellis 16-19 Dec | £366.24 |
| P05 5-10 Jan | £345.61 |
| Scott Ellis 10-13 Dec | £333.20 |
| Scott Ellis 13-17 Feb | £301.60 |
| P04 14-21 Dec | £268.27 (£112.57 against expected after weekly 15%) |
| P05 13-17 Feb | £201.12 |
| P13 3064856 14-19 Dec | £197.41 |
| P05 7-9 Dec | £196.00 |
| P12 30 Nov-3 Dec | £194.12 |
| P13 3090701 14-19 Dec | £176.32 |
| P04 10-14 Dec | £157.77 |

**Reyhan's edits since yesterday's run (PriceLabs logs 25 Nov).** All go to Corentin as confirm or revert.
- **P04 6-26 Dec at 17:02Z:** the -5% DSO is replaced by a min-stay-only DSO (min 3, no price stored), which **reverts Reyhan's -5%**. It is in line with "cut PriceLabs discounts": Corentin to confirm. This explains the 17:02Z P04 refresh and the new PriceLabs prices that Airbnb now shows.
- **P11 23-25 Dec at 10:41Z** (copied to the Vrbo copy): the price override is replaced by a min-stay-only DSO (min 2). Christmas fell to £278 / £256 / £265 (-£63 over 3 nights). Corentin to confirm or revert.
- No other listing edit is logged on 25-26 Nov. The early refreshes on 26 Nov (P12, P13, P05, P20, Scott Ellis, P06 at 06:09-06:50Z) have no logged edit.

### 7. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, in policy) | £115.00 | £97.75 |
| Booking.com observed, Scott Ellis 30 Dec-4 Jan (15%) | £88.06 (VAT incl.) | £74.85 |
| Booking.com observed, P12 4-7 Dec (15%) | £84.33 | £71.68 |
| **Booking.com observed, P11 25-27 Nov (18% booster)** | **£66.83** (£64.37 on £436) | **£54.80** (£52.79) |
| Booking.com observed, P11 27-30 Nov (18%) | £77.18 / £74.10 | £63.29 / £60.76 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb 0.900 | £90.00 | £76.05 |
| Airbnb 0.880 (P05 Early booking) | £88.00 | £74.36 |
| Airbnb 0.850 (P12 tonight) | £85.00 | £71.83 |
| Airbnb 0.810 | £81.00 | £68.44 |
| Airbnb 0.800 (Scott Ellis Feb) | £80.00 | £67.60 |
| Airbnb 0.765 | £76.50 | £64.64 |
| Airbnb 0.738 (P04 weekly 18%) | £73.80 | £62.36 |
| Airbnb 0.720 (Scott Ellis) | £72.00 | £60.84 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- **On observed prices, "Booking.com nets at least Airbnb" fails on the new P11 stay:** £54.80 against £64.64 at the common Airbnb 0.765 tier and £84.50 in the model. Camden is Booking-only, so there is no same-flat Airbnb price. The 15% stays (P12, Scott Ellis) still net more than Airbnb 0.765.
- Every observed Airbnb price is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 26 Nov; per property, the top-level field is null), VAT-corrected**
- PriceLabs booked ADR is ex-VAT for Booking.com (confirmed again today: £233.89 = £280.67 / 1.2), so Booking.com nights are multiplied by 1.2. The 6 nights with a blank ref (Scott Ellis) are dropped.
- The unadjusted run reproduces the pack exactly (`ch26s/vat26.py`).
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -15.1% (7 n) | **+1.9%** | all Booking.com |
| P11 | -30.4% (11 n) | **-16.4%** | all Booking.com, 18% booster |
| P12 | -36.8% (10 n) | **-24.2%** | all Booking.com |
| P13 | -30.8% (11 n) | **-25.4%** | Booking.com -25.3% (5 n); Airbnb -25.5% (6 n) |

Airbnb-only flats need no correction: P01 -37.3%, P05 -13.8%, P06 -43.5%, P20 -41.1%.

### 8. Fees and min stay

**Cleaning**
- Synced cards reconcile with P04 £142 (3+ nights), P06 £129, P13/P20/Scott Ellis £150, P05 £195 and P12 £150 (3 n) / £125 (1 n).
- **The P04 1-night card (2-3 Dec) reconciles only with £129 cleaning** (£510.60 = 0.9 x £424 + £129). So P04 1657 appears to charge £129 on 1 night and £142 on 3+ nights. This is inferred from the price fit; the Airbnb fee setting itself was NOT CHECKED.
- Booking.com cleaning in Smoobu: P11 £149 (both stays), P04 £129 (cancelled stay); P12 and Scott Ellis £150.

**Min stay as displayed matches Smoobu**
- P04 sells at 3 nights (min 3), and 2-3 Dec sells as 1 night (min 1; 2 Dec is deprioritised).
- P06 2 Dec, P12 26 Nov, P20 5 Dec and P20 26 Dec sell as 1 night (min 1).
- Scott Ellis 27-30 Dec is not offered (27 Dec min 7).
- The exception is Scott Ellis 7-10 Jan, which is not offered although min 3 is met: NOT CHECKED.
- 1455 min stay: NOT CHECKED.
- Booking.com plan minimums: NOT CHECKED (WAF).

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 28. £4,124.09 confirmed; £4,688.82 including estimates (unchanged; no new Airbnb booking).**
   - The hidden 0.9 is still on every card inside about 45 days. Card gaps go up to £371.07 (P20 14-19 Dec) and £345.61 (P05 5-10 Jan).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time rule behind the hidden 0.9; keep the visible discounts.
2. **Critical: unsynced 1455, day 27.** No booked night is on sale today (10-14 Dec was cancelled). It still sells the open 6-9, 10-14 and 17-20 Dec and 4-7 Jan at prices frozen since 22 Nov. It does **not** offer 14-21 or 23-26 Dec, which may be a booking Smoobu does not know about.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar. Check 14-21 and 23-26 Dec for reservations, block 26 Nov-5 Jan or unlist, then map it to 3562176.
3. **High: Booking.com cancellations at 41.4% (12 of 29) since 24 Oct.** The P04 10-14 Dec cancellation lost £488.35 room (£617.35 with cleaning). Confirmed pace is 0.52 a day, and the confirmed count is still 17.
4. **High: Booking.com +15% not evidenced (t-bcom-markup-2511): 0 of 4 confirmed bookings since 18 Nov fit x1.15.** The only x1.15 fit was cancelled. P11 25-27 Nov paid £280.67, -42% against a x1.15 Standard of £484, and fits neither markup exactly.
   - Setting: Smoobu > Channel Manager > Booking.com > price overwrite on 2699998, 3588993 and 3064196 = +15%.
   - Corentin to screenshot one Standard Rate calendar (P12 30 Nov-3 Dec: x1.15 = £951, x1.10 = £910).
5. **High: P11 last-minute Booking.com stay nets £54.80 per £100 Smoobu**, below Airbnb at 0.765 (£64.64). The 18% commission is the policy booster, charged on room + cleaning, so it is not a flag. The roughly 40% promotion stack on a same-day booking is the lever. Setting: Booking.com extranet > Camden > Promotions (Last Minute / Genius / Mobile; size only).
6. **High: Scott Ellis Airbnb Special offer 20% still on** (-£214.20 to -£301.60 per card; 0.72x Smoobu inside 45 days). Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts. 7-10 Jan is not offered although open: NOT CHECKED.
7. **High: P04 Smoobu and channels out of step.** Airbnb 1657 shows PriceLabs prices, not Smoobu's. On 6-9 Dec the guest sees a price based on £523 while Smoobu holds £490; on 10-13 Dec it is £486 against £495. What Booking.com shows is NOT CHECKED.
   - Reyhan's 25 Nov 17:02Z P04 6-26 Dec change removed the -5% (Corentin to confirm).
   - Corentin to compare Barking's Booking.com Standard for 6-9 Dec with £604 (PriceLabs x1.15) or £565 (Smoobu x1.15).
8. **High (Corentin, confirm or revert):**
   - P20 shows capacity 6 (day 8) and prices 6 guests (+£40 on 26 Dec), against policy max 4.
   - Reyhan's P11 23-25 Dec override removal (-£63 over Christmas).
   - P11 block from 5 Jan and the unsellable 3-4 Jan: Smoobu > Calendar > 3064196.
9. **High: P04 Airbnb weekly 18%** (14-21 Dec, -£168.97, £28.16 over policy). **Long stay 10% on 5 nights** (P05 -£163.71; P13 -£72.99 / -£78.48 and -£93.51 / -£83.52; not in policy). P05 Early booking 12% is -£201.12.
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%; Long stay 0% on each listing if Corentin agrees.
10. **Medium: P13 twins now 10.7% apart in December** (3090701 cheaper, £841.59 / £751.68 for 14-19 Dec) and +7.5% in January. 34 of 68 nights are identical. There is no logged edit. Bring the twins within about 3% with a PriceLabs DSO (Corentin to decide).
11. **Medium: P12 26 Nov (tonight) is unsold** at £301 in Smoobu (Airbnb £255.85 room).

Data gaps:
1. Booking.com live prices, Standard vs Smoobu, derived-plan display, plan minimum stays, same-date ordering, and which rate plan / promotions priced P11 25-27 Nov: NOT CHECKED (AWS WAF 07:31:52Z, not circumvented).
2. Which Smoobu rate was in force for P11 26 Nov at 17:13Z on 25 Nov (£254 or £229): NOT CHECKED. The fit is reported on all three sets.
3. Why Smoobu `/rates` for P04 differs from the PriceLabs price that Airbnb 1657 shows (18 nights): NOT CHECKED.
4. Whether the Booking.com overwrite reads +15% on 2699998 / 3588993 / 3064196: NOT CHECKED (not exposed by the Smoobu GET API).
5. Whether 1455 has its own booking on 14-21 / 23-26 Dec, and its cleaning fee and min stay: NOT CHECKED (map search only).
6. Why Scott Ellis 7-10 Jan is not offered on Airbnb: NOT CHECKED.
7. P04 1-night cleaning £129 vs £142: inferred from the price fit, not read from Airbnb settings.
8. Why the P13 twins diverged with no logged edit: NOT CHECKED.
9. Vrbo (incl. the Camden Vrbo copy 12037367) and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
