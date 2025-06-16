import { createBrowserRouter } from "react-router";

import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateEvent from "./event/CreateEvent";
import Home from "./pages/home/Home";
import AllEvent from "./event/AllEvent";
import EventDetails from "./event/EventDetails";
import MyBooking from "./pages/MyBooking";
import ManageEvent from "./event/ManageEvent";
import { Suspense } from "react";
import Loader from "./component/Loader";
import Update from "./event/Update";
import PrivateRouter from "./provider/PrivateRouter";
import PageTitle from "./component/PageTitle";
import Error from "./pages/Error";

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
        path: "/create-event",
        element: (
          <PrivateRouter>
            <CreateEvent></CreateEvent>
          </PrivateRouter>
        ),
      },
      {
        path: "/all-events",
        loader: () => fetch(`${import.meta.env.VITE_base_url}/athletic`),
        Component: AllEvent,
      },
      {
        path: "/event/:id",

        element: (
          <PrivateRouter>
            <EventDetails></EventDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/myBooking/:email",

        element: (
          <PrivateRouter>
            <MyBooking></MyBooking>
          </PrivateRouter>
        ),
      },
      {
        path: "/manageEvents/:email",

        element: (
          <PrivateRouter>
            <ManageEvent></ManageEvent>
          </PrivateRouter>
        ),
      },
      {
        path: "/updateEvents/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/athletic/${params.id}`),
        element: (
          <PrivateRouter>
            <Update></Update>
          </PrivateRouter>
        ),
      },
      ,
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
  {
    path: "*",
    Component: Error,
  },
]);
