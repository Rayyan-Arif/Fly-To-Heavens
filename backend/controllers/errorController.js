module.exports = (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message || 'Something went very wrong! Try again later!'
    });
}