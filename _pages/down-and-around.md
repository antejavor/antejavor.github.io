---
layout: page
title: all the way down and around
permalink: /down-and-around/
description: Intelligence, from the physics of a bit up, and around again.
nav: false
sitemap: false
noindex: true
---

{% assign stages = site.data.reading_list %}

<p class="path-intro">
  An engineer's walk through what sits under intelligence: down through the whole stack (physics, devices,
  architecture, systems, algorithms, learning) and around three of them: the classical one that runs on transistors
  and GPUs, the brain, and the quantum computer. At every layer the same four questions come back: how do you
  <strong>compute</strong>, <strong>store</strong>, <strong>move</strong> and <strong>search</strong>? Nothing here is learned in one pass; every
  stage sends you back to an earlier one, and that is the point. Large language models are one answer at the top of one
  stack, a great case study in scale, not the destination.
</p>

<details class="path-kit">
  <summary>How to walk a step</summary>
  <p>For every substantial step, keep one page:</p>
  <ol>
    <li><strong>Problem.</strong> What were they trying to solve, and why then?</li>
    <li><strong>Objects.</strong> The mathematical objects involved.</li>
    <li><strong>Mechanism.</strong> The central idea, in my own words.</li>
    <li><strong>Assumptions.</strong> Which still shape how we think today?</li>
    <li><strong>One derivation</strong>, done by hand.</li>
    <li><strong>One experiment</strong> that can be reproduced.</li>
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

<figure class="path-map" id="path-map" aria-label="Map of the path with the walked route">
  <div class="path-map-scroll"><svg id="path-svg" role="img"></svg></div>
  <figcaption>
    <span id="path-stats"></span>
    <label class="reading-toggle path-edges-toggle"><input type="checkbox" id="path-edges-all"> show all connections</label>
  </figcaption>
</figure>

<figure class="path-stack" aria-label="The stack: layers against compute, store, move and search">
  <div class="path-stack-head">
    <span class="path-stack-title">the stack</span>
    <div class="path-stack-picks" role="group" aria-label="Which stack">
      <button type="button" class="reading-chip active" data-stack="all">all stacks</button>
      <button type="button" class="reading-chip" data-stack="classical">classical</button>
      <button type="button" class="reading-chip" data-stack="brain">brain</button>
      <button type="button" class="reading-chip" data-stack="quantum">quantum</button>
    </div>
  </div>
  <div class="path-stack-grid" id="path-stack-grid"></div>
  <figcaption>Each cell is a layer of the stack against one of the four questions: walked / total, with one dot per step. Click a cell to list its steps. Math and history sit beside the stack, so they aren't counted here.</figcaption>
</figure>

<div class="reading-controls" id="reading-controls">
  <div class="reading-tracks" role="group" aria-label="Filter by track">
    <button type="button" class="reading-chip active" data-track="all">all</button>
    <button type="button" class="reading-chip" data-track="foundations">foundations</button>
    <button type="button" class="reading-chip" data-track="theory">computation & search</button>
    <button type="button" class="reading-chip" data-track="stack">hardware & systems</button>
    <button type="button" class="reading-chip" data-track="science">computing physics</button>
    <button type="button" class="reading-chip" data-track="learning">learning</button>
    <button type="button" class="reading-chip" data-track="graphs">graphs</button>
    <button type="button" class="reading-chip" data-track="vision">vision & world models</button>
    <button type="button" class="reading-chip" data-track="control">control & RL</button>
    <button type="button" class="reading-chip" data-track="brain">brain & neuromorphic</button>
    <button type="button" class="reading-chip" data-track="quantum">quantum</button>
    <button type="button" class="reading-chip" data-track="crossroads">crossroads</button>
  </div>
  <label class="reading-toggle"><input type="checkbox" id="reading-core-only"> core only</label>
  <label class="reading-toggle"><input type="checkbox" id="reading-todo-only"> not walked yet</label>
  <button type="button" class="reading-chip reading-cell-filter active" id="reading-cell-filter" hidden></button>
</div>

{% for s in stages %}
{% assign si = forloop.index0 %}

<section class="reading-stage" id="{{ s.id }}" data-track="{{ s.track }}">
  <header>
    <span class="reading-stage-num">{{ si | prepend: '0' | slice: -2, 2 }}</span>
    <h2>{{ s.title }}</h2>
    <span class="reading-era">{{ s.era }}</span>
  </header>
  <p class="reading-blurb">{{ s.blurb }}</p>
  {% if s.checklist %}
  <div class="reading-checklist">
    <span class="reading-checklist-title">{{ s.checklist_title | default: "Check" }}</span>
    <ul>{% for c in s.checklist %}<li>{{ c }}</li>{% endfor %}</ul>
  </div>
  {% endif %}
  <ul class="reading-items">
    {% for it in s.items %}
    {% assign st = it.stack | default: s.stack %}
    <li class="reading-item{% if it.core %} is-core{% endif %}{% if it.read %} is-read{% endif %}" id="p-{{ si }}-{{ forloop.index0 }}" data-layer="{{ it.layer }}" data-does="{{ it.does | join: ' ' }}" data-stack="{{ st }}">
      <span class="reading-dot" aria-hidden="true"></span>
      <div>
        <a href="{{ it.url }}" target="_blank" rel="noopener" class="reading-title">{{ it.title }}</a>
        <div class="reading-meta">
          <span>{{ it.year }}</span> · <span>{{ it.by }}</span>{% if it.core %} · <span class="reading-core-mark">core</span>{% endif %}{% if it.read %} · <span class="reading-walked">walked {{ it.read | date: "%b %-d, %Y" }}</span>{% endif %}
        </div>
      </div>
    </li>
    {% endfor %}
  </ul>
