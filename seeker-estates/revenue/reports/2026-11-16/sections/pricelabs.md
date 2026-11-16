## PriceLabs audit (D = 2026-11-16)

**Sources**
- Snapshot `data/snapshots/2026-11-16/`: `raw/prices_*.json` (window 17 Nov 2026-15 Jan 2027), `raw/listing_data.json`, `listings.csv`, `prices.csv`, `reservations.csv` (716 rows). Yesterday: `data/snapshots/2026-11-15/` (raw, `market.csv`) and `reports/2026-11-15/`.
- `kpi_pack.json`: `sync_issues` is [] for every ref; `bounds` exists for P04, P05, P06, P11, P12, P13, P14 and P20; `gaps` = P20 26 Dec only; `market_percentiles` is null for every ref.
- Live PriceLabs reads, 16 Nov about 07:05-07:22Z, one call at a time:
  - `get_user_logs` for listing, group and account, 15-16 Nov.
  - `get_listing_date_overrides`: P04, P20, P06, P05, P13 3064856, P13 3090701 (December), P11 and P12.
  - `get_listing_prices`: P04 16 Nov-20 Dec; P05 10-18 Feb 2027; P06 and P20 16-17 Nov.
  - `get_listing_data` (all 20 listings).
  - `get_customizations` for P11, P04, P05 and P20 (occupancy, booking recency, last-minute, far-out).
  - `get_listing_neighborhood_market` for P04.
