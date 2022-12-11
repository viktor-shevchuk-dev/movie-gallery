export const movieShelf = {
  query: ({ sortOption, genreOption }) => {
    const endpoint = ["?"];
    sortOption && endpoint.push(`sortBy=${sortOption}&sortOrder=desc`);
    genreOption &&
      genreOption !== "all" &&
      endpoint.push(`&filter=${genreOption}`);

    return endpoint.join("");
  },
  transformResponse: ({ data: movieShelf }) =>
    movieShelf.map(
      ({
        id,
        runtime,
        genres,
        title,
        overview,
        vote_average: voteAverage,
        release_date: releaseDate,
        poster_path: posterPath,
      }) => ({
        id,
        genres,
        title,
        overview,
        posterPath,
        releaseDate,
        voteAverage,
        runtime: runtime || "",
      })
    ),
  providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({ type: "movieShelf", id })),
          { type: "movieShelf", id: "movieShelf" },
        ]
      : [{ type: "movieShelf", id: "movieShelf" }],
};
