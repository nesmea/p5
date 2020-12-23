// Used to change the display of 3 elements in the page
function changeDisplay() {
    panierPart.classList.add('d-none');
    formulaire.classList.add('d-none');
    validation.classList.add("d-none");
}

// Used to delete a line of the cart on click on the button "delete"
function deleteCartLine (i) {
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

// Used to calcul the total price of the cart
function calculPrix(products) {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price;
    }
    return totalPrice / 100;
}

// Used to createElement where is necessary
function createElement(element, textContent) {
    let newElement = document.createElement(element);
    newElement.textContent = textContent;
    return newElement;
}