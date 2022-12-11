import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { Button } from "components";

import classes from "./SearchMoviesForm.module.css";

export const SearchMoviesForm = () => {
  const { searchQuery: urlSearchParameter } = useParams();

  const [searchQuery, setSearchQuery] = useState(
    () => urlSearchParameter ?? ""
  );

  const navigate = useNavigate();

  const handleQueryChange = ({ target: { value } }) =>
    setSearchQuery(value.toLowerCase());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "")
      return toast.error("Enter some valid search query, please.");

    navigate(`/search/${searchQuery}`);

    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={classes["search-movies-form"]}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleQueryChange}
        autoFocus
        placeholder="What do you want to watch?"
        className={classes.input}
      />
      <Button type="submit" primary>
        Search
      </Button>
    </form>
  );
};

SearchMoviesForm.propTypes = {
  onSubmit: PropTypes.func,
};
