import PropTypes from "prop-types";
import MovieCard from "components/MovieCard";
import classes from "./MoviesList.module.css";

const MoviesList = ({ moviesList }) => {
  return (
    <ul className={classes["movies-list"]}>
      {moviesList.map(({ id, poster_path, genres, title, release_date }) => (
        <MovieCard
          key={id}
          id={id}
          src={poster_path}
          title={title}
          genresList={genres}
          year={new Date(release_date).getFullYear()}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.array.isRequired,
};

export default MoviesList;
