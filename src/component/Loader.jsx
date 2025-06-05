import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-xl"></span>
      <span className="loading loading-bars loading-xs"></span>
    </div>
  );
};

export default Loader;
