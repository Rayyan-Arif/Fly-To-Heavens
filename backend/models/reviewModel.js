const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'A review cannot be empty']
    },
    rating: {
        type: Number,
        required: [true, 'A review must have a rating'],
        min: [1, 'review cannot be less than 1'],
        max: [5, 'review cannot be more than 5']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong to a user']
    }
});

const reviewModel = new mongoose.model('Review', reviewSchema);

module.exports = reviewModel;