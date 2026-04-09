const Flight = require('../models/flightModel');
const AppError = require('../utils/appError');
const imageCoverHandler = require('../utils/imageCoverHandler');

exports.getAllFlights = async (req, res, next) => {
    try{
        const flights = await Flight.find();

        res.status(200).send({
            status: 'success',
            results: flights.length,
            data: {
                flights
            }
        });
    } catch(err){
        next(err);
    }
}

exports.getFlight = async(req, res, next) => {
    try{
        const flight = await Flight.findOne({slug: req.params.slug});

        if(!flight){
            return next(new AppError('No such flight exist!',404));
        }

        res.status(200).send({
            status: 'success',
            data: {
                flight
            }
        });
    } catch(err){
        next(err);
    }
}

exports.uploadFlightPhoto = imageCoverHandler.upload.single('photo');

exports.resizeFlightPhoto = imageCoverHandler.resizePhoto('flight',1000,500,'flights');

exports.createFlight = async(req, res, next) => {
    try{
        const filteredBody = {
            departure: req.body.departure,
            arrival: req.body.arrival,
            duration: req.body.duration,
            price: req.body.price,
            dateAndTime: req.body.dateAndTime,
            numberOfSeats: req.body.numberOfSeats,
        }

        const stops = [].concat(req.body.stops);

        filteredBody.stops = stops?.filter(stop => stop.length > 0);

        if(req.file) filteredBody.photo = `/assets/flights_img/${req.file.filename}`;

        const flight = await Flight.create(filteredBody);

        res.status(201).send({
            status: 'success',
            message: 'Flight has been created successfully!',
            data: {
                flight
            }
        });
    } catch(err){
        next(err);
    }
}