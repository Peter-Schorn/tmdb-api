import axios from "axios";
import TMDBModule from "tmdb-ts";
import TMDB2 from "./tmdb2.js";
import * as dotenv from "dotenv";
// import { ListSortBy } from "./types/movies.js";

dotenv.config();

// const TMDB = TMDBModule.default;

const apiKey = process.env.TMDB_API_KEY_V4;
// const tmdb = new TMDB(apiKey);

// console.log(tmdb);

const harryPotterMovieID = "671";
const petersFirstListID = "8237947";

// try {
//     // const movies = await tmdb.search.movies({ query: "Fast and Furious" });
//     // console.log(movies);

//     const movie = await tmdb.movies.details(harryPotterMovieID);
//     console.log(movie);

// } catch (err) {
//     // handle error
// }



const tmdb2 = new TMDB2(apiKey);

// const x = tmdb2.getList("56");

const movieDetails = await tmdb2.movieDetails(harryPotterMovieID);

console.log(movieDetails.backdrop_path);

const list = await tmdb2.getList(
    petersFirstListID,
    1,
    "original_order.asc"
);

console.log(list.results[0].overview);

