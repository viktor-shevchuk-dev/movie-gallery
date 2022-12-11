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
  const genreURLSearchParam = new URLSearchParams(location.search).get("genre");

  const genreOption = genreURLSearchParam ?? "all";

  const genreClickHandler = ({ target: { textContent: genre } }) =>
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
          new URLSearchParams(location.search).get("sortBy") ?? "vote_average",
        genre: "all",
      })}`,
    });
  }, [genreURLSearchParam, location, navigate]);

  useEffect(() => {
    onSetGenreOption(genreOption);
  }, [genreOption, onSetGenreOption]);

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
