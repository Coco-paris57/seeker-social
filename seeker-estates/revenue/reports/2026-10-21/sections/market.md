# Market & demand calendar — run D = 2026-10-21 (window 21 Oct 2026 – 18 Jan 2027)

## Sources and method
- **Market occupancy:** `data/snapshots/2026-10-21/pl_kpis.csv`, `market_occupancy_next_30` / `_next_60`.
- **Market P50/P75:** PriceLabs `get_neighbourhood_data` → `summary_table.table_data[<our BR>]`, pulled 2026-10-21. Rows are in `data/snapshots/2026-10-21/market.csv`.
  - Another agent had already written identical rows to that file at 06:09–06:12Z. My pulls matched every value, so I did not add duplicate rows.
  - These are Nearby-Listings percentiles, not comps. The horizon they cover is not stated.
- **Our prices:**
  - `data/snapshots/2026-10-21/prices.csv`, column `pricelabs_price`, covering 22 Oct – 20 Dec. Raw files have `last_refreshed_at` of 20 Oct 06:36–11:30Z for most listings.
  - Live `get_listing_prices` (field `price`), pulled 2026-10-21, for 20 Dec – 9 Jan: P01, P04 (channex), P08, P09, P10, P11, P12, P13, P20.
  - Live `get_listing_prices` for the new P04 Smoobu listing 3562176, 3–26 Nov.
- **Overrides / changes:**
  - `get_listing_date_overrides`, read 2026-10-21, for P01, P04 (channex 7dc96cda… and smoobu 3562176), P08, P09, P11, P20.
  - `get_user_logs` (listing, group and account) for 19–21 Oct.
- **Fortnight:** the 7 nights before plus the 7 after, leaving out the event's own nights and Blocked nights; nights above 2× the median are dropped. Booked nights count at list price.
  - I re-ran yesterday's event set through a script on the 20 Oct snapshot. It gives **42 nights / £860**; yesterday's file reported 44 / £852. The small difference comes from window edges and how overlapping events are handled.
  - All day-on-day comparisons below use the script on both days, so they are like-for-like.
- **Events:** yesterday's verified list (`reports/2026-10-20/sections/market.md`, checked 2026-10-20) is reused. New or changed items were re-checked today through WebSearch restricted to the primary domain (2026-10-21).
- **Policy:**
  - P02, P03, P06 and P07 are intentional blocks and are excluded.
  - P14 is reported only.
  - P13 blocked nights may be bookings on the linked listing 3090701.
  - Booking.com +20% markup and stay discounts are not market questions.

## 1. Submarket table (2026-10-21)

