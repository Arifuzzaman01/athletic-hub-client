import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/all-events" },
    { name: "Create Event", path: "/create-event" },
  ];

  const userLinks = [
    { name: "My Profile", path: "/profile" },
    { name: "My Booking", path: `/myBooking/${user?.email}` },
    { name: "Manage Events", path: `/manageEvents/${user?.email}` },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: "#", label: "Facebook" },
    { icon: FaInstagram, url: "#", label: "Instagram" },
    { icon: FaTwitter, url: "#", label: "Twitter" },
    { icon: FaYoutube, url: "#", label: "YouTube" },
    { icon: FaGithub, url: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      {/* Animated Header */}
      <div className="border-b border-gray-700 pb-6 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-3xl text-center mb-4"
        >
          AthleticHub
        </motion.h1>
      </div>
      
      {/* Marquee */}
      <div className="mb-12 px-4">
        <Marquee
          direction="left"
          speed={50}
          pauseOnHover={true}
          gradient={true}
          gradientColor="#111827"
          gradientWidth={100}
        >
          <p className="text-white text-sm md:text-base font-medium mx-8 tracking-wide">
            Welcome to AthleticHub! | Create, Book, and Explore Sports Events Near You | 
            Join Teams & Build Your Athletic Journey Today!
          </p>
        </Marquee>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-red-500">AthleticHub</h2>
            <p className="text-gray-400 mb-4">
              Your ultimate platform for creating, managing, and participating in athletic events.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -5 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* User Links */}
          {user && (
            <div>
              <h3 className="text-lg font-semibold mb-4">My Account</h3>
              <ul className="space-y-2">
                {userLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink 
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@athletichub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Sports Ave, Athletic City</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AthleticHub. All rights reserved.</p>
          <p className="mt-1">Designed with passion for athletes everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;