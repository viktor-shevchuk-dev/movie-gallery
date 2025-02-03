import { FC } from "react";

import { ErrorBoundary, MovieGrid } from "components";
import { Status } from "types";
import { useFetchMovies } from "hooks";

import classes from "./Main.module.css";

export const Main: FC = () => {
  const { movies, status, error } = useFetchMovies();

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
