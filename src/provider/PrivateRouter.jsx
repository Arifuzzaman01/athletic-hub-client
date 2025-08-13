import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import Loader from "../component/Loader";

const PrivateRouter = ({ children }) => {
  const { user, loading} = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
      return <Loader />
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRouter;
