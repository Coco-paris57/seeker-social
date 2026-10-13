/* Seeker Estates — site behaviour. Config comes from window.SEEKER (set by build.py). */
(function () {
  "use strict";
  var C = window.SEEKER || {};
  var doc = document;

  /* ---------- Analytics & consent (Google Consent Mode v2) ---------- */
  var hasTags = !!(C.ga4 || C.adsId);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function readConsent() { try { return localStorage.getItem("se-consent"); } catch (e) { return null; } }
  function saveConsent(v) { try { localStorage.setItem("se-consent", v); } catch (e) {} }

  function loadTags() {
    if (!hasTags || window.__seTags) return;
    window.__seTags = true;
    var s = doc.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + (C.ga4 || C.adsId);
    doc.head.appendChild(s);
    gtag("js", new Date());
    if (C.ga4) gtag("config", C.ga4);
    if (C.adsId) gtag("config", C.adsId);
  }

  if (hasTags) {
    gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });
    var stored = readConsent();
    if (stored === "granted") {
      gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    }
    loadTags();
    if (!stored) showCookieBanner();
  }

  function showCookieBanner() {
    var el = doc.createElement("div");
    el.className = "cookie";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Cookie preferences");
    el.innerHTML = '<p>We use cookies to measure our ads and improve this site. No tracking until you say yes. <a href="' + (C.root || "/") + 'privacy/">Privacy policy</a></p><div class="row"><button class="btn btn--sm" data-c="granted">Accept</button><button class="btn btn--sm btn--ghost" data-c="denied">Decline</button></div>';
    el.addEventListener("click", function (e) {
      var v = e.target.getAttribute("data-c");
      if (!v) return;
      saveConsent(v);
      if (v === "granted") gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
      el.remove();
    });
    doc.body.appendChild(el);
  }

  function track(name, params, adsLabel) {
    gtag("event", name, params || {});
    if (C.adsId && adsLabel) gtag("event", "conversion", { send_to: C.adsId + "/" + adsLabel });
  }
  window.seekerTrack = track;

  /* ---------- Header ---------- */
  var header = doc.querySelector(".site-header");
  var menuBtn = doc.querySelector(".menu-btn");
  if (menuBtn) menuBtn.addEventListener("click", function () {
    var open = header.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    doc.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    doc.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Booking links: add UTM + track ---------- */
  function bookingUrl(extra) {
    var u = new URL(C.bookingUrl);
    var here = new URLSearchParams(location.search);
    u.searchParams.set("utm_source", here.get("utm_source") || "website");
    u.searchParams.set("utm_medium", here.get("utm_medium") || "direct");
    u.searchParams.set("utm_campaign", here.get("utm_campaign") || (doc.body.getAttribute("data-page") || "site"));
    if (here.get("gclid")) u.searchParams.set("gclid", here.get("gclid"));
    Object.keys(extra || {}).forEach(function (k) { if (extra[k]) u.searchParams.set(k, extra[k]); });
    return u.toString();
  }
  doc.querySelectorAll("[data-book]").forEach(function (a) {
    a.addEventListener("click", function () {
      a.href = bookingUrl();
      track("begin_checkout", { source: doc.body.getAttribute("data-page") }, C.adsBookLabel);
    });
  });

  /* ---------- Booking bar ---------- */
  doc.querySelectorAll("form.bookbar").forEach(function (f) {
    var a = f.querySelector('[name="arrival"]'), d = f.querySelector('[name="departure"]');
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    var iso = today.toISOString().slice(0, 10);
    if (a) a.min = iso;
    if (d) d.min = iso;
    if (a && d) a.addEventListener("change", function () {
      d.min = a.value;
      if (!d.value || d.value <= a.value) {
        var n = new Date(a.value); n.setDate(n.getDate() + 3); d.value = n.toISOString().slice(0, 10);
      }
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var params = {};
      if (C.bookingParams) {
        params[C.bookingParams.arrival] = a && a.value;
        params[C.bookingParams.departure] = d && d.value;
        params[C.bookingParams.guests] = f.guests && f.guests.value;
      }
      track("begin_checkout", { arrival: a && a.value, departure: d && d.value, guests: f.guests && f.guests.value }, C.adsBookLabel);
      window.open(bookingUrl(params), "_blank", "noopener");
    });
  });

  /* ---------- Audience tabs (home hero) ---------- */
  doc.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    var btns = wrap.querySelectorAll("[role=tab]");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) {
          var on = x === b;
          x.setAttribute("aria-selected", on ? "true" : "false");
          x.tabIndex = on ? 0 : -1;
          doc.getElementById(x.getAttribute("aria-controls")).hidden = !on;
        });
      });
    });
  });

  /* ---------- Mini estimator → calculator page ---------- */
  doc.querySelectorAll("form.mini-est").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = new URLSearchParams();
      if (f.postcode.value) q.set("postcode", f.postcode.value.trim());
      if (f.beds.value) q.set("beds", f.beds.value);
      location.href = f.getAttribute("action") + "?" + q.toString() + "#calculator";
    });
  });

  /* ---------- Lead & contact forms ---------- */
  doc.querySelectorAll("form[data-lead]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = f.querySelector(".form-status");
      var data = {};
      new FormData(f).forEach(function (v, k) { data[k] = v; });
      data.page = location.pathname;
      data.source = new URLSearchParams(location.search).get("utm_source") || "";
      var calc = doc.querySelector("[data-calc-summary]");
      if (calc && calc.textContent) data.estimate = calc.textContent;
      var kind = f.getAttribute("data-lead");
      function ok() {
        if (status) { status.className = "form-status ok"; status.textContent = "Thank you — we'll be in touch within one working day."; }
        f.reset();
        track("generate_lead", { form: kind }, C.adsLeadLabel);
      }
      if (C.formEndpoint) {
        fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); ok(); })
          .catch(function () { if (status) { status.className = "form-status err"; status.textContent = "Something went wrong. Please email " + C.email + "."; } });
      } else {
        var subject = kind === "landlord" ? "Property enquiry — " + (data.postcode || "") : "Website enquiry";
        var body = Object.keys(data).filter(function (k) { return data[k] && k !== "consent"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
        location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        ok();
      }
    });
  });

  /* ---------- Year ---------- */
  doc.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
