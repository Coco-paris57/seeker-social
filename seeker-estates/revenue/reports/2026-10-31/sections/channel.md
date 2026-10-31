## Channel parity

Run date D = 2026-10-31 (GMT). I read `data/policy.json` first and do not raise again anything it settles:
- the 15%/20% stay discounts and Booking.com promotion stacking (I report sizes only);
- the Visibility Booster;
- P13 = one flat;
- the P02/P03/P06/P07 blocks and P14;
- P20's recorded Airbnb discounts and nights after handback;
- the deprioritised items.

**Sources (all read-only)**
- **Smoobu GET, 31 Oct 07:19Z:**
  - `/api/rates`: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live31/smoobu_rates31.json`.
  - `/api/reservations?modifiedFrom=2026-09-28&includePriceElements=true`, guest fields dropped (no names, emails, phones or notice text; only a genius true/false flag kept): `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live31/smoobu_mod31_pe.json`.
- **`data/snapshots/2026-10-31/reservations.csv`** (692 rows) and `raw/prices_*.json` (PriceLabs refresh 30 Oct 22:10–22:15Z).
- **PriceLabs `get_user_logs`** (listing, 30–31 Oct): 35 entries, all by Reyhan, 30 Oct 22:05–22:12Z (summarised in §5).
- **Live Airbnb:** 34 plain public airbnb.co.uk searches (curl, no workarounds), 31 Oct 07:19:30Z–07:23:07Z.
  - One JSON per search plus the log: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live31/air/` (`log.txt`).
  - 35 rows appended under lock to `data/snapshots/2026-10-31/channel_checks.csv`. Each row has the URL, stay, guests, timestamp and Smoobu rates.
  - "Displayed" = card total before taxes, which includes cleaning, minus cleaning: P20/P12/P13 £150, P05 £195, P08 £149, synced Barking listing £142.
- **Booking.com: NOT CHECKED.** One plain search at 07:24:30Z returned HTTP 202 with an AWS WAF challenge (`.../live31/bk/search.html`). I did not try to get around it.
- **Vrbo / Direct: NOT CHECKED.** There is no public URL and no checks row.
- **Config:** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults** (`rm/config.py` CHANNELS).

### 1. Barking (P04): double-booking exposure is still open

Smoobu (live, 07:19Z) for apartment 3562176:
- **3–6 Nov** is booked on Booking.com, 161785771, £393.18 room. It was modified 30 Oct 10:05 and is still confirmed.
- **6–9 Nov** is booked on Airbnb through the synced listing, 161888271, £355.72 room. It was modified 30 Oct 18:31 and is still confirmed.
- **20–23 Nov:** all three duplicate Booking.com rows are now cancelled. The last one, 161477681, was cancelled **30 Oct 12:01:24**. Smoobu shows 20–24 Nov available, min 3.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 (host 551951609) | Synced 1657859794156786222 | Verdict | Source (`live31/air/`) |
|---|---|---|---|---|---|
| 2–5 Nov | 3–5 booked | **bookable** £519.80 card | not offered | **double-sell** | p04_0205nov 07:20:08Z |
| **3–6 Nov** | booked (Booking.com) | **bookable £518.20 card** (same as 30 Oct) | not offered | **DOUBLE-SELL, arrival in 3 days** | p04_0306nov 07:19:30Z |
| 5–8 Nov | booked | **bookable** £474.68 | not offered | **double-sell** | p04_0508nov |
| **6–9 Nov** | booked (Airbnb via 1657…) | **bookable £474.68 card** (same as 30 Oct) | not offered | **DOUBLE-SELL** | p04_0609nov 07:19:37Z |
| 8–11 Nov | 8 Nov booked | **bookable** £479.00 | not offered | **double-sell** | p04_0811nov |
| 9–12 / 10–13 Nov | open | £497.00 / £513.56 (own prices) | £542.85 / £544.38 (0.765 × Smoobu + £142) | both sell open nights | p04_0912nov, p04_1013nov |
| 14–17, 17–20, 23–26, 26–29 Nov; 3–6 Dec | booked or partly booked | not offered | not offered | ok | p04_1417nov … p04_0306dec |
| 19–22 / **20–23** / 21–24 Nov | **open** since the cancellation | **bookable**: £538.04 / **£541.64** / £538.04 | bookable: £626.24 / £627.01 / £617.83 | both sell the same open nights | p04_1922nov, p04_2023nov 07:19:46Z, p04_2124nov |
| 20–22 Nov (2 n) | min 3 | not offered | not offered | ok (min 3 holds) | p04_2022nov_2n |
| 1–3 Nov (2 n) | open, **min 2** | not offered | **bookable, £482.42 card** | min-stay conflict (§5) | p04_0103nov_2n 07:22:08Z |

