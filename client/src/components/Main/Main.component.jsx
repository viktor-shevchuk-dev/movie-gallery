import { MoviesList, MovieShelfFilterBar, ErrorBoundary } from "components";

import classes from "./Main.module.css";

export const Main = ({
  isLoading,
  isError,
  error,
  movieShelf,
  onSetSortOption,
  onSetGenreOption,
}) => (
  <main className={classes.main}>
    <div className={`container ${classes["movie-shelf"]}`}>
      <MovieShelfFilterBar
        onSetSortOption={onSetSortOption}
        onSetGenreOption={onSetGenreOption}
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
