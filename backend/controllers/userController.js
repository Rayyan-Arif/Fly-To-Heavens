const User = require('../models/userModel');
const AppError = require('../utils/appError');
const imageCoverHandler = require('../utils/imageCoverHandler');

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

exports.uploadUserPhoto = imageCoverHandler.upload.single('photo');

exports.resizeUserPhoto = imageCoverHandler.resizePhoto('user',500,500,'users');

exports.updateUserData = async (req, res, next) => {
    try{
        if(req.body.password || req.body.passwordConfirm){
            return next(new AppError('password change is not allowed here!', 400));
        }

        const filteredBody = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address
        }

        if(req.file) filteredBody.photo = `/assets/users_img/${req.file.filename}`;

        await User.findByIdAndUpdate(req.user.id, filteredBody);

        res.status(200).send({
            status: 'success',
            message: 'data updated successfully'
        });
    } catch(err){
        next(err);
    } 
}