- **t-p04-doublebook is NOT fixed.** Listing 1455… still sells every Smoobu-booked night from 3 to 8 Nov.
  - Two confirmed stays are exposed: **£748.90 room** (£393.18 + £355.72), plus relocation cost (not quantified).
  - It also sells every open night that the synced listing sells, so each new sale on either listing can double-book the other.
  - It does block some Smoobu-booked dates: 14–17 Nov (booked 24 Oct) and 26 Nov–6 Dec. It does not block 3–8 Nov (booked 28–29 Oct). One possible reading is that someone blocked it by hand up to about 24 Oct and stopped. That is inference, not checked.
- **Did the 20–23 Nov cancellation coincide with a sale on 1455…? The evidence says no.**
  - At 07:19:46Z today, 1455… still offers the full 20–23 Nov stay at the same £541.64 as on 30 Oct 07:27Z. It also offers 19–22 and 21–24 Nov.
  - A booking on 1455… would have closed those nights on its own calendar. So as of 07:19Z no Airbnb guest holds any night from 19 to 24 Nov on 1455….
  - **NOT CHECKED:** 1455…'s reservation list. It is not in Smoobu, and its host inbox is not visible to me. The reason for the Booking.com cancellation is not in the Smoobu API.

### 2. Live Airbnb parity, 31 Oct (lead-time layers)

How the columns are built:
- **Expected** = Smoobu rate × (1 + 0%) × the discounts policy recognises:
  - P20 last-minute 15% at 0–14 days;
  - P13 last-minute 10% within 14 days and early bird 10% at 60+ days.
- **Gap** = displayed ÷ expected − 1.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live31/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 9–12 Nov (9) | 2 | £739 | £628.15 (LM15) | £565.33 (£715.33) = 0.765 | −10.0% | FLAG | p20_0912nov 07:22:22Z |
| P20 | Airbnb | 5–8 Dec (35) | 2 | £926 | £926.00 | £833.40 (£983.40) = 0.900 | −10.0% | FLAG | p20_0508dec |
| P20 | Airbnb | 3–6 Jan (64) | 2 | £862 | £862.00 | £862.00 (£1,012.00) | 0.0% | ok | p20_0306jan |
| P12 | Airbnb | 18–21 Nov (18) | 2 | £749 | £749.00 | £572.98 (£722.98) = 0.765 | **−23.5%** | FLAG | p12_1821nov 07:22:40Z |
| P12 | Airbnb | 29 Nov–2 Dec (29) | 2 | £812 | £812.00 | £730.80 (£880.80) = 0.900 | −10.0% | FLAG | p12_2902dec |
| P12 | Airbnb | 8–11 Dec (38) | 2 | £835 | £835.00 | £751.50 (£901.50) = 0.900 | −10.0% | FLAG | p12_0811dec |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (8) | 4 | £549 | £494.10 (LM10) | £419.97 (£569.97) = 0.765, **no Special offer line** | −15.0% | FLAG | p13_0811nov 07:22:50Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (8) | 4 | £453 | £407.70 | £346.53 (£496.53) = 0.765 | −15.0% | FLAG | same |
| P13 3090701 | Airbnb | **8–12 Nov** (8) | 4 | £736 | £662.40 | £563.02 (£713.02) = 0.765, **no Special offer line** | −15.0% | FLAG | p13_0812nov 07:22:53Z |
| P13 3064856 | Airbnb | 8–12 Nov (8) | 4 | £607 | £546.30 | £464.34 (£614.34) = 0.765 | −15.0% | FLAG | same |
| P13 both | Airbnb | 8–11 Dec (38) | 4 | £664 | £664.00 | £597.60 (£747.60) = 0.900 | −10.0% | FLAG | p13_0811dec |
| P13 both | Airbnb | 3–6 Jan (64) | 4 | £609 | £548.10 (EB10) | £548.10 (visible "Early booking discount −£60.90") | 0.0% | ok | p13_0306jan |
| P05 | Airbnb | 16–18 Nov (16) | 7 | £832 | £832.00 | £636.48 (£831.48) = 0.765 | **−23.5%** | FLAG | p05_1618nov 07:23:03Z |
| P05 | Airbnb | 29 Nov–3 Dec (29) | 7 | £2,173 | £2,173.00 | £1,955.70 (£2,150.70) = 0.900 | −10.0% | FLAG | p05_2903dec |
| P05 | Airbnb | 7–9 Dec (37) | 7 | £997 | £997.00 | £897.30 (£1,092.30) = 0.900 | −10.0% | FLAG | p05_0709dec |
| P05 | Airbnb | 4–7 Jan (65) | 7 | £1,276 | £1,276.00 (no P05 early bird in policy) | £1,122.88 (visible **"Early booking discount −£153.12" = 12.0%**) | −12.0% | FLAG (visible) | p05_0407jan 07:23:05Z |
| P08 | Airbnb | 5–7 Nov (5) | 4 | £415 | £415.00 | £317.47 (£466.47) = 0.765 | −23.5% | FLAG | p08_0507nov 07:23:06Z |
| P04 synced 1657… | Airbnb | 9–12, 10–13, 19–22, 20–23, 21–24 Nov (9–21) | 2 | £524–£634 | Smoobu rate | 0.765 on every stay (e.g. 20–23 Nov £485.01 vs £634) | −23.5% | FLAG | p04_* |
| P04 synced 1657… | Airbnb | 1–3 Nov, 2 n (1) | 2 | £462 | not bookable (min 3 policy) | **bookable** £340.42 (£482.42) = 0.737 | −26.3% + min-stay | FLAG | p04_0103nov_2n |
| P04 unsynced 1455… | Airbnb | 3–6, 6–9 Nov | 2 | booked | not bookable | bookable £518.20 / £474.68 card | double-sell | **FLAG** | §1 |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:24:30Z | — | — | live31/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**a-airbnb-rules is NOT fixed.** All Smoobu-synced cards resolve exactly (25 listing-cards; the only exception is the P04 1–3 Nov 2-night card at 0.737), per night, to these factors:
- **0.765 at ≤28 days.** That equals 0.85 × 0.90.
- **0.900 at 29–40 days.**
- **1.000 at 64+ days.**

