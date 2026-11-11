// Nearest stations for a property, from Transport for London's open data (no key needed).
// Looked up once from the apartment's coordinates so nobody has to type them in.
const RAIL_MODES = ['tube', 'dlr', 'overground', 'elizabeth-line', 'national-rail', 'tram'];
const WALK_METRES_PER_MINUTE = 60; // straight-line distance, so slower than real walking pace

const tidy = (name) => String(name || '').replace(/\s+(Underground|Rail|DLR)\s+Station$/i, '').replace(/\s+Station$/i, '').trim();

/** Up to `limit` stations within about a mile: [{ name, lines, metres, walkMinutes }]. Empty on any failure. */
export async function nearbyStations(latitude, longitude, { fetchImpl = fetch, limit = 3 } = {}) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return [];
  const url = `https://api.tfl.gov.uk/StopPoint?lat=${latitude}&lon=${longitude}&radius=1600&stopTypes=NaptanMetroStation,NaptanRailStation&modes=${RAIL_MODES.join(',')}`;
  try {
    const res = await fetchImpl(url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const byName = new Map();
    for (const stop of Array.isArray(data?.stopPoints) ? data.stopPoints : []) {
      const name = tidy(stop.commonName);
      const metres = Math.round(Number(stop.distance));
      if (!name || !Number.isFinite(metres)) continue;
      // Only rail lines: stations also list the bus routes that stop outside.
      const names = new Map((stop.lines || []).map((l) => [l.id, l.name]));
      const lines = (stop.lineModeGroups || [])
        .filter((g) => RAIL_MODES.includes(g.modeName))
        .flatMap((g) => (g.lineIdentifier || []).map((id) => names.get(id) || id));
      const seen = byName.get(name);
      if (seen) {
        seen.lines = [...new Set([...seen.lines, ...lines])];
        seen.metres = Math.min(seen.metres, metres);
      } else byName.set(name, { name, lines: [...new Set(lines)], metres });
    }
    return [...byName.values()]
      .sort((a, b) => a.metres - b.metres)
      .slice(0, limit)
      .map((s) => ({ ...s, walkMinutes: Math.max(1, Math.round(s.metres / WALK_METRES_PER_MINUTE)) }));
  } catch (e) {
    console.warn(`Station lookup failed: ${e.message}`);
    return [];
  }
}

/** "Shepherd's Bush Market (Circle, Hammersmith & City), about 6 min walk; ..." */
export function describeStations(stations) {
  return stations
    .map((s) => `${s.name}${s.lines.length ? ` (${s.lines.join(', ')})` : ''}, about ${s.walkMinutes} min walk`)
    .join('; ');
}
