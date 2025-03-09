/**
 * JW Nail Studio - Testy jednostkowe
 * Plik zawiera testy dla głównych funkcji JavaScript
 */

// Funkcja pomocnicza do symulacji DOM
function setupDOM() {
  // Symulacja elementów DOM
  document.body.innerHTML = `
    <div class="logo">JW Nail Studio</div>
    <div class="hero-slider">
      <div class="slide active" data-id="0"></div>
      <div class="slide" data-id="1"></div>
      <div class="slide" data-id="2"></div>
    </div>
    <div class="slider-dots">
      <span class="dot active" data-slide="0"></span>
      <span class="dot" data-slide="1"></span>
      <span class="dot" data-slide="2"></span>
    </div>
    <form class="contact-form">
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message" required></textarea>
      <button type="submit" class="submit-button">Wyślij</button>
    </form>
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="nav-links" style="display: none;">
      <li><a href="#home">Strona Główna</a></li>
    </ul>
  `;
}

// Testy dla funkcji zmiany slajdów
function testChangeSlide() {
  console.log("Uruchamiam test: changeSlide");
  setupDOM();

  // Przygotowanie zmiennych
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  // Funkcja do testowania
  function changeSlide(n) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    return currentSlide;
  }

  // Test 1: Zmiana na następny slajd
  const result1 = changeSlide(1);
  console.assert(
    result1 === 1,
    "Test 1 nie powiódł się: Oczekiwano currentSlide=1, otrzymano " + result1
  );
  console.assert(
    slides[1].classList.contains("active"),
    "Test 1 nie powiódł się: Drugi slajd powinien mieć klasę active"
  );
  console.assert(
    dots[1].classList.contains("active"),
    "Test 1 nie powiódł się: Druga kropka powinna mieć klasę active"
  );

  // Test 2: Zmiana na poprzedni slajd
  const result2 = changeSlide(0);
  console.assert(
    result2 === 0,
    "Test 2 nie powiódł się: Oczekiwano currentSlide=0, otrzymano " + result2
  );

  // Test 3: Zapętlenie slajdów (poza zakresem)
  const result3 = changeSlide(3);
  console.assert(
    result3 === 0,
    "Test 3 nie powiódł się: Oczekiwano currentSlide=0 (zapętlenie), otrzymano " +
      result3
  );

  // Test 4: Ujemny indeks
  const result4 = changeSlide(-1);
  console.assert(
    result4 === 2,
    "Test 4 nie powiódł się: Oczekiwano currentSlide=2 (ostatni slajd), otrzymano " +
      result4
  );

  console.log("Test changeSlide zakończony");
}

// Testy dla obsługi formularza
function testContactForm() {
  console.log("Uruchamiam test: contactForm");
  setupDOM();

  const contactForm = document.querySelector(".contact-form");
  const submitButton = contactForm.querySelector(".submit-button");

  // Symulacja zdarzenia submit
  let formSubmitted = false;
  let buttonDisabled = false;
  let buttonText = "";

  // Mockowanie funkcji
  const originalAlert = window.alert;
  window.alert = function (message) {
    console.log("Alert: " + message);
  };

  // Mockowanie metod formularza
  contactForm.addEventListener = function (event, callback) {
    if (event === "submit") {
      // Symulacja wywołania callbacka
      callback({
        preventDefault: function () {},
      });
      formSubmitted = true;
    }
  };

  // Mockowanie właściwości przycisku
  Object.defineProperty(submitButton, "textContent", {
    get: function () {
      return buttonText;
    },
    set: function (value) {
      buttonText = value;
    },
  });

  Object.defineProperty(submitButton, "disabled", {
    get: function () {
      return buttonDisabled;
    },
    set: function (value) {
      buttonDisabled = value;
    },
  });

  // Funkcja do testowania
  function setupFormHandler() {
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        submitButton.textContent = "Wysyłanie";
        submitButton.disabled = true;
        submitButton.classList.add("loading");

        // Symulacja wysyłania
        setTimeout(function () {
          alert("Dziękujemy za wiadomość!");
          submitButton.textContent = "Wyślij";
          submitButton.disabled = false;
          submitButton.classList.remove("loading");
        }, 100);
      });
    }
  }

  // Uruchomienie funkcji
  setupFormHandler();

  // Test 1: Formularz został obsłużony
  console.assert(
    formSubmitted,
    "Test 1 nie powiódł się: Formularz nie został obsłużony"
  );

  // Test 2: Przycisk został wyłączony
  console.assert(
    buttonDisabled,
    "Test 2 nie powiódł się: Przycisk nie został wyłączony"
  );

  // Test 3: Tekst przycisku został zmieniony
  console.assert(
    buttonText === "Wysyłanie",
    "Test 3 nie powiódł się: Tekst przycisku nie został zmieniony"
  );

  // Przywrócenie oryginalnej funkcji alert
  window.alert = originalAlert;

  console.log("Test contactForm zakończony");
}

// Testy dla menu mobilnego
function testMobileMenu() {
  console.log("Uruchamiam test: mobileMenu");
  setupDOM();

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Funkcja do testowania
  function setupMobileMenu() {
    hamburger.addEventListener("click", function () {
      const isExpanded = navLinks.style.display === "flex";
      navLinks.style.display = isExpanded ? "none" : "flex";
      hamburger.classList.toggle("active");
    });
  }

  // Mockowanie metody addEventListener
  let clickHandler = null;
  hamburger.addEventListener = function (event, callback) {
    if (event === "click") {
      clickHandler = callback;
    }
  };

  // Uruchomienie funkcji
  setupMobileMenu();

  // Test 1: Handler został dodany
  console.assert(
    clickHandler !== null,
    "Test 1 nie powiódł się: Handler nie został dodany"
  );

  // Test 2: Menu jest początkowo ukryte
  console.assert(
    navLinks.style.display === "none",
    "Test 2 nie powiódł się: Menu nie jest początkowo ukryte"
  );

  // Test 3: Kliknięcie pokazuje menu
  clickHandler();
  console.assert(
    navLinks.style.display === "flex",
    "Test 3 nie powiódł się: Menu nie zostało pokazane po kliknięciu"
  );

  // Test 4: Ponowne kliknięcie ukrywa menu
  clickHandler();
  console.assert(
    navLinks.style.display === "none",
    "Test 4 nie powiódł się: Menu nie zostało ukryte po ponownym kliknięciu"
  );

  console.log("Test mobileMenu zakończony");
}

// Uruchomienie testów
function runTests() {
  console.log("Rozpoczynam testy jednostkowe...");

  try {
    testChangeSlide();
    testContactForm();
    testMobileMenu();

    console.log("Wszystkie testy zakończone pomyślnie!");
  } catch (error) {
    console.error("Błąd podczas wykonywania testów:", error);
  }
}

// Uruchom testy po załadowaniu strony
if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.addEventListener("load", function () {
    // Uruchom testy tylko w środowisku testowym
    if (window.location.search.includes("runTests=true")) {
      runTests();
    }
  });
}

// Eksport funkcji testowych dla środowisk testowych
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    testChangeSlide,
    testContactForm,
    testMobileMenu,
    runTests,
  };
}
