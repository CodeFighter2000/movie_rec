// API details
const apiKey = "8fa5c6b59a1f956807eb0c067b928258";
const tmbBaseUrl = "https://api.themoviedb.org/3";

//GET Movie Genre List

const getGenre = async () => {
    const endPoint = "/genre/movie/list";
    const requestParams = `?api_key=${apiKey}`;
    const urlToFetch = `${tmbBaseUrl}${endPoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch, {method: "GET"});
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
        return new Error("Network error");
    } catch (error) {
        console.log(error);
    }
};

//GET Movie List by Genre

const genreList = async (genre) => {
    const endPoint = "/discover/movie";
    const requestParams = `?api_key=${apiKey}&with_genres=${genre}`;
    const urlToFetch = `${tmbBaseUrl}${endPoint}${requestParams}`;
    try {
        let response = await fetch(urlToFetch, {method: "GET"});
        if (response.ok) {
            let jsonResponse = await response.json();
            let genreList = jsonResponse.results;
            return genreList;
        }
    } catch (error) {
        alert(error);
    }
}

//GET Search Movies compact function

async function searchMovie(query) {
    const endPoint = "/search/movie";
    const requestParams = `?api_key=${apiKey}&query=${query}&page=1`;
    const urlToFetch = `${tmbBaseUrl}${endPoint}${requestParams}`;
    try {
        let response = await fetch(urlToFetch,{method: "GET"});
        let jsonResponse = await response.json();
        return jsonResponse.results;
    } catch (error) {
        alert(error);
    }   
};

//GET Movie details

const movieDetails = async (mId) => {
    const endPoint = `/movie/${mId}`;
    const requestParams = `?api_key=${apiKey}`;
    const urlToFetch = `${tmbBaseUrl}${endPoint}${requestParams}`;
    try {
        let response = await fetch(urlToFetch,{method: "GET"});
        if (response.ok) {
            return await response.json();
        }
        return new Error ("Network error"); 
    } catch (error) {
        alert(error);
    }
};

export {getGenre, genreList, searchMovie, movieDetails};