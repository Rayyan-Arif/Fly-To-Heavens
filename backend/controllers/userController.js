const User = require('../models/userModel');
const AppError = require('../utils/appError');

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

exports.updateUserData = (req, res, next) => {
    try{
        if(req.body.password || req.body.passwordConfirm){
            return next(new AppError('Password Change is not allowed here!', 400));
        }

        console.log(req.files);
        console.log(req.body);
    } catch(err){
        next(err);
    } 
}