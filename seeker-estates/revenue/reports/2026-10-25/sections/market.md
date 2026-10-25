# Market & demand calendar — run D = 2026-10-25 (window 25 Oct 2026 – 23 Jan 2027)

## Sources and method
- **Policy:** `data/policy.json` read first.
  - Excluded: P02, P03, P06 and P07 (intentional blocks). P14 numbers are reported only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13: twin nights blocked because the other twin is booked count as bookings. On 7, 13 and 14 Nov, 3064856 shows Blocked and 3090701 shows Booked (`prices.csv`).
- **Market occupancy 30/60:** `data/snapshots/2026-10-25/pl_kpis.csv`, columns `market_occupancy_next_30` / `market_occupancy_next_60`.
- **P50/P75:** `data/snapshots/2026-10-25/market.csv`.
  - At 07:21Z this file had only P13 and P10 (written by comp-west).
  - For every other row I use `data/snapshots/2026-10-24/market.csv`, marked "(24 Oct)".
  - **I did not write to market.csv or raw/.**
- **Our prices:**
  - 26 Oct – 24 Dec: `data/snapshots/2026-10-25/prices.csv`, column `pricelabs_price`.
  - 24 Dec – 27 Jan: live `get_listing_prices` field `price`, pulled 25 Oct for P11, P20, P04 and P13. Saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m25/live25.py`.
  - `last_refreshed_at` values: P11 25 Oct 05:47Z; P20 24 Oct 12:43Z; P04 24 Oct 21:10Z; P13 24 Oct 21:18Z.
- **Fortnight method:** unchanged from 24 Oct.
  - It is the 7 nights before plus the 7 nights after the event block. Blocked nights and nights above 2× the median are excluded. Booked nights count at their list price.
  - Clean-week rule: 16–20 Dec uses 9–15 Dec; 3 Jan uses 4–10 Jan; 16 Jan uses 9–15 Jan; Bett uses 12–18 Jan.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m25/analyse25.py`. This is analyse24.py pointed at the 25 Oct snapshot and live25, plus three new O2 events.
  - Output: `.../m25/out25.txt`. Comparator: `.../m24/out24.txt`.
- **Change attribution:** `get_user_logs` (listing, 24–25 Oct), 17 entries.
- **Events:** re-verified 25 Oct 2026 by WebSearch restricted to venue or organiser domains. Direct theo2.co.uk fetches are refused by the proxy, so these are search-indexed primary pages.
  - Re-checked today: O2 (Noah Kahan, Muse, Phoebe Bridgers; new J. Cole, Mariah Carey, Kehlani); ExCeL (WTM, Vet Show, London Build; Business Show appears in the ExCeL listing only, with no event page found today); darts (alexandrapalace.com, pdc.tv/wcfaq); Arsenal v Hull (arsenal.com); Twickenham (England v NZ, Finals Weekend 27–29 Nov; the englandrugby.com fixtures article confirms Australia 8 Nov and Japan 14 Nov).
  - Carried from 24 Oct without a re-check: Stevie Wonder, The Script, London Build organiser page, Ally Pally concerts, The Darkness / Kasabian / Culture Club, Horse Show, aespa, Bett, England v Croatia, England Women v Ukraine, Big Game 18, NYE.
  - Attendance: the only stated figure is darts (180,000 tickets).

## 1. Submarket table (2026-10-25)

