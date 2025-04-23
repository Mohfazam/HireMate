
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/Landing/LandingPage';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    // {
    //   path: "/sub",
    //   element: <JobSubmissionForm />
    // },
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
