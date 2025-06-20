import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={listing.images[0]}
        alt={listing.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{listing.title}</h3>
        <p className="text-sm text-gray-500">{listing.location}</p>
        <p className="mt-2 font-medium">₹{listing.pricePerNight} / night</p>
        <button className="mt-3 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          <Link to={`/details/${listing._id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
}
