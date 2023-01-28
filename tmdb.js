import axios from "axios";

// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
/**
 * @typedef { import("./types").Movie } Movie
 * @typedef { import("./types").MovieDetails } MovieDetails
 * @typedef { import("./types").ListSortBy } ListSortBy
 * @typedef { import("./types").UserList } UserList
 * @typedef { import("./types").ListItem } ListItem
 * @typedef { import("./types").AddToListResponse } AddToListResponse
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
            const methodString = request?.method?.toUpperCase() ?? "GET"
            let message = `${prefix} ${methodString} to ${fullURL}`
            if (request?.data) {
                message += ` with body:\n${request.data}`;
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
     * } | null | undefined} [options] the options for this endpoint:
     *  page: the page of results to retrieve;
     *  sortBy: how to sort the list;
     *  language: the language for the list
     * @returns {Promise<UserList>} a movie or tv show list
     */
    async getList(listID, options) {
        return await this._apiRequest(
            "GET",
            `/4/list/${listID}`,
            options  // query params
        );
    }

    /**
     * Add an item to a user's list.
     *
     * https://developers.themoviedb.org/4/list/add-items
     *
     * @param {string | Number} listID the list id
     * @param {string} sessionID the session id
     * @param {ListItem[]} items the items to add to the list
     * @returns {Promise<AddToListResponse>} an object that describes whether or
     * not each item was successfully added to the list
     */
    async addToList(listID, sessionID, items) {
        return await this._apiRequest(
            "POST", `/4/list/${listID}/items`, undefined, items
        );
    }

    // MARK: Authorization

    // todo

    // MARK: Wrapper Methods

    /**
     * Makes an HTTP request to the API.
     *
     * @param {string} method the http method
     * @param {string} path the path of the endpoint, which will be appended to
     * `TMDB.apiBase`.
     * @param {Object | null | undefined} [queryParams] the query parameters for
     * the endpoint
     * @param {Object | null | undefined} [body] the body of the request
     * @returns {Promise<any>} the response body from the server
     */
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
