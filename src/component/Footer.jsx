import React, { useContext } from "react";
import footerBg1 from "../assets/footbg1.png";
import { NavLink } from "react-router";
import { motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaFacebook,
  FaGithub,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <footer
      className="p-5 "
      style={{
        backgroundImage: `url(${footerBg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="  border-b-[4px] border-gray-700">
        <motion.h1
          animate={{
            scale: 1,
            color: [
              "#f74c02",
              "#fa7d1e",
              "#fa4a1e",
              "#f0110a",
              "#b00b0b",
              "#780b0b",
              "#b00b0b",
              "#f0110a",
              "#fa4a1e",
              "#fa7d1e",
              "#f74c02",
            ],
            transition: { duration: 4, repeat: Infinity },
          }}
          className="font-bold text-3xl text-center mb-5 z-10"
        >
          AthleticHub
        </motion.h1>
      </div>
      <div className="sm:w-2/3 mx-auto">
        <Marquee
          direction="left"
          speed={60}
          pauseOnHover={true}
          gradient={true}
          gradientWidth={60}
        >
          <p className="text-white text-sm md:text-lg font-semibold mx-10 tracking-wider">
             Welcome to AthleticHub! |  Create, Book, and Explore Sports
            Events Near You |  Join Teams & Build Your Athletic Journey Today!
          </p>
        </Marquee>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between md:items-end items-center text-white">
        <nav className="ml-12 mt-10 flex md:flex-col justify-center flex-wrap ">
          <h1 className="text-2xl font-bold text-white hidden md:block">Pages</h1> 
          <NavLink className="font-bold text-white px-2 link-hover" to="/">
            Home
          </NavLink>
          <NavLink
            className="font-bold text-white px-2 link-hover"
            to="/all-events"
          >
            Events
          </NavLink>

          {user && (
            <>
              <NavLink
                className="font-bold text-white px-2 link-hover"
                to="/create-event"
              >
                Create Event
              </NavLink>
              <NavLink
                className="font-bold text-white px-2 link-hover"
                to={`/myBooking/${user.email}`}
              >
                My Booking
              </NavLink>
              <NavLink
                className="font-bold text-white px-2 link-hover"
                to="/manageEvents"
              >
                Manage Events
              </NavLink>
            </>
          )}
        </nav>
        <nav className="flex flex-col items-end h-full">
          <div>
            <div>
              <p className="text-sm text-white text-center">
                &copy; {new Date().getFullYear()} AthleticHub. All rights
                reserved. Arifuzzaman Rakib
              </p>
            </div>
          </div>
        </nav>
        <div className="mr-10 mt-5">
          <h1 className="text-white text-center ">Social</h1>
          <div className="flex gap-4 pt-4 ">
            <a href="#">
              <FaFacebook size={28} />
            </a>
            <a href="#">
              <FaYoutube size={28} />
            </a>
            <a href="#">
              <FaTwitter size={28} />
            </a>
            <a href="#">
              <FaGithub size={28} />
            </a>
            <a href="#">
              <FaInstagramSquare size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
