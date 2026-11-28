# Market & demand calendar: run D = 2026-11-28 (window 29 Nov 2026 – 25 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Not raised: P02/P03/P06/P07 intentional blocks (P06 numbers only, its reopened nights are reported as revenue); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Visibility Booster; +15% Booking.com markup and derived rate plans; P13 1 Dec (intentional_overrides); P04 never under 3 nights; P12 last night 13 Dec; P01 handback 20 Dec / gap block 30 Nov – 17 Dec; P09 gone; P11 darts override (24 Oct); P04 2 Dec (deprioritised).
- **PriceLabs calls today (read-only, strictly one per message, no parallel calls):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:19–07:21Z, in order: 3588993, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P06 3288517, P12 2699998, P01 3320302. Each checked (listing_id match, 540 stay dates, `all_operations_ok=true`, source NL) and saved to `scratchpad/m28/neigh_<id>.json`.
  - `get_user_logs` (listing, 27–28 Nov): **9 entries, all Reyhan, 27 Nov 14:56:39–15:02:33Z** (below).
  - `get_listing_date_overrides`: P04 3562176, P05 3166592, P12 2699998 (28 Nov – 14 Dec), P11 3064196 (28 Nov – 10 Jan).
- **`market.csv`:** `data/snapshots/2026-11-28/market.csv` did not exist. Under `.market.csv.lock` I copied it forward from 27 Nov (88 lines; md5 of the first 88 lines = the 27 Nov file, `e646500c…`) and appended 9 rows sourced "pulled 2026-11-28 07:19-07:21Z" (now 97 lines; `scratchpad/m28/wmarket28.py`).
- **Prices:** `prices.csv` 28 Nov, column `pricelabs_price`, **29 Nov – 27 Jan** (tonight, 28 Nov, is not in the file). "yday" = 27 Nov `prices.csv`. Feb = neighbourhood `final_price`.
- **Refresh cause, answered:** the 27 Nov ~15:00Z batch **was edit-triggered**. Raw `last_refreshed_at`: P05 15:00:54Z, P06 15:02:19Z, P04 15:02:50Z, each just after Reyhan's override on that listing. P12, P11 and the P13 twins were re-refreshed 07:07Z today; P11 and P13 have **no** log entry on 27–28 Nov, so why they were in the 15:00Z batch is NOT CONFIRMED.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. Daily P25–P90 mix bedrooms. "est. matched" = mixed P50 × (summary bedroom P50 ÷ mean mixed daily P50, next 30 days): P04 1.09, P13 0.91, P11 1.10, P05 1.21, P20 1.13, P12 0.93, P06 0.99, 3588993 1.01. **These are estimates.**
- **Fortnight method unchanged:** `scratchpad/m28/analyse28.py` = `m27/analyse27.py` with only the cut-off moved to 29 Nov (first date in `prices.csv`). Outputs `m28/out28.txt`, `cmp28.txt`, `win28.txt`, `items28.txt`.

## 1. Submarket table
P25 / P50 / P75 / P90 (n): `market.csv` 28 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched). Mkt occ 30/60: `market.csv` `market_occ_30/60` (= `pl_kpis.csv` 28 Nov `market_occupancy_next_30/60`). Our occ: `pl_kpis.csv` `occupancy_next_30/60` (27 Nov in brackets).

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 27 Nov | Our occ 30/60 |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 49 / 36% | 232 / **292 / 329** / 388 (171) | 292 | 53 / 73% (53 / 73) |
| Shepherd's Bush | P13 | 2 | 46 / 33% | 183 / **215 / 268** / 352 (114) | 217 | 63 / 43% (63 / 43) |
| St John's Wood (4 BR) | P05 | 4 | 50 / 38% | 452 / **580 / 702** / 1,217 (91) | 583 | 70 / 47% (70 / 47) |
| St John's Wood NW8 (3 BR) | 3588993 Scott Ellis Gardens (unmapped) | 3 | 44 / 32% | 312 / **378 / 473** / 645 (149) | 384 | 60 / 42%* (63 / 43) |
| Barking | P04 | 2 | 24 / 17% | 140 / **174 / 210** / 247 (90) | 174 | 37 / 32% (37 / 32) |
| Canary Wharf | P20 | 2 | 38 / 28% | 214 / **253 / 317** / 425 (147) | 253 | 80 / 50% (80 / 52) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 37 / 27% | 217 / **261 / 333** / 439 (143) | 261 | 100 / 100%* |
| **Mile End (last night 13 Dec)** | P12 | 2 | 42 / 31% | 171 / **206 / 234** / 290 (116) | 203 | **63 / 82%** (87 / 93) |
| Marylebone (intentional block; numbers only) | P06 | 2 | 50 / 37% | 320 / **414 / 529** / 664 (217) | 412 | 73 / 87% |
| Primrose Hill (numbers only) | P14 | 1 | 46 / 32% (`pl_kpis` only) | no row | – | 0 / 0% |
| Greenwich (gone) / Islington, Hanger Lane (handed back) / Woolwich, Ladbroke Grove, Bayswater (intentional blocks) | P09 / P08, P10 / P07, P02, P03 | – | `pl_kpis` only: 41/29 · 53/39, 32/24 · 27/20, 50/36, 53/41% | no row | – | 100%* |

