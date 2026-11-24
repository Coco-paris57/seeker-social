## Channel parity

Run date D = 2026-11-24 (Tuesday, GMT). I read `data/policy.json` first. These are settled and I do not re-raise them:
- the 15%/20% stay discounts;
- Booking.com promotion stacking (I report its size only);
- the Visibility Booster;
- the +15% Booking.com markup (`booking_markup` 0.15, since 18 Nov) and the derived rate plans (`booking_rate_plans`);
- P13 = one flat;
- the P02/P03/P06/P07 blocks, the P14 setup and the handbacks (P12 last night 13 Dec, so 4-7 Dec is inventory).

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 16 apartments, 24 Nov-28 Feb, fetched **2026-11-24T07:19:50Z** (scratch `ch24/smoobu_rates24.json`).
- **Smoobu GET `/api/reservations`** (modifiedFrom 23 Nov, with cancellations): 12 records, plus GET price-elements for the two paid ones. I kept amounts only and dropped guest fields and references (`ch24/smoobu_mod24.json`, `ch24/pe24.json`).
- **PriceLabs** (one call at a time):
  - `get_user_logs` (listing, 23-24 Nov) returns 16 entries, all Reyhan. The only one after yesterday's run is **P12 4-6 Dec DSO min 2, no price change (23 Nov 21:18:56Z, copied to the Vrbo copy)**.
  - `get_pms_reservations` (bookings made 23-24 Nov) returns 1 record: a cancelled P11 "Blocked channel" record, revenue £0. **No new paid booking on any channel.**
- **Live Airbnb:** 27 plain public airbnb.co.uk map searches (curl), every page read, 07:21:53Z-07:28:23Z. URL, dates, guests and timestamp for each are in `ch24/air/*.json`.
  - I also read four room pages (P20, Scott Ellis Gardens, 1455, synced P04 1657) at 07:26:36Z-07:26:42Z (`ch24/pg/`).
  - `data/snapshots/2026-11-24/channel_checks.csv` was absent. I copied it forward from 23 Nov (296 lines) and **appended 25 rows** under `.channel_checks.csv.lock` (321 lines).
  - Room = first price line minus cleaning (P04 synced £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195, P12 £150 for 3 nights and £125 for 2 nights), before taxes.
