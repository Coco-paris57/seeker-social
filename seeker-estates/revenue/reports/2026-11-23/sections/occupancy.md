## Occupancy & performance

**Portfolio, last 30 nights (24 Oct–22 Nov 2026), the 14 units with Smoobu history:** 231 n, £39,846.26, occupancy 55.0%, ADR £172.49, RevPAR £94.87 (`reports/2026-11-23/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (23 Oct–21 Nov) it was 237 n / £40,697.80.
  - 23 Oct leaves: −12 booked (P01, P02, P04, P05, P06, P08, P09, P10, P11, P12, P13, P20; £2,179.77).
  - 22 Nov enters: +6 booked (P01, P04, P05, P09, P12, P13; £1,328.26). P14 and P20 were open on 22 Nov and lapsed unsold; P06 and P11 were blocked.
  - 237 − 12 + 6 = 231. £40,697.80 − £2,179.77 + £1,328.26 = £39,846.29 (3p rounding against the pack). Per-night figures are pro rata, from `data/snapshots/2026-11-23/reservations.csv`.

**Last 365 nights (23 Nov 2025–22 Nov 2026):** 2,249 n, £415,057.89, occupancy 47.4%, ADR £184.55, RevPAR £87.47 (kpi_pack `portfolio_last365`). Yesterday it was 2,245 n / £414,026.75.
- 22 Nov 2025 leaves −1 (P12, £174.72). 22 Nov 2026 enters +5 (£1,205.86; P04's £122.40 is excluded because P04 last365 is null). 2,245 − 1 + 5 = 2,249; £414,026.75 − £174.72 + £1,205.86 = £415,057.89.
- Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (23 Nov–22 Dec): 130 of 225 non-blocked nights = 57.8%, £30,399.33 room revenue on the books.** Yesterday it was 122/223 = 54.7%, £28,664.34.
**Booked next 60 (23 Nov–21 Jan): 178/388 = 45.9%, £45,645.09.** Yesterday it was 174/403 = 43.2%, £45,203.15.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 23 Nov 07:19:49Z. Scratch copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ23/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ23/smoobu_rates.json`. Scripts are in the same folder (`an.py`, `recon.py`, `gaps.py`, `pick_rise.py`).
  - **Pagination, same fault as yesterday:** the full pull returned 859 rows / 858 ids (the P09 1–6 Jun record twice) and dropped P12 1–5 Jun 2026. A narrow pull (20 May–15 Jun) recovered it.
  - The 723 non-block reservations on mapped units match `data/snapshots/2026-11-23/reservations.csv` row for row (ref, dates, status, amount). The 724th non-block record is the Scott Ellis Gardens stay (unmapped, below).
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar. Scott Ellis Gardens is not counted.
- **Excluded:**
  - P02, P03 and P07: blocked on purpose (policy).
  - Handbacks: P08 and P10 fully out, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocks: P01 30 Nov–20 Dec; P06 from 6 Dec; **P11 from 5 Jan 2027 (new, see below)**.
- **Reconciling next 30 (122/223 → 130/225):**
  - 22 Nov leaves: −6 booked (P01, P04, P05, P09, P12, P13; £1,328.26), −8 inventory (P14 and P20 were also open).
  - **P11 22–26 Nov block removed: +4 inventory** (23–26 Nov), 0 booked.
  - **New bookings: +10 booked, 0 inventory** (the nights were already open): P06 29 Nov–2 Dec +3 (£513.04), P06 3–6 Dec +3 (£768.82), P04 10–14 Dec +4 (£488.35).
  - 22 Dec enters: +4 booked (P05, P11, P13, P20; £1,293.05), +6 inventory (P04 and P14 also open).
  - 122 − 6 + 10 + 4 = **130**; 223 − 8 + 4 + 6 = **225**. £28,664.34 − £1,328.26 + £1,770.21 + £1,293.05 = **£30,399.34** (1p rounding).
- **Reconciling next 60 (174/403 → 178/388):**
  - 22 Nov leaves: −6 booked / −8 inventory / −£1,328.26.
  - P11 22–26 Nov block removed: +4 inventory.
  - **P11 new block from 5 Jan: −16 inventory** (5–20 Jan were open yesterday).
  - New bookings: +10 / +£1,770.21.
  - 21 Jan enters: 0 booked / +5 open (P04, P05, P13, P14, P20; P11 is now blocked).
  - 174 − 6 + 10 = **178**; 403 − 8 + 4 − 16 + 5 = **388**; £45,203.15 − £1,328.26 + £1,770.21 = **£45,645.10** (1p rounding).
- PriceLabs `forward_occ_30` in kpi_pack (P04 48.3%, P06 37.9%, P11 51.7%, P12 75.0%, P13 62.1%, P20 75.9%) uses a different window and denominator. Smoobu is the truth.

### What changed overnight (22 Nov 07:20Z → 23 Nov 07:20Z)
- **Non-block reservations 720 → 723 on mapped units (+3), plus 1 on Scott Ellis Gardens.** No cancellations.
- **NEW: P06 Marylebone Airbnb 29 Nov–2 Dec (3 n).** Made 22 Nov 19:24 (lead 7 d).
  - Room £513.04 = **£171.01/n**; cleaning £129; commission element £99.52; Smoobu total £642.04.
  - Smoobu `/api/rates` 22 Nov 07:20Z for those nights: £286 / £271 / £304 = £861 (min 3). **Paid 0.596× Smoobu.**
  - This is a 3-night stay, so the policy 15%/20% stay discounts do not apply. Policy `channel_pricing.airbnb_discount` says Airbnb paid should be close to the PriceLabs price for bookings made after 21 Oct, so **the 40% gap is unexplained.** The Smoobu price live at 19:24 is NOT CHECKED. No PriceLabs log entry on P06 on 22 Nov before the booking (`get_user_logs`, see below). Layer breakdown: channel agent.
- **NEW: P06 Marylebone Airbnb 3–6 Dec (3 n).** Made 22 Nov 23:13 (lead 11 d).
  - Room £768.82 = **£256.27/n**; cleaning £129; commission element £139.16; Smoobu total £897.82.
  - Smoobu 22 Nov 07:20Z: £323 / £358 / £359 = £1,040 (min 3). **Paid 0.739× Smoobu.** Unexplained on the same basis.
- **NEW: P04 Barking Booking.com 10–14 Dec (4 n).** Made 22 Nov 22:54 (lead 18 d). **The first Booking.com booking made since the +15% markup (18 Nov).**
  - Room £488.35 = **£122.09/n**; commission £92.60 (15.0% of the £617.35 total incl. £129 cleaning); Smoobu total £617.35. Smoobu also carries a £81.39 channelCustom element, purpose NOT CHECKED.
  - Smoobu 22 Nov 07:20Z: £141 / £148 / £150 / £141 = £580 (min 3). **Paid 0.842× Smoobu; 0.732× the Smoobu price with +15%** (£667.00).
  - Which rate plan was sold (Standard, NR −10%, other) is NOT CHECKED. Policy `booking_stacked_promotions` says a paid rate below 1.2× is explained by stacked promotions: report the size, do not call it unexplained. Size: 26.8% below Standard+15%. Channel agent to name the plan.
- **P11 Camden "Blocked channel" 22–26 Nov: REMOVED** (the block record is now type cancellation, modified 23 Nov 01:06:49). 23–26 Nov are open again at **£184 / £200 / £197 / £219 = £800, min 2**. 22 Nov stayed blocked and is gone.
  - PriceLabs log: Reyhan added a min-stay-2 date override on P11 for 23–26 Nov at 23 Nov 00:07:04Z, one hour before the block was removed. The two are consistent; that one caused the other is NOT CHECKED.
- **NEW BLOCK: P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18). This looks like a handback block, but P11 is **not** in policy `handbacks`. Treated as not inventory here. **Confirm with Corentin.** It removes 16 open nights from the next 60 (5–20 Jan) and creates a new orphan on 3–4 Jan (below).
- **Smoobu price moves on booked P06 nights** (for the record): 29 Nov–1 Dec now £352 / £339 / £340 and 3–5 Dec £410 / £410 / £421, not available. 2 Dec is now **£349, min 1** (was £316, min 3).
- **Scott Ellis Gardens: first reservation** (below).

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993): first reservation
- **Airbnb, 21–26 Dec 2026 (5 n), made 22 Nov 11:48 (lead 29 d).** Status confirmed. No guest data used.
  - Room £1,481.76 = **£296.35/n**; cleaning £150; commission element £252.92; Smoobu total £1,631.76.
  - Smoobu `/api/rates` 22 Nov 07:20Z (base then 425): £394 / £419 / £410 / £415 / £420 = £2,058. **Paid 0.720× Smoobu**, the same 0.72× level reported yesterday (20% special offer; channel).
  - Against today's Smoobu (base 450): £445 / £442 / £453 / £450 / £457 = £2,247, so paid is 0.659×. The PriceLabs base was 475 when the booking was made (raised from 425 at 22 Nov 09:18Z, then cut to 450 at 23 Nov 00:17Z, both by Reyhan, `get_user_logs`). Whether that 475 had reached Smoobu and Airbnb by 11:48 is NOT CHECKED.
