const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log('connected to database.....');
});

const server = app.listen(5000, () => {
    console.log('server started');
});