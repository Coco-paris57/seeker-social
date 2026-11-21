## Channel parity

Run date D = 2026-11-21 (Saturday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster (Camden 18% for check-ins 1 Nov-18 Dec and Jan-Feb);
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans;
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 15 apartments, 21 Nov-28 Feb, fetched **2026-11-21T07:18:35Z** (scratch `ch21/smoobu_rates21.json`).
- **Smoobu GET `/api/reservations`** (modifiedFrom 20 Nov, with cancellations): 8 records, plus GET price-elements for the 3 guest records. I kept amounts only and dropped guest fields and references (`ch21/smoobu_mod21.json`, `ch21/pe21.json`).
  - The 5 other records are "Blocked channel" blocks on new apartment 3588993 (Scott Ellis Gardens, not in `id_map`).
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` for bookings made 20-21 Nov returns 2 records: the P11 stay and the cancelled P20 stay.
  - `get_user_logs` for 20-21 Nov returns 33 entries.
  - The raw `listing_data` and `prices_*` files from the 21 Nov snapshot.
- **Live Airbnb:** 21 plain public airbnb.co.uk map searches (curl), every page read, 07:22:58Z-07:26:26Z.
  - URL, dates, guests and timestamp for each are in `ch21/air/*.json`.
  - I also read the P20 room page at 07:26:59Z (`ch21/pg/p20_room.html`).
  - `data/snapshots/2026-11-21/channel_checks.csv` was absent. I copied it forward from 20 Nov (151 lines) and **appended 23 rows** under `.channel_checks.csv.lock` (174 lines).
  - Room = first price line minus cleaning (P04 synced £142, P13/P20 £150, P05 £195), before taxes. The P05 8-guest rows include the £20 a night extra-guest fee.
- **Booking.com live: NOT CHECKED.** One plain search (Camden, 30 Nov-3 Dec, 2 adults) at 07:27:10Z returned HTTP 202 with an AWS WAF challenge (`ch21/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are confirmed in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch21s/`.)

**Timing note, used below.** Smoobu timestamps look like UK time + 1 h (CET).
- For the P20 cancellation, Smoobu `modifiedAt` is 20:19:05 but PriceLabs `cancelled_on` is 19:19:06Z.
- PriceLabs `booked_date` copies the Smoobu clock and labels it "Z".
- So the P11 booking stamped "23:06" was probably made at **22:06Z**. That is before P11's only push of the day (**22:50:39Z**; the previous push was 20 Nov 00:30Z).
- This reading is NOT CHECKED. Both possible Smoobu price sets are shown below.

### 1. P11 Camden Booking.com 27-30 Nov: the first booking since the +15% markup and the derived plans

| Item | Value | Source |
|---|---|---|
| Stay | 27-30 Nov, 3 n, **3 adults**, lead 7 d. Created 20 Nov "23:06" (Smoobu clock; probably 22:06Z). Smoobu type "modification of booking". | Smoobu reservation; PriceLabs `get_pms_reservations` |
| Room paid | **£538.73** (£179.58 a night), VAT £89.79 (1/6) included | Smoobu price-elements `basePrice`, price-details |
| Cleaning | £149 | Smoobu price-details |
| Commission | **£123.79 = 18.00% of £687.73** (room plus cleaning) | Smoobu `commission` |
| PriceLabs `rental_revenue` | £448.94, which is the room ex-VAT | PriceLabs |

**Commission is expected.** The 27 Nov check-in falls inside the Camden Visibility Booster (18%, check-ins 1 Nov-18 Dec), so I do not flag it. The 18% includes £26.82 on cleaning.

**Smoobu at booking: two possible sets** (P11 pushes were 20 Nov 00:30Z and 22:50:39Z)

| Basis | 27 / 28 / 29 Nov | Smoobu sum | Standard = ceil(x1.15) | Old x1.10 list | Paid / Standard | Paid / Smoobu |
|---|---|---|---|---|---|---|
| A: after the 22:50Z push (= Smoobu 21 Nov 07:18Z) | 251 / 257 / 190 | £698 | 289 + 296 + 219 = **£804** | £769 | 0.6701 | **0.7718** |
| B: before it (= Smoobu 20 Nov 07:18Z, from the 00:30Z push) | 262 / 268 / 197 | £727 | 302 + 309 + 227 = **£838** | £801 | 0.6429 | **0.7410** |

- Reyhan's P11 DSOs on 20 Nov also matter here: 22 Nov-4 Dec -5% min 3 at 21:10:15Z, then 22 Nov-7 Dec -2% (min 3, then min 2) at 22:49:39Z and 22:49:52Z, then the push at 22:50Z.
- If the -5% DSO was pushed at about 21:10Z, a third, unreadable price set existed between 21:10Z and 22:50Z. NOT CHECKED: PriceLabs keeps only the last push time.

**Derived plans and the promotion stack (Standard -> plan -> Mobile 10% x Genius L1 10% x Last Minute 10% x occupancy -5%)**

| Plan (factor) | A: plan price | A: x 0.69255 | B: plan price | B: x 0.69255 |
|---|---|---|---|---|
| Standard (1.00) | £804.00 | £556.81 | £838.00 | £580.36 |
| Non-refundable (0.90) | £723.60 | £501.13 | £754.20 | £522.32 |
| Weekly (0.85; 7-night min) | £683.40 | - | £712.30 | - |
| Monthly (0.80; 28-night min) | £643.20 | - | £670.40 | - |
| NR Weekly (0.82) | £659.28 | - | £687.16 | - |
| **Paid** | **£538.73** | | | |

**No plan and stack combination reconciles to the penny.**
- I searched Standard, NR, Weekly, Monthly and NR Weekly; all sets of 0-5 layers from {Mobile 10%, Genius 10/15/20%, Last Minute 10/15%, Early Booker 10/15%, occupancy 5/10%, Black Friday 30%}; per-night and whole-stay rounding; and both price sets A and B, plus mixes of old and new night prices (`ch21s/stack*.py`).
- The only fit with clean layers is **list £739 x 0.729 (three 10% layers, no occupancy) = £538.731**. No Smoobu set I can read gives a list of £739:
  - x1.15 would need Smoobu of about £642;
  - x1.10 would need about £672.
- The 13/14 Nov stays fitted ceil(x1.10) x 0.69255 to the penny. That formula is now off:
  - under A, -£6.16 at x1.10 and +£18.08 at x1.15;
  - under B, +£16.00 at x1.10 and +£41.63 at x1.15.
- Most likely plan: Standard or Non-refundable. A 3-night stay should not reach Weekly or Monthly, but the Monthly minimum was not enforced on P04 in October (`booking_monthly_rate_issue_24oct`). **Which plan was used: NOT CHECKED**, because there is no extranet breakdown.

**Does it show +15%? No, it is not evidenced.**
- Paid per £100 Smoobu is **£77.18 (A) or £74.10 (B)**.
- The cancelled stay under x1.10 paid £76.23 per £100. At x1.15 with the same stack it would be about £79.64.
- So this booking paid **at or below the old x1.10 level**. Either the +15% is not reaching Booking.com, or an extra layer of about 3% (A) or 7% (B) has appeared, for example a derived-plan or occupancy effect.
- Against Standard x1.15, the paid price is **-33.0% (A) or -35.7% (B)**. That is the size of the promotion stack, reported for size only per `booking_stacked_promotions`.

**The cancelled 28 Nov-2 Dec stay** (4 n, 4 adults, made 13 Nov 23:20 Smoobu clock, cancelled 20 Nov "22:08" Smoobu clock)
- Paid £605.29 room, £149 cleaning and £135.77 commission (18.00% of £754.29).
- It reconciled to the penny on 14 Nov: Smoobu 260/188/170/176 = £794, list ceil(x1.10) = 286/207/187/194 = £874, and paid = £874 x 0.69255.
- **Paid per night: 28 Nov £198.07, 29 Nov £143.36, 30 Nov £129.51, 1 Dec £134.36 (average £151.32).**
- The new stay averages **£179.58** (+18.7%). On the two nights both stays cover (28-29 Nov), the old stay paid £341.43. The new stay's per-night split is NOT CHECKED. Pro rata to Standard A it would be about £193.65 / £198.34 / £146.74 (estimate).
- **Was it the same party? NOT CHECKED** (no guest data). The new stay was made about 58 minutes after the cancellation, has 3 adults instead of 4, and overlaps the old dates.

**Net effect on 27 Nov-2 Dec**

| Measure | Before | After | Change |
|---|---|---|---|
| Booked nights | 28 Nov-1 Dec (4) | 27-29 Nov (3) | **-1** (27 Nov gained; 30 Nov and 1 Dec lost) |
| Room | £605.29 | £538.73 | **-£66.56** |
| Commission | £135.77 | £123.79 | -£11.98 |
| Net to owner incl. cleaning | £618.52 | £563.94 | **-£54.58** |

- 30 Nov-2 Dec is open again at Smoobu £182 / £184 / £209 (min 2). At x1.15 the Standard prices are £210 / £212 / £241.
- 26 Nov (£218, min 2) now sits between open 22-25 Nov and the 27 Nov arrival, so it is still sellable as part of 25-27 Nov.

**Booking.com running totals since the 24 Oct markup cut**

Source: `reservations.csv` 21 Nov, booked_on 24 Oct or later. The P04 20-23 Nov triplicate is counted once.

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross since cut | **26** (+1) | 107 | £18,900.26 | £3,844.18 |
| Still confirmed | **16** (+1 new, -1 cancelled) | 69 | £11,498.10 | £2,338.07 |
| Cancelled | **10** (+1) | 38 | £7,402.16 (**39.2%** of gross room; was 37.0%) | £1,506.11 |
| Booked since +10% (12 Nov) | 6 gross / 4 confirmed | 29 / 20 | £5,127.90 / £3,675.51 | £1,007.44 / £692.03 |
| Booked since +15% (18 Nov) | **1 / 1** | 3 | £538.73 | £123.79 |

Pace over 27.74 days (24 Oct 13:38Z to 21 Nov 07:18Z): **0.94 a day gross and 0.58 confirmed**. Confirmed is still falling (0.60 yesterday).

### 2. P20 Waterford Court Airbnb 5 Dec: booked and cancelled the same day

| Item | Value | Source |
|---|---|---|
| Stay | 5-6 Dec, 1 n, 4 guests, lead 15 d. Created 20 Nov "10:54" (Smoobu clock); cancelled **19:19:06Z** (PriceLabs `cancelled_on`). | Smoobu; PriceLabs `get_pms_reservations` |
| Room / cleaning / commission | **£343.33** / £150 / £76.47 = 15.5% of £493.33 | Smoobu price-elements |
| Smoobu 5 Dec | £528 at 20 Nov 07:18Z; **£512 now**. PriceLabs `price` is 512, `user_price` 528, `uncustomized_price` 371. P20 last pushed 20 Nov 09:20:45Z. | Smoobu rates; PriceLabs `prices_3547481` |
| Fit | **£528 x 0.765 x 0.85 = £343.332 -> £343.33 to the penny.** Against £512 the factor would be 0.6706, which is not a clean layer. | `ch21s` |

**What it shows about the +100% override**
1. **The night sells.** A one-night orphan at a "+100%" price found a guest within hours.
2. **The hidden Airbnb layers took 35% off.**
   - The guest paid £343.33. That is **7.5% below PriceLabs' own un-overridden price (£371)** and 1.30 times the half-price equivalent (£264).
   - Expected under policy at 15 d lead (no last-minute, which is 0-14 d) was £528, a **gap of -£184.67 (-35.0%)**.
   - This is the same 0.65025 factor as P06 24-29 Nov (0.765 x 0.85).
3. **Today's card is different.** The 5 Dec card is **£391.68 = 0.765 x £512** (14 d lead, 07:24:16Z), with no extra 0.85 layer. Where the extra 15% at booking came from: NOT CHECKED.
4. **No revenue is lost or kept: it was cancelled.** The "Cancellation Payout £416.86" label is the same Airbnb label seen on live stays yesterday, so whether any payout is kept is NOT CHECKED. It is not counted in a-airbnb-rules (cancelled).
- 5 Dec is open again at Smoobu £512, min 1.
- 26 Dec (+100%, £543, min 1) shows on Airbnb at **£488.70 = 0.900** (35 d lead, 07:24:23Z).

### 3. 1455, day 22: the guest in residence 20-24 Nov, and 1455 still sells those nights

| Stay (2 adults) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch21/air/`) |
|---|---|---|---|---|
| 21-24 Nov | booked (guest in residence) | **bookable £613.70** | not offered | p04_2124nov 07:22:58Z |
| 22-24 Nov | booked | **bookable £442.85** | not offered | p04_2224nov 07:23:02Z |
| 22-25 Nov | 22-23 booked, 24 open (£144), 25 booked | **bookable £605.20** | not offered | p04_2225nov 07:23:07Z |
| 24-27 Nov / 25-28 Nov | 25-28 booked | not offered | not offered | p04_2427nov, p04_2528nov |
| 20-23 / 20-26 Dec | open | not offered | offered | p04_2023dec, p04_2026dec |
| 6-13 Dec / 4-7 Jan | open | £1,290.26 / £639.20 (same as 19-20 Nov: static) | offered | p04_0613dec, p04_0407jan |

- **Yes. On day 2 of the stay, 1455 still offers 21-24 Nov, 22-24 Nov (2 nights, below P04's 3-night rule) and 22-25 Nov.** A second guest could book a flat that is occupied.
- At risk: the 20-24 Nov stay (£631.59 room plus cleaning) and relocation costs.
- 1455 does not offer 24-27 Nov or 25-28 Nov, so the later booked nights look closed. Why it shuts those but not 21-24 Nov: NOT CHECKED.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 21 Nov-5 Jan **now** (or unlist). Then map it to Smoobu 3562176.

### 4. a-airbnb-rules, P20 guests, P04 weekly, long stay, P05 extra guest, twins, t-channel-gaps

**a-airbnb-rules: day 23, NOT fixed.**
- **£4,130.07 confirmed** (unchanged; no new confirmed Airbnb booking since 20 Nov 06:00).
- **£4,301.02 including yesterday's estimates** (P20 19-22 Nov £126.10, P04 18-20 Nov £44.85).
- P20 5 Dec would have added £184.67, but it was cancelled.

Tiers seen today (`ch21/air/`):

| Tier | Where | Lead |
|---|---|---|
| 0.765 | P20 5 Dec | 14 d |
| 0.765 | P20 14-19 Dec | 23 d |
| 0.765 | P13 18-19 Dec | 27-28 d |
| **0.850** | **P20 22-24 Nov (yesterday 0.765 at 2 d)** | **1 d** |
| 0.900 | P13 20 Dec | 29 d |
| 0.900 | P20 26 Dec | 35 d |
| 0.900 | P04 synced | 15-44 d |
| 0.900 | P13 | 23-43 d |
| 0.900 | P05 5-10 Jan | 45 d |
| 1.000 | P05 18-23 Jan | 58 d |

- P13 18-21 Dec reconciles on both twins as 0.765 x (18 Dec + 19 Dec) + 0.9 x 20 Dec:
  - 3064856: £548.73, exact;
  - 3090701: £518.04 against a card of £518.03.
- Setting (unchanged): Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time and last-minute rules behind 0.765 / 0.85 / 0.9, and keep the visible discounts.

**P20 guest count: day 3, not changed.**
- The room page shows **"6 guests"** (`personCapacity` 6, 4 occurrences; 07:26:59Z).
- Policy `listing_facts.P20.max_guests` is 4. The cancelled 5 Dec stay was 4 guests.
- Corentin to confirm or revert. Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.

**P20 22-24 Nov**
- It sells as 2 nights on Airbnb (£452.20 = 0.85 x £532), against policy min 3 to 30 Nov.
- Smoobu is £266 / £266 / £250 for 22-24 Nov, below PriceLabs £288 / £282 / £273. The Airbnb card follows Smoobu: -£32.30 on 22-24 Nov at 0.85. The cause is for the pricelabs section.

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 6-13 Dec: -£161.03 = 18.0% of £894.60. At 15% it would be £134.19, so **£26.84 over policy**.
- **Long stay 10% on 6 n 20-26 Dec: -£93.15**, so the card is 0.810 of Smoobu.

**Long stay 10% on 5 n: still on.**
- P05: 5-10 Jan -£173.88 (10% of £1,738.80); 18-23 Jan -£190.70.
- P13: 14-19 Dec -£95.22 (3064856) and -£89.82 (3090701); 3-8 Jan -£76.14 on each twin.
- P05 weekly on 4-11 Jan is -£363.84, which is 15.0% (policy).

**P05 extra-guest fee: unchanged, £20 a night at 8 guests and £0 at 6.**
- 5-10 Jan room is £1,838.80 at 8 guests against £1,738.80 at 6 (07:25:50Z / 07:25:57Z).
- On 4-11 Jan it is +£140.
- Long stay and weekly are taken from the room before the fee: £173.88 at both 6 and 8 guests.
- Where the fee is set: NOT CHECKED. Smoobu has no such fee and PriceLabs `extra_person_fee` is 0.

**P13 3064856 14-19 Dec:** offered again today (£856.98; yesterday not offered).

**t-p13-twins: 58 of 68 jointly open nights are identical in Smoobu** (yesterday 59 of 68).
- They differ only on 27 Nov, 1 Dec and 13-20 Dec (on 13-20 Dec, 3064856 is £11-13 higher). Reyhan's -2% DSO on 10-26 Dec was copied to the child at 22:50:45Z, so it did not create a gap. Why the 13-20 Dec gap exists: NOT CHECKED (pricelabs section).
- **The 3-8 Jan Airbnb cards are identical on both twins again (£685.26; Smoobu £846 on both).**
- This conflicts with `listing_facts.P13.twin_listings`. Setting: PriceLabs 3090701 > DSO about +3% on 21 Dec-28 Feb, set after any parent edit.

**t-channel-gaps (P11, Booking-only)**
- Smoobu 23-25 Dec is £285 / £256 / £267 (targets about £320 / £295 / £305), and 3 Jan is **£166** (target about £195; £172 yesterday).
- 3 Jan fell after Reyhan's **P11 2 Jan-28 Feb -8%** DSO (22:50:18Z), which moves it away from the target.
- At +15%, Standard would be £328 / £295 / £308 / £191, before stacked promotions. Display: NOT CHECKED (WAF).

**PriceLabs edits since 20 Nov 06:00Z (`get_user_logs`, 33 entries, all Reyhan).** These are for Corentin as **confirm or revert**, because the direction is to cut PriceLabs discounts:
- P11:
  - 22 Nov-4 Dec -5% (21:10Z);
  - 22 Nov-7 Dec -2%, min 2;
  - 14-15 Dec -2%;
  - 2 Jan-28 Feb -8%.
- P13: 10-26 Dec -2% (parent and child).
- P05:
  - 29 Nov-2 Dec -5%;
  - 7-8 Dec -1%;
  - 13-14 Dec min 2;
  - 4-31 Jan -8%.
- P04:
  - 23-26 Dec -5%, min 3;
  - 24-26 Dec +5%, min 2. **Min 2 conflicts with policy P04 min_stay_rule (never under 3).**
- P06 23 Nov +20% / +25% (intentional block; not a channel item).
- Scott Ellis Gardens 3588993 setup: base 295, min 170, max 4000, sync ON.

The price detail belongs to the pricelabs section. The channel effect: if the P11 booking came after the 22:50Z push (A), the -2% DSO lowered its Smoobu basis by £29 (£727 -> £698).

### 5. Parity table

| Ref | Channel | Stay (lead) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P11 | Booking.com (booked) | 27-30 Nov, 3 n (7) | 3 | £698 (A) / £727 (B) | Standard £804 / £838 | **£538.73 paid** | -33.0% / -35.7% (stack, size only) | FLAG: +15% not evidenced | Smoobu reservation created 20 Nov; PriceLabs `get_pms_reservations` |
| P11 | Booking.com (cancelled) | 28 Nov-2 Dec, 4 n | 4 | £794 | list £874 (x1.10 then) | £605.29 paid (0.69255) | -30.7% | cancelled | Smoobu (modified 20 Nov) |
| P20 | Airbnb (booked + cancelled) | 5 Dec, 1 n (15) | 4 | £528 (fit) | £528.00 | **£343.33 paid** | -35.0% | FLAG (cancelled) | Smoobu; PriceLabs `get_pms_reservations` |
| P20 | Airbnb | 5-6 Dec (14) | 2 | £512 | £435.20 (LM 15%) | £391.68 | -10.0% | FLAG | p20_0506dec 07:24:16Z |
| P20 | Airbnb | 26-27 Dec (35) | 2 | £543 | £543.00 | £488.70 | -10.0% | FLAG | p20_2627dec 07:24:23Z |
| P20 | Airbnb | 22-24 Nov, 2 n (1) | 2 | £532 (PriceLabs £570) | £452.20 (LM 15%) | £452.20 | 0.0% | ok on price; FLAG min 2 against policy 3 | p20_2224nov 07:23:52Z |
| P20 | Airbnb | 14-19 Dec, 5 n (23) | 2 | £1,541 | £1,541.00 | £1,178.85 | -23.5% | FLAG | p20_1419dec 07:24:35Z |
| P20 | Airbnb | 21-24 Nov | 2 | closed (booked) | not for sale | not offered | - | ok | p20_2124nov 07:24:07Z |
| P04 unsynced 1455 | Airbnb | 21-24 / 22-24 / 22-25 Nov | 2 | booked | not for sale | £613.70 / £442.85 / £605.20 card | n/a | FLAG (double-sell, guest in residence) | p04_2124nov, p04_2224nov, p04_2225nov |
| P04 both | Airbnb | 24-27 / 25-28 Nov | 2 | booked | not for sale | not offered | - | ok | p04_2427nov, p04_2528nov |
| P04 synced | Airbnb | 6-13 Dec, 7 n (15) | 2 | £994 | £844.90 | £733.57 | -13.2% | FLAG | p04_0613dec 07:23:24Z |
| P04 synced | Airbnb | 20-26 Dec, 6 n (29) | 2 | £1,035 | £1,035.00 | £838.35 | -19.0% | FLAG | p04_2026dec 07:23:31Z |
| P04 synced | Airbnb | 20-23 Dec (29) | 2 | £483 | £483.00 | £434.70 | -10.0% | FLAG | p04_2023dec 07:23:37Z |
| P04 synced | Airbnb | 4-7 Jan (44) | 2 | £434 | £434.00 | £390.60 | -10.0% | FLAG | p04_0407jan 07:23:44Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (23) | 4 | £1,058 / £998 | same | £856.98 / £808.38 | -19.0% / -19.0% | FLAG | p13_1419dec 07:25:01Z |
| P13 3064856 / 3090701 | Airbnb | 18-21 Dec (27) | 4 | £679 / £641 | same | £548.73 / £518.03 | -19.2% / -19.2% | FLAG | p13_1821dec 07:25:17Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (43) | 4 | £846 / £846 | same | £685.26 / £685.26 | -19.0% / -19.0% | FLAG + identical twins | p13_0308jan 07:25:28Z |
| P05 | Airbnb | 5-10 Jan, 5 n (45) | 8 | £1,932 | £1,932.00 | £1,664.92 (+£100 extra guest) | -19.0% excluding the fee | FLAG | p05_0510jan 07:25:50Z |
| P05 | Airbnb | 5-10 Jan, 5 n (45) | 6 | £1,932 | £1,932.00 | £1,564.92 | -19.0% | FLAG | p05_0510jan6 07:25:57Z |
| P05 | Airbnb | 4-11 Jan, 7 n (44) | 8 | £2,695 | £2,290.75 | £2,201.66 (+£140) | -10.0% excluding the fee | FLAG | p05_0411jan 07:26:18Z |
| P05 | Airbnb | 18-23 Jan, 5 n (58) | 8 | £1,907 | £1,907.00 | £1,816.30 (+£100; long stay only) | -10.0% excluding the fee | FLAG | p05_1823jan 07:26:26Z |
| all | Booking.com live | - | - | - | e.g. P11 30 Nov-2 Dec Standard £210 / £212 / £241 | NOT CHECKED: AWS WAF 07:27:10Z | - | - | ch21/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| P05 5-10 Jan | £367.08 |
| P20 14-19 Dec | £362.15 |
| P05 4-11 Jan | £229.09 |
| P13 14-19 Dec (3064856) | £201.02 |
| P04 20-26 Dec | £196.65 |
| P05 18-23 Jan | £190.70 |
| P13 3-8 Jan | £160.74 each |

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed in policy) | £115.00 | £97.75 |
| **Booking.com observed, P11 27-30 Nov (A / B), 18% commission** | £77.18 / £74.10 | **£63.29 / £60.76** (£52.74 / £50.63 ex-VAT) |
| Booking.com observed, P11 cancelled 28 Nov-2 Dec (x1.10 era) | £76.23 | £62.51 |
| Airbnb model / live at 58 d or more | £100.00 | £84.50 |
| Airbnb 0.900 (29-57 d) | £90.00 | £76.05 |
| Airbnb 0.850 (P20 lead 1) | £85.00 | £71.83 |
| Airbnb 0.900 x long stay (5-6 n) | £81.00 | £68.45 |
| Airbnb 0.765 (2-28 d) | £76.50 | £64.64 |
| Airbnb 0.738 (P04 7+ n at 15 d) | £73.80 | £62.36 |
| Airbnb 0.65025 (P20 5 Dec, cancelled) | £65.03 | £54.95 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- On observed prices, **Booking.com nets about the same as Airbnb at 0.765 (£63 against £65)**, not the modelled £97.75.
- Every observed Airbnb price inside 58 days is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 21 Nov; per property, the top-level field is null), VAT-corrected**
- Booking.com booked ADR in PriceLabs is ex-VAT, so Booking.com nights are multiplied by 1.2. The 2 nights with a blank ref are dropped.
- The unadjusted run reproduces the pack. Script `ch21s/vat.py`.
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -20.9% (10 n) | **-7.9%** | Booking.com -2.9% (8 n); Airbnb -28.2% (2 n) |
| P11 | -38.9% (9 n) | **-26.7%** | all Booking.com; includes the new 27-29 Nov |
| P12 | -37.8% (14 n) | **-25.4%** | all Booking.com |
| P13 | -37.1% (13 n) | **-31.7%** | Booking.com -38.1% (7 n); Airbnb -24.6% (6 n) |

Airbnb-only flats need no correction: P01 -36.0%, P05 -11.1%, P06 -40.5%, P09 -23.4%, P20 -39.0%.

### 7. Fees and min stay

**Cleaning**
- Synced cards reconcile with P04 £142, P13/P20 £150 and P05 £195.
- The P11 Booking.com stays carry £149, which matches the Smoobu price-details.
- The P20 5 Dec stay carried £150.
- 1455 cleaning: NOT CHECKED (the cards do not split it).

**Min stay as displayed matches Smoobu**
- P20 22-24 Nov sells as 2 nights (policy min 3 to 30 Nov).
- P20 5 Dec and 26 Dec sell as 1 night (override nights).
- P11 is now min 2 on 22 Nov-7 Dec in Smoobu (Reyhan's DSO; it was 3).
- **1455 sells 22-24 Nov as 2 nights.**
- Booking.com plan minimums (t-bcom-minstay-1811): NOT CHECKED (WAF).

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 23. £4,130.07 confirmed; £4,301.02 including estimates.**
   - The P20 5 Dec +100% night sold at **£343.33 = 0.65025 x £528 (-£184.67)**. That is below PriceLabs' own un-overridden £371. It was cancelled, so it is not counted.
   - Largest open-card gaps: P05 5-10 Jan £367.08 and P20 14-19 Dec £362.15.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the lead-time and last-minute rules (0.765 / 0.85 / 0.9 tiers) and keep the visible discounts.
2. **Critical: unsynced 1455, day 22.** It still sells 21-24 Nov (£613.70), 22-24 Nov (£442.85) and 22-25 Nov (£605.20) while the guest is in the flat.
   - At risk: £631.59 plus relocation.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 21 Nov-5 Jan now, or unlist. Then map it to 3562176.
3. **High: Booking.com +15% not evidenced by the first booking after it.** P11 27-30 Nov paid £538.73 = £77.18 / £74.10 per £100 Smoobu, which is at or below the x1.10 era (£76.23). At x1.15 with the old stack it would be about £79.64.
   - No plan and stack combination reconciles. The gap to "+15% with the 13/14 Nov stack" is **-£18.08 (A) to -£41.63 (B)** on this stay.
   - Corentin to send the extranet reservation detail for 27-30 Nov: rate plan name, nightly prices and promotions listed. Also a Standard Rate calendar screenshot for 30 Nov-2 Dec (expected £210 / £212 / £241 = ceil(Smoobu x1.15)) and the plan minimum stays.
   - The cancellation and rebooking cost **-£66.56 room and -1 night** (-£54.58 net). Booking.com cancellations are now 39.2% of gross room since 24 Oct; confirmed pace is 0.58 a day.
4. **High: P04 Airbnb weekly 18% and long stay 10%.**
   - 6-13 Dec -£161.03, which is £26.84 over policy; 20-26 Dec long stay -£93.15.
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%, Long stay 0% (or keep it and record it).
5. **High: long stay 10% on 5 n on P05 (-£173.88 / -£190.70) and P13 (-£95.22 / -£89.82 / -£76.14 x 2).** It is not in policy; Corentin to keep or zero it. Separately, P05's £20 a night 8-guest fee has an unknown source.
6. **High (Corentin, confirm or revert):**
   - Reyhan's 20 Nov PriceLabs discounts on P11, P05, P13 and P04. These cut against "cut PriceLabs discounts", and P04 24-26 Dec min 2 conflicts with the 3-night rule.
   - P20 Airbnb shows 6 guests against policy 4 (day 3).
   - P20 22-24 Nov is on sale for 2 nights (£452.20) against policy min 3.
7. **Medium: P13 twins.** 58 of 68 nights are identical in Smoobu, and the 3-8 Jan cards are identical at £685.26. t-channel-gaps on P11 3 Jan is £166, against about £195, after the -8% DSO.

Data gaps:
1. Booking.com live prices, whether +15% has reached Booking.com, the rate plan and promotions on the P11 27-30 Nov stay, derived-plan display, plan minimum stays and same-date ordering: NOT CHECKED (AWS WAF 07:27:10Z, not circumvented).
2. Smoobu price for P11 27-29 Nov at the moment of booking. It is A (£698), B (£727) or an unreadable -5% set from about 21:10Z; the Smoobu timezone (CET reading) is inferred. NOT CHECKED.
3. Whether the P11 rebooking is the same party as the cancelled stay: NOT CHECKED (no guest data used).
4. The source of the extra 0.85 on the P20 5 Dec booking (today's card is 0.765 only) and whether any cancellation payout is kept: NOT CHECKED.
5. Why 1455 closes 24-28 Nov but still sells 21-25 Nov; 1455 cleaning fee and minimum stay: NOT CHECKED.
6. Source and guest threshold of the P05 extra-guest fee: NOT CHECKED.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
