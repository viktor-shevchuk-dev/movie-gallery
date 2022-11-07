import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

export const Navigation = ({ position = "left" }) => (
  <nav className={classes.navigation}>
    <NavLink to="/" className={`${classes.logo} ${classes[position]}`}>
      <span>netflix</span>roulette
    </NavLink>
  </nav>
);

Navigation.propTypes = {
  position: PropTypes.string,
};
