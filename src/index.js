import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css'
import {fetchBreeds, fetchCatByBreed} from './js/cat-api.js'
import {loader, catInfo, errorMessage} from './js/refs.js'

const breedSelect = new SlimSelect({
  select: '#single',
  settings: {
    placeholderText: 'Fill the cat`s name',
  },
  events: {
    afterChange: (newVal) => {
      onCreateCatCard(newVal)    
    }
  }
})

fetchBreeds()
.then(data => data.map(breed => ({
  value: breed.id,
  text: breed.name
})))
.then(html => {
    breedSelect.setData(html);
})
.catch(error => {
    // breedSelect.hidden = true;
    errorMessage.textContent = 'Oops! Something went wrong! Try reloading the page!';
    showErrorMessage();
})
.finally(() => {
    loader.classList.add('is-hidden');
});


function onCreateCatCard(arr) {
  errorMessage.hidden = true;
  catInfo.innerHTML = '';
  loader.classList.remove('is-hidden');

  fetchCatByBreed(arr[0].value)
  .then(data => {
      renderCatInfo(data);
  })
  .catch(error => {
      errorMessage.textContent = 'Oops! Something went wrong! Try another cat!';
      showErrorMessage();
  })    
  .finally(() => {
    loader.classList.add('is-hidden');  });
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
    loader.classList.add('is-hidden');
};