</section>
{% endfor %}

<script id="path-data" type="application/json">{{ stages | jsonify }}</script>
<script>
  (function () {
    var stages = JSON.parse(document.getElementById("path-data").textContent);
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.getElementById("path-svg");
    var demo = /[?&]demo\b/.test(location.search);
    var LAYERS = ["intelligence", "learning", "algorithms", "systems", "architecture", "devices", "physics"];
    var DOES = ["compute", "store", "move", "search"];

    // Layout: one column per stage, long stages wrap into sub-columns
    var X0 = 40, TOP = 62, ROW = 13, ROWMAX = 22, SUB = 15, GAP = 36;
    var sx = [], x = X0;
    stages.forEach(function (s) {
      var sub = Math.max(1, Math.ceil(s.items.length / ROWMAX)), w = (sub - 1) * SUB;
      sx.push({ left: x, center: x + w / 2 });
      x += w + GAP;
    });
    var W = x - GAP + X0;
    var maxRows = Math.min(ROWMAX, Math.max.apply(null, stages.map(function (s) { return s.items.length; })));
    var H = TOP + ROW * (maxRows - 1) + 30;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.style.minWidth = "760px";

    function el(name, attrs, parent) {
      var n = document.createElementNS(NS, name);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      (parent || svg).appendChild(n);
      return n;
    }

    // Flatten items with positions, tags and read dates
    var nodes = [];
    stages.forEach(function (s, si) {
      s.items.forEach(function (it, ii) {
        nodes.push({
          si: si, ii: ii, track: s.track, stack: it.stack || s.stack, layer: it.layer || null, does: it.does || [],
          title: it.title, core: !!it.core,
          read: it.read ? String(it.read).slice(0, 10) : null, route: it.route || null,
          buildsOn: it.builds_on || [], inEdges: [], outEdges: [],
          x: sx[si].left + Math.floor(ii / ROWMAX) * SUB, y: TOP + (ii % ROWMAX) * ROW
        });
      });
    });

    // ?demo fakes a plausible walk so the map can be previewed before any real progress
    if (demo) {
      var seed = 7;
      function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
      nodes.forEach(function (n) {
        var p = n.si <= 4 ? 0.4 : n.si <= 9 ? 0.22 : 0.1;
        if (rnd() < p * (n.core ? 1.6 : 1)) n.order = n.si + rnd() * 3;
      });
      var d0 = new Date("2026-11-18");
      nodes.filter(function (n) { return n.order !== undefined; })
        .sort(function (a, b) { return a.order - b.order; })
        .forEach(function (n, i) {
          n.read = new Date(d0.getTime() + 86400000 * 2 * (i + 1)).toISOString().slice(0, 10);
        });
    }

    // Planned route along the stage headers
    el("path", {
      d: sx.map(function (p, i) { return (i ? "L" : "M") + p.center + " 26"; }).join(" "),
      class: "path-planned"
    });
    stages.forEach(function (s, i) {
      var g = el("g", { class: "path-stage", "data-track": s.track });
      var a = el("a", { href: "#" + s.id }, g);
      el("circle", { cx: sx[i].center, cy: 26, r: 11 }, a);
      var t = el("text", { x: sx[i].center, y: 30 }, a);
      t.textContent = ("0" + i).slice(-2);
      var tt = el("title", {}, a); tt.textContent = s.title;
    });

    // Connections: an edge from each earlier item to the item that builds on it
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

    function curve(pts) {
      var d = "M" + pts[0].x + " " + pts[0].y;
      for (var i = 1; i < pts.length; i++) {
        var p = pts[i - 1], q = pts[i], mx = (p.x + q.x) / 2;
        d += p.x === q.x
          ? " Q" + (p.x + 12) + " " + (p.y + q.y) / 2 + " " + q.x + " " + q.y
          : " C" + mx + " " + p.y + " " + mx + " " + q.y + " " + q.x + " " + q.y;
      }
      return d;
    }

    // The suggested route across tracks
    var suggested = nodes.filter(function (n) { return n.route; }).sort(function (a, b) { return a.route - b.route; });
    if (suggested.length > 1) el("path", { d: curve(suggested), class: "path-suggested" });

    // The walked route: read items in date order, smoothed
    var walk = nodes.filter(function (n) { return n.read; })
      .sort(function (a, b) { return a.read < b.read ? -1 : a.read > b.read ? 1 : (a.si - b.si) || (a.ii - b.ii); });
    if (walk.length > 1) {
      var route = el("path", { d: curve(walk), class: "path-walked" });
      var len = route.getTotalLength();
      route.style.strokeDasharray = len;
      route.style.strokeDashoffset = len;
      requestAnimationFrame(function () { route.classList.add("is-drawn"); route.style.strokeDashoffset = 0; });
    }

    // Item dots
    nodes.forEach(function (n) {
      var a = el("a", { href: "#p-" + n.si + "-" + n.ii, class: "path-node" + (n.read ? " is-read" : "") + (n.core ? " is-core" : "") });
      el("circle", { cx: n.x, cy: n.y, r: n.core ? 4.2 : 2.8 }, a);
      var t = el("title", {}, a);
      t.textContent = n.title + (n.layer ? " · " + n.layer : "") + (n.read ? " (walked " + n.read + ")" : "") +
        (n.inEdges.length ? "\nbuilds on " + n.inEdges.length : "") + (n.outEdges.length ? " · built on by " + n.outEdges.length : "");
      n.els = [a];
      n.dot = a;
      // Hover lights up what this builds on (solid) and what builds on it (dashed)
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
    var here = walk[walk.length - 1] || nodes[0];
    el("circle", { cx: here.x, cy: here.y, r: 8, class: "path-here" });
    var label = el("text", { x: here.x + 11, y: here.y - 6, class: "path-here-label" });
    label.textContent = walk.length ? "you are here" : "start";

    // Stats
    var total = nodes.length, core = nodes.filter(function (n) { return n.core; }).length;
    var coreDone = walk.filter(function (n) { return n.core; }).length;
    var stats = document.getElementById("path-stats");
    if (walk.length) {
      stats.textContent = walk.length + " / " + total + " walked · " + coreDone + " / " + core + " core · since " +
        walk[0].read + " · last step " + walk[walk.length - 1].read + (demo ? " · demo walk" : "");
    } else {
      stats.textContent = "0 / " + total + " walked · " + core + " core · " + edgeCount +
        " connections (hover a dot). Add read: YYYY-MM-DD to an item in _data/reading_list.yml to take the first step.";
    }
    if (walk.length) stats.textContent += " · " + edgeCount + " connections (hover a dot)";

    // ---------------------------------------------------------------- the stack grid
    var state = { track: "all", stack: "all", cell: null };
    var grid = document.getElementById("path-stack-grid");

    function renderGrid() {
      grid.innerHTML = "";
      var head = ["", "compute", "store", "move", "search"];
      head.forEach(function (h) {
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
          var inCell = nodes.filter(function (n) {
            return n.layer === layer && n.does.indexOf(does) >= 0 && (state.stack === "all" || n.stack === state.stack);
          });
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
              if (!same) document.getElementById("reading-controls").scrollIntoView({ behavior: "smooth" });
            });
          }
          grid.appendChild(b);
        });
      });
    }

    // ---------------------------------------------------------------- filters
    var coreOnly = document.getElementById("reading-core-only");
    var todoOnly = document.getElementById("reading-todo-only");
    var cellChip = document.getElementById("reading-cell-filter");

    function matches(track, stack, layer, does) {
      return (state.track === "all" || track === state.track) &&
        (state.stack === "all" || stack === state.stack) &&
        (!state.cell || (layer === state.cell.layer && does.indexOf(state.cell.does) >= 0));
    }

    function update() {
      document.querySelectorAll(".reading-stage").forEach(function (stage) {
        var any = false;
        stage.querySelectorAll(".reading-item").forEach(function (li) {
          var does = li.dataset.does ? li.dataset.does.split(" ") : [];
          var show = matches(stage.dataset.track, li.dataset.stack, li.dataset.layer, does) &&
            (!coreOnly.checked || li.classList.contains("is-core")) &&
            (!todoOnly.checked || !li.classList.contains("is-read"));
          li.hidden = !show; if (show) any = true;
        });
        stage.hidden = !any;
      });
      nodes.forEach(function (n) {
        var on = matches(n.track, n.stack, n.layer, n.does);
        n.els.forEach(function (e) { e.classList.toggle("is-dim", !on); });
      });
      svg.querySelectorAll(".path-stage").forEach(function (g) {
        g.classList.toggle("is-dim", state.track !== "all" && g.dataset.track !== state.track);
      });
      cellChip.hidden = !state.cell;
      if (state.cell) cellChip.textContent = state.cell.layer + " × " + state.cell.does + "  ✕";
    }

    document.querySelectorAll(".reading-tracks .reading-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".reading-tracks .reading-chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active"); state.track = chip.dataset.track; update();
      });
    });
    document.querySelectorAll(".path-stack-picks .reading-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".path-stack-picks .reading-chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active"); state.stack = chip.dataset.stack; renderGrid(); update();
      });
    });
    cellChip.addEventListener("click", function () { state.cell = null; renderGrid(); update(); });
    coreOnly.addEventListener("change", update);
    todoOnly.addEventListener("change", update);
    renderGrid();
    update();
  })();
</script>
