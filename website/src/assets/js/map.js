/* Seeker Estates — "our homes" map. Leaflet (self-hosted) is only fetched when a map
   scrolls near the viewport. Homes are drawn as soft circles around their neighbourhood,
   never as a pin on the building. Without JS the area list below the map still works. */
(function () {
  "use strict";
  var C = window.SEEKER || {};
  var maps = document.querySelectorAll("[data-homes-map]");
  if (!maps.length || !C.leaflet) return;

  var loading;
  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var css = document.createElement("link");
      css.rel = "stylesheet"; css.href = C.leaflet.css;
      document.head.appendChild(css);
      var s = document.createElement("script");
      s.src = C.leaflet.js; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
    return loading;
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function draw(el) {
    var data = JSON.parse(el.getAttribute("data-homes-map"));
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var touch = window.matchMedia && matchMedia("(pointer: coarse)").matches;
    var map = L.map(el.querySelector(".homes-map-canvas"), {
      scrollWheelZoom: false, dragging: !touch, tap: false, zoomControl: false,
      zoomSnap: 0.5, attributionControl: true, fadeAnimation: !reduce, zoomAnimation: !reduce
    });
    L.control.zoom({ position: "bottomright" }).addTo(map); // the arched top corners would hide it
    L.tileLayer(data.tiles.url, { attribution: data.tiles.attribution, maxZoom: 16, minZoom: 9 }).addTo(map);
    var bounds = [], far = [];
    data.homes.forEach(function (h) {
      var ll = [h.lat, h.lng];
      // Homes well outside London (Kings Langley) would shrink the London view; reach them by button instead.
      (h.far && data.homes.length > 1 ? far : bounds).push(ll);
      L.circle(ll, { radius: 350, stroke: true, color: "#A9441F", weight: 1.5, fillColor: "#C8582F", fillOpacity: 0.28 }).addTo(map);
      L.circleMarker(ll, { radius: 7, stroke: true, color: "#F6F1E7", weight: 2.5, fillColor: "#0F3D2E", fillOpacity: 1 })
        .addTo(map)
        .bindPopup(
          '<div class="map-pop"><strong>' + esc(h.label) + "</strong><span>Sleeps " + h.sleeps + " · " + esc(h.area) + " (" + esc(h.district) + ")</span>" +
          '<span class="map-pop-links"><a href="' + h.areaUrl + '">About the area</a><a href="' + data.book + '">Check availability</a></span></div>',
          { autoPanPaddingTopLeft: L.point(30, 110), autoPanPaddingBottomRight: L.point(30, 30), maxWidth: 260 });
    });
    if (bounds.length === 1) map.setView(bounds[0], 14);
    else map.fitBounds(bounds, { paddingTopLeft: [56, 120], paddingBottomRight: [56, 48], maxZoom: 14 });
    if (far.length) {
      var home = map.getBounds(), btn = L.control({ position: "bottomleft" });
      btn.onAdd = function () {
        var b = L.DomUtil.create("button", "map-far-btn");
        b.type = "button"; b.textContent = data.farLabel;
        L.DomEvent.disableClickPropagation(b);
        var away = false;
        b.onclick = function () {
          away = !away;
          if (away) map.flyTo(far[0], 13, { animate: !reduce }); else map.flyToBounds(home, { animate: !reduce });
          b.textContent = away ? "Back to London" : data.farLabel;
        };
        return b;
      };
      btn.addTo(map);
    }
    el.classList.add("is-ready");
    if (touch) {
      // On phones the page must keep scrolling: one tap unlocks dragging the map.
      var hint = el.querySelector(".homes-map-hint");
      hint.hidden = false;
      map.once("click", function () { map.dragging.enable(); hint.hidden = true; });
    }
  }

  function start(el) {
    loadLeaflet().then(function () { draw(el); }).catch(function () { el.classList.add("is-failed"); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); start(en.target); } });
    }, { rootMargin: "400px 0px" });
    maps.forEach(function (m) { io.observe(m); });
  } else {
    maps.forEach(start);
  }
})();
