import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Header,
  Main,
  ErrorBoundary,
  MovieDetail,
  MainHeader,
} from "components";

import { ReactComponent as Search } from "icons/search.svg";

import { convertMinsToHrsMins } from "converters";

import { fetchMovieDetails } from "services/movieshelf-api";
import Status from "utils/state-machine";
const { IDLE, PENDING, REJECTED, RESOLVED } = Status;

export const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(PENDING);
    fetchMovieDetails(movieId)
      .then(
        ({
          title,
          vote_average: voteAverage,
          genres,
          release_date: releaseDate,
          runtime,
          poster_path: posterPath,
          overview,
        }) => {
          setMovie({
            title,
            voteAverage,
            genres,
            releaseYear: new Date(releaseDate).getFullYear(),
            runtime: convertMinsToHrsMins(runtime),
            posterPath,
            overview,
          });
          setStatus(RESOLVED);
        }
      )
      .catch((error) => {
        setError(error);
        setStatus(REJECTED);
      });
  }, [movieId]);

  return (
    <>
      <Header>
        <MainHeader>
          <Link to={`/`}>
            <Search />
          </Link>
        </MainHeader>
        <ErrorBoundary>
          {status === PENDING && <p>Loading...</p>}
          {status === REJECTED && <p>{error.message}</p>}
          {status === RESOLVED && (
            <MovieDetail
              title={movie.title}
              voteAverage={movie.voteAverage}
              genres={movie.genres}
              releaseYear={movie.releaseYear}
              runtime={movie.runtime}
              posterPath={movie.posterPath}
              overview={movie.overview}
            />
          )}
        </ErrorBoundary>
      </Header>
      <Main />
    </>
  );
};
