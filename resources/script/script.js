import {getGenre, genreList, searchMovie, movieDetails} from "./moviedb.js";
const menBtn = document.querySelector(".menu-btn");
// Menu Events

menBtn.addEventListener("mouseenter", () => {
    menBtn.classList.add("hover"); 
});
menBtn.addEventListener("mouseleave", () => {
    menBtn.classList.remove("hover");
});

// Populate genres
const listOfGenres = await getGenre();
const populateListOfGenre = list => {
    const optionList = document.querySelector(".menu-options");
    list.forEach(genre => {
        let listItem = document.createElement("li");
        listItem.class = "generated-option";
        listItem.dataset.genreId = genre.id;
        listItem.innerText = genre.name;
        optionList.appendChild(listItem);
        //Set the event listeners to open the movies page and pass genre id
        listItem.addEventListener("click", () => {
            location.assign(`/resources/html/movies.html?movieQuery=${genre.id}`);
        });
    });
};

populateListOfGenre(listOfGenres);



// Populate Movie Cards

function returnSearchParams() {
    const parameter = new URLSearchParams(document.location.search);
    const searchQuery = parameter.get("searchQuery");
    const movieQuery = parameter.get("movieQuery");
    const movieIdQuery = parameter.get("movieId");
    const extractedParams = {searchQuery, movieQuery, movieIdQuery};
    return extractedParams;
};

const populateMovieList = (movieList) => {
    const select = document.querySelector(".movieList");
    movieList.forEach(movie => {
        let listItem = document.createElement("li");
        let html = 
        `<a href="./moviePage.html?movieId=${movie.id}" class="moviePageLink" data-movieId="${movie.id}">
        <figure>
            <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="The poster for the movie " class="poster">
            <figcaption class="title">${movie.title}</figcaption>
        </figure>
        </a>`;
        listItem.innerHTML = html;
        select.appendChild(listItem);
    });    
};

const populateListPage = async () => {
    const string = location.href;
    const regex = /movies.html/;
    const {searchQuery, movieQuery} = returnSearchParams();
    if (regex.test(string)) {
        
        if (movieQuery!==null) {
            let currentMovieList = await genreList(movieQuery);
            populateMovieList(currentMovieList);
        } else if (searchQuery!==null) {
            let currentMovieList = await searchMovie(searchQuery);
            populateMovieList(currentMovieList);
        } else {
            alert ("Something went wrong!")
        }
    };
};

populateListPage();

// Movie Details Section



const populateMovieDetails = movieDetails => {
    const select = document.querySelector(".movieDetails");
    const html = `<div class="posterDetails" style="background-image:url('https://image.tmdb.org/t/p/original${movieDetails.poster_path}');">
    </div>
    <div class="descriptionDetails">
        <h2>${movieDetails.title}</h2>
        <h3>${movieDetails.tagline}</h3>
        <p>
            ${movieDetails.overview}
        </p>
        <h3>Release date</h3>
        <p> 
            ${movieDetails.release_date}
        </p>
        <h3>User score</h3>
        <p> 
            ${movieDetails.vote_average} / 10
        </p>
    </div>           
    <div class="budgetDetails">
        <h3>Budget (USD) </h3>
        <p> 
            ${movieDetails.budget.toLocaleString('en-US')} $
        </p>
        <h3>Revenue (USD) </h3>
        <p> 
            ${movieDetails.revenue.toLocaleString('en-US')} $
        </p>
    </div>`;
    select.innerHTML = html;
};

const populateDetailsPage = async () => {
    const string = location.href;
    const regex = /moviePage.html/;
    const {movieIdQuery} = returnSearchParams();
    if (regex.test(string)) {
        
        let details = await movieDetails(movieIdQuery);
        populateMovieDetails(details);
        console.log(details);
    };
};

populateDetailsPage();



