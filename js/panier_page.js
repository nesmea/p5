let panier = JSON.parse(localStorage.getItem("panier"));

// SI LE PANIER EXISTE ->
if (panier !== null) {
    for (let i = 0; i < panier.length; i++) {

        // CREATION DU HEADER DU TABLEAU
        let thead = document.createElement("thead");
        let trThead = document.createElement("tr");

        let indexTab = document.createElement("th");
        indexTab.textContent = "#";
        let nameTab = document.createElement("th");
        nameTab.textContent = "Name";
        let lensesTab = document.createElement("th");
        lensesTab.textContent = "Lenses";
        let priceTab = document.createElement("th");
        priceTab.textContent = "Price";

        trThead.appendChild(indexTab);
        trThead.appendChild(nameTab);
        trThead.appendChild(lensesTab);
        trThead.appendChild(priceTab);
        trThead.appendChild(suppTab);

        thead.appendChild(trThead);

        // CREATION DES LIGNES DU TABLEAU EN FONCTION DU NOMBRES D'OBJETS DANS LE PANIER
        let indexLigne = document.createElement('th');
        indexLigne.textContent = i + 1;

        let nameProduct = document.createElement('td');
        nameProduct.textContent = localStorage.getItem(panier.name);

        let lenseProduct = document.createElement('td');
        lenseProduct.textContent = localStorage.getItem(panier.lenses);

        let priceProduct = document.createElement('td');
        priceProduct.textContent = localStorage.getItem(panier.price);

        let suppTab = document.createElement("td");
        let btnSuppTab = document.createElement("button");
        btnSuppTab.classList.add("btn", "btn-danger");
        btnSuppTab.textContent = "Retirer";
        suppTab.textContent = btnSuppTab;

        // AJOUT DE TOUS LES ELEMENTS DANS LA LIGNE DU TABLEAU
        let ligneTableau = document.createElement('tr');
        ligneTableau.appendChild(indexLigne);
        ligneTableau.appendChild(nameProduct);
        ligneTableau.appendChild(lenseProduct);
        ligneTableau.appendChild(priceProduct);
        ligneTableau.appendChild(suppTab);

        // CREATION DU TABLEAU ET AJOUT A CE MEME TABLEAU DE TOUS LES ELEMENTS PRECEDENTS
        let tabPart = document.getElementById("panier_part");
        let tableau = document.createElement("table");
        tableau.appendChild(thead);
        tableau.appendChild(ligneTableau);

        // CREATION DU BOUTON SUBMIT DU FORMULAIRE SI IL Y A DES ELEMENTS DANS LE PANIER ET AJOUT AU PIED DU FORMULAIRE
        let buttonSubmit = document.createElement("button");
        buttonSubmit.textContent = "Submit";
        buttonSubmit.classList.add("btn", "btn-primary");
        let formulaire = document.querySelector("form");
        formulaire.appendChild(buttonSubmit);
    }
} else {
    // SINON, SI LE PANIER N'EXISTE PAS, UN MESSAGE PANIER VIDE APPARAIT A LA PLACE DU TABLEAU ET LE FORMULAIRE DISPARAIT
    let formulaire = document.getElementById("form_part");
    formulaire.classList.add('d-none');

    let divPanierVide = document.getElementById('message_vide');
    let msgPanierVide = document.createElement('p');
    msgPanierVide.textContent = "Votre panier est vide !";
    msgPanierVide.classList.add('text-center');
    divPanierVide.appendChild(msgPanierVide);
}
