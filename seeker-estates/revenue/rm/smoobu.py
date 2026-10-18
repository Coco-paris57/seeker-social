"""Smoobu API client (read-only use).

Docs: https://docs.smoobu.com. Auth: header Api-Key, from Smoobu > Settings >
Developer / API keys. Base URL https://login.smoobu.com/api.
"""
from . import config
from .http import request

BASE = "https://login.smoobu.com/api"


class Smoobu:
    def __init__(self, api_key=None):
        self.key = api_key or config.SMOOBU_API_KEY
        if not self.key:
            raise RuntimeError("SMOOBU_API_KEY is not set")

    def _h(self):
        return {"Api-Key": self.key, "Cache-Control": "no-cache"}

    def apartments(self):
        return request("GET", f"{BASE}/apartments", self._h())

    def rates(self, apartment_ids, start_date, end_date):
        """Nightly price, min stay and availability per apartment per date."""
        return request("GET", f"{BASE}/rates", self._h(), params={
            "apartments[]": list(apartment_ids),
            "start_date": start_date, "end_date": end_date})

    def reservations(self, start_date, end_date, page_size=100):
        """All reservations overlapping the window, every channel, every page."""
        out, page = [], 1
        while True:
            r = request("GET", f"{BASE}/reservations", self._h(), params={
                "from": start_date, "to": end_date, "showCancellation": "true",
                "pageSize": page_size, "page": page})
            out.extend(r.get("bookings", []))
            if page >= r.get("page_count", 1):
                return out
            page += 1
