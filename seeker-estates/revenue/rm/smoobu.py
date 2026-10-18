"""Smoobu API client (read-only use).

Docs: https://docs.smoobu.com. Auth: HMAC-SHA256 signed requests (the legacy
Api-Key header is sunset on 31 Oct 2026). Key and secret come from Smoobu >
Settings > Advanced > API Keys, stored as SMOOBU_API_KEY and SMOOBU_API_SECRET.
"""
import base64
import hashlib
import hmac
import uuid
from datetime import datetime, timezone
from urllib.parse import quote

from . import config
from .http import request

HOST = "https://login.smoobu.com"
EMPTY_SHA256 = hashlib.sha256(b"").hexdigest()


def canonical_query(params):
    """RFC 3986-encoded keys and values, sorted alphabetically, joined with &."""
    pairs = []
    for k, v in (params or {}).items():
        for item in (v if isinstance(v, (list, tuple)) else [v]):
            pairs.append((quote(str(k), safe="-_.~"), quote(str(item), safe="-_.~")))
    return "&".join(f"{k}={v}" for k, v in sorted(pairs))


def sign(secret, method, path, query, timestamp, nonce, body_hash, api_key):
    canonical = "\n".join([method, path, query, timestamp, nonce, body_hash, api_key])
    digest = hmac.new(secret.encode(), canonical.encode(), hashlib.sha256).digest()
    return base64.b64encode(digest).decode()


class Smoobu:
    def __init__(self, api_key=None, api_secret=None, account="1"):
        key, secret = config.SMOOBU_ACCOUNTS.get(str(account), (None, None))
        self.key = api_key or key
        self.secret = api_secret or secret
        if not self.key or not self.secret:
            raise RuntimeError(f"Smoobu account {account}: API key and secret must both be set")

    def _get(self, path, params=None):
        query = canonical_query(params)

        def headers():
            ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
            nonce = str(uuid.uuid4())
            return {"X-API-Key": self.key, "X-Timestamp": ts, "X-Nonce": nonce,
                    "X-Signature": sign(self.secret, "GET", path, query, ts, nonce, EMPTY_SHA256, self.key)}

        return request("GET", HOST + path, headers, query=query)

    def me(self):
        return self._get("/api/me")

    def apartments(self):
        return self._get("/api/apartments")

    def apartment(self, apartment_id):
        return self._get(f"/api/apartments/{apartment_id}")

    def rates(self, apartment_ids, start_date, end_date):
        """Nightly price, min stay and availability per apartment per date."""
        return self._get("/api/rates", {"apartments[]": [str(i) for i in apartment_ids],
                                        "start_date": start_date, "end_date": end_date})

    def reservations(self, start_date, end_date, page_size=100):
        """All reservations overlapping the window, every channel, every page."""
        out, page = [], 1
        while True:
            r = self._get("/api/reservations", {
                "from": start_date, "to": end_date, "showCancellation": "true",
                "pageSize": page_size, "page": page})
            out.extend(r.get("bookings", []))
            if page >= r.get("page_count", 1):
                return out
            page += 1
