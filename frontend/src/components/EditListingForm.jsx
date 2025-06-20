import React, { useState ,} from "react";
import { useNavigate,useLocation,useParams } from "react-router-dom";

const EditListingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const listingData = location.state ;
    console.log(listingData);
    const listingId = useParams().id;

  const [formData, setFormData] = useState({
    title: listingData?.title,
    description: listingData?.description,
    location: listingData?.location,
    nightRate:listingData?.pricePerNight,
    availableFrom: new Date(listingData?.availableDates[0]).toISOString().split("T")[0],
    availableTo: new Date(listingData?.availableDates[1]).toISOString().split("T")[0],
    images: listingData?.images,
  });
  console.log("dates of available: ",  listingData?.availableDates[1])
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const listingData = {
      ...formData,
      pricePerNight: parseFloat(formData.nightRate),
      availableFrom: new Date(formData.availableFrom),
      availableTo: new Date(formData.availableTo),
    };

   try{
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/host/listing/${listingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(listingData),
    });

    if (res.ok) {
      const newListing = await res.json();
      
      navigate("/dashboard");

    } else {
      console.error("Failed to create listing");
    }
   }
   catch(err){
     console.error("Error creating listing:", err);
   }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6">Update the Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nightly Rate (₹)</label>
          <input
            type="number"
            name="nightRate"
            value={formData.nightRate}
            onChange={handleChange}
            required
            min="0"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Available From</label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Available To</label>
            <input
              type="date"
              name="availableTo"
              value={formData.availableTo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Image URLs</label>
          {formData.images.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default EditListingForm;
