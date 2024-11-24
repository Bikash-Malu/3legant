import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This defaults to localStorage for web
import tasksReducer from './tasksSlice';
import authReducer from './authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can use whitelist to persist only certain slices, or remove it to persist everything
};

const rootReducer = {
  tasks: persistReducer(persistConfig, tasksReducer),  // Persist tasks slice
  auth: persistReducer(persistConfig, authReducer),    // Persist auth slice
};

// Create Redux store
export const store = configureStore({
  reducer: rootReducer,
});

// Create persistor
export const persistor = persistStore(store);
