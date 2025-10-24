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
import Loader from "./component/Loader";
import Update from "./event/Update";
import PrivateRouter from "./provider/PrivateRouter";
import PageTitle from "./component/PageTitle";
import Error from "./pages/Error";
import UserProfile from "./pages/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <PageTitle />
            <Home />
          </>
        ),
      },
      {
        path: "/create-event",
        element: (
          <PrivateRouter>
            <>
              <PageTitle />
              <CreateEvent />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/all-events",
        loader: () => fetch(`${import.meta.env.VITE_base_url}/athletic`),
        element: (
          <>
            <PageTitle />
            <AllEvent />
          </>
        ),
      },
      {
        path: "/event/:id",
        element: (
          <>
            <PageTitle />
            <EventDetails />
          </>
        ),
      },
      {
        path: "/myBooking/:email",
        element: (
          <PrivateRouter>
            <>
              <PageTitle />
              <MyBooking />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/manageEvents/:email",
        element: (
          <PrivateRouter>
            <>
              <PageTitle />
              <ManageEvent />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/updateEvents/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/athletic/${params.id}`),
        element: (
          <PrivateRouter>
            <>
              <PageTitle />
              <Update />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <>
              <PageTitle />
              <UserProfile />
            </>
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <PageTitle />
            <Login />
          </>
        ),
      },
      {
        path: "/register",
        element: (
          <>
            <PageTitle />
            <Register />
          </>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <PageTitle />
        <Error />
      </>
    ),
  },
]);