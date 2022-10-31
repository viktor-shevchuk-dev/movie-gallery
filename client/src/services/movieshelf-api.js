const BASE_URL = "http://localhost:4000";

const fetchWithErrorHandling = async (url = "", config = {}) => {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
};

export const fetchMovies = async () => {
  const test = fetchWithErrorHandling(`${BASE_URL}/movies`);

  return await test;
};

export const fetchMovieDetails = (movieId) =>
  fetchWithErrorHandling(`${BASE_URL}/movies/${movieId}`);
