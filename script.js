function oblicz() {
  const kwota = parseFloat(document.getElementById('kwota').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie').value) / 100;
  const czas = parseInt(document.getElementById('czas').value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(czas) || kwota <= 0 || oprocentowanie <= 0 || czas <= 0) {
    document.getElementById('wynik').textContent = 'Proszę wypełnić wszystkie pola poprawnie i wpisać wartości większe od zera.';
    return;
  }

  const zysk = kwota * oprocentowanie * (czas / 12);
  const podatek = zysk * 0.19;

  document.getElementById('wynik').textContent = `Podatek Belki do zapłaty: ${podatek.toFixed(2)} PLN`;
}

function obliczOszczednosci() {
  const wplata = parseFloat(document.getElementById('miesieczna-wplata').value);
  const oprocentowanie = parseFloat(document.getElementById('oprocentowanie-oszczednosci').value) / 100;
  const miesiace = parseInt(document.getElementById('okres-oszczednosci').value);

  if (isNaN(wplata) || isNaN(oprocentowanie) || isNaN(miesiace) || wplata <= 0 || oprocentowanie <= 0 || miesiace <= 0) {
    document.getElementById('wynik-oszczednosci').textContent = 'Proszę wypełnić wszystkie pola poprawnie i wpisać wartości większe od zera.';
    return;
  }

  const miesiecznaStopa = oprocentowanie / 12;
  const suma = wplata * ((Math.pow(1 + miesiecznaStopa, miesiace) - 1) / miesiecznaStopa);

  document.getElementById('wynik-oszczednosci').textContent = `Szacowana wartość oszczędności: ${suma.toFixed(2)} PLN`;
}
