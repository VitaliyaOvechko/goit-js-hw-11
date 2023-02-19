export default class ImgApiService {
    constructor() {
        this.page = 1;
        this.per_page = 40;
        this.searchQuery = '';
    }

    getImages(){
const BASE_URL = 'https://pixabay.com/api/'

    return fetch
        (`${BASE_URL}?key=33743757-4b01b593e911c90aef060a87e&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`)
        .then((response) => response.json())
        .then((img) => {
            this.incrementPage();
            return img;
        });
    }
    
    incrementPage() {
    this.page += 1;
    }
    
    resetPage() {
    this.page = 1;
  }
}


// function fetchImg(query){
// const BASE_URL = 'https://pixabay.com/api/'
// fetch(`${BASE_URL}?key=33743757-4b01b593e911c90aef060a87e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
// .then((response) => {
//     if (!response.ok) {
//         throw new Error(response.status);
//     }
//     return response.json()
//     .then(data => {
//         console.log(data);
//   })
// //   .catch(error => {

// //   });
// })
// }


// function fetchImg(query){
// const BASE_URL = 'https://pixabay.com/api/'

// return fetch(`${BASE_URL}?key=33743757-4b01b593e911c90aef060a87e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
// .then((response) =>  response.json());
// }

// export default fetchImg;
