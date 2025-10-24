import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

const PageTitle = () => {
  const location = useLocation();
  
  // Format the path for the title
  const formatPath = (path) => {
    if (path === "/") return "Home";
    
    return path
      .split("/")
      .filter(Boolean)
      .map((word) => {
        // Handle special cases
        if (word.toLowerCase() === "mybooking") return "My Booking";
        if (word.toLowerCase() === "manageevents") return "Manage Events";
        if (word.toLowerCase() === "create-event") return "Create Event";
        if (word.toLowerCase() === "all-events") return "All Events";
        
        // Capitalize first letter of each word
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" | ");
  };
  
  const pageTitle = formatPath(location.pathname);
  const fullTitle = `${pageTitle} | AthleticHub`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

export default PageTitle;