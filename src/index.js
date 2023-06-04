import {fetchBreeds, fetchCatByBreed} from './js/cat-api.js'
import {breedSelect, loader, catInfo, errorMessage} from './js/refs.js'

fetchBreeds()
.then(data => data.map(breed => `<option value=${breed.id}>${breed.name}</option>`).join(''))
.then(html => {
    breedSelect.innerHTML = html
})
.catch(error => {
    breedSelect.hidden = true;
    errorMessage.textContent = 'Oops! Something went wrong! Try reloading the page!';
    showErrorMessage();
})
.finally(() => {
    loader.hidden = true;
});

breedSelect.addEventListener('change', onCreateCatCard);

function onCreateCatCard() {
    fetchCatByBreed(breedSelect.value)
    .then(data => {
        renderCatInfo(data);
    })
    .catch(error => {
        errorMessage.textContent = 'Oops! Something went wrong! Try another cat!';
        showErrorMessage();
    })    
    .finally(() => {
        loader.hidden = true;
    });
}

function renderCatInfo(catData) {
    const { breeds, url } = catData;
    const [breedInfo] = breeds;

    const catImage = document.createElement('img');
    catImage.src = url;
    catImage.alt = breedInfo.name;
    catImage.style.maxWidth = '400px';
    catImage.style.marginTop = '20px';

    const breedName = document.createElement('h3');
    breedName.textContent = breedInfo.name;

    const description = document.createElement('p');
    description.textContent = breedInfo.description;

    const temperament = document.createElement('p');
    temperament.textContent = `Temperament: ${breedInfo.temperament}`;

    catInfo.innerHTML = '';
    catInfo.append(catImage, breedName, description, temperament);
    catInfo.hidden = false;
};

function showErrorMessage() {
    errorMessage.hidden = false;
    catInfo.hidden = true;
    loader.hidden = true;
};