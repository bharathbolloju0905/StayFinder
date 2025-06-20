import React, { useState ,useEffect} from "react";
import ListingCard from "../components/ListingCard";
import GoToDashBoard from "../components/GoToDashBoard";
import { useUser } from "../context/UserContext";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const { user } = useUser();
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    date: "",
  });

useEffect(() => {
  fetchListings();
}, []);

 const fetchListings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/listings`);
      const data = await response.json();
      console.log(data)
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
  const filteredListings = listings.filter((listing) => {
      const matchesLocation = listing.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMinPrice = filters.minPrice ? listing.pricePerNight >= filters.minPrice : true;
      const matchesMaxPrice = filters.maxPrice ? listing.pricePerNight <= filters.maxPrice :
        true;
      const matchesDate = filters.date ? new Date(listing.availableFrom) <= new Date(filters.date) : true;
      return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesDate;
    });
    console.log("Search filters:", filters);
    console.log("Filtered listings:", filteredListings);
    setListings(filteredListings);

  };
  const handleClearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      date: "",
    });
    fetchListings(); // Reset to original listings
  }


  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Find Your Stay</h1>

      {
        

        user?.role==="host" && <GoToDashBoard />
      }
      <div className="bg-white p-4 rounded-lg shadow mb-8 grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border rounded px-3 py-2 w-full"
          value={filters.location}
          onChange={handleChange}
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          className="border rounded px-3 py-2 w-full"
          value={filters.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          className="border rounded px-3 py-2 w-full"
          value={filters.maxPrice}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="border rounded px-3 py-2 w-full"
          value={filters.date}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSearch}
        className="mb-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      <button
        onClick={handleClearFilters}
        className="mb-8 ml-4 bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
      >
        Clear filters
      </button>


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       {listings.length > 0 ? (listings?.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}
