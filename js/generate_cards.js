// Request GET for recuperation of all cameras and her details
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(
        function(cameras) {
            let container = document.getElementById('cards_container');

            for (let i = 0; i < cameras.length; i++) {
                let url = new URL('http://orinoco.alexis-nesme.com/product/product.html');
                url.hash = cameras[i]._id;

                let cameraImage = createElement('IMG');
                cameraImage.setAttribute("src", cameras[i].imageUrl);
                cameraImage.setAttribute('width', "100%");

                let cameraName = createElement('h2', cameras[i].name);
                cameraName.classList.add('py-3');

                let cameraLenses = createElement('p', cameras[i].lenses);
                let cameraLensesName = createElement('h4', "Lenses :");

                let cameraDescription = createElement('p', cameras[i].description);
                let cameraDescriptionName = createElement('h4');
                cameraDescriptionName.textContent = "Description :";

                let cameraPrice = createElement('p', cameras[i].price / 100 + "€");
                let cameraPriceName = createElement('h4', "Price :");

                let cameraProduct = createElement('a', "Personnaliser");
                cameraProduct.setAttribute("href", url);
                cameraProduct.classList.add('btn', 'btn-dark');

                let cardsBody = createElement('div');
                cardsBody.classList.add('card', 'd-flex', 'p-0');
                cardsBody.appendChild(cameraImage);
                cardsBody.appendChild(cameraName);
                cardsBody.appendChild(cameraLensesName);
                cardsBody.appendChild(cameraLenses);
                cardsBody.appendChild(cameraDescriptionName);
                cardsBody.appendChild(cameraDescription);
                cardsBody.appendChild(cameraPriceName);
                cardsBody.appendChild(cameraPrice);
                cardsBody.appendChild(cameraProduct);

                container.appendChild(cardsBody);
            }
    })