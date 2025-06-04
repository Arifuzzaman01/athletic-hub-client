import React from "react";
import bgImg from "../assets/quibe.jpg";

const Login = () => {
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
          <form className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
