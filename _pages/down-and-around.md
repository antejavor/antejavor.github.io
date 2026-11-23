---
layout: page
title: all the way down and around
permalink: /down-and-around/
description: Intelligence, from the physics of a bit up, and around again.
nav: false
sitemap: false
noindex: true
---

{% assign readings = site.data.reading_list %}
{% assign chapters = site.data.chapters %}
{% assign branches = site.data.branches %}

<p class="path-intro">
  An engineer's walk through what sits under intelligence: down through the whole stack (physics, devices,
  architecture, systems, algorithms, learning) and around three of them: the classical one that runs on transistors
  and GPUs, the brain, and the quantum computer.
</p>

<details class="path-kit">
  <summary>How to walk a step</summary>
  <p>For every substantial step, keep one page:</p>
  <ol>
    <li><strong>Problem.</strong> What were they trying to solve, and why then?</li>
    <li><strong>Objects.</strong> The mathematical objects involved.</li>
    <li><strong>Mechanism.</strong> The central idea, in my own words.</li>
    <li><strong>Assumptions.</strong> Which still shape how we think today?</li>
    <li><strong>The math behind it.</strong> The one equation or argument the idea rests on, worked through once, and only as far as the idea needs.</li>
    <li><strong>One experiment</strong> that can be reproduced.</li>
    <li><strong>One rival explanation.</strong> What experiment would tell the authors' explanation apart from another one for the same result?</li>
    <li><strong>Next question</strong> it raises, with links to earlier steps.</li>
  </ol>
  <p>Keep an analogy apart from a mathematical equivalence, and an empirical observation apart from a theorem.</p>
  <p>At any layer of any stack, ask:</p>
  <ul>
    <li><strong>Compute.</strong> What operation, at what precision, and how many per joule?</li>
    <li><strong>Store.</strong> Where does the state live, for how long, and what does it cost to keep or erase a bit?</li>
    <li><strong>Move.</strong> How many bytes travel per useful operation, and who sees a write, and when?</li>
    <li><strong>Search.</strong> What space is being searched, and how is it indexed, pruned or approximated?</li>
  </ul>
</details>

<figure class="path-map" id="path-map" aria-label="Map of the chapters and branches with the walked route">
  <div class="path-map-scroll"><svg id="path-svg" role="img"></svg></div>
  <figcaption>
    <span id="path-stats"></span>
    <label class="reading-toggle path-edges-toggle"><input type="checkbox" id="path-edges-all"> show all connections</label>
  </figcaption>
  <p class="path-map-key">
    The core line runs left to right through the {{ chapters.size }} chapters, with their readings above it. The
    {{ branches.size }} branches hang below the chapter they leave from; point at one to see where it rejoins the core.
    Faint dots are prerequisites.
  </p>
</figure>

<figure class="path-stack" aria-label="The stack: layers against compute, store, move and search">
  <div class="path-stack-head">
    <span class="path-stack-title">the stack</span>
  </div>
  <div class="path-stack-grid" id="path-stack-grid"></div>
  <figcaption>Each cell is a layer of the stack against one of the four questions: walked / total, with one dot per reading. Click a cell to list its readings.</figcaption>
</figure>

<div class="reading-controls" id="reading-controls">
  <div class="reading-views" role="tablist" aria-label="How to walk the list">
    <button type="button" class="reading-view active" role="tab" aria-selected="true" data-view="chapters">chapters</button>
    <button type="button" class="reading-view" role="tab" aria-selected="false" data-view="pass">first pass</button>
  </div>
  <div class="reading-switches">
    <button type="button" class="reading-chip" id="reading-branches-all" aria-pressed="false">open all branches</button>
    <label class="reading-toggle"><input type="checkbox" id="reading-todo-only"> not walked yet</label>
    <button type="button" class="reading-chip reading-cell-filter active" id="reading-cell-filter" hidden></button>
  </div>
</div>

