import axios from "axios";

// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
/**
 * @typedef { import("./types").Movie } Movie
 * @typedef { import("./types").MovieDetails } MovieDetails
 * @typedef { import("./types").ListSortBy } ListSortBy
 * @typedef { import("./types").UserList } UserList
 */

/**
 * A class that provides access to the TMDB API.
 *
 * https://developers.themoviedb.org/3/getting-started/introduction
 */
export default class TMDB {

    static apiBase = "https://api.themoviedb.org";

    /**
     * Creates an instance of TMDB.
     *
     * @param {string} apiKey the API key
     */
    constructor(apiKey) {

        if (!apiKey) {
            throw new Error(`apiKey cannot be '${apiKey}'`);
        }
        this.apiKey = apiKey;
        this.httpClient = axios.create();

        // log all http requests
        // https://axios-http.com/docs/interceptors
        this.httpClient.interceptors.request.use((request) => {
            const date = new Date().toUTCString();
            const prefix = `[TMDB: ${date}]`;
            const fullURL = `${request?.baseURL ?? ""}${request?.url}`;
            let message = `${prefix} ${request?.method?.toUpperCase() ?? "GET"} to ${fullURL}`
            if (request?.data) {
                message += `with body:\n${request.data}`;
            }
            console.log(message);

            return request;
        });

    }

    // MARK: Endpoints

    /**
     * Get the primary information about a movie.
     *
     * https://developers.themoviedb.org/3/movies/get-movie-details
     *
     * @param {String | Number} movieID the movie id
     * @returns {Promise<MovieDetails>} The details of a TMDB movie
     */
    async movieDetails(movieID) {
        return await this._apiRequest(
            "GET", `/3/movie/${movieID}`
        );
    }

    /**
     * Gets a user's list by id. Private lists can only be accessed by their
     * owners.
     *
     * https://developers.themoviedb.org/4/list/get-list
     *
     * @param {string | Number} listID the list id
     * @param {{
     *     page?: Number | null | undefined,
     *     sortBy?: ListSortBy | null | undefined,
     *     language?: string | null | undefined
     * } | null | undefined} options the options for this endpoint:
     *  page: the page of results to retrieve;
     *  sortBy: how to sort the list;
     *  language: the language for the list
     * @returns {Promise<UserList>} a movie or tv show list
     */
    async getList(listID, options) {
        const queryParams = {
            page: options?.page,
            language: options?.language,
            sortBy: options?.sortBy
        };
        return await this._apiRequest(
            "GET",
            `/4/list/${listID}`,
            queryParams
        );
    }

    // MARK: Authorization

    // MARK: Wrapper Methods

    async _apiRequest(method, path, queryParams, body) {

        // https://axios-http.com/docs/req_config
        const response = await this.httpClient.request({
            baseURL: TMDB.apiBase,
            url: path,
            method: method,
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json;charset=utf-8"
            },
            // params that are null or undefined are not rendered in the URL.
            params: queryParams,
            data: body
        });

        return response.data;
    }


}
