import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import runBg from "../assets/runner.jpg";
import swimmingBg from "../assets/swimming.jpg";
import HighJumpBg from "../assets/highJump.jpg";
import footballBg from "../assets/football.jpg";

// Import Swiper styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "motion/react";
import { Link } from "react-router";
import { compareAsc } from "date-fns";

const Banner = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_base_url}/athletic`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        
        // Sort events by posted date (newest first)
        const sortedEvents = [...data].sort((a, b) => {
          const dateA = new Date(a.postedDate);
          const dateB = new Date(b.postedDate);
          return compareAsc(dateB, dateA);
        });
        
        setEvents(sortedEvents.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fallback slides data
  const fallbackSlides = [
    {
      id: 1,
      title: "Running Competitions",
      description: "Experience the thrill of running competitions where athletes showcase their speed, endurance, and determination. From sprints to marathons, test your limits and achieve new personal bests.",
      image: runBg
    },
    {
      id: 2,
      title: "Swimming Competitions",
      description: "Dive into the world of swimming competitions where precision and technique meet endurance and speed. Whether it's freestyle, backstroke, or butterfly, every stroke counts.",
      image: swimmingBg
    },
    {
      id: 3,
      title: "High Jump Competitions",
      description: "Soar to new heights in our high jump competitions. Athletes demonstrate incredible agility, strength, and technique as they leap over increasingly challenging bars.",
      image: HighJumpBg
    },
    {
      id: 4,
      title: "Football Competitions",
      description: "Join our football competitions where teamwork, strategy, and skill come together. Experience the excitement of the beautiful game in a competitive environment.",
      image: footballBg
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-2xl font-bold text-red-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        loop={true}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <SwiperSlide key={event._id} className="text-center">
              <div
                className="hero min-h-[80vh] bg-fixed bg-center bg-cover sticky top-0 overflow-hidden opacity-[1]"
                style={{
                  backgroundImage: `url(${event.eventUrl})`,
                }}
              >
                <div className="hero-overlay bg-black/40"></div>
                <div className="hero-content text-neutral-content text-center">
                  <div className="">
                    <motion.h1
                      initial={{ y: -100, opacity: 0.2 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      transition={{ duration: 1 }}
                      className="mb-5 text-3xl md:text-5xl lg:text-6xl font-bold"
                    >
                      {event.eventName}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0.1 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                      className="mb-5 md:max-w-2xl mx-auto text-justify text-gray-200 font-medium"
                    >
                      {event.description}
                    </motion.p>
                    <Link
                      to={`/event/${event._id}`}
                      className="btn btn-primary bg-red-500 hover:bg-red-700 border-none px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          fallbackSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="text-center">
              <div
                className="hero min-h-[80vh] bg-fixed bg-center bg-cover sticky top-0 overflow-hidden opacity-[1]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="hero-overlay bg-black/40"></div>
                <div className="hero-content text-neutral-content text-center">
                  <div className="">
                    <motion.h1
                      initial={{ y: -100, opacity: 0.2 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      transition={{ duration: 1 }}
                      className="mb-5 text-3xl md:text-5xl lg:text-6xl font-bold"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0.1 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                      className="mb-5 md:max-w-2xl mx-auto text-justify text-gray-200 font-medium"
                    >
                      {slide.description}
                    </motion.p>
                    <Link
                      to="/all-events"
                      className="btn btn-primary bg-red-500 hover:bg-red-700 border-none px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Events
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Banner;