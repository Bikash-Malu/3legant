import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import tasksReducer from './tasksSlice';
const persistConfig = {
  key: 'root', 
  storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedReducer, // Use the persisted reducer
  },
});

// Persistor is used to persist the store
export const persistor = persistStore(store);
