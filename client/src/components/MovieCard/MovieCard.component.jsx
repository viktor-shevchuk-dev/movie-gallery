import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./MovieCard.module.css";

export const MovieCard = ({ src, title, genresList, id, year }) => (
  <li className={classes["movie-card"]}>
    <Link to={`movies/${id}`} className={classes.link}>
      <img src={src} alt={title} className={classes.poster} />
      <div className={classes["title-and-year"]}>
        <p className={classes.title}>{title}</p>
        <p className={classes.year}>{year}</p>
      </div>
      <p className={classes["genres-list"]}> {genresList?.join(", ")}</p>
    </Link>
  </li>
);

MovieCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
