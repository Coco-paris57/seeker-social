# Market & demand calendar: run D = 2026-11-26 (window 27 Nov 2026 – 23 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P13 1 Dec (intentional_overrides); P04 never under 3 nights; P12 hands back after 13 Dec; P01 handback 20 Dec / gap block 30 Nov – 17 Dec; P09 gone after 26 Nov.
- **PriceLabs calls today: all read-only, strictly one at a time (never two in one message):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:21–07:24Z, in this order: 3588993 Scott Ellis Gardens, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P06 3288517, P12 2699998, P01 3320302. Each file checked (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved to `scratchpad/m26/neigh_<id>.json`.
  - `get_user_logs` (listing, 25–26 Nov): 3 entries, all Reyhan (below).
  - `get_listing_date_overrides`: P04 3562176, P11 3064196, P05 3166592 (26 Nov – end Feb / 10 Jan).
- **`market.csv`:** `data/snapshots/2026-11-26/market.csv` did not exist. Under `.market.csv.lock` I copied it forward from 25 Nov (70 lines; the first 70 lines are byte-identical to 25 Nov, md5 checked) and appended 9 rows dated 26 Nov (now 79 lines; `scratchpad/m26/wmarket26.py`). All market figures below come from the 26 Nov rows.
- **Prices:** `prices.csv` 26 Nov, column `pricelabs_price`, **27 Nov – 25 Jan** (the first date is now 27 Nov, so tonight, 26 Nov, is not in the file). "yday" = 25 Nov `prices.csv`. After 25 Jan I use the neighbourhood `final_price`.
- **Refreshes (raw `last_refreshed_at`):** P13 twins 26 Nov 06:09Z, P12 06:22Z, P05 06:48Z, P20 06:48Z, 3588993 06:48Z, P11 06:59Z; P04 25 Nov 17:02Z. **`get_user_logs` shows no edit on 26 Nov**, so the 06:09–06:59Z refreshes were not triggered by a logged listing edit. Whether they came from Sync Now or a delayed batch is NOT CHECKED. P04's 17:02:27Z refresh came 25 s after Reyhan's 17:02:02Z edit.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. **Bedroom caveat:** the daily P25–P90 mix bedrooms (1–3 BR for P04, P11, P20, P01, P06; 2–3 BR for P13 and P12; 3–5 BR for P05; 2–4 BR for 3588993). "est. matched" = mixed P50 × (summary bedroom P50 ÷ mean daily mixed P50 over the next 30 days). **These are estimates.** Ratios today: P04 1.09, P13 0.93, P11 1.11, P05 1.22, P20 1.14, P12 0.95, P01 1.15, P06 0.99, 3588993 1.04.
- **Fortnight method:** unchanged. `scratchpad/m26/analyse26.py` is `m25/analyse25.py` with only the cut-off moved to 27 Nov, the first date in `prices.csv`. The event set, exclusions and the NYE-week rule are untouched. Output: `scratchpad/m26/out26.txt`. Comparison: `scratchpad/m26/cmp26.txt` logic = `cmp25.py`. Windows: `scratchpad/m26/win26.txt`. Day detail: `scratchpad/m26/items26.txt`.

## 1. Submarket table
P25 / P50 / P75 / P90 (n): `market.csv` 26 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched). Mkt occ 30/60: `market.csv` `market_occ_30/60` (= `pl_kpis.csv` 26 Nov `market_occupancy_next_30/60`). Our occ: `pl_kpis.csv` `occupancy_next_30/60`. P50 25 Nov = yesterday's `market.csv` row.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 25 Nov | Our occ 30/60 (25 Nov) |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 37% | 232 / **292 / 328** / 386 (172) | 292 | 50 / 70% (50 / 68) |
| Shepherd's Bush | P13 | 2 | 47 / 34% | 186 / **220 / 269** / 352 (116) | 220 | 63 / 45% (63 / 48) |
| St John's Wood (4 BR) | P05 | 4 | 50 / 38% | 455 / **573 / 701** / 1,215 (91) | 572 | 70 / 48% (70 / 52) |
| **St John's Wood NW8 (3 BR)** | **3588993 Scott Ellis Gardens (unmapped)** | 3 | 44 / 33% | 316 / **383 / 472** / 617 (148) | 383 | 67 / 45%* (67 / 40) |
| Barking | P04 | 2 | 23 / 17% | 141 / **174 / 210** / 247 (90) | 174 | **33 / 30%** (47 / 37) |
| Canary Wharf | P20 | 2 | 38 / 28% | 214 / **252 / 311** / 422 (148) | 252 | 80 / 52% (77 / 53) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 27% | 218 / **263 / 331** / 436 (144) | 261 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 43 / 32% | 168 / **203 / 230** / 290 (120) | 203 | **83 / 92%** (73 / 87) |
| Marylebone (intentional block, numbers only) | P06 | 2 | 52 / 39% | 317 / **409 / 526** / 658 (217) | 410 | 73 / 87% (97 / 98) |
| Primrose Hill (numbers only) | P14 | 1 | 47 / 33% (`pl_kpis` only) | no row | – | 0 / 0% |
| Greenwich (gone after 26 Nov) | P09 | – | 40 / 29% (`pl_kpis` only) | no row | – | 100 / 100%* |
| Islington / Hanger Lane (handed back) / Woolwich (intentional block) | P08 / P10 / P07 | – | 54/40 · 32/24 · 26/20% (`pl_kpis` only) | no row | – | 100% (blocked) |
| Ladbroke Grove / Bayswater (intentional blocks) | P02 / P03 | – | 51/37 · 52/41% (`pl_kpis` only) | no row | – | 100% (blocked) |

