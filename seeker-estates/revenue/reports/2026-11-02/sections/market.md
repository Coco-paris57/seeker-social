# Market & demand calendar: run D = 2026-11-02 (window 2 Nov 2026 – 31 Jan 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Excluded: P02/P03/P06/P07 intentional blocks (P06's open 8–14 Nov run is t-p06-open; reported only as market context); nights after handbacks (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 report-only; P13 = one flat (3064856 + 3090701). Not re-raised: P04 2 Dec +200%, P12 17 Nov +50%, P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster.
- **Market data, pulled today 2 Nov ~07:25–07:30Z, one call at a time, all `all_operations_ok=true`:** `get_neighbourhood_data` **detail** (daily bands + occupancy vs STLY) for P06 3288517, P12 2699998, P05 3166592, P13 3064856, P04 3562176, P20 3547481, P11 3064196; **summary** for P01 3320302 and P09 3318172. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m02/neigh_<id>.json`.
  - 9 rows appended to `data/snapshots/2026-11-02/market.csv` (file copied forward from 1 Nov under `.market.csv.lock`). Source column: "PriceLabs get_neighbourhood_data summary_table (Nearby Listings percentiles … pulled 2026-11-02 … by market agent)".
  - Daily columns used: `market_25/75/90_percentile_prices`, `market_price` (= P50), `booked_50_percentile_price`, `occupancy.daily.market_occupancy` / `_stly`. Daily bands: 1–3 BR (P04, P06, P11, P20), 2–3 BR (P12, P13), 3–5 BR (P05).
- **Our prices:** `data/snapshots/2026-11-02/prices.csv` `pricelabs_price` (3 Nov – 1 Jan). After 1 Jan: today's neighbourhood `final_price`. **PL default** = `uncustomized_price` in `raw/prices_<id>.json` (2 Nov), after 1 Jan `prices_with_default_customization`.
  - Refresh (`last_refreshed_at`): P11 2 Nov 00:12Z, P13 00:15Z, P04 00:17Z, P20 00:20Z, P01 06:02Z: all after Reyhan's 2 Nov edits. **P12, P05, P06 1 Nov 09:13Z; P09 1 Nov 07:55Z** (no edits on these since).
- **Booking state:** Smoobu `reservations.csv` 2 Nov (confirmed).
- **Changes since 1 Nov 06:00Z:** `get_user_logs` (listing, 1–2 Nov) = **18 entries, all reyhan, 2 Nov 00:10–00:17Z**. `get_listing_date_overrides` P11 confirms the result.
- **Fortnight method unchanged:** 7 nights either side; blocked nights and nights over 2× the median excluded; clean week used for 16–20 Dec and 3 Jan. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m02/analyse02.py`; open-night tables `.../m02/open02.py <ref> <from> <to>`.
- **Events re-verified 2 Nov 2026** by domain-restricted WebSearch (venue / organiser domains). Direct page fetches failed: `www.wembleystadium.com` and `www.theo2.co.uk` do not resolve in this session. These are search summaries, not page reads.

## Reyhan's edits of 2 Nov 00:10–00:17Z (`get_user_logs`), and what they did
| Ref | Edit (latest wins) | Effect (`prices.csv` 2 Nov vs 1 Nov) | Status |
|---|---|---|---|
| **P20** | **Base 350 → 330, min 220 → 200** ("reviewPrices"); 6–24 Nov **−5%** (min 3; −3% first, then −5%) | 6–24 Nov −5% now matches Corentin's −5%. 18–24 Nov +£20–38 a night; 28 Dec – 1 Jan −£63 to −£123 a night (31 Dec 588 → 465) | **6–24 Nov conflict resolved.** **New conflict:** the base cut runs against `listing_facts.P20.price_24oct` (Corentin: base 350). PL recommended base is **347**. Corentin to confirm. |
| **P11** | 10 Nov – 18 Dec: **price removed (0%)**, min 2 kept. 2 Nov +10% (after +20%) | Darts 13–17 Dec **£1,150** (was £1,043) | The −5% on darts is gone, but they are still at 0%, not the **+5% in `darts_override_24oct`**. The conflict is narrower; Corentin to confirm. 2 Nov orphan +10% (t-p11-2nov): see the pricelabs section. |
| **P13** | 2–12 Nov: **price removed (0%)**, min 2; 7–20 Dec **−2%** (was −5%), min 2. Both twins + Vrbo | 12 Nov **£159** (was £147); 7–26 Dec £4,600 (was £4,492) | a-raise-1012nov **partly fixed** (−5% gone, no +10%, **min 2 still on 12 Nov**). a-peak-check (P13): still under the default and P50 (§2c). |
| P04, P05, P06, P12, P09 | none | – | Yesterday's conflicts stand: P04 −10% vs Corentin's −8% (9–24 Nov); P12 −7% over the +50% on 17 Nov (deprioritised, not re-raised). |

