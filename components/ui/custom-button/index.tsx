import { CUSTOM_BUTTON_PROPS } from "../../../data";
import { Button } from "../../library-components";

export const CustomButton = ({
  loading,
  children,
  ...rest
}: CUSTOM_BUTTON_PROPS) => {
  return (
    <Button {...rest}>{loading ? <div>Loading...</div> : children}</Button>
  );
};
