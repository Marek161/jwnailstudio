/**
 * JW Nail Studio - Main JavaScript
 * Zoptymalizowany kod pod kątem wydajności
 */

document.addEventListener("DOMContentLoaded", () => {
  // Zmienne
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");
  const contactForm = document.querySelector(".contact-form");
  const logo = document.querySelector(".logo");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  let currentSlide = 0;
  let slideInterval;
  let lastScroll = 0;
  let ticking = false;

  /**
   * Zmienia aktywny slajd
   * @param {number} n - Indeks slajdu do pokazania
   */
  function changeSlide(n) {
    if (!slides.length || !dots.length) return;

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  /**
   * Uruchamia automatyczną zmianę slajdów
   */
  function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1);
    }, 5000); // Zmiana co 5 sekund
  }

  // Obsługa kliknięcia na kropkę
  if (dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const slideIndex = parseInt(this.getAttribute("data-slide"));
        if (isNaN(slideIndex)) return;

        changeSlide(slideIndex);

        // Resetuj timer po ręcznej zmianie slajdu
        clearInterval(slideInterval);
        startSlideShow();
      });
    });

    // Rozpocznij pokaz slajdów
    startSlideShow();
  }

  /**
   * Animuje logo z efektem błyszczenia
   */
  function animateLogo() {
    if (!logo) return;

    logo.classList.add("shine");

    setTimeout(() => {
      logo.classList.remove("shine");

      // Losowy czas między animacjami (między 5 a 10 sekund)
      const randomTime = Math.floor(Math.random() * 5000) + 5000;
      setTimeout(animateLogo, randomTime);
    }, 1000);
  }

  // Uruchom animację logo po 3 sekundach od załadowania strony
  if (logo) setTimeout(animateLogo, 3000);

  // Obsługa menu mobilnego
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      hamburger.classList.toggle("active");
    });
  }

  // Płynne przewijanie do sekcji
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        // Oblicz pozycję z uwzględnieniem wysokości nawigacji
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Zamknij menu mobilne po kliknięciu
        if (window.innerWidth <= 768 && navLinks && hamburger) {
          navLinks.style.display = "none";
          hamburger.classList.remove("active");
        }
      }
    });
  });

  // Animacja nawigacji przy przewijaniu - zoptymalizowana z requestAnimationFrame
  window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      if (navbar) {
        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }
      }
      lastScroll = currentScroll;
      ticking = false;
    });
  });

  // Obsługa formularza kontaktowego
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const submitButton = contactForm.querySelector(".submit-button");
      if (!submitButton) return;

      const originalText = submitButton.textContent;
      submitButton.textContent = "Wysyłanie";
      submitButton.classList.add("loading");
      submitButton.disabled = true;

      // Pokazujemy komunikat o wysłaniu formularza
      setTimeout(() => {
        alert("Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.");

        submitButton.textContent = originalText;
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
      }, 500);
    });
  }

  // Animacje przy przewijaniu - zoptymalizowane z IntersectionObserver
  const animateElements = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.tagName !== "SECTION") {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

        // Przestań obserwować element po animacji
        observer.unobserve(entry.target);
      }
    });
  };

  // Utworzenie obserwatora
  if ("IntersectionObserver" in window) {
    const animationObserver = new IntersectionObserver(animateElements, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px",
    });

    // Obserwuj sekcje
    document.querySelectorAll("section").forEach((section) => {
      animationObserver.observe(section);
    });

    // Obserwuj elementy do animacji
    document
      .querySelectorAll(
        ".service-card, .price-card, .contact-info, .contact-form, .gallery-item"
      )
      .forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        animationObserver.observe(element);
      });
  } else {
    // Fallback dla przeglądarek bez wsparcia dla IntersectionObserver
    const animateOnScroll = () => {
      document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.85) {
          section.classList.add("visible");
        }
      });

      document
        .querySelectorAll(
          ".service-card, .price-card, .contact-info, .contact-form, .gallery-item"
        )
        .forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          if (elementTop < window.innerHeight * 0.85) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }
        });
    };

    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", animateOnScroll);
  }

  // Obsługa filtrów galerii
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        galleryItems.forEach((item) => {
          item.style.display =
            filter === "all" || item.dataset.category === filter
              ? "block"
              : "none";
        });
      });
    });
  }

  // Obsługa galerii - powiększanie zdjęć
  if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const caption = item.querySelector(".gallery-overlay");
        if (!img || !caption) return;

        const modal = document.createElement("div");
        modal.className = "modal";

        modal.innerHTML = `
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            ${img.outerHTML}
            ${caption.outerHTML}
          </div>
        `;

        document.body.appendChild(modal);

        // Dodaj obsługę klawisza Escape
        const handleEscape = (e) => {
          if (e.key === "Escape") {
            closeModal();
          }
        };

        document.addEventListener("keydown", handleEscape);

        // Funkcja zamykająca modal
        const closeModal = () => {
          modal.classList.remove("active");
          document.removeEventListener("keydown", handleEscape);
          setTimeout(() => modal.remove(), 300);
        };

        setTimeout(() => modal.classList.add("active"), 10);

        modal
          .querySelector(".modal-close")
          .addEventListener("click", closeModal);

        // Zamknij modal po kliknięciu poza zawartością
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            closeModal();
          }
        });
      });
    });
  }

  // Dodatkowe efekty dla kart usług - używamy delegacji zdarzeń
  document.addEventListener("mouseover", function (e) {
    const serviceCard = e.target.closest(".service-card");
    if (serviceCard) {
      serviceCard.style.transform = "translateY(-15px) scale(1.03)";
      serviceCard.style.boxShadow = "0 15px 30px rgba(255,105,180,0.2)";

      const icon = serviceCard.querySelector("i");
      if (icon) {
        icon.style.transform = "scale(1.2) rotate(10deg)";
      }
    }
  });

  document.addEventListener("mouseout", function (e) {
    const serviceCard = e.target.closest(".service-card");
    if (serviceCard) {
      serviceCard.style.transform = "translateY(0) scale(1)";
      serviceCard.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";

      const icon = serviceCard.querySelector("i");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0)";
      }
    }
  });
});
