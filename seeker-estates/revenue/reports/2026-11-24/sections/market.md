# Market & demand calendar: run D = 2026-11-24 (window 25 Nov 2026 – 22 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Kept out of findings: P02/P03/P06/P07 intentional blocks (P06 numbers only); P14 numbers only; P13 = one flat (3064856 + 3090701); 15%/20% stay discounts; Booking.com Visibility Booster; +15% Booking.com markup and derived rate plans; P04 2 Dec +200%; P13 1 Dec +50% (intentional_overrides); P04 never under 3 nights; P12 hands back after 13 Dec (`handbacks`).
- **PriceLabs calls today: all read-only, strictly one at a time (never two in one message):**
  - `get_neighbourhood_data` (detail, future prices + occupancy), 07:20–07:22Z, in this order: 3588993 Scott Ellis Gardens, P13 3064856, P04 3562176, P11 3064196, P05 3166592, P20 3547481, P06 3288517, P12 2699998, P01 3320302. Each file checked (listing_id match, 540 days, `all_operations_ok=true`, source NL) and saved to `scratchpad/m24/neigh_<id>.json`.
  - `get_user_logs` (listing, 23–24 Nov): 16 entries, all Reyhan; **only one is after 23 Nov 06:00Z** (below).
  - `get_listing_date_overrides` P12 from 24 Nov.
- **`market.csv`:** `data/snapshots/2026-11-24/market.csv` already existed as a straight copy of 23 Nov (52 lines, byte-identical). I appended 9 rows dated 24 Nov under `.market.csv.lock` (now 61 lines; `scratchpad/m24/wmarket24.py`). All market figures below come from the 24 Nov rows.
- **Prices:** `prices.csv` 24 Nov, column `pricelabs_price`, 25 Nov – 23 Jan. "yday" = 23 Nov `prices.csv`. After 23 Jan I use the neighbourhood `final_price`. **Smoobu = PriceLabs on every row of `prices.csv` (0 mismatches)**; 3588993 has no Smoobu column.
- **Occ Δ** = daily `market_occupancy` − `market_occupancy_stly`, in points. **Bedroom caveat:** daily P25–P90 mix bedrooms (1–3 BR for P04, P11, P20, P01, P06; 2–3 BR P13, P12; 3–5 BR P05; 2–4 BR 3588993). "est. matched" = mixed P50 × (summary bedroom P50 ÷ mean daily mixed P50, next 30 days). **Estimates.** Ratios today: P04 1.09, P13 0.95, P11 1.13, P05 1.25, P20 1.15, P12 0.97, P01 1.14, P06 1.01, 3588993 1.05.
- **Fortnight method:** unchanged (`scratchpad/m24/analyse24.py` = `m23/analyse23.py` with only the cut-off moved to 25 Nov, the first date in `prices.csv`; event set, exclusions and the NYE-week rule untouched). Output `scratchpad/m24/out24.txt`; comparison `scratchpad/m24/cmp24.txt` (same `cmp23.py` logic); windows `scratchpad/m24/win24.txt`; block detail `scratchpad/m24/items24.txt`.

## 1. Submarket table
P25 / P50 / P75 / P90 (n): `market.csv` 24 Nov rows (PriceLabs Nearby Listings `summary_table`, bedroom-matched). Mkt occ 30/60: `market.csv` `market_occ_30/60` (= `pl_kpis.csv` 24 Nov `market_occupancy_next_30/60`). Our occ: `pl_kpis.csv` `occupancy_next_30/60`. Brackets = 23 Nov.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | P50 23 Nov | Our occ 30/60 |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 37% (51/38) | 233 / **294 / 332** / 392 (172) | 292 | 50 / 68% (50/67) |
| Shepherd's Bush | P13 | 2 | 46 / 34% (47/35) | 187 / **221 / 272** / 353 (117) | 220 | 63 / 50% (63/50) |
| St John's Wood (4 BR) | P05 | 4 | 50 / 39% (50/40) | 457 / **578 / 704** / 1,221 (91) | 582 | 70 / 52% (70/53) |
| **St John's Wood NW8 (3 BR)** | **3588993 Scott Ellis Gardens (unmapped)** | 3 | 45 / 34% (45/35) | 317 / **383 / 473** / 625 (147) | 384 | 67 / 40% (37/25)* |
| Barking | P04 | 2 | 23 / 17% (23/18) | 142 / **175 / 211** / 248 (90) | 175 | 47 / 37% (50/38) |
| Canary Wharf | P20 | 2 | 38 / 29% (38/29) | 216 / **254 / 321** / 424 (149) | 253 | 77 / 53% (73/53) |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 35 / 27% (35/27) | 219 / **263 / 339** / 432 (144) | 262 | 100 / 100%* |
| Mile End (handback 13 Dec) | P12 | 2 | 43 / 32% (44/33) | 172 / **206 / 236** / 292 (117) | 205 | 73 / 87%* (83/92) |
| Marylebone (intentional block, numbers only) | P06 | 2 | 52 / 39% (52/39) | 320 / **414 / 531** / 667 (215) | 414 | 97 / 98%* |
| Primrose Hill (numbers only) | P14 | 1 | 48 / 34% (pl_kpis) | no row | – | 0 / 0% |
| Greenwich (handed back after 26 Nov) | P09 | – | 41 / 30% (pl_kpis) | no row | – | 100 / 100%* |