- Other records: 6 in total, the rest "Blocked channel" at £0 (20–29 Nov, 3–4 Dec, 8–9 Dec, 15–16 Dec, 5–6 Jan). Unchanged since yesterday.
- Still not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any figure here.

### 7-day pickup, net of cancellations
- **Window:** bookings made 17–23 Nov to 07:20Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `occ23/pick_rise.py`.
- **Gross made:** 9 bookings / 30 n / £5,035.83. **Still confirmed:** 7 / 26 n / £4,354.38.
- **Cancelled in the window:** 4 / 12 n / £2,506.72: P05 13–17 Feb £1,219.98 (21 Nov); P11 28 Nov–2 Dec £605.29 (20 Nov); P20 5 Dec £343.33 (20 Nov); P04 17–20 Dec £338.12 (21 Nov).
- **Net: +18 n / +£2,529.11.** Yesterday it was 0 n / −£817.69.
- **Reconciliation:**
  - 16 Nov leaves the made side: P13 22–27 Dec, −5 n / −£840.75.
  - 16 Nov leaves the cancelled side: P04 20 Dec–2 Jan, +13 n / +£2,417.34.
  - Overnight: the three new bookings, +10 n / +£1,770.21. No cancellations.
  - 0 − 5 + 13 + 10 = **+18**. −£817.69 − £840.75 + £2,417.34 + £1,770.21 = **+£2,529.11**.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 4 / 17 / £2,157.36 (18–20 Nov £254.15; **10–14 Dec £488.35 Booking.com**; 17–20 Dec £338.12, cancelled; 27 Dec–4 Jan £1,076.74) | 3 / £338.12 | **+14 / +£1,819.24** |
