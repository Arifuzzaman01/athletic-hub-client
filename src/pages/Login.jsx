import React, { useContext, useState } from "react";
import bgImg from "../assets/athleticBG.png";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import GoogleLogIn from "./GoogleLogIn";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [eyeChange, setEyeChange] = useState(false);
  const notify = () => toast.error("Invalid email/password");
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email,password);
    signInUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.accessToken,"token");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        notify();
      });
    e.target.reset();
  };
  return (
    <div
      className="flex justify-center items-center py-10 bg-gray-800 bg-cover min-h-[calc(100vh-64px)] "
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold">LogIn Your Account</h1>
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={eyeChange ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
              />
              <div
                onClick={() => setEyeChange(!eyeChange)}
                className="absolute top-1 right-4 p-2 z-10"
              >
                {eyeChange ? (
                  <FaRegEye size={16} />
                ) : (
                  <FaRegEyeSlash size={16} />
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </form>
          <GoogleLogIn></GoogleLogIn>
          <p>
            Don't have an Account? Please{" "}
            <Link to="/register" className="text-blue-600 underline">
              Create an account
            </Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
