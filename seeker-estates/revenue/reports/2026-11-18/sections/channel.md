## Channel parity

Run date D = 2026-11-18 (Wednesday, GMT). `data/policy.json` read first. Not re-raised: the 15%/20% stay discounts, Booking.com promotion stacking (size only), the Visibility Booster, the +10% Booking.com markup, P13 = one flat, the P02/P03/P06/P07 blocks, P14, and the handbacks.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**, 15 apartments, 18 Nov-28 Feb, at **2026-11-18T07:19:21Z**. Saved to scratch `ch18/smoobu_rates18.json`.
- **Smoobu GET `/api/reservations`** (modifiedFrom 16 Nov, with cancellations): 7 records. Guest fields were dropped before saving to `ch18/smoobu_mod18.json`.
  - Nothing was created after 16 Nov 22:52 (the P13 Booking.com stay).
  - Two Airbnb stays were modified on 17 Nov: P05 18-22 Nov at 12:28 and P06 24-29 Nov at 13:16. I cannot tell what changed because the 17 Nov file is gone.
- **PriceLabs:** `get_user_logs` (listing, 17-18 Nov) returned **0 entries**. Raw `data/snapshots/2026-11-18/raw/` was refreshed 17 Nov 09:08-09:10Z.
- **Live Airbnb:** 23 plain public airbnb.co.uk map searches (curl), every page read, 07:21:14Z-07:25:11Z.
  - URL, dates, guests and timestamp for each are in `ch18/air/*.json`. **28 rows were appended** to `data/snapshots/2026-11-18/channel_checks.csv` (created with the `rm/snapshot.py` header, under `.channel_checks.csv.lock`).
  - Room = first price line minus cleaning (P04 synced £142, P13/P20 £150, P05 £195, P06 £129), before taxes.
  - Every synced card reconciles to Smoobu x tier (1.000 / 0.900 / 0.765, applied per night by lead time) x the visible discount, to 4 dp. The only exception is P04 18-20 Nov (0.809).