\* Inflated by handback blocks or new blocks.
- **Market flat day on day:** P50 moved −£4 (P05) to +£2 (P11); n moved by at most 1. Market occ 30 down 0–1 point everywhere.
- **3588993 our occ 30 jumped 37 → 67%:** 9 nights 29 Nov – 9 Dec (29, 30 Nov, 1, 2, 4, 5, 6, 7, 9 Dec) changed from open to **Blocked** in PriceLabs overnight (also 6 and 12 Jan Blocked; 5 Jan unblocked). Booking or owner block — **NOT CHECKED** (unmapped; no PriceLabs log entry). Blocks are not demand.
- P12 our occ 30 83 → 73%: the cancelled Booking.com 4–7 Dec stay is open again (below).
- No `market.csv` row for Greenwich, Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane or Islington (not pulled).

## 2. Items in the brief

### PriceLabs edits since 23 Nov 06:00Z (`get_user_logs`)
| When (Z) | Listing | Change |
|---|---|---|
| 23 Nov 21:18:56 | P12 2699998 (+ Vrbo copy) | **4–6 Dec min stay 2, no price change** (percent type, no value; `get_listing_date_overrides` shows 4/5/6 Dec `min_stay 2`, no price, updated 21:18:56Z) |

- That is the only edit. **P12's refresh at 21:20Z follows it. P13 twins refreshed 21:35Z and P04/P05/P06/P11/P20/3588993 at 00:30–00:31Z on 24 Nov with no logged edit** — this is the "overnight refresh without edits" test case for t-pl-push-1811 (one night; `listings.csv` `last_push`).
- Overnight price moves without edits: **P11 25 Nov – 8 Dec +£6 to +£16/night** (e.g. 30 Nov–4 Dec £1,037 → £1,086); P05 7–14 Dec ±£2; P04 9 Dec 150 → 166, 24 Dec 187 → 175; P11 24 Dec 280 → 268, 25 Dec 291 → 304. Cause = algorithm (no edit logged); not further checked.

### P12 Mile End 4–6 Dec reopened after the Booking.com cancellation
Policy: P12 last night 13 Dec, so 4–6 Dec is inventory. The cancelled stay (made 5 Nov, cancelled overnight) was 3 n, **£677.79 room = £225.93/n** (`reservations.csv`). PriceLabs refresh 23 Nov 21:20Z.

| Nights | Ours today (yday) | Mixed 2–3 BR P25 / **P50** / P75 / P90 £ | est. matched 2 BR P50 (×0.97) | 2 BR summary P50 / P75 × n | Occ / Δ | Read |
|---|---|---|---|---|---|---|
| **4–6 Dec** (Fri–Sun, min 2) | 312 / 332 / 271 = **£915** (322 / 343 / 277 = £942) | 533 / **652** / 822 / 1,029 | ≈ 632 | 618 / 708 | 54.6 / 62.8 / 47.0%; **−11.6 / −8.9 / −14.3** | **Above the mixed P75 by £93 (1.40× the mixed P50)** in a market 9–14 points under STLY. The Mile End market supports ≈ **£650–820** (mixed P50 to P75), i.e. £217–274/n. The cancelled sale (£678) sat at 1.04× the mixed P50. |
| 30 Nov – 3 Dec (min 2) | 242 / 241 / 256 / 275 = **£1,014** (£1,090) | 686 / **830** / 1,029 / 1,241 | ≈ 805 | 824 / 944 | 38–45%; −9.2 / −8.2 / −10.9 / −15.4 | at the mixed P75 (−£15); £184 over P50 |
| **30 Nov – 6 Dec run (7 n open before the 7–14 Dec check-in)** | **£1,929** (avg £276) | 1,219 / **1,482** / 1,851 / 2,270 | ≈ 1,438 | 1,442 / 1,652 | avg 46.4%; avg **−11.2** | **£78 over the mixed P75, £447 over the mixed P50**; 5 of 7 nights above the mixed P75 |
| 26 Nov (min 1, +15% override since 4 Nov) | **294** (307) | 168 / 202 / 233 / 310 | ≈ 196 | – | 59.7% / −3.6 | 1.26× the mixed P75, near P90 |

- Booking.com sees Smoobu × 1.15 (policy markup) → ≈ £1,052 for 4–6 Dec before Booking.com promotions (estimate; channel layers for the channel section).
- P12 is still the strongest-pacing flat vs its market (our occ 30 73% vs market 43%), so the over-P75 list has sold before here; but the market under it is soft (Δ ≈ −11) and the reopened nights are 10–12 days out.

