/* Seeker Estates — landlord earnings estimator.
   Model (all constants live in build.py → CALC, shown to the user under "How we estimate this"):
   - Up to 90 nights a year as short stays (London's planning limit for short lets),
   - the rest of the year as furnished mid-term stays (1–6 months), priced at a premium to an unfurnished long let,
   - minus our management fee, platform/payment fees and the running costs a furnished home carries.
   It is compared with a standard long let after voids and a typical agency fee. */
(function () {
  "use strict";
  var C = (window.SEEKER || {}).calc;
  var root = document.querySelector("[data-calculator]");
  if (!C || !root) return;

  var $ = function (s) { return root.querySelector(s); };
  var postcode = $("#calc-postcode"), band = $("#calc-band"), rent = $("#calc-rent"), hint = $("#calc-band-hint");
  var gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
  var round = function (n, to) { return Math.round(n / to) * to; };

  function bandFor(pc) {
    var raw = String(pc || "").toUpperCase().trim();
    // Outward code: the part before the space, or everything but the last 3 characters of a full postcode.
    var compact = raw.replace(/\s+/g, "");
    var outward = raw.indexOf(" ") > -1 ? raw.split(/\s+/)[0] : (compact.length >= 5 ? compact.slice(0, -3) : compact);
    var m = outward.match(/^([A-Z]{1,2})(\d{1,2})[A-Z]?$/) || outward.match(/^([A-Z]{1,2})(\d)/);
    if (!m) return null;
    var district = m[1] + m[2], area = m[1];
    var b;
    Object.keys(C.postcodeBands).forEach(function (k) { if (C.postcodeBands[k].indexOf(district) > -1) b = k; });
    if (b) return b;
    if (C.innerAreas.indexOf(area) > -1) return "inner";
    return "outer";
  }

  function beds() { var r = root.querySelector('input[name="beds"]:checked'); return r ? r.value : "2"; }

  function compute() {
    var B = C.beds[beds()], mult = C.bands[band.value].mult;
    var marketRent = parseFloat(rent.value) > 0 ? parseFloat(rent.value) : B.rent * mult;
    var adr = B.adr * mult;
    var out = ["low", "high"].map(function (_, i) {
      var shortRev = adr * C.shortNights[i];
      var midNights = 365 - C.shortCap;
      var midRev = marketRent * C.midPremium[i] * 12 * (midNights / 365) * C.midOcc[i];
      var gross = shortRev + midRev;
      var fee = gross * C.fee;
      var platform = shortRev * C.platformShort + midRev * C.platformMid;
      var running = B.running * 12;
      return { gross: gross, fee: fee, platform: platform, running: running, net: gross - fee - platform - running };
    });
    var longGross = marketRent * 12;
    var longNet = longGross * (1 - C.longVoid) * (1 - C.longAgency);
    var mid = function (k) { return (out[0][k] + out[1][k]) / 2; };
    var netLowM = round(out[0].net / 12, 50), netHighM = round(out[1].net / 12, 50);

    $("[data-out=range]").textContent = gbp.format(netLowM) + " – " + gbp.format(netHighM);
    $("[data-out=annual]").textContent = gbp.format(round(out[0].net, 500)) + " – " + gbp.format(round(out[1].net, 500));
    $("[data-out=gross]").textContent = gbp.format(round(mid("gross"), 100));
    $("[data-out=fee]").textContent = "− " + gbp.format(round(mid("fee"), 100));
    $("[data-out=platform]").textContent = "− " + gbp.format(round(mid("platform"), 100));
    $("[data-out=running]").textContent = "− " + gbp.format(round(mid("running"), 100));
    $("[data-out=net]").textContent = gbp.format(round(mid("net"), 100));
    $("[data-out=long]").textContent = gbp.format(round(longNet / 12, 50)) + "/mo";
    $("[data-out=ours]").textContent = gbp.format(round(mid("net") / 12, 50)) + "/mo";
    var max = Math.max(mid("net"), longNet);
    $("[data-bar=ours]").style.width = (mid("net") / max * 100).toFixed(1) + "%";
    $("[data-bar=long]").style.width = (longNet / max * 100).toFixed(1) + "%";
    var diff = mid("net") - longNet;
    $("[data-out=diff]").textContent = diff > 0
      ? "About " + gbp.format(round(diff / 12, 50)) + " a month more than a typical long let, before tax."
      : "In this case a long let looks similar or better — we'll tell you that honestly.";
    var s = document.querySelector("[data-calc-summary]");
    if (s) s.textContent = beds() + "-bed, " + C.bands[band.value].label + ", est. net " + gbp.format(netLowM) + "–" + gbp.format(netHighM) + "/mo";
    var hidden = document.querySelectorAll("[data-calc-field]");
    hidden.forEach(function (h) {
      var k = h.getAttribute("data-calc-field");
      h.value = k === "postcode" ? postcode.value : k === "beds" ? beds() : s ? s.textContent : "";
    });
  }

  function syncBand() {
    var b = bandFor(postcode.value);
    if (b) { band.value = b; hint.textContent = "Detected: " + C.bands[b].label; }
    else hint.textContent = postcode.value ? "Choose the closest match below" : "";
    compute();
  }

  var q = new URLSearchParams(location.search);
  if (q.get("postcode")) postcode.value = q.get("postcode");
  if (q.get("beds")) { var r = root.querySelector('input[name="beds"][value="' + q.get("beds") + '"]'); if (r) r.checked = true; }

  postcode.addEventListener("input", syncBand);
  band.addEventListener("change", function () { hint.textContent = ""; compute(); });
  rent.addEventListener("input", compute);
  root.querySelectorAll('input[name="beds"]').forEach(function (r) { r.addEventListener("change", compute); });
  var tracked = false;
  root.addEventListener("change", function () {
    if (!tracked && window.seekerTrack) { tracked = true; window.seekerTrack("calculator_used", { beds: beds(), band: band.value }); }
  });
  syncBand();
})();
