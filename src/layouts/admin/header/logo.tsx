import { styled } from "@mui/material";
// import { AppLogoFullImage } from "src/assets";
import { mediaQuery } from "src/theme";
import { Link } from "react-router-dom";

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

export const Logo = () => {
  return (
    <StyledLogoWrapper to="/">
      {/* <img src={AppLogoFullImage} alt={projectSetup.title} /> */}
    </StyledLogoWrapper>
  );
};
