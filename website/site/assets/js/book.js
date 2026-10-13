/* Seeker Estates — on-site booking page: frames the Smoobu booking engine,
   passing on dates, guests and UTM/ad parameters. */
(function () {
  "use strict";
  var C = window.SEEKER || {};
  var frame = document.getElementById("booking-frame");
  var out = document.getElementById("booking-newtab");
  if (!frame || !window.seekerBookingUrl) return;
  var q = new URLSearchParams(location.search);
  var p = C.bookingParams || {};
  var extra = {};
  if (q.get("arrival")) extra[p.arrival || "arrival"] = q.get("arrival");
  if (q.get("departure")) extra[p.departure || "departure"] = q.get("departure");
  if (q.get("guests")) extra[p.guests || "guests"] = q.get("guests");
  var src = window.seekerBookingUrl(C.bookingEmbedUrl || C.bookingUrl, extra);
  frame.src = src;
  if (out) out.href = window.seekerBookingUrl(C.bookingUrl, extra);
})();