The same layers apply on P20, P12, both P13 listings, P05, P08 and the synced Barking listing, unchanged since 30 Oct. Guests are not shown them. comp-west's 31 Oct rows for P13 (room ÷ PriceLabs 0.738–0.766 at ≤28 days and 0.90 at 31–56 days) agree.

**Requested re-checks**
- **t-p13-offer: no longer showing.** P13 3090701 had a Special offer on 8–11 Nov on 30 Oct (−£120.19). Today there is no offer line on 8–11 Nov or on 8–12 Nov: it is plain 0.765. comp-west's 31 Oct rows (8–10 and 10–12 Nov) also show none. Note that the Smoobu rate for 8–11 Nov fell from £568 to £549. Reyhan's 30 Oct 22:08Z override on 4–12 Nov set min 2 and a 0% price.
- **a-p05-earlybird: still showing.** P05 4–7 Jan shows a visible "Early booking discount" of exactly 12% (−£153.12 on £1,276). It is not recorded in policy for P05.

### 3. Monitoring (until 4 Nov)

**a) Airbnb bookings, last 14 days (booked 18–31 Oct) vs the prior 14 (4–17 Oct)**
- Source: `data/snapshots/2026-10-31/reservations.csv`, confirmed rows, room £ (cleaning excluded).
- The P04 28 Sep stay imported 26 Oct is excluded as not pickup.
- There have been **no new Airbnb bookings since 29 Oct 18:58** (Smoobu live).

| Window | Bookings | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 | 15 | 62 | £14,862.47 | £240 | 1 (P08 duplicate) |
| Prior 14 | 20 | 156 | £22,674.16 | £145 | 2 |
| Change | −25% | **−60% (>50% drop)** | −34% | +65% | |
| Prior without the two 28+ night stays (P10 32 n, P01 30 n) | 18 | 94 | £14,719.41 | £157 | |
| Change on that basis | −17% | −34% | +1% | +53% | |

| Property | Last 14 (count / nights / £ per n) | Prior 14 | >50% drop? |
|---|---|---|---|
| P01 | 1 / 3 / £240 | 1 / 30 / £152 | nights −90%: one 30-night stay; gap block and handback limit inventory |
| P02 | 0 | 2 / 10 / £106 | intentional block, not raised |
| P04 | 2 / 4 / £143 | 0 | — |
| P05 | 2 / 10 / £542 | 1 / 4 / £459 | no |
| P06 | 1 / 3 / £268 | 4 / 18 / £189 | **yes, count −75%, nights −83%.** Intentional-block flat; reported, not called lost demand |
| P08 | 2 / 9 / £134 | 1 / 6 / £129 | no |
| P09 | 1 / 2 / £127 | 3 / 23 / £103 | **yes, −67% / −91%.** Handback 26 Nov; inventory-limited |
| P10 | 0 | 1 / 32 / £106 | **yes, −100%.** Sold to its 18 Nov handback |
| **P12** | **0** | **2 / 5 / £170** | **yes, −100%, not inventory.** Bookable on Airbnb today on 18–21 Nov, 29 Nov–2 Dec and 8–11 Dec (§2) |
| P13 | 3 / 14 / £206 | 3 / 13 / £156 | no |
| P20 | 3 / 17 / £177 | 2 / 15 / £159 | no |

