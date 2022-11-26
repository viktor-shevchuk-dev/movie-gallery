import classes from "./MainHeader.module.css";
import { Navigation } from "components";

export const MainHeader = ({ children }) => (
  <section className={classes["main-header"]}>
    <Navigation />
    {children}
  </section>
);
