let locationHash = location.hash;
let lessHash = locationHash.substring(1);

let requestURL = 'http://localhost:3000/api/cameras/' + lessHash;
let requestProduct = new XMLHttpRequest();
requestProduct.open('GET', requestURL);
requestProduct.responseType = 'json';
requestProduct.send();

requestProduct.onload = function() {
    generateProduct(requestProduct.response);
}

function generateProduct(camera){
    let cameraImage = document.createElement('img');
    cameraImage.setAttribute("src", camera.imageUrl);
    cameraImage.setAttribute('width', "100%");
    cameraImage.style.borderRadius = "10%";

    let container = document.getElementById('product');
    container.appendChild(cameraImage);

    let cameraName = document.getElementById('cameraName');
    cameraName.textContent = camera.name;
    cameraName.style.fontWeight = "bolder";
    cameraName.style.fontSize = "100px";

    let recupLenses = camera.lenses;
    for (let i = 0; i < recupLenses.length; i++) {
        let dropdown = document.getElementById('select-lenses');
        let dropdownContent = document.createElement('option');
        dropdownContent.setAttribute("value", i)
        dropdownContent.textContent = camera.lenses[i];
        dropdown.appendChild(dropdownContent);
    }

    let addToCart = document.getElementById('ajout-panier');
    addToCart.onclick = function(){
        let selectElmt = document.querySelector("select");
        let textSelect = selectElmt.options[selectElmt.selectedIndex].text;
        alert("Produit ajouté au panier !");

        let getPanier = localStorage.getItem("panier");
        let panier = [{name : camera.name, lenses : textSelect, price : camera.price + "€", id : camera._id}];
        if (getPanier !== null){
            panier = panier.concat(JSON.parse(getPanier));
        }
        localStorage.setItem("panier", JSON.stringify(panier));

        console.log(panier);
    }
}