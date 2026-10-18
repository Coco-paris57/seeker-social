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
| Live dashboard ("Revenue Quest") | https://claude.ai/artifact/9nekRcg2MguSMR2d3mHSpd · source `dashboard/revenue-quest.html` |

## KPIs
Occupancy, ADR, RevPAR (last 30/365 nights) · forward occupancy 30/60 · pace vs same time last
year (30/90) · 7-day pickup · lead time, length of stay, channel mix · orphan gaps ·
MPI / ARI / RGI vs market (RGI > 1 = beating the comp set) · price percentile vs comps ·
PriceLabs↔Smoobu sync errors · nights pinned at min/max · OTA price vs expected.

## Setup (done 18 Oct 2026)
1. PriceLabs: claude.ai connector (Customize → Connectors), read access only. Data is pulled
   through the connector by the daily-revenue-run skill, saved as raw JSON, then
   `python3 -m rm.cli ingest <date>` converts it.
2. Smoobu: environment variables `SMOOBU_API_KEY` + `SMOOBU_API_SECRET` (Settings → Advanced →
   API Keys; HMAC-signed requests). `python3 -m rm.cli check` tests them without printing the secret.
3. Network: `login.smoobu.com`, `docs.smoobu.com`, `support.smoobu.com`.
4. `data/id_map.json` maps P01–P19 to PriceLabs/Smoobu ids; entries marked `confidence: check`
   and `_unmatched` need Corentin's confirmation.
5. Still to confirm: channel markups/discounts in `rm/config.py` `CHANNELS`.

## Run
Ask Claude to run the **daily-revenue-run** skill for the full multi-agent analysis. Tests: `python3 -m unittest discover tests`.
