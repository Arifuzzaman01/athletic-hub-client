// hooks/useAxiosSecure.js
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_base_url,
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const token = user?.accessToken;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
            // const token = await user?.accessToken;
            // console.log(token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    console.log(token);
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          //   logOut()
          //     .then(() => {
          //       console.log({
          //         message: `You have been logged out due to ${err.response.status}`,
          //       });
          //     })
          //     .catch((err) => console.log(err));
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
