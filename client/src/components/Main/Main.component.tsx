import { FC, useState, useEffect } from "react";

import { ErrorBoundary, MovieGrid } from "components";

import { categorizeMoviesByGenre } from "utils";
import { MovieGallery, Status } from "types";
import { fetchMovies } from "services";

import classes from "./Main.module.css";

export const Main: FC = () => {
  const [movies, setMovies] = useState<MovieGallery>([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchMovies()
      .then(({ data }) => {
        const movies = Object.entries(categorizeMoviesByGenre(data));
        setMovies(movies);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <main>
      <div className={`container ${classes["movies-list"]}`}>
        {status === Status.PENDING && <p>Loading...</p>}
        {status === Status.REJECTED && <p>{error?.message}</p>}
        {status === Status.RESOLVED && (
          <ErrorBoundary>
            <MovieGrid movieGallery={movies} />
          </ErrorBoundary>
        )}
      </div>
    </main>
  );
};
