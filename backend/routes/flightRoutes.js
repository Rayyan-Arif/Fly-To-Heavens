const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();

router.route('/').get(flightController.getAllFlights);
router.get('/:slug', flightController.getFlight);

module.exports = router;