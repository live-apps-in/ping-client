// import { AppLogoFullImage } from "src/assets";
import { mediaQuery } from "src/theme";
import { Link, LinkProps } from "react-router-dom";
import { styled } from "@mui/material";

const StyledLogoWrapper = styled(Link)`
  img {
    width: 180px;
    height: 50px;
  }
  ${mediaQuery.up("sm")} {
    img {
      width: 225px;
      height: 65px;
    }
  }
`;

interface LINK_PROPS extends Omit<LinkProps, "to"> {
  to?: LinkProps["to"];
}

export const Logo: React.FC<LINK_PROPS> = (props) => {
  return (
    <StyledLogoWrapper to="/" {...props}>
      {/* <img src={AppLogoFullImage} alt={projectSetup.title} /> */}
    </StyledLogoWrapper>
  );
};
