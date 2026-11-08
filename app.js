let destinacii = [
    { ime: "Охрид", trosok: 200, kategorija: "Плажа" },
    { ime: "Маврово", trosok: 150, kategorija: "Планина" },
    { ime: "Скопје", trosok: 100, kategorija: "Град" }
];
let sliki = [
    { grad: "Охрид", url: "ohrid.jpg", lajk: 0, dislajk: 0, komentari: [] },
    { grad: "Маврово", url: "marvrovo.jpeg", lajk: 0, dislajk: 0, komentari: [] },
    { grad: "Скопје", url: "skopje.jpg", lajk: 0, dislajk: 0, komentari: [] }
];
function prikaziDestinacii() {
    let filterKat = document.getElementById("filterKategorija").value;
    let maxBudget = document.getElementById("maxBudget").value;

    let html = "";
    for (let i = 0; i < destinacii.length; i++) {
        let d = destinacii[i];

        if (filterKat != "site" && d.kategorija != filterKat) {
            continue;
        }
        if (maxBudget != "" && d.trosok > Number(maxBudget)) {
            continue;
        }

        html = html + "<div class='col-md-4 mb-3'>";
        html = html + "  <div class='card'>";
        html = html + "    <div class='card-body'>";
        html = html + "      <h5 class='card-title'>" + d.ime + "</h5>";
        html = html + "      <p class='card-text'>Категорија: " + d.kategorija + "</p>";
        html = html + "      <p class='card-text'>Трошок: " + d.trosok + " €</p>";
        html = html + "      <button class='btn btn-danger btn-sm' onclick='izbrisi(" + i + ")'>Избриши</button>";
        html = html + "    </div>";
        html = html + "  </div>";
        html = html + "</div>";
    }
    document.getElementById("listaDestinacii").innerHTML = html;
    presmetajTrosoci();
}
function prikaziGalerija() {
    let html = "";
    for (let i = 0; i < sliki.length; i++) {
        let s = sliki[i];
        html = html + "<div class='col-md-4 mb-3'>";
        html = html + "  <div class='card'>";
        html = html + "    <img src='" + s.url + "' class='card-img-top' style='height:200px; object-fit:cover'>";
        html = html + "    <div class='card-body'>";
        html = html + "      <h5 class='card-title'>" + s.grad + "</h5>";
        html = html + "      <button class='btn btn-success btn-sm' onclick='lajkni(" + i + ")'>👍 " + s.lajk + "</button>";
        html = html + "      <button class='btn btn-danger btn-sm' onclick='dislajkni(" + i + ")'>👎 " + s.dislajk + "</button>";
        html = html + "      <hr>";
        html = html + "      <input type='text' id='komentar" + i + "' class='form-control form-control-sm mb-1' placeholder='Коментар...'>";
        html = html + "      <button class='btn btn-primary btn-sm mb-2' onclick='dodajKomentar(" + i + ")'>Испрати</button>";
        for (let k of s.komentari) {
            html = html + "<p class='small mb-0'> " + k + "</p>";
        }
        html = html + "    </div>";
        html = html + "  </div>";
        html = html + "</div>";
    }
    document.getElementById("listaGalerija").innerHTML = html;
}

prikaziGalerija();

function lajkni(i) {
    sliki[i].lajk = sliki[i].lajk + 1;
    prikaziGalerija();
}

function dislajkni(i) {
    sliki[i].dislajk = sliki[i].dislajk + 1;
    prikaziGalerija();
}

function dodajKomentar(i) {
    let polje = document.getElementById("komentar" + i);
    let tekst = polje.value;
    if (tekst != "") {
        sliki[i].komentari.push(tekst);
        prikaziGalerija();
    }
}

function izbrisi(i) {
    destinacii.splice(i, 1);
    prikaziDestinacii();
}
function presmetajTrosoci() {
    let vkupno = 0;
    for (let d of destinacii) {
        vkupno = vkupno + d.trosok;
    }
    let prosek = 0;
    if (destinacii.length > 0) {
        prosek = vkupno / destinacii.length;
    }

    let html = "";
    html = html + "<div class='alert alert-info'>";
    html = html + "Вкупно: " + vkupno + " € | Просечно: " + prosek.toFixed(2) + " €";
    html = html + "</div>";
    document.getElementById("presmetka").innerHTML = html;
}
prikaziDestinacii();
document.getElementById("formaDestinacija").onsubmit = function(event) {
    event.preventDefault();

    let ime = document.getElementById("imeGrad").value;
    let trosok = document.getElementById("trosok").value;
    let kategorija = document.getElementById("kategorija").value;

    let nov = { ime: ime, trosok: Number(trosok), kategorija: kategorija };
    destinacii.push(nov);

    prikaziDestinacii();

    document.getElementById("imeGrad").value = "";
    document.getElementById("trosok").value = "";
};
document.getElementById("formaAnketa").onsubmit = function(event) {
    event.preventDefault();

    let ime = document.getElementById("anketaIme").value;
    let ocena = document.getElementById("anketaOcena").value;
    let komentar = document.getElementById("anketaKomentar").value;

    let interes = "";
    let radios = document.getElementsByName("interes");
    for (let r of radios) {
        if (r.checked) {
            interes = r.value;
        }
    }

    let html = "<div class='alert alert-success'>";
    html = html + "Благодариме, " + ime + "! Твоја оцена: " + ocena;
    html = html + ", интерес: " + interes + ".";
    html = html + "</div>";
    document.getElementById("rezultatAnketa").innerHTML = html;
};