## 1. Submarket table (`market.csv` 2 Nov; occ = `pl_kpis.csv` 2 Nov `market_occupancy_next_30/60`; base / PL rec from `listings.csv` 2 Nov)
| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50** / **P75** / P90 £ (n) | Our occ 30/60 | Base / PL rec. |
|---|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 34 / 28% | 214 / **258 / 331** / 421 (148) | 100 / 100%* | 253 / 255 |
| Canary Wharf | P20 | 2 | 37 / 30% | 214 / **252 / 314** / 411 (154) | 37 / 23% | **330** / 347 |
| Barking | P04 | 2 | 24 / 20% | 139 / **171 / 218** / 258 (91) | 57 / 53% | 220 / – |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 110 / **132 / 160** / 204 (126) | 90 / 95%* | 176 / 176 |
| Mile End (HB 13 Dec) | P12 | 2 | 40 / 34% | 170 / **206 / 246** / 306 (119) | 50 / 60% | 284 / 273 |
| Marylebone (blocked on purpose) | P06 | 2 | 46 / 41% | 314 / **405 / 507** / 618 (216) | 77 / 88%* | 357 / 357 |
| Camden | P11 | 2 | 46 / 39% | 231 / **289 / 331** / 392 (173) | 37 / 40% | 286 / 285 |
| St John's Wood | P05 | 4 | 40 / 38% | 462 / **578 / 717** / 1,161 (91) | 83 / 68% | 550 / 548 |
| Shepherd's Bush | P13 | 2 | 41 / 36% | 188 / **225 / 280** / 348 (117) | 67 / 50% | 250 / **237** (3090701: 236; Vrbo 250) |
| Islington (HB 13 Nov) / Primrose Hill (report only) | P08 / P14 | 2 / 1 | – | `market.csv` 27 Oct only: 183/228/284/334; 153/205/255/298 | – | – |

\* Inflated: PriceLabs counts handback or intentional blocks as occupied. P50 moves vs 1 Nov are within ±£3 everywhere (P04 168 → 171 is the largest).

## 2. Asked-for checks

