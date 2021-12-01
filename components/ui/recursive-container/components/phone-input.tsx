import React from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { PHONE_INPUT_PROPS } from "../../../../data";

export function PhoneInputComponent({
  onChange,
  value,
  ...rest
}: PHONE_INPUT_PROPS) {
  let alteredValue = `${value || ""}`;
  if (alteredValue) {
    alteredValue = alteredValue.toString();
  }

  let inputProps: any = {
    disabled: false,
    ...rest.inputProps,
  };
  if (rest.required) {
    inputProps = {
      ...inputProps,
      pattern: ".{6,}",
      title: "The Phone number is required",
    };
  }

  const changeHandler = (phone: any) => {
    if (onChange) onChange(phone);
  };

  return (
    <MuiPhoneNumber
      defaultCountry="ae"
      variant="outlined"
      {...rest}
      inputProps={{
        ...inputProps,
        placeholder: rest.placeholder || inputProps.placeholder,
        disabled: rest.disabled || inputProps.disabled,
      }}
      disableDropdown={rest.disabled || inputProps.disabled}
      value={alteredValue}
      onChange={changeHandler}
    />
  );
}
