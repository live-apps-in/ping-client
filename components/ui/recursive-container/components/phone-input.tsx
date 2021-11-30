import React from "react";
import PhoneInput from "react-phone-input-2";
import { PHONE_INPUT_PROPS } from "../../../../data";

export const PhoneInputComponent = React.forwardRef<
  HTMLElement,
  PHONE_INPUT_PROPS
>(function PhoneNumber({ onChange, value, ...rest }: PHONE_INPUT_PROPS, ref) {
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

  const changeHandler = (
    value: string,
    data: any,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    if (onChange) onChange({ ...event, target: { ...event.target, value } });
  };

  return (
    <PhoneInput
      {...rest}
      inputProps={inputProps}
      country="ae"
      disableDropdown={rest.disabled || inputProps.disabled}
      value={alteredValue}
      onChange={changeHandler}
    />
  );
});