### 2a. New bookings (booked 1 Nov) vs market (today's daily bands; Smoobu `total_gbp` = room only)
| Booking | Paid room | Per night | PL at booking (Dispatcher, 1 Nov raw) | Market P25 / **P50** / P75 (sum) | Booked-P50 (sum) | Mkt occ vs STLY | Read |
|---|---|---|---|---|---|---|---|
| **P06** Airbnb 12–15 Nov (3 n) | £541.00 | **£180** | £891 (**0.607x**). Today: £832 (PL), default £970 | £848 / **£1,048** / £1,314 | £941 | 43.1/47.1/45.5 vs 47.2/50.4/50.1 (−3.3 to −4.6) | **0.52x P50, 0.64x P25, 0.57x booked median.** Below the cheapest quarter of Marylebone 1–3 BR. The PL price itself sat below P25 (£256/286/290 vs £273/290/285). Most of the gap is channel-side, not market (0.607x PL is beyond `channel_pricing.airbnb_discount`'s "close to PriceLabs" for post-21 Oct bookings: channel section). |
| **P12** Booking.com 27–30 Nov (3 n) | £653.39 | **£218** | £820 (**0.797x**) | £528 / **£632** / £809 | £578 | 44.5/45.3/37.1 vs 44.1/47.7/33.7 (−2.4 to +3.4) | **1.03x P50, 0.81x P75, 1.13x booked median.** A market-rate sale. Most of the 0.797x is the Booking.com promotion stack (policy `booking_stacked_promotions`). |
| **P05** Airbnb 29 Jan – 1 Feb 2027 (3 n) | £1,059.52 | **£353** | today's neighbourhood `final_price` £415/421/383 = **£1,219 (0.869x)**; default £1,411 (0.75x) | £878 / **£1,104** / £1,562 (3–5 BR) | £808 | 11.1/10.8/7.3 vs 2.9/3.6/2.5 (+4.8 to +8.2, tiny base) | **0.96x P50, 1.31x booked median.** 0.869x PL fits a 12% early-bird (£1,219 × 0.88 = £1,073, £13 off), **stacked on Reyhan's −7% (4–31 Jan) already inside PL**. That P05 Airbnb has the same Smoobu early-bird rule as Shepherd's Bush is NOT CHECKED. |

### 2b. P13 Shepherd's Bush (Wembley / Twickenham map)
**Thu 12 Nov, England v Croatia, Wembley, 19:45, UEFA Nations League.** Listed as **sold out**; general sale opened 22 Oct ([wembleystadium.com/events/2026/England-v-Croatia](https://www.wembleystadium.com/events/2026/England-v-Croatia), [englandfootball.com match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre); checked 2 Nov). Attendance not stated.
- 3064856 **£159** (1 Nov £147) vs fortnight **£172**, PL default £170, market P25 £176, **P50 £214**, booked median £212. Market occ 37.8 vs 49.1% STLY (**−11.3**): the week around it is soft.
- Twin 3090701 is **£193** on 12 Nov: the same flat is listed £34 apart.
- **Min stay 2 on 12 Nov, with 13 Nov booked**, so 12 Nov can only be sold as 11–12 Nov.
- **Proposal: 3064856 12 Nov to at least £176 (P25; +£17) and min 1.** That keeps it under the twin. Missed compression: §4, £13 vs the fortnight.
- 8–11 Nov: £624 vs default £633, market −4.4 to −18.6 pts vs STLY. **Hold.** Yesterday's +£71 is closed by Reyhan's 0%.

**Christmas (open 7–26 Dec; 27 Dec – 3 Jan booked).** Market occupancy is ahead of STLY on every night.
| Nights | Ours | PL default | P50 | Mkt occ vs STLY | Proposal |
|---|---|---|---|---|---|
| 7–13 Dec | £1,596 | £1,653 | £1,653 | +6.8 to +14.2 | To the default (+£57) |
| 14–23 Dec | £2,315 | £2,384 | **£2,475** | +4.7 to +22.6 | To P50 (+£160) |
| 24–26 Dec (min 3) | £689 | £712 | **£843** | +8.5 to +12.3 | To P50 (+£154) |
| **Total 7–26 Dec** | **£4,600** | £4,749 | £4,971 | | **+£371** (1 Nov: +£534) |
- Reyhan's −5% → −2% closed £108 of the gap.
- **Both twins are identical on all 20 nights** (£4,600 each, `raw/prices_3090701.json`). Policy `twin_listings` says never identical, so keep a small gap when applying this.

### 2c. P04 Barking, open December run (O2 / ExCeL map; −10% 6–22 Dec still in place)
| Nights | Ours | PL default | P50 / **P75** | Mkt occ vs STLY | Events | Proposal |
|---|---|---|---|---|---|---|
| 6–13 Dec (8 n, min 3) | £1,517 | £1,838 | £1,287 / £1,646 | 6–10 Dec −1.1 to −5.3; 11–13 +2.5 to +5.7 | Kehlani, O2, Tue 8 Dec | **Hold, except 8 Dec to at least £194 (+£11)** |
| **14–19 Dec** (6 n, min 3) | **£1,166** (185/188/191/193/201/208) | £1,370 | £968 / **£1,298** | **+2.2 to +6.1 every night** | London International Horse Show, ExCeL, 17–21 Dec; Kasabian, O2, Fri 18 Dec | **Above current, below the default: to about P75 (+£132).** 17–19 Dec £217 / £219 / £218. |
- Kehlani 8 Dec: [theo2.co.uk/events/detail/kehlani-2026](https://www.theo2.co.uk/events/detail/kehlani-2026) (the search summary gives Tue 8 Dec).
- Kasabian 18 Dec: [theo2.co.uk/events/detail/kasabian-2026](https://www.theo2.co.uk/events/detail/kasabian-2026).
- Horse Show: [londonhorseshow.com](https://londonhorseshow.com/) and [excel.london](https://www.excel.london/whats-on/london-international-horse-show) say 17–21 Dec (the organiser's driving page says Mon 22 Dec, a conflict).
- All checked 2 Nov.
- 2 Dec £495 (+200%) is deprioritised; not re-raised.

### 2d. P20 Canary Wharf, NYE (not in VENUES; treated like P01)
| Nights | Ours | PL default | P75 / **P90** | Mkt occ vs STLY | Read |
|---|---|---|---|---|---|
| 19–27 Dec | £2,666 | £2,972 | **£2,856** / £3,538 | −4.4 to +6.1 | Now **under P75**. Hold. |
| 28 Dec – 2 Jan | **£2,735** (460/460/466/**465**/432/452) | £3,042 | £2,103 / **£2,877** | **+3.5 to +12.8** | Now **£142 under P90** (1 Nov: £306 over). **Yesterday's cap is met, so hold.** |
- **NYE 31 Dec is priced by PriceLabs:** £465 vs fortnight £285 (NYE week excluded). Event: [london.gov.uk/events/london-new-years-eve-2026](https://www.london.gov.uk/events/london-new-years-eve-2026), checked 2 Nov: Thu 31 Dec, 20:00–00:30, Ticketmaster only, £20–55, second batch not yet dated. Attendance not stated.
- The drop from £3,183 to £2,735 came with Reyhan's base cut, 350 → 330 (2 Nov 00:16Z). Corentin to confirm that base (see the edits table).

## 3. Demand calendar, next 90 days (our £ vs fortnight £; today's prices)
**Events verified 2 Nov (domain-restricted WebSearch):**
- **Wembley:** England v Croatia, Thu 12 Nov, sold out (links above).
- **O2:** Noah Kahan 13 / 14 / 17 Nov ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026)); Kehlani 8 Dec; Kasabian 18 Dec.
- **ExCeL:**
  - #RISK Europe 10–11 Nov ([page](https://www.excel.london/visitor/whats-on/risk-europe-2026)).
  - Business Show 11–12 Nov ([page](https://www.excel.london/whats-on/the-business-show-london-2026)).
  - London EV Show 18–19 Nov ([page](https://www.excel.london/visitor/whats-on/london-ev-show)); London Vet Show 19–20 Nov ([page](https://www.excel.london/whats-on/london-vet-show-2026)).
  - HOMES UK 24–25 Nov; London Build 25–26 Nov ([page](https://www.excel.london/whats-on/london-build-expo); "25,000+ visitors" was stated 1 Nov, not re-read).
  - Horse Show 17–21 Dec; Scrooge Cirque 23–28 Dec ([what's on](https://www.excel.london/whats-on)).
- **Ally Pally:** Enter Shikari 20–21 Nov ([page](https://www.alexandrapalace.com/whats-on/enter-shikari/)); Nia Archives 26 Nov ([page](https://www.alexandrapalace.com/whats-on/nia-archives/)); Blossoms 27 Nov ([page](https://www.alexandrapalace.com/whats-on/blossoms/)); Gorgon City 28 Nov ([page](https://www.alexandrapalace.com/whats-on/gorgon-city/)).
- **World Darts** 11 Dec – 3 Jan ([Ally Pally](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)):
  - Round 1 11–19 Dec; Round 2 20–23 Dec; Round 3 from 27 Dec; QF 1 Jan; SF Sat 2 Jan; final Sun 3 Jan 20:00.
  - "Record 180,000 tickets" (organiser figure).
  - Conflict: one PDC ballot post says "to January 4".
- **NYE** 31 Dec.
- **Verified 1 Nov only (not re-checked today):** Twickenham Nations Championship Finals 27–29 Nov; Muse (13–17 vs 15–16 Nov, conflict); Don Toliver 23 Nov; Mariah Carey 30 Nov.
- **UNVERIFIED:** Phoebe Bridgers (1–2 vs 9 Dec, conflict today); The Darkness 16 Dec; Culture Club 19 Dec; Amr Diab 20 Dec.

| Nights | Event | Venue | Open properties | Effect (market occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 10–11 Nov | #RISK + Business Show | ExCeL | P04, P20 | normal (P20 −2.1 / +3.2) | P04 **169 / 173** vs 176; P20 233 / 234 vs 232 | P04 **no**; P20 barely |
| 12 Nov | England v Croatia (sold out) | Wembley | P13 3064856 | soft week (−11.3) | **159** vs 172 (twin 193) | **no** |
| 13–17 Nov | Noah Kahan 13/14/17 (+ Muse, conflict) | O2 | P20; P04 13 Nov | normal (P20 +5.5, −5.4, −9.3, −2.9, +2.1; market P50 flat £212–218) | P20 **231/230/225/223/228** vs 257; P04 **179** vs 181 | **no**: the PL default itself dips (P20 unc 260–269 vs 304–335 on 18–24 Nov) |
| 18–20 Nov | EV / Vet shows | ExCeL | P04, P20 | normal | P04 187 / **186** vs 186; P20 290 / 289 vs 258 | P20 yes; P04 no (tie on 19 Nov) |
| 20–21 Nov | Enter Shikari | Ally Pally | P11 | – | 241 / 243 vs 222 | yes |
| 20–21 Nov | The Script (1 Nov) | O2 | P04, P20 | – | P04 196 / 198 vs 189; P20 301 / 299 vs 267 | yes |
| 24 Nov | HOMES UK | ExCeL | P04, P20 | normal (P20 −0.1) | P04 **186** vs 192; P20 **275** vs 286 | **no** |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City | Ally Pally | P11 | – | **219** / 266 / 283 vs 231 | 26 no; 27–28 yes |
| 27 Nov | Nations Finals (1 Nov) | Twickenham | P13 | – | 336 vs 252 | yes |
| 8 Dec | Kehlani | O2 | P04, P20 | P04 −1.2 | P04 **183** vs 194; P20 **256** vs 264 | **no** |
| 11–12 Dec | Darts opening | Ally Pally | P11 | +9.8 / +6.7 | 335 / 340 vs 269 | yes |
| 13–17 Dec | Darts | Ally Pally | P11 | **soft (−1.0 to −7.5)** | **240/213/218/229/250** vs 290 | **no** (override conflict) |
| 16–19 Dec | Horse Show 17–21 / Kasabian 18 | ExCeL / O2 | P04, P20 | P04 +3.6 to +6.1; P20 −4.3 to +6.1 | P04 191/193/201/208 vs 191 (clean week); P20 **250 / 252** / 263 / 276 vs 255 | P04 thin; P20 16–17 no |
| 18 Dec | Darts | Ally Pally | P11 | −3.6 | 300 vs 261 | yes |
| 23 Dec | Darts R2 | Ally Pally | P11 | −0.4 | **313** vs 318 | **no** |
| 24–26 Dec | no darts | – | P11, P13, P20 | P13 +8.5 to +12.3 | §2b | – |
| 28 Dec – 2 Jan | NYE 31 Dec | central London | P20 (P04, P05, P11, P13 booked) | +3.5 to +12.8 | P20 31 Dec 465 vs 285 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | – | **185** vs 201 (clean week) | **no** |

## 4. Missed compression: open, verified-event nights at or below the fortnight
| Ref | Night(s) | Event | Our £ today (1 Nov) | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 13, 14 Nov | Noah Kahan | 231, 230 (228, 232) | 257 | 26, 27 |
| P20 | 24 Nov | HOMES UK | 275 (257) | 286 | 11 |
| P20 | 16 Dec | Horse Show eve | 250 (285) | 255 | 5 |
| P11 | 26 Nov | Nia Archives | 219 (203) | 231 | 12 |
| P11 | 23 Dec | Darts | 313 (304) | 318 | 6 |
| P11 | 3 Jan | Darts final | 185 (190) | 201 | 16 |
| P04 | 10, 11 Nov | ExCeL expos | 169, 173 (165, 165) | 176 | 7, 3 |
| P04 | 13 Nov | Noah Kahan | 179 (172) | 181 | 2 |
| P04 | 8 Dec | Kehlani | 183 (185) | 194 | 11 |
| ~~P20~~ | ~~10, 11 Nov~~ | dropped: now 233 / 234 vs 232 | | | – |
| | | **Like-for-like vs 1 Nov's 13 nights / £116** | | **11 nights** | **£126** |
| P20 | 15 Nov | Muse (conflict) / Kahan run | 225 (227) | 257 | 32 |
| P04 | 24 Nov | HOMES UK | 186 (188) | 192 | 6 |
| P20 | 17 Dec | Horse Show day 1 | 252 (289) | 255 | 3 |
| **P13** | **12 Nov** | **England v Croatia** | **159 (147)** | **172** | **13** (1 Nov: 30) |
| P11 | 13–17 Dec | Darts (conflict) | 240/213/218/229/250 (217/194/196/207/229) | 290 | 50, 77, 72, 61, 40 = **£300** (1 Nov: £312) |
| | | **1 Nov's 22-night set today** | | **20 nights** | **£479** (1 Nov: £481) |
| P20 | 16, 17 Nov | Kahan run (newly below) | 223, 228 (255, 258) | 257 | 34, 29 |
| P04 | 19 Nov | EV / Vet (tie) | 186 (187) | 186 | 0 |
| P20 | 8 Dec | Kehlani (newly tested) | 256 (299) | 264 | 8 |
| | | **Full total today** | | **24 nights** | **£550** (excl. P11 darts conflict: 19 nights / £250) |

- **Why the like-for-like gap rose £10 (£116 → £126):** P20's Kahan nights stayed flat while Reyhan's −10% → −5% lifted 18–24 Nov, so the fortnight rose from £243 to £257.
  - **The PriceLabs default does not price 13–17 Nov in Canary Wharf either** (unc 260–269 vs 304–335 the next week). Market P50 is flat at £212–218 and occupancy vs STLY is mixed, so this evidence is the weakest in the table.
- **P13 12 Nov roughly halved (£30 → £13)**, because Reyhan removed the −5%.
- **P11 darts (£300)** is a conflict with a standing decision (`darts_override_24oct`), not a new proposal: Corentin to confirm. Darts weekday market occupancy is behind STLY (−1.0 to −7.5), and ours is under P50 (£1,150 vs £1,263).

## 5. Dates to price above / below the PriceLabs default, per submarket
- **Shepherd's Bush P13 (above current):**
  - 12 Nov to at least £176 with min 1 (+£17).
  - 7–13 Dec to the default (+£57); 14–23 Dec to P50 (+£160); 24–26 Dec to P50 (+£154).
  - Twins slightly different.
  - **Total +£388.**
- **St John's Wood P05:**
  - **Above:** 7–8 Dec £490 / £483 → about P75, £597 / £593 (**+£217**; market +11.0 / +5.5 vs STLY; a-p05-dec not fixed). 13–21 Dec £5,406 → the default, £5,716 (**+£310**; market −1.3 to +9.0).
  - **Below:** 9 Nov £1,451 (+300%) → P50–P75, £371–519, unless Corentin confirms a soft block (market −11.8 vs STLY; a-p05-9nov not fixed). 29 Dec £1,342 → about P90 / default, £1,077–1,081 (**−£261**; a-peak-check P05 not fixed).
  - Hold 16–17 Nov and 29 Nov – 2 Dec.
- **Barking P04 (above current, below default):** 14–19 Dec to about P75 (+£132); 8 Dec to at least £194 (+£11); 10–11 Nov to £176 (+£10); 24 Nov to £192 (+£6). This sits inside Reyhan's −10% (6–22 Dec, 9–24 Nov), which conflicts with Corentin's −8% for Nov; Corentin to confirm.
  - Hold 18–23 Nov and 6–7 / 9–13 Dec.
- **Camden P11 (above current):** 26 Nov to at least £231 (+£12); 23 Dec to at least £318 (+£6); 3 Jan to at least £201 (+£16).
  - Darts 13–17 Dec: back to Corentin's +5% would be about +£58 on the default. Conflict; Corentin to confirm.
- **Canary Wharf P20:** 13–17 Nov to the event fortnight (+£148), *only if* Corentin reads Noah Kahan as compression: market P50 does not show it. 24 Nov +£11; 8 Dec +£8; 16–17 Dec +£8.
  - **Hold** 19–27 Dec and 28 Dec – 2 Jan (now under P75 / P90).
  - Base 330 vs Corentin's 350: conflict to confirm.
- **Mile End P12:** 3–4 Nov £452 → the default, £409 (**−£43**; market −13.7 / −15.6 vs STLY, ours above the default). 27–29 Nov is now booked (a-p12-2228nov: 21–30 Nov booked except 26 and 30 Nov).
  - Hold 12–20 Nov and 7–12 Dec.
- **Marylebone P06:** blocked on purpose; nothing proposed. 8–11 Nov (open) sits at £891 vs P25 £1,017.

## 6. Market input for TODAY's base review (a-base-review-1102)
- **Pace** (Smoobu `reservations.csv` 2 Nov, confirmed, room only, arrival ≥ booking date): bookings made 4–18 Oct vs 19 Oct – 2 Nov (15 days each).
  - **Raised flats combined: 13 bookings / 91 n / £200 → 13 bookings / 46 n / £209** (P01's 30-night stay drives the "before" nights).
  - New since yesterday: P06 £180, P12 £218, P05 £353.
- **Sellable** = open nights to 31 Dec or the handback date, from `prices.csv` 2 Nov + Smoobu.

| Ref | Base vs market (`market.csv` 2 Nov) | PL rec. | Sellable / list vs default vs daily P50 / P75 | Pace 4–18 Oct → 19 Oct – 2 Nov | **Market input** |
|---|---|---|---|---|---|
| **P01** | 253 vs P50 258 / P75 331 | 255 | **0** before the 20 Dec handback | 1 / 30 n / £152 → 1 / 3 n / £240 | **Off the agenda**: the base earns nothing before handback. |
| **P05** | 550 vs 4 BR P50 578 / P75 717 | 548 | 19 n; £12,107 vs £11,804 vs £8,857 / £11,882 (9 Nov + 29 Dec = £2,793 of it) | 2 / 11 n / £578 → 2 / 6 n / £326 | **Hold 550** (= rec, under P50). The Jan booking sold at 0.96x P50. The levers are the dates (§5). |
| **P06** | 357 vs P50 405 / P75 507 | 357 | **4 n** (8–11 Nov), £891 vs £995 vs £1,288 / £1,644 | 4 / 18 n / £189 → 2 / 6 n / £224 | **Hold 357** (= rec, well under P50). The 12–15 Nov sale at £180 (0.52x P50) is a channel gap, not a base problem. |
| **P09** | 176 vs 1 BR P50 132 / P75 160 / P90 204 | 176 | 3 n (10–12 Nov), £410 (avg £137); no daily band pulled | 3 / 23 n / £103 → 1 / 2 n / £127 | **Hold 176** (= rec). It affects 3 nights. Prices are from the 1 Nov 07:55Z refresh. |
| **P11** | 286 vs P50 289 / P75 331 | 285 | 35 n; £8,595 vs £8,938 vs £9,060 / £11,632 | 1 / 4 n / £163 → 2 / 6 n / £204 | **Hold 286** (= rec, at P50). The list is now 4% under the default (was 13%) after Reyhan's removal of the −7% / −5%. Our occupancy 37 / 40% vs market 46 / 39%. Booking.com only. |
| **P12** | 284 vs P50 206 / P75 246 / P90 306 | 273 | 18 n before the 13 Dec handback; £4,614 vs £5,058 vs £3,791 / £4,718 | 2 / 5 n / £170 → 5 / 23 n / £179 (+1 cancelled) | **284 while Reyhan's −7% (16 Nov – 13 Dec) stands; 273 only if it is removed** (unchanged). The list is 2% under daily P75. The new 27–30 Nov sale landed at P50. Our occupancy 50 / 60% vs market 40 / 34%. |
| **P13 at 250** (Reyhan, 24 Oct) | 250 vs P50 225 / P75 280 | **237 / 236** (1 Nov 233 / 232); Vrbo 250 | 29 n; £6,325 (avg £218) vs £6,392 vs £6,895 / £8,845 | 6 / 24 n / £151 → 2 / 16 n / £182 | **Keep 250 and record it.** What guests see (£218) is under P50. The PL rec rose £4. The levers are 12 Nov and December (§2b). |

Data gaps:
1. All market figures are PriceLabs Nearby Listings: Airbnb-derived, Host-only fee, `cleaning_fee` null, not comp sets, horizon unstated. Daily bands are bedroom ranges (1–3, 2–3 or 3–5 BR), not exact matches.
   - P01 and P09 have summary data only (no daily band). P08 and P14 are from 27 Oct; P10 was not pulled.
   - Booking.com-paid totals (P12) and Airbnb room totals are compared with Airbnb host-fee market prices. VAT and markup treatment are not aligned.
2. **Events are domain-restricted WebSearch summaries, not page reads.** `wembleystadium.com` and `theo2.co.uk` do not resolve in this session; they need allow-listing for page reads.
   - Conflicts: Muse 13–17 vs 15–16 Nov; Phoebe Bridgers 1–2 vs 9 Dec; Horse Show end 21 vs 22 Dec; darts end 3 vs 4 Jan.
   - Not re-verified today: Twickenham Finals, The Script, Don Toliver, Mariah Carey.
   - UNVERIFIED: The Darkness, Culture Club, Amr Diab.
   - Attendance: stated only for the darts (180,000 tickets) and London Build (25,000+, 1 Nov).
3. PL price at booking for P06 and P12 is the Dispatcher's 1 Nov raw figure (31 Oct ~22:10Z refresh), not the price at the moment of booking. The P05 Jan ratio uses today's neighbourhood `final_price` (P05 refresh 1 Nov 09:13Z), outside the 60-day `prices.csv` window.
4. Whether P05's Airbnb listing carries the Smoobu 12% early-bird rule is NOT CHECKED (documented only for Shepherd's Bush).
5. `prices.csv` `pricelabs_price` is raw `price`. Which of `price` / `user_price` / `booked_price` Smoobu receives is NOT CHECKED (same as 1 Nov).
6. P12, P05, P06 and P09 prices are from 1 Nov refreshes. P11 3 Jan and P20 2 Jan come from today's neighbourhood `final_price`.
7. The P20 Noah Kahan "missed" nights rest on the fortnight rule only. Market P50 and the PL default both stay flat there.
