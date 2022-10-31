import { Navigation } from "components";

import classes from "./Footer.module.css";

export const Footer = () => (
  <footer className={classes.footer}>
    <div className="container">
      <Navigation position="center" />
    </div>
  </footer>
);
