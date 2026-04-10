const express = require('express');
const flightController = require('../controllers/flightController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.authorize, 
        flightController.getAllFlights)
    .post(authController.authorize, 
        authController.restrictTo, 
        flightController.uploadFlightPhoto, 
        flightController.resizeFlightPhoto, 
        flightController.createFlight);

router.get('/:slug', authController.authorize, flightController.getFlight);

router.patch('/update-flight/:slug',
    authController.authorize,
    authController.restrictTo,
    flightController.uploadFlightPhoto,
    flightController.resizeFlightPhoto,
    flightController.updateFlight);

router.delete('/:slug', authController.authorize, authController.restrictTo, flightController.deleteFlight);

module.exports = router;