import { fetchMovies } from "services";

describe("fetchMovies", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("calls the correct endpoint and returns data on success", async () => {
    const mockData = [{ id: 1, title: "Test Movie" }];
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    } as Response);

    jest.spyOn(window, "fetch").mockImplementation(() => mockFetchPromise);

    const result = await fetchMovies();
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/movies",
      {}
    );
    expect(result).toEqual(mockData);
  });

  it("throws an error if response is not ok", async () => {
    const mockFetchPromise = Promise.resolve({
      ok: false,
    } as Response);

    jest.spyOn(window, "fetch").mockImplementation(() => mockFetchPromise);

    await expect(fetchMovies()).rejects.toThrow("Not found");
  });
});
