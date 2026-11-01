# Market & demand calendar: run D = 2026-11-01 (window 1 Nov 2026 – 30 Jan 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Excluded: P02/P03/P06/P07 intentional blocks; nights after the handbacks (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 report-only; P13 = one flat. Not re-raised: P04 2 Dec +200%, the 15%/20% stay discounts, the Booking.com booster.
- **Market percentiles (today):** PriceLabs `get_neighbourhood_data`, summary mode, pulled 1 Nov **one call at a time** (8 calls, all `all_operations_ok=true`): P04, P05, P20, P11, P12, P01, P06 and P09. P13 is from `raw/neighbourhood_P13.json` (1 Nov 07:18, pulled by another agent).
  - Appended as 9 rows dated 1 Nov to `data/snapshots/2026-11-01/market.csv`. The file was copied forward from 31 Oct under `.market.csv.lock`.
  - This is Nearby Listings data: Airbnb-derived, not a comp set, horizon unstated.
- **Daily market bands and occupancy vs STLY** are from yesterday's detail pulls (`get_neighbourhood_data` detail, **31 Oct**). Raw copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m01/neigh_<id>.json`. Not re-pulled today, to limit load.
  - Columns: `market_25/75/90_percentile_prices`, `market_price` (= P50), `booked_50_percentile_price`, `occupancy.daily.market_occupancy` / `_stly`.
- **Our prices:** `data/snapshots/2026-11-01/prices.csv`, column `pricelabs_price` (= raw `price`), 2 Nov – 31 Dec.
  - **"PL default"** = `uncustomized_price` in `raw/prices_<id>.json` (1 Nov snapshot). It tracks the 31 Oct neighbourhood `prices_with_default_customization` to within a few percent.
  - P20 27 Dec – 5 Jan comes from `get_listing_prices` (1 Nov). P11 3 Jan is the 31 Oct neighbourhood `final_price`.
  - Refresh times (`last_refreshed_at`): P12 31 Oct 22:06Z, P11 22:07Z, P13 22:07–22:08Z, P05 22:08Z, P06 22:10Z, P20 22:11Z, P04 22:12Z. All of these are after the matching Reyhan edit. P01 1 Nov 06:25Z. **P09 31 Oct 08:09Z (stale).**
- **Booking state:** Smoobu `reservations.csv` 1 Nov (confirmed stays).
- **Changes since 31 Oct 06:00Z:** `get_user_logs` (listing, 31 Oct – 1 Nov) returned **59 entries, all by reyhan, in two batches: 31 Oct 14:28–14:34Z and 22:05–22:12Z**.
  - A second `get_user_logs` call (base_price, October) dates the **P13 base 235 → 250 to 24 Oct 21:14:47Z, Reyhan**.
