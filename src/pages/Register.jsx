import React, { useContext, useState } from "react";
import bgImg from "../assets/athleticBG.png";
import GoogleLogIn from "./GoogleLogIn";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "motion/react";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [eyeChange, setEyeChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const notify = (msg) => toast.error(msg);

  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = "Full name is required";
    }
    
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*/!@#$%^&()_+=-])/.test(data.password)) {
      newErrors.password = "Password must include uppercase, lowercase, number, and special character";
    }
    
    if (data.photoURL && !isValidUrl(data.photoURL)) {
      newErrors.photoURL = "Please enter a valid URL";
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const formData = { name, email, password, photoURL };
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await registerUser(email, password);
      console.log(userCredential);
      
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || "",
      });
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Account Created Successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      
      // Reset form and errors on success
      e.target.reset();
      setErrors({});
    } catch (error) {
      notify(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center py-10 bg-gray-900 bg-cover min-h-[calc(100vh-64px)]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImg})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card bg-white w-full max-w-md shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="bg-red-500 py-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-red-100 mt-1">Join our athletic community</p>
        </div>
        
        <div className="card-body px-8 py-8">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="label font-semibold">
                <span className="label-text">Full Name *</span>
              </label>
              <input
                type="text"
                name="name"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </div>
            
            {/* Email */}
            <div>
              <label className="label font-semibold">
                <span className="label-text">Email Address *</span>
              </label>
              <input
                type="email"
                name="email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>
            
            {/* Password */}
            <div>
              <label className="label font-semibold">
                <span className="label-text">Password *</span>
              </label>
              <div className="relative">
                <input
                  type={eyeChange ? "text" : "password"}
                  name="password"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                <div
                  onClick={() => setEyeChange(!eyeChange)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {eyeChange ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </div>
              </div>
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
              <p className="text-xs text-gray-500 mt-1">Must include uppercase, lowercase, number, and special character</p>
            </div>
            
            {/* Photo URL */}
            <div>
              <label className="label font-semibold">
                <span className="label-text">Profile Picture URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                className={`input input-bordered w-full ${errors.photoURL ? 'input-error' : ''}`}
                placeholder="https://example.com/profile.jpg"
              />
              {errors.photoURL && <span className="text-red-500 text-sm mt-1">{errors.photoURL}</span>}
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`btn w-full py-3 font-bold text-white transition-all duration-300 ${
                loading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          
          <div className="divider my-6">OR</div>
          
          <GoogleLogIn />
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="z-20">
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;