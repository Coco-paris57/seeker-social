## PriceLabs audit (D = 2026-10-23)

**Sources:**
- Snapshot `data/snapshots/2026-10-23/`: `prices.csv` (24 Oct–22 Dec), `listings.csv`, `reservations.csv`, and `raw/listing_data.json` (05:57Z) plus `raw/prices_*.json` (05:58–06:17Z).
- `reports/2026-10-23/kpi_pack.json`, `data/id_map.json`, `data/policy.json`, and `../build/properties.py` (unchanged since 13 Oct).
- The 22 Oct snapshot and `reports/2026-10-22/sections/pricelabs.md`, used for the diff.
- Live read-only PriceLabs calls between 06:19 and 06:30Z, made one at a time:
  - `get_listing_data`;
  - `get_listings` (one Vrbo id, `pms=channex`, `pms=vrbo`, search "Canary Wh");
  - `get_user_logs`: listing 21–23 Oct; listing 1 Aug–23 Oct filtered to the 10 missing ids; group and account 20–23 Oct;
  - `get_listing_prices` (3064196, 17–28 Nov);
  - `get_listing_date_overrides` (3064196, 2699998, 3090701, 3562176);
  - `get_customizations` (2699998, 3064196).

**Nothing was changed.**

**Policy respected:**
- P02, P03, P06 and P07 blocks are not raised.
- P14 numbers are reported only.
- P13 is one flat, and its 1 Dec +50% is intentional.
- Nights after the handback dates (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec) are excluded.
- Stay discounts and the Booking.com +20% markup are not raised.

### Changes logged since the last audit (`get_user_logs`, 22 Oct 06:09Z to 23 Oct 06:25Z)

No group-level or account-level entries.

| Time (Z, 22 Oct) | Who | Change |
|---|---|---|
| 12:43:22 | reyhan@ | Vrbo `_units_0001_20df1e73…` (P04 Barking, Vrbo 12038555) price sync **OFF**. The log entity now reads "***DELETED LISTING -- NO NAME***". |
| 18:47:52 | reyhan@ | P12 2699998 override **−1%, min stay 2, 29 Nov–13 Dec**. Copied to Vrbo 12038157. |
| 18:47:58 | reyhan@ | P12 2699998 override **−4%, min stay 2, 26 Oct–15 Nov**. Copied to Vrbo 12038157. |

---

### CRITICAL

**1. P11 Camden: PriceLabs has not yet seen the 19–27 Nov cancellation. It still prices 19–26 Nov as booked, and the 1-night orphan premiums now sit inside a 10-night open run.**

*The cancellation in Smoobu:*
- Booking.com, 19–27 Nov, £1,736.41, booked 19 Sep, `status=cancelled` (`reservations.csv`).

*What PriceLabs still shows:*
- Last refresh and last push were **2026-10-22T08:37Z**, in both live `get_listing_data` and `get_listing_prices`.
- 19–26 Nov are `Booked` with `ADR 180.88` and `booked_date 2026-09-19`.
- `occupancy_next_30` is unchanged at **63%**. It would fall by about 27 points if the 8 nights were counted as open.

*What Smoobu is selling at* (`prices.csv` `smoobu_price` equals the PriceLabs price on every night):

| Night | Price | Min stay | Override |
|---|---|---|---|
| 18 Nov | £314 | 1 | +30% |
| 19 Nov | £255 | 3 | −5% |
| 20 Nov | £294 | 3 | −5% |
| 21 Nov | £289 | 3 | −5% |
| 22 Nov | £264 | 3 | −5% |
| 23 Nov | £259 | 3 | −5% |
| 24 Nov | £280 | 3 | −5% |
| 25 Nov | £298 | 2 | −2% |
| 26 Nov | £313 | 2 | −2% |
| 27 Nov | **£589** | **1** | **+60%** |

