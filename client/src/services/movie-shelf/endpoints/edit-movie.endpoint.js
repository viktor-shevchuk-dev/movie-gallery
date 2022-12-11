export const editMovie = {
  query: ({
    id,
    title,
    genres,
    runtime,
    overview,
    voteAverage: vote_average,
    releaseDate: release_date,
    posterPath: poster_path,
  }) => ({
    url: ``,
    method: "PUT",
    body: {
      id,
      title,
      runtime,
      overview,
      release_date,
      poster_path,
      vote_average,
      genres: genres.map(({ label }) => label),
    },
  }),
  invalidatesTags: (_, __, { id }) => [{ type: "movieShelf", id }],
};