### 3588993 Scott Ellis Gardens (NW8, 3 BR, base 450) vs the NW8 3-bed market
3 BR summary: P25 317 / **P50 383 / P75 473** / P90 625 (n=147). **Base 450 = 1.17× the 3 BR P50 and 0.95× P75** (unchanged; no edit since 23 Nov 00:17Z). Daily figures mix 2–4 BR; est. matched = mixed P50 × 1.05. Refresh 24 Nov 00:31Z. Still unmapped (not in `id_map.json`/policy; no Smoobu column).

| Window (open nights) | Ours £ | Mixed P25 / **P50** / P75 £ | est. matched P50 £ | Ours vs est. matched | Nights > mixed P75 / < mixed P50 | Avg occ / Δ |
|---|---|---|---|---|---|---|
| 25 Nov – 24 Dec (10 open: 10–14, 16–20 Dec; 25 Nov–9 Dec and 15 Dec Blocked, 21–25 Dec Booked) | **4,375** (avg 438) | 2,930 / **3,710** / 4,906 | 3,896 | **+£479 (1.12×)** | 0 / 0 | 42.8% / **+9.9** |
| 26–31 Dec NYE (6 open, min 4–7) | 3,444 (490–623) | 2,119 / 2,853 / 3,632 | 2,996 | **+£448 (1.15×)** | 2 (30–31 Dec) / 0 | 54.2% / +0.7 |
| 1–2 Jan | 968 | 590 / 775 / 980 | 814 | +£154 | 0 / 0 | 42.2% / +13.1 |
| 3–23 Jan (19 open) | 6,052 (avg 319) | 4,448 / 5,635 / 7,287 | 5,917 | +£135 (1.02×) | 0 / 1 | 14.9% / +5.1 |
| **All 37 open nights to 23 Jan** | **14,839** (avg 401) | 10,087 / **12,973** / 16,805 | 13,622 | **+£1,217 (1.09×)** | 2 / 1 | 30.3% / +6.1 |

- **Read: priced about 9% over the estimated 3 BR median on what is still open; under the mixed P75 everywhere except 30–31 Dec.** Yesterday: +£945 on 46 open nights (1.06×). The ratio rose because the 9 newly Blocked nights (29 Nov – 9 Dec) were nearer the median, not because of a price change (open nights 10–20 Dec moved +£6 to +£15 on the overnight refresh).
- **10–20 Dec is supported:** +£479 over est. matched in a market +9.9 points on STLY (up to +18.4 on 19 Dec). **NYE 26–31 Dec is still the rich spot:** +£448 over est. matched, above the mixed P75 on 30–31 Dec (619 / 618 vs 611 / 589), with Δ only +0.7. Fact, not a proposal (t-scott-ellis-2011).
- First booking 21–26 Dec: still Booked; unchanged from yesterday's read (sold ≈ 0.66× list, below the mixed P25; channel NOT CHECKED).

### P05 St John's Wood (4 BR): December (refresh 24 Nov 00:30Z)
| Nights | Ours (yday) | 4 BR summary P50 × n; daily 3–5 BR P50 / P75; est. matched (×1.25) | Occ Δ | Read |
|---|---|---|---|---|
| 29 Nov – 2 Dec (4 open, min 3) | 503 / 489 / 484 / 490 = **£1,966** (£1,980) | **2,312**; 1,687 / 2,209; ≈ 2,109 | −1.1 / −3.4 / −5.3 / −6.3 | £346 under the 4 BR median, ≈ £143 under est. matched; soft (Δ < 0) — not compression |
| **7–8 Dec** (min 2) | 429 / 407 = **£836** (£835) | **1,156**; 872 / 1,147; ≈ 1,090 | +4.4 / +0.1 | **£320 under the 4 BR median**, ≈ £254 under est. matched; under even the mixed 3–5 BR P50 (−£36) |
| **13–14 Dec** (min 2) | 483 / 477 = **£960** (£964) | **1,156**; 864 / 1,144; ≈ 1,080 | **+10.6 / +4.0** | **£196 under the 4 BR median**, ≈ £120 under est. matched; P05's most compressed open pair |
| 21 Dec orphan (+300%, min 1) | **2,194** (2,215) | 4 BR P90 1,221 | +5.7 | 1.80× the 4 BR P90 (confirm/revert stands) |
| 29 Dec orphan (+300%, min 1) | **2,247** (2,392) | 4 BR P90 1,221 | +3.2 | 1.84× the 4 BR P90 |
- Every other December night is Booked. Day on day: no material change (no edit; −£14 to +£1 on open pairs).

