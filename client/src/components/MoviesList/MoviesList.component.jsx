import PropTypes from "prop-types";

import { MovieCard } from "components";

import classes from "./MoviesList.module.css";

export const MoviesList = ({ moviesList }) => (
  <ul className={classes["movies-list"]}>
    {moviesList.map(
      ({
        id,
        genres,
        title,
        runtime,
        overview,
        voteAverage,
        posterPath,
        releaseDate,
      }) => (
        <MovieCard
          key={id}
          id={id}
          genres={genres}
          title={title}
          runtime={runtime}
          overview={overview}
          voteAverage={voteAverage}
          posterPath={posterPath}
          releaseDate={releaseDate}
        />
      )
    )}
  </ul>
);

MoviesList.propTypes = {
  moviesList: PropTypes.array.isRequired,
};
