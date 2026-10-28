## PriceLabs audit (D = 2026-10-28)

**Sources**
- Snapshot `data/snapshots/2026-10-28/`:
  - `raw/listing_data.json`, pulled 06:57Z;
  - `raw/prices_*.json`, pulled 06:59-07:20Z. The window is **29 Oct-27 Dec**; 28 Oct is not in the raw files;
  - `prices.csv`, `listings.csv`, `reservations.csv`.
- No `market.csv`. In `reports/2026-10-28/kpi_pack.json`, `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all null. The per-property `checks` are used where cited.
- Baseline is yesterday: `data/snapshots/2026-10-27/raw/*` and `reports/2026-10-27/sections/pricelabs.md`.
- Live read-only PriceLabs calls, ~07:30Z:
  - `get_user_logs` listing / group / account for 27-28 Oct;
  - `get_customizations` with toggled_on=false on all 9 priced Smoobu listings with open nights (3562176, 3166592, 3318167, 3318172, 3064196, 2699998, 3064856, 3090701, 3547481), plus P14 3267077, P01 3320302, P10 3318177 and Smoobu account level (empty);
  - `get_listing_date_overrides` on 3547481, 3064196, 3064856, 3090701, 3562176, 3166592, 2699998, 3318167, 3318172 and 3288517;
  - `get_listings`, full catalog: 20 listings.
- Policy respected:
  - P02/P03/P06/P07 blocks are excluded and P14 is reported as numbers only;
  - not re-raised: P04 2 Dec, P12 17 Nov, P13 1 Dec;
  - nights after the handback dates are excluded.

### What changed since the 27 Oct run
- **Logs.** 24 listing-log entries, all from reyhan@ on **27 Oct**, in two sessions: 11:56-12:15Z and 14:38-14:42Z. Group and account logs are empty. Nothing was logged on 28 Oct up to the call. Every entry is a date-specific override:
  - **P11 3064196**, copied to Vrbo:
    - 18 Nov-16 Dec **-2%, min 3** (11:56:42Z). This replaces the -3% min 2 on 18-27 Nov and overwrites 12-16 Dec;
    - 17-18 Dec **-2%, min 2** (11:56:58Z).
  - **P13 3064856**, copied to 3090701 and Vrbo: 23-26 Dec **-3%, min 3** (11:58:10Z). This takes 25-26 Dec from min 4 to min 3.
  - **P05 3166592:** 6-7 Nov **0%, min 2** (11:59:20Z). The +10% was removed.
  - **P20 3547481**, first session 12:00-12:01Z, then reworked 14:38-14:42Z. Final state:

    | Dates | Override | Min stay |
    |---|---|---|
    | 31 Oct-1 Nov | **+10%** | **2** |
    | 2-5 Nov | -2% | 2 (now booked) |
    | 6-8 Nov | **-10%** | 3 |
    | 9-12 Nov | -2% | **2** |
    | 13-30 Nov | **-10%** | 3 |
    | 1-20 Dec | **-5%** | 3 |

  - **P04 3562176** (12:01Z):

    | Dates | Override | Was | Min stay |
    |---|---|---|---|
    | 1-17 Nov | **-5%** | -3% | 3 |
    | 18-20 Nov | **+15%** | +25% | **2** |
    | 23-25 Nov | **+15%** | +25% | **2** |
    | 6-22 Dec | **-5%** | -3% | 3 |

  - **P06 3288517:** 9-15 Nov, min-stay-only override, min 2 (12:15:47Z).
- **Customizations:** **no change** from the 27 Oct readings on any listing.
- **Calendar.** In PriceLabs, P11 28 Nov-11 Dec went from Booked to open, matching the cancelled £2,950.82 booking.
  - P20 2-5 Nov now shows Booked, and P08 29-30 Oct shows Booked.
  - P05 29-30 Oct changed from open to **Blocked**.
  - P06 8-14 Nov changed from Blocked to status blank, but still has user_price -1 and available=False.

---

### CRITICAL
- **None at pull time (06:57Z). Every listing has `push_enabled` true and a last push under 24 h old** (`listing_data.json`).
- These go critical later today if they do not push again:

  | Time today | Listings |
  |---|---|
  | **09:52Z** | P09 3318172 (last push 27 Oct 09:52:28Z) |
  | ~11:56-12:16Z | P12 2699998, P11 3064196, P13 3064856/3090701, P05 3166592, P04 3562176, P06 3288517, and the Vrbo copies of P11/P12/P13 |
  | 14:42Z | P20 3547481 (last push 27 Oct 14:42:30Z) |

  Re-check `last_date_pushed` after 12:20Z.

### HIGH

**1. P11 darts nights: the override policy says to keep was overwritten with -2%** (`get_listing_date_overrides` 3064196; `get_user_logs` 27 Oct 11:56:42Z / 11:56:58Z; policy `listing_facts.P11.darts_override_24oct` and `price_changes` 21 Oct)
- Policy records two decisions:
  - Corentin raised 13-17 Dec on 21 Oct, to an average above £300/night;
  - "leave the darts override as it is (+5% set by Reyhan 23 Oct)".
- That override is gone:
  - 12-16 Dec is now **-2%, min 3**;
  - 17-18 Dec is now **-2%, min 2**.
- Prices for 13-17 Dec (`raw/prices_3064196.json`, 27 Oct vs 28 Oct):

  | | 13 Dec | 14 | 15 | 16 | 17 | Total | Average |
  |---|---|---|---|---|---|---|---|
  | 27 Oct | £260 | £235 | £236 | £250 | £269 | **£1,250** | |
  | Now | £218 | £198 | £199 | £211 | £228 | **£1,054** | **£211/night** |

  That is **-£196, or -15.7%**. 12 Dec went from £360 to £303 and 18 Dec from £318 to £275.
- The override change accounts for about 7 points of the drop. The rest comes after the cancelled 28 Nov-12 Dec booking reopened 14 nights, so lower occupancy feeds the Aggressive occupancy table. That split is inferred, not decomposed.
- **Check:** PriceLabs 3064196 and the Vrbo copy > Date Specific Overrides > 12-18 Dec. Corentin to confirm whether Reyhan's -2% replaces his darts decision.

**2. P20: discounts deepened twice on 27 Oct. Corentin's 24 Oct -5% has been replaced. Final vs uncustomized for the next 30 days went from -7.7% to -16.9%** (`get_user_logs`, `get_listing_date_overrides` 3547481, `raw/prices_3547481.json` refreshed 27 Oct 14:42:29Z; policy `price_changes` 24 Oct P20 "-5% override 31 Oct-19 Nov")
- The override table is in "What changed" above. On top of it, live `get_customizations` shows:
  - Occupancy **Aggressive**: -20% to -30% inside 15 days at low occupancy;
  - Booking Recency **ON** (default 5-15%);
  - last-minute 0%.
- Open nights, final vs uncustomized:

  | Window | Open nights | Final | Uncustomized | Gap now | 27 Oct, same window |
  |---|---|---|---|---|---|
  | 29 Oct-11 Nov | 8 | £2,073 | £2,571 | **-19.4% (£498)** | -9.3% (£301) |
  | 29 Oct-27 Nov | 22 | £5,501 | £6,617 | **-16.9% (£1,116)** | -7.7% (£557) |

- Example: 13-19 Nov fell from £257/266/255/246/251/260/268 to £237/243/237/236/227/236/243.
- **Even with the +10% override, 31 Oct is £246 against £297 uncustomized.** The customization stack alone is about -25% inside 15 days.
- P20 had its first booking since the flexible-cancellation test: Airbnb 2-6 Nov, made 27 Oct, £733.62 including £150 cleaning (`reservations.csv`).
  - Room £583.62 is 0.587x the PriceLabs price on 26 Oct (£251/250/251/242 = £994).
  - With Reyhan's -2% that is about £974; after Airbnb's 15% last-minute discount (policy `listing_facts.P20.airbnb_discounts_22oct`), about **£828**.
  - That leaves **about £244 (30%) unexplained** by PriceLabs or policy-listed discounts. The exact price pushed at booking time is UNKNOWN: P20's only recorded push is 14:42:30Z and the booking time is not in the CSV.
- **Check:**
  - PriceLabs 3547481 > Date Specific Overrides: 6-8 Nov and 13-30 Nov -10%, 1-20 Dec -5%;
  - Customizations > Occupancy (Aggressive) and Booking Recency: set Custom 0% if a-discount-cut stands;
  - Airbnb reservation price breakdown for 2-6 Nov.

**3. PriceLabs has not seen three new Smoobu bookings, so it still prices booked nights as open** (`raw/prices_3064196.json` and `raw/prices_3064856.json`, both last refreshed 27 Oct 11:58-11:59Z; `prices.csv` available=True; `reservations.csv`)

| Booking (`reservations.csv`) | Booked | Nights shown open in PriceLabs | PriceLabs price |
|---|---|---|---|
| P11 Booking.com 28-31 Oct, £565.38 | 28 Oct | 29-30 Oct | £191 / £209 |
| P11 Booking.com 5-8 Dec, £656.07 | 27 Oct | 5-7 Dec | £319 / £244 / £246 |
| P13 Booking.com 18-27 Nov, £1,143.76 | 27 Oct | 18-26 Nov on both 3064856 and 3090701 | e.g. £182-£200 |

- Consequences:
  - The occupancy-based adjustment (Aggressive, both listings) and Booking Recency work from understated occupancy and booking activity, so they are discounting the remaining nights more than the real calendar justifies;
  - the open-night and gap figures in item 4 exclude these nights by hand.
- Possible causes, none confirmed:
  - no PriceLabs calendar re-sync since the 27 Oct 11:58Z manual refresh (P01, P02, P03, P07, P08, P10 and P14 did refresh overnight; P04, P05, P06, P09, P11, P12, P13 and P20 had not by 06:57Z);
  - a Smoobu-to-PriceLabs reservation sync delay.
- **Check:** PriceLabs 3064196 and 3064856 > Sync Now / Refresh, then confirm 29-30 Oct, 5-7 Dec and 18-26 Nov show Booked.

**4. a-discount-cut: NOT applied. Every customization is unchanged since 27 Oct, and no listing is at Custom 0% on all three settings** (live `get_customizations`, `effective` block)

| Ref | Last-minute | Occupancy | Booking Recency | Seasonality | Demand Factor |
|---|---|---|---|---|---|
| P04 3562176 | -5% gradual, 15 d | Aggressive | ON default | None (off) | **Conservative** |
| P05 3166592 | -1% gradual, 15 d | Aggressive | ON default | None (off) | **Conservative** |
| P08 3318167 | -18% gradual, 15 d | Market Driven (toggle off) | off, so default applies | None | Moderately Aggressive |
| P09 3318172 | -18% gradual, 15 d | Market Driven (toggle off) | off, so default applies | None | Moderately Aggressive |
| P11 3064196 | 0% | Aggressive | ON default | None (off) | None (off) |
| P12 2699998 | 0% | Custom (milder table) | ON default | None | Moderately Conservative |
| P13 3064856 / 3090701 | -5% gradual, 14 d | Aggressive | ON default | **Moderately Conservative (ON)** | **Conservative** |
| P20 3547481 | 0% | Aggressive | ON default | None (off) | None (off) |
| P14 3267077 (special setup) | -25% gradual, 30 d | Market Driven | default | None | None |
| P01 / P10 (0 open nights) | -18% gradual, 15 d | Market Driven | default | None | Moderately Aggressive |

- **Remaining layers against the Custom 0% target:**
  - P04: last-minute, Occupancy and Recency;
  - P05: last-minute -1%, Occupancy and Recency;
  - P08 and P09: last-minute -18% and the default Recency;
  - P11 and P20: Occupancy and Recency;
  - P12: Occupancy (custom table) and Recency;
  - P13: last-minute, Occupancy and Recency.
- **Final vs uncustomized, open nights.** Same windows on both days. 28 Oct is not in raw. Nights booked in Smoobu but missing from PriceLabs (item 3) are excluded.

  | Ref | Next 14 (29 Oct-11 Nov) | 27 Oct | Next 30 (29 Oct-27 Nov) | 27 Oct |
  |---|---|---|---|---|
  | P04 | 11 n £1,751 vs £2,305, **-24.0% (£554)** | -25.4% | 17 n £2,945 vs £3,723, **-20.9% (£778)** | -19.9% |
  | P20 | 8 n £2,073 vs £2,571, **-19.4% (£498)** | -9.3% | 22 n £5,501 vs £6,617, **-16.9% (£1,116)** | -7.7% |
  | P11 | 5 n £939 vs £1,058, -11.2% (£119) | -9.7% | 17 n £3,741 vs £4,278, **-12.6% (£537)** | -12.1% |
  | P05 | 4 n £1,815 vs £2,019, -10.1% (£204) | -10.1% | 6 n £2,691 vs £3,076, **-12.5% (£385)** | -12.1% |
  | P13 3064856 | 8 n £1,211 vs £1,284, -5.7% (£73) | -5.1% | 11 n £1,806 vs £1,915, -5.7% (£109) | -4.6% |
  | P13 3090701 | 8 n £1,469 vs £1,538, -4.5% (£69) | -4.3% | 11 n £2,074 vs £2,198, -5.6% (£124) | -7.3% |
  | P12 | 4 n £955 vs £953, +0.2% | -2.4% | 13 n £3,521 vs £3,603, -2.3% (£82) | -4.8% |
  | P09 | 5 n £704 vs £701, +0.4% | -1.9% | 6 n £862 vs £866, -0.5% | -2.5% |
  | P08 | 3 n £682 vs £685, -0.4% | +0.8% | 3 n (handback 13 Nov) | +0.8% |

- **Total uncustomized minus final:**
  - **next 14 days £1,515** (27 Oct £1,529);
  - **next 30 days £3,138** (27 Oct £3,055).
  - This is an upper bound: both P13 listings are counted, it is not weighted for booking probability, and it mixes customizations, overrides and floors.
- The 30-day total rose because P20's new overrides (+£559) outweighed the P12 and P13 easing.
- **Check in PriceLabs > listing > Customizations:** set each remaining layer to Custom 0% explicitly (not toggle off).

**5. a-p12-2228nov: NOT applied, and the price is further from target** (`get_listing_date_overrides` 2699998: 22 Nov-13 Dec still has min-stay-only overrides and no fixed prices; `raw/prices_2699998.json`)

| | 22 Nov | 23 | 24 | 25 | 26 | 27 | 28 | Total |
|---|---|---|---|---|---|---|---|---|
| Now | £277 | £278 | £258 | £276 | £287 | £299 | £321 | **£1,996** |
| Target (fixed) | £224 | £219 | £220 | £221 | £233 | £246 | £236 | **£1,599** |

- Now is **+24.8% over target**. It was £1,942 on 27 Oct. Uncustomized is £2,161.
- **Check:** PriceLabs 2699998 > Date Specific Overrides > fixed price on 22-28 Nov. Corentin to decide.

**6. Min stay against policy, re-set on 27 Oct after being flagged** (`get_listing_date_overrides`, `get_user_logs`, `prices.csv`)
- **P04 18-19 Nov and 23-24 Nov: min 2.** Re-saved by Reyhan at 12:01:37Z and 12:01:41Z with +15%.
  - These are 2-night gaps priced £192/£194 and £199/£198, next to the bookings on 20-23 Nov and 25 Nov-2 Dec.
  - Policy `listing_facts.P04.min_stay_rule`: never fewer than 3 nights.
- **P20 31 Oct-1 Nov: min 2** (+10%, 14:38:39Z).
  - This is a 2-night gap between the 28-31 Oct and 2-6 Nov bookings, so min 2 is the only way it sells.
- **P20 9-12 Nov: min 2** (12:00:39Z). This is not an orphan gap.
- Policy `listing_facts.P20.min_stay`: 3 nights from 25 Oct to 30 Nov.
- **Check:** Corentin to confirm or revert, especially P20 9-12 Nov and both P04 pairs.

### MEDIUM

**7. a-peak-check: Seasonality / Demand Factor readings** (live `get_customizations`; `raw/prices_*.json`; `raw/neighbourhood_P13.json`)
- **P20:** Seasonality None, Demand Factor None.
  - 21-26 Dec costs £336-£348, 8-9% under uncustomized (£367-£381). No override applies after 20 Dec, so that gap comes from the customizations.
  - 25-26 Dec min 4; 27 Dec min 7 (DSO).
- **P11:** Seasonality None (saved type "recommended", switched off). Demand Factor None (saved "moderately_aggressive", off).
  - 23-25 Dec £321/£315/£316, +3-4% over uncustomized from the +10% override.
- **P05:** Seasonality None. Demand Factor **Conservative**.
  - Open peak nights 18-21 Dec are £649-£689, 0-5% under uncustomized.
- **P13:** Seasonality **Moderately Conservative (ON)**. Demand Factor **Conservative**.
  - 21-26 Dec is £232-£240 on 3064856, 9-13% under uncustomized (£256-£277).
  - **26 Dec dropped from £271 to £240 (3064856) and £227 (3090701)**, while PriceLabs' P13 market insight shows a **+24.4% price surge for 26-31 Dec**. For reference, the 2-bed P75 is £289 (period not stated in the file).
- **P13 25-26 Dec is now min 3, not min 2.** The 27 Dec-3 Jan booking follows, so arrivals on 25 or 26 Dec still cannot be sold. Those nights sell only inside a stay starting 23 or 24 Dec.
  - **Check:** DSO min stay on 25-26 Dec = 2 on 3064856 (it is copied to the child listings).

**8. Push freshness: yesterday's two items are closed** (`listing_data.json`)
- P08 3318167 pushed **28 Oct 06:36:32Z** (it was stuck at 26 Oct 07:48Z).
- P20 3547481 pushed **27 Oct 14:42:30Z**.
- No open-night PriceLabs vs Smoobu difference above £2 on any Smoobu-priced listing (`prices.csv`; the pack's per-property checks agree).
- 3090701 has no Smoobu rates in `prices.csv`: NOT CHECKED.

**9. Orphan gaps and short runs** (open nights in raw, excluding nights booked in Smoobu but missing from PriceLabs)
- **Unsellable at the current minimum:**
  - **P13 17 Nov**, 1 night, £180 / £192, min 2. It sits between the 13-17 Nov and 18-27 Nov bookings;
  - **P13 27 Nov**, 1 night, £233 / £220, min 2. It sits between the 18-27 Nov and 28 Nov-1 Dec bookings;
  - a gap-fill rule (orphan nights min 1) would open both. Whether PriceLabs' orphan-day setting is on is UNKNOWN (not returned by `get_customizations`).
- **Sellable now:**
  - P11 31 Oct-2 Nov £227/£180/£181 (min 2);
  - P11 23-25 Dec £321/£315/£316 (min 3/2/2);
  - P20 31 Oct-1 Nov £246/£248 (item 6);
  - P05 16-17 Nov £430/£446 and 7-8 Dec £512/£503 (min 2);
  - P08 5-7 Nov £213/£234/£235;
  - P09 10-12 Nov £148/£152/£158;
  - P12 12-13 Nov £221/£283.
- **Blocked by policy:** P04 18-19 and 23-24 Nov (item 6).
- The 5-night (2+ months ahead) and 7-night (4+ months ahead) rules cannot be checked: the raw window ends 27 Dec. NOT CHECKED.

**10. Unexplained calendar changes** (`raw/prices_*.json` 27 Oct vs 28 Oct)
- **P05 29-30 Oct is now Blocked.** It was open at £367/£372. Policy explains only the 27-28 Oct block (delivery).
  - Ask: is 29-30 Oct intentional? If not, about £739 of sellable nights is closed.
- **P06 8-14 Nov changed from Blocked to status blank,** with user_price -1 and available=False. Reyhan also added a min-2 override on 9-15 Nov (27 Oct 12:15:47Z).
  - P06 is an intentional block (policy). Ask whether 8-14 Nov is meant to open.

**11. P13 Booking.com 18-27 Nov stack** (context for the overnight ask; `raw/prices_3064856.json` 27 Oct, policy `booking_promotions_p13_21oct`, `channel_pricing`)
- The PriceLabs sum for 18-26 Nov was **£1,739** (3064856) or £1,820 (3090701). Paid £1,143.76 = **0.658x** of 3064856.
- No product of policy-listed factors gives 0.658:
  - markup 1.15 × weekly 0.85 × Last Minute 0.85 (0-30 days; booked 22 days out) × Mobile 0.90 × Genius L1 0.90 = **0.680 (£1,183)**;
  - adding occupancy -5% gives 0.646 (£1,124).
- Also UNKNOWN: whether the total includes the £150 cleaning (not split on Booking.com rows), and which rate plan was used. Black Friday is not bookable until 19 Nov.
- Needs the Booking.com reservation breakdown.

**12. Info pack vs PriceLabs** (`build/properties.py` vs `listings.csv`)
- **Minimums match everywhere** except P14 (pack £400, PriceLabs £500; special setup).
- **Bases differ where the 18/20 Oct rises happened:**
  - P01 230 vs 253; P05 455 vs 550; P06 340 vs 357; P09 160 vs 176; P11 260 vs 286; P12 270 vs 284;
  - also P13 235 vs 250 and P14 475 vs 525.
- **Every PriceLabs max is above the pack's "high"** (e.g. P04 450 vs 2000). The pack's high column looks like a typical seasonal high rather than a PriceLabs cap.
- The pack is out of date for bases.

**13. Listing hygiene** (`get_listings` 20 listings, `listing_data.json`, `data/id_map.json`)
- **11 ids in `id_map.json` no longer exist in PriceLabs** (`get_listings` by id returned 0):
  - all three `_unmatched` Vrbo listings at Marylebone coordinates (a7f5a076, 4a980bb7, 380ddc1a);
  - the `pricelabs_other` copies of P01 (d1f3bd96…), P04 Vrbo (20df1e73…), P08 (10339b41…), P09 (e36c0f9…/e36cf9e9…), P10 (babeec20…);
  - two of the three P13 Vrbo copies (d0a5f202…, 125c15c5…).
  - Question: were these removed on purpose? If so, `id_map.json` needs updating.
- **Vrbo copies still pushing separately:** P11 (12:01:43Z), P12 (11:56:17Z), P13 3d48ae56 (12:02:40Z), all on 27 Oct.
  - The P02 Vrbo copy last pushed **2026-02-24** with push on (intentional block).
  - Question: are the Vrbo copies still needed?
- **P13:** 3064856 and 3090701 share coordinates and push together (one flat, policy).
- **P03** is priced via Channex, not Smoobu.
- **Info-pack properties with no PriceLabs listing:** P15-P19.
- **PriceLabs listing not in the info pack:** P20 Waterford Court. The recommended base reads "Unavailable" for P20 and P04.
- **P13 twins:** no identical open night now; 26 Dec was the only one on 27 Oct, now £240 vs £227.

**14. Floor and ceiling** (raw, 60 days)
- P14: 43 of 60 open nights at the £500 minimum (72%). Special setup: numbers only.
- Every other listing has 0 open nights at min or at max.
- The 180-day check is NOT POSSIBLE (raw ends 27 Dec).

**15. Base vs market**
- `market.csv` is missing and `market_percentiles` is null: NOT CHECKED.
- Only P13 is readable (`raw/neighbourhood_P13.json`, 2-bed, 117 listings): base £250 vs P50 £238 (**+5.0%**) and P75 £289 (**-13.5%**).

### Open plan items: status today

| Item | Status |
|---|---|
| a-discount-cut | Not done (item 4) |
| a-p12-2228nov | Not done (item 5) |
| a-peak-check | Partial: P13 25-26 Dec min 4 → 3, not 2; readings in item 7 |
| t-pl-sync | P08 and P20 pushes fixed. New problem: P11/P13 bookings missing from PriceLabs (item 3) |
| a-p13-record | P04/P20 min 2 still present and re-saved 27 Oct (item 6); Reyhan's 26 Oct -2% overrides on P13 still in place |
| t-p04-airbnb-minstay | Not checkable from PriceLabs (Airbnb setting): NOT CHECKED |
| a-airbnb-rules | Smoobu/Airbnb setting, not in PriceLabs: NOT CHECKED |

Data gaps:
1. 28 Oct is not in the raw price files (the window starts 29 Oct). Next-14 and next-30 therefore run 29 Oct-11 Nov and 29 Oct-27 Nov.
2. No `market.csv`; the pack's `market_percentiles`, `bounds` and `sync_issues` are null. Base vs market is checked only for P13.
3. 3090701 Smoobu rates are missing from `prices.csv`: its sync is NOT CHECKED.
4. Customization edits are not logged in `get_user_logs`. "No change" rests on comparing live readings with the 27 Oct section.
5. Not read today: customizations on P02, P03, P06, P07; overrides on the Vrbo copies (the logs show them copied); the PriceLabs orphan-day setting.
6. Booking times for the P20 2-6 Nov and P11 5-8 Dec reservations are not in `reservations.csv`, so the PriceLabs price in force at booking is UNKNOWN.
7. 180-day floor/ceiling and the 5/7-night far-out min-stay rules: raw ends 27 Dec, NOT CHECKED.
