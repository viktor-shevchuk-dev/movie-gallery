import Select, { components } from "react-select";
import classNames from "classnames/bind";

import { ReactComponent as Indicator } from "icons/dropdown-indicator.svg";

import classes from "./BaseSelect.module.css";
import { ReactComponent as CloseIcon } from "icons/close.svg";

const closeIconWrapperStyle = {
  paddingRight: "6px",
  paddingTop: "6px",
  paddingBottom: "4px",
};

const closeIconStyle = {
  display: "block",
  marginLeft: "auto",
};

const MenuList = (props) => (
  <>
    <div style={closeIconWrapperStyle}>
      <CloseIcon style={closeIconStyle} />
    </div>
    <components.MenuList {...props}>{props.children}</components.MenuList>
  </>
);

export const BaseSelect = ({
  options,
  isMulti,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  extraClassName,
  defaultMenuIsOpen,
  menuIsOpen,
  dropdownIndicator,
  onCloseOptions,
  closeMenuOnSelect,
}) => {
  return (
    <Select
      styles={{
        MenuList: (provided, { isFocused }) => ({
          ...provided,
          backgroundColor: isFocused && "#555555",
          borderRadius: 4,
        }),
        option: (provided, { isFocused }) => ({
          ...provided,
          backgroundColor: isFocused && "#f65261",
        }),
      }}
      closeMenuOnSelect={closeMenuOnSelect}
      menuIsOpen={menuIsOpen}
      options={options}
      isMulti={isMulti}
      id={id}
      openMenuOnFocus={true}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={classNames.bind(classes)("base-select", {
        [extraClassName]: extraClassName,
      })}
      isClearable={false}
      isSearchable={false}
      defaultMenuIsOpen={defaultMenuIsOpen}
      components={{
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            {dropdownIndicator}
          </components.DropdownIndicator>
        ),
        IndicatorSeparator: null,
        MenuList: (props) => (
          <>
            <div style={closeIconWrapperStyle} onClick={onCloseOptions}>
              <CloseIcon style={closeIconStyle} />
            </div>
            <components.MenuList {...props}>
              {props.children}
            </components.MenuList>
          </>
        ),
      }}
    />
  );
};
