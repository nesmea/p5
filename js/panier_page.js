let panier = JSON.parse(localStorage.getItem("panier"));
let formPart = document.getElementById('form_part');
let panierPart = document.querySelector('table');
let validation = document.getElementById("validation");

function changeDisplay() {
    panierPart.classList.add('d-none');
    formPart.classList.add('d-none');
    validation.classList.add("d-none");
}

// SI LE PANIER EXISTE ->
if (panier !== null) {

    validation.classList.add("d-none");

    let panierVide = document.getElementById("message_vide");
    panierVide.classList.add("d-none");

    let tableau = document.querySelector("tbody");

    let productIds = [];

    for (let i = 0; i < panier.length; i++) {
        productIds.push(panier[i].id);
    }

    for (let i = 0; i < panier.length; i++) {

        // CREATION DES LIGNES DU TABLEAU EN FONCTION DU NOMBRES D'OBJETS DANS LE PANIER
        let indexLigne = document.createElement('th');
        indexLigne.innerHTML = i + 1;

        let nameProduct = document.createElement('td');
        nameProduct.textContent = panier[i].name;

        let lenseProduct = document.createElement('td');
        lenseProduct.textContent = panier[i].lenses;

        let priceProduct = document.createElement('td');
        priceProduct.textContent = panier[i].price;

        let suppTab = document.createElement("button");
        suppTab.innerHTML = "Delete";
        suppTab.classList.add("btn", "btn-danger", "mt-1");
        suppTab.onclick = function () {
            if (panier.length >= 2) {
                alert('Le produit a été retiré du panier !');
                let index = panier.indexOf(panier[i]);
                panier.splice(index, 1);
                localStorage.setItem('panier', JSON.stringify(panier));
                location.reload();
            } else if (panier.length === 1) {
                alert('Le produit a été retiré du panier !');
                localStorage.removeItem("panier");
                location.reload();
                changeDisplay();
                panierVide.classList.add("d-block");
            }
        }

        // AJOUT DE TOUS LES ELEMENTS DANS LA LIGNE DU TABLEAU ET DANS TABLEAU
        let ligneTableau = document.createElement('tr');
        ligneTableau.appendChild(indexLigne);
        ligneTableau.appendChild(nameProduct);
        ligneTableau.appendChild(lenseProduct);
        ligneTableau.appendChild(priceProduct);
        ligneTableau.appendChild(suppTab);

        tableau.appendChild(ligneTableau);
        panierPart.appendChild(tableau);
    }

    let formulaire = document.getElementById('formulaire');
    formulaire.onsubmit = function (event) {
        event.preventDefault()
        let formData = {
            contact: {
                firstName: document.getElementById("input1").value,
                lastName: document.getElementById("input2").value,
                city: document.getElementById("input3").value,
                address: document.getElementById("input3").value,
                email: document.getElementById("input5").value,
            },
            products : productIds,
        };
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(formData));

        request.onreadystatechange = function () {
            let response = JSON.parse(request.responseText);
            let url = new URL('http://localhost:63342/p5/panier/index.html');
            url.hash = response.orderId;
            let lessHash = url.hash.substring(1);
            console.log(response);

            // location.reload();
            changeDisplay();

            let prenomClient = document.getElementById("prenomClient");
            prenomClient.textContent = response.contact.lastName;

            let nomClient = document.getElementById("nomClient");
            nomClient.textContent = response.contact.lastName;

            let adresseClient = document.getElementById("adresseClient");
            adresseClient.textContent = response.contact.address;

            let villeClient = document.getElementById("villeClient");
            villeClient.textContent = response.contact.city;

            let validation = document.getElementById("validation");
            validation.classList.add("d-block");
            validation.style.marginTop = "15em";
            let titlePanier = document.getElementById("titlePanier");
            titlePanier.classList.add("d-none");
            let numeroCommande = document.getElementById("numeroCommande");
            numeroCommande.textContent = lessHash;
        };
    }
} else {
    changeDisplay();
}
