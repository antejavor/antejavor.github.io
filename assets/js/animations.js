// Scroll-reveal animations for lists, cards and post content.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const groups = [
    ".post-list > li",
    ".card.hoverable",
    ".home-posts > li",
    ".writing-list > li",
    ".news table tr",
    "article .clearfix > h2",
    ".post-content > h2",
    ".post-content > h3",
    ".post-content > figure",
    ".post-content > blockquote",
    ".post-content > .highlighter-rouge",
    ".post-content > table",
  ];

  const init = () => {
    // Skip anything in the first screen so content above the fold never flickers
    const viewportBottom = window.innerHeight;
    const targets = [];

    groups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        if (el.getBoundingClientRect().top < viewportBottom) return;
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--reveal-delay", `${Math.min(i % 4, 3) * 0.06}s`);
        targets.push(el);
      });
    });

    if (!targets.length) return;
    document.documentElement.classList.add("anim-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("revealed");
          observer.unobserve(el);
          // Drop the transform once done so medium-zoom and masonry position correctly
          el.addEventListener(
            "transitionend",
            () => {
              el.removeAttribute("data-reveal");
              el.style.removeProperty("--reveal-delay");
            },
            { once: true }
          );
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
  };

  const toggle = document.getElementById("light-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      toggle.classList.add("spin");
      setTimeout(() => toggle.classList.remove("spin"), 500);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
