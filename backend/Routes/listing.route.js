const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing.controller');


router.get("/", listingController.getListing);
router.get("/:id", listingController.getDetailsOfListing);


module.exports = router;