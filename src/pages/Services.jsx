import React from "react";
import { motion } from "motion/react";
import { FaUsers, FaCalendarAlt, FaTrophy, FaChartLine, FaMedal, FaRoute, FaComments, FaStar } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Event Management",
      icon: <FaCalendarAlt className="text-3xl text-red-500" />,
      description: "Create, organize, and manage athletic events with ease. From local competitions to large tournaments, our platform provides all the tools you need.",
      features: [
        "Post and promote athletic events",
        "Manage registrations and participants",
        "Send notifications and updates",
        "Track event analytics and performance",
        "Customize event details and requirements"
      ]
    },
    {
      id: 2,
      title: "Team Builder",
      icon: <FaUsers className="text-3xl text-red-500" />,
      description: "Connect with athletes, form teams, and collaborate on training schedules. Find partners who share your passion and goals.",
      features: [
        "Create or join sports teams",
        "Find training partners nearby",
        "Filter by skill level and interests",
        "Schedule group training sessions",
        "Communicate through team chat"
      ]
    },
    {
      id: 3,
      title: "Performance Tracking",
      icon: <FaChartLine className="text-3xl text-red-500" />,
      description: "Monitor your progress, set goals, and achieve new personal bests with our comprehensive tracking system.",
      features: [
        "Track athletic performance over time",
        "Set and monitor personal goals",
        "Compare progress with others",
        "Generate detailed performance reports",
        "Get insights to improve training"
      ]
    },
    {
      id: 4,
      title: "Competition Platform",
      icon: <FaTrophy className="text-3xl text-red-500" />,
      description: "Participate in local and online competitions, earn recognition, and climb the leaderboards.",
      features: [
        "Participate in various competitions",
        "Earn badges and achievements",
        "Compete with athletes worldwide",
        "Track rankings on leaderboards",
        "Receive certificates for challenges"
      ]
    },
    {
      id: 5,
      title: "Training Programs",
      icon: <FaRoute className="text-3xl text-red-500" />,
      description: "Access personalized training plans and workout routines designed by professional coaches.",
      features: [
        "Personalized training plans",
        "Video tutorials and guides",
        "Progress tracking for workouts",
        "Adaptive program adjustments",
        "Expert coaching tips"
      ]
    },
    {
      id: 6,
      title: "Community & Support",
      icon: <FaComments className="text-3xl text-red-500" />,
      description: "Join a vibrant community of athletes, share experiences, and get support from peers and experts.",
      features: [
        "Connect with athletes worldwide",
        "Share experiences and achievements",
        "Get advice from experts",
        "Join discussion forums",
        "Participate in community challenges"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FaMedal className="text-2xl text-yellow-400" />,
      title: "Achievement Recognition",
      description: "Get recognized for your efforts with badges, certificates, and public acknowledgments."
    },
    {
      icon: <FaStar className="text-2xl text-yellow-400" />,
      title: "Premium Experience",
      description: "Enjoy an ad-free experience with exclusive features and priority customer support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-red-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to enhance every aspect of your athletic journey, 
            from training and competition to community and recognition.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 bg-red-50 rounded-lg">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-xl p-8 md:p-12 mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Additional Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="mr-4 mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-red-100">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-white rounded-2xl shadow-lg p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Athletic Journey?
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of athletes who are already using AthleticHub to organize, track, and enhance their athletic experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn bg-red-500 hover:bg-red-600 border-none text-white px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="btn bg-gray-200 hover:bg-gray-300 border-none text-gray-800 px-8 py-3 text-lg font-medium transition-all duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;