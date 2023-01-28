import TMDB from "./tmdb.js";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TMDB_API_KEY_V4;

// https://www.themoviedb.org/movie/671-harry-potter-and-the-philosopher-s-stone
const harryPotterMovieID = "671";

// https://www.themoviedb.org/list/8237947
const petersFirstListID = "8237947";

const tmdb = new TMDB(apiKey);

const movieDetails = await tmdb.movieDetails(harryPotterMovieID);

console.log(movieDetails.id);
console.log(movieDetails.backdrop_path);

const list = await tmdb.getList(petersFirstListID, {
    page: 1,
    sortBy: "original_order.asc"
});

console.log(list.results[0].overview);

