import React from "react";
import abcImg from "../../assets/tamirAnwar.jpg";
import Hurdle from "../../assets/HurdleRace2.jpg";
import boxing from "../../assets/boxing.jpg";
import { motion } from "motion/react";

const Popular = () => {
  return (
    <div className="w-11/12 mx-auto my-14">
      <h1 className="text-red-500 text-2xl mb-3 md:text-3xl text-center font-bold">Most Popular Athletic</h1>
      {/* cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* card 1 */}
        <div className="card bg-base-100  shadow-sm">
          <figure>
            <img
              className="hover:rotate-6 duration-200 hover:scale-125 w-full h-80 md:h-60"
              src={Hurdle}
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-red-500 hover:-mt-14 duration-300 text-white">
           
            <h2 className="card-title">Hurdle Race</h2>
            <p>
              Hurdle race is a thrilling track and field event where athletes
              sprint and leap over a series of evenly spaced barriers called
              hurdles. Whether in the 100m, 110m, or 400m category, hurdle
              racing pushes the limits of athletic coordination and endurance
            </p>
          </div>
        </div>
        {/* card 2 */}
        <motion.div
          animate={{
            y: [0, 30, 0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="card bg-base-100  shadow-sm md:top-10 "
        >
          <figure>
            <img
              className="hover:rotate-6 duration-200 hover:scale-125 w-full h-80 md:h-60"
              src={abcImg}
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-red-400 hover:-mt-14 duration-300 text-white">
            
            <h2 className="card-title">Make Fit BodyBuilder</h2>
            <p>
              "Dedicated and disciplined bodybuilder with a passion for
              strength, aesthetics, and personal growth. Years of intense
              training, proper nutrition, and a relentless mindset have shaped
              not only my physique but my character.
            </p>
          </div>
        </motion.div>
        {/* card 3 */}
        <div className="card bg-base-100  shadow-sm">
          <figure>
            <img
              className="hover:rotate-6 duration-200 hover:scale-125 w-full h-80 md:h-60"
              src={boxing}
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-red-500 hover:-mt-14 duration-300 text-white">
            
            <h2 className="card-title">Boxing</h2>
            <p>
              Boxing[b] is a combat sport and martial art.[1] Taking place in a boxing ring, it involves two people usually wearing protective equipment, such as protective gloves, hand wraps throwing punches at each other for a predetermined amount of time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
