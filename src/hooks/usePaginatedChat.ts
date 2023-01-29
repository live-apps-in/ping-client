// import { useState } from "react";
import { useActions } from "./useActions";
import { chatApi } from "src/api";
import { useSelector } from ".";
import { GLOBAL } from "src/config";
import { handleError } from "src/utils";
// import { useEffect } from "react";

export const usePaginatedChat = () => {
  const { activeChat } = useSelector((state) => state);
  const { activeChat: activeChatActions } = useActions();
  // const isChatActive = activeChat?.details?._id;
  const lastFetchedLog = activeChat.messages[0];
  //   const [hasNextPage, setHasNextPage] = useState(true);
  // console.log(lastFetchedLog, "lastFetchedLog");

  // useEffect(() => {
  //   if (isChatActive) updateChatLog();
  // }, [isChatActive]);

  const updateChatLog = async () => {
    try {
      const chatLog = await chatApi.fetchChatLog({
        chatId: activeChat.details?._id,
        before: lastFetchedLog?._id,
        limit: GLOBAL.CHAT_PAGINATION_LENGTH,
      });
      activeChatActions.updatePaginatedMessages(chatLog);
    } catch (err) {
      handleError(err);
    }
  };

  return {
    updateChatLog,
    messages: activeChat.messages,
  };
};

// page number method
// export const usePaginatedChat = () => {
//   const { activeChat } = useSelector((state) => state);
//   const { activeChat: activeChatActions } = useActions();
//   const lastFetchedPage =
//     activeChat?.messages.length === 0
//       ? -1
//       : Math.ceil(
//           +(
//             (activeChat?.messages.length || 0) / GLOBAL.CHAT_PAGINATION_LENGTH
//           ).toFixed()
//         );
//   const [page, setPage] = useState(lastFetchedPage);
//   //   const [hasNextPage, setHasNextPage] = useState(true);

//   const updateChatLog = async () => {
//     try {
//       const chatLog = await chatApi.fetchChatLog(
//         activeChat.details?._id,
//         page + 1
//       );
//       activeChatActions.updatePaginatedMessages(chatLog);
//       if (chatLog.length > 0) setPage((prev) => prev + 1);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   return {
//     updateChatLog,
//     currentFetchedPage: page,
//     messages: activeChat.messages,
//   };
// };
