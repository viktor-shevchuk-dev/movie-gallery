import { fireEvent, render, screen } from "@testing-library/react";
import { MovieGrid } from "components";
import { MovieGallery } from "types";

const mockMovieGallery: MovieGallery = [
  [
    "Action",
    [
      {
        id: 1,
        title: "Action Movie 1",
        release_date: "2020-01-01",
        poster_path: "/action1.jpg",
        genres: ["Action"],
      },
    ],
  ],
  [
    "Comedy",
    [
      {
        id: 2,
        title: "Comedy Movie 1",
        release_date: "2021-01-01",
        poster_path: "/comedy1.jpg",
        genres: ["Comedy"],
      },
      {
        id: 3,
        title: "Comedy Movie 2",
        release_date: "2022-01-01",
        poster_path: "/comedy2.jpg",
        genres: ["Comedy"],
      },
    ],
  ],
  [
    "Drama",
    [
      {
        id: 4,
        title: "Drama Movie 1",
        release_date: "2023-01-01",
        poster_path: "/drama1.jpg",
        genres: ["Drama"],
      },
    ],
  ],
];

describe("MovieGrid", () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it("renders a list of genres and corresponding MovieRows", () => {
    render(<MovieGrid movieGallery={mockMovieGallery} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(7);

    expect(screen.getByRole("heading", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Comedy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Drama" })).toBeInTheDocument();
  });
});
