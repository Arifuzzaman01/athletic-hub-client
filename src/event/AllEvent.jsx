import { compareAsc, compareDesc } from "date-fns";
import React, { useState, useEffect } from "react";
import { IoSearchOutline, IoFilter, IoClose } from "react-icons/io5";
import { Link } from "react-router";
import { motion } from "motion/react";

const AllEvent = () => {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Event types for filtering
  const eventTypes = [
    "Swimming",
    "Sprinting",
    "Long Jump",
    "High Jump",
    "Football",
    "Hurdle Race",
    "Boxing",
    "Basketball",
    "Tennis",
    "Cycling",
    "Weightlifting",
    "Marathon"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_base_url}/athletic`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setAllData(data);
        setFilterData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply event type filter
    if (eventTypeFilter !== "all") {
      filtered = filtered.filter(item => item.eventType === eventTypeFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.postedDate);
          const dateB = new Date(b.postedDate);
          return compareDesc(dateA, dateB);
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.postedDate);
          const dateB = new Date(b.postedDate);
          return compareAsc(dateA, dateB);
        });
        break;
      case "name":
        filtered.sort((a, b) => a.eventName.localeCompare(b.eventName));
        break;
      case "date":
        filtered.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return compareAsc(dateA, dateB);
        });
        break;
      default:
        break;
    }

    setFilterData(filtered);
  }, [searchTerm, eventTypeFilter, sortBy, allData]);

  const clearFilters = () => {
    setSearchTerm("");
    setEventTypeFilter("all");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20 flex justify-center">
        <div className="text-2xl font-bold text-red-500">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          <span className="border-b-4 border-red-500 pb-2">All Events</span>
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearchOutline className="text-gray-400 text-xl" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-10 pr-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search events by name, location, or description..."
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center gap-2"
          >
            <IoFilter />
            Filters
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="date">Event Date</option>
          </select>
          
          {(searchTerm || eventTypeFilter !== "all") && (
            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm text-red-500"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="font-semibold mb-3">Filter by Event Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setEventTypeFilter("all")}
                className={`btn btn-sm ${eventTypeFilter === "all" ? "btn-primary" : "btn-outline"}`}
              >
                All Events
              </button>
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setEventTypeFilter(type)}
                  className={`btn btn-sm ${eventTypeFilter === type ? "btn-primary" : "btn-outline"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {filterData.length} of {allData.length} events
        </p>
      </div>

      {filterData.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filterData.map((data, index) => (
            <motion.div
              key={data._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <figure className="h-56 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  src={data.eventUrl} 
                  alt={data.eventName} 
                />
              </figure>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{data.eventName}</h2>
                  <span className="badge badge-primary badge-outline">
                    {data.eventType}
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">{data.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{data.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Created by:</span>
                    <span className="ml-2">{data.creatorName}</span>
                  </div>
                </div>
                <Link
                  to={`/event/${data._id}`}
                  className="btn w-full bg-red-500 hover:bg-red-600 border-none text-white font-medium py-2 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="text-2xl font-bold text-gray-500 mb-4">
            {searchTerm || eventTypeFilter !== "all" ? "No events match your filters" : "No events available"}
          </div>
          <p className="text-gray-400 mb-6">
            {searchTerm || eventTypeFilter !== "all" ? "Try adjusting your search or filters" : "Check back later for new events"}
          </p>
          <Link to="/create-event" className="btn bg-red-500 hover:bg-red-600 border-none text-white font-medium">
            Create New Event
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllEvent;