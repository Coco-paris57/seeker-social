## Channel parity

Run date D = 2026-11-05 (Thursday, GMT). I read `data/policy.json` first and do not re-raise what it settles: the 15%/20% stay discounts, Booking.com promotion stacking (sizes only), the Visibility Booster, P13 as one flat, the P02/P03/P06/P07 blocks, P14, the P20 Airbnb discounts on record, nights after handback, and the deprioritised items (P04 2 Dec, P12 17 Nov). The Airbnb monitoring is closed (4 Nov) and was not re-run.

**Sources (all read-only)**
- **Smoobu GET.**
  - `/api/rates` for 12 apartments at 2026-11-05T07:13:53Z, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live05/smoobu_rates05.json`. This now includes P01 3320302, P09 3318172 and P10 3318177.
  - `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:13:57Z, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live05/smoobu_mod05_pe.json` with guest fields dropped.
- **Reservations diff.** Full-row diff of `reservations.csv`, 5 Nov against 4 Nov: exactly one status change (P12 3–7 Dec confirmed → cancelled) and one new row (P12 4–7 Dec). Nothing else.
- **PriceLabs `get_user_logs`** (listing, 4–5 Nov, 38 entries). Only one entry is later than yesterday's run: **Reyhan, 4 Nov 12:52:23Z, P06 3288517, a "fixed" override on 15–22 Nov with min stay 2 and no price value in the log.** Nothing was logged on 5 Nov.
- **PriceLabs `get_listing_date_overrides`** for P06, 5–30 Nov.
- **Live Airbnb.** 25 plain public airbnb.co.uk searches (curl, no workarounds) between 07:15:37Z and 07:17:23Z. Files are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live05/air/` (`log.txt` plus one JSON per search).
  - **I appended 28 rows under lock to `data/snapshots/2026-11-05/channel_checks.csv`**, after copying the 4 Nov file forward. Each row has URL, stay, guests, timestamp and Smoobu rates.
  - "Displayed room" = card total before taxes, minus cleaning. Cleaning used: P20/P13 £150; P12 £150, or £125 on 2-night stays; P05 £195; P08 £149; synced Barking £142; P06 £129.
- **Booking.com: NOT CHECKED (live).** One plain search at 07:18:03Z returned HTTP 202 with an AWS WAF challenge (`live05/bk/search.html`). I did not try to get past it. The Booking.com figures below are amounts paid on Smoobu reservations, not displayed prices.
- **Vrbo / Direct: NOT CHECKED** (no URL and no checks row).
- **Config.** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults** (`rm/config.py` CHANNELS) until Corentin confirms them.

### 1. Barking (P04): unsynced Airbnb 1455876748739910219 still double-sells (day 6)

Smoobu 3562176:
- 3–6 Nov: Booking.com 161785771, confirmed, £393.18 room. **The guest is in residence and tonight (5 Nov) is their last night.**
- 6–9 Nov: Airbnb 161888271, confirmed, £355.72 room.
- 5–8 Nov unavailable. Open from 9 Nov at £139/140/144, min 3.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 | Synced 1657859794156786222 | Source (`live05/air/`) |
|---|---|---|---|---|
| **5–8 Nov** | booked (in residence, then Airbnb) | **bookable, 3 × £171.40 = £514.20** | not offered | p04_0508nov 07:15:37Z |
| **6–9 Nov** | booked (Airbnb 161888271) | **bookable, £514.20** | not offered | p04_0609nov 07:15:44Z |
| 9–12 Nov | open, £423 | £539.00 | £465.59 card = £323.59 room (**0.765**) | p04_0912nov |
| 6–9 Dec | open, £551 | £672.50 | £495.90 room (**0.900**) | p04_0609dec |
| 6–19 Dec (13 n) | open, £2,440 | £2,514.80 − weekly £239.58 = £2,275.22 | £2,338.00 − **"Weekly stay discount" £395.27 = 18.0% of £2,196 room** = £1,942.73 | p04_0619dec 07:16:08Z |

- **Still double-sellable: yes, sixth consecutive day.** 1455 offers 5–9 Nov, which covers tonight's in-house guest and the whole 6–9 Nov Airbnb stay. **£748.90 room is at risk** (393.18 + 355.72), plus relocation cost.
- **Booking on 1455: none visible.** 1455 is not in Smoobu, so its reservations cannot be read. Both 3-night cards covering 5–9 Nov were still bookable at the same £514.20 at 07:15Z. That means no guest had booked those nights on 1455 as of this run. **No double-booking has happened yet.**
- **t-p04-doublebook: NOT fixed.**

### 2. P12 Mile End: 3–7 Dec cancelled, 4–7 Dec booked (Booking.com)

| Smoobu id | Stay | Created | Status / modified | Party | Room (VAT incl.) | Cleaning | Commission | Genius flag |
|---|---|---|---|---|---|---|---|---|
| 161902221 | 3–7 Dec (4 n) | 29 Oct 21:04 | **cancelled, modified 5 Nov 00:58:16** | 3 adults + 3 children | £1,072.44 (VAT £178.74) | £150 | £183.37 | yes |
| 162667435 | 4–7 Dec (3 n) | **5 Nov 06:48** (modified 06:50:15) | confirmed | **4 adults + 1 child** | **£677.79** (VAT £112.97 = 1/6 of room) | £150 | **£124.17** | yes |

**Was it a shortened rebooking?** It is consistent with one, but this is **not proven**.
- For: the same check-out, booked 5 h 50 m after the cancellation, and both bookers are Genius.
- Against: the party differs (6 guests vs 5).
- I did not compare guest identity (no guest data).
- **Net effect: −1 night, −£394.65 room, −£59.20 commission.**
- The cancelled booking still carries its full price in Smoobu, with no cancellation-payout element. Whether any fee was charged is NOT CHECKED.

**Price at booking: £769** (267 + 276 + 226).
- Source: `prices.csv` 5 Nov (raw pulled 06:57Z, before PriceLabs picked up the booking) and Smoobu `/api/rates` 07:13Z, which still holds 267/276/226 on the now-booked nights.
- No PriceLabs edit was logged between Reyhan's P12 −15% override on 27 Nov–13 Dec (4 Nov 01:24:35Z) and the booking. P12 was pushed 5 Nov 01:26Z.
- **The rebooking was therefore priced with Reyhan's −15%.**

**Discounts applied.**
- Booking.com list = Smoobu × 1.15, rounded up per night: 308 + 318 + 260 = **£886**.
- **£886 × 0.765 = £677.79 exactly.** Two layers totalling 23.5% off list (£208.21).
- 0.765 = 0.85 × 0.90, so the layers are one 15% layer and one 10% layer.
- Genius is flagged on the reservation. Mobile 10% has been in every P12 stack on record. **Best reading: Genius 15% (Level 2&3, still on at Mile End per policy 25 Oct) × Mobile 10%.**
- **No Last Minute** layer was applied at a 29-day lead. A third layer would give ≤0.6885.
- **No occupancy discount** at 5 guests.
- Which 10%/15% pair it is cannot be seen from Smoobu (Booking.com is behind the WAF).
- For comparison, the cancelled 3–7 Dec booking sold at 0.812 of list (two 10% layers; 30 Oct section).
- **Paid ÷ PriceLabs: 0.881.**

**Commission basis.**
- £124.17 = **15.000% × (room £677.79 + cleaning £150)** = £124.1685.
- The cancelled booking is the same: £183.37 = 15% × £1,222.44.
- **It is 15%, not 18%.** There is no Visibility Booster on Mile End on record. As at Camden, the cleaning fee sits inside the commissionable base: **£22.50 per booking**, or 18.3% of room. Whether Corentin accepts commission on cleaning is still open (carried from 4 Nov).
- **Net to owner: room £677.79 − £124.17 = £553.62, i.e. £71.99 per £100 PriceLabs price** (VAT inside, as in the pack).

**3 Dec now.**
- Smoobu: open, £253, min 2. The open run is 30 Nov–3 Dec (4 nights: £232/238/246/253), between 27–30 Nov and 4–7 Dec. **It is not a 1-night orphan.**
- Airbnb sells 2–4 Dec at £381.73 room on Smoobu £499 = **0.765** (`p12_0204dec`, using £125 cleaning for 2 nights).

**P12 4 Nov (£302, min 1): did not sell.** There is no P12 booking covering 4 Nov in `reservations.csv` 5 Nov, and the full-row diff shows only the two rows above.

### 3. Live Airbnb: displayed ÷ Smoobu (hidden layers, day 7)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- P13: last-minute 10% within 14 days; early bird 10% at 60+ days.
- All listings: weekly 15%.

