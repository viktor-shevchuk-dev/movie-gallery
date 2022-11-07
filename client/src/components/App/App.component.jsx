import { Routes as RoutesList, Route } from "react-router-dom";

import { Home, Movie, NotFound } from "views";

export const App = () => {
  return (
    <RoutesList>
      <Route path="/" element={<Home />} />
      <Route path="movies/:movieId" element={<Movie />} />
      <Route path="*" element={<NotFound />} />
    </RoutesList>
  );
};
