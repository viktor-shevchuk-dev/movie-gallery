import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import movieShelfEndpoint from "./endpoints/movie-shelf.endpoint";
import movieEndpoint from "./endpoints/movie.endpoint";

export const movieShelfApi = createApi({
  reducerPath: "movieShelfApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/movies" }),
  endpoints: (builder) => ({
    getMovieShelf: builder.query(movieShelfEndpoint),
    getMovie: builder.query(movieEndpoint),
  }),
});

export const { useGetMovieShelfQuery, useGetMovieQuery } = movieShelfApi;
