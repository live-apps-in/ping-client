import { useRef, useEffect } from "react";
import { CircularProgress, styled } from "@mui/material";
import { CustomButton, CustomIconButton } from "src/components";
import { useChat, useSocket } from "src/hooks";
import { useSelector } from "src/redux";
import { ChatBubble } from "./chat-bubble";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ChatBodyContainer = styled("div")`
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid red;
  padding: 10px;
  max-height: 100%;
  // max-height: calc(100% - 120px);
`;

const ChatFetchingSpinner = styled(CircularProgress)`
  margin: auto;
`;

const CustomIconButtonWrapper = styled(CustomIconButton)`
  position: sticky;
  left: calc(100% - 10px);
  bottom: 10px;
`;

export const ChatBody: React.FC = () => {
  const { listenMessage } = useSocket();
  const { activeChat } = useSelector((state) => state);
  const isChatActive = !!(activeChat.details && activeChat.details._id);
  const chatRef = useRef<HTMLDivElement>();
  const { messages, updateChatLog, isFetching, scrollToBottom } =
    useChat(chatRef);

  useEffect(() => {
    if (isChatActive) listenMessage({ onReceiveMessage: scrollToBottom });
  }, [isChatActive]);

  const scrollToBottomButton = (
    <CustomIconButtonWrapper color="primary" onClick={scrollToBottom}>
      <ArrowDropDownIcon />
    </CustomIconButtonWrapper>
  );

  return (
    <ChatBodyContainer ref={chatRef}>
      {isChatActive ? (
        <>
          {isFetching && <ChatFetchingSpinner />}
          <CustomButton onClick={updateChatLog}>Load more</CustomButton>
          {messages.map((el, index) => (
            <ChatBubble {...el} key={index} />
          ))}
          {scrollToBottomButton}
        </>
      ) : (
        <div>Choose a chat to begin conversation</div>
      )}
    </ChatBodyContainer>
  );
};
