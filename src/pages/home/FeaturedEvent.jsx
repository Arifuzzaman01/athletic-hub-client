import React, { use } from "react";
import { postPromise } from "./Home";
import { compareAsc, parseISO } from "date-fns";
import { motion } from "motion/react";
import { Link } from "react-router";

const FeaturedEvent = () => {
  const allPostedData = use(postPromise);
  // postedDate2025-06-09 12:41:37

  // events.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
  allPostedData.sort((a, b) => {
    const dateA = new Date(a.postedDate);
    const dateB = new Date(b.postedDate);
    return compareAsc(dateB, dateA);
  });
  //   console.log(allPostedData);
  const slicePostedData = allPostedData.slice(0, 6);
  // console.log(slicePostedData);
  return (
    <div className="w-11/12 mx-auto my-10 ">
      <motion.h1
        animate={{
          scale: 1,
          color: [
            "#f74c02",
            "#fa7d1e",
            "#fa4a1e",
            "#f0110a",
            "#b00b0b",
            "#780b0b",
            "#b00b0b",
            "#f0110a",
            "#fa4a1e",
            "#fa7d1e",
            "#f74c02",
          ],
          transition: { duration: 4, repeat: Infinity },
        }}
        className="font-bold text-4xl text-center mb-5"
      >
        Featured Event
      </motion.h1>
      <div className="grid grid-cols-3 gap-8  ">
        {slicePostedData.map((postedDate) => (
          <div
            className="card bg-base-100 "
            style={{
              boxShadow: " 0 2px 4px 0 #878c94",
            }}
          >
            <div className="shadow-2xs">
              <figure className="">
                <img
                  className="w-full h-60"
                  src={postedDate?.eventUrl}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{postedDate.eventName}</h2>
                <div className="space-y-3">
                  <h5 className="font-bold text-gray-500">
                    Event Date: {postedDate.date}{" "}
                    <span className="font-normal text-black">
                      (year/month/day)
                    </span>
                  </h5>
                  <address>
                    Event Location :{" "}
                    <span className="font-bold">{postedDate.location}</span>
                  </address>
                </div>
                <div className="card-actions justify-end">
                  <Link
                    to={`/event/${postedDate._id}`}
                    className="btn btn-primary bg-red-500 hover:bg-red-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-5 flex justify-center">
        {allPostedData.length == 6 && (
          <Link
            to="/all-events"
            className="btn btn-primary bg-red-500 hover:bg-red-700 w-full"
          >
            View More
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeaturedEvent;
