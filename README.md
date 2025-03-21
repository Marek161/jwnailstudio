
# JW Nail Studio - Strona Internetowa

![podglą-jwnailstudio](https://github.com/user-attachments/assets/ae54de9f-be24-48f8-940a-9ac7ea4a0320)
![podglą-jwnailstudio2](https://github.com/user-attachments/assets/d12658ab-c326-450e-8d12-183632c8bd29)


Strona internetowa dla salonu stylizacji paznokci JW Nail Studio. Projekt zawiera responsywny design, animacje i interaktywne elementy.

## Struktura projektu

```
JW/
├── css/
│   └── style.css       # Główny plik CSS
├── js/
│   ├── main.js         # Główny plik JavaScript
│   └── tests.js        # Testy jednostkowe
├── images/             # Katalog z obrazami
├── index.html          # Strona główna
└── README.md           # Dokumentacja projektu
```

## Funkcjonalności

- **Responsywny design** - strona dostosowuje się do różnych rozmiarów ekranów
- **Slider zdjęć** - automatycznie zmieniający się slider na stronie głównej
- **Animacje** - efekty pojawiania się elementów podczas przewijania
- **Formularz kontaktowy** - zintegrowany z Formspree
- **Galeria** - wyświetlanie zdjęć z Instagrama
- **Menu mobilne** - hamburger menu dla urządzeń mobilnych

## Technologie

- HTML5
- CSS3 (zmienne CSS, flexbox, grid, animacje)
- JavaScript (ES6+)
- Formspree (obsługa formularza kontaktowego)
- Instagram API (wyświetlanie galerii)

## Optymalizacje wydajności

- Lazy loading obrazów
- Optymalizacja animacji z użyciem `requestAnimationFrame`
- Delegacja zdarzeń dla obsługi interakcji
- Wykorzystanie IntersectionObserver do animacji przy przewijaniu
- Debouncing i throttling dla zdarzeń scroll

## Dostępność

- Semantyczny HTML
- Atrybuty ARIA
- Obsługa klawiatury dla interaktywnych elementów
- Odpowiedni kontrast kolorów

