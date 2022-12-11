export const addMovie = {
  query: ({
    title,
    genres,
    runtime,
    overview,
    voteAverage: vote_average,
    releaseDate: release_date,
    posterPath: poster_path,
  }) => ({
    url: ``,
    method: "POST",
    body: {
      title,
      runtime,
      overview,
      release_date,
      poster_path,
      vote_average,
      genres: genres.map(({ label }) => label),
    },
  }),
  invalidatesTags: [{ type: "movieShelf", id: "movieShelf" }],
};
