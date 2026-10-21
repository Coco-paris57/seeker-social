# Demand and conversion review: why bookings feel scarce (D = 21 Oct 2026)

**Scope.** Corentin: "We aren't receiving reservations, we need reservations, and at high rate. Do a proper analysis not just based on price."

**Read first:** `data/policy.json` (updated 21 Oct). These points are settled there and are not raised as problems:
- P02, P03, P06 and P07 are blocked on purpose.
- P14 is a special setup: its numbers are reported, nothing is proposed.
- The Visibility Booster, the 15% weekly and 20% monthly stay discounts, and P13 being one flat listed twice.
- The Booking.com +20% markup, Booking's stacked promotions and the extra Airbnb discount are all confirmed, so their size is reported, not called unexplained.

**Handbacks.** Nights after these dates are excluded everywhere: P01 after 20 Dec, P08 after 13 Nov, P09 after 26 Nov, P10 after 18 Nov, **P12 after 13 Dec** (added to policy.json 21 Oct; blocked 14 Dec 2026–21 Oct 2027).

**Sources**
| Source | What it contains |
|---|---|
| `data/snapshots/2026-10-21/reservations.csv` | Smoobu, 666 rows, all channels. Stays in the last 365 days plus future stays. Revenue is basePrice, before cleaning and commission. |
| `prices.csv` and `raw/prices_*.json`, snapshots 18–21 Oct | Covers 19 Oct–20 Dec. |
| `reports/2026-10-21/kpi_pack.json` and `sections/` | Pack and section reports. |
| PriceLabs, read-only, pulled 21 Oct | `get_listing_prices` for 21 Dec–20 Jan (P05 3166592, P11 3064196, P12 2699998, P13 3064856 and 3090701, P20 3547481); `get_listing_prices` for 22 Oct–20 Jan (P04 Smoobu 3562176); `get_customizations` (listing level for P04, P05, P08, P09, P11, P12, P13 ×2, P20; account level for Smoobu); `get_pms_reservations` (Smoobu, booked 1 Jul 2025–21 Oct 2026, 759 rows, used only for guest count and cancellation timing). |

**Counting rules**
- **P04.** Smoobu `booked_on` for P04 is the import date (20 Oct). The real booking dates come from the Channex PriceLabs listing's `booked_date`: 16 Oct, 23 Sep, 18 Sep (cancelled), 26 Sep, 11 Oct and 18 Oct. P04's bookings before Smoobu are not retrievable, so its earlier history is UNKNOWN.
- **Today.** Bookings made on 21 Oct are partial (the pull ran at 05:54Z). Weekly windows therefore end on 20 Oct.
- **Status.** "Confirmed" means `status = confirmed`. "Gross" also counts bookings that were cancelled later.

---

## 0. Answer in one paragraph

**Total booking pace is not falling. What has fallen is Booking.com, together with listing visibility on certain channels for certain flats:**
- **Total pace held up.** Confirmed bookings made 23 Sep–20 Oct: **51 bookings / 317 nights / £59,142**. The previous four weeks (26 Aug–22 Sep): 54 / 311 / £56,033. The last week (14–20 Oct) had 15 bookings / 109 nights / £20,373, one of the strongest weeks in the 16-week series.
- **Airbnb carries all of it, at a deep discount.** Airbnb took 33 bookings in the last 4 weeks, its highest 4-week total. October Airbnb bookings were paid **0.77 of the expected price**.
- **Booking.com has stopped producing.** Excluding P04 it ran at 7–10 confirmed bookings a week in September, then 4, 1 and **0** in the last three weeks. The last booking was made on **10 Oct**. That is **11 days with no Booking.com booking, longer than any gap in the past 365 days (the longest was 8 days)**.
- **Channel blind spots on single flats:**
  - P11 has had **no Airbnb booking since 2 Jun**.
  - P05 has **no confirmed Booking.com booking in 365 days**.
  - P13's Booking.com bookings fell from 26 to 8 to 2 per quarter.
  - P04 has no Airbnb bookings and P20 no Booking.com bookings.
- **Min-stay rules are not what is stopping bookings.** Only 1 open night across the portfolio cannot be sold under the current min-stays.
- **Structure is costing rate:**
  - Single orphan nights are priced 24–117% *above* their neighbours.
  - Booking.com long stays are paid 13% below comparable short stays.
  - 5–6-guest stays pay the same as 3–4-guest stays.
  - Booking.com cancels 33% of bookings and 42% of booked nights. That is the biggest structural leak of demand already won.

---

## 1. Booking velocity

### 1a. Portfolio, confirmed bookings by `booked_on`, 16 weeks to 20 Oct
Source: reservations.csv, P04 dates corrected.

