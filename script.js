let wykresOszczednosci = null;

// Funkcja dodająca efekt pulsowania błędu (dodaje klasę, usuwa po animacji)
function oznaczBlad(id) {
  const el = document.getElementById(id);
  el.classList.add('errorPulse');
  setTimeout(() => el.classList.remove('errorPulse'), 1500);
}

// Walidacja pola - czy jest wypełnione i czy wartość to liczba
function walidujPole(id) {
  const el = document.getElementById(id);
  const val = el.value.trim();

  if (val === "") return false;          // Puste pole - nie OK
  if (isNaN(parseFloat(val))) return false; // Nie liczba - nie OK

  return true; // OK
}

// --- Kalkulator podatku Belki ---
function oblicz() {
  const pola = ["kwota", "oprocentowanie", "czas"];
  let wszystkieOK = true;

  for (const id of pola) {
    if (!walidujPole(id)) {
      oznaczBlad(id);
      wszystkieOK = false;
    }
  }
  if (!wszystkieOK) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const kwota = parseFloat(document.getElementById("kwota").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie").value);
  const czas = parseFloat(document.getElementById("czas").value);

  const zysk = kwota * (oprocentowanie / 100) * (czas / 12);
  const podatekBelki = zysk * 0.19;
  const zyskNetto = zysk - podatekBelki;

  document.getElementById("wynik").textContent = `Zysk netto po podatku Belki: ${zyskNetto.toFixed(2)} PLN`;
}

// --- Kalkulator oszczędności + wykres ---
function obliczOszczednosci() {
  const pola = ["miesieczna-wplata", "oprocentowanie-oszczednosci", "okres-oszczednosci"];
  let wszystkieOK = true;

  for (const id of pola) {
    if (!walidujPole(id)) {
      oznaczBlad(id);
      wszystkieOK = false;
    }
  }
  if (!wszystkieOK) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const wplata = parseFloat(document.getElementById("miesieczna-wplata").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie-oszczednosci").value);
  const okres = parseFloat(document.getElementById("okres-oszczednosci").value);

  let saldo = 0;
  const miesiecznaStopa = (oprocentowanie / 100) / 12;
  const saldoMiesieczne = [];

  for (let i = 0; i < okres; i++) {
    saldo += wplata;
    saldo += saldo * miesiecznaStopa;
    saldoMiesieczne.push(saldo.toFixed(2));
  }

  document.getElementById("wynik-oszczednosci").textContent = `Saldo po ${okres} miesiącach: ${saldo.toFixed(2)} PLN`;

  // Rysowanie wykresu (Chart.js)
  const ctx = document.getElementById('wykres-oszczednosci').getContext('2d');
  if (wykresOszczednosci) {
    wykresOszczednosci.destroy();
  }
  wykresOszczednosci = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: okres}, (_, i) => i + 1),
      datasets: [{
        label: 'Saldo oszczędności (PLN)',
        data: saldoMiesieczne,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Miesiąc' }
        },
        y: {
          title: { display: true, text: 'Saldo (PLN)' },
          beginAtZero: true
        }
      },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: { enabled: true }
      }
    }
  });
}

// --- Kalkulator raty kredytu ---
function obliczRateKredytu() {
  const pola = ["kwota-kredytu", "oprocentowanie-kredytu", "okres-kredytu"];
  let wszystkieOK = true;

  for (const id of pola) {
    if (!walidujPole(id)) {
      oznaczBlad(id);
      wszystkieOK = false;
    }
  }
  if (!wszystkieOK) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const kwota = parseFloat(document.getElementById("kwota-kredytu").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie-kredytu").value);
  const okres = parseFloat(document.getElementById("okres-kredytu").value);

  const miesiecznaStopa = (oprocentowanie / 100) / 12;
  const rata = kwota * miesiecznaStopa / (1 - Math.pow(1 + miesiecznaStopa, -okres));

  document.getElementById("wynik-kredyt").textContent = `Miesięczna rata: ${rata.toFixed(2)} PLN`;
}

// --- Popup Millenium ---
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// --- Inicjalizacja ---
window.addEventListener("load", () => {
  // Pokaz popup po 3 sekundach
  setTimeout(showPopup, 3000);
});
