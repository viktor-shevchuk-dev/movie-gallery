import { FC, useState, useEffect, useCallback } from "react";

import { MovieRow } from "components";
import { MovieGallery, KeyDownCode } from "types";

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
      switch (code) {
        case KeyDownCode.DOWN:
          setActiveRowIndex((prevActiveRowIndex) =>
            Math.min(prevActiveRowIndex + 1, movieGallery.length - 1)
          );
          break;
        case KeyDownCode.UP:
          setActiveRowIndex((prevActiveRowIndex) =>
            Math.max(prevActiveRowIndex - 1, 0)
          );
          break;
        case KeyDownCode.RIGHT:
        case KeyDownCode.LEFT:
          const activeRowLength = movieGallery[activeRowIndex][1].length;
          const delta = code === KeyDownCode.RIGHT ? 1 : -1;
          const getUpdatedIndex = (
            current: number,
            delta: number,
            length: number
          ) => (current + delta + length) % length;

          setActiveCardIndices((prevIndices) =>
            prevIndices.map((index, idx) =>
              idx === activeRowIndex
                ? getUpdatedIndex(index, delta, activeRowLength)
                : index
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
