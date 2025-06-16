import React, { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router";
import { format } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosInstance";

const Update = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [oldData, setOldData] = useState([]);
  console.log(oldData, "data psisi");
  const { eventName, eventType, date, eventUrl, location, description } =
    oldData;
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    axiosSecure(`/athletic/${id}`)
      .then((res) => {
        console.log(res.data);
        setOldData(res.data);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure]);
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    // console.log("clicked");
    const form = e.target;
    const formData = new FormData(form);
    const currentData = Object.fromEntries(formData.entries());
    currentData.updatedDate = formattedDate;

    //   console.log(data);
    axiosSecure
      .patch(`/athletic/${id}`, currentData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className=" bg-center py-10 bg-cover"
      //   style={{
      //     backgroundImage: `url(${bg})`,
      //   }}
    >
      <div className="card bg-base-100 w-full max-w-3/4 mx-auto shrink-0 shadow-2xl ">
        <div className="card-body ">
          <div className="border-b-2 ">
            <motion.h1
              animate={{
                color: [
                  "#f24444",
                  "#ff3838",
                  "#e81e1e",
                  "#c21111",
                  "#8c0606",
                  "#660101",
                  "#8c0606",
                  "#c21111",
                  "#e81e1e",
                  "#ff3838",
                  "#f24444",
                ],
                x: [0, -80, 0, 80, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl font-bold text-center text-red-500 my-3"
            >
              Update Event
            </motion.h1>
            <motion.p
              animate={{
                x: [0, 80, 0, -80, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="text-center font-bold mb-3"
            >
              Edit from your creation time data
            </motion.p>
          </div>
          <form onSubmit={handleUpdateEvent} className="shadow-2xl p-8 ">
            <fieldset className="fieldset w-full space-y-3">
              {/* name */}
              <div className="type">
                <label className="label font-semibold my-2">Event Name</label>{" "}
                <br />
                <input
                  type="text"
                  className="input w-full"
                  required
                  name="eventName"
                  defaultValue={eventName}
                  placeholder="Add your event name"
                />
              </div>
              <div className="md:grid grid-cols-2 gap-2">
                {/* type */}
                <div>
                  <label className="label font-semibold my-2">
                    Select a Event Type
                  </label>{" "}
                  <br />
                  <select
                    name="eventType"
                    defaultValue={eventType}
                    className="select  w-full  "
                  >
                    <option disabled={true}>Summing</option>
                    <option value="Summing">Summing</option>
                    <option value="Spring">Spring</option>
                    <option value="Long Jump">Long Jump</option>
                    <option value="High Jump">High Jump</option>
                    <option value="Football">Football </option>
                    <option value="Hurdle Race">Hurdle Race </option>
                    <option value="Boxing">Boxing </option>
                  </select>
                </div>
                {/* date */}
                <div>
                  <label className="label font-semibold my-2">Date</label>{" "}
                  <br />
                  <input
                    type="date"
                    name="date"
                    defaultValue={date}
                    className="input w-full"
                    required
                  />
                </div>
                {/* creator name */}
                <div>
                  <label className="label font-semibold my-2">
                    Creator Name
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="creatorName"
                    value={user?.displayName}
                    className="input w-full"
                    required
                    placeholder="Email"
                  />
                </div>
                {/* creator email */}
                <div>
                  <label className="label font-semibold my-2">
                    Creator Email
                  </label>{" "}
                  <br />
                  <input
                    type="email"
                    value={user?.email}
                    name="creatorEmail"
                    className="input w-full"
                    required
                    placeholder="Creator Email"
                  />
                </div>
                {/* url */}
                <div>
                  <label className="label font-semibold my-2">
                    Picture URL for the event
                  </label>{" "}
                  <br />
                  <input
                    type="url"
                    name="eventUrl"
                    defaultValue={eventUrl}
                    className="input w-full"
                    required
                    placeholder="enter your event photo url"
                  />
                </div>
                {/* location */}
                <div>
                  <label className="label font-semibold my-2">
                    Event Location
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="location"
                    defaultValue={location}
                    className="input w-full"
                    required
                    placeholder="enter your event location"
                  />
                </div>
              </div>

              {/* description */}
              <div>
                <label className="label font-semibold my-2">
                  Write some description on the event
                </label>
                <textarea
                  className="textarea h-24 w-full"
                  required
                  name="description"
                  defaultValue={description}
                  placeholder="write details"
                ></textarea>
              </div>
            </fieldset>
            <button
              type="submit"
              className="btn bg-red-500 hover:bg-red-700 w-full my-5 text-white font-bold"
            >
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