| Submarket | Ref | Area | BR | Mkt occ 30/60 (`pl_kpis`) | P50 / P75 £ (`market.csv`) | Our occ 30/60 | Avg open £ 26 Oct–24 Nov (nights) [24 Oct] |
|---|---|---|---|---|---|---|---|
| East | P01 | Canary Wharf (HB after 20 Dec) | 2 | 33 / 26% | 274 / 338 (24 Oct) | 100/100%* | none open |
| | P20 | Canary Wharf | 2 | 35 / 28% | 266 / 324 (24 Oct) | 20 / 10% | 260 (25) [270] |
| | P04 | Barking | 2 | 26 / 20% | 179 / 222 (24 Oct) | **37 / 40%** (was 27/33) | 167 (20) [163] |
| | P09 | Greenwich (HB after 26 Nov) | 1 | 36 / 31% | 142 / 172 (24 Oct) | 70/85%* | 150 (9) [158] |
| | P12 | Mile End (HB after 13 Dec) | 2 | 40 / 32% | 215 / 257 (24 Oct) | **63 / 57%** (was 40/45) | 210 (11) [213] |
| Central | P08 | Islington (HB after 13 Nov) | 2 | 51 / 44% | 227 / 284 (24 Oct) | 60/80%* | 165 (12) [167] |
| | P11 | Camden | 2 | 44 / 38% | 306 / 362 (24 Oct) | 47 / 53% (was 53/55) | 213 (17) [221] |
| | P05 | St John's Wood | 4 | 38 / 36% | 616 / 737 (24 Oct) | 73 / 62% | 471 (8) [482] |
| | P14 | Primrose Hill (report only) | 1 | 40 / 37% | 203 / 253 (24 Oct) | 0 / 0% | 500 (30) |
| West | P13 | Shepherd's Bush | 2 | 41 / 35% | **244 / 302 (25 Oct)** | 43 / 35% | 186 (18) [196] |
| | P10 | Hanger Lane (HB after 18 Nov) | 1 | 31 / 25% | **132 / 160 (25 Oct)** | 100/100%* | — |

Not in the table: P02, P03, P06 and P07 are intentional blocks; P15–P19 have no PriceLabs listing.
\* Inflated, because PriceLabs counts the handback blocks as occupied.

- Market occupancy moved by 1 point or less everywhere (`pl_kpis` 24 vs 25 Oct).
- Our 30-day occupancy rose on P12 (+23 points: Booking.com 5–12 Nov) and P04 (+10 points: Booking.com 14–18 Nov). It fell on P11 (−6). (Bookings from Dispatcher overnight facts, cross-checked against `prices.csv` booking_status.)
- Open-night averages fell £8–10 on P20, P13, P09 and P11. P20 and P13 are explained in §4. P11 and P09 have no new log apart from P09's −5% on 26–31 Oct.

## 2. Demand calendar, 25 Oct 2026 – 23 Jan 2027 (today's prices)

Venues use the VENUES map in `/home/user/seeker-social/seeker-estates/build/properties.py`. P20 is not in the map, so it is treated as Canary Wharf (O2 + ExCeL). The Hyde Park and Regent's Park venue entries map only to blocked flats, unlisted flats or P14.

B = booked, BLK = blocked, HB = after handback. "yes" means our price is above the fortnight.

