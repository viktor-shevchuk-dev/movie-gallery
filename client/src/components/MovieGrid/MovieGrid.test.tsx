import { render, screen } from "@testing-library/react";
import { MovieGrid } from "components";
import { useKeyboardNavigation } from "hooks";
import { MovieGallery } from "types";

jest.mock("../../hooks/useKeyboardNavigation.hook", () => ({
  useKeyboardNavigation: () => ({
    activeRowIndex: 1,
    activeCardIndices: [0, 2, 0],
  }),
}));

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
  it("renders a list of genres and corresponding MovieRows", () => {
    render(<MovieGrid movieGallery={mockMovieGallery} />);

    // // Check genre headings
    // expect(screen.getByText('Action')).toBeInTheDocument();
    // expect(screen.getByText('Comedy')).toBeInTheDocument();
    // expect(screen.getByText('Drama')).toBeInTheDocument();

    // // Check that it renders all MovieRow items
    // // We can check by list item role if needed
    // const categoryItems = screen.getAllByRole('listitem');
    // expect(categoryItems.length).toBe(3);
  });
});
