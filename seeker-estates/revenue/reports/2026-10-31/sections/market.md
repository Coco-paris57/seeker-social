# Market & demand calendar: run D = 2026-10-31 (window 31 Oct 2026 – 29 Jan 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Excluded: P02/P03/P06/P07 intentional blocks; nights after the handbacks (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 report-only; P13 = one flat. Not re-raised: P04 2 Dec +200%, the 15%/20% stay discounts, the Booking.com booster.
- **Market data:** PriceLabs `get_neighbourhood_data`, pulled 31 Oct, **one call at a time** (9 calls, all `all_operations_ok=true`).
  - Detail mode for P04 3562176, P05 3166592, P12 2699998, P20 3547481, P11 3064196 and P13 3064856. Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m31/neigh_<id>.json`.
  - Summary mode for P01 3320302, P06 3288517 and P09 3318172.
  - This is Nearby Listings data: Airbnb-derived, "Host-only fee", `cleaning_fee: null`. It is not a comp set.
  - Daily bands (`br_range_selected`): P12 and P13 2–3 BR; P04, P11 and P20 1–3 BR; P05 3–5 BR.
  - Column names: `market_25/75/90_percentile_prices`, `market_price` (= P50), `booked_50_percentile_price` ("booked median"), `occupancy.daily.market_occupancy` and `_stly`, and `prices_with_default_customization` ("PL default").
- **market.csv:** `data/snapshots/2026-10-31/market.csv` was copied forward from 30 Oct under `.market.csv.lock`. I appended 9 rows dated 31 Oct (summary_table, same-bedroom row; occ from `pl_kpis.csv` 31 Oct).
- **Our prices:** `data/snapshots/2026-10-31/prices.csv`, column `pricelabs_price`, which runs to 30 Dec. From 31 Dec I used neighbourhood `final_price` (31 Oct).
  - Refresh times (`raw/prices_*.json` `last_refreshed_at`): P11 30 Oct 22:07Z, P13 22:10Z, P05 22:10Z, P04/P20 22:15Z (all after Reyhan's edits); P12 31 Oct 05:42Z; P01 06:29Z; P06/P09 30 Oct 08:2x–08:34Z.
- **Booking state comes from Smoobu** `reservations.csv` (31 Oct, confirmed stays).
- **Changes since yesterday's run:** `get_user_logs` (listing, 29–31 Oct) returned **35 entries, all by reyhan on 30 Oct 22:05–22:12Z**. Overrides re-pulled for P05 and P11 (`get_listing_date_overrides`, 31 Oct). Customizations pulled for P13 3064856.
- **Fortnight method and script are unchanged** from 30 Oct: 7 nights either side; blocked nights and nights above 2× the median excluded; clean week for 16–20 Dec and 3 Jan.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m31/analyse31.py`, output in `.../m31/out31.txt`.
  - Open-night tables: `.../m31/open31.py <ref> <from> <to>`.
- **Events were re-verified 31 Oct 2026 with WebSearch restricted to venue or organiser domains** (search summaries, not page reads; see Data gaps).

## Reyhan's edits of 30 Oct 22:05–22:12Z that touch market pricing (`get_user_logs`)
| Ref | Edit | Effect today (`prices.csv`) | Status |
|---|---|---|---|
| **P05** | 9 Nov: +100%, then +150%, then **+300%, min 1** (22:09:42Z; confirmed in overrides) | 9 Nov **£1,442** (30 Oct: £426). Market P50 £369, P75 £516, **P90 £719** | **a-p05-9nov is not effectively fixed.** The 1-night minimum is now there, but at 2.0× market P90 the orphan night is still unsellable in practice. Corentin to confirm whether this was meant as a soft block. |
| P05 | 7–8 Dec +3%, min 2 | 504 / 493 (£997) vs PL default 649 / 614 | Partly done (see 2b) |
| **P04** | 1–2 Nov +25%, then **+50%, min 2** (22:12:14Z) | 231 / 231, min 2 | **Conflicts with a standing decision.** `listing_facts.P04.min_stay_rule` says "Never open for less than 3 nights". Corentin to confirm. This is not a new proposal. |
| P04 | 18–24 Nov **−3%**, min 3 (replaces the 24 Oct −8% on those dates) | 204 / 203 / 214 / 216 / 204 / 202 / 205 | Information (see 2a) |
| **P11** | **13–16 Dec −2%, min 2** (darts); −2% on 18–19 and 22–25 Nov, 29 Nov – 4 Dec, 8–9 Dec; −3% on 31 Oct and 10 Nov | Darts 13–17 Dec: 226 / 201 / 204 / 215 / 234 | **Conflicts with a standing decision.** `listing_facts.P11.darts_override_24oct` says "leave the darts override as it is (+5%)". It is now −2%. Corentin to confirm. |
| P20 | 27 Dec min 6; Jan 2027 −5% min 3; Feb 2027 −5% min 4 | 27 Dec £411, min 6 | Information |
| P13 | 31 Oct −1% min 3; 1–3 Nov and 4–12 Nov min 2 (both twins + Vrbo child) | 8–12 Nov £149–155 | See 2e |

