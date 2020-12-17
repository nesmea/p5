// Recuperation in DOM of all elements who will be used in the script
let panier = JSON.parse(localStorage.getItem("panier"));
let containerValidation = document.getElementById("container-validation");
let containerPanier = document.getElementById("panier_part");
let containerForm = document.getElementById('form_part');
let formulaire = document.getElementById("formulaire");
let panierPart = document.querySelector('table');
let validation = document.getElementById("validation");

// Used to change the display of 3 elements in the page
function changeDisplay() {
    containerPanier.classList.add('d-none');
    containerForm.classList.add('d-none');
    containerValidation.classList.add("d-none");
}

// Used to calcul the total price of the cart
function calculPrix(products) {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price;
    }
    return totalPrice;
}

// Used to delete a line of the cart on click on the button "delete"
function deleteCartLine () {
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
        suppTab.onclick = deleteCartLine();

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
                })
    }
} else {
    // Else, if the cart don't exist, I hide all elements and I put a text "Cart is empty"
    changeDisplay();
    validation.classList.add('d-none');
}
