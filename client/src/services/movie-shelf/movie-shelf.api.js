import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  movieShelf,
  movie,
  addMovie,
  deleteMovie,
  editMovie,
} from "./endpoints";

export const movieShelfApi = createApi({
  reducerPath: "movieShelfApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/movies" }),
  endpoints: (builder) => ({
    getMovieShelf: builder.query(movieShelf),
    getMovie: builder.query(movie),
    addMovie: builder.mutation(addMovie),
    deleteMovie: builder.mutation(deleteMovie),
    editMovie: builder.mutation(editMovie),
  }),
});

export const {
  useGetMovieShelfQuery,
  useGetMovieQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useEditMovieMutation,
} = movieShelfApi;
