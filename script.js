// Kalkulator podatku Belki
function oblicz() {
  const kwota = parseFloat(document.getElementById('kwota').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie').value);
  const czas = parseFloat(document.getElementById('czas').value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(czas) || kwota <= 0 || oprocentowanie <= 0 || czas <= 0) {
    document.getElementById('wynik').textContent = 'Proszę wprowadzić poprawne dane.';
    return;
  }

  const zysk = kwota * (oprocentowanie / 100) * (czas / 12);
  const podatekBelki = zysk * 0.19;
  const netto = zysk - podatekBelki;

  document.getElementById('wynik').innerHTML = `
    Zysk brutto: ${zysk.toFixed(2)} PLN<br>
    Podatek Belki (19%): ${podatekBelki.toFixed(2)} PLN<br>
    Zysk netto: ${netto.toFixed(2)} PLN
  `;
}

// Kalkulator oszczędności z kapitalizacją miesięczną
function obliczOszczednosci() {
  const wplata = parseFloat(document.getElementById('miesieczna-wplata').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-oszczednosci').value);
  const miesiace = parseInt(document.getElementById('okres-oszczednosci').value);

  if (isNaN(wplata) || isNaN(oprocentowanie) || isNaN(miesiace) || wplata <= 0 || oprocentowanie <= 0 || miesiace <= 0) {
    document.getElementById('wynik-oszczednosci').textContent = 'Proszę wprowadzić poprawne dane.';
    return;
  }

  const miesieczneOprocentowanie = oprocentowanie / 100 / 12;
  let saldo = 0;

  for(let i = 0; i < miesiace; i++) {
    saldo = (saldo + wplata) * (1 + miesieczneOprocentowanie);
  }

  document.getElementById('wynik-oszczednosci').innerHTML = `Po ${miesiace} miesiącach zaoszczędzisz około <strong>${saldo.toFixed(2)} PLN</strong>.`;
}

// Kalkulator raty kredytu (raty równe)
function obliczRateKredytu() {
  const kwota = parseFloat(document.getElementById('kwota-kredytu').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-kredytu').value);
  const miesiace = parseInt(document.getElementById('okres-kredytu').value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(miesiace) || kwota <= 0 || oprocentowanie <= 0 || miesiace <= 0) {
    document.getElementById('wynik-kredyt').textContent = 'Proszę wprowadzić poprawne dane.';
    return;
  }

  const miesieczneOprocentowanie = oprocentowanie / 100 / 12;
  // Wzór na ratę równą: R = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const rata = kwota * miesieczneOprocentowanie * Math.pow(1 + miesieczneOprocentowanie, miesiace) / (Math.pow(1 + miesieczneOprocentowanie, miesiace) - 1);

  document.getElementById('wynik-kredyt').innerHTML = `Twoja miesięczna rata wynosi około <strong>${rata.toFixed(2)} PLN</strong>.`;
}
<script>
  // Wyświetl popup po 8 sekundach
  window.onload = () => {
    setTimeout(() => {
      document.getElementById("popup").style.display = "flex";
    }, 8000);
  };

  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
</script>
