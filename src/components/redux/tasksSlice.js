import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const response = await axios.get(
  "https://mocki.io/v1/ba43e6bf-766f-41da-9112-344ca76d2db2"
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: response.data,
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
    toggleTaskImportance: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    deleteAllTasks: (state) => {
      state.list = [];
    },
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(), 
        text: action.payload.text,
        completed: false,
        important: false,
      };
      state.list.push(newTask);
    },
  },
});

export const {
  setLoading,
  setTasks,
  toggleTaskCompletion,
  toggleTaskImportance,
  deleteTask,
  deleteAllTasks,
  addTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
