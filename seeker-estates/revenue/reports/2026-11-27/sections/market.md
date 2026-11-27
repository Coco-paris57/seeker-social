# Market & demand calendar: run D = 2026-11-27 (window 28 Nov 2026 – 24 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P13 1 Dec (intentional_overrides); P04 never under 3 nights; P12 hands back after 13 Dec; P01 handback 20 Dec / gap block 30 Nov – 17 Dec; P09 gone after 26 Nov; P11 darts override (24 Oct, do not re-raise); P04 2 Dec (deprioritised).
- **PriceLabs calls today (all read-only):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:19–07:22Z, one at a time, in this order: 3588993 Scott Ellis Gardens, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P06 3288517, P12 2699998, P01 3320302. Each file checked (listing_id match, 540 stay dates, `all_operations_ok=true`, source NL) and saved to `scratchpad/m27/neigh_<id>.json`.
  - `get_user_logs` (listing, 26–27 Nov): **0 entries**.
  - `get_listing_date_overrides`: P04 3562176, P11 3064196, P05 3166592, P20 3547481.
  - **Rule breach to report:** the P04 and P11 `get_listing_date_overrides` calls went out together in one message (two parallel PriceLabs calls). Both were read-only GETs and both returned 200. Every other call today went out alone.
- **`market.csv`:** `data/snapshots/2026-11-27/market.csv` did not exist. Under `.market.csv.lock` I copied it forward from 26 Nov (79 lines; md5 of the first 79 lines = the 26 Nov file, `ed4cbf2f…`) and appended 9 rows dated 27 Nov (now 88 lines; `scratchpad/m27/wmarket27.py`). All market figures below come from the 27 Nov rows or from the neighbourhood daily arrays.
- **Prices:** `prices.csv` 27 Nov, column `pricelabs_price`, **28 Nov – 26 Jan** (tonight, 27 Nov, is not in the file). "yday" = 26 Nov `prices.csv`. After 26 Jan I use the neighbourhood `final_price`.
- **Refreshes (raw `last_refreshed_at`, 27 Nov):** P12 05:59Z, P13 twins 06:09Z, P05 06:33Z, P20 06:34Z, 3588993 06:34Z, P11 06:46Z, P04 06:49Z. The logs show no edit, so these are not edit-triggered; this is the same early-morning batch the Dispatcher saw. **Both new sales are in PriceLabs:** raw P20 5 Dec has `booked_date` 2026-11-26 and ADR 426; raw P04 10–12 Dec has `booked_date` 2026-11-27 and ADR 126.22.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. **Bedroom caveat (unchanged):** the daily P25–P90 mix bedrooms (1–3 BR for P04, P11, P20, P01, P06; 2–3 BR for P13 and P12; 3–5 BR for P05; 2–4 BR for 3588993). "est. matched" = mixed P50 × (summary bedroom P50 ÷ mean daily mixed P50 over the next 30 days). **These are estimates.** Ratios today: P04 1.09, P13 0.92, P11 1.10, P05 1.23, P20 1.14, P12 0.94, P01 1.14, P06 0.99, 3588993 1.04.
- **Fortnight method:** unchanged. `scratchpad/m27/analyse27.py` is `m26/analyse26.py` with only the cut-off moved to 28 Nov, the first date in `prices.csv`. The event set, exclusions, the NYE-week rule and the 17 Jan headline limit are untouched. Output: `scratchpad/m27/out27.txt`; comparison `scratchpad/m27/cmp27.txt`; windows `scratchpad/m27/win27.txt`; day detail `scratchpad/m27/items27.txt`.

## 1. Submarket table
P25 / P50 / P75 / P90 (n): `market.csv` 27 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched). Mkt occ 30/60: `market.csv` `market_occ_30/60` (= `pl_kpis.csv` 27 Nov `market_occupancy_next_30/60`). Our occ: `pl_kpis.csv` `occupancy_next_30/60`. P50 26 Nov = yesterday's `market.csv` row.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 26 Nov | Our occ 30/60 (26 Nov) |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 49 / 36% | 232 / **292 / 328** / 387 (172) | 292 | 53 / 73% (50 / 70) |
| Shepherd's Bush | P13 | 2 | 46 / 33% | 185 / **217 / 266** / 351 (116) | 220 | 63 / 43% (63 / 45) |
| St John's Wood (4 BR) | P05 | 4 | 50 / 38% | 459 / **583 / 704** / 1,220 (90) | 573 | 70 / 47% (70 / 48) |
| **St John's Wood NW8 (3 BR)** | **3588993 Scott Ellis Gardens (unmapped)** | 3 | 44 / 32% | 315 / **384 / 473** / 645 (148) | 383 | 63 / 43%* (67 / 45) |
| Barking | P04 | 2 | 24 / 17% | 139 / **174 / 210** / 247 (90) | 174 | **37 / 32%** (33 / 30) |
| Canary Wharf | P20 | 2 | 38 / 28% | 214 / **253 / 317** / 425 (147) | 252 | 80 / 52% (80 / 52) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 37 / 27% | 218 / **261 / 333** / 438 (143) | 263 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 42 / 31% | 167 / **203 / 230** / 290 (119) | 203 | **87 / 93%** (83 / 92) |
| Marylebone (intentional block, numbers only) | P06 | 2 | 51 / 38% | 320 / **412 / 529** / 664 (217) | 409 | 73 / 87% |
| Primrose Hill (numbers only) | P14 | 1 | 46 / 32% (`pl_kpis` only) | no row | – | 0 / 0% |
| Greenwich (gone after 26 Nov) | P09 | – | 41 / 29% (`pl_kpis` only) | no row | – | 100 / 100%* |
| Islington / Hanger Lane (handed back) / Woolwich (intentional block) | P08 / P10 / P07 | – | 54/40 · 32/24 · 27/20% (`pl_kpis` only) | no row | – | 100% (blocked) |
| Ladbroke Grove / Bayswater (intentional blocks) | P02 / P03 | – | 50/37 · 52/41% (`pl_kpis` only) | no row | – | 100% (blocked) |

