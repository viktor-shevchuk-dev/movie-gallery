import { FC } from "react";

import { MovieRow } from "components";
import { MovieGallery } from "types";
import { useKeyboardNavigation } from "hooks";

import classes from "./MovieGrid.module.css";

interface MovieGridProps {
  movieGallery: MovieGallery;
}

export const MovieGrid: FC<MovieGridProps> = ({ movieGallery }) => {
  const { activeRowIndex, activeCardIndices } =
    useKeyboardNavigation(movieGallery);

  return (
    <ul>
      {movieGallery.map(([genre, movieRow], index) => {
        return (
          <li className={classes.category} key={genre}>
            <h2 className={classes["genre-title"]}>{genre}</h2>
            <MovieRow
              movies={movieRow}
              isActiveRow={index === activeRowIndex}
              activeCardIndex={activeCardIndices[activeRowIndex]}
            />
          </li>
        );
      })}
    </ul>
  );
};
