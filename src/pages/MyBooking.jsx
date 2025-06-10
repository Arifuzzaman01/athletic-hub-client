import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const MyBooking = () => {
  const initialData = useLoaderData();
  const [bookings, setBooking] = useState(initialData);
  // console.log(bookings);
  const handleDeleteMyBooking = (id) => {
    console.log(id);
    // 68466e1e21e0af8a0ed878c0
    // 68466e1e21e0af8a0ed878c0
    axios
      .delete(`${import.meta.env.VITE_base_url}/myBooking/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          const updateBooking = bookings.filter((item) => item._id !== id);
          setBooking(updateBooking);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-center font-bold text-3xl py-5 underline">My Booking</h1>

      <div className="overflow-x-auto">
        {bookings.length == 0 ? (
          <h1 className="text-center text-5xl text-red-500 font-bold">You did not book the data</h1>
        ) : (
          <table className="table border-gray-500 border-2">
            {/* head */}
            <thead className="border-gray-500 border-2">
              <tr className="">
                <th>
                  <p>SLNo</p>
                </th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Event Date</th>
                <th>Booking Email</th>
                <th className="text-center">Delete Event</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {bookings.map((booking, index) => (
                <tr className="border-gray-500 border-2 ">
                  <td>{index + 1}</td>
                  <td>
                    <h3 className="font-bold">{booking.eventName}</h3>
                  </td>
                  <td>
                    <address>{booking.location}</address>
                  </td>

                  <td>
                    {" "}
                    <p>{booking.date}</p>
                  </td>
                  <td>
                    {" "}
                    <p>{booking.user_email}</p>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDeleteMyBooking(booking._id)}
                        className="btn"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
