import { useReducer, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";

import { MoviesList, MovieShelfFilterBar, ErrorBoundary } from "components";

import classes from "./Main.module.css";

import { useGetMovieShelfQuery } from "services";

const reducer = (state, action) => {
  switch (action.type) {
    case "genreOption": {
      return {
        ...state,
        genreOption: action.genreOption,
      };
    }
    case "sortOption": {
      return {
        ...state,
        sortOption: action.sortOption,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const Main = () => {
  const [{ genreOption, sortOption }, dispatch] = useReducer(reducer, {});

  const { searchQuery } = useParams();

  const {
    data: movieShelf,
    isLoading,
    isError,
    error,
  } = useGetMovieShelfQuery({ genreOption, sortOption, searchQuery });

  const location = useLocation();
  const { search } = location;
  const sortByURLSearchParam = new URLSearchParams(search).get("sortBy");
  const genreURLSearchParam = new URLSearchParams(search).get("genre");

  const setGenreOption = useCallback(
    (genreOption) => dispatch({ type: "genreOption", genreOption }),
    []
  );

  const setSortOption = useCallback(
    (sortOption) => dispatch({ type: "sortOption", sortOption }),
    []
  );

  useEffect(() => {
    if (!sortByURLSearchParam) return;

    setSortOption(sortByURLSearchParam);
  }, [setSortOption, sortByURLSearchParam]);

  useEffect(() => {
    if (!genreURLSearchParam) return;

    setGenreOption(genreURLSearchParam);
  }, [setGenreOption, genreURLSearchParam]);

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
