import { useState } from "react";

import { useGetMovieShelfQuery } from "services";

import { MoviesList, MovieShelfFilterBar, ErrorBoundary } from "components";

import classes from "./Main.module.css";

export const Main = () => {
  const [genreOption, setGenreOption] = useState();
  const [sortOption, setSortOption] = useState();

  const {
    data: movieShelf,
    isLoading,
    isError,
    error,
  } = useGetMovieShelfQuery(
    { genreOption, sortOption },
    { skip: !genreOption || !sortOption }
  );

  const setSortOptionHandler = (sortOption) => setSortOption(sortOption);
  const setGenreOptionHandler = (genre) => setGenreOption(genre);

  return (
    <main className={classes.main}>
      <div className={`container ${classes["movie-shelf"]}`}>
        <MovieShelfFilterBar
          onSetSortOption={setSortOptionHandler}
          onSetGenreOption={setGenreOptionHandler}
        />
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        {movieShelf && (
          <ErrorBoundary>
            <p className={classes.amount}>{movieShelf.length} movies found</p>
            <MoviesList moviesList={movieShelf} />
          </ErrorBoundary>
        )}
      </div>
    </main>
  );
};
