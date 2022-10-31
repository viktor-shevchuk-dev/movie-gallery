import { SearchMoviesForm } from "components";

import classes from "./FindMovie.module.css";

export const FindMovie = () => (
  <section className={classes["sub-header"]}>
    <h1 className={classes.heading}>Find your movie</h1>
    <SearchMoviesForm />
  </section>
);
