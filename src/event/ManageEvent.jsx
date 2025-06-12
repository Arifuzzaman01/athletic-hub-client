import React, { useContext, useEffect, useState } from "react";
import { data, Link, useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { compareAsc } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const ManageEvent = () => {
  const allData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [userDate, setUserData] = useState([]);

  // console.log(data);
  //   const initialData = allData.filter(
  //     (data) => data?.creatorEmail === user?.email
  //   );
  useEffect(() => {
    if (user?.email && allData.length) {
      const filtered = allData.filter(
        (data) => data?.creatorEmail === user.email
      );
      setUserData(filtered);
    }
  }, [user,allData]);

  //   console.log(userDate);
  const sortedUserData = [...userDate].sort((a, b) => {
    const dateA = new Date(a.postedDate);
    const dateB = new Date(b.postedDate);
    return compareAsc(dateB, dateA);
  });
  const handleDeleteEvent = (id) => {
    console.log('delete event',id);
   Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axios
      .delete(`${import.meta.env.VITE_base_url}/athletic/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.deletedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your event has been deleted",
            showConfirmButton: false,
            timer: 1500,
          });
          const currentData = userDate?.filter((item) => item._id !== id);
          setUserData(currentData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
  };
  return (
    <div className="w-11/12 mx-auto py-8">
      <h1 className="text-3xl font-bold text-red-500 text-center mt-10 ">
        Manage Your Event
      </h1>
      <h1 className="text-xl font-bold text-red-700 text-center mb-5 mt-2">
        You can Update & Delete
      </h1>
      {/* Table */}
      <div
        className="overflow-x-auto border-8 border-gray-300 rounded-2xl p-5"
        style={{
          boxShadow:
            " 7px 7px  7px  #727372 inset , -7px -7px 7px #727372 inset",
        }}
      >
        <table className="table table-pin-cols  ">
          {/* head */}
          <thead>
            <tr className="border-gray-500">
              <th></th>
              <th>Event Name</th>
              <th>Location</th>
              <th>Posted Date</th>
              <th>Event Date</th>
              <th className="text-center">Manage Event</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {sortedUserData?.map((data, index) => (
              <tr key={data._id} className="border-gray-500">
                <th>{index + 1}</th>
                <td className="font-bold">{data.eventName}</td>
                <td>{data.location}</td>
                <td>{data?.postedDate?.split(" ")[0]}</td>
                <td>{data?.date}</td>
                <td className="text-center">
                  <Link to={`/updateEvents/${data._id}`} className="my-2 btn">
                    <FaEdit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDeleteEvent(data._id)}
                    className="my-2 btn bg-red-500 text-white hover:bg-red-700"
                  >
                    <MdDeleteForever size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvent;
