import TMDB from "./tmdb.js";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TMDB_API_KEY_V4;
if (!apiKey) {
    throw new Error("couldn't get API key from environment");
}

// https://www.themoviedb.org/movie/671-harry-potter-and-the-philosopher-s-stone
const harryPotterMovieID = "671";

// https://www.themoviedb.org/list/8237947
const petersFirstListID = "8237947";

const wolfOfWallStreetMovieID = "106646";

const tmdb = new TMDB(apiKey);

tmdb.movieDetails(harryPotterMovieID).then((movieDetails) => {
    console.log(movieDetails.title);
});

tmdb.getList(petersFirstListID, {
    page: 1,
    sortBy: "original_order.asc"
})
.then((list) => {
    console.log(list.results[0].overview);
});