<div class="reading-view-panel" data-view="chapters">
{% for c in chapters %}
  {% assign mine = readings | where: "home", c.id %}
  {% assign core = mine | where_exp: "r", "r.prereq != true" %}
  {% assign pre = mine | where: "prereq", true %}
  {% assign l0 = branches | where: "from", c.id %}
  <section class="reading-stage" id="{{ c.id }}">
    <header>
      <span class="reading-stage-num">{{ forloop.index0 | prepend: '0' | slice: -2, 2 }}</span>
      <h2>{{ c.title }}</h2>
      <span class="reading-era">{{ core.size }} readings{% if l0.size > 0 %} · {{ l0.size }} branch{% if l0.size > 1 %}es{% endif %}{% endif %}</span>
    </header>
    <p class="reading-q">{{ c.question }}</p>
    <p class="reading-blurb">{{ c.blurb }}</p>
    {% if pre.size > 0 %}
    <details class="reading-prereq">
      <summary>Refresh first · {{ pre.size }}</summary>
      <ul class="reading-items">
        {% for it in readings %}{% if it.home == c.id and it.prereq %}{% include reading_station.liquid it=it key=forloop.index0 view="chapters" tier="prereq" %}{% endif %}{% endfor %}
      </ul>
    </details>
    {% endif %}
    <ul class="reading-items">
      {% for it in readings %}{% if it.home == c.id and it.prereq != true %}
        {% assign isstart = false %}{% if it.title == c.start %}{% assign isstart = true %}{% endif %}
        {% include reading_station.liquid it=it key=forloop.index0 view="chapters" tier="core" start=isstart %}
      {% endif %}{% endfor %}
    </ul>
    {% if c.prompt %}<p class="reading-stop-prompt">{{ c.prompt }}</p>{% endif %}
    {% if l0.size > 0 %}
    <div class="reading-branches">
      <span class="reading-branches-title">branches</span>
      {% for b in l0 %}
        {% include reading_branch.liquid b=b level=0 %}
        {% assign l1 = branches | where: "from", b.id %}
        {% for b1 in l1 %}
          {% include reading_branch.liquid b=b1 level=1 %}
          {% assign l2 = branches | where: "from", b1.id %}
          {% for b2 in l2 %}{% include reading_branch.liquid b=b2 level=2 %}{% endfor %}
        {% endfor %}
      {% endfor %}
    </div>
    {% endif %}
  </section>
{% endfor %}
</div>

<div class="reading-view-panel" data-view="pass" hidden>
<p class="reading-view-lead">Two readings from each of the {{ chapters.size }} chapters, in order: one pass across every approach before going deep in any. Do the task at each station before moving on.</p>
{% for c in chapters %}
  <section class="reading-stage">
    <header>
      <span class="reading-stage-num">{{ forloop.index0 | prepend: '0' | slice: -2, 2 }}</span>
      <h2>{{ c.title }}</h2>
    </header>
    <p class="reading-q">{{ c.question }}</p>
    <ul class="reading-items">
      {% for t in c.pass %}{% for it in readings %}{% if it.title == t %}
        {% assign isstart = false %}{% if it.title == c.start %}{% assign isstart = true %}{% endif %}
        {% include reading_station.liquid it=it key=forloop.index0 view="pass" tier="core" start=isstart %}
      {% endif %}{% endfor %}{% endfor %}
    </ul>
    {% if c.prompt %}<p class="reading-stop-prompt">{{ c.prompt }}</p>{% endif %}
  </section>
{% endfor %}
</div>