### East (O2 / ExCeL → P01, P04, P09, P20)
| Nights | Event | Source (checked 25 Oct unless noted) | Effect | Our £ vs fortnight £ |
|---|---|---|---|---|
| 25–31 Oct | O2 arena nights (Fally Ipupa, Critical Role, Cody Johnson, D-Block Europe, Duran Duran) | theo2.co.uk arena listing (24 Oct) | normal; half term is soft (24 Oct section §2) | Not re-tested: the snapshot now starts 26 Oct |
| 2 Nov | **NEW: J. Cole, O2 (Mon 2 Nov)** | theo2.co.uk/events/detail/jcole-2026; axs.com | compression | P20 273 vs 248 yes; P04 158 vs 150 yes; P01, P09 B |
| 2–4 Nov | WTM, ExCeL 3–5 Nov | excel.london/visitor/whats-on/world-travel-market-london-2026 | compression | P20 273/277/280 vs 245 yes; P04 158/165/167 vs 150 yes; P01 B |
| 3, 5 Nov | Stevie Wonder, O2 (24 Oct) | theo2.co.uk/events/detail/stevie-wonder | compression | P20 277/258 vs 249 yes; P04 165/160 vs 152 yes |
| 10–11 Nov | Business Show, ExCeL 11–12 Nov (ExCeL listing only) | excel.london/whats-on | compression | **P20 255/256 vs 261 (below)**; P04 165/165 vs 164 yes (was below) |
| 13–14 Nov | Noah Kahan, O2 13, 14, 17 Nov | theo2.co.uk/events/detail/noah-kahan-2026 | compression | P20 265/279 vs 257 yes; P04 13 Nov 173 vs 165 yes, 14 Nov B (new) |
| 15–16 Nov | Muse, O2 | theo2.co.uk/events/detail/muse-2026 | compression | **P20 236/246 vs 264**; P04 B (new booking 14–18 Nov); P01, P09 B |
| 17 Nov | Noah Kahan, O2 | as above | compression | **P20 250 vs 266**; P04 B |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on/london-vet-show-2026 | compression | **P20 267/272 vs 274; P04 162/164 vs 174** |
| 21 Nov | The Script, O2 (24 Oct) | theo2.co.uk/events/detail/the-script-2026 | compression | P04 185 vs 179 yes (was below); P20 BLK |
| 24–25 Nov | London Build Expo, ExCeL 25–26 Nov | excel.london/whats-on/london-build-expo | compression | **P20 24 Nov 300 vs 307**; 25 Nov 313 yes; P04 195 vs 185 yes / B |
| 30 Nov | **NEW: Mariah Carey, O2 (Mon 30 Nov)** | theo2.co.uk/events/detail/mariah-carey-2026 | compression (size unstated) | **P20 297 vs 342**; P04 B; P01 BLK |
| 1–2 Dec | Phoebe Bridgers, O2 (one listing says 3 Dec; the detail page says 1–2 Dec) | theo2.co.uk/events/detail/phoebe-bridgers | compression | **P20 300/325 vs 346**; P04 2 Dec 635 (gap night) |
| 8 Dec | **NEW: Kehlani, O2 (Tue 8 Dec)** | theo2.co.uk/events/detail/kehlani-2026; axs.com/uk/events/1468950 | compression (size unstated) | P20 355 vs 342 yes; **P04 199 vs 204** |
| 16–20 Dec | O2 run plus Horse Show, ExCeL 17–21 Dec (24 Oct) | theo2.co.uk; excel.london | compression | Clean week: **P20 16 Dec 294 vs 331**, 17–20 Dec yes; P04 200 vs 199.9 (level), 17–19 Dec yes |
| 31 Dec | NYE (24 Oct) | london.gov.uk/events/london-new-years-eve-2026 | compression | P20 616 vs 367 yes (was 630); P04 B |
| 16 Jan | aespa, O2 (24 Oct) | theo2.co.uk/events/detail/aespa-2027 | compression | Clean week: P20 275 vs 266 yes; P04 184 vs 177 yes |
| 19–20 Jan | Bett, ExCeL 20–22 Jan (24 Oct) | uk.bettshow.com | compression | Clean week: P20 271/280 vs 265 yes; **P04 19 Jan 177 vs 178**, 20 Jan 180 yes |

### Central (Ally Pally → P08, P11; Emirates → P08)
| Nights | Event | Source | Effect | Our £ vs fortnight £ |
|---|---|---|---|---|
| 6–7 Nov | Arsenal v Hull, Sat 7 Nov 15:00 | arsenal.com ticket information / "Two Premier League games rearranged in November" | compression | **P08 188/187 vs 195** |
| 20–21 Nov | Enter Shikari, Ally Pally (24 Oct) | alexandrapalace.com/whats-on/enter-shikari/ | compression | P11 267/265 vs 238 yes |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City (24 Oct) | alexandrapalace.com | compression | P11 283/330 vs 260 yes; 28 Nov B |
| 13–17 Dec | World Darts, 11 Dec – 3 Jan (180,000 tickets) | alexandrapalace.com/whats-on/world-darts-championship-2026-2027/; pdc.tv/wcfaq | compression | **P11 265/244/248/260/275 vs 301 (all below)** |
| 23 Dec | Darts last pre-Christmas session (session list 23 Oct) | pdc.tv/wcfaq | compression | P11 333 vs 330 yes |
| 3 Jan | Darts final, Sun 3 Jan 20:00 GMT | pdc.tv/wcfaq | compression | **P11 202 vs 206 (clean week 4–10 Jan; was level)**. Strict comparison: 299 |

