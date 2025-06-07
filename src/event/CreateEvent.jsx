import React, { useContext } from "react";
import bg from "../assets/formBg.jpg";
import Lottie from "lottie-react";
import lottieSport from "../assets/lottieSport.json";

import { motion } from "motion/react";

import { AuthContext } from "../provider/AuthProvider";
import { object } from "motion/react-client";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log("clicked");
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
  return (
    <div
      className=" bg-center py-10 bg-cover"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="card bg-base-100 w-full max-w-3/4 mx-auto shrink-0 shadow-2xl flex flex-row items-center">
        <div className="card-body w-3/4">
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
            className="text-4xl font-bold text-center text-red-500"
          >
            Add a Event as You Need
          </motion.h1>
          <form onSubmit={handleCreateEvent}>
            <fieldset className="fieldset w-full space-y-3">
              {/* name */}
              <div className="type">
                <label className="label font-semibold my-2">Event Name</label>{" "}
                <br />
                <input
                  type="text"
                  className="input w-full"
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
                    className="select  w-full "
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
                  <input type="date" name="date" className="input" />
                </div>
                {/* creator name */}
                <div>
                  <label className="label font-semibold my-2">Creator Name</label>{" "}
                  <br />
                  <input
                    type="text"
                    name="creatorName"
                    value={user?.displayName}
                    className="input w-full"
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
                    placeholder="Creator Email"
                  />
                </div>
              </div>
              {/* url */}
              <div>
                <label className="label font-semibold my-2">
                  Profile Photo URL
                </label>{" "}
                <br />
                <input
                  type="url"
                  name="photoUrl"
                  className="input w-full"
                  placeholder="enter your photo url"
                />
              </div>
              {/* description */}
              <div>
                <label className="label font-semibold my-2">
                  Write some description on the event
                </label>
                <textarea
                  className="textarea h-24 w-full"
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
        <div className="w-1/4">
          <Lottie animationData={lottieSport} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
