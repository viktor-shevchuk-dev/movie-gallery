import Navigation from "components/Navigation";
import Button from "components/Button";
import FindMovie from "components/FindMovie";
import classes from "./Header.module.css";

const Header = () => (
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

export default Header;
