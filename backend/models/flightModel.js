const mongoose = require('mongoose');
const slugify = require('slugify');

const flightSchema = new mongoose.Schema({
    photo: String,
    departure: {
        type: String,
        required: [true, 'flight must have a departure']
    },
    arrival: {
        type: String,
        required: [true, 'flight must have a arrival'],
        validate: {
            validator: function(val){
                return val !== this.departure;
            },
            message: ['Departure cannot be same as arrival']
        }
    },
    duration: {
        type: Number,
        required: [true, 'flight must have a duration'],
        min: 0
    },
    stops: [String],
    price: {
        type: Number,
        required: [true, 'flight must have a price'],
        min: 0
    },
    dateAndTime: {
        type: Date,
        required: [true, 'flight must have a date and time'],
    },
    numberOfSeats: {
        type: Number,
        required: [true, 'flight must have number of seats'],
        default: 50
    },
    availableSeats: {
        type: Number,
        default: 50
    },
    slug: String
});

flightSchema.pre('save', function(){
    this.departure = this.departure.slice(0,1).toLowerCase() + this.departure.slice(1);
    this.arrival = this.arrival.slice(0,1).toLowerCase() + this.arrival.slice(1);

    const slugString = `${this.departure} to ${this.arrival}`;

    this.slug = slugify(slugString, {
        lower: true,
        strict: true
    });

    if(this.isNew) this.availableSeats = this.numberOfSeats;
});

const flightModel = new mongoose.model('Flight', flightSchema);

module.exports = flightModel;