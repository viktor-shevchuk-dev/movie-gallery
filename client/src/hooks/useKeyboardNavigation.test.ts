import { renderHook, act } from "@testing-library/react";

import { useKeyboardNavigation } from "hooks";
import { KeyDownCode, MovieGallery } from "types";

const mockMovieGallery: MovieGallery = [
  [
    "Genre1",
    [
      {
        id: 1,
        title: "Movie 1",
        release_date: "2020-01-01",
        poster_path: "",
        genres: ["Genre1"],
      },
      {
        id: 2,
        title: "Movie 2",
        release_date: "2020-01-01",
        poster_path: "",
        genres: ["Genre1"],
      },
    ],
  ],
  [
    "Genre2",
    [
      {
        id: 3,
        title: "Movie 3",
        release_date: "2020-01-01",
        poster_path: "",
        genres: ["Genre2"],
      },
      {
        id: 4,
        title: "Movie 4",
        release_date: "2020-01-01",
        poster_path: "",
        genres: ["Genre2"],
      },
    ],
  ],
];

describe("useKeyboardNavigation", () => {
  it("initializes with activeRowIndex=0 and activeCardIndices all zero", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(mockMovieGallery)
    );
    expect(result.current.activeRowIndex).toBe(0);
    expect(result.current.activeCardIndices).toEqual([0, 0]);
  });

  it("moves the active row down with ArrowDown and up with ArrowUp", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(mockMovieGallery)
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { code: KeyDownCode.DOWN });
      window.dispatchEvent(event);
    });

    expect(result.current.activeRowIndex).toBe(1);

    act(() => {
      const event = new KeyboardEvent("keydown", { code: KeyDownCode.UP });
      window.dispatchEvent(event);
    });

    expect(result.current.activeRowIndex).toBe(0);
  });

  it("moves the active card left and right within the active row", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(mockMovieGallery)
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { code: KeyDownCode.RIGHT });
      window.dispatchEvent(event);
    });

    expect(result.current.activeCardIndices).toEqual([1, 0]);

    act(() => {
      const event = new KeyboardEvent("keydown", {
        code: KeyDownCode.LEFT,
      });
      window.dispatchEvent(event);
    });
    expect(result.current.activeCardIndices).toEqual([0, 0]);
  });

  it("wraps around when navigating past the ends of a row", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation(mockMovieGallery)
    );

    act(() => {
      const event1 = new KeyboardEvent("keydown", {
        code: KeyDownCode.RIGHT,
      });
      window.dispatchEvent(event1);
      const event2 = new KeyboardEvent("keydown", {
        code: KeyDownCode.RIGHT,
      });
      window.dispatchEvent(event2);
    });
    expect(result.current.activeCardIndices[0]).toBe(0);
  });
});
