import { useEffect, useState } from "react";
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
  });
  const rooms = [
    {
      user: { name: "Jaga", _id: "test" },
    },
    {
      user: { name: "Dikshit", _id: "test" },
    },
  ];

  // implement in react-query later
  const [activeTab, setActiveTab] = useState(null);

  const { connectionStatus, createRoom } = useSocket();

  useEffect(() => {
    connectionStatus();
  }, []);

  const handleChatMemberClick = (_id, index) => {
    setActiveTab(index);
    createRoom(chats.find((el) => el._id === _id));
  };

  return (
    <SidebarContainer>
      <CustomText>Hardcoded Data for test</CustomText>
      {rooms.map((room, index) => (
        <SidebarItem
          key={index}
          isActive={activeTab === index}
          onClick={() => handleChatMemberClick(room.user._id, index)}
          {...room}
        />
      ))}
      <br />
      <CustomText>Original data from DB</CustomText>
      {chats.map((chat) => (
        <SidebarItem
          key={chat.user._id}
          isActive={activeTab === chat.user._id}
          onClick={() => handleChatMemberClick(chat.user._id, chat.user._id)}
          {...chat}
        />
      ))}
    </SidebarContainer>
  );
};
