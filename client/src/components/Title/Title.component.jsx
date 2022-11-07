import classes from "./Title.module.css";

export const Title = ({ children }) => (
  <h1 className={classes.title}> {children}</h1>
);
