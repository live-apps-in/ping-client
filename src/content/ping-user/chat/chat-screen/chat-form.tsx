import { useEffect } from "react";
import { styled } from "@mui/material";
import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CustomIconButton,
  RecursiveContainer,
} from "src/components";
import SendIcon from "@mui/icons-material/Send";
import { useAuth, useSelector, useSocket } from "src/hooks";
import { CHAT_MESSAGE_DETAILS } from "src/model";
import { chatSchema } from "src/schema";

const ChatFormContainer = styled("div")`
  border: 1px solid red;
  padding: 5px;
  height: 60px;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 50px;
    gap: 10px;
  }
`;

export const ChatForm: React.FC = () => {
  const { sendMessage } = useSocket();
  const { activeChat } = useSelector((state) => state);
  const activeChatDetails = activeChat.details;
  const activeChatId = activeChatDetails?._id;
  const isChatActive = !!activeChatId;

  // userId
  const { data: profileDetails } = useAuth();
  const userId = profileDetails?._id;

  const handleSubmit = (data) => {
    const details: CHAT_MESSAGE_DETAILS = {
      sender: userId,
      createdAt: new Date(),
      ...data,
    };
    formik.resetForm({ values: { message: "" } });
    console.log(details);
    sendMessage(details);
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: handleSubmit,
    validationSchema: chatSchema,
  });

  const config: CONFIG_TYPE = [
    {
      name: "message",
      placeholder: "Type your message",
      size: "small",
      sx: {
        margin: 0,
      },
      autoFocus: true,
    },
  ];
  // console.log("chat details:", activeChat);

  return (
    isChatActive && (
      <ChatFormContainer>
        <form onSubmit={formik.handleSubmit}>
          <RecursiveContainer formik={formik} config={config} />
          <CustomIconButton type="submit">
            <SendIcon />
          </CustomIconButton>
        </form>
      </ChatFormContainer>
    )
  );
};
