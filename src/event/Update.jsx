import React, { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosInstance";

const Update = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

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
    const fetchEvent = async () => {
      try {
        const response = await axiosSecure(`/athletic/${id}`);
        setEventData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [axiosSecure, id]);

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!data.eventType) {
      newErrors.eventType = "Please select an event type";
    }

    if (!data.date) {
      newErrors.date = "Event date is required";
    }

    if (!data.eventUrl.trim()) {
      newErrors.eventUrl = "Event image URL is required";
    } else if (!isValidUrl(data.eventUrl)) {
      newErrors.eventUrl = "Please enter a valid URL";
    }

    if (!data.location.trim()) {
      newErrors.location = "Event location is required";
    }

    if (!data.description.trim()) {
      newErrors.description = "Event description is required";
    } else if (data.description.length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }

    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const currentData = Object.fromEntries(formData.entries());
    
    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
    currentData.updatedDate = formattedDate;
    
    const formErrors = validateForm(currentData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    
    setUpdating(true);
    
    try {
      const response = await axiosSecure.patch(`/athletic/${id}`, currentData);
      
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Event updated successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        setErrors({});
      } else {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "No changes detected",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update event. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-500">Loading event data...</div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-500 mb-4">Event not found</div>
          <button 
            onClick={() => window.history.back()}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-red-500 py-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-center text-white"
            >
              Update Event
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-red-100 mt-2"
            >
              Edit your event details
            </motion.p>
          </div>
          
          <form onSubmit={handleUpdateEvent} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Name */}
              <div className="md:col-span-2">
                <label className="label font-semibold">
                  <span className="label-text">Event Name *</span>
                </label>
                <input
                  type="text"
                  name="eventName"
                  defaultValue={eventData.eventName}
                  className={`input input-bordered w-full ${errors.eventName ? 'input-error' : ''}`}
                  placeholder="Enter event name"
                />
                {errors.eventName && <span className="text-red-500 text-sm mt-1">{errors.eventName}</span>}
              </div>
              
              {/* Event Type */}
              <div>
                <label className="label font-semibold">
                  <span className="label-text">Event Type *</span>
                </label>
                <select
                  name="eventType"
                  defaultValue={eventData.eventType}
                  className={`select select-bordered w-full ${errors.eventType ? 'select-error' : ''}`}
                >
                  <option value="">Select an event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.eventType && <span className="text-red-500 text-sm mt-1">{errors.eventType}</span>}
              </div>
              
              {/* Event Date */}
              <div>
                <label className="label font-semibold">
                  <span className="label-text">Event Date *</span>
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={eventData.date}
                  className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
                />
                {errors.date && <span className="text-red-500 text-sm mt-1">{errors.date}</span>}
              </div>
              
              {/* Creator Name (Read-only) */}
              <div>
                <label className="label font-semibold">
                  <span className="label-text">Creator Name</span>
                </label>
                <input
                  type="text"
                  name="creatorName"
                  value={user?.displayName || ""}
                  className="input input-bordered w-full bg-gray-100"
                  readOnly
                />
              </div>
              
              {/* Creator Email (Read-only) */}
              <div>
                <label className="label font-semibold">
                  <span className="label-text">Creator Email</span>
                </label>
                <input
                  type="email"
                  name="creatorEmail"
                  value={user?.email || ""}
                  className="input input-bordered w-full bg-gray-100"
                  readOnly
                />
              </div>
              
              {/* Event Image URL */}
              <div className="md:col-span-2">
                <label className="label font-semibold">
                  <span className="label-text">Event Image URL *</span>
                </label>
                <input
                  type="url"
                  name="eventUrl"
                  defaultValue={eventData.eventUrl}
                  className={`input input-bordered w-full ${errors.eventUrl ? 'input-error' : ''}`}
                  placeholder="https://example.com/event-image.jpg"
                />
                {errors.eventUrl && <span className="text-red-500 text-sm mt-1">{errors.eventUrl}</span>}
              </div>
              
              {/* Event Location */}
              <div className="md:col-span-2">
                <label className="label font-semibold">
                  <span className="label-text">Event Location *</span>
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={eventData.location}
                  className={`input input-bordered w-full ${errors.location ? 'input-error' : ''}`}
                  placeholder="Enter event location"
                />
                {errors.location && <span className="text-red-500 text-sm mt-1">{errors.location}</span>}
              </div>
              
              {/* Event Description */}
              <div className="md:col-span-2">
                <label className="label font-semibold">
                  <span className="label-text">Event Description *</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={eventData.description}
                  className={`textarea textarea-bordered h-32 w-full ${errors.description ? 'textarea-error' : ''}`}
                  placeholder="Describe your event in detail (minimum 20 characters)"
                ></textarea>
                {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={updating}
                className={`btn px-8 py-3 text-white font-bold text-lg transition-all duration-300 ${
                  updating ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {updating ? (
                  <span className="flex items-center">
                    <span className="loading loading-spinner mr-2"></span>
                    Updating...
                  </span>
                ) : (
                  "Update Event"
                )}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-outline px-8 py-3 font-bold text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Update;