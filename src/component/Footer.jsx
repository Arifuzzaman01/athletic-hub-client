import React from "react";
import footerBg1 from "../assets/footerBg2.png";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer
      className="min-h-80 p-5"
      style={{
        backgroundImage: `url(${footerBg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" flex justify-center gap-1  border-b-[4px] border-gray-700">
        <h1 className="font-bold text-3xl text-center mb-5">AthleticHub</h1>
      </div>

      <nav className="ml-12 mt-10 flex flex-col w-fit">
        <NavLink className="font-bold px-1 link-hover mb-5" to="/">
          Home
        </NavLink>
        <NavLink className="font-bold px-1 link-hover mb-5" to="/">
          Event
        </NavLink>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a></a>
          <a></a>
          <a></a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
