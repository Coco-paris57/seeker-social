## PriceLabs audit (D = 2026-10-21)

**Scope.** There are 16 priced listings: 14 through Smoobu (P01, P02, P04-new, P05–P14, P20) and 2 through Channex (P03, P04). P15–P19 have no PriceLabs listing.

**Sources:**
- Snapshot `data/snapshots/2026-10-21/` (`prices.csv`, `listings.csv`, `reservations.csv`, `raw/*.json`), written at about 06:06Z.
- `reports/2026-10-21/kpi_pack.json`, `data/id_map.json`, `data/policy.json` and `build/properties.py`.
- The 20 Oct snapshot and `reports/2026-10-20/sections/pricelabs.md`, used for the diff.
- Live read-only PriceLabs calls at about 06:10Z:
  - `get_listing_data` (syncing listings)
  - `get_user_logs` (listing, group and account, 19–21 Oct)
  - `get_listing_prices` (3562176, 3090701)
  - `get_listing_date_overrides` (3562176, the Channex P04 listing, 3064856, 3090701, 3166592, 3547481)
  - `get_customizations` (3562176 and the Channex P04 listing, including switched-off settings)
  - `get_listing_neighborhood_market` (P05, P04)

**Nothing was changed.**

**Policy respected:**
- P02, P03, P06 and P07 blocks are not raised.
- P14 numbers are reported only.
- P13 (3064856 + 3090701) is one flat.
- P05 is benchmarked against 4-bed listings.
- Stay discounts, the Booking.com +20% markup and stacked promotions are not raised.

### Changes since 20 Oct (`get_user_logs`; no group- or account-level changes; nothing logged on 21 Oct)
| Time (Z, 20 Oct) | Who | Change |
|---|---|---|
| 09:26:47 | reyhan@ | P05 3166592 base **£500 → £550** (source "reviewPrices") |
| 09:29:20–09:29:46 | reyhan@ | P13 3064856 **+10%**, min stay 2, on 31 Oct–3 Nov, 8–12 Nov and 17–18 Nov. Copied to 3090701 and to Vrbo 12037152. |
| 09:30:04 | reyhan@ | **P13 1 Dec +50%, min stay 1** on 3064856, 3090701 and Vrbo 12037152. **This is not in `policy.json` `price_changes`.** |
| 10:32:25 | reyhan@ | **Smoobu 3562176 "Barking" mapped as a child of the Channex P04 listing.** It copied min £90, base £220, max £2000 and all date overrides (DSOs). |
| 10:32:55 | reyhan@ | **3562176 price sync switched ON** |
| 11:29:26 | reyhan@ | 3562176 only: 1–24 Nov override set to **−5%**, min stay 3. This replaced the copied +150% min-stay-1 on 1 Nov, −8% on 2–6 Nov and −3% on 7–24 Nov. **The Channex listing was not changed.** |

---

### CRITICAL

**1. P04 Barking: two channel managers push prices for the same unit, and their calendars disagree.**

*Facts:*
- **Four PriceLabs listings for one flat** (live `get_listing_data`):

  | Listing | Push | Last push | Occupancy next 30 |
  |---|---|---|---|
  | Channex `7dc96cda…6bc10c0` | on | 2026-10-20 11:29:59Z | 50% |
  | Smoobu `3562176` (new) | on | 2026-10-20 11:30:09Z | 30% |
  | Vrbo copy 12038555 | on | 2026-10-20 11:29:59Z | 100% ("Fully Blocked") |
  | Old Smoobu `3254047` | off | never | — |

- **Settings and customizations are identical** on the Channex listing and 3562176:
  - min £90 / base £220 / max £2000;
  - last-minute 25% gradual within 15 days;
  - far-out +30% after 150 days;
  - demand factor "Moderately Conservative";
  - occupancy profile "Aggressive";
  - booking-recency factor at default.
- **Smoobu really carries 3562176's prices.** `smoobu_price` in `prices.csv` equals the live 3562176 `get_listing_prices` price on **all 60 dates** (22 Oct–20 Dec).
- **The pack's "17 sync issues" are not a push failure.** They compare the Channex PriceLabs price against the rate of a different PriceLabs listing (3562176). The gaps come from the DSO Reyhan changed at 11:29Z, on 3562176 only.