| Submarket | Ref | Area | BR | Mkt occ 30/60 | P50 / P75 £ (n) | Our occ 30/60 (PL) | Avg open £ next 30 (open nights) |
|---|---|---|---|---|---|---|---|
| East | P01 | Canary Wharf | 2 | 33% / 25% | 270 / 335 (144) | 100% / 100%* | — (none open) |
| | P20 | Canary Wharf (Waterford Ct) | 2 | 34% / 26% | 260 / 321 (149) | **17% / 8%** | 270 (27) |
| | P04 | Barking (channex; new smoobu 3562176 shows 30%/32%) | 2 | 27% / 21% | 165 / 219 (60) | 50% / 42% | 172 (15) |
| | P09 | Greenwich | 1 | 38% / 30% | 141 / 169 (126) | 63% / 82%* | 158 (11) |
| | P12 | Mile End | 2 | 39% / 33% | 211 / 250 (119) | 57% / 53% | 236 (12) |
| | P07 | Woolwich | 1 | 25% / 19% | not pulled | intentional block | — |
| | P15 | Bow | — | no PriceLabs listing | — | — | — |
| Central | P08 | Islington | 2 | 48% / 43% | 224 / 275 (145) | 57% / 78%* | 200 (13) |
| | P11 | Camden | 2 | 45% / 38% | 301 / 351 (171) | 60% / 67% | 233 (11) |
| | P05 | St John's Wood | 4 (policy) | 37% / 35% | 591 / 713 (90) | 70% / 65% | 483 (9) |
| | P14 | Primrose Hill (report only) | 1 | 41% / 37% | 202 / 249 (173) | 0% / 0% | 502 (30) |
| | P06 / P03 | Marylebone / Bayswater | 2 / 3 | 42/40% · 47/43% | P06 415 / 542 (other agent's row) | intentional blocks | — |
| | P16 / P17 | Little Venice / SJW | — | no PriceLabs listing | — | — | — |
| West | P13 | Shepherd's Bush | 2 | 41% / 35% | 240 / 301 (117) | 53% / 40% | 202 (16) |
| | P10 | Hanger Lane | 1 | 31% / 24% | 130 / 158 (121) | 100% / 100%* | — (none open) |
| | P02 | Ladbroke Grove | 1 | 45% / 39% | — | intentional block | — |
| | P18 / P19 | Fulham / Kings Langley | — | no PriceLabs listing | — | — | — |

\* These figures are inflated by the new Smoobu blocks (§4); PriceLabs `occupancy_next_*` counts them. Yesterday's figures were P01 100/70, P08 38/19, P09 59/42 and P10 100/49. **Do not read the rise as pickup.**

Market moves since 20 Oct:
- P50 changes: P01 269→270, P04 161→165, P09 137→141, P12 207→211, P08 221→224, P11 298→301, P13 228→240, P10 129→130, P14 196→202, P05 590→591; P20 unchanged at 260.
- Market occupancy, 30-day: P05 33→37%. P11 46→45, P12 40→39, P08 49→48 and P03 48→47 each slipped 1 point. P20's 60-day figure fell 27→26%.

PriceLabs neighbourhood signals inside the window (`fp_insights` / `occ_insights`, 2026-10-21):
- **Christmas–NYE surge everywhere.**
  - Prices: Camden +30.8% (26–31 Dec); Greenwich +28.0%; Canary Wharf +26.8% / +22.5%; St John's Wood +25.9%; Shepherd's Bush +25.3%; Primrose Hill +23.7%; Islington +20.5%; Mile End +19.6%; Hanger Lane +13.8%; Barking +8.4% (25–31 Dec).
  - Occupancy: Camden +20.1%, St John's Wood +19.7%, Primrose Hill +17.2%, Islington +16.8%, Mile End +15.3%.
- **Early December:**
  - Camden occupancy +13.0% on 5–7 Dec.
  - Shepherd's Bush +11.4% on 1–6 Dec and +11.0% on 28 Oct.
  - Barking +8.5% on 3–5 Dec.
  - Greenwich +6.9% on 7 Dec.
  - Mile End +6.6% on 6 Dec.
- No feed shows an ExCeL, O2, darts or Twickenham spike.

## 2. Demand calendar, 21 Oct 2026 – 18 Jan 2027

"Priced?" = **our £ / fortnight £**, from today's prices. BLK = blocked in Smoobu (§4); B = booked.

### East (O2 → P01, P09, P04; ExCeL → P01, P04; P20 mapped as Canary Wharf; P07 blocked; P15 not in PriceLabs)
| Nights | Event | Primary source (checked) | Effect | Priced? (today) |
|---|---|---|---|---|
| 2–4 Nov | WTM London, ExCeL 3–5 Nov | wtm.com/london/en-gb.html (20 Oct) | compression | P20 307/299/300 vs 267 **yes**; P01 and P04 B |
| 3, 5 Nov | Stevie Wonder, O2 | theo2.co.uk/events/detail/stevie-wonder (20 Oct; a stray 4 Nov listing also exists) | compression | P20 3 Nov 299 vs 273 yes; **5 Nov 268 vs 277 no**. P01 and P09 B |
| 10–11 Nov | Business Show, ExCeL 11–12 Nov | excel.london/whats-on/the-business-show-london-2026 (20 Oct) | compression | **No**: P20 251/260 vs 267; P04 140/146 vs 153. P01 B |
| 13–14, 17 Nov | Noah Kahan, O2 | theo2.co.uk/events/detail/noah-kahan-2026 (20 Oct) | compression | P20 271/287 vs 267 yes; **17 Nov 243 vs 277 no**. **P04 17 Nov 142 vs 158 no**. P09 B |
| 15–16 Nov | Muse, O2 | theo2.co.uk/events/detail/muse-2026 (20 Oct) | compression | **No**: P20 236/239 vs 277; P04 149/139 vs 156. P01 and P09 B |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on/london-vet-show-2026 (20 Oct) | compression | **No**: P20 258/268 vs 285 (19 Nov fell from 293 yesterday); P04 142/144 vs 162. P01 B |
| 24–25 Nov | London Build Expo + elementalLONDON, ExCeL 25–26 Nov | londonbuildexpo.com/plan-your-visit (20 Oct) | compression | P20 308/315 vs 310 (24 Nov −2). P04 B |
| 1–2 Dec | Phoebe Bridgers, O2 | theo2.co.uk/events/detail/phoebe-bridgers (20 Oct) | compression | **No**: P20 303/322 vs 343. **P01 and P09 now BLK** (moot). P04: 1 Dec B; 2 Dec is the +200% gap night |
| 16–20 Dec | London International Horse Show, ExCeL 17–21 Dec | londonhorseshow.com; excel.london (20 Oct) | compression | **P20 16 Dec 284 vs 325 no**; 18–20 Dec 344/366/372 yes. P01 16–17 Dec **BLK**, 18–20 Dec B. P04 open 16–19 Dec 191/188/199/216 vs ~196 (17 Dec −8); 20 Dec B |
| 17 Dec | Greg Davies, O2 | theo2.co.uk/events/detail/greg-davies; gregdavies.co.uk (20 Oct) | compression | P20 329 vs 332 (−3); **P04 188 vs 196 no**. P09 BLK, P01 BLK |
| 18 Dec | Kasabian, O2 | theo2.co.uk/events/detail/kasabian-2026 (20 Oct) | compression | P20 and P04 above fortnight; P09 BLK; P01 B |
| 28 Dec – 2 Jan | Christmas–NYE surge (PriceLabs); NYE fireworks 31 Dec | london.gov.uk/events/london-new-years-eve-2026 (20 Oct) | compression | **P20 31 Dec 627 vs 366 yes** (fortnight = 21–27 Dec + 3–9 Jan). P01, P09, P12 BLK; P04 B 20 Dec – 1 Jan |

### Central (Alexandra Palace → P08, P11; Emirates → P08; Hyde Park → blocked units / no PriceLabs listing)
| Nights | Event | Source | Effect | Priced? |
|---|---|---|---|---|
| 24 Nov | Arsenal v Dortmund, UCL, Emirates | help.arsenal.com article 101000593887 (20 Oct) | compression | **P08 BLK** (moot; was 174 vs 199) |
| 9 Dec | Arsenal v Real Madrid, UCL, Emirates | same | compression | **P08 BLK** (moot; was 195 vs 212) |
| 11 Dec – 2 Jan | World Darts Championship, Alexandra Palace; venue/PDC state "a record 180,000 fans" | alexandrapalace.com/whats-on/world-darts-championship-2026-2027/ (20 Oct) | compression | **P11 13–17 Dec 306/285/284/295/310 vs 330 no**; 12 and 18 Dec above; 19–22 and 26 Dec – 2 Jan B; 23–25 Dec open 346/339/339, above 330. **P08 BLK from 14 Nov** (to at least 9 Jan in live data) |
| 19 Nov – 3 Jan | Hyde Park Winter Wonderland | hydeparkwinterwonderland.com (20 Oct) | — | only intentional blocks or units without a PriceLabs listing |
| 9–16 Jan | Masters snooker, Ally Pally 10–17 Jan (no attendance stated) | alexandrapalace.com/whats-on/johnstones-paint-masters-snooker-2027/ (20 Oct) | normal | P11 open 3–9 Jan at 198–214; P08 BLK. Not assessed |
| 7–8 Nov | Ally Pally fireworks | venue shows conflicting dates | — | UNVERIFIED, not used |

### West (Twickenham → P10, P13; Wembley → P10, P13; P02 blocked; P16/P18 not in PriceLabs)
| Nights | Event | Source | Effect | Priced? |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Twickenham, Sun 8 Nov | englandrugby.com; help.englandrugby.com 103000350147 (20 Oct) | compression | P13 8 Nov 217 vs 205 yes (+10% override set 20 Oct); 7 Nov blocked; P10 B |
| 12 Nov | England v Croatia (Nations League), Wembley | englandfootball.com match centre; wembleystadium.com (20 Oct) | compression | P13 217 vs 209 yes (was level yesterday); P10 B |
| 13–14 Nov | England v Japan, Twickenham | help.englandrugby.com 103000389067 (20 Oct) | compression | P13 blocked (linked?); P10 B |
| 20–21 Nov | England v New Zealand, Twickenham | help.englandrugby.com 103000389096 (20 Oct) | compression | P13 above fortnight; **P10 BLK** (moot) |
| 26–29 Nov | Nations Championship Finals, Twickenham | help.englandrugby.com 103000349981 / 392931 / 392936 (20 Oct) | compression | **P13 26 Nov 228 vs 239 no**; 27 Nov above; 28–29 Nov B. P10 BLK |
| 5 Dec | **Correction:** England **Women** v Ukraine, Women's World Cup qualifying play-off 2nd leg, Wembley, Sat 17:30, tickets £15–£59; no attendance stated | englandfootball.com match centre (2026-27 World Cup Qualifiers) + englandfootball.com/articles/2026/Oct/14/…; wembleystadium.com/events/2026/England-Women-v-Ukraine (checked 2026-10-21) | compression (size unstated) | P10 BLK; P13 B |
| 28 Dec | **New:** Harlequins Big Game 18, Allianz Stadium Twickenham (Quins Women 14:00, Quins Men v Northampton 17:00); no attendance stated | twickenhamstadium.com/big-game-15 (listing page); quins.co.uk/harlequins-big-games (checked 2026-10-21) | compression (inside NYE surge) | P13 383 vs 237 yes (fortnight 21–27 Dec + 3–9 Jan). P10 BLK |

### Citywide
| Dates | Item | Source | Effect |
|---|---|---|---|
| 26–30 Oct | School half term (Tower Hamlets, Camden, Islington, H&F, Westminster) | council term-date pages (20 Oct) | normal (family) |
| 21 Dec – 1 Jan | Christmas school holiday | same | compression late Dec |

Out of window: MegaCon Live, ExCeL 23–24 Jan, and Festival of Genomics, ExCeL 27–28 Jan (excel.london/whats-on, checked 2026-10-21); Bett 20–22 Jan.

## 3. Missed compression — open event nights at or below the fortnight (today's prices)

| Submarket | Ref | Nights | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|---|
| East | P20 | 5, 10, 11, 15, 16, 17, 18, 19, 24 Nov; 1, 2, 16, 17 Dec | Stevie, Business, Muse, Kahan, Vet, Build, Phoebe, Horse Show, Greg | 268, 251, 260, 236, 239, 243, 258, 268, 308, 303, 322, 284, 329 | 277, 267, 267, 277, 277, 277, 285, 285, 310, 343, 343, 325, 332 | 9, 16, 7, 41, 38, 34, 27, 17, 2, 40, 21, 41, 3 = **296** |
| East | P04 (channex) | 10, 11, 15, 16, 17, 18, 19 Nov; 17 Dec | Business, Muse, Kahan, Vet, Greg | 140, 146, 149, 139, 142, 142, 144, 188 | 153, 153, 156, 156, 158, 162, 162, 196 | 13, 7, 7, 17, 16, 20, 18, 8 = **106** |
| Central | P11 | 13, 14, 15, 16, 17 Dec | Darts | 306, 285, 284, 295, 310 | 330 | 24, 45, 46, 35, 20 = **170** |
| West | P13 | 26 Nov | Finals (eve) | 228 | 239 | **11** |

**Total: 27 open nights, £583 below the fortnight** (East 21 nights / £402; Central 5 / £170; West 1 / £11).

Against the like-for-like 20 Oct figure (42 / £860):
- **Not pricing gains.** 26 verified event nights moved from open to Smoobu blocks (§4), and 16 of them were missed nights worth £277: P08 7 nights / £153, P01 3 / £75, P09 3 / £36, P10 2 / £13.
- **Remaining nights net to zero.** P20 £301→£296 (19 Nov newly below: 293→268); P04 £104→£106; P11 £174→£170; P13 £4→£11 (12 Nov is now above, while 26 Nov's fortnight rose).

P04's live Smoobu listing 3562176 is £2–3 lower again on the same nights (10 Nov 137, 11 Nov 143, 16 Nov 137, 18 Nov 139, 19 Nov 142; `get_listing_prices.price`), because of the new −5% override.

## 4. Status of yesterday's suggestions (overrides read 2026-10-21)

**None applied.** No override on P01, P08, P09, P11 or P20 has `updated_at` later than 2026-10-18. The 20 Oct logs show only the P05 base change, the P13 +10% / +50% changes and the P04 Smoobu mapping.

| Suggestion | Override now | Status |
|---|---|---|
| Remove −5% on P08 event nights | −5% on 22 Nov – 22 Dec (updated 11 Oct); −2% on 26 Oct – 21 Nov (16 Oct) | Not applied. **Moot:** P08 is blocked in Smoobu from 14 Nov |
| Remove −3% on P04 | channex: −3% on 7–24 Nov and 6–22 Dec (16–17 Oct). **New Smoobu listing 3562176 (mapped and sync ON 20 Oct, reyhan@): parent overrides copied, then −5% on 1–24 Nov added at 11:29Z** | **Not applied; moved the other way.** It deepens the discount on the Business / Kahan / Muse / Vet nights |
| Remove −2% on P09 | −2% on 29 Nov – 22 Dec (11 Oct) | Not applied. **Moot:** P09 blocked from 27 Nov |
| Remove −2% on P20 | −2% on 1–30 Nov (17 Oct); −4% on 21–31 Oct | Not applied. **Live:** P20 is open on all 13 gap nights |
| Camden darts +20% | P11 +10% on 12–18 Dec (18 Oct) | Not applied (still +10%). **Live:** 13–17 Dec are £20–46 under the fortnight |
| Canary Wharf 1–2 Dec +10%, 16 Dec +20% | P01: 1–2 Dec min-stay only; 16–17 Dec +10% (18 Oct). P20: no December price override | Not applied. P01 nights are **moot** (blocked). P20 1–2 and 16 Dec are live: £40 / £21 / £41 under |
| Greenwich 1, 2, 17 Dec +5% | P09 −2% (11 Oct) | Not applied. **Moot** (P09 blocked) |

**Smoobu blocks.** The dispatcher, citing the Smoobu API, says these were created 19 Oct; PriceLabs first showed them in its 20 Oct refresh, which is why yesterday's file missed them.
- P08: from 14 Nov.
- P10: from 19 Nov.
- P09: 27 Nov 2026 – 23 Apr 2027. PriceLabs also shows one new Blocked night on 25 Oct.
- P01: 30 Nov – 18 Dec, and from 21 Dec.

None of these is a policy intentional block. reservations.csv has no stays behind them. **Event-night suggestions on these dates are moot unless Corentin reopens them.** PriceLabs counts the blocks as occupied (see the * in §1), and P08's recommendations rose by an average of £35 a night.

## 5. What changed since 20 Oct
- **Human actions on 20 Oct** (`get_user_logs`, 35 entries, all by reyhan@). Yesterday's file said there were none because it was written before these.
  - P05 base 500→550 (policy).
  - P13 +10% on 31 Oct – 3 Nov, 8–12 Nov and 17–18 Nov (policy), plus **+50% on 1 Dec, min-stay 1**, on 3064856, 3090701 and Vrbo. P13 1 Dec changed from unavailable to open at £293.
  - **New Barking Smoobu listing 3562176 mapped to P04 with sync ON**: base 220, min 90, max 2000 and overrides copied from channex, then −5% on 1–24 Nov.
- **Algorithm:**
  - P05: +£43.5 a night on average.
  - P08: +£34.7, on blocked nights.
  - P10: +£14.4, mostly blocked.
  - P20: −£7.8. WTM 3 Nov 327→299, Vet 19 Nov 293→268, Horse Show 19 Dec 404→366, 4 Nov 286→300.
  - P06 −£9.5 (intentional block).
- **Availability:** P01 has 18 nights newly blocked, P08 36, P09 24 and P10 31 (§4).
- **Market:** P50 up £1–12 almost everywhere (P13 +12, P14 +6); occupancy within ±1 point except P05 (+4).
- **Events:**
  - 5 Dec Wembley is now confirmed by two primary sources, but it is the **Women's** World Cup play-off, not a men's match.
  - Added Harlequins Big Game 18 (Twickenham, 28 Dec).
  - Nothing at ExCeL inside the window in January.

Data gaps:
1. Market P50/P75 are Nearby-Listings percentiles with no stated horizon or cleaning basis. P02, P03 and P07 have no fresh percentiles; P06 is another agent's row.
2. Event pages were verified through domain-restricted WebSearch summaries, not loaded directly; direct fetches failed on 20 Oct. No attendance figure is stated for 5 Dec, Big Game or snooker. The only attendance figure is darts (180,000).
3. The reason for the 19 Oct Smoobu blocks on P01, P08, P09 and P10 (owner use, maintenance, long let, error) is unknown, as is P09's extra block on 25 Oct. Ask Corentin.
4. P04 now has two syncing PriceLabs listings (channex 7dc96cda… and smoobu 3562176) with different overrides; 3562176 shows 3–4 Nov open where channex shows them booked. Which one drives the OTA price is unconfirmed, and my gap figures use channex.
5. `price` and `user_price` differ on open nights (P04 3562176 10 Nov: 137 vs 140; P20 21 Dec: 418 vs 413). The OTA-live figure is unconfirmed.
6. Our occupancy in pl_kpis is inflated by the blocks; the real booked occupancy for P01, P08, P09 and P10 is not in the data I read.
7. P15–P19 have no PriceLabs listing, and P20 is not in the VENUES map.
8. Fortnights use list prices on booked nights. East fortnights include other O2 nights, so East gaps are conservative.
