## Channel parity

Run date D = 2026-11-01 (Sunday, GMT). `data/policy.json` was read first. Nothing it settles is raised again: the 15%/20% stay discounts, Booking.com promotion stacking (sizes only), the Visibility Booster, P13 = one flat, the P02/P03/P06/P07 blocks, P14, P20's recorded Airbnb discounts, nights after handback, and the deprioritised items.

**Sources (all read-only)**
- **Smoobu GET:**
  - `/api/rates` at 2026-11-01T07:20:05Z → `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live01/smoobu_rates01.json`
  - `/api/reservations?modifiedFrom=2026-09-28` at 07:20:14Z, with guest fields dropped (only key names kept, no values) → `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live01/smoobu_mod01_pe.json`
- **`data/snapshots/2026-11-01/reservations.csv`**: 691 rows; the latest `booked_on` is 2026-10-29.
- **PriceLabs `get_user_logs`** (listing, 31 Oct–1 Nov): 59 entries, all by Reyhan, at 14:28–14:34Z and 22:05–22:12Z on 31 Oct.
- **Live Airbnb:** 26 plain public airbnb.co.uk searches (curl, no workarounds) between 07:20:31Z and 07:22:58Z.
  - Per-search JSON and `log.txt` are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live01/air/`.
  - 32 rows were appended under lock to `data/snapshots/2026-11-01/channel_checks.csv`, which was copied forward from 31 Oct. Each row has the URL, stay, guests, timestamp and Smoobu rates.
  - "Displayed room" = card total before taxes minus cleaning. Cleaning used: P20/P12/P13 £150, P05 £195, P08 £149, synced Barking listing £142. Every synced card fits Smoobu × factor + cleaning to the penny.
- **Booking.com: NOT CHECKED.** One plain search at 07:24:18Z returned HTTP 202 with an AWS WAF challenge (`live01/bk/search.html`). I did not try to get around it.
- **Vrbo / Direct: NOT CHECKED.** No public URL and no checks row exist.
- **Config:** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults** (`rm/config.py` CHANNELS).

### 1. Barking (P04): double-booking exposure is STILL OPEN; the first arrival is in 2 days

Smoobu live (apartment 3562176):
- **3–6 Nov:** Booking.com 161785771, still confirmed. It was modified 31 Oct 12:13 and remains a booking. Room £393.18.
- **6–9 Nov:** Airbnb via the synced listing, 161888271, confirmed. Room £355.72.
- **19–20 Dec:** Airbnb 161475851, **cancelled 31 Oct 14:36:25**. 16–19 Dec is now open; 20 Dec onward is booked.
- **18–24 Nov:** open (17 Nov and 25 Nov are booked). Min 3.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 | Synced 1657859794156786222 | Verdict | Source (`live01/air/`) |
|---|---|---|---|---|---|
| **3–6 Nov** | booked (Booking.com) | **bookable, £518.20 card** (same as 30–31 Oct) | not offered | **DOUBLE-SELL; arrival Tue 3 Nov** | p04_0306nov 07:20:31Z |
| **6–9 Nov** | booked (Airbnb via 1657…) | **bookable, £474.68 card** | not offered | **DOUBLE-SELL** | p04_0609nov 07:20:39Z |
| 2–5 Nov / 5–8 Nov | 3–8 Nov booked | bookable, £519.80 / £514.20 | not offered | double-sell | p04_0205nov, p04_0508nov |
| 18–21 / 19–22 / 21–24 Nov | open | bookable, £525.80 / £538.04 / £538.04 | bookable, £578.81 / £587.99 / £581.87 (0.765 × Smoobu + £142) | both sell the same open nights | p04_1821nov, p04_1922nov, p04_2124nov |
| **18–24 Nov (whole open run, 6 n)** | open, £1,146 | **bookable, £944.84 card** | bookable, £1,173.40 − "Long stay discount" £103.14 = £1,070.26 | both sell; 1455… is the cheaper one | p04_1824nov 07:21:19Z |
| 19–20 Dec (1 n) | open, min 3 | not offered | not offered | ok (min 3 holds) | p04_1920dec_1n |
| 19–22 Dec | 20 Dec booked | not offered | not offered | ok | p04_1922dec |
| 17–20 Dec | open (reopened by the cancellation) | bookable, £694.10 | bookable, £679.30 (0.900) | both sell the same open nights | p04_1720dec |
| 1–3 Nov (2 n) | open, **min 2** | not offered | **bookable, £440.10 card** (room 0.8145 × Smoobu £366) | min-stay conflict (§5) | p04_0103nov_2n |

- **t-p04-doublebook is NOT fixed.**
  - Listing 1455… still sells 2–8 Nov over two confirmed stays. That puts **£748.90 room** at risk (£393.18 + £355.72), plus relocation cost (not quantified). The first guest arrives on 3 Nov.
  - The listing also sells the open 18–24 Nov run and 17–20 Dec, as does the synced listing. A sale on either listing can double-book the other.
  - On 18–24 Nov, 1455… is £125 cheaper for the 6 nights than the synced listing.
- **The cancelled 19–20 Dec booking:** neither listing offers 19–20 Dec as a 1-night stay today, so min 3 now holds on both. Which listing took it is still NOT CHECKED. Its £129 cleaning differs from the synced listing's £142, which points to 1455… (inference).

### 2. Live Airbnb parity, 1 Nov (lead-time layers and requested re-checks)

How the columns are built:
- **Expected** = Smoobu rate × (1 + 0%) × the discounts policy recognises: P20 last-minute 15% at 0–14 d; P13 last-minute 10% within 14 d and early bird 10% at 60+ d.
- **Gap** = displayed ÷ expected − 1.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live01/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| **P05** | Airbnb | **9–10 Nov, 1 n (8)** | 7 and 2 | **£1,462** | £1,462.00 | **£253.44** (£511.80 → £448.44 after **"Special offer −£63.36" = 20.0%** of the £316.80 room) | **−82.7%** | **FLAG** | p05_0910nov_1n 07:22:00Z, p05_0910nov_1n_a2 |
| P20 | Airbnb | 9–12 Nov (8) | 2 | £680 | £578.00 (LM15) | £520.19 (£670.19) = 0.765 | −10.0% | FLAG | p20_0912nov 07:22:15Z |
| P20 | Airbnb | 5–8 Dec (34) | 2 | £911 | £911.00 | £819.90 (£969.90) = 0.900 | −10.0% | FLAG | p20_0508dec |
| P20 | Airbnb | 3–6 Jan (63) | 2 | £865 | £865.00 | £865.00 (£1,015.00) | 0.0% | ok | p20_0306jan |
| P12 | Airbnb | 18–21 Nov (17) | 2 | £708 | £708.00 | £541.62 (£691.62) = 0.765 | **−23.5%** | FLAG | p12_1821nov 07:22:37Z |
| P12 | Airbnb | 29 Nov–2 Dec (28–30) | 2 | £775 | £775.00 | £663.34 (£813.34): 0.765 on 29 Nov, 0.900 on 30 Nov–1 Dec | −14.4% | FLAG | p12_2902dec |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (7) | 4 | £520 | £468.00 (LM10) | £397.79 (£547.79) = 0.765, no offer line | −15.0% | FLAG | p13_0811nov 07:22:45Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (7) | 4 | £429 | £386.10 | £328.18 (£478.18) = 0.765 | −15.0% | FLAG | same |
| P13 both | Airbnb | 8–11 Dec (37) | 4 | £645 | £645.00 | £580.50 (£730.50) = 0.900 | −10.0% | FLAG | p13_0811dec |
| P13 both | Airbnb | 3–6 Jan (63) | 4 | £615 | £553.50 (EB10) | £553.50 (visible "Early booking discount −£61.50") | 0.0% | ok | p13_0306jan |
| P05 | Airbnb | 16–18 Nov (15) | 7 | £831 | £831.00 | £635.71 (£830.71) = 0.765 | **−23.5%** | FLAG | p05_1618nov |
| P05 | Airbnb | 29 Nov–3 Dec (28–31) | 7 | £2,118 | £2,118.00 | £1,832.49 (£2,027.49): 0.765 on night 1, 0.900 on the rest | −13.5% | FLAG | p05_2903dec |
| P05 | Airbnb | 4–7 Jan (64) | 7 | £1,247 | £1,247.00 (no P05 early bird in policy) | £1,097.36 (visible **"Early booking discount −£149.64" = 12.0%**) | −12.0% | FLAG (visible) | p05_0407jan |
| P08 | Airbnb | 5–7 Nov (4) | 4 | £408 | £408.00 | £312.12 (£461.12) = 0.765 | −23.5% | FLAG | p08_0507nov 07:22:58Z |
| P04 synced 1657… | Airbnb | 18–21, 19–22, 21–24 Nov (17–22) | 2 | £571–£583 | Smoobu rate | 0.765 on every stay | −23.5% | FLAG | §1 |
| P04 synced 1657… | Airbnb | 18–24 Nov, 6 n | 2 | £1,146 | £1,146 | £928.26 = 0.900 × visible "Long stay discount" 10% = **0.810** | −19.0% | FLAG | p04_1824nov |
| P04 synced 1657… | Airbnb | 17–20 Dec (46) | 2 | £597 | £597 | £537.30 = 0.900 | −10.0% | FLAG | p04_1720dec |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:24:18Z | — | — | live01/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**a-airbnb-rules: NOT fixed (unchanged for a third day).** Every synced card resolves per night to the same hidden layers:
- **0.765 at ≤28 days** (= 0.85 × 0.90);
- **0.900 at 29 to at least 48 days**;
- **1.000 at 63+ days**.

This holds on P20, P12, both P13 listings, P05, P08 and synced Barking. Guests are not shown any of it.
- New observation: on a 6-night stay (P04 18–24 Nov, lead 17 d) the card shows 0.900 plus a visible 10% "Long stay discount" instead of 0.765. So the hidden 0.85 layer does not stack with the length-of-stay discount; the net is 0.810.
- The P04 5-night 10% matches the Smoobu rule pattern in `airbnb_smoobu_settings_21oct`. I have not seen it on the Barking settings screen.

**a-p05-9nov: NOT fixed. The £253 room after a 20% Special offer is still showing.**
- Smoobu holds **£1,462** for 9 Nov (was £1,442), min 1, available.
- Airbnb's card is built on a £316.80 room, not on £1,462. So the Smoobu price is not what Airbnb uses for that night. The cause is NOT CHECKED: it could be a failed push or an Airbnb-side price.
- The "Special offer" is a host promotion. Policy says all manual Airbnb promotions were removed on 21 Oct (`channel_pricing.airbnb_discount`), so this one is unexplained.
- PriceLabs logs show no new P05 9 Nov edit since 31 Oct.

**a-p05-earlybird: still showing.** P05 4–7 Jan has a visible 12.0% early-booking discount (−£149.64). It is not in policy for P05.

**P13 Special offer:** none on either listing for 8–11 Nov (still fixed).

### 3. Monitoring (until 4 Nov)

**a) Airbnb bookings, last 14 days (booked 19 Oct–1 Nov) vs the prior 14 (5–18 Oct)**
- Source: `data/snapshots/2026-11-01/reservations.csv`, confirmed rows, room £ (cleaning excluded). Imported past stays are excluded.
- No Airbnb booking has been made since 29 Oct 18:58 (Smoobu live; the newest `created-at` across all channels is a Camden block at 31 Oct 11:52).

| Window | Bookings | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 | 11 | 47 | £9,001.91 | £192 | 2 (P08 duplicate; P04 19–20 Dec) |
| Prior 14 | 22 | 161 | £27,458.12 | £171 | 2 |
| **Change** | **−50%** | **−71% (>50%)** | **−67% (>50%)** | +12% | |
| Prior without 28+ night stays (P10 32 n, P01 30 n) | 20 | 99 | £19,503.37 | £197 | |
| Change on that basis | −45% | **−53%** | **−54%** | −3% | |
| Uninhibited flats only (P04, P05, P08, P12, P13, P20): last vs prior | 8 vs 12 | 39 vs 57 | £7,224 vs £13,527 | £185 vs £237 | |
| Change | −33% | −32% | −47% | −22% | |

The portfolio crosses the 50% line. On flats not limited by blocks or handbacks, the drop is 32–47%. The window moved by one day, so the three 18 Oct bookings (P05 22–29 Dec £4,527.95 and P13 ×2) now sit in the prior window. Sunday and two days with no bookings: do not over-read.

| Property | Last 14 (count / nights / £ per n) | Prior 14 | >50% drop? |
|---|---|---|---|
| P01 | 1 / 3 / £240 | 1 / 30 / £152 | nights −90%: one 30-night stay; inventory limited by the gap block and handback |
| P02 | 0 | 2 / 10 / £106 | intentional block, not raised |
| P04 | 1 / 3 / £119 | 0 | — (+1 cancelled) |
| **P05** | 1 / 3 / £298 | 2 / 11 / £578 | **yes: nights −73%, £ −86%.** On the Flexible test |
| P06 | 1 / 3 / £268 | 4 / 18 / £189 | yes (−75% / −83%); intentional-block flat, not lost demand |
| P08 | 2 / 9 / £134 | 1 / 6 / £129 | no (handback 13 Nov) |
| P09 | 1 / 2 / £127 | 2 / 14 / £108 | yes; handback 26 Nov, inventory-limited |
| P10 | 0 | 1 / 32 / £106 | yes; sold to its 18 Nov handback |
| **P12** | **0** | 2 / 5 / £170 | **yes, −100%, not inventory.** Bookable today at 0.765/0.900 |
| **P13** | 1 / 7 / £252 | 5 / 20 / £157 | **yes: count −80%, nights −65%** |
| P20 | 3 / 17 / £177 | 2 / 15 / £159 | no |

**Paid vs PriceLabs, Airbnb bookings made after 21 Oct.** There are no new bookings. One of the 10 rows (P04 19–20 Dec, 0.947) was cancelled 31 Oct. The other 9 stand as in `reports/2026-10-30/sections/channel.md` §3:
- 8 of the 9 are below PriceLabs minus the policy stay discounts. They run 0.639–0.850, typically 0.765.
- Only P13 27 Dec–3 Jan (0.903 after weekly × early bird) is explained.
- The unexplained gap is still the hidden 0.765/0.900 layer, plus £176.72 on P05 6–9 Nov.

**Flexible-cancellation test** (P20, P06, P05 since 24 Oct; day 8 of 14):
- Test group: 4 bookings, 0 cancelled.
- Others: 4 confirmed and 2 cancelled (P08 duplicate; P04 19–20 Dec).
- Too small to read. The review is due 7 Nov.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38)**
- Source: `reservations.csv` and Smoobu live. The three P04 20–23 Nov duplicate rows count as one booking. The 20 Oct Channex imports are excluded.

| Measure | Bookings | Nights | Room £ (VAT incl.) | PriceLabs at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut (7.7 days) | 11 | 49 | £8,121.35 | £10,426 | 0.779 |
| Less cancelled: P12 4–8 Dec (28 Oct), P04 20–23 Nov (30 Oct) | −2 | −7 | −£1,472.81 | −£1,713 | |
| **Still confirmed** | **9** | **42** | **£6,648.54** | £8,713 | **0.763** |
| Cancellations since the cut of bookings made before it | | −25 | −£5,051.37 | | |
| **Net of all cancellations** | | **+17 n** | **+£1,597.17** (unchanged from 31 Oct) | | |

- No Booking.com booking and no cancellation since 29 Oct 21:04 (P12 3–7 Dec), about 58 hours.
- Pace since the cut: 1.4 bookings/day gross and 1.2/day net, against about 0.33/day before. The pace is falling: none in the last 2.4 days.
- The 3–6 Nov booking was modified 31 Oct 12:13 and is still confirmed.
- The cut still cannot be credited on its own: Last Minute 10% started the same day.
- PriceLabs-at-booking values are carried from the 30 Oct section.

### 4. Net to owner per £100 PriceLabs price

Sources: `channel_economics` in `kpi_pack.json`, plus what was observed.

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com as sold since cut (0.763; 15–18% commission) | £76.30 | ~£61–65 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 63+ d | £100 (P13 £90, P05 £88 with the visible early bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 29–48 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` list is empty, but the observed prices break both rules.
- **Direct is not the cheapest.** Airbnb at ≤48 d (£76.50–£90) and Booking.com as sold (£76.30) are at or below direct's £90.
- **Booking.com as sold nets below the Airbnb model's £84.50.**
- Ordering on the same dates is NOT CHECKED: Booking.com is behind the WAF, and Vrbo and direct have no URL.

