import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import tasksReducer from './tasksSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root', // The key to store the persisted data in localStorage
  storage, // Use localStorage (or sessionStorage) for persistence
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedReducer, // Use the persisted reducer
  },
});

// Persistor is used to persist the store
export const persistor = persistStore(store);
