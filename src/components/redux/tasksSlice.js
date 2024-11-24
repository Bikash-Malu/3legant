import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],   
    loading: false,  
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    toggleTaskImportance: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    deleteAllTasks: (state) => {
      state.list = []; 
    },
  },
});

export const { 
  setLoading, 
  setTasks, 
  toggleTaskCompletion, 
  toggleTaskImportance, 
  deleteTask, 
  deleteAllTasks 
} = tasksSlice.actions;

export default tasksSlice.reducer;
