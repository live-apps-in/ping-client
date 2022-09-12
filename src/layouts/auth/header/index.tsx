import { Actions } from "./actions";
import { Logo } from "./logo";
import { NAVIGATION_LINKS } from "src/routes";
import { FlexRow, JustifyBetween, YCenter } from "src/components";
import { mediaQuery } from "src/theme";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Typography, useTheme, styled } from "@mui/material";

const StyledDesktopHeaderWrapper = styled(JustifyBetween)`
  padding: 20px;
  align-items: center;
  ${mediaQuery.down(1200)} {
    display: none;
  }
`;

const StyledTabletHeaderWrapper = styled(JustifyBetween)`
  padding: 20px;
  align-items: center;
  ${mediaQuery.down("md")} {
    display: none;
  }
  ${mediaQuery.up(1200)} {
    display: none;
  }
`;

const StyledMobileHeaderWrapper = styled(JustifyBetween)(
  ({ theme }) => `
  width: 100%;
  background-color: ${theme.colors.primary};
  padding: 19px;
  align-items: center;
  ${mediaQuery.up("md")} {
    display: none;
  }
`
);

const StyledNavigationWrapper = styled(YCenter)``;

export interface HEADER_PROPS {
  navigationLinks?: NAVIGATION_LINKS;
  actions?: React.ReactNode;
}

export const Header = ({ navigationLinks = [], actions = null }) => {
  const [title, setTitle] = useState(document.title);
  const theme = useTheme();

  useEffect(() => {
    setTitle(document.title);
  }, [document.title]);

  return (
    <>
      <Helmet onChangeClientState={(newState) => setTitle(newState.title)} />
      <StyledMobileHeaderWrapper>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: theme.colors.white }}
        >
          {title}
        </Typography>
        {actions}
      </StyledMobileHeaderWrapper>
      <StyledTabletHeaderWrapper>
        <Logo />
        <FlexRow style={{ alignItems: "center", gap: 10 }}>{actions}</FlexRow>
      </StyledTabletHeaderWrapper>
      <StyledDesktopHeaderWrapper>
        <Logo />
        <StyledNavigationWrapper>
          {actions && <Actions>{actions}</Actions>}
        </StyledNavigationWrapper>
      </StyledDesktopHeaderWrapper>
    </>
  );
};
