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
        element: <CreateEvent></CreateEvent>,
      },
      {
        path: "/all-events",
        loader: () => fetch(`${import.meta.env.VITE_base_url}/athletic`),
        Component: AllEvent,
      },
      {
        path: "/event/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/athletic/${params.id}`),
        Component: EventDetails,
      },
      {
        path: "/myBooking/:email",
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_base_url}/myBooking?email=${params.email}`
          ),
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/manageEvents",
        loader: () => fetch(`${import.meta.env.VITE_base_url}/athletic`),
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <ManageEvent></ManageEvent>
          </Suspense>
        ),
      },
      {
        path: "/updateEvents/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/athletic/${params.id}`),
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Update></Update>
          </Suspense>
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
]);
