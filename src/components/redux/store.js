import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tasksReducer from "./tasksSlice";
import authReducer from "./authSlice";
const tasksPersistConfig = {
  key: "tasks",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};
const rootReducer = {
  tasks: persistReducer(tasksPersistConfig, tasksReducer), 

  auth: persistReducer(authPersistConfig, authReducer), 
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