\* Inflated by handback or other blocks.
- **The market was flat again.** P50 moved −£3 (P13) to +£10 (P05 4 BR, n 91 → 90); every other P50 moved ≤ £3. Market occ 30 moved 0–2 points.
- **Our side:** P04 occ 30 33 → 37% (the 10–13 Dec Airbnb sale); P11 50 → 53%; P12 83 → 87%; 3588993 67 → 63% (the window rolled forward).
- There is no `market.csv` or `pl_kpis` row for Bow/Devons Rd (P15), Little Venice (P16), St John's Wood P17, Fulham (P18) or Kings Langley (P19): they are not in the PriceLabs pulls.

## 2. Items in the brief

### PriceLabs edits since 26 Nov (`get_user_logs` 26–27 Nov = 0 entries) and overrides
- **No listing edit was logged on 26 or 27 Nov.** The override lists match yesterday's:
  - **P04:** 6–26 Dec min-stay-only (min 3, no price, updated 25 Nov 17:02Z); −8% Jan–Feb; 2 Dec +200% (deprioritised).
  - **P11:** 23–25 Dec min 2 with no price (25 Nov 10:41Z); 14–18 Dec min 2 only; 8 Dec +50% min 1; 9–13 Dec −5%.
  - **P05:** 29 Nov – 2 Dec −8% min 3 (24 Nov 10:50Z); 21 and 29 Dec +300% min 1; Feb −5% min 4.
  - **P20:** 5 Dec and 26 Dec +100% min 1 (18 Nov); 21–25 Dec −5%; Jan −5%.
- **a-reyhan-2011 status today:** P05 29 Nov – 2 Dec −8% is **still in place**. P11 23–25 Dec has its price part still removed. P04 is reverted (since 25 Nov). P13 1 Dec is a policy item and was not re-pulled. Nothing is new; these stay with Corentin as confirm or revert.

### NEW SALE 1: P20 Waterford Court, 5–6 Dec (1 n), Airbnb, £426.00 room, made 26 Nov
Source: `reservations.csv` 27 Nov. The same file has a **cancelled** Airbnb stay for 5–6 Dec at £343.33, made 20 Nov, so this slot has now been sold twice.

| Measure (5 Dec) | £ | £426 vs it |
|---|---|---|
| PriceLabs list on 26 Nov (`prices.csv` 26 Nov; +100% orphan override, min 1) | 562 | **0.758×** |
| Fortnight (28 Nov – 4 Dec + 6–12 Dec, `prices.csv` 27 Nov, n=14) | 310.6 | **1.37×** (+£115.4) |
| Mixed 1–3 BR P25 / P50 / P75 / **P90** (neighbourhood 27 Nov) | 192 / 226 / 293 / **424** | **at the P90 (+£2)**; 1.88× P50 |
| est. matched 2 BR P50 (×1.14) | ≈ 258 | ≈ 1.65× |
| 2 BR summary P50 / P90 (`market.csv` 27 Nov) | 253 / 425 | 1.68× / 1.00× |
| Market occ / Δ vs STLY | 62.6% / **+0.4** | – |
| Earlier cancelled sale of the same night | 343.33 | +£82.67 |

- **Read: a good sale against the market.** The night sold at the Canary Wharf top decile and 37% above P20's own fortnight. It is a Jingle Bell Ball night (O2, Sat 5 Dec, verified below), **but the market shows no compression** (Δ +0.4, 62.6% full): what earned the price was the +100% orphan premium, not event demand. The 0.758× vs list is a channel question (Airbnb rules, last-minute window); it is not checked here.
- **Policy min stay for P20:** policy says "3 nights from 25 Oct to 30 Nov". 5 Dec is after that window, so the min-1 orphan override does not conflict with the written policy. Whether Corentin meant the 3-night rule to continue into December is not stated: **ask, do not assume.**
- After the sale, PriceLabs shows 5 Dec at 686 (Booked), so there is nothing left to price. **P20 now has no open night 28 Nov – 13 Dec.**

### NEW SALE 2: P04 Barking, 10–13 Dec (3 n: 10, 11, 12 Dec), Airbnb, £378.67 room = £126.22/n, made 27 Nov
| Measure (10–12 Dec, 3 n) | £ | £378.67 vs it |
|---|---|---|
| PriceLabs on 26 Nov (`prices.csv` 26 Nov `pricelabs_price`) | 175 / 155 / 156 = **486** | **0.779×** |
| Smoobu on 26 Nov (`smoobu_price`) | 165 / 174 / 156 = **495** | **0.765×** |
| Mixed 1–3 BR **P25** / P50 / P75 (neighbourhood 27 Nov) | **384** / 473 / 623 | **0.99× the mixed P25 (−£5.33)**; 0.80× P50 |
| est. matched 2 BR P50 (×1.09) | ≈ 516 | 0.73× |
| 2 BR summary P25 / P50 × 3 (`market.csv` 27 Nov) | 417 / 522 | 0.91× / 0.73× |
| Fortnight for the O2 block 11–13 Dec (yday 164.6/n, today 163.9/n) × 3 | ≈ 492 | 0.77× |
| Cancelled Booking.com stay 10–14 Dec (£488.35 / 4 n) | 122.09/n | **+£4.13/n** |
| Market occ / Δ | 18.7 / 26.6 / 28.5%; −2.9 / **+4.1 / +5.2** | – |

