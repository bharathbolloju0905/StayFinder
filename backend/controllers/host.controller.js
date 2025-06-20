const listingModel = require('../models/listings.model');


module.exports.getHostDashboard = async (req, res) => {
  try {
    const hostId = req.user.id;

    const listings = await listingModel.find({ host: hostId }).populate('host', 'fullname email');

    res.status(200).json({
      message: 'Host dashboard data retrieved successfully',
      data: listings,
    });
  } catch (error) {
    console.error('Error retrieving host dashboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const hostId = req.user.id;

    const listing = await listingModel.findOneAndDelete({ _id: listingId, host: hostId });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports.updateListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    console.log("Updating listing with ID:", listingId);
    const hostId = req.user.id;
    const { title, description, pricePerNight, availableFrom, availableTo, location, images } = req.body;
    console.log(req.body)

    const updatedListing = await listingModel.findByIdAndUpdate(listingId,
      {
         title,
      description,
      pricePerNight,
      location,
      availableDates: [new Date(availableFrom), new Date(availableTo)],
      images,
      host: hostId,
      },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found or you do not have permission to update it' });
    }

    res.status(200).json({
      message: 'Listing updated successfully',
      data: updatedListing,
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.createListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    if (!req.body.title || !req.body.description || !req.body.pricePerNight) {
      return res.status(400).json({ message: 'Title, description, and price per night are required' });
    }
    const { title, description, pricePerNight, availableFrom, availableTo, location, images } = req.body;

    const newListing = new listingModel({
      title,
      description,
      pricePerNight,
      location,
      availableDates: [new Date(availableFrom), new Date(availableTo)],
      images,
      host: hostId,
    });

    await newListing.save();

    res.status(201).json({
      message: 'Listing created successfully',
      data: newListing,
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}