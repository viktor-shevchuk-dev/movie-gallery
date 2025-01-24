import { FC, useState, useEffect, useCallback } from "react";

import { MovieRow } from "components";

import { MovieGallery } from "types/MovieGallery.type";
import { KeyCode } from "types/KeyCode.type";

import classes from "./MovieGrid.module.css";

interface MovieGridProps {
  movieGallery: MovieGallery;
}

export const MovieGrid: FC<MovieGridProps> = ({ movieGallery }) => {
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [activeCardIndices, setActiveCardIndices] = useState<number[]>(() =>
    Array(movieGallery.length).fill(0)
  );

  const handleKeyDown = useCallback(
    ({ code }: KeyboardEvent) => {
      const activeRowLength = movieGallery[activeRowIndex][1].length;
      const updateIndex = (current: number, delta: number) =>
        (current + delta + activeRowLength) % activeRowLength;

      switch (code) {
        case KeyCode.DOWN:
          setActiveRowIndex((prevActiveRowIndex) =>
            Math.min(prevActiveRowIndex + 1, movieGallery.length - 1)
          );
          break;
        case KeyCode.UP:
          setActiveRowIndex((prevActiveRowIndex) =>
            Math.max(prevActiveRowIndex - 1, 0)
          );
          break;
        case KeyCode.RIGHT:
          setActiveCardIndices((prevActiveCardIndices) =>
            prevActiveCardIndices.map((prevActiveCardIndex, idx) =>
              idx === activeRowIndex
                ? updateIndex(prevActiveCardIndex, 1)
                : prevActiveCardIndex
            )
          );
          break;
        case KeyCode.LEFT:
          setActiveCardIndices((prevActiveCardIndices) =>
            prevActiveCardIndices.map((prevActiveCardIndex, idx) =>
              idx === activeRowIndex
                ? updateIndex(prevActiveCardIndex, -1)
                : prevActiveCardIndex
            )
          );
          break;
        default:
          break;
      }
    },
    [activeRowIndex, movieGallery]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ul>
      {movieGallery.map(([genre, movieRow], index) => {
        const isActiveRow = index === activeRowIndex;
        return (
          <li className={classes.category} key={genre}>
            <h2 className={classes["genre-title"]}>{genre}</h2>
            <MovieRow
              movies={movieRow}
              isActiveRow={isActiveRow}
              activeCardIndex={activeCardIndices[activeRowIndex]}
            />
          </li>
        );
      })}
    </ul>
  );
};
