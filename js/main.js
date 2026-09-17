(() => {
  "use strict";

  /* ---------- Tema: dark por defecto, light opcional ---------- */
  const THEME_KEY = "fluent-theme";
  const rootEl = document.documentElement;

  const applyTheme = (theme) => {
    rootEl.setAttribute("data-theme", theme);
    rootEl.setAttribute("data-bs-theme", theme === "light" ? "light" : "dark");
    document.querySelectorAll(".theme-toggle i").forEach((icon) => {
      icon.className = theme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
    });
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) { /* modo de privacidad u otros */ }
  };

  const currentTheme = (() => {
    try {
      return localStorage.getItem(THEME_KEY) || "dark";
    } catch (e) {
      return "dark";
    }
  })();

  applyTheme(currentTheme);

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = rootEl.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  });

  /* ---------- Navbar: cambio de fondo al hacer scroll ---------- */
  const nav = document.getElementById("mainNav") || document.querySelector(".main-nav");
  const onScrollNav = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Botón Back to top ---------- */
  const backToTop = document.getElementById("backToTop");
  const onScrollTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };
  window.addEventListener("scroll", onScrollTop, { passive: true });
  onScrollTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Navegación con smooth scroll y cierre del menú móvil ---------- */
  document.querySelectorAll('.navbar-nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.getElementById("navMenu");
      if (collapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale"
  );
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("show"));
  }

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("en-US") + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Filtrado dual: nivel + categoría ---------- */
  const levelBtns = document.querySelectorAll("[data-filter-level]");
  const catBtns = document.querySelectorAll("[data-filter-cat]");
  const moduleCards = document.querySelectorAll(".module-item");
  let curLevel = "all";
  let curCat = "all";

  const applyDualFilter = () => {
    moduleCards.forEach((card) => {
      const levelOk = curLevel === "all" || card.dataset.level === curLevel;
      const catOk = curCat === "all" || (card.dataset.cat || "").split(/\s+/).includes(curCat);
      const match = levelOk && catOk;
      card.classList.toggle("hidden-filter", !match);
      if (match) {
        card.style.opacity = "0";
        requestAnimationFrame(() => {
          card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
          card.style.opacity = "1";
        });
      }
    });
  };

  levelBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      levelBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curLevel = btn.dataset.filterLevel;
      applyDualFilter();
    });
  });

  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curCat = btn.dataset.filterCat;
      applyDualFilter();
    });
  });

  /* ---------- Validación de formularios (contacto si existe) ---------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const formSuccess = document.getElementById("formSuccess");

    contactForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
          contactForm.classList.add("was-validated");
          return;
        }
        formSuccess.classList.remove("d-none");
        formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
        contactForm.reset();
        contactForm.classList.remove("was-validated");
        setTimeout(() => formSuccess.classList.add("d-none"), 6000);
      },
      { passive: false }
    );
  }

  /* ---------- Newsletter ---------- */
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input[type='email']");
      if (!input.value || !input.checkValidity()) {
        input.classList.add("is-invalid");
        return;
      }
      input.classList.remove("is-invalid");
      const btn = newsletterForm.querySelector("button");
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg"></i>';
      input.value = "";
      setTimeout(() => {
        btn.innerHTML = original;
      }, 2500);
    });
  }

  /* ---------- Audio: ejemplos y vocabulario (SpeechSynthesis) ---------- */
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  };

  const addSpeakBtn = (el) => {
    if (!el.parentElement || el.querySelector(".speak-mini")) return;
    const text = el.getAttribute("data-speak") || el.textContent.trim();
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "speak-mini";
    btn.setAttribute("aria-label", "Escuchar pronunciación");
    btn.innerHTML = '<i class="bi bi-volume-up"></i>';
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      speak(text);
    });
    el.appendChild(btn);
  };

  document.querySelectorAll(".example-box .en").forEach(addSpeakBtn);
  document.querySelectorAll(".vocab-word").forEach(addSpeakBtn);

  /* ---------- Pronunciación: palabra del día (SpeechSynthesis) ---------- */
  document.querySelectorAll(".speak-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      speak(btn.dataset.speak || btn.textContent.trim());
    });
  });

  /* ---------- Mini quiz (lecciones) ---------- */
  document.querySelectorAll(".quiz-card").forEach((card) => {
    const options = card.querySelectorAll(".quiz-option");
    const feedback = card.querySelector(".quiz-feedback");
    const correctText = card.querySelector(".quiz-option[data-correct='true']");

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        if (card.dataset.answered) return;
        card.dataset.answered = "true";

        const isCorrect = opt.dataset.correct === "true";

        options.forEach((o) => {
          o.disabled = true;
          if (o.dataset.correct === "true") {
            o.classList.add("correct");
          } else if (o !== opt) {
            o.classList.add("wrong");
          }
        });

        if (isCorrect) {
          opt.classList.add("correct");
          feedback.textContent = "¡Correcto! Excelente respuesta.";
          feedback.style.color = "var(--mint)";
        } else {
          opt.classList.add("wrong");
          feedback.textContent =
            "Casi. La respuesta correcta era: " +
            (correctText ? correctText.textContent.trim() : "") +
            ". Revisa la teoría y vuelve a intentarlo.";
          feedback.style.color = "#ffb4b3";
        }
        feedback.classList.remove("d-none");
      });
    });
  });

  /* ============================================================
     Progreso personal (localStorage) y test de nivel
     ============================================================ */
  const DONE_KEY = "fluent-done";
  const TEST_KEY = "fluent-test";
  const STREAK_KEY = "fluent-streak";

  const LEVELS = [
    { id: "a1", name: "A1 · Principiante", icon: "bi-emoji-smile" },
    { id: "a2", name: "A2 · Básico", icon: "bi-emoji-neutral" },
    { id: "b1", name: "B1 · Intermedio", icon: "bi-moon-stars" },
    { id: "b2", name: "B2 · Intermedio alto", icon: "bi-rocket-takeoff" },
    { id: "c1", name: "C1 · Avanzado", icon: "bi-stars" },
    { id: "c2", name: "C2 · Experto", icon: "bi-trophy" },
  ];

  const LESSON_FILES = {
    a1: ["saludos", "presentaciones", "presente-simple", "preguntas", "numeros", "1000-palabras", "fonetica", "articulos", "comparativos", "preposiciones", "familia"],
    a2: ["past-simple", "will-going-to", "compras", "sonidos", "pasado-continuo", "modales-basicos", "comida-restaurante", "viajes"],
    b1: ["recomendaciones", "present-perfect", "present-continuous", "phrasal-verbs", "verb-patterns", "relative-clauses", "used-to", "conectores", "escritura-email"],
    b2: ["entrevistas", "condicionales", "estilo-indirecto", "pasiva", "falsos-cognados", "past-perfect", "present-perfect-continuous", "question-tags", "opinion-debate", "lectura-practica"],
    c1: ["slang", "idioms", "mixed-conditionals", "inversion"],
    c2: ["matices", "oraciones-enfaticas"],
  };

  const storage = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* sin almacenamiento */ }
    },
  };

  const lessonKeyFromPath = (pathname) => {
    const m = (pathname || "").match(/\/modulos\/([^/]+)\/([^/]+)\.html/);
    return m ? m[1] + "/" + m[2] : null;
  };

  const toTitle = (slug) =>
    slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const doneList = () => storage.get(DONE_KEY, []);
  const saveDone = (list) => storage.set(DONE_KEY, [...new Set(list)]);
  const isDone = (key) => doneList().includes(key);

  const touchStreak = () => {
    const today = new Date().toISOString().slice(0, 10);
    const s = storage.get(STREAK_KEY, { last: null, count: 0, best: 0 });
    if (s.last === today) return s;
    const prev = s.last;
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    s.last = today;
    s.count = prev === yesterday ? s.count + 1 : 1;
    s.best = Math.max(s.best, s.count);
    storage.set(STREAK_KEY, s);
    return s;
  };

  const toggleDone = (key) => {
    const list = doneList();
    const idx = list.indexOf(key);
    if (idx === -1) { list.push(key); touchStreak(); }
    else list.splice(idx, 1);
    saveDone(list);
    return idx === -1;
  };

  const totalLessons = Object.values(LESSON_FILES).reduce((acc, files) => acc + files.length, 0);

  /* ---- Pintar chips completados y el tag de progreso (hubs) ---- */
  const paintDone = () => {
    const chips = document.querySelectorAll(".lesson-chip");
    if (!chips.length) return;
    const done = doneList();

    chips.forEach((chip) => {
      const key = lessonKeyFromPath(chip.getAttribute("href"));
      if (!key) return;
      const num = chip.querySelector(".num");
      if (num) num.classList.toggle("done", done.includes(key));
    });

    const tag = document.querySelector(".progress-tag");
    if (tag) {
      const total = chips.length;
      const doneCount = [...chips].filter((c) => {
        const k = lessonKeyFromPath(c.getAttribute("href"));
        return k && done.includes(k);
      }).length;
      if (!tag.dataset.original) tag.dataset.original = tag.textContent;
      tag.textContent = `${doneCount}/${total} lecciones · ${total * 6} ejercicios`;
    }
  };
  paintDone();

  /* ---- Botón "Marcar como completada" en cada lección ---- */
  const currentKey = lessonKeyFromPath(location.pathname);
  const lessonNav = document.querySelector(".lesson-nav");
  if (currentKey && lessonNav) {
    const completeBox = document.createElement("div");
    completeBox.className = "lesson-complete glass-card p-4 text-center";

    const renderCompleteBtn = (done) => {
      const icon = done ? "bi-arrow-counterclockwise" : "bi-check2-circle";
      const label = done ? "Desmarcar" : "Marcar como completada";
      const cls = done ? "btn-outline-grad" : "btn-grad";
      completeBox.innerHTML = `
        <i class="bi ${done ? "bi-patch-check-fill complete-ico" : "bi-journal-check complete-ico"}"></i>
        <h4 class="fw-bold mb-2">${done ? "Lección completada" : "¿Terminaste esta lección?"}</h4>
        <p class="text-white-50 mb-3 mx-auto" style="max-width: 480px;">${done ? "La añadimos a tu progreso. Puedes desmarcarla si quieres repasarla más tarde." : "Márcala para guardar tu avance y consultar tu progreso cuando quieras."}</p>
        <button type="button" class="btn ${cls} rounded-pill px-4 py-2">
          <i class="bi ${icon} me-1"></i>${label}
        </button>`;
      completeBox.querySelector("button").addEventListener("click", () => {
        renderCompleteBtn(toggleDone(currentKey));
      });
    };

    renderCompleteBtn(isDone(currentKey));
    lessonNav.before(completeBox);
  }

  /* ---- Panel "Mi progreso" ---- */
  const progressRoot = document.getElementById("progressRoot");
  if (progressRoot) {
    const done = doneList();
    const streak = storage.get(STREAK_KEY, { last: null, count: 0, best: 0 });
    const test = storage.get(TEST_KEY, null);

    let totalDone = 0;
    const rows = LEVELS.map((lv) => {
      const files = LESSON_FILES[lv.id] || [];
      const doneIn = files.filter((f) => done.includes(`${lv.id}/${f}`)).length;
      totalDone += doneIn;
      const pct = files.length ? Math.round((doneIn / files.length) * 100) : 0;
      const fileChips = files.map((f) => {
        const is = done.includes(`${lv.id}/${f}`);
        return `
          <span class="mini-chip ${is ? "done" : ""}">
            <i class="bi ${is ? "bi-check-circle-fill" : "bi-circle"} me-1"></i>${toTitle(f)}
          </span>`;
      }).join("");
      return `
        <div class="col-12">
          <div class="glass-card p-4">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <h5 class="fw-bold mb-0"><i class="bi ${lv.icon} me-2 progress-ico"></i>${lv.name}</h5>
              <span class="badge-chip">${doneIn}/${files.length} lecciones</span>
            </div>
            <div class="db-progress mb-3"><span class="db-bar" style="width:${pct}%"></span></div>
            <div class="mini-chip-grid">${fileChips}</div>
          </div>
        </div>`;
    }).join("");

    const overallPct = totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0;
    const testHtml = test
      ? `<span class="badge-chip"><i class="bi bi-flag-fill me-1"></i>Último test: nivel ${test.level.toUpperCase()} · ${test.correct}/24</span>`
      : `<span class="badge-chip"><i class="bi bi-question-circle me-1"></i>Aún no has hecho el test de nivel</span>`;

    const certHtml = totalDone === totalLessons && totalDone > 0
      ? `
        <div class="glass-card p-4 p-md-5 text-center award-card mt-4">
          <i class="bi bi-award award-ico"></i>
          <h3 class="fw-bold mb-2">¡Guía completada!</h3>
          <p class="text-white-50 mb-0 mx-auto" style="max-width: 520px;">Has terminado las ${totalLessons} lecciones de FluentPath. Ya puedes considerarte de nivel avanzado: sigue hablando, leyendo y escuchando cada día.</p>
        </div>`
      : "";

    progressRoot.innerHTML = `
      <div class="row g-4 mb-4">
        <div class="col-12 col-lg-7">
          <div class="glass-card p-4 h-100">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <h4 class="fw-bold mb-1">${totalDone}/${totalLessons}</h4>
                <p class="text-muted-theme mb-0">lecciones completadas (${overallPct}%)</p>
              </div>
              <div class="db-progress flex-grow-1" style="min-width: 220px;"><span class="db-bar" style="width:${overallPct}%"></span></div>
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <div class="glass-card p-4 h-100 text-center">
            <h4 class="fw-bold mb-1">${streak.count}</h4>
            <p class="text-muted-theme mb-0 small">días seguidos</p>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="glass-card p-4 h-100 text-center">
            <h4 class="fw-bold mb-1">${streak.best}</h4>
            <p class="text-muted-theme mb-0 small">mejor racha</p>
          </div>
        </div>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-12 col-lg-8">
          <div class="glass-card p-4 h-100">
            <h5 class="fw-bold mb-3">Progreso por nivel</h5>
            <div class="row g-3">${rows}</div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="glass-card p-4 h-100 d-flex flex-column justify-content-center">
            <h5 class="fw-bold mb-3">Test de nivel</h5>
            ${testHtml}
            <div class="d-flex flex-wrap gap-2 mt-3">
              <a href="test-de-nivel.html" class="btn btn-grad rounded-pill px-4 py-2">${test ? "Repetir test" : "Hacer el test"}</a>
              <button type="button" class="btn btn-outline-grad rounded-pill px-4 py-2" id="resetProgress"><i class="bi bi-trash me-1"></i>Reiniciar</button>
            </div>
          </div>
        </div>
      </div>
      ${certHtml}`;

    const resetBtn = progressRoot.querySelector("#resetProgress");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("¿Borrar todo tu progreso, test y racha en este navegador?")) {
          try {
            localStorage.removeItem(DONE_KEY);
            localStorage.removeItem(TEST_KEY);
            localStorage.removeItem(STREAK_KEY);
          } catch (e) { /* noop */ }
          location.reload();
        }
      });
    }
  }

  /* ---- Test de nivel ---- */
  const testRoot = document.getElementById("testRoot");
  if (testRoot) {
    const TEST_QUESTIONS = [
      { level: "a1", q: "___ name is Ana.", opts: ["My", "Me", "I"], c: 0 },
      { level: "a1", q: "She ___ from Peru.", opts: ["is", "are", "am"], c: 0 },
      { level: "a1", q: "I ___ two brothers and one sister.", opts: ["has", "have", "is"], c: 1 },
      { level: "a1", q: "How ___ are you? — I'm 25.", opts: ["tall", "old", "far"], c: 1 },

      { level: "a2", q: "Yesterday I ___ to the park.", opts: ["go", "gone", "went"], c: 2 },
      { level: "a2", q: "___ you like some more coffee?", opts: ["Would", "Do", "Did"], c: 0 },
      { level: "a2", q: "They ___ going to visit us next month.", opts: ["is", "are", "be"], c: 1 },
      { level: "a2", q: "The book is ___ the table.", opts: ["on", "in", "at"], c: 0 },

      { level: "b1", q: "I have lived here ___ 2010.", opts: ["for", "since", "until"], c: 1 },
      { level: "b1", q: "She suggested ___ to the museum.", opts: ["go", "going", "to go"], c: 1 },
      { level: "b1", q: "The man ___ car was stolen is my neighbor.", opts: ["who", "which", "whose"], c: 2 },
      { level: "b1", q: "If I were you, I ___ that job tomorrow.", opts: ["accept", "would accept", "will accept"], c: 1 },

      { level: "b2", q: "By the time we arrived, the movie ___.", opts: ["started", "had started", "was starting"], c: 1 },
      { level: "b2", q: "This report must ___ by Friday.", opts: ["finish", "be finished", "have finished"], c: 1 },
      { level: "b2", q: "She asked me where I ___ from.", opts: ["come", "am coming", "came"], c: 2 },
      { level: "b2", q: "You've been working all day, ___?", opts: ["haven't you", "won't you", "didn't you"], c: 0 },

      { level: "c1", q: "Never ___ such a beautiful sunset.", opts: ["I have seen", "have I seen", "I saw"], c: 1 },
      { level: "c1", q: "If I had studied more, I ___ a doctor now.", opts: ["will be", "would have been", "would be"], c: 2 },
      { level: "c1", q: "Hardly ___ when the phone rang.", opts: ["had he arrived", "he arrived", "did he arrive"], c: 0 },
      { level: "c1", q: "Not only ___ late, but she also forgot the keys.", opts: ["was she", "she was", "she is"], c: 0 },

      { level: "c2", q: "It was Ana ___ solved the problem.", opts: ["which", "who", "whom"], c: 1 },
      { level: "c2", q: "What I love most about the city ___ its people.", opts: ["are", "were", "is"], c: 2 },
      { level: "c2", q: "Under no circumstances ___ this door.", opts: ["should you open", "you should open", "you open"], c: 0 },
      { level: "c2", q: "No sooner ___ than she started crying.", opts: ["did she leave", "she left", "has she left"], c: 0 },
    ];

    let current = 0;
    const answers = TEST_QUESTIONS.map(() => null);

    const renderStart = () => {
      testRoot.innerHTML = `
        <div class="glass-card p-4 p-md-5 text-center reveal-up show">
          <i class="bi bi-speedometer2 test-big-ico"></i>
          <h3 class="fw-bold mb-2">¿Listo para saber tu nivel?</h3>
          <p class="text-white-50 mx-auto mb-1">24 preguntas de menor a mayor dificultad, sin tiempo límite.</p>
          <p class="text-muted-theme small mb-4">4 preguntas por nivel: A1, A2, B1, B2, C1 y C2.</p>
          <button type="button" class="btn btn-grad rounded-pill px-4 py-2" id="testStart">
            <i class="bi bi-play-fill me-1"></i>Comenzar test
          </button>
        </div>`;
      testRoot.querySelector("#testStart").addEventListener("click", () => renderQuestion(0));
    };

    const renderQuestion = (i) => {
      current = i;
      const q = TEST_QUESTIONS[i];
      testRoot.innerHTML = `
        <div class="glass-card p-4 p-md-5 reveal-up show">
          <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <span class="badge-chip">Pregunta ${i + 1} de ${TEST_QUESTIONS.length}</span>
            <span class="badge-chip">Nivel ${q.level.toUpperCase()}</span>
          </div>
          <div class="db-progress mb-4"><span class="db-bar" style="width:${((i) / TEST_QUESTIONS.length) * 100}%"></span></div>
          <h5 class="fw-bold mb-4">${i + 1}. ${q.q}</h5>
          <div class="d-grid gap-2">
            ${q.opts.map((opt, oi) => `<button type="button" class="test-opt" data-idx="${oi}">${opt}</button>`).join("")}
          </div>
        </div>`;

      testRoot.querySelectorAll(".test-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          const picked = parseInt(btn.dataset.idx, 10);
          answers[current] = { level: q.level, picked, correct: q.c, q: q.q, optChosen: q.opts[picked] };
          if (current + 1 < TEST_QUESTIONS.length) renderQuestion(current + 1);
          else renderResults();
        });
      });
    };

    const levelName = (id) => {
      const lv = LEVELS.find((l) => l.id === id);
      return lv ? lv.name : id.toUpperCase();
    };

    const renderResults = () => {
      const byLevel = {};
      TEST_QUESTIONS.forEach((q, i) => {
        (byLevel[q.level] = byLevel[q.level] || []).push(answers[i]);
      });

      let recommended = null;
      const tiers = LEVELS.map((lv) => {
        const qs = byLevel[lv.id] || [];
        const correct = qs.filter((a) => a && a.picked === a.correct).length;
        if (!recommended && qs.length && correct < 3) recommended = lv.id;
        const pct = qs.length ? Math.round((correct / qs.length) * 100) : 0;
        const ok = correct >= 3;
        return `
          <div class="d-flex align-items-center justify-content-between gap-3 mb-3 flex-wrap">
            <span class="fw-semibold flex-shrink-0">${lv.name}</span>
            <div class="db-progress flex-grow-1" style="min-width: 140px;"><span class="db-bar ${ok ? "ok" : ""}" style="width:${pct}%"></span></div>
            <span class="badge-chip">${correct}/4 ${ok ? '<i class="bi bi-check-lg ms-1"></i>' : ""}</span>
          </div>`;
      }).join("");

      const totalCorrect = answers.filter((a) => a && a.picked === a.correct).length;
      if (!recommended) recommended = "c2";
      const recIndex = LEVELS.findIndex((l) => l.id === recommended);
      const recLink = LEVELS[recIndex + 1] ? LEVELS[recIndex + 1].id : "c2";

      testRoot.innerHTML = `
        <div class="glass-card p-4 p-md-5 reveal-up show">
          <div class="text-center mb-4">
            <i class="bi ${totalCorrect >= 18 ? "bi-trophy" : totalCorrect >= 9 ? "bi-flag-fill" : "bi-rocket-takeoff"} test-big-ico"></i>
            <h3 class="fw-bold mt-3 mb-2">Tu resultado: ${totalCorrect}/24 aciertos</h3>
            <p class="text-white-50 mb-1">Nivel recomendado: <span class="gradient-text fw-bold fs-4">${levelName(recommended)}</span></p>
            <p class="text-muted-theme small">Te recomendamos empezar en ese nivel y avanzar paso a paso.</p>
          </div>
          <div class="test-tiers mb-4">${tiers}</div>
          <div class="d-flex flex-wrap gap-2 justify-content-center">
            <a href="modulos/${recommended}/index.html" class="btn btn-grad rounded-pill px-4 py-2">Ir al nivel ${recommended.toUpperCase()}</a>
            <a href="modulos/${recLink}/index.html" class="btn btn-outline-grad rounded-pill px-4 py-2">Un nivel más reto</a>
            <button type="button" class="btn btn-glass rounded-pill px-4 py-2" id="testSave">
              <i class="bi bi-save me-1"></i>Guardar en mi progreso
            </button>
          </div>
          <p class="text-muted-theme small mt-3 mb-0 text-center" id="testSavedMsg"></p>
        </div>`;

      const saveBtn = testRoot.querySelector("#testSave");
      if (saveBtn) {
        saveBtn.addEventListener("click", () => {
          storage.set(TEST_KEY, { level: recommended, correct: totalCorrect, date: new Date().toISOString().slice(0, 10) });
          const msg = testRoot.querySelector("#testSavedMsg");
          msg.textContent = "Guardado. Revisa tu panel en Mi progreso.";
          msg.style.color = "var(--mint)";
          saveBtn.disabled = true;
        });
      }
    };

    renderStart();
  }
})();