Gap = displayed room ÷ expected − 1. Flag if over 3%.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live05/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 20–23 Nov (15) | 2 | £810 | £810.00 | £619.64 (£769.64) = 0.765 | **−23.5%** | FLAG | p20_2023nov 07:17:12Z |
| P20 | Airbnb | 18–21 Nov | 2 | 18–19 blocked | — | not offered (correct) | — | ok | p20_1821nov 07:17:18Z |
| P20 | Airbnb | 7–10 Dec (32) | 2 | £731 | £731.00 | £657.90 (£807.90) = 0.900 | −10.0% | FLAG | p20_0710dec |
| P12 | Airbnb | 17–20 Nov (12) | 2 | £672 | £672.00 | £514.07 (£664.07) = 0.765 | **−23.5%** | FLAG | p12_1720nov |
| P12 | Airbnb | 30 Nov–3 Dec (25) | 2 | £716 | £716.00 | £547.74 (£697.74) = 0.765 | **−23.5%** | FLAG | p12_3003dec |
| P12 | Airbnb | 2–4 Dec (27) | 2 | £499 | £499.00 | £381.73 (£506.73) = 0.765 | **−23.5%** | FLAG | p12_0204dec |
| P12 | Airbnb | 7–10 Dec (32) | 2 | £679 | £679.00 | £611.10 (£761.10) = 0.900 | −10.0% | FLAG | p12_0710dec |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (3) | 4 | £540 | £486.00 (LM10) | £413.09 (£563.09) = 0.765 | −15.0% | FLAG | p13_0811nov 07:17:00Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (3) | 4 | £480 | £432.00 (LM10) | £367.19 (£517.19) = 0.765 | −15.0% | FLAG | same |
| P13 3090701 / 3064856 | Airbnb | 9–12 Dec (34) | 4 | £674 / £637 | same | £606.60 / £573.30 = 0.900 | −10.0% | FLAG | p13_0912dec |
| P13 3090701 / 3064856 | Airbnb | 4–7 Jan (60) | 4 | £562 / £552 | £505.80 / £496.80 (EB10) | £505.80 / £496.80 (visible "Early booking discount" −£56.20 / −£55.20) | 0.0% | ok | p13_0407jan |
| P05 | Airbnb | **9–10 Nov (4)** | 7 and 2 | **£1,403** (min 1, open) | £1,403.00 | £511.80 − **"Special offer" −£63.36** → room **£253.44** (0.181) | **−81.9%** | FLAG | p05_0910nov_1n 07:16:09Z, _a2 07:16:10Z |
| P05 | Airbnb | 16–18 Nov (11) | 7 | £766 | £766.00 | £585.99 (£780.99) = 0.765 | **−23.5%** | FLAG | p05_1618nov |
| P05 | Airbnb | 4–7 Jan (60) | 7 | £1,271 | £1,271.00 | £1,118.48 (visible **"Early booking discount" −£152.52 = 12.0%**) | −12.0% | FLAG (visible, not in policy) | p05_0407jan |
| P08 | Airbnb | 5–7 Nov (0) | 4 | £334 | £334.00 | £283.90 (£432.90) = **0.850** | −15.0% | FLAG | p08_0507nov 07:16:43Z |
| P06 | Airbnb | 8–11 Nov (3) | 3 | **£443 (200 / 2 / 241)** | £443.00 | £537.03 (£666.03), **identical to 4 Nov** = 0.765 × 4 Nov Smoobu £702 | +21.2% | FLAG: Airbnb not following Smoobu | p06_0811nov 07:16:22Z |
| P06 | Airbnb | 9–11 Nov (4) | 3 | **£243 (2 / 241)** | £243.00 | £362.61 (£491.61) = 0.765 × 4 Nov Smoobu £474 | +49.2% | FLAG (same) | p06_0911nov 07:16:34Z |
| P09 | Airbnb | 10–12 Nov (5) | 2 | £235 (113 / 122) | £235.00 | £304.77 − "Discount from Airbnb" £7.62 = £297.15 incl. cleaning; P09 cleaning is not on record. If the 0.765 layer applies, cleaning = £124.99 (inference) | NOT CHECKED (cleaning unknown) | — | p09_1012nov 07:16:38Z |
| P04 synced | Airbnb | 9–12 Nov (4) | 2 | £423 | £423.00 | £323.59 = 0.765 | −23.5% | FLAG | §1 |
| P04 synced | Airbnb | 6–9 Dec (31) | 2 | £551 | £551.00 | £495.90 = 0.900 | −10.0% | FLAG | §1 |
| P04 synced | Airbnb | 6–19 Dec, 13 n | 2 | £2,440 | £2,074.00 (weekly 15%) | £1,800.73 = 0.900 × (1 − 0.18) | −13.2% | FLAG | §1 |
| P12 | Booking.com (paid, not displayed) | 4–7 Dec (29) | 5 | £769 | £884.35 | £677.79 paid | −23.4% vs list | FLAG (promotions; policy: size only) | Smoobu 162667435 |
| all | Booking.com displayed | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:18:03Z | — | — | live05/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Hidden 0.765 / 0.900 layers: still present on every synced listing (day 7).**
- The multipliers are unchanged:
  - **0.765 at ≤28 days**
  - **0.900 at 31–34 days**
  - **1.000 at 60 days**, with only visible early-booking discounts
