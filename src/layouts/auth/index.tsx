import { navigationLinks } from "src/routes";
import { Header } from "./header";
import { styled } from "@mui/material";
import { layoutSettings } from "./layout-settings";

const MainContentWrapper = styled("div")`
  width: 100vw;
  max-width: 100vw;
  overflow: auto;
  height: calc(100vh - ${layoutSettings.header.height});
  max-height: 100vh;
`;

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header navigationLinks={navigationLinks.authLayout} />
      <MainContentWrapper>{children}</MainContentWrapper>
    </>
  );
};
