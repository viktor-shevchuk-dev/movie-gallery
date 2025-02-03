import { render, screen } from "@testing-library/react";
import { MovieRow } from "components";
import { useKeyboardNavigation } from "hooks";

jest.mock("../../hooks/useKeyboardNavigation.hook.ts", () => ({
  useKeyboardNavigation: jest.fn(),
}));

const mockMovies = [
  {
    id: 1,
    title: "Movie 1",
    poster_path: "",
    genres: [],
    release_date: "2023",
  },
  {
    id: 2,
    title: "Movie 2",
    poster_path: "",
    genres: [],
    release_date: "2023",
  },
];

describe("MovieRow", () => {
  beforeEach(() => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue({
      activeRowIndex: 0,
      activeCardIndices: [0, 0],
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it("renders correct number of movie items", () => {
    render(
      <MovieRow movies={mockMovies} isActiveRow={false} activeCardIndex={0} />
    );
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockMovies.length);
  });

  it("applies active class to active card", () => {
    render(
      <MovieRow movies={mockMovies} isActiveRow={true} activeCardIndex={1} />
    );

    const cards = screen.getAllByRole("listitem");
    expect(cards[1]).toHaveClass("active");
    expect(cards[1]).toHaveTextContent("Movie 2");
  });

  it("scrolls active card into view", () => {
    const { rerender } = render(
      <MovieRow movies={mockMovies} isActiveRow={true} activeCardIndex={0} />
    );

    rerender(
      <MovieRow movies={mockMovies} isActiveRow={true} activeCardIndex={1} />
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(
      2
    );
  });
});
