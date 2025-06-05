import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const GoogleLogIn = () => {
  const { socialLogIn } = useContext(AuthContext);
  const notify = (msg) => toast(msg);
  const handleGoogleLogIn = () => {
    socialLogIn()
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google LogIn Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
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
