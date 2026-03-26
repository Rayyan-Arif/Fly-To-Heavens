const User = require('../models/userModel');

exports.getUser = (req, res, next) => {
    try{
        res.status(200).send({
            status: 'success',
            data: {
                user: req.user
            }
        });
    } catch(err){   
        next(err);
    }
}