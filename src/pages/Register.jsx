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

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  // console.log(registerUser);
  const [eyeChange, setEyeChange] = useState(false);
  const notify = (msg) => toast.error(msg);
  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
    // console.log(name,email,password,photoURL);
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*/!@#$%^&()_+=-]).{6,}$/;
    if (!passwordPattern.test(password)) {
      const passErr =
        "must include uppercase, lowercase, and be at least 6 characters";
      notify(passErr);

      return;
    }
    registerUser(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Account Created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            notify(error.message);
          });
      })
      .catch((error) => {
        notify(error.message);
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
        <div className="card-body ">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <form onSubmit={handleRegister} className="fieldset">
            {/* name */}
            <label className="label font-bold">Your Full Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Full Name"
              required
            />
            {/* email */}
            <label className="label font-bold"> Your Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="info@gmail.com"
            />
            {/* password */}
            <label className="label font-bold">Password</label>
            <div className="relative">
              <input
                type={eyeChange ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password (Exmp :a-Z*/1-9) at lase 6 digit"
              />
              <div
                onClick={() => setEyeChange(!eyeChange)}
                className="absolute top-1 right-4 p-2 cursor-pointer z-10"
              >
                
                {
                  eyeChange? <FaRegEye size={16} />:<FaRegEyeSlash size={16} />
                }
              </div>
            </div>
            {/* photoUrl */}
            <label className="label font-bold">Profile Picture URL</label>
            <input
              type="url"
              name="photoURL"
              className="input"
              placeholder="1lkgjkdhf%#l*fjgkdfhjg24HDtdbarif"
            />
            <button type="submit" className="btn btn-neutral mt-4">
              SignUp
            </button>

            <GoogleLogIn></GoogleLogIn>
          </form>
          <p>
            Already have an Account? Please{" "}
            <Link to="/login" className="text-blue-600 underline">
              logIn here
            </Link>
          </p>
          <div className="z-20">
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