| Week (booked_on) | Bookings | Nights | Revenue £ | Airbnb bk/n/£ | Booking.com bk/n/£ | Other+Direct bk | Gross bk (incl. later cancelled) |
|---|---|---|---|---|---|---|---|
| 01–07 Jul | 8 | 57 | 12,199 | 4/32/7,120 | 4/25/5,078 | 0 | 13 |
| 08–14 Jul | 10 | 65 | 13,172 | 3/29/6,697 | 6/33/6,030 | 1 | 15 |
| 15–21 Jul | 8 | 56 | 12,530 | 5/22/5,221 | 2/16/3,388 | 1 | 9 |
| 22–28 Jul | 5 | 23 | 3,719 | 1/4/844 | 4/19/2,875 | 0 | 10 |
| 29 Jul–04 Aug | 10 | 49 | 6,923 | 5/15/2,636 | 5/34/4,287 | 0 | 13 |
| 05–11 Aug | 7 | 46 | 7,227 | 5/34/5,481 | 2/12/1,747 | 0 | 7 |
| 12–18 Aug | 7 | 31 | 7,505 | 5/20/5,855 | 2/11/1,650 | 0 | 9 |
| 19–25 Aug | 5 | 23 | 6,755 | 4/18/6,142 | 1/5/613 | 0 | 6 |
| 26 Aug–01 Sep | 13 | 58 | 8,976 | 5/23/3,748 | 8/35/5,228 | 0 | 13 |
| 02–08 Sep | 14 | 91 | 16,230 | 4/41/9,019 | 10/50/7,211 | 0 | 16 |
| 09–15 Sep | 11 | 58 | 9,867 | 5/30/5,454 | 6/28/4,412 | 0 | 16 |
| 16–22 Sep | 16 | 104 | 20,960 | 8/68/13,776 | 7/34/6,895 | 1 | 22 |
| 23–29 Sep | 16 | 87 | 21,214 | 7/43/13,903 | 9/44/7,311 | 0 | 19 |
| 30 Sep–06 Oct | 8 | 43 | 6,152 | 3/16/2,114 | 4/23/3,491 | 1 | 10 |
| 07–13 Oct | 12 | 78 | 11,402 | 10/71/10,584 | 2/7/818 (1 is P04) | 0 | 12 |
| 14–20 Oct | 15 | 109 | 20,373 | 13/93/17,595 | 2/16/2,778 (both P04) | 0 | 17 |

**4-week blocks, confirmed bookings / nights / £:**

| Channel | 1–28 Jul | 29 Jul–25 Aug | 26 Aug–22 Sep | 23 Sep–20 Oct |
|---|---|---|---|---|
| All | 31 / 201 / 41,620 | 29 / 149 / 28,410 | 54 / 311 / 56,033 | **51 / 317 / 59,142** |
| Airbnb | 13 / 87 / 19,882 | 19 / 87 / 20,113 | 22 / 162 / 31,997 | **33 / 223 / 44,196** |
| Booking.com | 16 / 93 / 17,371 | 10 / 62 / 8,297 | 31 / 147 / 23,746 | **17 / 90 / 14,398** (3 of them P04) |

**Booking.com excluding P04, confirmed per week (gross in brackets):**

| Week from | 26 Aug | 2 Sep | 9 Sep | 16 Sep | 23 Sep | 30 Sep | 7 Oct | 14 Oct |
|---|---|---|---|---|---|---|---|---|
| Confirmed (gross) | 8 (8) | 10 (12) | 6 (10) | 7 (12) | 7 (7) | 4 (4) | **1 (1)** | **0 (0)** |

Gross bookings fell too, so this is not cancellations hiding new bookings.

**Is it falling?**
- **Total: no.**
- **Booking.com: yes, and sharply.** The silence began on 10 Oct, eight days before the 18 Oct base rises, so those rises cannot have started it. What did cause it is UNKNOWN: no extranet, ranking or sync-status data is available.
- **Last two days:** no booking on any channel was made on 20 Oct or by 05:54Z on 21 Oct.
- **Supply caveat:** velocity cannot be adjusted for sellable inventory, because there is no calendar history before 18 Oct. Sellable inventory is shrinking: P01 and P10 have 0 open nights before their handback, and P08 and P09 have 13 and 11.

### 1b. Confirmed bookings per property per week (oldest to newest; weeks start on the date shown)
| Ref | 01/07 | 08/07 | 15/07 | 22/07 | 29/07 | 05/08 | 12/08 | 19/08 | 26/08 | 02/09 | 09/09 | 16/09 | 23/09 | 30/09 | 07/10 | 14/10 | 16-wk bk / n | Last 4 wk | Prior 12 wk per 4 wk |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 1 | 1 | 2 | 0 | 0 | 0 | 1 | 0 | 3 | 0 | 1 | 1 | 0 | 0 | 0 | 2 | 12 / 123 | 2 | 3.3 |
| P02* | 1 | 0 | 1 | 1 | 3 | 0 | 1 | 1 | 2 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 15 / 72 | 4 | 3.7 |
| P04 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 1 | 2 | 5 / 32 | 5 | UNKNOWN |
| P05 | 2 | 0 | 2 | 0 | 1 | 1 | 2 | 1 | 0 | 2 | 1 | 3 | 4 | 0 | 1 | 1 | 21 / 101 | 6 | 5.0 |
| P06* | 1 | 0 | 0 | 1 | 0 | 2 | 1 | 1 | 2 | 1 | 2 | 2 | 0 | 1 | 3 | 1 | 18 / 80 | 5 | 4.3 |
| P08 | 2 | 0 | 2 | 1 | 2 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 1 | 0 | 0 | 1 | 11 / 81 | 2 | 3.0 |
| P09 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 2 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 13 / 96 | 4 | 3.0 |
| P10 | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | 2 | 1 | 1 | 0 | 2 | 1 | 0 | 12 / 93 | 3 | 3.0 |
| P11 | 0 | 2 | 1 | 0 | 2 | 1 | 1 | 0 | 1 | 2 | 2 | 3 | 3 | 2 | **0** | **0** | 20 / 121 | 5 | 5.0 |
| P12 | 0 | 2 | 0 | 0 | 1 | 0 | 1 | 0 | 2 | 2 | 1 | 3 | 3 | 1 | 0 | 2 | 18 / 81 | 6 | 4.0 |
| P13 | 0 | 2 | 0 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 2 | 1 | 1 | 0 | 3 | 3 | 16 / 69 | 7 | 3.0 |
| P14† | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 / 10 | 0 | 0.3 |
| P20 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 2 / 15 | 2 | UNKNOWN (new) |

