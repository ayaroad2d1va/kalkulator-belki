// --- Utility do animacji liczb ---
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = (progress * (end - start) + start).toFixed(2);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// --- Walidacja i pomoc wizualna ---
function validateInput(input) {
  const val = parseFloat(input.value);
  const parent = input.parentElement;
  let errorSpan = parent.querySelector(".error-message");

  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.style.color = "red";
    errorSpan.style.fontSize = "0.8em";
    parent.appendChild(errorSpan);
  }

  if (isNaN(val) || val <= 0) {
    input.style.borderColor = "red";
    errorSpan.textContent = "Wprowadź poprawną wartość > 0";
    return false;
  } else {
    input.style.borderColor = "";
    errorSpan.textContent = "";
    return true;
  }
}

// --- Aktywuj/Dezaktywuj przycisk w zależności od pól ---
function toggleButton(button, inputs) {
  let allValid = true;
  inputs.forEach(input => {
    if (!validateInput(input)) allValid = false;
  });
  button.disabled = !allValid;
  if (allValid) {
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  } else {
    button.style.opacity = "0.6";
    button.style.cursor = "not-allowed";
  }
}

// --- Obsługa Enter dla formularzy ---
function enableEnterKey(formId, calculateFunc) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!form.querySelector("button").disabled) {
          calculateFunc();
        }
      }
    });
  });
}

// --- Reset formularza ---
function resetForm(formId, resultId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll("input").forEach(input => {
    input.value = "";
    input.style.borderColor = "";
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.textContent = "";
  });
  const wynik = document.getElementById(resultId);
  if (wynik) wynik.textContent = "";
}

// --- Tryb jasny/ciemny ---
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  if (current === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Załaduj zapisany motyw
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Dodaj przycisk do przełączania motywu
  const btn = document.createElement('button');
  btn.textContent = 'Tryb jasny/ciemny';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.padding = '10px 15px';
  btn.style.zIndex = '9999';
  btn.style.cursor = 'pointer';
  btn.onclick = toggleTheme;
  document.body.appendChild(btn);

  // --- Dla każdego kalkulatora: walidacja i blokada przycisku ---

  // Kalkulator podatku Belki
  const inputsBelka = ['kwota', 'oprocentowanie', 'czas'].map(id => document.getElementById(id));
  const btnBelka = document.querySelector("#calc-belka button");
  inputsBelka.forEach(input => {
    input.addEventListener('input', () => toggleButton(btnBelka, inputsBelka));
  });
  toggleButton(btnBelka, inputsBelka);
  enableEnterKey("calc-belka", oblicz);

  // Kalkulator oszczędności
  const inputsOszcz = ['miesieczna-wplata', 'oprocentowanie-oszczednosci', 'okres-oszczednosci'].map(id => document.getElementById(id));
  const btnOszcz = document.querySelector("#calc-oszczednosci button");
  inputsOszcz.forEach(input => {
    input.addEventListener('input', () => toggleButton(btnOszcz, inputsOszcz));
  });
  toggleButton(btnOszcz, inputsOszcz);
  enableEnterKey("calc-oszczednosci", obliczOszczednosci);

  // Kalkulator kredytu
  const inputsKredyt = ['kwota-kredytu', 'oprocentowanie-kredytu', 'okres-kredytu'].map(id => document.getElementById(id));
  const btnKredyt = document.querySelector("#calc-kredyt button");
  inputsKredyt.forEach(input => {
    input.addEventListener('input', () => toggleButton(btnKredyt, inputsKredyt));
  });
  toggleButton(btnKredyt, inputsKredyt);
  enableEnterKey("calc-kredyt", obliczRateKredytu);

});

// --- Kalkulator podatku Belki z animacją i resetem ---
function oblicz() {
  const kwota = parseFloat(document.getElementById("kwota").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie").value);
  const czas = parseFloat(document.getElementById("czas").value);

  if (isNaN(kwota) || kwota <= 0 || isNaN(oprocentowanie) || oprocentowanie <= 0 || isNaN(czas) || czas <= 0) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const zysk = kwota * (oprocentowanie / 100) * (czas / 12);
  const podatekBelki = zysk * 0.19;
  const zyskNetto = zysk - podatekBelki;

  animateValue("wynik", 0, zyskNetto, 1000);

  // reset nieczyści bo może user chce zobaczyć wartości, ale możesz dodać jak chcesz
  // resetForm("calc-belka", "wynik");
}

// --- Kalkulator oszczędności z animacją i resetem ---
function obliczOszczednosci() {
  const wplata = parseFloat(document.getElementById("miesieczna-wplata").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie-oszczednosci").value);
  const okres = parseFloat(document.getElementById("okres-oszczednosci").value);

  if (isNaN(wplata) || wplata <= 0 || isNaN(oprocentowanie) || oprocentowanie <= 0 || isNaN(okres) || okres <= 0) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  let saldo = 0;
  const miesiecznaStopa = (oprocentowanie / 100) / 12;

  for (let i = 0; i < okres; i++) {
    saldo += wplata;
    saldo += saldo * miesiecznaStopa;
  }

  animateValue("wynik-oszczednosci", 0, saldo, 1000);

  // resetForm("calc-oszczednosci", "wynik-oszczednosci");
}

// --- Kalkulator raty kredytu z animacją i resetem ---
function obliczRateKredytu() {
  const kwota = parseFloat(document.getElementById("kwota-kredytu").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie-kredytu").value);
  const okres = parseFloat(document.getElementById("okres-kredytu").value);

  if (isNaN(kwota) || kwota <= 0 || isNaN(oprocentowanie) || oprocentowanie <= 0 || isNaN(okres) || okres <= 0) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const miesiecznaStopa = (oprocentowanie / 100) / 12;
  const rata = kwota * miesiecznaStopa / (1 - Math.pow(1 + miesiecznaStopa, -okres));

  animateValue("wynik-kredyt", 0, rata, 1000);

  // resetForm("calc-kredyt", "wynik-kredyt");
}

// Popup Millenium - funkcje pokaz/ukryj
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Pokaz popup po 3 sekundach od załadowania strony
window.addEventListener("load", () => {
  setTimeout(showPopup, 3000);
});
