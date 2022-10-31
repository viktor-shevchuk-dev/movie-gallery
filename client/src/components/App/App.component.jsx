import { Routes as RoutesList, Route } from "react-router-dom";

import Home from "views/Home";
import Movie from "views/Movie";
import NotFound from "views/NotFound";

const App = () => (
  <RoutesList>
    <Route path="/" element={<Home />} />
    <Route path="movies/:movieId" element={<Movie />} />
    <Route path="*" element={<NotFound />} />
  </RoutesList>
);

export default App;
