import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";

import { SortSelector } from "components";

const sortOptionsList = [
  { value: "vote_average", label: "Rating" },
  { value: "release_date", label: "Release date" },
];

export const GeneralFilter = ({ onSetSortOption }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sortByURLSearchParam = new URLSearchParams(location.search).get(
    "sortBy"
  );

  const sortOption = sortByURLSearchParam ?? "vote_average";

  const onSortOptionChange = (option) =>
    navigate({
      ...location,
      search: `${createSearchParams({
        sortBy: option,
        genre: new URLSearchParams(location.search).get("genre"),
      })}`,
    });

  useEffect(() => {
    if (sortByURLSearchParam !== null) return;

    navigate({
      ...location,
      search: `${createSearchParams({
        genre: new URLSearchParams(location.search).get("genre") ?? "all",
        sortBy: "vote_average",
      })}`,
    });
  }, [location, navigate, sortByURLSearchParam]);

  useEffect(() => {
    onSetSortOption(sortOption);
  }, [onSetSortOption, sortOption]);

  return (
    <SortSelector
      options={sortOptionsList}
      onChange={onSortOptionChange}
      value={sortOption}
      label="Sort by"
    />
  );
};

GeneralFilter.propTypes = {
  onSetSortOption: PropTypes.func.isRequired,
};
