import React, { useContext, useEffect, useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { IoBookmarks } from "react-icons/io5";
import { motion } from "motion/react";
import useAxiosInstance from "../hook/useAxiosInstance";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router";

const MyBooking = () => {
  const [bookings, setBooking] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const [bookLoader, setBookLoader] = useState(true);
  const axiosSecure = useAxiosInstance();
  const { email } = useParams();
  // console.log(bookings);
  useEffect(() => {
    if (user.email) {
      axiosSecure(`/myBooking?email=${email}`)
        .then((res) => {
          setBookLoader(false);
          // console.log(res.data);
          setBooking(res.data);
        })
        .catch((err) => {
          setBookLoader(false);
          console.log(err);
        });
    }
  }, [user, axiosSecure]);
  if (bookLoader) {
    return <p>Loading</p>;
  }
  const handleDeleteMyBooking = (id) => {
    console.log(id, "id");
    // 68466e1e21e0af8a0ed878c0
    // 68466e1e21e0af8a0ed878c0
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myBooking/${id}?email=${user?.email}`)
          .then((res) => {
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Deleted Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              const updateBooking = bookings.filter((item) => item._id !== id);
              setBooking(updateBooking);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  // console.log(bookings );
  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-3xl pt-5 underline">
          My Booking
        </h1>
        <motion.h3
          animate={{
            scale: 1,
            color: [
              "#f74c02",
              "#fa7d1e",
              "#fa4a1e",
              "#f0110a",
              "#b00b0b",
              "#780b0b",
              "#b00b0b",
              "#f0110a",
              "#fa4a1e",
              "#fa7d1e",
              "#f74c02",
            ],
            transition: { duration: 4, repeat: Infinity },
          }}
          className="text-2xl"
        >
          <IoBookmarks />
        </motion.h3>
      </div>
      {/* tabs */}
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>View on Table</Tab>
          <Tab>View on Card</Tab>
        </TabList>
        <TabPanel>
          {/* table */}
          <div className="overflow-x-auto">
            {bookings.length == 0 ? (
              <h1 className="text-center text-5xl text-red-500 font-bold">
                You did not book the data
              </h1>
            ) : (
              <table className="table border-gray-500 border-2">
                {/* head */}
                <thead className="border-gray-500 border-2">
                  <tr className="">
                    <th>
                      <p>SLNo</p>
                    </th>
                    <th>Event Name</th>
                    <th>Location</th>
                    <th>Event Date</th>
                    <th>Booking Email</th>
                    <th className="text-center">Delete Event</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row  */}
                  {bookings?.map((booking, index) => (
                    <tr key={index} className="border-gray-500 border-2 ">
                      <td>{index + 1}</td>
                      <td>
                        <h3 className="font-bold">{booking.eventName}</h3>
                      </td>
                      <td>
                        <address>{booking.location}</address>
                      </td>

                      <td>
                        {" "}
                        <p>{booking.date}</p>
                      </td>
                      <td>
                        {" "}
                        <p>{booking.user_email}</p>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDeleteMyBooking(booking._id)}
                            className="btn"
                          >
                            <MdDeleteForever size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="md:grid grid-cols-3 gap-5 space-y-5">
            {bookings?.map((booking) => (
              <div className="card bg-base-100  shadow-sm">
                <figure>
                  <img
                    className="w-full h-52"
                    src={booking?.eventUrl}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title flex flex-col md:flex-row">
                    {booking.eventName}
                    <div className="badge md:badge-secondary">
                      Event Date : {booking.date}
                    </div>
                  </h2>
                  <p> Booking Email : {booking?.user_email}</p>
                  <p> Event Location : {booking?.location}</p>
                  <div className="card">
                    <button
                      onClick={() => handleDeleteMyBooking(booking._id)}
                      className="btn bg-red-500 text-white hover:bg-red-700"
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MyBooking;
