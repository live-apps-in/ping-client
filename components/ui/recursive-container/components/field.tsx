import { useState } from "react";
import { FIELD_PROPS, uniqId } from "../../../../data";
import {
  TextField,
  InputAdornment,
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../../library-components";
import {
  accessValueByString,
  filterNumbers,
  isRequiredField,
} from "../../../../utils";
import { PhoneInputComponent } from "./phone-input";

export const Field: React.FC<FIELD_PROPS> = (props) => {
  const { validationSchema, formik, type, name, addon, onChange, ...rest } =
    props;

  const id = uniqId();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const isRequired =
    validationSchema &&
    (isRequiredField(validationSchema, name) || rest.isRequired);
  const error =
    formik.errors && accessValueByString(formik.errors, name)?.toString();

  let value = accessValueByString(formik.values, name);
  if (type === "date") value = value && new Date(value);
  const touched = accessValueByString(formik.touched, name);
  const addonPosition = addon && addon.position ? addon.position : "end";

  switch (type) {
    case "text":
      return (
        <TextField
          {...rest}
          name={name}
          type="text"
          error={error && touched}
          helperText={error || rest.helperText}
          onChange={(e) => {
            if (onChange) onChange(e);
            formik.handleChange(e);
          }}
          InputProps={{
            [`${addonPosition}Adornment`]: addon && (
              <InputAdornment position={addonPosition}>
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "password":
      return (
        <TextField
          {...rest}
          name={name}
          type={passwordOpen ? "text" : "password"}
          error={error && touched}
          helperText={error || rest.helperText}
          onChange={(e) => {
            if (onChange) onChange(e);
            formik.handleChange(e);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position={addonPosition}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordOpen((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge={addonPosition}
                >
                  {passwordOpen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                {addon && addonPosition === "end" && addon.component}
              </InputAdornment>
            ),
            startAdornment: addonPosition === "start" && addon && (
              <InputAdornment position="start">
                {addon.component}
              </InputAdornment>
            ),
            ...rest.InputProps,
          }}
        />
      );
    case "phone":
      return (
        <TextField
          {...rest}
          name={name}
          error={error && touched}
          value={value}
          helperText={error || rest.helperText}
          onChange={(event) => {
            let phone: any = event.target.value;
            phone = filterNumbers(phone);
            if (onChange) onChange(phone);
            formik.setFieldValue(name, phone);
          }}
          InputProps={{
            inputComponent: (phoneNumberInputProps) =>
              (
                <PhoneInputComponent
                  {...phoneNumberInputProps}
                  inputProps={{
                    // className: "form-control",
                    placeholder: rest.placeholder,
                    disabled: rest.disabled,
                    ...rest.inputProps,
                  }}
                />
              ) as any,
          }}
          variant="standard"
        />
      );
    default:
      return <TextField {...rest} name={name} type="text" />;
  }
};
