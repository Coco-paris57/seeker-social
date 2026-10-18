"""Unit tests on hand-built fixtures (synthetic numbers, not Seeker data)."""
import sys
import unittest
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from rm import audit, metrics, positioning  # noqa: E402

RES = [
    {"ref": "P01", "channel": "Airbnb", "arrival": "2026-10-01", "departure": "2026-10-06",
     "total_gbp": 1000, "booked_on": "2026-09-01", "status": "confirmed"},
    {"ref": "P01", "channel": "Booking.com", "arrival": "2026-10-10", "departure": "2026-10-12",
     "total_gbp": 600, "booked_on": "2026-10-05", "status": "confirmed"},
    {"ref": "P01", "channel": "Airbnb", "arrival": "2026-10-20", "departure": "2026-10-25",
     "total_gbp": 999, "booked_on": "2026-10-02", "status": "cancelled"},
    {"ref": "P01", "channel": "Airbnb", "arrival": "2025-10-20", "departure": "2025-10-24",
     "total_gbp": 800, "booked_on": "2025-09-01", "status": "confirmed"},
]


class Metrics(unittest.TestCase):
    def test_performance_prorates_and_skips_cancelled(self):
        p = metrics.performance(RES, ["P01"], date(2026, 10, 1), date(2026, 10, 11))["P01"]
        self.assertEqual(p["nights"], 6)               # 5 + 1 of the 2-night stay
        self.assertEqual(p["revenue"], 1300)           # 1000 + 300
        self.assertEqual(p["occupancy"], 0.6)
        self.assertAlmostEqual(p["adr"], 216.67)
        self.assertEqual(p["revpar"], 130)

    def test_pace_vs_stly(self):
        pc = metrics.pace_vs_stly(RES, "P01", date(2026, 10, 18), 30)
        self.assertEqual(pc["otb_nights"], 0)          # only the cancelled booking falls in window
        self.assertEqual(pc["stly_nights"], 4)
        self.assertEqual(pc["revenue_delta_pct"], -1.0)

    def test_gaps_only_between_bookings(self):
        prices = [{"ref": "P01", "date": f"2026-11-0{d}", "available": a, "min_stay": 3}
                  for d, a in [(1, False), (2, True), (3, True), (4, False), (5, True)]]
        self.assertEqual(metrics.gaps(prices, "P01"), [{"from": "2026-11-02", "nights": 2, "min_stay": 3}])

    def test_indices(self):
        self.assertEqual(metrics.market_indices(0.9, 300, 0.75, 250), {"mpi": 1.2, "ari": 1.2, "rgi": 1.44})
        self.assertEqual(metrics.market_indices(0.9, None, 0.75, 250)["rgi"], None)


class Audits(unittest.TestCase):
    def test_sync_flags_gap(self):
        prices = [{"ref": "P01", "date": "2026-11-01", "pricelabs_price": 200, "smoobu_price": 230, "available": True},
                  {"ref": "P01", "date": "2026-11-02", "pricelabs_price": 200, "smoobu_price": 201, "available": True}]
        self.assertEqual(len(audit.pricelabs_vs_smoobu(prices)["P01"]), 1)

    def test_channel_price(self):
        self.assertEqual(audit.expected_channel_price(100, "booking"), 103.5)   # +15% then -10%
        self.assertEqual(audit.expected_channel_price(100, "direct"), 90.0)


class Positioning(unittest.TestCase):
    def test_rules(self):
        self.assertEqual(positioning.recommend(0.95, 0.70, 0.4)[0], "raise")
        self.assertEqual(positioning.recommend(0.50, 0.70, 0.9)[0], "lower")
        self.assertEqual(positioning.recommend(0.50, 0.70, 0.3)[0], "fix-listing")
        self.assertEqual(positioning.recommend(None, 0.70, 0.3)[0], "collect-data")

    def test_percentile(self):
        self.assertEqual(positioning.percentile_rank(250, [200, 220, 260, 300]), 0.5)


if __name__ == "__main__":
    unittest.main()


class SmoobuSigning(unittest.TestCase):
    def test_query_matches_docs_example(self):
        from rm.smoobu import canonical_query
        self.assertEqual(canonical_query({"to": "2026-04-10", "from": "2026-04-01"}), "from=2026-04-01&to=2026-04-10")
        self.assertEqual(canonical_query({"apartments[]": ["2", "1"]}), "apartments%5B%5D=1&apartments%5B%5D=2")

    def test_signature_matches_openssl(self):
        import base64, hashlib, hmac
        from rm.smoobu import EMPTY_SHA256, sign
        canon = ("GET\n/api/reservations\nfrom=2026-04-01&to=2026-04-10\n2026-04-01T12:00:00Z\n"
                 "6ba7b810-9dad-11d1-80b4-00c04fd430c8\n" + EMPTY_SHA256 + "\nusr_live_abc123")
        want = base64.b64encode(hmac.new(b"your_api_secret", canon.encode(), hashlib.sha256).digest()).decode()
        got = sign("your_api_secret", "GET", "/api/reservations", "from=2026-04-01&to=2026-04-10",
                   "2026-04-01T12:00:00Z", "6ba7b810-9dad-11d1-80b4-00c04fd430c8", EMPTY_SHA256, "usr_live_abc123")
        self.assertEqual(got, want)
        self.assertEqual(EMPTY_SHA256, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
