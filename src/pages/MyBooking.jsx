import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { IoBookmarks } from "react-icons/io5";
import { motion } from "motion/react";
import useAxiosInstance from "../hook/useAxiosInstance";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router";
import Loader from "../component/Loader";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosInstance();
  const { email } = useParams();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user?.email) {
          const response = await axiosSecure(`/myBooking?email=${email}`);
          setBookings(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log(err);
      }
    };

    fetchBookings();
  }, [user, axiosSecure, email]);

  const handleDeleteMyBooking = (id, eventName) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: `Are you sure you want to cancel your booking for "${eventName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/myBooking/${id}?email=${user?.email}`);
          if (response.data.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Booking cancelled successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            const updatedBookings = bookings.filter((item) => item._id !== id);
            setBookings(updatedBookings);
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to cancel booking",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20">
        <div className="text-center text-red-500 font-bold text-xl">
          Error loading bookings: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          <span className="border-b-4 border-red-500 pb-2">My Bookings</span>
        </h1>
        <p className="text-gray-600">Manage your event bookings</p>
        <motion.div
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
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-3xl mt-4"
        >
          <IoBookmarks />
        </motion.div>
      </motion.div>

      <Tabs 
        selectedIndex={tabIndex} 
        onSelect={(index) => setTabIndex(index)}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <TabList className="flex border-b border-gray-200">
          <Tab 
            selectedClassName="border-b-2 border-red-500 text-red-500"
            className="px-6 py-4 font-medium text-gray-600 cursor-pointer transition-colors duration-200"
          >
            Table View
          </Tab>
          <Tab 
            selectedClassName="border-b-2 border-red-500 text-red-500"
            className="px-6 py-4 font-medium text-gray-600 cursor-pointer transition-colors duration-200"
          >
            Card View
          </Tab>
        </TabList>
        
        <TabPanel>
          <div className="overflow-x-auto p-6">
            {bookings.length > 0 ? (
              <table className="table w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Event Name</th>
                    <th className="text-left">Location</th>
                    <th className="text-left">Event Date</th>
                    <th className="text-left">Booking Email</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="font-medium">{index + 1}</td>
                      <td className="font-bold text-gray-800">{booking.eventName}</td>
                      <td>{booking.location}</td>
                      <td>{booking.date}</td>
                      <td>{booking.user_email}</td>
                      <td className="text-center py-4">
                        <button
                          onClick={() => handleDeleteMyBooking(booking._id, booking.eventName)}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                          title="Cancel Booking"
                        >
                          <MdDeleteForever size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-6">📅</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-3">No Bookings Found</h2>
                <p className="text-gray-500 mb-6">You haven't booked any events yet</p>
                <a href="/all-events" className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-medium">
                  Browse Events
                </a>
              </div>
            )}
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="p-6">
            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="card bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <figure className="h-48 overflow-hidden">
                      <img
                        src={booking.eventUrl}
                        alt={booking.eventName}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </figure>
                    <div className="card-body p-6">
                      <h2 className="card-title text-xl font-bold text-gray-800">
                        {booking.eventName}
                        <div className="badge badge-secondary mt-2 md:mt-0">Event Date: {booking.date}</div>
                      </h2>
                      <div className="space-y-2 mt-3">
                        <p className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {booking.location}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {booking.user_email}
                        </p>
                      </div>
                      <div className="card-actions justify-end mt-4">
                        <button
                          onClick={() => handleDeleteMyBooking(booking._id, booking.eventName)}
                          className="btn bg-red-500 hover:bg-red-600 text-white border-none"
                        >
                          <MdDeleteForever size={18} className="mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-6">📅</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-3">No Bookings Found</h2>
                <p className="text-gray-500 mb-6">You haven't booked any events yet</p>
                <a href="/all-events" className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-medium">
                  Browse Events
                </a>
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MyBooking;