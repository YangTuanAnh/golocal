import React, { useState, useEffect } from 'react';
import { getBookings } from '../api/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container">
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Booking ID: {booking.id}</p>
          <p>User ID: {booking.userId}</p>
          <p>Service ID: {booking.serviceId}</p>
          <p>Date: {booking.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
