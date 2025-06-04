import React from "react";
import bgImg from "../assets/quibe.jpg";
import GoogleLogIn from "./GoogleLogIn";

const Register = () => {
  return (
    <div
      className="flex justify-center items-center py-10 bg-black"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body ">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <form className="fieldset">
            {/* name */}
            <label className="label font-bold">Your Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="Your Full Name"
              required
            />
            {/* email */}
            <label className="label font-bold"> Your Email</label>
            <input
              type="email"
              className="input"
              placeholder="info@gmail.com"
            />
            {/* password */}
            <label className="label font-bold">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password (Exm :a-Z*/1-9) at lase 6 digit"
            />
            {/* photoUrl */}
            <label className="label font-bold">Profile Picture URL</label>
            <input
              type="password"
              className="input"
              placeholder="1lkgjkdhf%#l*fjgkdfhjg24HDtdbarif"
            />
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            
            <GoogleLogIn></GoogleLogIn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
