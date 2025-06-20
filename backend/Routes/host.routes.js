
const express = require('express');
const router = express.Router();
const hostController = require('../controllers/host.controller');
const authenticationMiddleware = require('../middleware/authentication.middleware');


router.get('/dashboard', authenticationMiddleware.authenticate,authenticationMiddleware.isAuthorized, hostController.getHostDashboard);

router.delete('/listing/:id', authenticationMiddleware.authenticate, authenticationMiddleware.isAuthorized, hostController.deleteListing);
router.put('/listing/:id', authenticationMiddleware.authenticate, authenticationMiddleware.isAuthorized, hostController.updateListing);

router.post('/listing/new', authenticationMiddleware.authenticate, authenticationMiddleware.isAuthorized, hostController.createListing);


module.exports = router;