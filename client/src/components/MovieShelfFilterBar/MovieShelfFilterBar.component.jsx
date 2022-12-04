import PropTypes from "prop-types";

import { GeneralFilter, GenreFilter } from "components";

import classes from "./MovieShelfFilterBar.module.css";

export const MovieShelfFilterBar = ({ onSetSortOption, onSetGenreOption }) => (
  <div className={classes["filter-bar"]}>
    <GenreFilter onSetGenreOption={onSetGenreOption} />
    <GeneralFilter onSetSortOption={onSetSortOption} />
  </div>
);

MovieShelfFilterBar.propTypes = {
  onSetSortOption: PropTypes.func.isRequired,
  onSetGenreOption: PropTypes.func.isRequired,
};
