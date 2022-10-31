import PropTypes from "prop-types";
import classes from "./SortSelector.module.css";

const SortSelector = ({ options, value, onChange, label }) => (
  <div className={classes["sort-selector"]}>
    <label className={classes.label} htmlFor={label}>
      Sort by
    </label>
    <select
      className={classes.select}
      id={label}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

SortSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SortSelector;
