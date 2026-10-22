# Market & demand calendar — run D = 2026-10-22 (window 22 Oct 2026 – 20 Jan 2027)

## Sources and method
- **Policy** (`data/policy.json`, updated 21 Oct) read first. P02/P03/P06/P07 intentional blocks excluded; P14 numbers only; P13 blocked nights may be bookings on twin 3090701. Handbacks applied: nothing is assessed after P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec. Sellable flats assessed: P04, P05, P11, P13, P20, plus P08/P09/P12/P01 up to handback.
- **Market occupancy:** `data/snapshots/2026-10-22/pl_kpis.csv`, columns `market_occupancy_next_30` / `market_occupancy_next_60`.
- **Market P25/P50/P75/P90:** PriceLabs `get_neighbourhood_data` → `summary_table.table_data[<our BR>]` (Nearby Listings, Airbnb-derived, not comps, horizon unstated), pulled 2026-10-22 for P01, P04, P05, P08, P09, P11, P12, P13, P20.
  - Another agent had already written 12 rows to `data/snapshots/2026-10-22/market.csv`. All nine of my pulls match those rows exactly, so **I did not append duplicates** (same practice as 21 Oct).
- **Our prices:** `data/snapshots/2026-10-22/prices.csv` column `pricelabs_price` (= raw `price`; 23 Oct – 21 Dec). For 22 Dec – 27 Jan, live `get_listing_prices` field `price` pulled 2026-10-22 for P11 (3064196), P20 (3547481), P04 (3562176) and P13 (3064856). `last_refreshed_at` 21 Oct 08:52–15:49Z.
  - `prices.csv` `smoobu_price` equals `price` for P04 3562176 (e.g. 10 Nov 160/160), so `price` is the figure Smoobu holds. Raw `user_price` is lower on P04 (10 Nov 137) — see Data gaps.
- **Overrides/logs:** `get_user_logs` (listing) 21–22 Oct; `get_listing_date_overrides` P11 1 Dec – 20 Jan.
- **Fortnight** (unchanged from 21 Oct): 7 nights before + 7 after the event block, excluding the block's own nights and Blocked nights; nights above 2× median dropped; booked nights at list price. Re-run on the 21 Oct snapshot with the same script for day-on-day comparisons.
  - **Clean-week rule (new, stated):** where one side of the fortnight is itself a verified demand period, I compare against the other week only and say so. Applies to: the 16–20 Dec block (after-week 21–27 Dec is the Christmas holiday / PriceLabs surge), 3 Jan (before-week is NYE), 16 Jan (after-week 18–23 Jan carries a P20 uplift for Bett nights). The strict figure is shown too.
- **Events:** re-verified today (2026-10-22) by WebSearch restricted to the venue/organiser domain. Direct page fetches fail (`getaddrinfo ENOTFOUND` for pdc.tv and alexandrapalace.com), so verification is of search-indexed primary pages.

## 1. Submarket table (2026-10-22)

