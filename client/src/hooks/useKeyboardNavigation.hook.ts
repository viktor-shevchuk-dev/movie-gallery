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
          const maxValidRowIndex = movieGallery.length - 1;
          setActiveRowIndex((prev) => {
            const nextRowIndex = prev + 1;
            return Math.min(nextRowIndex, maxValidRowIndex);
          });
          break;

        case KeyDownCode.UP:
          setActiveRowIndex((prev) => {
            const previousRowIndex = prev - 1;
            return Math.max(previousRowIndex, 0);
          });
          break;

        case KeyDownCode.RIGHT:
        case KeyDownCode.LEFT:
          const activeRowLength = movieGallery[activeRowIndex][1].length;
          const delta = code === KeyDownCode.RIGHT ? 1 : -1;

          setActiveCardIndices((prevIndices) => {
            const currentCardIndex = prevIndices[activeRowIndex];
            const newCardIndex =
              (currentCardIndex + delta + activeRowLength) % activeRowLength;

            return prevIndices.map((index, idx) =>
              idx === activeRowIndex ? newCardIndex : index
            );
          });
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
