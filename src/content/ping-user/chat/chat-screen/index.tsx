import { styled } from "@mui/material";
import { ChatBody } from "./chat-body";
import { ChatForm } from "./chat-form";
import { ChatHeader } from "./chat-header";

const ChatScreenContainer = styled("div")`
  border: 1px solid red;
  display: grid;
  grid-template-rows: 60px 1fr 60px;
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