### 5. Fees and min stay, displayed vs Smoobu; changes since 31 Oct 06:00Z

**Fees.** Cleaning is unchanged (P04 synced £142, P05 £195, P08 £149, P13/P20/P12 £150). Every card fits exactly.

**P04 min stay (Reyhan conflict, still open).**
- Reyhan re-entered 1–2 Nov at **+20%, min 2** on 31 Oct 22:11:25Z (was +50%, min 2, from 30 Oct).
- The synced listing still sells a 2-night 1–3 Nov stay at £298.10 room. This conflicts with "never under 3" (`listing_facts.P04`) and is for Corentin to confirm. It expires after tonight.

**Other Reyhan edits relevant to channel prices (31 Oct, all logged):**
- P04 9–24 Nov −10% min 3; 6–22 Dec −10%; 2–31 Jan −7%. The 18–24 Nov −5% override from 14:34Z was superseded.
- P20 6–24 Nov −10% min 3. This conflicts with no policy item, but it compounds with the 0.765 Airbnb layer.
- P13 1–3 / 8–12 Nov and 7–20 Dec −5%, copied to 3090701 and Vrbo.
- P12 1–4 Nov and 16 Nov–13 Dec −7%.
- P11 10 Nov–4 Dec −7%, 8–18 Dec −5%.
- P05 29 Nov–2 Dec and 13–19 Dec −5%, 4–31 Jan −7%.
- P07 8–14 Nov −2%.