| Submarket | Ref | Area | BR | Mkt occ 30/60 (`pl_kpis`) | P50 / P75 £ (n) | Our occ 30/60 (PL) | Avg open £ next 30 (open nights) |
|---|---|---|---|---|---|---|---|
| East | P01 | Canary Wharf (handback after 20 Dec) | 2 | 32% / 25% | 277 / 333 (143) | 100% / 100%* | — (none open) |
| | P20 | Canary Wharf (Waterford Ct) | 2 | 34% / 27% | 266 / 322 (148) | **13% / 7%** | 267 (28) |
| | P04 | Barking (3562176 only) | 2 | 25% / 20% | 177 / 222 (87) | 30% / 32% | 168 (22) |
| | P09 | Greenwich (handback after 26 Nov) | 1 | 37% / 30% | 142 / 172 (127) | 63% / 82%* | 157 (11) |
| | P12 | Mile End (handback after 13 Dec) | 2 | 40% / 32% | 211 / 255 (120) | 57% / 53% | 241 (11) |
| | P07 | Woolwich | 1 | — | — | intentional block | — |
| | P15 | Bow | — | no PriceLabs listing | — | — | — |
| Central | P08 | Islington (handback after 13 Nov) | 2 | 49% / 44% | 224 / 278 (146) | 57% / 78%* | 193 (13) |
| | P11 | Camden | 2 | 45% / 38% | 306 / 359 (171) | 63% / 68% | 237 (11) |
| | P05 | St John's Wood | 4 (policy) | 38% / 36% | 612 / 718 (89) | 70% / 63% | 479 (9) |
| | P14 | Primrose Hill (report only) | 1 | 41% / 38% | 203 / 249 (173, other agent's row) | 0% / 0% | 503 (30) |
| | P06 / P03 | Marylebone / Bayswater | 2 / 3 | 42/40% · 47/43% | P06 416 / 545 (other agent's row) | intentional blocks | — |
| | P16 / P17 | Little Venice / SJW | — | no PriceLabs listing | — | — | — |
| West | P13 | Shepherd's Bush | 2 | 40% / 35% | 244 / 302 (116) | 53% / 40% | 201 (16) |
| | P10 | Hanger Lane (handback after 18 Nov) | 1 | 30% / 24% | 132 / 160 (122, other agent's row) | 100% / 100%* | — |
| | P02 | Ladbroke Grove | 1 | — | — | intentional block | — |
| | P18 / P19 | Fulham / Kings Langley | — | no PriceLabs listing | — | — | — |

\* Inflated by the 19 Oct Smoobu handback blocks, which PriceLabs counts as occupied.

PriceLabs neighbourhood signals in the window (`fp_insights` / `occ_insights`, 2026-10-22):
- Christmas–NYE price surge: Camden +30.3% (26–31 Dec), Greenwich +26.6%, St John's Wood +26.4%, Shepherd's Bush +24.9%, Canary Wharf +24.4% (P01 set) / +19.3% (P20 set), Islington +21.2%, Mile End +17.3%, Barking +8.3%.
- Occupancy surges: Camden 28 Dec – 1 Jan +21.1% and **5–7 Dec +12.9%**; St John's Wood 28 Dec – 1 Jan +20.0%; Islington +17.2%; Mile End +15.4% and 6 Dec +9.5%; Shepherd's Bush 26 Dec – 1 Jan +11.4% and **2–7 Dec +10.9%**; Barking 27–31 Dec +12.1% and 3–5 Dec +9.0%; Greenwich 5 Dec +7.0%.
- No feed shows a darts, O2, ExCeL or Twickenham spike.

## 2. Demand calendar, 22 Oct 2026 – 20 Jan 2027

"Our £ / fortnight £" from today's prices. B = booked, BLK = blocked, HB = after handback (moot). Properties per `build/properties.py` VENUES; P20 is not in the map and is treated like P01 (Canary Wharf → O2/ExCeL).

### East (O2 → P01, P09, P04, [P07 blocked]; ExCeL → P01, P04, [P07], [P15 no listing]; P20 as Canary Wharf)
| Nights | Event | Primary source (checked 2026-10-22) | Effect | Priced? |
|---|---|---|---|---|
| 23–24 Oct | **New:** MCM London Comic Con, ExCeL 23–25 Oct | mcmcomiccon.com/london/en-us.html; excel.london/whats-on/mcm-comic-con-2026 | compression | All booked (P01, P04, P20) |
| 2–4 Nov | WTM London, ExCeL 3–5 Nov | wtm.com/london/en-gb.html | compression | P20 286/290/280 vs 260 **yes**; P04 187/192/185 vs 160 yes; P01 B |
| 3, 5 Nov | Stevie Wonder, O2 | theo2.co.uk/events/detail/stevie-wonder | compression | P20 290/274 vs 263 yes; P04 192/183 vs 161 yes; P01, P09 B |
| 10–11 Nov | Business Show, ExCeL 11–12 Nov | excel.london/whats-on (listing) | compression | P20 270 / **263 vs 267**; **P04 160/155 vs 166**; P01 B |
| 13–14 Nov | Noah Kahan, O2 | theo2.co.uk/events/detail/noah-kahan-2026 (13, 14, 17 Nov) | compression | P20 274/289 vs 270 yes; P04 168/170 vs 163 yes; P09 162/167 vs 155 yes; P01 B |
| 15–16 Nov | Muse, O2 | theo2.co.uk/events/detail/muse-2026 | compression | **P20 240/242 vs 281; P04 156/152 vs 168**; P01, P09 B |
| 17 Nov | Noah Kahan, O2 | as above | compression | **P20 248 vs 280; P04 156 vs 170**; P01, P09 B |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on (listing) | compression | **P20 265/276 vs 286; P04 158/158 vs 173**; P01 B |
| 21 Nov | **New:** The Script, O2 (detail page 21 Nov; one O2 page shows 28 Nov) | theo2.co.uk/events/detail/the-script-2026 | compression | P20 337 vs 296 yes; P04 205 vs 176 yes; P01, P09 B |
| 24–25 Nov | London Build Expo + elementalLONDON, ExCeL 25–26 Nov | excel.london/whats-on (listing) | compression | **P20 24 Nov 293 vs 310**; 25 Nov 314 yes; P04 24 Nov 189 vs 184 yes, 25 Nov B; P01 B |
| 1–2 Dec | Phoebe Bridgers, O2 | theo2.co.uk/events/detail/phoebe-bridgers (1 and 2 Dec) | compression | **P20 296/315 vs 343**; P04 1 Dec B, 2 Dec 612 (gap night); P01 BLK; P09 HB |
| 16–20 Dec | **New:** The Darkness 16 Dec, Greg Davies 17, Kasabian 18, **new:** Culture Club 19 (O2); London International Horse Show, ExCeL 17–21 Dec | theo2.co.uk/events/detail/the-darkness-2026, /greg-davies, /kasabian-2026, /culture-club-2026; excel.london/m/visitor/whats-on/london-international-horse-show | compression | Clean week (9–15 Dec): **P20 16 Dec 284 vs 328**; 17–20 Dec 332/347/364/333 above. **P04 16–17 Dec 197/197 vs 199**; 18–19 Dec 207/218 above; 20 Dec B. Strict fortnight (incl. 21–27 Dec): P20 386, P04 229 — every open night below. P01 16–17 BLK, 18–20 B |
| 31 Dec | NYE fireworks (tickets on sale Fri 23 Oct, 12:00) | london.gov.uk/events/london-new-years-eve-2026 | compression | P20 625 vs 370 yes; P04 B |
| 16 Jan | **New:** aespa, O2 | theo2.co.uk/events/detail/aespa-2027 | compression | P20 278: clean week (9–15 Jan) 265 yes; strict 301 no. P04 190 vs 186 yes |
| 19–20 Jan | **New in window:** Bett UK, ExCeL 20–22 Jan | uk.bettshow.com | compression | P20 351/362 vs 315 yes (a customisation lifts 18 Jan+); P04 186/188 vs 186 (19 Jan level, 20 Jan +2) |

ExCeL also lists FinTech Connect 1–2 Dec, London Perfume Exhibition 10–13 Dec, Scrooge Cirque 23–28 Dec (excel.london/whats-on); not used, no attendance stated.

### Central (Alexandra Palace → P08, P11; Emirates → P08; Regent's Park → P05/P14 — nothing found in window)
| Nights | Event | Source (checked 2026-10-22) | Effect | Priced? |
|---|---|---|---|---|
| 23–24 Oct | **New:** Arsenal v Everton, Emirates, Sat 24 Oct 15:00 | help.arsenal.com article 101000594163 (local residents' fixture list) | compression | P08 B |
| 6–7 Nov | **New:** Arsenal v Hull City, Emirates, Sat 7 Nov 15:00 (subject to change) | same | compression | P08 280/277 vs 215 yes |
| 24 Nov, 29 Nov, 9 Dec | Arsenal v Dortmund / v Man City (now Sun 29 Nov 16:30) / v Real Madrid | same; help.arsenal.com 101000593887 | compression | P08 HB (moot) |
| 13–17 Dec | World Darts Championship round one, Ally Pally. PDC schedule: 13 Dec afternoon + evening, **14 Dec evening only**, 15–17 Dec afternoon + evening; round two from 20 Dec | pdc.tv/WCFAQ (schedule); alexandrapalace.com/whats-on/world-darts-championship-2026-2027/ | compression | P11 332/306/311/323/339 vs 331: **14, 15, 16 Dec below**; 13 and 17 Dec above. 12 and 18 Dec 390 above. P08 HB |
| 11 Dec – 3 Jan | World Darts Championship overall. **Correction:** final is **Sun 3 Jan** (PDC calendar/FAQ; one PDC release says to 4 Jan). Christmas-break dates for 2026/27 **UNVERIFIED** (past editions paused 24–26 Dec; not confirmed for this one). Attendance: not re-verified today (the 180,000 figure was from the 20 Oct check) | pdc.tv/calendar; pdc.tv/WCFAQ | compression | P11 19–22 Dec and 26 Dec – 2 Jan B. 23–25 Dec open 344/337/338: session status UNVERIFIED, not assessed. **3 Jan (final night) 208**: strict fortnight 295 (before-week is NYE); clean week 4–10 Jan 204 → +4, **not counted as missed** |
| 10–17 Jan | Masters snooker, Ally Pally (no attendance stated) | alexandrapalace.com/whats-on/johnstones-paint-masters-snooker-2027/ | normal | P11 open 185–211 under a −5% override (2–20 Jan, set 11 Oct). Not assessed |

### West (Twickenham → P13, [P10 HB], [P16, P18 no listing]; Wembley → P13, [P10], [P02 blocked])
| Nights | Event | Source (checked 2026-10-22) | Effect | Priced? |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Sun 8 Nov 15:10 | help.englandrugby.com 103000350147 / 103000376802 | compression | P13 7 Nov BLK; 8 Nov 217 vs 201 yes |
| 12 Nov | England v Croatia, Wembley, Thu 19:45 | englandfootball.com match centre; wembleystadium.com/events/2026/England-v-Croatia | compression | P13 216 vs 208 yes |
| 13–14 Nov | England v Japan, Sat 14 Nov 16:40 | help.englandrugby.com 103000389067 | compression | P13 BLK both (twin?) |
| 20–21 Nov | England v New Zealand, Sat 21 Nov 14:10 | help.englandrugby.com 103000376802 | compression | **P13 20 Nov 218 vs 222 (fell from 232 on 21 Oct)**; 21 Nov 236 yes |
| 26–29 Nov | Nations Championship Finals Weekend, **confirmed Fri 27 – Sun 29 Nov** (27 Nov 16:40 + 20:10; 28 and 29 Nov 13:10 + 16:40) | help.englandrugby.com 103000396133 / 103000392931; englandrugby.com "Nations Championship 2026: everything you need to know" | compression | **P13 26 Nov 229 vs 236**; 27 Nov 250 yes; 28–29 Nov B |
| 5 Dec | England Women v Ukraine, Wembley, Sat 17:30 | englandfootball.com match centre | compression (size unstated) | P13 B |
| 28 Dec | Harlequins Big Game 18 (Quins Women 14:00, Men v Northampton 17:00). **Venue conflict:** Twickenham listing says Allianz Stadium; quins.co.uk Big Game 18 page gives the Stoop address | twickenhamstadium.com listing; quins.co.uk/harlequins-big-games | compression (inside NYE surge) | P13 379 vs 238 yes |
| 31 Dec | NYE | london.gov.uk | compression | P13 392 vs 236 yes |

### Citywide
| Dates | Item | Source | Effect |
|---|---|---|---|
| 26–30 Oct | School half term | council term-date pages (20 Oct check; not re-checked) | normal (family) |
| 21 Dec – 1 Jan | Christmas school holiday | same | compression late Dec |

NFL London 2026 games were 4, 11 and 18 Oct (nfl.com/international/games/london) — all before the window.

## 3. Missed compression — open event nights at or below the fortnight (today's prices, sellable flats only)

| Submarket | Ref | Nights | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|---|
| East | P20 | 11 Nov | Business Show | 263 | 267 | 4 |
| | P20 | 15, 16 Nov | Muse | 240, 242 | 281 | 41, 39 |
| | P20 | 17 Nov | Noah Kahan | 248 | 280 | 32 |
| | P20 | 18, 19 Nov | Vet Show | 265, 276 | 286 | 21, 10 |
| | P20 | 24 Nov | Build Expo | 293 | 310 | 17 |
| | P20 | 1, 2 Dec | Phoebe Bridgers | 296, 315 | 343 | 47, 28 |
| | P20 | 16 Dec | The Darkness / Horse Show eve | 284 | 328 (clean week) | 44 |
| | | | | | **P20 subtotal** | **10 nights / £283** |
| East | P04 | 10, 11 Nov | Business Show | 160, 155 | 166 | 6, 11 |
| | P04 | 15, 16 Nov | Muse | 156, 152 | 168 | 12, 16 |
| | P04 | 17 Nov | Noah Kahan | 156 | 170 | 14 |
| | P04 | 18, 19 Nov | Vet Show | 158, 158 | 173 | 15, 15 |
| | P04 | 16, 17 Dec | Darkness / Greg Davies / Horse Show | 197, 197 | 199 (clean week) | 2, 2 |
| | | | | | **P04 subtotal** | **9 nights / £93** |
| Central | P11 | 14, 15, 16 Dec | Darts round one | 306, 311, 323 | 331 | 25, 20, 8 = **£53** |
| West | P13 | 20 Nov | England v NZ (eve) | 218 | 222 | 4 |
| | P13 | 26 Nov | Finals Weekend (eve) | 229 | 236 | 8 |
| | | | | | **P13 subtotal** | **2 nights / £12** |

**Headline: 24 open nights, £441 below the fortnight** (East 19 / £376; Central 3 / £53; West 2 / £12). No missed nights on P05 (no verified venue event), P08, P09, P12 or P01 before handback.

Strict fortnight on every block (no clean-week rule): 32 nights / £870. The extra £429 is the 16–20 Dec block measured against the Christmas week (P20 £270 on 5 nights, P04 £97 on 4 nights), P11 3 Jan against NYE (£87) and P20 16 Jan against the Bett uplift (£23).

### Camden darts 13–17 Dec — check of Corentin's raise
- **Applied.** `get_user_logs`: 21 Oct 10:12Z, "Added Date Specific Override" +20% (percent), min-stay 2, 13–18 Dec, on Smoobu 3064196 and copied to the Vrbo child (12037367). The log shows the reyhan@ login. `get_listing_date_overrides` confirms +20% on 13–18 Dec (`updated_at` 2026-10-21T10:12:07Z); 12 Dec stays +10%.
- **Prices:** 13–17 Dec are now 332 / 306 / 311 / 323 / 339, average **£322** (was £296 on 21 Oct). That matches the policy note "average above £300/night". 18 Dec is 354 → 390.
- **Against the fortnight (331, = 6–12 Dec + 18–24 Dec):** 13 and 17 Dec are now above. **14, 15 and 16 Dec are still £25 / £20 / £8 under.** The gap is down from 5 nights / £170 to 3 nights / £53.
- **Caveats:**
  - All 14 fortnight nights fall inside the darts period or the Christmas run-up, so this compares darts nights with darts nights.
  - Against the week before only (6–12 Dec, £322), just 14 and 15 Dec are under (by £16 and £11).
  - 14 Dec has an evening session only.
  - P11 sells on Booking.com only, at 1.2× PriceLabs before promotions (policy).

## 4. What changed since 21 Oct
- **Human actions** (`get_user_logs`, 21–22 Oct; 3 entries):
  - P11 +20% on 13–18 Dec (above).
  - **P04 Channex listing 7dc96cda… price sync switched OFF (21 Oct 09:06Z); it now shows as "DELETED LISTING".** Smoobu 3562176 is the only P04 PriceLabs listing, which resolves yesterday's "which P04 listing drives price" gap. This breaks like-for-like for P04: 3562176's `price` is higher than the Channex price was (10 Nov 160 vs 140; 17 Dec 197 vs 188).
- **Missed nights, like-for-like** (same script on both snapshots, nights to 2 Dec plus darts plus 16–17 Dec): 21 Oct gave 26 nights / £566.
  - **P11:** £170 → £53, from the raise.
  - **P20:**
    - Now above the fortnight: 5 Nov (268→274) and 10 Nov (251→270).
    - Gaps narrowed: 19 Nov 268→276 (gap £17→£10), 18 Nov 258→265 (£27→£21).
    - Gaps widened: 24 Nov 308→293 (£2→£17), 1 Dec 303→296 (£40→£47), 2 Dec 322→315 (£21→£28).
    - Algorithm refresh 21 Oct 08:52Z; P20 has no new override in the logs.
  - **P04:** £98 → £89 on the Nov nights (listing switch). 17 Dec now 197 vs 199 (clean week).
  - **P13:** 26 Nov gap £11→£8. **20 Nov newly below** (232→218).
- **Events:**
  - Darts final corrected to 3 Jan, and the 13–17 Dec session pattern confirmed.
  - Finals Weekend confirmed 27–29 Nov.
  - New O2 nights: The Darkness 16 Dec, Culture Club 19 Dec, The Script 21 Nov, aespa 16 Jan.
  - New ExCeL: MCM Comic Con 23–25 Oct (booked); Bett 20–22 Jan, now inside the 90-day window.
  - Arsenal v Everton (24 Oct) and v Hull (7 Nov) matter while P08 is sellable; both are fine (booked / above).
  - Arsenal v Man City moved to Sun 29 Nov (P08 HB).
  - Big Game 18 venue now conflicting between sources.
  - NYE tickets on sale 23 Oct.
- **Market** (summary_table, 21 → 22 Oct):
  - P50: P05 591→612, P04 165→177 (pool changed from Channex n=60 to Smoobu n=87, not a market move), P01 270→277, P20 260→266, P11 301→306, P13 240→244, P09 141→142; P12 211 and P08 224 unchanged.
  - Market occupancy within ±2 points (P04 30-day 27→25%).

Data gaps:
1. Market P50/P75 are Nearby-Listings percentiles (Airbnb-derived), with no stated horizon or cleaning basis; they are not comps. P02, P03, P07 have no percentiles. P04's pool changed with the listing switch, so its P50 move is not comparable with 21 Oct.
2. Events are verified through domain-restricted WebSearch summaries of primary pages. Direct fetches fail (DNS ENOTFOUND for pdc.tv and alexandrapalace.com).
   - Unresolved: the darts 2026/27 Christmas-break dates (P11 23–25 Dec session status UNVERIFIED); The Script 21 vs 28 Nov; the Big Game 18 venue (Allianz Stadium vs the Stoop); the Business Show / Vet Show / Build Expo dates (from the excel.london what's-on listing, not the organiser sites, today).
   - Attendance: no figure was re-verified today (darts 180,000 dates from the 20 Oct check). None is stated for the other events.
   - Half-term dates not re-checked today.
3. P04 `price` (= Smoobu `smoobu_price`) vs `user_price` / `booked_price` ("Your Price") differ by £10–25 on open nights (10 Nov 160 vs 137). I used `price`. If the OTA receives `user_price`, P04's gaps are larger.
4. P20 is not in the VENUES map; I treat it as Canary Wharf (O2/ExCeL). P15–P19 have no PriceLabs listing.
5. Fortnights use list prices on booked nights. East fortnights include other O2/ExCeL event nights, so East gaps are conservative. The clean-week rule is a judgement; strict figures are given alongside.
6. P13 blocked event nights (7, 13, 14 Nov) may be bookings on twin 3090701 (policy); twin prices were not pulled.
7. Prices last refreshed 21 Oct (08:52–15:49Z); any change made on 22 Oct is not reflected.
