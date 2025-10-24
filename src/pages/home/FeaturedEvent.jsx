import React, { useState, useEffect } from "react";
import { compareAsc } from "date-fns";
import { motion } from "motion/react";
import { Link } from "react-router";

const FeaturedEvent = () => {
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
        
        setEvents(sortedEvents.slice(0, 6));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto my-10 flex justify-center items-center h-64">
        <div className="text-2xl font-bold text-red-500">Loading featured events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto my-10">
        <div className="text-center text-red-500 font-bold text-xl">
          Error loading events: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-bold text-3xl md:text-4xl text-center mb-12 text-gray-800"
      >
        <span className="border-b-4 border-red-500 pb-2">Featured Events</span>
      </motion.h1>
      
      {events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    src={event.eventUrl}
                    alt={event.eventName}
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-bold text-gray-800">{event.eventName}</h2>
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/event/${event._id}`}
                      className="btn bg-red-500 hover:bg-red-600 border-none text-white font-medium px-6 transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {events.length >= 6 && (
            <div className="my-10 flex justify-center">
              <Link
                to="/all-events"
                className="btn bg-red-500 hover:bg-red-600 border-none text-white font-bold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
              >
                See All Events
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-2xl font-bold text-gray-500">No events available at the moment</div>
          <Link to="/create-event" className="btn btn-primary mt-6 bg-red-500 hover:bg-red-600 border-none">
            Be the first to create an event
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedEvent;