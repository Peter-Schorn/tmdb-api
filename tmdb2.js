import axios from 'axios';

export default class TMDB2 {

    static apiBase = "https://api.themoviedb.org/3";

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // https://developers.themoviedb.org/3/movies/get-movie-details
    async movieDetails(movieID) {
        return await this._apiRequest(
            "GET", `/movie/${movieID}`
        );
    }

    async _apiRequest(method, path, queryParams, body) {

        const url = `${TMDB2.apiBase}${path}`;

        const response = await axios({
            method: method,
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json;charset=utf-8"
            },
            url: url,
            params: queryParams,
            data: body
        });

        return response.data;
    }


}
