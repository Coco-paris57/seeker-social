/* Seeker Estates — loader & page transitions, count-ups, small motion touches.
   The loader itself is pure CSS (it lifts on its own even if this file fails);
   this file only clears it away, plays the exit curtain on internal links and adds polish. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var still = !window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Loader ---------- */
  var loader = doc.querySelector(".loader");
  function done() { root.classList.remove("ld-exit"); root.classList.add("ld-done"); }
  if (loader) {
    loader.addEventListener("animationend", function (e) { if (e.target === loader && !root.classList.contains("ld-exit")) done(); });
    setTimeout(function () { if (!root.classList.contains("ld-exit")) done(); }, 1200);
  }
  // Back/forward cache: never come back to a closed curtain.
  addEventListener("pageshow", function (e) { if (e.persisted) done(); });

  /* ---------- Page transition on internal links ---------- */
  doc.addEventListener("click", function (e) {
    if (still || !loader || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download") || a.hasAttribute("data-no-fx")) return;
    if (a.protocol !== location.protocol || a.host !== location.host) return; // mailto:, tel:, wa.me, other sites
    if (a.pathname === location.pathname && a.search === location.search) return; // hash links, same page
    if (/\.(pdf|zip|ics|xml|txt|png|jpe?g|webp|svg)$/i.test(a.pathname)) return;
    e.preventDefault();
    var href = a.href;
    try { sessionStorage.setItem("se-nav", Date.now()); } catch (err) {}
    root.classList.add("ld-exit");
    setTimeout(function () { location.href = href; }, 340);
    setTimeout(done, 3000); // navigation never happened: lift the curtain anyway
  });

  if (still) return;

  /* ---------- Count-up on stat numbers (ends on the exact original text) ---------- */
  function count(b) {
    var txt = b.textContent, m = txt.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    var to = +m[2], dp = (m[2].split(".")[1] || "").length, t0 = performance.now();
    (function step(t) {
      var p = Math.min(1, Math.max(0, (t - t0) / 1400)), v = to * (1 - Math.pow(1 - p, 3));
      b.textContent = p < 1 ? m[1] + v.toFixed(dp) + m[3] : txt;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { cio.unobserve(x.target); count(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    doc.querySelectorAll(".stat b").forEach(function (b) { cio.observe(b); });
  }

  /* ---------- Calculator: the headline figure eases in when it changes ---------- */
  var out = doc.querySelector("[data-out=range]");
  if (out && out.animate && window.MutationObserver) {
    var big = out.closest(".calc-big") || out, prev = out.textContent, anim;
    new MutationObserver(function () {
      if (out.textContent === prev) return;
      prev = out.textContent;
      if (anim) anim.cancel();
      anim = big.animate([{ opacity: .35, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.22,.8,.24,1)" });
    }).observe(out, { childList: true, characterData: true, subtree: true });
  }

  /* ---------- Header tucks away on scroll down, returns on scroll up ---------- */
  var header = doc.querySelector(".site-header"), lastY = scrollY;
  if (header) addEventListener("scroll", function () {
    var y = scrollY;
    if (Math.abs(y - lastY) < 6) return;
    header.classList.toggle("is-tucked", y > lastY && y > 520);
    lastY = y;
  }, { passive: true });
})();
