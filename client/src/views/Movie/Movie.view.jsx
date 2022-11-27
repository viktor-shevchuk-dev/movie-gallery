import { useParams, Link } from "react-router-dom";

import {
  Header,
  Main,
  ErrorBoundary,
  MovieDetail,
  MainHeader,
} from "components";

import { ReactComponent as Search } from "icons/search.svg";

import { useGetMovieQuery } from "services/movie-shelf/movie-shelf.api";

export const Movie = () => {
  const { movieId } = useParams();

  const { data: movie, isLoading, isError, error } = useGetMovieQuery(movieId);

  return (
    <>
      <Header>
        <MainHeader>
          <Link to={`/`}>
            <Search />
          </Link>
        </MainHeader>
        <ErrorBoundary>
          {isLoading && <p>Loading...</p>}
          {isError && <p>{error.message}</p>}
          {movie && (
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
