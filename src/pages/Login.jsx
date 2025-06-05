import React, { useContext } from "react";
import bgImg from "../assets/quibe.jpg";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import GoogleLogIn from "./GoogleLogIn";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const notify = () => toast.error("Invalid email/password");
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email,password);
    signInUser(email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        notify();
      });
    e.target.reset();
  };
  return (
    <div
      className="flex justify-center items-center min-h-[calc(100vh-64px)] "
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
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
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
