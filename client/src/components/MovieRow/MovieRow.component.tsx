import { FC, useEffect, useRef } from "react";

import { MovieCard } from "components";
import { Movie } from "types";

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
    activeCardRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeCardIndex, isActiveRow]);

  return (
    <ul className={classes["movie-row"]}>
      {movies.map(({ id, poster_path, genres, title, release_date }, index) => {
        const isActive = isActiveRow && activeCardIndex === index;
        const movieContainerClasses = [classes["movie-card"]];
        isActive && movieContainerClasses.push(classes.active);

        return (
          <li
            ref={isActive ? activeCardRef : null}
            key={id}
            className={movieContainerClasses.join(" ")}
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
