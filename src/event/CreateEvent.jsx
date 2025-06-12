import React, { useContext } from "react";
import bg from "../assets/formBg.jpg";

import { format } from "date-fns";

import { motion } from "motion/react";

import { AuthContext } from "../provider/AuthProvider";
import { object } from "motion/react-client";
import axios from "axios";
import Swal from "sweetalert2";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const now = new Date();
  // console.log()
  const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
  // console.log(formattedDate);
  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log("clicked");
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.postedDate = formattedDate;
    axios
      .post(`${import.meta.env.VITE_base_url}/athletic`, data)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your event has been created",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
    form.reset()
  };
  return (
    <div
      className=" bg-center py-10 bg-cover"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="card bg-base-100 w-full max-w-11/12 md:max-w-3/4 mx-auto shrink-0 shadow-2xl ">
        <div className="md:card-body ">
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
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl mt-5 md:text-4xl font-bold text-center text-red-500"
          >
            Add a Event as You Need
          </motion.h1>
          <form onSubmit={handleCreateEvent} className="shadow-2xl p-8 ">
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
                    defaultValue="Select a Event Type"
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
                  placeholder="write details"
                ></textarea>
              </div>
            </fieldset>
            <button
              type="submit"
              className="btn bg-red-500 hover:bg-red-700 w-full my-5 text-white font-bold"
            >
              Submit Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
