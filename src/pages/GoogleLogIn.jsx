import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const GoogleLogIn = () => {
  const { socialLogIn, user } = useContext(AuthContext);
  const notify = (msg) => toast(msg);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(user.accessToken);
  const handleGoogleLogIn = () => {
    socialLogIn()
      .then((result) => {
        // console.log(result);
        const token = result.user.accessToken;
        // console.log(token);
        axios.get(`${import.meta.env.VITE_base_url}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google LogIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        notify(error.message);
      });
  };
  return (
    <div>
      <p className="text-center ">Or</p>
      <button onClick={handleGoogleLogIn} className="btn btn-block btn-primary">
        LogIn with Google
      </button>
      <ToastContainer />
    </div>
  );
};

export default GoogleLogIn;
