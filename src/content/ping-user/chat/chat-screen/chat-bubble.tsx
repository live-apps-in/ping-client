import { styled } from "@mui/material";
import { CustomText, FlexColumn, FlexRow } from "src/components";
import { CHAT_MESSAGE_DETAILS } from "src/model";
import { useSelector } from "src/redux";
import { getTimeCollapsed } from "src/utils";

const ChatBubbleContainer = styled(FlexRow as any)(
  (props: any) => `
    flex-direction: ${props.rightAlign ? "row-reverse" : "row"};
    overflow: hidden;
    padding: 20px;
`
);

const ChatBubbleWrapper = styled(FlexColumn)`
  min-width: 100px;
  max-width: 90%;
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 0 #cccccc;
`;

const ChatBubbleTitleWraper = styled("div")`
  padding: 3px 5px;
  border-bottom: 1px solid grey;
`;

const ChatBubbleMessageWrapper = styled("div")`
  padding: 5px;
`;

const ChatBubbleFooter = styled(FlexRow)`
  flex-direction: row-reverse;
  padding: 3px;
`;

export const ChatBubble: React.FC<CHAT_MESSAGE_DETAILS> = (props) => {
  const { sender, message, createdAt, isLoading } = props;
  const { _id: currentUserId } = useSelector((state) => state.auth.data);

  const isSelfChatBubble = sender === currentUserId;

  return (
    <ChatBubbleContainer rightAlign={isSelfChatBubble}>
      <ChatBubbleWrapper>
        <ChatBubbleTitleWraper>
          <CustomText variant="body2">{sender}</CustomText>
        </ChatBubbleTitleWraper>
        <ChatBubbleMessageWrapper>
          <CustomText variant="body1">{message}</CustomText>
        </ChatBubbleMessageWrapper>
        <ChatBubbleFooter>
          <CustomText align="right" variant="caption">
            {getTimeCollapsed(createdAt)}
          </CustomText>
        </ChatBubbleFooter>
      </ChatBubbleWrapper>
    </ChatBubbleContainer>
  );
};
