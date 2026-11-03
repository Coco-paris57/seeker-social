# Market & demand calendar: run D = 2026-11-03 (window 3 Nov 2026 – 31 Jan 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Excluded: P02/P03/P06/P07 intentional blocks; nights after handbacks (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 report-only; P13 = one flat (3064856 + 3090701). Not re-raised: P04 2 Dec +200%, P12 17 Nov +50%, P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P20 20–22 Nov delivery block.
- **Market data pulled today 3 Nov, one call at a time, all `all_operations_ok=true`:** `get_neighbourhood_data` **detail** for P20 3547481, P11 3064196, P13 3064856, P05 3166592, P04 3562176, P12 2699998. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m03/neigh_<id>.json`. P06 (blocked), P01 and P09 (summary) carried from 2 Nov.
  - 6 rows appended to `data/snapshots/2026-11-03/market.csv` (copied forward from 2 Nov under `.market.csv.lock`). Source column: "PriceLabs get_neighbourhood_data summary_table (Nearby Listings percentiles … pulled 2026-11-03 … by market agent)".
  - Daily columns: `market_25/75/90_percentile_prices`, `market_price` (= P50), `booked_50_percentile_price`, `occupancy.daily.market_occupancy` / `_stly`.
- **Our prices:** `data/snapshots/2026-11-03/prices.csv` `pricelabs_price` (= `smoobu_price` on every night quoted, except P12 4 Nov: PL £196 vs Smoobu £170). **PL default** = `uncustomized_price` in `raw/prices_<id>.json` (3 Nov). Refresh (`last_refreshed_at`): P12, P11, P13 2 Nov 15:05–15:06Z; P20 2 Nov 23:30Z; P05, P04 2 Nov 08:54Z — all after the last edit on each listing.
- **Booking state:** Smoobu `reservations.csv` 3 Nov (confirmed). `total_gbp` = room only.
- **Fortnight method unchanged:** 7 nights either side; blocked nights and nights over 2x the median excluded; clean week for 16–20 Dec and 3 Jan. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m03/analyse03.py`; open-night tables `.../m03/open03.py <ref> <from> <to>`.
- **Events re-verified 3 Nov 2026** by domain-restricted WebSearch (venue/organiser domains). Direct fetch of `theo2.co.uk`, `wembleystadium.com`, `excel.london`, `alexandrapalace.com`, `londonhorseshow.com`, `london.gov.uk` fails from this session (curl 000). These are search summaries of the official pages, not page reads.

