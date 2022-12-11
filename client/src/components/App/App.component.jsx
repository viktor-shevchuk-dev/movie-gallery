import { Routes as RoutesList, Route, Navigate } from "react-router-dom";

import { Home, Movie, NotFound } from "views";

export const App = () => {
  return (
    <RoutesList>
      <Route path="/" element={<Navigate to="/search" replace />} />
      <Route path="/search" element={<Home />} />
      <Route path="/search/:searchQuery" element={<Home />} />
      <Route path="/:movieId" element={<Movie />} />
      <Route path="*" element={<NotFound />} />
    </RoutesList>
  );
};