- **Read: the nights refilled, but at the bottom of the market.** £126/n is just under the Barking mixed P25 and 9% under the 2 BR P25. 11–12 Dec are O2 nights (Pete Tong Ibiza Classics, verified) in mild compression (Δ +4 to +5). Against the cancelled stay it is level (+£4/n), and the 3 nights are revenue that was not there yesterday. The 0.77× gap to list is the same Airbnb ratio seen before; channel section.
- **Which Airbnb listing (synced 1657 or unsynced 1455):** NOT CHECKED here (channel section). PriceLabs (synced Smoobu listing) registers the booking.
- **13 Dec is not an orphan.** It is open (149, min 3, `available=True`), and 14–26 Dec are all open, so 13 Dec starts a **14-night open run (13–26 Dec)** that a 3-night stay can use. The min-3 rule is respected. 6–9 Dec is a 4-night open gap (5 Dec and 10 Dec are booked), which also fits min 3.

### P04 Barking: 13–26 Dec, now the only open December block (refresh 06:49Z)
| Block | Ours today (yday) | Mixed P25 / P50 / P75; est. matched (×1.09) | Occ Δ | Read |
|---|---|---|---|---|
| 6–9 Dec (4 n) | 172 / 173 / 173 / 169 = £687 (£694) | 485 / 602 / 805; ≈ 656 | −3.1 / +1.0 / +2.2 / −6.2 | +£85 over the P50; soft |
| 13 Dec (RnB Winter Ball, O2) | 149 (147) | 123 / 152 / 198 | +3.3 | £3 under the P50; **£14.9 under the fortnight (163.9)** |
| **14–22 Dec (9 n)** | 142 / 142 / 144 / 146 / 150 / 156 / 154 / 153 / 152 = **£1,339** (£1,352) | 1,155 / **1,413** / 1,843; ≈ 1,540 | −5.1 / −6.1 / −1.8 / +1.6 / +2.7 / +5.5 / +5.0 / +2.1 / +3.9 | **£74 under the P50 (all 9 under), ≈ £201 under est. matched**; −£13 overnight |
| Horse Show 17–21 Dec | 146 / 150 / 156 / 154 / 153 = **£759** (£769) | 654 / 790 / 1,038; ≈ 861 | +1.6 / +2.7 / +5.5 / +5.0 / +2.1 | **£31 under the P50** (yday −£25), ≈ £102 under est. matched |
| **23–26 Dec** (min 3) | 158 / 158 / 157 / **157** = **£630** (£650) | 545 / 681 / 854; ≈ 742 | +5.5 / +7.2 / **+8.9** / +0.2 | **£51 under the P50** (yday −£31), ≈ £112 under est. matched; 26 Dec −£20 overnight |
| **14–26 Dec (13 n)** | **£1,969** (£2,002) | 1,700 / **2,094** / 2,697; ≈ 2,282 | avg +2.3 | **£125 under the P50 on all 13 nights; ≈ £313 under est. matched** |

- **Why 26 Dec fell 177 → 157:** raw `uncustomized_price` fell 211 → 178 at the 27 Nov refresh, with no edit logged. 18 Dec on P20 shows the same pattern (382 → 349). **Cause NOT CONFIRMED.** On the sold nights, by contrast, the uncustomized price rose (11 Dec 168 → 222) once they were booked.
- **Read: unchanged in direction, slightly worse.** P04's last December run is priced under the Barking median on every night, while the market compresses into Christmas (Δ to +8.9 on 25 Dec). At the 2 BR P50 (£174), 14–26 Dec would be £2,262: **£293 above today**. The −5% that was removed on 25 Nov did not lift these nights (see yesterday). PriceLabs is not pricing the Christmas/Horse Show compression on P04.

### P11 Camden: darts, 23–25 Dec, 3 Jan (refresh 06:46Z)
| Nights | Ours (yday) | Mixed P50 / P75; est. matched (×1.10) | Occ Δ (occ) | Fortnight £ | Read |
|---|---|---|---|---|---|
| 11–13 Dec (opening weekend) | Booked | – | +4.4 / +4.1 / +1.2 | – | sold |
| **14–17 Dec** Round One (min 2) | 212 / 216 / 226 / 244 = **£898** (£902) | 976 / 1,193; ≈ 1,074 | **−5.2 / −5.5 / −5.0 / −3.5** (24–29%) | 268.2 | **£302 under the 21 Oct policy level (above £300/n = £1,200)**; £78 under the mixed P50; ≈ £176 under est. matched; soft market |
| 18 Dec | 308 (313) | 278 / 340 | −1.8 | – | above the P50 |
| 19–22 Dec | Booked | – | – | – | sold |
| **23 Dec** Round Two last day | **277** (278) | 283 / 391 | −0.3 (33.8%) | 286.4 | £6 under the P50; **£9.4 under the fortnight** |
| 24–25 Dec (no darts) | 255 / 264 (256 / 265) | 586 / 813 for 2 n | −4.3 / **−11.0** | 286.4 | £67 under the P50; soft; no event |
| 26 Dec – 2 Jan | Booked | – | 1 Jan +5.4, 2 Jan +5.1 | – | sold |
| **3 Jan** final | **148** (150) | 216 / 273; ≈ 238 | −2.5 (19.1%) | 163.0 (n=1) | **Still unbookable:** raw 3 and 4 Jan `unbookable=1`, `available=False`, no booking status, min 3; 5 Jan Blocked. 3–4 Jan together £311 vs mixed P50 £421 |

