import React from "react";
import abcImg from "../../assets/tamirAnwar.jpg";
import Hurdle from "../../assets/HurdleRace2.jpg";
import boxing from "../../assets/boxing.jpg";
import { motion } from "motion/react";

const Popular = () => {
  const popularItems = [
    {
      id: 1,
      title: "Hurdle Race",
      description: "A thrilling track and field event where athletes sprint and leap over evenly spaced barriers. This sport demands speed, agility, and precise timing to navigate hurdles without knocking them down.",
      image: Hurdle,
      bgColor: "bg-red-500"
    },
    {
      id: 2,
      title: "Body Building",
      description: "Dedicated and disciplined bodybuilding with a passion for strength, aesthetics, and personal growth. Years of intense training and proper nutrition shape not only the physique but character.",
      image: abcImg,
      bgColor: "bg-orange-500"
    },
    {
      id: 3,
      title: "Boxing",
      description: "A combat sport and martial art taking place in a boxing ring. Two participants wearing protective gloves throw punches at each other for a predetermined amount of time, testing strength and strategy.",
      image: boxing,
      bgColor: "bg-red-600"
    }
  ];

  return (
    <div className="w-11/12 mx-auto my-20">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
      >
        <span className="border-b-4 border-red-500 pb-2">Most Popular Athletics</span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -10 }}
            className={`card bg-white rounded-xl overflow-hidden shadow-md transition-all ease-in-out duration-200 hover:shadow-xl ${
              index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <figure className="h-56 overflow-hidden">
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500"
                whileHover={{ scale: 1.1 }}
              />
            </figure>
            <div className={`${item.bgColor} p-6 text-white transition-all duration-300`}>
              <h3 className="card-title text-xl md:text-2xl mb-3">{item.title}</h3>
              <p className="text-white/90">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Popular;