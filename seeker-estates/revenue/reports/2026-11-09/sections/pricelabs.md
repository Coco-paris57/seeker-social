## PriceLabs audit (D = 2026-11-09)

**Sources**
- Snapshot `data/snapshots/2026-11-09/`: `raw/listing_data.json`, `raw/prices_*.json` (window **10 Nov 2026 - 8 Jan 2027**, so 9 Nov is Smoobu only), `listings.csv`, `reservations.csv`.
- Live PriceLabs reads, one at a time, 9 Nov ~07:20-07:35Z:
  - `get_user_logs` listing / group / account, 8-9 Nov.
  - `get_listing_data` (push status). It matched the raw exactly.
  - `get_listing_date_overrides` for P05 3166592, P12 2699998, P13 3064856, P11 3064196, P09 3318172 and P20 3547481.
  - `get_customizations` for P04 3562176.
- Live Smoobu GET `/api/rates`, 15 apartments, 9 Nov 2026 - 6 May 2027, taken **07:19:49Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09pl/smoobu_rates_a.json`; it holds no guest data.
- Booking creation times come from the Dispatcher's guest-free `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09/smoobu_mod09_pe.json`. Smoobu local time = UTC in November.
- Scripts are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live09pl/`: `sync.py`, `an.py`, `an2.py`, `gaps.py`.
- `kpi_pack.json` fields `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all **absent (null)**. Everything below was recomputed.
- Policy respected: blocks on P02/P03/P06/P07, the P14 special setup, P13 as one flat, handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec), the 15% / 20% stay discounts, and the deprioritised P12 17 Nov / P04 2 Dec items.

### What changed since 8 Nov 06:00Z (`get_user_logs`)
- **8 listing entries, all by reyhan@, 8 Nov 12:38:36-12:41:48Z, all "Added Date Specific Override".** Group and account logs have 0 entries.
- Base, min, max and sync in `listings.csv` are unchanged on all 20 listings (8 Nov vs 9 Nov). Only `last_push` and `recommended_base` moved (P13 237 -> 239 and 236 -> 238; P02 176 -> 177; P08 254 -> 252).

| Time (Z) 8 Nov | Listing | DSO now | Before (7 Nov edit) |
|---|---|---|---|
| 12:38:36 | P11 3064196 (+ Vrbo copy) | 10 Nov-18 Dec **-5%**, min 2 (darts 13-17 Dec included) | -2% |
| 12:39:28 | P13 3064856 -> 3090701 + Vrbo `_3d48…` (from parent) | 10-20 Dec **-5%**, min 2 | -2% |
| 12:40:48 | P20 3547481 | 13-17 Nov **-5%**, min 2 | no price, min 2 |
| 12:41:16 | P20 3547481 | 20-24 Nov **-5%**, min 2 | no price, min 2 |
| 12:41:48 | P04 3562176 | 9-24 Nov **-5%**, min 3 | -3% |

- Effect on prices (raw 9 Nov vs raw 8 Nov):
  - P11 darts 13-17 Dec: £1,078 -> **£1,039** (217 / 193 / 197 / 205 / 227, average **£207.80**).
  - P20 13-24 Nov open nights: £3,119 -> £2,963. 23 Nov fell from £333 to £244.
  - P04 10-24 Nov: £2,447 -> £2,355.
  - P13 3064856 10-20 Dec: about -£6 a night.
- There are no entries for P05, P12, P06, P09, P08, P01, P02, P03, P07, P10 or P14.
- P04 customizations are unchanged (live): last-minute -5% gradual over 15 d, occupancy "Aggressive", Booking Recency default, demand Conservative, far-out +30% after 150 d.

---

### CRITICAL

**C1. Reyhan's 8 Nov edits deepen the policy conflicts. These are reported for Corentin to confirm, not proposed** (log above; `policy.json`; raw 9 Nov)
- **P11 darts 13-17 Dec is now -5%.** Policy (24 Oct): darts +5%, set by Reyhan 23 Oct, "leave as it is"; average above £300 (21 Oct).
  - Now **£1,039, average £207.80**, all open, min 2.
  - Check: PriceLabs > 3064196 > DSO 13-17 Dec.
- **P20: -5% restored on 13-17 Nov, and extended to 20-24 Nov. Min stays 2.** Policy (24 Oct): -5% for 31 Oct-19 Nov, and min 3 nights 25 Oct-30 Nov.
  - The price on 13-17 Nov now matches policy again (£265 / £233 / £232 / £224 / £221).
  - **20-24 Nov -5% falls outside the policy window**: £239 / £246 / £235 / £244 / £333.
  - **Min 2 still conflicts with policy min 3** on 9, 13-17 and 20-24 Nov.
  - P20 base is still **330** in PriceLabs vs policy **350** (24 Oct). This is unchanged and still unresolved.
- **P04 9-24 Nov is now -5%** (yesterday -3%). Policy (24 Oct) says -8% on 1-25 Nov. Min 3 matches policy.
- **P13 10-20 Dec is now -5%** on both twins and the Vrbo copy. It is not in policy. 8-12 Nov -5% (policy 0%) is unchanged.
- Nothing from 7 or 8 Nov is recorded in `policy.json`; its last `price_changes` entry is 24 Oct.

**C2. P05 9 Nov is TONIGHT and is still open at £1,403, min 1. The +300% DSO is unchanged (10th check)** (Smoobu 07:19:49Z; live overrides)
- DSO 9 Nov **+300%, min 1**, last updated **30 Oct 22:09:42Z**. Yesterday's raw uncustomized price was £335.
- `reservations.csv` has no 9 Nov stay. The 6-9 Nov guest leaves today and the 10-16 Nov guest arrives tomorrow, so 9 Nov is a 1-night gap.
- Smoobu `available` = 1 at 07:19Z, so the night had not sold on any Smoobu-synced channel by then.
- Whether the Airbnb £253.44 Special offer was withdrawn or taken: **NOT CHECKED here.** PriceLabs and Smoobu cannot see it.
- After tonight the item lapses either way. Check: PriceLabs > 3166592 > DSO 9 Nov.

### HIGH

**H1. Push freshness. 8 Nov: three listings pushed on the morning cycle, and six went 7½-10½ min past 24 h and pushed only after Reyhan's saves. P12 and P05 refreshed without pushing** (live `get_listing_data` ~07:21Z; 8 Nov `listings.csv`)
- **On time:**
  - P09 07:56:29Z (due 08:16).
  - P06 08:00:19Z (due 08:20).
  - P12 / P05 08:53:20Z and P08 08:53:29Z. These were due about 12:31, so they pushed early.
  - None has a log entry, so these look like the system cycle.
- **Late. Each push came 1-2 min after Reyhan's DSO save on the same listing:**

| Listing | Previous push (7 Nov) | Pushed 8 Nov | Past 24 h by |
|---|---|---|---|
| P11 3064196 | 12:30:20Z | 12:40:10Z (DSO 12:38:36) | 9 m 50 s |
| P11 Vrbo `_7fd3…` | 12:31:15Z | 12:39:39Z | 8 m 24 s |
| P13 3064856 / 3090701 | 12:30:42Z | 12:40:37Z (DSO 12:39:28) | 9 m 55 s |
| P13 Vrbo `_3d48…` | 12:32:38Z | 12:43:13Z | 10 m 35 s |
| P20 3547481 | 12:33:57Z | 12:41:45Z (DSO 12:41:16) | 7 m 48 s |
| P04 3562176 | 12:34:39Z | 12:42:10Z (DSO 12:41:48) | 7 m 31 s |

- **Refreshed without pushing:**
  - P12 2699998 at 12:37:21Z and P05 3166592 at 12:39:52Z. `last_date_pushed` is still 08:53:20Z on both.
  - No price was left unpushed: PriceLabs = Smoobu on every open night (H2). So it is harmless today. Why the refresh skips the push is UNKNOWN.
- **t-pl-push-fresh: not met on 8 Nov**, for the second day running. The afternoon group is only pushed when someone saves.
- **Due today (from `last_date_pushed`). Nothing is over 24 h at 07:21Z:**

| Listing | Due 9 Nov (Z) |
|---|---|
| **P09 3318172** | **07:56** |
| **P06 3288517** | **08:00** |
| P12 2699998, P05 3166592 | 08:53 |
| P08 3318167 | 08:53 |
| P11 Vrbo | 12:39 |
| P11 3064196 | 12:40 |
| P13 x2 | 12:40 |
| P20 | 12:41 |
| P04 | 12:42 |
| P13 Vrbo | 12:43 |

  - Pushed overnight, so not due today: P02 00:24Z, P03 (Channex) 03:14Z, P07 04:16Z, P14 04:49Z, P01 05:15Z, P10 05:28Z, P12 Vrbo **06:53:47Z**.
- **P05 08:53Z matters most.** PriceLabs has not registered the new 15-21 Dec booking (H2).
- Check at ~09:00Z: `last_date_pushed` on 3318172, 3288517, 3166592 and 2699998. Check the 12:40Z group at ~12:50Z. If any is still on 8 Nov, use Sync Now.

**H2. Sync, next 30 (10 Nov-9 Dec): 0 price mismatches over £2 and 0 min-stay mismatches on all 15 Smoobu listings. Over 60 days the only status mismatch is the new P05 booking** (raw 9 Nov vs Smoobu 07:19:49Z; `sync.py`)
- **P05 15-21 Dec Airbnb (Smoobu id 162753757) is NOT registered in PriceLabs yet.**
  - Created **8 Nov 21:42**. P05's last refresh was 12:39:52Z, before that.
  - 15-20 Dec show open in PriceLabs (`booking_status` empty) at £569 / £576 / £604 / £613 / £650 / £645, while Smoobu has them closed.
  - Expected at the next refresh. Check after 08:53Z: 3166592 15-20 Dec = "Booked".
  - Smoobu marks the record `type` "modification of booking" (modified 21:57:04). Its price-details read "Cancellation Host Fee £489.36 / Cancellation Payout £2,667.81". `reservations.csv` has it as confirmed and the Smoobu calendar is closed, so it is treated as booked. **Question for the channel section: is this a live stay?**
- **Price on sale at booking.** The last push before 21:42 was 08:53:20Z. Today's raw (refreshed 12:39Z, no push since) = Smoobu = **£3,657** for 15-20 Dec.
  - The 08:53Z push had cut it from £3,700 (Smoobu 8 Nov 07:18Z: 569 / 576 / 616 / 622 / 657 / 660).
  - Paid room **£2,962.17 = 0.8100 x £3,657 exactly** (-£694.83). It was booked 37 days out.
  - It is a 6-night stay, so the policy weekly 15% does not apply.
  - The arithmetic equals 0.900 x 0.900. The 0.900 matches the 28-42 d Airbnb layer seen in the channel checks. **The second 0.9 is NOT CHECKED**; P05's Smoobu Airbnb pricing rules are not in policy. Per policy `airbnb_discount`, the gap is unexplained.
  - Against the market: 8 Nov `market.md` put 13-21 Dec P75 at £5,818 for 9 nights. A per-night P75 for 15-20 Dec is NOT CHECKED. comp-central (8 Nov) had December 32-39% under comp medians.
- **Fixed since yesterday:**
  - **P09 11 Nov now shows "Blocked" in PriceLabs.** It was registered at the 07:56Z refresh, and the £132 / £141 vs £120 / £128 gaps are gone: 11 Nov £122 / 12 Nov **£126** on both sides.
  - **P13 3090701 7-9 Dec now shows "Blocked"** (linked block registered; yesterday's M3 is closed).
- 9 Nov is Smoobu only (outside the raw window).

**H3. Orphans: six unsellable 1-2 night gaps, two of them new from the P05 booking** (Smoobu 07:19:49Z; overrides; `gaps.py`)

| Ref | Night(s) | Price | Min stay | What pins it | Check in PriceLabs |
|---|---|---|---|---|---|
| **P05** | **13-14 Dec** (2 n, between 9-13 Dec and 15-21 Dec) | £579 / £565 = **£1,144** | 3 | Reyhan's DSO 13-19 Dec -2% min 3 (7 Nov 12:30:56Z) | 3166592 > DSO 13-14 Dec, min 2 |
| **P05** | **21 Dec** (1 n, before 22-29 Dec) | **£645** (uncust £667) | 2 | DSO 20-21 Dec min 2 (26 Oct 10:18Z) | 3166592 > DSO 21 Dec, min 1 |
| P20 | **9 Nov tonight** (1 n, 8 Nov passed unsold) | **£200 = floor** | 2 | Reyhan's DSO 9 Nov min 2 (7 Nov 12:32:44Z) | lapses tonight |
| P20 | **5 Dec** (1 n, between 25 Nov-5 Dec and 6-14 Dec) | **£281** (uncust £370, -24%) | 3 | DSO 1-20 Dec -5% min 3 (27 Oct 14:42Z); PriceLabs `unbookable` = 1 | 3547481 > DSO 5 Dec, min 1 (t-p20-5dec-orphan) |
| P09 | **12 Nov** (1 n, between 7-11 Nov and 13-15 Nov) | **£126** (`user_price` 128) | 2 | DSO 9-12 Nov min 2 (5 Nov 10:56Z) + Smoobu block 11 Nov; `unbookable` = 1 | 3318172 > DSO 12 Nov, min 1, or remove the 11 Nov block (t-p09-1112block) |

- Two items not counted above:
  - P05 9 Nov (C2) is min 1, so it is sellable.
  - P12 13 Dec (£364) and 26 Nov (£317) are min 1, so they are sellable.
- Short runs a gap-fill rule would sell:
  - P13 9-12 Nov (4 n from tonight, £170-181 / £160-171).
  - P06 9-11 Nov (£211 / £213 / £224) and 15-17 Nov.
  - P12 12-13 Nov (£208 / £254).
  - P11 18-19 Nov (£143 / £161).
  - P05 16-17 Nov (£372 / £390) and 7-8 Dec (£464 / £449).
  - `kpi_pack` has no gaps field.

**H4. a-discount-cut recomputed: next 14 £1,136, next 30 £1,816 (yesterday £820 / £1,510). It went up, not down** (raw 9 Nov `uncustomized_price - price`, nights open in PriceLabs and Smoobu; windows 10-23 Nov and 10 Nov-9 Dec; `an.py`)
- Exclusions as yesterday: handback nights, P14, P06, P05 9 Nov and P04 2 Dec. P13 premiums are netted.

| Ref | Next 14 | Next 30 | Yesterday next 30 |
|---|---|---|---|
| P04 | 10 n £1,556 vs £2,063 (£507) | 15 n £2,541 vs £3,192, **-20.4% (£651)** | £702 |
| P11 | 8 n £305 | 18 n £3,749 vs £4,321, **-13.2% (£572)** | £374 |
| P05 | 2 n £175 | 8 n £3,748 vs £4,157, -9.8% (£409) | £410 |
| P20 | 9 n £216 | 11 n £2,753 vs £3,076, -10.5% (£323) | £153 |
| P12 | 6 n £77 | 14 n £3,880 vs £4,063, -4.5% (£183) | £246 |
| P13 3064856 / 3090701 | -£68 / -£73 | -£171 / -£148 | -£195 / -£167 |
| P09 | -£3 | -£3 | -£13 |
| **Total** | **£1,136** | **£1,816** | **£1,510** |

- **Why it rose:** Reyhan's 8 Nov DSOs on P11 (-2% -> -5%; £374 -> £572) and P20 (-5% back on; £153 -> £323). P04 is down £51 only because the window moved.
- PriceLabs' own layers on P04 are unchanged (live). **Status: not done.**
- Check: 3562176 > Customizations > Last-minute, Occupancy profile and Booking Recency: Custom 0%. On P11 and P20 the gap is now mostly Reyhan's DSOs (C1).

**H5. Status of the PriceLabs-side plan items, 9 Nov**

| Item | Status | Numbers (raw 9 Nov / Smoobu 07:19Z / overrides) |
|---|---|---|
| a-p13-record | **Not done; the list grew** | `policy.json` is unchanged. To record or confirm, on top of yesterday's list: P11 10 Nov-18 Dec -5%; P13 10-20 Dec -5%; P20 13-17 / 20-24 Nov -5% min 2; P04 9-24 Nov -5% (C1). Still open: P13 base 250 and P20 base 330 vs policy 350. |
| a-discount-cut | **Not done; gap up** | £1,136 / £1,816 vs £820 / £1,510 (H4) |
| a-p12-trim | **Not done** | 30 Nov-3 Dec £269 / £280 / £290 / £300 = **£1,139** (target about £972). 7-10 Dec £286 / £291 / £305 / £310 = **£1,192** (target about £889). 18-20 Nov £258 / £274 / £295 open (21 Nov booked). All min 2; no price DSO (7 Nov). |
| a-p05-dec | **Overtaken in part** | **15-20 Dec sold** at PriceLabs £3,657 (paid £2,962.17; H2), below the P75 proposal. 13-14 and 21 Dec are now unsellable orphans (£1,789; H3). **7-8 Dec £464 / £449 = £913**, DSO +3% min 2 unchanged (target about £1,175). |
| a-peak-check | **Not done; moved the other way** | **P13 10-26 Dec, 17 open nights:** 3064856 **£3,623** (was £3,675) and 3090701 **£3,834** (was £3,888 on the same 17 nights), after Reyhan's 10-20 Dec -2% -> -5%. 21-26 Dec still -5% min 3 (target min 2 on 25-26 Dec). **P05 29 Dec £1,332**, DSO +100% min 1 unchanged (uncust £1,068). |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£317**, min 1, DSO +15% (4 Nov 01:24Z), uncust £294. Smoobu £317. |
| t-p12-13dec-orphan | **Min-1 part done; price part open** | 13 Dec **£364**, min 1, DSO +15% (7 Nov 12:27:54Z), uncust £359. Sellable; last night before the 14 Dec handback block. |
| t-p13-twins | **No longer identical** | Only 8 Jan 2027 is identical. Nov open nights: 3090701 is 5.5-6.2% **below** 3064856 (10-12 Nov 163 / 166 / 171 vs 173 / 177 / 181; 17 Nov 197 vs 209). Dec: 3090701 is about 5-6% **above**. Cause: the uncustomized prices diverged at the 8 Nov 12:40Z refresh (10 Nov 134 vs 144). No DSO change on 3090701 dates in Nov. Policy only requires them to differ, and the order is deprioritised (24 Oct), so the conflict is cleared. |
| t-p20-5dec-orphan | **Not fixed** | 5 Dec £281, min 3, `unbookable` = 1 (H3) |
| t-p09-1112block | **Half resolved** | PriceLabs now registers the 11 Nov block (H2). 12 Nov is still a min-2 orphan at £126. Who placed Smoobu block 162726554 is UNKNOWN. P09's last night before handback is 26 Nov. |
| t-pl-push-fresh | **Not met 8 Nov** (H1) | Re-arm for today: P09 07:56Z and P06 08:00Z; P12 / P05 / P08 08:53Z |
| P05 9 Nov +300% | **Unchanged on its last night** (C2) | £1,403, min 1, open at 07:19Z |

### MEDIUM

**M1. Floor and ceiling** (Smoobu available nights 9 Nov-6 May vs PriceLabs min/max; `an2.py`)
- No listing has more than 20% of open nights at min or more than 10% at max, except P14.
  - P14: 108 of 179 (60.3%) at £500. This is the special setup; numbers only.
  - P20 has 1 of 149 at min: 9 Nov at £200 (H3).
  - 0 nights at max anywhere.

**M2. Min stay vs policy** (Smoobu = PriceLabs)
- **Min 1 inside 2 months:**
  - P12 26 Nov and 13 Dec.
  - P13 17 Nov, 27 Nov and 1 Dec (1 Dec is intentional per policy).
  - P05 9 Nov and 29 Dec.
  - P04 2 Dec (deprioritised).
- **2+ months ahead (from 8 Jan) below 5:**
  - P11 min 3, 8 Jan-28 Feb (52 n).
  - P13 min 3, 8 Jan-4 Feb, then min 4 on Mon-Thu runs to 8 Mar.
  - P05, P20 and P04 min 3-4.
- **4+ months ahead (from 9 Mar) below 7:** P11 min 5 (59 n); P13 min 5-6; P20 min 5-6.
- This is unchanged from 8 Nov apart from the dates rolling forward.

**M3. Base vs market** (last row per ref in `data/snapshots/2026-11-08/market.csv`; there is no 9 Nov file)

| Ref | Base | P50 | vs P50 | P75 | vs P75 | Row date |
|---|---|---|---|---|---|---|
| P12 | £284 | £205 | **+38.5%** | £233 | **+21.9%** | 8 Nov |
| P20 | £330 | £251 | +31.5% | £320 | +3.1% | 8 Nov |
| P09 | £176 | £134 | +31.3% | £160 | +10.0% | 8 Nov |
| P04 | £220 | £176 | +25.0% | £219 | +0.5% | 8 Nov |
| P13 | £250 | £224 | +11.6% | £277 | -9.7% | 8 Nov |
| P11 | £286 | £289 | -1.0% | £330 | -13.3% | 8 Nov |
| P01 | £253 | £258 | -1.9% | £331 | -23.6% | 2 Nov |
| P05 (4 BR) | £550 | £575 | -4.3% | £720 | -23.6% | 8 Nov |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% | 2 Nov |

- P02, P03, P07, P08, P10 and P14: no usable row (UNKNOWN, `market.csv`).

**M4. Listing hygiene and info pack** (live `get_listing_data`; `data/id_map.json`; `build/properties.py`)
- All 20 PriceLabs listings: `push_enabled` true, `isHidden` false. No listing has push off.
- **Vrbo copies pushing separately:**
  - P11 `_7fd3…` (12:39:39Z), P13 `_3d48…` (12:43:13Z) and P12 `_386e…` (9 Nov 06:53:47Z). They receive Reyhan's DSOs "from parent".
  - **P02 `_ca1c…`: push on, last pushed 24 Feb 2026**, `last_refreshed_at` null.
  - Question: should the Vrbo copies push at all, and should P02's be removed?
- **`_unmatched` in `id_map.json`:** the three Marylebone Vrbo ids `_units_0001_a7f5a076…`, `_4a980bb7…` and `_380ddc1a…` (note "push off") are **not among PriceLabs' 20 listings**.
  - The same is true of these `pricelabs_other` ids:
    - P04 Vrbo `_20df1e73…`.
    - P13 `_d0a5f202…` and `_125c15c5…`.
    - The Channex ids on P01, P08, P09 and P10.
  - Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03 is priced via Channex, not Smoobu.** Push on, last push 9 Nov 03:14:08Z. It is fully blocked, which is intentional.
  - **P15-P19 have no PriceLabs listing.** Question: are they priced elsewhere, or is a second account to be connected?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy.
- **Not in the info pack:** P20 3547481, PriceLabs 200 / 330 / 1800. The `id_map` note says 220 / 350 and policy says base 350. Question: which is right?
- **Pack (10 Sep) vs PriceLabs:**
  - Mins match except P14 (400 vs 500; special setup).
  - Every max is higher in PriceLabs, for example P01 450 vs 650, P04 450 vs 2000, P08 350 vs 1000 and P11 400 vs 1200.
  - Bases differ on P01, P05, P06, P09, P11, P12 and P13 (the 18-20 Oct rises).
  - The pack is out of date. PriceLabs base/min/max have not changed since 7 Nov.

Data gaps:
1. `kpi_pack.json` `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are absent. All figures here were recomputed from raw + Smoobu.
2. The raw window starts 10 Nov. For 9 Nov, PriceLabs status, `uncustomized_price` and `unbookable` are NOT CHECKED; the figures come from Smoobu.
3. Push status after ~07:21Z today is NOT CHECKED (P09 is due 07:56Z, P06 08:00Z, P05 / P12 / P08 08:53Z). Why the P12 and P05 12:37-12:40Z refreshes did not push is UNKNOWN. The 07:56-08:53Z pushes have no log entry, so system cycle vs Sync Now is UNKNOWN.
4. Airbnb P05 9 Nov Special offer (£253.44): NOT CHECKED. It is outside PriceLabs and Smoobu.
5. P05 15-21 Dec:
   - The second 0.9 factor is NOT CHECKED.
   - The per-night P75 for 15-20 Dec is NOT CHECKED.
   - The Smoobu record type "modification of booking" with "Cancellation Payout" price-details is unexplained.
   - "Price on sale" assumes no manual Smoobu edit between 08:53Z and 21:42; Smoobu keeps no rate history over the API.
6. Who created Smoobu block 162726554 (P09 11 Nov) is UNKNOWN.
7. Overrides were read live for P05, P12, P13 3064856, P11, P09 and P20, and customizations for P04 only. For P13 3090701, P04, P06 and the blocked listings, "no other change" rests on `get_user_logs` and the raw prices.
8. No 9 Nov `market.csv`. P01 and P06 percentiles are from 2 Nov rows.
