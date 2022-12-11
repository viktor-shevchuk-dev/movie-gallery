export const deleteMovie = {
  query: (id) => ({ url: `/${id}`, method: "DELETE" }),
  invalidatesTags: (_, __, id) => [{ type: "movieShelf", id }],
};
