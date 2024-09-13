import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.slice";

export const store = configureStore({
  reducer:{
    auth:authSlice
  }
});

