import SearchMoviesForm from "components/SearchMoviesForm";
import classes from "./FindMovie.module.css";

const FindMovie = () => (
  <section className={classes["sub-header"]}>
    <h1 className={classes.heading}>Find your movie</h1>
    <SearchMoviesForm />
  </section>
);

export default FindMovie;