- **30 Nov – 4 Dec (5 open):** 216 / 232 / 244 / 271 / 300 = £1,263 (£1,255). Mixed P50 £1,248, est. matched ≈ £1,373, Δ −3.6 to +1.1. At the median; no event.
- **8 Dec orphan:** 298 (306), +50% override; level with the mixed P75 (300).

### P12 Mile End 30 Nov – 3 Dec (refresh 05:59Z, no edit)
- **30 Nov – 3 Dec (4 open, min 2): 269 / 279 / 282 / 288 = £1,118** (yday £1,108). Mixed P25 / P50 / P75 / P90 = 681 / 817 / **1,024** / 1,235; est. matched ≈ £768. Δ −10.5 / −9.4 / −10.6 / −13.2 (42–49%).
- **Read: still above the mixed P75 on all 4 nights (+£94), ≈ £350 over est. matched**, in the softest stretch of P12's window. These are the last open nights before the 13 Dec handback (4–13 Dec are Booked; 14 Dec Blocked). Asking ~£280/n where the market is 10–13 points below STLY makes an unsold outcome more likely. The case is to come down toward the P75 (about £256/n), not go higher. Whether 26 Nov sold or lapsed is not in today's `prices.csv` (it starts 28 Nov): NOT CHECKED here.

### 3588993 Scott Ellis Gardens (NW8, 3 BR) vs the NW8 3-bed market
3 BR summary (`market.csv` 27 Nov): P25 315 / **P50 384 / P75 473** / P90 645 (n=148). Refresh 06:34Z. Still unmapped (not in `id_map.json` or policy).

| Window (open nights) | Ours £ (yday) | Mixed P25 / **P50** / P75 £ | est. matched P50 £ (×1.04) | Ours vs est. matched | > mixed P75 / < mixed P50 | Avg occ / Δ |
|---|---|---|---|---|---|---|
| 10–20 Dec (10 open; 15 Dec Blocked; 28 Nov – 9 Dec Blocked; 21–25 Dec Booked) | **4,170** (4,254) | 2,908 / **3,671** / 4,861 | 3,818 | **+£352 (1.09×)** | 0 / 1 | 44.4% / **+9.8** (to +17.6 on 19 Dec) |
| 26–29 Dec NYE run-in (4 open, min 4–7) | 2,326 (2,323) | 1,411 / 1,867 / 2,398 | 1,942 | +£384 (1.20×) | 2 / 0 | 56.2% / +0.1 |
| 4–23 Jan (18 open) | 5,721 (5,738) | 4,157 / 5,309 / 6,817 | 5,521 | +£200 (1.04×) | 0 / 3 | 14.6% / +4.6 |
| **All 32 open nights to 23 Jan** | **12,217** (12,315) | 8,476 / **10,847** / 14,076 | 11,281 | **+£936 (1.08×)** | 2 / 4 | 29.1% / +5.7 |

- **Read: about 8% over the estimated 3 BR median on what is open; −£98 overnight.** Most of the fall is 12 Dec (468 → 388, −£80). That gives back price inside NW8's most compressed stretch (Δ +7.7 on 12 Dec). 10–20 Dec stays above est. matched (+£352) but under the mixed P75 on every night, which is reasonable for Δ +10. No case to cut.

### P05 St John's Wood (4 BR): December and Valentine's (refresh 06:33Z)
| Nights | Ours (yday) | 4 BR summary P50 × n (`market.csv`); mixed 3–5 BR P50 / P75; est. matched (×1.23) | Occ Δ | Read |
|---|---|---|---|---|
| 29 Nov – 2 Dec (4 open, min 3, **−8% since 24 Nov**) | 473 / 463 / 460 / 468 = **£1,864** (£1,904) | **2,332**; 1,673 / 2,200; ≈ 2,058 | −1.3 / −0.7 / −0.9 / −3.5 | **£468 under the 4 BR median**, ≈ £194 under est. matched. −£40 overnight. Soft market. The −8% is still with Corentin. |
| **7–8 Dec** (min 2, −1%) | 425 / 399 = **£824** (£834) | **1,166**; 864 / 1,137; ≈ 1,063 | **+6.2** / +1.4 | **£342 under the 4 BR median**, ≈ £239 under est. matched; under even the mixed 3–5 BR P50 (−£40) |
| **13–14 Dec** (min 2) | 471 / 468 = **£939** (£945) | **1,166**; 851 / 1,131; ≈ 1,047 | **+10.8 / +4.4** | **£227 under the 4 BR median**, ≈ £108 under est. matched; P05's most compressed open pair |
| 21 Dec orphan (+300%, min 1) | 2,141 (2,152) | 4 BR P90 1,220 | +2.9 | 1.75× the 4 BR P90 |
| 29 Dec orphan (+300%, min 1) | 2,290 (2,308) | 4 BR P90 1,220 | +2.5 | 1.88× the 4 BR P90 |

