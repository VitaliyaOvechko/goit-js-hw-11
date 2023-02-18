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


function fetchImg(query){
const BASE_URL = 'https://pixabay.com/api/'

return fetch(`${BASE_URL}?key=33743757-4b01b593e911c90aef060a87e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
.then((response) =>  response.json());
}

export default fetchImg;