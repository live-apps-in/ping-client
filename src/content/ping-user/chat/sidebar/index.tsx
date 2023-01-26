import { useState } from "react";
import { styled } from "@mui/material";
import { useSocket } from "src/hooks";
import { SidebarItem } from "./sidebar-item";
import { useQueryState } from "src/hooks";
import { chatApi } from "src/api";
import { handleError } from "src/utils";
import { CustomText } from "src/components";

const SidebarContainer = styled("div")`
  border: 1px solid red;
`;

export const Sidebar: React.FC = () => {
  const [chats = [], loading] = useQueryState({
    queryKey: "chats",
    queryFn: chatApi.getChatList,
    onError: handleError,
    refetchOnWindowFocus: false,
  });

  // implement in react-query later
  const [activeTab, setActiveTab] = useState(null);

  const { createRoom } = useSocket();

  const handleChatMemberClick = (_id) => {
    setActiveTab(_id);
    const chatDetails = chats.find((el) => el.user._id === _id);
    createRoom({ _id: chatDetails._id });
  };

  return (
    <SidebarContainer>
      <CustomText>Original data from DB</CustomText>
      {chats.map((chat) => (
        <SidebarItem
          key={chat.user._id}
          isActive={activeTab === chat.user._id}
          onClick={() => handleChatMemberClick(chat.user._id)}
          {...chat}
        />
      ))}
    </SidebarContainer>
  );
};
