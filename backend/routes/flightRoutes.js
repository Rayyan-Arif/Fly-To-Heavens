const express = require('express');
const flightController = require('../controllers/flightController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.authorize, flightController.getAllFlights);
router.get('/:slug', authController.authorize, flightController.getFlight);

module.exports = router;