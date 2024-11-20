import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import { Toaster } from 'sonner'
import ForgotPassword from './components/auth/ForgetPassword'
import Home from './components/Home'
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/terms',
    element: <ForgotPassword />
  },
  {
    path: '/home',
    element: <Home />
  },


])
function App() {

  return (
    <div>
      <Toaster/>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
