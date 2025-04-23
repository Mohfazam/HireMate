
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/Landing/LandingPage';
import AuthLayout from './components/Auth/AuthLayout';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/auth",
      element: <AuthLayout />
    },
    // {
    //   path: "/dashboard",
    //   element: <DashboardLayout />
    // }
  ])

function App() {


  return (
   <RouterProvider router={router} />
  )
}

export default App
