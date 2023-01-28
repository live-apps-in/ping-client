import { styled } from "@mui/material";
import { ChatBody } from "./chat-body";
import { ChatForm } from "./chat-form";
import { ChatHeader } from "./chat-header";

const ChatScreenContainer = styled("div")`
  display: grid;
  grid-template-rows: 60px 1fr auto;
  border: 1px solid red;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
`;

export const ChatScreen: React.FC = () => {
  return (
    <ChatScreenContainer>
      <ChatHeader />
      <ChatBody />
      <ChatForm />
    </ChatScreenContainer>
  );
};
