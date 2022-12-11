import { useState } from "react";

import { MoviesList, MovieShelfFilterBar, ErrorBoundary } from "components";

import classes from "./Main.module.css";

import { useGetMovieShelfQuery } from "services";

export const Main = ({ searchQuery }) => {
  const [genreOption, setGenreOption] = useState();
  const [sortOption, setSortOption] = useState();

  const {
    data: movieShelf,
    isLoading,
    isError,
    error,
  } = useGetMovieShelfQuery({ genreOption, sortOption, searchQuery });

  return (
    <main className={classes.main}>
      <div className={`container ${classes["movie-shelf"]}`}>
        <MovieShelfFilterBar
          onSetGenreOption={setGenreOption}
          onSetSortOption={setSortOption}
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
