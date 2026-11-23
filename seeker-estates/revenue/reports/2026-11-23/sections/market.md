# Market & demand calendar: run D = 2026-11-23 (window 24 Nov 2026 – 21 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P04 2 Dec +200%; P13 1 Dec +50% (intentional_overrides); P04 never under 3 nights.
- **PriceLabs calls today: all read-only, strictly one at a time (never two in one message):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:20–07:23Z, in this order: 3588993 Scott Ellis Gardens, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P06 3288517, P12 2699998, P01 3320302. Each file checked (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved to `scratchpad/m23/neigh_<id>.json`.
  - `get_user_logs` (listing, 22–23 Nov): **15 entries, all Reyhan** (below).
  - `get_listing_date_overrides` P04 from 24 Nov.
- **`market.csv`:** `data/snapshots/2026-11-23/market.csv` existed as a straight copy of 22 Nov (43 lines, identical). I appended 9 rows dated 23 Nov under `.market.csv.lock` (now 52 lines; `scratchpad/m23/wmarket23.py`), then corrected the pull time in my own 9 rows to 07:20–07:23Z under the same lock. All market figures below come from the 23 Nov rows.
- **Prices:** `prices.csv` 23 Nov, column `pricelabs_price`, 24 Nov – 22 Jan. **Refresh times (`raw/prices_<id>.json`): all overnight, 23 Nov 00:07–00:20Z** (P11 00:07:33, P13 00:10:05, P05 00:10:58, P06 00:11:31, P04 00:15:14, P20 00:15:15, 3588993 00:20:25). These follow Reyhan's edits at 00:07–00:17Z one-for-one, so the "overnight refresh" was most likely edit-triggered, not a schedule change (inference). "yday" = 22 Nov `prices.csv`. After 22 Jan I use the neighbourhood `final_price`. Smoobu = PriceLabs on every night quoted (3588993 has no Smoobu column).
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. **Bedroom caveat:** daily P25–P90 mix bedrooms (1–3 BR for P04, P11, P20, P01, P06; 2–3 BR P13, P12; 3–5 BR P05; 2–4 BR 3588993). "est. matched" = mixed P50 × (summary bedroom P50 ÷ mean daily mixed P50, 24 Nov – 23 Dec). **Estimates.** Ratios today: P04 1.10, P13 0.95, P11 1.13, P05 1.26, P20 1.14, P12 0.97, P01 1.14, P06 1.02, 3588993 1.06.
- **Fortnight method:** unchanged (`scratchpad/m23/analyse23.py` = `m22/analyse22.py` with the cut-off moved to 24 Nov, the first date in `prices.csv`). Same 17 Nov event set and exclusions. Output `scratchpad/m23/out23.txt`; comparison `scratchpad/m23/cmp23.txt` (same `cmp21.py` logic); block detail `scratchpad/m23/items23.txt`, `blocks23.txt`.

## 1. Submarket table
P25 / P50 / P75 / P90 (n): `market.csv` 23 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched). Mkt occ 30/60: `market.csv` `market_occ_30/60` (= `pl_kpis.csv` 23 Nov). Our occ: `pl_kpis.csv` `occupancy_next_30/60`. Brackets = 22 Nov.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 22 Nov | Our occ 30/60 |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 51 / 38% (51/38) | 233 / **292 / 332** / 390 (171) | 293 | 50 / 67% (47/40) |
| Shepherd's Bush | P13 | 2 | 47 / 35% (47/36) | 187 / **220 / 270** / 351 (117) | 222 | 63 / 50% (67/53) |
| St John's Wood (4 BR) | P05 | 4 | 50 / 40% (49/40) | 460 / **582 / 704** / 1,217 (90) | 582 | 70 / 53% (73/57) |
| **St John's Wood NW8 (3 BR)** | **3588993 Scott Ellis Gardens (unmapped)** | 3 | 45 / 35% (45/35) | 317 / **384 / 475** / 618 (148) | 389 | 37 / 25% (37/20) |
| Barking | P04 | 2 | 23 / 18% (22/18) | 142 / **175 / 211** / 248 (89) | 174 | 50 / 38% (43/35) |
| Canary Wharf | P20 | 2 | 38 / 29% (38/29) | 218 / **253 / 320** / 422 (149) | 253 | 73 / 53% (70/55) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 27% (34/27) | 218 / **262 / 337** / 430 (145) | 261 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 44 / 33% (45/34) | 172 / **205 / 235** / 291 (117) | 205 | 83 / 92%* |
| Marylebone (intentional block, numbers only) | P06 | 2 | 52 / 39% (52/40) | 321 / **414 / 528** / 664 (215) | 412 | 93 / 97%* |
| Primrose Hill (numbers only) | P14 | 1 | 47 / 35% (pl_kpis) | no row | – | 0 / 0% |

