/** SQLite 'YYYY-MM-DD HH:MM:SS' (UTC) to ISO 8601. */
export const iso = (s) => (s ? `${String(s).replace(' ', 'T')}Z` : null);

/** Open a server-sent event stream. Returns send(event, data). */
export function sse(req, res, onClose) {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
  res.flushHeaders();
  res.write('retry: 3000\n\n');
  const ping = setInterval(() => res.write(': ping\n\n'), 25_000);
  req.on('close', () => {
    clearInterval(ping);
    onClose?.();
  });
  return (event, data = {}) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}
