const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    rowNumber: {
        type: Number,
        required: [true, 'A seat must have row number']
    },
    seatColumn: {
        type: String,
        required: [true, 'A seat must have a column'],
        enum: ['A','B','C','D','E','F']
    },
    isWindow: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'available',
        enum: ['booked','available']
    },
    flight: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flight',
        required: [true, 'A seat must belong to a flight']
    }
});

const seatModel = new mongoose.model('Seat',seatSchema);

module.exports = seatModel;