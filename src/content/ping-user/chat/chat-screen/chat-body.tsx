import { styled } from "@mui/material";
import { useSelector } from "src/redux";

const ChatBodyContainer = styled("div")`
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid red;
  padding: 10px;
`;

export const ChatBody: React.FC = () => {
  const { activeChat } = useSelector((state) => state);
  const isChatActive = !!(activeChat.details && activeChat.details._id);

  return (
    <ChatBodyContainer>
      {isChatActive ? (
        "Chat screen"
      ) : (
        <div>Choose a chat to begin conversation</div>
      )}
    </ChatBodyContainer>
  );
};
