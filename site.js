/* ============================================================
   De Shane Chiropractic — public site behaviour
   Reads settings from SheetDB and renders the alert marquee,
   address, and clinic hours. Falls back to defaults if the
   sheet isn't configured or can't be reached.
   ============================================================ */
(function () {
  var cfg = window.DESHANE_CONFIG || {};

  // Built-in defaults — also the values the admin panel starts from.
  var defaults = {
    alert_enabled: "FALSE",
    alert_text: "",
    address: "500 Exmouth St, Unit 13, Sarnia, ON",
    hours_mon: "9–1 · 3–6",
    hours_tue: "9 – 1",
    hours_wed: "Closed",
    hours_thu: "9–1 · 3–6",
    hours_fri: "9 – 1",
    hours_sat: "9 – 12",
    hours_sun: "Closed"
  };

  var DAYS = [
    ["Monday", "Mon", "hours_mon"], ["Tuesday", "Tue", "hours_tue"],
    ["Wednesday", "Wed", "hours_wed"], ["Thursday", "Thu", "hours_thu"],
    ["Friday", "Fri", "hours_fri"], ["Saturday", "Sat", "hours_sat"],
    ["Sunday", "Sun", "hours_sun"]
  ];

  function val(s, key) { return (s[key] != null && String(s[key]).trim() !== "") ? String(s[key]) : defaults[key]; }
  function setText(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }
  function setHref(id, href) { var el = document.getElementById(id); if (el) el.href = href; }

  function apply(s) {
    // ---- Address (everywhere) ----
    var addr = val(s, "address");
    var mapQ = encodeURIComponent("De Shane Chiropractic " + addr);
    var mapLink = "https://maps.google.com/?q=" + mapQ;

    setText("addressPill", "📍 " + addr);
    setText("addressLoc", addr);
    setText("footAddress", "📍 " + addr);
    setHref("addressLoc", mapLink);
    setHref("ctaDirections", mapLink);
    setHref("footAddress", mapLink);
    var frame = document.getElementById("mapFrame");
    if (frame) frame.src = "https://maps.google.com/maps?q=" + mapQ + "&t=&z=15&ie=UTF8&iwloc=&output=embed";

    // ---- Hours (hero card + location line) ----
    var rows = "", inline = [];
    DAYS.forEach(function (d) {
      var v = val(s, d[2]).trim();
      var cls = /closed/i.test(v) ? "closed" : "open";
      rows += '<div class="hrow"><span>' + d[0] + '</span><span class="' + cls + '">' + v + "</span></div>";
      inline.push(d[1] + " " + v);
    });
    var card = document.getElementById("hoursRows");
    if (card) card.innerHTML = rows;
    var line = document.getElementById("hoursInline");
    if (line) line.innerHTML = inline.join(" &nbsp;|&nbsp; ");

    // ---- Alert marquee ----
    var enabled = /^(true|on|yes|1)$/i.test(String(s.alert_enabled).trim());
    var text = (s.alert_text || "").trim();
    var bar = document.getElementById("alertBar");
    if (!bar) return;
    if (enabled && text && sessionStorage.getItem("alertDismissed") !== text) {
      setText("alertText", text);
      setText("alertTextDup", text);
      var track = bar.querySelector(".track");
      if (track) track.style.animationDuration = Math.max(14, text.length * 0.22) + "s";
      bar.style.display = "block";
    } else {
      bar.style.display = "none";
    }
  }

  // Dismiss button
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "alertClose") {
      var bar = document.getElementById("alertBar");
      var t = document.getElementById("alertText");
      if (bar) bar.style.display = "none";
      try { if (t) sessionStorage.setItem("alertDismissed", t.textContent); } catch (err) {}
    }
  });

  // Render defaults immediately, then refresh from the sheet.
  apply(defaults);

  // Preview helper: index.html?previewalert=Your+message shows that alert live
  // (handy for testing the marquee before SheetDB is connected).
  try {
    var pv = new URLSearchParams(location.search).get("previewalert");
    if (pv) apply({ alert_enabled: "TRUE", alert_text: pv });
  } catch (e) {}

  if (cfg.SHEETDB_API && cfg.SHEETDB_API.indexOf("YOUR_ENDPOINT_ID") === -1) {
    fetch(cfg.SHEETDB_API, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (rows) { if (rows && rows.length) apply(rows[0]); })
      .catch(function () { /* keep defaults */ });
  }
})();