- **Booking.com live: NOT CHECKED.** One plain search (Barking, 20 Dec-2 Jan, 2 adults) at 07:26:50Z returned HTTP 202 with an AWS WAF challenge (`ch18/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
  - Booking.com +10% and Airbnb 0% are confirmed in policy.
  - **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts in `ch18s/`.)

### 1. P04 Christmas-NYE after the repricing to £2,306

**Smoobu (07:19Z) matches the PriceLabs pull.**
- 20 Dec-1 Jan are open: 162/162/159/169/173/167/165/175/192/193/194/201/194 = **£2,306**.
- On 17 Nov the same nights were £2,733: **-£427 (-15.6%)**.
- Min stays are unchanged: 3/3/3/4/4/4/4/7/5/5/5/5/4.
- PriceLabs raw `prices_3562176.json` (refreshed 17 Nov 09:09:57Z) shows these nights open, so the cancellation is now registered.
- No PriceLabs log entry exists since 17 Nov. The cut came from the engine after the refresh, not from a user edit.
- Booking.com list at +10% (ceil per night) = **£2,544** before promotions. Display NOT CHECKED (WAF).

**Synced Airbnb 1657859794156786222: whole block bookable, every card at the 0.900 hidden tier.**

| Stay (2 adults, lead) | Card line | Room | Visible discount | Room after | vs Smoobu | Policy-expected | Gap |
|---|---|---|---|---|---|---|---|
| 20 Dec-2 Jan, 13 n (32 d) | 13 x £170.57 = £2,217.40 | £2,075.40 (0.900) | Weekly -£373.57 = **18.0%** | **£1,701.83** | 0.738 | £1,960.10 (wk 15%) | -13.2% / -£258.27 |
| 20-27 Dec, 7 n | £1,183.30 | £1,041.30 (0.900) | Weekly -£187.43 = 18.0% | £853.87 | 0.738 | £983.45 | -13.2% / -£129.58 |
| 28 Dec-2 Jan, 5 n (NYE) | £1,018.60 | £876.60 (0.900) | **Long stay -£87.66 = 10.0%** | £788.94 | 0.810 | £974.00 | -19.0% / -£185.06 |
| 23-27 Dec, 4 n | £748.60 | £606.60 | none | £606.60 | 0.900 | £674.00 | -10.0% / -£67.40 |
| 20-23 Dec, 3 n | £576.70 | £434.70 | none | £434.70 | 0.900 | £483.00 | -10.0% / -£48.30 |

- Against yesterday's 13 n card (£2,016.94 room), the guest price is down a further **£315.11**. If the block re-sells on Airbnb as the card stands, room is **£715.51 below** the lost Booking.com stay (£2,417.34).
- Of the £258.27 gap vs policy on the 13 n card, the hidden 0.900 tier is £230.60 at 15% weekly. The extra 3 points of weekly (18% vs 15%) are £62.26.
- Long stay 10% on 5-6 n is seen again (17 Nov: -£104.31). It is not in policy.

**Unsynced 1455876748739910219: still closed over Christmas-NYE.**
- Not offered on any of the five Christmas-NYE searches (20 Dec-2 Jan, 20-27 Dec, 20-23 Dec, 23-27 Dec, 28 Dec-2 Jan; each read to its last page, 50-63 cards).
- It is offered either side: 17-20 Dec £694.10, 2-5 Jan £684.20 and 6-13 Dec £1,290.26 (cards including cleaning, identical to 17 Nov).
- **No Christmas double-booking exposure observed today.** The cause of the closure is NOT CHECKED.

### 2. 1455, day 19: the sold 20-24 Nov is still offered (arrival Friday)

| Stay (2 adults) | Smoobu 3562176 | 1455 card (cleaning not split) | Synced 1657 | Source (`ch18/air/`) |
|---|---|---|---|---|
| 20-24 Nov | **booked** (Airbnb, £489.59 + £142, booked 14 Nov) | **bookable £741.40** (4 x £185.35, unchanged since 16 Nov) | not offered | p04_2024nov 07:22:03Z |
| 21-24 Nov | booked | **bookable £584.60** | not offered | p04_2124nov 07:22:14Z |
| 18-21 Nov | 18-19 open, 20 booked | **bookable £571.00** | not offered | p04_1821nov 07:22:09Z |
| 18-20 Nov, 2 n | open (min 2) | not offered | £398.45 card | p04_1820nov 07:22:11Z |

- **Yes. A second guest can still book the sold 20-24 Nov nights, with arrival in two days.**
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block 18 Nov-5 Jan now (or unlist), then map it to Smoobu 3562176.

### 3. Airbnb hidden layers and standing Airbnb items

There is no new Airbnb booking since 16 Nov (Smoobu modifiedFrom 16 Nov shows none created), so **a-airbnb-rules stays at £3,966.66** (day 20, NOT fixed).

The tiers are unchanged and per night:
- **P20 14-19 Dec**: 14-16 Dec (26-28 d) at 0.765 plus 17-18 Dec at 0.900 gives £1,266.435, against the card's £1,266.43.
- **P05 18-23 Jan (61 d) is at 1.000**, confirming the tier ends at 60 d.
- **P13 is at 0.900 from 26 d to 46 d** (no 0.765 step). This matches its own 21 Oct rule set (last-minute 10% within 14 d), but the 0.900 at 15-59 d is not in that set.

**Smoobu P20 14-18 Dec is now 297/300/302/332/311 = £1,542** (17 Nov: £1,645). This bears on a-p20-dec-1711.

**Standing items**

| Item | Status 18 Nov | Evidence |
|---|---|---|
| a-airbnb-rules | £3,966.66, day 20, no change | No new Airbnb booking. Today's largest open-card gaps: P05 5-10 Jan £409.83, P20 14-19 Dec £275.57, P04 13 n £258.27 |
| t-airbnb-flex15-1611 | **No new evidence.** P05 18-22 Nov and P06 24-29 Nov were modified 17 Nov; what changed is NOT CHECKED (no 17 Nov baseline) | Today's P20, P05 and P06 cards reconcile without the extra layer |
| P05 long-stay | **Still on: 10.0%** on 5-10 Jan (-£194.13) and 18-23 Jan (-£202.60) | p05_0510jan, p05_1823jan |
| P05 early-booking (a-p05-earlybird 12%) | **Not shown at 61 d** (18-23 Jan card has only Long stay). Seen at 82/93 d on 16 Nov, so the threshold is above 61 d | p05_1823jan 07:25:03Z |
| P04 weekly 18% (t-p04-weekly) | **Not fixed**: 18.0% on 13 n, 7 n Christmas and 6-13 Dec (-£164.11) | p04_2002jan, p04_2027dec, p04_0613dec |
| P13 LOS 5+ (t-p13-los5) | **Confirmed 10.0% on both twins**: 14-19 Dec (-£108.45 / -£100.98) and 3-8 Jan (-£77.40 / -£81.72). Not in the 21 Oct Shepherd's Bush rule set | p13_1419dec, p13_0308jan |
| t-p13-twins | **43 of 68** jointly open nights identical in Smoobu (17 Nov: 48 of 69). They differ on 13-21 Dec and 3-16 Jan; identical from 17 Jan. Conflict with `twin_listings`, for Corentin to confirm | smoobu_rates18 |
| P13 22-27 Dec | Booked in PriceLabs on 3064856 (ADR 140.13 = £840.75 / 1.2 / 5); neither twin offered on Airbnb | raw prices_3064856, p13_2227dec |

Setting for the hidden tiers: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list. Keep the visible discounts (`airbnb_visible_discounts`).

### 4. t-p20-delivery, P04 18-19 Nov, P20 22-24 Nov, t-channel-gaps

**t-p20-delivery: still on sale, arrival Friday 20 Nov. Corentin to confirm today.**
- Smoobu has **20 Nov £317 and 21 Nov £331 (min 3), and 22 Nov £278 (min 2) open** (17 Nov: 300/299/254). This goes against policy's 20-22 Nov delivery block (`listing_facts.P20.block_20_21_nov`).
- Airbnb sells 20-23 Nov at **£708.38 room** (0.765; 07:22:43Z). The 2-night 20-22 Nov is not offered (min 3 holds).
- Setting: Smoobu > Waterford Court > block 20-22 Nov, or Corentin updates policy.

**P04 18-19 Nov min 2, check-in today: NOT sold.**
- Smoobu 18 Nov £158 and 19 Nov £159 are available=1, min 2. There is no booking for them in the Smoobu modified list.
- Synced Airbnb still offers 18-20 Nov as 2 nights: £398.45 card, **£256.45 room = 0.809** of Smoobu (layers unidentified; not 0.765 or 0.900).
- This goes against `listing_facts.P04.min_stay_rule` (never under 3 nights). Confirm or revert.
- After today only 19 Nov can sell, and only as 1 night if min stay allows it (it does not at min 2).

**P20 22-24 Nov min 2: on sale.**
- Smoobu 22/23/24 Nov £278/£274/£268, min 2, against policy min 3 to 30 Nov.
- Airbnb 22-24 Nov sells at **£422.28 room** (0.765; 07:23:04Z). Confirm or revert.

**t-channel-gaps (P11, Booking-only).** Booking.com display: NOT CHECKED (WAF).
- 8 Dec £288 (17 Nov £310), min 1.
- 23-25 Dec £291 / £276 / £273, min 2. Target 23 Dec at least £320; **not met**.
- 3 Jan £170, min 3. Target at least £204; **not met**.

### 5. Booking.com running totals since the 24 Oct markup cut

From `reservations.csv` 18 Nov, booked_on 24 Oct or later, with the P04 20-23 Nov triplicate counted once (script `ch18s/`).

| Measure | Bookings | Nights | Room £ | Commission £ | vs 17 Nov |
|---|---|---|---|---|---|
| Gross since cut | 25 | 104 | £18,361.53 | £3,720.39 | unchanged |
| Still confirmed | **16** | 70 | £11,564.66 | £2,350.05 | unchanged |
| Cancelled | 9 | 34 | £6,796.87 (**37.0%** of gross room) | £1,370.34 | unchanged |
| Booked since +10% (12 Nov) | 5 gross / **4 confirmed** | 26 / 21 | £4,589.17 / £3,742.07 | £883.65 / £704.01 | unchanged |

- No Booking.com booking was created or cancelled after 16 Nov 22:52 (Smoobu modifiedFrom 16 Nov).
- Pace over 24.73 days (24 Oct 13:38Z to 18 Nov 07:19Z): 1.01 a day gross and 0.65 confirmed. Both are falling because there were no new bookings in about 32 h.

### 6. Parity table

| Ref | Channel | Stay (lead) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source (`ch18/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 20 Dec-2 Jan, 13 n (32) | 2 | £2,306 | £1,960.10 | £1,701.83 | -13.2% | FLAG | p04_2002jan 07:21:14Z |
| P04 synced | Airbnb | 20-27 Dec, 7 n | 2 | £1,157 | £983.45 | £853.87 | -13.2% | FLAG | p04_2027dec 07:21:57Z |
| P04 synced | Airbnb | 28 Dec-2 Jan, 5 n | 2 | £974 | £974.00 | £788.94 | -19.0% | FLAG | p04_2802jan 07:21:52Z |
| P04 synced | Airbnb | 23-27 Dec | 2 | £674 | £674.00 | £606.60 | -10.0% | FLAG | p04_2327dec 07:21:46Z |
| P04 synced | Airbnb | 20-23 Dec | 2 | £483 | £483.00 | £434.70 | -10.0% | FLAG | p04_2023dec 07:21:40Z |
| P04 synced | Airbnb | 6-13 Dec, 7 n (18) | 2 | £1,013 | £861.05 | £747.59 | -13.2% | FLAG | p04_0613dec 07:22:18Z |
| P04 synced | Airbnb | 17-20 Dec | 2 | £469 | £469.00 | £422.10 | -10.0% | FLAG | p04_1720dec 07:22:24Z |
| P04 synced | Airbnb | 2-5 Jan | 2 | £452 | £452.00 | £406.80 | -10.0% | FLAG | p04_0205jan 07:22:30Z |
| P04 synced | Airbnb | 18-20 Nov, 2 n (0) | 2 | £317 | £317.00 | £256.45 | -19.1% | FLAG + min-2 conflict | p04_1820nov 07:22:11Z |
| P04 unsynced 1455 | Airbnb | 20-24 / 21-24 / 18-21 Nov | 2 | booked | not for sale | £741.40 / £584.60 / £571.00 card | n/a | FLAG (double-sell) | p04_2024nov, p04_2124nov, p04_1821nov |
| P04 unsynced 1455 | Airbnb | Christmas-NYE (5 stays) | 2 | open | - | not offered | - | ok (closed) | p04_2002jan etc. |
| P20 | Airbnb | 20-23 Nov (2) | 2 | £926 | £787.10 (LM 15%) | £708.38 | -10.0% | FLAG + delivery conflict | p20_2023nov 07:22:43Z |
| P20 | Airbnb | 20-22 Nov, 2 n | 2 | min 3 | - | not offered | - | ok | p20_2022nov 07:22:54Z |
| P20 | Airbnb | 22-24 Nov (4) | 2 | £552 | £469.20 (LM 15%) | £422.28 | -10.0% | FLAG + min-2 conflict | p20_2224nov 07:23:04Z |
| P20 | Airbnb | 14-19 Dec, 5 n (26) | 2 | £1,542 | £1,542.00 | £1,266.43 | -17.9% | FLAG | p20_1419dec 07:23:22Z |
| P13 3064856 / 3090701 | Airbnb | 14-19 Dec, 5 n (26) | 4 | £1,205 / £1,122 | same | £976.05 / £908.82 | -19.0% / -19.0% | FLAG | p13_1419dec 07:23:48Z |
| P13 3064856 / 3090701 | Airbnb | 18-21 Dec (30) | 4 | £706 / £745 | same | £635.40 / £670.50 | -10.0% / -10.0% | FLAG | p13_1821dec 07:24:03Z |
| P13 3064856 / 3090701 | Airbnb | 3-8 Jan, 5 n (46) | 4 | £860 / £908 | same | £696.60 / £735.48 | -19.0% / -19.0% | FLAG | p13_0308jan 07:24:24Z |
| P13 | Airbnb | 22-27 Dec | 4 | booked | - | neither twin offered | - | ok | p13_2227dec 07:24:12Z |
| P05 | Airbnb | 5-10 Jan, 5 n (48) | 8 | £2,157 | £2,157.00 | £1,747.17 | -19.0% | FLAG | p05_0510jan 07:24:47Z |
| P05 | Airbnb | 4-11 Jan, 7 n (47) | 8 | £2,999 | £2,549.15 | £2,294.21 | -10.0% | FLAG | p05_0411jan 07:24:55Z |
| P05 | Airbnb | 18-23 Jan, 5 n (61) | 8 | £2,026 | £2,026.00 | £1,823.40 (Long stay only) | -10.0% | FLAG | p05_1823jan 07:25:03Z |
| P06 | Airbnb | 22-24 Nov (4) | 2 | £508 | £508.00 | £388.61 | -23.5% | FLAG (nights open despite policy block: t-p06-2229open) | p06_2224nov 07:25:11Z |
| all | Booking.com live | - | - | - | - | NOT CHECKED: AWS WAF 07:26:50Z | - | - | ch18/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

These £ gaps are the cost if a card sells as it stands. The cards overlap, so do not sum them. The largest are:

| Card | Gap |
|---|---|
| P05 5-10 Jan | £409.83 |
| P20 14-19 Dec | £275.57 |
| P04 13 n | £258.27 |
| P05 4-11 Jan | £254.94 |
| P13 14-19 Dec | £228.95 / £213.18 |
| P05 18-23 Jan | £202.60 |
| P04 NYE 5 n | £185.06 |
| P13 3-8 Jan | £172.52 / £163.40 |

### 7. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+10%, confirmed) | £110.00 | £93.50 (15%) |
| Booking.com P13 observed 22-27 Dec (stack 0.6926, 17 Nov) | £76.29 | £64.85 (£52.14 ex-VAT) |
| Airbnb model / live from 61 d | £100.00 | £84.50 |
| Airbnb live 0.900 (29-60 d; P13 from 26 d) | £90.00 | £76.05 |
| Airbnb 0.900 x Long stay 10% (5-6 n: P04, P05, P13) | £81.00 | £68.45 |
| Airbnb live 0.765 (up to 28 d) | £76.50 | £64.64 |
| Airbnb P04 Christmas 7 n / 13 n (0.738) | £73.80 | £62.36 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty and the model ordering holds.
- The observed prices break the ordering: every Airbnb card inside 60 d (and every 5+ n card) is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 18 Nov), VAT-corrected.**
- PriceLabs booked ADR on Booking.com nights is ex-VAT. For example, P13 22-26 Dec ADR 140.13 = £840.75 / 1.2 / 5. So Booking.com nights are multiplied by 1.2.
- The 2 nights with a blank ref are dropped. The unadjusted run reproduces the pack (P04 -21.2%, P13 -41.0%). Script `ch18s/vat.py`.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -21.2% (11 n) | **-9.3%** | Booking.com -0.8% (8 n); Airbnb -31.2% (3 n) |
| P11 | -39.8% (10 n) | **-27.7%** | all Booking.com |
| P12 | -37.7% (14 n) | **-25.3%** | all Booking.com |
| P13 | -41.0% (16 n) | **-34.9%** | Booking.com -40.9% (10 n); Airbnb -25.5% (6 n) |