- Every other December night is Booked. P05's whole open December fell £10–40 per block with no edit.
- **Valentine's 13–16 Feb (4 n, neighbourhood `final_price`, min 4 under the −5% Feb override):** 434 / **412** / 408 / 411 = **£1,665** (yday 1,676). Fortnight (6–12 + 17–23 Feb) **419.6/n**: **14 Feb (Sun, Valentine's) is £7.6 under the fortnight**; only Sat 13 Feb is above (+£14.4). Mixed 3–5 BR P50 £1,525; est. matched ≈ **£1,876**; 4 BR summary P25 × 4 = **£1,836**. Δ +7.0 / +1.3 / −1.2 / −1.0, occ 10.5–15.6%, 78–81 days out. **Read unchanged: PriceLabs does not price Valentine's**, and the market supports ≈ £1,836–1,876, **£171–211 above today**. Compression is mild and only on Sat 13 Feb. Availability in Smoobu/Airbnb is NOT CHECKED.

### P20 Waterford Court: 14–18 Dec, 26 Dec (refresh 06:34Z)
| Block | Ours (yday) | Mixed P50 / P75 / P90; est. matched (×1.14) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 290 / 304 / 302 / 335 / **317** = **£1,548** (£1,579) | 1,096 / 1,375 / 1,883; ≈ 1,249 | **−8.6 / −8.7 / −6.8 / −5.7 / −3.4** (30–33%) | **£173 over the mixed P75 (all 5 above), ≈ £299 over est. matched**, in a market 3–9 points below STLY. 18 Dec −£31 overnight (uncustomized 382 → 349, no edit). Still the soft spot; no case to go higher. |
| 26 Dec orphan (min 1, +100%) | **563** (565) | 251 / 316 / **436** | +0.4 (38.0%) | **1.29× the mixed P90.** Disney On Ice (O2) from 24 Dec; no compression |
- 5 Dec: sold (above). 19–25 Dec and 27 Dec – 2 Jan Booked. Capacity 6 is for the channel section.

