
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/Landing/LandingPage';
import AuthLayout from './components/Auth/AuthLayout';
import RecruiterDashboard from './components/RecruiterDashboard/RecruiterDashboard';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/auth",
      element: <AuthLayout />
    },
    {
      path: "/Rdashboard",
      element: <RecruiterDashboard />
    }
  ])

function App() {


  return (
   <RouterProvider router={router} />
  )
}

export default App
