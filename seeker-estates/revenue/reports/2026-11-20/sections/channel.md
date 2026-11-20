## Channel parity

Run date D = 2026-11-20 (Friday, GMT). `data/policy.json` was read first. These are settled and not re-raised: the 15%/20% stay discounts, Booking.com promotion stacking (reported for size only), the Visibility Booster, the **+15% Booking.com markup (policy `booking_markup` 0.15, since 18 Nov)**, the derived rate plans, P13 = one flat, the P02/P03/P06/P07 blocks, P14 and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 15 apartments, 20 Nov-28 Feb, at **2026-11-20T07:18:53Z**. Saved to scratch `ch20/smoobu_rates20.json`.
- **Smoobu GET `/api/reservations`** (modifiedFrom 18 Nov, with cancellations): 6 records, guest fields dropped (`ch20/smoobu_mod20.json`), plus GET price-elements for the new P20 stay (amounts only kept).
  - The only new guest booking is **P20 Airbnb 19-22 Nov**, created **19 Nov 21:24Z**, 2 adults + 2 children.
  - The other new record is a P06 "Blocked channel" block for 22-23 Nov. P06 is an intentional block, so it is not raised.
  - **No Booking.com booking has been created since 16 Nov 22:52.**
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` for P20 (booked from 18 Nov) returns the stay as booked: rental £714.55, cleaning £150, commission £134.01, 4 guests, booked 2026-11-19T21:24Z.
  - `get_listing_prices` for P20 20-30 Nov: still last refreshed **19 Nov 09:23Z**.
  - `get_user_logs` for 19-20 Nov: 1 entry (see §4).
- **Live Airbnb:** 22 plain public airbnb.co.uk map searches (curl), every page read, 07:20:45Z-07:24:28Z.
  - The URL, dates, guests and timestamp for each are in `ch20/air/*.json`.
  - I also read the P20 listing page (`/rooms/1791529331262420081`) at 07:25:05Z (`ch20/pg/p20_room.html`).
  - `data/snapshots/2026-11-20/channel_checks.csv` was copied forward from 19 Nov and **24 rows were appended** under `.channel_checks.csv.lock` (127 lines).
  - Room = first price line minus cleaning (P04 synced £142, P13/P20 £150, P05 £195), before taxes. The P05 rows still include the ~£20 a night extra-guest fee.
- **Booking.com live: NOT CHECKED.** One plain search (Barking, 20-23 Dec, 2 adults) at 07:25:06Z returned HTTP 202 with an AWS WAF challenge (`ch20/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts in `ch20s/`.)

### 1. New P20 Airbnb stay 19-22 Nov (3 n, booked 19 Nov 21:24Z, lead 0, 2 adults + 2 children)

| Item | Value | Source |
|---|---|---|
| Room paid | **£714.55** (£238.18/n) | Smoobu price-elements `basePrice`; PriceLabs `rental_revenue` |
| Cleaning | £150 | Smoobu `cleaningFee` |
| Commission | £134.01 = 15.5% of £864.55 | Smoobu `commission` |
| Payout | £730.54 | Smoobu price-details |
| Smoobu / PriceLabs at booking: 20 Nov and 21 Nov | **£326 / £351** | Pushed at the 19 Nov 09:23Z refresh. Smoobu now holds these values and PriceLabs `price` shows the same. The PriceLabs "Your Price" (`user_price`) is £334 / £282. |
| Smoobu at booking: 19 Nov | NOT CHECKED | It was £311 at 19 Nov 07:18Z. The value after the 09:23Z push cannot be read now (past date). |
| Layer fit | **0.7225 (= 0.85 x 0.85) x £989 (312 + 326 + 351) = £714.5525, which rounds to £714.55** | This is a **fit**. It needs 19 Nov at £312, which is £1 above the 07:18Z value. |

**Which layer fits**
- **The 0.765 tier does not fit.** £714.55 / 0.765 = £934.05, which is not a sum of whole-pound nights for any combination of the 19 Nov, 20 Nov and 21 Nov prices.
- A brute-force search found only one plausible fit: a uniform 0.7225 on every night. The search covered factors 1 / 0.9 / 0.85 / 0.81 / 0.8 / 0.765 / 0.7225 per night, 19 Nov from £150 to £450, and both price sets for 20-21 Nov.
- If 19 Nov was still £311, then 0.7225 x £988 = £713.83, which misses by £0.72.

**Expected under policy**
- `listing_facts.P20.airbnb_discounts_22oct` allows last-minute 15% (0-14 days). On that basis the expected room is 0.85 x £989 = **£840.65**.
- **Gap: -£126.10 (-15.0%, estimate).** Against Smoobu with no discount, the gap is -£274.45 (-27.7%).
- Lead 0 on P20 gives 0.7225, while on P04 (other account) it gave 0.850. Which layers make up the P20 0.7225 (Smoobu rule vs Airbnb last-minute): NOT CHECKED, because the Airbnb reservation breakdown was not read.

**a-airbnb-rules: day 22, NOT fixed.**
- Confirmed total: **£4,130.07** (unchanged).
- Adding the P20 estimate of £126.10 gives £4,256.17.
- Adding the P04 18-20 Nov estimate of £44.85 as well gives **£4,301.02 including estimates**.

**Tier pattern today (fits, mechanism NOT CHECKED)**
- P13 18-21 Dec reconciles to the penny on both twins as 0.765 on 18 Dec and 0.900 on 19-20 Dec.
  - 3064856: 0.765 x 260 + 0.9 x (266 + 222) = **£638.10**, which equals the card.
  - 3090701: 0.765 x 221 + 0.9 x (226 + 222) = **£572.26**, which equals the card.
- But the 5-night 14-19 Dec card on 3090701 is a uniform 0.900 (£926.10 = 0.9 x £1,029, then Long stay 10%), including 18 Dec. So the hidden layer is not a simple per-night lead-time rule.
- P20 14-19 Dec (lead 24) is a uniform 0.765 (£1,163.55 against £1,521). P04 synced 6-13 Dec (lead 16) is a uniform 0.900 before weekly 18%.
- The rule set differs by listing. Smoobu > Channel Manager > Airbnb > Default pricing rules per apartment: NOT CHECKED (no API).

**Is P20 21 Nov still offered anywhere (double-sell)?**
- **Smoobu: no.** 20 Nov and 21 Nov have `available` 0 at 07:18:53Z. 22-24 Nov are open at £290 / £283 / £276, min 2.
- **Airbnb: no.** 21-24 Nov is not offered (07:20:45Z) and neither is 20-23 Nov (07:20:57Z). 22-24 Nov is offered (2 nights) and so is 22-25 Nov.
- **Booking.com: NOT CHECKED (WAF).** Smoobu has the nights closed, so the XML should have closed them too; this is not verified.
- **PriceLabs:** still shows 20 Nov and 21 Nov as unbooked/open (£326 / £351, min 3). This is because it has not refreshed since 19 Nov 09:23Z. PriceLabs does not sell, and its reservation API already has the stay. PriceLabs did not register the stay in the price calendar; 19 Nov is no longer in the API range (past).
- **No double-sell found on the channels I could read.**

**Delivery (for Corentin):** `listing_facts.P20.block_20_21_nov` (20-22 Nov delivery block) now has a guest in 19-22 Nov. Is the delivery still happening? This is **confirm or revert**: either the policy entry is removed or the delivery is moved.

**Guest count:** the P20 Airbnb page still shows **"6 guests"** (`personCapacity` 6, 4 occurrences; 07:25:05Z). Policy `listing_facts.P20.max_guests` is 4. Day 2 of t-p20-guests-1911. This booking is 4 guests (2 + 2), within policy. Corentin to confirm or revert.

### 2. 1455, day 21: the sold 20-24 Nov is still on sale, and the guest arrives TODAY

| Stay (2 adults) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch20/air/`) |
|---|---|---|---|---|
| 20-24 Nov | **booked** (Airbnb, £489.59 + £142; arrival today) | **bookable £780.30** | not offered | p04_2024nov 07:22:07Z |
| 21-24 Nov | booked | **bookable £613.70** | not offered | p04_2124nov 07:22:11Z |
| 20-23 Nov | booked | **bookable £617.95** | not offered | p04_2023nov 07:22:16Z |
| 22-25 Nov | 22-23 booked, 24 open £145 | **bookable £605.20** | not offered | p04_2225nov 07:22:20Z |
| 20-23 / 20-26 Dec, 27 Dec-2 Jan | open / open / booked | not offered | 20-23 and 20-26 Dec offered | p04_2023dec, p04_2026dec, p04_2702jan |
| 6-13 Dec / 13-20 Dec / 4-7 Jan | open | £1,290.26 / £1,282.97 / £639.20 (same as 19 Nov: static) | offered | p04_0613dec, p04_1320dec, p04_0407jan |

- **Yes. 1455 still offers every night of the sold 20-24 Nov at 07:22Z on arrival day.** A second guest could book tonight.
- At risk: the £631.59 stay, plus relocation costs if a second guest books.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 20 Nov-5 Jan **now** (or unlist). Then map it to Smoobu 3562176.

### 3. Booking.com: +15% markup, derived plans, bookings, running totals

**Live display: NOT CHECKED (AWS WAF, 07:25:06Z).** The +15% is still not evidenced on Booking.com. The last screenshot (18 Nov) was x1.10.

**No Booking.com booking since 16 Nov 22:52** (about 80 h). There is nothing new to compare against Standard = ceil(Smoobu x 1.15) or the derived plans.

Expected Standard and derived plans for the key open nights (Smoobu 20 Nov 07:18Z; plan values are the stay total x the plan factor):

| Flat / nights | Smoobu | Standard x1.15 (ceil per night) | At old x1.10 | NR -10% / Weekly -15% / Monthly -20% / NR Weekly -18% |
|---|---|---|---|---|
| P04 20-26 Dec (7 n, min 3/3/3/4/4/4/4) | £1,216 (168/171/168/177/181/177/174; 19 Nov £1,233) | **£1,403** | £1,341 | £1,262.70 / £1,192.55 / £1,122.40 / £1,150.46 |
| P04 2 Dec (min 1) | £451 (19 Nov £428) | **£519** | £497 | £467.10 / £441.15 / £415.20 / £425.58 |
| P11 23 / 24 / 25 Dec (min 2/2/2) | £282 / £256 / £268 (19 Nov 285/263/273) | £325 / £295 / £309 | £311 / £282 / £295 | x0.90 / x0.85 / x0.80 / x0.82 |
| P11 3 Jan / 8 Dec | £172 / £311 | £198 / £358 | £190 / £343 | - |
| P20 22-24 Nov (3 n, min 2) | £849 (290/283/276) | £978 | £935 | £880.20 / £831.30 / £782.40 / £801.96 |

**Plan minimum stays 3/7/28/7 (t-bcom-minstay-1811) and the NR base (t-bcom-nr-base-1811): NOT CHECKED** (WAF).

**Running totals since the 24 Oct markup cut**

Source: `reservations.csv` 20 Nov, booked_on 24 Oct or later. The P04 20-23 Nov triplicate is counted once. The figures are unchanged since 17 Nov.

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross since cut | 25 | 104 | £18,361.53 | £3,720.39 |
| Still confirmed | **16** | 70 | £11,564.66 | £2,350.05 |
| Cancelled | 9 | 34 | £6,796.87 (**37.0%** of gross room) | £1,370.34 |
| Booked since +10% (12 Nov) | 5 gross / 4 confirmed | 26 / 21 | £4,589.17 / £3,742.07 | £883.65 / £704.01 |
| Booked since +15% (18 Nov) | **0** | - | - | - |

Pace over 26.73 days (24 Oct 13:38Z to 20 Nov 07:18Z): **0.94 a day gross and 0.60 confirmed**, both still falling.

### 4. P04 weekly, long stay, P05 extra guest, twins, t-channel-gaps, new PriceLabs edits

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 6-13 Dec: -£162.80 = 18.0% of £904.50.
- 13-20 Dec: -£162.33 = 18.0% of £901.80.
- **Long stay 10% on 6 n 20-26 Dec: -£93.78**, so the card is 0.810 of Smoobu.

**P05 long stay 10% on 5 n is still on**
- 5-10 Jan: -£188.91 = 10% of £1,889.10.
- 18-23 Jan: -£200.20 = 10% of £2,002.
- Weekly on 4-11 Jan is -£394.49, which is 15.0% (policy).

**P05 extra-guest fee: confirmed at 8 guests, not at 6.**
- On 5-10 Jan the room is £1,989.10 at 8 adults and £1,889.10 at 6 adults (07:23:16Z / 07:23:23Z). That is **+£100 = £20 a night**, and the 6-guest card is exactly 0.900 x £2,099.
- At 7 n (4-11 Jan) the extra is +£140.
- Smoobu and PriceLabs (`extra_person_fee` 0) do not set it. Where it is set, and at which guest count (7 not tested): NOT CHECKED.
- 18 Jan at 59 d still fits 1.000 (£2,102 - £100 = £2,002 = Smoobu).

**P13 long stay (t-p13-los5): 10.0% on 5 n.**
- 14-19 Dec 3090701: -£92.61.
- 3-8 Jan: -£76.59 on each twin.
- 3064856 is not offered for 14-19 Dec (open in Smoobu, min 3). Reason: NOT CHECKED.

**t-p13-twins: 59 of 68 jointly open nights are identical in Smoobu** (19 Nov: 60 of 68).
- They differ only on 27 Nov, 1 Dec and 13-19 Dec.
- **The Airbnb cards for 3-8 Jan are identical again (£915.90 on both; Smoobu £851 on both).**
- This conflicts with `listing_facts.P13.twin_listings`. Corentin to confirm. Setting: PriceLabs 3090701 > DSO about +3% on 20 Dec-28 Feb, set on the child after any parent edit.

**t-channel-gaps (P11, Booking-only): not met, and further away.**
- Smoobu 23-25 Dec is £282 / £256 / £268 (targets about £320 / £295 / £305; 19 Nov 285/263/273).
- 3 Jan is £172 (target about £195).
- At +15% the Standard prices would be £325 / £295 / £309 / £198, before stacked promotions. Display NOT CHECKED.

**New PriceLabs edits since 19 Nov 06:00Z (`get_user_logs`):** one only.
- Reyhan, 19 Nov 10:55:50Z: P06 3288517 DSO 24 Nov-5 Dec, min 3.
- P06 is an intentional block in policy, so there is no channel finding. It is for the PriceLabs section to note.

### 5. Parity table

| Ref | Channel | Stay (lead) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source (`ch20/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb (booked) | 19-22 Nov, 3 n (0) | 4 | £989 fit (est. 312 / 326 / 351) | £840.65 (LM 15%, est.) | **£714.55 paid** | -15.0% (est.) | FLAG | Smoobu reservation created 19 Nov 21:24Z; PriceLabs `get_pms_reservations` |
| P20 | Airbnb | 20-23 / 21-24 Nov | 2 | closed (booked) | not for sale | not offered | - | ok (no double-sell) | p20_2023nov 07:20:57Z, p20_2124nov 07:20:45Z |
| P20 | Airbnb | 22-24 Nov, 2 n (2) | 2 | £573 | £487.05 (LM 15%) | £438.34 | -10.0% | FLAG + min-2 conflict | p20_2224nov 07:21:05Z |
| P20 | Airbnb | 22-25 Nov (2) | 2 | £849 | £721.65 (LM 15%) | £649.48 | -10.0% | FLAG | p20_2225nov 07:21:21Z |
| P20 | Airbnb | 14-19 Dec, 5 n (24) | 2 | £1,521 | £1,521.00 | £1,163.55 | -23.5% | FLAG | p20_1419dec 07:21:41Z |
| P04 unsynced 1455 | Airbnb | 20-24 / 21-24 / 20-23 / 22-25 Nov | 2 | booked | not for sale | £780.30 / £613.70 / £617.95 / £605.20 card | n/a | FLAG (double-sell, arrival today) | p04_2024nov, p04_2124nov, p04_2023nov, p04_2225nov |
| P04 synced | Airbnb | 6-13 Dec, 7 n (16) | 2 | £1,005 | £854.25 | £741.70 | -13.2% | FLAG | p04_0613dec 07:22:33Z |
| P04 synced | Airbnb | 13-20 Dec, 7 n (23) | 2 | £1,002 | £851.70 | £739.47 | -13.2% | FLAG | p04_1320dec 07:22:40Z |
| P04 synced | Airbnb | 20-26 Dec, 6 n (30) | 2 | £1,042 | £1,042.00 | £844.02 | -19.0% | FLAG | p04_2026dec 07:22:47Z |
| P04 synced | Airbnb | 20-23 Dec (30) | 2 | £507 | £507.00 | £456.30 | -10.0% | FLAG | p04_2023dec 07:22:54Z |
| P04 synced | Airbnb | 4-7 Jan (45) | 2 | £440 | £440.00 | £396.00 | -10.0% | FLAG | p04_0407jan 07:23:01Z |
| P04 both | Airbnb | 27 Dec-2 Jan | 2 | booked | not for sale | not offered | - | ok | p04_2702jan 07:23:11Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (24) | 4 | £1,209 / £1,029 | same | not offered / £833.49 | - / -19.0% | FLAG | p13_1419dec 07:24:01Z |
| P13 3064856 / 3090701 | Airbnb | 18-21 Dec (28) | 4 | £748 / £669 | same | £638.10 / £572.26 | -14.7% / -14.5% | FLAG | p13_1821dec 07:24:17Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (44) | 4 | £851 / £851 | same | £689.31 / £689.31 | -19.0% / -19.0% | FLAG + identical twins | p13_0308jan 07:24:28Z |
| P05 | Airbnb | 5-10 Jan, 5 n (46) | 8 | £2,099 | £2,099.00 | £1,700.19 (+£100 extra guest) | -19.0% | FLAG | p05_0510jan 07:23:16Z |
| P05 | Airbnb | 5-10 Jan, 5 n (46) | 6 | £2,099 | £2,099.00 | £1,700.19 (no extra) | -19.0% | FLAG | p05_0510jan6 07:23:23Z |
| P05 | Airbnb | 4-11 Jan, 7 n (45) | 8 | £2,922 | £2,483.70 | £2,235.31 (+£140) | -10.0% | FLAG | p05_0411jan 07:23:44Z |
| P05 | Airbnb | 18-23 Jan, 5 n (59) | 8 | £2,002 | £2,002.00 | £1,801.80 (+£100; Long stay only) | -10.0% | FLAG | p05_1823jan 07:23:53Z |
| all | Booking.com live | - | - | - | e.g. P04 2 Dec Standard £519 | NOT CHECKED: AWS WAF 07:25:06Z | - | - | ch20/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card £ gaps overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| P05 5-10 Jan | £398.81 |
| P20 14-19 Dec | £357.45 |
| P05 4-11 Jan | £248.39 |
| P05 18-23 Jan | £200.20 |
| P04 20-26 Dec | £197.98 |
| P13 14-19 Dec (3090701) | £195.51 |
| P13 3-8 Jan | £161.69 each |

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed in policy) | £115.00 | £97.75 |
| Booking.com if still x1.10 (18 Nov screenshots) | £110.00 | £93.50 |
| Airbnb model / live at 60 d or more | £100.00 | £84.50 |
| Airbnb 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb 0.850 (lead 0, P04 18-20 Nov) | £85.00 | £71.83 |
| Airbnb 0.900 x Long stay (5-6 n) | £81.00 | £68.45 |
| Airbnb 0.765 (1-28 d) | £76.50 | £64.64 |
| Airbnb 0.738 (P04 7+ n at 29-59 d) | £73.80 | £62.36 |
| **Airbnb 0.7225 (P20 19-22 Nov, lead 0, fit)** | £72.25 | £61.05 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- Every observed Airbnb price inside 60 days is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 20 Nov), VAT-corrected**
- Booking.com booked ADR in PriceLabs is ex-VAT, so Booking.com nights are multiplied by 1.2. The 2 nights with a blank ref are dropped.
- The unadjusted run reproduces the pack. Script `ch20s/vat.py`.
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -17.0% (11 n) | **-4.4%** | Booking.com +4.4% (8 n); Airbnb -27.1% (3 n) |
| P11 | -40.0% (10 n) | **-28.1%** | all Booking.com |
| P12 | -40.1% (14 n) | **-28.1%** | all Booking.com |
| P13 | -41.1% (14 n) | **-35.7%** | Booking.com -42.4% (8 n); Airbnb -27.0% (6 n) |

Airbnb-only flats need no correction: P01 -38.8%, P05 -10.1%, P06 -46.3%, P09 -26.5%, P20 -39.5%.

### 7. Fees and min stay

**Cleaning**
- Synced cards reconcile with P04 £142, P13/P20 £150 and P05 £195. The P20 booking carries £150.
- The P05 extra-guest fee is £20 a night at 8 guests and £0 at 6.
- 1455 cleaning: NOT CHECKED (cards do not split it).
- Booking.com fees: NOT CHECKED.

**Min stay as displayed matches Smoobu**
- P20 22-24 Nov sells as 2 nights (Smoobu min 2), which conflicts with policy min 3 to 30 Nov.
- P04 20-23 Dec sells at 3 nights.
- On 1455, min stay is NOT CHECKED.
- Booking.com plan minimums: NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 22. Total £4,130.07 confirmed; £4,301.02 including estimates.**
   - Today adds an estimated **£126.10 from P20 19-22 Nov**: £714.55 paid against £840.65 expected. The fit is 0.7225 x £989 to the penny, and it assumes 19 Nov was at £312.
   - Largest open-card gaps: P05 5-10 Jan £398.81 and P20 14-19 Dec £357.45. P13 18-21 Dec reconciles to the penny on both twins (0.765 on 18 Dec, 0.900 on 19-20 Dec).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules behind the hidden 0.850 / 0.765 / 0.900 / 0.7225 tiers. The tiers vary by listing, so check each apartment's rule set. Keep the visible discounts.
2. **Critical: unsynced 1455, day 21. It still sells the booked 20-24 Nov at £780.30 (and 21-24, 20-23, 22-25 Nov) on the arrival day.**
   - At risk: £631.59 plus relocation.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 20 Nov-5 Jan now, or unlist. Then map it to 3562176.
3. **High: Booking.com +15% still not evidenced (live NOT CHECKED, WAF). No Booking.com booking in about 80 h; 0 since +15%.**
   - At x1.10 instead of x1.15, Standard is about 4.3% low: P04 20-26 Dec £1,341 against £1,403 (-£62), and 2 Dec £497 against £519.
   - Corentin to send an extranet screenshot of the Standard Rate for 2 Dec and 20 Dec plus the plan minimum stays (t-bcom-nr-base-1811, t-bcom-minstay-1811).
4. **High: P04 Airbnb weekly 18% and Long stay 10%.**
   - Open cards: 6-13 Dec -£162.80, 13-20 Dec -£162.33, and Long stay on 20-26 Dec -£93.78.
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%, Long stay 0% (or keep and record it).
5. **High: Long stay 10% on 5 n on P05 (-£188.91 / -£200.20) and on P13 (-£92.61 / -£76.59 x 2).** It is not in policy; Corentin to keep or zero it.
   - Separately, P05's £20 a night extra-guest fee at 8 guests (not at 6) has an unknown source.
6. **High (confirm or revert, Corentin):**
   - P20 delivery block 20-22 Nov: there is now a guest 19-22 Nov. Is the delivery still on?
   - P20 Airbnb shows 6 guests against policy 4 (day 2).
   - P20 22-24 Nov min 2 is on sale at £438.34, against policy min 3.
   - PriceLabs P20 still shows 20 and 21 Nov open (last refresh 19 Nov 09:23Z). This is not a double-sell, because Smoobu and Airbnb are closed. It should clear on the next refresh.
7. **Medium: P13 twins.** 59 of 68 nights are identical in Smoobu, and the 3-8 Jan Airbnb cards are identical at £915.90. t-channel-gaps on P11 is further from target (23 Dec £282 against about £320; 3 Jan £172 against about £195).
8. **Medium: Booking.com pace.** 0.94 a day gross and 0.60 confirmed since 24 Oct; 37.0% of gross room cancelled.

Data gaps:
1. Booking.com live prices, whether +15% has reached Booking.com, derived-plan display and plan minimum stays, P20 20-21 Nov closure on Booking.com, and same-date ordering: NOT CHECKED (AWS WAF, not circumvented).
2. Smoobu 19 Nov P20 price after the 09:23Z push (needed to firm up the £312 / 0.7225 fit) and the Airbnb breakdown of the P20 discount: NOT CHECKED. The P20 £126.10 is an estimate.
3. The P20 Smoobu price-details carry Airbnb's "Cancellation Host Fee / Cancellation Payout" labels (£134.01 / £730.54). Smoobu (type "modification of booking", in reservations.csv as confirmed) and PriceLabs (`booked`, `cancelled_on` null) both show it as live. The meaning of the labels: NOT CHECKED.
4. Why P13 3064856 is not offered for 14-19 Dec while open in Smoobu: NOT CHECKED.
5. Source and guest threshold of the P05 extra-guest fee (7 guests not tested): NOT CHECKED.
6. 1455 cleaning fee and minimum stay: NOT CHECKED.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
