import { createSlice } from "@reduxjs/toolkit";

// if you have any socket details that should be used globally, save them here
const initialState = {};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setRooms: (_state, action) => ({
      ...initialState,
      room: action.payload,
    }),
  },
});

export const { reducer: socketReducer, actions: socketActions } = socketSlice;