## 1. Submarket table
Market occ 30/60 is from `pl_kpis.csv` 31 Oct (`market_occupancy_next_30/60`). Percentiles are from `market.csv` 31 Oct (summary_table, same-bedroom row). Our occ is from `pl_kpis.csv` (`occupancy_next_30/60`). Base and the PL recommended base are from `listings.csv` 31 Oct.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50** / **P75** / P90 £ | Our occ 30/60 | Base / PL rec. |
|---|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 34 / 28% | 215 / **259 / 332** / 422 | 100 / 100%* | 253 / 255 |
| Canary Wharf | P20 | 2 | 37 / 29% | 215 / **254 / 314** / 408 | 30 / 25% | 350 / 347 |
| Barking | P04 | 2 | 24 / 20% | 139 / **170 / 218** / 257 | 53 / 53% | 220 / – |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 110 / **134 / 161** / 204 | 83 / 92%* | 176 / 176 |
| Mile End (HB 13 Dec) | P12 | 2 | 40 / 33% | 171 / **205 / 244** / 303 | 53 / 60% | 284 / 273 |
| Marylebone (blocked on purpose) | P06 | 2 | 45 / 40% | 312 / **406 / 510** / 625 | 77 / 88%* | 357 / 342 |
| Camden | P11 | 2 | 46 / 38% | 230 / **289 / 330** / 391 | 40 / 37% | 286 / 285 |
| St John's Wood | P05 | 4 | 40 / 38% | 469 / **582 / 719** / 1,162 | 90 / 70% | 550 / 548 |
| Shepherd's Bush | P13 | 2 | 41 / 36% | 188 / **225 / 281** / 344 | 63 / 47% | 250 / 233 |
| Islington (HB 13 Nov) | P08 | 2 | 49% (30) | 183 / 228 / 284 / 334 (`market.csv` 27 Oct, not re-pulled) | – | 250 / 252 |
| Primrose Hill (report only) | P14 | 1 | 41% (30) | 153 / 205 / 255 / 298 (27 Oct) | 0% | 525 / 511 |

\* Inflated, because PriceLabs counts handback or intentional blocks as occupied.

- **2 BR P50 vs yesterday** (`market.csv` 30 → 31 Oct): P12 206 → 205, P20 254 → 254, P11 289 → 289, P13 226 → 225, P01 257 → 259, P04 173 → 170, P06 403 → 406. P05 4 BR: 577 → 582. P09 1 BR: 136 → 134.
- **Open-night market occupancy vs STLY** (daily `market_occupancy` / `_stly`, averaged over our Smoobu-open nights to 30 Dec or the handback):
  - P13 34.5 vs 29.2% (**+5.3 points**)
  - P05 34.4 vs 32.2% (+2.2)
  - P11 32.2 vs 32.7% (level)
  - P12 33.9 vs 36.4% (**−2.5**)

## 2. Asked-for checks

### 2a. P04 Barking, 20–22 Nov reopened (Booking.com cancellation, room £355.82 for 3 nights = £118.61/night)
- **Open run is now 18–24 Nov** (7 nights; Smoobu), min 3.

| Night | Our £ | PL default | P25 / **P50** / **P75** / P90 | Booked median | Mkt occ vs STLY |
|---|---|---|---|---|---|
| Fri 20 Nov | 214 | 255 | 132 / **161 / 213** / 281 | 139 | 24.2 vs 25.8% |
| Sat 21 Nov | 216 | 261 | 132 / **159 / 212** / 272 | 147 | 24.9 vs 26.5% |
| Sun 22 Nov | 204 | 232 | 126 / **149 / 206** / 264 | 130 | 16.0 vs 18.8% |
| **20–22 total** | **634** | 748 | P50 469 / **P75 631** | | −1.6 to −2.8 pts |

