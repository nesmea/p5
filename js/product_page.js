// Request for recuperation of name and detail of the camera the client selected
fetch("http://localhost:3000/api/cameras/" + location.hash.substring(1))
    .then(response => response.json())
    .then(
        function(camera) {
            let cameraImage = createElement('img');
            cameraImage.setAttribute("src", camera.imageUrl);
            cameraImage.setAttribute('width', "100%");
            let container = document.getElementById('product');
            container.appendChild(cameraImage);

            let cameraName = document.getElementById('cameraName');
            cameraName.textContent = camera.name;

            for (let i = 0; i < camera.lenses.length; i++) {
                let dropdown = document.getElementById('select-lenses');
                let dropdownContent = createElement('option', camera.lenses[i]);
                dropdownContent.setAttribute("value", i)
                dropdown.appendChild(dropdownContent);
            }

            let addToCart = document.getElementById('ajout-panier');
            addToCart.onclick = function() {
                let selectElement = document.querySelector("select");
                let textSelect = selectElement.options[selectElement.selectedIndex].text;
                alert("Produit ajouté au panier !");

                let getPanier = localStorage.getItem("panier");
                let panier = [{name : camera.name, lenses : textSelect, price : camera.price / 100 + "€", id : camera._id}];
                if (getPanier !== null){
                    panier = panier.concat(JSON.parse(getPanier));
                }
                localStorage.setItem("panier", JSON.stringify(panier));
            };
        })