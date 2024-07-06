import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import IdentityLayout from "./layouts/identity-layout";
import Register from "./pages/Register";
import { ProtectedRoute, PublicRoute } from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from './pages/Profile'
import MainLayout from "./layouts/mainLayout/MainLayout";
import CreateNewClass from "./pages/CreateNewClass";
import TestSchedulee from './pages/TestSchedule'
import MyAssignments from "./pages/MyAssignments";
import MyClasses from "./pages/MyClasses";
import MyWeeklyPlans from "./pages/MyWeeklyPlans";
import OnlineExamProgram from "./pages/OnlineExamProgram";
import PurchaseSubscription from "./pages/PurchaseSubscription";
import MidtermQuestions from "./pages/MidtermQuestions";
import EndQuestions from "./pages/EndQuestions";
import ClassDetails from "./pages/ClassDetails";
import JoinClass from "./pages/course/JoinClass";
import MyRecord from "./pages/MyRecord";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        ),
      },
      {
        path: "createNewClass",
        element: (
          <ProtectedRoute>
            <CreateNewClass />
          </ProtectedRoute>
        ),
      },
      {
        path: "testSchedule",
        element: (
          <ProtectedRoute>
            <TestSchedulee />
          </ProtectedRoute>
        ),
      },
      {
        path: "myAssignments",
        element: (
          <ProtectedRoute>
            <MyAssignments />
          </ProtectedRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <ProtectedRoute>
            <MyClasses />
          </ProtectedRoute>
        ),
      },
      {
        path: "myClasses/:classId/*",
        element: (
          <ProtectedRoute>
            <ClassDetails />
          </ProtectedRoute>
        ),
      },
      {
        path:"course/JoinClass/:classId/*",
        element: (
          <ProtectedRoute>
            <JoinClass />
          </ProtectedRoute>
        ),
      },
      {
        path: "myRecord",
        element: (
          <ProtectedRoute>
            <MyRecord />
          </ProtectedRoute>
        ),
      },
      {
        path: "myWeeklyPlans",
        element: (
          <ProtectedRoute>
            <MyWeeklyPlans />
          </ProtectedRoute>
        ),
      },
      {
        path: "onlineExamProgram",
        element: (
          <ProtectedRoute>
            <OnlineExamProgram />
          </ProtectedRoute>
        ),
      },
      {
        path: "purchaseSubscription",
        element: (
          <ProtectedRoute>
            <PurchaseSubscription />
          </ProtectedRoute>
        ),
      },
      {
        path: "midtermQuestions",
        element: (
          <ProtectedRoute>
            <MidtermQuestions />
          </ProtectedRoute>
        ),
      },
      {
        path: "end-of-semester-questions",
        element: (
          <ProtectedRoute>
            <EndQuestions />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/account",
    element: <IdentityLayout />,
    children: [
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
]);
export default router;
// account/register