\* Inflated by handback or blocks. No `market.csv`/`pl_kpis` row for Bow/Devons Rd (P15), Little Venice (P16), P17, Fulham (P18), Kings Langley (P19): not in the PriceLabs pulls.
- **Market flat again:** P50 moved −£6 (3588993) to +£3 (P12); market occ 30 unchanged on every row.
- **Our side:** P12 occ 30 **87 → 63%** (the 7–14 Dec cancellation). P20 occ 60 52 → 50%.

## 2. Items in the brief

### PriceLabs edits 27 Nov 14:56–15:02Z (`get_user_logs`; overrides re-pulled today)
| Listing | Override set 27 Nov | Before | Effect seen today |
|---|---|---|---|
| P12 2699998 (+ Vrbo copy) | **−2%, min 2, 30 Nov – 6 Dec and 7 – 10 Dec** | (not in yesterday's lists) | 11–13 Dec stay min 3 with no price (10 Nov); 14 Dec −5% min 3 (handback night) |
| P05 3166592 | **−10% min 3, 29 Nov – 2 Dec** | −8% | 29 Nov – 2 Dec £1,834 (yday £1,864) |
| P05 | **−10% min 3, 4 – 31 Jan** (new) | – | – |
| P05 | **−8% min 4, Feb** | −5% min 4 | Valentine's 13–16 Feb £1,619 (yday £1,665) |
| P06 3288517 | **−2% min 3, 3 – 13 Dec** | – | 6–12 Dec −£6 to −£9 per night |
| **P04 3562176** | **−5% min 3, 6 – 26 Dec** | min 3 only, no price (since 25 Nov) | **every open night 6–26 Dec −£7 to −£9** |

- These are new PriceLabs discounts, and they go against Corentin's direction to cut PriceLabs discounts. **They go to Corentin as "confirm or revert"**, not as new proposals. The P04 −5% puts back the −5% that came off on 25 Nov (a-reyhan-2011).
- No entry after 15:02:33Z on 27 Nov, and none on 28 Nov up to ~07:22Z. P11 is unchanged: 23–25 Dec min 2 with no price; 14–18 Dec min 2; 8 Dec +50% min 1; 9–13 Dec −5% min 3; 3–10 Jan −8% min 3. P13 1 Dec is a policy item and was not re-pulled. P20 overrides were not re-pulled (no log entry).

### P12 Mile End: 7–13 Dec reopened after the Booking.com cancellation (last week before handback)
Cancelled stay: Booking.com 7–14 Dec, 7 n, £1,432.42 room = **£204.63/n**, made 14 Nov (`reservations.csv` 28 Nov, status cancelled). Refresh 07:07Z.

| Nights | Ours today (yday) | min | Mixed P25 / **P50** / P75 £ | est. matched (×0.93) | 2 BR summary P50 / P75 × n | Occ / Δ |
|---|---|---|---|---|---|---|
| 30 Nov – 3 Dec (4) | 252 / 261 / 275 / 275 = **£1,063** (£1,118) | 2 | 678 / **841** / 1,033 | ≈ 782 | 824 / 936 | 43–50%; **−11.9 / −12.2 / −16.0 / −15.5** |
| 7–10 Dec (4) | 262 / 266 / 264 / 265 = **£1,057** (£1,132) | 2 | 680 / **857** / 1,056 | ≈ 797 | 824 / 936 | 37–43%; −6.9 / −1.3 / +6.4 / −2.4 |
| 11–13 Dec (3) | 279 / 284 / 265 = **£828** (£892) | 3 | 539 / **669** / 832 | ≈ 622 | 618 / 702 | 33–43%; +5.0 / −0.5 / −1.8 |
| **7–13 Dec (7)** | **£1,885 (£269/n)** (£2,024) | | 1,219 / **1,526** / 1,888 | ≈ 1,419 | 1,442 / 1,638 | **39.1% avg; Δ avg −0.2** |
| **All 11 open nights** | **£2,948** | | 1,897 / **2,367** / 2,921 | ≈ 2,201 | 2,266 / 2,574 | 41.7%; Δ avg −5.2 |

- **What Mile End supports:** the 2 BR median is **£206/n** and the P75 **£234/n** (`market.csv` 28 Nov). The mixed daily P50 for 7–13 Dec averages **£218/n**, and est. matched is ≈ **£203/n**. The market is 33–43% booked with no compression (Δ −6.9 to +6.4, mean −0.2). The lost stay paid £204.63/n, which is about the 2 BR median.
- **Our ask is £269/n**: 1.31× the 2 BR median and 1.15× the 2 BR P75. It sits at the mixed P75 for the week (−£3) and ≈ £466 over est. matched. PriceLabs cut the week £139 overnight after the cancellation (raw re-priced 07:07Z, matching Smoobu 262–284).
- **30 Nov – 3 Dec is still above the mixed P75 (+£30)** in the softest stretch (Δ −12 to −16). Overnight −£55, mostly the new −2%.
- **Read:** pricing at the median would give **£1,442–1,526 for 7–13 Dec, ≈ £360–440 under today's ask**. The market does not support today's level 9–15 days out without event demand. P12 is a raised-group unit (18 Oct base rise), so its last fortnight is priced off the raised base.
- **Orphan risk before handback:** 11–13 Dec need min 3 and 14 Dec is Blocked, so the only check-in that fills 11–13 is 11 Dec for exactly 3 nights. **A stay ending 12 Dec leaves 12–13 Dec (2 n) unsellable at min 3**, and one ending 13 Dec leaves 13 Dec (1 n) unsellable. 7–10 Dec at min 2 can leave a 1-night gap too. Unchanged since 10 Nov; Corentin to decide (no proposal on the 18 Oct base here).

### P06 Marylebone: 8–12 Dec sold at £237.15/n vs the Marylebone market
Sale: Airbnb 8–12 Dec, 4 n, £948.60 room, cleaning £129, made 27 Nov (`reservations.csv` 28 Nov), on nights reopened 24 Nov.

| Measure (8–11 Dec, 4 n) | £ | £948.60 vs it |
|---|---|---|
| Smoobu on 27 Nov (`prices.csv` 27 Nov `smoobu_price` = `pricelabs_price`): 304 / 317 / 312 / 333 | **1,266** | **0.749×** |
| PriceLabs today (`pricelabs_price`, after −2%): 298 / 310 / 306 / 326 | 1,240 | 0.765× |
| 2 BR summary **P25** / P50 / P75 × 4 (`market.csv` 28 Nov) | **1,280** / 1,656 / 2,116 | **0.74× the 2 BR P25**; 0.57× P50 |
| Mixed 1–3 BR P25 / P50 / P75 (neighbourhood 28 Nov) | 1,241 / 1,582 / 1,988 | 0.76× P25 |
| est. matched P50 (×0.99) | ≈ 1,566 | 0.61× |
| Market occ / Δ | 46–58%; +4.4 / +3.1 / +2.5 / **+9.8** | – |

- **Read: revenue on reopened nights, but sold at the bottom of Marylebone.** £237/n is **£83/n under the 2 BR P25 (£320)** and £177/n under the median (£414), on nights with mild compression (Δ +2.5 to +9.8). PriceLabs' own list (£310/n) was already at the mixed P25. The 0.749× paid-to-Smoobu gap is about the 0.765× seen on recent Airbnb sales (P04 0.765×). The Airbnb layers are for the channel section.
- **PriceLabs has not registered the booking:** today's `prices.csv` shows 8–12 Dec `available=True`, no booking status (raw refreshed 27 Nov 15:02:19Z, not since). Today's `smoobu_price` for 8–11 Dec is 334 / 343 / 334 / 364, higher than PriceLabs. NOT EXPLAINED; pricelabs section.
- **Gaps left:** 6–7 Dec (2 n, min 3) between the 3–6 Dec stay and 8 Dec. PriceLabs 326 / 296, Smoobu 271 / 262; mixed P50 £790 for the 2 nights; Δ +3.0 / +4.2. **Unsellable at min 3.** 12 Dec (1 n, min 3, 13 Dec Blocked) is also unsellable. 2 Dec is a 1-night gap already at min 1 (294).

### P04 Barking: 13–26 Dec (refresh 27 Nov 15:02:50Z, after the −5%)
| Block | Ours today (yday) | Mixed P25 / P50 / P75; est. matched (×1.09) | Occ Δ | Read |
|---|---|---|---|---|
| 6–9 Dec (4 n, min 3) | 163 / 164 / 165 / 161 = £653 (£687) | 484 / 604 / 799; ≈ 658 | −4.4 / −0.6 / +0.7 / −5.7 | +£49 over the P50; soft |
| 13 Dec (RnB Winter Ball, O2) | **141** (149) | 124 / 152 / 198 | +3.3 | £11 under the P50; **£17.0 under the fortnight (158.0)** |
| 14–22 Dec (9 n) | 135 / 135 / 137 / 139 / 143 / 149 / 146 / 146 / 145 = **£1,275** (£1,339) | 1,157 / **1,417** / 1,843; ≈ 1,545 | −4.6 … +5.8 | **£142 under the P50 (all 9)** |
| Horse Show 17–21 Dec | 139 / 143 / 149 / 146 / 146 = **£723** (£759) | 655 / **791** / 1,036; ≈ 862 | +2.0 / +3.0 / +5.8 / +5.4 / +2.5 | **£68 under the P50** (yday −£31); ≈ £139 under est. matched |
| 23–26 Dec (min 3) | 150 / 150 / 149 / 149 = **£598** (£630) | 547 / **686** / 856; ≈ 748 | +5.6 / +7.1 / **+8.8** / +0.6 | **£88 under the P50** (yday −£51) |
| **14–26 Dec (13 n)** | **£1,873** (£1,969) | 1,704 / **2,103** / 2,699; ≈ 2,292 | avg +2.5 | **£230 under the P50 on all 13 nights (yday −£125); ≈ £419 under est. matched** |

- **Read: worse, and the cause is known.** The −5% on 6–26 Dec (27 Nov 15:02Z) cut **£96 from 14–26 Dec overnight** and £34 from 6–9 Dec. Barking's last December run now sits under the mixed median on every night while the market compresses into Christmas (Δ to +8.8 on 25 Dec). At the 2 BR median (£174), 14–26 Dec would be £2,262, **£389 above today**.
- 13 Dec: Smoobu still shows 166 vs PriceLabs 141 (stale push; pricelabs section). Whether the unsynced Airbnb 1455 still sells 10–13 Dec / is closed from 20 Dec: channel section, NOT CHECKED here.

### P11 Camden: darts, 23–25 Dec, 3 Jan (refresh 07:07Z; no edit)
| Nights | Ours (yday) | Mixed P50 / P75; est. matched (×1.10) | Occ Δ (occ) | Fortnight £ | Read |
|---|---|---|---|---|---|
| 14–17 Dec darts (min 2) | 208 / 214 / 223 / 241 = **£886** (£898) | 972 / 1,199; ≈ 1,069 | **−5.6 / −7.3 / −6.3 / −4.9** (24–29%) | 266.4 | **£314 under the 21 Oct policy level (above £300/n = £1,200)**; £86 under the P50; soft market |
| 18 Dec | 302 (308) | 277 / 341 | −3.6 | – | above the P50 |
| 23 Dec (darts, Round Two) | **277** (277) | 282 / 392 | −0.5 (33.8%) | 284.6 | £5 under the P50; **£7.6 under the fortnight** |
| 24–25 Dec (no darts) | 255 / 262 (255 / 264) | 586 for 2 n | −4.0 / **−10.8** | 284.6 | £69 under the P50; soft; no event |
| 3 Jan final | **148** (148) | 219 / 276 | −2.2 (19.1%) | 163.0 (n=1) | **Still unbookable**: 3–4 Jan `available=False` with no booking status, min 3; 5 Jan Blocked. 3–4 Jan £311 vs mixed P50 £429 |

- 30 Nov – 4 Dec (5 open): £1,246 (£1,263) vs mixed P50 £1,244; Δ −6.6 to +1.6. At the median. 8 Dec orphan 297 (+50%, min 1), level with the mixed P75 (302).
- **Read unchanged:** darts nights 14–17 Dec are priced under Camden's median, but the market there is 5–7 points under STLY. The fair yardstick is the 21 Oct policy level (£1,200 vs £886).

### 3588993 Scott Ellis Gardens (NW8 3 BR) vs the NW8 3-bed market
3 BR summary (`market.csv` 28 Nov): P25 312 / **P50 378 / P75 473** / P90 645 (n=149). Refresh 06:21Z. Still unmapped.

| Window (open) | Ours £ (yday) | Mixed P25 / **P50** / P75 | est. matched (×1.01) | vs est. matched | Occ / Δ |
|---|---|---|---|---|---|
| 10–20 Dec (10; 15 Dec Blocked) | **4,007** (4,170) | 2,902 / **3,666** / 4,842 | 3,703 | +£304 (1.08×) | 45.0% / **+8.9** |
| 26–29 Dec (4, min 4–7) | 2,227 (2,326) | 1,416 / 1,872 / 2,389 | 1,891 | +£336 (1.18×) | 56.2% / −0.6 |
| 4–23 Jan (18) | 5,595 (5,721) | 4,156 / 5,330 / 6,839 | 5,383 | +£212 (1.04×) | 14.7% / +4.4 |
| **All 33 open to 23 Jan** | **12,238** | 8,752 / **11,236** / 14,563 | 11,348 | **+£890 (1.08×)** | 30.6% / +4.9 |

- **Read: about 8% over the estimated 3 BR median; no case to cut.** It is under the mixed P75 on every open night. **13 Dec fell 413 → 340 (−£73) with Δ +15.1**, the second day running that PriceLabs gave back a compressed NW8 night (12 Dec −£80 yesterday). 13 Dec is now £5 under the mixed P50. 10–20 Dec −£163 overnight, with no edit logged.

### P05 St John's Wood (4 BR): December and Valentine's (refresh 27 Nov 15:00:54Z)
| Nights | Ours (yday) | 4 BR summary P50 × n; mixed 3–5 BR P50; est. matched (×1.21) | Occ Δ | Read |
|---|---|---|---|---|
| 29 Nov – 2 Dec (min 3, **now −10%**) | 464 / 451 / 457 / 462 = **£1,834** (£1,864) | **2,320**; 1,666; ≈ 2,016 | −2.5 / −1.0 / −2.1 / −6.0 | **£486 under the 4 BR median**; soft. Smoobu 442 / 429 / 432 / 442 (stale) |
| 7–8 Dec (min 2) | 424 / 403 = **£827** (£824) | **1,160**; 862; ≈ 1,043 | +4.6 / −1.3 | **£333 under the 4 BR median**; under the mixed 3–5 BR P50 (−£35) |
| 13–14 Dec (min 2) | 476 / 466 = **£942** (£939) | **1,160**; 846; ≈ 1,024 | **+10.9** / +3.4 | **£218 under the 4 BR median**, ≈ £82 under est. matched |
| 21 / 29 Dec orphans (+300%, min 1) | 2,128 / 2,282 | 4 BR P90 1,217 | +3.1 / +1.1 | 1.75× / 1.88× the 4 BR P90 |

- **Valentine's 13–16 Feb (neighbourhood `final_price`, min 4, now −8% Feb):** 421 / **400** / 396 / 402 = **£1,619** (yday £1,665, −£46 from the −5% → −8% change). Fortnight (6–12 + 17–23 Feb) **406.6/n**: **14 Feb (Sun) is £6.6 under the fortnight**. 4 BR P25 × 4 = **£1,808**; est. matched ≈ **£1,831**. Δ +7.2 / +1.2 / −1.3 / −0.5 (occ 10.5–16%, 77–80 days out).
- **New fact:** the Airbnb stay 13–17 Feb (made 15 Nov, £1,219.98) shows **cancelled** in `reservations.csv` (27 and 28 Nov). So Valentine's is open inventory. **PriceLabs still does not price Valentine's; the market supports ≈ £1,808–1,831, £189–212 above today.** PriceLabs availability for Feb is NOT CHECKED (the price files end 27 Jan).

### P20 Waterford Court: 14–18 Dec, 26 Dec (refresh 06:21Z)
| Block | Ours (yday) | Mixed P50 / P75 / P90; est. matched (×1.13) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 290 / 304 / 300 / 333 / 318 = **£1,545** (£1,548) | 1,095 / 1,374 / 1,862; ≈ 1,237 | **−8.1 / −7.9 / −6.6 / −5.5 / −2.5** (30–34%) | **£171 over the mixed P75 (all 5)**, ≈ £308 over est. matched; soft. No case to go higher |
| 26 Dec orphan (min 1, +100%) | **565** (563) | 250 / 316 / **434** | +0.8 (38.4%) | **1.30× the mixed P90**; Disney On Ice (O2) from 24 Dec; no compression |

- Min stay after 30 Nov: `prices.csv` shows 14–18 Dec min 3 and 26 Dec min 1. Policy's 3-night window ended 30 Nov; whether it continues is for Corentin (t-p20-minstay-2711). Capacity 6: channel section.

### P13 Shepherd's Bush: Finals weekend, December, January (twins 07:07Z; no edit)
- **Finals weekend:** 28 Nov – 1 Dec Booked (Airbnb, made 18 Oct). Market Δ 28 Nov −1.2 (77.3%), 29 Nov +1.3: **no Finals compression in Shepherd's Bush.**
- **13–21 Dec (9 open) on 3064856: £1,941** (yday £1,926). Mixed P50 £2,058 / P75 £2,644; est. matched ≈ £1,873. Δ +5.4 / +2.3 / −6.2 / +1.8 / +5.7 / +9.9 / **+10.5 / +8.8 / +13.2**. **£117 under the mixed P50 (8 of 9 under); +£68 over est. matched.** 19–21 Dec: £671 vs P50 £735 (−£64).
- **Twin 3090701 13–21 Dec £1,804** (yday £1,718, +£86): £254 under the mixed P50. **Twin gap now £137** (yday £208); it narrowed by lifting 3090701, which is the way policy asks.
- **January 3–23 (21 open):** 3064856 **£3,351** (£3,349): **£67 under the mixed P25 (£3,418), £797 under the P50 (£4,148)**, ≈ £424 under est. matched. Twin £3,535. Occ 13.7%, Δ +3.6.
- **14 Feb (England v France):** 192 vs fortnight 191.3 (+£0.7); mixed P50 208; occ 8.0%, Δ −2.7. Too early.

## 3. Demand calendar, next 90 days (29 Nov – 25 Feb)
**Re-checked 28 Nov 2026 ~07:23–07:25Z.** `WebFetch` of www.alexandrapalace.com failed again with `ENOTFOUND` (host outside the session's allowed domains), so I fetched no other venue host. **Every event fact below is a WebSearch summary restricted to the venue or organiser domain, checked 28 Nov 2026. None is a page read.**

- **Finals Weekend, Allianz Stadium Twickenham** ([Finals page](https://allianzstadiumtwickenham.com/nations-championship), [England v NZ match centre](https://www.englandrugby.com/fixtures-and-results/match-centre/nations-championship-2026-england-v-new-zealand), [Friday visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-friday/essential-information), [What's on](https://allianzstadiumtwickenham.com/whats-on)):
  - **Sat 28 Nov:** Wales v Japan 13:10; England v NZ 16:40.
  - **Sun 29 Nov:** Scotland v Argentina 13:10; France v South Africa (Final) 16:40.
  - Conflict: the What's on page lists other Friday/weekend pairings. Yesterday's Sunday-page 15:10 / 18:40 was not re-seen today.
- **World Darts Championship, Alexandra Palace, Fri 11 Dec – Sun 3 Jan** ([schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [event page](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [PDC FAQ](https://www.pdc.tv/wcfaq), [PDC calendar](https://www.pdc.tv/calendar/)):
  - Round One to 19 Dec; Round Two from 20 Dec; Round Three from Sun 27 Dec; Round Four 30 Dec; QF Fri 1 Jan; SF Sat 2 Jan 19:30; **final Sun 3 Jan 20:00**.
  - **No play 24–26 Dec** is still read from the schedule gap, not stated in words.
  - The summary says "a record 180,000 tickets available" and sold out. That is ticket supply, not attendance; the page was not read.
  - Conflict: PDC ballot/registration pages say 4 Jan.
- **The O2 arena** ([listing](https://www.theo2.co.uk/events/venue/the-o2-arena/17), [events](https://www.theo2.co.uk/events/)):
  - Phoebe Bridgers 1–2 Dec; UB40 ft Ali Campbell 3 Dec. Yesterday's conflicts (Mariah Carey, the tribute) did not reappear, but they stay UNVERIFIED for the event set.
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec**; Bryson Tiller 7 Dec; Ocean Colour Scene 9 Dec; Mo Gilligan 10 Dec (tickets unavailable).
  - **Pete Tong Ibiza Classics Fri 11 – Sat 12 Dec**; **RnB Winter Ball Sun 13 Dec 18:00**.
  - The Darkness 16 Dec; Kasabian 18 Dec; **Disney On Ice 24 Dec – 3 Jan**.
  - Kehlani was not in today's summary; it stays UNVERIFIED.
- **ExCeL** ([Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [londonhorseshow.com](https://londonhorseshow.com/), [What's on](https://www.excel.london/whats-on), [MegaCon](https://www.excel.london/m/visitor/whats-on/megacon-live), [Cisco Live news](https://www.excel.london/news/cisco-live-returns-to-excel-london), [Cisco Live page](https://www.excel.london/mobile/visitor/whats-on/cisco-live-2027)):
  - **Horse Show Thu 17 – Mon 21 Dec.** An older extension article says 18–22 Dec.
  - **MegaCon Live Sat 23 – Sun 24 Jan.** Festival of Genomics 27–28 Jan.
  - **Cisco Live 8–12 Feb** (venue). The Cisco page says 7–12 Feb, and the venue announcement says Cisco Live takes exclusivity of the venue.
  - ESGO 25–27 Feb is new in the window.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 – Fri 1 Jan 00:30. Ticketmaster only, max 4; £40–55 (Londoners £20–35). "Final batch" release date conflicts (20 vs 24 Nov). No attendance figure.
- **England v France, Sun 14 Feb 2027, 15:10 GMT, Allianz Stadium** ([Six Nations fixture](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510), [England Rugby ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027)). Today's summary gives 15:10 on the ticketing page too; yesterday's said "TBC".
- **Valentine's Day:** Sun 14 Feb 2027 (calendar, computed).

Effect = Occ Δ (compression ≥ +5, soft ≤ −2). Properties come from VENUES in `seeker-estates/build/properties.py`: Twickenham P18/P10/P13/P16; O2 P01/P09/P07/P04; ExCeL P01/P04/P07/P15; Alexandra Palace P08/P11. P20, P12 and 3588993 are not in VENUES; P20 is grouped with P01 for O2/ExCeL by proximity. Unavailable VENUES properties are named only: P01 blocked / gone after 20 Dec; P09 gone; P08/P10 handed back; P07 block; P15/P16/P18 not pulled. "Ours vs fortnight" = `prices.csv` 28 Nov vs the fortnight mean (`out28.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 28–29 Nov | Finals Sat / Final Sun | Twickenham | P13 booked | −1.2 / +1.3 normal | – | – |
| 1–3 Dec | Phoebe Bridgers / UB40 (UNVERIFIED for set) | O2 | P04 1–2 Dec booked | – | – | – |
| 5 Dec | Jingle Bell Ball (Sat) | O2 | P20 sold £426 (27 Nov) | −1.9 | – | sold |
| **6 Dec** | Jingle Bell Ball (Sun) | O2 | P04 | −4.4 soft | **163 vs 164.4** | **no (−£1.4; was +£4.6 before the −5%)** |
| 7–9 Dec | Bryson Tiller / OCS | O2 | P04 | −0.6 / +0.7 / −5.7 | 164 / 165 / 161 | not in event set |
| 11–12 Dec | Pete Tong; darts opens | O2 / Ally Pally | P04 sold; P11 booked | +4.6 / +5.7 | – | sold |
| 13 Dec | RnB Winter Ball | O2 | P04 | +3.1 | **141 vs 158.0** | **no (−£17.0; outside headline set)** |
| 14–17 Dec | Darts R1; The Darkness 16 | Ally Pally / O2 | P11; P20; P04 | P11 −5.6 / −7.3 / −6.3 / −4.9; P20 −8.1 … −5.5 | P11 **208 / 214 / 223 / 241** vs 266.4; P20 16 Dec **300** vs 313.9 | **P11 no**; P20 16 Dec no (over P75, soft) |
| 17–21 Dec | Horse Show | ExCeL | P04 (P20 by proximity, 17–18 open) | P04 +2.0 / +3.0 / +5.8 / +5.4 / +2.5 | P04 **139 / 143 / 149** vs 149.2 (17–19); 146 / 146 vs 135.6 (20–21) | **17–19 no**; 20–21 yes vs fortnight; **all under mixed P50 (−£68)** |
| 13–21 Dec | pre-Christmas (no single event) | – | P13; P05 13–14; 3588993 | P13 to +13.2; P05 +10.9; 3588993 to +15.2 | P13 £1,941 vs P50 £2,058; P05 £942 vs £1,160; 3588993 £4,007 vs est. £3,703 | P13, P05 no; 3588993 yes (but 13 Dec −£73) |
| 20–26 Dec | Christmas; Disney On Ice from 24 | O2 | P04 (7 n) | +5.4 / +2.5 / +3.2 / +5.6 / +7.1 / **+8.8** / +0.6 | £147.9/n vs 135.6 | yes vs fortnight; **under mixed P50 on all 7** |
| 23 Dec | Darts R2 | Ally Pally | P11 | −0.5 | **277 vs 284.6** | **no (−£7.6)** |
| 24–25 Dec | no darts | – | P11 | −4.0 / −10.8 soft | 255 / 262 vs 284.6 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | +0.8 | 565 vs 316.7 | yes (manual +100%) |
| 27 Dec – 2 Jan | NYE; darts R3–SF | Embankment / Ally Pally | P04, P11, P20, P13 taken; 3588993 26–29 Dec open | 3588993 31 Dec +4.5, 1 Jan +12.9 | 3588993 26–29 Dec £2,227 vs est. P50 £1,891 | 3588993 yes (+18%) |
| 3 Jan | Darts final | Ally Pally | P11 (**unbookable**) | −2.2 | 148 vs 163.0 (n=1) | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | from neighbourhood | **227 / 223 vs 239.4** | **no (−£12.4 / −£16.4)** |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | – | P20 260 / 252 / 246 / 248 / 271 vs 258.5; P04 159 / 159 / 157 / 155 / 167 vs 158.2 | level / slightly under (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | P05 (stay cancelled, open) | +7.2 / +1.2 / −1.3 / −0.5 | 421 / **400** / 396 / 402 vs 406.6 | **no (−£6.6; −8% Feb)** |
| 14 Feb | England v France 15:10 | Twickenham | P13 | −2.7 soft (8.0%) | 192 vs 191.3 | level (+£0.7) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same method and 17 Nov event set, nights 29 Nov – 17 Jan. 27 Nov values in brackets.

| Ref | Night(s) | Event | Ours 28 Nov (27 Nov) | Fortnight £ (27 Nov) | Gap £ (27 Nov) |
|---|---|---|---|---|---|
| **P04** | **6 Dec** | Jingle Bell Ball (**new today**) | 163 (172) | 164.4 (167.4) | **1.4** (−4.6: not missed) |
| P04 | 16 Dec | Horse Show week | 137 (144) | 149.2 (157.0) | 12.2 (13.0) |
| P04 | 17, 18, 19 Dec | Horse Show | 139, 143, 149 (146, 150, 156) | 149.2 (157.0) | 10.2, 6.2, 0.2 (11.0, 7.0, 1.0) |
| P20 | 16 Dec | Darkness / Horse Show | 300 (302) | 313.9 (313.7) | 13.9 (11.7) |
| P11 | 14–17 Dec | Darts | 208, 214, 223, 241 (212, 216, 226, 244) | 266.4 (268.2) | 58.4, 52.4, 43.4, 25.4 (56.2, 52.2, 42.2, 24.2) |
| P11 | 23 Dec | Darts R2 | 277 (277) | 284.6 (286.4) | 7.6 (9.4) |
| P11 | 24, 25 Dec | Darts block (no play) | 255, 262 (255, 264) | 284.6 (286.4) | 29.6, 22.6 (31.4, 22.4) |
| P11 | 3 Jan | Darts final (unbookable) | 148 (148) | 163.0 (163.0) | 15.0 (15.0) |
| | | **Total, same event set** | | | **14 nights / £298.5** (27 Nov **13 / £296.7**) |
| | | Bookable now (excl. P11 3 Jan) | | | 13 / £283.5 (12 / £281.7) |
| | | Bookable, on event nights (also excl. P11 24–25 Dec) | | | **11 / £231.3** (10 / £227.9) |

**Change vs yesterday: +1 night / +£1.8** (296.7 → 298.5; `cmp28.py` on `m27/out27.txt` vs `m28/out28.txt`).
- **The same 13 nights: +£0.4.**
  - Price effect **+£44**: P04 −7 on each of 16–19 Dec (+£28, the new −5%); P11 14 Dec −4, 15 −2, 16 −3, 17 −3, 25 −2 (+£14); P20 16 Dec −2 (+£2).
  - Fortnight drift **−£43.6**: P04 fortnight 157.0 → 149.2 (−£31.2; the same −5% lowered the reference nights); P11 −1.8 on 7 nights (−£12.6); P20 +0.2.
- **1 new night: +£1.4** (P04 6 Dec: 172 → 163 under the −5%).
- Check: 44 − 43.6 + 1.4 = +1.8. Matches.
- **This headline hides the P04 cut:** a flat −5% moves the event nights and their fortnight together. Against the market, P04 14–26 Dec went from −£125 to **−£230 vs the mixed P50**.
- **Not counted** (outside the 17 Nov set or after 17 Jan): P04 13 Dec RnB Winter Ball **£17.0** (yday £14.9); P20 MegaCon 23 / 24 Jan £12.4 / £16.4; P20 Cisco 9–11 Feb £6.5 / £12.5 / £10.5; P04 Cisco 10–11 Feb £1.2 / £3.2; **P05 14 Feb Valentine's £6.6**. P13 14 Feb is level (+£0.7).

**Read with care:**
- £179.6 of the £298.5 is P11 14–17 Dec, in a market below STLY (Δ −4.9 to −7.3). The fair reference is the 21 Oct policy level (£1,200 vs £886, gap £314).
- £59.8 is P11 23–25 Dec; only 23 Dec (£7.6) has play.
- **Larger under-market items sit outside the headline:**
  - P13 3–23 Jan: −£797 vs the P50.
  - P05: 29 Nov – 2 Dec −£486, 7–8 Dec −£333, 13–14 Dec −£218 vs the 4 BR median; Valentine's −£189 to −£212.
  - P04 14–26 Dec −£230.
  - P13 13–21 Dec −£117; twin −£254.
  - **P06 8–12 Dec sold £83/n under the 2 BR P25.**
- **Priced above a soft market:** P12 7–13 Dec (£269/n vs 2 BR P75 £234; ≈ £360–440 over the median for the week) and 30 Nov – 3 Dec (+£30 over the mixed P75, Δ −14); P20 14–18 Dec (+£171 over the mixed P75, Δ −6.1); the P20 / P05 orphans (1.3–1.9× P90).

Data gaps:
1. **Market source:** PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedrooms, so "est. matched" are ratio estimates. No Market Dashboard / Competitor Listings pulled. Not pulled: P09, P14, P02/P03/P07/P08/P10, P15–P19. 3588993 is not in `id_map.json` or policy.
2. **P06 8–12 Dec is not registered in PriceLabs** (raw not refreshed since 27 Nov 15:02Z; nights show available). Smoobu shows 8–11 Dec above PriceLabs (334–364 vs 298–326). Which price is live on the OTAs: NOT CHECKED. Airbnb layers behind 0.749×: channel section.
3. **Edits:** the 27 Nov 15:00Z batch is explained for P04/P05/P06/P12 (Reyhan's overrides). P11 and P13 had no log entry; why they refreshed is NOT CONFIRMED. P20 overrides were not re-pulled. Customizations not pulled. 3588993's −£73 on 13 Dec (Δ +15.1) has no logged edit.
4. **Tonight (28 Nov) is not in `prices.csv`.** P05 13–16 Feb availability in PriceLabs / Airbnb is NOT CHECKED (price files end 27 Jan; Feb values are neighbourhood `final_price`).
5. **P04 1455 (unsynced Airbnb) status, P20 capacity 6, P12 Booking.com reviews / pace:** not in this section.
6. **Events** are domain-restricted search summaries, not page reads. www.alexandrapalace.com failed with ENOTFOUND today (earlier days also www.theo2.co.uk, allianzstadiumtwickenham.com, www.london.gov.uk, www.sixnationsrugby.com). These hosts need to be allowed in the session's network settings (plus www.excel.london, www.pdc.tv, www.englandrugby.com). Open conflicts:
   - darts end 3 vs 4 Jan; "no play 24–26 Dec" is inferred;
   - Twickenham What's on pairings vs the results page;
   - Kehlani date; 1–3 Dec O2 acts;
   - Cisco Live 7–12 vs 8–12 Feb; Horse Show 17–21 vs an old 18–22 article;
   - NYE final-batch date.

   No attendance figure is stated in any source (darts "180,000 tickets available" is supply, read only in a summary).
