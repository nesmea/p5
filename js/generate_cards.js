let requestURL = 'http://localhost:3000/api/cameras';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    generateCards(request.response);
}

function generateCards(cameras) {

    let container = document.getElementById('cards_container');

    for (let i = 0; i < cameras.length; i++) {

        let url = new URL('http://localhost:63342/p5/product.html');
        url.hash = cameras[i]._id;

        let cameraImage = document.createElement('IMG');
        cameraImage.setAttribute("src", cameras[i].imageUrl);
        cameraImage.setAttribute('width', "100%");
        // container.appendChild(cameraImage);

        let cameraName = document.createElement('h2');
        cameraName.textContent = cameras[i].name;
        cameraName.classList.add('py-3');
        // container.appendChild(cameraName);

        let cameraLenses = document.createElement('p');
        cameraLenses.textContent = cameras[i].lenses;
        let cameraLensesName = document.createElement('h4');
        cameraLensesName.textContent = "Lenses :";
        // container.appendChild(cameraLensesName);
        // container.appendChild(cameraLenses);

        let cameraDescription = document.createElement('p');
        cameraDescription.textContent = cameras[i].description;
        let cameraDescriptionName = document.createElement('h4');
        cameraDescriptionName.textContent = "Description :";
        // container.appendChild(cameraDescriptionName);
        // container.appendChild(cameraDescription);

        let cameraPrice = document.createElement('p');
        cameraPrice.textContent = cameras[i].price + "€";
        let cameraPriceName = document.createElement('h4');
        cameraPriceName.textContent = "Price :";
        // container.appendChild(cameraPriceName);
        // container.appendChild(cameraPrice);

        let cameraProduct = document.createElement('a');
        cameraProduct.textContent = "Personnaliser";
        cameraProduct.setAttribute("href", url);
        cameraProduct.classList.add('btn', 'btn-dark');

        let cardsBody = document.createElement('div');
        cardsBody.classList.add('card', 'col-4', 'd-flex', 'mx-2', 'my-2', 'p-0');
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
}