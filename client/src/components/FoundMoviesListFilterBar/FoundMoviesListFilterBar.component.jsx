import PropTypes from "prop-types";

import { GeneralFilter, GenreFilter } from "components";

import classes from "./FoundMoviesListFilterBar.module.css";

export const FoundMoviesListFilterBar = ({
  onSetSortOption,
  onSetGenreOption,
}) => (
  <div className={classes["filter-bar"]}>
    <GenreFilter onSetGenreOption={onSetGenreOption} />
    <GeneralFilter onSetSortOption={onSetSortOption} />
  </div>
);

FoundMoviesListFilterBar.propTypes = {
  onSetSortOption: PropTypes.func.isRequired,
  onSetGenreOption: PropTypes.func.isRequired,
};
