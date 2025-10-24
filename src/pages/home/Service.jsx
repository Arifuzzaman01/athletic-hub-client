import React from "react";
import basketBall from "../../assets/baskeBall2.png";
import footBall from "../../assets/football2-.png";
import bg from "../../assets/bodybuilder.jpg";
import { motion } from "motion/react";
import { FaUsers, FaCalendarAlt, FaTrophy, FaChartLine } from "react-icons/fa";

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Event Management",
      icon: <FaCalendarAlt className="text-3xl text-red-500" />,
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
      icon: <FaUsers className="text-3xl text-red-500" />,
      features: [
        "Create or join teams based on sport",
        "Find training partners near your location",
        "Filter by skill level (beginner, intermediate, advanced)",
        "Connect with athletes of similar interests",
        "Collaborate on training schedules"
      ]
    },
    {
      id: 3,
      title: "Performance Tracking",
      icon: <FaChartLine className="text-3xl text-red-500" />,
      features: [
        "Track your athletic performance over time",
        "Set and monitor personal goals",
        "Compare your progress with others",
        "Generate detailed performance reports",
        "Get insights to improve your training"
      ]
    },
    {
      id: 4,
      title: "Competition Platform",
      icon: <FaTrophy className="text-3xl text-red-500" />,
      features: [
        "Participate in local and online competitions",
        "Earn badges and achievements",
        "Compete with athletes worldwide",
        "Leaderboards to track your ranking",
        "Certificates for completed challenges"
      ]
    }
  ];

  const benefits = [
    {
      title: "Community Connection",
      description: "Connect with athletes in your area and build lasting relationships through shared interests."
    },
    {
      title: "Personal Growth",
      description: "Track your progress and achieve new personal bests with our performance tools."
    },
    {
      title: "Convenience",
      description: "Manage all your athletic activities in one place, from events to training schedules."
    },
    {
      title: "Recognition",
      description: "Get recognized for your achievements with badges, certificates, and leaderboards."
    }
  ];

  return (
    <div 
      id="service"
      className="min-h-screen bg-cover bg-center bg-fixed py-20 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bg})`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-red-500">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering athletes with comprehensive tools to manage, track, and enhance their athletic journey
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-300 hover:border-red-500/50"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 bg-red-500/10 rounded-lg">
                  {service.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {service.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Description and Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Why Choose AthleticHub?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                AthleticHub offers a dynamic platform where users can effortlessly post their own athletic events, 
                manage event details, and make updates anytime. Participants can easily book their spots in upcoming events, 
                track all their bookings, and explore a list of all available or posted events.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-red-500/10 p-5 rounded-xl border border-red-500/20"
                  >
                    <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
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
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-4">Join Our Community</h4>
              <p className="text-gray-300 mb-6">
                Become part of a growing community of athletes who are pushing their limits and achieving their goals together.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">10K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">500+</div>
                  <div className="text-gray-400 text-sm">Events Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">50+</div>
                  <div className="text-gray-400 text-sm">Sports Categories</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-black/30 backdrop-blur-sm rounded-2xl p-12 border border-white/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Transform Your Athletic Journey?
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of athletes who are already using AthleticHub to organize, track, and enhance their athletic experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn bg-red-500 hover:bg-red-600 border-none text-white px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="btn bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-3 text-lg font-medium transition-all duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Service;