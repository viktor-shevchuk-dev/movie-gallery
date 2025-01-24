import { FC, useState, useEffect } from "react";

import { ErrorBoundary, MovieGrid } from "components";

import { Movie } from "types/Movie.type";
import { MovieGallery } from "types/MovieGallery.type";

import classes from "./Main.module.css";

import { fetchMovies } from "services/movieshelfApi";

import { Status } from "types/Status.type";

interface GenreCategories {
  [key: string]: Movie[];
}

const categorizeMoviesByGenre = (movies: Movie[]) => {
  const genreCategories: GenreCategories = {};
  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!genreCategories[genre]) {
        genreCategories[genre] = [];
      }
      genreCategories[genre].push(movie);
    });
  });

  return genreCategories;
};

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
