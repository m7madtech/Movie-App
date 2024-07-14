const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const nav = document.getElementById('navbar')
const search = document.getElementById('search')

getMovies(API_URL)

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showMoveis(data.results)
        })
        .catch(err => {console.error(err)})
}

function showMoveis(movies) {
    main.innerHTML='';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieE = document.createElement('div');
        movieE.classList.add('movie');

        movieE.innerHTML = `
        <img src=${IMG_PATH + poster_path} alt=${title}>
        <div class = 'movie-info'>
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class = 'overview'>
            <h3>Overview</h3>
            ${overview}
        </div>
        `

        main.appendChild(movieE)
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

