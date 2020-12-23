// Recuperation in DOM of all elements who will be used in the script
let panier = JSON.parse(localStorage.getItem("panier"));
let formulaire = document.getElementById("formulaire");
let panierPart = document.querySelector('table');
let validation = document.getElementById("validation");

// If the cart exist :
if (panier !== null) {
    validation.classList.add("d-none");

    let panierVide = document.getElementById("message_vide");
    panierVide.classList.add("d-none");

    let tableau = document.querySelector("tbody");

    let productIds = [];

    for (let i = 0; i < panier.length; i++) {
        productIds.push(panier[i].id);
    }

    // For each object in the cart, I create a line in the table with all her details
    for (let i = 0; i < panier.length; i++) {

        let indexLigne = document.createElement('th');
        indexLigne.textContent = i + 1;

        let nameProduct = document.createElement('td');
        nameProduct.textContent = panier[i].name;

        let lenseProduct = document.createElement('td');
        lenseProduct.textContent = panier[i].lenses;

        let priceProduct = document.createElement('td');
        priceProduct.textContent = panier[i].price;

        let suppTab = document.createElement("button");
        suppTab.innerHTML = "Delete";
        suppTab.classList.add("btn", "btn-danger");
        suppTab.onclick = deleteCartLine;

        let ligneTableau = document.createElement('tr');
        ligneTableau.appendChild(indexLigne);
        ligneTableau.appendChild(nameProduct);
        ligneTableau.appendChild(lenseProduct);
        ligneTableau.appendChild(priceProduct);
        ligneTableau.appendChild(suppTab);

        tableau.appendChild(ligneTableau);
        panierPart.appendChild(tableau);
    }

    // Request POST for sending the order of the client on the server
    formulaire.onsubmit = function (event) {
        event.preventDefault()
        let formData = {
            contact: {
                firstName: document.getElementById("inputFName").value,
                lastName: document.getElementById("inputLName").value,
                city: document.getElementById("inputCity").value,
                address: document.getElementById("inputAddress").value,
                email: document.getElementById("inputEmail").value,
            },
            products: productIds,
        };

        fetch("http://localhost:3000/api/cameras/order", {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            method: "POST",
        })
            .then(response => response.json())
            .then(
                (response) => {
                    changeDisplay();
                    validation.classList.add('d-block');

                    document.getElementById("prenomClient").textContent = response.contact.firstName;

                    document.getElementById("nomClient").textContent = response.contact.lastName;

                    document.getElementById("adresseClient").textContent = response.contact.address;

                    document.getElementById("villeClient").textContent = response.contact.city;

                    document.getElementById("validation").classList.add("d-block");

                    document.getElementById("titlePanier").classList.add("d-none");

                    document.getElementById("prix").innerHTML = calculPrix(response.products) + "€";

                    document.getElementById("numeroCommande").textContent = response.orderId;

                    localStorage.clear();
                })
    }
} else {
    // Else, if the cart don't exist, I hide all elements and I put a text "Cart is empty"
    changeDisplay();
    validation.classList.add('d-none');
}
