import ImgApiService from './ImagesApi';
import LoadMoreBtn from './LoadMoreBtn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById('search-form');
const galleryWrapper = document.querySelector('.gallery');

const imgApiService = new ImgApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: ".load-more",
    isHidden: true,
});

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

async function onFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim();
    imgApiService.resetPage() 
    clearGallery();

    imgApiService.searchQuery = value;

try {
    const images = await imgApiService.getImages();
    console.log(images);

    if (imgApiService.searchQuery === "") {
      loadMoreBtn.hide();
      throw new Error(onError());
        }
    else if (images.hits.length === 0) {
      loadMoreBtn.hide();
      throw new Error(onError());
    }
    else {
      createMarkupImgList(images.hits);
      loadMoreBtn.show();
      loadMoreBtn.enable();

      Notiflix.Notify.success(`"Hooray! We found ${images.totalHits } images."`);
    }
  } catch (error) {
    console.error(error);
    clearGallery();
  }

}

function onError(error) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}


function clearGallery() {
    galleryWrapper.innerHTML = "";
}

async function fetchImages() {
  loadMoreBtn.disable();
  try {
    const images = await imgApiService.getImages();
    console.log(images);

    const totalImg = images.totalHits;
    const imgPerPage = images.hits.length;
    const maxPage = Math.ceil(totalImg / imgPerPage);
    const currentPage = imgApiService.page - 1;

    if (imgApiService.searchQuery === "") {
      loadMoreBtn.hide();
      throw new Error(onError());
        }
    else if (images.hits.length === 0) {
      loadMoreBtn.hide();
      throw new Error(onError());
    }
    else if (currentPage === maxPage) {
      onLastPage();
      }
    else {
      createMarkupImgList(images.hits);
      loadMoreBtn.show();
      loadMoreBtn.enable();
    }
  } catch (error) {
    console.error(error);
    clearGallery();
  }
}


function createMarkupImgList(image) {
        const markup = image.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
          return `<div class="photo-card">
        <a href="${largeImageURL}">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
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
    // lightboxGallery.refresh();
}

function onLastPage() {
  loadMoreBtn.hide();
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

// const lightboxGallery = new SimpleLightbox('.gallery a', { captionDelay: 250, scrollZoom: false });

let lightboxGallery = new SimpleLightbox('.gallery a');