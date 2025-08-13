import { useEffect, useState } from "react";

const BookingStatistics = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
   fetch(`${import.meta.env.VITE_base_url}/booking`)// তোমার API বসাও
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

 

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h2 className="text-3xl text-center font-bold mb-6">
        All Booking
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-lg rounded-lg p-4 border"
          >
            <div className="flex items-center gap-4">
              <img
                src={booking.photo}
                alt={booking.bookingUser}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold">{booking.bookingUser}</h3>
                <p className="text-sm text-gray-600">{booking.user_email}</p>
              </div>
            </div>

            <div className="mt-4">
              <p>
                <span className="font-bold">Event:</span> {booking.eventName}
              </p>
              <p>
                <span className="font-bold">Date:</span> {booking.date}
              </p>
              <p>
                <span className="font-bold">Location:</span> {booking.location}
              </p>
              <p>
                <span className="font-bold">Creator Email:</span> {booking.creatorEmail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatistics;