\* Inflated by a handback or blocks.
- **Market flat day on day:** P50 moved −£5 (3588993) to +£2 (P06); n moved by at most 1.
- P11 our occ 60 jumped 40 → 67%: 5–22 Jan is now **Blocked** in PriceLabs (new since 22 Nov; who/why NOT CHECKED), which also strands 3–4 Jan (2 nights under min 3).
- P04 our occ 30 43 → 50% = the new Booking.com 10–14 Dec stay. P06 30-day 73 → 93% = the two new Airbnb stays.
- No `market.csv` row for Greenwich, Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington (not pulled).

## 2. Items in the brief

### PriceLabs edits since 22 Nov 06:00Z (`get_user_logs`, all Reyhan)
| When (Z) | Listing | Change |
|---|---|---|
| 22 Nov 09:18:27 | 3588993 | **base 425 → 475** |
| 23 Nov 00:07:04 | P11 3064196 (+Vrbo copy) | 23–26 Nov **min 2, no price** |
| 23 Nov 00:07:45 | P13 3064856 (+3090701, Vrbo) | 14–16 Dec **−2%**, min 2 |
| 23 Nov 00:07:55 | P13 (+twin, Vrbo) | 20–21 Dec **min 2, no price** |
| 23 Nov 00:08:04 | P13 (+twin, Vrbo) | **2–31 Jan −8%**, min 3 |
| 23 Nov 00:11:07 | P06 3288517 | **2 Dec +25%, min 1** (the orphan between the two new stays) |
| 23 Nov 00:14:34 | P04 3562176 | **6–23 Dec −2%**, min 3 (replaces the −5%; confirmed by `get_listing_date_overrides`, updated 00:14:34Z) |
| 23 Nov 00:17:37 | 3588993 | **base 475 → 450** |

- So the base "425 → 450" in the pull notes is two edits (425 → 475 on 22 Nov 09:18Z, → 450 on 23 Nov 00:17Z), both Reyhan.
- **P04 7–19 Dec +20% was not applied.** Reyhan moved the block from −5% to −2%. 24–26 Dec +5% min 2 (20 Nov) and 24 Nov −5% stay live.

### 3588993 Scott Ellis Gardens (NW8, 3 BR, base 450) vs the NW8 3-bed market
3 BR summary: P25 317 / **P50 384 / P75 475** / P90 618 (n=148). **Base 450 = 1.17× the 3 BR P50 and 0.95× P75.** Daily figures mix 2–4 BR; est. matched = mixed P50 × 1.06. Price = `uncustomized_price` on every night (no price overrides).

| Window (open nights) | Ours £ | Mixed P25 / **P50** / P75 £ | est. matched P50 £ | Ours vs est. matched | Nights > mixed P75 / < mixed P50 | Avg occ / Δ |
|---|---|---|---|---|---|---|
| 24 Nov – 23 Dec (19 open, 8 Blocked, 3 Booked) | **7,521** (avg 396) | 5,404 / **6,883** / 9,075 | 7,296 | **+£225 (1.03×)** | 0 / 1 | 46.5% / +6.5 |
| 24 Dec – 22 Jan (27 open) | **10,564** (avg 391) | 7,109 / **9,287** / 11,930 | 9,844 | +£720 (1.07×) | 4 / 1 | 25.4% / +5.0 |
| **All 46 open nights** | **18,085** (avg 393) | 12,513 / **16,170** / 21,005 | 17,140 | **+£945 (1.06×)** | 4 / 2 | 34.1% / +5.6 |
| 13–20 Dec (7 open) | 2,978 | 2,035 / 2,610 / 3,457 | 2,767 | +£211 (1.08×) | 0 / 0 | 40.5% / **+12.4** |
| 26–31 Dec NYE (6 open, min 4–7) | 3,515 (497–642) | 2,107 / 2,891 / 3,636 | 3,064 | **+£451 (1.15×)** | **3** (29–31 Dec) / 0 | 53.2% / **+1.3** |
| 5–22 Jan (17 open) | 5,384 (avg 317) | 3,940 / 5,000 / 6,464 | 5,300 | +£84 (1.02×) | 0 / 1 | 13.8% / +5.1 |

