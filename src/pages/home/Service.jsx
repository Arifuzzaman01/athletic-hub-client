import React, { useEffect, useState } from "react";
import basketBall from "../../assets/baskeBall2.png";
import footBall from "../../assets/football2-.png";
import bg from "../../assets/bodybuilder.jpg";
import { motion } from "motion/react";

const useIsMediumUp = () => {
const [isMd, setIsMd] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsMd(window.innerWidth >= 768); 
  };

  checkScreen(); // Initial check
  window.addEventListener("resize", checkScreen);

  return () => window.removeEventListener("resize", checkScreen);
}, []);

return isMd;
};
const Service = () => {
  const isMd = useIsMediumUp();
  return (
    <div
      className="min-h-[80vh] bg-cover bg-center opacity-85 mt-20"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h1 className="text-2xl md:text-4xl font-bold text-center pt-5 text-red-500">
        Our Services
      </h1>
      <div className="grid gird-cols-1 md:grid-cols-2 items-center">
        {/* left */}
        <div className="flex  relative   my-10">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: isMd? 100:10, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="z-10  my-10 mr-20 "
          >
            <div>
              <h1 className="text-2xl md:text-3xl text-red-600 font-bold">
                Event Management
              </h1>
              <ul className="text-red-100">
                <li>Post athletic Events</li>
                <li>Create Event</li>
                <li>Register/Booked  Event</li>
                <li>Remove Event</li>
                <li>view event details (with data, location)</li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl text-red-600 font-bold">
                Team Builder
              </h1>
              <ul className="text-red-200">
                <li>Create or join teams based on sport</li>
                <li>Find training partners near your location)</li>
                <li>Skill level filter (beginner, intermediate, advanced)</li>
              </ul>
            </div>

           
 
          </motion.div>
          <motion.div
            initial={{ x:isMd? -80:0, opacity: 0 }}
            whileInView={{ x: isMd?150:20, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute"
          >
            <img className="w-[600px]" src={footBall} alt="" />
          </motion.div>
        </div>
        {/* right */}
        <div className="flex  relative border-l-8 border-red-500  my-10">
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: isMd? 20:0, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="z-10 font-bold  pt-20 mr-20 text-gray-200"
          >
            <div className="flex sm:justify-center md:justify-end pl-2">
              <h1 className="md:w-2/3 sm:py-20 py-0">
                AthleticHub offers a dynamic platform where users can
                effortlessly post their own athletic events, manage event
                details, and make updates anytime. Participants can easily book
                their spots in upcoming events, track all their bookings, and
                explore a list of all available or posted events.
              </h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: isMd? -80:20, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="absolute"
          >
            <img className="w-[350px] -mt-28 md:-mt-10" src={basketBall} alt="" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Service;