### P05 Valentine's 13–16 Feb (4 n; beyond `prices.csv`, neighbourhood `final_price`)
| Item | £ (4 n) | Note |
|---|---|---|
| **PriceLabs today (13 / 14 / 15 / 16 Feb)** | **438 / 408 / 417 / 420 = 1,683** (yday 438 / 410 / 419 / 421 = 1,688) | Feb overrides not re-pulled |
| Fortnight (6–12 + 17–23 Feb, `final_price`) | 422.1/n | **14 Feb (Sun, Valentine's + Eng v France) £408 = £14.1 under**; only Sat 13 Feb above (+£15.9) |
| Daily 3–5 BR P25 / P50 / P75 | 1,191 / **1,533** / 2,107 | – |
| est. matched 4 BR P50 (×1.25) | ≈ **1,916** | – |
| 4 BR summary P25 / P50 × 4 | 1,828 / 2,312 | horizon unstated |
| Market occ / Δ | 16.0 / 12.3 / 10.9 / 11.4%; **+7.4 / +1.8 / −0.8 / −0.6** | 81–84 days out |
- **Read unchanged: PriceLabs does not price Valentine's** (under the fortnight on the 14th). Market supports **≈ £1,830–1,920** (4 BR P25 to est. matched P50): **£145–233 above today**. Mild compression on Sat 13 Feb only. Availability in Smoobu/Airbnb NOT CHECKED.

### P04 Barking 7–22 Dec (refresh 24 Nov 00:31Z; −2% 6–23 Dec min 3 live)
| Block | Ours today (yday) | Mixed P50 / P75; est. matched (×1.09) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| **7–22 Dec, 12 open nights** (7–9, 14–22; 10–13 Booked) | **£1,900** (avg £158) | **1,894 / 2,458**; ≈ 2,064 | avg −0.6 (11–26%) | **Level with the mixed P50 (+£6), ≈ £164 under est. matched**, £558 under P75. Thin market. |
| 7–9 Dec | 170 / 169 / 166 = £505 (£491; 9 Dec 150 → 166) | 459 / 602; ≈ 500 | −0.7 / +0.7 / **−8.3** | +£46 over P50, at est. matched |
| 14–22 Dec (incl. Horse Show 17–21) | 144 / 148 / 151 / 153 / 157 / 163 / 160 / 160 / 159 = **£1,395** (£1,406) | 1,435 / 1,856; ≈ 1,564 | −4.7 / −6.1 / −2.1 / +0.4 / +2.4 / +3.9 / +3.9 / +0.5 / +2.4 | **£40 under the mixed P50 (8 of 9 nights under), ≈ £169 under est. matched.** Horse Show 17–21 Dec £793 vs P50 £805 (−£12) |
| 23–26 Dec (min 3/2/2/2) | 162 / 175 / 188 / 185 = £710 (£727) | 699 / 858; ≈ 762 | +4.0 / +5.0 / **+8.5** / +2.1 | +£11 over P50, ≈ £52 under est. matched |
- Market support stays at about est. matched P50 (≈ +£164 on 7–22 Dec), not P75: occupancy 11–26% with Δ around zero. The unsynced Barking Airbnb (t-p04-doublebook) is for the channel section.

### P20 Waterford Court: 14–18 Dec, 5 / 26 Dec (refresh 24 Nov 00:31Z)
| Block | Ours (yday) | Mixed P50 / P75 / P90; est. matched (×1.15) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| 14–18 Dec (min 3) | 287 / 304 / 299 / 332 / 346 = **£1,568** (£1,561) | 1,104 / 1,397 / 1,792; ≈ 1,270 | **−11.5 / −11.0 / −8.9 / −8.3 / −7.5** (27–30%) | **£171 over the mixed P75, ≈ £298 over est. matched** in a market 7.5–11.5 points under STLY. No case to go higher; soft spot. |
| 5 Dec orphan (min 1, +100%) | **582** (591) | 229 / 295 / **401** | +5.1 (58.1%) | **1.45× the mixed P90.** Jingle Bell Ball 5–6 Dec (O2). Fact for Corentin's confirm/revert. |
| 26 Dec orphan (min 1, +100%) | **509** (508) | 250 / 320 / **418** | +0.9 (35.9%) | **1.22× the P90.** Disney On Ice from 24 Dec; no compression. |

### P11 Camden: darts, 30 Nov – 4 Dec, 3 Jan (refresh 24 Nov 00:30Z; no P11 edit logged)
| Nights | Ours (yday) | Mixed P50 / P75; est. matched (×1.13) | Occ Δ (occ) | Read |
|---|---|---|---|---|
| **30 Nov – 4 Dec** (min 2) | 196 / 195 / 204 / 230 / 261 = **£1,086** (£1,037, **+£49**) | **1,263 / 1,606**; ≈ 1,427 | −2.8 / −2.1 / −2.8 / +0.9 / +1.3 (44–72%) | **£177 under the mixed P50 (all 5 nights under), ≈ £341 under est. matched.** Market ≈ STLY. Supports ≈ P50 to est. matched. |
| 25–26 Nov (min 2, Reyhan 23 Nov) | 207 / 229 (197 / 219) | 464 / 608 | −9.5 / −7.3 (62–68%) | £28 under P50, soft |
| 8 Dec orphan (min 1) | 245 (233) | 258 / 309 | +6.1 | £13 under P50 |
| **14–17 Dec** Round One (min 2) | 203 / 213 / 223 / 244 = **£883** (£894) | 1,005 / 1,200; ≈ 1,136 | −6.5 / −3.5 / −2.1 / +0.8 (22–29%) | **£317 under the policy level** (21 Oct: above £300/n = £1,200); £122 under the mixed P50; ≈ £253 under est. matched |
| 18 Dec | 309 (314) | 281 / 339 | +0.5 | above P50 |
| **23 Dec** Round Two (12:30 and 19:00 sessions) | 291 (290) | 286 / 393 | −0.7 (32.5%) | at the mixed P50 (+£5) |
| 24–25 Dec (**no darts**) | 268 / 304 (280 / 291) | 290 / 309 | −4.7 / −9.9 | near P50 in a market below STLY. No event. |
| **3 Jan** final (20:00) | **151** (144) | 221 / 278; ≈ 250 | +1.1 (19.5%) | **Still unbookable**: 3–4 Jan `available=False`, 5 Jan Blocked, min 3 → 2-night gap. £70 under the mixed P50. (The 5 Jan 2027 – 31 Jul 2029 Smoobu block is beyond `prices.csv`; only 5 Jan visible here.) |

### P13 Shepherd's Bush: December / January (refresh 23 Nov 21:35Z, no edit logged)
- **27 Nov (Finals Fri), only open night before 1 Dec:** 265 (262), min 1. Mixed P50 239 / P75 295, occ 75.4%, Δ +4.7 → **£29.2 over the fortnight (235.8): priced.** 28–30 Nov Booked.
- **1 Dec:** 235 (232); twin 188 (163). Policy +50% stands — not raised.
- **13–21 Dec (9 open):** 193 / 190 / 190 / 194 / 201 / 214 / 219 / 208 / 211 = **£1,820** (yday £1,811).
  - Mixed P50 £2,112 / P75 £2,708; est. matched ≈ £2,006.
  - Δ +6.3 / +5.8 / −3.0 / +3.0 / +7.0 / +8.9 / **+12.7 / +8.7 / +12.6** (27–50%).
  - **£292 under the mixed P50 (all 9 nights under), ≈ £186 under est. matched** on a compressing market. 19–21 Dec £638 vs P50 £748 (−£110).
  - Reyhan's 14–16 Dec −2% and 20–21 Dec min 2 (23 Nov) still with Corentin as confirm or revert.
- **Twins now apart:** 3090701 is £7–9/night above 3064856 on all 9 open nights 13–21 Dec (£1,893 vs £1,820); yesterday identical. Change came with the 21:35Z refresh (no edit logged).
- **22 Dec – 2 Jan fully taken** (22–26 Dec booked on 3064856, 27 Dec – 2 Jan booked on 3090701; the other twin Blocked = linked, not a block).
- **January (−8% 2–31 Jan, Reyhan 23 Nov):** 3–23 Jan 21 open nights **£3,581** vs mixed P25 £3,522 / P50 £4,273 / est. matched ≈ £4,059; occ 13.5%, Δ +4.6. Every night under the mixed P50; prices at the mixed P25 in a market above STLY (confirm or revert stands).

## 3. Demand calendar, next 90 days
**Re-checked 24 Nov 2026 ~07:25Z.** `WebFetch` of www.alexandrapalace.com failed again (`ENOTFOUND`); I did not try other venue hosts. **Every event fact is a WebSearch summary restricted to the venue/organiser domain, checked 24 Nov 2026 — not a page read.**

- **Twickenham (Allianz Stadium) Finals Weekend** — [Finals page](https://allianzstadiumtwickenham.com/nations-championship), [What's on](https://allianzstadiumtwickenham.com/whats-on), [Sun visit page](https://allianzstadiumtwickenham.com/plan-your-visit/nations-championship-finals-weekend-sunday/essential-information), [England v NZ preview](https://www.englandrugby.com/follow/news-and-media/finals-weekend-england-v-new-zealand-preview-2026-nations-championship).
  - Fri 27 Nov: Italy v Fiji 16:40, Ireland v Australia 20:10. Sat 28 Nov: Wales v Japan 13:10, **England v NZ 16:40**. Sun 29 Nov: Scotland v Argentina 13:10, **France v South Africa Grand Final 16:40**.
  - Conflict persists: Sunday visit page "key timings" 15:10 / 18:40 (marked approximate).
- **England v France, Sun 14 Feb 2027, 15:10 GMT**, Twickenham — [Six Nations fixture](https://www.sixnationsrugby.com/en/m6n/fixtures/202700/england-v-france-14022027-1510), [England Rugby ticketing](https://help.englandrugby.com/support/solutions/articles/103000411510-guinness-men-s-six-nations-england-v-france-sunday-14th-february-2027), [clubs page](https://help.englandrugby.com/support/solutions/articles/103000347582-information-for-clubs-for-guinness-men-s-six-nations-2027). Re-verified (fixture header shows "07:10", structured data 15:10 — display artefact).
- **World Darts Championship, Alexandra Palace** — [Ally Pally schedule](https://www.alexandrapalace.com/blog/all-you-need-to-know-world-darts-championship/), [event](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [PDC FAQ](https://www.pdc.tv/WCFAQ), [PDC calendar](https://www.pdc.tv/calendar/).
  - **Fri 11 Dec – Sun 3 Jan**, Great Hall. Round One from 11 Dec; Round Two 20–23 Dec (23 Dec 12:30 and 19:00); **schedule jumps from 23 to 27 Dec, so no sessions 24–26 Dec** (inferred from both schedules; no source says it in words); Round Three from 27 Dec; R4 29–30 Dec; QF 1 Jan; SF 2 Jan 19:30; **final 3 Jan 20:00**.
  - "A record 180,000 tickets" (search summary of Ally Pally/PDC, not page-read).
  - Conflict: PDC registration/ballot pages say 4 Jan; PDC FAQ shows 14 Dec as evening-only.
- **The O2 arena** — [listing](https://www.theo2.co.uk/events/venue/the-o2-arena), [Jingle Bell Ball](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026), [Disney On Ice](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic).
  - **Jingle Bell Ball Sat 5 – Sun 6 Dec** (event page; doors 16:30). **Disney On Ice 24 Dec – 3 Jan.** Bryson Tiller 7 Dec, Kehlani 8 Dec, Ocean Colour Scene 9, The Darkness 16, Kasabian 18, Culture Club 19 Dec.
  - **New conflicts today:** the listing summary gives Mariah Carey 5–6 Dec (same dates as Jingle Bell Ball; yesterday 1–2 Dec); a Myles Smith page mentions a Jingle Bell Ball on 19 Dec. Both UNVERIFIED.
  - Jungle 24–25 Nov: 24 Nov is today and 25 Nov is Booked on P04/P20 — not in the window that matters.
- **ExCeL** — [what's on](https://www.excel.london/visitor/whats-on), [Horse Show](https://www.excel.london/m/visitor/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live), [Cisco Live](https://www.excel.london/mobile/visitor/whats-on/cisco-live-2027), [FinTech Connect](https://www.excel.london/whats-on/fintech-connect).
  - FinTech Connect 1–2 Dec; **Horse Show 17–21 Dec**; Scrooge Cirque and Wundrful World of Christmas (December; dates not re-checked); EAG Expo 12–14 Jan; **MegaCon 23–24 Jan**; Genomics 27–28 Jan; **Cisco Live 8–12 Feb (whole venue; one ExCeL page 7–12 Feb)**; Motor Show 26–28 Feb (outside window).
- **NYE fireworks** — [london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026): Thu 31 Dec 20:00 – Fri 1 Jan 00:30; Ticketmaster only, max 4; £20/£35 Londoners, £40/£55 others; final batch on sale (release date conflicts: 20 Nov vs 24 Nov). No attendance figure stated.
- **Valentine's Day:** Sun 14 Feb 2027 (calendar).

Effect = Occ Δ (compression ≥ +5, soft ≤ −2). Properties from VENUES in `build/properties.py` (Twickenham: P18/P10/P13/P16; O2: P01/P09/P07/P04; ExCeL: P01/P04/P07/P15; Ally Pally: P08/P11). P20, P12 and 3588993 are not in VENUES; I group P20 with P01 for O2/ExCeL. Blocked/handed-back/not-pulled VENUES properties named only (P01 blocked 30 Nov – 17 Dec and gone after 20 Dec; P09 gone after 26 Nov; P08/P10 handed back; P07 intentional block). "vs fortnight" = `prices.csv` 24 Nov vs the fortnight mean (`out24.txt`).

| Nights | Event | Venue | Open properties | Effect (Occ Δ) | Ours £ vs fortnight £ | Priced by PriceLabs? |
|---|---|---|---|---|---|---|
| 27 Nov | Finals Fri | Twickenham | P13 | +4.7 normal (75.4%) | 265 vs 235.8 | **yes** |
| 28–29 Nov | Finals Sat/Sun | Twickenham | P13 booked; P11 booked 27–29 | P13 +4.4 / +1.8 | – | – |
| 1–2 Dec | FinTech Connect | ExCeL | P04 1 Dec (2 Dec policy override) | – | not in event set | – |
| 5–6 Dec | Jingle Bell Ball (Mariah Carey 5–6 UNVERIFIED) | O2 | P20 5 Dec; P04 6 Dec | P20 +5.1; P04 0.0 | P20 582 vs 317.4; P04 168 vs 164.3 | P20 yes (manual, 1.45× P90); P04 yes |
| 7–9 Dec | Bryson Tiller 7, Kehlani 8, OCS 9 | O2 | P04 | −0.7 / +0.7 / −8.3 | 8 Dec 169 vs 161.7 (UNVERIFIED label in set) | yes |
| 11–13 Dec | Darts opens | Ally Pally | P11 booked; P04 booked | P11 +8.1 / +6.6 / +1.8 | – | – |
| 14–17 Dec | Darts Round One; Darkness 16 | Ally Pally / O2 | P11; P04; P20 | P11 −6.5 / −3.5 / −2.1 / +0.8; P20 −11.5 to −8.3 soft | P11 **203 / 213 / 223 / 244** vs 266.2; P20 16 Dec **299** vs 312.7 (17 Dec 332 above); P04 16 Dec **151** vs 152.2 | **P11 no**; P20 16 Dec no (but over P75, soft); P04 16 Dec level (−£1.2) |
| 17–21 Dec | Horse Show | ExCeL | P04 (P20 by proximity) | P04 +0.4 / +2.4 / +3.9 / +3.9 / +0.5 | P04 153 / 157 / 163 / 160 / 160 vs 152.2 (17–19) and 143.0 (20–21) | yes vs fortnight; at mixed P50 |
| 13–21 Dec | pre-Christmas (no single event) | London | P13; P05 13–14; 3588993 | P13 to **+12.7**; P05 **+10.6** / +4.0; 3588993 to **+18.4** | P13 £1,820 vs P50 £2,112; P05 £960 vs 4 BR median £1,156; 3588993 £4,375 vs est. P50 £3,896 | **P13, P05 no** (under median); 3588993 yes |
| 20–26 Dec | Christmas; Disney On Ice from 24 | O2 | P04 (7 n open) | +3.9 / +0.5 / +2.4 / +4.0 / +5.0 / +8.5 / +2.1 | £169.9/n vs fortnight 143.0 | yes vs fortnight; ≈ est. matched −£52 on 23–26 |
| 23 Dec | Darts Round Two (last day) | Ally Pally | P11 | −0.7 | **291** vs 292.0 | ≈ level (−£1.0) |
| 24–26 Dec | Christmas (**no darts**) | – | P11 24–25 | −4.7 / −9.9 soft | 268 / 304 vs 292.0 | n/a: no event |
| 26 Dec | Disney On Ice | O2 | P20 | +0.9 | 509 vs 315.4 | yes (manual, 1.22× P90) |
| 27 Dec – 2 Jan | NYE; darts R3–SF | Embankment / Ally Pally | P04, P11, P20, P13 taken; **3588993 open** | 3588993 −3.4 … +16.2 (31 Dec +7.9) | 3588993 26–31 Dec £3,444 vs est. P50 £2,996 | 3588993: priced (+15%, above P75 30–31 Dec) |
| 3 Jan | Darts final | Ally Pally | P11 (**unbookable**) | +1.1 | 151 vs 163.0 (n=1) | no |
| 23–24 Jan | MegaCon | ExCeL | P20 | 23 Jan in `prices.csv` | 230 / 242 vs 243.1 | **no** (23 Jan −£13.1; beyond 17 Jan headline) |
| 8–12 Feb | Cisco Live | ExCeL | P20, P04 | (final_price) | P20 265 / 258 / 253 / 248 / 277 vs 256.6; P04 162 / 162 / 160 / 158 / 170 vs 161.9 | level (too early) |
| 13–16 Feb | Valentine's (Sun 14) | – | P05 | +7.4 / +1.8 / −0.8 / −0.6 | 438 / **408** / 417 / 420 vs 422.1 | **no** |
| 14 Feb | Eng v France 15:10 | Twickenham | P13 | −2.8 soft (7.9%) | 192 vs 191.8 | level (+£0.2; too early) |

## 4. Missed compression: open nights on events priced at or below the fortnight
Same method and 17 Nov event set, nights 25 Nov – 17 Jan. 23 Nov values in brackets.

| Ref | Night(s) | Event | Ours 24 Nov (23 Nov) | Fortnight £ (23 Nov) | Gap £ (23 Nov) |
|---|---|---|---|---|---|
| P04 | 16 Dec | Horse Show week (new: 152 → 151, fortnight up) | 151 (152) | 152.2 (149.5) | **1.2** (−2.5, not counted) |
| P20 | 16 Dec | Darkness / Horse Show | 299 (298) | 312.7 (308.9) | 13.7 (10.9) |
| **P11** | **14–17 Dec** | Darts Round One | **203, 213, 223, 244** (206, 215, 225, 248) | 266.2 (267.7) | **63.2, 53.2, 43.2, 22.2** (61.7, 52.7, 42.7, 19.7) |
| P11 | 23, 24 Dec | Darts (24 no play) | 291, 268 (290, 280) | 292.0 (292.8) | 1.0, 24.0 (2.8, 12.8) |
| P11 | 3 Jan | Darts final (unbookable) | 151 (144) | 163.0, n=1 (155.0) | 12.0 (11.0) |
| | | **Total, same event set** | | | **9 nights / £233.7** (23 Nov **11 / £331.0**) |
| | | Bookable now (excl. P11 3 Jan) | | | 8 / £221.7 (23 Nov 9 / £289.1) |
| | | Bookable and on event nights (excl. P11 3 Jan and 24 Dec) | | | **7 / £197.7** (23 Nov 7 / £274.5) |

**Change vs yesterday: −2 nights / −£97.3** (331.0 → 233.7; `cmp24.txt`).
- **Left, 3 nights, −£116.7:** P04 24 Nov (−£30.9) and **P20 24 Nov (−£84.0)** — 24 Nov is today and not in `prices.csv` (date passed); P11 25 Dec (−£1.8: 291 → 304, now £12.0 above).
- **Entered, 1 night, +£1.2:** P04 16 Dec (151 vs fortnight 152.2; fortnight rose £2.7 as 9 Dec repriced 150 → 166).
- **Changed, 8 nights, +£18.2** = our prices +£14 net (P11 24 Dec −12; P11 14–17 Dec −3/−2/−2/−4; P11 23 Dec +1; P11 3 Jan +7; P20 16 Dec +1) + fortnight drift +£4.2 (P11 3 Jan +8.0; P20 16 Dec +3.8; P11 Round One −1.5 × 4; P11 23–24 Dec −0.8 × 2).
- Check: −116.7 + 1.2 + 18.2 = −97.3. Matches.
- **Not counted** (beyond 17 Jan, same as yesterday): **P20 23 Jan £13.1** (now inside `prices.csv`, 230 vs 243.1), P20 24 Jan £1.1, P20 10–11 Feb £3.6 / £8.6, P04 10–11 Feb £1.9 / £3.9; **P05 14 Feb Valentine's £14.1** (outside the venue set). P13 14 Feb left (£0.7 → −£0.2).

**Read with care:**
- **£181.8 of the £233.7 is P11 Round One 14–17 Dec**, in a market at/below STLY (Δ −6.5 to +0.8). The fair reference is the policy level (£1,200 vs £883, gap £317).
- Most of today's fall is calendar (24 Nov passed), not pricing: P20 24 Nov's £84.0 was largely a fortnight artefact.
- **The larger under-market items sit outside this headline:** P13 13–21 Dec −£292 vs mixed P50 (Δ to +12.7); P05 7–8 Dec −£320 and 13–14 Dec −£196 vs the 4 BR median (Δ +10.6); P11 30 Nov – 4 Dec −£177 vs mixed P50; P13 3–23 Jan −£692 vs mixed P50 (−8% edit); P05 Valentine's £145–233.
- **On the other side:** P12 4–6 Dec (£93 over mixed P75, Δ −11.6) and P20 14–18 Dec (£171 over mixed P75, Δ −9.4) are priced above a soft market.

Data gaps:
1. **Market source:** PriceLabs Nearby Listings only (Airbnb-derived, `cleaning_fee` null, summary horizon unstated). Daily percentiles mix bedrooms, so "est. matched" are ratio estimates. No Market Dashboard / Competitor Listings pulled. Not pulled: P09/P14, P02/P03/P07/P08/P10/P15–P19. 3588993 not in `id_map.json`/policy.
2. **3588993:** 9 nights 29 Nov – 9 Dec and 6/12 Jan newly Blocked (5 Jan unblocked) — booking vs owner block NOT CHECKED. 21–26 Dec sale channel/discount layers still NOT CHECKED.
3. **P12 4–6 Dec:** what Booking.com shows the guest now (Smoobu × 1.15 less promotions) NOT CHECKED here — channel section. PriceLabs list on 5 Nov (booking day) not available in today's files, so paid ÷ list for the cancelled stay is not computed.
4. **P11:** the 5 Jan 2027 – 31 Jul 2029 Smoobu block is beyond `prices.csv` (only 5 Jan Blocked is visible); confirmation is for the Smoobu/occupancy section. Cause of P11's +£6–16/night overnight rise (no edit) NOT CHECKED.
5. **P05 Valentine's / Feb overrides** not re-pulled; availability in Smoobu/Airbnb NOT CHECKED.
6. **Events** are domain-restricted search summaries, not page reads; www.alexandrapalace.com (ENOTFOUND), and allianzstadiumtwickenham.com, www.pdc.tv, www.theo2.co.uk, www.excel.london must be allowed in the session's network settings for page reads. Conflicts: Finals Sunday 16:40 vs 18:40; darts end 3 vs 4 Jan; Mariah Carey 5–6 Dec vs Jingle Bell Ball 5–6 Dec (and 1–2 Dec yesterday); Jingle Bell Ball 19 Dec (Myles Smith page); Cisco Live 7–12 vs 8–12 Feb; NYE final-ticket release 20 vs 24 Nov. "No darts 24–26 Dec" is inferred from the schedule gap, not stated. The 180,000-ticket figure is from a search summary.
7. **t-pl-push-1811:** 24 Nov 00:30–00:31Z refreshes on six listings with no logged edit (and P13 21:35Z on 23 Nov) — one night, not yet a pattern.
