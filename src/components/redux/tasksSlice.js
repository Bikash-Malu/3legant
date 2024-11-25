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

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: loadTasksFromLocalStorage(),
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTasks: (state, action) => {
      state.list = action.payload;
      saveTasksToLocalStorage(state.list);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.list);
      }
    },
    toggleTaskImportance: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.important = !task.important;
        saveTasksToLocalStorage(state.list);
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.list);
    },
    deleteAllTasks: (state) => {
      state.list = [];
      saveTasksToLocalStorage(state.list);
    },
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(), // Generate a unique ID
        text: action.payload.text,
        completed: false,
        important: false,
      };
      state.list.push(newTask);
      saveTasksToLocalStorage(state.list);
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
