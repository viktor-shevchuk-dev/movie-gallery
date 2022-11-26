import PropTypes from "prop-types";
import classNames from "classnames/bind";

import classes from "./Button.module.css";

export const Button = ({
  children,
  onClick,
  type = "button",
  extraClassName,
  primary,
  inverted,
  secondary,
  ...props
}) => (
  <button
    type={type}
    className={classNames.bind(classes)("button", {
      [extraClassName]: extraClassName,
      primary,
      inverted,
      secondary,
    })}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  extraClassName: PropTypes.string,
};
