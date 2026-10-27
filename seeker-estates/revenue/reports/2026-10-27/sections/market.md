# Market & demand calendar — run D = 2026-10-27 (window 27 Oct 2026 – 25 Jan 2027)

## Sources and method
- **Policy:** I read `data/policy.json` first.
  - Excluded: P02, P03, P06 and P07 (intentional blocks). P14 numbers are reported only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13 is one flat (3064856 + 3090701).
  - **P11 darts 13–17 Dec:** policy `listing_facts.P11.darts_override_24oct` says leave the override as it is. I report those numbers only and propose nothing for them.
  - Not raised: P04 2 Dec and P12 17 Nov (deprioritised).
- **Market occupancy 30/60:** `data/snapshots/2026-10-27/pl_kpis.csv`, columns `market_occupancy_next_30` / `market_occupancy_next_60`.
- **P50/P75:**
  - P13: today's `data/snapshots/2026-10-27/market.csv` (comp-west row, pulled 27 Oct).
  - Everyone else: `data/snapshots/2026-10-26/market.csv` (the latest rows for them).
  - All are PriceLabs Nearby-Listings percentiles. They are Airbnb-derived, not comp sets, and the horizon is unstated.
  - **I added no rows to market.csv.** My own P13 Christmas pull is saved in the scratchpad (path below), not in `raw/`, so comp-west's `raw/neighbourhood_P13.json` is untouched.
- **Our prices:**
  - 28 Oct – 26 Dec: `data/snapshots/2026-10-27/prices.csv`, column `pricelabs_price`.
  - 20 Dec – 27 Jan: live `get_listing_prices` field `price`, pulled 27 Oct for P11, P20, P04, P13 (3064856) and P13 twin 3090701 (20 Dec – 10 Jan). Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m27/live27.py`.
  - `last_refreshed_at`: P20 26 Oct 10:20Z; P11 18:36Z; P13 18:38Z; P04 18:45Z; P12 18:35Z; P05 18:40Z; P08 18:40Z; P09 18:45Z; P01 07:52Z (all 26 Oct).
- **Fortnight method:** unchanged from 25–26 Oct.
  - Comparison = the 7 nights before plus the 7 nights after the event block. Blocked nights and nights above 2× the median are excluded. Booked nights count at their list price.
  - Clean-week rule: 16–20 Dec uses 9–15 Dec; 3 Jan uses 4–10 Jan; 16 Jan uses 9–15 Jan; Bett uses 12–18 Jan.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m27/analyse27.py`. It is analyse26.py with the same event list, pointed at the 27 Oct snapshot and live27.
  - Output: `.../m27/out27.txt`. Comparator: `.../m26/out26.txt`.
  - One input change: P13 27 Dec – 2 Jan is counted as booked. Smoobu `reservations.csv` has the Airbnb stay 27 Dec – 3 Jan (booked 26 Oct), but PriceLabs still shows both twins open there.
- **Change attribution:**
  - `get_user_logs` (listing, 26–27 Oct): 36 entries, all reyhan@, 10:11–18:44Z on 26 Oct.
  - `get_listing_date_overrides`: P13 Dec–Jan and P04 Nov–Dec.
  - `get_customizations`: P13 and P20.
