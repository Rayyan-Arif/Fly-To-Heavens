module.exports = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message || 'Something went very wrong! Try again later!'
    });
}