- **Read: the base rise flipped the listing from ≈7% under to ≈6% over the estimated 3 BR median** (yesterday −£1,370 over 50 open nights at 0.93×; today +£945 over 46 at 1.06×). Prices rose £2,371 over the 60 nights in `prices.csv` (21,298 → 23,669).
- Next 30 days and 13–20 Dec (Δ +12.4) now sit near/just over the est. matched P50 and under the mixed P75 — supported by a market running above STLY.
- **NYE 26–31 Dec is where it now looks rich:** £451 over the est. matched P50 and above the mixed P75 on 29–31 Dec (642 / 636 / 637 vs 626 / 611 / 591), while the market there is only +1.3 points on STLY (51–56% occupied). That is a fact, not a proposal (unmapped; t-scott-ellis-2011).
- **First reservation (PriceLabs `booked_date` 22 Nov): 21–26 Dec, 5 nights, ADR £296.35 → ≈ £1,481.75 room (ADR × 5, estimate).** List on the booking day (`booked_price`) 428 / 426 / 468 / 461 / 466 = £2,249 → **paid ≈ 0.66× list**. Market for those nights: mixed P25 £1,609 / P50 £2,092; est. matched 3 BR P50 £2,218; Δ +9.4 / +8.0 / +10.6 / +8.9 / −2.2. **The sale was ≈ £127 under the mixed P25 and ≈ £736 under the est. matched P50 on compressed Christmas nights.** Channel and discount layers NOT CHECKED (the reservation is not in `reservations.csv`; Smoobu apartment unmapped). 0.66× is close to the 0.72× Airbnb factor (20% special offer) seen 21 Nov plus a stay-length layer — inference only.
- `user_price` ≠ `price` on some open nights (20 Dec 408 vs 427; 26 Dec 506 vs 497). Which one reached Smoobu is NOT CHECKED.

### P06 Marylebone 29 Nov – 6 Dec: were the two sales under market? (numbers only; P06 is an intentional-block flat)
| Stay (Airbnb, booked 22 Nov) | Paid room £ (/n) | List on booking day (22 Nov `prices.csv`) | Mixed P25 / P50 / P75 £; est. matched (×1.02) | 2 BR summary P25 / P50 × 3 | Occ / Δ | Read |
|---|---|---|---|---|---|---|
| **29 Nov – 2 Dec** (3 n, 7 days out) | **513.04** (171) | 286+271+304 = **861** → **0.60×** | 859 / **1,132** / 1,431; 1,155 | 963 / 1,242 | 47–52%; **−6.0 / −11.0 / −4.1** | **Under market: 0.60× the mixed P25, 0.45× the mixed P50.** List itself sat at the mixed P25 (861 vs 859). |
| **3 – 6 Dec** (3 n, 11 days out) | **768.82** (256) | 323+358+359 = **1,040** → **0.74×** | 1,015 / **1,277** / 1,597; 1,303 | 963 / 1,242 | 58–68%; **−7.3 / −7.6 / −1.9** | **Under market: 0.76× the mixed P25, 0.60× the mixed P50.** List was £237 under the mixed P50. |

- **Yes, both sales were under market — under even the bottom quartile.** Two layers: (1) PriceLabs listed at about the mixed P25 (−£271 and −£237 vs the mixed P50) in a market 2–11 points **below** STLY; (2) the channel then took a further 26–40% (cause — last-minute/LOS rules, special offer, hidden layers — is for the channel section; NOT CHECKED here).
- After the overnight refresh the booked nights now show 352/339/340 and 410/410/421 (£1,031 / £1,241) — irrelevant to the sale, but it means the 22 Nov list was not the high point.
- **2 Dec orphan:** Reyhan set +25% min 1 (00:11Z): **349** vs mixed P50 392 / P25 306 (Δ −1.8). Now £43 under the mixed P50; bookable as a 1-night.

### P04 Barking 10–14 Dec on Booking.com (£488.35 = £122/n)
| Item | 4 nights £ |
|---|---|
| Paid (room; commission £92.60) | **488.35 (£122.09/n)** |
| Smoobu/PriceLabs list on 22 Nov | 141+148+150+141 = **580** → **0.84×** |
| Mixed 1–3 BR P25 / **P50** / P75 (10–13 Dec) | 511 / **637** / 826 |
| est. matched 2 BR P50 (×1.10) | ≈ 701 |
| 2 BR summary P25 / P50 × 4 | 568 / 700 |
| Market occ / Δ | 12.3 / 21.6 / 23.5 / 18.3%; −7.7 / +1.1 / +1.6 / +1.9 |

- **Read: under market** — 0.96× the mixed P25, 0.77× the mixed P50, £80 under the 2 BR summary P25 (£142/n). The list (£580) was itself £57 under the mixed P50, so most of the gap to market is the channel (0.84× list vs the ≈1.15× markup), not PriceLabs. The market here is thin (12–24% occupied, Δ near zero), so P50 is the realistic ceiling, not P75.
- Today, after the −2% edit, the same 4 nights list at **£630** (+£50).

