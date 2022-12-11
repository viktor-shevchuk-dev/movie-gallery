import { convertMinsToHrsMins, convertDateToYear } from "converters";

export const movie = {
  query: (id) => `/${id}`,
  providesTags: (_, __, id) => [{ type: "movieShelf", id }],
  transformResponse: ({
    title,
    genres,
    runtime,
    overview,
    vote_average: voteAverage,
    release_date: releaseDate,
    poster_path: posterPath,
  }) => ({
    title,
    genres,
    posterPath,
    overview,
    voteAverage: voteAverage || null,
    year: convertDateToYear(releaseDate),
    runtime: runtime && convertMinsToHrsMins(runtime),
  }),
};