\* Inflated by handback or other blocks.
- **The market was flat day on day.** P50 moved by −£1 (P06) to +£2 (P01); n moved by at most 3; market occ 30 moved by 0–1 point.
- **Our side moved:** P04 occ 30 47 → 33% (the 10–14 Dec Booking.com cancellation); P12 73 → 83% (PriceLabs now shows the 4–6 Dec rebook as Booked, answering yesterday's stale-data gap); 3588993 occ 60 40 → 45% (30 Dec – 3 Jan now shown Booked, see §2).
- There is no `market.csv` row or `pl_kpis` row for Bow/Devons Rd (P15), Little Venice (P16), St John's Wood P17, Fulham (P18) or Kings Langley (P19): not in PriceLabs pulls.

## 2. Items in the brief

### PriceLabs edits since 25 Nov 06:00Z (`get_user_logs`, 25–26 Nov) and `get_listing_date_overrides`
| When (Z, 25 Nov) | Listing | Change (from the log) | Override state today |
|---|---|---|---|
| 10:41:42 | P11 3064196 (+ Vrbo copy) | 23–25 Dec override, percent type, min 2 | **min-stay-only (no price) on 23–25 Dec.** Prices 291 / 267 / 304 → **278 / 256 / 265** (−£63 over 3 n) |
| 17:02:02 | P04 3562176 | 6–26 Dec override, fixed type, min 3 | **min-stay-only (min 3, no price) on 6–26 Dec.** The −5% (6–23 Dec) is gone and 24–26 Dec is back to min 3 (was min 2) |

- **a-reyhan-2011 status:** P04 6–23 Dec −5% → **reverted** (25 Nov 17:02Z; override now carries no price). P04 24–26 Dec min 2 → **reverted to min 3**. **P05 29 Nov – 2 Dec −8%, min 3 → still in place** (override list, updated 24 Nov 10:50:38Z; prices 484 / 473 / 469 / 478). P13 1 Dec: not re-pulled today (policy item). No other edits on 25–26 Nov.
- **P11 23–25 Dec (new, 25 Nov 10:41Z):** the price part of the 23–25 Dec override was removed (min 2 only now). It is the reason P11 23 Dec (the last Round Two darts day) fell £13 and 25 Dec fell £39. This is a PriceLabs price change by Reyhan on a darts night, so it goes to Corentin as **confirm or revert** (the old percentage is not visible in the log).

### P04 Barking: 10–14 Dec reopened and 7–22 Dec (refresh 25 Nov 17:02Z)
The cancelled Booking.com stay 10–14 Dec was £488.35 for 4 n = £122.09/n (`reservations.csv` 25 Nov; Dispatcher).

| Block | Ours today (yday) | Mixed P25 / P50 / P75; est. matched (×1.09) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| **10–13 Dec, reopened** (4 n, min 3) | 175 / 155 / 156 / 147 = **£633** (was Booked) | 510 / **627** / 819; ≈ 683 | −3.6 / +3.6 / +5.9 / +4.6 (17–28%) | **At the mixed P50 (+£6), ≈ £50 under est. matched, £186 under the P75.** £144.65 above what the cancelled stay paid. 2 BR summary P50 × 4 = £696. |
| 7–9 Dec | 174 / 175 / 171 = £520 (£489) | 363 / 453 / 599; ≈ 494 | +1.7 / +2.8 / −5.5 | +£31 overnight (−5% removed); +£67 over the P50 |
| 6 Dec (Jingle Bell Ball Sun) | 174 (163) | 123 / 151 / 204 | −2.6 | +£11; over the P50 |
| 14–22 Dec (9 n) | 141 / 143 / 145 / 148 / 152 / 158 / 156 / 155 / 154 = **£1,352** (£1,353) | 1,160 / **1,415** / 1,840; ≈ 1,542 | −2.5 / −4.7 / −0.4 / +1.4 / +2.5 / +5.4 / +4.9 / +1.3 / +3.1 | **Unchanged (−£1) despite the −5% removal; £63 under the P50 (8 of 9 under), ≈ £190 under est. matched** |
| Horse Show 17–21 Dec | 148 / 152 / 158 / 156 / 155 = **£769** (£770) | 655 / 794 / 1,036; ≈ 865 | +1.4 / +2.5 / +5.4 / +4.9 / +1.3 | £25 under the P50, ≈ £96 under est. matched |
| 23–26 Dec (min now 3) | 156 / 158 / 159 / 177 = **£650** (£705) | 548 / 681 / 849; ≈ 742 | +4.8 / +6.5 / **+8.8** / +1.7 | **−£55 overnight; now £31 under the P50**, ≈ £92 under est. matched, on Barking's most compressed nights |
| **7–22 Dec, 16 open** | **£2,505** | 2,033 / **2,495** / 3,258; ≈ 2,720 | avg +1.3 | level with the P50 (+£10), ≈ £215 under est. matched |

- **Why the −5% removal did not lift 13–25 Dec:** at the same refresh P04's `uncustomized_price` fell, e.g. 16 Dec 177 → 143, 19 Dec 207 → 169, 25 Dec 213 → 171 (raw `prices_3562176.json`, 25 vs 26 Nov). On 6–10 Dec it rose slightly (6 Dec 200 → 202) and the final price went up £10–28. **Why the uncustomized price fell is NOT CONFIRMED.** The cancellation lowered P04's own occupancy (47 → 33%) at the same time. Net: removing the −5% did nothing for 14–22 Dec and 24–25 Dec actually fell £17 / £29.
- **Smoobu ≠ PriceLabs on P04:** 6–10 Dec Smoobu 163 / 163 / 164 / 161 / 165 vs PriceLabs 174 / 174 / 175 / 171 / 175; 11 Dec 174 vs 155; 26 Dec 158 vs 177. P04's raw refresh (17:02:27Z) is the same time as the last push in `listings.csv`. So Smoobu is showing prices from before that refresh, or prices set in Smoobu by hand. This is for the PriceLabs/channel section. The unsynced Barking Airbnb 1455 is for the channel section.

### P11 Camden: 25–27 Nov sold at £140/n vs the Camden market
Source: `reservations.csv` 26 Nov: Booking.com, arrival 25 Nov, departure 27 Nov (2 n), **£280.67 room = £140.34/n**, commission £77.34, booked 25 Nov. Market figures for 25–26 Nov come from the 25 Nov neighbourhood pull (07:24Z, before the sale). The 26 Nov pull no longer prices 25 Nov.

| Measure (25 / 26 Nov) | £ (2 n) | Sale £280.67 vs it |
|---|---|---|
| PriceLabs list then (`prices.csv` 25 Nov) | 207 / 229 = **436**; × 1.15 Booking.com markup = 501.40 | **0.64×** list; 0.56× list × 1.15 |
| Mixed 1–3 BR P25 / **P50** / P75 / P90 | **358** / **458** / 604 / 794 | **0.78× the mixed P25 (−£77); 0.61× the P50 (−£177)** |
| est. matched 2 BR P50 (×1.12, 25 Nov ratio) | ≈ 513 | ≈ 0.55× |
| 2 BR summary P25 / P50 × 2 (`market.csv` 25 Nov) | 462 / 584 | 0.61× / 0.48× |
| Market occ / Δ vs STLY | 67.5 / 70.4%; **−6.9 / −6.1** | – |

- **Read: the stay sold 22% under even the Camden P25, on nights where the market was 68–70% full and ~6 points under STLY.** It was a same-day sale that filled two nights that were open the day before arrival. As revenue it is +£280.67 on otherwise empty nights. As a price it is the lowest point in the Camden distribution. The Booking.com layers (Visibility Booster 18%, Last Minute 10%, stacked promotions) and the 27.6% commission are for the channel section. Policy says promotions explain a low paid rate, so this is a size, not an "unexplained" finding.
- 27–29 Nov are Booked (27 Nov check-in), so the flat is now full 25–29 Nov.
- **30 Nov – 4 Dec rose £147 overnight with no edit:** 226 / 230 / 242 / 259 / 298 = **£1,255** (£1,108). Mixed P50 £1,242 / P75 £1,585; est. matched ≈ £1,379. Δ −3.8 / −3.1 / −3.9 / −0.4 / 0.0. It has gone from £141 under the mixed P50 to **+£13 over it**. 8 Dec orphan 245 → **306** (+50% override; now just over the mixed P75 of 301). The refresh at 26 Nov 06:59Z had no logged edit. The 25–27 Nov sale raising P11's occupancy-based adjustment is a plausible cause, NOT CONFIRMED.

### P11 darts (World Darts Championship, Alexandra Palace) and 3 Jan
| Nights | Ours (yday) | Mixed P50 / P75; est. matched (×1.11) | Occ Δ (occ) | Fortnight £ | Read |
|---|---|---|---|---|---|
| 11–13 Dec (opening weekend) | Booked | – | +4.4 / +4.5 / −0.9 | – | sold |
| **14–17 Dec** Round One (min 2, no price override since 24 Nov) | 208 / 218 / 228 / 248 = **£902** (£902) | 994 / 1,194; ≈ 1,103 | −7.2 / −5.1 / −4.5 / −3.0 (24–30%) | 271.8 | **£298 under the 21 Oct policy level (above £300/n = £1,200)**; £92 under the mixed P50; ≈ £201 under est. matched; soft market |
| 18 Dec | 313 (315) | 278 / 337 | −1.4 | – | above the P50 |
| **23 Dec** Round Two last day | **278** (291) | 283 / 390 | +0.7 (33.4%) | 290.0 | now £5 under the P50 (Reyhan's 25 Nov edit) |
| 24–25 Dec (no darts) | 256 / 265 (267 / 304) | 586 / 811 for 2 n | −3.4 / **−10.0** | 290.0 | £65 under the P50; soft; no event |
| 27 Dec – 2 Jan | Booked (19–22, 26 Dec – 2 Jan) | – | 1 Jan +6.2, 2 Jan +6.4 | – | sold |
| **3 Jan** final | **150** (151) | 217 / 274; ≈ 241 | −1.2 (19.1%) | 164.0 (n=1) | **Still unbookable:** 3–4 Jan `available=False` with no booking status, min 3; 5 Jan Blocked. 3–4 Jan together £314 vs mixed P50 £422 |

### P12 Mile End 30 Nov – 3 Dec (refresh 26 Nov 06:22Z, no logged edit)
- **4–6 Dec now shows Booked in PriceLabs** (4 Dec check-in, min 2); this closes yesterday's gap. The open block before the 13 Dec handback is 30 Nov – 3 Dec (26 Nov is tonight and not in `prices.csv`).
- **30 Nov – 3 Dec (4 open, min 2): 274 / 273 / 279 / 282 = £1,108** (yday £1,022, **+£86 with no edit**). Mixed P25 / P50 / P75 / P90 = 681 / 814 / **1,021** / 1,229; est. matched ≈ £773. Δ −11.1 / −10.9 / −10.2 / −13.6 (40–48%).
- **Read: now above the mixed P75 on all 4 nights (+£87) and ≈ £335 over est. matched**, in the softest stretch of P12's window (Δ −10 to −14). Yesterday it was £19 under the P75. The rise came with the 4–6 Dec booking being picked up, so occupancy-based or orphan logic is a plausible cause, NOT CONFIRMED. The rebooked 4–7 Dec stay (£255.51/n) sold between the Mile End median and P75. The list now asks ~£277/n for nights where the market is 10–14 points weaker.

### 3588993 Scott Ellis Gardens (NW8, 3 BR) vs the NW8 3-bed market
3 BR summary (`market.csv` 26 Nov): P25 316 / **P50 383 / P75 472** / P90 617 (n=148). Base 450 (no base change per the Dispatcher) = 1.17× the 3 BR P50 and 0.95× the P75. Refresh 26 Nov 06:48Z. Still unmapped (not in `id_map.json` or policy; no Smoobu column).
- **30 Dec – 3 Jan now shows Booked in PriceLabs** (30 Dec check-in). Yesterday PriceLabs still showed it open (t-pl-push-1811). This is the existing reservation (Dispatcher: Scott Ellis 2 reservations, unchanged), so it is a sync fix, not a new sale.

| Window (open nights) | Ours £ (yday same nights) | Mixed P25 / **P50** / P75 £ | est. matched P50 £ (×1.04) | Ours vs est. matched | Nights > mixed P75 / < mixed P50 | Avg occ / Δ |
|---|---|---|---|---|---|---|
| 10–20 Dec (10 open; 15 Dec Blocked; 27 Nov – 9 Dec Blocked; 21–25 Dec Booked) | **4,254** (4,379) | 2,917 / **3,678** / 4,868 | 3,825 | **+£429 (1.11×)** | 0 / 1 | 43.6% / **+9.3** (to +16.9 on 19 Dec) |
| 26–29 Dec NYE run-in (4 open, min 4–7) | 2,323 | 1,417 / 1,871 / 2,401 | 1,946 | **+£377 (1.19×)** | 2 (28–29 Dec) / 0 | 55.2% / −0.4 |
| 4–23 Jan (18 open; 6 and 12 Jan Blocked) | 5,738 | 4,185 / 5,320 / 6,775 | 5,533 | +£205 (1.04×) | 0 / 3 | 14.5% / +4.8 |
| **All 32 open nights to 23 Jan** | **12,315** | 8,519 / **10,869** / 14,044 | 11,304 | **+£1,011 (1.09×)** | 2 / 4 | 28.7% / +5.6 |

- **Read: still priced ~9% over the estimated 3 BR median on what is open.** 10–20 Dec fell £125 overnight (e.g. 10 Dec 402 → 337, 11 Dec 457 → 385; 12 Dec rose 460 → 468), to +£429 over est. matched in a market 9.3 points over STLY. This is the compressing stretch of NW8, and the flat gave back price there. 26–29 Dec rose (+£37 to +£43 per night).
- The 27 Nov – 9 Dec Blocked nights show list prices well under yesterday (e.g. 27 Nov 570 → 410), but they are Blocked and are not treated as demand.

### P05 St John's Wood (4 BR): December (refresh 26 Nov 06:48Z)
| Nights | Ours (yday) | 4 BR summary P50 × n (`market.csv`); daily 3–5 BR P50 / P75; est. matched (×1.22) | Occ Δ | Read |
|---|---|---|---|---|
| 29 Nov – 2 Dec (4 open, min 3, **−8% since 24 Nov, still in place**) | 484 / 473 / 469 / 478 = **£1,904** (£1,905) | **2,292**; 1,670 / 2,191; ≈ 2,037 | −1.2 / −1.3 / −1.4 / −3.0 | **£388 under the 4 BR median**, ≈ £133 under est. matched. Soft market (Δ < 0), so not compression. The −8% is still with Corentin as confirm or revert. |
| **7–8 Dec** (min 2, −1%) | 429 / 405 = **£834** (£835) | **1,146**; 862 / 1,138; ≈ 1,052 | **+5.6** / +0.7 | **£312 under the 4 BR median**, ≈ £218 under est. matched; under even the mixed 3–5 BR P50 (−£28) |
| **13–14 Dec** (min 2) | 474 / 471 = **£945** (£960) | **1,146**; 853 / 1,130; ≈ 1,041 | **+10.7 / +4.9** | **£201 under the 4 BR median**, ≈ £96 under est. matched. P05's most compressed open pair, and it fell £15 overnight. |
| 21 Dec orphan (+300%, min 1) | **2,152** (2,193) | 4 BR P90 1,215 | +3.5 | 1.77× the 4 BR P90 |
| 29 Dec orphan (+300%, min 1) | **2,308** (2,247) | 4 BR P90 1,215 | +3.4 | 1.90× the 4 BR P90 |
- Every other December night is Booked.

### P05 Valentine's 13–16 Feb (4 n; beyond `prices.csv`, neighbourhood `final_price`)
| Item | £ (4 n) | Note |
|---|---|---|
| **PriceLabs today (13 / 14 / 15 / 16 Feb)** | **435 / 409 / 415 / 417 = 1,676** (yday 1,683) | **under the −5% override for 1–28 Feb, min 4** (updated 15 Nov 19:14Z, `get_listing_date_overrides`) |
| Fortnight (6–12 + 17–23 Feb, `final_price`) | **422.4/n** | **14 Feb (Sun, Valentine's + Eng v France) £409 = £13.4 under the fortnight.** Only Sat 13 Feb is above (+£12.6). |
| Daily 3–5 BR P25 / P50 / P75 | 1,180 / **1,523** / 2,090 | – |
| est. matched 4 BR P50 (×1.22) | ≈ **1,858** | – |
| 4 BR summary P25 / P50 × 4 | 1,820 / 2,292 | horizon unstated |
| Market occ / Δ | 16.2 / 12.8 / 11.1 / 11.6%; **+7.5 / +2.2 / −0.7 / −0.5** | 79–82 days out |
- **Read unchanged: PriceLabs does not price Valentine's** (it is under the fortnight on the 14th, and a −5% override covers the whole month). The market supports **≈ £1,820–1,858** (4 BR P25 to est. matched P50), **£144–182 above today.** Compression is mild and only on Sat 13 Feb. The −5% Feb override is a PriceLabs discount (a-discount-cut). Availability in Smoobu/Airbnb is NOT CHECKED.

### P20 Waterford Court: 14–18 Dec, 5 Dec, 26 Dec (refresh 26 Nov 06:48Z)
| Block | Ours (yday) | Mixed P50 / P75 / P90; est. matched (×1.14) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 290 / 304 / 302 / 335 / 348 = **£1,579** (£1,581) | 1,095 / 1,366 / 1,813; ≈ 1,248 | **−9.0 / −9.4 / −7.3 / −7.1 / −5.6** (29–32%) | **£213 over the mixed P75 (all 5 nights above), ≈ £331 over est. matched**, in a market 6–9 points under STLY. There is no case to go higher; this is the soft spot. |
| 5 Dec orphan (min 1, +100%) | **562** (588) | 227 / 292 / **408** | +2.2 (61.0%) | **1.38× the mixed P90.** Jingle Bell Ball 5–6 Dec (O2). For Corentin's confirm or revert. |
| 26 Dec orphan (min 1, +100%) | **565** (516) | 249 / 315 / **427** | −0.5 (36.1%) | **1.32× the P90, +£49 overnight.** Disney On Ice from 24 Dec; no compression. |
- Capacity 6 is for the channel section, not checked here.

### P13 Shepherd's Bush: Finals weekend, December, January (twins refreshed 26 Nov 06:09Z; no edit logged 25–26 Nov)
- **27 Nov (Finals Fri: Italy v Fiji, Ireland v Australia), the only open night before 1 Dec:** 260 (263), min 1. Mixed P50 235 / P75 291; occ 77.0%, Δ −4.1. It is **£23.9 over the fortnight (236.1), so it is priced.** 28–30 Nov Booked (England v NZ Sat and Final Sun are covered). Market Δ on 28 / 29 Nov is only +1.9 / +0.2.
- **1 Dec:** 234 (233). Policy item, not raised.
- **13–21 Dec (9 open) on 3064856: 205 / 201 / 199 / 204 / 211 / 224 / 230 / 218 / 220 = £1,912** (yday £1,809, **+£103**).
  - Mixed P50 £2,086 / P75 £2,710; est. matched (×0.93) ≈ £1,940.
  - Δ +7.4 / +6.8 / −2.8 / +3.2 / +6.5 / +7.6 / **+10.9 / +8.3 / +12.1** (27–48%).
  - **Now £174 under the mixed P50 (all 9 nights under) and only ≈ £28 under est. matched.** 19–21 Dec: £668 vs P50 £744 (−£76).
- **The twins swapped places:** 3090701 13–21 Dec fell to **£1,708** (yday £1,863, −£155). It is now **£204 below 3064856** (yesterday it was £54 above). That is ≈ £378 under the mixed P50. Policy says keep the twins slightly different and narrow the gap; today's gap is wider than yesterday's in the other direction.
- 3064856 10–12 Dec now Blocked (232 / 240 / 221). 3090701 2–9 Dec Blocked. These are linked twin bookings under policy, not blocks.
- **January held: 3–23 Jan, 21 open nights, £3,341** (yday £3,349). That is still **£134 under the mixed P25 (£3,475)**, £848 under the P50 (£4,189) and ≈ £555 under est. matched (£3,896). Market occ 12.8%, Δ +2.3. The −8% override on 2–31 Jan is unchanged.
- **14 Feb (Eng v France):** £193 vs fortnight £191.4 (+£1.6), under the −10% override on 1–28 Feb. Mixed P50 210; occ 7.2%, Δ −3.5. It is too early to read.

## 3. Demand calendar, next 90 days (27 Nov – 23 Feb)
**Re-checked 26 Nov 2026 ~07:40Z.** `WebFetch` of www.alexandrapalace.com failed again with `ENOTFOUND`, so I did not try other venue hosts. **Every event fact below is a WebSearch summary restricted to the venue or organiser domain, checked 26 Nov 2026. None is a page read.**

- **Twickenham (Allianz Stadium) Finals Weekend, Fri 27 – Sun 29 Nov.** Sources: [Finals page](https://allianzstadiumtwickenham.com/nations-championship), [What's on](https://allianzstadiumtwickenham.com/whats-on), [England team v NZ](https://www.englandrugby.com/follow/news-and-media/england-team-face-new-zealand-nations-championship-finals-weekend), [Sun visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information).
  - Fri 27: Italy v Fiji 16:40; Ireland v Australia 20:10.
  - Sat 28: Wales v Japan 13:10; **England v NZ 16:40** (ITV1).
  - Sun 29: Scotland v Argentina 13:10; **France v South Africa Final 16:40**.
  - Conflict persists: the Sunday visit page gives 15:10 / 18:40.
- **England v France, Sun 14 Feb 2027, 15:10 GMT, Allianz Stadium.** Sources: [Six Nations fixture](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510), [Six Nations 2027 schedule](https://www.sixnationsrugby.com/en/m6n/news/mens-six-nations-2027-fixtures-and-schedule-confirmed), [England Rugby clubs page](https://help.englandrugby.com/support/solutions/articles/103000347582-information-for-clubs-for-guinness-men-s-six-nations-2027). One page carries a stray "20:10 GMT Stade de France" snippet from another fixture.
- **World Darts Championship, Alexandra Palace, Fri 11 Dec – Sun 3 Jan.** Sources: [Ally Pally schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [event](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [PDC calendar](https://www.pdc.tv/calendar/), [PDC ticket prices](https://www.pdc.tv/news/2026/august/07/2026-27-paddy-power-world-darts-championship-ticket-prices-confirmed/), [PDC ballot](https://www.pdc.tv/news/2026/august/06/paddy-power-world-darts-championship-tickets-to-be-allocated-by-ballot-for-the-first-time/).
  - Round One from 11 Dec; Round Two to 23 Dec; Round Three from Sun 27 Dec.
  - **No sessions 24–26 Dec.** This is still inferred from the day-by-day table jumping from 23 to 27 Dec; no source says it in words.
  - SF 2 Jan; **final 3 Jan 20:00**. Tickets "sold out" (search summary). No attendance figure was found today (yesterday's "180,000 target" was not re-found, so it is left out).
  - Conflict: a PDC registration page gives 4 Jan as the end date.
- **The O2 arena.** Sources: [listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Jingle Bell Ball](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [Disney On Ice](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic), [Pete Tong Ibiza Classics](https://www.theo2.co.uk/events/detail/pete-tong-presents-ibiza-classics-2026), [The Darkness](https://www.theo2.co.uk/events/detail/the-darkness-2026), [Greg Davies](https://www.theo2.co.uk/events/detail/greg-davies).
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec** (doors 16:30).
  - **Pete Tong Ibiza Classics Fri 11 – Sat 12 Dec**; **RnB Winter Ball Sun 13 Dec** (18:00). These are relevant now that P04 10–13 Dec is open again.
  - The Darkness Wed 16 Dec; Greg Davies Thu 17 Dec (one index page says 16 Dec); Kasabian 18; Culture Club 19 Dec.
  - **Disney On Ice 24 Dec – 3 Jan.**
  - Bryson Tiller 7 Dec and Kehlani 8 Dec appear in today's summary, but the event set keeps Kehlani as UNVERIFIED because sources conflict on the date (29 Nov vs 8 Dec). **Conflicts, UNVERIFIED:** Mariah Carey 1–2 Dec vs Phoebe Bridgers 1–2 Dec (today Phoebe Bridgers 3 Dec, yesterday UB40 3 Dec); Jingle Bell Ball 19 Dec (one page).
- **ExCeL.** Sources: [Horse Show (ExCeL)](https://www.excel.london/whats-on/london-international-horse-show), [londonhorseshow.com](https://londonhorseshow.com/), [what's on](https://www.excel.london/whats-on), [MegaCon](https://www.excel.london/visitor/whats-on/megacon-live), [Cisco Live news](https://www.excel.london/news/cisco-live-returns-to-excel-london), [Cisco Live page](https://www.excel.london/mobile/visitor/whats-on/cisco-live-2027).
  - **London International Horse Show Thu 17 – Mon 21 Dec** (older pages give 18–22 or 13–18 Dec; earlier years).
  - EAG Expo 12–14 Jan; **MegaCon 23–24 Jan**; Festival of Genomics 27–28 Jan.
  - **Cisco Live 8–12 Feb** (news: whole 125,000 sqm venue); the venue page says 7–12 Feb.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 – Fri 1 Jan 00:30. Ticketmaster only, max 4; £20/£35 for Londoners, £40/£55 for others. Final-batch release date conflicts (20 vs 24 Nov press releases). No attendance figure stated.
- **Valentine's Day:** Sun 14 Feb 2027 (calendar).

Effect = Occ Δ (compression ≥ +5, soft ≤ −2). Properties come from VENUES in `build/properties.py`: Twickenham P18/P10/P13/P16; O2 P01/P09/P07/P04; ExCeL P01/P04/P07/P15; Alexandra Palace P08/P11. P20, P12 and 3588993 are not in VENUES; I group P20 with P01 for O2/ExCeL. Blocked, handed-back or not-pulled VENUES properties are named only: P01 is blocked 30 Nov – 17 Dec and gone after 20 Dec; P09 is gone after 26 Nov; P08/P10 are handed back; P07 is an intentional block; P15/P16/P18 are not pulled. "vs fortnight" = `prices.csv` 26 Nov vs the fortnight mean (`out26.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 27 Nov | Finals Fri | Twickenham | P13 | −4.1 soft (77.0%) | 260 vs 236.1 | **yes** (+£23.9) |
| 28–29 Nov | Finals Sat/Sun | Twickenham | P13 booked; P11 booked 25–29 | P13 +1.9 / +0.2 | – | – |
| 1–3 Dec | O2 concerts (UNVERIFIED, conflicting) | O2 | P04 1 Dec (2 Dec policy override) | – | not in event set | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec; P04 6 Dec | P20 +2.2; P04 −2.6 | P20 562 vs 313.5; P04 174 vs 168.2 | P20 yes (manual, 1.38× P90); P04 yes (+£5.8) |
| 7–9 Dec | O2 concerts (Kehlani UNVERIFIED) | O2 | P04 | +1.7 / +2.8 / −5.5 | 8 Dec 175 vs 164.7 | (UNVERIFIED label) |
| **11–13 Dec** | Pete Tong (11–12), RnB Winter Ball (13); darts opens 11 Dec | O2 / Ally Pally | **P04 (reopened)**; P11 booked | P04 +3.6 / +5.9 / +4.6 | **P04 155 / 156 / 147 vs 164.6** | **no** (−£9.6 / −£8.6 / −£17.6; outside the 17 Nov headline set) |
| 14–17 Dec | Darts Round One; Darkness 16, Greg Davies 17 | Ally Pally / O2 | P11; P04; P20 | P11 −7.2 / −5.1 / −4.5 / −3.0; P20 −9.4 to −7.1 soft | P11 **208 / 218 / 228 / 248** vs 271.8; P20 16 Dec **302** vs 312.9 (17 Dec 335 above); P04 16 Dec **145** vs 157.5 | **P11 no**; P20 16 Dec no (but over the P75, soft); P04 16 Dec no |
| 17–21 Dec | Horse Show | ExCeL | P04 (P20 by proximity) | P04 +1.4 / +2.5 / +5.4 / +4.9 / +1.3 | P04 **148 / 152** / 158 vs 157.5 (17–19); 156 / 155 vs 139.9 (20–21) | **17–18 Dec no**; 19 Dec level; 20–21 yes; **under the mixed P50 (−£25)** |
| 13–21 Dec | pre-Christmas (no single event) | London | P13; P05 13–14; 3588993 | P13 to **+12.1**; P05 **+10.7** / +4.9; 3588993 to **+16.9** | P13 £1,912 vs P50 £2,086; P05 £945 vs 4 BR median £1,146; 3588993 £4,254 vs est. P50 £3,825 | **P13, P05 no** (under the median); 3588993 yes |
| 20–26 Dec | Christmas; Disney On Ice from 24 | O2 | P04 (7 n open) | +4.9 / +1.3 / +3.1 / +4.8 / +6.5 / +8.8 / +1.7 | £159.3/n vs fortnight 139.9 | yes vs the fortnight; **under the mixed P50 on 23–26 (−£31)** |
| 23 Dec | Darts Round Two (last day) | Ally Pally | P11 | +0.7 | **278** vs 290.0 | **no** (−£12.0, after Reyhan's 25 Nov edit) |
| 24–26 Dec | Christmas (**no darts**, inferred) | – | P11 24–25 | −3.4 / −10.0 soft | 256 / 265 vs 290.0 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | −0.5 | 565 vs 315.3 | yes (manual, 1.32× P90) |
| 27 Dec – 2 Jan | NYE; darts R3–SF | Embankment / Ally Pally | P04, P11, P20, P13 taken; 3588993 26–29 Dec open, 30 Dec – 3 Jan Booked | 31 Dec: 3588993 +5.7, P13 +18.3, P20 +7.6 | 3588993 26–29 Dec £2,323 vs est. P50 £1,946 | 3588993: priced (+19%) |
| 3 Jan | Darts final | Ally Pally | P11 (**unbookable**) | −1.2 | 150 vs 164.0 (n=1) | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | +8.4 / +6.0 (13.4 / 9.1%) | **226 / 222** vs 240.3 | **no** (−£14.3 / −£18.3; beyond the 17 Jan headline) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | P20 +3.9 … +0.8; P04 +1.3 … −5.0 (2–6%) | P20 259 / 252 / 246 / 248 / 274 vs 256.4; P04 163 / 163 / 161 / 159 / 171 vs 161.2 | level / slightly under (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | P05 | +7.5 / +2.2 / −0.7 / −0.5 | 435 / **409** / 415 / 417 vs 422.4 | **no** (−5% Feb override) |
| 14 Feb | Eng v France 15:10 | Twickenham | P13 | −3.5 soft (7.2%) | 193 vs 191.4 | level (+£1.6; −10% Feb override) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same method and 17 Nov event set, nights 27 Nov – 17 Jan. 25 Nov values are in brackets.

| Ref | Night(s) | Event | Ours 26 Nov (25 Nov) | Fortnight £ (25 Nov) | Gap £ (25 Nov) |
|---|---|---|---|---|---|
| P04 | 16 Dec | Horse Show week | 145 (146) | 157.5 (147.8) | 12.5 (1.8) |
| **P04** | **17, 18 Dec** | Horse Show (**new today**) | 148, 152 (149, 153) | 157.5 (147.8) | **9.5, 5.5** (−1.2, −5.2: not missed) |
| P20 | 16 Dec | Darkness / Horse Show | 302 (302) | 312.9 (314.4) | 10.9 (12.4) |
| **P11** | **14–17 Dec** | Darts Round One | **208, 218, 228, 248** (207, 218, 228, 249) | 271.8 (266.7) | **63.8, 53.8, 43.8, 23.8** (59.7, 48.7, 38.7, 17.7) |
| P11 | 23, 24 Dec | Darts (no play on 24th) | 278, 256 (291, 267) | 290.0 (293.2) | 12.0, 34.0 (2.2, 26.2) |
| **P11** | **25 Dec** | Darts block (no play, inferred) (**new today**) | 265 (304) | 290.0 (293.2) | **25.0** (−10.8: not missed) |
| P11 | 3 Jan | Darts final (unbookable) | 150 (151) | 164.0, n=1 (163.0) | 14.0 (12.0) |
| | | **Total, same event set** | | | **12 nights / £308.6** (25 Nov **9 / £219.4**) |
| | | Bookable now (excl. P11 3 Jan) | | | 11 / £294.6 (25 Nov 8 / £207.4) |
| | | Bookable and on event nights (excl. P11 3 Jan, 24 and 25 Dec) | | | **9 / £235.6** (25 Nov 7 / £181.2) |

**Change vs yesterday: +3 nights / +£89.2** (219.4 → 308.6; `cmp26.py` on `m25/out25.txt` vs `m26/out26.txt`).
- **The same 9 nights: +£49.2.**
  - Price effect +£26.0: P11 23 Dec −13 and 24 Dec −11 (+£24, Reyhan's 25 Nov 23–25 Dec edit); P04 16 Dec −1, P11 17 Dec −1, P11 3 Jan −1 (+£3); P11 14 Dec +1 (−£1).
  - Fortnight drift +£23.2: P04 16 Dec +9.7 (9 and 10 Dec rose 161 → 171 and 147 → 175 when the −5% came off and 10 Dec reopened); P11 Round One +5.1 × 4; P11 23–24 Dec −3.2 × 2; P11 3 Jan +1.0; P20 16 Dec −1.5.
- **3 new nights: +£40.0:** P04 17 Dec £9.5 and 18 Dec £5.5 (fortnight up, prices −£1); P11 25 Dec £25.0 (price 304 → 265 after the 23–25 Dec edit).
- Check: 26.0 + 23.2 + 40.0 = 89.2. Matches.
- **Not counted** (outside the 17 Nov set or beyond 17 Jan):
  - **P04 11–13 Dec (Pete Tong / RnB Winter Ball, O2), reopened by the cancellation: £9.6 + £8.6 + £17.6 = £35.8**;
  - P20 23 / 24 Jan (MegaCon) £14.3 / £18.3;
  - P20 9–11 Feb £4.4 / £10.4 / £8.4; P04 10–11 Feb £0.2 / £2.2 (Cisco Live);
  - **P05 14 Feb Valentine's £13.4** (outside the venue set). P13 14 Feb is level (−£1.6).

**Read with care:**
- **£185.2 of the £308.6 is P11 Round One 14–17 Dec**, in a market below STLY (Δ −7.2 to −3.0). The fair reference is the policy level (£1,200 vs £902, gap £298).
- **£71.0 is P11 23–25 Dec.** Reyhan's 25 Nov removal of the 23–25 Dec price override cut 23 / 24 / 25 Dec by £13 / £11 / £39, which added £24 to the existing gaps and put 25 Dec (£25.0) on the list. 24–25 Dec are no-darts nights in a soft market (Δ −3.4 / −10.0), so only 23 Dec (£12.0) is a real event night.
- **P04 16–18 Dec (£27.5)** is driven mostly by the fortnight rising (n=4: 9, 10, 14, 15 Dec), not by our prices falling. Against the market, P04 Horse Show 17–21 Dec is still −£25 under the mixed P50, the same as yesterday.
- **The larger under-market items sit outside this headline:**
  - P13 3–23 Jan: −£848 vs the mixed P50, still under the P25.
  - P05 7–8 Dec −£312 and 13–14 Dec −£201 vs the 4 BR median (Δ +10.7); P05 29 Nov – 2 Dec −£388 (−8% edit).
  - P13 13–21 Dec −£174 vs the mixed P50 (better than yesterday's −£277); 3090701 −£378.
  - P04 23–26 Dec −£31 vs the P50 (Δ to +8.8).
  - P05 Valentine's £144–182.
- **On the other side:** P12 30 Nov – 3 Dec (+£87 over the mixed P75, Δ −11.4), P20 14–18 Dec (+£213 over the mixed P75, Δ −7.7) and the P20 / P05 orphans (1.3–1.9× P90) are priced above a soft or flat market.

Data gaps:
1. **Market source:** PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedrooms, so "est. matched" figures are ratio estimates. No Market Dashboard or Competitor Listings were pulled. Not pulled: P09/P14, P02/P03/P07/P08/P10/P15–P19. 3588993 is not in `id_map.json` or policy.
2. **Unexplained overnight moves with no logged edit:** P12 30 Nov – 3 Dec +£86, P11 30 Nov – 4 Dec +£147 and 8 Dec +£61, P13 twins swapping (+£103 / −£155), 3588993 10–20 Dec −£125. The 26 Nov 06:09–06:59Z refreshes have no edit in `get_user_logs`; whether they came from Sync Now or a delayed batch is NOT CHECKED. Cause per listing NOT CONFIRMED (customizations not re-pulled today).
3. **P04:** why `uncustomized_price` fell 13–25 Dec at the 25 Nov 17:02Z refresh is NOT CONFIRMED. Smoobu differs from PriceLabs on 6–11 Dec and 24–26 Dec (`prices.csv` 26 Nov); which side is stale is for the PriceLabs/channel sections.
4. **P11 25–27 Nov sale:** market for 25 Nov is from the 25 Nov pull (the 26 Nov pull no longer prices past dates). Booking.com layers and the 27.6% commission are NOT CHECKED here (channel section). The old value of the removed 23–25 Dec override is not visible in the log.
5. **P05 Valentine's / Feb:** availability is NOT CHECKED; Feb prices are neighbourhood `final_price`, not `prices.csv`.
6. **Events** are domain-restricted search summaries, not page reads. www.alexandrapalace.com failed with ENOTFOUND (yesterday also allianzstadiumtwickenham.com, www.london.gov.uk, www.sixnationsrugby.com). These hosts must be allowed in the session's network settings for page reads (plus www.theo2.co.uk, www.excel.london, www.pdc.tv). Open conflicts:
   - Finals Sunday 16:40 vs 18:40;
   - darts end 3 vs 4 Jan;
   - "no darts 24–26 Dec" is inferred from the schedule, not stated;
   - Greg Davies 16 vs 17 Dec; Jingle Bell Ball 19 Dec (one page); early-December O2 line-up (Mariah Carey / Phoebe Bridgers / UB40); Kehlani 8 Dec vs 29 Nov;
   - Cisco Live 7–12 vs 8–12 Feb;
   - NYE final-ticket release 20 vs 24 Nov.

   No attendance figure is stated in any source used today.
