import React from "react";
import Lottie from "lottie-react";
import lottieSport from "../assets/lotties/lottieSport.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie animationData={lottieSport} loop={true}>

      </Lottie>
    </div>
  );
};

export default Loader;
