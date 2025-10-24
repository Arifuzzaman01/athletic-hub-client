import React from "react";
import Lottie from "lottie-react";
import lottieSport from "../assets/lotties/lottieSport.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie animationData={lottieSport} loop={true} />
      </div>
    </div>
  );
};

export default Loader;