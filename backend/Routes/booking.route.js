const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authentication = require('../middleware/authentication.middleware');

router.post("/:listingId", authentication.authenticate, bookingController.BookTheListing);


module.exports = router;