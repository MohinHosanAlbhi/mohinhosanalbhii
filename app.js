(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var C = D.contact;
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------- theme ---------- */
  function paintThemeBtn() {
    var dark = root.getAttribute("data-theme") === "dark";
    var b = $("#themeBtn");
    b.textContent = dark ? "☀" : "☾";
    b.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    var m = $('meta[name="theme-color"]');
    if (m) m.setAttribute("content", dark ? "#0b1322" : "#f5f7fb");
  }
  $("#themeBtn").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paintThemeBtn();
  });
  paintThemeBtn();

  /* ---------- mobile menu ---------- */
  var nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "✕" : "☰";
  });
  $$("#nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });

  /* ---------- animated counters ---------- */
  var COUNTS = [];
  function fmt(o, v) {
    var d = o.decimals || 0;
    var n = v.toFixed(d);
    if (!d) n = Number(n).toLocaleString("en-US");
    return (o.prefix || "") + n + (o.suffix || "");
  }
  function countHTML(o) {
    COUNTS.push(o);
    return '<div class="num" data-ci="' + (COUNTS.length - 1) + '">' + esc(fmt(o, reduceMotion ? o.value : 0)) + "</div>";
  }
  function countUp(el) {
    var o = COUNTS[+el.dataset.ci];
    if (!o) return;
    if (reduceMotion) { el.textContent = fmt(o, o.value); return; }
    var start = null, dur = 1300;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(o, o.value * e);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(o, o.value);
    }
    requestAnimationFrame(step);
  }

  /* ---------- hero / about ---------- */
  document.title = D.name + " — " + D.role + " | Textile Engineer";
  $("#brandName").textContent = D.name.replace(/^Md\.\s*/, "");
  $("#heroEyebrow").textContent = D.eyebrow;
  var parts = D.name.split(" ");
  var last = parts.pop();
  $("#heroName").innerHTML = esc(parts.join(" ")) + " <span>" + esc(last) + "</span>";
  $("#heroRole").textContent = D.role;
  $("#heroRoleDetail").textContent = D.roleDetail;
  $("#heroTagline").textContent = D.tagline;
  $("#heroFocus").innerHTML = (D.focus || []).map(function (f) { return '<span class="chip">' + esc(f) + "</span>"; }).join("");
  $("#heroLoc").textContent = "📍 " + D.location;
  $("#heroCv").setAttribute("href", C.resume);
  $("#cvBtn").setAttribute("href", C.resume);
  $("#about-h").textContent = D.about.heading;
  $("#aboutText").innerHTML = D.about.paragraphs.map(function (t, i, a) {
    return "<p" + (i === a.length - 1 && a.length > 1 ? ' class="closing"' : "") + ">" + esc(t) + "</p>";
  }).join("");
  $("#footName").textContent = "© " + new Date().getFullYear() + " " + D.name;

  /* Photo: if img/photo.jpg fails to load, use the embedded backup copy. */
  var photo = $("#heroPhoto");
  function useBackupPhoto() {
    if (window.PHOTO_FALLBACK && photo.getAttribute("src") !== window.PHOTO_FALLBACK) {
      photo.setAttribute("src", window.PHOTO_FALLBACK);
    }
  }
  photo.addEventListener("error", useBackupPhoto);
  if (photo.complete && photo.naturalWidth === 0) useBackupPhoto();

  /* ---------- stats ---------- */
  $("#stats").innerHTML = D.stats.map(function (s) {
    return '<div class="stat reveal">' + countHTML(s) + '<div class="lbl">' + esc(s.label) + "</div>" +
      (s.note ? '<div class="note">' + esc(s.note) + "</div>" : "") + "</div>";
  }).join("");

  /* ---------- experience & activities ---------- */
  function monthsSince(ym) {
    var p = ym.split("-"), now = new Date();
    return Math.max(0, (now.getFullYear() - +p[0]) * 12 + (now.getMonth() + 1 - +p[1]));
  }
  function durationText(m) {
    var y = Math.floor(m / 12), r = m % 12, out = [];
    if (y) out.push(y + " yr" + (y > 1 ? "s" : ""));
    if (r) out.push(r + " mo" + (r > 1 ? "s" : ""));
    return out.join(" ") || "< 1 mo";
  }
  function expCard(x) {
    var roles = x.roles.map(function (r) {
      var live = r.since ? '<span class="badge">Current · ' + esc(durationText(monthsSince(r.since))) + "</span>" : "";
      return '<div class="role"><strong>' + esc(r.title) + '</strong><span class="period">' + esc(r.period) + live + "</span></div>";
    }).join("");
    var buyers = x.buyers ? '<div class="buyers"><span class="lbl">Buyers</span>' +
      x.buyers.map(function (b) { return '<span class="chip">' + esc(b) + "</span>"; }).join("") + "</div>" : "";
    var tags = [];
    x.points.forEach(function (p) { if (p.tag && tags.indexOf(p.tag) < 0) tags.push(p.tag); });
    var filters = tags.length ? '<div class="filters" role="group" aria-label="Filter responsibilities">' +
      '<button type="button" class="chip" data-tag="" aria-pressed="true">All</button>' +
      tags.map(function (t) { return '<button type="button" class="chip" data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + "</button>"; }).join("") + "</div>" : "";
    var lis = x.points.map(function (p) {
      return '<li data-tag="' + esc(p.tag || "") + '">' + (p.tag ? '<span class="tag">' + esc(p.tag) + ":</span>" : "") + esc(p.text) + "</li>";
    }).join("");
    return '<article class="tl-item reveal" data-type="' + x.type + '"><span class="dot"></span><div class="card">' +
      '<div class="org-line"><h3>' + esc(x.org) + "</h3>" + (x.place ? '<span class="place">' + esc(x.place) + "</span>" : "") + "</div>" +
      roles + buyers + filters +
      '<ul class="points">' + lis + "</ul>" +
      (tags.length ? '<p class="cnt" aria-live="polite"></p>' : "") + "</div></article>";
  }
  $("#timeline").innerHTML = D.experience.map(expCard).join("");
  $("#actTimeline").innerHTML = D.activities.map(expCard).join("");

  var expTabs = [
    { id: "all", label: "All" },
    { id: "work", label: "Work" },
    { id: "teaching", label: "Teaching" }
  ];
  $("#tabs").innerHTML = expTabs.map(function (t, i) {
    return '<button type="button" data-t="' + t.id + '" aria-pressed="' + (i === 0) + '">' + esc(t.label) + "</button>";
  }).join("");
  $("#tabs").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-t]");
    if (!b) return;
    $$("#tabs button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    var t = b.dataset.t;
    $$("#timeline .tl-item").forEach(function (it) {
      var show = t === "all" || it.dataset.type === t;
      it.hidden = !show;
      if (show) it.classList.add("in");
    });
  });
  $$(".filters").forEach(function (f) {
    var card = f.closest(".card");
    var cnt = $(".cnt", card);
    function apply(tag) {
      var shown = 0, total = 0;
      $$(".points li", card).forEach(function (li) {
        total++;
        var ok = !tag || li.dataset.tag === tag;
        li.hidden = !ok;
        if (ok) shown++;
      });
      cnt.textContent = tag ? "Showing " + shown + " of " + total + " responsibilities" : "";
    }
    f.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-tag]");
      if (!b) return;
      $$("button", f).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      apply(b.dataset.tag);
    });
  });

  /* ---------- education / training / scholarships ---------- */
  $("#eduGrid").innerHTML = D.education.map(function (e) {
    return '<div class="card edu reveal' + (e.featured ? " featured" : "") + '"><span class="years">' + esc(e.years) + "</span>" +
      '<div class="deg">' + esc(e.degree) + "</div><div>" + esc(e.school) + "</div>" +
      e.lines.map(function (l) { return '<div class="hint">' + esc(l) + "</div>"; }).join("") +
      '<div class="res">' + esc(e.result) + "</div></div>";
  }).join("");

  var years = ["All"];
  D.training.forEach(function (t) { if (years.indexOf(t.year) < 0) years.push(t.year); });
  $("#trainFilters").innerHTML = years.map(function (y, i) {
    return '<button type="button" data-y="' + esc(y) + '" aria-pressed="' + (i === 0) + '">' + esc(y) + "</button>";
  }).join("");
  $("#trainGrid").innerHTML = D.training.map(function (t) {
    return '<div class="card" data-y="' + esc(t.year) + '"><span class="yr">' + esc(t.year) + "</span><b>" + esc(t.title) + "</b><span>" + esc(t.provider) + "</span></div>";
  }).join("");
  $("#trainFilters").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-y]");
    if (!b) return;
    $$("#trainFilters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    var y = b.dataset.y, n = 0;
    $$("#trainGrid .card").forEach(function (c) {
      var ok = y === "All" || c.dataset.y === y;
      c.hidden = !ok;
      if (ok) { n++; c.style.animation = "none"; void c.offsetWidth; c.style.animation = ""; }
    });
    $("#trainCount").textContent = y === "All" ? "" : n + " of " + D.training.length + " programs in " + y;
  });

  $("#schol").innerHTML = D.scholarships.map(function (s) {
    return '<div class="card reveal"><span class="ic" aria-hidden="true">★</span><div><div class="yr">' + esc(s.level) +
      "</div><b>" + esc(s.title) + "</b><p>" + esc(s.text) + "</p></div></div>";
  }).join("");

  /* ---------- skills (three separate groups, filter + search) ---------- */
  var SK = D.skills || {};
  var SK_BLOCKS = [
    { id: "technical", label: "Technical & software skills", list: SK.technical || [] },
    { id: "competency", label: "Competency", list: SK.competency || [] },
    { id: "languages", label: "Languages", list: SK.languages || [] }
  ];
  var skillGroup = "all", skillQuery = "";
  $("#skillFilters").innerHTML = [{ id: "all", label: "All" }].concat(SK_BLOCKS).map(function (g, i) {
    return '<button type="button" class="chip" data-g="' + g.id + '" aria-pressed="' + (i === 0) + '">' + esc(g.label) + "</button>";
  }).join("");

  function skillCard(b, s, i) {
    var lang = b.id === "languages";
    var meter = "";
    if (lang) {
      meter = '<div class="meter" role="img" aria-label="' + esc(s.usage || "") + '">';
      for (var k = 1; k <= 4; k++) meter += '<i class="' + (k <= (s.step || 0) ? "on" : "") + '"></i>';
      meter += "</div>";
    }
    var use = s.usage ? (lang ? '<span class="lvl">' + esc(s.usage) + "</span>" : '<span class="badge use">' + esc(s.usage) + "</span>") : "";
    return '<div class="sk" data-g="' + b.id + '" style="animation-delay:' + (reduceMotion ? 0 : Math.min(i, 12) * 40) + 'ms">' +
      '<span class="nm">' + esc(s.name) + "</span>" +
      (s.detail ? '<span class="dt">' + esc(s.detail) + "</span>" : "") + use + meter + "</div>";
  }
  function renderSkills() {
    var q = skillQuery.trim().toLowerCase();
    var total = 0, shown = 0, html = "";
    SK_BLOCKS.forEach(function (b) {
      total += b.list.length;
      if (skillGroup !== "all" && skillGroup !== b.id) return;
      var list = b.list.filter(function (s) {
        return !q || (s.name + " " + (s.detail || "") + " " + (s.usage || "") + " " + b.label).toLowerCase().indexOf(q) >= 0;
      });
      if (!list.length) return;
      shown += list.length;
      html += '<div class="sk-block"><h3 class="sk-h">' + esc(b.label) + '<span class="n">' + list.length + "</span></h3>" +
        '<div class="skill-grid">' + list.map(function (s, i) { return skillCard(b, s, i); }).join("") + "</div></div>";
    });
    $("#skillBlocks").innerHTML = html || '<p class="empty">No skills match “' + esc(skillQuery) + '”. Try another word.</p>';
    $("#skillCount").textContent = "Showing " + shown + " of " + total + " skills";
  }
  $("#skillFilters").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-g]");
    if (!b) return;
    skillGroup = b.dataset.g;
    $$("#skillFilters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    renderSkills();
  });
  $("#skillSearch").addEventListener("input", function (e) {
    skillQuery = e.target.value;
    renderSkills();
  });
  renderSkills();

  /* ---------- product range: hover names + click-to-enlarge ---------- */
  var PR = D.products || {};
  var prItems = PR.items || [];
  if (!prItems.length) {
    $("#products").remove();
    var prLink = $('#nav a[href="#products"]');
    if (prLink && prLink.parentNode) prLink.parentNode.remove();
  } else {
    $("#prKicker").textContent = PR.kicker || "Product range";
    $("#products-h").textContent = PR.heading || "The product I develop";
    $("#prIntro").textContent = PR.intro || "";
    var prCats = [];
    prItems.forEach(function (p) { if (p.category && prCats.indexOf(p.category) < 0) prCats.push(p.category); });
    var prCat = "All";
    if (prCats.length > 1) {
      $("#prFilters").innerHTML = ["All"].concat(prCats).map(function (c, i) {
        return '<button type="button" data-c="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + "</button>";
      }).join("");
    } else {
      $("#prFilters").remove();
    }
    $("#prGrid").innerHTML = prItems.map(function (p, i) {
      return '<button type="button" class="pcard" data-i="' + i + '" data-c="' + esc(p.category || "") + '" aria-label="Enlarge: ' + esc(p.name) + '">' +
        '<img src="' + esc(p.file) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async"><span class="cap">' + esc(p.name) + "</span></button>";
    }).join("");
    /* A picture that cannot be found shows its name on a plain tile instead of a broken icon. */
    $("#prGrid").addEventListener("error", function (e) {
      if (e.target && e.target.tagName === "IMG") e.target.closest(".pcard").classList.add("broken");
    }, true);

    var prVisible = [];
    function applyPr() {
      prVisible = [];
      $$("#prGrid .pcard").forEach(function (c) {
        var ok = prCat === "All" || c.dataset.c === prCat;
        c.hidden = !ok;
        if (ok) prVisible.push(+c.dataset.i);
      });
      $("#prCount").textContent = prCat === "All" ? prItems.length + " styles" : prVisible.length + " of " + prItems.length + " styles · " + prCat;
    }
    if ($("#prFilters")) {
      $("#prFilters").addEventListener("click", function (e) {
        var b = e.target.closest("button[data-c]");
        if (!b) return;
        prCat = b.dataset.c;
        $$("#prFilters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        applyPr();
      });
    }
    applyPr();

    /* lightbox */
    var lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap"), lbPos = 0, lbFrom = null;
    function showLb(pos) {
      lbPos = (pos + prVisible.length) % prVisible.length;
      var p = prItems[prVisible[lbPos]];
      lbImg.setAttribute("src", p.file);
      lbImg.setAttribute("alt", p.name);
      lbCap.textContent = p.name + (prVisible.length > 1 ? "  ·  " + (lbPos + 1) + " / " + prVisible.length : "");
    }
    function openLb(i) {
      lbFrom = document.activeElement;
      var multi = prVisible.length > 1;
      $("#lbPrev").hidden = !multi;
      $("#lbNext").hidden = !multi;
      showLb(Math.max(0, prVisible.indexOf(i)));
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lbClose").focus();
    }
    function closeLb() {
      lb.hidden = true;
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
      if (lbFrom && lbFrom.focus) lbFrom.focus();
    }
    $("#prGrid").addEventListener("click", function (e) {
      var c = e.target.closest(".pcard");
      if (c) openLb(+c.dataset.i);
    });
    $("#lbClose").addEventListener("click", closeLb);
    $("#lbPrev").addEventListener("click", function () { showLb(lbPos - 1); });
    $("#lbNext").addEventListener("click", function () { showLb(lbPos + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") { closeLb(); }
      else if (e.key === "ArrowLeft" && prVisible.length > 1) { e.preventDefault(); showLb(lbPos - 1); }
      else if (e.key === "ArrowRight" && prVisible.length > 1) { e.preventDefault(); showLb(lbPos + 1); }
      else if (e.key === "Tab") {
        var f = $$(".lb-btn", lb).filter(function (b) { return !b.hidden; });
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
  }

  /* ---------- research stepper ---------- */
  var R = D.research;
  $("#resKicker").textContent = R.kicker;
  $("#res-h").textContent = R.heading;
  $("#researchTitle").textContent = R.title;
  $("#resKw").innerHTML = R.keywords.map(function (k) { return '<span class="chip">' + esc(k) + "</span>"; }).join("");
  $("#resSteps").innerHTML = R.steps.map(function (s, i) {
    return '<button type="button" class="step" role="tab" id="rs' + i + '" aria-controls="rp' + i + '" aria-selected="' + (i === 0) +
      '" tabindex="' + (i === 0 ? 0 : -1) + '"><span class="n">' + (i + 1) + "</span><span>" + esc(s.label) + "</span></button>";
  }).join("");
  $("#resPanels").innerHTML = R.steps.map(function (s, i) {
    return '<div class="panel" role="tabpanel" id="rp' + i + '" aria-labelledby="rs' + i + '"' + (i === 0 ? "" : " hidden") + "><p>" + esc(s.text) + "</p></div>";
  }).join("");
  var stepIdx = 0;
  function goStep(i, focus) {
    var n = R.steps.length;
    stepIdx = (i + n) % n;
    $$("#resSteps .step").forEach(function (b, k) {
      b.setAttribute("aria-selected", String(k === stepIdx));
      b.setAttribute("tabindex", k === stepIdx ? "0" : "-1");
      if (k === stepIdx && focus) b.focus();
    });
    $$("#resPanels .panel").forEach(function (p, k) { p.hidden = k !== stepIdx; });
    $("#resPrev").disabled = stepIdx === 0;
    $("#resNext").disabled = stepIdx === n - 1;
  }
  $("#resSteps").addEventListener("click", function (e) {
    var b = e.target.closest(".step");
    if (b) goStep($$("#resSteps .step").indexOf(b));
  });
  $("#resSteps").addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); goStep(stepIdx + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goStep(stepIdx - 1, true); }
  });
  $("#resPrev").addEventListener("click", function () { goStep(stepIdx - 1); });
  $("#resNext").addEventListener("click", function () { goStep(stepIdx + 1); });
  goStep(0);

  /* ---------- interests ---------- */
  var ICONS = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5V5.5"/><path d="M9 8h7"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/>'
  };
  function svg(name) {
    return '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  var I = D.interests;
  $("#intKicker").textContent = I.kicker;
  $("#int-h").textContent = I.heading;
  $("#intText").textContent = I.text;
  $("#intTiles").innerHTML = I.tiles.map(function (t) {
    return '<div class="tile"><span class="ic">' + svg(t.icon) + "</span><b>" + esc(t.label) + "</b></div>";
  }).join("") +
    '<div class="tile big"><div>' + countHTML(I.stat) + '<b>' + esc(I.stat.label) + "</b><span>" + esc(I.stat.note) + "</span></div></div>";

  /* ---------- growth ---------- */
  var G = D.growth;
  $("#growKicker").textContent = G.kicker;
  $("#grow-h").textContent = G.heading;
  $("#growText").textContent = G.text;
  $("#growGrid").innerHTML = G.items.map(function (g, i) {
    return '<article class="gcard reveal" style="transition-delay:' + (reduceMotion ? 0 : i * 70) + 'ms"><span class="no">' + (i < 9 ? "0" : "") + (i + 1) +
      "</span><h3>" + esc(g.title) + "</h3><p>" + esc(g.text) + "</p></article>";
  }).join("");

  /* ---------- contact ---------- */
  $("#contactList").innerHTML =
    '<div class="crow"><span class="ic" aria-hidden="true">✉</span><div class="t"><small>Email</small><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></div><button type="button" id="copyEmail">Copy</button></div>' +
    '<div class="crow"><span class="ic" aria-hidden="true">in</span><div class="t"><small>LinkedIn</small><a href="' + esc(C.linkedin) + '" target="_blank" rel="noopener noreferrer">' + esc(C.linkedinLabel) + '</a></div></div>' +
    '<div class="crow"><span class="ic" aria-hidden="true">☎</span><div class="t"><small>Phone</small><span id="phoneVal">•••• ••• ••••</span></div><button type="button" id="showPhone">Show</button></div>' +
    '<div class="crow"><span class="ic" aria-hidden="true">⌖</span><div class="t"><small>Location</small><span>' + esc(D.location) + "</span></div></div>";

  $("#copyEmail").addEventListener("click", function () {
    function done() { toast("Email address copied"); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(C.email).then(done, function () { toast(C.email); });
    } else { toast(C.email); }
  });
  $("#showPhone").addEventListener("click", function () {
    var v = $("#phoneVal");
    v.innerHTML = '<a href="tel:' + esc(C.phone) + '">' + esc(C.phone) + "</a>";
    this.remove();
  });
  $("#vcardBtn").addEventListener("click", function () {
    var v = ["BEGIN:VCARD", "VERSION:3.0", "FN:" + D.name, "N:Albhi;Md. Mohin Hosan;;;",
      "ORG:Interstoff Apparels Ltd.", "TITLE:Assistant Merchandiser", "TEL;TYPE=CELL:" + C.phone,
      "EMAIL:" + C.email, "URL:" + C.linkedin, "ADR;TYPE=WORK:;;;Dhaka;;;Bangladesh", "END:VCARD"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard" }));
    a.download = "Mohin_Hosan_Albhi.vcf";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  $("#msgForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var subject = "Portfolio enquiry from " + f.n.value;
    var body = f.m.value + "\n\n— " + f.n.value + " (" + f.e.value + ")";
    location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  /* ---------- reveal, count-up, scroll-spy ---------- */
  var seen = new WeakSet();
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        var n = en.target.matches(".num") ? en.target : $(".num", en.target);
        if (n && !seen.has(n)) { seen.add(n); countUp(n); }
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    $$(".reveal, .tile.big").forEach(function (el) { io.observe(el); });

    var links = {};
    $$("#nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
        var a = links[en.target.dataset.nav];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[data-nav]").forEach(function (s) { spy.observe(s); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$(".num").forEach(function (n) { countUp(n); });
  }

  /* ---------- progress bar & back-to-top ---------- */
  var bar = $("#progress"), toTop = $("#toTop"), ticking = false;
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    toTop.classList.toggle("show", h.scrollTop > 600);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
})();
