import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './layout/UserLayout'
import Home from './pages/sections/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { Toaster } from './components/ui/sonner'
import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
