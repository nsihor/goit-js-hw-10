import { breedSelect, loader, errorMessage, catInfo } from './refs.js'

const API_KEY = "live_JX7Cl70WmKbcf2YQASZ9ePLvqYa4PVuP0M6KdaEkMtiX6yOKS4FuSAsEi8I25n87";
const BASE_URL = "https://api.thecatapi.com/v1";

export function fetchBreeds () {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error();
        }
        return resp.json();
    })
    .catch(showErrorMessage)
};

export function fetchCatByBreed(breedId) {
    loader.hidden = false;

    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error();
        }
        return resp.json();
    })
    .then(data => data[0])
    .catch(showErrorMessage)
};

export function showErrorMessage() {
    errorMessage.hidden = false;
    breedSelect.hidden = true;
    catInfo.hidden = true;
    loader.hidden = true;
};