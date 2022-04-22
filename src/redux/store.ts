import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import userSlice from "./userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import memoriesSlice from "./memoriesSlice";
import memoryPageSlice from "./memoryPageSlice";

const persistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    memories: memoriesSlice,
    memory: memoryPageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
