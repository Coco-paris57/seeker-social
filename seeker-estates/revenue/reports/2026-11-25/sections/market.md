# Market & demand calendar: run D = 2026-11-25 (window 26 Nov 2026 – 22 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P13 1 Dec (intentional_overrides); P04 never under 3 nights; P12 hands back after 13 Dec; P01 handback 20 Dec / gap block 30 Nov – 17 Dec; P09 gone after 26 Nov.
- **PriceLabs calls today: all read-only, strictly one at a time (never two in one message):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:24–07:26Z, in this order: 3588993 Scott Ellis Gardens, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P06 3288517, P12 2699998, P01 3320302. Each file checked (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved to `scratchpad/m25/neigh_<id>.json`. (The snapshot's `raw/neighbourhood_P13.json` is a summary pull with no daily future prices, so it was not usable for daily work.)
  - `get_user_logs` (listing, 24–25 Nov): 10 entries, all Reyhan, 24 Nov 10:48–13:14Z (below).
  - `get_listing_date_overrides` P13 3064856, 25 Nov – 28 Feb.
  - `get_customizations` P13 3064856 (listing level).
- **`market.csv`:** `data/snapshots/2026-11-25/market.csv` did not exist. Under `.market.csv.lock` I copied it forward from 24 Nov (61 lines; the first 61 lines are byte-identical to 24 Nov) and appended 9 rows dated 25 Nov (now 70 lines; `scratchpad/m25/wmarket25.py`). All market figures below come from the 25 Nov rows.
- **Prices:** `prices.csv` 25 Nov, column `pricelabs_price`, **26 Nov – 24 Jan** (the first date is now 26 Nov). "yday" = 24 Nov `prices.csv`. After 24 Jan I use the neighbourhood `final_price`. Smoobu = PriceLabs on every row (0 mismatches); 3588993 has no Smoobu column.
- **No overnight refresh for the 9 listings analysed here.** Last refresh times: P12 24 Nov 09:43Z; P13 3064856 10:50Z; P11 10:50Z; P05 10:51Z; P20 10:52Z; P04 10:54Z; 3588993 10:55Z; P06 13:15Z. So today's prices are the 24 Nov daytime prices. `pl_kpis.csv` is identical to 24 Nov for these listings except P13 (occ 60: 50 → 48%) and the 3588993 market occ.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. **Bedroom caveat:** the daily P25–P90 mix bedrooms (1–3 BR for P04, P11, P20, P01, P06; 2–3 BR for P13 and P12; 3–5 BR for P05; 2–4 BR for 3588993). "est. matched" = mixed P50 × (summary bedroom P50 ÷ mean daily mixed P50 over the next 30 days). **These are estimates.** Ratios today: P04 1.09, P13 0.94, P11 1.12, P05 1.23, P20 1.14, P12 0.95, P01 1.14, P06 1.01, 3588993 1.05.
- **Fortnight method:** unchanged. `scratchpad/m25/analyse25.py` is `m24/analyse24.py` with only the cut-off moved to 26 Nov, the first date in `prices.csv`. The event set, exclusions and the NYE-week rule are untouched. Output: `scratchpad/m25/out25.txt`. Comparison: `scratchpad/m25/cmp25.txt` (same `cmp` logic). Windows: `scratchpad/m25/win25.txt`. Day detail: `scratchpad/m25/items25.txt`.

## 1. Submarket table
P25 / P50 / P75 / P90 (n): `market.csv` 25 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched). Mkt occ 30/60: `market.csv` `market_occ_30/60` (= `pl_kpis.csv` 25 Nov `market_occupancy_next_30/60`). Our occ: `pl_kpis.csv` `occupancy_next_30/60`. P50 24 Nov = yesterday's `market.csv` row.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 24 Nov | Our occ 30/60 |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 37% | 231 / **292 / 328** / 390 (172) | 294 | 50 / 68% |
| Shepherd's Bush | P13 | 2 | 46 / 34% | 186 / **220 / 269** / 351 (117) | 221 | 63 / 48% (50) |
| St John's Wood (4 BR) | P05 | 4 | 50 / 39% | 454 / **572 / 701** / 1,214 (91) | 578 | 70 / 52% |
| **St John's Wood NW8 (3 BR)** | **3588993 Scott Ellis Gardens (unmapped)** | 3 | 44 / 34% (45/34) | 316 / **383 / 470** / 617 (148) | 383 | 67 / 40%* |
| Barking | P04 | 2 | 23 / 17% | 141 / **174 / 210** / 247 (90) | 175 | 47 / 37% |
| Canary Wharf | P20 | 2 | 38 / 29% | 215 / **252 / 316** / 422 (149) | 254 | 77 / 53% |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 27% | 218 / **261 / 335** / 430 (144) | 263 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 43 / 32% | 169 / **203 / 231** / 290 (117) | 206 | 73 / 87%** |
| Marylebone (intentional block, numbers only) | P06 | 2 | 52 / 39% | 318 / **410 / 526** / 664 (214) | 414 | 97 / 98%* |
| Primrose Hill (numbers only) | P14 | 1 | 48 / 34% (`pl_kpis` only) | no row | – | 0 / 0% |
| Greenwich (gone after 26 Nov) | P09 | – | 40 / 30% (`pl_kpis` only) | no row | – | 100 / 100%* |
| Islington (handed back) / Hanger Lane (handed back) / Woolwich (intentional block) | P08 / P10 / P07 | – | 55/41 · 32/24 · 26/20% (`pl_kpis` only) | no row | – | 100% (blocked) |
| Ladbroke Grove / Bayswater (intentional blocks) | P02 / P03 | – | 51/37 · 52/41% (`pl_kpis` only) | no row | – | 100% (blocked) |

\* Inflated by handback blocks or other blocks. ** **P12 is understated:** PriceLabs still shows the rebooked 4–6 Dec nights as open (see §2), so the new booking is not yet in `occupancy_next_30`.
- **The market was flat day on day.** P50 moved by −£6 (P05) to £0; n moved by at most 1; market occ 30 moved by 0–1 point.
- There is no `market.csv` row or `pl_kpis` row for Bow/Devons Rd (P15), Little Venice (P16), St John's Wood P17, Fulham (P18) or Kings Langley (P19): not in PriceLabs pulls.

## 2. Items in the brief

### PriceLabs edits since 24 Nov 06:00Z (`get_user_logs`, 24–25 Nov)
| When (Z, 24 Nov) | Listing | Change (from the log) | Refresh after |
|---|---|---|---|
| 10:48:14 | P11 3064196 (+ Vrbo copy) | 30 Nov – 4 Dec override, percent type, no value shown, min 2 | 10:50Z |
| 10:48:20 | P11 3064196 (+ Vrbo copy) | 14–18 Dec override, fixed type, no value shown, min 2 | 10:50Z |
| 10:50:38 | P05 3166592 | **29 Nov – 2 Dec −8%, min 3** | 10:51Z |
| 10:51:18 | P20 3547481 | 24 Nov +25%, min 1 (date has passed) | 10:52Z |
| 10:52:35 | P04 3562176 | **6–23 Dec −5%, min 3** (was −2%) | 10:54Z |
| 10:54:33 / 10:54:54 | 3588993 | 17–19 Dec and 7–9 Jan, min 3, no price shown | 10:55Z |
| 13:14:35 | P06 3288517 | 6–13 Dec, min 3 (intentional block; numbers only) | 13:15Z |

- **For t-pl-push-1811:** the 24 Nov refreshes of P11, P05, P20, P04, 3588993 and P06 each came 1–2 minutes after a logged edit, so they were **edit-triggered**. **P12 (09:43Z) and P13 (09:37Z push; 3064856 prices refreshed 10:50Z) have no logged edit on 24 Nov.** None of these 9 listings refreshed overnight 24→25 Nov.
- **P05 −8% and P04 −5% are new PriceLabs discounts.** They go against Corentin's direction to cut PriceLabs discounts (brief rule 10), so per the brief they go to Corentin as **confirm or revert**. They are not new proposals. Effect: P05 29 Nov – 2 Dec £1,966 → £1,905 (−£61); P04 6–23 Dec −£4 to −£6 per night (7–22 Dec open nights £1,900 → £1,842, −£58).

### P12 Mile End: 4–6 Dec rebooked (Booking.com, made 24 Nov) vs the Mile End market
Policy: P12's last night is 13 Dec, so these nights are inventory. Source: `reservations.csv` 25 Nov. The new stay is 4–7 Dec, 3 n, **£766.54 room = £255.51/n**, commission £137.48. The cancelled stay was £677.79 = £225.93/n, so the rebook is +£88.75 (+13.1%).

| Measure (4 / 5 / 6 Dec) | £ (3 n) | Rebook £766.54 vs it |
|---|---|---|
| PriceLabs list today (24 Nov 09:43Z refresh) | 311 / 331 / 267 = **909** (Smoobu on 24 Nov: £915) | **0.84×** (−£142) |
| Mixed 2–3 BR P25 / **P50** / P75 / P90 | 530 / **648** / 824 / 1,027 | **1.18× the mixed P50 (+£119); 0.93× the mixed P75 (−£57)** |
| est. matched 2 BR P50 (×0.95) | ≈ 616 | ≈ 1.24× (+£151) |
| 2 BR summary P50 / P75 × 3 (`market.csv`) | 609 / 693 | 1.26× / 1.11× |
| Market occ / Δ vs STLY | 54.1 / 63.2 / 47.0%; **−14.0 / −12.3 / −18.0** | – |

- **Read: the rebook sold between the Mile End median and P75 (£255.51/n vs mixed P50 £216/n and P75 £275/n) in a market 12–18 points under STLY.** That is a good sale for the market: better than the cancelled stay (which was 1.05× the mixed P50) and above the 2 BR summary P75. It is 16% under the list price. The Booking.com layers (markup ×1.15, promotions, commission 17.9% of room) are for the channel section.
- **PriceLabs has not picked up the booking.** `prices.csv` 25 Nov still shows 4, 5 and 6 Dec as `available=True` with no booking status, min 2. The last P12 refresh was 24 Nov 09:43Z. That is why `pl_kpis` P12 occ 30 is still 73% (+3 nights ≈ 83%). Whether Smoobu has closed the dates on other channels is NOT CHECKED here (channel/occupancy sections).
- **26 Nov (tomorrow, min 1, +15% override since 4 Nov): £290** (yday 294). Mixed P25 / P50 / P75 / P90 = 168 / 198 / 238 / 310; est. matched ≈ 188. Occ 60.9%, **Δ −6.5**. That is **1.22× the mixed P75, near the P90**, on a soft night. It has been unsold for 8 days at that level.
- **30 Nov – 3 Dec (4 open, min 2): 242 / 257 / 258 / 265 = £1,022** (yday £1,014; 1 Dec 241 → 257, 3 Dec 275 → 265). Mixed P50 £823 / P75 £1,041; est. matched ≈ £782. Δ −10.0 / −10.0 / −12.7 / −17.3 (38–45%). **£19 under the mixed P75 and £199 over the mixed P50** in the softest stretch of P12's window. This is now P12's only open block before the handback, apart from 26 Nov.

### 3588993 Scott Ellis Gardens (NW8, 3 BR) vs the NW8 3-bed market
3 BR summary (`market.csv` 25 Nov): P25 316 / **P50 383 / P75 470** / P90 617 (n=148). **Base 450 = 1.17× the 3 BR P50 and 0.96× the P75.** Refresh 24 Nov 10:55Z, after Reyhan's min-3 edits (17–19 Dec, 7–9 Jan; no price change: open prices are unchanged except 20 Dec 442 → 446 and 1–2 Jan −£1). Still unmapped (not in `id_map.json` or policy; no Smoobu column).

| Window (open nights) | Ours £ | Mixed P25 / **P50** / P75 £ | est. matched P50 £ (×1.05) | Ours vs est. matched | Nights > mixed P75 / < mixed P50 | Avg occ / Δ |
|---|---|---|---|---|---|---|
| 10–20 Dec (10 open; 15 Dec Blocked; 30 Nov – 9 Dec Blocked; 21–25 Dec Booked) | **4,379** (avg 438) | 2,917 / **3,683** / 4,854 | 3,867 | **+£512 (1.13×)** | 0 / 0 | 43.2% / **+9.7** (to +17.7 on 19 Dec) |
| 26–31 Dec NYE (6 open, min 4–7) | 3,444 | 2,103 / 2,820 / 3,590 | 2,961 | **+£483 (1.16×)** | 3 (29–31 Dec) / 0 | 54.8% / +1.1 |
| 1–2 Jan | 966 | 586 / 766 / 963 | 804 | +£162 | 1 / 0 | 41.8% / +12.4 |
| 3–23 Jan (19 open; 6 and 12 Jan Blocked) | 6,052 (avg 319) | 4,428 / 5,625 / 7,189 | 5,906 | +£146 (1.02×) | 0 / 1 | 14.9% / +4.8 |
| **All 37 open nights to 23 Jan** | **14,841** (avg 401) | 10,034 / **12,894** / 16,596 | 13,539 | **+£1,302 (1.10×)** | 4 / 1 | 30.5% / +6.0 |

- **Read: priced about 10% over the estimated 3 BR median on what is still open, and under the mixed P75 except 29–31 Dec and 1 Jan.** Yesterday: +£1,217 (1.09×). The change is the market (mixed P50 −£79 on the same nights), not our prices (+£2).
- **10–20 Dec is supported:** +£512 over est. matched in a market 9.7 points over STLY. **NYE 26–31 Dec is the rich spot:** +£483 over est. matched, and above the mixed P75 on 29 / 30 / 31 Dec (623 / 619 / 618 vs 617 / 610 / 581), with Δ only +1.1. This is a fact, not a proposal (t-scott-ellis-2011).
- The 2nd reservation and the 30 Nov – 9 Dec blocks (booking vs owner block) are for the occupancy/channel sections. Prices for those nights are Blocked in PriceLabs and are not treated as demand here.

### P05 St John's Wood (4 BR): December (refresh 24 Nov 10:51Z, after the −8% edit)
| Nights | Ours (yday) | 4 BR summary P50 × n (`market.csv`); daily 3–5 BR P50 / P75; est. matched (×1.23) | Occ Δ | Read |
|---|---|---|---|---|
| 29 Nov – 2 Dec (4 open, min 3, **−8% since 24 Nov**) | 488 / 473 / 469 / 475 = **£1,905** (£1,966) | **2,288**; 1,672 / 2,199; ≈ 2,057 | −0.5 / −2.8 / −4.4 / −6.4 | **£383 under the 4 BR median**, ≈ £152 under est. matched. The market is soft (Δ < 0), so this is not compression. But the −8% cut takes the flat further under a median it already sat below (confirm or revert). |
| **7–8 Dec** (min 2) | 428 / 407 = **£835** (£836) | **1,144**; 866 / 1,138; ≈ 1,065 | +5.0 / +0.5 | **£309 under the 4 BR median**, ≈ £230 under est. matched; £31 under even the mixed 3–5 BR P50 |
| **13–14 Dec** (min 2) | 483 / 477 = **£960** (£960) | **1,144**; 853 / 1,131; ≈ 1,049 | **+11.2 / +4.7** | **£184 under the 4 BR median**, ≈ £89 under est. matched. This is P05's most compressed open pair. |
| 21 Dec orphan (+300%, min 1) | **2,193** (2,194) | 4 BR P90 1,214 | +6.2 | 1.81× the 4 BR P90 (confirm or revert stands) |
| 29 Dec orphan (+300%, min 1) | **2,247** (2,247) | 4 BR P90 1,214 | +2.9 | 1.85× the 4 BR P90 |
- Every other December night is Booked.

### P05 Valentine's 13–16 Feb (4 n; beyond `prices.csv`, neighbourhood `final_price`)
| Item | £ (4 n) | Note |
|---|---|---|
| **PriceLabs today (13 / 14 / 15 / 16 Feb)** | **438 / 408 / 417 / 420 = 1,683** (yday same) | Feb overrides not re-pulled |
| Fortnight (6–12 + 17–23 Feb, `final_price`) | **422.1/n** | **14 Feb (Sun, Valentine's + Eng v France) £408 = £14.1 under the fortnight.** Only Sat 13 Feb is above (+£15.9). |
| Daily 3–5 BR P25 / P50 / P75 | 1,185 / **1,527** / 2,087 | – |
| est. matched 4 BR P50 (×1.23) | ≈ **1,878** | – |
| 4 BR summary P25 / P50 × 4 | 1,816 / 2,288 | horizon unstated |
| Market occ / Δ | 16.2 / 12.5 / 10.8 / 11.3%; **+7.5 / +1.9 / −1.0 / −0.8** | 80–83 days out |
- **Read unchanged: PriceLabs does not price Valentine's** (it is under the fortnight on the 14th). The market supports **≈ £1,816–1,878** (4 BR P25 to est. matched P50), **£133–195 above today.** Compression is mild and only on Sat 13 Feb. Availability in Smoobu/Airbnb is NOT CHECKED.

### P04 Barking 7–22 Dec (refresh 24 Nov 10:54Z; **−5% 6–23 Dec min 3**, was −2%)
| Block | Ours today (yday) | Mixed P50 / P75; est. matched (×1.09) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| **7–22 Dec, 12 open nights** (7–9, 14–22; 10–13 Booked) | **£1,842** (£1,900) | **1,871 / 2,437**; ≈ 2,039 | avg +1.5 (12–27%) | **Now £29 under the mixed P50** (yesterday +£6), ≈ £197 under est. matched, £595 under the P75 |
| 7–9 Dec | 164 / 164 / 161 = £489 (£505) | 453 / 599; ≈ 494 | +2.8 / +4.2 / −4.2 | +£36 over the P50; at est. matched (−£5) |
| 14–22 Dec | 140 / 143 / 146 / 149 / 153 / 158 / 155 / 155 / 154 = **£1,353** (£1,395) | 1,418 / 1,838; ≈ 1,546 | −2.4 / −4.5 / −0.4 / +1.6 / +2.7 / +6.1 / +6.3 / +2.1 / +3.9 | **£65 under the mixed P50 (8 of 9 nights under), ≈ £193 under est. matched** |
| Horse Show 17–21 Dec | 149 / 153 / 158 / 155 / 155 = **£770** (£793) | 796 / 1,033; ≈ 868 | +1.6 / +2.7 / +6.1 / +6.3 / +2.1 | £26 under the P50, ≈ £98 under est. matched, on the Horse Show with Δ up to +6.3 |
| 23–26 Dec (min 3/2/2/2) | 157 / 175 / 188 / 185 = £705 (£710) | 689 / 850; ≈ 751 | +5.6 / +6.7 / **+9.6** / +2.4 | +£16 over the P50, ≈ £46 under est. matched |
- **The −5% moves P04 from level with the market median to under it.** It does so on the nights where Barking occupancy is above STLY (17–23 Dec, Δ +1.6 to +6.3). Market support is about est. matched P50 (≈ +£197 on 7–22 Dec), not P75, because occupancy is only 12–27%. The unsynced Barking Airbnb (t-p04-doublebook) is for the channel section.

### P20 Waterford Court: 14–18 Dec, 5 Dec, 26 Dec (refresh 24 Nov 10:52Z)
| Block | Ours (yday) | Mixed P50 / P75 / P90; est. matched (×1.14) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 289 / 306 / 302 / 336 / 348 = **£1,581** (£1,568) | 1,095 / 1,380 / 1,798; ≈ 1,248 | **−11.1 / −11.0 / −9.3 / −8.7 / −8.0** (27–30%) | **£201 over the mixed P75 (all 5 nights above), ≈ £333 over est. matched** in a market 8–11 points under STLY. There is no case to go higher; this is the soft spot. |
| 5 Dec orphan (min 1, +100%) | **588** (582) | 228 / 292 / **405** | +4.0 (59.4%) | **1.45× the mixed P90.** Jingle Bell Ball 5–6 Dec (O2). Fact for Corentin's confirm or revert. |
| 26 Dec orphan (min 1, +100%) | **516** (509) | 248 / 315 / **415** | 0.0 (35.0%) | **1.24× the P90.** Disney On Ice from 24 Dec; no compression. |

### P11 Camden: darts, 30 Nov – 4 Dec, 3 Jan (refresh 24 Nov 10:50Z, after Reyhan's 10:48Z edits)
| Nights | Ours (yday) | Mixed P50 / P75; est. matched (×1.12) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 30 Nov – 4 Dec (min 2) | 200 / 199 / 208 / 235 / 266 = **£1,108** (£1,086) | **1,249 / 1,593**; ≈ 1,399 | −3.9 / −1.9 / −4.1 / +1.1 / +0.5 (47–74%) | **£141 under the mixed P50 (all 5 nights under), ≈ £291 under est. matched.** The market is about at STLY. |
| 26 Nov (min 2) | 229 (229) | 238 / 313 | −6.1 (70.4%) | £9 under the P50; soft |
| 8 Dec orphan (min 1) | 245 (245) | 256 / 306 | +3.7 | £11 under the P50 |
| **14–17 Dec** Round One (min 2) | 207 / 218 / 228 / 249 = **£902** (£883, +£19 after the 14–18 Dec edit) | 1,001 / 1,199; ≈ 1,121 | −7.1 / −5.1 / −3.2 / −1.6 (23–29%) | **£298 under the policy level** (21 Oct: above £300/n = £1,200); £99 under the mixed P50; ≈ £219 under est. matched |
| 18 Dec | 315 (309) | 279 / 338 | −1.9 | above the P50 |
| **23 Dec** Round Two (12:30 and 19:00 sessions) | 291 (291) | 283 / 390 | −0.3 (32.9%) | at the mixed P50 (+£8) |
| 24–25 Dec (**no darts**) | 267 / 304 (268 / 304) | 286 / 304 | −4.3 / −10.3 | near the P50 in a market below STLY. No event. |
| **3 Jan** final (20:00) | **151** (151) | 220 / 276; ≈ 246 | +1.0 (19.4%) | **Still unbookable:** 3–4 Jan `available=False` with no booking status, min 3, and 5 Jan Blocked, which leaves a 2-night gap. £69 under the mixed P50. 3–4 Jan together: £314 vs P50 £427. |

### P13 Shepherd's Bush: Finals weekend, December, January (3064856 refresh 24 Nov 10:50Z; **no edit logged on 24 Nov**; overrides last changed 23 Nov 00:08Z per `get_listing_date_overrides`)
- **27 Nov (Finals Fri), the only open night before 1 Dec:** 263 (265), min 1, +25% override. Mixed P50 237 / P75 290; occ 76.9%, Δ +2.7. It is **£27.4 over the fortnight (235.6), so it is priced.** 28–30 Nov Booked (Finals Sat/Sun covered).
- **1 Dec:** 233 (235). This is an intentional override under policy, so it is not raised. The override list shows **+25%** (updated 18 Nov 12:14Z), while policy records +50%. This is a fact for the PriceLabs section, not a proposal.
- **13–21 Dec (9 open): 192 / 189 / 189 / 193 / 200 / 213 / 217 / 207 / 209 = £1,809** (yday £1,820).
  - Mixed P50 £2,086 / P75 £2,701; est. matched (×0.94) ≈ £1,961.
  - Δ +6.6 / +6.0 / −3.7 / +2.3 / +6.4 / +7.5 / **+11.4 / +7.4 / +11.4** (26–48%).
  - **£277 under the mixed P50 (all 9 nights under), ≈ £152 under est. matched**, on a compressing market. 19–21 Dec: £633 vs P50 £742 (−£109).
  - Reyhan's 14–16 Dec −2% and 20–21 Dec min 2 (23 Nov) are still with Corentin as confirm or revert.
- **The twins are still apart:** 3090701 13–21 Dec is £1,863, £54 above 3064856 (yesterday £73 above).
- **22 Dec – 2 Jan fully taken** (22–26 Dec booked on 3064856; 27 Dec – 2 Jan booked on 3090701, so the other twin's Blocked nights are linked, not blocks).
- **January fell again without an edit: 3–23 Jan, 21 open nights, £3,349 (yday £3,581, −£232, about −6%).** That is now **£159 under the mixed P25 (£3,508)**, £885 under the P50 (£4,234) and ≈ £631 under est. matched (£3,980). Market occ is 13.0%, Δ +2.5. The −8% override on 2–31 Jan is unchanged since 23 Nov 00:08Z. `uncustomized_price` moved only slightly (e.g. 10 Jan 139 → 136) while the final price moved 160 → 150. So the drop sits in the customization layer. `get_customizations` shows an **"Aggressive" occupancy-based adjustment** (31–60 days out: −5% at 40% occupancy, −10% at 30%; P13 occ 60 fell 50 → 48%) and a booking recency factor (−5% to −15%, next 30 days). **These are candidate causes. Which one moved is NOT CONFIRMED.** Both are PriceLabs discounts, relevant to a-discount-cut.
- **14 Feb (Eng v France):** £192 vs fortnight £191.6 (+£0.4). This is under the **−10% override on 1–28 Feb** (since 4 Nov). Mixed P50 213; occ 8.0%, Δ −2.5. It is too early to read.

## 3. Demand calendar, next 90 days
**Re-checked 25 Nov 2026 ~07:35Z.** `WebFetch` failed with `ENOTFOUND` for www.alexandrapalace.com, allianzstadiumtwickenham.com, www.london.gov.uk and www.sixnationsrugby.com, so I stopped trying venue hosts. **Every event fact below is a WebSearch summary restricted to the venue or organiser domain, checked 25 Nov 2026. None is a page read.**

- **Twickenham (Allianz Stadium) Finals Weekend, Fri 27 – Sun 29 Nov.** Sources: [Finals page](https://allianzstadiumtwickenham.com/nations-championship), [What's on](https://allianzstadiumtwickenham.com/whats-on), [Sun visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information), [England v NZ preview](https://www.englandrugby.com/follow/news-and-media/finals-weekend-england-v-new-zealand-preview-2026-nations-championship), [Sat ticketing](https://help.englandrugby.com/support/solutions/articles/103000392931-nations-championship-2026-saturday-28th-november-finals-day), [Sun ticketing](https://help.englandrugby.com/support/solutions/articles/103000392936-nations-championship-2026-sunday-29th-november-finals-day).
  - Fri 27: Italy v Fiji 16:40; Ireland v Australia 20:10.
  - Sat 28: Wales v Japan 13:10; **England v NZ 16:40**.
  - Sun 29: Scotland v Argentina 13:10; **France v South Africa Grand Final 16:40**.
  - Conflict persists: the Sunday visit page gives 15:10 / 18:40.
- **England v France, Sun 14 Feb 2027, 15:10 GMT, Allianz Stadium.** Sources: [Six Nations fixture](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510), [England Rugby ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027), [clubs page](https://help.englandrugby.com/support/solutions/articles/103000347582-information-for-clubs-for-guinness-men-s-six-nations-2027). The ticketing page says kick-off "TBC"; the French page shows "10:10", which looks like a display artefact.
- **World Darts Championship, Alexandra Palace (Great Hall), Fri 11 Dec – Sun 3 Jan.** Sources: [Ally Pally schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [event](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [PDC calendar](https://www.pdc.tv/calendar/), [PDC ticket prices](https://www.pdc.tv/news/2026/august/07/2026-27-paddy-power-world-darts-championship-ticket-prices-confirmed/).
  - Round One from 11 Dec 19:00; Round Two 20–23 Dec (23 Dec 12:30 and 19:00).
  - **No sessions 24–26 Dec.** This is inferred from the schedule jump from 23 to 27 Dec; no source says it in words.
  - QF 1 Jan; SF 2 Jan 19:30; **final 3 Jan 20:00**.
  - "Targeting a record 180,000 tickets" (search summary, not a page read).
  - Conflict: one PDC ticketing article gives 4 Jan as the end date.
- **The O2 arena.** Sources: [listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Jingle Bell Ball](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [Disney On Ice](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic).
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec** (doors 16:30).
  - **Disney On Ice 24 Dec – 3 Jan** (shows from 24 Dec to 2 Jan).
  - Also listed: Phoebe Bridgers 1–2 Dec, UB40 3 Dec, The Darkness 16, Greg Davies 17, Kasabian 18, Culture Club 19 Dec.
  - UNVERIFIED: Mariah Carey ("early December"); a separate Jingle Bell Ball on 19 Dec on one listing page. Bryson Tiller 7 / Kehlani 8 / Ocean Colour Scene 9 Dec were not in today's summary (yesterday's list), so they are UNVERIFIED today.
- **ExCeL.** Sources: [what's on](https://www.excel.london/m/visitor/whats-on), [MegaCon](https://www.excel.london/whats-on/megacon-live), [Cisco Live](https://www.excel.london/news/cisco-live-returns-to-excel-london).
  - **New today:** London Perfume Exhibition 10–13 Dec; Scrooge Cirque 23–28 Dec; Wundrful World of Christmas 14 Nov – 24 Dec.
  - **Horse Show 17–21 Dec**; **MegaCon 23–24 Jan**; **Cisco Live 8–12 Feb** ("take over Excel's 125,000sqm venue"); motor shows 26–28 Feb (outside the window).
  - FinTech Connect 1–2 Dec was not in today's summary, so it is UNVERIFIED today.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 – Fri 1 Jan 00:30. Tickets on Ticketmaster only, max 4; £20/£35 for Londoners, £40/£55 for others; final batch "now available". No attendance figure is stated.
- **Valentine's Day:** Sun 14 Feb 2027 (calendar).

Effect = Occ Δ (compression ≥ +5, soft ≤ −2). Properties come from VENUES in `build/properties.py`: Twickenham P18/P10/P13/P16; O2 P01/P09/P07/P04; ExCeL P01/P04/P07/P15; Alexandra Palace P08/P11. P20, P12 and 3588993 are not in VENUES; I group P20 with P01 for O2/ExCeL. Blocked, handed-back or not-pulled VENUES properties are named only: P01 is blocked 30 Nov – 17 Dec and gone after 20 Dec; P09 is gone after 26 Nov; P08/P10 are handed back; P07 is an intentional block; P15/P16/P18 are not pulled. "vs fortnight" = `prices.csv` 25 Nov vs the fortnight mean (`out25.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 27 Nov | Finals Fri | Twickenham | P13 | +2.7 normal (76.9%) | 263 vs 235.6 | **yes** (+25% override) |
| 28–29 Nov | Finals Sat/Sun | Twickenham | P13 booked; P11 booked 27–29 | – | – | – |
| 1–2 Dec | Phoebe Bridgers (O2); FinTech Connect UNVERIFIED | O2 / ExCeL | P04 1 Dec (2 Dec policy override) | – | not in event set | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec; P04 6 Dec | P20 +4.0; P04 +1.0 | P20 588 vs 319.1; P04 163 vs 162.8 | P20 yes (manual, 1.45× P90); P04 level (+£0.2) |
| 7–9 Dec | O2 concerts UNVERIFIED today | O2 | P04 | +2.8 / +4.2 / −4.2 | 8 Dec 164 (UNVERIFIED label in the set) | – |
| 10–13 Dec | Perfume Exhibition (new); darts opens 11 Dec | ExCeL / Ally Pally | P04 booked; P11 booked 11–13 | – | – | – |
| 14–17 Dec | Darts Round One; Darkness 16, Greg Davies 17 | Ally Pally / O2 | P11; P04; P20 | P11 −7.1 / −5.1 / −3.2 / −1.6; P20 −11.1 to −8.0 soft | P11 **207 / 218 / 228 / 249** vs 266.7; P20 16 Dec **302** vs 314.4 (17 Dec 336 above); P04 16 Dec **146** vs 147.8 | **P11 no**; P20 16 Dec no (but over the P75, soft); P04 16 Dec no (−£1.8) |
| 17–21 Dec | Horse Show | ExCeL | P04 (P20 by proximity) | P04 +1.6 / +2.7 / +6.1 / +6.3 / +2.1 | P04 149 / 153 / 158 vs 147.8 (17–19); 155 / 155 vs 141.9 (20–21) | yes vs the fortnight; **under the mixed P50 (−£26)** |
| 13–21 Dec | pre-Christmas (no single event) | London | P13; P05 13–14; 3588993 | P13 to **+11.4**; P05 **+11.2** / +4.7; 3588993 to **+17.7** | P13 £1,809 vs P50 £2,086; P05 £960 vs 4 BR median £1,144; 3588993 £4,379 vs est. P50 £3,867 | **P13, P05 no** (under the median); 3588993 yes |
| 20–26 Dec | Christmas; Disney On Ice from 24; Scrooge Cirque 23–28 | O2 / ExCeL | P04 (7 n open) | +6.3 / +2.1 / +3.9 / +5.6 / +6.7 / +9.6 / +2.4 | £167.0/n vs fortnight 141.9 | yes vs the fortnight; ≈ est. matched −£46 on 23–26 |
| 23 Dec | Darts Round Two (last day) | Ally Pally | P11 | −0.3 | **291** vs 293.2 | ≈ level (−£2.2) |
| 24–26 Dec | Christmas (**no darts**) | – | P11 24–25 | −4.3 / −10.3 soft | 267 / 304 vs 293.2 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | 0.0 | 516 vs 316.7 | yes (manual, 1.24× P90) |
| 27 Dec – 2 Jan | NYE; darts R3–SF | Embankment / Ally Pally | P04, P11, P20, P13 taken; **3588993 open** | 3588993 −3.2 … +15.2 (31 Dec +6.7) | 3588993 26–31 Dec £3,444 vs est. P50 £2,961 | 3588993: priced (+16%, above the P75 29–31 Dec) |
| 3 Jan | Darts final | Ally Pally | P11 (**unbookable**) | +1.0 | 151 vs 163.0 (n=1) | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | in `prices.csv` | 230 / 243 vs 243.4 | **no** (23 Jan −£13.4; beyond the 17 Jan headline) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | (`final_price`) | P20 267 / 260 / 254 / 249 / 281 vs 257.9; P04 162 / 162 / 160 / 158 / 170 vs 161.9 | level (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | P05 | +7.5 / +1.9 / −1.0 / −0.8 | 438 / **408** / 417 / 420 vs 422.1 | **no** |
| 14 Feb | Eng v France 15:10 | Twickenham | P13 | −2.5 soft (8.0%) | 192 vs 191.6 | level (+£0.4; −10% Feb override) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same method and 17 Nov event set, nights 26 Nov – 17 Jan. 24 Nov values are in brackets.

| Ref | Night(s) | Event | Ours 25 Nov (24 Nov) | Fortnight £ (24 Nov) | Gap £ (24 Nov) |
|---|---|---|---|---|---|
| P04 | 16 Dec | Horse Show week (−5% edit) | 146 (151) | 147.8 (152.2) | 1.8 (1.2) |
| P20 | 16 Dec | Darkness / Horse Show | 302 (299) | 314.4 (312.7) | 12.4 (13.7) |
| **P11** | **14–17 Dec** | Darts Round One | **207, 218, 228, 249** (203, 213, 223, 244) | 266.7 (266.2) | **59.7, 48.7, 38.7, 17.7** (63.2, 53.2, 43.2, 22.2) |
| P11 | 23, 24 Dec | Darts (no play on 24th) | 291, 267 (291, 268) | 293.2 (292.0) | 2.2, 26.2 (1.0, 24.0) |
| P11 | 3 Jan | Darts final (unbookable) | 151 (151) | 163.0, n=1 (163.0) | 12.0 (12.0) |
| | | **Total, same event set** | | | **9 nights / £219.4** (24 Nov **9 / £233.7**) |
| | | Bookable now (excl. P11 3 Jan) | | | 8 / £207.4 (24 Nov 8 / £221.7) |
| | | Bookable and on event nights (excl. P11 3 Jan and 24 Dec) | | | **7 / £181.2** (24 Nov 7 / £197.7) |

**Change vs yesterday: 0 nights / −£14.3** (233.7 → 219.4; `cmp25.txt`). The same 9 nights are in both lists; none entered or left.
- **Price effect −£16.0:**
  - P11 Round One +4 / +5 / +5 / +5 (−£19.0, after Reyhan's 14–18 Dec edit);
  - P20 16 Dec +3 (−£3.0);
  - P04 16 Dec −5 (+£5.0, the −5% edit);
  - P11 24 Dec −1 (+£1.0).
- **Fortnight drift +£1.7:**
  - P11 Round One +0.5 × 4;
  - P11 23–24 Dec +1.2 × 2;
  - P20 16 Dec +1.7;
  - P04 16 Dec −4.4 (the −5% also lowered P04's fortnight).
- Check: −16.0 + 1.7 = −14.3. Matches.
- **Not counted** (beyond 17 Jan, same as yesterday): P20 23 Jan £13.4, P20 24 Jan £0.4; P20 10–11 Feb £3.9 / £8.9; P04 10–11 Feb £1.9 / £3.9; **P05 14 Feb Valentine's £14.1** (outside the venue set). P13 14 Feb is level (−£0.4).

**Read with care:**
- **£164.8 of the £219.4 is P11 Round One 14–17 Dec**, in a market below STLY (Δ −7.1 to −1.6). The fair reference is the policy level (£1,200 vs £902, gap £298).
- **P04's 16 Dec gap grew only £0.6 despite a −£5 price cut**, because the −5% override also lowered the fortnight it is measured against. The fortnight method therefore understates the −5%: against the market, P04 Horse Show 17–21 Dec went from −£12 to **−£26 under the mixed P50**.
- **The larger under-market items sit outside this headline:**
  - P13 3–23 Jan: −£885 vs the mixed P50, now under the P25. It fell £232 overnight with no edit.
  - P05 7–8 Dec −£309 and 13–14 Dec −£184 vs the 4 BR median (Δ +11.2); P05 29 Nov – 2 Dec −£383 (−8% edit).
  - P13 13–21 Dec −£277 vs the mixed P50 (Δ to +11.4).
  - P11 30 Nov – 4 Dec −£141 vs the mixed P50.
  - P04 7–22 Dec −£29 vs the P50 (−5% edit).
  - P05 Valentine's £133–195.
- **On the other side:** P12 26 Nov (1.22× the mixed P75, Δ −6.5), P12 30 Nov – 3 Dec (at the P75, Δ −12.5) and P20 14–18 Dec (£201 over the mixed P75, Δ −9.6) are priced above a soft market.

Data gaps:
1. **Market source:** PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedrooms, so "est. matched" figures are ratio estimates. No Market Dashboard or Competitor Listings were pulled. Not pulled: P09/P14, P02/P03/P07/P08/P10/P15–P19. 3588993 is not in `id_map.json` or policy.
2. **Stale PriceLabs data:** none of the 9 listings refreshed overnight. **P12's 4–6 Dec rebook is not in PriceLabs** (shown open; last refresh 24 Nov 09:43Z), so P12 `pl_kpis` occupancy is understated. Whether the dates are closed on Airbnb/other channels is NOT CHECKED.
3. **P13 January −£232 with no logged edit:** occupancy-based adjustment vs booking recency factor is NOT CONFIRMED (customizations read; no per-date breakdown).
4. **P12 rebook:** Booking.com layers (what the guest saw, promotions, 17.9% commission vs booster) NOT CHECKED here; that is for the channel section.
5. **P11:** the meaning of Reyhan's 24 Nov 30 Nov – 4 Dec "percent, no value" and 14–18 Dec "fixed, no value" overrides is not visible in the log (prices rose +£4 to +£6/night). The 3–4 Jan unbookable gap persists.
6. **P05 Valentine's / Feb overrides** were not re-pulled; availability is NOT CHECKED.
7. **Events** are domain-restricted search summaries, not page reads. These hosts must be allowed in the session's network settings for page reads: www.alexandrapalace.com, allianzstadiumtwickenham.com, www.london.gov.uk and www.sixnationsrugby.com (all failed with ENOTFOUND), plus www.theo2.co.uk, www.excel.london and www.pdc.tv (not tried). Open conflicts:
   - Finals Sunday 16:40 vs 18:40;
   - darts end 3 vs 4 Jan;
   - Jingle Bell Ball 19 Dec (one listing);
   - Mariah Carey dates;
   - NYE final-ticket release date.

   Also: "no darts 24–26 Dec" is inferred, not stated; the 180,000-ticket figure comes from a search summary; FinTech Connect and the 7–9 Dec O2 concerts were not re-found today (UNVERIFIED).
