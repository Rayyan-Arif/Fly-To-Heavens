const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    flight: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flight',
        required: [true, 'booking must have a flight']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'booking must have a user']
    }, 
    seats: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Seat',
            }
        ],
        required: true,
        validate: {
            validator: arr => arr.length > 0,
            message: 'At least one seat must be booked'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'booking must have a price']
    },
    passengers: {
        type: [
            {
                name: String,
                email: String
            }
        ],
        required: true,
        validate: {
            validator: arr => arr.length > 0,
            message: 'At least one passenger required'
        }
    }
});

const bookingModel = new mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;