| P05 | 0 | 4 / £1,219.98 | **−4 / −£1,219.98** |
| P06 | 2 / 6 / £1,281.86 (**29 Nov–2 Dec £513.04; 3–6 Dec £768.82**, both Airbnb) | — | **+6 / +£1,281.86** |
| P11 | 1 / 3 / £538.73 (27–30 Nov) | 4 / £605.29 | −1 / −£66.56 |
| P20 | 2 / 4 / £1,057.88 (19–22 Nov £714.55; 5 Dec £343.33, cancelled) | 1 / £343.33 | +3 / +£714.55 |
| P01, P02, P07, P08, P09, P10, P12, P13, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross, confirmed only) matches: P04 3 / 14 / £1,819.24, P06 2 / 6 / £1,281.86, P11 1 / 3 / £538.73, P20 1 / 3 / £714.55; all others 0.

### Pace vs STLY
Cancellations are excluded on both sides (same method as `rm.metrics.on_the_books`, on `occ23/rows.json` = `data/snapshots/2026-11-23/reservations.csv`).
- **P12, handback-aware.** Stays 23 Nov–13 Dec 2026 as of 23 Nov 2026, against 23 Nov–13 Dec 2025 as of 23 Nov 2025: **16 n / £3,371.02 vs 18 n / £3,469.36 = −2 n / −£98.34 / −2.8%. Within ±10%, so On track.**
  - Yesterday: −2 n / −£70.59 / −1.9%. 22 Nov 2026 (booked, £202.47) and 22 Nov 2025 (booked, £174.72) both left the window.
  - kpi_pack `pace_30` (23 Nov–22 Dec, not handback-aware): −7 n / −22.7% (£3,371.02 vs 23 n / £4,361.14).
  - kpi_pack `pace_90`: −36 n / −64.4% (vs 52 n / £9,459.62). Nothing after 13 Dec is inventory.
