/* Seeker Estates — on-site booking page: frames the Smoobu booking engine,
   passing on dates, guests and UTM/ad parameters, and sizes the frame to
   its content with iframe-resizer (the same script Smoobu's own embed uses). */
(function () {
  "use strict";
  var C = window.SEEKER || {};
  var frame = document.getElementById("booking-frame");
  if (!frame || !window.seekerBookingUrl) return;
  var q = new URLSearchParams(location.search);
  var p = C.bookingParams || {};
  var extra = {};
  if (q.get("arrival")) extra[p.arrival || "arrival"] = q.get("arrival");
  if (q.get("departure")) extra[p.departure || "departure"] = q.get("departure");
  if (q.get("guests")) extra[p.guests || "guests"] = q.get("guests");
  frame.src = window.seekerBookingUrl(C.bookingEmbedUrl || C.bookingUrl, extra);
  // Until Smoobu pre-fills dates from the link, remind guests what they searched.
  var note = document.getElementById("booking-dates");
  if (note && q.get("arrival")) {
    var fmt = function (d) { return new Date(d + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }); };
    note.innerHTML = "Your search: <strong>" + fmt(q.get("arrival")) + (q.get("departure") ? " → " + fmt(q.get("departure")) : "") + "</strong>" +
      (q.get("guests") ? " · <strong>" + q.get("guests") + " guest" + (q.get("guests") === "1" ? "" : "s") + "</strong>" : "") + ". Enter the same dates below to see prices.";
    note.hidden = false;
  }
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
