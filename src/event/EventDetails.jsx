import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { easeInOut, motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import { IoBookmarkOutline } from "react-icons/io5";

const EventDetails = () => {
  const event = useLoaderData();
  const { user } = useContext(AuthContext);
  // console.log(event);
  return (
    <div
      className="w-11/12 mx-auto my-10 border  bg-white rounded-md"
      style={{
        boxShadow: " 5px 5px 20px  #b9bdba  , -5px -5px 10px #b9bdba ",
      }}
    >
      <div
        className=" m-8 hero bg-white min-h-[80vh] w-fit"
        style={{
          boxShadow: " 5px 5px 20px  #b5c4b9  , -5px -5px 10px #b5c4b9",
        }}
      >
        <div className="hero-content flex-col lg:flex-row">
          <motion.img
            initial={{ y: 0 }}
            animate={{
              y: [-30, 0, 15, 30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: easeInOut,
              repeatType: "loop",
            }}
            src={event.eventUrl}
            className=" rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{event.eventName}</h1>
            <p className="py-6">{event.description}</p>
            <p className="py-6">
              Event Date : {event.date} <span>(year/month/day)</span>
            </p>
            <div className="flex justify-between">
              <h1>
                Participant :{" "}
                <span className="font-bold">{user?.displayName}</span>{" "}
              </h1>
              <h1>
                Participant Email:{" "}
                <span className="font-bold">{user?.email}</span>{" "}
              </h1>
              <button className="p-2 hover:bg-gray-300 rounded-sm hover:mt-1">
                <IoBookmarkOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
