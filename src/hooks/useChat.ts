import { useState } from "react";
import { useActions } from "./useActions";
import { useEffect } from "react";
import { chatApi } from "src/api";
import { useSelector } from ".";
import { GLOBAL } from "src/config";
import { handleError } from "src/utils";

export const useChat = <T>(
  chatContainerRef: React.MutableRefObject<HTMLDivElement>
) => {
  const { activeChat } = useSelector((state) => state);
  const { activeChat: activeChatActions } = useActions();
  const isChatActive = activeChat?.details?._id;
  const lastFetchedLog = activeChat.messages[0];
  const [isFetching, setIsFetching] = useState(false);
  //   const [hasNextPage, setHasNextPage] = useState(true);
  // console.log(lastFetchedLog, "lastFetchedLog");

  // fetch the chats initially while chat screen rendered
  useEffect(() => {
    if (isChatActive && activeChat.messages?.length === 0) updateChatLog();
  }, [activeChat]);

  const updateChatLog = async () => {
    setIsFetching(true);
    try {
      const chatLog = await chatApi.fetchChatLog({
        chatId: activeChat.details?._id,
        before: lastFetchedLog?._id,
        limit: GLOBAL.CHAT_PAGINATION_LENGTH,
      });
      // update details in redux
      activeChatActions.updatePaginatedMessages(chatLog);
    } catch (err) {
      handleError(err);
    }
    setIsFetching(false);
  };

  // const scrollTo

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // update the scrollTop of the container to the value of its height
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return {
    updateChatLog,
    scrollToBottom,
    messages: activeChat.messages,
    isFetching,
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
