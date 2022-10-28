/*
const api="https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=8c5973b82ab5c5467599f6f0c8a160eb";
fetch(api)
.then((response) => response.json())
  .then((data) => console.log(data));
  */

const apiKey = "api_key=8c5973b82ab5c5467599f6f0c8a160eb";
const baseUrl = "https://api.themoviedb.org/3/";
const popularMoviesUrl = baseUrl + "/discover/movie?primary_release_year=2020&sort_by=vote_average.desc&" + apiKey;
const imageUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = baseUrl + '/search/movie?' + apiKey;

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

fetchPopularMovies(popularMoviesUrl);
function fetchPopularMovies(url) {
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            console.log(data.results)
            showPopularMovies(data.results);
        })
}

function showPopularMovies(data) {
    main.innerHTML = ``;
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
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
                  <h3>${overview}</h3>
                  
              </div>
          </div>`
        main.appendChild(movieDiv);
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
        var elmnt = document.getElementById("main");
        elmnt.scrollIntoView();
    }
    else {
        fetchPopularMovies(popularMoviesUrl);
        var elmnt = document.getElementById("heading");
        elmnt.scrollIntoView();
    }
})