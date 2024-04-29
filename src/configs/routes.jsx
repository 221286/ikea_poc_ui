import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import Home from "../components/Home";
import Layout from "../pages/Layout";
import BucketInfo from "../pages/BucketInfo";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import ProfilePage from "../pages/ProfilePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "bucket/:bucketName",
            element: <BucketInfo />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          { path: "*", element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
