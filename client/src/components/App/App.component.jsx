import { Routes as RoutesList, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home, Movie, NotFound } from "views";

export const App = () => (
  <>
    <ToastContainer />
    <RoutesList>
      <Route path="/" element={<Navigate to="/search" replace />} />
      <Route path="/search" element={<Home />} />
      <Route path="/search/:searchQuery" element={<Home />} />
      <Route path="/movies/:movieId" element={<Movie />} />
      <Route path="*" element={<NotFound />} />
    </RoutesList>
  </>
);