- **18–27 Nov total: £2,955** for 10 nights, against £1,736.41 for the 8 cancelled nights (£217/night).
- The +30% and +60% overrides were set as orphan premiums (last updated 2026-10-11 13:31Z). With the cancellation, neither night is an orphan any more.
- The 18–27 Nov run is 26–35 days out. Once PriceLabs refreshes, the occupancy-based adjustment for 16–30 days out and 31–60 days out, plus the booking-recency factor, will apply. The last non-cancelled P11 booking was made 4 Oct (`reservations.csv`).

*Likely cause, not proven:*
- P12 was recalculated at 18:50Z right after a manual override (18:47Z), and that recalculation picked up the P12 cancellation.
- P11 had no manual change and has not refreshed since 08:37Z.
- The cancellation timestamp is not in `reservations.csv`.

*Not yet known:*
- whether Booking.com also shows 19–27 Nov as open;
- whether the 08:00Z PriceLabs cycle today picks the cancellation up.

*Check in PriceLabs:*
- 3064196 → Sync Now / refresh. Confirm that 19–26 Nov turn open and that the occupancy falls.
- Date Specific Overrides on **18 Nov (+30%, min stay 1)** and **27 Nov (+60%, min stay 1)**. These are orphan settings now inside a 10-night gap.

**2. P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, but the last push was 2026-02-24T07:31:33Z (241 days ago).**
- Unchanged (live `get_listing_data`, `listings.csv`). The P02 block itself is intentional and not raised.
- **Check:** PriceLabs → Vrbo 4438728 → Sync toggle. Is the Vrbo listing live? If not, switch push off. Reyhan did exactly this for the Barking Vrbo copy on 22 Oct 12:43Z.

### HIGH

**3. Ten listings left PriceLabs between the 22 Oct and 23 Oct pulls. The account now has 20 listings, confirmed by live `get_listing_data`.**

*Lookup results:*
- `get_listings` returns nothing for any of the ten ids.
- `pms=channex` returns only the P03 Bayswater listing.
- `pms=vrbo` returns 4 listings: P02 4438728, P11 12037367, P12 12038157 and P13 12037152.
- `get_listing_data` includes hidden listings by default (`skip_hidden=false`), so the ten are **removed or unmapped, not hidden**.

*What the logs show:*

