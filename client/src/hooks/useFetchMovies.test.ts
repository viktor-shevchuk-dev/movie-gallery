import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchMovies } from "hooks";
import * as API from "../services";
import { Status } from "../types";

jest.mock("../services");

describe("useFetchMovies", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Movie 1",
      release_date: "2020-01-01",
      poster_path: "",
      genres: ["Action", "Thriller"],
    },
    {
      id: 2,
      title: "Movie 2",
      release_date: "2021-01-01",
      poster_path: "",
      genres: ["Comedy"],
    },
  ];

  it("fetches and categorizes movies successfully", async () => {
    (API.fetchMovies as jest.Mock).mockResolvedValue({
      data: mockMovies,
    });

    const { result } = renderHook(() => useFetchMovies());

    expect(result.current.status).toBe(Status.PENDING);
    expect(API.fetchMovies).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.status).toBe(Status.RESOLVED);
    });

    await waitFor(() => {
      expect(result.current.movies).toHaveLength(3);
    });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });

  it("handles error during fetch", async () => {
    (API.fetchMovies as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    const { result } = renderHook(() => useFetchMovies());

    await waitFor(() => {
      expect(result.current.status).toBe(Status.REJECTED);
    });

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });
});
