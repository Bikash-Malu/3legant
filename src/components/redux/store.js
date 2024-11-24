import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import tasksReducer from './tasksSlice';
import authReducer from './authSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  tasks: persistReducer(persistConfig, tasksReducer), 
  auth: persistReducer(persistConfig, authReducer),   
};

export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
