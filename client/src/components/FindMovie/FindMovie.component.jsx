import { SearchMoviesForm, Title } from "components";

import classes from "./FindMovie.module.css";

export const FindMovie = () => (
  <section className={classes["sub-header"]}>
    <Title>Find your movie</Title>
    <SearchMoviesForm />
  </section>
);
