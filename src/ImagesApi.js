import axios from "axios";

export default class ImgApiService {

    constructor() {
        this.page = 1;
        this.per_page = 40;
        this.searchQuery = '';
    }

    async getImages() {
        const BASE_URL = 'https://pixabay.com/api/'

        const URL = `${BASE_URL}?key=33743757-4b01b593e911c90aef060a87e&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
        const response = await axios.get(URL);
        this.incrementPage();
        return response.data;
        
    }

    incrementPage() {
    this.page += 1;
    }
    
    resetPage() {
    this.page = 1;
  }
}