**Paid vs PriceLabs, Airbnb bookings made after 21 Oct.** Nothing new since 30 Oct. The 10 rows in `reports/2026-10-30/sections/channel.md` §3 stand:
- **9 of 10 are below PriceLabs minus the policy stay discounts.** Typical ratio 0.765, with lows of 0.639 on P20 28 Oct and P05 29 Oct.
- Only P13 27 Dec–3 Jan (0.903 after weekly × early bird) is explained.
- No booking made after 21 Oct is "close to PriceLabs minus 15/20%". The unexplained gap is the hidden 0.765/0.900 layer.

**Flexible-cancellation test** (P20, P06, P05 since 24 Oct; day 7 of 14):
- Test group: 4 bookings (P20 ×2, P06, P05), 0 cancelled.
- Others: 5 (P08 ×2, P13, P04 ×2) plus 1 cancelled (P08 duplicate).
- Too early to read. The review is due 7 Nov.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38)**
- Source: `reservations.csv` plus Smoobu `created-at`. The 20 Oct Channex imports are excluded.
- PriceLabs at booking is taken from `reports/2026-10-30/sections/channel.md` §3b.

| Measure | Bookings | Nights | Room £ (VAT incl.) | PriceLabs at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut (6.7 days) | 11 | 49 | £8,121.35 | £10,426 | 0.779 |
| Less cancelled: P12 4–8 Dec (28 Oct) | −1 | −4 | −£1,116.99 | −£1,180 | |
| Less cancelled: **P04 20–23 Nov (161477681, 30 Oct 12:01)** | −1 | −3 | −£355.82 | −£533 | |
| **Still confirmed** | **9** | **42** | **£6,648.54** | £8,713 | **0.763** |
| Cancellations since the cut of bookings made before it (P12 22–29 Nov, P11 28 Nov–12 Dec, P12 18–22 Nov) | | −25 | −£5,051.37 | | |
| **Net of all cancellations** | | **+17 n** | **+£1,597.17** (30 Oct: +20 n, +£1,952.99) | | |

- Pace: **1.6 bookings/day gross, 1.3/day net**, against about 0.33/day before the cut (28 Oct section).
- **No Booking.com booking since 29 Oct 21:04** (P12 3–7 Dec), about 34 hours.
- The cut still cannot be credited on its own: Last Minute 10% started the same day, and confirmed stays sold at 0.64–0.93 of PriceLabs.

### 4. Net to owner per £100 PriceLabs price

