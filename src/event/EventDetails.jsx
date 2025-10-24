import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { easeInOut, motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosInstance";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookMark, setBookMark] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_base_url}/athletic/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const saved = localStorage.getItem(`bookMarked_${id}`);
    if (saved === "true") {
      setBookMark(true);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-500">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500 mb-4">Error loading event</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => navigate('/all-events')}
            className="btn bg-red-500 hover:bg-red-600 text-white mt-6"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-500 mb-4">Event not found</div>
          <button 
            onClick={() => navigate('/all-events')}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const currentEvent = {
    ...event,
    bookingUser: user?.displayName,
    user_email: user?.email,
    photo: user?.photoURL
  };

  const addBookMark = async () => {
    if (!user || !user?.email) {
      navigate("/login", { state: location.pathname });
      return;
    }

    try {
      const response = await axiosSecure.post(`/bookmark`, currentEvent);
      if (response?.data?.insertedId) {
        setBookMark(true);
        localStorage.setItem(`bookMarked_${id}`, "true");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Event bookmarked successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already bookmarked or internal server error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Event Image */}
          <div className="md:w-2/5">
            <motion.img
              initial={{ y: 0 }}
              animate={{
                y: [0, -20, 0, 10, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: easeInOut,
                repeatType: "loop",
              }}
              src={event.eventUrl}
              alt={event.eventName}
              className="w-full h-80 md:h-full object-cover"
            />
          </div>
          
          {/* Event Details */}
          <div className="md:w-3/5 p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{event.eventName}</h1>
              <button
                onClick={addBookMark}
                disabled={bookMark}
                className={`p-3 rounded-full ${bookMark ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500'} transition-colors duration-300`}
                title={bookMark ? "Bookmarked" : "Bookmark this event"}
              >
                {bookMark ? <IoBookmark size={24} /> : <IoBookmarkOutline size={24} />}
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Event Description</h2>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-500">Event Date</h3>
                    <p className="text-gray-800">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-500">Location</h3>
                    <p className="text-gray-800">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-500">Created By</h3>
                    <p className="text-gray-800">{event.creatorName}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-500">Posted On</h3>
                    <p className="text-gray-800">{new Date(event.postedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Participant Information</h3>
                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <span className="text-red-500 font-bold">
                        {user?.displayName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800">
                      {user?.displayName || 'Anonymous User'}
                    </p>
                    <p className="text-gray-600">{user?.email || 'Not logged in'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  onClick={addBookMark}
                  disabled={bookMark}
                  className={`btn px-6 py-3 font-medium ${bookMark ? 'bg-green-100 text-green-700' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                  {bookMark ? 'Bookmarked' : 'Bookmark Event'}
                </button>
                <button
                  onClick={() => navigate('/all-events')}
                  className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 font-medium"
                >
                  Back to Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;