| Listing | id_map role | Push before | Log trail (1 Aug–23 Oct) |
|---|---|---|---|
| Vrbo 12038555 `_units_0001_20df1e73…` "Fantastic 2 bed Flat… Barking" | P04 `pricelabs_other` | ON, last push 2026-10-22T06:01Z | Mapped 2026-08-20 20:12Z, copying the parent Channex `7dc96cda…` (removed 21 Oct). Push switched **OFF 2026-10-22 12:43:22Z by reyhan@**. The entity now reads "DELETED LISTING". |
| Channex `d1f3bd96…` "Beautiful 2 Bed… Canary Wharf, 82 Bowsprit Point" | P01 `pricelabs_other` | OFF, last refresh 2026-08-20 | No entries |
| Channex `10339b41…` "…Islington, 5 Handa Walk" | P08 `pricelabs_other` | OFF, last refresh 2026-08-20 | No entries |
| Channex `e36cf9e9…` "…Greenwich, 4 Torrent Lodge" | P09 `pricelabs_other` | OFF, last refresh 2026-08-20 | No entries |
| Channex `babeec20…` "…Ealing, 59 Westgate House" | P10 `pricelabs_other` | OFF, last refresh 2026-08-20 | No entries |
| Vrbo `_units_0001_d0a5f202…` (blank name) | P13 `pricelabs_other` (Shepherd's Bush coordinates) | OFF, never pushed | No entries |
| Vrbo `_units_0001_125c15c5…` (blank name) | P13 `pricelabs_other` | OFF, never pushed | No entries |
| Vrbo 11561696 `_units_0001_a7f5a076…` "Old School Grandma London Experience" | `_unmatched` (Marylebone coordinates) | OFF, never pushed | No entries |
| Vrbo 11560218 `_units_0001_380ddc1a…` | `_unmatched` | OFF, never pushed | No entries |
| Vrbo `_units_0001_4a980bb7…` (blank name) | `_unmatched` | OFF, never pushed | No entries |

*Facts:*
- **Only the Barking Vrbo copy has a log trail**, and its last action is the 12:43Z push-off.
- The other nine never pushed, had push off, and have no log entries. PriceLabs does not log the removal itself, so **whether these were deleted by a user or dropped by a Channex/Vrbo connection change is UNKNOWN**.
- The pattern matches the 21 Oct removal of Channex Barking and Smoobu 3254047: push-off logged, removal not logged.

*Effect on prices:*
- **None.** The primary listing of every unit is still present and pushing.

*Effect on our data:*
- `id_map.json` (written 22 Oct 06:07Z) still lists all ten. The `_unmatched` entry and the P01, P04, P08, P09, P10 and P13 `pricelabs_other` ids are now dead.
- **Yesterday's open items are closed by this:** the "P04 Vrbo still pushes old Channex overrides" item and the "unmatched Marylebone Vrbo / blank P13 Vrbo copies" item.

*Questions to resolve:*
- (a) Did Reyhan delete these as a clean-up on 22 Oct, or did a Channex/Vrbo disconnection remove them?
- (b) Is the Barking Vrbo listing 12038555 also closed on Vrbo itself? If it is still live there, it is now unpriced and unsynced.
- (c) Should `id_map.json` drop the dead ids?

**4. P12 Mile End: 1–7 Nov reopened, and PriceLabs repriced them about 17% below yesterday's list prices.**

*The cancellation:*
- Booking.com 1–8 Nov, £1,382.86 (£197.55/night), booked 3 Oct, cancelled (`reservations.csv`).
- PriceLabs picked it up at the **2026-10-22T18:50:05Z** recalculation and pushed at 18:50:07Z.
- The Vrbo copy 12038157 pushed at 18:48:57Z.
- `occupancy_next_30` fell from **57% to 37%**; the market is 40%.

*Open prices now* (PriceLabs equals Smoobu on every night; `prices.csv`):

| Night | Price now | List price yesterday (booked) |
|---|---|---|
| 1 Nov | £181 | £219 |
| 2 Nov | £184 | £222 |
| 3 Nov | £186 | £224 |
| 4 Nov | £188 | £227 |
| 5 Nov | £192 | £232 |
| 6 Nov | £211 | £271 |
| 7 Nov | £265 | £272 |
| **Total** | **£1,407** | **£1,687 (−16.6%)** |

- The run is 1–13 Nov (13 nights), with min stay 2 throughout.
- 8–13 Nov hardly moved: £242 / £241 / £242 / £239 / £240 / £279.

*How the cut was built* (`raw/prices_2699998.json`):
- **The algorithm's price before customizations (uncustomized) fell sharply:**
  - 1 Nov £267 → £219
  - 6 Nov £311 → £249
  - 26 Oct £226 → £179
  - Average change over 26 Oct–7 Nov: −17.5%. Over 8 Nov–21 Dec it was −0.4%.
- **Other listings did not move the same way.** Over 26 Oct–7 Nov they ranged from −7.4% (P08) to +7.3% (P20), so this is not a market-wide move.
- **The new override took P12 from −2% to −4%** on 26 Oct–15 Nov (reyhan@, 22 Oct 18:47:58Z).
- **Customizations in force** (`get_customizations`):
  - last-minute −25%, gradual within 15 days;
  - "Aggressive" occupancy profile: −20% within 15 days at 30–40% occupancy;
  - booking-recency factor at default (the last P12 booking was made 15 Oct).
- The per-factor breakdown is not exposed, so how much of the uncustomized drop is tied to the cancellation is **UNKNOWN**.
- The fall shows up only in the recalculation that saw the cancellation. Yesterday's live check at 05:59Z had 26 Oct at £187; it is now £157.

*Also moved:* 26–29 Oct is now **£157 / £162 / £169 / £172** (yesterday £187 / £192 / £198 / £203).

*Check:* whether −16.6% on 1–7 Nov is the intended response.
- **Settings to look at:** PriceLabs → 2699998 → Date Specific Overrides 26 Oct–15 Nov (−4%, min stay 2) → Customizations → Occupancy-based adjustment ("Aggressive", 0–15 days).
- The 18 Oct base rise to £284 is up for formal review on 26 Oct.

**5. P13 twins (3064856 / 3090701): prices are still identical on 22 Nov–22 Dec.**
- **Identical nights:** `pricelabs_price` is the same on all **31 nights**, 23 of them open (e.g. 22–27 Nov £216 / £217 / £209 / £216 / £229 / £249; 1 Dec £343, which is intentional).
- **Up to 21 Nov,** 3090701 is £10–£22 above 3064856 every night (e.g. 2 Nov £223 vs £201).
- **3090701 overrides on 22 Nov–22 Dec** (live, last updated 2026-10-16 to 2026-10-20): −1%, min stay 2 on 22–30 Nov; +50%, min stay 1 on 1 Dec; −3%, min stay 3 on 2–22 Dec. 3064856's overrides were not re-read today.
- **Policy:** `policy.json` `listing_facts.P13.twin_listings` says the two listings must keep slightly different prices, or Airbnb blocks them as duplicates.
- **Check:** PriceLabs → 3090701 (or 3064856) → Date Specific Overrides 22 Nov–22 Dec. Add a small differential, never making them identical.

**6. P04 Barking, 2 Dec: £601 for one night, min stay 1 (yesterday £612).**
- **The override is unchanged:** +200%, min stay 1, created and updated 2026-10-20T10:32:25Z (live overrides).
- **Price build:** uncustomized £231 → £601.
- **Against neighbouring nights:** booked 1 Dec is £192 and booked 3 Dec is £194; the next open night, 6 Dec, is £198. 2 Dec is about **3.1×** its neighbours.
- **What the night is:** a 1-night gap between the Booking.com 25 Nov–2 Dec and 3–6 Dec stays, both confirmed (`reservations.csv`).
- **Not covered by policy:** `policy.json` covers only P13 1 Dec.
- **Check:** PriceLabs → 3562176 → Date Specific Overrides → 2 Dec 2026. Is an orphan premium intended, or should a gap-fill discount sell the night?

### MEDIUM

**7. P04, 25 Oct: still unsellable and now 2 days out.**
- £155, override −5%, **min stay 3**, `unbookable=1` (`raw/prices_3562176.json`).
- It is a 1-night gap between the 22–25 Oct and 26 Oct–1 Nov stays (both confirmed).
- Unchanged since yesterday. The night is effectively lost unless min stay is cut to 1.
- **Check:** 3562176 → 25 Oct, min stay 3.

**8. P11 13–18 Dec override: unchanged since yesterday.**
- **Override:** +20%, min stay 2, last updated 2026-10-21T10:12:07Z.
- **Open prices:**

  | Night | Price |
  |---|---|
  | 12 Dec | £389 (+10% override) |
  | 13 Dec | £331 |
  | 14 Dec | £308 |
  | 15 Dec | £314 |
  | 16 Dec | £327 |
  | 17 Dec | £342 |
  | 18 Dec | £393 |

- **13–17 Dec average: £324**, which meets the policy's "above £300".
- **Open question from yesterday:** policy says 13–17 Dec, but the override also covers **18 Dec**. Is 18 Dec meant to be included?

**9. Orphan and short gaps** (`prices.csv` open runs; the pack `gaps` field is null):

| Ref | Night(s) | Price | Min stay | Note |
|---|---|---|---|---|
| P12 | 17 Nov | £375 | 1 | +50% (updated 2026-10-15), up from £364 |
| P04 | 2 Dec | £601 | 1 | Item 6 |
| P04 | 25 Oct | £155 | 3 | Item 7, unbookable |
| P11 | 18 Nov, 27 Nov | — | — | No longer orphans; see item 1 |
| P13 | 25–26 Oct | £144 / £150 | 2 | Sellable |
| P05 | 28–30 Oct | £399 / £417 / £406 | 2 | — |
| P05 | 16–17 Nov | £448 / £497 | 2 | — |
| P05 | 7–8 Dec | £767 / £755 | 2 | — |
| P06 | 5–7 Nov | £336 / £375 / £282 | 2 | — |
| P20 | 25–27 Oct | £251 / £253 / £257 | 3 | Sellable as one 3-night stay |

- A gap-fill rule would sell P04 25 Oct and discount the 1-night premiums (P12 17 Nov, P04 2 Dec) instead.

**10. Push freshness** (live `get_listing_data`, 06:19Z): everything is within 24 h except item 2.
- **First to pass 24 h** under the daily cycle: P14 (06:29Z), P13 Vrbo 12037152 (06:31Z) and P07 (06:33Z). The others pass between 07:30Z and 08:37Z, and P12 at 18:50Z.
- **P04 3562176:** `last_refreshed_at` 2026-10-22T17:35:46Z is later than `last_date_pushed` 08:27:48Z. Smoobu still equals PriceLabs on all 39 open nights, so no sync gap is visible. Whether a push followed the 17:35Z refresh is UNKNOWN.
- **Check:** recheck after 08:40Z.

**11. Sync check: no open night is more than £2 apart** on any Smoobu-priced listing (`prices.csv`).
- **Exception, NOT CHECKED:** 3090701's 39 open nights. The snapshot has `ref` blank for 3090701, so no `smoobu_price` was merged (Data gaps).

**12. Floor/ceiling and min stay** (`prices.csv`, 60-day window):
- **P14:** 40 of 60 open nights (67%) at the £500 minimum. Special setup, numbers only. Min stay is 3 or 4.
- **Every other listing:** 0% at the minimum and 0% at the maximum.
- **Min stay 1** appears only on the orphan overrides above and on P13 1 Dec (intentional).
- **P20:** 4-night minimum on 4–6, 11–13 and 18–20 Dec. There is no override on those dates and the source is UNKNOWN, as yesterday. Policy records P20 min stay as 3 nights only for 25 Oct–30 Nov.

**13. The info pack is still out of date** (`../build/properties.py`, last modified 13 Oct; PriceLabs min/base/max unchanged from 22 Oct).
- **Base differences** (pack → PriceLabs):
  - P01: £230 → £253
  - P05: £455 → £550
  - P06: £340 → £357
  - P09: £160 → £176
  - P11: £260 → £286
  - P12: £270 → £284
  - P14: £475 → £525
- **Minimum:** P14 £400 → £500 (special setup).
- **P20** is not in the pack.
- Most likely the pack is stale.

**14. Listing hygiene after the clean-up:**
- 20 listings remain.
- **Separate Vrbo copies that push:** P11 12037367, P12 12038157 and P13 12037152.
- **P03** is priced through Channex and is blocked on purpose.
- **P15–P19** have no PriceLabs listing.

Data gaps:
1. `market.csv` and `comps.csv` are empty (pack `missing`), so base vs market P50/P75 was NOT CHECKED. The pack fields `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are null at top level; per-property checks came from `kpi_summary.md` and `prices.csv`.
2. `prices.csv` covers only 24 Oct–22 Dec. The 180-day floor/ceiling check and the 5-night (2+ months) and 7-night (4+ months) min-stay rules are NOT CHECKED.
3. `prices.csv` rows for 3090701 have a blank `ref`, so its Smoobu sync was not compared. `rm/snapshot.py` maps Smoobu rates only via `id_map` `smoobu`, which is 3064856 for P13.
4. How the ten listings were removed (user delete or connection drop) is UNKNOWN: PriceLabs logs no removal action. Whether Vrbo 12038555 is still live on Vrbo is UNKNOWN.
5. The P11 cancellation timestamp and its Booking.com status are UNKNOWN. So is whether PriceLabs' next cycle will pick it up.
6. The per-factor price breakdown is not exposed, so the cause of P12's −17.5% uncustomized drop is UNKNOWN.
7. 3064856 overrides were not re-read today. Nor were the overrides for P01, P05, P06, P08, P09, P10, P14 and P20, but no log entries exist for them since 20 Oct.
8. The source of P20's 4-night minimum is UNKNOWN: there is no override, and min-stay settings are not in `get_customizations`.
