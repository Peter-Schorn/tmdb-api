const TMDB = require("tmdb-ts").default;

const apiKey = process.env.TMDB_API_KEY_V4;

const tmdb = new TMDB(apiKey);

console.log(tmdb);
