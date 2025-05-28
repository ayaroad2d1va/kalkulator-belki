// Kalkulator podatku Belki
function oblicz() {
  const kwota = parseFloat(document.getElementById('kwota').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie').value);
  const czas = parseFloat(document.getElementById('czas').value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(czas) || kwota <= 0 || oprocentowanie <= 0 || czas <= 0) {
    document.getElementById('wynik').textContent = 'Proszę podać poprawne wartości większe od zera.';
    return;
  }

  // Zysk brutto = kwota * (oprocentowanie/100) * (czas/12)
  const zyskBrutto = kwota * (oprocentowanie / 100) * (czas / 12);

  // Podatek Belki 19%
  const podatek = zyskBrutto * 0.19;

  document.getElementById('wynik').textContent = `Podatek Belki do zapłaty: ${podatek.toFixed(2)} PLN`;
}

// Kalkulator oszczędności z kapitalizacją miesięczną
function obliczOszczednosci() {
  const wplata = parseFloat(document.getElementById('miesieczna-wplata').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-oszczednosci').value);
  const miesiace = parseInt(document.getElementById('okres-oszczednosci').value);

  if (isNaN(wplata) || isNaN(oprocentowanie) || isNaN(miesiace) || wplata <= 0 || oprocentowanie <= 0 || miesiace <= 0) {
    document.getElementById('wynik-oszczednosci').textContent = 'Proszę podać poprawne wartości większe od zera.';
    return;
  }

  // miesięczne oprocentowanie
  const r = (oprocentowanie / 100) / 12;

  // wzór na sumę ciągu geometrycznego (kapitalizacja co miesiąc)
  const suma = wplata * ((Math.pow(1 + r, miesiace) - 1) / r);

  document.getElementById('wynik-oszczednosci').textContent = `Po ${miesiace} miesiącach oszczędności wyniosą: ${suma.toFixed(2)} PLN`;
}

// Kalkulator raty kredytu (raty równe)
function obliczRateKredytu() {
  const kwota = parseFloat(document.getElementById('kwota-kredytu').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-kredytu').value);
  const miesiace = parseInt(document.getElementById('okres-kredytu').value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(miesiace) || kwota <= 0 || oprocentowanie < 0 || miesiace <= 0) {
    document.getElementById('wynik-kredyt').textContent = 'Proszę podać poprawne wartości (oprocentowanie może być 0 lub większe).';
    return;
  }

  const r = (oprocentowanie / 100) / 12;

  let rata;

  if (r === 0) {
    rata = kwota / miesiace;
  } else {
    rata = kwota * r / (1 - Math.pow(1 + r, -miesiace));
  }

  document.getElementById('wynik-kredyt').textContent = `Twoja miesięczna rata: ${rata.toFixed(2)} PLN`;
}
