import { useField } from "formik";

import { BaseSelect } from "components";

export const MultiSelect = ({
  extraClassName,
  placeholder,
  options,
  id,
  field,
}) => {
  const [{ name }, state, { setValue, setTouched }] = useField(field.name);

  const onChange = (value) => setValue(value);

  return (
    <BaseSelect
      value={state?.value}
      onChange={onChange}
      onBlur={setTouched}
      name={name}
      extraClassName={extraClassName}
      placeholder={placeholder}
      options={options}
      isMulti
      id={id}
    />
  );
};