### P13 Shepherd's Bush: Finals weekend, December, January (twins 06:09Z; no edit)
- **Finals weekend:** 28–30 Nov Booked (check-in 28 Nov). Tonight, 27 Nov (Finals Fri), is not in `prices.csv`. The neighbourhood `final_price` is £261 vs mixed P50 234 / P75 291; occ 79.5%, **Δ −3.3**. Sat 28 / Sun 29: Δ −2.7 / +1.7. **The market shows no Finals-weekend compression in Shepherd's Bush.** Whether 27 Nov is still open tonight is NOT CHECKED (not in `prices.csv`).
- **1 Dec:** 235 (234), min 1. Policy item, not raised.
- **13–21 Dec (9 open) on 3064856: 206 / 202 / 200 / 205 / 212 / 227 / 232 / 220 / 222 = £1,926** (yday £1,912). Mixed P50 £2,077 / P75 £2,656; est. matched (×0.92) ≈ £1,911. Δ +6.2 / +4.5 / −5.4 / +2.5 / +6.4 / +10.7 / **+13.7 / +9.5 / +14.1**. **£151 under the mixed P50 (all 9 under); level with est. matched (+£15).** 19–21 Dec: £674 vs P50 £741 (−£67), Δ +9.5 to +14.1.
- **Twin 3090701 13–21 Dec: £1,718** (yday £1,708): £359 under the mixed P50 and **£208 below 3064856**. Policy says narrow the gap, never make them equal. The gap is £4 wider than yesterday (£204); it should close by lifting 3090701.
- **January 3–23 (21 open on both twins):** 3064856 **£3,349** (yday £3,341). That is £103 under the mixed P25 (£3,452), **£831 under the P50 (£4,180)** and ≈ £497 under est. matched (£3,846). Twin 3090701 £3,586. Market occ 13.5%, Δ +2.6. The −8% override on 2–31 Jan is unchanged (yesterday's finding).
- **14 Feb (Eng v France 15:10, Twickenham):** £193 vs fortnight £192.1 (+£0.9), under the −10% Feb override. Mixed P50 210; occ 7.9%, Δ −2.8. Too early to read.

## 3. Demand calendar, next 90 days (28 Nov – 24 Feb)
**Re-checked 27 Nov 2026 ~07:35Z.** `WebFetch` of www.theo2.co.uk failed with `ENOTFOUND` (host not allowed in this session; on earlier days also www.alexandrapalace.com, allianzstadiumtwickenham.com, www.london.gov.uk, www.sixnationsrugby.com), so I did not try other venue hosts. **Every event fact below is a WebSearch summary restricted to the venue or organiser domain, checked 27 Nov 2026. None is a page read.**

- **Twickenham (Allianz Stadium) Finals Weekend, Fri 27 – Sun 29 Nov.** Sources: [Finals page](https://allianzstadiumtwickenham.com/nations-championship), [What's on](https://allianzstadiumtwickenham.com/whats-on), [England v NZ](https://www.englandrugby.com/follow/news-and-media/england-team-face-new-zealand-nations-championship-finals-weekend), [Sunday visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information).
  - Fri 27: Italy v Fiji 16:40; Ireland v Australia 20:10.
  - Sat 28: Wales v Japan 13:10; **England v NZ 16:40** (ITV1).
  - Sun 29: Scotland v Argentina 13:10; **France v South Africa Final 16:40**.
  - Conflict persists: the Sunday visit page gives 15:10 / 18:40.
- **England v France, Sun 14 Feb 2027, 15:10 GMT, Allianz Stadium.** Sources: [Six Nations fixture](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510), [England Rugby ticketing article](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027), [clubs page](https://help.englandrugby.com/support/solutions/articles/103000347582-information-for-clubs-for-guinness-men-s-six-nations-2027). The ticketing article marks kick-off "TBC".
- **World Darts Championship, Alexandra Palace, Fri 11 Dec – Sun 3 Jan.** Sources: [Ally Pally schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [event page](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [PDC calendar](https://www.pdc.tv/calendar/), [PDC FAQ](https://www.pdc.tv/wcfaq).
  - Round Two ends Wed 23 Dec; Round Three Sun 27 – 29 Dec; Round Four 30 Dec; QF 1 Jan; SF Sat 2 Jan 19:30; **final Sun 3 Jan 20:00**.
  - **No sessions 24–26 Dec:** the schedule goes from 23 Dec to 27 Dec. This is still read from the gap in the schedule; no source states it in words.
  - Conflict: PDC registration and ballot pages give 4 Jan as the end. No attendance figure found.
- **The O2 arena** ([listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Jingle Bell Ball](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [Capital FM info](https://www.capitalfm.com/news/jingle-bell-ball-2026-date-venue-info/), [Capital FAQ](https://www.capitalfm.com/events/jingle-bell-ball/2026-frequently-asked-questions/)):
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec**, doors 16:30, shows 18:00 – c. 22:00. Capital says sold out; the O2 page says "on sale". One O2 listing shows 7 Dec (treated as an error).
  - Bryson Tiller Mon 7 Dec; Kehlani Tue 8 Dec (today's summary; it was 29 Nov in earlier summaries, so the event set keeps it UNVERIFIED); Ocean Colour Scene 9 Dec; Mo Gilligan 10 Dec.
  - **Pete Tong Ibiza Classics Fri 11 – Sat 12 Dec**; **RnB Winter Ball Sun 13 Dec**.
  - McLaren Racing Live 14 Dec; Don Toliver 15 Dec ("rescheduled"); The Darkness Wed 16; Greg Davies Thu 17; Kasabian 18; Culture Club Sat 19; Amr Diab 20 Dec.
  - **Disney On Ice 24 Dec – 3 Jan.**
  - **Conflicts, UNVERIFIED:** Phoebe Bridgers vs Mariah Carey on 1–2 Dec; UB40 vs a Whitney Houston tribute (indigo) on 3 Dec. One results snapshot is c. 44 days old.
- **ExCeL.** Sources: [Horse Show (ExCeL)](https://www.excel.london/whats-on/london-international-horse-show), [londonhorseshow.com](https://londonhorseshow.com/), [MegaCon](https://www.excel.london/whats-on/megacon-live), [Cisco Live news](https://www.excel.london/news/cisco-live-returns-to-excel-london), [Cisco Live page](https://www.excel.london/mobile/visitor/whats-on/cisco-live-2027).
  - **London International Horse Show Thu 17 – Mon 21 Dec**.
  - **MegaCon Live Sat 23 – Sun 24 Jan**.
  - **Cisco Live 8–12 Feb** (press release); the event page says 7–12 Feb.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 – Fri 1 Jan 00:30. Ticketmaster only, max 4; £20/£35 Londoners, £40/£55 others; the second and final batch is "now on sale". No attendance figure stated.
- **Valentine's Day:** Sun 14 Feb 2027 (calendar).

Effect = Occ Δ (compression ≥ +5, soft ≤ −2). Properties come from VENUES in `seeker-estates/build/properties.py`: Twickenham P18/P10/P13/P16; O2 P01/P09/P07/P04; ExCeL P01/P04/P07/P15; Alexandra Palace P08/P11. P20, P12 and 3588993 are not in VENUES; I group P20 with P01 for O2/ExCeL by proximity. Blocked, handed-back or not-pulled VENUES properties are named only: P01 blocked 30 Nov – 17 Dec and gone after 20 Dec; P09 gone; P08/P10 handed back; P07 intentional block; P15/P16/P18 not pulled. "vs fortnight" = `prices.csv` 27 Nov vs the fortnight mean (`out27.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 27 Nov (tonight) | Finals Fri | Twickenham | P13 (not in `prices.csv`) | −3.3 soft (79.5%) | neighbourhood final 261 vs mixed P50 234 | n/a (no fortnight row) |
| 28–29 Nov | Finals Sat/Sun | Twickenham | P13 booked; P11 booked | P13 −2.7 / +1.7 | – | – |
| 1–3 Dec | O2 concerts (UNVERIFIED, conflicting) | O2 | P04 2 Dec (deprioritised override) | – | not in event set | – |
| **5 Dec** | Jingle Bell Ball (Sat) | O2 | **P20 SOLD £426** | +0.4 normal (62.6%) | sale 426 vs 310.6 | yes (manual +100%); **sale 1.37× the fortnight** |
| 6 Dec | Jingle Bell Ball (Sun) | O2 | P04 | −3.1 soft | 172 vs 167.4 | yes (+£4.6) |
| 7–9 Dec | Bryson Tiller / Kehlani (UNVERIFIED) / OCS | O2 | P04 | +1.0 / +2.2 / −6.2 | 8 Dec 173 vs 163.9 | (UNVERIFIED label) |
| **11–12 Dec** | Pete Tong Ibiza Classics; darts opens 11 Dec | O2 / Ally Pally | **P04 SOLD £126.22/n**; P11 booked | P04 +4.1 / +5.2 | sale 126.22/n vs 163.9 | **sold £37.7/n under the fortnight** |
| 13 Dec | RnB Winter Ball | O2 | P04 | +3.3 | **149 vs 163.9** | **no** (−£14.9; outside the 17 Nov headline set) |
| 14–17 Dec | Darts Round One; Darkness 16, Greg Davies 17 | Ally Pally / O2 | P11; P04; P20 | P11 −5.2 / −5.5 / −5.0 / −3.5; P20 −8.7 to −5.7 soft | P11 **212 / 216 / 226 / 244** vs 268.2; P20 16 Dec **302** vs 313.7 (17–18 Dec 335 / 317 above); P04 16 Dec **144** vs 157.0 | **P11 no**; P20 16 Dec no (but over the P75, soft); P04 16 Dec no |
| 17–21 Dec | Horse Show | ExCeL | P04 (P20 by proximity) | P04 +1.6 / +2.7 / +5.5 / +5.0 / +2.1 | P04 **146 / 150 / 156** vs 157.0 (17–19); 154 / 153 vs 137.4 (20–21) | **17–19 Dec no** (19 Dec new, −£1.0); 20–21 yes; **under the mixed P50 (−£31)** |
| 13–21 Dec | pre-Christmas (no single event) | London | P13; P05 13–14; 3588993 | P13 to **+14.1**; P05 **+10.8** / +4.4; 3588993 to **+17.6** | P13 £1,926 vs P50 £2,077; P05 £939 vs 4 BR median £1,166; 3588993 £4,170 vs est. P50 £3,818 | **P13, P05 no** (under the median); 3588993 yes |
| 20–26 Dec | Christmas; Disney On Ice from 24 | O2 | P04 (7 n open) | +5.0 / +2.1 / +3.9 / +5.5 / +7.2 / **+8.9** / +0.2 | £155.6/n vs fortnight 137.4 | yes vs the fortnight; **under the mixed P50 on all 7** (23–26: −£51) |
| 23 Dec | Darts Round Two (last day) | Ally Pally | P11 | −0.3 | **277** vs 286.4 | **no** (−£9.4) |
| 24–26 Dec | Christmas (**no darts**, read from schedule) | – | P11 24–25 | −4.3 / −11.0 soft | 255 / 264 vs 286.4 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | +0.4 | 563 vs 315.4 | yes (manual, 1.29× P90) |
| 27 Dec – 2 Jan | NYE; darts R3–SF | Embankment / Ally Pally | P04, P11, P20, P13 taken; 3588993 26–29 Dec open, 30 Dec – 3 Jan Booked | 31 Dec: 3588993 +5.1, P13 +18.7 | 3588993 26–29 Dec £2,326 vs est. P50 £1,942 | 3588993: priced (+20%) |
| 3 Jan | Darts final | Ally Pally | P11 (**unbookable**) | −2.5 | 148 vs 163.0 (n=1) | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | **+8.5 / +6.1** (13.5 / 9.1%) | **224 / 220** vs 242.3 | **no** (−£18.3 / −£22.3; beyond the 17 Jan headline) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | P20 +3.9 … −0.9 (4–6%); P04 not extracted | P20 258 / 251 / 247 / 249 / 271 vs 256.7; P04 161 / 160 / 159 / 157 / 168 vs 159.1 | level / slightly under (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | P05 | +7.0 / +1.3 / −1.2 / −1.0 | 434 / **412** / 408 / 411 vs 419.6 | **no** (−5% Feb override) |
| 14 Feb | Eng v France 15:10 | Twickenham | P13 | −2.8 soft (7.9%) | 193 vs 192.1 | level (+£0.9; −10% Feb override) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same method and 17 Nov event set, nights 28 Nov – 17 Jan. 26 Nov values in brackets.

| Ref | Night(s) | Event | Ours 27 Nov (26 Nov) | Fortnight £ (26 Nov) | Gap £ (26 Nov) |
|---|---|---|---|---|---|
| P04 | 16 Dec | Horse Show week | 144 (145) | 157.0 (157.5) | 13.0 (12.5) |
| P04 | 17, 18 Dec | Horse Show | 146, 150 (148, 152) | 157.0 (157.5) | 11.0, 7.0 (9.5, 5.5) |
| **P04** | **19 Dec** | Horse Show (**new today**) | 156 (158) | 157.0 (157.5) | **1.0** (−0.5: not missed) |
| P20 | 16 Dec | Darkness / Horse Show | 302 (302) | 313.7 (312.9) | 11.7 (10.9) |
| **P11** | **14–17 Dec** | Darts Round One | **212, 216, 226, 244** (208, 218, 228, 248) | 268.2 (271.8) | **56.2, 52.2, 42.2, 24.2** (63.8, 53.8, 43.8, 23.8) |
| P11 | 23 Dec | Darts Round Two | 277 (278) | 286.4 (290.0) | 9.4 (12.0) |
| P11 | 24, 25 Dec | Darts block (no play, read from schedule) | 255, 264 (256, 265) | 286.4 (290.0) | 31.4, 22.4 (34.0, 25.0) |
| P11 | 3 Jan | Darts final (unbookable) | 148 (150) | 163.0, n=1 (164.0) | 15.0 (14.0) |
| | | **Total, same event set** | | | **13 nights / £296.7** (26 Nov **12 / £308.6**) |
| | | Bookable now (excl. P11 3 Jan) | | | 12 / £281.7 (26 Nov 11 / £294.6) |
| | | Bookable and on event nights (excl. P11 3 Jan, 24 and 25 Dec) | | | **10 / £227.9** (26 Nov 9 / £235.6) |

**Change vs yesterday: +1 night / −£11.9** (308.6 → 296.7; `cmp27.py` on `m26/out26.txt` vs `m27/out27.txt`).
- **The same 12 nights: −£12.9.**
  - Price effect +£14.0: P11 14 Dec +4 (−£4); P11 15 / 16 Dec −2 each, 17 Dec −4, 23 / 24 / 25 Dec −1 each, 3 Jan −2 (+£13); P04 16 Dec −1, 17 / 18 Dec −2 each (+£5).
  - Fortnight drift −£26.9: P11 fortnights −3.6 on all 7 darts nights (−£25.2; their reference nights fell, mostly list prices on already-Booked nights: 12 Dec 291 → 274, 7 / 8 Dec −8 each, 18 Dec 313 → 308; 10 Dec rose 231 → 241); P11 3 Jan −1.0; P04 −0.5 × 3; P20 16 Dec +0.8.
- **1 new night: +£1.0** (P04 19 Dec: price 158 → 156).
- Check: 14.0 − 26.9 + 1.0 = −11.9. Matches.
- **The two new sales take nights off this list's side tables, not the headline:** P04 11–12 Dec (yesterday £9.6 + £8.6 outside the headline) are now Booked, sold at £126.22/n, which is **£37.7/n under the O2 fortnight**. P20 5 Dec sold at 1.37× its fortnight.
- **Not counted** (outside the 17 Nov set or beyond 17 Jan):
  - **P04 13 Dec (RnB Winter Ball, O2) £14.9** (yesterday £17.6);
  - P20 23 / 24 Jan (MegaCon) £18.3 / £22.3;
  - P20 9–11 Feb £5.7 / £9.7 / £7.7; P04 10–11 Feb £0.1 / £2.1 (Cisco Live);
  - **P05 14 Feb Valentine's £7.6** (outside the venue set). P13 14 Feb is level (+£0.9).

**Read with care:**
- **£174.8 of the £296.7 is P11 Round One 14–17 Dec**, in a market below STLY (Δ −5.5 to −3.5). The fair reference is the 21 Oct policy level (£1,200 vs £898, gap £302).
- **£63.2 is P11 23–25 Dec.** Only 23 Dec (£9.4) is a real darts night; 24–25 Dec are no-play nights in a soft market (Δ −4.3 / −11.0). They stay in for method continuity.
- **P04 16–19 Dec (£32.0)** is small per night. The bigger P04 issue is against the market: 14–26 Dec is £125 under the mixed P50 on every night.
- **The larger under-market items sit outside this headline:**
  - P13 3–23 Jan: −£831 vs the mixed P50, still under the P25 (−£103).
  - P05 29 Nov – 2 Dec −£468, 7–8 Dec −£342 and 13–14 Dec −£227 vs the 4 BR median (Δ to +10.8).
  - P04 14–26 Dec −£125 vs the mixed P50 (≈ −£313 vs est. matched).
  - P13 13–21 Dec −£151 vs the mixed P50; twin 3090701 −£359.
  - P05 Valentine's £171–211.
- **On the other side:** P12 30 Nov – 3 Dec (+£94 over the mixed P75, Δ −10.9), P20 14–18 Dec (+£173 over the mixed P75, Δ −6.6) and the P20 / P05 orphans (1.3–1.9× P90) are priced above a soft or flat market.

Data gaps:
1. **Market source:** PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedrooms, so "est. matched" figures are ratio estimates. No Market Dashboard or Competitor Listings pulled. Not pulled: P09/P14, P02/P03/P07/P08/P10/P15–P19. 3588993 is not in `id_map.json` or policy.
2. **Unexplained overnight moves with no logged edit:** P04 26 Dec −£20 (uncustomized 211 → 178), P20 18 Dec −£31 (382 → 349), 3588993 12 Dec −£80, P05 open December −£10 to −£40 per block. 0 log entries 26–27 Nov; refresh cause (batch vs Sync Now) NOT CHECKED; customizations not re-pulled.
3. **New sales:** which P04 Airbnb listing (1657 synced or 1455 unsynced) took 10–13 Dec, and the Airbnb layers behind 0.758× (P20) / 0.765–0.779× (P04): NOT CHECKED here (channel section). P20 December min-stay intent: ask Corentin.
4. **Tonight (27 Nov) is not in `prices.csv`**, so P13 Finals Friday and P12 26–27 Nov status are NOT CHECKED here.
5. **P05 Valentine's / Feb:** availability NOT CHECKED; Feb prices are neighbourhood `final_price`, not `prices.csv`.
6. **Events** are domain-restricted search summaries, not page reads. www.theo2.co.uk failed with ENOTFOUND today (earlier days also www.alexandrapalace.com, allianzstadiumtwickenham.com, www.london.gov.uk, www.sixnationsrugby.com). These hosts must be allowed in the session's network settings for page reads (plus www.excel.london, www.pdc.tv, www.capitalfm.com). Open conflicts:
   - Finals Sunday 16:40 vs 18:40; England v France kick-off "TBC" on the ticketing page;
   - darts end 3 vs 4 Jan; "no darts 24–26 Dec" is read from the schedule, not stated;
   - Kehlani 8 Dec vs 29 Nov; 1–2 Dec Phoebe Bridgers vs Mariah Carey; 3 Dec UB40 vs tribute; Jingle Bell Ball 7 Dec listing; Jingle Bell Ball ticket status (sold out vs on sale);
   - Cisco Live 7–12 vs 8–12 Feb.

   No attendance figure is stated in any source used today.
7. **Process:** one pair of PriceLabs calls (P04 + P11 overrides) went out in parallel, against the one-at-a-time rule. Both were read-only.