\* Intentional block (policy); shown for completeness only. † Special setup (policy): numbers only. P07 (intentional block) had 1 booking, in the week of 5 Aug.

### 1c. Last booking and current silence vs each property's normal gap
- **Basis:** gaps between consecutive distinct `booked_on` dates, using all bookings made in the last 365 days, including later-cancelled ones (a booking is a demand signal even if it was cancelled later).
- **Silence:** counted to 21 Oct.

| Ref | Last confirmed booking | Last Airbnb | Last Booking.com | Days since last booking | Median / P75 / P90 gap (d) | Longest gap in 365 d | Share of past gaps ≥ current silence | Read |
|---|---|---|---|---|---|---|---|---|
| P01 | 19 Oct | 19 Oct | 14 Sep | 2 | 4 / 6 / 14 | 27 | 96% | normal (0 open nights to handback) |
| P04 | 18 Oct (Channex date) | none | 18 Oct | 3 | 5 / 5 / 15 (n=6) | 15 | 80% | normal, tiny sample |
| P05 | 18 Oct | 18 Oct | **none in 365 d** | 3 | 4 / 6 / 9 | 16 | 60% | normal overall; Booking.com absent |
| P08 | 17 Oct | 17 Oct | 28 Jul | 4 | 4 / 8 / 18 | 33 | 52% | normal |
| P09 | 14 Oct | 14 Oct | 17 Sep | 7 | 6 / 8 / 12 | 19 | 43% | normal |
| P10 | 9 Oct | 9 Oct | 5 Oct | 12 | 5.5 / 11 / 13 | 18 | 23% | long-ish, but 0 open nights before handback |
| **P11** | **4 Oct** | **2 Jun** | 4 Oct | **17** | **2 / 4 / 7** | 21 | **1%** | **unusual: only 1% of its gaps were this long** |
| P12 | 15 Oct | 15 Oct | 3 Oct | 6 | 2 / 5 / 10 | 30 | 23% | slightly long |
| P13 | 18 Oct | 18 Oct | 10 Oct | 3 | 2 / 4 / 9 | 19 | 43% | normal |
| P20 | 17 Oct | 17 Oct | none | 2 | n=3 bookings | 7 | — | too new to judge |
| P07* / P14† | 6 Aug / 8 Jul | — | — | 76 / 105 | — | — | — | policy |

**Portfolio by channel, excluding P04:**
- **Booking.com:** last booking 10 Oct, **11 days ago**. Over 365 days the median gap was 1 day and the longest 8 (202 gaps). **0 of 202 past gaps were this long.**
- **Airbnb:** last booking 19 Oct, 2 days ago. Median gap 1 day, longest 19.

---

## 2. Channel mix and paid rate vs PriceLabs

