const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (res, user, statusCode) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).send({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

exports.signup = async (req, res, next) => {
    try{
        const filteredUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            age: req.body.age,
            address: req.body.address,
        };

        if(req.body.photo) filteredUser.photo = req.body.photo;
        if(req.body.role) filteredUser.role = req.body.role;

        const user = await User.create(filteredUser);

        createSendToken(res, user, 201);
    } catch(err){
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return next(new AppError('Please provide email and password!', 404));
        }

        const user = await User.findOne({email}).select('+password');

        const isPasswordCorrect = await user?.correctPassword(password, user.password);

        if(!user || !isPasswordCorrect){
            return next(new AppError('Incorrect email or password!', 401));
        }

        createSendToken(res, user, 200);
    } catch(err){
        next(err);
    }
}

exports.authorize = async (req, res, next) => {
    try{    
        const token = req.cookies.jwt;
        
        if(!token){
            return next(new AppError('Please log in before this operation', 401));
        }

        const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: payload.id}).select('-__v');

        if(!user){
            return next(new AppError('User with this token does not exist!', 404));
        }

        if(user.isPasswordChanged(payload.iat)){
            return next(new AppError('User changed password! Please log in again!', 401));
        }

        req.user = user;
        next();
    } catch(err){
        next(err);
    }
}

exports.logOut = (req, res, next) => {
    try{
        res.cookie('jwt','logout',{
            expires: new Date(Date.now() + 10 * 10000),
            httpOnly: true
        })

        res.status(200).send({
            status: 'success',
            message: 'user logged out succesfully!'
        });
    } catch(err){
        next(err);
    }
}