function oblicz() {
  const kwota = parseFloat(document.getElementById("kwota").value);
  const oprocentowanie = parseFloat(document.getElementById("oprocentowanie").value);
  const czas = parseFloat(document.getElementById("czas").value);

  if (isNaN(kwota) || isNaN(oprocentowanie) || isNaN(czas)) {
    document.getElementById("wynik").innerText = "Wprowadź poprawne dane.";
    return;
  }

  const zyskBrutto = kwota * (oprocentowanie / 100) * (czas / 12);
  const podatek = zyskBrutto * 0.19;
  const zyskNetto = zyskBrutto - podatek;

  document.getElementById("wynik").innerHTML =
    `<strong>Zysk brutto:</strong> ${zyskBrutto.toFixed(2)} zł<br>
     <strong>Podatek Belki (19%):</strong> ${podatek.toFixed(2)} zł<br>
     <strong>Zysk netto:</strong> ${zyskNetto.toFixed(2)} zł`;
}
