import Navigation from "components/Navigation";
import classes from "./Footer.module.css";

const Footer = () => (
  <footer className={classes.footer}>
    <div className="container">
      <Navigation position="center" />
    </div>
  </footer>
);

export default Footer;
