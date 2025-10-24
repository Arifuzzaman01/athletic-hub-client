import React from "react";
import basketBall from "../../assets/baskeBall2.png";
import footBall from "../../assets/football2-.png";
import bg from "../../assets/bodybuilder.jpg";
import { motion } from "motion/react";

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Event Management",
      features: [
        "Post athletic events",
        "Create and customize events",
        "Register/book events",
        "Update or remove events",
        "View detailed event information"
      ]
    },
    {
      id: 2,
      title: "Team Builder",
      features: [
        "Create or join teams based on sport",
        "Find training partners near your location",
        "Filter by skill level (beginner, intermediate, advanced)",
        "Connect with athletes of similar interests",
        "Collaborate on training schedules"
      ]
    }
  ];

  return (
    <div 
      id="service"
      className="min-h-screen bg-cover bg-center bg-fixed py-20 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center text-white mb-16"
        >
          Our <span className="text-red-500">Services</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Services List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            {services.map((service, index) => (
              <div key={service.id} className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-6">
                  {service.title}
                </h2>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start text-white/90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
          
          {/* Right Column - Description and Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <div className="text-center lg:text-right">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                Why Choose AthleticHub?
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                AthleticHub offers a dynamic platform where users can effortlessly post their own athletic events, 
                manage event details, and make updates anytime. Participants can easily book their spots in upcoming events, 
                track all their bookings, and explore a list of all available or posted events.
              </p>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src={footBall} 
                  alt="Football" 
                  className="w-64 md:w-80 mx-auto rounded-lg shadow-2xl border-4 border-white/20"
                />
                <motion.img 
                  src={basketBall} 
                  alt="Basketball" 
                  className="w-40 md:w-52 absolute -bottom-6 -left-6 rounded-lg shadow-2xl border-4 border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Service;