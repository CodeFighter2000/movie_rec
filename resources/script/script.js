import {getGenre, genreList, searchMovie, movieDetails} from "./moviedb.js";
const menBtn = document.querySelector(".menu-btn");

menBtn.addEventListener("mouseenter", () => {
    menBtn.classList.add("hover");
});
menBtn.addEventListener("mouseleave", () => {
    menBtn.classList.remove("hover");
});

// Generate List of Movie Cards
let testList = await genreList(878);

const populateMovieList = (movieList) => {
    const select = document.querySelector(".movieList");
    movieList.forEach(movie => {
        let listItem = document.createElement("li");
        let html = 
        `<a href="#" class="moviePageLink" data-movieId="${movie.id}">
        <figure>
            <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="The poster for the movie " class="poster">
            <figcaption class="title">${movie.title}</figcaption>
        </figure>
        </a>`
        listItem.innerHTML = html;
        select.appendChild(listItem);
    });

};

populateMovieList(testList);
