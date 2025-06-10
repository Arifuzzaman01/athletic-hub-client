import React from "react";
import { useLoaderData } from "react-router";
import { MdDeleteForever } from "react-icons/md";

const MyBooking = () => {
  const bookings = useLoaderData();
  // console.log(bookings);
  const handleDeleteMyBooking = () => {
    alert("delete")
  }
  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-center font-bold text-3xl">My Booking</h1>

      <div className="overflow-x-auto">
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
                    <button onClick={handleDeleteMyBooking} className="btn"><MdDeleteForever size={20}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
