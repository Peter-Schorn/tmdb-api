export interface Movie {
    poster_path: string | null;
    adult: Boolean;
    overview: string;
    release_date: string;
    genre_ids: Number[];
    id: Number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: Number;
    vote_count: Number;
    video: boolean;
    vote_average: Number;
}

/**
 * The details of a movie.
 */
export interface MovieDetails {

    /**
     * Whether or not the movie contains adult content
     */
    adult: boolean;

    /**
     * The file path for the backdrop. See https://developers.themoviedb.org/3/getting-started/images
     */
    backdrop_path: string | null;

    belongs_to_collection: any | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    /** The id of the movie. */
    id: number;
    imdb_id: string;
    original_language: string;
    /** The original title of the movie */
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: any;
    // https://stackoverflow.com/a/73707766/12394554
    production_companies: {
        name: string;
        id: Number;
        logo_path: string | null;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        iso_639_1: string;
        name: string;
    }[];
    status:
        "Rumored" |
        "Planned" |
        "In Production" |
        "Post Production" |
        "Released" |
        "Canceled";
    tagline: string;
    /** The title of the movie. */
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}


/**
 * How to sort a user's list.
 */
type ListSortBy = "original_order.asc" | "original_order.desc" | "release_date.asc" | "release_date.desc" | "title.asc" | "title.desc" | "vote_average.asc" | "vote_average.desc";

// export enum ListSortBy {
//     OriginalOrderAsc = "original_order.asc",
//     OriginalOrderDesc = "original_order.desc",
//     ReleaseDateAsc = "release_date.asc",
//     ReleaseDateDesc = "release_date.desc",
//     TitleAsc = "title.asc",
//     TitleDesc = "title.desc",
//     VoteAverageAsc = "vote_average.asc",
//     VoteAverageDesc = "vote_average.desc"
// }

/**
 * A list in a user's library
 */
export interface UserList {

    poster_path: string;

    /** The id of the list. */
    id: number;

    /**
     * The file path for the backdrop. See https://developers.themoviedb.org/3/getting-started/images.
     */
    backdrop_path: string | null;

    total_results: number;
    public: boolean;
    revenue: string;
    page: number;
    results: (UserListMovie | UserListTVShow)[];
    object_ids?: any;
    iso_639_1: string;
    total_pages: number;
    description: string;
    created_by: {
        gravatar_hash: string;
        name: string;
        username: string;
    };
    iso_3166_1: string;
    average_rating: number;
    runtime: number;
    name: string;
    comments?: any;
}

export interface UserListMovie {
    poster_path: string;
    adult: boolean;
    /** The overview for the movie */
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title: string;

    /**
     * The file path for the backdrop. See https://developers.themoviedb.org/3/getting-started/images
     */
    backdrop_path: string | null;

    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface UserListTVShow {
    poster_path: string;
    popularity: Number;
    id: Number;
    overview: string;

    /**
     * The file path for the backdrop. See https://developers.themoviedb.org/3/getting-started/images
     */
    backdrop_path: string | null;

    vote_average: Number;
    media_type: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: Number[];
    original_language: string;
    vote_count: Number;
    // The name of the TV show.
    name: string;
    origin_name: string;
}