- **Events:** The Script, O2 arena, Sat 21 Nov (verified 31 Oct, [theo2.co.uk/events/detail/the-script-2026](https://www.theo2.co.uk/events/detail/the-script-2026)). P04 is in the O2 map. Enter Shikari (Ally Pally) and England v NZ (Twickenham) do not map to P04.
  - The 20–21 Nov fortnight is **£201**. Ours is 214 / 216, so the event is priced (+£13 / +£15).
- **Proposal: hold.** 20–22 Nov sit at market P75 (£634 vs £631) and above the event fortnight, with market occupancy 2–3 points behind STLY. Corentin's 24 Oct "no demand" −8% stance stands; Reyhan's −3% on 18–24 Nov is a lighter cut.
  - The cancelled stay paid £118.61/night (room). The list now asks £211/night, 1.8× that.
- **Whether a guest booked 20–23 Nov on the unsynced Barking Airbnb listing 1455876748739910219, and whether 3–6 / 6–9 Nov are still double-sellable: NOT CHECKED here** (not in PriceLabs; channel section).
- Other P04 open nights: 1–2 Nov at 231 (above P75 209 / 208; J. Cole O2 2 Nov now priced, but see the min-2 conflict above); 9–13 Nov at 174–180 (PL default 228–244, P50 146–165, P75 207–219; market occupancy 4–10 points behind STLY).

### 2b. P05 St John's Wood open nights (3–5 BR daily band; 19 open nights to 30 Dec)
| Nights | Our £ | PL default | P50 / P75 / P90 | Mkt occ vs STLY | Proposal |
|---|---|---|---|---|---|
| **Mon 9 Nov** (1-night orphan, min 1) | **1,442** (+300%) | 425 | 369 / 516 / 719 | 32.4 vs 40.8% (−8.4) | **Below current: to about P50–P75 (£369–516) at min 1**, or treat the night as lost. Corentin to confirm the +300% intent. |
| 16–17 Nov (2-night gap, min 2) | 406 / 426 | 501 / 553 | 391–399 / 521–528 / 702 | 29.9–31.7 vs 31.1–31.6 (level) | Hold (between P50 and P75; £222 under the default) |
| 29 Nov – 2 Dec (4, min 3) | 568 / 522 / 541 / 542 (2,173) | 2,244 | 430–459 / 575–605 | 29.9–40.6 vs 30.4–39.3 (level) | Hold (at the default) |
| **7–8 Dec** (2-night gap, min 2) | 504 / 493 (**997**) after Reyhan's +3% | 649 / 614 (1,263) | 455 / 595 / 748; 445 / 592 / 750 (P75 **1,187**) | **40.8 vs 30.3 and 34.9 vs 30.3 (+10.5 / +4.6)** | **Above current, to about P75: £595 / £592 (+£190).** The +3% moved list by +£3 net (the engine fell meanwhile; 30 Oct 516 / 499). |
| 13–21 Dec (9) | 5,602 | 5,554 | P50 4,405 / P75 5,834 | 26.8–44.6 vs 21.1–39.3 (+1 to +10.5) | Hold (at the default, under P75) |
| **29 Dec** (orphan, min 1) | **1,338** (+100%, 18 Oct 20:34Z) | 1,054 | 635 / 809 / 1,067 | 45.3 vs 47.5% | **Below the default, to about P75–P90 (£809–1,067).** Unchanged since 30 Oct. |
| 4–29 Jan | 378–432 | 388–509 | 351–401 / 496–560 | 5.6–17.5 vs 1.1–11.7 (ahead, but a low base) | Hold (about the default; Jan −5% override, min 3) |

### 2c. P12 Mile End open nights (24 to the 13 Dec handback; no verified event; P12 is not in the VENUES map)
| Open nights | Our £ | PL default | P50 / **P75** sum | Mkt occ vs STLY | Proposal |
|---|---|---|---|---|---|
| 1–4 Nov (1–4 days out) | 237 / 234 / 224 / 236 (**931**) | 817 | 763 / **984** | 42.7–47.3 vs 54.6–66.3 (**−9 to −19**) | **Below current, to the default (−£114).** Reyhan's −5% (28 Oct) is still in place. |
| 12–13 Nov | 213 / 269 (482) | 562 | 410 / 517 | 35.3 / 41.8 vs 36.6 / 43.7 | Hold |
| 17–20 Nov | 234 / 239 / 242 / 268 (983) | 1,090 | 829 / **1,030** | 32.4–37.9 vs 36.4–49.8 (20 Nov −11.9) | Hold (already under P75) |
| 26 Nov – 2 Dec | 1,960 | 2,147 | 1,493 / 1,861 | 22.0–41.0 vs 22.5–46.9 (Fri–Sat −3 / −6) | **Cap 27–29 Nov at P75: 275 / 275 / 257 = £807 vs £863 (−£56).** Hold the rest. |
| 7–13 Dec (last week) | 2,078 | 2,167 | 1,536 / 1,887 | 23.0–32.5 vs 16.2–30.8 (**7–9 Dec +7.9 to +11.6**) | Hold |

- **Still an open conflict with a standing decision (not a new proposal):** `deprioritised.p12_17nov_override` reads "won't change Mile End 17 Nov +50%", but 17 Nov is £234 (−2% per the 28 Oct override). No P12 log entry since then.
- **Payout reminder:** recent P12 Booking.com sales paid 0.556–0.934× list (policy `booking_discount_stack_24oct` / `_25oct`). A list at P75 lands near P25–P50 paid.

### 2d. Christmas / New Year (P20, P11, P05, P13)
| Ref | Smoobu status | Our £ vs market (31 Oct) | Proposal |
|---|---|---|---|
| **P20** Canary Wharf (1–3 BR band) | Open 14 Dec – 5 Jan | **19–27 Dec:** £3,147 vs default 3,502, P75 2,894, P90 3,588. Market occupancy 20.7–29.4 vs STLY 20.0–23.9%. **28 Dec – 2 Jan:** 529 / 530 / 591 / 591 / 552 / 490 = **£3,283** vs default 3,460, **P90 500 / 511 / 523 / 515 / 442 / 387 = £2,878**, P75 £2,131. Market occupancy 22.7–33.2 vs STLY 13.2–27.2% (+5 to +14). Min 6 / 6 / 5 on 27 / 28 / 29 Dec (27 Dec min 6 set by Reyhan 30 Oct). | **Hold 19–27 Dec** (£355 under the default, between P75 and P90). **28 Dec – 2 Jan: cap at about P90 (−£405).** Reason: new listing, no reviews, 25% next-60 occupancy, priced £19–110 a night above market P90. a-peak-check is still open. |
| **P11** Camden (1–3 BR band; Booking.com only) | Booked 19–22 Dec and 26 Dec – 2 Jan. Open 18, 23–25 Dec and 3 Jan → | **23–25 Dec:** 311 / 307 / 315 (933) vs default 296 / 293 / 299, P50 318 / 321 / 335, booked median 272 / 274 / 273. Market occupancy 23.9 / 22.2 / 23.0 vs STLY 23.9 / 25.6 / 27.7%. **3 Jan (darts final):** 190 vs default 202, P50 232, clean-week fortnight 203. | **Hold 23–25 Dec** (+10% override; at P50; market level to behind). **3 Jan: above the default, about £213 (+£23).** |
| **P05** St John's Wood (3–5 BR) | Booked 22–29 Dec and 30 Dec – 4 Jan. Open 13–21 Dec, 29 Dec, 4 Jan → | See 2b | Hold 13–21 Dec; **29 Dec below the default** (−£271 to −£529); hold 4 Jan → |
| **P13** Shepherd's Bush (2–3 BR; 3064856 prices) | Booked 27 Dec – 3 Jan. Open 14–26 Dec and 3 Jan → | **14–23 Dec:** £2,297 vs default 2,425, **P50 2,492**. **24–26 Dec:** 228 / 229 / 235 (**692**) vs P25 223 / 224 / 229, **P50 275 / 285 / 287 (847)**. **Market occupancy +8.6 to +22.2 points vs STLY on every night 14–26 Dec.** | **Above current: 14–23 Dec to P50 (+£195); 24–26 Dec to P50 (+£155). Total +£350** (30 Oct: +£282). Keep the twins slightly different (policy). 3–5 Jan at the default: hold. |

### 2e. P13 8–12 Nov (open 5-night gap)
- Ours 149 / 151 / 153 / 154 / 155 (**£762**) vs default £820, **P25 166–178**, P50 £1,039 and booked median 188–220.
- Market occupancy 28.1–37.1 vs STLY 37.6–53.1% (−4 to −18). So soft overall, but **12 Nov is England v Croatia at Wembley** (P13 is in the Wembley map).
- **Cause:** P13 customizations (`get_customizations` 31 Oct): occupancy-based adjustment "Aggressive" (−20% at 30–40% occupancy, 0–15 days out), last-minute −5% within 14 days (gradual), and the Booking Recency Factor at its default (−5% to −15% after 15–45 days with no booking).
  - This is why base 250 does not reach close-in prices.
- **Proposal:** 12 Nov to at least the £187 event fortnight (+£32). 8–11 Nov to the PL default (+£42).

## 3. Demand calendar, next 90 days (today's prices; fortnight = average of the surrounding 14 nights)
**Events re-verified 31 Oct 2026** (domain-restricted WebSearch):
- **O2 arena** ([venue list](https://www.theo2.co.uk/events/venue/the-o2-arena)):
  - J. Cole 2 Nov; Stevie Wonder 3 and 5 Nov.
  - Noah Kahan 13, 14 and 17 Nov ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026)); Muse 15–16 Nov ([page](https://www.theo2.co.uk/events/detail/muse-2026)).
  - The Script Sat 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026)); Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)); Phoebe Bridgers 1–2 Dec.
  - Kehlani Tue 8 Dec ([page](https://www.theo2.co.uk/events/detail/kehlani-2026)); Kasabian and Culture Club mid to late December; RNBLAND NYE 31 Dec.
  - **UNVERIFIED:** Kehlani 9 Dec and Noah Kahan 1–2 / 9 Dec (other O2 pages, possibly stale). The Darkness 16 Dec and Amr Diab 20 Dec were verified 30 Oct only. Korn, Suede & Manics, Paul Heaton, Papa Roach, Good Charlotte, Fontaines D.C. and Jessie Ware: room not confirmed. LOTR in Concert 29 Nov is at indigo. The Haluk Levent show on 6 Nov is cancelled.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)):
  - WTM 3–5 Nov ([page](https://www.excel.london/visitor/whats-on/world-travel-market-london-2026)).
  - **#RISK Europe 10–11 Nov** ([page](https://www.excel.london/visitor/whats-on/risk-europe-2026); new); Retail Supply Chain & Logistics Expo plus co-located shows 11–12 Nov ([page](https://www.excel.london/visitor/whats-on/retail-supply-chain-logistics-expo-2026)).
  - London Build Expo 25–26 Nov, co-located with elementalLONDON ([page](https://www.excel.london/whats-on/london-build-expo)); HOMES UK (date not restated today); Care Management Show 27 Nov; BodyPower 28–29 Nov.
  - London Perfume Exhibition 10–13 Dec; London International Horse Show 17–21 Dec; Scrooge Cirque 23–28 Dec.
  - EV Show 18–19 Nov and Vet Show 19–20 Nov were **verified 30 Oct only**, not re-found today.
- **Alexandra Palace**, Great Hall: Enter Shikari 20–21 Nov ([page](https://www.alexandrapalace.com/whats-on/enter-shikari/)), Nia Archives 26 Nov ([page](https://www.alexandrapalace.com/whats-on/nia-archives/)), Blossoms 27 Nov ([page](https://www.alexandrapalace.com/whats-on/blossoms/)), Gorgon City 28 Nov ([page](https://www.alexandrapalace.com/whats-on/gorgon-city/)). Courteeners 14 Nov: room not stated.
- **World Darts** ([pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [Ally Pally](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/)): Fri 11 Dec – Sun 3 Jan (final 20:00). The schedule goes from 23 Dec straight to 27 Dec (break re-confirmed today). Semi-finals Sat 2 Jan. Great Hall, "record 180,000 tickets".
- **Twickenham** ([Nations Championship](https://allianzstadiumtwickenham.com/nations-championship), [Finals Weekend](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)): England v Australia Sun 8 Nov, v Japan Sat 14 Nov, v New Zealand Sat 21 Nov; Finals Fri 27 – Sun 29 Nov.
- **Wembley** ([events](https://www.wembleystadium.com/events)): **England v Croatia Thu 12 Nov 19:45** ([page](https://www.wembleystadium.com/events/2026/England-v-Croatia)); **England v Ukraine Sat 5 Dec 17:30** ([page](https://www.wembleystadium.com/events/2026/England-Women-v-Ukraine); men's or women's is labelled inconsistently across sources). Nothing is listed for January.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): 31 Dec, Ticketmaster, £20–55.
- **VENUES map** (`build/properties.py`):

  | Venue | Properties |
  |---|---|
  | O2 | P01, P09, P07, P04 |
  | ExCeL | P01, P04, P07, P15 |
  | Ally Pally | P08, P11 |
  | Twickenham | P18, P10, P13, P16 |
  | Wembley | P10, P13, P02 |

  - P20 is not in the map; O2 and ExCeL are applied to it as for P01.
  - P12 and P05 have no mapped verified event (Regent's Park / Frieze has nothing in the window).

| Nights | Event | Venue | Properties (open) | Effect | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 2 Nov | J. Cole | O2 | P04 (P01, P09, P20 booked) | compression | P04 **231** vs 180 | yes (Reyhan +50%; min-2 conflict) |
| 3–5 Nov | Stevie Wonder + WTM | O2 / ExCeL | all booked | – | – | n/a |
| 7 Nov | England v Australia | Twickenham | P13 booked | – | – | n/a |
| 10–11 Nov | #RISK Europe + Retail expos | ExCeL | P04, P20 | compression | P04 175 / 175 vs 180; P20 247 / 246 vs 254 | **no** |
| 12 Nov | England v Croatia | Wembley | P13 | compression | **155** vs 187 | **no** |
| 13–17 Nov | Noah Kahan 13 / 14 / 17, Muse 15–16 | O2 | P20; P04 13 Nov | compression | P20 **244 / 249** / 273 / 274 / 277 vs 262; P04 180 vs 190 | 13–14 no; 15–17 yes |
| 13–14 Nov | England v Japan | Twickenham | P13 booked | – | – | n/a |
| 18–19 Nov | EV / Vet Show (30 Oct only) | ExCeL | P04, P20 | compression | P04 204 / 203 vs 198; P20 276 / 276 vs 270 | yes |
| 20–21 Nov | Enter Shikari | Ally Pally | P11 | compression | 247 / 253 vs 207 | yes |
| 20–21 Nov | The Script (21) | O2 | P04, P20 | compression | P04 214 / 216 vs 201; P20 292 / 305 vs 276 | yes |
| 20–21 Nov | England v NZ | Twickenham | P13 booked | – | – | n/a |
| 24 Nov | HOMES UK / Build Expo eve | ExCeL | P04, P20 | compression | P04 205 vs 203; P20 **276** vs 282 | P20 no |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City | Ally Pally | P11 | compression | **215** / 265 / 266 vs 229 | 26 no; 27–28 yes |
| 26–29 Nov | Nations Championship Finals | Twickenham | P13 (27 Nov) | compression | 338 vs 241 | yes |
| 30 Nov – 2 Dec | Mariah Carey / Phoebe Bridgers | O2 | P04 2 Dec | compression | 498 (deprioritised +200%) | n/a |
| 4–5 Dec | England v Ukraine | Wembley | P13 booked | – | – | n/a |
| 8 Dec | Kehlani | O2 | P04, P20 | compression | P04 **192** vs 198; P20 306 vs 296 | P04 no; P20 yes |
| 11–12 Dec | Darts opening | Ally Pally | P11 | compression | 311 / 318 vs 252 | yes |
| 13–17 Dec | Darts | Ally Pally | P11 | compression | **226 / 201 / 204 / 215 / 234** vs 279 | **no** (conflict) |
| 16–18 Dec | The Darkness 16 (30 Oct only) / Horse Show 17–21 / Kasabian | O2 / ExCeL | P04, P20 | compression | P04 **195** / 197 / 204 vs 195; P20 **267** / 296 / 307 vs 293 (clean week) | 16 Dec no |
| 18 Dec | Darts | Ally Pally | P11 | compression | 281 vs 244 | yes |
| 23 Dec | Darts, last pre-Christmas session | Ally Pally | P11 | compression | 311 vs 320 | borderline (+10% override) |
| 24–26 Dec | No darts (break) | – | P11, P13, P20 | P11 soft (behind STLY); **P13 compression on occupancy (+8 to +14 points)** | see 2d | – |
| 28 Dec – 1 Jan | NYE (31 Dec) | central London | P20 (P04, P05, P11, P13 booked) | compression | P20 31 Dec 591 vs 318 | yes, above P90 (2d) |
| 3 Jan | Darts final | Ally Pally | P11 | compression | **190** vs 203 (clean week) | **no** |

## 4. Missed compression: open, verified-event nights at or below the fortnight (today)
| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 10, 11 Nov | #RISK / Retail expos, ExCeL | 247, 246 | 254 | 8, 8 |
| P20 | 13, 14 Nov | Noah Kahan, O2 | 244, 249 | 262 | 18, 13 |
| P20 | 24 Nov | HOMES UK / Build Expo eve | 276 | 282 | 6 |
| P20 | 16 Dec | The Darkness / Horse Show eve | 267 | 293 (clean week) | 26 |
| P11 | 26 Nov | Nia Archives, Ally Pally | 215 | 229 | 14 |
| P11 | 23 Dec | Darts (borderline) | 311 | 320 | 9 |
| P11 | 3 Jan | Darts final | 190 | 203 (clean week) | 13 |
| P04 | 10, 11 Nov | ExCeL expos | 175, 175 | 180 | 6, 6 |
| P04 | 13 Nov | Noah Kahan | 180 | 190 | 10 |
| P04 | 8 Dec | Kehlani | 192 | 198 | 6 |
| P04 | 16 Dec | Horse Show eve | 195 | 195 | 0 |
| | | **Same event set as 30 Oct (P04 included, P11 13–17 Dec excluded)** | | **14 nights** | **£143** (30 Oct: 16 / £210) |
| **P13** | **12 Nov** | **England v Croatia, Wembley (new today)** | 155 | 187 | **32** |
| | | **Like-for-like plus the new event** | | **15 nights** | **£175** |
| P11 | 13–17 Dec | Darts (override conflict) | 226, 201, 204, 215, 234 | 279 | 53, 78, 75, 64, 45 = **£315** (30 Oct: £306) |
| | | **Full total** | | **20 nights** | **£490** (30 Oct: 21 / £516) |

- **Dropped off since yesterday:**
  - P04 2 Nov: Reyhan's +50% took it from 129 to 231.
  - P04 18–19 Nov (204 / 203 vs 198) and P04 24 Nov (205 vs 203): Reyhan's −3% replaced the −8%.
- **New:** P20 14 Nov (249 vs 262); P04 16 Dec (a tie at 195); P13 12 Nov (new Wembley event).
- **P20 10–24 Nov context:** Corentin's −5% override on 31 Oct – 19 Nov (policy 24 Oct) explains about £12–13 a night. The 10–14 Nov gaps (£8–18) are mostly that override. This is information, not a proposal to undo it.
- **P11 darts 13–17 Dec:** the conflict with policy `darts_override_24oct` (+5%) widened. Reyhan set **−2%** on 13–16 Dec on 30 Oct 22:07Z, and the gap rose from £306 to **£315**. Corentin to confirm.

## 5. Dates to price above / below the PriceLabs default (summary, per submarket)
- **Above current / towards or above the default:**
  - **Shepherd's Bush P13:** 14–23 Dec to P50 (+£195); 24–26 Dec to P50 (+£155); 12 Nov Wembley to at least £187 (+£32); 8–11 Nov to the default (+£42).
  - **St John's Wood P05:** 7–8 Dec to about P75, £595 / £592 (+£190; market +10.5 / +4.6 points vs STLY).
  - **Camden P11:** 3 Jan about £213 (default 202); 26 Nov to at least £229 (PL default 262).
  - **Canary Wharf P20:** 16 Dec to at least £293 (default 309). 13–14 Nov to £262 only if Corentin lifts their −5% (default 312 / 316).
- **Below current / below the default:**
  - **P05 9 Nov:** £1,442 → about £369–516 (min 1).
  - **P05 29 Dec:** £1,338 → about £809–1,067.
  - **P20 28 Dec – 2 Jan:** cap at about P90 (−£405).
  - **P12:** 1–4 Nov to the default (−£114); 27–29 Nov cap at P75 (−£56).
- **Hold:** P04 18–24 Nov (at P75); P11 23–25 Dec; P05 16–17 Nov, 29 Nov – 2 Dec, 13–21 Dec and Jan; P20 19–27 Dec; P12 12–13 Nov, 17–20 Nov and 7–13 Dec; P13 3–5 Jan.

## 6. Market brief for Monday 2 Nov base review
18 Oct rises: P01 253, P05 500 → 550 (20 Oct), P06 357, P09 176, P11 286, P12 284. P13 base 250 (from 235; the change is not in the 29–31 Oct logs, and its date is NOT CHECKED).

Running effect is from Smoobu `reservations.csv` (confirmed, room only), bookings made 4–18 Oct vs 19–31 Oct.

| Ref | Base vs market (`market.csv` 31 Oct) | Sellable nights (Smoobu) | Bookings made 4–18 Oct → 19–31 Oct | Market reading | What the review should look at |
|---|---|---|---|---|---|
| **P01** | 253 vs 2 BR P50 259 / P75 332; PL rec 255 | **0 open** to the 20 Dec handback | 1 booking, 30 nights, £152/night → 1 booking, 3 nights, £240/night (60-day lead) | n/a | **Drop from the review.** The base earns nothing more before handback. |
| **P05** | 550 vs 4 BR P50 582 / P75 719; PL rec 548 | 19 open; avg £652 (£565 excluding 9 Nov £1,442 and 29 Dec £1,338) | 2 bookings, 11 nights, £578/night → 1 booking, 3 nights, **£298/night** (Airbnb, 8 days out) | Our occupancy 90 / 70% vs market 40 / 38%; open nights 34.4 vs STLY 32.2% | **Hold the base.** List matches the default over 45 open nights to 29 Jan (£23,038 vs £23,061). Fix the date items instead: 9 Nov +300%, 29 Dec +100%, 7–8 Dec, and the 6–9 Nov Airbnb payout at 0.645× list (channel). |
| **P06** | 357 vs 2 BR P50 406 / P75 510; PL rec 342 | 7 open (8–14 Nov, avg £300); the rest are intentional blocks | 4 bookings, 18 nights, £189/night → 1 booking, 3 nights, £268/night | Market occupancy 45 / 40% | No market case to cut; open nights already sit under P50. The base touches only 7 nights. |
| **P09** | 176 vs 1 BR P50 134 / P75 161 / P90 204; PL rec 176 | 3 open (10–12 Nov, avg £147) before the 26 Nov handback | 3 bookings, 23 nights, £103/night → 1 booking, 2 nights, £127/night | Our occupancy 83 / 92% vs market 36 / 31% | Hold; only 3 nights are affected. |
| **P11** | 286 vs 2 BR P50 289 / P75 330; PL rec 285 | 37 open; avg £234. £8,676 vs default £9,550 and daily-band P50 £9,573 | 1 booking, 4 nights, £163/night → 2 bookings, 6 nights, £204/night | Our occupancy 40 / 37% vs market 46 / 38%; open nights 32.2 vs STLY 32.7% (level) | **The base is not the lever.** We are already 9% under the default and under P50, yet less booked than the market. Reyhan's 30 Oct −2% / −3% cuts push lower still. Look at Booking.com-only reach and the darts conflict. |
| **P12** | 284 vs 2 BR P50 205 / P75 244 / P90 303 (+39% vs P50); PL rec 273 | 24 open; avg £268. £6,434 vs default £6,783, P50 £5,031, P75 £6,279 | 2 bookings, 5 nights, £170/night → 4 bookings, 20 nights, £173/night (1 more cancelled) | Our occupancy 53 / 60% vs market 40 / 33%; open nights 33.9 vs STLY 36.4% (−2.5); kpi pace −28% vs STLY | **Consider 273 (the PL recommendation)**, or apply the date fixes in 2c instead. Only 24 nights remain before handback. |
| **P13** | **250** vs 2 BR P50 225 / P75 281; PL rec 233 / 232 (twins) | 31 open; avg £214. £6,639 vs default £6,840 and P50 £7,328 | 6 bookings, 24 nights, £151/night → 2 bookings, 16 nights, £182/night (62-day lead) | Our occupancy 63 / 47% vs market 41 / 36%; **open nights 34.5 vs STLY 29.2% (+5.3)** | **The base is above the market median, but the prices guests see are not.** Open nights average £214, under P50, because of the Aggressive occupancy profile, last-minute −5% and the Booking Recency Factor (2e). Review those close-in factors rather than the base. Keep 250 (no case to cut; December demand is ahead of STLY). |

Data gaps:
1. All market figures are PriceLabs Nearby Listings data (Airbnb-derived, not comp sets; `cleaning_fee: null`; the summary horizon is unstated).
   - Daily bands are 1–3 BR for P04, P11 and P20, which understates a 2-bed; this is weak for Booking.com-only P11. P05 is 3–5 BR.
   - P08 and P14 percentiles are from 27 Oct and P10 was not pulled.
2. Events are domain-restricted WebSearch summaries, not page reads. On 30 Oct, theo2.co.uk was ENOTFOUND for WebFetch, and theo2.co.uk, excel.london, alexandrapalace.com and pdc.tv returned 403 at the proxy; I did not retry today.
   - **UNVERIFIED:** Kehlani 9 Dec, Noah Kahan December dates, the O2 room for several November acts, and HOMES UK dates.
   - **Verified 30 Oct only:** EV / Vet Show 18–20 Nov, The Darkness 16 Dec, Amr Diab 20 Dec.
   - Whether England v Ukraine (5 Dec) is the men's or the women's team is labelled inconsistently.
   - Attendance is stated only for the darts (180,000 tickets).
3. P06 and P09 prices are from the 30 Oct 08:2x–08:34Z refresh.
4. Barking Airbnb 1455876748739910219 (20–23 Nov booking? 3–9 Nov double-sell) is NOT CHECKED: it is not in PriceLabs and was not checked in Smoobu here.
5. The P13 base change 235 → 250 is not in `get_user_logs` 29–31 Oct; its date and author are NOT CHECKED (logs before 29 Oct were not pulled).
6. The intent of P05 9 Nov +300% (orphan sale vs soft block) is unknown. Corentin or Reyhan to confirm.
7. P12 overrides were not re-pulled today. Their state is inferred from 0 P12 log entries since 28 Oct.
