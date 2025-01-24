import { FC, useEffect, useRef } from "react";

import { MovieCard } from "components";
import { Movie } from "types/Movie.type";

import classes from "./MovieRow.module.css";

interface MovieRowProps {
  movies: Movie[];
  isActiveRow: boolean;
  activeCardIndex: number;
}

export const MovieRow: FC<MovieRowProps> = ({
  movies,
  isActiveRow,
  activeCardIndex,
}) => {
  const activeCardRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [activeCardIndex, isActiveRow]);

  return (
    <ul className={classes["movie-row"]}>
      {movies.map(({ id, poster_path, genres, title, release_date }, index) => {
        const isActive = isActiveRow && activeCardIndex === index;

        return (
          <li
            ref={isActive ? activeCardRef : null}
            key={id}
            className={`${classes["movie-card"]} ${
              isActive ? classes.active : ""
            }`}
          >
            <MovieCard
              src={poster_path}
              title={title}
              genresList={genres}
              year={new Date(release_date).getFullYear()}
            />
          </li>
        );
      })}
    </ul>
  );
};
