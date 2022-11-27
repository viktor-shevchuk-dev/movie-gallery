import { convertMinsToHrsMins } from "converters";

export const movieEndpoint = {
  query: (id) => `/${id}`,
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
    releaseYear: new Date(releaseDate).getFullYear(),
    runtime: runtime && convertMinsToHrsMins(runtime),
  }),
};
