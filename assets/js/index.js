/*
const api="https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=8c5973b82ab5c5467599f6f0c8a160eb";
fetch(api)
.then((response) => response.json())
  .then((data) => console.log(data));
  */
const apiKey = "api_key=8c5973b82ab5c5467599f6f0c8a160eb";
const baseUrl = "https://api.themoviedb.org/3/";
const popularMoviesUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imageUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = baseUrl + '/search/movie?' + apiKey;

const genre = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
]

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const tagEl = document.getElementById('tag')
const favEl = document.getElementById('favorites')

setGenre();
var selectedGenre = []
function setGenre() {
    tagEl.innerHTML = ""
    genre.forEach(genres => {
        const gElement = document.createElement('div')
        gElement.classList.add('tag')
        gElement.id = genres.id
        gElement.innerText = genres.name
        gElement.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genres.id)
            }
            else {
                if (selectedGenre.includes(genres.id)) {
                    selectedGenre.forEach((id, positionOfEl) => {
                        if (id == genres.id) {  //checking element already exist
                            selectedGenre.splice(positionOfEl, 1)  //remove that particular element from array
                        }
                    })
                }
                else {
                    selectedGenre.push(genres.id)
                }
            }
            console.log(selectedGenre)
            fetchPopularMovies(popularMoviesUrl + '&with_genres=' + encodeURI(selectedGenre.join(',')));//it takes all the elements in the array into string and seperate by comma
            var elmnt = document.getElementById("heading");
            elmnt.scrollIntoView();
        })
        tagEl.appendChild(gElement)
    })
}

fetchPopularMovies(popularMoviesUrl);
function fetchPopularMovies(url) {
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            console.log(data.results)
            if (data.results.length !== 0) {
                showPopularMovies(data.results);
            }
            else {
                main.innerHTML = `<h1 style="color:red;">No Results Found</h1>`
            }
        })
}

function showPopularMovies(data) {
    main.innerHTML = ``;
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        mId = movie.id
        // console.log(mId)
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        movieDiv.innerHTML = `
        <div class="movie">
            <img src="${poster_path ? imageUrl + poster_path : "https://chica.fashion/wp-content/uploads/2014/07/placehold.it-500x750-1.gif"}" alt="${title}" >
            <div class="movie-info">
                <h2 id="movie-name">${title}</h2>
                <span class="${getColor(vote_average)}" id="rating">${vote_average}</span>
            </div>
            <div class="description">
            <h2 id="movie-name" style="color: #240046;">${title}</h2>
            <button id="${id}" class="fav" style="background-color:red; color:white;border:none;border-radius:50px;padding:.5rem;cursor:pointer;" onclick="setFav(this.id)">Favorite</button>
                <h3>${overview}</h3>
            </div>
        </div>`
        main.appendChild(movieDiv);
        // <button style="background-color:blue; color:white;border:none;border-radius:50px;padding:.5rem;cursor:pointer;">Watch Now</button>
    });
}
function getColor(average) {
    if (average >= 7) {
        return 'green';
    } else if (average >= 5 && average < 7) {
        return 'orange';
    } else {
        return 'red';
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchValue = search.value;
    if (searchValue) {
        fetchPopularMovies(searchUrl + '&query=' + searchValue)
        var elmnt = document.getElementById("heading");
        elmnt.scrollIntoView();
    }
    else {
        fetchPopularMovies(popularMoviesUrl);
        var elmnt = document.getElementById("heading");
        elmnt.scrollIntoView();
    }
})
// var favArr = []
// function setFav(id) {
//     console.log(id)
//     favAPI = "https://api.themoviedb.org/3/movie/" + id + "?api_key=8c5973b82ab5c5467599f6f0c8a160eb";
//     fetch(favAPI)
//         .then((response) => response.json())
//         .then(data => {
//             favorites(data);
//         })
// }
// function favorites(data) {
//     favEl.innerHTML = ""
//     data.forEach(datas => {
//         const fElement = document.createElement('div')
//         fElement.classList.add('favorites')
//         fElement.id = datas.id
//         if (favArr.length == 0) {
//             favArr.push(datas)
//         }
//         else {
//             if (favArr.includes(datas)) {
//                 favArr.forEach((id, positionOfEl) => {
//                     if (id == datas.id) {  //checking element already exist
//                         favArr.splice(positionOfEl, 1)  //remove that particular element from array
//                     }
//                 })
//             }
//             else {
//                 favArr.push(datas)
//             }
//         }
//     })
//     console.log(favArr)
//     favEl.appendChild(fElement)
// }

