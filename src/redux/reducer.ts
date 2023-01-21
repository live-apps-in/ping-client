import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, socketReducer, themeReducer } from "./slices";

export const reducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  socket: socketReducer,
});
