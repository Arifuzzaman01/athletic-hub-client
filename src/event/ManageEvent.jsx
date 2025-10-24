import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { compareAsc } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosInstance";
import { motion } from "motion/react";

const ManageEvent = () => {
  const { user } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { email } = useParams();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axiosSecure(`/manageEvent?email=${email}`);
        setUserEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserEvents();
    }
  }, [user, email, axiosSecure]);

  const sortedUserEvents = [...userEvents].sort((a, b) => {
    const dateA = new Date(a.postedDate);
    const dateB = new Date(b.postedDate);
    return compareAsc(dateB, dateA);
  });

  const handleDeleteEvent = (id, eventName) => {
    Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to delete "${eventName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/athletic/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Event deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            const updatedEvents = userEvents.filter((item) => item._id !== id);
            setUserEvents(updatedEvents);
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to delete event",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="md:w-11/12 mx-auto py-20 flex justify-center">
        <div className="text-2xl font-bold text-red-500">Loading your events...</div>
      </div>
    );
  }

  return (
    <div className="md:w-11/12 mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          <span className="border-b-4 border-red-500 pb-2">Manage Your Events</span>
        </h1>
        <p className="text-gray-600 mt-3">View, update, or delete your created events</p>
      </motion.div>

      {sortedUserEvents.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Event Name</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Posted Date</th>
                  <th className="text-left">Event Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUserEvents.map((event, index) => (
                  <motion.tr
                    key={event._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="font-medium">{index + 1}</td>
                    <td className="font-bold text-gray-800">{event.eventName}</td>
                    <td>{event.location}</td>
                    <td>{new Date(event.postedDate).toLocaleDateString()}</td>
                    <td>{event.date}</td>
                    <td className="text-center py-4">
                      <div className="flex justify-center space-x-3">
                        <Link 
                          to={`/updateEvents/${event._id}`} 
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
                          title="Edit Event"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event._id, event.eventName)}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                          title="Delete Event"
                        >
                          <MdDeleteForever size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="text-5xl mb-6">📋</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">No Events Found</h2>
          <p className="text-gray-500 mb-6">You haven't created any events yet</p>
          <Link 
            to="/create-event" 
            className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-medium"
          >
            Create Your First Event
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default ManageEvent;