### West (Twickenham / Wembley → P13)
| Nights | Event | Source | Effect | Our £ vs fortnight £ |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Sun 8 Nov | allianzstadiumtwickenham.com; englandrugby.com fixtures | compression | 7 Nov twin-booked; 8 Nov 186 vs 172 yes |
| 12 Nov | England v Croatia, Wembley (24 Oct) | englandfootball.com | compression | 184 vs 183 yes (+1) |
| 13–14 Nov | England v Japan, Sat 14 Nov | as above | compression | twin-booked |
| 20–21 Nov | England v New Zealand, Sat 21 Nov 14:10 | allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match | compression | **227/228 vs 215 yes (was 216/218 vs 219)** |
| 26–29 Nov | Finals Weekend, 27–29 Nov | allianzstadiumtwickenham.com/nations-championship-finals-weekend | compression | 244/262 vs 230 yes; 28–29 Nov B |
| 28 Dec / 31 Dec | Big Game 18 (23 Oct) / NYE | allianzstadiumtwickenham.com/big-game-18; london.gov.uk | compression | 395 vs 256; 403 vs 238 yes |

## 3. Missed compression — open event nights at or below the fortnight

| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 10, 11 Nov | Business Show | 255, 256 | 261 | 6, 5 |
| P20 | 15, 16 Nov | Muse | 236, 246 | 264 | 28, 18 |
| P20 | 17 Nov | Noah Kahan | 250 | 266 | 16 |
| P20 | 18, 19 Nov | Vet Show | 267, 272 | 274 | 7, 2 |
| P20 | 24 Nov | London Build | 300 | 307 | 7 |
| P20 | 30 Nov | **NEW** Mariah Carey | 297 | 342 | 45 |
| P20 | 1, 2 Dec | Phoebe Bridgers | 300, 325 | 346 | 46, 21 |
| P20 | 16 Dec | Darkness / Horse Show eve | 294 | 331 (clean week) | 37 |
| | | | | **P20 subtotal** | **12 nights / £238** (24 Oct: 11 / £215) |
| P04 | 18, 19 Nov | Vet Show | 162, 164 | 174 | 12, 10 |
| P04 | 8 Dec | **NEW** Kehlani | 199 | 204 | 5 |
| P04 | 19 Jan | Bett eve (**newly below**) | 177 | 178 (clean week) | 1 |
| | | | | **P04 subtotal** | **4 nights / £28** (24 Oct: 9 / £80) |
| P11 | 13–17 Dec | Darts round one | 265, 244, 248, 260, 275 | 301 | 36, 57, 53, 41, 26 = **£213** (24 Oct: £214) |
| P11 | 3 Jan | Darts final (**newly below**) | 202 | 206 (clean week) | 4 |
| P08 | 6, 7 Nov | Arsenal v Hull | 188, 187 | 195 | 7, 8 = **£15** (24 Oct: £21) |

**Headline: 24 open nights, £498 below the fortnight.** The 24 Oct figure was 29 nights / £534.
- **Like-for-like on the 24 Oct event list: 22 nights / £448.** The two new O2 events add 2 nights / £50.
- **Dropped off (8 nights):**
  - P04 10–11 Nov: now 165 vs 164.
  - P04 15–17 Nov: booked by the new Booking.com stay of 14–18 Nov.
  - P04 21 Nov: 185 vs 179.
  - P04 16 Dec: 200 vs 199.9, now on the watch-list.
  - P13 20–21 Nov: Reyhan +10% override, see §4.
- **Added (1 night on old events):** P04 19 Jan (£1). P11 3 Jan moved from the watch-list to £4 below.
- **Watch-list (within £1):** P04 16 Dec 200 vs 199.9; P13 12 Nov 184 vs 183.
- **Strict fortnight** (no clean-week rule): it still flags P20 16–20 Dec (vs 377), P04 16–19 Dec (vs 228), P11 3 Jan (vs 299), P20 16 Jan (vs 285), and P04 / P20 Bett nights. These comparisons are mostly against Christmas, NYE or far-out-premium nights.

