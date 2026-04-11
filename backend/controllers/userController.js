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
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address
        }

        if(req.file) filteredBody.photo = `/assets/users_img/${req.file.filename}`;

        await User.findByIdAndUpdate(req.user.id, filteredBody, {
            runValidators: true,
            new: true,
        });

        res.status(200).send({
            status: 'success',
            message: 'data updated successfully'
        });
    } catch(err){
        next(err);
    } 
}

exports.getAllUsers = async(req, res, next) => {
    try{
        const users = await User.find({role: 'user'});

        res.status(200).send({
            status: 'success',
            data: {
                users
            }
        });
    } catch(err){
        next(err);
    }
}

exports.deleteUser = async(req, res, next) => {
    try{
        const admin = await User.findOne({email: req.user.email}).select('+password');
        
        const isPassCorrect = await admin.correctPassword(req.body.password, admin.password);

        if(!isPassCorrect){
            return next(new AppError('Incorrect Password!', 401));
        }
        
        await User.findByIdAndDelete(req.params.id);

        res.status(204).send({
            status: 'success'
        });
    } catch(err){
        next(err);
    }
}