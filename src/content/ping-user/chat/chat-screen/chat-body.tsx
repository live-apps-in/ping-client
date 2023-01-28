import { styled } from "@mui/material";
import { useSelector } from "src/redux";
import { ChatBubble } from "./chat-bubble";

const ChatBodyContainer = styled("div")`
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid red;
  padding: 10px;
  max-height: 100%;
  // max-height: calc(100% - 120px);
`;

export const ChatBody: React.FC = () => {
  const { activeChat } = useSelector((state) => state);
  const isChatActive = !!(activeChat.details && activeChat.details._id);
  const { messages } = activeChat;

  return (
    <ChatBodyContainer>
      {isChatActive ? (
        messages.map((el, index) => <ChatBubble {...el} key={index} />)
      ) : (
        <div>Choose a chat to begin conversation</div>
      )}
    </ChatBodyContainer>
  );
};
