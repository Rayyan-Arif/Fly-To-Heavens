const Flight = require('../models/flightModel');
const AppError = require('../utils/appError');

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