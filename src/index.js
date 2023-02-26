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

    let totalImg = 1;
    let imgPerPage = 1;
    let maxPage = 1;
    let currentPage = 1;

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

async function onFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim();
    imgApiService.resetPage() 
    clearGallery();

  imgApiService.searchQuery = value;
  
      if (imgApiService.searchQuery === "") {
        loadMoreBtn.hide();
        // throw new Error(onError());
        onError()
        return
        }
try {
    const images = await imgApiService.getImages();
  console.log(images);
  
    totalImg = images.totalHits;
    imgPerPage = imgApiService.per_page;
    maxPage = Math.ceil(totalImg / imgPerPage);
    currentPage = imgApiService.page - 1;
  
    if (images.hits.length === 0) {
      loadMoreBtn.hide();
      throw new Error(onError());
    }
    else if (currentPage === maxPage) {
      createMarkupImgList(images.hits);
      loadMoreBtn.hide();
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

    totalImg = images.totalHits;
    imgPerPage = imgApiService.per_page;
    maxPage = Math.ceil(totalImg / imgPerPage);
    currentPage = imgApiService.page - 1;

    // console.log(totalImg);
    // console.log(imgPerPage);
    // console.log(maxPage);
    // console.log(currentPage);

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
  <a class="photo-card-link" href="${largeImageURL}">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
        })
            .join('')
   galleryWrapper.insertAdjacentHTML("beforeend", markup);
  lightboxGallery.refresh();
  smoothlySkroll();
}

function onLastPage() {
  loadMoreBtn.hide();
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

let lightboxGallery = new SimpleLightbox('.gallery a', { captionDelay: 250, scrollZoom: false });

function smoothlySkroll() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}




