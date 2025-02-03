import { Movie, GenreCategories } from "types";

export const categorizeMoviesByGenre = (movies: Movie[]): GenreCategories => {
  const genreCategories: GenreCategories = {};
  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!genreCategories[genre]) {
        genreCategories[genre] = [];
      }
      genreCategories[genre].push(movie);
    });
  });

  return genreCategories;
};
