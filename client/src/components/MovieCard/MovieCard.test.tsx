import { render, screen } from "@testing-library/react";
import { MovieCard } from "components";

describe("MovieCard", () => {
  const mockProps = {
    src: "test-poster-path.jpg",
    title: "Test Movie",
    genresList: ["Action", "Thriller"],
    year: 2021,
  };

  it("renders the correct data (title, year, genres, image)", () => {
    render(<MovieCard {...mockProps} />);

    const img = screen.getByAltText(/test movie/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(mockProps.src);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(String(mockProps.year))).toBeInTheDocument();

    expect(screen.getByText(/action, thriller/i)).toBeInTheDocument();
  });

  it("renders a link element", () => {
    render(<MovieCard {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
