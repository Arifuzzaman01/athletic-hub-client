import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider.jsx";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import logoA from "../assets/a-logo.png";
import logoHub from "../assets/hub-logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const notify = (msg) => toast.error(msg);
  const [showProfile, setShowProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close mobile menu when clicking a link
  };

  const navLinks = (
    <>
      <NavLink 
        className={({ isActive }) => 
          `font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
          }`
        } 
        to="/"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink 
        className={({ isActive }) => 
          `font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
          }`
        } 
        to="/services"
        onClick={() => setIsMenuOpen(false)}
      >
        Services
      </NavLink>
      <NavLink 
        className={({ isActive }) => 
          `font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
          }`
        } 
        to="/all-events"
        onClick={() => setIsMenuOpen(false)}
      >
        Events
      </NavLink>
      <NavLink 
        className={({ isActive }) => 
          `font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
          }`
        } 
        to="/create-event"
        onClick={() => setIsMenuOpen(false)}
      >
        Create Event
      </NavLink>
      {user && (
        <>
          <NavLink 
            className={({ isActive }) => 
              `font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
              }`
            } 
            to={`/myBooking/${user.email}`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Booking
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-100'
              }`
            } 
            to={`/manageEvents/${user.email}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Manage Events
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-white border-b border-gray-200 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-white rounded-box w-52 border border-gray-200 ${
                isMenuOpen ? 'block' : 'hidden'
              }`}
            >
              {navLinks}
            </ul>
          </div>
          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-xl flex items-center">
            <img className="w-8" src={logoA} alt="A logo" />
            <span className="font-bold -ml-1 text-red-500">thletic</span>
            <img className="w-14 pt-1 hidden md:block" src={logoHub} alt="Hub logo" />
          </Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1">
            {navLinks}
          </ul>
        </div>
        
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center">
              <div className="relative">
                <div 
                  onClick={() => setShowProfile(!showProfile)}
                  className="cursor-pointer"
                >
                  {user.photoURL ? (
                    <img
                      className="rounded-full w-10 h-10 object-cover border-2 border-red-500"
                      src={user.photoURL}
                      alt="User profile"
                      title={user.displayName}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center border-2 border-red-500">
                      <span className="text-red-500 font-bold">
                        {user.displayName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                
                {showProfile && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-20"
                    onMouseLeave={() => setShowProfile(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfile(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to={`/myBooking/${user.email}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfile(false)}
                    >
                      My Booking
                    </Link>
                    <Link
                      to={`/manageEvents/${user.email}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfile(false)}
                    >
                      Manage Events
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setShowProfile(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/register">
                <button className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="btn bg-red-500 text-white hover:bg-red-600 border-red-500">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;