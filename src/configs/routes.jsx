import Content_typepage from "../components/Content_typepage";
import Home_body from "../components/Home_body";
import Bucket from "../components/Bucket";
import LoginPage from "../components/LoginPage";
import Signup_Page from "../components/Signup_Page";
import Home_page from "../components/Home_page";
import Home from "../components/Home";
import Layout from "../pages/Layout";
import BucketInfo from "../pages/BucketInfo";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      // {
      //   path: "/Contents/:bucketname",
      //   element: <Content_typepage></Content_typepage>,
      // },
      {
        path: "/bucket/:bucketName",
        element: <BucketInfo></BucketInfo>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup_Page></Signup_Page>,
  },
  {
    path: "/Bucket",
    element: <Bucket></Bucket>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/Contenttypes/:bucketname",
    element: <Content_typepage></Content_typepage>,
  },
]);
