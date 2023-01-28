import axios from "axios";
import TMDB from "./tmdb.js";
import * as dotenv from "dotenv";

dotenv.config();


const apiKey = process.env.TMDB_API_KEY_V4;

const harryPotterMovieID = "671";
const petersFirstListID = "8237947";

const tmdb2 = new TMDB(apiKey);

const movieDetails = await tmdb2.movieDetails(harryPotterMovieID);

console.log(movieDetails.backdrop_path);

const list = await tmdb2.getList(
    petersFirstListID,
    1,
    "vote_average.asc"
);

console.log(list.results[0].overview);

