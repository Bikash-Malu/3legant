import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { ThemeProvider } from './theme/theme-provider'; // Ensure this path is correct
import Dashboard from './components/Dashboard';
import Task from './components/Task'; // Ensure Task is imported correctly
import Today from './components/Maintance';
import Maintance from './components/Maintance';

const appRouter = createBrowserRouter([
  {
    path: '/', // Parent route for the Dashboard
    element: <Dashboard />, // Dashboard as the parent route
    children: [
      {
        path: '/', // Redirect to /task when visiting the root
        element: <Navigate to="task" />,
      },
      {
        path: 'task', // Child route for tasks
        element: <Task />,
      },
      {
        path: '*', // Child route for today page
        element: <Maintance />,
      },
    ],
  },

]);

function App() {
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
