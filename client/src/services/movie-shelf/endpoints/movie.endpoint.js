import { convertMinsToHrsMins } from "converters";

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
    voteAverage: voteAverage ? voteAverage : null,
    year: new Date(releaseDate).getFullYear(),
    runtime: runtime && convertMinsToHrsMins(runtime),
  }),
};
