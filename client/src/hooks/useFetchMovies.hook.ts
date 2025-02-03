import { useState, useEffect, useCallback } from "react";

import * as API from "services";
import { categorizeMoviesByGenre } from "utils";
import { Status, MovieGallery } from "types";

export const useFetchMovies = () => {
  const [movies, setMovies] = useState<MovieGallery>([]);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setStatus(Status.PENDING);
      const { data } = await API.fetchMovies();
      console.log(data);
      const movies = Object.entries(categorizeMoviesByGenre(data));
      setMovies(movies);
      setStatus(Status.RESOLVED);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to fetch movies")
      );
      setStatus(Status.REJECTED);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, status, error };
};