Airbnb-only flats need no correction: P01 -36.4%, P05 -5.1%, P06 -44.1%, P09 -26.7%, P20 -41.1%.

### 8. Fees and min stay

- **Cleaning:** every synced card reconciles to Smoobu x tier plus P04 £142, P13/P20 £150, P05 £195 and P06 £129. The 0.9000 / 0.7650 fits hold to 4 dp, which supports these fee values. On 1455 the cleaning fee is not split: NOT CHECKED. Booking.com fees: NOT CHECKED (WAF).
- **Min stay as displayed matches Smoobu:**
  - P20 20-22 Nov is not offered as 2 nights (min 3).
  - P04 Christmas sells at 3, 4, 5, 7 and 13 nights, as Smoobu sets.
  - P04 18-20 Nov and P20 22-24 Nov sell as 2 nights (the conflicts in section 4).
  - On 1455, min stay is NOT CHECKED (it does not show 18-20 Nov as 2 nights).

### Issues ordered by £ impact

1. **Critical: P04 Christmas-NYE, 13 nights open since the £2,417.34 cancellation, now repriced -15.6% to £2,306.**
   - Synced Airbnb sells it at **£1,701.83 room**: 0.738 of Smoobu, £715.51 below the lost stay and £258.27 below policy.
   - Setting: Corentin to decide P04 Christmas pricing. Then fix the Airbnb layers: Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15% (from 18%) and Long stay 0% (or as policy); and the Smoobu Airbnb default pricing rules for 3562176.
   - Keep 1455's Christmas block closed until it is mapped.
