import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { easeInOut, motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosInstance";

const EventDetails = () => {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bookMark, setBookMark] = useState(false);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    axios(`${import.meta.env.VITE_base_url}/athletic/${id}`)
      .then((res) => {
        // console.log(res.data);
        setEvent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(import.meta.env.VITE_base_url);
  useEffect(() => {
    const saved = localStorage.getItem(`bookMarked_${id}`);
    if (saved === "true") {
      setBookMark(true);
    }
  }, []);
  // console.log(event);
  delete event._id;
  const currentEvent = {
    ...event,
  };
  // console.log(event);
  const addBookMark = () => {
     if (!user || !user?.email) {
     navigate("/login", { state: location.pathname });
      return;
    }
    if (user || user?.email) {
      axiosSecure
        .post(`/bookmark`, currentEvent)
        .then((res) => {
          console.log(res.data);
          if (res?.data?.insertedId) {
            setBookMark(true);
            localStorage.setItem(`bookMarked_${id}`, "true");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "already booked/ Internal server error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
    
  };
  return (
    <div
      className=" mx-auto my-10 border  bg-white rounded-md w-fit"
      style={{
        boxShadow: " 5px 5px 20px  #b9bdba  , -5px -5px 10px #b9bdba ",
      }}
    >
      <div
        className=" m-8 hero bg-white min-h-[70vh] w-fit"
        style={{
          boxShadow: " 5px 5px 20px  #b5c4b9  , -5px -5px 10px #b5c4b9",
        }}
      >
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-1/3">
            <motion.img
              initial={{ y: 0 }}
              animate={{
                y: [0, -30, 0, 15, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: easeInOut,
                repeatType: "loop",
              }}
              src={currentEvent.eventUrl}
              className=" rounded-lg shadow-2xl w-full "
            />
          </div>
          <div className=" w-2/3 flex-1">
            <h1 className="text-5xl font-bold">{currentEvent.eventName}</h1>
            <p className="py-6 w-full">{currentEvent.description}</p>
            <p className="py-6 ">
              Event Date : {currentEvent.date} <span>(year/month/day)</span>
            </p>
            <div className="flex justify-between gap-5 w-full">
              <h1>
                Participant :{" "}
                <span className="font-bold">{user?.displayName}</span>{" "}
              </h1>
              <h1>
                Participant Email:{" "}
                <span className="font-bold">{user?.email}</span>{" "}
              </h1>
              <button
                onClick={addBookMark}
                disabled={bookMark}
                className="p-2 hover:bg-gray-300 rounded-sm hover:mt-1"
              >
                {bookMark ? <IoBookmark /> : <IoBookmarkOutline />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
