import { useState, useEffect, useCallback } from "react";

import { MovieGallery, KeyDownCode } from "types";

export const useKeyboardNavigation = (movieGallery: MovieGallery) => {
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);
  const [activeCardIndices, setActiveCardIndices] = useState<number[]>(() =>
    Array(movieGallery.length).fill(0)
  );

  const handleKeyDown = useCallback(
    ({ code }: KeyboardEvent) => {
      switch (code) {
        case KeyDownCode.DOWN:
          setActiveRowIndex((prev) => {
            const rowCount = movieGallery.length;
            return Math.min(prev + 1, rowCount - 1);
          });
          break;
        case KeyDownCode.UP:
          setActiveRowIndex((prev) => Math.max(prev - 1, 0));
          break;
        case KeyDownCode.RIGHT:
        case KeyDownCode.LEFT:
          const activeRowLength = movieGallery[activeRowIndex][1].length;
          const delta = code === KeyDownCode.RIGHT ? 1 : -1;
          const getUpdatedIndex = (
            current: number,
            delta: number,
            rowLength: number
          ) => (current + delta + rowLength) % rowLength;

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

  return { activeRowIndex, activeCardIndices };
};
