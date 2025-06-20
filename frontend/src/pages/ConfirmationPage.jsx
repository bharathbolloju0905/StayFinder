import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BookingConfirmation() {
    const location = useLocation();
    const booking = location.state

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xl w-full">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    ✅ Booking Confirmed!
                </h1>
                <p className="text-gray-700 mb-6">
                    Thank you for booking with <span className="font-semibold">StayFinder</span>. Below are your booking details:
                </p>

                <div className="space-y-2 text-gray-800">
                    <div>
                        <span className="font-medium">Booking ID:</span> {booking._id}
                    </div>
                    <div>
                        <span className="font-medium">Guest Name:</span> {booking.user.fullname}
                    </div>
                    <div>
                        <span className="font-medium">Property:</span> {booking.listing.title}
                    </div>
                    <div>
                        <span className="font-medium">Location:</span> {booking.listing.location}
                    </div>
                    <div>
                        <span className="font-medium">Check-in:</span> {booking.checkIn}
                    </div>
                    <div>
                        <span className="font-medium">Check-out:</span> {booking.checkOut}
                    </div>
                    <div>
                        <span className="font-medium">Total Price:</span> ₹{booking.totalPrice}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
