import { createBrowserRouter } from "react-router";

import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateEvent from "./event/CreateEvent";
import Home from "./pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/create-event',
        element: <CreateEvent></CreateEvent>
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
