---
name: daily-revenue-run
description: Run Seeker Estates' daily revenue-management cycle - pull PriceLabs (via the PriceLabs connector) and Smoobu, compute KPIs, launch the market, competitor, PriceLabs, channel-parity and occupancy agents in parallel, then the strategy director for a ranked action plan. Use every morning, or when asked to check prices, competitors, occupancy or ADR.
---

# Daily revenue run

Commands run from `seeker-estates/revenue`. `D` = today's date (Europe/London), `RAW` =
`data/snapshots/D/raw/`. Property ↔ listing mapping: `data/id_map.json` (refs P01–P19).

**Read-only rule:** use only PriceLabs `get_*` tools and Smoobu GET calls. Never call
`update_*`, `delete_*`, `accept_nudge`, `map_listings`, `refresh_listing_pricing` or
`set_neighborhood_data_source`. Changes are proposed to Corentin, never made.

## 0. Revenue Quest dashboard - keep it live through the whole run
Dashboard: https://claude.ai/artifact/9nekRcg2MguSMR2d3mHSpd (page source
`seeker-estates/revenue/dashboard/revenue-quest.html`). Write with the `ArtifactData` tool
(`url` above; read a doc first and pin `if_version`; group writes in one `batch`). Only real
events and real numbers go in: no placeholders.
- `agents/<id>` for `dispatcher, occupancy, pricelabs, channel, market, comp-east,
  comp-central, comp-west, strategy`: `{status: idle|running|waiting|blocked|done, step: <index
  of current station>, note: <one line on what it is doing / found>, xp, finds, gaps}`.
  Stations per agent are listed in the page's `AGENTS` array; `step` indexes them.
- `system/run`: `{date, phase, progress: 0-100, summary}`. At the start set the date, reset every
  agent to `idle`/`step 0` (keep `xp`), clear `system/finds` and start a fresh `system/log`.
- `system/connections`: `{pricelabs|smoobu|ota: {status: ok|down|blocked|partial, short, detail}}`.
- `system/log`: `{events: [{ts (UTC ISO), agent, kind: start|progress|finding|gap|done|blocked, text}]}`,
  keep the last 200.
- `system/finds`: `{items: [{agent, severity: critical|high|medium, ref, title, evidence}]}`.
- `system/scoreboard` (strategy step only, from the KPI pack): `{note, items: [{label, value}]}`
  e.g. portfolio occupancy, ADR, RevPAR, RGI, rating, direct share.
- `properties/<ref>` (P01–P19 that have data): `{area, name, history: [...]}`. Each run APPENDS one
  entry `{date, adr30, adr30_ly, adr_ytd, adr_ytd_ly, occ_fwd30, mkt_fwd30, occ_fwd60, mkt_fwd60,
  source}` (replace the entry if today's date is already there; never rewrite older entries).
  Values come from `pl_kpis.csv` (PriceLabs) for the unit's priced listing; occupancy as 0–1;
  missing = null. This is how ADR and occupancy improvement per property is tracked over time.
- `actions/<id>`: `{type: task|advice, priority: critical|high|medium, ref, status: open|done|dismissed,
  title, why (with the numbers), where (exact screen/setting), impact, source}`. Task = must do,
  backed by evidence; advice = good to do. The Strategy Captain writes them after its report.
  Never change an action Corentin has marked done or set aside; update an open one in place
  instead of adding a duplicate; mark an open task done only when today's data shows it fixed
  (say so in `why`).
- When: a step starts or ends for the Dispatcher; a specialist is launched (`running`, step 0) and
  returns (`done` or `blocked`, last step, note, finds, gaps); each finding and data gap goes to
  the log and finds board.
- XP (mission points): +100 for a completed mission, +15 per critical or high finding, +5 per
  medium finding, +5 per data gap reported with its source. Blocked missions earn nothing.

## 1. Connections - report each, continue with what works, label what doesn't
1. **PriceLabs**: call `mcp__PriceLabs__get_me`. If the tools are missing, PriceLabs is not
   connected in claude.ai (Customize → Connectors): stop and say so.
2. **Smoobu**: `python3 -m rm.cli check`. It reports bad characters in the secret, the result
   of a signed test call, and whether each mapped Smoobu id exists. If it fails, continue
   without Smoobu: the PriceLabs↔Smoobu sync check is reported as NOT CHECKED, never guessed.

## 2. Pull PriceLabs into the snapshot (verbatim JSON, saved with the Write tool)
Save each tool response exactly as returned - do not edit, summarise or recompute.
1. `get_listing_data` (question: "daily revenue run: all listings") → `RAW/listing_data.json`.
2. For every id in the `pricelabs` lists of `id_map.json`: `get_listing_prices` with
   `date_from` = tomorrow, `date_to` = D + 60 → `RAW/prices_<listing_id>.json`.
   (60 days keeps responses manageable; extend only when asked.) To save time, give these
   to 3 general-purpose agents in parallel, one per area batch below, each told the exact
   file names and the read-only rule.
3. `get_pms_reservations` for `pms` = `smoobu` and again for `channex`, stay window
   `start_date` = D − 365, `end_date` = D + 180, `limit` 100, increasing `offset` while
   `next_page` is true → `RAW/reservations_<pms>_<n>.json`.
4. `python3 -m rm.cli ingest D`, then (if Smoobu passed) `python3 -m rm.cli smoobu D`, then
   `python3 -m rm.cli analyse D` → `reports/D/kpi_pack.json` + `kpi_summary.md`.

## 3. Specialists - launch in ONE message so they run in parallel
Pass each the date D and the paths of the pack and snapshot; each returns its markdown section
and a `Data gaps:` list.
- `rm-occupancy-analyst` - all properties.
- `rm-pricelabs-auditor` - all properties, plus the `_unmatched` and `confidence: check` entries
  of `id_map.json` (duplicate listings, listings with push off, properties missing from PriceLabs).
- `rm-channel-parity-auditor` - all properties; use `rate_leak_next_30` from the pack.
- `rm-market-analyst` - next 90 days.
- `rm-competitor-analyst` - three agents, one per batch:
  - East: P01, P04, P07, P09, P12, P15
  - Central/North: P05, P06, P08, P11, P14, P17
  - West + Herts: P02, P03, P10, P13, P16, P18, P19

## 4. Strategy
Launch `rm-strategy-director` with all specialist outputs pasted in. It writes
`reports/D/daily-report.md`.

## 5. Verify before delivering
- Spot-check 3 numbers in the report against `kpi_pack.json` / `listing_data.json`; fix any mismatch.
- Remove any action without cited evidence.
- Deliver the KPI scoreboard + top 5 actions in chat with a link to the full report.
- Commit `reports/D/` only (snapshots hold guest booking data and stay out of git).
