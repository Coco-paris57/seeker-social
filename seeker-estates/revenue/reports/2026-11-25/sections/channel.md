## Channel parity

Run date D = 2026-11-25 (Wednesday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster;
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans (`booking_rate_plans`);
- P13 = one flat;
- the P02/P03/P06/P07 blocks (the P06 "Blocked channel" record modified 24 Nov 14:13 Smoobu clock is part of that), the P14 setup and the handbacks (P12 last night 13 Dec, so 4-7 Dec is inventory).

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments, 25 Nov-28 Feb, fetched **2026-11-25T07:24:28Z** (scratch `ch25/smoobu_rates25.json`). Yesterday's fetch (24 Nov 07:19:50Z, `ch24/smoobu_rates24.json`) is the "before" set.
- **Smoobu GET `/api/reservations`** (modifiedFrom 24 Nov, with cancellations): 3 records. I also pulled price-elements for the two paid ones and the Scott Ellis apartment list. I kept amounts only and dropped guest fields, guest counts and references (`ch25/smoobu_mod25.json`, `ch25/pe25.json`).
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` (smoobu, booked 24-25 Nov) returns 2 records, both Booking.com: P12 4-7 Dec and Scott Ellis 30 Dec-4 Jan. Rental revenue is shown ex-VAT (£638.78 = £766.54 / 1.2; £1,865.33 = £2,238.40 / 1.2). **No new Airbnb booking.**
  - `get_user_logs` (listing, 24-25 Nov) returns 10 entries, all Reyhan, 24 Nov 10:48-13:14Z (see §6).
- **Live Airbnb:** 25 plain public airbnb.co.uk map searches (curl), every page read, 07:26:22Z-07:31:22Z. URL, dates, search guests and timestamp for each are in `ch25/air/*.json`.
  - I also read four room pages (P20, Scott Ellis, 1455, synced P04 1657) at 07:32:12Z-07:32:21Z (`ch25/pg/`).
  - `data/snapshots/2026-11-25/channel_checks.csv` was absent. I copied it forward from 24 Nov (348 lines) and **appended 24 rows** under `.channel_checks.csv.lock` (372 lines).
  - Room = first price line minus cleaning (P04 synced £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195, P12 £150), before taxes.
- **Booking.com live: NOT CHECKED.** One plain search (Mile End, 30 Nov-3 Dec, 2 adults) at 07:32:35Z returned HTTP 202 with an AWS WAF challenge (`ch25/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**
- **Clock:** Smoobu's created and modified times are UTC+1. Below I give UTC.

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch25s/`.)

### 1. 1455, day 26: still selling the Booking.com nights 10-14 Dec, and the open 17-20 / 6-9 Dec

| Stay (2 adults searched) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch25/air/`) |
|---|---|---|---|---|
| 25-28 Nov / 27-30 Nov (Booking.com 25 Nov-2 Dec) | booked | not offered | not offered | p04_2528nov 07:27:08Z, p04_2730nov 07:27:02Z |
| **10-14 Dec (Booking.com, made 22 Nov)** | booked | **bookable £753.17** (same since 22 Nov) | not offered | p04_1014dec 07:26:22Z |
| **10-13 Dec** | booked | **bookable £600.94** (same) | not offered | p04_1013dec 07:26:30Z |
| 17-20 Dec | open £460 | **bookable £607.83** (same total; now shown "originally £694.10" with a Last-minute discount -£86.27) | offered, £351.89 room | p04_1720dec 07:26:38Z |
| 6-9 Dec | open £491 | **bookable £589.47** (same total; now "originally £672.50", Last-minute -£83.03) | offered, £375.61 room | p04_0609dec 07:26:46Z |
| 14-21 Dec | open £1,044 | not offered | offered | p04_1421dec 07:26:54Z |

- The 1455 room page is still live (07:32:18Z, `pg/p04u_room.html`, capacity 6).
- **Yes, still selling the booked Booking.com nights 10-14 Dec** (at risk: £488.35 room + £129 cleaning = £617.35, plus relocation), and the open 17-20 Dec and 6-9 Dec. The guest totals are unchanged for four days, so 1455 is still not taking any price from Smoobu. Only the display changed: Airbnb now shows its last-minute discount as a strikethrough.
- November is still not offered on either P04 listing. "Not offered" in a map search does not prove that 1455's calendar is blocked: NOT CHECKED.
- Setting (unchanged): Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 25 Nov-5 Jan **now**, or unlist it. Then map it to Smoobu 3562176.

### 2. Booking.com: the P12 4-7 Dec rebook, the second Scott Ellis reservation, totals

**P12 4-7 Dec (3 n), Booking.com, made 24 Nov 20:39 Smoobu clock (19:39Z), confirmed**

| Item | Value | Source |
|---|---|---|
| Room paid | **£766.54** incl. VAT £127.76 (1/6); ex-VAT £638.78 (= PriceLabs rental revenue) | Smoobu price-elements; PriceLabs `get_pms_reservations` |
| Cleaning / commission | £150 / **£137.48 = 15.0% of £916.54** (no booster) | Smoobu |
| vs the cancelled stay (paid £677.79) | **+£88.75** room | 24 Nov section |
| Smoobu at booking | **311 + 331 + 267 = £909**. P12's last push before the booking was 24 Nov 09:43Z and there has been none since, so today's Smoobu values are the ones in force at 19:39Z. The Dispatcher's ≈£915 (312 / 332 / 271) is the 07:19Z set, before that push. | `smoobu_rates25` vs `smoobu_rates24` |
| **Paid per £100 Smoobu** | **£84.33** (VAT incl.; £83.77 on £915), £70.27 ex-VAT. Net after 15%: **£71.68** (guest x 0.85), or £69.20 if the full commission incl. the cleaning share is taken off the room. | |
| Expected Standard (+15%) | ceil(x1.15) = 358 + 381 + 308 = **£1,047**. Paid / Standard = 0.7321 (**-26.8%**, size only) | policy `booking_markup` |

**Which stack fits (`ch25s/stack25.py`: 5 plans x up to 4 promotions x markups 1.0-1.3, both Smoobu sets).**
- **Only one list price fits to the penny: ceil(Smoobu x1.10) = 343 + 365 + 294 = £1,002, x 0.765 = £766.54.**
  - The exact £766.54 comes from the Weekly plan (-15%, per-night rounded) x one 10% promotion (Mobile, Genius L1 or Last Minute).
  - Standard x Genius 15% x Mobile 10%, or NR -10% x Genius 15%, gives £766.53 (1p off). That is the same 0.765 stack as the cancelled 5 Nov stay; Mile End still has Genius L2&3 15% (policy `booking_discount_stack_25oct`).
- **Nothing fits at x1.15** within £0.06 on either Smoobu set: it would need 0.7321, which is no clean combination.
- If it is the Weekly plan, a 3-night stay was priced on a 7-night plan. That is the same plan-minimum failure as P04 in October (policy `booking_monthly_rate_issue_24oct`).

**Scott Ellis Gardens, 2nd reservation: Booking.com 30 Dec-4 Jan (5 n), made 24 Nov 23:47 Smoobu clock (22:47Z), confirmed.**
- This is the first evidence that **Scott Ellis is on Booking.com**. Its first reservation is Airbnb 21-26 Dec (£1,631.76, made 22 Nov).

| Item | Value |
|---|---|
| Room paid | **£2,238.40** incl. VAT £373.07; ex-VAT £1,865.33 |
| Cleaning / commission | £150 / **£358.26 = 15.0% of £2,388.40** |
| Smoobu at booking (last push 24 Nov 10:55Z) | 619 + 618 + 501 + 465 + 339 = **£2,542** (07:19Z set £2,544); min stay 4 on 30 Dec, met |
| **Paid per £100 Smoobu** | **£88.06** VAT incl. (£73.38 ex-VAT); net after 15% **£74.85** |
| Expected Standard (+15%) | ceil(x1.15) = 712 + 711 + 577 + 535 + 390 = **£2,925**; paid / Standard = 0.7653 (**-23.5%**, size only) |
| Fit | **ceil(x1.10) = £2,798 x 0.80 = £2,238.40 exactly.** That is the Monthly plan (-20%) on a 5-night stay, or a single 20% promotion (Genius L3 20%, or another 20% deal). **No fit at x1.15.** Scott Ellis' Booking.com promotions are not in policy: NOT CHECKED. |

**+15% evidence. Three of the four Booking.com bookings made since the 18 Nov markup point to x1.10:**

| Booking | Made | Fit |
|---|---|---|
| P11 27-30 Nov | 20 Nov | at or below the x1.10 level (21 Nov section) |
| P04 10-14 Dec | 22 Nov | ceil(x1.15) x three 10% layers, within £0.08 (23 Nov section) |
| **P12 4-7 Dec** | 24 Nov | ceil(x1.10) x 0.765, to the penny |
| **Scott Ellis 30 Dec-4 Jan** | 24 Nov | ceil(x1.10) x 0.80, to the penny |

- Read: **the +15% overwrite may not be on Mile End (2699998) or Scott Ellis (3588993), and possibly Camden.** At x1.15 with the same stacks, the two new bookings would have paid £800.96 and £2,340.00, so **about £136.02 room less on two bookings** (estimate, same stack assumed).
- Setting: Smoobu > Channel Manager > Booking.com > price overwrite for 2699998, 3588993 and 3064196: check each reads +15%, as on Barking.
- Corentin to send a Standard Rate calendar screenshot for P12 30 Nov-3 Dec. Expected ceil(x1.15) = 279 / 296 / 297 = **£872**; ceil(x1.10) would be 267 / 283 / 284 = £834.

**Running totals since the 24 Oct markup cut** (`reservations.csv` 25 Nov, booked_on 24 Oct or later; the P04 20-23 Nov triplicate is counted once; room is VAT incl.; Scott Ellis is unmapped and not in the file)

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **28** (was 27) | 114 | £20,155.15 | £4,074.26 |
| Still confirmed | **17** (was 16) | 73 | £12,075.20 | £2,443.98 |
| Cancelled | **11** (unchanged) | 41 | £8,079.95 (**40.1%** of gross room) | £1,630.28 |
| Booked since +15% (18 Nov) | 3 / 3 confirmed | 10 | £1,793.62 | £353.87 |
| Scott Ellis (unmapped), extra | +1 confirmed | 5 | £2,238.40 | £358.26 |

- **This verifies the Dispatcher's 28 / 17 / 11.** Cancellation rate: **11 of 28 = 39.3% by count** (yesterday 40.7%), 41 of 114 nights = 36.0%, 40.1% of room value. Including Scott Ellis: 11 of 29 = 37.9%.
- By flat: P11 4, P12 4, P13 2, P04 1.
- Pace over 31.74 days (24 Oct 13:38Z to 25 Nov 07:24Z): **0.88 a day gross, 0.54 confirmed** (yesterday 0.88 / 0.52). With Scott Ellis: 0.91 / 0.57.
- **No cancellations** since yesterday (Smoobu modified-since list).
- **t-p12-reopen-2411 can close.** 4-7 Dec is rebooked for +£88.75, and the Airbnb P12 4-6 and 4-7 Dec searches no longer offer it (07:27:12Z / 07:27:22Z), so Airbnb is synced.
  - **PriceLabs has not seen it yet:** `prices.csv` still shows P12 4-6 Dec available at 311 / 331 / 267, with no refresh since 09:43Z. So the pack's P12 rate leak counts 8 n, not 11 (see §7).

**P11 Camden (Booking-only)**
- The Smoobu block **from 5 Jan 2027 is still there** (0 open nights from 5 Jan to 28 Feb). **3-4 Jan is still unsellable** (151 / 163 at min 3, with 5 Jan blocked; 2 Jan booked).
- Christmas 23 / 24 / 25 Dec is **£291 / £267 / £304** (yesterday £291 / £268 / £304; targets about £320 / £295 / £305). 3 Jan is **£151** (target about £195).
  - At +15%, Standard would be £335 / £308 / £350 / £174.
  - Display: NOT CHECKED (WAF).
- Corentin to confirm a handback (then add it to `handbacks`) or remove the block: Smoobu > Calendar > 3064196.

### 3. t-p04-airbnb-sync-2311, day 3: fixed

| Stay | Card line room | / Smoobu 25 Nov | Smoobu 24 Nov | Price Airbnb had yesterday |
|---|---|---|---|---|
| 6-9 Dec | £441.90 | **0.9000 x £491** | £507 | £474 |
| 17-20 Dec | £414.00 | **0.9000 x £460** | £473 | £443 |
| 14-21 Dec | £939.60 | **0.9000 x £1,044** | £1,076 | £1,006 |

- **Resolved.** Airbnb listing 1657859794156786222 now carries today's Smoobu prices exactly at the 0.9 tier (07:26:38Z-07:26:54Z). The 24 Nov 10:54Z push, which followed Reyhan's P04 edit, got through. Close t-p04-airbnb-sync-2311.
- The cards are still under Smoobu, through the a-airbnb-rules tier (§4) and Reyhan's deeper -5% on 6-23 Dec (§6):
  - 6-9 Dec: £375.61 room (0.765)
  - 17-20 Dec: £351.89 (0.765)
  - 14-21 Dec: £770.46 (0.738, with weekly 18%)

### 4. a-airbnb-rules (day 27), P06, Scott Ellis Gardens

**a-airbnb-rules: no new Airbnb booking** (Smoobu modified-since; PriceLabs `get_pms_reservations` 24-25 Nov shows Booking.com only). The total stays **£4,124.09 confirmed / £4,688.82 including estimates**.

**New today: the last-minute layer is now shown to guests on most cards.** Guest totals are unchanged to the penny (P06 £406.69, 1455 £589.47 / £607.83). The card now reads "originally £X", with a **"Last-minute discount" line of exactly 15% of a 0.9 x Smoobu line**.
- Where it shows: P04 synced 6-9 and 17-20 Dec, 1455 6-9 and 17-20 Dec, P05 7-9 Dec, P06 2-3 Dec, P20 14-19 Dec (leads 7-22 days).
- Where it does not: P12 30 Nov-3 Dec (lead 5) and P20 5-6 Dec (lead 10) still show 0.765 with no line.
- What triggered it, and whether someone changed a setting: NOT CHECKED.
- This meets Corentin's preference for visible discounts (`airbnb_visible_discounts`) but does not change price. **The 0.9 line under Smoobu is still hidden on every card except P05 13-17 Feb (1.0) and Scott Ellis 13-17 Feb (1.0).**

| Tier (guest room / Smoobu) | Where | Lead |
|---|---|---|
| 0.765 (0.9 hidden x 15% visible last-minute) | P04 6-9 / 17-20 Dec, P05 7-9 Dec, P06 2-3 Dec, P20 14-19 Dec | 7-22 d |
| 0.765 (no visible line) | P12 30 Nov-3 Dec, P20 5-6 Dec | 5-10 d |
| 0.738 (0.9 x weekly 18%) | P04 14-21 Dec | 19 d |
| 0.900 | P20 26 Dec | 31 d |
| 0.810 (0.9 x long stay 10%) | P13 14-19 Dec and 3-8 Jan (both twins), P05 5-10 Jan | 19-41 d |
| 0.880 (visible Early booking 12%) | P05 13-17 Feb | 80 d |
| 0.720 (0.9 x Special offer 20%) | Scott Ellis 10-13 Dec, 16-19 Dec, 7-10 Jan | 15-43 d |
| 0.800 (1.0 x Special offer 20%) | Scott Ellis 13-17 Feb | 80 d |

- Setting (unchanged): Smoobu > Channel Manager > Airbnb > each apartment (incl. 3288517, 3588993, 2699998) > Default pricing rules. Remove the lead-time rule behind the hidden 0.9, and keep the visible discounts.

**P06: nothing new visible.** The 2-3 Dec card is £277.69 = 0.765 x £363, now split as £326.70 line minus a £49.01 Last-minute discount. The extra layer on the two booked stays stays **NOT CHECKED**.

**Scott Ellis Gardens on Airbnb: the 20% Special offer is still on, on all four cards (07:30:45Z-07:31:03Z, plus 13-17 Feb at 07:29:43Z).** The room page still shows `isNewListing` true and capacity 6 (07:32:15Z).

| Stay (search guests) | Lead | Smoobu | Line room | Special offer | Room after | vs Smoobu |
|---|---|---|---|---|---|---|
| 10-13 Dec (4) | 15 d | £1,319 | £1,187.10 | -£237.42 | £949.68 | -£369.32 (-28.0%) |
| 16-19 Dec (4) | 21 d | £1,323 | £1,190.70 | -£238.14 | £952.56 | -£370.44 (-28.0%) |
| 7-10 Jan (4) | 43 d | £979 | £881.10 | -£176.22 | £704.88 | -£274.12 (-28.0%) |
| 13-17 Feb (6) | 80 d | £1,511 | £1,511.00 | -£302.20 | £1,208.80 | -£302.20 (-20.0%) |
| 27-30 Dec (4) | 32 d | £1,717 (27 Dec min 7) | not offered (matches min stay) | - | - | - |
| 30 Dec-2 Jan (4) | 35 d | booked (Booking.com) | not offered (synced) | - | - | - |

- Scott Ellis now has 2 reservations (Airbnb + Booking.com), so 1 Airbnb reservation of the 3 after which the new-listing promotion ended on P20.
- Booking.com paid 0.88 x Smoobu against 0.72 on Airbnb, so on Scott Ellis the Airbnb offer is the deeper discount.
- **Corentin to keep it or end it:** Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.
- The Smoobu blocks of 23 Nov are unchanged: 29 Nov-9 Dec, 15 Dec, 6 Jan and 12 Jan are still closed (t-seg-blocks-2411), and no Scott Ellis block was modified since 24 Nov. Corentin to confirm or remove: Smoobu > Calendar > 3588993.

### 5. P20 guests, P04 weekly, long stay, twins

**P20 guest count: day 7, not changed.**
- The room page shows **capacity 6** (`personCapacity` 6; 07:32:12Z). Policy `listing_facts.P20.max_guests` is 4.
- The 26-27 Dec card is still offered for **6 adults searched at £504.40 room against £464.40 for 2 adults (+£40)** (07:29:08Z / 07:28:54Z).
- Corentin to confirm or revert. Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 14-21 Dec: -£169.14 = 18.0% of £939.60. At 15% it would be £140.94, so **£28.20 over policy**.
- Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

**Long stay 10% on 5 nights: still on (not in policy; Corentin to keep or zero it).**
- P05 5-10 Jan: -£164.43.
- P13 3-8 Jan: -£72.90 (3064856) / -£77.85 (3090701).
- P13 14-19 Dec: -£88.56 / -£91.17.
- P05 13-17 Feb: the visible Early booking 12% is -£201.96 (a-p05-earlybird).
- Setting: each Airbnb listing > Pricing > Discounts > Long stay 0%.

**t-p13-twins: further apart.**
- In Smoobu, **36 of 68 jointly open nights are identical** (yesterday 39).
- 3090701 is **+2.6% to +3.2% on 13-21 Dec**, **+6.2% to +7.2% on 3-23 Jan** (yesterday +0.6%), and **-20.2% on 27 Nov (263 / 210) and 1 Dec (233 / 186)**.
- 3064856 fell on January: the 3-8 Jan Smoobu sum went from £861 to £810, while 3090701 went from £866 to £865.
- Cards:
  - 14-19 Dec: **£797.04 / £820.53** (+2.9%)
  - 3-8 Jan: **£656.10 / £700.65** (+6.8%)
- No P13 edit is logged on 24-25 Nov, so the 24 Nov 09:37Z / 10:50Z refreshes did this. Cause NOT CHECKED (pricelabs section).
- December meets "slightly different". January (+6.8%) and the -20% nights are wider than that. Setting: PriceLabs 3090701 DSO to bring January to about +3% over 3064856 (Corentin to decide).

### 6. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup; P20's own last-minute 15% applies at 0-14 days; weekly 15% at 7+ nights). Booking.com expected = Standard = ceil(Smoobu x1.15), before promotions. "Search guests" is the search parameter, not a reservation party. The source for every Airbnb row is `ch25/air/<tag>.json` and the matching `channel_checks.csv` row.

| Ref | Channel | Stay (lead) | Search guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P12 | Booking.com (new, 24 Nov) | 4-7 Dec, 3 n (10 at booking) | - | £909 at booking | £1,047 Standard | **£766.54 paid** | -26.8% | size only (stack is policy); fits x1.10 x 0.765 | Smoobu price-elements; PriceLabs reservations |
| Scott Ellis | Booking.com (new, 24 Nov) | 30 Dec-4 Jan, 5 n (36) | - | £2,542 at booking | £2,925 Standard | **£2,238.40 paid** | -23.5% | size only; fits x1.10 x 0.80 | same |
| P04 synced | Airbnb | 6-9 Dec (11) | 2 | £491 | £491.00 | £375.61 | -23.5% | FLAG | p04_0609dec 07:26:46Z |
| P04 synced | Airbnb | 17-20 Dec (22) | 2 | £460 | £460.00 | £351.89 | -23.5% | FLAG | p04_1720dec 07:26:38Z |
| P04 synced | Airbnb | 14-21 Dec, 7 n (19) | 2 | £1,044 | £887.40 | £770.46 | -13.2% | FLAG (0.9 + weekly 18%) | p04_1421dec 07:26:54Z |
| P04 unsynced 1455 | Airbnb | 10-14 Dec / 10-13 Dec | 2 | booked | not for sale | £753.17 / £600.94 card incl. cleaning | n/a | FLAG (double-sell) | p04_1014dec, p04_1013dec |
| P04 unsynced 1455 | Airbnb | 17-20 Dec / 6-9 Dec | 2 | £460 / £491 | n/a (unsynced copy) | £607.83 / £589.47 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_1720dec, p04_0609dec |
| P04 both | Airbnb | 25-28, 27-30 Nov | 2 | booked | - | not offered | - | ok | p04_2528nov, p04_2730nov |
| P06 | Airbnb | 2-3 Dec, 1 n (7) | 2 | £363 | £363.00 | £277.69 | -23.5% | FLAG | p06_0203dec 07:27:50Z |
| P12 | Airbnb | 30 Nov-3 Dec (5) | 2 | £757 | £757.00 | £579.10 | -23.5% | FLAG | p12_3003dec 07:27:31Z |
| P12 | Airbnb | 4-6 / 4-7 Dec | 2 | booked (Booking.com) | - | not offered | - | ok (synced) | p12_0406dec, p12_0407dec |
| P20 | Airbnb | 5-6 Dec (10) | 2 | £588 | £499.80 (LM 15%) | £449.82 | -10.0% | FLAG | p20_0506dec 07:28:19Z |
| P20 | Airbnb | 14-19 Dec, 5 n (19) | 2 | £1,581 | £1,581.00 | £1,209.46 | -23.5% | FLAG | p20_1419dec 07:28:27Z |
| P20 | Airbnb | 26-27 Dec (31) | 2 | £516 | £516.00 | £464.40 | -10.0% | FLAG | p20_2627dec 07:28:54Z |
| P20 | Airbnb | 26-27 Dec (31) | **6** | £516 | not for sale (max 4) | £504.40 (+£40) | - | FLAG (guests) | p20_2627dec6 07:29:08Z |
| P05 | Airbnb | 7-9 Dec, 2 n (12) | 6 | £835 | £835.00 | £638.77 | -23.5% | FLAG | p05_0709dec 07:29:11Z |
| P05 | Airbnb | 5-10 Jan, 5 n (41) | 6 | £1,827 | £1,827.00 | £1,479.87 | -19.0% | FLAG | p05_0510jan 07:29:20Z |
| P05 | Airbnb | 13-17 Feb, 4 n (80) | 6 | £1,683 | £1,683.00 | £1,481.04 | -12.0% (visible Early booking) | FLAG | p05_1317feb6 07:29:43Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (19) | 4 | £984 / £1,013 | same | £797.04 / £820.53 | -19.0% / -19.0% | FLAG | p13_1419dec 07:30:04Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (39) | 4 | £810 / £865 | same | £656.10 / £700.65 | -19.0% / -19.0% | FLAG | p13_0308jan 07:30:21Z |
| Scott Ellis 3588993 | Airbnb | 10-13 Dec (15) | 4 | £1,319 | £1,319.00 | £949.68 | -28.0% | FLAG | se_1013dec 07:30:45Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (21) | 4 | £1,323 | £1,323.00 | £952.56 | -28.0% | FLAG | se_1619dec 07:30:53Z |
| Scott Ellis 3588993 | Airbnb | 7-10 Jan (43) | 4 | £979 | £979.00 | £704.88 | -28.0% | FLAG | se_0710jan 07:31:03Z |
| Scott Ellis 3588993 | Airbnb | 13-17 Feb, 4 n (80) | 6 | £1,511 | £1,511.00 | £1,208.80 | -20.0% | FLAG (Special offer) | p05_1317feb6 07:29:43Z |
| Scott Ellis 3588993 | Airbnb | 30 Dec-2 Jan / 27-30 Dec | 4 | booked / 27 Dec min 7 | - | not offered | - | ok | se_3002jan, se_2730dec |
| all | Booking.com live | - | - | - | e.g. P12 30 Nov-3 Dec Standard £872 | NOT CHECKED: AWS WAF 07:32:35Z | - | - | ch25/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest against Smoobu are:

| Card | Gap |
|---|---|
| P20 14-19 Dec | £371.54 |
| Scott Ellis 16-19 Dec | £370.44 |
| Scott Ellis 10-13 Dec | £369.32 |
| P05 5-10 Jan | £347.13 |
| Scott Ellis 13-17 Feb | £302.20 |
| Scott Ellis 7-10 Jan | £274.12 |
| P04 14-21 Dec | £273.54 (£116.94 against expected after weekly 15%) |
| P05 13-17 Feb | £201.96 |
| P05 7-9 Dec | £196.23 |
| P13 3090701 14-19 Dec | £192.47 |
| P13 3064856 14-19 Dec | £186.96 |
| P12 30 Nov-3 Dec | £177.90 |

**Reyhan's edits since yesterday's run (24 Nov 10:48-13:14Z, PriceLabs logs).** All go to Corentin as confirm or revert.
- **P04 6-23 Dec -5% min 3.** This replaces the -2% and conflicts with "cut PriceLabs discounts". Smoobu went 507→491 (6-9 Dec), 473→460 (17-20 Dec) and 1,076→1,044 (14-21 Dec).
- P05 29 Nov-2 Dec -8% min 3.
- P20 24 Nov +25% min 1 (past night).
- P11 min 2 on 30 Nov-4 Dec and 14-18 Dec (copied to the Vrbo copy).
- Scott Ellis min 3 on 17-19 Dec and 7-9 Jan.
- P06 min 3 on 6-13 Dec.

These edit times match the 24 Nov daytime refreshes of P11 / P05 / P20 / P04 / Scott Ellis / P06. P12 (09:43Z) and P13 (09:37Z / 10:50Z) have no logged edit.

### 7. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, in policy) | £115.00 | £97.75 |
| **Booking.com observed, Scott Ellis 30 Dec-4 Jan (15%)** | **£88.06** (VAT incl.) | **£74.85** |
| **Booking.com observed, P12 4-7 Dec rebook (15%)** | **£84.33** | **£71.68** (£69.20 with the cleaning share of commission) |
| Booking.com observed, P04 10-14 Dec (15%) | £84.20 | £71.57 |
| Booking.com observed, P11 27-30 Nov (A / B), 18% | £77.18 / £74.10 | £63.29 / £60.76 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb 0.900 (P20 26 Dec) | £90.00 | £76.05 |
| Airbnb 0.880 (P05 Early booking) | £88.00 | £74.36 |
| Airbnb 0.810 (P05 / P13, 0.9 x long stay) | £81.00 | £68.44 |
| Airbnb 0.800 (Scott Ellis Feb, Special offer) | £80.00 | £67.60 |
| Airbnb 0.765 (P04, P05, P06, P12, P20) | £76.50 | £64.64 |
| Airbnb 0.738 (P04 14-21 Dec, weekly 18%) | £73.80 | £62.36 |
| Airbnb 0.720 (Scott Ellis) | £72.00 | £60.84 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- On observed prices, Booking.com nets £71.57-£74.85 on the three 15% stays, more than Airbnb at 0.765 (£64.64). So "Booking.com nets at least Airbnb" holds on observed prices, even with x1.10 lists.
- On P12 4-7 Dec, Booking.com nets £651.56, against £591.47 for yesterday's Airbnb card (£699.97 at 15.5%).
- Every observed Airbnb price is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 25 Nov; per property, the top-level field is null), VAT-corrected**
- PriceLabs booked ADR is ex-VAT for Booking.com (confirmed today: rental revenue = room / 1.2), so Booking.com nights are multiplied by 1.2. The 5 nights with a blank ref (Scott Ellis) are dropped.
- The unadjusted run reproduces the pack exactly (`ch25s/vat25.py`).
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -19.3% (11 n) | **-3.1%** | all Booking.com |
| P11 | -31.3% (11 n) | **-17.6%** | all Booking.com |
| P12 | -39.1% (8 n) | **-27.0%**; **-23.8% on 11 n** with the 4-7 Dec rebook | PriceLabs still shows 4-6 Dec open (no refresh since 09:43Z), so the pack misses the rebook (-15.7% vs Smoobu £909) |
| P13 | -31.4% (11 n) | **-26.1%** | Booking.com -27.4% (5 n); Airbnb -25.2% (6 n) |

Airbnb-only flats need no correction: P01 -36.8%, P05 -14.3%, P06 -46.5%, P09 -17.2%, P20 -41.4%.

### 8. Fees and min stay

**Cleaning**
- Every synced card reconciles exactly at its tier with P04 £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195 and P12 £150 (3 n).
- Booking.com cleaning in Smoobu: P12 £150 and Scott Ellis £150 on the new bookings; P11 £149. Booking.com per-channel fee settings: NOT CHECKED.

**Min stay as displayed matches Smoobu**
- Scott Ellis 27-30 Dec is not offered (27 Dec min 7). 10-13 Dec and 16-19 Dec sell as 3 nights (min 3, incl. Reyhan's 17-19 Dec DSO). The Booking.com 30 Dec-4 Jan stay meets 30 Dec min 4.
- P06 2 Dec, P20 5 Dec and P20 26 Dec sell as 1 night (min 1).
- P12 30 Nov-3 Dec sells as 3 nights (min 2). P05 7-9 Dec sells as 2 nights (min 2).
- P04 sells at 3 nights (min 3).
- 1455 min stay: NOT CHECKED (no 1-2 night search).
- Booking.com plan minimums: NOT CHECKED (WAF). The P12 rebook fits the Weekly plan on 3 nights, and the Scott Ellis booking fits the Monthly plan on 5 nights. Either would mean the plan minimums are not enforced (as P04 in October), but both bookings also fit promotion-only stacks.
- **P12 26 Nov (tomorrow):** £290 in Smoobu (was £294), min 1, open. Airbnb / Booking.com display: NOT CHECKED (not searched).

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 27. £4,124.09 confirmed; £4,688.82 including estimates (unchanged; no new Airbnb booking).**
   - The hidden 0.9 is still on every card inside about 45 days. The 15% last-minute is now displayed as a strikethrough on 7 cards (same price). Card gaps go up to £371.54 (P20 14-19 Dec) and £347.13 (P05 5-10 Jan).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment (incl. 3288517, 3588993, 2699998) > Default pricing rules. Remove the lead-time rule behind the hidden 0.9; keep the visible discounts.
2. **Critical: unsynced 1455, day 26.** It still sells the **booked Booking.com nights 10-14 Dec (£753.17) and 10-13 Dec (£600.94)**, and the open 17-20 Dec (£607.83) and 6-9 Dec (£589.47). Its totals are frozen since 22 Nov.
   - At risk: £617.35 (Booking.com 10-14 Dec incl. cleaning), plus relocation.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 25 Nov-5 Jan now, or unlist. Then map it to 3562176.
3. **High: Scott Ellis on Airbnb at 0.72x, Special offer still on.** -£274.12 to -£370.44 per 3-night card; -£302.20 on 13-17 Feb.
   - The Booking.com stay paid 0.88x, so the Airbnb offer is the deepest discount on the flat.
   - Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.
   - The 23 Nov Smoobu blocks (29 Nov-9 Dec, 15 Dec, 6 Jan, 12 Jan) are unchanged: confirm or remove in Smoobu > Calendar > 3588993.
4. **High: the Booking.com +15% is not evidenced on Mile End or Scott Ellis.** Both new bookings fit ceil(Smoobu x1.10) to the penny (P12 x 0.765, Scott Ellis x 0.80), and nothing fits x1.15.
   - About £136.02 of room under x1.15 on these two bookings (estimate). Three of four bookings since 18 Nov point to x1.10.
   - Setting: Smoobu > Channel Manager > Booking.com > price overwrite on 2699998, 3588993 and 3064196 = +15%.
   - Corentin to screenshot P12's Standard Rate for 30 Nov-3 Dec (expected £872; x1.10 = £834). Also ask which plan the two bookings were priced on: Weekly on 3 nights, or Monthly on 5, would mean plan minimums are not enforced.
5. **High: Booking.com cancellations at 39.3% (11 of 28) since 24 Oct.** P12 4-7 Dec is rebooked (+£88.75; £84.33 per £100 Smoobu, net £71.68): close t-p12-reopen-2411.
   - Totals 28 / 17 / 11 verified; confirmed pace 0.54 a day. Scott Ellis adds a 29th booking (confirmed, £2,238.40) outside the mapped file.
6. **High: P11 Camden blocked in Smoobu from 5 Jan (day 3)**, and 3-4 Jan is unsellable (2 nights at min 3). Corentin to confirm a handback (then add to `handbacks`) or remove it in Smoobu > Calendar > 3064196.
7. **High (Corentin, confirm or revert):**
   - P20 shows capacity 6 (day 7) and prices 6 guests (+£40 on 26 Dec), against policy max 4.
   - Reyhan's P04 6-23 Dec -5% (was -2%, against "cut PriceLabs discounts"), plus the min-stay DSOs on P05, P06, P11 and Scott Ellis.
8. **High: P04 Airbnb weekly 18%** (14-21 Dec, -£169.14, £28.20 over policy) and **long stay 10% on 5 nights** (P05 -£164.43; P13 -£72.90 / -£77.85 and -£88.56 / -£91.17).
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%; Long stay 0% on each listing (if Corentin agrees).
   - P05 Early booking 12% is -£201.96.
9. **Medium: P13 twins further apart (36 of 68 nights identical).** January is now +6.8% on 3090701 (cards £656.10 / £700.65) with no logged edit. December (+2.9%) is fine.
   - t-channel-gaps: P11 3 Jan £151 against a target of about £195; Christmas £291 / £267 / £304.
10. **Resolved: t-p04-airbnb-sync-2311.** The synced P04 Airbnb listing now carries today's Smoobu prices (£491 / £460 / £1,044 at the 0.9 tier).

Data gaps:
1. Booking.com live prices, derived-plan display, plan minimum stays, same-date ordering, Scott Ellis' Booking.com promotions and which rate plan the P12 and Scott Ellis bookings used: NOT CHECKED (AWS WAF 07:32:35Z, not circumvented).
2. Whether the Booking.com overwrite reads +15% on 2699998 / 3588993 / 3064196: NOT CHECKED (Smoobu settings not exposed by GET API).
3. Why Airbnb now shows the 15% last-minute as a strikethrough on some cards but not on P12 30 Nov-3 Dec / P20 5-6 Dec: NOT CHECKED.
4. Why the P06 stays paid 0.60x / 0.74x: NOT CHECKED (no Airbnb breakdown).
5. Who set the Scott Ellis blocks (29 Nov-9 Dec, 6 / 12 Jan) and the P11 block from 5 Jan, and why: NOT CHECKED.
6. Why the P13 twins diverged further without a logged edit: NOT CHECKED.
7. Whether 1455's calendar is blocked in November or just not returned; 1455 cleaning fee and min stay: NOT CHECKED.
8. The P20 extra-guest fee's source and threshold: NOT CHECKED.
9. PriceLabs has not yet registered P12 4-6 Dec as booked (no refresh since 24 Nov 09:43Z), so the pack's P12 rate leak and pace miss the rebook until the next refresh.
10. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