2. **Critical: hidden Airbnb layers, day 20 (a-airbnb-rules), £3,966.66 running.** Largest open-card gaps today: P05 5-10 Jan £409.83, P20 14-19 Dec £275.57 and P04 13 n £258.27 (not summed).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the unlisted last-minute and lead-time rules.
3. **Critical: unsynced 1455, day 19.** It sells the booked 20-24 Nov (£741.40), 21-24 Nov (£584.60) and 18-21 Nov (£571.00). Arrival is Friday.
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all, or unlist. Then map it to Smoobu 3562176.
4. **High: Long stay 10% on 5-6 nights (P05, P13 twins, P04), not in policy.**
   - Today's cards: P05 -£194.13 / -£202.60, P13 -£108.45 / -£100.98 / -£77.40 / -£81.72, P04 -£87.66.
   - Setting: Airbnb listing > Pricing > Discounts > Long stay (or the Smoobu LOS 5+ rule). Corentin to keep or zero it.
5. **High: t-p20-delivery, Corentin to confirm before Friday.** 20-22 Nov is open and on sale (£708.38 room for 20-23 Nov).
   - Setting: Smoobu > Waterford Court > block 20-22 Nov, or update policy.
6. **High: min-2 conflicts (confirm or revert).**
   - P04 18-19 Nov did not sell: check-in is today and it is on sale at £256.45 room.
   - P20 22-24 Nov is on sale at £422.28.
   - Setting: PriceLabs > DSO min stay 3, or keep.
