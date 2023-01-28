import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHAT_MESSAGE_DETAILS, CHAT_STATE } from "src/model";

// details of the chat you are interacting with.
// all details here are about the user you are chatting with. Not about the current loggedin user
const initialState: CHAT_STATE = {
  details: null,
  name: "",
  messages: [],
  userStatus: {
    isTyping: false,
    usersTyping: [],
    isOnline: false,
    lastSeen: null,
  },
};

const activeChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChatDetails: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["details"]>
    ) => ({
      ..._state,
      details: action.payload,
    }),
    setActiveChatName: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["name"]>
    ) => ({
      ..._state,
      name: action.payload,
    }),
    setMessages: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["messages"]>
    ) => ({
      ..._state,
      messages: action.payload,
    }),
    updatePaginatedMessages: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["messages"]>
    ) => ({
      ..._state,
      messages: { ...action.payload, ..._state.messages },
    }),
    updateMessages: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_MESSAGE_DETAILS>
    ) => {
      let currentMessages = _state.messages;
      const newMessage = action.payload;
      // if there is an existing message with same timestamp and the userId
      if (
        currentMessages.find(
          (el) =>
            el._id === newMessage._id &&
            new Date(el.timeStamp).getTime() ===
              new Date(newMessage.timeStamp).getTime()
        )
      ) {
        currentMessages = currentMessages.map((el) => {
          // replace the existing message log with this. Because this is the message which we confirmed that it is sent to the user and only the loading state will be changed
          if (
            el._id === newMessage._id &&
            new Date(el.timeStamp).getTime() ===
              new Date(newMessage.timeStamp).getTime()
          ) {
            return action.payload;
          }
          return el;
        });
        return {
          ..._state,
          messages: currentMessages,
        }; // updated message log
      } else {
        return {
          ..._state,
          messages: [...currentMessages, newMessage],
        };
      }
    },
    setUserStatus: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["userStatus"]>
    ) => ({
      ..._state,
      userStatus: {
        ..._state.userStatus,
        ...action.payload,
      },
    }),
    setIsUserTyping: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["userStatus"]["isTyping"]>
    ) => ({
      ..._state,
      userStatus: {
        ..._state.userStatus,
        isTyping: action.payload,
      },
    }),
    setUsersTyping: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["userStatus"]["usersTyping"]>
    ) => ({
      ..._state,
      userStatus: {
        ..._state.userStatus,
        usersTyping: action.payload,
      },
    }),
    setIsUserOnline: (
      _state: CHAT_STATE,
      action: PayloadAction<CHAT_STATE["userStatus"]["isOnline"]>
    ) => ({
      ..._state,
      userStatus: {
        ..._state.userStatus,
        isOnline: action.payload,
      },
    }),
  },
});

export const { reducer: activeChatReducer, actions: activeChatActions } =
  activeChatSlice;
