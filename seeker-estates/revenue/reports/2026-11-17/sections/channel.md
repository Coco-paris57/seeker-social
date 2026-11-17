## Channel parity

Run date D = 2026-11-17 (Tuesday, GMT). `data/policy.json` read first. Not re-raised: the 15%/20% stay discounts, Booking.com promotion stacking (size only), the Visibility Booster, the +10% Booking.com markup, P13 = one flat, the P02/P03/P06/P07 blocks, P14, and the deprioritised items.

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**, 12 apartments, 17 Nov-28 Feb, at **2026-11-17T07:18:30Z** -> scratch `live17/smoobu_rates17.json`. Compared with `live16/smoobu_rates16.json` (16 Nov 07:17:39Z).
- **Smoobu GET `/api/reservations`** (modifiedFrom 14 Nov, cancellations and price elements) at 07:18:31Z: 13 records. Guest fields dropped -> `live17/smoobu_mod17_pe.json`.
- **PriceLabs:** `get_user_logs` (listing, 16-17 Nov) returned **0 entries**. Raw `data/snapshots/2026-11-17/raw/` (refresh and push times, booking status).
- **Live Airbnb:** 19 plain public airbnb.co.uk map searches (curl), 07:20:32Z-07:24:28Z. URL, dates, guests and timestamp for each are in `live17/air/*.json` and `log.txt`.
  - Room = card total before taxes minus cleaning (P04 synced £142, P13/P20 £150, P05 £195, P06 £129).
  - Every synced card reconciles to Smoobu x tier (1.000 / 0.900 / 0.765) x visible discount.
