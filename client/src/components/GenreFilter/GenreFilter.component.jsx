import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";

import classes from "./GenreFilter.module.css";

const genresList = [
  { value: "all", label: "All" },
  { value: "documentary", label: "Documentary" },
  { value: "comedy", label: "Comedy" },
  { value: "horror", label: "Horror" },
  { value: "crime", label: "Crime" },
];

export const GenreFilter = ({ onSetGenreOption }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const genreURLSearchParam = new URLSearchParams(search).get("genre");

  const genreClickHandler = ({ target: { textContent: genre } }) => {
    const searchParams = { genre: genre.toLowerCase() };
    const sortBySearchParam = new URLSearchParams(search).get("sortBy");

    if (sortBySearchParam) searchParams.sortBy = sortBySearchParam;

    navigate({
      ...location,
      search: `${createSearchParams(searchParams)}`,
    });
  };

  useEffect(() => {
    onSetGenreOption(genreURLSearchParam);
  }, [genreURLSearchParam, onSetGenreOption]);

  return (
    <ul className={classes["genres-filter-list"]} onClick={genreClickHandler}>
      {genresList.map(({ label, value }) => (
        <li key={value}>
          <p>{label}</p>
        </li>
      ))}
    </ul>
  );
};

GenreFilter.propTypes = {
  onSetGenreOption: PropTypes.func.isRequired,
};
