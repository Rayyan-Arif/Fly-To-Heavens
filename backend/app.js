const express = require('express');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');
const flightRouter = require('./routes/flightRoutes');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader(
        "Cross-Origin-Opener-Policy",
        "same-origin-allow-popups"
    );
    next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/flights', flightRouter);

app.use((req, res, next) => {
    res.status(404).send({
        status: 'error',
        message: 'route not found!'
    });
});

app.use(globalErrorHandler);


module.exports = app;