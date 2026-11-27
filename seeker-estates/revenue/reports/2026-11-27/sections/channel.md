## Channel parity

Run date D = 2026-11-27 (Friday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster (Camden 18%, check-ins 1 Nov-18 Dec);
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans;
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks;
- P04 2 Dec +200% (deprioritised).

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments, 27 Nov-28 Feb, fetched **2026-11-27T07:19:23Z** (`ch27/smoobu_rates27.json`). Yesterday's 26 Nov 07:22Z set (`ch26/smoobu_rates26.json`) is the "before" set.
- **Smoobu GET `/api/reservations`** (modifiedFrom 26 Nov, with cancellations) returned **3 records**: P20 Airbnb 5-6 Dec (new), P04 Airbnb 10-13 Dec (new) and P06 Airbnb 3-6 Dec (modified 26 Nov 15:10Z, amounts unchanged at £768.82 / £129 / £139.16). Price elements pulled for all three; amounts only, guest fields, guest counts and references dropped (`ch27/smoobu_mod27.json`, `ch27/pe27.json`). **No cancellation.**
- **PriceLabs** (one call at a time):
  - `get_pms_reservations` (smoobu, booked 26-27 Nov) returns **2 records, both Airbnb: P20 5-6 Dec £426.00 and P04 10-13 Dec £378.67**. Both new bookings are registered in PriceLabs. **No new Booking.com booking.**
  - `get_user_logs` (listing, 26-27 Nov) returns **0 entries**: no Reyhan edit since yesterday, and nothing reverted.
  - `get_listing_date_overrides` P20: 5 Dec and 26 Dec are +100% with min 1 (set 18 Nov).
- **Live Airbnb:** 28 plain public airbnb.co.uk map searches (curl), every page read, 07:21:27Z-07:26:50Z (`ch27/air/*.json`: URL, dates, search guests and timestamp). I also read four room pages at 07:27:32Z-07:27:36Z (`ch27/pg/`).
  - `data/snapshots/2026-11-27/channel_checks.csv` was absent. I copied it forward from 26 Nov (456 lines) and **appended 32 rows** under `.channel_checks.csv.lock` (488 lines).
  - Room = first price line minus cleaning, before taxes. Cleaning: P04 £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195, P12 £150 (3 n).
- **Booking.com live: NOT CHECKED.** One plain search (Camden Town, 30 Nov-3 Dec, 2 adults) at 07:27:47Z returned HTTP 202 with an AWS WAF challenge (`ch27/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**
- **Clock:** Smoobu's created and modified times are UTC+1, and PriceLabs repeats them with a "Z" suffix. Below I give UTC.
- **P04 Smoobu vs PriceLabs:** today they are identical on every P04 night (27 Nov refresh at 06:49Z), so yesterday's "1657 shows PriceLabs, not Smoobu" split cannot be tested today.

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch27s/`.)

### 1. The two new Airbnb bookings

| Item | P20 Waterford Court 5-6 Dec (1 n) | P04 Barking 10-13 Dec (3 n) |
|---|---|---|
| Made | 26 Nov 15:51Z (lead 9 d) | 27 Nov 01:59Z (lead 13 d) |
| Room paid | **£426.00** (a round amount) | **£378.67** |
| Cleaning | £150 | £142 |
| Commission | £89.28 = **15.50%** of £576 (room + cleaning) | £80.70 = **15.50%** of £520.67 |
| Smoobu at booking | £562 (26 Nov 07:22Z; 5 Dec is the +100% orphan DSO, min 1). Today Smoobu shows £686 (booked, after the 06:34Z refresh) | 165 / 174 / 156 = **£495** (26 Nov 07:22Z). PriceLabs then had 175 / 155 / 156 = £486. PriceLabs `booked_price` for 11 / 12 Dec records 174 / 156, i.e. the Smoobu values |
| **Paid per £100 Smoobu** | **£75.80** (0.7580) | **£76.50** (0.765 x £495 = £378.675, to the penny) |
| Net after 15.5% | £64.05 | £64.64 |
| Fit | **No exact fit.** 0.765 x £562 = £429.93, which is exactly the card I read yesterday at 07:26:32Z; the guest paid **£3.93 less**. A 0.765 fit would need Smoobu £556.86 (not an integer). Whether 5 Dec moved between 07:26Z and 15:51Z, or the host sent a fixed-price offer (the round £426.00 points that way): NOT CHECKED | **Exact:** 0.9 (hidden) x 0.85 (last-minute 15%, inside 14 days) on Smoobu. It does not fit PriceLabs (378.67 / 486 = 0.779) |
| Policy expected | 0.85 x £562 = **£477.70** (P20's own last-minute 15% at 0-14 days) | **£495** (P04 has no Airbnb discount in policy) |
| Gap | **-£51.70 (-10.8%)**: hidden 0.9 = £47.77, plus £3.93 not explained | **-£116.33 (-23.5%)**: hidden 0.9 = **£49.50**, plus last-minute 15% on the Barking account = £66.83 |

**Which Airbnb listing took P04 10-13 Dec? The synced 1657, not 1455.** The evidence:
- the reservation came into Smoobu on apartment 3562176 through the channel import (created 01:59Z, modified 02:07Z). The unsynced 1455 is not mapped to Smoobu, so a 1455 booking would not land there;
- the amount fits 0.765 x Smoobu to the penny, the tier 1657 shows on every 3-night card today;
- 1657 no longer offers 10-13 or 11-14 Dec (07:21:40Z, 07:21:47Z);
- 1455 still offers 10-13 Dec at **£600.94**, unchanged since 22 Nov (§2).

**P04 gaps around the booking:** 13 Dec is not an orphan. 13-16 Dec sells on 1657 at £331.24 room (min 3 met). 6-10 Dec (4 nights, between 3-6 Dec Booking.com and 10 Dec) sells too: 6-9 Dec and 6-10 Dec are both offered.

**P20 min stay:** policy's "3 nights from 25 Oct to 30 Nov" does not cover 5 Dec. The PriceLabs DSO sets 5 Dec to min 1, and the 1-night booking matches it. Not a breach.

**a-airbnb-rules (day 29): both bookings carry the hidden 0.9.**
- **P04 adds £49.50 confirmed** (exact fit; the hidden 0.9 alone, 0.1 x £495). The Barking last-minute 15% (£66.83) is a separate setting on that account, not in policy; I report it separately and do not add it.
- **P20 adds £51.70 as an estimate**: £47.77 hidden 0.9 plus £3.93 unexplained (fit not exact).
- **New totals: £4,173.59 confirmed** (£4,124.09 + £49.50); **£4,790.02 including estimates** (£4,688.82 + £49.50 + £51.70).

### 2. 1455, day 28: it is selling nights that are now booked

| Stay (2 adults searched) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch27/air/`) |
|---|---|---|---|---|
| 6-9 Dec | open £518 | bookable £589.47 (unchanged since 22 Nov) | offered | p04_0609dec 07:21:33Z |
| 6-10 Dec | open £687 | bookable £743.23 | offered | p04_0610dec 07:21:27Z |
| **10-13 Dec** | **booked (Airbnb 1657, 27 Nov)** | **bookable £600.94** (unchanged) | not offered | p04_1013dec 07:21:40Z |
| **11-14 Dec** | **11-12 Dec booked** | **bookable £596.35** | not offered | p04_1114dec 07:21:47Z |
| 13-16 Dec | open £433 | bookable £574.17 | offered | p04_1316dec 07:21:54Z |
| 14-21 Dec | open £1,034 | **not offered** | offered | p04_1421dec 07:22:01Z |
| 17-20 Dec | open £452 | bookable £607.83 (unchanged) | offered | p04_1720dec 07:22:08Z |
| 20-23 Dec | open £459 | **not offered** | offered | p04_2023dec 07:22:14Z |
| 20-26 Dec | open £932 | **not offered** | offered | p04_2026dec 07:22:21Z |
| 23-26 Dec | open £473 | **not offered** | offered | p04_2326dec 07:22:28Z |
| 27-30 Dec (Airbnb 27 Dec-4 Jan) | booked | not offered | not offered | p04_2730dec 07:22:33Z |
| 4-7 Jan | open £410 | bookable £639.20 (unchanged) | offered | p04_0407jan 07:22:38Z |

- **Does 1455 still sell 10-13 Dec now that it is booked? Yes.** 1455 sells 10-13 Dec (£600.94) and 11-14 Dec (£596.35). Those are **3 nights already sold** on 1657 on 27 Nov. A 1455 booking on them would be a **true double-booking**, and Smoobu would not see it. This is the first day since 10-14 Dec was cancelled that 1455 has a booked night on sale.
- **Still closed from 20 Dec? Yes.** 1455 does not offer 14-21, 20-23, 20-26 or 23-26 Dec. 1657 sells all four: 20-23 Dec £351.13, 20-26 Dec £754.92 and 23-26 Dec £361.84 room after visible discounts. 17-20 Dec (ending 20 Dec) is still offered on 1455, so it is closed from the night of 20 Dec. A hidden 1455 booking from 20 Dec, which Smoobu would not know about: **NOT VERIFIED**. A map search cannot tell a booking from a block or a min-stay rule.
- 1455 room page is live (07:27:35Z, capacity 6). Its prices have not moved since 22 Nov.
- Setting (now urgent): Airbnb host 551951609 > listing 1455876748739910219 > Calendar.
  - Block 10-12 Dec today.
  - Check 20-26 Dec for a reservation.
  - Then block 27 Nov-5 Jan or unlist, and map it to Smoobu 3562176.

### 3. Booking.com: no new booking, totals, t-bcom-markup-2511

**No new Booking.com booking and no cancellation since yesterday** (Smoobu modified-since; PriceLabs booked 26-27 Nov = Airbnb only; `reservations.csv` 27 Nov).

**t-bcom-markup-2511: unchanged, 0 of 4 confirmed Booking.com bookings made since 18 Nov fit x1.15.**
- The fits: P11 27-30 Nov is at or below the x1.10 level; P12 4-7 Dec is ceil(x1.10) x 0.765; Scott Ellis 30 Dec-4 Jan is ceil(x1.10) x 0.80; P11 25-27 Nov is inconclusive.
- The only x1.15 fit (P04 10-14 Dec) was cancelled on 25 Nov. Its nights were resold today on Airbnb at £378.67 for 3 nights, against £488.35 for 4 nights on Booking.com.
- Setting (unchanged): Smoobu > Channel Manager > Booking.com > price overwrite on 2699998, 3588993 and 3064196. Check each reads +15%.
- Corentin to screenshot one Standard Rate calendar, e.g. P12 30 Nov-3 Dec. Smoobu now has 269 / 279 / 282 = £830, so x1.15 = **£956** and x1.10 = £914.

**Running totals since the 24 Oct markup cut** (`reservations.csv` 27 Nov, Booking.com, booked_on 24 Oct or later; the P04 20-23 Nov triplicate is counted once; room is VAT incl.; Scott Ellis is unmapped and not in the file)

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **29** (unchanged) | 116 | £20,435.82 | £4,151.60 |
| Still confirmed | **17** (unchanged) | 71 | £11,867.52 | £2,428.72 |
| Cancelled | **12** (unchanged) | 45 | £8,568.30 (41.9% of gross room) | £1,722.88 |
| Booked since +15% (18 Nov) | 4 gross / 3 confirmed | 12 / 8 | £2,074.29 / £1,585.94 | £431.21 / £338.61 |
| Scott Ellis (unmapped), extra | +1 confirmed | 5 | £2,238.40 | £358.26 |

- **Cancellation rate: 12 of 29 = 41.4% by count**, 45 of 116 nights = 38.8%, 41.9% of room value. Including Scott Ellis: 12 of 30 = 40.0%.
- Pace over 33.74 days (24 Oct 13:38Z to 27 Nov 07:19Z): **0.86 a day gross, 0.50 confirmed** (yesterday 0.89 / 0.52). With Scott Ellis: 0.89 / 0.53.
- **No Booking.com booking for 2 days**, the first such gap since the cut. The last one was P11 25-27 Nov, made 25 Nov 17:13Z.

**P11 Camden (Booking-only)**
- **The Smoobu block from 5 Jan 2027 is still there** (0 of 55 nights open, 5 Jan-28 Feb). **3-4 Jan is still unsellable**: £148 / £163 at min 3, between the booked 2 Jan and the blocked 5 Jan.
- **Christmas:** 23 / 24 / 25 Dec is now £277 / £256 / £264 (yesterday £278 / £256 / £265). At x1.15, Standard would be £319 / £294 / £304. No PriceLabs log entry, so Reyhan's 25 Nov removal of the price override still stands. Corentin to confirm or revert.
- Display: NOT CHECKED (WAF).

### 4. Scott Ellis, P20 guests, P04 weekly, long stay, twins

**Scott Ellis Gardens: the 20% Special offer is still on (day 6 of the tracker).**
- It shows on all three offered cards: 10-13 Dec £1,003.50 to £802.80 (-£200.70); 16-19 Dec £1,172.70 to £938.16 (-£234.54); 7-10 Jan £916.20 to £732.96 (-£183.24).
- On top of it sits the hidden 0.9: **0.72x Smoobu on every card.**
- 7-10 Jan is offered again today (it was not offered yesterday).
- 13-17 Feb was **not offered** in the 6-adult search, although Smoobu has it open (£1,497, min 4 met). Cause NOT CHECKED.
- The room page still has `isNewListing` true and capacity 6 (07:27:36Z).
- Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.

**P20 capacity: day 9, not changed.**
- The room page shows **capacity 6** (07:27:32Z). Policy `listing_facts.P20.max_guests` is 4.
- 26-27 Dec sells for **6 adults searched at £546.70 room, against £506.70 for 2 adults (+£40)** (07:24:40Z / 07:24:29Z).
- Corentin to confirm or revert, and to check the 5-6 Dec party size against the max of 4 in the Airbnb reservation. I do not record party sizes.
- Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.

**P04 weekly 18%: not fixed.**
- 14-21 Dec: -£167.50 = 18.0% of £930.60. At 15% it would be £139.59, so **£27.91 over policy**.
- Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

**Long stay 10% on 5-6 nights: still on (not in policy; Corentin to keep or zero it).**
- P05 5-10 Jan: -£163.08.
- P13 14-19 Dec: -£94.14 (3064856) / -£83.97 (3090701).
- P13 3-8 Jan: -£72.90 (3064856).
- **New: P04 20-26 Dec (6 n): -£83.88.** So the Barking account also has Long stay 10%.
- P05 13-17 Feb: the visible Early booking 12% is -£199.80.
- Setting: each Airbnb listing > Pricing > Discounts > Long stay 0%.

**t-p13-twins: unchanged in shape.**
- In Smoobu, **33 of 68 jointly open nights are identical** (yesterday 34).
- 13-21 Dec: 3090701 is **10.5-11.0% below** 3064856.
- 3-26 Jan: 3090701 is 6.6-7.5% above.
- 27 Nov and 1 Dec: 3090701 is 9.2-9.4% below.
- Cards for 14-19 Dec: **£847.26 / £755.73** (-10.8%).
- 3-8 Jan: 3064856 £656.10. **3090701 was not offered**, although Smoobu has it open (£869, min 3). Cause NOT CHECKED.
- No P13 edit is logged. Setting: a PriceLabs DSO on 3090701 (or 3064856) to bring them within about 3% (Corentin to decide).

### 5. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup; P20's own last-minute 15% at 0-14 days; weekly 15% at 7+ nights). Booking.com expected = Standard = ceil(Smoobu x1.15), before promotions. "Search guests" is the search parameter, not a reservation party. The source for every Airbnb row is `ch27/air/<tag>.json` and the matching `channel_checks.csv` row (27 Nov). Displayed room = after visible discounts, before taxes, cleaning excluded.

| Ref | Channel | Stay (lead) | Search guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb (new, 26 Nov) | 5-6 Dec, 1 n (9) | - | £562 at booking | £477.70 | **£426.00 paid** | -10.8% | FLAG (hidden 0.9 + £3.93) | Smoobu price elements; PriceLabs reservations |
| P04 1657 | Airbnb (new, 27 Nov) | 10-13 Dec (13) | - | £495 at booking | £495.00 | **£378.67 paid** | -23.5% | FLAG (0.9 x LM 15%) | Smoobu price elements; PriceLabs reservations |
| P04 1657 | Airbnb | 6-9 Dec (9) | 2 | £518 | £518.00 | £396.26 | -23.5% | FLAG | p04_0609dec 07:21:33Z |
| P04 1657 | Airbnb | 6-10 Dec (9) | 2 | £687 | £687.00 | £525.54 (LM 15% shown) | -23.5% | FLAG | p04_0610dec 07:21:27Z |
| P04 1657 | Airbnb | 13-16 Dec (16) | 2 | £433 | £433.00 | £331.24 | -23.5% | FLAG | p04_1316dec 07:21:54Z |
| P04 1657 | Airbnb | 14-21 Dec, 7 n (17) | 2 | £1,034 | £878.90 | £763.10 | -13.2% | FLAG (0.9 + weekly 18%) | p04_1421dec 07:22:01Z |
| P04 1657 | Airbnb | 17-20 Dec (20) | 2 | £452 | £452.00 | £345.78 | -23.5% | FLAG | p04_1720dec 07:22:08Z |
| P04 1657 | Airbnb | 20-23 Dec (23) | 2 | £459 | £459.00 | £351.13 (LM 15% shown) | -23.5% | FLAG | p04_2023dec 07:22:14Z |
| P04 1657 | Airbnb | 20-26 Dec, 6 n (23) | 2 | £932 | £932.00 | £754.92 (Long stay 10%) | -19.0% | FLAG | p04_2026dec 07:22:21Z |
| P04 1657 | Airbnb | 23-26 Dec (26) | 2 | £473 | £473.00 | £361.84 | -23.5% | FLAG | p04_2326dec 07:22:28Z |
| P04 1657 | Airbnb | 4-7 Jan (38) | 2 | £410 | £410.00 | £369.00 | -10.0% | FLAG | p04_0407jan 07:22:38Z |
| **P04 unsynced 1455** | Airbnb | **10-13 Dec, 11-14 Dec** | 2 | **booked** | not for sale | **£600.94 / £596.35 card incl. cleaning** | n/a | **FLAG (double-booking)** | p04_1013dec, p04_1114dec |
| P04 unsynced 1455 | Airbnb | 6-9 / 6-10 / 13-16 / 17-20 Dec, 4-7 Jan | 2 | open | n/a (unsynced copy) | £589.47 / £743.23 / £574.17 / £607.83 / £639.20 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_* as above |
| P04 unsynced 1455 | Airbnb | 14-21 / 20-23 / 20-26 / 23-26 Dec | 2 | open | - | not offered | - | FLAG (possible off-Smoobu booking) | p04_1421dec, p04_2023dec, p04_2026dec, p04_2326dec |
| P04 both | Airbnb | 27-30 Dec | 2 | booked | - | not offered | - | ok | p04_2730dec 07:22:33Z |
| P06 | Airbnb | 6-9 Dec (9) | 2 | £939 | £939.00 | £718.33 | -23.5% | FLAG | p06_0609dec 07:22:48Z |
| P06 | Airbnb | 9-12 Dec (12) | 2 | £962 | £962.00 | £735.92 | -23.5% | FLAG | p06_0912dec 07:23:14Z |
| P12 | Airbnb | 30 Nov-3 Dec (3) | 2 | £830 | £830.00 | £634.94 | -23.5% | FLAG | p12_3003dec 07:23:40Z |
| P20 | Airbnb | 5-6 Dec | 2 | booked | - | not offered | - | ok | p20_0506dec 07:23:56Z |
| P20 | Airbnb | 14-18 Dec, 4 n (17) | 2 | £1,231 | £1,231.00 | £941.71 | -23.5% | FLAG | p20_1418dec 07:24:02Z |
| P20 | Airbnb | 26-27 Dec (29) | 2 | £563 | £563.00 | £506.70 | -10.0% | FLAG | p20_2627dec 07:24:29Z |
| P20 | Airbnb | 26-27 Dec (29) | **6** | £563 | not for sale (max 4) | £546.70 (+£40) | - | FLAG (guests) | p20_2627dec6 07:24:40Z |
| P20 | Airbnb | 3-6 Jan (37) | 2 | £691 | £691.00 | £621.90 | -10.0% | FLAG | p20_0306jan 07:24:42Z |
| P05 | Airbnb | 7-9 Dec, 2 n (10) | 6 | £824 | £824.00 | £630.35 | -23.5% | FLAG | p05_0709dec 07:25:07Z |
| P05 | Airbnb | 5-10 Jan, 5 n (39) | 6 | £1,812 | £1,812.00 | £1,467.72 | -19.0% | FLAG | p05_0510jan 07:25:16Z |
| P05 | Airbnb | 13-17 Feb, 4 n (78) | 6 | £1,665 | £1,665.00 | £1,465.20 | -12.0% (visible Early booking) | FLAG | p05_1317feb6 07:25:36Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (17) | 4 | £1,046 / £933 | same | £847.26 / £755.73 | -19.0% / -19.0% | FLAG | p13_1419dec 07:25:56Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (37) | 4 | £810 / £869 | same | £656.10 / not offered | -19.0% / - | FLAG | p13_0308jan 07:26:12Z |
| Scott Ellis 3588993 | Airbnb | 10-13 Dec (13) | 4 | £1,115 | £1,115.00 | £802.80 | -28.0% | FLAG | se_1013dec 07:26:35Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (19) | 4 | £1,303 | £1,303.00 | £938.16 | -28.0% | FLAG | se_1619dec 07:26:42Z |
| Scott Ellis 3588993 | Airbnb | 7-10 Jan (41) | 4 | £1,018 | £1,018.00 | £732.96 | -28.0% | FLAG | se_0710jan 07:26:50Z |
| Scott Ellis 3588993 | Airbnb | 13-17 Feb (78) | 6 | £1,497 (open, min 4) | £1,497.00 | not offered | - | FLAG (NOT CHECKED why) | p05_1317feb6 07:25:36Z |
| all | Booking.com live | - | - | - | e.g. P12 30 Nov-3 Dec Standard £956 | NOT CHECKED: AWS WAF 07:27:47Z | - | - | ch27/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest against Smoobu are:

| Card | Gap |
|---|---|
| Scott Ellis 16-19 Dec | £364.84 |
| P05 5-10 Jan | £344.28 |
| Scott Ellis 10-13 Dec | £312.20 |
| P20 14-18 Dec | £289.29 |
| Scott Ellis 7-10 Jan | £285.04 |
| P04 14-21 Dec | £270.90 (£115.80 against expected after weekly 15%) |
| P06 9-12 Dec | £226.08 |
| P06 6-9 Dec | £220.67 |
| P05 13-17 Feb | £199.80 |
| P13 3064856 14-19 Dec | £198.74 |
| P12 30 Nov-3 Dec | £195.06 |
| P05 7-9 Dec | £193.65 |

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, in policy) | £115.00 | £97.75 |
| Booking.com observed, Scott Ellis 30 Dec-4 Jan (15%) | £88.06 (VAT incl.) | £74.85 |
| Booking.com observed, P12 4-7 Dec (15%) | £84.33 | £71.68 |
| Booking.com observed, P11 25-27 Nov (18% booster) | £66.83 | £54.80 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb 0.900 | £90.00 | £76.05 |
| **Airbnb observed, P04 10-13 Dec (new)** | **£76.50** | **£64.64** |
| **Airbnb observed, P20 5-6 Dec (new)** | **£75.80** | **£64.05** |
| Airbnb 0.765 (cards) | £76.50 | £64.64 |
| Airbnb 0.738 (P04 weekly 18%) | £73.80 | £62.36 |
| Airbnb 0.720 (Scott Ellis) | £72.00 | £60.84 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- Both new Airbnb bookings net about £64 per £100 Smoobu, £20 below the Airbnb model (£84.50) and £26 below the direct model.
- On observed prices, the P12 and Scott Ellis Booking.com stays (15%) still net more than Airbnb 0.765. P11's last-minute Booking.com stay (£54.80) does not, but Camden has no Airbnb price on the same flat.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 27 Nov; per property, the top-level field is null), VAT-corrected**
- PriceLabs booked ADR is ex-VAT for Booking.com, so Booking.com nights are multiplied by 1.2. The 6 nights with a blank ref (Scott Ellis) are dropped.
- The unadjusted run reproduces the pack exactly (`ch27s/vat27.py`).
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -14.5% (8 n) | **-1.4%** | Booking.com +6.4% (6 n); **Airbnb -23.5% (2 n, the new 10-13 Dec stay; 10 Dec has no booked ADR in PriceLabs)** |
| P11 | -32.9% (11 n) | **-19.4%** | all Booking.com, 18% booster |
| P12 | -36.3% (10 n) | **-23.5%** | all Booking.com |
| P13 | -31.2% (12 n) | **-25.2%** | Booking.com -25.4% (6 n); Airbnb -25.0% (6 n) |

Airbnb-only flats need no correction: P01 -38.3%, P05 -14.6%, P06 -38.9%, P20 -39.9% (20 n, incl. the new 5 Dec night).

### 7. Fees and min stay

**Cleaning**
- Both new bookings charged the expected cleaning: P20 £150, P04 £142 (3 n).
- The cards reconcile with P04 £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195 and P12 £150 (3 n).
- 1455 cleaning: NOT CHECKED (its card total is not split).

**Min stay as displayed matches Smoobu**
- P04 sells at 3+ nights only.
- P20 5 Dec (min 1, DSO) was sold as 1 night, and 26 Dec (min 1) sells as 1 night.
- The exceptions are Scott Ellis 13-17 Feb and P13 3090701 3-8 Jan, which are not offered although open with min stay met: NOT CHECKED.
- 1455 min stay: NOT CHECKED. Booking.com plan minimums: NOT CHECKED (WAF).

### Issues ordered by £ impact

1. **Critical: unsynced 1455 is selling booked nights (day 28).**
   - 10-13 Dec (£600.94) and 11-14 Dec (£596.35) are bookable on 1455, but 10-12 Dec was sold on the synced 1657 at 27 Nov 01:59Z for £378.67 + £142.
   - A second booking would be a true double-booking, and Smoobu would not see it.
   - 1455 is still closed from 20 Dec, while 1657 sells 20-26 Dec (£754.92 for 6 n). That points to a possible off-Smoobu booking on 1455 (NOT VERIFIED).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar. Block 10-12 Dec now, check 20-26 Dec for a reservation, then block 27 Nov-5 Jan or unlist, and map it to 3562176.
2. **Critical: hidden Airbnb layers (a-airbnb-rules), day 29. £4,173.59 confirmed (+£49.50, P04 10-13 Dec, exact 0.9 x 0.85 on Smoobu); £4,790.02 including estimates (+£51.70, P20 5-6 Dec).**
   - Both new Airbnb bookings paid about 0.76x Smoobu and net about £64 per £100.
   - The hidden 0.9 is still on every card inside about 45 days. Card gaps go up to £364.84 (Scott Ellis 16-19 Dec) and £344.28 (P05 5-10 Jan).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment (incl. 3547481 and 3562176) > Default pricing rules. Remove the lead-time rule behind the hidden 0.9 and keep the visible discounts.
3. **High: Booking.com cancellations at 41.4% (12 of 29) since 24 Oct.** Confirmed pace has fallen to 0.50 a day, and there has been no new Booking.com booking for 2 days. The cancelled P04 10-14 Dec (£488.35) was resold on Airbnb for £378.67 (3 n).
4. **High: Booking.com +15% not evidenced (t-bcom-markup-2511): still 0 of 4 confirmed bookings since 18 Nov fit x1.15.**
   - Setting: Smoobu > Channel Manager > Booking.com > price overwrite on 2699998, 3588993 and 3064196 = +15%.
   - Corentin to screenshot the P12 30 Nov-3 Dec Standard Rate (x1.15 = £956, x1.10 = £914).
5. **High: Scott Ellis Airbnb Special offer 20% still on** (-£183.24 to -£234.54 per card; 0.72x Smoobu). Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts.
6. **High: P04 Barking account discounts not in policy.**
   - Last-minute 15% took £66.83 off the new 10-13 Dec booking.
   - Weekly 18% (14-21 Dec, -£167.50, £27.91 over policy).
   - New: Long stay 10% (20-26 Dec, -£83.88).
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts. Weekly 15%; Last-minute and Long stay as Corentin decides.
7. **High (Corentin, confirm or revert):**
   - P20 shows capacity 6 (day 9) and prices 6 guests (+£40 on 26 Dec), against policy max 4. Check the 5-6 Dec party size in Airbnb.
   - Reyhan's P11 23-25 Dec override removal still stands (£277 / £256 / £264; no log entry since).
   - P11 block from 5 Jan and the unsellable 3-4 Jan: Smoobu > Calendar > 3064196.
8. **High: Long stay 10% on 5 nights** (P05 -£163.08; P13 -£94.14 / -£83.97 and -£72.90; not in policy). P05 Early booking 12% is -£199.80. Setting: Long stay 0% on each listing if Corentin agrees.
9. **Medium: P13 twins about 11% apart in December** (3090701 cheaper; £847.26 / £755.73 for 14-19 Dec) and 7% the other way in January. 33 of 68 nights are identical, with no logged edit. Bring them within about 3% with a PriceLabs DSO (Corentin to decide).
10. **Medium: P12 26 Nov lapsed unsold** (no booking in `reservations.csv`; it was £301 in Smoobu and £255.85 on Airbnb yesterday). 30 Nov-3 Dec is still open: £830 in Smoobu, £634.94 on Airbnb.

Data gaps:
1. Booking.com live prices, Standard vs Smoobu, derived-plan display, plan minimum stays and same-date ordering: NOT CHECKED (AWS WAF 07:27:47Z, not circumvented).
2. P20 5-6 Dec: the Smoobu / Airbnb price for 5 Dec at 15:51Z on 26 Nov, and whether a host offer set the round £426.00: NOT CHECKED. The £51.70 is an estimate.
3. Whether 1455 has its own booking from 20 Dec, and its cleaning fee and min stay: NOT CHECKED (map search only).
4. Why Smoobu and PriceLabs differed on P04 yesterday (they match today), and which one Airbnb 1657 read at the booking time: the booking fits Smoobu; the mechanism is NOT CHECKED.
5. Whether the Booking.com overwrite reads +15% on 2699998 / 3588993 / 3064196: NOT CHECKED (not exposed by the Smoobu GET API).
6. Why Scott Ellis 13-17 Feb and P13 3090701 3-8 Jan were not offered although open: NOT CHECKED.
7. Why the P13 twins diverged with no logged edit: NOT CHECKED.
8. Vrbo (incl. the Camden Vrbo copy 12037367) and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
