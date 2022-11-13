import classNames from "classnames/bind";

import classes from "./Title.module.css";

export const Title = ({ children, extraClassName }) => (
  <h1
    className={classNames.bind(classes)("title", {
      [extraClassName]: extraClassName,
    })}
  >
    {children}
  </h1>
);