*Same Booking.com reservations on both sides:*
- On 20 Oct, Smoobu 3562176 imported **all six Booking.com reservations** that the Channex listing holds (`reservations.csv`: `booked_on` = 2026-10-20 for every row).
- Each total equals Channex's ADR × nights:

  | Stay | Smoobu total | Channex ADR × nights |
  |---|---|---|
  | 22–25 Oct | £360.54 | 3 × £120.18 |
  | 26 Oct–1 Nov | £723.91 | 6 × £120.65 |
  | 2–7 Nov | £682.02 | 5 × £136.40 |
  | 25 Nov–2 Dec | £1,056.90 | 7 × £150.99 |
  | 3–6 Dec | £346.05 | 3 × £115.35 |
  | 20 Dec–2 Jan | £2,417.34 | 13 × £185.95 |

- So Smoobu now has a Booking.com connection to the same Booking.com property that Channex's bookings came from.
- Whether Channex is still connected to Booking.com, Airbnb or anything else is **UNKNOWN**. PriceLabs exposes channel listing ids only for Vrbo listings (`raw/listing_data.json`).

*Calendars are NOT in sync:*
- **2–6 Nov (5 nights).** On Channex these nights are Booked: a Booking.com stay checking in 2 Nov, booked 2026-09-18, ADR £136.40. In Smoobu the same reservation, **2–7 Nov £682.02, is "cancelled"**, and 3562176 shows the nights **open and bookable** at £167 / £170 / £172 / £149 / £149, min stay 3.
  - This one reservation explains the whole occupancy gap: 50% vs 30% = 5–6 nights.
  - The pack cannot see this mismatch, because `prices.csv` `available` comes from the Channex listing.
- **1 Nov.** Open on both, but Channex prices it at **£475, min stay 1** (+150% orphan DSO). Smoobu has **£162, min stay 3**.
- **7–24 Nov.** Smoobu is £2–£4 lower on all 18 nights:
  - over £2 on 16 nights: 7–15, 17–18 and 20–24 Nov;
  - exactly £2 on 16 and 19 Nov.
  - Examples (Channex → Smoobu): 7 Nov £152→£149, 20 Nov £185→£181, 24 Nov £172→£168.
- **2 Dec.** £551, min stay 1 (+200%) on both.
- **Booked nights 22 Oct–4 Nov.** Smoobu is about 7–10% lower (e.g. 22 Oct £150 vs £135). Booked nights cannot be sold, so this has no commercial effect. A likely contributor is the occupancy-based adjustment acting on 50% vs 30% occupancy; the per-factor breakdown is not exposed.

*What the evidence supports:*
- Reyhan's 11:29Z edit, made only on 3562176, removed the 1 Nov orphan premium. That is consistent with knowing 2–6 Nov is free again, and it points to the Smoobu side holding the current state.
- **Which listing to keep:** the evidence favours **Smoobu 3562176** (cause not proven):
  - it holds the current Booking.com reservation state, including the cancellation;
  - it is where the latest edit was made;
  - it matches the rest of the portfolio (Smoobu is the booking engine in `build/properties.py`);
  - `id_map.json` already maps P04 to `smoobu: 3562176`.
- **Do not switch off the Channex push until three facts are confirmed:**
  - (a) In the Booking.com extranet, which connectivity provider the Barking property uses now, and whether reservation **2–7 Nov (£682.02)** is cancelled.
  - (b) Which OTAs, if any, the Channex property still serves. Smoobu has no Airbnb reservation for P04 in the 365-day pull, so P04's Airbnb route is UNKNOWN.
  - (c) That Smoobu 3562176 is connected to every channel P04 sells on.
- **Risk if both stay on:**
  - If the cancellation is wrong, Smoobu is selling 5 booked nights, so a double booking is possible.
  - If the cancellation is right, any channel still fed by Channex has 2–6 Nov wrongly closed, and 1 Nov is priced at £475 for 1 night instead of £162.

*Check in PriceLabs:*
- Channex `7dc96cda…` → Sync toggle, and its DSOs on 1 Nov (+150%), 2–6 Nov (−8%) and 7–24 Nov (−3%), which now diverge from 3562176's −5%.
- 3562176 → Calendar 2–6 Nov (open).
- Vrbo 12038555 → push on while fully blocked.

**2. P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, last push 2026-02-24T07:31:33Z (239 days ago).** Unchanged (live `get_listing_data`). The P02 block itself is intentional and not raised.
- **Check:** PriceLabs → Vrbo 4438728 → sync status. Is the listing still live, or should push be switched off?

### HIGH

**3. Calendar-open check: Smoobu "Blocked channel" blocks on P01, P08, P09 and P10 are now live in PriceLabs. They are not in `policy.json`, and the reason is unknown.**

*Open question for Corentin. No price moves are proposed for these dates.*

