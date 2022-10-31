import PropTypes from "prop-types";

import classes from "./Button.module.css";

export const Button = ({ children, mixin = "primary", ...props }) => (
  <button className={classes[mixin]} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  mixin: PropTypes.string,
};
