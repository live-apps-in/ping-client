import { styled } from "@mui/material";

const ChatBodyContainer = styled("div")`
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid red;
  padding: 10px;
`;

export const ChatBody: React.FC = () => {
  return <ChatBodyContainer>Chat body</ChatBodyContainer>;
};
