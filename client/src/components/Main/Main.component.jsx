import { useParams, useLocation } from "react-router-dom";

import { MoviesList, MovieShelfFilterBar, ErrorBoundary } from "components";

import classes from "./Main.module.css";

import { useGetMovieShelfQuery } from "services";

export const Main = () => {
  const { searchQuery } = useParams();
  const { search } = useLocation();
  const sortOption = new URLSearchParams(search).get("sortBy");
  const genreOption = new URLSearchParams(search).get("genre");

  const {
    data: movieShelf,
    isLoading,
    isError,
    error,
  } = useGetMovieShelfQuery({ genreOption, sortOption, searchQuery });

  return (
    <main className={classes.main}>
      <div className={`container ${classes["movie-shelf"]}`}>
        <MovieShelfFilterBar />
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
