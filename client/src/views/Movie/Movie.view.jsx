import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MoviesList } from "components";

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
      .then((movie) => {
        setMovie(movie);
        setStatus(RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === PENDING && <p>Loading...</p>}
      {status === REJECTED && <p>{error.message}</p>}
      {status === RESOLVED && <p>{movie.title}</p>}
      <MoviesList />
    </>
  );
};
