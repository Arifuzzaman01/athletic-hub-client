import React from "react";
import { Link, useLoaderData } from "react-router";

const AllEvent = () => {
  const allData = useLoaderData();
//   console.log(allData);
  return (
    <div className="w-11/12 mx-auto my-10 ">
          <div className="text-center flex justify-center">
              <h1 className="text-red-500 font-bold text-3xl border-b-4 border-red-500 mb-5 w-fit">all Events</h1>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {allData.map((data) => (
          <div
            className=" border-2 border-gray-300  rounded-md bg-white"
            style={{
              boxShadow:
                " 5px 5px 10px  #dce0dd inset , -5px -5px 10px #dce0dd inset",
            }}
          >
            <div
              className="card  shadow-2xl border p-3"
              style={{
                boxShadow: " 5px 5px 10px  #dce0dd",
              }}
            >
              <figure>
                <img className="w-full h-60" src={data.eventUrl} alt="Shoes" />
              </figure>
              <div className="text-2xl font-bold">{data.eventName}</div>
              <div className="my-3">
                <h5 className="font-bold text-gray-500">
                  Event Date: {data.date}{" "}
                  <span className="font-normal text-black">
                    (year/month/day)
                  </span>
                </h5>
                <address>
                  Event Location :{" "}
                  <span className="font-bold">{data.location}</span>
                </address>
                    </div>
                    <Link to={`/event/${data._id}`} className="btn btn-block text-white bg-red-500 hover:bg-red-700">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvent;
