import {
  ACTIVE_CHAT_DETAILS,
  CHAT_LIST,
  CHAT_MESSAGE_DETAILS,
  CHAT_STATE,
} from "src/model";
import { createApiFunction, getSearchString } from "src/utils";
import { gateway } from "./gateway";

class ChatApi {
  getChatList(): Promise<CHAT_LIST> {
    return createApiFunction(() => gateway.get("/chats"));
  }
  fetchChatLog({
    chatId,
    before,
    limit,
  }: {
    chatId: ACTIVE_CHAT_DETAILS["_id"];
    before: CHAT_MESSAGE_DETAILS["_id"];
    limit: number;
  }): Promise<CHAT_STATE["messages"]> {
    return createApiFunction(() =>
      gateway.get(
        `/chats/${chatId}/messages?${getSearchString({ before, limit })}`
      )
    );
  }
}

export const chatApi = new ChatApi();
