import { compareAsc } from "date-fns";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLoaderData } from "react-router";

const AllEvent = () => {
  const allData = useLoaderData();
  const [filterData, setFilterData] = useState(allData);
  //   console.log(allData);
  allData.sort((a, b) => {
    const dateA = new Date(a.postedDate);
    const dateB = new Date(b.postedDate);
    return compareAsc(dateB, dateA);
  });
  const handleSearch = (e) => {
    // console.log(e.target.value);
    const searchingKey = e.target.value.toLowerCase();
    const matchedData = allData.filter((item) =>
      item.eventName.toLowerCase().includes(searchingKey)
    );
    setFilterData(matchedData)
  };
  return (
    <div className="w-11/12 mx-auto py-10 ">
      <div className="w-1/2 mx-auto mb-5">
        {/* Searching */}
        <label
          onChange={handleSearch}
          className="input w-full mx-auto py-5 rounded-2xl"
        >
          <IoSearchOutline />
          <input
            className="py-10"
            type="search"
            required
            placeholder="Search"
          />
        </label>
      </div>
      <div className="text-center flex justify-center">
        <h1 className="text-red-500 font-bold text-3xl border-b-4 border-red-500 mb-5 w-fit">
          all Events
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {filterData.map((data) => (
          <div key={data._id}
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
              <Link
                to={`/event/${data._id}`}
                className="btn btn-block text-white bg-red-500 hover:bg-red-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvent;
