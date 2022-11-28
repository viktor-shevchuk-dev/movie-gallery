import { useParams, Link } from "react-router-dom";

import {
  Header,
  Main,
  ErrorBoundary,
  MovieDetail,
  MainHeader,
} from "components";

import { ReactComponent as Search } from "icons/search.svg";

import { useGetMovieQuery } from "services";

export const Movie = () => {
  const { movieId } = useParams();

  const {
    data: {
      title,
      genres,
      posterPath,
      overview,
      voteAverage,
      releaseYear,
      runtime,
    } = {},
    isLoading,
    isError,
    error,
  } = useGetMovieQuery(movieId);

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
          {title && genres && posterPath && overview && releaseYear && (
            <MovieDetail
              title={title}
              voteAverage={voteAverage}
              genres={genres}
              releaseYear={releaseYear}
              runtime={runtime}
              posterPath={posterPath}
              overview={overview}
            />
          )}
        </ErrorBoundary>
      </Header>
      <Main />
    </>
  );
};
