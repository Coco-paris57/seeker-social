/* Seeker Estates — on-site booking page: frames the Smoobu booking engine,
   passing on dates, guests and UTM/ad parameters, and sizes the frame to
   its content with iframe-resizer (the same script Smoobu's own embed uses). */
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
  frame.src = window.seekerBookingUrl(C.bookingEmbedUrl || C.bookingUrl, extra);
  if (out) out.href = window.seekerBookingUrl(C.bookingUrl, extra);
  // Fixed CSS height stays as the fallback if the engine never answers the resizer.
  if (window.iFrameResize) {
    var sized = false;
    window.iFrameResize({ heightCalculationMethod: "lowestElement", tolerance: 34, checkOrigin: false,
      onResized: function () { sized = true; frame.parentNode.classList.add("is-sized"); } }, "#booking-frame");
    // The resizer turns the frame's own scrollbar off; give it back if the engine never answers.
    setTimeout(function () {
      if (sized) return;
      frame.setAttribute("scrolling", "auto");
      frame.style.overflow = "auto";
    }, 6000);
  }
})();