7. **Medium: P13 twins identical on 43 of 68 nights**, and t-channel-gaps P11 is not met (23 Dec £291 < £320; 3 Jan £170 < £204).
8. **Medium: Booking.com pace.** There have been no new Booking.com bookings for about 32 h, and 37.0% of gross room since the cut has been cancelled.

Closed or changed today:
- P04 Christmas cancellation is registered in PriceLabs.
- P13 22-26 Dec is Booked in PriceLabs.
- PriceLabs logs show no user edits since 17 Nov.

Data gaps:
1. Booking.com live prices for P04 Christmas (list £2,544 before promotions), P13, the P11 gaps, and same-date ordering: NOT CHECKED (AWS WAF, not circumvented).
2. Why 1455 is closed over Christmas: NOT CHECKED. The evidence is absence from 5 exhaustive map searches only.
3. What changed in the 17 Nov modifications of P05 18-22 Nov and P06 24-29 Nov: NOT CHECKED (no 17 Nov baseline file; Smoobu gives no diff).
4. Airbnb reservation breakdowns for the Flexible-test flats (t-airbnb-flex15-1611): NOT CHECKED.
5. Source of the 0.809 on the P04 18-20 Nov card: NOT CHECKED.
6. P13 22-27 Dec Booking.com rate plan and promotion breakdown: NOT CHECKED (the stack is a fit).
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
