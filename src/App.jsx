import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import Important from "./components/Important";
import Maintance from "./components/Maintance";
import { ThemeProvider } from "./theme/theme-provider";
import { Toaster } from "sonner";
import { login } from "../src/components/redux/authSlice";
import './App.css';
import TaskList from "./components/TaskList";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isAuthInLocalStorage = JSON.parse(localStorage.getItem("auth"));
  if (!isAuthenticated && !isAuthInLocalStorage) {
    return <Navigate to="/login" />;
  }

  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login />
    ),
    loader: () => {
      const authData = localStorage.getItem("auth");
      if (authData) {
        return <Navigate to="/" />;
      }
      return null;
    },
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="task" replace />, 
      },
      {
        path: "task",
        element: <TaskList />,
      },
      {
        path: "importance",
        element: <Important />,
      },
      {
        path: "*",
        element: <Maintance />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      dispatch(login(JSON.parse(authData)));
    }
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      localStorage.setItem("theme", "dark");
    }
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Toaster />
        <RouterProvider router={appRouter} />
      </div>
    </ThemeProvider>
  );
}

export default App;
