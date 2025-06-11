import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider.jsx";
import { button, div } from "motion/react-client";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
// import nabBg from "../assets/navBG.jpg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);
  const notify = (msg) => toast.error(msg);
  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "SignOut Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        notify(error.message);
      });
  };
  const link = (
    <>
      <NavLink className="font-bold px-1 link-hover" to="/">
        Home
      </NavLink>
      <NavLink className="font-bold px-1 link-hover" to="/all-events">
        Event
      </NavLink>

      {user && (
        <>
          <NavLink className="font-bold px-1 link-hover" to="/create-event">
            Create Event
          </NavLink>
          <NavLink
            className="font-bold px-1 link-hover"
            to={`/myBooking/${user.email}`}
          >
            My Booking
          </NavLink>
          <NavLink className="font-bold px-1 link-hover" to="/manageEvents">
        Manage Events
      </NavLink>
        </>
      )}
    </>
  );
  return (
    <div
      className="navbar bg-base-300 border-b-4 border-red-600  shadow-sm sticky top-0 z-10"
      //   style={{
      //     backgroundImage: `url(${nabBg})`,
      //   }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end">
        <div>
          {user && (
            <img
              className="rounded-full cursor-pointer w-10 h-10 "
              src={user.photoURL}
              alt="user photo url"
              title={user.displayName}
            />
          )}
        </div>
        {user ? (
          <button
            onClick={handleSignOut}
            className="btn bg-black text-white mx-1"
          >
            LogOut
          </button>
        ) : (
          <div>
            <button className="btn btn-outline mx-1">
              <Link to="/register">SignIn</Link>
            </button>
            <button className="btn bg-black text-white border-black mx-1">
              <Link to="/login">LogIn</Link>
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
