# Seeker Estates — revenue management

Daily check that PriceLabs → Smoobu → Airbnb / Booking.com / Vrbo / direct are pricing our 19
properties correctly against the market and competitors, with KPIs and a ranked action plan.

**Rule: no guessing.** Every number comes from PriceLabs, Smoobu or a dated, sourced OTA check.
Missing inputs show as `—` and are listed, never filled in.

## Pieces
| Part | Where |
|---|---|
| Data pull, KPIs, audits, positioning rules | `rm/` (Python stdlib, no installs) |
| Agents | `/.claude/agents/rm-*.md` — occupancy, PriceLabs audit, channel parity, competitors, market, strategy |
| Daily run (coordinates the agents) | `/.claude/skills/daily-revenue-run/SKILL.md` |
| Daily snapshots (guest data, not committed) | `data/snapshots/YYYY-MM-DD/*.csv` |
| Reports (committed) | `reports/YYYY-MM-DD/` |

## KPIs
Occupancy, ADR, RevPAR (last 30/365 nights) · forward occupancy 30/60 · pace vs same time last
year (30/90) · 7-day pickup · lead time, length of stay, channel mix · orphan gaps ·
MPI / ARI / RGI vs market (RGI > 1 = beating the comp set) · price percentile vs comps ·
PriceLabs↔Smoobu sync errors · nights pinned at min/max · OTA price vs expected.

## Setup (one-off)
1. Environment variables: `PRICELABS_API_KEY` (PriceLabs → Account Settings → API),
   `SMOOBU_API_KEY` (Smoobu → Settings → API keys / Developer).
2. Network: allow `api.pricelabs.co` and `login.smoobu.com`.
3. `cd seeker-estates/revenue && python3 -m rm.cli check`, then `python3 -m rm.cli ids` and copy
   `data/id_map.example.json` to `data/id_map.json` with each ref's PriceLabs and Smoobu ids.
4. Confirm channel markups/discounts in `rm/config.py` `CHANNELS` against Smoobu's channel
   manager and each OTA extranet (current values are placeholders and the parity audit says so).
5. First live pull: check the PriceLabs `neighborhood_data` parser (`snapshot._market_row`)
   against the real response and adjust field names if needed.

## Run
`python3 -m rm.cli daily` for data + KPIs, or ask Claude to run the **daily-revenue-run** skill
for the full multi-agent analysis. Tests: `python3 -m unittest discover tests`.
