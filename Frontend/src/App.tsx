
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import JobSubmissionForm from './components/Joblisting/job-submission-form'
import DashboardLayout from './components/Candidate/dashboard-layout';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <JobSubmissionForm />
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />
    }
  ])

function App() {


  return (
   <RouterProvider router={router} />
  )
}

export default App
