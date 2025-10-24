import React, { useContext, useState } from "react";
import bg from "../assets/formBg.jpg";
import { format } from "date-fns";
import { motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosInstance";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");

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

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!data.eventType || data.eventType === "Select a Event Type") {
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

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    data.postedDate = formattedDate;
    data.creatorName = user?.displayName || "";
    data.creatorEmail = user?.email || "";
    
    const formErrors = validateForm(data);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axiosSecure.post("/athletic", data);
      
      if (response?.data?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your event has been created successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        setErrors({});
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create event. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
      }}
    >
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
              Create New Athletic Event
            </motion.h1>
          </div>
          
          <form onSubmit={handleCreateEvent} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Name */}
              <div className="md:col-span-2">
                <label className="label font-semibold">
                  <span className="label-text">Event Name *</span>
                </label>
                <input
                  type="text"
                  name="eventName"
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
                  className={`select select-bordered w-full ${errors.eventType ? 'select-error' : ''}`}
                  defaultValue=""
                >
                  <option value="" disabled>Select an event type</option>
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
                  className={`textarea textarea-bordered h-32 w-full ${errors.description ? 'textarea-error' : ''}`}
                  placeholder="Describe your event in detail (minimum 20 characters)"
                ></textarea>
                {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
              </div>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`btn w-full py-3 text-white font-bold text-lg transition-all duration-300 ${
                  loading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading loading-spinner mr-2"></span>
                    Creating Event...
                  </span>
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;