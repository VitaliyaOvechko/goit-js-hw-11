import fetchImg from './api';
import Notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
// const input = document.
const pictureWrapper = document.querySelector('.picture_wrapper');


fetchImg('cat').then(console.log);

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    console.log('hi');
}