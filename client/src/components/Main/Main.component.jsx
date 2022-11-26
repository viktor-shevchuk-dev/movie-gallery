import { useState, useEffect } from "react";

import {
  MoviesList,
  FoundMoviesListFilterBar,
  ErrorBoundary,
} from "components";

import classes from "./Main.module.css";

import { fetchMovies } from "services/movieshelf-api";

import Status from "utils/state-machine";
const { IDLE, PENDING, REJECTED, RESOLVED } = Status;

export const Main = () => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState();
  const [genreOption, setGenreOption] = useState();

  useEffect(() => {
    setStatus(PENDING);
    fetchMovies()
      .then(({ data }) => {
        setFoundMovies(data);
        setStatus(RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(REJECTED);
      });
  }, []);

  const sortByTitle = (a, b) => a.title.localeCompare(b.title);
  const sortByDate = (a, b) =>
    new Date(a.release_date) - new Date(b.release_date);

  const sortedFoundMoviesByGeneralOption = [...foundMovies].sort((a, b) =>
    sortOption === "release-date" ? sortByDate(a, b) : sortByTitle(a, b)
  );

  const sortedFoundMoviesByGeneralOptionAndFilteredByGenre =
    genreOption === "all"
      ? sortedFoundMoviesByGeneralOption
      : [...sortedFoundMoviesByGeneralOption].filter(({ genres }) =>
          genres.find((genre) => genre.toLowerCase() === genreOption)
        );

  const sortFoundMoviesByGeneralOption = (sortOption) =>
    setSortOption(sortOption);

  const sortFoundMoviesByGenre = (genre) => setGenreOption(genre);

  return (
    <main className={classes.main}>
      <div className={`container ${classes["found-movies-list"]}`}>
        <FoundMoviesListFilterBar
          onSetSortOption={sortFoundMoviesByGeneralOption}
          onSetGenreOption={sortFoundMoviesByGenre}
        />
        {status === PENDING && <p>Loading...</p>}
        {status === REJECTED && <p>{error.message}</p>}
        {status === RESOLVED && (
          <ErrorBoundary>
            <p className={classes.amount}>
              {sortedFoundMoviesByGeneralOptionAndFilteredByGenre.length} movies
              found
            </p>
            <MoviesList
              moviesList={sortedFoundMoviesByGeneralOptionAndFilteredByGenre}
            />
          </ErrorBoundary>
        )}
      </div>
    </main>
  );
};
