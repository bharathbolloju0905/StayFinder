import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateListingForm from "../components/CreateListingForm";
import { useNavigate } from "react-router-dom";

export default function HostDashboard() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
   fetchListings()

  }, [])
  
  async function fetchListings(){
    try{
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/host/dashboard`,{
        method:"GET",
        credentials:"include"
      });
      if(!res.ok){
        throw new Error("unable to fetch the listings")
      }
      const data = await res.json();
      setListings(data.data);
    }catch(err){
      console.error(err);
     
    }
  }


async function handleDelete(listingId){
     if (window.confirm("Are you sure to delete this?")) {
       try {
         const res = await fetch(`${import.meta.env.VITE_BASE_URL}/host/listing/${listingId}`, {
           method: "DELETE",
           credentials: "include",
         });
         if (!res.ok) {
           throw new Error("Failed to delete listing");
         }
         setListings((prev) =>
           prev.filter((l) => l._id !== listingId)
         );
       } catch (err) {
         console.error(err);
       }
     }
}

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
     
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Listings</h1>
          <Link
            to="/host/add-listing"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Listing
          </Link>
        </div>

        {listings?.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center text-gray-500">
            You haven’t created any listings yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings?.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <Carousel images={listing?.images} />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-lg font-semibold">{listing.title}</h2>
                      <p className="text-sm text-gray-500">
                        {listing.location}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        listing.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {listing.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  <p className="text-gray-700 font-medium mb-4">
                    ₹{listing.pricePerNight}/night
                  </p>

                  <div className="flex justify-between items-center text-sm text-blue-600">
                    <button onClick={() => navigate(`/host/edit-listing/${listing._id}`, { state: listing })} className="hover:underline">
                      ✏️ Edit
                    </button>
                    <button
                      onClick={()=>handleDelete(listing._id)}
                      className="text-red-500"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Carousel Component
function Carousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        className="w-full h-full object-cover transition duration-300"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 py-1 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 py-1 rounded-full"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