### 2a. Bookings made 23 Jul–21 Oct (90 days), confirmed (bk / nights / £)
| Ref | Airbnb | Booking.com | Other/Direct | Airbnb rev share | Airbnb bk last 60 d | Booking bk last 60 d | Cancelled in 90 d (Airbnb / Booking) | Flag |
|---|---|---|---|---|---|---|---|---|
| P01 | 7/89/14,271 | 1/3/485 | 0 | 96.7% | 6 | 1 | 0/1 | Booking.com weak (handback 20 Dec) |
| P04 | **0** | 5/32/4,905 | 0 | 0% | 0 | 5 | 0/1 | **no Airbnb bookings; whether an Airbnb listing exists is UNKNOWN** |
| P05 | 17/85/37,761 | **0** | 0 | 100% | 13 | **0** | 1/0 | **no Booking.com (0 confirmed in 365 d)** |
| P08 | 6/55/8,941 | 1/9/1,907 | 0 | 82.4% | 4 | **0** | 0/0 | Booking.com: 0 in 60 d (last 28 Jul) |
| P09 | 5/49/5,145 | 6/32/3,757 | 1/2/290 | 56.0% | 4 | 5 | 1/0 | both channels deliver |
| P10 | 2/35/3,638 | 7/33/3,610 | 1/4/547 | 46.7% | 1 | 5 | 3/0 | both deliver (full to handback) |
| **P11** | **0** | 17/93/16,533 | 0 | 0% | **0** | 13 | 0/**8** | **no Airbnb booking since 2 Jun** |
| P12 | 4/11/1,828 | 12/55/10,439 | 0 | 14.9% | 3 | 11 | 0/**7** | Airbnb thin (11 Airbnb rows in 365 d) |
| P13 | 12/57/9,017 | 2/6/735 | 0 | 92.5% | 11 | 2 | 0/1 | **Booking.com fell 26 → 8 → 2 per quarter** |
| P20 | 2/15/2,392 | **0** | 0 | 100% | 2 | 0 | 0/0 | no Booking.com bookings (new unit) |
| P02* / P06* / P07* | 5/20/2,345; 14/56/11,368; 1/4/444 | 8/42/4,494; 3/13/2,451; 0 | — | — | — | — | — | policy blocks |
| P14† | 0 | 0 | 0 | — | 0 | 0 | — | policy |

**Confirmed bookings per 13-week block** (22 Oct–20 Jan | 21 Jan–21 Apr | 22 Apr–21 Jul | 22 Jul–20 Oct). A dash means the unit had no Smoobu history yet.

| Ref | Airbnb | Booking.com |
|---|---|---|
| P05 | – / 21 / 21 / 17 | – / 0 / 0 / 0 |
| P11 | **16 / 10 / 4 / 0** | 4 / 11 / 7 / 17 |
| P12 | 1 / 2 / 4 / 4 | 21 / 18 / 10 / 12 |
| P13 | 13 / 3 / 7 / 12 | **10 / 26 / 8 / 2** |
| P08 | – / – / 8 / 6 | – / – / 5 / 1 |

### 2b. Paid ADR vs PriceLabs price at the time
**Method:**
- Confirmed Airbnb and Booking.com stays with nights from 19 Oct onward.
- Each night is priced at the PriceLabs `booked_price` from the **earliest snapshot that holds it** (18 Oct for nights up to 17 Dec). P04 uses the Channex listing.
- "Expected" = markup × stay factor. Booking markup 1.2, Airbnb 1.0. Stay factor 0.85 for 7–27 nights, 0.80 for 28+.
- **Caveat:** there is no price-at-booking history, so the anchor is the earliest snapshot, not the price on the booking day.

| Ref | Channel | Stays | Priced nights | Paid / night | PL anchor / night | Paid ÷ PL | Expected ÷ PL | Gap beyond markup + LOS | Booked ≥ 1 Oct: paid ÷ expected |
|---|---|---|---|---|---|---|---|---|---|
| **All** | Airbnb | 27 | 188 | £206 | £261 | 0.79 | 0.90 | 12.4% | **0.77** (132 n) |
| **All** | Booking.com | 18 | 94 | £178 | £223 | 0.80 | 1.06 | 25.0% | **0.68** (21 n) |
| P01 | Airbnb | 3 | 45 | £161 | £227 | 0.71 | 0.82 | 13.3% | 0.83 |
| P04 | Booking | 5 | 20 | £134 | £174 | 0.77 | 1.12 | 31.5% | 0.60 |
| P05 | Airbnb | 8 | 39 | £452 | £469 | 0.96 | 0.96 | −0.2% (on price) | 0.88 (4 n) |
| P06* | Airbnb | 2 | 14 | £185 | £310 | 0.60 | 0.88 | 32.3% | 0.68 |
| P08 | Airbnb | 2 | 13 | £144 | £204 | 0.71 | 0.92 | 23.3% | 0.62 |
| P09 | Airbnb | 3 | 23 | £103 | £150 | 0.69 | 0.86 | 20.6% | 0.79 |
| P10 | Airbnb | 1 | 31 | £106 | £159 | 0.67 | 0.80 | 16.5% | 0.84 |
| P11 | Booking | 6 | 42 | £201 | £255 | 0.79 | 1.05 | 24.5% | 0.64 |
| P12 | Booking | 5 | 23 | £201 | £239 | 0.84 | 1.07 | 21.8% | 0.79 |
| P12 | Airbnb | 2 | 5 | £170 | £243 | 0.70 | 1.00 | 30.0% | 0.70 |
| P13 | Airbnb | 3 | 10 | £177 | £230 | 0.77 | 1.00 | 23.0% | 0.72 |
| P20 | Airbnb | 2 | 4 | £173 | £241 | 0.72 | 0.97 | 25.6% | 0.74 |

**Where the gap comes from.** Both gaps are explained per policy:
- **Airbnb:** the confirmed extra discount. Its type and % are UNKNOWN.
- **Booking.com:** the stacked promotions. They use up all of the +20% markup: paid ≈ 0.80 × PriceLabs.

**P05 is the exception.** Its Airbnb stays are paid on price (−0.2%), so the extra Airbnb discount does not appear to apply on P05. Why is UNKNOWN.

**So the Airbnb volume in October was bought at about 23% below the expected price.**

---

## 3. Forward book for the units that must sell

**Windows:**
- 30 = 22 Oct–20 Nov; 60 = to 20 Dec; 90 = to 20 Jan (91 nights). The night of 21 Oct is not in prices.csv.
- P08 stops at 13 Nov, P09 at 26 Nov and P12 at 13 Dec (handbacks).

**Calendars:**
- prices.csv (21 Oct) up to 20 Dec, then the PriceLabs pull for 21 Dec–20 Jan.
- P04 uses its Smoobu listing 3562176 (pulled 21 Oct). It matches Smoobu: 2–7 Nov is open after the cancellation, while the Channex calendar still shows it Booked.
- P13 nights that 3090701 has booked show as "Blocked" on 3064856. They are counted as booked (policy).

**Booking window method (lead-time analysis):**
1. For every confirmed booked night in the last 365 days, take its lead = night − `booked_on`.
2. For an open night at lead L, S(L) = the share of the property's nights that were historically booked at lead ≤ L, i.e. the share of normal demand still to come.
3. A night is **"late"** when S(L) < 50%, meaning more than half of its normal demand has already passed.
4. **"Lead-weighted open nights"** = Σ S(L). This counts open nights weighted by how much of their usual booking window is left. It is not a forecast.

P04 (5 bookings) and P20 (2) use the portfolio distribution. Portfolio night-lead median is 31 d, with S(14) = 27% and S(30) = 49%.

| Ref | Booked 30/60/90 | Blocked 30/60/90 | **Open 30/60/90** | Lead basis | Median night-lead | Open (90) late | Open (90) still in window | Lead-weighted open nights | Open nights |
|---|---|---|---|---|---|---|---|---|---|
| P04 | 9/20/32 | 0/0/0 (+25 Oct unbookable) | **20/39/58** | portfolio (own n=5) | 31 d | 20 | 38 | 37.0 | 1–24 Nov, 2 Dec, 6–19 Dec, 2–20 Jan |
| P05 | 20/36/48 | 1/1/1 (27 Oct, reason unknown) | **9/23/42** | own (59) | 54 d | 16 | 26 | 22.4 | 28–30 Oct, 6–9 Nov, 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec, 4–20 Jan |
| P11 | 19/41/51 | 0/0/0 | **11/19/40** | own (70) | 34 d | 11 | 29 | 24.6 | 28 Oct–2 Nov, 10–13 Nov, 18 Nov, 27 Nov, 12–18 Dec, 23–25 Dec, 3–20 Jan |
| P12 (to 13 Dec) | 18/26/26 | 0/0/0 | **12/27/27** | own (72) | 38 d | 12 | 15 | 11.3 | 22 Oct, 26–29 Oct, 8–13 Nov, 17 Nov, 29 Nov–13 Dec |
| P13 | 14/22/22 | 0 | **16/38/69** | own (82) | 29.5 d | 14 | 55 | 44.8 | 22 Oct, 25–26 Oct, 31 Oct–3 Nov, 8–12 Nov, 17–27 Nov, 1 Dec, 7 Dec–20 Jan |
| P20 | 3/3/3 | 0 | **27/57/88** | portfolio (own n=2) | 31 d | 27 | 61 | 54.8 | 25 Oct–20 Jan |
| P08 (to 13 Nov) | 10 | 0 | **13** | own (20) | 20.5 d | **13** | 0 | 4.0 | 26 Oct–7 Nov |
| P09 (to 26 Nov) | 18/24 | 1 (25 Oct) | **11** | own (22) | 31 d | **11** | 0 | 2.8 | 26–31 Oct, 10–14 Nov |
| **Total** | | | **119 / 227 / 348** | | | **124** | **224** | **201.7** | |

**What this shows**
- **124 of the 348 open nights are already "late".** For those, more than half of the property's normal demand has already passed. They are concentrated in the next 30 days: all of P08's and P09's open nights, plus P04 1–20 Nov and P20 25 Oct–20 Nov.
- **224 open nights are still inside the normal booking window.** Most sit in 7 Dec–20 Jan.
- **Jan demand existed last year.** PriceLabs `booking_status_STLY` (final status of the same date last year):
  - P11: 17 of its 18 open nights in 3–20 Jan were Booked last year, mostly with booked dates in Dec 2025.
  - P13: most open nights in 21 Dec–20 Jan (listing 3064856) were Booked last year.
- **P20:** 88 of 91 nights open. Only 2 confirmed bookings so far (first stay 10 Oct), both on Airbnb. There is no Booking.com booking, so whether P20 is distributed beyond Airbnb is UNKNOWN.

---

## 4. Frictions

### 4a. Min stay vs open gaps
Method: open runs to each unit's horizon (20 Jan for must-sell units, 20 Dec for others). A night is unsellable when no arrival day in its run has a min stay that fits the remaining run.

- **Unsellable nights: 1 in the whole portfolio:** P12 22 Oct (1-night gap, min 2). **Min-stay is not blocking demand.**
- **Single open nights opened at min-stay 1 but priced above their neighbours.** This is the opposite of an orphan discount. Source: raw/prices 21 Oct and the PriceLabs pull.

| Ref | Night | Price | Neighbours / uncustomised |
|---|---|---|---|
| P11 | 18 Nov | **£318** | neighbours £231 / £257; uncustomised £267 |
| P11 | 27 Nov | **£595** | neighbours £318 / £376; uncustomised £397 |
| P12 | 17 Nov | **£369** | neighbours £250 / £232; uncustomised £267 |
| P04 | 2 Dec | **£612** | uncustomised £236 |
| P05 | 29 Dec | **£2,451** | uncustomised £1,125 |
| P13 | 1 Dec | £344 | intentional per policy, not raised |

### 4b. Weekend minimums
Open Friday/Saturday nights by min stay, to the same horizons:

| Ref | Fri/Sat open nights by min stay | Sun–Thu | Past 365 d bookings of 1–2 nights | Past 365 d bookings of ≤ 3 nights |
|---|---|---|---|---|
| P04 | min 3: 15 | min 3: 42, min 1: 1 | 0/5 | 2/5 |
| P05 | min 2: 3, min 3: 6 | min 2: 8, min 3: 24 | 3/59 | 24/59 |
| P11 | min 1: 1, min 2: 6, min 3: 4 | min 2: 13, min 3: 15 | 9/70 | 23/70 |
| P12 | min 2: 5 | min 2: 21 | 10/72 | 29/72 |
| **P13** | min 2: 4, **min 3: 9**, min 4: 3 | min 2: 18, **min 3: 28**, min 4–7: 5 | **19/82 (23%)** | 46/82 |
| **P20** | min 3: 10, **min 4: 14** | min 3: 52, min 4–7: 12 | 0/2 | 1/2 |
| P08 / P09 | min 2: 4 / 4 | min 2: 9 / 7 | 1/20 · 3/22 | 6/20 · 5/22 |
| P14† | min 4: 18 | min 3: 33, min 4–5: 9 | policy, not proposed | |

**What this shows:**
- **4-night weekend minimums exist only on P20** (14 Fri/Sat open nights), on P14 (policy) and on 3 P13 holiday nights.
- **P13 has min 3 on 37 open nights, while 23% of its past bookings were 1–2 nights.** That is the clearest case of a min stay excluding a known booking pattern.

### 4c. PriceLabs customisations
Source: `get_customizations`, 21 Oct. There are no account-level customisations on Smoobu.

| Ref | Last-minute | Far-out premium | Other | Data context |
|---|---|---|---|---|
| P04 (3562176) | −25% within 15 d, gradual | +30% after 150 d | occupancy "Aggressive"; booking-recency factor on | own lead history UNKNOWN |
| P05 | −25% within 15 d, flat | +30% after 120 d | demand "Moderately Aggressive" | 6% of nights booked > 120 d out |
| P08 / P09 | −18% within 15 d, gradual | +20% after 120 d | demand "Moderately Aggressive" | 0% of nights booked > 89 d |
| P11 | −18% within 15 d, gradual | +30% after 150 d | occupancy "Aggressive"; booking-recency factor on (−5% after 15 d without a booking, up to −15% after 45 d) | 27% of nights booked ≤ 15 d |
| P12 | −25% within 15 d, gradual | +30% after 150 d | occupancy "Aggressive"; booking-recency factor on | 23% booked ≤ 15 d |
| P13 (both listings) | **−40% within 14 d, gradual** | **+5% after 45 d** | seasonality "Moderately Conservative" | 35% booked ≤ 15 d; **36% of nights booked > 45 d out**, so the premium sits on the part of the window that brings a third of demand |
| P20 | −25% within 15 d, gradual | **+30% after 89 d** (visible from 18 Jan) | — | own history n=2 |

### 4d. Cancellations by channel
Source: reservations.csv, by `booked_on`.

| Window | Channel | Bookings | Cancelled | Rate (bookings) | Nights cancelled / booked | Revenue cancelled |
|---|---|---|---|---|---|---|
| 365 d | Airbnb | 309 | 53 | 17.2% | 282 / 1,628 (17.3%) | £73,798 |
| 365 d | **Booking.com** | 327 | 107 | **32.7%** | **673 / 1,614 (41.7%)** | **£143,625** |
| 365 d | Other (Agoda, Vrbo) | 9 | 7 | 77.8% | 53 / 62 | £5,691 |
| 90 d | Airbnb | 83 | 8 | 9.6% | 53 / 529 (10.0%) | £8,111 |
| 90 d | **Booking.com** | 83 | 21 | **25.3%** | 140 / 458 (30.6%) | £24,304 |

**Booking.com cancellation rate by property (365 d):**

| Ref | P11 | P12 | P02 | P13 | P06 | P08 | P01 |
|---|---|---|---|---|---|---|---|
| Cancelled / bookings | 21/60 (35%) | 32/93 (34%) | 17/50 (34%) | 21/67 (31%) | 4/11 | 3/9 | 4/7 |

P11's Airbnb rate is also 35% (16/46).

**Cancellation timing** (PriceLabs `cancelled_on`, 1 Jul 2025–21 Oct 2026):
- Booking.com: median 9 days after booking and 31 days before check-in. 24 of 132 cancellations came within 14 days of check-in.
- Airbnb: median 8 days after booking and 35 days before check-in. 10 of 63 came within 14 days.

---

## 5. Length of stay and guest mix

### 5a. Revenue per night by LOS band
Source: reservations.csv. Confirmed stays, P14 excluded.

| LOS | Stays | Nights (share) | Revenue (share) | £/night | Airbnb bk/n/£ per n | Booking bk/n/£ per n |
|---|---|---|---|---|---|---|
| 1–2 | 69 | 122 (5.2%) | £20,525 (4.6%) | £168 | 26/45/£212 | 42/75/£143 |
| 3–4 | 254 | 889 (37.7%) | £175,564 (39.5%) | £197 | 133/463/£222 | 119/419/£171 |
| 5–6 | 92 | 497 (21.1%) | £96,790 (21.8%) | £195 | 54/291/£209 | 36/194/£174 |
| 7–13 | 63 | 535 (22.7%) | £104,192 (23.4%) | £195 | 29/256/£233 | 34/279/£160 |
| 14–27 | 12 | 214 (9.1%) | £33,600 (7.6%) | £157 | 10/182/£147 | 1/14/£211 |
| 28+ | 3 | 99 (4.2%) | £13,960 (3.1%) | £141 | 3/99/£141 | 0 |

**Bookings made in the last 90 days:**

| LOS | 1–2 | 3–4 | 5–6 | 7–13 | 14–27 | 28+ |
|---|---|---|---|---|---|---|
| Nights (share) | 28 (3.5%) | 220 (27.5%) | 121 (15.1%) | 272 (34.0%) | 60 (7.5%) | 99 (12.4%) |
| £/night | £188 | £186 | £228 | £185 | £152 | £141 |

**7+ night stays rose to 53.9% of booked nights**, from 36.0% across the whole file.

**Crowd-out test, controlled.** Each 7+ night stay is compared with the same property's 1–6 night stays arriving within ±30 days (at least 2 matches):

| Group | Stays / nights | Long-stay £/n | Matched short-stay £/n | Difference |
|---|---|---|---|---|
| 7–27 nights | 64 / 613 | £185 | £191 | **−3.2%** (−£3,705) |
| 28+ nights | 2 / 69 | £136 | £139 | −2.1% |
| **Airbnb** long stays | 32 / 392 | £194 | £189 | **+2.5%** |
| **Booking.com** long stays | 33 / 272 | £158 | £181 | **−13.0% (−£6,384)** |

**Answer:**
- **Overall, long stays are not crowding out higher-rate short stays.** They earn within 3% of comparable short stays.
- **Booking.com long stays are the exception.** They pay 13% less, because the 15% weekly discount comes on top of the stacked promotions.
- **The two 28+ stays on the books are on units with no open nights to handback:** P01 (39 nights at £154) and P10 (28 nights at £106). So nothing was displaced.

### 5b. Guest count
- **Source:** PriceLabs `get_pms_reservations` (Smoobu), 523 non-cancelled bookings made 1 Jul 2025–21 Oct 2026. reservations.csv has no guest field.
- **Revenue:** PriceLabs `rental_revenue` ÷ nights.

| Ref | 1–2 guests | 3–4 guests | 5–6 guests | 7+ guests |
|---|---|---|---|---|
| Portfolio | 127 bk, £130/n | 223 bk, £152/n | 137 bk, £190/n | 31 bk, £421/n (all P05) |
| P11 (2-bed) | 15, £125 | 31, £162 | **24, £160** | — |
| P12 (2-bed) | 13, £101 | 44, £144 | **54, £135** | — |
| P13 (2-bed) | 22, £110 | 29, £137 | **31, £141** | — |
| P05 (4-bed) | — | 7, £278 | 21, £410 | 31, £421 |
| P08 / P09 | 9, £170 / 12, £104 | 10, £167 / 12, £119 | 1, £133 / — | — |
| P04 | guest_count = 0 on all 5 bookings (UNKNOWN) | | | |

**What this shows:**
- **On the 2-bed flats, 5–6-guest stays pay no more per night than 3–4-guest stays.** P12 is −6%, P13 +3%, P11 −1%. These are 109 bookings across P11, P12 and P13.
- PriceLabs returns `extra_person_fee: 0` on every listing pulled.

---

## 6. The five highest-leverage actions: non-price and price-structure, no base-price changes

| # | Action | Evidence | Scale (from data, not a forecast) |
|---|---|---|---|
| 1 | **Treat Booking.com as down until proven otherwise.** Check the extranet today: property and rooms open and bookable, Smoobu connection and rate/availability sync errors, any rooms closed or restricted, ranking and visibility messages, and which promotions are live. | Booking.com excl. P04: 7–10 confirmed bookings a week in Sep, then 4, 1, **0**. Last booking 10 Oct, 11 days, **longer than any of 202 gaps in 365 d (max 8)**. Gross bookings fell too. Started before the 18 Oct base rises. | 26 Aug–22 Sep Booking.com delivered 31 bookings / 147 nights / £23,746. It is 220 of 476 confirmed Airbnb+Booking bookings in 365 d. |
| 2 | **Fix the channel blind spots on single flats.** Check each listing is live, searchable and calendar-synced, and fix content and photos where it is: P11 on Airbnb, P05 on Booking.com, P13 on Booking.com. Check whether P04 has an Airbnb listing and P20 a Booking.com listing. | P11 Airbnb 16 → 10 → 4 → **0** per quarter, last booking 2 Jun; P11 silent 17 d (1% of its gaps were this long). P05: 0 confirmed Booking.com in 365 d. P13 Booking.com 26 → 8 → 2 per quarter. P04: 0 Airbnb. P20: Airbnb only. | Open nights to 20 Jan: P11 40, P13 69, P05 42, P04 58, P20 88. 224 of all 348 must-sell open nights are still inside the normal booking window. |
| 3 | **Cut Booking.com cancellations, the biggest leak of demand already won.** Add or push a non-refundable rate alongside the flexible one, review the free-cancellation window, and start with P11, P12 and P13. Also confirm the reasons for P05's Blocked 27 Oct and P04's unbookable 25 Oct. | Booking.com cancels **32.7% of bookings and 41.7% of nights** over 365 d (Airbnb 17.2% / 17.3%), and 25.3% / 30.6% in the last 90 d. P11 35%, P12 34%, P13 31%. Median cancellation comes 31 d before check-in; 24 of 132 come within 14 d. | £143,625 of Booking.com revenue cancelled in 365 d (673 nights); £24,304 in the last 90 d. |
| 4 | **Fix the calendar structure:** orphan nights, P13 min stay, P20 weekend minimum. Price the single orphan nights at or below their neighbours instead of 24–117% above; P13's 1 Dec is left as set. Consider min 2 for P13 outside peak dates and min 3 on P20 weekends. | Orphan prices: P11 18 Nov £318 vs £231/£257; P11 27 Nov £595 vs £318/£376; P12 17 Nov £369 vs £250/£232; P04 2 Dec £612 (uncustomised £236); P05 29 Dec £2,451 (uncustomised £1,125). P13: min 3 on 37 open nights, but 23% of its past bookings were 1–2 nights. P20: min 4 on 14 open Fri/Sat nights. P13's far-out +5% starts at 45 d, where 36% of its nights are booked. | 5 orphan nights; 37 P13 nights; 14 P20 weekend nights. Only 1 night in the portfolio is outright unsellable, so this is about conversion, not lost nights. |
| 5 | **Raise the paid rate without touching base:** (a) add an extra-guest fee above 4 guests on the 2-beds (P11, P12, P13); (b) on Booking.com, stop the weekly discount stacking with the promotions. | 5–6-guest stays pay the same per night as 3–4 guests (P12 £135 vs £144; P13 £141 vs £137; P11 £160 vs £162); `extra_person_fee` = 0. Booking.com 7+ night stays paid 13% below matched short stays (Airbnb +2.5%). | 109 bookings of 5–6 guests on P11–P13 in the period; −£6,384 on 272 Booking.com long-stay nights. |

**Known but outside these five (policy says explained; size reported):**
- **Airbnb extra discount:** October Airbnb bookings were paid 0.77 of expected; P05 is on price.
- **Booking.com promotions:** paid ≈ 0.80 × PriceLabs, so the +20% markup is used up.

Deciding whether to keep either is the strategy director's call.

---

## Data gaps
1. **P04 history before Smoobu:** not retrievable (`get_pms_reservations` channex, listing 7dc96cda…: "Listing not found"; the Channex pull returns only P03). Its lead and velocity before 18 Sep are UNKNOWN. Its 6 Smoobu rows carry the import date, so Channex `booked_date` was used instead. P04's guest_count is 0 on all 5 bookings.
2. **Conversion data:** no OTA views, impressions, search rank or conversion rate in any file. Conversion is UNKNOWN; velocity is measured on bookings only.
3. **Booking.com:** the cause of the stop is UNKNOWN. Live OTA pages, extranet status and Smoobu sync logs are not available.
4. **Inventory history:** no calendar history before 18 Oct, so velocity cannot be adjusted for sellable inventory.
5. **Price at booking:** no history. The anchor is the earliest snapshot's `booked_price` (18 Oct for nights to 17 Dec), so the paid ÷ PL figures are approximate.
6. **Guest count:** not in reservations.csv. Taken from PriceLabs reservation_data, where revenue (`rental_revenue`) can differ from the Smoobu basePrice.
7. **Unexplained blocks:** reasons are UNKNOWN for P05 27 Oct and P04 25 Oct. (P12 from 14 Dec is now a policy handback, last night 13 Dec.)
8. **Lead distributions:** P20 (2 bookings) and P04 (5) use the portfolio distribution, not their own.
9. **Calendar and booking coverage:** prices.csv starts 22 Oct, so tonight (21 Oct) is not covered. Bookings made on 21 Oct are partial (pull 05:54Z).
10. **Promotions:** the Airbnb extra discount's type and %, and the list of active Booking.com promotions, are UNKNOWN.
11. **One row without revenue:** a P13 VRBO cancelled row (12 Oct–2 Nov) has a blank total, so it counts as £0 revenue.
