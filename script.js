// --- Popup ---
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('popup').style.display = 'flex';
  }, 3000);
});

// --- Kalkulator podatku Belki ---
function oblicz() {
  const kwota = parseFloat(document.getElementById('kwota').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie').value);
  const czas = parseInt(document.getElementById('czas').value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(czas) || kwota <= 0 || oprocentowanie <= 0 || czas <= 0) {
    alert('Proszę podać poprawne dane większe od zera.');
    return;
  }

  const zyskBrutto = kwota * (oprocentowanie / 100) * (czas / 12);
  const podatek = zyskBrutto * 0.19;
  const zyskNetto = zyskBrutto - podatek;

  document.getElementById('wynik').textContent = `Zysk netto po ${czas} miesiącach: ${zyskNetto.toFixed(2)} PLN`;
}

// --- Kalkulator oszczędności ---
let wykresOszczednosci;

function obliczOszczednosci() {
  const miesiecznaWplata = parseFloat(document.getElementById('miesieczna-wplata').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-oszczednosci').value);
  const okres = parseInt(document.getElementById('okres-oszczednosci').value);

  if (isNaN(miesiecznaWplata) || isNaN(oprocentowanie) || isNaN(okres) ||
      miesiecznaWplata <= 0 || oprocentowanie <= 0 || okres <= 0) {
    alert('Proszę podać poprawne dane większe od zera.');
    return;
  }

  const miesieczneOprocentowanie = oprocentowanie / 100 / 12;
  let saldo = 0;
  const saldoMiesieczne = [];
  const labels = [];

  for (let i = 1; i <= okres; i++) {
    saldo = (saldo + miesiecznaWplata) * (1 + miesieczneOprocentowanie);
    saldoMiesieczne.push(saldo.toFixed(2));
    labels.push(`Miesiąc ${i}`);
  }

  document.getElementById('wynik-oszczednosci').textContent = `Oszczędności po ${okres} miesiącach: ${saldo.toFixed(2)} PLN`;

  const ctx = document.getElementById('wykres-oszczednosci').getContext('2d');
  if (wykresOszczednosci) {
    wykresOszczednosci.data.labels = labels;
    wykresOszczednosci.data.datasets[0].data = saldoMiesieczne;
    wykresOszczednosci.update();
  } else {
    wykresOszczednosci = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Saldo oszczędności (PLN)',
          data: saldoMiesieczne,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// --- Kalkulator raty kredytu ---
function obliczRateKredytu() {
  const kwotaKredytu = parseFloat(document.getElementById('kwota-kredytu').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-kredytu').value);
  const okres = parseInt(document.getElementById('okres-kredytu').value);

  if (isNaN(kwotaKredytu) || isNaN(oprocentowanie) || isNaN(okres) ||
      kwotaKredytu <= 0 || oprocentowanie <= 0 || okres <= 0) {
    alert('Proszę podać poprawne dane większe od zera.');
    return;
  }

  const miesieczneOprocentowanie = oprocentowanie / 100 / 12;
  const rata = (kwotaKredytu * miesieczneOprocentowanie) / (1 - Math.pow(1 + miesieczneOprocentowanie, -okres));

  document.getElementById('wynik-kredyt').textContent = `Miesięczna rata kredytu: ${rata.toFixed(2)} PLN`;
}
