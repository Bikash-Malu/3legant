import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const defaultTasks = [
  { id: 1, text: "Buy groceries", completed: false, important: false },
  { id: 2, text: "Finish project report", completed: false, important: true },
  { id: 3, text: "Call the bank", completed: false, important: false },
  { id: 4, text: "Schedule dentist appointment", completed: false, important: false },
  { id: 5, text: "Plan weekend trip", completed: false, important: false },
  { id: 6, text: "Read a book", completed: true, important: false },
  { id: 7, text: "Clean the house", completed: true, important: false },
  { id: 8, text: "Prepare presentation", completed: true, important: false },
  { id: 9, text: "Update blog", completed: true, important: false },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: defaultTasks,
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
