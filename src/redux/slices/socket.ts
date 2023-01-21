import { createSlice } from "@reduxjs/toolkit";

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