- **P02:** kpi_pack 30-day 0 vs STLY 13 n / £1,389.31; 90-day 0 vs 27 n / £2,859.30. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** No booking made on or before 23 Nov 2025 exists for any unit except P02 and P12.

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 23 Nov 07:20Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +35 n / +£9,191.63 including P06; +20 n / +£6,043.16 like-for-like (unchanged).** Yesterday it was +29 / +£7,909.77 and +20 / +£6,043.16.
- **The whole move is P06: +6 n / +£1,281.86** from the two new Airbnb stays. Nothing else in the group changed.
- Both new stays sit on the reopened P06 nights (29 Nov–5 Dec), so like-for-like excludes them, as it already excluded 18–22 Nov and 24–29 Nov. **Like-for-like now excludes 4 P06 stays, 15 n / £3,148.47.** P06 like-for-like stays +6 / +£1,345.77 (5–8 Nov and 12–15 Nov).
- The two new P06 stays paid 0.596× and 0.739× the Smoobu price. They add volume, but they are not evidence that the higher base sells at the base price.
- Made: 31 / 117 n / £25,652.22. Cancelled: 15 / 82 n / £16,460.59 (unchanged).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | 1 / 4 / £1,219.98 | +12 / +£4,915.21 |
| **P06** | **6 / 21 / £4,494.24** (was 4 / 15 / £3,212.38) | — | **+21 / +£4,494.24** (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 9 / 32 / £5,839.13 | 6 / 38 / £7,472.46 | −6 / −£1,633.33 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- **Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37**, unchanged.
- P13: +27 n / +£4,704.65, unchanged.
- **P04: +51 n / +£6,422.02** using `total_gbp` (was +47 / +£5,933.67; the new Booking.com stay adds +4 / +£488.35). Made is now 19 / 82 n, cancelled 7 / 31 n. Counting import-batch records without a basePrice as £0 gives +£3,934.62 (was +£3,446.27).
- **Caveats as before:**
  - The Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopening cannot be separated out.
  - The sample is 1–9 bookings per unit.
  - A cancellation is not evidence about price.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 24 Oct–22 Nov.
- Fwd occ30: Smoobu 23 Nov 07:20Z, 23 Nov–22 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 17–23 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £154.51 | £154.51 | 100% 7/7 non-blocked (35%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 13.3% | £104.31 | £13.91 | all blocked (51%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 73.3%† | £120.55† | £88.40† | **50.0%** 15/30 (23%) | UNKNOWN: no STLY | **+14 / +£1,819.24** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £398.57 | £305.57 | 70.0% 21/30 (50%) | UNKNOWN: no STLY | −4 / −£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £198.62 | £145.65 | **84.6%** 11/13 non-blocked (52%) | UNKNOWN: no STLY | **+6 / +£1,281.86** | Unclassifiable (60–85%, no STLY; intentional-block listing). **Was Soft.** One more night (23 Nov or 2 Dec) would make it 92.3% |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 56.7% | £134.81 | £76.39 | handed back after 13 Nov (56%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £105.12 | £52.56 | 100% 4/4 to 26 Nov (41%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 86.7% | £105.96 | £91.84 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| P11 | Camden | 66.7% | £183.44 | £122.30 | **50.0%** 15/30 (51%) | UNKNOWN: no STLY | −1 / −£66.56 | **Soft** (fwd30 < 60%; 23–26 Nov reopened) |
| **P12** | Mile End | 66.7% | £155.06 | £103.37 | 76.2% 16/21 to handback (44%) | **−2 n / −£98.34 / −2.8%** handback-aware (pack −22.7%) | 0 | **On track** |
| P13 | Shepherd's Bush (one flat) | 60.0% | £141.34 | £84.81 | 63.3% 19/30 (47%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (47%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 46.7% | £190.53 | £88.91 | 73.3% 22/30 (38%) | UNKNOWN: no STLY | +3 / +£714.55 | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.

**Classes:** Compressed 2 (P01, P09); On track 1 (P12); Soft 3 (P04, P11, P14); Unclassifiable 9 (P05, P06, P13, P20, P15–P19); Not classified 5 (P02, P03, P07 policy blocks; P08, P10 handed back).
- **One class change: P06 Soft → Unclassifiable** (38.5% → 84.6%, two new bookings).
- P04 40.0% → 50.0% (new Booking.com stay +4; 22 Nov booked left; 22 Dec open entered). Still Soft.
- P11 56.0% → 50.0%: the block came off (+4 open nights), booked +1 only (22 Dec entered). Still Soft.
- P12 77.3% → 76.2%; P20 70.0% → 73.3%; P01 8/8 → 7/7; P09 5/5 → 4/4.

**Next 60 (23 Nov–21 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 7/7 | 100% | £1,064.91 |
| P04 | 23/60 | 38.3% | £3,090.44 |
| P05 | 32/60 | 53.3% | £18,065.21 |
| P06 | 11/13 | 84.6% | £2,291.68 |
| P09 | 4/4 | 100% | £410.83 |
| P11 | 23/43 | 53.5% | £5,399.46 (denominator cut by the new block from 5 Jan) |
| P12 | 16/21 | 76.2% | £3,371.02 |
| P13 | 30/60 | 50.0% | £5,482.87 |
| P14 | 0/60 | 0% | £0 |
| P20 | 32/60 | 53.3% | £6,468.68 |

**Last 365 nights** (kpi_pack `last365`, 23 Nov 2025–22 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 44.7% | £174.38 | £77.88 | £28,424.62 |
| P02 | 78.9% | £128.98 | £101.77 | £37,147.48 |
| P05 | 61.6% | £375.67 | £231.58 | £84,526.18 |
| P06 | 38.6% | £234.66 | £90.65 | £33,086.79 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 43.0% | £114.46 | £49.23 | £17,970.41 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.8% | £174.78 | £141.26 | £51,561.57 |
| P12 | 80.5% | £193.34 | £155.73 | £56,841.46 |
| P13 | 81.4% | £157.64 | £128.27 | £46,817.77 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.7% | £174.30 | £13.37 | £4,880.33 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`). Changes since yesterday:
- P04: 7 → 8 bookings, median lead 6 → 8 d; Booking.com share 24.1% → 33.5%.
- P06: 34 → 36 bookings, median lead 14 → 13 d; Airbnb share 74.4% → 75.3%.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 70 | 36 d | 4 n | Airbnb 54.2% / Booking.com 42.6% / Direct 3.2% |
| P04 | 8 | 8 d | 4 n | Airbnb 66.5% / Booking.com 33.5% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 36 | 13 d | 4 n | Airbnb 75.3% / Booking.com 24.7% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6% / Airbnb 43.5% / Agoda 1.9% |
| P12 | 79 | 31 d | 4 n | Booking.com 89.6% / Airbnb 10.4% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 10 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 23 Nov 07:20Z (`occ23/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P04 | 24 Nov (next 30) | £136 / 3 (yesterday £142) | The 23–24 Nov stay checks out and the 25 Nov stay arrives. | **Day 9.** Policy: never fewer than 3 nights. Lapses tomorrow. |
| **P11** | **3–4 Jan (next 60), NEW** | £144 / £155, min 3 | 2 nights between the stay ending 3 Jan and the **new block from 5 Jan**. | Created by the new block. A 2-night stay cannot meet min 3. |

**Checked and NOT orphans:**
- **P06 2 Dec** (between the two new stays): single night, now **£349, min 1** (yesterday £316, min 3). Bookable as a 1-night stay. Explained by Reyhan's PriceLabs override at 23 Nov 00:11Z: 2 Dec **+25%, min 1** (`get_user_logs`). P06 is a policy intentional-block listing.
- **P06 23 Nov (tonight):** single night, **£308, min 1** (yesterday £269). Bookable; lapses tonight if unsold.
- **P04 around 10–14 Dec:** the new stay splits the old run. **6–9 Dec** is a 4-night run at min 3 (£170 / £170 / £171 / £150 = £661), sellable. **14–26 Dec** is a 13-night run before the 27 Dec arrival (min 7). Neither is an orphan.
- **P04 23–26 Dec:** tail of the 14–26 Dec run. Min stay unchanged at **3 / 2 / 2 / 2**; prices now £163 / £187 / £190 / £187 (yesterday £170 / £190 / £191 / £190). 26 Dec alone cannot be an arrival (1 night before 27 Dec at min 2), but the run is sellable.
- **P20 23–24 Nov:** 2-night run at min 2, **£243 / £228 = £471** (yesterday 23–24 Nov £279 / £271). Sells only as 23–25 Nov. **22 Nov lapsed unsold.**
- **P11 23–26 Nov:** reopened, 4-night run at min 2 (£800). Sellable.
- **P11 30 Nov–4 Dec:** 5-night run at min 2, **£187 / £185 / £192 / £224 / £249 = £1,037** (yesterday £1,044), between the 27–30 Nov stay and the 5 Dec arrival. Sellable.
- **P11 23–25 Dec:** 3-night run at min 2 (**£290 / £280 / £291**; yesterday £266 / £242 / £251). Sellable.
- **P12 30 Nov–3 Dec:** 4-night run at min 2 (£254 / £270 / £276 / £290). Sellable.

**Runs that sell only as one exact stay:** P05 7–8 Dec (£428 / £407) and 13–14 Dec (£485 / £479), min 2; P20 23–24 Nov.

**Single nights at min 1 (bookable):** P04 2 Dec £425; P05 21 Dec £2,215 and 29 Dec £2,392; P06 23 Nov £308 and 2 Dec £349; P11 8 Dec £233 (yesterday £305); P12 26 Nov £307 (yesterday £325); P13 27 Nov (£262 / £183) and 1 Dec (£232 / £163); P20 5 Dec £591 and 26 Dec £508.

**Lapsed unsold, 22 Nov:** P14 and P20.

### Gaps to fill (open nights next 30, 23 Nov–22 Dec, Smoobu 23 Nov 07:20Z): 95 nights
- **P04 (15):** 24 Nov (orphan, £136); 2 Dec (£425, min 1); 6–9 Dec (£661, min 3); 14–22 Dec (9 n, min 3). The run continues 23–26 Dec.
- **P05 (9):** 29 Nov–2 Dec (£508 / £493 / £486 / £493, min 3); 7–8 Dec; 13–14 Dec; 21 Dec (£2,215, min 1).
- **P06 (2):** 23 Nov (£308, min 1); 2 Dec (£349, min 1).
- **P11 (15):** 23–26 Nov (£800, min 2); 30 Nov–4 Dec (£1,037, min 2); 8 Dec (£233, min 1); 14–18 Dec (£206 / £215 / £225 / £248 / £314, min 2). The darts nights 14–17 Dec average **£223.50** (yesterday £229.50).
- **P12 (5):** 26 Nov (£307, min 1); 30 Nov–3 Dec (£1,090, min 2).
- **P13 (11):** 27 Nov and 1 Dec (min 1); 13–21 Dec.
- **P14 (30):** every night (special setup, numbers only).
- **P20 (8):** 23–24 Nov (£471, min 2); 5 Dec (£591, min 1); 14–18 Dec.
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **NEW: P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18). Looks like a handback, but P11 is not in policy `handbacks`. It removes 16 open nights from the next 60 and creates the 3–4 Jan orphan. **Confirm it is a handback (and the last night, 4 Jan).**
2. **P11 22–26 Nov block: removed 23 Nov 01:06.** 23–26 Nov are on sale again (£800, min 2), after Reyhan's min-2 override at 00:07Z. t-p11-block-2211 can close on the block itself; who removed it in Smoobu is NOT CHECKED.
3. **NEW Reyhan PriceLabs edits, 23 Nov 00:07–00:17Z** (`get_user_logs`; for the PriceLabs agent to classify):
   - P04 6–23 Dec **−2%**, min 3 (against "cut PriceLabs discounts").
   - P06 2 Dec **+25%, min 1**.
   - P13 (3064856, copied to 3090701 and Vrbo) 14–16 Dec −2% min 2; 20–21 Dec min 2; **2–31 Jan −8%** min 3.
   - P11 23–26 Nov min 2.
   - Scott Ellis Gardens base 425 → **475** (22 Nov 09:18Z) → **450** (23 Nov 00:17Z).
4. **P04 min stay 2 on 24–26 Dec** (policy `listing_facts.P04.min_stay_rule`: never fewer than 3 nights). Carried, day 3.
5. **P20 min stay 2 on 23–24 Nov** (policy: 3 nights 25 Oct–30 Nov). Carried.
6. **Scott Ellis Gardens (3588993):** first reservation (Airbnb 21–26 Dec, £1,481.76, 0.72× Smoobu). Still not in our property list (t-scott-ellis-2011).
7. **Carried:** P13 1 Dec +25% (policy +50%); P11 darts −2%; P01 18–20 Dec block versus the policy gap block ending 17 Dec.

Data gaps:
- **P06 29 Nov–2 Dec (0.596×) and 3–6 Dec (0.739×):** the Airbnb price live at booking and the layer that cut it (Smoobu Airbnb pricing rules on P06, special offer, other): NOT CHECKED (channel agent).
- **P04 10–14 Dec Booking.com:** rate plan sold, promotions applied and the £81.39 channelCustom element: NOT CHECKED (channel agent). The +15% markup is therefore still not evidenced from this booking alone.
- **Scott Ellis Gardens:** Smoobu/Airbnb price live at 11:48 on 22 Nov (PriceLabs base was 475 then): NOT CHECKED. Status (new property, test, owner use) UNKNOWN.
- **P11 blocks:** who removed the 22–26 Nov block, and the purpose of the 5 Jan 2027–31 Jul 2029 block: UNKNOWN.
- **Booking.com count since 24 Oct:** my raw count is 29 gross / 17 confirmed / 12 cancelled. It includes three identical P04 20–23 Nov cancellations made 26 Oct (£355.82 each); counted once, that gives 27 / 17 / 10, as in the brief. De-duplication rule: channel agent.
- **P04 double-booking risk** (unsynced Barking Airbnb selling 10–14 Dec): NOT CHECKED here (channel agent).
- **Smoobu pagination:** the full pull again duplicated P09 1–6 Jun and dropped P12 1–5 Jun 2026. A narrow pull recovered it; totals match the snapshot CSV (723).
- **STLY:** none before 23 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): affects P04 last30, pace and the base-rise comparison group. P04 last365 and pace are null.
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 23 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P08 and P10 forward occupancy is null (handback); P15–P19 are not mapped.
- **Revenue scope:** room only (cleaning excluded).
- PriceLabs connector: one read-only call by this agent (`get_user_logs`, listing, 22–23 Nov; 15 entries, all Reyhan). Smoobu is the source for all forward figures.
