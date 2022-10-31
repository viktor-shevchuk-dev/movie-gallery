import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import classes from "./GenreFilter.module.css";

const GenreFilter = ({ onSetGenreOption }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const genreURLSearchParam = new URLSearchParams(location.search).get("genre");

  const genreOption = genreURLSearchParam ?? "all";

  const onGenreOptionClick = ({ target: { textContent: genre } }) =>
    navigate({
      ...location,
      search: `${createSearchParams({
        genre: genre.toLowerCase(),
        sortBy: new URLSearchParams(location.search).get("sortBy"),
      })}`,
    });

  useEffect(() => {
    if (genreURLSearchParam !== null) return;

    navigate({
      ...location,
      search: `${createSearchParams({
        sortBy:
          new URLSearchParams(location.search).get("sortBy") ?? "release-date",
        genre: "all",
      })}`,
    });
  }, [genreURLSearchParam, location, navigate]);

  useEffect(() => {
    onSetGenreOption(genreOption);
  }, [genreOption, onSetGenreOption]);

  return (
    <ul className={classes["genres-filter-list"]} onClick={onGenreOptionClick}>
      <li>
        <p>All</p>
      </li>
      <li>
        <p>Documentary</p>
      </li>
      <li>
        <p>Comedy</p>
      </li>
      <li>
        <p>Horror</p>
      </li>
      <li>
        <p>Crime</p>
      </li>
    </ul>
  );
};

GenreFilter.propTypes = {
  onSetGenreOption: PropTypes.func.isRequired,
};

export default GenreFilter;
