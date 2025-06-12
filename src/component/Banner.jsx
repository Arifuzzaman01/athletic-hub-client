import React from "react";
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

const Banner = () => {
  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        loop={true}
      >
        <SwiperSlide className="text-center">
          <div
            className="hero min-h-[85vh] bg-fixed bg-center bg-cover sticky top-0 overflow-hidden opacity-[1]"
            style={{
              backgroundImage: `url(${runBg})`,
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="">
                <motion.h1
                  initial={{ y: -100, opacity: 0.2 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  className="mb-5 text-3xl md:text-6xl font-bold"
                >
                  Reaching Competitions
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="mb-5 md:max-w-2/3 mx-auto text-justify text-gray-300 font-semibold"
                >
                  The Reaching Competition challenges athletes to test and
                  showcase their reach, flexibility, and control. Whether it's a
                  standing reach, vertical extension, or dynamic leap, this
                  category highlights the explosive power and precision of each
                  participant. It's not just about how far you can go — it’s
                  about how accurately and consistently you can get there..
                </motion.p>
                <Link
                  to="/all-events"
                  className="btn btn-primary bg-red-500 hover:bg-red-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 2 */}
        <SwiperSlide>
          <div
            className="hero min-h-[85vh] bg-fixed bg-center bg-cover sticky top-0 overflow-hidden opacity-[1]"
            style={{
              backgroundImage: `url(${swimmingBg})`,
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="">
                <motion.h1
                  initial={{ y: -100, opacity: 0.2 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  className="mb-5 text-3xl md:text-6xl font-bold"
                >
                  Swimming Competitions
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="mb-5 text-justify md:max-w-2/3 mx-auto text-gray-300 font-semibold"
                >
                  The Reaching Competition challenges athletes to test and
                  showcase their reach, flexibility, and control. Whether it's a
                  standing reach, vertical extension, or dynamic leap, this
                  category highlights the explosive power and precision of each
                  participant. It's not just about how far you can go — it’s
                  about how accurately and consistently you can get there..
                </motion.p>
                <Link
                  to="/all-events"
                  className="btn btn-primary bg-red-500 hover:bg-red-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 3 */}
        <SwiperSlide>
          <div
            className="hero min-h-[85vh] bg-fixed bg-center bg-cover sticky top-0 overflow-hidden opacity-[1]"
            style={{
              backgroundImage: `url(${HighJumpBg})`,
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="">
                <motion.h1
                  initial={{ y: -100, opacity: 0.2 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  className="mb-5 text-3xl md:text-6xl font-bold"
                >
                  High Jump Competitions
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="mb-5 text-justify md:max-w-2/3 mx-auto text-gray-300 font-semibold"
                >
                  The Reaching Competition challenges athletes to test and
                  showcase their reach, flexibility, and control. Whether it's a
                  standing reach, vertical extension, or dynamic leap, this
                  category highlights the explosive power and precision of each
                  participant. It's not just about how far you can go — it’s
                  about how accurately and consistently you can get there..
                </motion.p>
                <Link
                  to="/all-events"
                  className="btn btn-primary bg-red-500 hover:bg-red-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-[85vh] bg-fixed bg-center bg-cover sticky top-0 overflow-hidden opacity-[1]"
            style={{
              backgroundImage: `url(${footballBg})`,
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="">
                <motion.h1
                  initial={{ y: -100, opacity: 0.2 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  className="mb-5 text-3xl md:text-6xl font-bold"
                >
                  Football Competitions
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="mb-5 text-justify md:max-w-2/3 mx-auto text-gray-300 font-semibold"
                >
                  The Reaching Competition challenges athletes to test and
                  showcase their reach, flexibility, and control. Whether it's a
                  standing reach, vertical extension, or dynamic leap, this
                  category highlights the explosive power and precision of each
                  participant. It's not just about how far you can go — it’s
                  about how accurately and consistently you can get there..
                </motion.p>
                <Link
                  to="/all-events"
                  className="btn btn-primary bg-red-500 hover:bg-red-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