## 0. PriceLabs edits since 2 Nov 06:00Z (`get_user_logs` listing, 2–3 Nov: 35 entries, all reyhan)
| Time (Z) | Ref | Edit | Market read |
|---|---|---|---|
| 2 Nov 15:02 | P12 | 2–4 Nov **−10%**; 12–13 Nov −5%; 16 Nov–13 Dec **−10%** (was −7%); **26 Nov +25%, min 1** | 3–4 Nov now £189/£196 vs P50 £189/£198 (yesterday's "to default" ask overtaken; market −14/−11 pts vs STLY, so fine). **26 Nov £352 is above P90 £336** for a 1-night orphan with no verified event in the Mile End map. 4 Nov Smoobu still £170 vs PL £196 (push lag; pricelabs section). |
| 2 Nov 15:05 | **P11** | 10 Nov–18 Dec **−5%** (min 2) re-added, 9 h after it was removed | Darts 13–17 Dec back to **£1,091** (yesterday £1,150). Conflict with `darts_override_24oct` (+5%) is **wider again**: Corentin to confirm. |
| 2 Nov 15:05 | **P13** | 8–12 Nov **−5%** and 7–20 Dec **−5%** (was −2%), both twins + Vrbo | **12 Nov (England v Croatia) down £159 → £151**; Christmas 7–26 Dec £4,600 → £4,506. a-raise-1012nov reversed. |
| 2 Nov 23:26 | P20 | 16–19 Nov **−2%, min 2** (over the −5%) | Lifts 16–17 Nov. **Min 2 conflicts with `listing_facts.P20.min_stay` (3 nights to 30 Nov)**: Corentin to confirm. |
| – | base | **No `base_price` change since 2 Nov 00:16Z.** P20 still **330** (Corentin's figure 350; PL rec 347) | a-base-review-1102 **not actioned** in PriceLabs. |

## 1. Submarket table (`market.csv` 3 Nov; occ = `pl_kpis.csv` 3 Nov `market_occupancy_next_30/60`; base/rec = `listings.csv` 3 Nov)
| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50** / **P75** / P90 £ (n) | Our occ 30/60 | Base / PL rec |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 36 / 30% | 212 / **249 / 314** / 410 (154) | 47 / 28% | **330** / 347 |
| Canary Wharf (HB 20 Dec) | P01 | 2 | 34 / 29% | 214 / **258 / 331** / 421 (148) [2 Nov] | 100 / 100%* | 253 / 255 |
| Barking | P04 | 2 | 23 / 20% | 139 / **170 / 218** / 257 (91) | 57 / 53% | 220 / – |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 110 / **132 / 160** / 204 (126) [2 Nov] | 90 / 95%* | 176 / 176 |
| Mile End (HB 13 Dec) | P12 | 2 | 40 / 34% | 170 / **205 / 242** / 296 (120) | 60 / 67% | 284 / 273 |
| Marylebone (blocked on purpose) | P06 | 2 | 45 / 41% | 314 / **405 / 507** / 618 (216) [2 Nov] | 87 / 93%* | 357 / 357 |
| Camden | P11 | 2 | 46 / 39% | 230 / **288 / 330** / 391 (173) | 37 / 40% | 286 / 285 |
| St John's Wood | P05 | 4 | 40 / 38% | 452 / **573 / 714** / 1,152 (93) | 80 / 68% | 550 / 548 |
| Shepherd's Bush | P13 | 2 | 41 / 36% | 188 / **224 / 280** / 347 (117) | 67 / 50% | 250 / 237 (3090701: 236) |
| Islington (HB 13 Nov) / Primrose Hill (report only) | P08 / P14 | 2 / 1 | – | `market.csv` 27 Oct only: 183/228/284/334; 153/205/255/298 | – | – |

\* Inflated by handback/intentional blocks. P50 moves vs 2 Nov are within ±£5 (P05 578 → 573 largest). Bow, Little Venice, Fulham, St John's Wood P17, Kings Langley, Ladbroke Grove, Bayswater, Woolwich: no `market.csv` row (not pulled / blocked).

## 2. Asked-for checks

### 2a. New bookings (booked 2 Nov) vs market (today's daily bands)
| Booking | Paid room | /night | PL at booking (Dispatcher, 2 Nov raw) | PL default (unc, today) | Market P25 / **P50** / P75 (sum) | Booked-P50 | Mkt occ vs STLY | Read |
|---|---|---|---|---|---|---|---|---|
| **P20** Airbnb 10–13 Nov (nights 10, 11, 12) | £510.00 | **£170** | £706 (**0.722x**); today £709 | £866 (0.59x) | £521 / **£632** / £834 | £598 | 38.9/40.7/42.4 vs 41.3/37.8/39.8 (−2.4, +2.9, +2.6) | **0.81x P50, 0.98x P25, 0.85x booked median**: sold just under the cheapest quarter of Canary Wharf 1–3 BR. **Not Noah Kahan / Muse nights:** Kahan is 13/14/17 Nov and Muse 15/16 Nov; the guest checks out on 13 Nov. The nights overlap ExCeL #RISK (10–11) and Business Show / Going Global / Retail expos (11–12); market occupancy shows no compression. Booked 8 days out, so Airbnb's 15% last-minute (`airbnb_discounts_22oct`) explains £706 → £600; the remaining **£90 (0.85x) is unexplained** (channel section). |
| **P11** Booking.com 20–22 Nov (nights 20, 21) | £430.11 | **£215** | £484 (**0.889x**); today £461 (Reyhan's −5% from 15:05Z) | £516 (0.83x) | £424 / **£543** / £687 | £444 | 50.4/52.6 vs 48.2/51.4 (+2.2, +1.2) | **0.79x P50, 1.01x P25, 0.97x booked median.** Enter Shikari, Ally Pally 20–21 Nov (verified). PL had priced it (241/243 vs fortnight 222 on 2 Nov). Paid sits at the booked median, so it is a market-rate sale for what actually books, but a quarter below the asking median. If booked after 15:05Z the ratio is 0.933x of £461 (booking time NOT CHECKED). Commission £104.24 = 24.2% of room (booster 18% expected; channel section). |

### 2b. P13 Shepherd's Bush (Wembley / Twickenham map)
**Thu 12 Nov, England v Croatia, Wembley, 19:45, sold out** ([wembleystadium.com/events/2026/England-v-Croatia](https://www.wembleystadium.com/events/2026/England-v-Croatia), [englandfootball.com match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre); checked 3 Nov). Attendance not stated.
- 3064856 **£151** (2 Nov £159) vs fortnight **£169**, PL default £169, P25 £176, **P50 £214**, booked median £216. Market occ 40.2 vs 50.6% STLY (**−10.4**): the week is soft, but ours is £25 under the cheapest quarter.
- Twin 3090701 is **£183** that night (gap £32). 10–11 Nov: £151/£150 vs P25 £166/£167.
- **Min 2 on 12 Nov with 13 Nov booked**: only sellable as 11–12 Nov.
- **Proposal (unchanged in substance): 3064856 12 Nov to at least £176 (P25; +£25) and min 1**; keeps it under the twin. Reyhan's 15:05Z −5% reverses the partial fix of 2 Nov: Corentin to confirm which stands.

**Christmas (open 7–26 Dec).** Market occupancy is ahead of STLY on every night (+4.7 to +24.1 pts).
| Nights | Ours (2 Nov) | PL default | P50 | P75 | Proposal |
|---|---|---|---|---|---|
| 7–13 Dec | £1,550 (1,596) | £1,652 | £1,654 | £2,059 | To default / P50 (**+£102**) |
| 14–23 Dec | £2,267 (2,315) | £2,386 | **£2,471** | £3,161 | To P50 (**+£204**) |
| 24–26 Dec (min 3) | £689 (689) | £714 | **£838** | £1,018 | To P50 (**+£149**) |
| **Total 7–26 Dec** | **£4,506** (4,600) | £4,752 | £4,963 | £6,238 | **+£455** (2 Nov: +£371) |
- Reyhan's −2% → −5% (15:05Z) widened the gap by £94.
- **Both twins are again identical on all 20 nights (£4,506 each, `raw/prices_3090701.json`).** Policy `twin_listings`: keep a small gap.

### 2c. P05 St John's Wood, December (4 BR; Regent's Park map; no verified event in window)
| Nights | Ours | PL default | P50 / P75 / P90 | Mkt occ vs STLY | Proposal |
|---|---|---|---|---|---|
| 29 Nov–2 Dec (4 n) | £2,157 | £2,346 | £1,793 / £2,366 | +2.6, −3.1, −1.5, −6.2 | **Hold** |
| 7–8 Dec | £970 (487/483) | £1,280 | £898 / **£1,184** | **+11.2 / +6.0** | **Above: to about P75, +£214** (a-p05-dec not fixed) |
| 13–21 Dec (9 n) | £5,453 | **£5,945** | £4,435 / **£5,857** | −0.4 to +8.5 (7 of 9 up) | **Above: to P75–default, +£404–492** |
| 29 Dec (1-n orphan, min 1) | **£1,354** | £1,121 | £643 / £813 / **£1,080** | −1.2 | **Below current: to £1,080–1,121 (−£233 to −£274)**; 1.25x P90 (a-peak-check P05 not fixed) |
- 9–12 and 22–28 Dec, 30 Dec–2 Jan booked (Smoobu). No P05 edits since 2 Nov.

### 2d. P04 Barking, 14–19 Dec (O2 / ExCeL map; Reyhan's −10% 6–22 Dec unchanged, no P04 log entries)
| Nights | Ours | PL default | P50 / **P75** | Mkt occ vs STLY | Events |
|---|---|---|---|---|---|
| 14–19 Dec (6 n, min 3) | **£1,157** (183/186/189/192/200/207) | £1,362 | £964 / **£1,295** | **+2.2 to +5.5 every night** | London International Horse Show, ExCeL, **Thu 17–Mon 21 Dec** ([londonhorseshow.com](https://londonhorseshow.com/), [excel.london](https://www.excel.london/whats-on/london-international-horse-show); both 17–21 Dec, checked 3 Nov — yesterday's 22 Dec conflict not repeated); Kasabian + The Vaccines, O2, **Fri 18 Dec** ([theo2.co.uk/events/venue/the-o2-arena](https://www.theo2.co.uk/events/venue/the-o2-arena/36), listing only) |
- **Proposal: above current, below default: to about P75 (+£138)**; 17–19 Dec to £217/£218/£218. 20–21 Dec now booked.
- 8 Dec Kehlani ([theo2.co.uk/events/detail/kehlani-2026](https://www.theo2.co.uk/events/detail/kehlani-2026), Tue 8 Dec): £182 vs fortnight £193, P75 £199; market −1.2 vs STLY. To at least £193 (+£11).

### 2e. P20 Canary Wharf, NYE (not in VENUES map; central-London event)
| Nights | Ours | PL default | P75 / **P90** | Mkt occ vs STLY | Read |
|---|---|---|---|---|---|
| 19–27 Dec | £2,675 | £2,993 | **£2,848** / £3,549 | −4.2 to +5.7 | Under P75. **Hold.** |
| 28 Dec–2 Jan (min 5–6) | **£2,751** (461/462/470/**470**/436/452) | £3,068 | £2,090 / **£2,974** | **+4.2 to +12.9** | £223 under P90. **Hold.** |
- **NYE 31 Dec is priced by PriceLabs: £470 vs fortnight £284** (NYE week excluded). Event: [london.gov.uk/events/london-new-years-eve-2026](https://www.london.gov.uk/events/london-new-years-eve-2026), checked 3 Nov: Thu 31 Dec 20:00–00:30, Ticketmaster only, £20–55, second batch not yet dated. Attendance not stated.
- Base 330 vs Corentin's 350 still unresolved (conflict, not a new proposal).

## 3. Demand calendar, next 90 days (our £ vs fortnight £, `prices.csv` 3 Nov)
**Verified 3 Nov (domain-restricted WebSearch of official pages):**
- Wembley: England v Croatia, Thu 12 Nov, sold out (links above).
- Twickenham ([allianzstadiumtwickenham.com/nations-championship](https://allianzstadiumtwickenham.com/nations-championship)): England v Japan Sat 14 Nov; England v New Zealand Sat 21 Nov; Nations Championship Finals Fri 27–Sun 29 Nov ([finals page](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)).
- O2: Noah Kahan 13/14/17 Nov ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026); stale listings also show 20 Nov); **Muse Sun 15 / Mon 16 Nov** ([page](https://www.theo2.co.uk/events/detail/muse-2026); yesterday's 13–17 conflict resolved to 15–16); The Script Sat 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026); one listing says 28 Nov); Don Toliver Mon 23 Nov ([page](https://www.theo2.co.uk/events/detail/don-toliver-2026)); Mariah Carey Mon 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026); other listings 1–2 / 5–6 Dec); Kehlani Tue 8 Dec; Kasabian Fri 18 Dec.
- ExCeL: #RISK Europe 10–11 Nov ([page](https://www.excel.london/visitor/whats-on/risk-europe-2026)); Business Show, Going Global Live, Retail Supply Chain expos 11–12 Nov ([Going Global](https://www.excel.london/m/visitor/whats-on/going-global-live-2026), [Retail SC](https://www.excel.london/whats-on/retail-supply-chain-logistics-expo-2026)); London EV Show 18–19, Vet Show 19–20, HOMES UK 24–25 Nov (calendar listing only); London Build 25–26 Nov ([page](https://www.excel.london/whats-on/london-build-expo); 450+ vs 650 exhibitors, visitor figure not re-read); Horse Show 17–21 Dec.
- Ally Pally: Enter Shikari 20–21 Nov ([page](https://www.alexandrapalace.com/whats-on/enter-shikari/)); Nia Archives 26 Nov, Blossoms 27 Nov, Gorgon City 28 Nov (event pages; site listings conflict by a day). World Darts 11 Dec–3 Jan ([Ally Pally](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)): R1 from 11 Dec, R2 from 20 Dec, R3 27–29 Dec, R4 30 Dec, QF 1 Jan, SF 2 Jan, final 3 Jan 20:00; "record 180,000 tickets" (venue figure).
- NYE 31 Dec (above).
- **UNVERIFIED / dropped:** Phoebe Bridgers, The Darkness, Culture Club, Amr Diab (not used).

| Nights | Event | Venue | Open properties | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 10–11 Nov | #RISK + expos | ExCeL | P04 (P20, P01 now booked) | normal | P04 **169 / 170** vs 175 | no |
| 12 Nov | England v Croatia (sold out) | Wembley | P13 3064856 | soft week (−10.4) | **151** vs 169 (twin 183) | no |
| 13–17 Nov | Kahan 13/14/17, Muse 15/16 | O2 | P20; P04 13 Nov | normal/soft (P20 +3.9, −6.0, −11.0, −3.4, +1.7; P50 flat £210–217) | P20 **241/244/239/245/248** vs 261; P04 **179** vs 180 | partly: PL default rose to £291–299 (2 Nov: £260–269), still under the £318–335 of 18–24 Nov |
| 14 Nov | England v Japan | Twickenham | P13 | – | booked | – |
| 18–19 Nov | EV / Vet shows | ExCeL | P04, P20 | normal | P04 185/185 vs 185 (tie); P20 295/293 vs 263 | P20 yes; P04 no |
| 20–21 Nov | Enter Shikari / The Script / Eng v NZ | Ally Pally / O2 / Twickenham | P04, P20 (P11, P13 booked) | P11 +2.2/+1.2 | P04 195/197 vs 188; P20 294/300 vs 273 | yes |
| 23 Nov | Don Toliver | O2 | P04, P20 | – | P04 **185** vs 192; P20 **273** vs 284 | no |
| 24 Nov | HOMES UK | ExCeL | P04, P20 | – | P04 **186** vs 191; P20 **276** vs 288 | no |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City | Ally Pally | P11 | −1.8, −3.4, −1.0 | **208** / 253 / 269 vs 219 | 26 no; 27–28 yes (but under P50 £264/277/265) |
| 27 Nov | Nations Finals | Twickenham | P13 | – | 336 vs 254 | yes |
| 30 Nov | Mariah Carey | O2 | P04, P20 booked | – | – | – |
| 8 Dec | Kehlani | O2 | P04, P20 | P04 −1.2 | P04 **182** vs 193; P20 **255** vs 264 | no |
| 11–12 Dec | Darts opening | Ally Pally | P11 | +10.5 / +7.5 | 319 / 323 vs 257 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft (−0.5 to −7.3)** | **228/202/207/217/237** vs 282 | no (override conflict) |
| 16–19 Dec | Horse Show 17–21 / Kasabian 18 | ExCeL / O2 | P04, P20 | P04 +3.6 to +5.5 | P04 **189**/192/200/207 vs 190 (clean wk); P20 **249 / 252**/263/276 vs 255 | P04 thin; P20 16–17 no |
| 18 Dec | Darts | Ally Pally | P11 | −3.6 | 285 vs 248 | yes |
| 23 Dec | Darts R2 | Ally Pally | P11 | – | **314** vs 316 | no |
| 31 Dec | NYE | central | P20 (others booked) | +10.6 | 470 vs 284 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | – | **185** vs 201 (clean wk) | no |

## 4. Missed compression: open, verified-event nights at or below the fortnight
| Ref | Night(s) | Event | Our £ today (2 Nov) | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 13, 14 Nov | Noah Kahan | 241, 244 (231, 230) | 261 | 20, 17 |
| P20 | 24 Nov | HOMES UK | 276 (275) | 288 | 12 |
| P20 | 16 Dec | Horse Show eve | 249 (250) | 255 | 6 |
| P11 | 26 Nov | Nia Archives | 208 (219) | 219 | 11 |
| P11 | 23 Dec | Darts | 314 (313) | 316 | 2 |
| P11 | 3 Jan | Darts final | 185 (185) | 201 | 16 |
| P04 | 10, 11 Nov | ExCeL expos | 169, 170 (169, 173) | 175 | 6, 5 |
| P04 | 13 Nov | Noah Kahan | 179 (179) | 180 | 1 |
| P04 | 8 Dec | Kehlani | 182 (183) | 193 | 11 |
| | | **Like-for-like vs 2 Nov (11 n / £126)** | | **11 nights** | **£107** |
| P20 | 15 Nov | Muse (now verified 15/16) | 239 (225) | 261 | 22 |
| P04 | 24 Nov | HOMES UK | 186 (186) | 191 | 5 |
| P20 | 17 Dec | Horse Show day 1 | 252 (252) | 255 | 3 |
| **P13** | **12 Nov** | **England v Croatia** | **151 (159)** | **169** | **18** (2 Nov: 13) |
| P11 | 13–17 Dec | Darts (conflict) | 228/202/207/217/237 (240/213/218/229/250) | 282 | 54, 80, 75, 65, 45 = **£319** (2 Nov: £300) |
| P20 | 16, 17 Nov | Kahan / Muse | 245, 248 (223, 228) | 261 | 16, 13 |
| P04 | 19 Nov | EV / Vet (tie) | 185 (186) | 185 | 0 |
| P20 | 8 Dec | Kehlani | 255 (256) | 264 | 9 |
| | | **2 Nov's full 24-night set today** | | **24 nights** | **£512** (2 Nov: £550) |
| P04 | 18 Nov | EV Show (tie) | 185 | 185 | 0 |
| P04, P20 | 23 Nov | Don Toliver (newly verified) | 185; 273 | 192; 284 | 7; 10 |
| P04 | 16 Dec | Horse Show eve | 189 | 190 | 1 |
| | | **Full total today** | | **28 nights** | **£530** (excl. P11 darts conflict: 23 nights / £211) |

- **Like-for-like fell £19 (£126 → £107):** P20's Kahan nights rose £10–14 because the PL default itself rose (unc 296/299 vs ~265) and Reyhan's −2% replaced −5% on 16–19 Nov; P11 26 Nov got worse (−5% re-added: gap £0 → £11 on a lower fortnight).
- **P13 12 Nov widened £13 → £18** and **P11 darts £300 → £319**, both from Reyhan's 15:05Z −5% edits.
- The P20 13–17 Nov gap rests on the fortnight rule only: market P50 is flat (£210–217) and occupancy vs STLY is mixed (−11.0 to +3.9). Weakest evidence in the table.

## 5. Dates to price above / below the PriceLabs default, per submarket
- **Shepherd's Bush P13 (above current; at or above default):** 12 Nov to ≥ £176, min 1 (+£25; above default £169). 7–13 Dec to default/P50 (+£102); 14–23 Dec to P50 (+£204, above default £2,386); 24–26 Dec to P50 (+£149, above default £714). Twins slightly different. **Total +£480.** Conflicts with Reyhan's 15:05Z −5% on 8–12 Nov and 7–20 Dec: Corentin to confirm.
- **St John's Wood P05:** *above current, below default* 7–8 Dec to ~P75 (+£214); 13–21 Dec to P75–default (+£404–492). *Below current and below default* 29 Dec to £1,080–1,121 (−£233 to −£274). Hold 29 Nov–2 Dec.
- **Barking P04 (above current, below default):** 14–19 Dec to ~P75 (+£138); 8 Dec ≥ £193 (+£11); 23–24 Nov to £192/£191 (+£12); 10–11 Nov to £175 (+£11). Inside Reyhan's −10% (conflicts with Corentin's −8% for Nov): Corentin to confirm. Hold 6–7 / 9–13 Dec.
- **Camden P11 (above current, below default):** 26 Nov ≥ £219 (+£11; default £233); 23 Dec ≥ £316 (+£2); 3 Jan ≥ £201 (+£16). Darts 13–17 Dec: Corentin's +5% on the default ≈ £1,229 (+£138 vs £1,091) — conflict, not a new proposal.
- **Canary Wharf P20 (below default; hold most):** 13–17 Nov to the fortnight (+£88) only if Corentin reads Kahan/Muse as compression (market does not show it); 23–24 Nov +£22; 8 Dec +£9; 16–17 Dec +£9. Hold 19 Dec–2 Jan (under P75/P90; NYE priced). Base 330 vs 350 and 16–19 Nov min 2 vs min 3: conflicts to confirm.
- **Mile End P12:** 26 Nov £352 (+25%, min 1) is **above default £303 and P90 £336** for a 1-night orphan with no verified event: below current, to default £303 (−£49) unless Reyhan has a reason. Rest of 16 Nov–13 Dec at −10% sits £4,733 vs P50 £3,989 / P75 £4,943 over 19 open nights: hold.
- **Marylebone P06:** blocked on purpose; nothing proposed.

Data gaps:
1. All market figures are PriceLabs Nearby Listings (Airbnb-derived, host-fee, `cleaning_fee` null, not comp sets, horizon unstated; daily bands are bedroom ranges). P01, P09, P06 carried from 2 Nov; P08/P14 from 27 Oct; P10, P15–P19, P02/P03/P07 not pulled.
2. Booking.com paid (P11) and Airbnb room (P20) are compared with Airbnb host-fee market prices; VAT/markup not aligned.
3. Events are domain-restricted WebSearch summaries of official pages, not page reads (all six venue domains return curl 000 from this session). Residual conflicts: The Script 21 vs 28 Nov; Mariah Carey 30 Nov vs 1–2 / 5–6 Dec; Ally Pally late-Nov shows ±1 day; Kahan stale 20 Nov listing. Ticket status known only for England v Croatia (sold out). Attendance stated only for darts (180,000 tickets).
4. P11 booking time on 2 Nov NOT CHECKED (before/after Reyhan's 15:05Z −5%), so its PL-at-booking ratio is 0.889x or 0.933x.
5. P20 10–13 Nov: £90 beyond Airbnb's 15% last-minute is unexplained here (Smoobu Airbnb rules for P20 NOT CHECKED; channel section).
6. P12 4 Nov Smoobu £170 vs PL £196 (push not yet landed at snapshot time).
7. P04 overrides not re-read today (no P04 log entries since 2 Nov, so the 2 Nov reading of −10% 6–22 Dec is assumed to stand).
