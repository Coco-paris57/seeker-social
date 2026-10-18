"""Tiny stdlib JSON HTTP helper (no third-party dependencies)."""
import json
import time
import urllib.error
import urllib.parse
import urllib.request


class ApiError(RuntimeError):
    pass


def request(method, url, headers=None, params=None, body=None, retries=3, query=None):
    """headers may be a dict or a callable returning a dict, re-evaluated on every
    attempt (signed requests need a fresh nonce per attempt). `query` is a
    pre-encoded query string, used instead of `params` when the exact bytes matter."""
    if query:
        url = f"{url}?{query}"
    elif params:
        url = f"{url}?{urllib.parse.urlencode(params, doseq=True)}"
    data = json.dumps(body).encode() if body is not None else None
    for attempt in range(retries):
        hdrs = {"Accept": "application/json", **((headers() if callable(headers) else headers) or {})}
        if data is not None:
            hdrs["Content-Type"] = "application/json"
        req = urllib.request.Request(url, data=data, headers=hdrs, method=method)
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                raw = r.read()
                return json.loads(raw) if raw else None
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code >= 500:
                time.sleep(2 ** (attempt + 1))
                continue
            raise ApiError(f"{method} {url} -> {e.code}: {e.read()[:300]!r}") from e
        except urllib.error.URLError as e:
            if attempt == retries - 1:
                raise ApiError(f"{method} {url} unreachable: {e.reason}") from e
            time.sleep(2 ** (attempt + 1))
    raise ApiError(f"{method} {url} failed after {retries} attempts")
