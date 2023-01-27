import axios from 'axios';
import TMDBModule from 'tmdb-ts';
import TMDB2 from './tmdb2.js';

const TMDB = TMDBModule.default;

const apiKey = process.env.TMDB_API_KEY_V4;

// const tmdb = new TMDB(apiKey);

// console.log(tmdb);

const harryPotterMovieID = "671";

// try {
//     // const movies = await tmdb.search.movies({ query: 'American Pie' });
//     // console.log(movies);

//     const movie = await tmdb.movies.details(harryPotterMovieID);
//     console.log(movie);

// } catch (err) {
//     // handle error
// }

const tmdb2 = new TMDB2(apiKey);

const result = await tmdb2.movieDetails(harryPotterMovieID);

console.log(result);