- **Source of the blocks** (coordinator note, verified from the Smoobu API, dates only): created in Smoobu on **19 Oct 2026, 17:33–17:36Z**, as "Blocked channel":
  - **P08:** 14 Nov 2026 → 30 Jun 2028
  - **P10:** 19 Nov 2026 → 31 Aug 2028
  - **P09:** 27 Nov 2026 → 23 Apr 2027
  - **P01:** 30 Nov–18 Dec 2026, and 21 Dec 2026 → 30 Sep 2028
- **In PriceLabs,** the blocks show as "Blocked" in the 21 Oct snapshot (`prices.csv`, window to 20 Dec):

  | Ref | Blocked nights | Dates in window | List prices on those nights |
  |---|---|---|---|
  | P08 | 37 | 14 Nov–20 Dec | £9,541 |
  | P10 | 32 | 19 Nov–20 Dec | £5,579 |
  | P09 | 24 | 27 Nov–20 Dec | £4,692 |
  | P01 | 18 | 30 Nov–17 Dec | £5,138 |

  - List prices are given for scale only, not as lost revenue.
  - P01's 18 Dec is a booking check-in, not a block.
- **Timing:** the 19 Oct and 20 Oct snapshots (taken about 06:06Z) still showed all of these dates **open**. The blocks reached PriceLabs at its 20 Oct recalculation (`last_refreshed_at` 08:41–09:03Z), about 15 h after they were created in Smoobu.
- **Also new and not covered by the note:** **P09 25 Oct** is Blocked (one night, £171). The reason is UNKNOWN.
- **No reservation behind any of them:** `reservations.csv` has none on these dates (P08's last stay is 8–14 Nov; P09's is 15–27 Nov), and PriceLabs has no log entry.
- **Effect on the pack:** it measures only 30 days, so it shows P08 at 21% blocked and P09 / P10 at 3%. PriceLabs counts the blocks as occupancy: P08 shows 78% for the next 60 days live, against 34% booked for the next 30 in the pack, and P10 shows 100% for the next 60 days.
- **Questions:**
  - Are these intentional (long let, owner use, delisting)?
  - Does "Blocked channel" close every OTA or only one?
  - If intentional, should they be added to `policy.json` so they are excluded from occupancy and opportunity findings?

**4. P20 Waterford Court (3547481): occupancy is still about half the market's, and prices fell back overnight with no logged change.**
- **Settings (live):** min £220 / base £350 / max £1800. Recommended base "Unavailable". Last push 2026-10-20 08:41:12Z; sync is on.
- **Occupancy (live):** 17% for the next 30 days vs 34% market; 8% for the next 60 days vs 26%. The pack's `forward_occ_30` is 0.103.
- **Overnight moves, 20 → 21 Oct,** all in the algorithm's price before customizations (`uncustomized_price`):
  - 25 Oct–3 Nov fell 3–9%: £272/£267/£267/£266/£293/£298/£303/£316/£316/£327 → £259/£256/£247/£252/£268/£277/£285/£300/£307/£299. This takes back roughly half of the +15–18% rise on 19→20 Oct.
  - 9 Nov **£243 → £267** (+10%).
  - 19 Nov £293 → £268 (−8.5%).
  - 19 Dec £404 → £366 (−9.4%).
  - Across all 56 shared open nights the average went £309 → £302 (−2.4%).