Each of these cuts reaches Airbnb at ×0.765 (≤28 d) or ×0.900 (29–48 d).

### Issues ordered by £ impact

1. **Critical. P04 Barking: the unsynced Airbnb listing 1455876748739910219 still double-sells 3–6 and 6–9 Nov.**
   - £748.90 room is at risk, plus relocation cost. The guest arrives Tue 3 Nov.
   - The listing also sells the open 18–24 Nov run (Smoobu £1,146; it undercuts the synced listing by £125) and 17–20 Dec.
   - **Setting:** Airbnb host 551951609 "Seeker Estates LTD" > listing 1455876748739910219 > Calendar: **block 2–8 Nov today** (block 18–24 Nov and 16–19 Dec too while the listing is unsynced). Then either map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or snooze/unlist it. Barking already sells through 1657859794156786222.
2. **High. Hidden Airbnb layers 0.765 (≤28 d) / 0.900 (29–48 d) on every synced listing (a-airbnb-rules: not fixed).**
   - Realised so far on three bookings: P20 £574, P05 £328.76, P04 £109.28 (30 Oct section).
   - Forward: every open ≤28-day night sells at 76.5% of Smoobu. Reyhan's new −5% to −10% overrides compound with this.
   - **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (plus any global rule): remove the ≤28-day last-minute rule and the ~10% rule at ≤~60 days. If a discount is wanted, use a visible Airbnb discount (`airbnb_visible_discounts`).
