import { BoxProps } from "../../../data";
import { Box } from "../../library-components";
import classes from "../../../assets/scss/ui-components/full-page-wrapper.module.scss";

export const FullPageWrapper = ({ children, className, ...rest }: BoxProps) => {
  return (
    <Box
      {...rest}
      className={[classes["full-page-wrapper"], className].join(" ")}
    >
      {children}
    </Box>
  );
};
