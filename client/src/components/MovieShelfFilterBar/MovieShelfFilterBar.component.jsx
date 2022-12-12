import { GeneralFilter, GenreFilter } from "components";

import classes from "./MovieShelfFilterBar.module.css";

export const MovieShelfFilterBar = () => (
  <div className={classes["filter-bar"]}>
    <GenreFilter />
    <GeneralFilter />
  </div>
);
