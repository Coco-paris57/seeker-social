"""PriceLabs Customer API client.

Docs: https://help.pricelabs.co (Customer API). Auth: header X-API-Key, generated
in PriceLabs > Account Settings > API. Base URL https://api.pricelabs.co/v1.
Response shapes are normalised in the snapshot step so the audits do not depend
on field-name changes here.
"""
from . import config
from .http import request

BASE = "https://api.pricelabs.co/v1"


class PriceLabs:
    def __init__(self, api_key=None):
        self.key = api_key or config.PRICELABS_API_KEY
        if not self.key:
            raise RuntimeError("PRICELABS_API_KEY is not set")

    def _h(self):
        return {"X-API-Key": self.key}

    def listings(self):
        """All listings with base/min/max, sync status, last pushed date."""
        return request("GET", f"{BASE}/listings", self._h())

    def listing_prices(self, listing_ids, date_from, date_to, pms="smoobu"):
        """Recommended (and user-adjusted) nightly prices per date."""
        body = {"listings": [{"id": str(i), "pms": pms, "dateFrom": date_from,
                              "dateTo": date_to} for i in listing_ids]}
        return request("POST", f"{BASE}/listing_prices", self._h(), body=body)

    def neighborhood_data(self, listing_id, pms="smoobu"):
        """Comp-set percentiles (25/50/75/90) for price and occupancy by bedroom count."""
        return request("GET", f"{BASE}/neighborhood_data", self._h(),
                       params={"pms": pms, "listing_id": listing_id})

    def reservations(self, start_date, end_date, pms="smoobu"):
        return request("GET", f"{BASE}/reservation_data", self._h(),
                       params={"pms": pms, "start_date": start_date, "end_date": end_date})
