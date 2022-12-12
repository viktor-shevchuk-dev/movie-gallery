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
      year,
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
          {title && genres && posterPath && overview && year && (
            <MovieDetail
              title={title}
              voteAverage={voteAverage}
              genres={genres}
              year={year}
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
