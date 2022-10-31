import { Navigation, Button, FindMovie } from "components";

import classes from "./Header.module.css";

export const Header = () => (
  <header className={classes.header}>
    <div className={`container ${classes["header-container"]}`}>
      <section className={classes["main-header"]}>
        <Navigation />
        <Button mixin="secondary">+ Add Movie</Button>
      </section>
      <FindMovie />
    </div>
  </header>
);
