import { useLocation, createSearchParams, Link } from "react-router-dom";
import classNames from "classnames/bind";

import classes from "./GenreFilter.module.css";

const genresList = [
  { value: "all", label: "All" },
  { value: "documentary", label: "Documentary" },
  { value: "comedy", label: "Comedy" },
  { value: "horror", label: "Horror" },
  { value: "crime", label: "Crime" },
];

export const GenreFilter = () => {
  const location = useLocation();
  const { search } = location;
  const sortBySearchParam = new URLSearchParams(search).get("sortBy");
  const genreSearchParam = new URLSearchParams(search).get("genre");

  const createSearch = (genre) => {
    const searchParams = { genre };

    if (sortBySearchParam) searchParams.sortBy = sortBySearchParam;

    return `${createSearchParams(searchParams)}`;
  };

  const getIsActive = (value) =>
    genreSearchParam === value || (value === "all" && !genreSearchParam);

  return (
    <ul className={classes["genres-filter-list"]}>
      {genresList.map(({ label, value }) => (
        <li
          key={value}
          className={classNames.bind(classes)({
            isActive: getIsActive(value),
          })}
        >
          <p>
            <Link
              to={{
                ...location,
                search: createSearch(value),
              }}
            >
              {label}
            </Link>
          </p>
        </li>
      ))}
    </ul>
  );
};