- New today: **P08 at lead 0 showed 0.850**, not 0.765, to the penny. At same-day lead only one 15% layer applied.
- Guests see none of these as a discount line.
- **a-airbnb-rules: NOT fixed.**

**P05 9 Nov: NOT fixed (sixth check).** The Airbnb card is identical to every check since 31 Oct (£316.80 room − 20% Special offer = £253.44). Smoobu now holds £1,403 (was £1,411).

**P05 12% early booking: still on** (£152.52 on £1,271, 4–7 Jan). **a-p05-earlybird: NOT fixed.**

**P13 twins.**
- Today the Smoobu rates differ on 4 Jan (£175 vs £165), so the January cards are no longer identical (£712 vs £702).
- 8–11 Nov (£540 vs £480) and 9–12 Dec (£674 vs £637) also differ.

### 4. New, critical: P06 Marylebone 9 Nov priced at £2 in Smoobu

- **Smoobu `/api/rates` 07:13:53Z for 3288517:**
  - 8 Nov **£200** (4 Nov: £228)
  - **9 Nov £2** (4 Nov: £233)
  - 10 Nov £241
  - 11 Nov £255
  - All four nights open, min 2.
- The rest of November is booked (5–8 and 12–15 Nov, Airbnb) or blocked from 15 Nov (Blocked channel 143402691). These four nights are open inventory, so the intentional-block policy does not cover them.
- **PriceLabs on these nights has only a −5% override** (8–14 Nov, Reyhan 4 Nov 01:28Z; `get_listing_date_overrides`). That cannot produce £2.
- The only later event is Reyhan's "fixed" override on **15–22 Nov at 12:52:23Z, logged without a price value**, followed by the P06 push at 12:52:54Z (`listing_data.json`).
- Today PriceLabs returns LISTING_NO_DATA for P06. **Cause of the £2: NOT KNOWN.** The timing points at the 12:52Z push.
- **Airbnb has not taken the new rates.** Both P06 cards equal 0.765 × the 4 Nov Smoobu rates to the penny (8–11 Nov £666.03, unchanged from 4 Nov). So the £2 is **not live on Airbnb** as of 07:16Z, and neither is the 8 Nov drop to £200.
- **Booking.com (P06 has 11 Booking.com bookings in `reservations.csv`) is NOT CHECKED.** If it is synced, the list price for 9 Nov would be £2.30.
- **Exposure:**
  - 8–10 Nov at Smoobu rates is £202, against £461 on 4 Nov rates (−£259).
  - The whole 8–12 Nov run is £498, against £716 (−£218).

### 5. Booking.com since the 24 Oct markup cut (+30% → +15%, 13:38Z; 11.7 days)

Changes since yesterday:
- +1 booking: P12 4–7 Dec, 3 n, £677.79, PriceLabs £769, **0.881**.
- −1 confirmed: P12 3–7 Dec cancelled (4 n, £1,072.44, PriceLabs at booking £1,148 per the 30 Oct section).

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **16** | **62** | **£11,049.72** | £13,760 | **0.803** |
| Still confirmed | **12** | **49** | **£8,017.79** | £10,348 | **0.775** |
| Net of all cancellations (incl. pre-cut cancellations 25 n / £5,051.37) | | **+24 n** | **+£2,966.42** | | |

- Pace: **1.37 bookings a day gross and 1.03 a day confirmed**, against about 0.33 a day before the cut. Both fell from yesterday (1.4 / 1.1).
- Cancellations of since-cut bookings: 4, all Mile End or Barking (P12 4–8 Dec, P12 3–7 Dec, P11 12–14 Dec, plus the P04 duplicates counted once).
- The rise still cannot be credited to the markup cut alone, because Last Minute 10% started the same day.
- PriceLabs-at-booking values for earlier bookings are carried from the 30 Oct to 4 Nov sections.

