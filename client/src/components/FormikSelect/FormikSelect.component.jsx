import { BaseSelect } from "components";

export const FormikSelect = ({
  extraClassName,
  placeholder,
  field,
  form,
  options,
  isMulti,
  id,
}) => {
  const onChange = (option) =>
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );

  const getValue = () => {
    if (options)
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    else return isMulti ? [] : "";
  };

  return (
    <BaseSelect
      value={getValue()}
      onChange={onChange}
      name={field.name}
      extraClassName={extraClassName}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      id={id}
    />
  );
};
