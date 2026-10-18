"""Portfolio and channel configuration for the revenue-management run.

Property facts come from build/properties.py (Corentin's info pack, 10 Sep 2026)
so there is one source of truth. Channel settings below are DEFAULTS to confirm
against the live Smoobu channel manager and PriceLabs account.
"""
import importlib.util
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]          # seeker-estates/
REVENUE = ROOT / "revenue"
DATA = REVENUE / "data"
REPORTS = REVENUE / "reports"

_spec = importlib.util.spec_from_file_location("properties", ROOT / "build" / "properties.py")
_props = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_props)

FIELDS = ("ref", "postcode", "area", "station", "type", "sleeps",
          "pl_min", "pl_max", "pl_base", "venues", "notes")
PROPERTIES = [dict(zip(FIELDS, p)) for p in _props.PROPS]
PORTFOLIO_FACTS = _props.FACTS
BY_REF = {p["ref"]: p for p in PROPERTIES}

# Channel price = Smoobu base rate x (1 + markup) x (1 - channel discount).
# markup: rate uplift set in Smoobu's channel manager to absorb commission.
# discount: promotion the guest sees on the OTA (Genius, mobile, early bird...).
# Confirm every value in Smoobu > Channel Manager and on each OTA extranet.
CHANNELS = {
    "airbnb":  {"markup": 0.00, "discount": 0.00, "commission": 0.155},  # host-only fee model
    "booking": {"markup": 0.15, "discount": 0.10, "commission": 0.15},   # e.g. Genius 10%
    "vrbo":    {"markup": 0.08, "discount": 0.00, "commission": 0.08},
    "direct":  {"markup": 0.00, "discount": 0.10, "commission": 0.00},   # 10% direct discount
}

# Tolerances used by the audits.
PARITY_TOLERANCE = 0.03       # 3% gap between expected and observed price is a flag
SYNC_TOLERANCE_GBP = 2        # PriceLabs vs Smoobu nightly rate
TARGET_OCCUPANCY = 0.85       # above this on a 30-day window we are likely under-priced

PRICELABS_API_KEY = os.environ.get("PRICELABS_API_KEY")
SMOOBU_API_KEY = os.environ.get("SMOOBU_API_KEY")
SMOOBU_API_SECRET = os.environ.get("SMOOBU_API_SECRET")

# Map our refs to platform ids. Fill once from `python -m rm.cli ids`.
# {"P01": {"smoobu": 123456, "pricelabs": "123456", "airbnb": "...", "booking": "..."}}
ID_MAP_FILE = DATA / "id_map.json"