**`rate_leak_next_30` (kpi_pack) with the VAT correction.**
- PriceLabs ADR on Booking.com nights excludes VAT, so I multiplied those nights by 1.2.
- Channel per night comes from `reservations.csv` 5 Nov (confirmed); nights come from `prices.csv` 5 Nov–4 Dec.
- P12 4 Dec is not yet in the pack's booked nights, because PriceLabs had not synced the rebooking.

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights, adjusted | Airbnb nights |
|---|---|---|---|---|
| P11 | −29.1% | **−14.9%** | 10 n, −14.9% | — |
| P04 | −29.0% | −17.0% | 10 n, −15.0% | 2 n, −27.9% |
| P12 | −37.9% | −27.6% | 12 n, −28.9% | 2 n, −19.3% |
| P13 | −49.1% | −43.5% | 8 n, −48.9% | 4 n, −33.2% |

- The other flats are Airbnb-only in the window, so no VAT change applies: P05 −9.6%, P08 −33.0%, P20 −40.3%.
- P01, P06, P09 and P10 have no PriceLabs prices today (LISTING_NO_DATA), so the pack has no leak figure for them.
- These gaps include the policy weekly/monthly discounts and PriceLabs `booked_price` quirks. They show where to look; the checks above establish the causes.

### 6. Net to owner per £100 PriceLabs price (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com P12 4–7 Dec (0.881; 15% on room + cleaning) | £88.14 | **£71.99** |
| Booking.com since cut, confirmed (0.775) | £77.50 | ~£63–66 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 60 d | £100 (P13 £90, P05 £88 visible early bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 31–34 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb at ≤34 days is £76.50–£90, and Booking.com as sold is £77–88.
- **Booking.com as sold nets about £63–72, below the Airbnb model (£84.50).**

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 7. P01 / P06 / P09 / P10 (PriceLabs prices NOT AVAILABLE today)

| Ref | Smoobu open nights 5 Nov–5 Feb (07:13Z) | Airbnb shows | Note |
|---|---|---|---|
| P01 3320302 (last night 20 Dec) | **0**. Airbnb 160207726 31 Oct–30 Nov; blocked 30 Nov–18 Dec; Airbnb 18–21 Dec; blocked from 21 Dec | 1684808250380202589 not offered for 6–9 Nov (32 cards; `p01_0609nov`) | Nothing for sale, so the missing prices cost nothing until handback |
| P06 3288517 (intentional block, open 8–11 Nov) | 8–11 Nov: **£200 / £2 / £241 / £255**, min 2 | Still on 4 Nov rates (§4) | **£2 night: see §4** |
| P09 3318172 (last night 26 Nov) | **10–12 Nov only: £113 / £122 / £129**, min 2. Rest booked until 27 Nov, then blocked | 10–12 Nov card £297.15 incl. cleaning, with an Airbnb-funded "Discount from Airbnb" £7.62 | Last push 4 Nov 07:27:40Z; no push today (t-push-check: no slot today) |
| P10 3318177 (last night 18 Nov) | **0**. Airbnb 159405506 18 Oct–19 Nov; blocked from 19 Nov | 1681425766690680710 not offered for 6–9 Nov (`p10_0609nov`) | Nothing for sale |

### 8. Fees, min stay and plan items

- **Cleaning** matches on every card (exact fit of the 0.765/0.900/0.850 ratios). P12 Booking.com cleaning is £150 on both bookings.
- **P04 weekly 18% vs 15%: NOT fixed.** £395.27 on £2,196 room for 6–19 Dec = **18.0%**, which is **£65.88 more** than policy's 15%.
- **t-p20-delivery: NOT fixed as recorded; the evidence points to a moved delivery.**
  - Smoobu shows the 20–22 Nov "Blocked channel" 160937106 as **cancelled (modified 30 Oct 18:11)**, and a new block **18–20 Nov** (162432556, created 3 Nov 10:31).
  - Smoobu 20–23 Nov is open (£238/293/279, min 3). Airbnb sells 20–23 Nov (£769.64 card) and correctly does not offer 18–21 Nov.
  - Policy still says 20–22 Nov. **Corentin to confirm that the delivery moved to 18–20 Nov.**
- **P20 min stay conflict (for Corentin).** Smoobu 16–17 Nov is min 2 (Reyhan, 4 Nov 01:29Z), against policy's "3 nights 25 Oct–30 Nov".
- **P04 override conflict (for Corentin).** Reyhan's −15% on 9–24 Nov vs the −8% on record. Smoobu 9 Nov is £139 (4 Nov £148).
- **t-channel-gaps (P11): NOT fixed.**
  - 23 Dec £294 (was £298; target ≥£316).
  - 3 Jan £190 (target £201).
  - Booking.com visibility is NOT CHECKED.

### Issues ordered by £ impact

1. **Critical — P04 unsynced Airbnb 1455876748739910219 sells 5–9 Nov over tonight's in-house Booking.com guest and the 6–9 Nov Airbnb stay.** Day 6. £748.90 room at risk, plus relocation. No booking on 1455 is visible yet.
   **Setting:** Airbnb host 551951609 > listing 1455876748739910219 > Calendar: **block 5–8 Nov now**, then every night while it is unsynced (or snooze the listing). Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or unlist it.
2. **Critical — P06 9 Nov at £2 (8 Nov £200) in Smoobu, open, min 2.** Up to −£259 on an 8–10 Nov stay.
   - Airbnb is not live yet, because it is still on 4 Nov rates. That also means Airbnb is not following Smoobu for P06.
   - Booking.com is NOT CHECKED.
   - **Setting:** Smoobu > Rates > Marylebone (3288517) > 9 Nov: set at least the PriceLabs minimum (£200), or close the night until the cause is found. Then check Reyhan's 4 Nov 12:52Z "fixed" override in PriceLabs (no price in the log) and the P06 Airbnb sync status in Smoobu > Channel Manager.
3. **High — hidden Airbnb layers 0.765 (≤28 d) / 0.900 (about 31–59 d) on every synced listing.** Day 7: 23.5% off every short-lead Airbnb night.
   **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (and any global rule): remove the ≤28-day and ≤60-day rules. Use visible Airbnb discounts instead (`airbnb_visible_discounts`).
4. **High — P05 9 Nov sells on Airbnb at £253.44 room against Smoobu £1,403.** Sixth check: −£1,149.56 if it sells.
   **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom price and the Special offer.
5. **Medium — P12 Booking.com 4–7 Dec stack 23.5% off list (£208.21), plus £22.50 commission on cleaning.** The rebooking cost −1 night / −£394.65. The stack is Genius 15% × Mobile 10% (best reading); stacking is policy, so this is size only.
   **Setting:** Booking.com extranet > Mile End > Promotions > Genius: Level 1 only (as at Camden and Shepherd's Bush since 21 Oct). Commission on cleaning: Corentin's call.
6. **Medium — P05 visible 12% early bird** (£152.52 on 4–7 Jan). Not in policy.
   **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird.
7. **Medium — P04 synced weekly 18% vs 15%** (£65.88 on 6–19 Dec).
   **Setting:** Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts > Weekly: 15%.
8. **Medium — conflicts for Corentin to confirm (not new proposals):**
   - P20 delivery block moved from 20–22 to 18–20 Nov
   - P20 min 2 on 16–17 Nov
   - P04 −15% vs −8%
   - P11 23 Dec / 3 Jan below the t-channel-gaps targets

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:18:03Z; not circumvented). The P12 4–7 Dec stack is inferred from paid ÷ (Smoobu × 1.15, rounded up per night). It fits to the penny, but which 15%/10% pair applied is not visible.
2. Whether P12 4–7 Dec is the same guest as the cancelled 3–7 Dec booking: NOT CHECKED (guest data not used). Any cancellation fee on 161902221: NOT CHECKED.
3. Listing 1455's own reservations, cleaning and min stay: NOT CHECKED (not in Smoobu). Its cards show it unbooked on 5–9 Nov at 07:15Z.
4. Cause of the P06 £2 rate, and why P06's Airbnb is on 4 Nov rates: NOT CHECKED. PriceLabs gives LISTING_NO_DATA for P06; the Smoobu sync log is not available via the API.
5. P09 Airbnb cleaning fee is not on record, so the P09 ratio is not computed.
6. Vrbo +8% and Direct −10% are unconfirmed defaults, so the direct < OTA ordering is model-only.
7. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT. Earlier PriceLabs-at-booking values are carried from previous sections.
