import { SearchMoviesForm, Title } from "components";

import classes from "./FindMovie.module.css";

export const FindMovie = ({ searchQuery }) => (
  <section className={classes["sub-header"]}>
    <Title>Find your movie</Title>
    <SearchMoviesForm searchQuery={searchQuery} />
  </section>
);
