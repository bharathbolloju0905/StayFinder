import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import axios from "axios";

export default function DetailsPage() {
  const { id } = useParams();
  const { user } = useUser();
  console.log("Listing ID:", id);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dates, setdates] = useState({
    checkIn: "",
    checkOut: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/listings/${id}`);
        const data = await res.json();
        console.log("Fetched listing:", data);
        setListing(data);
      } catch (err) {
        console.error("Failed to fetch listing", err);
      }
    }
    fetchListing();
  }, [id]);

  const handleClick = async () => {
    if (!user) {
      navigate("/login");
    } else {
      const checkInDate = dates.checkIn;
      const checkOutDate = dates.checkOut;

      if (!checkInDate || !checkOutDate) {
        alert("Please select both check-in and check-out dates.");
        return;
      }
      try {
        setLoading(true);
        const totalPrice = listing.pricePerNight * Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));

        const bookingData = {
          user: user._id,
          listing: listing._id,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          totalPrice,
        };


        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/bookings/${listing._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
          credentials: "include"
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Booking successful:", data);
          toast.success("Booking successful!");
          navigate("/confirmation-page",{
            state:data.booking 
          });
        } else {
          const errorData = await response.json();
          console.error("Booking failed:", errorData);
          toast.error("Booking failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during booking:", error);
        toast.error("An error occurred while processing your booking.");
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 🖼️ Image Carousel */}
      <div className="mb-6 rounded-xl overflow-hidden">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {listing?.images?.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Listing ${index}`} className="h-[400px] object-cover w-full rounded-xl" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* 📋 Listing Info */}
      <h1 className="text-3xl font-bold mb-2">{listing?.title}</h1>
      <p className="text-gray-600 mb-4">{listing?.location}</p>
      <p className="text-lg text-gray-800 mb-4">₹{listing?.pricePerNight} / night</p>
      <p className="text-gray-700 leading-relaxed">{listing?.description}</p>

      {/* 📅 Date Input */}
      <div className="mt-8">
        <label className="block font-medium mb-1">Select Check In Date:</label>
        <input
          type="date"
          className="border px-3 py-2 rounded w-full max-w-xs" onChange={(e) => setdates({ ...dates, checkIn: e.target.value })}
          value={dates.checkIn}
        />
      </div>
      <div className="mt-8">
        <label className="block font-medium mb-1">Select Check Out Date:</label>
        <input
          type="date"
          className="border px-3 py-2 rounded w-full max-w-xs" onChange={(e) => setdates({ ...dates, checkOut: e.target.value })}
          value={dates.checkOut}
        />
      </div>


      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 " disabled={loading} onClick={handleClick}>
        {loading ? "Booking..." : "Book Now"}
        {loading && <span className="ml-2 spinner-border spinner-border-sm"></span>}
      </button>
    </div>
  );
}
