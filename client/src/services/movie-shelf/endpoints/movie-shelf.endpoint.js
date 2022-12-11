export const movieShelf = {
  query: ({ sortOption, genreOption, searchQuery }) => {
    const endpoint = ["?"];

    searchQuery
      ? endpoint.push(`search=${searchQuery}`)
      : endpoint.push(`search=`);

    sortOption &&
      endpoint.push("&") &&
      endpoint.push(`sortBy=${sortOption}&sortOrder=desc`);

    genreOption &&
      genreOption !== "all" &&
      endpoint.push("&") &&
      endpoint.push(`filter=${genreOption}`);

    const joinedEndpoint = endpoint.join("");
    // debugger;
    return joinedEndpoint;
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
