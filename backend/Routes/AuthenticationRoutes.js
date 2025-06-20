const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication.controllers');
const { authenticate } = require('../middleware/authentication.middleware');
// Authentication routes
router.post('/login', authenticationController.login);

router.post('/register', authenticationController.register);


router.get('/get-profile', authenticate, authenticationController.getCurrentUser);

module.exports = router;