- **Ruled out:** user changes (no P20 log entries 19–21 Oct) and DSO edits (overrides unchanged: −4% on 21–31 Oct and −2% on 1–30 Nov, min stay 3, last updated 2026-10-17).
- **Floor/cap:** 0 of 57 open nights at the £220 minimum or at the maximum (pack `bounds`).
- **Not re-measured today:** base vs market (yesterday's live 2-bed P50 was £260 and P75 £321, so base £350 was +35% / +9%). `market.csv` is missing.
- **Check:** PriceLabs → 3547481 → Base Price, and the price breakdown on 9 Nov and 1 Nov.

### MEDIUM

**5. P05 St John's Wood: the base of £550 is live and prices rose about 10%.**
- **Live settings:** base £550, min £150, max £2500, 4 bedrooms, recommended base £464 (was £467).
- **Pushed** at 2026-10-20 09:27:16Z, 29 s after the change. Smoobu = PriceLabs on every open night.
- **Price move:** on the 22 open nights shared with 20 Oct, the average went **£492 → £540 (+9.7%)** and every night rose by more than 5%. Examples:
  - 28 Oct £386 → £423
  - 6 Nov £546 → £601
  - 16 Nov £406 → £454
  - 30 Nov £454 → £505
  - 7 Dec £737 → £788
  - 19 Dec £614 → £668
- **Most of the rise is in the algorithm's price before customizations,** not in overrides (e.g. 28 Oct £458 → £496).
- **Against 19 Oct:** prices are back to roughly that day's level (£547 on 21 nights), i.e. they recover the 19→20 Oct fall.
- **4-bed market** (live, 90 listings): P25 £483, P50 £591, P75 £713, P90 £1146.
  - Base £550 is **−7% vs P50** and −23% vs P75.
  - Date-matched open nights, 22 Oct–20 Nov: £483 vs P50 £549 (above P50 on 2 of 9 nights).
  - 21 Nov–20 Dec: £581 vs P50 £647 (above P50 on 2 of 14).
  - Occupancy for the next 30 days is 70% vs a 37% market.
- **Still in place:** the +100% / min-stay-1 override on 29 Dec (outside the window, price UNKNOWN).
- **Unchanged:** 27 Oct is Blocked, reason UNKNOWN.

**6. P13: the +10% overrides are live on both listings; one more premium was added.**
- **Overrides:** `get_listing_date_overrides` on **3064856 and 3090701** both show +10%, min stay 2, on 31 Oct–3 Nov, 8–12 Nov and 17–18 Nov (updated 2026-10-20 09:29:20–09:29:46Z). Both pushed at 2026-10-20 09:30:52Z.
- **3064856 price moves** (20 Oct → 21 Oct):

  | Night | Before | After |
  |---|---|---|
  | 31 Oct | £189 | £204 |
  | 1 Nov | £172 | £186 |
  | 2 Nov | £176 | £214 |
  | 3 Nov | £181 | £200 |
  | 8 Nov | £197 | £217 |
  | 9 Nov | £179 | £198 |
  | 10 Nov | £197 | £218 |
  | 11 Nov | £184 | £202 |
  | 12 Nov | £197 | £217 |
  | 17 Nov | £192 | £211 |
  | 18 Nov | £194 | £214 |

  - 2 Nov's +22% includes a rise in the algorithm's price before customizations (£149 → £175).
- **3090701 live** (same nights): 31 Oct–3 Nov £215/£196/£226/£211; 8–12 Nov £241/£220/£242/£225/£241; 17–18 Nov £235/£238.
- **Unlisted change:** **1 Dec +50%, min stay 1** (09:30:04Z). 1 Dec was closed on 20 Oct; now it is a 1-night opening at **£344** on both listings (algorithm price £234 / £212).
- **Fact to note:** the two Smoobu listings of the one flat carry different prices, e.g. 8 Nov £217 (3064856) vs £241 (3090701).
- **Question:** which listing feeds which OTA?

**7. Push freshness: everything is fresh, apart from item 2.**
- At 06:10Z every push-enabled listing had pushed within 24 h:
  - 2026-10-20 06:21Z–11:30Z;
  - P02 at 2026-10-21 00:23:32Z;
  - P03 at 02:53:07Z.
- **They pass 24 h today at these times (Z):**

  | Time | Listing(s) |
  |---|---|
  | 06:21 | P07 |
  | 06:33 / 06:36 | P12 Vrbo / P12 |
  | 06:42 | P11 Vrbo |
  | 06:58 | P14 |
  | 07:15 | P11 |
  | 08:41 | P08, P20, P10 |
  | 09:03 | P01, P09, P06 |
  | 09:27 | P05 |
  | 09:30 / 09:34 | P13 / P13 Vrbo |
  | 11:29–11:30 | P04 Channex, P04 Vrbo copy, 3562176 |

- Sync is on everywhere, so none of these is critical.
- **Check** after 11:30Z.

**8. Orphan nights pinned with premium overrides** (live DSOs; prices from `prices.csv`; the pack's `gaps` field is empty):

| Ref | Night | Override | Price | Change since 20 Oct |
|---|---|---|---|---|
| P04 (Channex) | 1 Nov | +150%, min stay 1 | £475 | — (Smoobu side is £162) |
| P04 (both) | 2 Dec | +200%, min stay 1 | £551 | — |
| P11 | 18 Nov | +30%, min stay 1 | £318 | — |
| P11 | 27 Nov | +60%, min stay 1 | £595 | — |
| P12 | 17 Nov | +50%, min stay 1 | £369 | was £373 |
| P13 | 22 Oct | +40%, min stay 1 | £192 | was £199 |
| P13 | 1 Dec | +50%, min stay 1 | £344 | new |
| P05 | 28–30 Oct | +15%, min stay 2 | £423 / £422 / £413 | — |
| P05 | 16–17 Nov | +15%, min stay 2 | £454 / £505 | — |
| P05 | 7–8 Dec | +40%, min stay 2 | £788 / £774 | — |

- **New unsellable orphan: P12, 22 Oct.** One open night at £188 with **min stay 2**, between today and a 23 Oct check-in. It cannot sell unless min stay drops to 1.
- **Other short gaps:** P13 25–26 Oct (2 nights, £162 / £168, min stay 2) and P06 5–7 Nov (3 nights, £253 / £281 / £285).
- **Check:** whether premiums on orphan nights are intended. A gap-fill rule would discount these nights instead.

**9. P06: its 3 open nights fell 12% overnight.**
- 5–7 Nov: £288 / £319 / £327 → £253 / £281 / £285.
- The whole fall is in the algorithm's price before customizations; no log entry.
- At the £200 floor: 0 of 3 nights.

**10. The info pack (`build/properties.py`) is out of date** (unchanged; most likely the pack is simply stale, not PriceLabs wrong).
- **P05:** the pack says "5-bed", base £455, high £780; PriceLabs has 4 bedrooms, base £550, max £2500.
- **P04:** the pack's min £90 and base £220 match; the pack's high is £450 vs a PriceLabs max of £2000.
- **Other base differences** (pack → PriceLabs):
  - P01: £230 → £253
  - P06: £340 → £357
  - P09: £160 → £176
  - P11: £260 → £286
  - P12: £270 → £284
  - P14: £475 → £525 (min £400 → £500)
- **P20** is not in the pack.

### Other checks
- **Floor/ceiling** (`kpi_pack.json` `bounds`; 60-day window only):
  - At min: P14 65% (39 of 60, special setup, numbers only). Every other listing is 0%.
  - At max: 0% everywhere.
- **Base vs market:** `market.csv` is missing (pack `missing.market` = "empty"). Live checks were done only for:
  - **P05:** see item 5.
  - **P04, 2-bed** (60 listings: P25 £127, P50 £165, P75 £219, P90 £303). Base £220 is +33% vs P50 and +0.5% vs P75.
    - Open nights 22 Oct–20 Nov average £172 vs date-matched P50 £176.
    - 21 Nov–20 Dec average £207 vs P50 £181, above P50 on 15 of 19 nights.
    - Both averages include the 1 Nov £475 and 2 Dec £551 orphans.
- **Minimum stay vs policy (2–3 nights):** every open night is 2 or 3 nights, except:
  - the 1-night orphans in item 8;
  - P14's 4-night weekends and 5 nights on 20 Dec (special setup);
  - **P20: 4 nights on 4–6 Dec, 11–13 Dec and 18–20 Dec.** P20 has no DSO on those dates, so the source is UNKNOWN.

  The 5- and 7-night rules start on 21 Dec, after the snapshot window, so they were not testable.
- **Hygiene, unchanged:**
  - Channex copies of P01, P08, P09 and P10 have push off.
  - Three unmatched Vrbo listings at Marylebone coordinates have push off.
  - P13 has two Vrbo copies with push off and one (12037152) pushing.
  - P15–P19 have no PriceLabs listing.
  - `id_map.json` P04 note says 3562176 "appeared 21 Oct", but `smoobu_since` and the PriceLabs logs say 20 Oct.

Data gaps:
1. `market.csv` is absent, so `market_percentiles` and `avg_open_price_next30` percentiles are null. Only P05 and P04 were benchmarked live today; P20's market gap is from 20 Oct.
2. `prices.csv` covers 22 Oct–20 Dec only. The 180-day floor/ceiling check, the 5- and 7-night rules, and the P05 29 Dec price could not be tested.
3. Smoobu availability is not captured. `prices.csv` `available` and `booking_status` come from PriceLabs (Channex for P04). Smoobu's open/closed state for 3562176 was read from live `get_listing_prices`, not from Smoobu itself.
4. Which OTA listings the Channex P04 property and Smoobu 3562176 are connected to, and Booking.com's connectivity provider for Barking, are UNKNOWN (not exposed by PriceLabs; no Booking.com or Airbnb data in the repo).
5. The true status of the Booking.com reservation for 2–7 Nov (£682.02) is UNKNOWN: Smoobu says cancelled, while PriceLabs/Channex shows booked.
6. Booking.com rates (×1.2) and Channex OTA rates are not in the snapshot.
7. Per-date factor breakdowns, needed to explain the P20, P06 and P05 moves, are not exposed by the read-only tools. Recommended base is "Unavailable" for P20 and 3562176.
8. 3090701 prices are not in the snapshot (read live today).
9. The reason for the 19 Oct Smoobu "Blocked channel" blocks (P01, P08, P09, P10) and for P09 25 Oct is unknown (awaiting Corentin). Blocks beyond 20 Dec are not in the snapshot.
