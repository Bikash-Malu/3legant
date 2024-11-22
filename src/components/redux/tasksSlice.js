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
        task.completed = !task.completed; // Toggle the completion status
      }
    },
    toggleTaskImportance: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.important = !task.important; // Toggle the importance status
      }
    },
  },
});

export const { setLoading, setTasks, toggleTaskCompletion, toggleTaskImportance } = tasksSlice.actions;
export default tasksSlice.reducer;
