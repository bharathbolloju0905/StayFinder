const BookingModel = require('../models/booking.model');
const ListingModel = require('../models/listings.model');
module.exports.BookTheListing = async (req, res) => {
  const { listingId } = req.params;
  const userId = req.user.id;
    const { checkIn, checkOut, totalPrice } = req.body;

  try {
    // Check if listing exists
    const listing = await ListingModel.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }


    var booking = await BookingModel.create({
      listing: listingId,
      user: userId,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    totalPrice: totalPrice,
    })
   booking = await booking.populate('user listing');
    res.status(200).json({ message: 'Listing booked successfully', booking });
  } catch (error) {
    console.error('Error booking listing:', error);
    res.status(500).json({ message: 'Error booking listing', error });
  }
};
