import { useEffect } from "react";
import { styled } from "@mui/material";
import { useFormik } from "formik";
import {
  CONFIG_TYPE,
  CustomIconButton,
  RecursiveContainer,
} from "src/components";
import SendIcon from "@mui/icons-material/Send";
import { useAuth, useQueryState, useSocket } from "src/hooks";
import { SOCKET_QUERY_CACHE_KEYS } from "src/config";

const ChatFormContainer = styled("div")`
  border: 1px solid red;
  padding: 5px;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 50px;
    gap: 10px;
  }
`;

export const ChatForm: React.FC = () => {
  const { sendMessage, listenMessage } = useSocket();
  const [activeChatId] = useQueryState({
    queryKey: `${SOCKET_QUERY_CACHE_KEYS.CHAT}.activeChatId`,
  });
  const [activeChat = {}] = useQueryState<Object>({
    queryKey: `${SOCKET_QUERY_CACHE_KEYS.CHAT}.${activeChatId}.details`,
  });
  const isActiveChatAvailable = !!activeChatId;

  // userId
  const { data: profileDetails } = useAuth();
  const userId = profileDetails?.id;

  useEffect(() => {
    if (activeChatId) listenMessage({ _id: activeChatId });
  }, [activeChatId]);

  const handleSubmit = (data) => {
    const details = { data: { ...data, userId }, ...activeChat };
    sendMessage(details);
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: handleSubmit,
  });

  const config: CONFIG_TYPE = [
    {
      name: "message",
      placeholder: "Type your message",
      size: "small",
      sx: {
        margin: 0,
      },
    },
  ];
  console.log("chat details:", activeChat);

  return (
    isActiveChatAvailable && (
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
