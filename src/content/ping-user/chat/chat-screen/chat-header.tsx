import { styled } from "@mui/material";

const ChatHeaderContainer = styled("div")`
  border: 1px solid red;
  padding: 10px;
`;

export const ChatHeader: React.FC = () => {
  return <ChatHeaderContainer>Header</ChatHeaderContainer>;
};
