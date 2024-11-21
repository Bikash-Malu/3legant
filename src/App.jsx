import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { ThemeProvider } from './theme/theme-provider'; // Ensure this path is correct
import Dashboard from './components/Dashboard';
import Task from './components/Task'; // Ensure Task is imported correctly
import Today from './components/Today';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />, // Dashboard as the parent route
    children: [
      {
        path: 'task', // Child route for tasks
        element: <Task />,
      },
      {
        path: 'today', // Child route for tasks
        element: <Today />,
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
