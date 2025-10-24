import React, { useContext, useState } from "react";
import bgImg from "../assets/athleticBG.png";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import GoogleLogIn from "./GoogleLogIn";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "motion/react";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [eyeChange, setEyeChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const notify = () => toast.error("Invalid email or password");
  const location = useLocation();
  const navigate = useNavigate();

  const validateForm = (email, password) => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    return newErrors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const formErrors = validateForm(email, password);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    
    setLoading(true);
    
    try {
      const userCredential = await signInUser(email, password);
      console.log(userCredential.accessToken, "token");
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      navigate(`${location.state ? location.state : "/"}`);
    } catch (error) {
      notify();
    } finally {
      setLoading(false);
      e.target.reset();
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
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-red-100 mt-1">Sign in to your account</p>
        </div>
        
        <div className="card-body px-8 py-8">
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="label font-semibold">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>
            
            <div>
              <label className="label font-semibold">
                <span className="label-text">Password</span>
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
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="divider my-6">OR</div>
          
          <GoogleLogIn />
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-red-500 font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      
      <ToastContainer />
    </div>
  );
};

export default Login;