## 4. What changed since 24 Oct (`get_user_logs`, listing, 24–25 Oct)
1. **P20 −5% override, 31 Oct – 19 Nov, min-stay 3** (reyhan@, 24 Oct 12:41Z).
   - It covers the Business Show, Noah Kahan, Muse and Vet Show nights. P20 event nights fell £8–14 (e.g. Muse 15 Nov 250 → 236; Vet Show 18 Nov 276 → 267).
   - The fortnights fell too, so the gaps barely moved (P20 15–19 Nov: £82 → £71).
   - The 24 Oct direction recorded in the Dispatcher facts was to cut negative PriceLabs overrides. This override is negative and sits on 7 of P20's 12 missed nights. **Not applied as of the log read.**
   - The P20 base change (380 → 350) does not appear in the 24–25 Oct logs: NOT CHECKED when it was made. P20 30 Nov – 2 Dec and 16 Dec sit outside the override and are still £21–46 below.
2. **P04 −8% override, 1–24 Nov, min 3** (the Dispatcher said 1–25 Nov; the log says end date 24 Nov). **P04 −5%, 6–22 Dec, min 3**, and −5% on 1–28 Feb (all reyhan@, 24 Oct 11:23Z).
   - P04 Vet Show nights still rose (154/155 → 162/164) after the 24 Oct 21:10Z refresh, but the fortnight rose more (171 → 174).
   - The −5% in December covers Kehlani 8 Dec (199 vs 204) and the Horse Show week.
3. **P13 base 235 → 250** (reyhan@, 24 Oct 21:14Z; copied to twin 3090701 and Vrbo). Also **P13 +10% on 20–21 Nov** (England v NZ), and a 1–27 Nov override with min-stay 2 and no price.
   - Result: England v NZ is now 227/228 vs 215, so it has left the missed list.
   - NYE 384 → 403 and Big Game 28 Dec 376 → 395.
   - The 30-day open average still fell (196 → 186). It now includes 26 Oct at 172, and 25 Oct dropped out of the window.
4. **P09 −5%, 26–31 Oct** (half-term week; soft market per the 24 Oct section). No event-night effect: P09's event nights are booked or after handback.
5. **P11:** no log entry. Darts 13–17 Dec rose £2–3 a night, but the fortnight also rose (299 → 301), so the gap is unchanged (£214 → £213).
   - The question raised 24 Oct is still open: the darts nights sit at roughly `uncustomized_price` since reyhan@'s +5% edit on 23 Oct replaced Corentin's 21 Oct raise.
   - P11 3 Jan is now £4 below.
6. **P08 Arsenal v Hull:** no log. Prices 191/192 → 188/187; the fortnight 202 → 195. Gap £21 → £15.
7. **New O2 events found:** J. Cole 2 Nov (priced above), Mariah Carey 30 Nov (P20 £45 below), Kehlani 8 Dec (P04 £5 below).
8. **Still open:** P20 20–21 Nov Blocked (reason NOT CHECKED). P05 27–28 Oct Blocked (reason NOT CHECKED).

Data gaps:
1. Today's `market.csv` had only P13 and P10 at 07:21Z. Every other P50/P75 is the 24 Oct row.
   - All percentiles are Airbnb-derived Nearby-Listings figures, not comps. The horizon is unstated.
   - P11 sells on Booking.com only.
   - Daily market vs STLY occupancy was not re-pulled today: NOT CHECKED.
2. P20 is not in the VENUES map (`seeker-estates/build/properties.py`), and P15–P19 have no PriceLabs listing. Event effects on those flats are not measured.
3. Events were verified only through domain-restricted search summaries. theo2.co.uk direct fetches are refused by the proxy.
   - The Business Show had no event page today (ExCeL listing only).
   - Phoebe Bridgers has a 3 Dec listing conflict.
   - Several events were carried from 24 Oct without a re-check (see Sources).
   - No attendance figures exist except darts.
   - Mariah Carey and Kehlani have no capacity stated.
4. Prices for P20, P04 and P13 were last refreshed on 24 Oct (12:43–21:18Z). Overnight changes on these listings, if any, are not reflected.
   - The 25–31 Oct O2 nights could not be re-tested because the snapshot starts 26 Oct.
5. Whether Corentin's "cut PriceLabs-side discounts" direction has been applied to customizations (last-minute, booking recency, occupancy) was NOT CHECKED here (`get_customizations` not called). The logs show new negative overrides on P20, P04 and P09, and none removed.
6. The reasons for the P20 20–21 Nov and P05 27–28 Oct blocks, and the timing of the P20 base change: NOT CHECKED.