### P04 Barking: 7–19 Dec and 20–26 Dec (refresh 23 Nov 00:15Z, after −5% → −2%)
| Block | Ours today (yday) | Mixed P50 / P75; est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|
| **7–19 Dec, 9 open nights** (7–9, 14–19; 10–13 now Booked) | 170 / 171 / 150 / 146 / 149 / 152 / 154 / 159 / 164 = **£1,415** (£1,269, **+£146**) | **1,402 / 1,828**; ≈ 1,542 | 0.0 / +1.4 / **−8.3** / −4.0 / −5.5 / −1.4 / +0.5 / +3.8 / +5.4 (12–26%) | **Now level with the mixed P50 (+£13), ≈ £127 under the est. matched P50.** The −2% edit plus the refresh did most of the +20% idea's job on 7–8 Dec (+30/+31) but only +£11–13/night on 14–19 Dec. Market support for +20% (≈ £1,700) is not there: it would sit near the mixed P75 on 12–26% occupancy. |
| Horse Show 17–19 Dec | 154 / 159 / 164 = £477 (£442) | 482 / 622; ≈ 530 | +0.5 / +3.8 / +5.4 | at the mixed P50; above the fortnight (149.5) → priced |
| **20–26 Dec** (min 3/3/3/3/2/2/2) | 161 / 161 / 160 / 163 / 187 / 190 / 187 = **£1,209** (£1,207) | **1,166 / 1,471**; ≈ 1,283 | +6.1 / +2.6 / +2.3 / +4.0 / +5.7 / **+9.3** / +3.0 (20–29%) | **+£43 over the mixed P50, ≈ £74 under the est. matched P50, £262 under P75.** 20–21 Dec +11 each, 22–23 Dec −6/−7 (now −2% instead of a −5%/+5% mix; exact prior setting on 22 Dec NOT CHECKED). Supports ≈ est. matched P50, not P75. |

### P20 Waterford Court: 14–18 Dec, 5 / 26 Dec (refresh 23 Nov 00:15Z)
| Block | Ours (yday) | Mixed P50 / P75; est. matched P50 | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 284 / 302 / 298 / 331 / 346 = **£1,561** (£1,557) | 1,103 / 1,392; ≈ 1,257 | **−13.8 / −12.9 / −10.4 / −9.7 / −8.0** (25–29%) | **£169 over the mixed P75 and ≈ £304 over the est. matched P50**, in a market 8–14 points under STLY (softer than yesterday). No case to go higher; if anything this is the soft spot. |
| 5 Dec orphan (min 1, +100%) | **591** (520, +71) | P50 228 / P75 294 / **P90 396** | +4.1 (57.4%) | **1.49× the mixed P90** (unc rose 406). Jingle Bell Ball 5–6 Dec (O2). Fact for Corentin's confirm/revert. |
| 26 Dec orphan (min 1, +100%) | **508** (539) | P50 250 / P75 320 / **P90 413** | −0.1 (35.2%) | **1.23× the P90.** Disney On Ice from 24 Dec; no compression. |
| 24 Nov (tomorrow, min 2, open) | **228** (271, −43) | 213 / 269; ≈ 243 | **−10.4** (50.6%) | Last-minute drop; above the mixed P50 in a soft market. Counted below (Jungle). |

### P11 Camden: 30 Nov – 4 Dec, darts, 3 Jan (refresh 23 Nov 00:07Z)
| Nights | Ours (yday) | Mixed P50 / P75; est. matched | Occ Δ (occ) | Read |
|---|---|---|---|---|
| **30 Nov – 4 Dec** (min 2) | 187 / 185 / 192 / 224 / 249 = **£1,037** (£1,044) | **1,257 / 1,600**; ≈ 1,420 | −2.0 / −2.4 / −2.6 / +1.2 / +2.0 (43–72%) | **£220 under the mixed P50, £57 over the mixed P25.** Market ≈ STLY. Supports ≈ P50 (+£220), not more. |
| 8 Dec orphan (min 1) | **233** (305, **−72**) | 256 / 309 | +6.6 (39%) | Now £23 under the mixed P50; unc fell (≈269 → 205). No log entry for P11 8 Dec — cause NOT CHECKED. |
| **14–17 Dec** Round One (min 2) | 206 / 215 / 225 / 248 = **£894** (£918, −24) | 1,003 / 1,197; ≈ 1,133 | −5.2 / −1.9 / −0.2 / +2.8 (23–30%) | **£306 under the policy level** (21 Oct: above £300/n = £1,200). £109 under the mixed P50; ≈ £239 under est. matched. |
| 18 Dec | 314 (324) | 279 / 336 | +0.8 | above P50 |
| **23 Dec** Round Two | **290** (266, **+24**) | 284 / 390 | −0.9 (31.6%) | now above the mixed P50 (+£6) |
| 24–25 Dec (**no darts**) | 280 / 291 (242 / 251) | 288 / 401; 307 / 416 | −5.0 / −9.0 | +£38/+£40 overnight; near the mixed P50 in a market below STLY. No event. |
| **3 Jan** final | **144** (157) | 221 / 277; ≈ 250 | +0.7 (19.2%) | **Now unbookable**: 5–22 Jan Blocked (new), so 3–4 Jan is a 2-night gap under min 3. £77 under the mixed P50 but cannot sell as is. |