Sources: `channel_economics` in `kpi_pack.json`, plus what was observed.

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (pack) | £115.00 | £97.75 |
| Booking.com since cut, still confirmed (0.763, 15–20% commission) | £76.3 | ~£61–65 |
| Airbnb model (pack) | £100.00 | £84.50 |
| Airbnb live 64+ d | £100.00 (P13 £90 and P05 £88 with the visible early bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 29–40 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` list is empty, but the observed prices break two of its rules.
- **Direct is not the cheapest guest price.** Airbnb at ≤40 days (£76.50–£90) and Booking.com as actually sold (£76.3) are at or below the £90 direct price.
- **Booking.com as sold (~£61–65 net) is below the Airbnb model net (£84.50).** It is about level with Airbnb ≤28 d (£64.64).
- Ordering on the same dates (direct < Airbnb/Booking/Vrbo) is NOT CHECKED: Booking.com is behind the WAF, and Vrbo and direct have no URL.

### 5. Fees and min stay, displayed vs Smoobu; status of the open plan items

**Barking (P04) minimum stay**
- **New conflict:** the synced Barking listing sells a **2-night stay on 1–3 Nov**, at £340.42 room (0.737 of Smoobu £462).
  - Cause: Reyhan's override of 30 Oct 22:12Z on 3562176 sets 1–2 Nov at +50% with **min 2**. Smoobu shows min 2.
  - This conflicts with "never open for less than 3" (`listing_facts.P04`). Reported for Corentin to confirm, not proposed.
- **The 18–20 and 23–25 Nov min-2 conflict is resolved:** Reyhan's 22:12Z override sets 18–24 Nov at −3%, min 3. The 23–25 Nov 2-night stay is no longer offered (p04_2325nov_2n).
- Listing 1455… offers no 1- or 2-night stays (20–22 Nov 2-night not offered).

**Fees**
- Cleaning, unchanged and consistent with Smoobu bookings: synced Barking £142; P05 £195; P08 £149; P13/P20/P12 £150. Every card fits Smoobu × factor + this cleaning to the penny.

**Plan items**
- **t-pl-sync: fixed.** PriceLabs raw (30 Oct 22:10–22:15Z) shows P04 3–8 Nov and P05 6–8 Nov as Booked.
- **a-p05-9nov:** Reyhan set P05 9 Nov to +300%, min 1. Smoobu now carries **£1,442** for that night, which in effect closes the orphan by price. For the pricelabs section; noted here because it is what Airbnb will show.
- **P20 20–22 Nov:** the Smoobu "Blocked channel" delivery block was cancelled 30 Oct 18:11. 20–22 Nov is now open at £292/£305, min 3. Policy records it as an intentional delivery block (24 Oct), so Corentin should confirm that the delivery moved.

### Issues ordered by £ impact

1. **P04 Barking: unsynced Airbnb listing 1455876748739910219 still double-sells 3–6 and 6–9 Nov (t-p04-doublebook: NOT fixed). Critical.**
   - £748.90 room is at risk, plus relocation cost. The 3 Nov arrival is 3 days away.
   - The listing also sells 20–23 Nov, which reopened when the Booking.com stay was cancelled. Any sale there or on the synced listing now creates a new double-booking.
   - **Setting:** Airbnb host 551951609 "Seeker Estates LTD" > listing 1455876748739910219 > Calendar: **block 2–8 Nov today.** Then either map the listing in Smoobu > Channel Manager > Airbnb to apartment 3562176, or snooze/unlist it. Barking already sells through 1657859794156786222.
2. **Hidden Airbnb layers 0.765 (≤28 d) / 0.900 (29–40 d) on every synced listing (a-airbnb-rules: NOT fixed).**
   - Realised so far: £438.04 on the 29 Oct bookings (P05 £328.76, P04 £109.28) and £574 on P20 (28 Oct), per the 30 Oct section.
   - Forward: every ≤28-day night sells 23.5% under Smoobu, and every 29–40-day night 10% under.
   - **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute rule (≤28 days) and the ~10% rule (≤~60 days). Check for a global rule too: Shepherd's Bush still shows 0.765 at 8 days despite the 21 Oct reset to −10% within 14 days.
   - If a discount is wanted, use a visible Airbnb discount instead (`airbnb_visible_discounts`).
3. **P05 visible 12% early-booking discount at 60+ days**, −£153.12 on 4–7 Jan. It is visible, which fits Corentin's preference, but it is not in policy for P05.
   - **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > pricing rules > Early bird.
4. **P04 synced listing sells 2-night stays on 1–3 Nov.** This conflicts with "never under 3" and is for Corentin to confirm.
   - **Setting:** PriceLabs 3562176 > date-specific override 1–2 Nov (Reyhan, 30 Oct 22:12Z, +50%, min 2).
5. **P12 Airbnb: 0 bookings in 14 days (−100%), not inventory.** It is bookable at 0.765/0.900 of Smoobu. Not quantified.

Fixed or no longer showing: t-p13-offer (no Special offer on 3090701 for 8–11 or 8–12 Nov), t-pl-sync (P04/P05 6–8 Nov now Booked in PriceLabs), and the P04 18–25 Nov min-2 conflict.

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF challenge at 07:24:30Z; not circumvented). Booking.com stacks are inferred from paid ÷ list only.
2. Listing 1455…'s own reservations are NOT CHECKED (not in Smoobu, host inbox not visible). "No sale on 19–24 Nov" rests on its public availability at 07:19Z. The reason for the 20–23 Nov Booking.com cancellation is not exposed by the Smoobu API.
3. Which Barking Airbnb listing took the 19–20 Dec booking (26 Oct) is still NOT CHECKED.
4. Vrbo +8% and Direct −10% are unconfirmed defaults (`rm/config.py`). With no Vrbo or direct URL, the direct < OTA ordering is model-only.
5. Airbnb cleaning amounts come from Smoobu bookings and exact factor fits, not from an itemised page.
6. The P04 1–3 Nov card factor is 0.737, not exactly 0.765. Its components are not identified (possibly a different push for the min-2 nights).
7. PriceLabs at booking for the Booking.com rows is carried from the 30 Oct section; no new bookings were added.
