import PropTypes from "prop-types";
import GenreFilter from "components/GenreFilter";
import GeneralFilter from "components/GeneralFilter";
import classes from "./FoundMoviesListFilterBar.module.css";

const FoundMoviesListFilterBar = ({ onSetSortOption, onSetGenreOption }) => (
  <div className={classes["filter-bar"]}>
    <GenreFilter onSetGenreOption={onSetGenreOption} />
    <GeneralFilter onSetSortOption={onSetSortOption} />
  </div>
);

FoundMoviesListFilterBar.propTypes = {
  onSetSortOption: PropTypes.func.isRequired,
  onSetGenreOption: PropTypes.func.isRequired,
};

export default FoundMoviesListFilterBar;
