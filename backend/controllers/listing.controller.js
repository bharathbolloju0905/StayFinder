const ListingModel = require('../models/listings.model');

module.exports.getListing = async (req, res) => {
  try {
    const listings = await ListingModel.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error });
  }
};


module.exports.getDetailsOfListing = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching details for listing ID:", id);
  try {
    const listing = await ListingModel.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listing details', error });
  }
};



