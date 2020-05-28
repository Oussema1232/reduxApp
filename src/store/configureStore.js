import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import error from "./middleware/logError";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), error, api],
  });
}
