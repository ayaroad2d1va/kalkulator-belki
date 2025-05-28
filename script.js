// Kalkulator podatku Belki
function oblicz() {
  const kwota = parseFloat(document.getElementById("kwota").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie").value);
  const czas = parseFloat(document.getElementById("czas").value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(czas)) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const zysk = kwota * (oprocentowanie / 100) * (czas / 12);
  const podatekBelki = zysk * 0.19;
  const zyskNetto = zysk - podatekBelki;

  document.getElementById("wynik").textContent = `Zysk netto po podatku Belki: ${zyskNetto.toFixed(2)} PLN`;
}

// Kalkulator oszczędności
function obliczOszczednosci() {
  const wplata = parseFloat(document.getElementById("miesieczna-wplata").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie-oszczednosci").value);
  const okres = parseFloat(document.getElementById("okres-oszczednosci").value);

  if (isNaN(wplata) || isNaN(oprocentowanie) || isNaN(okres)) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  let saldo = 0;
  const miesiecznaStopa = (oprocentowanie / 100) / 12;

  for (let i = 0; i < okres; i++) {
    saldo += wplata;
    saldo += saldo * miesiecznaStopa;
  }

  document.getElementById("wynik-oszczednosci").textContent = `Saldo po ${okres} miesiącach: ${saldo.toFixed(2)} PLN`;
}

// Kalkulator raty kredytu
function obliczRateKredytu() {
  const kwota = parseFloat(document.getElementById("kwota-kredytu").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie-kredytu").value);
  const okres = parseFloat(document.getElementById("okres-kredytu").value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(okres)) {
    alert("Proszę wprowadzić poprawne wartości we wszystkich polach.");
    return;
  }

  const miesiecznaStopa = (oprocentowanie / 100) / 12;
  const rata = kwota * miesiecznaStopa / (1 - Math.pow(1 + miesiecznaStopa, -okres));

  document.getElementById("wynik-kredyt").textContent = `Miesięczna rata: ${rata.toFixed(2)} PLN`;
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
