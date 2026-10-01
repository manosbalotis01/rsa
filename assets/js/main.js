/* =====================================================================
   RSA — interaction layer
   Progressive enhancement: everything degrades gracefully without JS.
   ===================================================================== */

/* Icon set used by JS-rendered markup (defined before the IIFE runs) */
var ICONS = {
  robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.3"/><circle cx="15" cy="14" r="1.3"/><path d="M2 13v3M22 13v3"/></svg>',
};

(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow + reading progress on scroll ---------- */
  const header = $(".site-header");
  if (header) {
    let ticking = false;
    const onScroll = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle("is-scrolled", y > 8);
      header.style.setProperty("--progress", max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    };
    onScroll();
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  }

  /* ---------- Desktop mega menu (click + hover + keyboard) ---------- */
  $$("li.has-mega").forEach((item) => {
    const btn = $(".has-mega > .nav__link", item) || item.firstElementChild;
    if (!btn) return;
    const close = () => item.setAttribute("aria-expanded", "false");
    const open  = () => item.setAttribute("aria-expanded", "true");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      item.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    item.addEventListener("mouseleave", close);
    document.addEventListener("click", (e) => { if (!item.contains(e.target)) close(); });
    item.addEventListener("keyup", (e) => { if (e.key === "Escape") { close(); btn.focus(); } });
  });

  /* ---------- Mobile navigation drawer ---------- */
  const mobileNav = $(".mobile-nav");
  const openBtn   = $(".nav-toggle");
  const closeBtn  = $(".mobile-nav__close");
  let lastFocus = null;
  function openNav() {
    if (!mobileNav) return;
    lastFocus = document.activeElement;
    mobileNav.hidden = false;
    requestAnimationFrame(() => mobileNav.classList.add("is-open"));
    openBtn && openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    const first = $(".mobile-nav__panel a, .mobile-nav__panel button", mobileNav);
    first && first.focus();
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    openBtn && openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(() => { mobileNav.hidden = true; }, 260);
    lastFocus && lastFocus.focus();
  }
  openBtn  && openBtn.addEventListener("click", openNav);
  closeBtn && closeBtn.addEventListener("click", closeNav);
  mobileNav && $(".mobile-nav__scrim", mobileNav).addEventListener("click", closeNav);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("is-open")) closeNav();
  });
  // mirror the current page onto the drawer links
  const here = location.pathname.split("/").pop() || "index.html";
  $$(".mobile-nav a.m-nav-link").forEach((a) => {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });
  // collapsible groups inside mobile nav
  $$(".m-nav-group").forEach((group) => {
    const trigger = $(".m-nav-link", group);
    const sub = $(".m-nav-sub", group);
    if (!trigger || !sub) return;
    trigger.addEventListener("click", () => {
      const expanded = group.getAttribute("aria-expanded") === "true";
      group.setAttribute("aria-expanded", String(!expanded));
      sub.classList.toggle("is-open", !expanded);
    });
  });

  /* ---------- Program finder ---------- */
  const finder = $("#programFinder");
  if (finder) {
    // Real RSA program recommendations — no fabricated schedules/levels.
    const REC = {
      "5-6":   { cat: "Robotics & STEAM", name: "Junior Robotics", audience: "5–6 years · Προνήπιο–Νήπιο",
        levelsLabel: "Available levels", levels: ["Junior A", "Junior B"],
        note: "Junior Robotics has two levels, one designed per school year." },
      "6-8":   { cat: "Robotics & STEAM", name: "Kids Robotics", audience: "6–8 years · Α΄–Β΄ Δημοτικού",
        levelsLabel: "Possible level", levels: ["1st Kids Robotics", "2nd Kids Robotics"],
        note: "Final level placement may depend on age and existing knowledge." },
      "8-10":  { cat: "Robotics & STEAM", name: "Kids Robotics", audience: "8–10 years · Γ΄–Ε΄ Δημοτικού",
        levelsLabel: "Possible levels", levels: ["3rd Kids Robotics", "4th Kids Robotics"],
        note: "Final level placement may depend on age and existing knowledge." },
      "10-13": { cat: "Robotics & STEAM", name: "Teens Robotics", audience: "10–13 years · Robotics & STEAM for Teens",
        levels: [], specialized: true,
        note: "Older students can also explore our specialized programs." },
      "14-18": { cat: "Robotics & STEAM", name: "Teens Robotics", audience: "14–18 years · Γυμνάσιο · Λύκειο",
        levels: [], specialized: true,
        note: "Not every student automatically qualifies for every specialized program." },
    };
    const SPECIALIZED = ["AI Academy", "Drone Academy", "Robotics & Python", "Arduino & C++"];
    const infoIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
    const result = $("#finderResult");
    const ageBtns = $$(".age-btn", finder);
    const select = (btn, userInitiated) => {
      ageBtns.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const p = REC[btn.dataset.age];
      if (!p) return;
      const levelsBlock = p.levels && p.levels.length
        ? `<div style="margin-top:14px"><span class="wizard__count">${p.levelsLabel}</span>
             <div class="program-card__levels" style="margin-top:8px">${p.levels.map((l) => `<span class="tag tag--age">${l}</span>`).join("")}</div></div>`
        : "";
      const specBlock = p.specialized
        ? `<div class="finder-extra"><p>Explore specialized programs</p>
             <div class="program-card__levels">${SPECIALIZED.map((s) => `<span class="tag tag--spec">${s}</span>`).join("")}</div></div>`
        : "";
      result.innerHTML = `
        <div class="finder-card" role="group" aria-label="Recommended program">
          <div class="media media--ink" aria-hidden="true"><div class="media__icon">${ICONS.robot}</div></div>
          <div class="finder-card__body">
            <span class="program-card__cat">${p.cat}</span>
            <h3 style="margin-top:6px">Recommended: ${p.name}</h3>
            <p>${p.audience}</p>
            ${levelsBlock}
            <p class="finder__note">${infoIcon} ${p.note}</p>
            ${specBlock}
            <div class="finder-card__cta">
              <a class="btn btn--primary" href="free-trial.html">Book a free trial</a>
              <a class="btn btn--secondary" href="program.html">View program</a>
            </div>
          </div>
        </div>`;
      if (userInitiated) {
        if (!prefersReduced) result.scrollIntoView({ behavior: "smooth", block: "nearest" });
        result.focus();
      }
    };
    ageBtns.forEach((btn) => btn.addEventListener("click", () => select(btn, true)));
    // Default pre-selected recommendation (5–6 → Junior Robotics); no scroll/focus on load.
    const defaultBtn = ageBtns.find((b) => b.dataset.age === "5-6") || ageBtns[0];
    if (defaultBtn) select(defaultBtn, false);
  }

  /* ---------- Hero slideshow (card deck: front card flies out and goes to the back) ---------- */
  $$("[data-hero-slider]").forEach((root) => {
    const slides = $$(".hero-slide", root);
    if (slides.length < 2) return;
    const DELAY = 5500;                            // time each photo stays in front
    const OUT = prefersReduced ? 0 : 450;          // matches .is-leaving transition
    let order = slides.map((_, i) => i);           // order[0] is the front card
    let busy = false, timer = null, hovering = false;
    const paint = () => {
      order.forEach((idx, depth) => {
        const s = slides[idx];
        s.style.setProperty("--d", depth);
        s.style.zIndex = String(slides.length - depth);
        s.classList.toggle("is-active", depth === 0);
        s.setAttribute("aria-hidden", String(depth !== 0));
      });
    };
    // forward: flick the front card out, then tuck it in at the back
    const forward = () => {
      const idx = order[0];
      slides[idx].classList.add("is-leaving");
      setTimeout(() => {
        order = order.slice(1).concat(idx);
        slides[idx].style.zIndex = "0";            // drop behind before it glides back
        slides[idx].classList.remove("is-leaving");
        paint();
        busy = false;
      }, OUT);
    };
    // backward: pull the last card out from the back and lay it on top
    const backward = () => {
      const idx = order[order.length - 1];
      const s = slides[idx];
      s.classList.add("no-anim", "is-leaving");
      s.style.zIndex = String(slides.length + 1);
      void s.offsetWidth;
      s.classList.remove("no-anim", "is-leaving");
      order = [idx].concat(order.slice(0, -1));
      paint();
      setTimeout(() => { busy = false; }, OUT);
    };
    const step = (dir) => {
      if (busy) return;
      busy = true;
      dir < 0 ? backward() : forward();
      schedule();
    };
    // autoplay (off under reduced motion, paused on hover and in background tabs)
    const schedule = () => {
      clearTimeout(timer);
      if (prefersReduced || hovering || document.hidden) return;
      timer = setTimeout(() => step(1), DELAY);
    };
    const visual = root.closest(".hero__visual") || root;
    visual.addEventListener("mouseenter", () => { hovering = true; clearTimeout(timer); });
    visual.addEventListener("mouseleave", () => { hovering = false; schedule(); });
    document.addEventListener("visibilitychange", schedule);
    // swipe on touch screens
    let sx = null;
    root.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    root.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    });
    paint();
    schedule();
  });

  /* ---------- Testimonials carousel ---------- */
  $$("[data-carousel]").forEach((root) => {
    const track = $(".carousel__track", root);
    const slides = $$(".testimonial-card", track);
    const prev = $("[data-prev]", root);
    const next = $("[data-next]", root);
    const dotsWrap = $(".carousel__dots", root);
    let perView = 3, index = 0;

    const computePerView = () => {
      const w = window.innerWidth;
      perView = w <= 720 ? 1 : w <= 1024 ? 2 : 3;
    };
    const maxIndex = () => Math.max(0, slides.length - perView);
    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= maxIndex(); i++) {
        const d = document.createElement("button");
        d.className = "carousel__dot";
        d.setAttribute("aria-label", `Go to testimonial group ${i + 1}`);
        d.addEventListener("click", () => go(i));
        dotsWrap.appendChild(d);
      }
    };
    const update = () => {
      const slideW = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      track.style.transform = `translateX(-${index * (slideW + gap)}px)`;
      $$(".carousel__dot", dotsWrap).forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
      prev && (prev.disabled = index === 0);
      next && (next.disabled = index >= maxIndex());
    };
    const go = (i) => { index = Math.max(0, Math.min(i, maxIndex())); update(); };
    prev && prev.addEventListener("click", () => go(index - 1));
    next && next.addEventListener("click", () => go(index + 1));
    // swipe (touch / pen / mouse drag)
    let startX = null;
    track.addEventListener("pointerdown", (e) => { startX = e.clientX; });
    window.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    });
    // arrow keys when focus is inside the carousel
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { go(index + 1); }
      if (e.key === "ArrowLeft")  { go(index - 1); }
    });
    window.addEventListener("resize", () => { computePerView(); if (index > maxIndex()) index = maxIndex(); buildDots(); update(); });
    computePerView(); buildDots(); update();
  });

  /* ---------- Accordion (FAQ) ---------- */
  $$(".accordion").forEach((acc) => {
    $$(".accordion__btn", acc).forEach((btn) => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        if (panel) panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
      });
    });
  });

  /* ---------- Sticky program subnav (scroll spy + smooth) ---------- */
  const subnav = $(".subnav");
  if (subnav) {
    const links = $$(".subnav__link", subnav);
    const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
    const spy = () => {
      const y = window.scrollY + 140;
      let current = sections[0];
      sections.forEach((s) => { if (s.offsetTop <= y) current = s; });
      links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + (current && current.id)));
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- Free Trial wizard ---------- */
  const wizard = $("#trialWizard");
  if (wizard) {
    const steps = $$(".wizard__step", wizard);
    const bar = $(".wizard__bar span", wizard);
    const stepItems = $$(".wizard__steps li", wizard);
    const total = steps.length - 1; // last is confirmation
    let current = 0;
    const REC = {
      "5-6": "Junior Robotics", "6-8": "Kids Robotics (1st–2nd)", "8-10": "Kids Robotics (3rd–4th)",
      "10-13": "Teens Robotics", "14-18": "Teens Robotics",
    };
    const show = (i) => {
      steps.forEach((s, idx) => (s.hidden = idx !== i));
      current = i;
      const pct = Math.min(100, (i / total) * 100);
      if (bar) bar.style.width = pct + "%";
      stepItems.forEach((li, idx) => {
        li.classList.toggle("is-active", idx === i);
        li.classList.toggle("is-done", idx < i);
      });
      const active = steps[i];
      const heading = $("h2, h3", active);
      heading && heading.focus && heading.setAttribute("tabindex", "-1"), heading && heading.focus();
      if (!prefersReduced) wizard.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    wizard.addEventListener("click", (e) => {
      const nextBtn = e.target.closest("[data-next-step]");
      const backBtn = e.target.closest("[data-prev-step]");
      if (nextBtn) {
        // simple required validation on current step
        const invalid = $$("[required]", steps[current]).filter((f) => !f.value);
        if (invalid.length) { invalid[0].focus(); invalid[0].closest(".field")?.classList.add("has-error"); return; }
        show(Math.min(current + 1, steps.length - 1));
      }
      if (backBtn) show(Math.max(current - 1, 0));
    });
    // age selection drives recommended program
    $$("[data-age-choice] input", wizard).forEach((radio) => {
      radio.addEventListener("change", () => {
        $$("[data-age-choice]", wizard).forEach((c) => c.classList.toggle("is-selected", c.contains(radio) && radio.checked));
        const recEl = $("#recProgram", wizard);
        if (recEl) recEl.textContent = REC[radio.value] || "Kids Robotics";
      });
    });
    $$(".field input, .field select", wizard).forEach((f) =>
      f.addEventListener("input", () => f.closest(".field")?.classList.remove("has-error")));
    // Time slots depend on the selected day (weekday vs Saturday)
    const dayEl = $("#t-day", wizard), timeEl = $("#t-time", wizard);
    const SLOTS = { weekday: ["17:30–19:00", "19:15–20:45"], sat: ["09:30–11:00", "11:15–12:45"] };
    if (dayEl && timeEl) {
      dayEl.addEventListener("change", () => {
        const slots = SLOTS[dayEl.value];
        timeEl.innerHTML = slots
          ? `<option value="">Επιλέξτε ώρα…</option>` + slots.map((s) => `<option value="${s}">${s}</option>`).join("")
          : `<option value="">Διαλέξτε πρώτα μέρα…</option>`;
      });
    }
    show(0);
  }

  /* ---------- Achievements: reveal more ---------- */
  const revealBtn = $("[data-reveal-achievements]");
  if (revealBtn) {
    revealBtn.addEventListener("click", () => {
      $$("[data-extra-achievement]").forEach((el, i) => {
        el.hidden = false;
        el.classList.add("is-in", "is-new");
        el.style.animationDelay = i * 80 + "ms";
      });
      revealBtn.parentElement.hidden = true;
    });
  }

  /* ---------- Scroll reveal (siblings cascade in) ---------- */
  $$(".reveal").forEach((el) => {
    const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    const i = sibs.indexOf(el);
    if (i > 0) {
      el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
      // drop the delay once revealed so hover transitions stay snappy
      el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
    }
  });
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Stat count-up ---------- */
  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const suf = suffix ? `<span class="u">${suffix}</span>` : "";
    const fmt = (n) => n.toLocaleString("en-US");
    const dur = 1400, start = performance.now();
    el.classList.remove("is-live"); void el.offsetWidth; el.classList.add("is-live"); // (re)trigger pop
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4); // strong ease-out for a punchy finish
      el.innerHTML = fmt(Math.round(target * eased)) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counters = $$(".stat__num[data-count]");
  if (counters.length) {
    if (!prefersReduced && "IntersectionObserver" in window) {
      let order = 0;
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          const el = e.target;
          setTimeout(() => runCount(el), (order++) * 150); // staggered cascade
        });
      }, { threshold: 0.4 });
      counters.forEach((el) => cio.observe(el));
    }
    // reduced-motion: leave the static value already in the markup
  }

  /* ---------- Back to top ---------- */
  const toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.type = "button";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });
  const toggleTop = () => toTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.9);
  toggleTop();
  window.addEventListener("scroll", toggleTop, { passive: true });

  /* ---------- Mobile CTA bar: step aside while page CTAs / footer are on screen ---------- */
  const ctaBar = $(".mobile-cta-bar");
  if (ctaBar && "IntersectionObserver" in window) {
    const watched = $$(".hero__cta, .cta-banner, .site-footer");
    const visible = new Set();
    const bio = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      ctaBar.classList.toggle("is-hidden", visible.size > 0);
    });
    watched.forEach((el) => bio.observe(el));
  }

})();
