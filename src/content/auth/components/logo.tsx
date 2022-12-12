import { AppLogoFullImage } from "src/assets";
import { mediaQuery } from "src/theme";
import { Link, LinkProps } from "react-router-dom";
import { styled } from "@mui/material";
import { projectConfig } from "src/config";

const StyledLogoWrapper = styled(Link)`
  img {
    width: 94.5px;
    height: 57.2px;
  }
  ${mediaQuery.up("sm")} {
    img {
      width: 132.4px;
      height: 80.2px;
    }
  }
`;

interface LINK_PROPS extends Omit<LinkProps, "to"> {
  to?: LinkProps["to"];
}

export const Logo: React.FC<LINK_PROPS> = (props) => {
  return (
    <StyledLogoWrapper to="/" {...props}>
      <img src={AppLogoFullImage} alt={projectConfig.title} />
    </StyledLogoWrapper>
  );
};
