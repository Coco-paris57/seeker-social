---
name: daily-revenue-run
description: Run Seeker Estates' daily revenue-management cycle - pull PriceLabs and Smoobu, compute KPIs, launch the market, competitor, PriceLabs, channel-parity and occupancy agents in parallel, then the strategy director for a ranked action plan. Use every morning, or when asked to check prices, competitors, occupancy or ADR.
---

# Daily revenue run

Working dir for commands: `seeker-estates/revenue`. Date `D` = today (Europe/London).

## 1. Data (stop and report if this fails - never continue on guessed data)
1. `python3 -m rm.cli check` - both APIs must say OK. If a key is missing, tell Corentin which
   environment variable (`PRICELABS_API_KEY`, `SMOOBU_API_KEY`) to add, and run only the agents
   whose inputs exist.
2. `python3 -m rm.cli daily` - pulls into `data/snapshots/D/`, writes `reports/D/kpi_pack.json`
   and `kpi_summary.md`.
3. Note which inputs are empty (`missing` in the pack). Manual inputs that may be dropped in the
   snapshot folder: `comps.csv`, `channel_checks.csv`, `market.csv` (Market Dashboard export).

## 2. Specialists - launch in ONE message so they run in parallel
- `rm-occupancy-analyst` - all properties.
- `rm-pricelabs-auditor` - all properties.
- `rm-channel-parity-auditor` - all properties.
- `rm-market-analyst` - next 90 days.
- `rm-competitor-analyst` - split the 19 properties into 3 batches by area so each agent
  works a coherent submarket:
  - East: P01, P04, P07, P09, P12, P15
  - Central/North: P05, P06, P08, P11, P14, P17
  - West + Herts: P02, P03, P10, P13, P16, P18, P19
Pass each agent the date `D` and the paths of the pack and snapshot. Ask each to return its
markdown section and its `Data gaps:` list.

## 3. Strategy
Launch `rm-strategy-director` with all specialist outputs pasted in. It writes
`reports/D/daily-report.md`.

## 4. Verify before delivering
- Spot-check 3 numbers in the report against `kpi_pack.json`; any mismatch -> fix before sending.
- Every action must cite evidence; remove any that do not.
- Deliver: the KPI scoreboard + top 5 actions in chat, link to the full report. Nothing is
  changed in PriceLabs, Smoobu or any OTA without Corentin's explicit approval.
- Commit `reports/D/` (snapshots stay out of git: they contain guest booking data).