3. **High. P05 9 Nov: Airbnb sells the orphan night at £253.44 room (20% Special offer) while Smoobu/PriceLabs hold £1,462.**
   - A sale costs about £1,209 against the Smoobu price, though that price is a deliberate close-by-price. More practically, it would sell a 1-night turnover at £253 room.
   - **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the Special offer/promotion, and check Smoobu > Channel Manager > Airbnb sync log for the 9 Nov price push. If the orphan is not wanted on Airbnb, block 9 Nov there.
4. **Medium. P05 visible 12% early-booking discount at 60+ days** (−£149.64 on 4–7 Jan). It is not in policy. **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > pricing rules > Early bird.
5. **Medium. Airbnb volume:** portfolio nights −71% (−53% excluding 28+ night stays), with P12 at 0 and P13 and P05 down more than 50%. On unconstrained flats the drop is −32% nights and −47% £. Watch to 4 Nov; it is not evidence alone.
6. **Medium. P04 1–3 Nov 2-night stay on sale** (Reyhan 31 Oct 22:11Z, min 2). Conflicts with policy; for Corentin to confirm. It expires tonight.

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF challenge 07:24:18Z; not circumvented). Booking.com stacks are inferred from paid ÷ list only.
2. Listing 1455…'s own reservations are NOT CHECKED (not in Smoobu; host inbox not visible). Which listing took the cancelled 19–20 Dec booking is NOT CHECKED.
3. Why Airbnb shows £316.80 instead of Smoobu's £1,462 for P05 9 Nov (failed push or an Airbnb-side price) is NOT CHECKED.
4. Vrbo +8% and Direct −10% are unconfirmed defaults (`rm/config.py`). The direct < OTA ordering is model-only.
5. Airbnb cleaning comes from Smoobu bookings and exact factor fits, not from an itemised page. 1455…'s cleaning is unknown, so its room price is not split.
6. The P04 1–3 Nov card factor (0.8145) has unidentified components.
7. PriceLabs-at-booking for Booking.com rows and for the post-21 Oct Airbnb rows is carried from the 29–30 Oct sections.
