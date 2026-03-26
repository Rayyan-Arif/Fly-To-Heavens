const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
require('../models/userModel');

exports.getAllReviews = async(req, res, next) => {
    try{
        const reviews = await Review.find().populate('user');

        res.status(200).send({
            status: 'success',
            results: reviews.length,
            data: {
                reviews
            }
        });
    } catch(err){
        next(err);
    }
}

exports.createReview = async (req, res, next) => {
    try{
        const reviewBody = {
            review: req.body.review,
            rating: req.body.rating,
            user: req.body.user
        }

        const review = await Review.create(reviewBody);

        res.status(201).send({
            status: 'success',
            data: {
                review
            }
        });
    } catch(err){
        next(err);
    }
}