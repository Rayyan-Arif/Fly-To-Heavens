const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Flight = require('../models/flightModel');
const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log('connected to database.....');
});

const users = JSON.parse(fs.readFileSync('./users.json','utf-8'));
const reviews = JSON.parse(fs.readFileSync('./reviews.json','utf-8'));
const flights = JSON.parse(fs.readFileSync('./flights.json','utf-8'));

const insertToDB = async() => {
    try{
        // await User.deleteMany();
        // await Review.deleteMany();
        await Flight.deleteMany();

        console.log('data deleted');

        // await User.create(users, {validateBeforeSave: false});
        // await Review.create(reviews);
        await Flight.create(flights);

        console.log('data loaded');
        process.exit();
    } catch(err){
        console.log(err);
        process.exit();
    }
};

insertToDB();