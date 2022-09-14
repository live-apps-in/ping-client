import { styled } from "@mui/material";

const MainContentWrapper = styled("div")`
  width: 100vw;
  max-width: 100vw;
  overflow: auto;
  height: 100vh;
  max-height: 100vh;
`;

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <MainContentWrapper>{children}</MainContentWrapper>
    </>
  );
};
