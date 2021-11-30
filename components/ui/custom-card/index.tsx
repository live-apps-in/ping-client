import { CUSTOM_CARD_PROPS } from "../../../data";
import { Paper, Typography } from "../../library-components";

export const CustomCard = (props: CUSTOM_CARD_PROPS) => {
  const { header, footer, ...rest } = props;
  return (
    <Paper
      elevation={5}
      {...rest}
      sx={{
        padding: 2,
        borderRadius: 2,
        ...rest.sx,
      }}
    >
      {header &&
        (header.title ? (
          <Typography variant="h6" {...header.props}>
            {header.title}
          </Typography>
        ) : header.component ? (
          header.component
        ) : null)}
      {rest.children}
      {footer &&
        (footer.title ? (
          <Typography {...footer.props}>{footer.title}</Typography>
        ) : footer.component ? (
          footer.component
        ) : null)}
    </Paper>
  );
};
