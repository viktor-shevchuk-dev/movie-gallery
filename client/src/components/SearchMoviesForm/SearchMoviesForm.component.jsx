import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import classes from "./SearchMoviesForm.module.css";
import Button from "components/Button";

const SearchMoviesForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = ({ target: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "")
      return toast.error("Enter some valid search query please.");

    onSubmit(searchQuery);

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
      <Button type="submit">Search</Button>
    </form>
  );
};

SearchMoviesForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchMoviesForm;
