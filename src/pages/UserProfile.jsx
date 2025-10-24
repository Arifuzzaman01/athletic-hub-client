import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "motion/react";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update profile",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-red-500 py-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">User Profile</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className="relative">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-red-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center border-4 border-red-100">
                  <span className="text-red-500 text-4xl font-bold">
                    {user?.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                <FaRegEdit size={16} />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || 'User'}</h2>
              <p className="text-gray-600 mt-2">{user?.email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Athlete
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).getFullYear() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          {isEditing ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleUpdateProfile}
              className="bg-gray-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="label font-semibold">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="label font-semibold">
                    <span className="label-text">Profile Picture URL</span>
                  </label>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn px-6 py-2 font-medium text-white ${
                      loading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {loading ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline px-6 py-2 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <div className="mr-4 p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user?.displayName || 'Not set'}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <div className="mr-4 p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <div className="mr-4 p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <div className="mr-4 p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Status</p>
                    <p className="font-medium text-green-600">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;