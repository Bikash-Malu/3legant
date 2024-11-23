import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { ThemeProvider } from './theme/theme-provider'; // Ensure this path is correct
import Dashboard from './components/Dashboard';
import Task from './components/Task'; // Ensure Task is imported correctly
import Today from './components/Maintance';
import Maintance from './components/Maintance';
import Important from './components/Important';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const appRouter = createBrowserRouter([
  {
    path: '/login', 
    element: <Login />, 
  },
  {
    path: '/signup', 
    element: <Signup />, 
  },

  {
    path: '/', 
    element: <Dashboard />, 
    children: [
      {
        path: '/',
        element: <Navigate to="task" />,
      },
      {
        path: 'task',
        element: <Task />,
      },
      {
        path: '*',
        element: <Maintance />,
      },
      {
        path: 'importance', 
        element: <Important />,
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