- **Christmas / New Year market:** `get_neighbourhood_data` (detail, future prices + occupancy) for 3064856, pulled 27 Oct. Market band 2–3 BR, 152 Nearby Listings, source "NL", airbnb. Saved: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m27/neigh_P13.json`.
- **Events re-verified 27 Oct 2026** (domain-restricted WebSearch of venue / organiser pages; direct fetches have failed on these domains since 25 Oct):
  - World Darts 11 Dec – 3 Jan, final Sun 3 Jan 20:00 GMT, record 180,000 tickets. Sources: [alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq).
  - Mariah Carey, O2 arena, Mon 30 Nov: [theo2.co.uk](https://www.theo2.co.uk/events/detail/mariah-carey-2026).
  - Phoebe Bridgers, O2 arena, Tue 1 and Wed 2 Dec: [theo2.co.uk](https://www.theo2.co.uk/events/detail/phoebe-bridgers).
  - ExCeL "What's on" ([excel.london/whats-on](https://www.excel.london/whats-on)): Business Show 11–12 Nov; London Vet Show 19–20 Nov; [London Build Expo](https://www.excel.london/whats-on/london-build-expo) 25–26 Nov ("25,000+ visitors" per the organiser text as indexed).
  - London NYE fireworks, 31 Dec 20:00 – 1 Jan 00:30, ticketed: [london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026).
  - Every other event is carried from the 24–26 Oct checks (sources in `reports/2026-10-26/sections/market.md`), not re-checked today.

## 1. Submarket table (2026-10-27)

| Area | Ref | BR | Mkt occ 30/60 (`pl_kpis` 27 Oct) | P50 / P75 £ (`market.csv`) | Our occ 30/60 [26 Oct] | Our open nights |
|---|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 35 / 27% | 272 / 339 (26 Oct) | 100/100%* | none |
| Canary Wharf | P20 | 2 | 36 / 28% | 268 / 328 (26 Oct) | 17 / 8% [17/8] | most |
| Barking | P04 | 2 | 25 / 20% | 179 / 223 (26 Oct) | **43 / 48%** [33/40] | |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 142 / 173 (26 Oct) | 70/85%* | |
| Mile End (HB 13 Dec) | P12 | 2 | 39 / 33% | 213 / 258 (26 Oct) | 67 / **58%** [70/52] | |
| Islington (HB 13 Nov) | P08 | 2 | 51 / 44% | 227 / 283 (26 Oct) | **77/88%*** [60/80] | |
| Camden | P11 | 2 | 43 / 38% | 305 / 358 (26 Oct) | 43 / 52% | |
| St John's Wood | P05 | 4 | 38 / 37% | 616 / 745 (26 Oct) | 73 / 62% | |
| Primrose Hill (report only) | P14 | 1 | 40 / 37% | 204 / 256 (26 Oct) | 0 / 0% | |
| Shepherd's Bush | P13 | 2 | 41 / 36% | **245 / 303 (27 Oct)** | 40 / 33% | |
| Hanger Lane (HB 18 Nov) | P10 | 1 | 30 / 24% | n/a (not pulled; 0 sellable nights) | 100/100%* | none |

\* Inflated, because PriceLabs counts handback blocks as occupied.

- **What moved in our occupancy:**
  - P04 is up 10 / 8 points. 20–22 Nov is now booked: `reservations.csv` has one confirmed Booking.com row 20–23 Nov at £355.82, booked 26 Oct, plus two cancelled duplicates. **The Dispatcher note that this booking "appears already cancelled" is wrong for the confirmed row.**
  - P08 is up: 31 Oct – 4 Nov is booked.
  - P12 next-60 is up 6 points: the Booking.com stay 4–8 Dec is now in.
- **Market occupancy** moved by 1 point or less everywhere.

## 2. Demand calendar, 27 Oct 2026 – 25 Jan 2027 (today's prices)

Venues use the VENUES map in `build/properties.py`. P20 is not in the map, so it is treated as Canary Wharf (O2 + ExCeL). "yes" means our price is above the fortnight. 26 Oct values are in brackets.

### East (O2 / ExCeL → P01, P04, P09, P20)
| Nights | Event | Effect | Our £ vs fortnight £ |
|---|---|---|---|
| 2 Nov | J. Cole, O2 | compression | P20 251 vs 242 yes; P04 164 vs 159 yes; P01, P09 booked |
| 2–4 Nov | WTM, ExCeL 3–5 Nov | compression | P20 251/250/251 vs 242 yes; P04 164–166 vs 162 yes |
| 3, 5 Nov | Stevie Wonder, O2 | compression | P20 3 Nov 250 yes; **5 Nov 242 vs 244** (246 vs 250). **P04 165/163 vs 166 (new)**: the P04 fortnight rose after the 26 Oct override change (−8% → −3%, 1–17 Nov) |
| 10–11 Nov | Business Show, ExCeL 11–12 Nov | compression | **P20 10 Nov 243 vs 250 (new; was 260)**, 11 Nov 258 yes. **P04 10 Nov 165 vs 186 (new)**, 11 Nov 208 yes |
| 13–14 Nov | Noah Kahan, O2 | compression | P20 257/266 vs 251 yes; P04 214 yes / booked |
| 15–16 Nov | Muse, O2 | compression | **P20 255/246 vs 255** (243/251 vs 262) |
| 17 Nov | Noah Kahan, O2 | compression | **P20 251 vs 257** (254 vs 264) |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | compression | P20 260/268 vs 260: 18 Nov is level, no longer below. P04 210/211 vs 219: **now +25% override** (reyhan 26 Oct 18:44Z; was 163/165). Still flagged only because the fortnight also contains raised nights (11–13 Nov 208–214 and the +25% override on 23–24 Nov) |
| 21 Nov | The Script, O2 | compression | P04 booked; P20 blocked (delivery, policy) |
| 24–25 Nov | London Build Expo, ExCeL 25–26 Nov (25,000+ visitors stated) | compression | **P20 257/262 vs 278** (263/287 vs 289). P04 24 Nov 216 vs 214 yes (+25% override; was 167); 25 Nov booked |
| 30 Nov | Mariah Carey, O2 | compression (size unstated) | **P20 260 vs 297** (270 vs 314); P04 booked |
| 1–2 Dec | Phoebe Bridgers, O2 | compression | **P20 267/283 vs 302** (275/296 vs 318); P04 2 Dec 513 (deprioritised; numbers only) |
| 8 Dec | Kehlani, O2 | compression (size unstated) | P20 317 vs 305 yes; **P04 207 vs 210** |
| 16–20 Dec | O2 run + Horse Show, ExCeL 17–21 Dec | compression | Clean week: **P20 16 Dec 273 vs 303**, 17–20 Dec yes; **P04 16 Dec 208 vs 209**, 17–18 Dec yes, 19–20 Dec booked |
| 31 Dec | NYE fireworks | compression | P20 608 vs 335 yes (631 vs 354); P04 booked |
| 16 Jan | aespa, O2 | compression | Clean week: P20 283 vs 270 yes; P04 188 vs 184 yes |
| 19–20 Jan | Bett, ExCeL 20–22 Jan | compression | Clean week: P20 273 yes / **20 Jan 272 vs 272 (level)**; **P04 19 Jan 183 vs 184**, 20 Jan 185 yes |

### Central (Ally Pally → P08, P11; Emirates → P08)
| Nights | Event | Effect | Our £ vs fortnight £ |
|---|---|---|---|
| 6–7 Nov | Arsenal v Hull, Emirates | compression | **P08 213/211 vs 203 yes, now priced** (188/185 vs 189). P08 rose about £25 a night on 28 Oct – 7 Nov. No 26 Oct log covers P08 |
| 20–21 Nov | Enter Shikari, Ally Pally | compression | P11 273/273 vs 233 yes |
| 26–28 Nov | Ally Pally concerts | compression | P11 275/337 vs 257 yes; 28 Nov booked |
| 13–17 Dec | World Darts round one | compression | P11 260/235/236/250/269 vs 311. Policy-settled override: numbers only (see §3) |
| 23 Dec | Darts, last pre-Christmas session | compression | **P11 348 vs 348 (level; was 328 vs 326)** |
| 3 Jan | Darts final | compression | **P11 195 vs 203 (clean week)** (201 vs 205) |

### West (Twickenham / Wembley → P13)
| Nights | Event | Effect | Our £ vs fortnight £ |
|---|---|---|---|
| 8 Nov | England v Australia | compression | **158 vs 158 (level)** (162 vs 164) |
| 12 Nov | England v Croatia, Wembley | compression | 183 vs 171 yes |
| 20–21 Nov | England v New Zealand | compression | 200/200 vs 199: **only just above** (227/228 vs 207). Both nights fell £27–28 since 26 Oct, more than the −2% override reyhan set at 18:37Z on 26 Oct |
| 26–27 Nov | Finals Weekend 27–29 Nov | compression | 224/234 vs 212 yes (233/249); 28–29 Nov booked |
| 28 Dec / 31 Dec | Big Game 18 / NYE | compression | **Booked** (Airbnb 27 Dec – 3 Jan; see §2b) |

### 2b. Christmas / New Year — is P13's £252/night in line with the market?
**Booking** (`reservations.csv`): Airbnb, 27 Dec – 3 Jan, 7 nights, total £1,766.00 including £150 cleaning, booked 26 Oct.
- Room only: £1,616.00 = **£230.86 a night**. The Dispatcher's ~£252 includes cleaning.

**Market, 2–3 BR band in Shepherd's Bush** (`get_neighbourhood_data` 3064856, `future_prices` / `occupancy.daily`, pulled 27 Oct). These are nightly asking prices with no length-of-stay discount; whether cleaning is included is not stated.

| Night | Mkt P25 | Mkt median | Mkt P75 | Booked median | Mkt occ % | STLY % | LY final % | Our list (3064856) |
|---|---|---|---|---|---|---|---|---|
| Sun 27 Dec | 252 | 314 | 406 | 251 | 40.3 | 29.0 | 77.3 | 303 |
| Mon 28 | 256 | 319 | 422 | 257 | 38.3 | 32.9 | 78.1 | 348 |
| Tue 29 | 263 | 332 | 423 | 262 | 40.5 | 32.2 | 82.2 | 350 |
| Wed 30 | 263 | 347 | 418 | 261 | 36.8 | 27.7 | 83.1 | 352 |
| Thu 31 | 258 | 329 | 411 | 245 | 37.6 | 27.3 | 81.8 | 351 |
| Fri 1 Jan | 244 | 301 | 380 | 237 | 31.3 | 17.6 | 64.7 | 327 |
| Sat 2 Jan | 223 | 279 | 323 | 192 | 18.0 | 17.1 | 57.1 | 268 |
| **7-night average** | **251** | **317** | **398** | **244** | | | | **328** |

- **Demand is real.**
  - PriceLabs' own insight: market prices rise "25.2%" on 26–31 Dec compared with surrounding dates, and occupancy rises "13.0%" on 26 Dec – 1 Jan.
  - Market occupancy on 27–31 Dec is 37–41%, which is 7–11 points ahead of STLY.
  - For comparison, 3–10 Jan is at 8–16% with a market median of £238–249.
- **Our room rate against the market:**
  - **£231 is 27% below the market median (£317) and 8% below P25 (£251).**
  - It is 5% below the median of nights already booked in the market (£244).
  - After the policy's 15% weekly discount, the market median is equivalent to £269. We are still 14% under that.
  - **Verdict: below the NYE asking market. Roughly in line with what other hosts have actually booked so far.**
- **Our list price was fine; the stacked discounts produced the low rate.**
  - The PriceLabs list for 27 Dec – 2 Jan sums to £2,299 (£328 a night, +3.5% vs the market median). The paid room is 0.703× that list.
  - Policy expects 0.85× for a 7-night stay. The Shepherd's Bush Airbnb early-bird −10% at 60+ days (policy `airbnb_smoobu_settings_21oct.changed_21oct`) also applies: the stay was booked 62 days out. Together: 0.85 × 0.90 = 0.765 → £1,759 expected, against £1,616 paid. **That leaves £143 (about 8%) unexplained against today's list.**
  - The list at the moment of booking is unknown. The 25 Oct 21:30Z list summed to £2,629 (`m26/live26.py`); against that, the unexplained gap would be larger.
  - Guest count and any extra-guest fee: NOT CHECKED.
- **P13's NYE list fell about 13% overnight** while the booking was being made: 28 Dec 399 → 348, 31 Dec 407 → 351, 1 Jan 372 → 327 (`live26` vs today).
  - The overrides are unchanged: −3% since 17 Oct (`get_listing_date_overrides`), and the 26 Oct logs do not touch these dates.
  - On 28–31 Dec, PriceLabs' `uncustomized_price` is £463–473 against a final price of £348–352 (0.75×). So customizations are taking off about 25% on the highest-demand nights. With the override only −3%, the rest comes from settings in force on P13: seasonality "Moderately Conservative" and demand factor "Conservative" (`get_customizations` 27 Oct). The occupancy profile and booking-recency factor should not apply at 62+ days or beyond 30 days.
  - Whether those two settings changed on 26 Oct is NOT CHECKED: the logs do not record customization changes. This is inference.
- **Other Christmas / NYE positions:**
  - P11: booked 26 Dec – 3 Jan on Booking.com, £2,244.84 for 8 nights (£280.61 gross), booked 21 Sep; 24–25 Dec are open at 351/346.
  - P04: booked 20 Dec – 2 Jan on Booking.com, £2,417.34 for 13 nights (£185.95), booked 20 Oct.
  - P20: 20 Dec – 27 Jan is fully open. NYE week is listed at 603–608 (28–31 Dec), 1.9× the Shepherd's Bush market median; no Canary Wharf NYE market pull was made, so P20 is NOT CHECKED against its own market.
- **Sync:** PriceLabs still shows P13 27 Dec – 2 Jan open on both twins (refresh 26 Oct 18:38Z), against Smoobu's confirmed booking.

## 3. Missed compression — open event nights at or below the fortnight (today)

| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ | vs 26 Oct |
|---|---|---|---|---|---|---|
| P20 | 5 Nov | Stevie Wonder | 242 | 244 | 2 | 4 |
| P20 | 10 Nov | Business Show eve | 243 | 250 | 7 | **new** |
| P20 | 15, 16 Nov | Muse | 255, 246 | 255 | 0, 9 | 19, 11 |
| P20 | 17 Nov | Noah Kahan | 251 | 257 | 6 | 10 |
| P20 | 24, 25 Nov | London Build | 257, 262 | 278 | 21, 16 | 26, 2 |
| P20 | 30 Nov | Mariah Carey | 260 | 297 | 37 | 44 |
| P20 | 1, 2 Dec | Phoebe Bridgers | 267, 283 | 302 | 36, 20 | 43, 22 |
| P20 | 16 Dec | O2 run / Horse Show eve | 273 | 303 (clean week) | 30 | 36 |
| P20 | 20 Jan | Bett | 272 | 272 (clean week) | 0 | **new** |
| | | | | **P20** | **12 nights / £184** | 11 / £218 |
| P04 | 3, 5 Nov | Stevie Wonder | 165, 163 | 166 | 1, 3 | **new** |
| P04 | 10 Nov | Business Show eve | 165 | 186 | 21 | **new** |
| P04 | 18, 19 Nov | Vet Show (already +25%) | 210, 211 | 219 | 9, 8 | 10, 8 |
| P04 | 8 Dec | Kehlani | 207 | 210 | 3 | 4 |
| P04 | 16 Dec | O2 run / Horse Show eve | 208 | 209 | 1 | 2 |
| P04 | 19 Jan | Bett eve | 183 | 184 | 1 | 1 |
| | | | | **P04** | **8 nights / £47** | 6 / £44 |
| P11 | 23 Dec | Darts | 348 | 348 | 0 | **new** |
| P11 | 3 Jan | Darts final | 195 | 203 (clean week) | 8 | 4 |
| P13 | 8 Nov | England v Australia | 158 | 158 | 0 | 2 |
| | | | | **Actionable total** | **23 nights / £239** (4 of them level at £0) | 21 / £273 |
| P11 | 13–17 Dec | Darts round one (**policy-settled, numbers only**) | 260, 235, 236, 250, 269 | 311 | 51, 76, 75, 61, 42 = £305 | £208 |

**Script total: 28 nights / £544** (26 Oct: 26 / £481). Excluding the policy-settled P11 13–17 Dec, the total is **23 nights / £239 vs 21 / £273**. That is like-for-like: same event list and method.

- **Dropped off:**
  - P08 6–7 Nov Arsenal (now 213/211 vs 203).
  - P20 18 Nov (level, 260 vs 260).
  - P04 24 Nov (+25% override; 216 vs 214).
- **New:** P20 10 Nov (£7), P04 10 Nov (£21), P04 3 / 5 Nov (£4), plus level nights P20 20 Jan and P11 23 Dec.
  - P04 10 Nov: 11–13 Nov jumped 167 → 208–214 overnight while 10 Nov stayed at 165. No override explains it (1–17 Nov is −3% for all those nights, per `get_listing_date_overrides`).
  - The 10 Nov gap is therefore an eve-night left behind, not a market signal.
- **Biggest actionable gaps:** P20 30 Nov – 2 Dec (£93) and P20 24–25 Nov (£37); together 55% of the actionable total. P20 fell 2–8% on nearly every open night since 26 Oct (e.g. 1 Dec 275 → 267, 25 Dec 437 → 347). The fortnights fell too, so the gaps narrowed, not widened.
  - No P20 price log on 26 Oct: only min-stay-2 overrides on 2–5 and 9–12 Nov at 10:20Z.
  - P20 still has the **Aggressive** occupancy profile and default booking recency (`get_customizations` 27 Oct). So the 26 Oct plan item "remove new Aggressive occupancy on P13/P20" is **not done on either listing**.
  - P13 still has last-minute −5% within 14 days, and P13 Aggressive is on.
- **P11 darts (numbers only):** the gap widened £208 → £305.
  - Darts nights fell £3–11.
  - The fortnight rose £12, because 12 Dec rose 339 → 360, 18 Dec 311 → 318, and 23–25 Dec rose about £20.
  - PriceLabs labels 13–17 Dec "Low Demand" (`raw/prices_3064196.json`).
- **Strict fortnight** (no clean-week rule) still flags P20 16–20 Dec (vs 337), P04 16–18 Dec (vs 224), P11 3 Jan (vs 319) and P20 / P04 19–20 Jan. These are mostly comparisons against Christmas nights.

## 4. What changed since 26 Oct
1. **reyhan@ overrides, 26 Oct (`get_user_logs`):**
   - P04: 18–20 Nov and 23–25 Nov **+25%, min stay 2**; 1–17 Nov −3% (was −8%) and 6–22 Dec −3%, both min 3; 21–22 Nov −2%.
   - P13 (both twins + Vrbo): 31 Oct +1%; 31 Oct – 27 Nov −2%; 7–20 Dec −2%, all min stay 2.
   - P11: 28 Oct – 13 Nov and 18–27 Nov −3%, min 2.
   - P09: 26 Oct – 12 Nov −5%.
   - P12: 1–4 Nov −2%; min-stay-only overrides on 12–13 Nov and 22 Nov – 13 Dec.
   - P05: several date overrides (+10% on 29–30 Oct and 6–7 Nov; +5% on 7–8 Dec; fixed-type entries 8–9 Nov, 13–21 Dec, 20–21 Dec).
   - P20: min stay 2 on 2–5 and 9–12 Nov.
2. **P04 min stay 2 conflicts with policy.** The 18–20 Nov and 23–25 Nov overrides set min stay 2. Policy `listing_facts.P04.min_stay_rule` (Corentin, 24 Oct) says P04 must never be open for fewer than 3 nights. This is reported as a conflict with a standing rule, not a new proposal.
3. **P13 lost £22–28 on several event nights** without a matching log:
   - 20–21 Nov England v NZ: 227/228 → 200/200.
   - 10 Nov: 185 → 159.
   - 25 Nov: 216 → 188.
   - The only log is −2%. The rest is consistent with Aggressive occupancy plus last-minute crossing the 16–30-day band (P13 occupancy next-30 is 40%, so the band gives −10%). This is inference.
4. **P13 NYE list −13%:** see §2b.
5. **P08:** up about £25 a night on 28 Oct – 7 Nov, so Arsenal v Hull is now priced. P08 customizations NOT CHECKED.
6. **P12:** up £5–22 on most open nights (e.g. 25 Nov 250 → 272, 13 Nov 274 → 291). 4–7 Dec is booked.
7. **P05:** large moves. Up on 13–21 Dec (e.g. 14 Dec 493 → 578); down on 7–8 Dec (792 → 512, 751 → 504) and 16–17 Nov (500 → 427, 548 → 444). These are consistent with reyhan's 26 Oct P05 overrides. The exact override values on the fixed-type entries are not in the log payload: NOT CHECKED.

Data gaps:
1. **market.csv:** only P13 has a 27 Oct row (comp-west); all other P50/P75 are 26 Oct. All are Airbnb-derived Nearby-Listings percentiles: not comps, horizon unstated, cleaning inclusion unstated. That is a weak benchmark for Booking.com-only P11.
2. **NYE market check:** done only for the Shepherd's Bush 2–3 BR band. P20 (Canary Wharf), P11 and P05 NYE market positions are NOT CHECKED.
   - `booked_50_percentile_price` is not documented as including or excluding length-of-stay discounts.
3. **P13 NYE booking:** the PriceLabs/Smoobu list at the time of booking, the guest count, the extra-guest fee and the Airbnb payout breakdown are NOT CHECKED. The £143 gap is against today's list.
4. **Customization changes are not in `get_user_logs`.** So the P13 NYE drop, the P20 2–8% fall, the P04 11–13 Nov jump and the P08 rise are unattributed. Customizations were checked only on P13 and P20.
5. **PriceLabs sync:** P13 27 Dec – 2 Jan is still open in PriceLabs. P01 was last refreshed 26 Oct 07:52Z and P20 10:20Z, so later changes are not in those prices.
6. **Events:** re-checked today only through domain-restricted search summaries (darts, Mariah Carey, Phoebe Bridgers, ExCeL Business / Vet / London Build, NYE). The rest are carried from 24–26 Oct. Attendance is stated only for darts (180,000 tickets) and London Build (25,000+ visitors, from the indexed organiser text).
7. **Unmapped:** P12 and P20 are not in the VENUES map; P15–P19 have no PriceLabs listing.
