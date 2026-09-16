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

  /* ---------- Filtrado de módulos ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const moduleCards = document.querySelectorAll(".module-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      moduleCards.forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hidden-filter", !match);
        if (match) {
          card.style.opacity = "0";
          requestAnimationFrame(() => {
            card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            card.style.opacity = "1";
          });
        }
      });
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
})();