### P05 St John's Wood (4 BR): December (refresh 23 Nov 00:11Z)
| Nights | Ours (yday) | 4 BR summary P50 × n; daily 3–5 BR P50 / P75; est. matched (×1.26) | Occ Δ | Read |
|---|---|---|---|---|
| 29 Nov – 2 Dec (4 open, min 3) | 508 / 493 / 486 / 493 = **£1,980** (£1,933) | **2,328**; 1,691 / 2,219; ≈ 2,131 | +0.1 / −2.2 / −4.3 / −5.8 | £348 under the 4 BR median, ≈ £151 under est. matched; soft market (Δ ≤ 0) — not a compression gap |
| **7–8 Dec** (min 2) | 428 / 407 = **£835** (£879, −44) | **1,164**; 878 / 1,154; ≈ 1,106 | +4.8 / +0.2 | **£329 under the 4 BR median**, ≈ £271 under est. matched. Price ÷ unc 0.78; second daily fall without an edit — cause NOT CHECKED |
| **13–14 Dec** (min 2) | 485 / 479 = **£964** (£932, +32) | **1,164**; 866 / 1,174; ≈ 1,091 | **+12.2 / +5.7** | **£200 under the 4 BR median**, ≈ £127 under est. matched. Still P05's most compressed open pair |
| 21 Dec orphan (+300%, min 1) | **2,215** (2,109) | 4 BR P90 1,217 | +6.0 | 1.82× the 4 BR P90 (confirm/revert stands) |
| 29 Dec orphan (+300%, min 1) | **2,392** (2,422) | 4 BR P90 1,217 | +4.3 | 1.97× the 4 BR P90 |
- All other December nights are Booked. P05 £25,515 total list 24 Nov – 31 Dec is mostly booked nights.