- **Fortnight method is unchanged:** 7 nights either side; blocked nights and nights above 2× the median are excluded; clean week used for 16–20 Dec and 3 Jan.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m01/analyse01.py`, output in `.../m01/out01.txt`.
  - Open-night tables: `.../m01/open01.py <ref> <from> <to>`.
- **Events re-verified 1 Nov 2026** with WebSearch restricted to venue or organiser domains. These are search summaries, not page reads.

## Reyhan's edits of 31 Oct (`get_user_logs`), net state on the dates this section covers
| Ref | Net edit (latest wins) | Effect (`prices.csv` 1 Nov vs 31 Oct) | Status |
|---|---|---|---|
| P04 | 1–2 Nov **+20%, min 2** (was +50%) | 2 Nov £183 (was £231). Raw `user_price` is £230 (see Data gaps) | **Min-2 conflict with `listing_facts.P04.min_stay_rule` ("never fewer than 3") persists.** Corentin to confirm. Not a new proposal. |
| P04 | **9–24 Nov −10%, min 3** (replaces Corentin's −8% from 24 Oct and the −3% on 18–24 Nov) | 18–24 Nov £1,334 (was £1,448) | **Deeper than Corentin's 24 Oct −8% (policy `price_changes`).** Corentin to confirm. |
| P04 | 6–22 Dec −10%; 2–31 Jan −7% | 14–19 Dec £1,156 (was £1,187) | See 2a |
| P20 | **6–24 Nov −10%, min 3** (replaces Corentin's −5% on 31 Oct – 19 Nov); 1–31 Jan −7% | 10–24 Nov event nights £6–16 lower | **Deeper than Corentin's 24 Oct −5% (policy `listing_facts.P20.price_24oct`).** Corentin to confirm. |
| **P11** | 10 Nov – 4 Dec **−7%**; **8–18 Dec −5%, min 2** (covers darts 13–17 Dec) | Darts 13–17 Dec **£1,043** (was £1,080) | **Conflict with `listing_facts.P11.darts_override_24oct` (+5%, "do not re-raise") is wider again:** −2% became −5%. Corentin to confirm. |
| P12 | 1–4 Nov −7%; **16 Nov – 13 Dec −7%, min 2** | 17 Nov £224 (was £234) | **`deprioritised.p12_17nov_override` (+50%) is still overridden.** Corentin to confirm. |
| **P13** | 1–3 Nov −5%; **8–12 Nov −5%, min 2**; **7–20 Dec −5%** (3064856, 3090701 and Vrbo) | 12 Nov £147 (was £155); 14–20 Dec −£4 to −£11 a night | **Opposite to open plan items a-raise-1012nov (12 Nov +10%) and a-peak-check (14–26 Dec +10% / +12%).** |
| P05 | 29 Nov – 2 Dec −5%; 13–19 Dec −5%; 4–31 Jan −7%. **9 Nov +300% and 29 Dec +100% untouched** | 9 Nov **£1,462**; 29 Dec **£1,354** | a-p05-9nov and a-peak-check (P05) **not fixed** |
| P06 | 8–14 Nov −2%, min 2 | 7 open nights, avg £263 | Information |

## 1. Submarket table
Market occ 30/60 is `market_occupancy_next_30/60` from `pl_kpis.csv` 1 Nov. Percentiles are from `market.csv` 1 Nov (summary_table, same-bedroom row). Our occ is `occupancy_next_30/60`. Base and the PL recommended base are from `listings.csv` 1 Nov.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50** / **P75** / P90 £ (n) | Our occ 30/60 | Base / PL rec. |
|---|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 35 / 28% | 214 / **257 / 331** / 420 (147) | 100 / 100%* | 253 / 255 |
| Canary Wharf | P20 | 2 | 38 / 30% | 215 / **254 / 314** / 409 (152) | 30 / 23% | 350 / 347 |
| Barking | P04 | 2 | 24 / 20% | 139 / **168 / 218** / 257 (91) | 53 / 52% | 220 / – |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 110 / **132 / 162** / 204 (126) | 87 / 93%* | 176 / 176 |
| Mile End (HB 13 Dec) | P12 | 2 | 40 / 34% | 170 / **206 / 244** / 303 (120) | 53 / 60% | 284 / 273 |
| Marylebone (blocked on purpose) | P06 | 2 | 46 / 41% | 312 / **406 / 508** / 619 (216) | 77 / 88%* | 357 / **357** (31 Oct: 342) |
| Camden | P11 | 2 | 46 / 39% | 230 / **288 / 330** / 392 (173) | 40 / 38% | 286 / 285 |
| St John's Wood | P05 | 4 | 40 / 38% | 469 / **577 / 719** / 1,163 (90) | 87 / 68% | 550 / 548 |
| Shepherd's Bush | P13 | 2 | 41 / 37% | 189 / **224 / 280** / 345 (117) | 63 / 47% | 250 / 233 (3090701: 232) |
| Islington (HB 13 Nov) | P08 | 2 | – | 183 / 228 / 284 / 334 (`market.csv` 27 Oct, not re-pulled) | – | – |
| Primrose Hill (report only) | P14 | 1 | – | 153 / 205 / 255 / 298 (27 Oct) | – | – |

\* Inflated, because PriceLabs counts handback or intentional blocks as occupied.

- **P50 moves vs 31 Oct** (`market.csv`): P04 170 → 168, P05 582 → 577, P09 134 → 132, P11 289 → 288, P13 225 → 224, P01 259 → 257, P12 205 → 206; P20 and P06 unchanged. Nothing material.

## 2. Asked-for checks

### 2a. P04 Barking (O2 / ExCeL map)
**18–24 Nov (7-night open run, min 3; Smoobu)**
| Nights | Ours (31 Oct) | PL default | P50 / **P75** | Mkt occ vs STLY | Events |
|---|---|---|---|---|---|
| Wed 18 – Tue 24 Nov | 188 / 187 / 196 / 200 / 188 / 187 / 188 = **£1,334** (£1,448) | £1,661 | £1,077 / **£1,456** | 15.4–24.9 vs 18.8–26.5% (**−1.6 to −8.2 pts**) | London EV Show 18–19 and Vet Show 19–20 Nov (ExCeL); The Script, O2, Sat 21 Nov |

- **The event nights are still priced:** 18–19 Nov 188 / 187 vs a fortnight of £186; 20–21 Nov 196 / 200 vs £190.
- **Proposal: hold below the default.** This follows Corentin's "no demand" stance, and the market is behind STLY.
  - The run is now **£122 under P75** (yesterday it sat at P75), because Reyhan's −10% replaced Corentin's −8%. This is a conflict for Corentin to confirm, not a new proposal.

**19 Dec, reopened** (Airbnb 19–20 Dec cancelled; it had paid £216 room + £129 cleaning). The open run is now **14–19 Dec** (6 nights, min 3); 20 Dec – 2 Jan is booked.

| Night | Ours | PL default | P50 / P75 | Mkt occ vs STLY |
|---|---|---|---|---|
| Mon 14 Dec | 183 | 207 | 160 / 215 | 8.6 vs 5.1 |
| Tue 15 Dec | 186 | 212 | 154 / 215 | 10.6 vs 6.5 |
| Wed 16 Dec | 190 | 220 | 158 / 214 | 14.5 vs 8.7 |
| Thu 17 Dec | 192 | 223 | 163 / 217 | 16.5 vs 11.8 |
| Fri 18 Dec | 198 | 238 | 166 / 218 | 17.9 vs 14.3 |
| **Sat 19 Dec** | **207** | 258 | 165 / **219** | **22.5 vs 16.7 (+5.8)** |
| **14–19 total** | **£1,156** | £1,358 | £966 / **£1,298** | **+3.5 to +5.8 pts every night** |

- **Events:** London International Horse Show, ExCeL, 17–21 Dec (verified 1 Nov) and Kasabian, O2, Fri 18 Dec (verified 1 Nov). The O2 premium page says 19 Dec, so that date is in conflict.
- **Proposal: above current, below the default.** Take 14–19 Dec to about P75 (**£1,298, +£142**), with 17–19 Dec at £217 / £218 / £219 (+£57 of that).
  - Reyhan's −10% on 6–22 Dec runs against market occupancy that is ahead of STLY on 11–19 Dec. On 6–10 Dec the market is behind STLY (−0.1 to −6.1), so hold 6–13 Dec except Kehlani (§4).

### 2b. P05 St John's Wood (4 BR; 3–5 BR daily band; no mapped verified event)
| Nights | Ours (31 Oct) | PL default | P50 / P75 / P90 | Mkt occ vs STLY | Proposal |
|---|---|---|---|---|---|
| **Mon 9 Nov** (1-night orphan, min 1) | **1,462** (1,442), +300% | 432 | 369 / 516 / 719 | 32.4 vs 40.8 (**−8.4**) | **Below current, to about P50–P75 (£369–516), or Corentin confirms it is a soft block.** a-p05-9nov is **not fixed** (no 9 Nov edit in 31 Oct logs). |
| 16–17 Nov (min 2) | 406 / 425 (831) | 1,040 | 790 / 1,049 | level | Hold (between P50 and P75) |
| 29 Nov – 2 Dec (min 3) | 546 / 528 / 519 / 525 (**2,118**; was 2,173 before Reyhan's −5%) | 2,278 | 1,765 / 2,361 | −4.9 to +1.3 | Hold |
| **7–8 Dec** (2-night gap, min 2) | 496 / 487 (**983**; was 997) | **1,243** | 900 / **1,187** | **+10.5 / +4.6** | **Above current: to about P75, £595 / £592 (+£204).** a-p05-dec is **not fixed** (no 7–8 Dec edit on 31 Oct). |
| **13–21 Dec** (9 nights) | **5,421** (was 5,602) | **5,641** | 4,405 / 5,834 | **+1.0 to +10.5** (13 Dec +10.5, 17 Dec +6.7, 19 Dec +8.3) | **Above current: back to the default (+£220).** Reyhan's −5% on 13–19 Dec runs against a market ahead of STLY. |
| **Tue 29 Dec** (orphan, min 1) | **1,354** (1,338), +100% | 1,077 | 635 / 809 / 1,067 | 45.3 vs 47.5 | **Below current, to the default / P90 (about £1,070, −£284).** a-peak-check (P05) is not fixed. |

- 19 open nights to 31 Dec, list £12,169, avg £640 (£550 excluding 9 Nov and 29 Dec).

### 2c. P13 Shepherd's Bush (3064856 prices; 2–3 BR band; Wembley / Twickenham map)
**Thu 12 Nov, England v Croatia, Wembley, 19:45**
- Verified 1 Nov at [wembleystadium.com/events/2026/England-v-Croatia](https://www.wembleystadium.com/events/2026/England-v-Croatia). The search summary says it is listed as sold out for general sale; attendance is not stated.
- **Our price is £147** (31 Oct: £155), against:
  - fortnight £177
  - PL default £170
  - market P25 £178, **P50 £214**, booked median £211
- Market occupancy is 35.4 vs 45.9% STLY (−10.5), so the surrounding week is soft. **This is missed compression (§4, gap £30).**
- 3090701 (the twin) is at £178.
- Reyhan's −5% on 8–12 Nov (31 Oct 22:07Z) moved this night down, against a-raise-1012nov.
- **Min stay 2 on 12 Nov with 13 Nov booked.** That means 12 Nov can only be bought as 11–12 Nov. A one-night match guest cannot book it.
- **Proposal:** 12 Nov to at least **£177 (+£30)** on 3064856, keeping 3090701 slightly different, and **min 1 on 12 Nov**.
- 8–11 Nov: £574 vs default £645, below market P25 (£166–169), with market occupancy −4 to −18 pts vs STLY. Proposal: to the default (+£71).

**Christmas (open 7–26 Dec; booked 27 Dec – 3 Jan)**
| Nights | Ours | PL default | P50 | Mkt occ vs STLY | Proposal |
|---|---|---|---|---|---|
| 7–13 Dec | £1,551 | £1,687 | £1,656 | +7.3 to +14.2 | To the default (+£136) |
| **14–23 Dec** | **£2,253** (31 Oct: £2,297) | £2,407 | **£2,492** | **+5.7 to +22.2** | **To P50 (+£239)** |
| **24–26 Dec** (min 3) | 227 / 228 / 233 = **£688** | £726 | 275 / 285 / 287 = **£847** | +12.8 / +8.5 / +11.5 | **To P50 (+£159)** |

- **Total above current: +£534 on 7–26 Dec** (31 Oct: +£350 on 14–26 Dec).
- Reyhan's −5% on 7–20 Dec (31 Oct 22:07Z) moved the other way while market occupancy is ahead of STLY on every night.
- Both twins are **identical on all 31 December nights** (`prices.csv`). Policy `twin_listings` says never identical, so keep a small gap when applying this.

### 2d. P20 Canary Wharf, NYE (not in the VENUES map; O2 / ExCeL applied as for P01)
| Nights | Ours (`get_listing_prices` 1 Nov, `price`) | PL default | P75 / **P90** (31 Oct daily) | Mkt occ vs STLY | Min stay |
|---|---|---|---|---|---|
| 28 Dec – 2 Jan | 527 / 528 / 529 / **588** / 532 / 479 = **£3,183** (31 Oct £3,283) | £3,385 | £2,131 / **£2,878** | 31.8–33.2 vs 17.7–27.2 (**+5.1 to +14.1**; 2 Jan 22.7 vs 13.2) | 6 / 5 / 5 / 5 / 3 / 3 |
| 19–27 Dec | £3,061 | £3,322 | £2,894 / £3,588 | 20.7–29.4 vs 20.0–23.9 | 3–6 |

- **NYE 31 Dec is priced by PriceLabs:** £588 vs the fortnight £316 (NYE week excluded).
  - Event: [london.gov.uk/events/london-new-years-eve-2026](https://www.london.gov.uk/events/london-new-years-eve-2026), checked 1 Nov. Tickets are on Ticketmaster at £20–55, with a second batch to come.
- **Proposal: hold 19–27 Dec** (between P75 and P90, under the default).
- **28 Dec – 2 Jan: cap at about P90 (−£305; yesterday −£405).** The market is well ahead of STLY, so this is a judgement call for Corentin. The case for the cap: a new listing with no reviews, 23% next-60 occupancy, and prices £6–92 a night above market P90 (£73–92 on 31 Dec – 2 Jan).

## 3. Demand calendar, next 90 days (today's prices; fortnight = average of the surrounding 14 nights)
**Events (checked 1 Nov 2026, domain-restricted WebSearch):**
- **O2 arena** ([venue list](https://www.theo2.co.uk/events/venue/the-o2-arena)):
  - Stevie Wonder 3 and 5 Nov; Korn 4 Nov; Suede & Manics 6 Nov; Paul Heaton 7 Nov.
  - Noah Kahan 13, 14 and 17 Nov ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026)).
  - The Script Sat 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026)); Don Toliver 23 Nov ([page](https://www.theo2.co.uk/events/detail/don-toliver-2026)); Jungle 24–25 Nov; Fontaines D.C. 27 Nov; Jessie Ware 28 Nov.
  - Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)).
  - Kehlani Tue 8 Dec ([page](https://www.theo2.co.uk/events/detail/kehlani-2026); the listing says 9 Dec, a conflict).
  - Kasabian Fri 18 Dec ([page](https://www.theo2.co.uk/events/detail/kasabian-2026); the premium page says 19 Dec).
  - **Muse:** one listing says 13–17 Nov and another 15–16 Nov (31 Oct page: 15–16).
  - **Verified 31 Oct, not re-found 1 Nov:** J. Cole 2 Nov, Phoebe Bridgers 1–2 Dec. **Verified 30 Oct only (UNVERIFIED now):** The Darkness 16 Dec, Culture Club 19 Dec, Amr Diab 20 Dec.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)):
  - WTM 3–5 Nov ([page](https://www.excel.london/visitor/whats-on/world-travel-market-london-2026)).
  - Business Show, Retail Supply Chain & Logistics and co-located expos 11–12 Nov ([page](https://www.excel.london/visitor/whats-on/retail-supply-chain-logistics-expo-2026)). #RISK Europe 10–11 Nov was verified 31 Oct.
  - Contact Centre / Biotech / B2B Marketing 18–19 Nov; London EV Show and Vet Show 19–20 Nov.
  - HOMES UK 24–25 Nov; London Build Expo 25–26 Nov, "25,000+ visitors" (organiser figure, [page](https://www.excel.london/whats-on/london-build-expo)).
  - FinTech Connect 1–2 Dec; London Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec.
- **Alexandra Palace**, Great Hall:
  - Enter Shikari 20–21 Nov ([page](https://www.alexandrapalace.com/whats-on/enter-shikari/)); Nia Archives 26 Nov ([page](https://www.alexandrapalace.com/whats-on/nia-archives/)); Blossoms 27 Nov ([page](https://www.alexandrapalace.com/whats-on/blossoms/)); Gorgon City 28 Nov ([page](https://www.alexandrapalace.com/whats-on/gorgon-city/)).
  - **World Darts** 11 Dec – 3 Jan ([Ally Pally](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)): third round from 27 Dec, semi-finals Sat 2 Jan, final Sun 3 Jan 20:00, "record 180,000 tickets". The 24–26 Dec break was verified 31 Oct and not restated today.
- **Twickenham** ([Nations Championship](https://allianzstadiumtwickenham.com/nations-championship)): England v Australia Sun 8 Nov, v Japan Sat 14 Nov, v New Zealand Sat 21 Nov; Finals Weekend 27–29 Nov.
- **Wembley:** England v Croatia Thu 12 Nov 19:45 (verified 1 Nov). England v Ukraine Sat 5 Dec was verified 31 Oct only; P13 is booked that night.
- **NYE** 31 Dec ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026), checked 1 Nov).
- **VENUES map** (`build/properties.py`):

  | Venue | Properties |
  |---|---|
  | O2 | P01, P09, P07, P04 |
  | ExCeL | P01, P04, P07, P15 |
  | Ally Pally | P08, P11 |
  | Twickenham | P18, P10, P13, P16 |
  | Wembley | P10, P13, P02 |
  | Regent's Park / Frieze | P05 (no event in window) |

  - P20 is treated like P01.

| Nights | Event | Venue | Open properties | Effect | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 2 Nov | J. Cole (31 Oct) | O2 | P04 (P01, P09, P20 booked) | compression | P04 183 vs 168 | yes (+20%; min-2 conflict) |
| 3–7 Nov | Stevie Wonder, Korn, Suede/Manics, Heaton + WTM | O2 / ExCeL | all booked | – | – | n/a |
| 7–8 Nov | England v Australia | Twickenham | P13 booked 7 Nov; 8 Nov open | normal (Sun match) | P13 8 Nov 142 vs 146 | – |
| 10–11 Nov | #RISK + Business / Retail expos | ExCeL | P04, P20 | compression | P04 **165 / 165** vs 172; P20 **231 / 229** vs 237 | **no** |
| 12 Nov | England v Croatia (sold out) | Wembley | P13 | compression | **147** vs 177 | **no** |
| 13–17 Nov | Noah Kahan 13 / 14 / 17, Muse 15–16 | O2 | P20; P04 13 Nov | compression | P20 **228 / 232 / 227** / 255 / 258 vs 243; P04 **172** vs 178 | 13–15 no; 16–17 yes |
| 13–14 Nov | England v Japan | Twickenham | P13 booked | – | – | n/a |
| 18–20 Nov | EV / Vet / Contact Centre shows | ExCeL | P04, P20 | compression | P04 188 / 187 vs 186; P20 259 / 259 vs 251 | yes (barely) |
| 20–21 Nov | Enter Shikari | Ally Pally | P11 | compression | 239 / 236 vs 201 | yes |
| 20–21 Nov | The Script (21) | O2 | P04, P20 | compression | P04 196 / 200 vs 190; P20 268 / 281 vs 259 | yes |
| 21 Nov | England v NZ | Twickenham | P13 booked | – | – | n/a |
| 23 Nov | Don Toliver | O2 | P04, P20 | compression | P04 187; P20 within the −10% run | not tested (new) |
| 24 Nov | HOMES UK (24–25) | ExCeL | P04, P20 | compression | P04 **188** vs 193; P20 **257** vs 271 | **no** |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City | Ally Pally | P11 | compression | **203** / 249 / 267 vs 218 | 26 no; 27–28 yes |
| 27 Nov | Nations Championship Finals | Twickenham | P13 (27 Nov) | compression | 336 vs 244 | yes |
| 30 Nov – 2 Dec | Mariah Carey; Phoebe Bridgers (31 Oct) | O2 | P04 2 Dec | – | 494 (deprioritised +200%) | n/a |
| 8 Dec | Kehlani (date conflict 8 / 9) | O2 | P04, P20 | compression | P04 **185** vs 193; P20 299 vs 294 | P04 no |
| 11–12 Dec | Darts opening | Ally Pally | P11 | compression | 304 / 307 vs 248 | yes |
| 13–17 Dec | Darts | Ally Pally | P11 | compression | **217 / 194 / 196 / 207 / 229** vs 271 | **no** (conflict) |
| 16–19 Dec | Horse Show 17–21 (eve 16) / Kasabian 18 | ExCeL / O2 | P04, P20 | compression | P04 190 / 192 / 198 / 207 vs 190 (clean week); P20 **285 / 289** / 300 / 317 vs 291 | P04 yes (thin); P20 16–17 no |
| 18 Dec | Darts | Ally Pally | P11 | compression | 273 vs 236 | yes |
| 23 Dec | Darts (31 Oct schedule) | Ally Pally | P11 | compression | **304** vs 304 | **no (tie)** |
| 24–26 Dec | no darts | – | P11, P13, P20 | P13 compression on occupancy (+8.5 to +12.8 pts) | see 2c | – |
| 28 Dec – 2 Jan | NYE 31 Dec | central London | P20 (P04, P05, P11, P13 booked) | compression | P20 31 Dec 588 vs 316 | yes, above P90 |
| 3 Jan | Darts final | Ally Pally | P11 | compression | **190** vs 203 (clean week) | **no** |

## 4. Missed compression: open, verified-event nights at or below the fortnight (today)
| Ref | Night(s) | Event | Our £ (31 Oct) | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 10, 11 Nov | ExCeL expos | 231, 229 (247, 246) | 237 | 6, 8 |
| P20 | 13, 14 Nov | Noah Kahan | 228, 232 (244, 249) | 243 | 15, 11 |
| P20 | 24 Nov | HOMES UK | 257 (276) | 271 | 14 |
| P20 | 16 Dec | Horse Show eve (The Darkness UNVERIFIED) | 285 (267) | 291 | 6 |
| P11 | 26 Nov | Nia Archives | 203 (215) | 218 | 15 |
| P11 | 23 Dec | Darts | 304 (311) | 304 | 0 |
| P11 | 3 Jan | Darts final | 190 (190) | 203 | 13 |
| P04 | 10, 11 Nov | ExCeL expos | 165, 165 (175, 175) | 172 | 7, 7 |
| P04 | 13 Nov | Noah Kahan | 172 (180) | 178 | 6 |
| P04 | 8 Dec | Kehlani | 185 (192) | 193 | 8 |
| ~~P04~~ | ~~16 Dec~~ | dropped: 190 vs 189.6 | | | – |
| | | **Like-for-like with 31 Oct (14 nights / £143)** | | **13 nights** | **£116** |
| P20 | 15 Nov | Muse (new: Reyhan's −10%) | 227 (273) | 243 | 16 |
| P04 | 24 Nov | HOMES UK (new: −10%) | 188 (205) | 193 | 5 |
| P20 | 17 Dec | Horse Show day 1 (new) | 289 (296) | 291 | 2 |
| **P13** | **12 Nov** | **England v Croatia, Wembley** | **147 (155)** | **177** | **30** (31 Oct: 32) |
| P11 | 13–17 Dec | Darts (override conflict) | 217, 194, 196, 207, 229 (226, 201, 204, 215, 234) | 271 | 54, 77, 75, 64, 42 = **£312** (31 Oct: £315) |
| | | **Full total** | | **22 nights** | **£481** (31 Oct: 20 / £490) |

- **The like-for-like gap fell £27 (£143 → £116), but not because event nights were raised.**
  - The 14 event nights fell **£126** in price (£3,162 → £3,036). Reyhan's 31 Oct cuts lowered the surrounding nights even more, so the fortnight averages fell too (P20 10 Nov 254 → 237, P11 darts 279 → 271).
  - Measured against the PriceLabs default, the event nights moved further away.
- **P11 darts** (£312) is a conflict with a standing decision (`darts_override_24oct`), not a new proposal. Corentin to confirm.
- **Not counted as missed:** P20 23 Nov (Don Toliver, newly found) was not tested against a fortnight.

## 5. Dates to price above / below the PriceLabs default (per submarket)
- **Above current:**
  - **Shepherd's Bush P13:**
    - 12 Nov to at least £177, with min 1 (+£30).
    - 8–11 Nov to the default (+£71).
    - 7–13 Dec to the default (+£136); 14–23 Dec to P50 (+£239); 24–26 Dec to P50 (+£159).
    - Twins slightly different.
  - **St John's Wood P05:** 7–8 Dec to about P75, £595 / £592 (+£204); 13–21 Dec to the default (+£220).
  - **Barking P04:** 14–19 Dec to about P75 (+£142; 19 Dec reopened, Horse Show / Kasabian); 8 Dec to at least £193 (+£8).
  - **Camden P11:** 26 Nov to at least £218 (+£15); 3 Jan £203–213 (+£13–23). Darts 13–17 Dec: conflict, Corentin to confirm.
  - **Canary Wharf P20:** 10–15 Nov and 24 Nov sit £6–16 under the event fortnight. That is Reyhan's −10% replacing Corentin's −5%; restoring −5% alone closes most of the gap (Corentin to confirm).
- **Below current:**
  - **P05 9 Nov:** £1,462 → about £369–516 (or confirm soft block).
  - **P05 29 Dec:** £1,354 → about £1,070.
  - **P20 28 Dec – 2 Jan:** cap at about P90 (−£305), for Corentin's judgement.
  - **P12:** 2–4 Nov to the default (−£58; market −9.5 to −18.5 pts vs STLY). 27–29 Nov cap at P75 (−£13; mostly done by the −7%).
- **Hold:** P04 18–24 Nov; P04 6–13 Dec (except 8 Dec); P05 16–17 Nov and 29 Nov – 2 Dec; P11 23–25 Dec; P20 19–27 Dec; P12 12–20 Nov and 7–13 Dec.

## 6. Final market input for TOMORROW's base review (Mon 2 Nov)
Pace is from Smoobu `reservations.csv` 1 Nov (confirmed, room only, future-dated stays): bookings made 4–18 Oct vs 19 Oct – 1 Nov. **No new bookings on 31 Oct or 1 Nov**, so pace is identical to the 31 Oct brief; it is a Sunday lull, so don't over-read it.

| Ref | Base vs market (`market.csv` 1 Nov) | PL rec. base | Sellable nights (Smoobu, to 31 Dec / handback) | Pace 4–18 Oct → 19 Oct – 1 Nov | **Market input** |
|---|---|---|---|---|---|
| **P01** | 253 vs 2 BR P50 257 / P75 331 | 255 | **0** before the 20 Dec handback | 1 / 30 n / £152 → 1 / 3 n / £240 | **Drop from the review**: the base earns nothing before handback. |
| **P05** | 550 vs 4 BR P50 577 / P75 719 | 548 | 19; list £12,169 (avg £640; £550 excluding 9 Nov / 29 Dec) | 2 / 11 n / £578 → 1 / 3 n / £298 | **Hold 550** (= rec, under P50). The money is in the dates: 9 Nov, 29 Dec, 7–8 Dec and 13–21 Dec (§2b). |
| **P06** | 357 vs 2 BR P50 406 / P75 508 | **357** (up from 342) | 7 (8–14 Nov, avg £263); the rest are intentional blocks | 4 / 18 n / £189 → 1 / 3 n / £268 | **Hold 357** (= rec, well under P50). The base touches 7 nights only. |
| **P09** | 176 vs 1 BR P50 132 / P75 162 / P90 204 | 176 | 3 (10–12 Nov, avg £148) before the 26 Nov handback | 3 / 23 n / £103 → 1 / 2 n / £127 | **Hold 176** (= rec; 3 nights affected). Prices are from the 31 Oct 08:09Z refresh. |
| **P11** | 286 vs 2 BR P50 288 / P75 330 | 285 | 36; list £8,135 vs default £9,319 vs daily P50 £9,361 | 1 / 4 n / £163 → 2 / 6 n / £204 | **Hold 286 (= rec, at P50).** The base is not the lever: list sits 13% under the default because of Reyhan's −7% (10 Nov – 4 Dec) and −5% (8–18 Dec, darts conflict), and the listing is Booking.com-only. Our occupancy 40 / 38% vs market 46 / 39%. |
| **P12** | 284 vs 2 BR P50 206 / P75 244 / P90 303 (+38% vs P50) | **273** | 23 before the 13 Dec handback; list £5,965 vs default £6,606, P50 £4,842, P75 £6,032 | 2 / 5 n / £170 → 4 / 20 n / £173 (+1 cancelled) | **273 is the market-backed figure.** The effect is small: Reyhan's −7% already puts the list just under daily P75. Our occupancy 53 / 60% vs market 40 / 34%. Either 273, or 284 with the date fixes, is defensible. |
| **P13 at 250** (Reyhan, 24 Oct 21:14Z; `get_user_logs`) | 250 vs 2 BR P50 224 / P75 280 | 233 / 232 / 235 (3064856 / 3090701 / Vrbo) | 30; list £6,350 (avg £212) vs default £6,639 vs daily P50 £7,125 | Since 24 Oct: 2 bookings: 27 Dec – 3 Jan Airbnb 7 n £252 a night (made 26 Oct); 18–27 Nov Booking.com 9 n £127 a night (made 27 Oct) | **Keep 250.** The base is above P50, but what guests see is £212 on average, under P50. That comes from the close-in factors and Reyhan's −3% / −5% overrides. December market occupancy is +5.7 to +22.2 pts vs STLY, so there is no market case for 233. The P13 levers are 12 Nov and December (§2c), not the base. |

Data gaps:
1. All market figures are PriceLabs Nearby Listings data: Airbnb-derived, not comp sets, horizon unstated, cleaning not included.
   - **Daily percentiles and occupancy vs STLY are from 31 Oct**; only the summary percentiles were re-pulled 1 Nov.
   - Daily bands are 1–3 BR for P04, P11 and P20 and 3–5 BR for P05.
   - P08 and P14 percentiles are from 27 Oct; P10 was not pulled.
2. **Price field ambiguity.** `prices.csv` `pricelabs_price` is raw `price`. Raw `user_price` and `booked_price` (the "Your Price" column) differ by about ±5% on most nights and by more on some (P04 2 Nov: price £183 vs user_price £230; P20 1 Jan £532 vs £549).
   - I used `pricelabs_price` throughout for consistency with 31 Oct. Which figure Smoobu receives is NOT CHECKED.
3. **Events are domain-restricted WebSearch summaries, not page reads.**
   - **Date conflicts on venue sites:** Kehlani 8 / 9 Dec, Kasabian 18 / 19 Dec, Muse 13–17 vs 15–16 Nov.
   - **UNVERIFIED now:** The Darkness 16 Dec, Culture Club 19 Dec, Amr Diab 20 Dec.
   - **Verified 31 Oct only:** J. Cole 2 Nov, Phoebe Bridgers 1–2 Dec, #RISK 10–11 Nov, England v Ukraine 5 Dec, the darts 24–26 Dec break.
   - **Attendance:** stated only for the darts (180,000 tickets) and London Build Expo (25,000+ visitors).
   - England v Croatia "sold out for general sale" comes from the search summary of the Wembley page.
4. P09 prices are from the 31 Oct 08:09Z refresh. The P11 3 Jan price is the 31 Oct neighbourhood `final_price`.
5. Barking Airbnb 1455876748739910219 (3–9 Nov double-sell, t-p04-doublebook) is NOT CHECKED here: it is not in PriceLabs (channel section).
6. The intent of P05 9 Nov +300% (orphan sale vs soft block) is still unknown.
7. Policy `price_changes` dates the P20 base 380 → 350 to 24 Oct (Corentin). `get_user_logs` shows Reyhan made the change on **16 Oct 20:31Z**. This is a record discrepancy only.
