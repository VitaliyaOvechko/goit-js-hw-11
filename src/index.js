import ImgApiService from './ImagesApi';
import LoadMoreBtn from './LoadMoreBtn';
import Notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const galleryWrapper = document.querySelector('.gallery');

const imgApiService = new ImgApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: ".load-more",
    isHidden: true,
});

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim();
    imgApiService.resetPage() 
    clearGallery();

    imgApiService.searchQuery = value;

    fetchImages();
    // loadMoreBtn.show();
}

function onError(error) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function clearGallery() {
    galleryWrapper.innerHTML = "";
}

function fetchImages() {
    loadMoreBtn.disable();
    return imgApiService.getImages()
    .then(data => {
        if (imgApiService.searchQuery === "") {
            throw new Error(onError());
        }
        else if (data.hits.length === 0) {
            throw new Error(onError());
        }
        else {
            createMarkupImgList(data.hits);
            loadMoreBtn.show();
            loadMoreBtn.enable();
        }
    })
        .catch((onError) => {
         clearGallery();
        })
}

function createMarkupImgList(image) {
        const markup = image.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
    </div>`;
        })
            .join('')

        return galleryWrapper.insertAdjacentHTML("beforeend", markup);
        console.log(markup);
}
