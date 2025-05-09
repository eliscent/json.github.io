// Haetaan JSON-tiedosto
fetch('tietue.json')
    .then(function(response) {
        return response.json(); // Muutetaan JS-olioksi
    })
    .then(function(responseJson) {
        kerro(responseJson); // Kutsutaan varsinaista näyttöfunktiota
    })
    .catch(function(error) {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });

// Näyttää tietueen sisällön
function kerro(obj) {
    let tiedot = "<h1>" + obj.otsikko + "</h1><br>" 
               + obj.kuvaus + "<br><hr>";

    tiedot += "<p><img src='" + obj.kuva + "' alt='Kuva'></p>";

    tiedot += "<h3>Opintojakso</h3>"
            + "Nimi: " + obj.opintojakso.nimi + "<br>"
            + "Tunnus: " + obj.opintojakso.tunnus + "<br>"
            + "Opintopisteet: " + obj.opintojakso.opintopisteet + "<br><hr>";

    // Toteutus (valinnainen)
    if (obj.toteutus) {
        tiedot += "<h3>Toteutus</h3>"
                + "Nimi: " + obj.toteutus.nimi + "<br>"
                + "Alkamisaika: " + obj.toteutus.alkamisaika + "<br>"
                + "Loppumisaika: " + obj.toteutus.loppumisaika + "<br>"
                + "Kesto viikkoina: " + obj.toteutus.kesto_viikkoina + "<br>"
                + "Osallistujien lukumäärä: " + obj.toteutus.osallistujien_lukumäärä + "<br>";

        if (obj.toteutus.osallistujat) {
            tiedot += "Osallistujat:<ul>";
            for (let i = 0; i < obj.toteutus.osallistujat.length; i++) {
                tiedot += "<li>" + obj.toteutus.osallistujat[i] + "</li>";
            }
            tiedot += "</ul><hr>";
        }
    }

    // Sisältö (valinnainen)
    if (obj.sisalto) {
        tiedot += "<h3>Sisältö</h3><ul>";
        for (let i = 0; i < obj.sisalto.length; i++) {
            tiedot += "<li>" + obj.sisalto[i] + "</li>";
        }
        tiedot += "</ul><hr>";
    }

    // Aiheet + linkit
    tiedot += "<p><h3> Aiheet </h3>";
    for (let i = 0; i < obj.tekniikat.length; i++) {
        tiedot += "<b>Aihe: " + obj.tekniikat[i].aihe + "</b> ";
        tiedot += "<a href='" + obj.tekniikat[i].linkki + "'>" 
                + obj.tekniikat[i].linkki + "</a><br>";
    }
    tiedot += "</p>";

    // Lopuksi näytetään kaikki tiedot sivulla
    document.getElementById("vastaus").innerHTML = tiedot;
}
