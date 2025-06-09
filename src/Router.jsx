import { createBrowserRouter } from "react-router";

import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateEvent from "./event/CreateEvent";
import Home from "./pages/home/Home";
import AllEvent from "./event/AllEvent";

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
        path: '/all-events',
        loader: ()=>fetch(`${import.meta.env.VITE_base_url}/athletic`),
        Component: AllEvent
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