### P05 Valentine's 13–17 Feb (4 n; beyond `prices.csv`, so neighbourhood `final_price`)
| Item | £ (4 n) | Note |
|---|---|---|
| **PriceLabs today (13 / 14 / 15 / 16 Feb)** | **438 / 410 / 419 / 421 = 1,688** (yday 1,679) | the −5% 1–28 Feb override was live yesterday (not re-pulled today) |
| Fortnight (6–12 + 17–23 Feb) | 423.4/n | **14 Feb (Sun, Valentine's + Eng v France) £410 is £13.4 under.** Only Sat 13 Feb is above (+£14.6) |
| Daily 3–5 BR P25 / P50 / P75 | 1,191 / **1,525** / 2,104 | – |
| est. matched 4 BR P50 (×1.26) | ≈ **1,922** | – |
| 4 BR summary P25 / P50 × 4 | 1,840 / 2,328 | horizon unstated |
| Market occ / Δ | 16.2 / 12.5 / 11.1 / 11.6%; **+8.3 / +2.6 / −0.6 / −0.4** | 82–85 days out |
- **Read unchanged: PriceLabs does not price Valentine's** (level with the fortnight; under it on the 14th). The market supports **≈ £1,840–1,920** (4 BR P25 to est. matched P50): **£152–234 above today**. Mild compression on Sat 13 Feb only. Availability in Smoobu/Airbnb NOT CHECKED (Feb beyond `prices.csv`).

### P13 Shepherd's Bush: December (refresh 23 Nov 00:10Z)
- **27 Nov (Finals Fri), the only open night before 1 Dec:** 262 (264), min 1. Market P50 240 / P75 298, occ 71.4%, Δ +1.9 → **£28.9 over the fortnight (233.1): priced.**
- **1 Dec:** 232 (225); twin 163. Mixed P50 225; Δ −0.8 (policy +50% vs live is with Corentin already).
- **13–21 Dec (9 open):** 192 / 190 / 189 / 193 / 200 / 212 / 218 / 207 / 210 = **£1,811** (yday £1,830; 21 Nov £1,945).
  - Mixed P50 £2,101 / P75 £2,661; est. matched ≈ £1,996.
  - Δ +6.7 / +7.3 / −1.6 / +4.1 / +8.0 / +9.1 / **+13.6 / +9.1 / +13.0** (26–50%).
  - **£290 under the mixed P50, ≈ £185 under est. matched** on a compressing market. 19–21 Dec £635 vs P50 £737 (−£102).
  - Reyhan re-set **14–16 Dec −2%** and **20–21 Dec min 2** overnight — goes to Corentin as confirm or revert alongside the 20 Nov −2%.
- **Twins:** 3090701 is **identical to 3064856 on all 9 open nights 13–21 Dec** again (£1,811 each). Policy: keep them slightly apart (fact for PriceLabs/channel).
- **New: 2–31 Jan −8% (Reyhan 00:08Z).** 2–22 Jan open nights (20): £3,383 vs mixed P25 £3,377 / P50 £4,102; occ 13.7%, Δ +4.7. Prices sit at the mixed P25 already; a market above STLY does not call for a further cut (confirm or revert).

## 3. Demand calendar, next 90 days
**Re-checked 23 Nov 2026 ~07:25Z.** `WebFetch` of www.alexandrapalace.com failed again (`ENOTFOUND`); I stopped trying venue hosts. **Every event fact is a WebSearch summary restricted to the venue/organiser domain, checked 23 Nov 2026 — not a page read.**

- **Twickenham (Allianz Stadium)** — [Finals page](https://allianzstadiumtwickenham.com/nations-championship), [Fri ticketing](https://help.englandrugby.com/support/solutions/articles/103000349981-nations-championship-2026-friday-27th-november-finals-day), [Sat ticketing](https://help.englandrugby.com/support/solutions/articles/103000392931-nations-championship-2026-saturday-28th-november-finals-day), [Sun ticketing](https://help.englandrugby.com/support/solutions/articles/103000392936-nations-championship-2026-sunday-29th-november-finals-day), [Sun visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information).
  - Fri 27 Nov: Italy v Fiji 16:40, Ireland v Australia 20:10. Sat 28 Nov: Wales v Japan 13:10, **England v NZ 16:40**. Sun 29 Nov: Scotland v Argentina 13:10, **France v South Africa Grand Final 16:40**.
  - Conflicts persist: Sunday visit page 15:10 / 18:40 ("approximate"); one England Rugby page 16:45.
- **England v France, Sun 14 Feb 2027, 15:10**, Twickenham — [Six Nations](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510/build-up), [England Rugby ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027), [stadium](https://allianzstadiumtwickenham.com/guinness-six-nations). Re-verified.
- **World Darts Championship, Alexandra Palace** — [schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [event](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [PDC FAQ](https://www.pdc.tv/WCFAQ), [PDC tickets](https://www.pdc.tv/tickets).
  - **Fri 11 Dec – Sun 3 Jan**, Great Hall. Round Two 20–23 Dec; **no sessions 24, 25, 26 Dec**; Round Three from Sun 27 Dec; R4 29–30 Dec; QF 1 Jan; SF 2 Jan 19:30; **final 3 Jan 20:00**. Tickets sold out (PDC).
  - Capacity: the summary cites **"a record 180,000 tickets"** (PDC FAQ / Ally Pally; search summary, not page-read).
  - Conflict: a PDC registration page says 4 Jan.
- **The O2 arena** — [listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Jungle](https://www.theo2.co.uk/events/detail/jungle-2026).
  - **Jungle 24–25 Nov** (event page, re-verified today).
  - Dec: Phoebe Bridgers 1–2 (Mariah Carey listed 1–2 yesterday: conflict); UB40 3; **Jingle Bell Ball 5–6**; Bryson Tiller 7 or 8 (conflict); **Kehlani 8**; Ocean Colour Scene 9; Mo Gilligan 10; Pete Tong 11–12; RnB Winter Ball 13 (one listing 11–12); McLaren LIVE 14; The Darkness 16; **Greg Davies 17 (now listed)**; Kasabian 18; Culture Club 19; Amr Diab 20; **Disney On Ice 24 Dec – 3 Jan**.
- **ExCeL** — [what's on](https://www.excel.london/whats-on), [Horse Show](https://www.excel.london/m/visitor/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live), [Cisco Live 2027](https://www.excel.london/visitor/whats-on/cisco-live-2027), [FinTech Connect](https://www.excel.london/whats-on/fintech-connect).
  - FinTech Connect 1–2 Dec; Perfume 10–13 Dec; **Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec; MegaCon 23–24 Jan; Genomics 27–28 Jan; **Cisco Live 8–12 Feb (one ExCeL page 7–12 Feb)**; Motorsport Expo / Motor Show 26–28 Feb (outside window).
- **NYE fireworks** — [london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026): Thu 31 Dec 20:00 – Fri 1 Jan 00:30; Ticketmaster only, max 4; £20/£35 Londoners, £40/£55 otherwise. No attendance figure stated.
- **Valentine's Day:** Sun 14 Feb 2027 (calendar).

Effect = Occ Δ (compression ≥ +5, soft ≤ −2). Properties from VENUES in `build/properties.py` (Twickenham: P18/P10/P13/P16; O2: P01/P09/P07/P04; ExCeL: P01/P04/P07/P15; Ally Pally: P08/P11). P20 and 3588993 are not in VENUES; I group P20 with P01 for O2/ExCeL. Blocked/handed-back/not-pulled VENUES properties named only. "vs fortnight" = `prices.csv` 23 Nov vs the fortnight mean (`out23.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 24 Nov | Jungle (24–25) | O2 | P20; P04 (cannot be booked) | P20 −10.4 soft; P04 −3.9 soft | P20 **228** vs 312.0; P04 **136** vs 166.9 | **no** (P20 dropped £43 last-minute; fortnight lifted by booked-night repricing) |
| 27 Nov | Finals Fri | Twickenham | P13 | +1.9 normal | 262 vs 233.1 | **yes** |
| 28–29 Nov | Finals Sat/Sun | Twickenham | P13 booked; P11 booked 27–29 | P13 +3.9 / +1.1 | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec; P04 6 Dec | P20 +4.1; P04 +0.6 | P20 591 vs 317.1; P04 170 vs 163.9 | P20 yes (manual, 1.49× P90); P04 yes |
| 8 Dec | Kehlani (Bryson Tiller 7/8) | O2 | P04 | +1.4 | **171** vs 161.3 | **yes now** (was 140) |
| 11–13 Dec | Darts opens; Pete Tong; RnB Winter Ball | Ally Pally / O2 | P11 booked; P04 booked (Booking.com) | P11 +9.0 / +7.5 / +2.7 | – | – |
| 14–17 Dec | Darts Round One; McLaren 14; Darkness 16; Greg Davies 17 | Ally Pally / O2 | P11; P04; P20 | P11 −5.2 / −1.9 / −0.2 / +2.8; P20 −13.8 to −9.7 soft | P11 **206 / 215 / 225 / 248** vs 267.7; P20 16 Dec **298** vs 308.9 (17 Dec 331 above) | **P11 no**; P20 above P75 in a soft market |
| 16–19 Dec | Horse Show 17–21 | ExCeL | P04; P20 | P04 −1.4 / +0.5 / +3.8 / +5.4 | P04 152 / 154 / 159 / 164 vs 149.5 | yes |
| 13–21 Dec | pre-Christmas; darts | London | P13; P05 13–14; 3588993 | P13 up to **+13.6**; P05 **+12.2** / +5.7; 3588993 up to **+18.8** | P13 £1,811 vs P50 £2,101; P05 £964 vs 4 BR median £1,164; 3588993 £2,978 vs est. P50 £2,767 | **P13, P05 no** (under the median); 3588993 yes now |
| 20–26 Dec | Christmas; Disney On Ice from 24 | O2 | P04 (7 n open) | +2.3 to +9.3 | £172.7/n vs fortnight 144.0 | yes vs fortnight; ≈ £74 under est. matched P50 |
| 23 Dec | Darts Round Two (last day) | Ally Pally | P11 | −0.9 | **290** vs 292.8 | ≈ level (−£2.8) |
| 24–26 Dec | Christmas (**no darts**) | – | P11 24–25 | −5.0 / −9.0 soft | 280 / 291 vs 292.8 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | −0.1 | 508 vs 311.1 | yes (manual, 1.23× P90) |
| 27 Dec – 2 Jan | NYE; darts R3–SF | Embankment / Ally Pally | P04, P11, P20 Booked; P13 Blocked; **3588993 open** | 3588993 −1.9 … +15.5 (31 Dec +7.5) | 3588993 26–31 Dec £3,515 vs est. P50 £3,064 | 3588993: priced (+15%, above P75 29–31 Dec) |
| 3 Jan | Darts final | Ally Pally | P11 (**unbookable**: 3–4 Jan gap, 5 Jan+ Blocked) | +0.7 | 144 vs 155.0 (n=1) | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | (final_price) | 256 / 242 vs 242.9 | level (too early) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | – | P20 266 / 259 / 253 / 249 / 277 vs 257.5; P04 164 / 164 / 163 / 161 / 172 vs 163.3 | level (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | P05 | +8.3 / +2.6 / −0.6 / −0.4 | 438 / **410** / 419 / 421 vs 423.4 | **no** |
| 14 Feb | Eng v France 15:10 | Twickenham | P13 | −3.5 soft (7.2%) | 192 vs 192.7 | level (too early) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same method and 17 Nov event set, nights 24 Nov – 17 Jan. 22 Nov values in brackets.

| Ref | Night(s) | Event | Ours 23 Nov (22 Nov) | Fortnight £ (22 Nov) | Gap £ (22 Nov) |
|---|---|---|---|---|---|
| P04 | 24 Nov | Jungle (cannot be booked) | 136 (142) | 166.9 (173.9) | 30.9 (31.9) |
| **P20** | **24 Nov** | Jungle | **228** (271) | 312.0 (286.1) | **84.0** (15.1) |
| P20 | 16 Dec | Darkness / Horse Show | 298 (301) | 308.9 (311.0) | 10.9 (10.0) |
| **P11** | **14–17 Dec** | Darts Round One | **206, 215, 225, 248** (218, 220, 229, 251) | 267.7 (281.7) | **61.7, 52.7, 42.7, 19.7** (63.7, 61.7, 52.7, 30.7) |
| P11 | 23, 24, 25 Dec | Darts (24–25 no play) | 290, 280, 291 (266, 242, 251) | 292.8 (293.6) | 2.8, 12.8, 1.8 (27.6, 51.6, 42.6) |
| P11 | 3 Jan | Darts final (now unbookable) | 144 (157) | 155.0, n=1 (175.6) | 11.0 (18.6) |
| | | **Total, same event set** | | | **11 nights / £331.0** (22 Nov **13 / £432.5**) |
| | | Bookable now (excl. P04 24 Nov, P11 3 Jan) | | | 9 / £289.1 (22 Nov 12 / £400.6) |
| | | Excl. P11 24–25 Dec (no darts) | | | 9 / £316.4 |
| | | Bookable and on event nights (excl. P04 24 Nov, P11 3 Jan, P11 24–25 Dec) | | | **7 / £274.5** |

**Change vs yesterday: −2 nights / −£101.5** (432.5 → 331.0; `cmp23.txt`).
- **Left, 2 nights, −£26.3:** P20 23 Nov (−£9.2, date passed); P04 8 Dec (−£17.1: 140 → 171, now £9.7 above, after the −2% edit + refresh).
- **Changed, 11 nights, −£75.2** = our prices −£13 net + fortnight drift −£62.2.
  - Prices up (gap down £102): **P11 23–25 Dec +24 / +38 / +40** (refresh, no P11 Dec edit logged).
  - Prices down (gap up £89): **P20 24 Nov −43** (last-minute); P11 14–17 Dec −12 / −5 / −4 / −3; P11 3 Jan −13; P04 24 Nov −6; P20 16 Dec −3.
  - Fortnight: P11 Round One −14.0 × 4; P11 3 Jan −20.6 (only 1 unblocked fortnight night left); P04 24 Nov −7.0; **P20 24 Nov +25.9** (23 Nov left the window; booked 25–30 Nov repriced up £3–63); P20 16 Dec −2.1; P11 23–25 Dec −0.8 × 3.
- Check: −26.3 − 75.2 = −101.5. Matches.
- **Not counted** (same as yesterday): P04 11–13 Dec (now Booked anyway); beyond 17 Jan — P20 24 Jan £0.9, P20 10–11 Feb £4.5 / £8.5, P04 10–11 Feb £0.3 / £2.3, P13 14 Feb £0.7; **P05 14 Feb Valentine's £13.4** (outside the venue set).

**Read with care:**
- **£176.8 of the £331.0 is P11 Round One 14–17 Dec**, in a market at/near STLY (Δ −5.2 to +2.8). The fair reference is the policy level (£1,200 vs £894, gap £306).
- **P20 24 Nov (£84.0) is mostly a fortnight artefact** (booked-night repricing lifted the reference to £312); vs the market, 228 is above the mixed P50 (213) in a soft night (Δ −10.4). Real missed money there is small.
- **The largest under-market items sit outside this headline:** P13 13–21 Dec −£290 vs mixed P50 (Δ to +13.6); P05 7–8 Dec −£329 and 13–14 Dec −£200 vs the 4 BR median (Δ +12.2); P11 30 Nov – 4 Dec −£220; P05 Valentine's £152–234; and the three **already-sold** stays below the mixed P25: P06 29 Nov–2 Dec (£513 vs P25 £859), P06 3–6 Dec (£769 vs £1,015), Scott Ellis 21–26 Dec (≈ £1,482 vs £1,609), P04 10–14 Dec (£488 vs £511).

Data gaps:
1. **Market source:** PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedrooms, so "est. matched" are ratio estimates. No Market Dashboard / Competitor Listings pulled. Not pulled: P09/P14, P02/P03/P07/P08/P10/P15–P19. 3588993 not in `id_map.json`/policy.
2. **Scott Ellis 21–26 Dec sale:** channel, guest-paid total and discount layers NOT CHECKED (not in `reservations.csv`); room total is ADR × 5 (estimate). Which of `price` / `user_price` reached Smoobu NOT CHECKED.
3. **P06 / P04 sales:** the layers between list and paid (0.60× / 0.74× / 0.84×) are for the channel section; not checked here.
4. **P11 5–22 Jan block** (new; strands the 3 Jan darts final): who set it and why NOT CHECKED (no PriceLabs log; likely Smoobu). P11 8 Dec −£72 cause NOT CHECKED. P11 Jan −8% status not re-pulled today.
5. **Causes NOT CHECKED:** P05 7–8 Dec −£44 (second day, no edit); P11 23–25 Dec +£102; P13 Jan +£202 despite a new −8%; P04 22–23 Dec prior override.
6. **P05 Valentine's:** availability in Smoobu/Airbnb NOT CHECKED; Feb overrides not re-pulled today.
7. **Events** are domain-restricted search summaries, not page reads; www.alexandrapalace.com (ENOTFOUND), allianzstadiumtwickenham.com, www.pdc.tv, www.theo2.co.uk and www.excel.london must be allowed in the session's network settings. Conflicts: Finals Sunday 16:40 vs 18:40 vs 16:45; darts end 3 vs 4 Jan; Phoebe Bridgers vs Mariah Carey 1–2 Dec; Bryson Tiller 7 vs 8 Dec; RnB Winter Ball 13 vs 11–12 Dec; Cisco Live 7–12 vs 8–12 Feb. The 180,000-ticket darts figure is from a search summary.
8. **t-pl-push-1811:** one overnight refresh (00:07–00:20Z) that lines up with Reyhan's 00:07–00:17Z edits is not evidence the schedule changed — one night is not a pattern.
