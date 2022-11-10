import classNames from "classnames/bind";

import classes from "./FormControl.module.css";

export const FormControl = ({
  id,
  hasError,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  label,
}) => {
  const Input = type === "textarea" ? "textarea" : "input";

  return (
    <div
      className={classNames.bind(classes)("form-control", {
        invalid: hasError,
      })}
    >
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        {...(type === "input" && { type })}
      />
      {hasError && (
        <p className={classes["error-text"]}>{label} is mandatory.</p>
      )}
    </div>
  );
};