- **Booking.com live: NOT CHECKED.** One plain search (Mile End, 4-6 Dec, 2 adults) at 07:27:47Z returned HTTP 202 with an AWS WAF challenge (`ch24/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +15% and Airbnb 0% are confirmed in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**
- **Clock:** Smoobu's created and modified times are UTC+1 (yesterday's check). Below I give UTC.

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts are in `ch24s/`.)

### 1. 1455, day 25: still selling the Booking.com nights 10-14 Dec, and the open 17-20 / 6-9 Dec

| Stay (2 adults searched) | Smoobu 3562176 | 1455 card (incl. cleaning) | Synced 1657 | Source (`ch24/air/`) |
|---|---|---|---|---|
| 24-25 Nov (1 n) | open £136, min 3 (Airbnb stay 20-24 Nov checked out today; 25 Nov-2 Dec booked on Booking.com) | not offered | not offered | p04_2425nov 07:21:53Z |
| 24-26 Nov / 24-27 Nov | 25 Nov on booked | not offered | not offered | p04_2426nov 07:27:12Z, p04_2427nov 07:21:54Z |
| 25-28 Nov / 27-30 Nov (Booking.com 25 Nov-2 Dec, £1,056.90) | booked | not offered | not offered | p04_2528nov 07:27:15Z, p04_2730nov 07:27:20Z |
| **10-14 Dec (Booking.com, made 22 Nov)** | booked | **bookable £753.17** (same as yesterday) | not offered | p04_1014dec 07:21:57Z |
| **10-13 Dec** | booked | **bookable £600.94** (same) | not offered | p04_1013dec 07:22:03Z |
| 17-20 Dec | open £473 | **bookable £607.83** (static since 22 Nov) | offered, £338.89 room | p04_1720dec 07:22:10Z |
| 6-9 Dec | open £507 | **bookable £589.47** (same) | offered, £362.60 room | p04_0609dec 07:22:17Z |
| 14-21 Dec | open £1,076 | not offered | offered | p04_1421dec 07:22:24Z |

- The 1455 room page is still live (07:26:41Z, `pg/p04u_room.html`, capacity 6).
- **Yes, still selling the booked Booking.com nights 10-14 Dec** (at risk: £488.35 room + £129 cleaning = £617.35, plus relocation), and the open 17-20 Dec and 6-9 Dec, at prices unchanged for three days.
- **24-25 Nov: no longer an issue.** The in-residence stay checked out today, and 1455 is not offered for any November search (24-25, 24-26, 24-27, 25-28, 27-30 Nov), so the Booking.com 25 Nov-2 Dec stay is not visibly double-sold. "Not offered" in a map search is not proof that 1455's calendar is blocked: NOT CHECKED.
- Setting (unchanged): Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 24 Nov-5 Jan **now**, or unlist it. Then map it to Smoobu 3562176.

### 2. Booking.com: the P12 4-7 Dec cancellation, totals, no new booking

**P12 4-7 Dec (3 n, made 5 Nov 06:48 Smoobu clock), cancelled 23 Nov 21:46:04 Smoobu clock (about 20:46Z)**

| Item | Value | Source |
|---|---|---|
| Room paid | **£677.79** incl. VAT £112.97 (1/6); ex-VAT £564.82 | Smoobu price-elements |
| Cleaning / commission | £150 / **£124.17 = 15.0% of £827.79** (£22.50 of it on cleaning) | Smoobu |
| Smoobu at booking | 267 + 276 + 226 = **£769** (5 Nov section; Reyhan's -15% on 27 Nov-13 Dec was in force) | `reports/2026-11-05/sections/channel.md` |
| Fit (5 Nov) | ceil(x1.15) per night = £886 list x **0.765 = £677.79 exactly** (best reading Genius 15% x Mobile 10%; size only, -23.5% = £208.21) | same |
| **Paid per £100 Smoobu** | **£88.14** (VAT incl.), £73.45 ex-VAT. Net after 15%: **£74.92** (guest x 0.85, as in the table in §7), or £71.99 if the full commission incl. the cleaning share is taken off the room. | |

- The cancelled stay was the best-paying Booking.com stay per £100 Smoobu since the 24 Oct cut (P04 10-14 Dec £84.20; P11 27-30 Nov £77.18 / £74.10).
- **4-7 Dec is now open in Smoobu at 312 / 332 / 271 = £915, min 2** (+19.0% vs £769 at booking; Reyhan's 4-6 Dec min 2 DSO at 21:18:56Z, 32 min before the cancellation reached Smoobu's clock, is a min-stay change only. Corentin to confirm or revert).
  - Booking.com Standard would be ceil(x1.15) = 359 + 382 + 312 = **£1,053**. With the same 0.765 stack it would pay £805.55. Booking.com display: NOT CHECKED (WAF).
  - Airbnb sells it live: **4-7 Dec room £699.97 = 0.765 x £915** (lead 10, 07:28:23Z) and 4-6 Dec £492.66 = 0.765 x £644 (07:26:03Z). Net at 15.5%: £591.47 for 4-7 Dec, above the £553.62 the cancelled Booking.com stay would have netted.

**Running totals since the 24 Oct markup cut** (`reservations.csv` 24 Nov, booked_on 24 Oct or later; the P04 20-23 Nov triplicate is counted once; room is VAT incl.)

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross | **27** (unchanged) | 111 | £19,388.61 | £3,936.78 |
| Still confirmed | **16** (was 17) | 70 | £11,308.66 | £2,306.50 |
| Cancelled | **11** (was 10) | 41 | £8,079.95 (**41.7%** of gross room; was 38.2%) | £1,630.28 |
| Booked since +15% (18 Nov) | 2 / 2 confirmed | 7 | £1,027.08 | £216.39 |

- **This verifies the Dispatcher's 27 / 16 / 11.** Cancellation rate: **11 of 27 = 40.7% by count**, 41 of 111 nights = 36.9%, 41.7% of room value.
- P12 accounts for 5 of the 11 cancellations (3-7 Dec, 4-7 Dec, 4-8 Dec, 11-13 Dec, plus 20-23 Nov on P04 is the other Mile End-era pair); Mile End and Camden together are 9 of 11.
- Pace over 30.74 days (24 Oct 13:38Z to 24 Nov 07:19Z): **0.88 a day gross, 0.52 confirmed** (yesterday 0.91 / 0.57).
- **No new Booking.com booking.** None made after 22 Nov 21:54Z (Smoobu modified-since list; PriceLabs `get_pms_reservations` 23-24 Nov).
- P11 27-30 Nov (Booking.com) shows a Smoobu "modification" at 23 Nov 15:21:12 Smoobu clock. Room £538.73, cleaning £149 and commission £123.79 are unchanged; what changed is NOT CHECKED.

**P11 Camden (Booking-only)**
- The Smoobu block **5 Jan 2027 onward is still there** (all of 5 Jan-28 Feb unavailable in `/api/rates`). The 2029 end date is from yesterday's record. **Corentin to confirm a handback (then add to `handbacks`) or remove it: Smoobu > Calendar > 3064196.**
- **3-4 Jan is still unsellable**: 2 open nights (151 / 163) at min 3, with 5 Jan blocked.
- t-channel-gaps: 23 / 24 / 25 Dec are **£291 / £268 / £304** (yesterday £290 / £280 / £291; targets about £320 / £295 / £305). 3 Jan is **£151** (yesterday £144; target about £195). At +15%, Standard would be £335 / £309 / £350 / £174. Display: NOT CHECKED (WAF).

### 3. t-p04-airbnb-sync-2311, day 2: the synced P04 Airbnb listing is still on the stale price set

| Stay | Card (room) | Tier | Price Airbnb has | Smoobu 22 Nov | Smoobu 23 Nov | **Smoobu 24 Nov** |
|---|---|---|---|---|---|---|
| 6-9 Dec | £362.60 (identical to yesterday) | 0.765 | **£474** | £454 | £511 | **£507** |
| 17-20 Dec | £338.89 (identical) | 0.765 | **£443** | £442 | £477 | **£473** |
| 14-21 Dec | £905.40 line room, £742.42 after weekly (identical) | 0.900 | **£1,006** | £1,002 | £1,085 | **£1,076** |

- **Not fixed.** Two Smoobu pushes later (23 Nov 00:15Z and 24 Nov 00:23-00:31Z window), Airbnb listing 1657859794156786222 still shows the same cards to the penny. Airbnb has £474 / £443 / £1,006 against Smoobu £507 / £473 / £1,076 (**-6.5% / -6.3% / -6.5%**).
- Cost on these three cards alone: about £25.25 + £22.95 + £51.66 = **£99.86** of room under the synced price, before the hidden tier question.
- P06, P20, P05, P12, P13 and Scott Ellis cards all match today's Smoobu exactly at their tiers, so this is P04-only.
- Cause NOT CHECKED. Setting: Smoobu > Channel Manager > Airbnb > 3562176 > check the sync log / resend prices (and confirm the Airbnb account connection, policy `listing_facts.P04.airbnb`).

### 4. a-airbnb-rules (day 26), P06, Scott Ellis Gardens

**a-airbnb-rules: no change.** No new Airbnb booking was made since yesterday, so the total stays **£4,124.09 confirmed / £4,688.82 including estimates**. The rules are still on every card.

Tiers seen today (card room / Smoobu, no visible discount unless noted):

| Tier | Where | Lead |
|---|---|---|
| 0.765 | P12 30 Nov-3 Dec, 4-6 Dec, 4-7 Dec | 6-10 d |
| 0.765 | P06 2-3 Dec | 8 d |
| 0.765 | P20 5-6 Dec | 11 d |
| 0.765 | P05 7-9 Dec | 13 d |
| 0.765 | P04 6-9 Dec and 17-20 Dec (on Airbnb's stale price set) | 12-23 d |
| 0.765 | P20 14-19 Dec | 20 d |
| 0.900 | P04 14-21 Dec, P13 14-19 Dec (both twins) | 20 d |
| 0.900 | Scott Ellis (all), P20 26 Dec, P13 3-8 Jan, P05 5-10 Jan | 16-44 d |
| 1.000 | P05 13-17 Feb | 81 d |

- Setting (unchanged): Smoobu > Channel Manager > Airbnb > each apartment (incl. 3288517, 3588993, 2699998) > Default pricing rules. Remove the lead-time and last-minute rules behind 0.765 / 0.9, and keep the visible discounts.

**P06 unexplained layer: nothing new visible.** The only P06 card (2-3 Dec, lead 8, 07:22:40Z) is room **£277.69 = 0.765 x £363 exactly**, with no visible discount line. £363 is today's Smoobu with Reyhan's +25% DSO on 2 Dec (yesterday £349). The extra 22.1% (29 Nov-2 Dec) and 3.4% (3-6 Dec) on the two booked stays stay **NOT CHECKED** (needs the Airbnb reservation price breakdown). P06 has no other open night to 14 Jan (intentional block, policy).

**Scott Ellis Gardens: the 20% Special offer is still on, on all three cards (07:25:31Z-07:25:46Z).** The room page still shows `isNewListing` true and capacity 6 (07:26:38Z).

| Stay (4 adults searched) | Lead | Smoobu | Line room | Special offer | Room after | vs Smoobu |
|---|---|---|---|---|---|---|
| 10-13 Dec | 16 d | £1,319 | £1,187.10 | -£237.42 | £949.68 | -£369.32 (-28.0%) |
| 16-19 Dec | 22 d | £1,323 | £1,190.70 | -£238.14 | £952.56 | -£370.44 (-28.0%) |
| 7-10 Jan | 44 d | £979 | £881.10 | -£176.22 | £704.88 | -£274.12 (-28.0%) |
| 27-30 Dec | 33 d | £1,717 (27 Dec min 7) | not offered (matches min stay) | - | - | - |

- Still 1 reservation of the 3 after which the new-listing promotion ended on P20. **Corentin to keep it or end it:** Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.
- **New: Scott Ellis Smoobu blocks changed on 23 Nov (about 09:58-09:59Z).** The "Blocked channel" record from 20 Nov now runs to **10 Dec** (modified), so **29 Nov-9 Dec is now closed** (9 newly closed nights, Smoobu yesterday £3,257). The single-night blocks on 3 and 8 Dec (now inside the range) and 5 Jan were cancelled, 15 Dec was re-created, and new single-night blocks were added on **6 Jan** (£320) and **12 Jan** (£303). There is no PriceLabs log for it, and who set it and why is NOT CHECKED. Scott Ellis is not in policy, so: **Corentin to confirm (owner use / setup?) or remove in Smoobu > Calendar > 3588993.**

### 5. P20 guests, P04 weekly, long stay, twins

**P20 guest count: day 6, not changed.**
- The room page shows **capacity 6** (`personCapacity` 6, 4 occurrences; 07:26:36Z). Policy `listing_facts.P20.max_guests` is 4.
- The 26-27 Dec card is still offered for **6 adults searched at £498.10 room against £458.10 for 2 adults (+£40)** (07:23:45Z / 07:23:58Z).
- Corentin to confirm or revert. Setting: Airbnb listing 1791529331262420081 > Listing details > Guests: 4.

**P04 weekly 18% (t-p04-weekly): not fixed.**
- 14-21 Dec: -£162.98 = 18.0% of £905.40. At 15% it would be £135.81, so **£27.17 over policy**. The card is on the stale P04 price set (§3).
- Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

**Long stay 10% on 5 nights: still on (not in policy; Corentin to keep or zero it).**
- P05 5-10 Jan: -£164.43 (10% of £1,644.30).
- P13 3-8 Jan: -£77.49 (3064856) / -£77.94 (3090701).
- P13 14-19 Dec: -£89.01 / -£92.61.
- P05 13-17 Feb: the visible Early booking 12% is -£201.96 (a-p05-earlybird); the card is £1,481.04.

**t-p13-twins: the twins now differ, without a logged edit.**
- In Smoobu, **39 of 68 jointly open nights are identical** (yesterday 66 of 68). 3090701 is **+3.7% to +4.2% on 13-21 Dec** (e.g. 14 Dec 190 / 198), **+£1 (+0.6%) on 3-22 Jan**, and **-20% on 27 Nov (265 / 212) and 1 Dec (235 / 188)**.
- Cards: 14-19 Dec both twins are now offered (yesterday only 3090701): **£801.09 / £833.49**. 3-8 Jan **£697.41 / £701.46** (yesterday identical £698.22).
- No P13 edit is logged after 23 Nov 00:08Z, so the change came with the 21:35Z refresh. Cause NOT CHECKED (pricelabs section).
- This now meets `listing_facts.P13.twin_listings` ("slightly different") on December. January (+0.6%) is only just different; the -20% on 27 Nov / 1 Dec is wider than "slightly". No new action beyond keeping 3090701 about +3% after any parent edit.

### 6. Parity table

Expected = Smoobu x policy discounts (Airbnb 0% markup; the P20 last-minute 15% applies at 0-14 days; weekly 15% at 7+ nights). Booking.com expected = Standard = ceil(Smoobu x1.15), before promotions. "Search guests" is the search parameter, not a reservation party.

| Ref | Channel | Stay (lead) | Search guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P12 | Booking.com (cancelled 23 Nov) | 4-7 Dec, 3 n (29 at booking) | - | £769 at booking | £886 Standard | **£677.79 paid** | -23.5% | size only (stack is policy) | Smoobu price-elements; 5 Nov section |
| P04 synced | Airbnb | 6-9 Dec (12) | 2 | £507 | £507.00 | £362.60 | -28.5% | FLAG (0.765 + stale set) | p04_0609dec 07:22:17Z |
| P04 synced | Airbnb | 17-20 Dec (23) | 2 | £473 | £473.00 | £338.89 | -28.4% | FLAG (0.765 + stale set) | p04_1720dec 07:22:10Z |
| P04 synced | Airbnb | 14-21 Dec, 7 n (20) | 2 | £1,076 | £914.60 | £742.42 | -18.8% | FLAG (0.9 + weekly 18% + stale set) | p04_1421dec 07:22:24Z |
| P04 unsynced 1455 | Airbnb | 10-14 Dec / 10-13 Dec | 2 | booked | not for sale | £753.17 / £600.94 card incl. cleaning | n/a | FLAG (double-sell) | p04_1014dec, p04_1013dec |
| P04 unsynced 1455 | Airbnb | 17-20 Dec / 6-9 Dec | 2 | £473 / £507 | n/a (unsynced copy) | £607.83 / £589.47 card incl. cleaning | n/a | FLAG (double-sell risk) | p04_1720dec, p04_0609dec |
| P04 both | Airbnb | 24-25, 24-26, 24-27, 25-28, 27-30 Nov | 2 | open / booked | - | not offered | - | ok | p04_2425nov ... p04_2730nov |
| P06 | Airbnb | 2-3 Dec, 1 n (8) | 2 | £363 | £363.00 | £277.69 | -23.5% | FLAG | p06_0203dec 07:22:40Z |
| P12 | Airbnb | 30 Nov-3 Dec (6) | 2 | £739 | £739.00 | £565.34 | -23.5% | FLAG | p12_3003dec 07:26:09Z |
| P12 | Airbnb | 4-6 Dec, 2 n (10) | 2 | £644 | £644.00 | £492.66 (£125 cleaning) | -23.5% | FLAG | p12_0406dec 07:26:03Z |
| P12 | Airbnb | 4-7 Dec, 3 n (10) | 2 | £915 | £915.00 | £699.97 | -23.5% | FLAG | p12_0407dec 07:28:23Z |
| P20 | Airbnb | 5-6 Dec (11) | 2 | £582 | £494.70 (LM 15%) | £445.23 | -10.0% | FLAG | p20_0506dec 07:23:09Z |
| P20 | Airbnb | 14-19 Dec, 5 n (20) | 2 | £1,568 | £1,568.00 | £1,199.51 | -23.5% | FLAG | p20_1419dec 07:23:17Z |
| P20 | Airbnb | 26-27 Dec (32) | 2 | £509 | £509.00 | £458.10 | -10.0% | FLAG | p20_2627dec 07:23:45Z |
| P20 | Airbnb | 26-27 Dec (32) | **6** | £509 | not for sale (max 4) | £498.10 (+£40) | - | FLAG (guests) | p20_2627dec6 07:23:58Z |
| P05 | Airbnb | 7-9 Dec, 2 n (13) | 6 | £836 | £836.00 | £639.53 | -23.5% | FLAG | p05_0709dec 07:24:42Z |
| P05 | Airbnb | 5-10 Jan, 5 n (42) | 6 | £1,827 | £1,827.00 | £1,479.87 | -19.0% | FLAG | p05_0510jan 07:23:59Z |
| P05 | Airbnb | 13-17 Feb, 4 n (81) | 6 | £1,683 | £1,683.00 | £1,481.04 | -12.0% (visible Early booking) | FLAG | p05_1317feb6 07:24:20Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (20) | 4 | £989 / £1,029 | same | £801.09 / £833.49 | -19.0% / -19.0% | FLAG | p13_1419dec 07:24:50Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (40) | 4 | £861 / £866 | same | £697.41 / £701.46 | -19.0% / -19.0% | FLAG | p13_0308jan 07:25:07Z |
| Scott Ellis 3588993 | Airbnb | 10-13 Dec (16) | 4 | £1,319 | £1,319.00 | £949.68 | -28.0% | FLAG | se_1013dec 07:25:31Z |
| Scott Ellis 3588993 | Airbnb | 16-19 Dec (22) | 4 | £1,323 | £1,323.00 | £952.56 | -28.0% | FLAG | se_1619dec 07:25:37Z |
| Scott Ellis 3588993 | Airbnb | 7-10 Jan (44) | 4 | £979 | £979.00 | £704.88 | -28.0% | FLAG | se_0710jan 07:25:46Z |
| all | Booking.com live | - | - | - | e.g. P12 4-7 Dec Standard £1,053 | NOT CHECKED: AWS WAF 07:27:47Z | - | - | ch24/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

The open-card gaps overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| Scott Ellis 16-19 Dec | £370.44 |
| Scott Ellis 10-13 Dec | £369.32 |
| P20 14-19 Dec | £368.49 |
| P05 5-10 Jan | £347.13 |
| Scott Ellis 7-10 Jan | £274.12 |
| P12 4-7 Dec | £215.03 |
| P05 13-17 Feb | £201.96 |
| P05 7-9 Dec | £196.47 |
| P13 3090701 14-19 Dec | £195.51 |
| P13 3064856 14-19 Dec | £187.91 |
| P04 14-21 Dec | £172.18 |

### 7. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+15%, confirmed in policy) | £115.00 | £97.75 |
| **Booking.com observed, P12 4-7 Dec (cancelled), 15%** | **£88.14** (VAT incl.) | **£74.92** (£71.99 with the cleaning share of commission) |
| Booking.com observed, P04 10-14 Dec (15%) | £84.20 | £71.57 |
| Booking.com observed, P11 27-30 Nov (A / B), 18% | £77.18 / £74.10 | £63.29 / £60.76 |
| Airbnb model / live at 81 d | £100.00 | £84.50 |
| Airbnb 0.900 | £90.00 | £76.05 |
| Airbnb 0.880 (P05 Early booking) | £88.00 | £74.36 |
| Airbnb 0.810 (0.9 x long stay) | £81.00 | £68.44 |
| Airbnb 0.765 (P04, P05, P06, P12, P20) | £76.50 | £64.64 |
| Airbnb 0.720 (Scott Ellis) | £72.00 | £60.84 |
| Airbnb 0.69 (P04 14-21 Dec on today's Smoobu: stale set x 0.9 x weekly 18%) | £69.00 | £58.31 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- On observed prices, Booking.com (£71.57-£74.92 on the two 15% stays) nets more than Airbnb at 0.765 (£64.64). The "Booking.com nets at least Airbnb" rule holds on observed prices.
- Every observed Airbnb price inside 81 days is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 24 Nov; per property, the top-level field is null), VAT-corrected**
- Booking.com booked ADR in PriceLabs is ex-VAT, so Booking.com nights are multiplied by 1.2. The 4 nights with a blank ref (Scott Ellis; -30.8% raw) are dropped.
- The unadjusted run reproduces the pack exactly (`ch24s/vat23.py`).
- The pack compares with today's PriceLabs price, not the price on the booking date.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -20.0% (11 n) | **-4.0%** | all Booking.com |
| P11 | -30.1% (11 n) | **-16.2%** | all Booking.com |
| P12 | -38.4% (9 n; was 12 n before the 4-7 Dec cancellation) | **-26.1%** | all Booking.com |
| P13 | -32.3% (11 n) | **-27.3%** | Booking.com -30.8% (5 n); Airbnb -24.6% (6 n) |

Airbnb-only flats need no correction: P01 -35.9%, P05 -13.3%, P06 -46.8%, P09 -23.4%, P20 -41.7%.

### 8. Fees and min stay

**Cleaning**
- Every synced card reconciles exactly at its tier with P04 £142, P06 £129, P13/P20/Scott Ellis £150, P05 £195, and P12 £150 (3 n) / £125 (2 n).
- P12 Booking.com cleaning was £150 (cancelled stay); P11 Booking.com £149. Booking.com per-channel fees in Smoobu: NOT CHECKED.

**Min stay as displayed matches Smoobu**
- Scott Ellis 27-30 Dec is not offered (27 Dec min 7).
- P06 2 Dec sells as 1 night (min 1, DSO); P20 5 Dec and 26 Dec as 1 night (min 1).
- **P12 4-6 Dec sells as 2 nights** (min 2 from Reyhan's 21:18:56Z DSO); P05 7-9 Dec as 2 nights (min 2).
- P13 3-8 Jan as 5 nights.
- 1455 min stay: NOT CHECKED (no November card today).
- Booking.com plan minimums: NOT CHECKED (WAF).

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers (a-airbnb-rules), day 26. £4,124.09 confirmed; £4,688.82 including estimates (unchanged; no new Airbnb booking).**
   - Still on every card: 0.765 at 6-23 days lead on P04/P05/P06/P12/P20, 0.9 at 16-44 days. Card gaps up to £368.49 (P20 14-19 Dec) and £347.13 (P05 5-10 Jan). P06's extra layer: nothing new visible (NOT CHECKED).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment (incl. 3288517, 3588993, 2699998) > Default pricing rules. Remove the lead-time and last-minute rules; keep the visible discounts.
2. **Critical: unsynced 1455, day 25.** It still sells the **booked Booking.com nights 10-14 Dec (£753.17) and 10-13 Dec (£600.94)**, and the open 17-20 Dec (£607.83) and 6-9 Dec (£589.47), at prices frozen since 22 Nov. November is no longer offered.
   - At risk: £617.35 (Booking.com 10-14 Dec incl. cleaning), plus relocation.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 24 Nov-5 Jan now, or unlist. Then map it to 3562176.
3. **High: Scott Ellis Gardens on Airbnb at 0.72x, Special offer still on.** -£274.12 to -£370.44 per 3-night card (£237.42 / £238.14 / £176.22 of that is the visible 20% Special offer).
   - Corentin to keep or end it: Airbnb > listing 1823298025501355473 > Pricing > Discounts > New listing promotion.
   - **New: Smoobu blocks on Scott Ellis 29 Nov-9 Dec (extended 23 Nov about 09:58Z), plus 6 Jan and 12 Jan**; 5 Jan freed. 11 nights closed, worth £3,880 at yesterday's Smoobu. Not in policy: **Corentin to confirm or remove (Smoobu > Calendar > 3588993).**
4. **High: Booking.com cancellations at 40.7% (11 of 27) since 24 Oct; P12 4-7 Dec lost £677.79 room.** That stay paid £88.14 per £100 Smoobu (net £74.92), the best since the cut (£886 list x 0.765, size only). Confirmed pace is down to 0.52 a day. No new Booking.com booking.
   - The nights are open at Smoobu £915 (+19%) and selling on Airbnb at £699.97 room (0.765). Booking.com Standard should read £1,053: NOT CHECKED (WAF).
   - Reyhan's P12 4-6 Dec min 2 DSO: Corentin to confirm or revert.
5. **High: P11 Camden blocked in Smoobu from 5 Jan (day 2)**, and 3-4 Jan is unsellable (2 nights at min 3). Corentin to confirm a handback (then add to `handbacks`) or remove it in Smoobu > Calendar > 3064196.
6. **Medium: the synced P04 Airbnb listing is on a stale price set, day 2** (£474 / £443 / £1,006 against Smoobu £507 / £473 / £1,076, about -6.5%; about £99.86 of room on three cards). Setting: Smoobu > Channel Manager > Airbnb > 3562176: check the sync and resend prices.
7. **High (Corentin, confirm or revert):**
   - P20 shows capacity 6 (day 6) and prices 6 guests (+£40 on 26 Dec), against policy max 4.
   - Reyhan's DSOs: P12 4-6 Dec min 2 (new), P04 6-23 Dec -2%, P06 2 Dec +25% min 1, P13 Jan -8% / 14-16 Dec -2% (copied to the twin), P11 23-26 Nov min 2.
8. **High: P04 Airbnb weekly 18%** (14-21 Dec, -£162.98, £27.17 over policy) and **long stay 10% on 5 nights** (P05 -£164.43; P13 -£77.49 / -£77.94 and -£89.01 / -£92.61).
   - Setting: Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly 15%; Long stay 0% on each listing (if Corentin agrees).
   - P05 Early booking 12% is -£201.96.
9. **Medium: P13 twins now differ (39 of 68 nights identical, was 66).** 3090701 is about +4% on 13-21 Dec, +0.6% in January, -20% on 27 Nov / 1 Dec, with no logged edit. December meets the twin rule; check that January stays "slightly different" after the next parent edit.
   - t-channel-gaps: P11 3 Jan £151 against a target of about £195; Christmas £291 / £268 / £304 (24 Dec down £12).

Data gaps:
1. Booking.com live prices, derived-plan display, plan minimum stays, same-date ordering, and whether Scott Ellis is on Booking.com: NOT CHECKED (AWS WAF 07:27:47Z, not circumvented).
2. Whether the P12 4-7 Dec cancellation carried a fee (Smoobu shows the full price and no payout element): NOT CHECKED.
3. What changed in the P11 27-30 Nov "modification" of 23 Nov (amounts unchanged): NOT CHECKED.
4. Why the P06 stays paid 0.60x / 0.74x: NOT CHECKED (no Airbnb breakdown).
5. Who extended the Scott Ellis block to 10 Dec and added 6 / 12 Jan, and who created the P11 block from 5 Jan, and why: NOT CHECKED.
6. Why the synced P04 Airbnb listing has not taken the last two pushes: NOT CHECKED.
7. Why the P13 twins diverged overnight without a logged edit: NOT CHECKED.
8. Whether 1455's calendar is blocked in November or just not returned in the search; 1455 cleaning fee and minimum stay: NOT CHECKED.
9. Source and threshold of the P20 extra-guest fee: NOT CHECKED.
10. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
