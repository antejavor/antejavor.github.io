// Animated graph behind the page: drifting nodes, edges between close neighbours,
// and signals that travel along edges. Colours follow the light/dark theme.
(function () {
  const canvas = document.getElementById("graph-bg");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LINK_DISTANCE = 150;
  const MAX_SIGNALS = 6;

  let width = 0;
  let height = 0;
  let nodes = [];
  let signals = [];
  let colors = {};
  let pointer = null;
  let frame = null;

  const readColors = () => {
    const style = getComputedStyle(document.documentElement);
    colors = {
      accent: style.getPropertyValue("--global-theme-color").trim() || "#e8590c",
      muted: style.getPropertyValue("--global-text-color-light").trim() || "#888",
    };
  };

  const withAlpha = (color, alpha) => {
    ctx.globalAlpha = alpha;
    return color;
  };

  const createNodes = () => {
    const count = Math.min(90, Math.max(24, Math.round((width * height) / 18000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1.5 + Math.random() * 2,
      hub: Math.random() < 0.12,
      glow: 0,
    }));
    signals = [];
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNodes();
  };

  const neighbours = (a) => nodes.filter((b) => b !== a && Math.hypot(a.x - b.x, a.y - b.y) < LINK_DISTANCE);

  const spawnSignal = () => {
    if (signals.length >= MAX_SIGNALS) return;
    const from = nodes[Math.floor(Math.random() * nodes.length)];
    const options = neighbours(from);
    if (!options.length) return;
    const to = options[Math.floor(Math.random() * options.length)];
    signals.push({ from, to, t: 0, hops: 2 + Math.floor(Math.random() * 4) });
  };

  const step = () => {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = width + 20;
      if (n.x > width + 20) n.x = -20;
      if (n.y < -20) n.y = height + 20;
      if (n.y > height + 20) n.y = -20;

      // Nodes lean gently towards the pointer
      if (pointer) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 200 && d > 1) {
          n.x += (dx / d) * 0.15;
          n.y += (dy / d) * 0.15;
        }
      }
      n.glow *= 0.96;
    }

    if (Math.random() < 0.03) spawnSignal();

    signals = signals.filter((s) => {
      s.t += 0.018;
      if (s.t < 1) return true;
      s.to.glow = 1;
      if (--s.hops <= 0) return false;
      // Hop on to a neighbour of the node it just reached
      const options = neighbours(s.to).filter((n) => n !== s.from);
      if (!options.length) return false;
      s.from = s.to;
      s.to = options[Math.floor(Math.random() * options.length)];
      s.t = 0;
      return true;
    });
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > LINK_DISTANCE) continue;
        ctx.strokeStyle = withAlpha(colors.muted, (1 - d / LINK_DISTANCE) * 0.35);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      if (pointer) {
        const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (d < 180) {
          ctx.strokeStyle = withAlpha(colors.accent, (1 - d / 180) * 0.5);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    for (const s of signals) {
      const x = s.from.x + (s.to.x - s.from.x) * s.t;
      const y = s.from.y + (s.to.y - s.from.y) * s.t;
      ctx.strokeStyle = withAlpha(colors.accent, 0.6);
      ctx.beginPath();
      ctx.moveTo(s.from.x, s.from.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = withAlpha(colors.accent, 0.9);
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const n of nodes) {
      const accent = n.hub || n.glow > 0.05;
      ctx.fillStyle = withAlpha(accent ? colors.accent : colors.muted, accent ? 0.55 + n.glow * 0.45 : 0.5);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + (n.hub ? 1 : 0) + n.glow * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const loop = () => {
    step();
    draw();
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (reduceMotion) {
      draw();
      return;
    }
    if (!frame) frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = null;
  };

  readColors();
  resize();
  start();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) draw();
    }, 150);
  });

  window.addEventListener("pointermove", (e) => {
    pointer = { x: e.clientX, y: e.clientY };
  });
  document.addEventListener("pointerleave", () => {
    pointer = null;
  });

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  // Re-read colours when the theme toggles
  new MutationObserver(() => {
    readColors();
    if (reduceMotion) draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