- **channel_checks:** `data/snapshots/2026-11-17/channel_checks.csv` copied forward from 16 Nov (1,194 lines) under `.channel_checks.csv.lock`, plus **21 Airbnb rows appended** (now 1,215 lines).
- **Booking.com live: NOT CHECKED.** One plain search (Barking, 20 Dec-2 Jan, 2 adults) at 07:23:44Z returned HTTP 202 with an AWS WAF challenge (`live17/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +10% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults; Corentin has not confirmed them.**

(Scratch = `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/`; scripts in `live17scripts/`.)

### 1. P04 Barking Booking.com 20 Dec-2 Jan, cancelled: Christmas-NYE back on sale

**What Smoobu holds:** booking 160754186, apartment 3562176, Booking.com.
- Type **cancellation**, created 20 Oct 12:44, modifiedAt **16 Nov 15:37:54**.
- price £2,417.34 (13 nights, £185.95/n).
- No price elements, no commission, no guest counts. Who cancelled and why: NOT CHECKED (Smoobu has no reason field).
- It was booked 20 Oct, before the 24 Oct markup cut, so it is **not** in the since-cut Booking.com totals.

**Smoobu now (07:18Z): 20 Dec-1 Jan are all open (available=1).** On 16 Nov they were all available=0.
- Rates: 189 / 193 / 187 / 200 / 204 / 198 / 195 / 208 / 228 / 229 / 230 / 241 / 231 = **£2,733**, about £210/n.
- Min stay: 20-22 Dec 3, 23-26 Dec 4, 27 Dec 7, 28-31 Dec 5, 1 Jan 4.
- At +10%, the Booking.com list would be ceil(x1.10) per night = **£3,011** before promotions (display NOT CHECKED, WAF).

**PriceLabs still shows the stay booked.**
- Raw `prices_3562176.json` (refreshed 16 Nov 09:43:29Z, before the 15:37 cancellation) shows 20 Dec-1 Jan as "Booked", ADR 185.92. The `price` field equals Smoobu, so rates are being pushed.
- This only matters for reporting: the pack's P04 forward_occ_60 counts 13 nights that are now open. Smoobu is the truth. It clears at the next refresh.

**Synced Airbnb 1657859794156786222: bookable over the whole block.**

| Stay (2 adults, lead) | Card | Room | vs Smoobu | Note |
|---|---|---|---|---|
| 20 Dec-2 Jan, 13 n (33 d) | £2,601.70 - Weekly £442.76 = £2,158.94 | **£2,016.94** | 0.738 | 0.900 tier x Weekly **18%** |
| 20-23 Dec, 3 n | £654.10 | £512.10 | 0.900 | tier only |
| 23-27 Dec, 4 n (Christmas) | £859.30 | £717.30 | 0.900 | tier only |
| 28 Dec-2 Jan, 5 n (NYE) | £1,185.10 - Long stay £104.31 | **£938.79** | 0.810 | 0.900 x **Long stay 10% on 5 n** (new observation; not in policy) |

**Unsynced Airbnb 1455876748739910219: not offered on any Christmas-NYE search.**
- Not shown on 20 Dec-2 Jan, 20-23 Dec, 23-27 Dec or 28 Dec-2 Jan. Each search ran to its last page (49-61 cards).
- It **is** offered just either side: 17-20 Dec £694.10 card and 2-5 Jan £684.20 card. It is also offered on 6-13 Dec at £1,290.26.
- So its calendar looks closed for exactly the cancelled block. My inference is that it was blocked by hand on that Airbnb account when the Booking.com stay arrived. Cause NOT CHECKED.
- **Double-booking exposure over Christmas-NYE today: none observed on 1455.** If someone reopens it by hand, every night becomes sellable on two unlinked calendars.
- Exposure remains on every other open P04 night (6-19 Dec, 2-5 Jan) and on the sold nights in section 3.

**£ context.** The lost booking was £2,417.34 room. If the block re-sells on synced Airbnb as the card stands, room is £2,016.94 (-£400.40). Policy-expected room at weekly 15% is £2,323.05, so the hidden tier plus the extra 3 pts of weekly cost **£306.11** on this one stay.

### 2. NEW P13 Booking.com 22-27 Dec (£840.75)

**Smoobu 162947708:**
- **apartment 3064856** ("Top-Floor 2Bed with Private Terrace", the twin that carries the Booking.com listing; policy title matches). Smoobu also closes 3090701 for 22-26 Dec (linked).
- Created **16 Nov 22:52:21**, 2 adults + 2 children, lead 36 d.
- price £990.75 = basePrice **£840.75** + cleaning £150. Commission £148.61. VAT element £140.12 (= basePrice / 6).

**Commission: 15.0%, as expected.**
- £148.61 / £990.75 (room + cleaning) = **15.00%**.
- The brief's 17.7% is commission over room only. Booking.com charges on room plus cleaning: the cancelled 18-23 Dec stay, inside the booster window, was 18.02% on the same basis.
- 22 Dec is outside the booster window (to 20 Dec check-ins), so 15% is expected. Nothing to flag.

**Rate at booking.**
- 3064856 was last pushed 16 Nov 09:42:54Z (raw `listing_data.json`), before the booking, and no PriceLabs log entry exists since.
- PriceLabs `user_price` for 22-26 Dec is 216/225/219/220/222. Smoobu 07:18Z shows the same: **£1,102**.

**Paid vs list.**
- Booking.com list = ceil(x1.10) per night = 238/248/241/242/245 = **£1,214**.
- Paid **0.6926 of list** (0.763 of Smoobu).
- Best fit, to the penny per night: **0.9 x 0.9 x 0.9 x 0.95 = 0.69255**. That is consistent with Non-refundable 10% x 1-4-guest NR occupancy -5% x Mobile 10% x Genius Level 1 10%. The Last Minute deals (0-30 d) do not apply at 36 d.
- The rate plan was not seen: NOT CHECKED.
- On 3090701's rates no clean stack fits (0.654 of its list).
- Effective discount vs list: **30.7%, £373.25.** Per policy this is promotion stacking: size reported, not called unexplained.

**Black Friday.** 30%, non-stacking, bookable from 19 Nov: it would show £849.80 for this stay, **higher** than the stack actually paid. Black Friday does not undercut today's stack.

**Same flat, same nights, compared with Airbnb.**
- Net room: Booking.com £840.75 x 0.85 = £714.64. Ex-VAT it is £574.52.
- 3064856 Airbnb at today's 0.900 tier with Long stay 10% would be about £892.62 room, net £754.27 at 15.5%. That is model arithmetic: the twin is now closed, so this is not observed.
- **Booking.com nets less than Airbnb here, which breaks the "Booking.com must net at least what Airbnb nets" rule.**

**Live:** neither Airbnb twin is offered for 22-27 Dec, 4 adults (07:21:13Z). No double-sell.

**Booking.com since the 24 Oct markup cut** (`reservations.csv` 17 Nov, booked_on 24 Oct or later). The P04 20-23 Nov triplicate is counted once. Script `live17scripts/bk.py` reproduces 16 Nov exactly.

| Measure | Bookings | Nights | Room £ | Commission £ | vs 16 Nov |
|---|---|---|---|---|---|
| Gross since cut | 25 | 104 | £18,361.53 | £3,720.39 | +1 / +5 n / +£840.75 |
| Still confirmed | **16** | 70 | £11,564.66 | £2,350.05 | +1 |
| Cancelled | 9 | 34 | £6,796.87 (**37.0%** of gross room) | £1,370.34 | unchanged (P04 20 Dec was booked before the cut) |
| Booked since +10% (12 Nov) | 5 gross, **4 confirmed** (P11 x2, P12, P13) | 21 | £3,742.07 | £704.01 | +1 |
| Confirmed by flat | P04 2 / P11 5 / P12 6 / P13 **3** | 7 / 17 / 29 / 17 | £830.87 / £3,120.46 / £5,143.62 / £2,469.71 | | |

- Pace over 23.74 days (24 Oct 13:38Z to 17 Nov 07:18Z) is 1.05 a day gross and 0.67 confirmed.
- Overnight, Booking.com also lost the pre-cut P04 20 Dec-2 Jan stay (£2,417.34, section 1).
- Three other bookings show a new modifiedAt (P12 21-26 Nov at 17 Nov 00:40, P12 27-30 Nov, P13 Airbnb 28 Nov-1 Dec). None of the `reservations.csv` fields changed (full-row diff).

### 3. Barking unsynced Airbnb 1455876748739910219, day 18: still selling sold nights

| Stay (2 adults) | Smoobu 3562176 | 1455 card (cleaning not split) | Synced 1657859794156786222 | Source (`live17/air/`) |
|---|---|---|---|---|
| 20-24 Nov | **booked** (Airbnb 162894484) | **bookable £741.40** (4 x £185.35, same as 16 Nov) | not offered | p04_2024nov 07:21:00Z |
| 18-21 Nov | 18-19 open, 20 booked | **bookable £571.00** (includes booked 20 Nov) | not offered | p04_1821nov 07:21:08Z |
| 6-13 Dec / 17-20 Dec / 2-5 Jan | open | bookable £1,290.26 / £694.10 / £684.20 | £895.51 / £649.60 / £623.50 card | p04_0613dec, p04_1720dec, p04_0205jan |

- **Yes, the sold 20-24 Nov is still offered on 1455**, with arrival this Friday.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all dates now (at least 18-24 Nov), or unlist. Then map it to Smoobu 3562176.

### 4. Airbnb hidden layers and standing Airbnb items

There is no new Airbnb booking since 16 Nov (full-row diff), so **a-airbnb-rules stays at £3,966.66** (day 19, NOT fixed).

The tiers are unchanged, and today shows they apply **per night by that night's lead time**:
- P20 14-19 Dec: 14-15 Dec (27-28 d) at 0.765 and 16-18 Dec at 0.900 gives £1,394.51, against the card's £1,394.50.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 20 Dec-2 Jan, 13 n (33) | 2 | £2,733 | £2,323.05 (wk 15%) | £2,016.94 (0.9 x wk 18%) | -13.2% | FLAG | p04_2002jan 07:20:32Z |
| P04 synced | Airbnb | 23-27 Dec (36) | 2 | £797 | £797.00 | £717.30 | -10.0% | FLAG | p04_2327dec 07:20:43Z |
| P04 synced | Airbnb | 28 Dec-2 Jan, 5 n (41) | 2 | £1,159 | £1,159.00 | £938.79 (0.9 x LOS 10%) | -19.0% | FLAG | p04_2802jan 07:20:53Z |
| P04 synced | Airbnb | 20-23 Dec (33) | 2 | £569 | £569.00 | £512.10 | -10.0% | FLAG | p04_2023dec 07:23:04Z |
| P04 synced | Airbnb | 6-13 Dec, 7 n (19) | 2 | £1,021 | £867.85 | £753.51 (0.9 x wk 18%) | -13.2% | FLAG | p04_0613dec 07:22:44Z |
| P04 synced | Airbnb | 17-20 Dec (30) | 2 | £564 | £564.00 | £507.60 | -10.0% | FLAG | p04_1720dec 07:22:54Z |
| P04 synced | Airbnb | 2-5 Jan (46) | 2 | £535 | £535.00 | £481.50 | -10.0% | FLAG | p04_0205jan 07:23:16Z |
| P04 synced | Airbnb | 18-20 Nov, 2 n (1) | 2 | £337 | £337.00 | £244.80 = 0.726 | -27.4% | FLAG + min-2 conflict | p04_1820nov 07:24:23Z |
| P04 unsynced 1455 | Airbnb | 20-24 / 18-21 Nov | 2 | booked / partly booked | not for sale | £741.40 / £571.00 card | n/a | FLAG (double-sell) | p04_2024nov, p04_1821nov |
| P13 3064856 | Booking.com (booking) | 22-27 Dec (36) | 4 | £1,102 | £1,214 list | **paid £840.75** = 0.6926 | -30.7% | FLAG (stack size, policy-explained) | Smoobu 162947708 |
| P13 3090701 / 3064856 | Airbnb | 18-22 Dec, 4 n (31) | 4 | £933 / £882 | same | £839.70 / £793.80 | -10.0% / -10.0% | FLAG | p13_1822dec 07:21:18Z |
| P13 | Airbnb | 22-27 Dec | 4 | booked | - | neither twin offered | - | ok | p13_2227dec 07:21:13Z |
| P20 | Airbnb | 20-23 Nov (3) | 2 | £853 | £725.05 (LM 15%) | £652.54 = 0.765 | -10.0% | FLAG + delivery conflict | p20_2023nov 07:21:23Z |
| P20 | Airbnb | 20-22 Nov, 2 n | 2 | min 3 on 20 Nov | - | not offered | - | ok (min stay holds) | p20_2022nov 07:21:29Z |
| P20 | Airbnb | 22-24 Nov, 2 n (5) | 2 | £511 | £434.35 (LM 15%) | £390.91 = 0.765 | -10.0% | FLAG + min-2 conflict | p20_2224nov 07:24:28Z |
| P20 | Airbnb | 14-19 Dec, 5 n (27) | 2 | £1,645 | £1,645.00 | £1,394.50 (0.765/0.900 per night) | -15.2% | FLAG | p20_1419dec 07:21:41Z |
| P05 | Airbnb | 5-10 Jan, 5 n (49) | 8 | £2,175 | £2,175.00 | £1,761.75 (0.9 x Long stay 10%) | -19.0% | FLAG | p05_0510jan 07:21:44Z |
| P05 | Airbnb | 4-11 Jan, 7 n (48) | 8 | £3,023 | £2,569.55 | £2,312.58 (0.9 x wk 15%) | -10.0% | FLAG | p05_0411jan 07:21:47Z |
| P06 | Airbnb | 22-24 Nov, 2 n (5) | 2 | £514 | £514.00 | £393.20 = 0.765 | -23.5% | FLAG | p06_2224nov 07:22:00Z |
| all | Booking.com live | - | - | - | - | NOT CHECKED: AWS WAF 07:23:44Z | - | - | live17/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**Gap vs policy-expected if today's open cards sold as they stand** (hidden tier plus any off-policy visible discount; the cards overlap, so do not sum them):
- P04 20 Dec-2 Jan: £306.11
- P05 5-10 Jan: £413.25
- P20 14-19 Dec: £250.50
- P05 4-11 Jan: £256.97
- P04 28 Dec-2 Jan: £220.21
- P06 22-24 Nov: £120.80
- P04 6-13 Dec: £114.34
- P13 18-22 Dec: £93.30 / £88.20
- P04 18-20 Nov: £92.20
- P20 20-23 Nov: £72.51

**Standing items**

| Item | Status 17 Nov | Evidence |
|---|---|---|
| t-airbnb-flex15-1611 (extra 15% on P06/P20/P05) | **No new evidence.** There is no new booking on any of the three flats. Today's cards show only the tier and visible discounts. | P20 14-19 Dec, P05 5-10 / 4-11 Jan and P06 22-24 Nov cards all reconcile exactly without it. It appears only in the paid amount, so the Airbnb reservation breakdown is still needed. |
| a-p05-earlybird (12%) | Not shown at 48-49 d. It applies at 60+ d (seen 82/93 d on 16 Nov) | p05 cards |
| t-p05-los (Long stay 10%, 5+ n) | **Confirmed still on**: -£195.75 = 10.0% on 5-10 Jan | p05_0510jan |
| t-p04-weekly (18% vs 15%) | Not fixed: -£442.76 = 18.0% of £2,459.70 on 20 Dec-2 Jan, so **£73.79 over policy**; 6-13 Dec 18.0% (£27.57 over) | p04_2002jan, p04_0613dec |
| P04 synced Long stay 10% (5-6 n) | **New observation**: -£104.31 on 28 Dec-2 Jan. Not in policy; Corentin to confirm | p04_2802jan |
| t-p13-los5 | Not testable today: only a 4 n run is open before 22 Dec. Last seen 10% on 16 Nov | - |
| t-p13-twins | **48 of 69** jointly open nights identical in Smoobu (16 Nov: 49 of 74; 1 Dec went to booked). 18-21 Dec still differs (239-243 vs 226-230). Conflict with `twin_listings`, for Corentin to confirm | smoobu_rates17 |

Setting for the hidden tiers: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list, and keep the visible discounts (`airbnb_visible_discounts`).

### 5. t-p20-delivery, min-2 sales, t-channel-gaps

**t-p20-delivery: unchanged, arrival this Friday. Corentin to confirm today.**
- Smoobu has **20 Nov £300 and 21 Nov £299 (min 3), and 22 Nov £254 (min 2) open**, against policy's 20-22 Nov delivery block (`listing_facts.P20.block_20_21_nov`).
- Airbnb sells 20-23 Nov at £652.54 room (07:21:23Z). The 2-night 20-22 Nov is not offered (min 3 holds).
- Setting: Smoobu > Waterford Court > block 20-22 Nov, or Corentin updates policy.

**Min-2 conflicts with standing rules** (for Corentin to confirm, not new proposals):
- **P04** 18-19 Nov is min 2 (Smoobu 167/170, from Reyhan's 15 Nov DSO). It is on sale on Airbnb as 2 nights at £244.80 room (0.726; the extra 0.95 is unidentified). This goes against "never under 3 nights" (`listing_facts.P04.min_stay_rule`). Check-in would be tomorrow.
- **P20** 17 Nov and 22-24 Nov are min 2, against policy min 3 to 30 Nov. 22-24 Nov is on sale at £390.91 room (07:24:28Z).

**t-channel-gaps (P11, Booking-only).** Booking.com display: NOT CHECKED (WAF).
- 8 Dec £310, min 1: sellable.
- 23-25 Dec £286 / £263 / £272, min 2. Target 23 Dec at least £320; not met.
- 3 Jan £171, min 3. Target at least £204; not met.

**t-pl-sync-1611:** P20 27 Dec-2 Jan is now registered in PriceLabs (Booked, ADR 257.68 = £1,803.78 / 7). Closed.

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+10%, confirmed) | £110.00 | £93.50 (15%) |
| **Booking.com P13 observed 22-27 Dec (stack 0.6926, 15%)** | **£76.29** | **£64.85; £52.14 ex-VAT** |
| Airbnb model / live from 60 d | £100.00 | £84.50 |
| Airbnb live 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.765 (up to 28 d) | £76.50 | £64.64 |
| Airbnb P04 13 n Christmas card (0.738) | £73.80 | £62.36 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty, and the model ordering holds.
- The observed prices break both rules:
  - The new P13 Booking.com stay nets £64.85 per £100, below Airbnb at 29-59 d (£76.05).
  - Every Airbnb card inside 60 d is at or below the £90 direct model.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 17 Nov), VAT-corrected.** Booking.com ADR x 1.2. 2 nights with a blank ref are dropped. Script `live17scripts/vat.py`; the unadjusted run reproduces the pack exactly.

| Flat | Pack gap | Corrected | Notes |
|---|---|---|---|
| P04 | -20.7% (11 n) | **-8.7%** | Booking.com +0.1% (8 n; VAT effect 16.7 pts, above the 8-14 brief range); Airbnb -31.2% (3 n) |
| P11 | -40.0% (10 n) | **-28.0%** | all Booking.com |
| P12 | -37.2% (14 n) | **-24.6%** | all Booking.com |
| P13 | -42.4% (16 n) | **-36.5%** | Booking.com -42.7% (10 n); Airbnb -26.5% (6 n) |

Airbnb-only flats need no correction: P01 -35.9%, P05 -4.2%, P06 -41.0%, P09 -26.0%, P10 -21.5%, P20 -41.5%.

### 7. Fees and min stay

- **Cleaning:**
  - P13 Booking.com £150 on the new stay (on record).
  - P04 synced Airbnb £142, P05 £195, P20/P13 £150, P06 £129. All cards reconcile to Smoobu plus these.
  - The P04 Booking.com fee is not on record (161276416 shows £129): NOT CHECKED.
- **Min stay as displayed matches Smoobu:**
  - P20 20-22 Nov is not offered as 2 nights. P20 22-24 Nov and P04 18-20 Nov are sold as 2 nights (conflicts above).
  - The P04 Christmas block is offered at 3/4/5 n as Smoobu sets it.
- On 1455, cleaning and min stay are NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers, day 19 (a-airbnb-rules), £3,966.66 running.** No new booking overnight. The largest open-card gaps vs policy are P05 5-10 Jan £413.25, P04 Christmas 13 n £306.11 and P20 14-19 Dec £250.50 (the cards overlap, so they are not summed).
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the unlisted last-minute and lead-time rules.
2. **Critical: P04 Christmas-NYE reopened (£2,417.34 lost, 13 nights).**
   - Smoobu is open and synced Airbnb sells it at £2,016.94 room. Booking.com display NOT CHECKED.
   - Unsynced 1455 is not offering these dates now, so there is no double-booking exposure for Christmas today.
   - Settings: keep 1455's Christmas block closed until it is mapped. Corentin to decide P04 Christmas pricing and weekly 18% (Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15%, Long stay 0% or as policy).
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 18.** It still sells the booked 20-24 Nov (£741.40) and 18-21 Nov (£571.00).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all, or unlist. Then map it to Smoobu 3562176.
4. **High: P13 Booking.com 22-27 Dec at 0.6926 of list (-£373.25 vs list).** It nets below Airbnb for the same flat.
   - The NR x occupancy x Mobile x Genius stack is the likely cause (policy-explained; size only). Commission 15.0% is correct.
   - Setting: Booking.com extranet > Shepherd's Bush > Promotions / Rate plans. Corentin to review whether NR occupancy -5% and Genius should stack with Mobile on peak dates.
5. **High: t-p20-delivery, Corentin to confirm before Friday.** 20-22 Nov is open and on sale (£652.54 room for 20-23 Nov).
   - Setting: Smoobu > Waterford Court > block 20-22 Nov, or update policy.
6. **High: min-2 conflicts.** P04 18-19 Nov (£244.80 room, check-in tomorrow) and P20 22-24 Nov (£390.91) go against the standing min-3 rules.
   - For Corentin to confirm: PriceLabs > DSO min stay 3, or keep.
7. **Medium: P04 synced weekly 18% (£73.79 over policy on the Christmas card) and a new Long stay 10% on 5 n (£104.31).**
   - Setting: Airbnb listing 1657859794156786222 > Pricing > Discounts.
8. **Medium: P05 Long stay 10% (5+ n)** confirmed on 5-10 Jan (-£195.75). Corentin to keep or zero.
9. **Medium: P13 twins identical on 48 nights** (conflict with `twin_listings`), and t-channel-gaps P11 (23 Dec £286 < £320; 3 Jan £171 < £204).

Closed or changed today:
- P20 NYE is registered in PriceLabs.
- P13 commission % is explained (15.0% on room + cleaning, outside the booster).
- No PriceLabs edits since 16 Nov (`get_user_logs` empty).

Data gaps:
1. P04 cancellation 160754186: who cancelled and why, guest count, and the Booking.com reason. NOT CHECKED (Smoobu has no fields for it).
2. Why 1455 is closed over Christmas (manual block, or its own booking): NOT CHECKED (not in Smoobu, host app not accessible). The evidence is absence from 4 exhaustive map searches only.
3. The P13 162947708 rate plan (NR vs Standard) and its promotion breakdown: NOT CHECKED. The stack is a fit, not seen.
4. Booking.com live prices for P04 20 Dec-2 Jan, P13, P11 gaps, and same-date ordering: NOT CHECKED (AWS WAF, not circumvented).
5. Airbnb reservation breakdowns for P20 162920897, P05 162914560 and P06 162877292 (the extra 15%): NOT CHECKED.
6. The source of the 0.95 on the P04 18-20 Nov card: NOT CHECKED.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.
8. Market and comp prices for P04 Christmas: not in this section (see the market and comp sections).
