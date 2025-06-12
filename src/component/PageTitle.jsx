import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

const PageTitle = () => {
  const location = useLocation();
  // const path = location.pathname.split('/')[1]
  // console.log(path);
  const path =
    location.pathname
      .split("/")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" / ") || "Home";
  return (
    <div>
      <Helmet>
        <title>{path}</title>
      </Helmet>
    </div>
  );
};

export default PageTitle;