<script id="path-data" type="application/json">{"items": {{ readings | jsonify }}, "chapters": {{ chapters | jsonify }}, "branches": {{ branches | jsonify }}}</script>
<script>
  (function () {
    var data = JSON.parse(document.getElementById("path-data").textContent);
    var items = data.items, chapters = data.chapters, branches = data.branches;
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.getElementById("path-svg");
    var demo = /[?&]demo\b/.test(location.search);
    var LAYERS = ["intelligence", "learning", "algorithms", "systems", "architecture", "devices", "physics"];
    var DOES = ["compute", "store", "move", "search"];

    function el(name, attrs, parent) {
      var n = document.createElementNS(NS, name);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      (parent || svg).appendChild(n);
      return n;
    }

    // ---------------------------------------------------------------- homes
    var chapterById = {}, branchById = {};
    chapters.forEach(function (c, i) { c.index = i; c.kids = []; chapterById[c.id] = c; });
    branches.forEach(function (b) { b.kids = []; branchById[b.id] = b; });
    branches.forEach(function (b) { (chapterById[b.from] || branchById[b.from]).kids.push(b); });
    function homeTitle(id) { return (chapterById[id] || branchById[id]).title; }

    // Readings, in file order (the page's station keys are these indexes)
    var nodes = items.map(function (it, i) {
      var home = chapterById[it.home] || branchById[it.home];
      return {
        key: i, title: it.title, note: it.note || null, home: it.home, isChapter: !!chapterById[it.home],
        tier: it.prereq ? "prereq" : chapterById[it.home] ? "core" : "branch",
        start: !it.prereq && home.start === it.title,
        layer: it.layer || null, does: it.does || [],
        read: it.read ? String(it.read).slice(0, 10) : null,
        buildsOn: it.builds_on || [], inEdges: [], outEdges: []
      };
    });

    // ---------------------------------------------------------------- metro layout
    // Each chapter is a station on one horizontal line; its readings stack above the line.
    // Its branches (and their sub-branches) take one column each below the line, starting under the station.
    var COLW = 15, GAP = 24, X0 = 26, ROW = 10, PREGAP = 8, TOP = 16, BR_TOP = 30;
    function colsOf(c) {
      var out = [];
      (function walk(list, level) { list.forEach(function (b) { out.push({ b: b, level: level }); walk(b.kids, level + 1); }); })(c.kids, 0);
      return out;
    }
    function inHome(id, tier) { return nodes.filter(function (n) { return n.home === id && n.tier === tier; }); }
    var x = X0, maxAbove = 0, maxBelow = 0;
    chapters.forEach(function (c) {
      c.cols = colsOf(c);
      c.x0 = x;
      c.cx = x + COLW / 2;
      c.core = inHome(c.id, "core");
      c.pre = inHome(c.id, "prereq");
      maxAbove = Math.max(maxAbove, c.core.length * ROW + (c.pre.length ? PREGAP + c.pre.length * ROW : 0));
      c.cols.forEach(function (col, k) {
        col.b.cx = x + k * COLW + COLW / 2;
        col.b.level = col.level;
        col.b.core = inHome(col.b.id, "branch");
        col.b.pre = inHome(col.b.id, "prereq");
        maxBelow = Math.max(maxBelow, col.b.core.length * ROW + (col.b.pre.length ? PREGAP + col.b.pre.length * ROW : 0));
      });
      x += Math.max(1, c.cols.length) * COLW + GAP;
    });
    var LINE = TOP + maxAbove + 18;
    var W = x - GAP + X0, H = LINE + BR_TOP + maxBelow + 16;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.style.minWidth = "820px";

    chapters.forEach(function (c) {
      c.core.forEach(function (n, i) { n.x = c.cx; n.y = LINE - 16 - i * ROW; });
      var top = LINE - 16 - c.core.length * ROW - PREGAP;
      c.pre.forEach(function (n, i) { n.x = c.cx; n.y = top - i * ROW; });
      c.cols.forEach(function (col) {
        var b = col.b;
        b.top = LINE + BR_TOP;
        b.core.forEach(function (n, i) { n.x = b.cx; n.y = b.top + i * ROW; });
        var start = b.top + b.core.length * ROW + PREGAP;
        b.pre.forEach(function (n, i) { n.x = b.cx; n.y = start + i * ROW; });
        b.bottom = b.top + Math.max(0, b.core.length - 1) * ROW;
      });
    });

    // ?demo fakes a plausible walk so the map can be previewed before any real progress
    if (demo) {
      var seed = 7;
      function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
      var order = 0;
      chapters.forEach(function (c, ci) {
        c.core.forEach(function (n, i) { if (rnd() < (ci < 6 ? 0.55 : 0.2) * (n.start ? 2 : 1)) n.order = order + i; });
        order += 20;
      });
      var d0 = new Date("2026-11-18");
      nodes.filter(function (n) { return n.order !== undefined; })
        .sort(function (a, b) { return a.order - b.order; })
        .forEach(function (n, i) { n.read = new Date(d0.getTime() + 86400000 * 2 * (i + 1)).toISOString().slice(0, 10); });
    }

    function curve(pts) {
      var d = "M" + pts[0].x + " " + pts[0].y;
      for (var i = 1; i < pts.length; i++) {
        var p = pts[i - 1], q = pts[i], mx = (p.x + q.x) / 2;
        d += p.x === q.x
          ? " L" + q.x + " " + q.y
          : " C" + mx + " " + p.y + " " + mx + " " + q.y + " " + q.x + " " + q.y;
      }
      return d;
    }

    // The core line and its stations
    el("path", { d: "M" + chapters[0].cx + " " + LINE + " H" + chapters[chapters.length - 1].cx, class: "path-core-line" });

    // Branches: an elbow from the station (or parent branch) to the column, a spine through its readings,
    // and a rejoin curve back to the core that shows on hover
    var branchLayer = el("g", { class: "path-branches" });
    chapters.forEach(function (c) {
      c.cols.forEach(function (col) {
        var b = col.b, parent = chapterById[b.from] ? { x: c.cx, y: LINE } : { x: branchById[b.from].cx, y: branchById[b.from].top - 6 };
        var jy = LINE + 8 + col.level * 6;
        var g = el("g", { class: "path-branch", "data-branch": b.id }, branchLayer);
        var a = el("a", { href: "#b-" + b.id }, g);
        el("path", { d: "M" + parent.x + " " + parent.y + " V" + jy + " H" + b.cx + " V" + (b.top - 6), class: "path-branch-line" }, a);
        if (b.core.length > 1) el("path", { d: "M" + b.cx + " " + (b.top - 6) + " V" + b.bottom, class: "path-branch-spine" }, a);
        el("rect", { x: b.cx - COLW / 2, y: b.top - 8, width: COLW, height: Math.max(12, b.bottom - b.top + 14), class: "path-branch-hit" }, a);
        var tt = el("title", {}, a);
        tt.textContent = b.title + ": " + b.core.length + " readings, rejoins at " + chapterById[b.rejoin].title;
        var r = chapterById[b.rejoin];
        el("path", {
          d: "M" + b.cx + " " + b.bottom + " C" + b.cx + " " + (b.bottom + 40) + " " + r.cx + " " + (LINE + 70) + " " + r.cx + " " + LINE,
          class: "path-rejoin"
        }, g);
        b.g = g;
        g.addEventListener("mouseenter", function () { g.classList.add("is-hot"); });
        g.addEventListener("mouseleave", function () { g.classList.remove("is-hot"); });
      });
    });

    chapters.forEach(function (c) {
      var g = el("g", { class: "path-stage" });
      var a = el("a", { href: "#" + c.id, class: "path-stage-link", "data-chapter": c.id }, g);
      el("circle", { cx: c.cx, cy: LINE, r: 9 }, a);
      var t = el("text", { x: c.cx, y: LINE + 3 }, a);
      t.textContent = ("0" + c.index).slice(-2);
      var tt = el("title", {}, a);
      tt.textContent = c.title + ": " + c.core.length + " readings";
    });

    // Connections: an edge from each earlier reading to the reading that builds on it
    var byTitle = {};
    nodes.forEach(function (n) { byTitle[n.title] = n; });
    var edgeLayer = el("g", { class: "path-edges" });
    var edgeCount = 0;
    nodes.forEach(function (n) {
      n.buildsOn.forEach(function (t) {
        var src = byTitle[t];
        if (!src) return;
        var dx = n.x - src.x, bend = Math.min(60, 12 + Math.abs(dx) * 0.12);
        var d = "M" + src.x + " " + src.y + " Q" + (src.x + n.x) / 2 + " " + (Math.min(src.y, n.y) - bend) + " " + n.x + " " + n.y;
        var e = el("path", { d: d, class: "path-edge" }, edgeLayer);
        n.inEdges.push({ el: e, other: src });
        src.outEdges.push({ el: e, other: n });
        edgeCount++;
      });
    });

    // The suggested route: every core reading, chapter by chapter
    var suggested = [];
    chapters.forEach(function (c) { suggested = suggested.concat(c.core); });
    if (suggested.length > 1) el("path", { d: curve(suggested), class: "path-suggested" });

    // The walked route: read items in date order
    var walk = nodes.filter(function (n) { return n.read; })
      .sort(function (a, b) { return a.read < b.read ? -1 : a.read > b.read ? 1 : a.key - b.key; });
    if (walk.length > 1) {
      var route = el("path", { d: curve(walk), class: "path-walked" });
      var len = route.getTotalLength();
      route.style.strokeDasharray = len;
      route.style.strokeDashoffset = len;
      requestAnimationFrame(function () { route.classList.add("is-drawn"); route.style.strokeDashoffset = 0; });
    }

    // Reading dots
    nodes.forEach(function (n) {
      var a = el("a", { href: "#p-" + n.key, class: "path-node is-" + n.tier + (n.read ? " is-read" : "") + (n.start ? " is-start" : "") });
      el("circle", { cx: n.x, cy: n.y, r: n.start ? 4 : n.tier === "prereq" ? 1.9 : 2.7 }, a);
      var t = el("title", {}, a);
      t.textContent = n.title + "\n" + homeTitle(n.home) + (n.tier === "prereq" ? " · refresh first" : "") +
        (n.read ? " · walked " + n.read : "") + (n.note ? "\n" + n.note : "") +
        (n.inEdges.length ? "\nbuilds on " + n.inEdges.length : "") + (n.outEdges.length ? " · built on by " + n.outEdges.length : "");
      n.dot = a;
      a.addEventListener("mouseenter", function () { focusNode(n, true); });
      a.addEventListener("mouseleave", function () { focusNode(n, false); });
    });

    function focusNode(n, on) {
      svg.classList.toggle("is-focusing", on);
      n.dot.classList.toggle("is-focus", on);
      n.inEdges.forEach(function (e) { e.el.classList.toggle("is-in", on); e.other.dot.classList.toggle("is-linked", on); });
      n.outEdges.forEach(function (e) { e.el.classList.toggle("is-out", on); e.other.dot.classList.toggle("is-linked", on); });
    }

    document.getElementById("path-edges-all").addEventListener("change", function (ev) {
      svg.classList.toggle("show-edges", ev.target.checked);
    });

    // Where I am now
    var here = walk[walk.length - 1] || suggested[0];
    el("circle", { cx: here.x, cy: here.y, r: 8, class: "path-here" });
    var label = el("text", { x: here.x + 11, y: here.y - 6, class: "path-here-label" });
    label.textContent = walk.length ? "you are here" : "start";

    // Stats
    var core = suggested.length;
    var coreDone = walk.filter(function (n) { return n.tier === "core"; }).length;
    var stats = document.getElementById("path-stats");
    stats.textContent = (walk.length
      ? walk.length + " / " + nodes.length + " walked · " + coreDone + " / " + core + " core · since " + walk[0].read +
        " · last step " + walk[walk.length - 1].read + (demo ? " · demo walk" : "")
      : "0 / " + nodes.length + " walked · " + core + " core · add read: YYYY-MM-DD to a reading in _data/reading_list.yml to take the first step") +
      " · " + edgeCount + " connections (hover a dot)";

    // ---------------------------------------------------------------- the stack grid
    var state = { cell: null, view: "chapters" };
    var grid = document.getElementById("path-stack-grid");

    function renderGrid() {
      grid.innerHTML = "";
      ["", "compute", "store", "move", "search"].forEach(function (h) {
        var d = document.createElement("div");
        d.className = "path-stack-colhead";
        d.textContent = h;
        grid.appendChild(d);
      });
      LAYERS.forEach(function (layer) {
        var lab = document.createElement("div");
        lab.className = "path-stack-rowhead";
        lab.textContent = layer;
        grid.appendChild(lab);
        DOES.forEach(function (does) {
          var inCell = nodes.filter(function (n) { return n.layer === layer && n.does.indexOf(does) >= 0; });
          var walked = inCell.filter(function (n) { return n.read; }).length;
          var b = document.createElement("button");
          b.type = "button";
          b.className = "path-stack-cell" + (inCell.length ? "" : " is-empty") +
            (state.cell && state.cell.layer === layer && state.cell.does === does ? " is-active" : "");
          b.style.setProperty("--cov", inCell.length ? (walked / inCell.length) : 0);
          b.title = layer + " × " + does + ": " + walked + " of " + inCell.length + " walked";
          var c = document.createElement("span");
          c.className = "path-stack-count";
          c.textContent = inCell.length ? walked + " / " + inCell.length : "–";
          b.appendChild(c);
          var dots = document.createElement("span");
          dots.className = "path-stack-dots";
          inCell.forEach(function (n) {
            var dd = document.createElement("i");
            if (n.read) dd.className = "is-read";
            dots.appendChild(dd);
          });
          b.appendChild(dots);
          if (inCell.length) {
            b.addEventListener("click", function () {
              var same = state.cell && state.cell.layer === layer && state.cell.does === does;
              state.cell = same ? null : { layer: layer, does: does };
              renderGrid(); update();
              if (!same) { setView("chapters"); document.getElementById("reading-controls").scrollIntoView({ behavior: "smooth" }); }
            });
          }
          grid.appendChild(b);
        });
      });
    }

    // ---------------------------------------------------------------- filters and views
    var todoOnly = document.getElementById("reading-todo-only");
    var cellChip = document.getElementById("reading-cell-filter");
    var branchesAll = document.getElementById("reading-branches-all");
    var panels = document.querySelectorAll(".reading-view-panel");
    var viewTabs = document.querySelectorAll(".reading-view");

    function matches(layer, does) {
      return !state.cell || (layer === state.cell.layer && does.indexOf(state.cell.does) >= 0);
    }

    function update() {
      var filtering = !!state.cell;
      document.querySelectorAll(".reading-item").forEach(function (li) {
        var does = li.dataset.does ? li.dataset.does.split(" ") : [];
        li.hidden = !(matches(li.dataset.layer, does) && (!todoOnly.checked || !li.classList.contains("is-read")));
      });
      document.querySelectorAll(".reading-prereq, .reading-branch, .reading-stage").forEach(function (box) {
        var any = !!box.querySelector(".reading-item:not([hidden])");
        box.hidden = !any;
        if (filtering && any && box.tagName === "DETAILS") box.open = true;
      });
      nodes.forEach(function (n) { n.dot.classList.toggle("is-dim", !matches(n.layer, n.does)); });
      cellChip.hidden = !state.cell;
      if (state.cell) cellChip.textContent = state.cell.layer + " × " + state.cell.does + "  ✕";
    }

    function setView(v) {
      state.view = v;
      panels.forEach(function (p) { p.hidden = p.dataset.view !== v; });
      viewTabs.forEach(function (t) {
        var on = t.dataset.view === v;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      try { localStorage.setItem("down-and-around:view", v); } catch (e) {}
    }

    viewTabs.forEach(function (t) { t.addEventListener("click", function () { setView(t.dataset.view); }); });
    cellChip.addEventListener("click", function () { state.cell = null; renderGrid(); update(); });
    todoOnly.addEventListener("change", update);
    branchesAll.addEventListener("click", function () {
      var open = branchesAll.getAttribute("aria-pressed") !== "true";
      document.querySelectorAll(".reading-branch").forEach(function (d) { d.open = open; });
      branchesAll.setAttribute("aria-pressed", open ? "true" : "false");
      branchesAll.classList.toggle("active", open);
      branchesAll.textContent = open ? "close all branches" : "open all branches";
    });

    // ---------------------------------------------------------------- stations
    function linkList(label, list) {
      if (!list.length) return null;
      var wrap = document.createElement("div");
      var lab = document.createElement("span");
      lab.className = "reading-links-dir";
      lab.textContent = label;
      wrap.appendChild(lab);
      list.forEach(function (e) {
        var a = document.createElement("a");
        a.href = "#p-" + e.other.key;
        a.className = "reading-link";
        a.textContent = e.other.title;
        a.title = homeTitle(e.other.home);
        wrap.appendChild(a);
      });
      return wrap;
    }

    var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.querySelectorAll(".reading-item").forEach(function (li) {
      var n = nodes[+li.dataset.key];
      var dd = li.querySelector(".reading-links");
      if (n && dd && (n.inEdges.length || n.outEdges.length)) {
        [linkList("builds on", n.inEdges), linkList("leads to", n.outEdges)].forEach(function (w) { if (w) dd.appendChild(w); });
        dd.hidden = false;
        li.querySelector(".reading-links-label").hidden = false;
      }
      var btn = li.querySelector(".reading-open");
      var timer = null;
      function setOpen(on) {
        li.classList.toggle("is-open", on);
        li.classList.remove("is-peek");
        btn.setAttribute("aria-expanded", on ? "true" : "false");
      }
      btn.addEventListener("click", function () { setOpen(!li.classList.contains("is-open")); });
      li._open = setOpen;
      // Pointing at a station previews it in a floating card; clicking pins it open in place
      if (fine) {
        li.addEventListener("mouseenter", function () {
          timer = setTimeout(function () { if (!li.classList.contains("is-open")) li.classList.add("is-peek"); }, 220);
        });
        li.addEventListener("mouseleave", function () { clearTimeout(timer); li.classList.remove("is-peek"); });
      }
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") document.querySelectorAll(".reading-item.is-peek").forEach(function (li) { li.classList.remove("is-peek"); });
    });

    // Links into the list (map dots, branches, stations, connections) open their target in the chapters view
    function openAncestors(node) {
      for (var p = node.parentElement; p; p = p.parentElement) if (p.tagName === "DETAILS") p.open = true;
    }
    function flash(node) { node.classList.remove("is-flash"); void node.offsetWidth; node.classList.add("is-flash"); }
    function reveal(hash) {
      var target = /^#(p-\d+|b-[\w-]+|[\w-]+)$/.test(hash) && document.getElementById(hash.slice(1));
      if (!target || !target.closest(".reading-view-panel")) return false;
      setView("chapters");
      if (target.hidden || target.closest("[hidden]")) {
        state.cell = null; todoOnly.checked = false; renderGrid(); update();
      }
      openAncestors(target);
      if (target.tagName === "DETAILS") target.open = true;
      if (target._open) target._open(true);
      target.scrollIntoView({ block: target.classList.contains("reading-item") ? "center" : "start" });
      flash(target.classList.contains("reading-item") ? target : target.querySelector("summary") || target);
      return true;
    }
    document.addEventListener("click", function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href^="#"]');
      if (!a || a.closest(".path-kit")) return;
      var href = a.getAttribute("href");
      if (href === "#") return;
      if (reveal(href)) { ev.preventDefault(); history.replaceState(null, "", href); }
    });

    var saved = null;
    try { saved = localStorage.getItem("down-and-around:view"); } catch (e) {}
    if (saved && document.querySelector('.reading-view-panel[data-view="' + saved + '"]')) setView(saved);
    renderGrid();
    update();
    if (location.hash) reveal(location.hash);
  })();
</script>