- Live Smoobu GETs:
  - `/api/rates` for 15 apartments, 16 Nov 2026-15 May 2027, taken **07:18:38Z**.
  - `/api/reservations` modified since 15 Nov, taken 07:18:39Z, 4 records. Guest fields were dropped before saving.
  - Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live16pl/` with the scripts `sync.py`, `an16.py` (a-discount-cut), `an2.py` (floor, ceiling and orphans) and `diff.py` (Smoobu change since 15 Nov).
- Smoobu times are given as Smoobu shows them. They are taken as UTC+1, which is not verified.
- Policy respected:
  - Blocks P02/P03/P06/P07: P06 gets numbers only.
  - P14 is a special setup and P13 is one flat.
  - Handbacks: P12 last night is 13 Dec; P01, P08, P09 and P10 are not inventory.
  - Stay discounts of 15% / 20% are policy.
  - Deprioritised items (P04 2 Dec, P12 17 Nov) are not raised.
  - Reyhan's edits are reported as conflicts for Corentin, not as new proposals.
- **Field note:** on near dates and on dates edited last night, `user_price` / `booked_price` on open nights still carries the previous refresh's value. For example, P11 8 Dec shows `user_price` 199 against `price` 308. Smoobu equals `price` on every open night. So `price` is what is pushed, and every "PriceLabs" figure below is `price`.

### Changes since 15 Nov 06:00Z
**Reyhan made 25 date-specific override (DSO) edits on 15 Nov, 18:47:37-19:17:38Z.** These are 16 on Smoobu listings plus 9 copies to Vrbo and the P13 child. Group and account logs are empty. Base, min, max and push are unchanged on all 20 listings (`get_listing_data`). The pull note "no changes" covers only base/min/max/push. Values below are the live overrides; "was" values come from the 15 Nov section and overrides.

| Time (Z) | Ref | Dates | Now | Was | Smoobu effect (16 Nov 07:18Z vs 15 Nov 07:21Z) |
|---|---|---|---|---|---|
| 18:47:37 | P12 2699998 (+Vrbo) | 17-20 Nov | 0%, min 2 | +5% | 259/255/265/310 = £1,089 |
| 18:47:42 | P12 | 30 Nov-3 Dec | 0%, min 2 | +5% | 255/285/287/294 = £1,121 (was £1,170) |
| 18:48:12 | P11 3064196 (+Vrbo) | 18-19 Nov | **+10%**, min 2 | UNKNOWN | 169/195 (was 153/177) |
| 18:48:18 | P11 | 22 Nov-2 Dec, 5-7 and 9-13 Dec | **-5%**, min 3 | -3% | 22-27 Nov 201/191/199/204/219/271 (about -2%) |
| 18:48:27 | P11 | 3-4 Dec | 0%, **min 2** | -3%, min 3 | 270/328 |
| 18:48:33 | P11 | 8 Dec | **+50%, min 1** | UNKNOWN (min 3) | **£308** (was £199) |
| 18:48:42 / 52 | P11 | 14-15 Dec min 3; 16-18 Dec min 2 | 0% | -3% | 220/227/222/242/295 |
| 19:12:34 | P13 3064856 + 3090701 + Vrbo | 10-26 Dec | **0%**, min 3 | -5% (Reyhan, 11 Nov) | 3064856 +1.4%, 3090701 +8.9% on 9 open nights |
| 19:14:04 | P05 3166592 | 29 Nov-2 Dec | 0%, min 3 | -5% | 496/488/523/533 = £2,040 |
| 19:14:14 / 20 | P05 | 4-31 Jan (min 3), 1-28 Feb (min 4) | -5% | UNKNOWN | Jan +6.0% (£9,668 -> £10,250, 25 n); Feb +3.9% (£9,778 -> £10,161, 24 n) |
| 19:14:48 | P06 3288517 | 15-23 Nov | 0%, min 2 | -10%, min 2 (23 Nov min 3) | 16-17 Nov 264/268; 22-23 Nov 250/236 |
| 19:16:17 | P20 3547481 | 15-17 Nov | **-2%, min 2** | -5%, 15 Nov min 3 | 16-17 Nov 250/261 (was 200/210, manual) |
| 19:17:38 | P04 3562176 | 18-19 Nov | **+10%, min 2** | -5%, min 3 | 166/168, **min 2** |

Customizations are not logged. P11, P04, P05 and P20 are unchanged: Aggressive occupancy; Booking Recency default (5-15%); last-minute P11/P20 0%, P04 5% gradual, P05 1% gradual within 15 days; far-out +30% after 150 days.

---

### CRITICAL

**C1. P04 18-19 Nov min 2 is now set in PriceLabs itself. It conflicts with the standing P04 rule "never open for fewer than 3 nights". This is for Corentin to confirm or revert, not a new proposal.** (`get_user_logs` 15 Nov 19:17:38Z; live overrides; live `get_listing_prices` 3562176; Smoobu 07:18:38Z; `policy.json` price_changes 24 Oct)
- Yesterday the min 2 was a Smoobu-side write (t-smoobu-manual-1415). Today the DSO is "+10%, min 2" in PriceLabs, PriceLabs shows min 2, and Smoobu shows 166 / 168 at min 2. That is £334 for a 2-night gap, sellable as exactly 18-20 Nov.
- **The +10% does not show in the pushed price.** 166 / 168 is below uncustomized 181 / 192, and the refresh was 19:20:15Z, after the edit. P04 has Aggressive occupancy (0-15 days) and a 5% last-minute discount. Whether they apply on top of a percent DSO is UNKNOWN.
- **Same pattern, lower stakes, on P20 16-17 Nov:** min 2 against policy `listing_facts.P20.min_stay` "3 nights from 25 Oct to 30 Nov". Reyhan set it at 19:16:17Z.
- **Check:** PriceLabs > Barking > Date Specific Overrides, 18-19 Nov. Keep min 2 (and record it in policy) or set min 3. Do the same for Waterford Court 16-17 Nov.

### HIGH

**H1. t-smoobu-manual-1415 is closed. The 15 Nov evening pushes overwrote the manual Smoobu rates, and PriceLabs = Smoobu on every open night.** (live Smoobu rates 07:18:38Z vs raw `price`; live `get_listing_prices` for 16 Nov)
- **The three listings now:**
  - P06 16-17 Nov: **264 / 268** = PriceLabs. The manual rates were 222 / 222 / 233.
  - P20 16-17 Nov: **250 / 261** = PriceLabs. The manual rates were 200 / 200 / 210.
  - P04 18-19 Nov: **166 / 168** = PriceLabs, but min 2 (C1). The manual rates were 175 / 165.
- **Sync check:** 0 nights differ by more than £2 out of 270 open nights, 17 Nov-15 Jan, on all 15 Smoobu listings. Live 16 Nov also matches on P06 and P20. This agrees with `kpi_pack` `sync_issues` [].
- **Open question:** P06 and P20 16-17 Nov are priced well above uncustomized with no price DSO: P06 264 vs 199 (+33%) and 268 vs 223 (+20%); P20 250 vs 186 (+34%) and 261 vs 215 (+21%). The visible customizations cannot add a premium at 0-1 days out (P20: Aggressive occupancy max 0% at 0-15 days, last-minute 0%). Cause: UNKNOWN. Account and group customizations NOT CHECKED. This is the same oddity as yesterday's P06 note.

**H2. t-pl-sync-1511 is fixed, and today's P13 / P05 changes are registered. The new P20 NYE stay is not.** (raw 16 Nov; live P04 / P05; Smoobu reservations 07:18:39Z)

| Item | PriceLabs now | Verdict |
|---|---|---|
| P04 Airbnb 20-24 Nov | 20-23 Nov Booked, `booked_date` 14 Nov (refresh 15 Nov 19:20:15Z) | Registered |
| P13 18-23 Dec Booking.com, cancelled (Smoobu 15 Nov 12:24) | 18-22 Dec open on both twins in PriceLabs and Smoobu | Registered |
| P13 Airbnb 10-13 Dec, **on 3090701** (created 15 Nov 17:08) | 3090701 Booked; 3064856 Blocked (refresh 19:13Z) | Registered on both twins |
| P05 Airbnb 13-17 Feb (created 18:54) | 13-16 Feb Booked, `booked_date` 15 Nov (refresh 19:14:36Z) | Registered |
| **P20 Airbnb 27 Dec-3 Jan** (created **22:58**) | **27 Dec-2 Jan shown OPEN at 352/411/426/433/433/358/361 = £2,774** (min 6/6/5/5/5/3/3). Last refresh is 19:20:15Z, before the booking. | **Not registered** (H3) |

**H3. P20 Waterford Court NYE, 27 Dec-3 Jan: PriceLabs still shows the 7 sold nights as open. They sold at 0.650x the pushed price.** (raw `prices_3547481.json`; Smoobu 162920897)
- **Booking:** Smoobu has the nights unavailable, so there is no double-sale. But P20 `occupancy_next_60` (45%) is understated by 7 nights, and P20 runs Aggressive occupancy pricing.
- **Priced at booking:** the 15 Nov 19:20Z push gave 352 / 411 / 426 / 433 / 433 / 358 / 361 = **£2,774**. The raw 15 Nov values (14 Nov refresh) were 359 / 433 / 440 / 440 / 440 / 396 / 365 = £2,873, so the evening refresh cut the stay by £99 before it sold.
- **Paid:**
  - Room **£1,803.78** = **0.6503x** £2,774, which is exactly 0.765 x 0.85 (that would predict £1,803.79). 0.900 x 0.85 x 0.85 gives the same 0.650, so the two cannot be told apart.
  - Policy expects only the 15% weekly discount: £2,357.90. **£554.12 is unexplained** (a-airbnb-rules). The channel agent owns the breakdown.
  - Commission £302.84 is 15.5% of room plus £150 cleaning.
- **New orphan: 26 Dec**, £300, min 4, unbookable (H6).
- **Check:** PriceLabs > Waterford Court > Sync Now. 27 Dec-2 Jan should show Booked.

**H4. Today's other new stays and the P13 reopening: what PriceLabs priced** (raw 15 / 16 Nov; Smoobu rates 15 Nov 07:21Z; Smoobu price elements)
- **P13 10-13 Dec, 3 n, Airbnb, on 3090701:**
  - PriceLabs = Smoobu at booking was 194 / 209 / 210 = **£613** (15 Nov 06:55Z push, under Reyhan's -5%). Uncustomized was £702. The 3064856 twin was £766 for the same nights.
  - Room **£468.94 = 0.765x** (0.765 x 613 = 468.95): the hidden ≤28-day Airbnb layer, at 25 days out.
  - Without the -5% the stay would have been about £645 of Smoobu price, so about **£25 of room** (assuming the -5% applied multiplicatively).
  - These were a-peak-check's "10-12 Dec +5%" nights. They sold before Reyhan's 19:12Z removal.
- **P13 18-22 Dec reopened** (cancellation of £847.10):
  - 3064856: 226 / 230 / 212 / 214 / 216 = **£1,098**.
  - 3090701: 240 / 244 / 225 / 227 / 229 = **£1,165**.
  - Both at 0% DSO, min 3.
- **P05 13-17 Feb, 4 n, Airbnb, 90 days out:**
  - PriceLabs `booked_price` was 424 / 393 / 403 / 411 = **£1,631**. Smoobu 15 Nov was £1,627.
  - Room **£1,219.98 = 0.748x** = 0.88 (visible early bird 12%, a-p05-earlybird) x 0.85 exactly. The 0.85 layer is unexplained: no LOS discount applies at 4 nights, and the 60+ day tier is 1.000.
  - The stay sold before Reyhan's 19:14:20Z February edit. That edit then lifted the same nights in Smoobu to 437 / 407 / 417 / 425 (+3.4%).

**H5. PriceLabs-side plan items, 16 Nov** (raw 16 Nov; live overrides and customizations; Smoobu 07:18Z; `an16.py`)

| Item | Status | Numbers today (yesterday) |
|---|---|---|
| a-discount-cut | **Not done.** All four target listings still have Aggressive occupancy and Booking Recency default. | **Next 14: £351 (£280). Next 30: £1,296 (£1,445).** Four targets: **£553 / £1,595** (£559 / £1,525). Window is 17-30 Nov / 17 Nov-16 Dec (raw starts 17 Nov). Next 30 by listing: **P05 9 n £531 (-11.0%)**; **P04 14 n £496 (-18.5%)**; **P11 15 n £422 (-10.9%)**; P20 10 n £146 (-5.0%). P12 -£50, P13 3064856 -£81 and 3090701 -£168 are priced above uncustomized. Method as yesterday (`uncustomized - price`, nights open in both systems; P06, P14, handbacks and P04 2 Dec excluded). The 30-day gap fell mainly because the P11 / P20 DSO edits changed prices. |
| a-p12-trim | **Partly done (Reyhan):** +5% -> 0%, not the proposed -5%. | 17-20 Nov 259 / 255 / 265 / 310 = **£1,089** (£1,120), uncustomized £997, min 2. 30 Nov-3 Dec 255 / 285 / 287 / 294 = **£1,121** (£1,170), uncustomized £1,186. |
| a-p05-dec | **Open.** The 21 / 29 Dec and 7-8 / 13-14 Dec DSOs are unchanged (last edits 9 Nov / 30 Oct). | **21 Dec £2,063** (uncustomized £696), min 1. **29 Dec £2,556** (£1,034), min 1. 7-8 Dec 464 / 458 = **£922** (£912). 13-14 Dec 487 / 475 = **£962** (£971). Separately, 29 Nov-2 Dec -5% was removed: £2,040. |
| a-peak-check (P13) | **Partly done:** -5% -> 0% on 10-26 Dec on both twins (19:12:34Z). The 10-12 Dec +5% was not set; 10-12 Dec has since sold (H4). | 23-26 Dec: 3064856 225 / 219 / 220 / 222; 3090701 238 / 232 / 233 / 235 (0%, the level comp-west supported). 13-17 Dec: 3064856 245 / 240 / 237 / 206 / 213; 3090701 245 / 240 / 237 / 218 / 226. |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£301** (£303), min 1, uncustomized £278. DSO +15% unchanged (4 Nov 01:24:21Z). |
| t-p20-5dec-orphan | **Not fixed (day 7)** | 5 Dec **£286** (£298), min 3, uncustomized £374, `unbookable` 1. DSO 0% min 3 unchanged (9 Nov 21:25:55Z). |
| t-p11-8dec-orphan | **Min stay fixed, price not as proposed.** Reyhan set +50% min 1 (18:48:33Z). | 8 Dec is now sellable at **£308** (proposal: keep £199). That is +10% over uncustomized £280. The DSO +50% applies to the already-discounted price (199 / 0.97 x 1.5 = 308). |
| t-smoobu-manual-1415 | **Closed** (H1) | P04 min 2 is now a PriceLabs DSO (C1) |
| t-pl-sync-1511 | **Fixed** (H2) | New gap: P20 27 Dec-2 Jan (H3) |
| P11 darts (Reyhan conflict) | -3% -> 0% on 14-18 Dec | 14-17 Dec 220 / 227 / 222 / 242: **average £227.75** (£221). Policy (21 Oct) says above £300 and +5%. The conflict remains, for Corentin. |

**H6. Orphans and min stay vs policy, next 180 nights** (Smoobu 07:18:38Z, `an2.py`. Policy: 2-3 nights; 5 from 16 Jan; 7 from 16 Mar.)
- **Unsellable 1-night orphans:**
  - **P20 26 Dec**: £300, min 4, new (between the 19-26 Dec and 27 Dec-3 Jan stays). It matches `kpi_pack` `gaps`.
  - **P20 5 Dec**: £286, min 3.
  - **P06 29 Nov**: £243, min 4 (numbers only).
  - **P04 24 Nov**: £143, min 3. Numbers only under the P04 rule.
  - A gap-fill rule (min 1 for 1-night gaps) would sell P20 26 Dec and 5 Dec. `kpi_pack` `gaps` lists only P20 26 Dec.
- **Now sellable:**
  - P11 8 Dec (min 1, £308).
  - P11 2-4 Dec 242 / 270 / 328 (3-4 Dec min 2).
  - P06 22-23 Nov 250 / 236 (min 2).
  - P04 18-19 Nov (min 2, C1).
  - P20 16-17 Nov (min 2).
- **Min 1 inside 2 months:**
  - P12 26 Nov.
  - P13 17 Nov (244 / 207) and 27 Nov (304 / 258).
  - P13 1 Dec: intentional.
  - P11 8 Dec (new).
  - P05 21 and 29 Dec.
  - P04 2 Dec: deprioritised.
- **Above 3 inside 2 months:**
  - P20 26 Dec min 4 (27-31 Dec is now sold).
  - P06 29 Nov min 4.
  - P14 Fri-Sun min 4 (special setup).
- **16 Jan-15 Mar below 5:** P11 44 / 59 open nights; P13 46 / 59 per twin; P05 37 / 52; P20 53 / 59; P04 44 / 59.
- **16 Mar on below 7:** P11, P13 and P20 60 / 60. P05 and P04 are compliant.

**H7. Push freshness at 07:22Z** (live `get_listing_data`)
- **Over 24 h now:** P02 Vrbo `_ca1c…`, last push 24 Feb 2026, push on.
- **Crossing 24 h this morning:** P08 3318167 (pushed 15 Nov 07:27:58Z; handed back) and **P14 3267077 (pushed 07:49:56Z)**.
- **Within 24 h:** every other listing.
  - Evening pushes on 15 Nov, 18:48-19:22Z: P12, P11, both P13 twins, P05, P06, P20 and P04.
  - The P13 Vrbo copy is now fresh (19:22:30Z), so yesterday's 24 h 28 min staleness is cleared.
  - Overnight pushes: P02, P03 (Channex), P07, P01, P10 and P09.
- **Check:** P14 `last_date_pushed` after 08:00Z.

### MEDIUM

**M1. P13 twins are now priced identically on 13-15 Dec and 1 Dec** (Smoobu 07:18Z)
- 13-15 Dec is **245 / 240 / 237 on both twins**. Yesterday it was 233 / 228 / 225 against 186 / 182 / 180.
- 1 Dec is 278 on both (was 279 / 223). The +50% min 1 on 1 Dec is intentional.
- Identical open nights over the next 180 rose from 119 to **125**.
- Policy `listing_facts.P13.twin_listings`: keep the twin prices slightly different. This follows Reyhan's parent-to-child copy at 19:12:34Z.
- **Check:** a DSO of about +3% on 3090701 for 13-15 Dec (t-p13-twins).

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights vs live min / max)
- **P14: 75 of 180 (41.7%) at the £450 min.** `kpi_pack` `bounds` gives 76.7% of the next 60. Special setup: numbers only.
- **Every other listing: 0 at min and 0 at max.**
  - Open nights: P11 152, P13 149 per twin, P04 151, P20 146, P05 127, P12 9 and P06 5.
  - P05 peaks at £2,556 (29 Dec) against a £3,500 max.
  - P20 is no longer at its £200 min: 15-16 Nov was the manual write.
- Overnight drift with no DSO change: P04 6-26 Dec fell 4.9-6.1% (for example 14 Dec £145).

**M3. Base vs market, and Barking "recommended base: Unavailable"** (`data/snapshots/2026-11-15/market.csv`, bedroom-matched; live P04 neighbourhood)

| Ref | Base | vs P50 | vs P75 |
|---|---|---|---|
| P12 | £284 | +37.2% (£207) | +22.4% (£232) |
| P09 | £176 | +32.3% (£133) | +10.0% (£160), row from 9 Nov |
| P20 | £330 | +27.9% (£258) | +1.2% (£326) |
| P04 | £200 | +12.4% (£178); live 2 BR n=89: +14.3% (£175) | -7.4% (£216); live -8.3% (£218) |
| P13 | £250 | +11.6% (£224) | -6.7% (£268) |
| P11 | £286 | -1.7% (£291) | -13.3% (£330) |
| P01 | £253 | -4.9% (£266) | -25.1% (£338) |
| P05 (4 BR) | £550 | -5.8% (£584) | -24.6% (£729) |
| P06 | £357 | -13.3% (£412) | -31.6% (£522) |

- P02, P03, P07, P08, P10 and P14: UNKNOWN (no usable row in `market.csv`). `kpi_pack` `market_percentiles` is null.
- **Barking `recommended_base_price`:**
  - Live `get_listing_data` reads "Unavailable".
  - `listings.csv` shows 221 from 8-14 Nov and blank on 15 Nov.
  - It is the only listing without a recommendation.
  - Market data is present: Nearby Listings, Airbnb source, 350 listings in total, 89 of them 2 BR.
  - Cause: UNKNOWN, and PriceLabs gives no reason. Base 200 is unchanged since Reyhan's 9 Nov 220 -> 200.
  - Question: should PriceLabs support be asked why the recommendation dropped out?

**M4. Listing hygiene and info pack: unchanged** (live `get_listing_data`; `data/id_map.json` last commit 22 Oct; `/home/user/seeker-social/seeker-estates/build/properties.py`)
- **All 20 PriceLabs listings:** push on, none hidden.
- **Vrbo copies push separately:** P11 `_7fd3…`, P12 `_386e…` and P13 `_3d48…`. Last night's DSOs were copied to all three. P02 `_ca1c…` is stale (H7). Question: should the Vrbo copies push?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy, and M1 is a side-effect. The P13 Vrbo copy sits at 51.5089611, -0.2345325.
- **`_unmatched`:** the Marylebone Vrbo listings `_a7f5a076…`, `_4a980bb7…` and `_380ddc1a…` are not among the 20 listings. Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03** is priced via **Channex** (100 / 323 / 1500), pushed 16 Nov 02:51:05Z, fully blocked (intentional).
  - **P15-P19:** no PriceLabs listing (t-unmapped). Question: are they priced elsewhere?
- **Not in the info pack:** P20 3547481 (200 / 330 / 1800). Question: is base 330 or 350?
- **Pack vs PriceLabs:** differences only, because the pack is out of date. They are as on 15 Nov (P04 220 vs 200, P14 min 400 vs 450, and others).

Data gaps:
1. The values Reyhan's 15 Nov edits replaced on P11 18-19 Nov and 8 Dec and on P05 Jan / Feb are UNKNOWN. `get_user_logs` gives only the new values.
2. Why P04 18-19 Nov's +10% DSO does not show in the pushed 166 / 168, and why P06 / P20 16-17 Nov sit 20-34% above uncustomized: UNKNOWN. Account and group customizations are NOT CHECKED.
3. The P20 NYE 0.650x and P05 Feb 0.748x Airbnb breakdowns are NOT CHECKED (channel agent). The Smoobu records again carry "Cancellation Host Fee / Payout" elements on new stays.
4. Customizations for P12, P13 and P06 and overrides for P14 and P09 were not re-read; there are no log entries for them.
5. The 18 Oct base-rise like-for-like recompute (P05 new stay) is not done in this section.
6. Market: `market_percentiles` is null; the P09 row is from 9 Nov; the 16 Nov `neighbourhood_P13.json` was not re-analysed here.
7. Smoobu timestamps are taken as UTC+1 (not verified). Every booking-vs-edit order above holds under UTC+0 too.
