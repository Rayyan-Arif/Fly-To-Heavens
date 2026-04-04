const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

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
            return next(new AppError('Please log in before this operation!', 401));
        }

        const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: payload.id}).select('-__v');

        if(!user){
            return next(new AppError('User with this token does not exist!', 401));
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
        res.clearCookie('jwt', {
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

exports.forgotPassword = async (req, res, next) => {
    let user;
    try{
        user = await User.findOne({email: req.body.email});

        if(!user){
            return next(new AppError('Invalid email!', 404));
        }

        const resetToken = user.createPasswordResetToken();

        const protocol = req.protocol;
        let host = req.get('host');
        host = host.includes('127.0.0.1') ? host.replace('127.0.0.1','localhost') : host;

        const html = `
            <div style="font-family: Arial, sans-serif; background-color: #1E3A8A; padding: 40px 0; text-align: center;">
            <div style="max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; text-align: center;">

                <h2 style="color: #1E3A8A; margin-bottom: 20px;">Reset Your Password</h2>

                <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                You requested to reset your password. Click the button below to set a new password.
                </p>

                <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}"
                style="
                    display: inline-block;
                    padding: 12px 25px;
                    background-color: #1E3A8A;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                    font-size: 16px;
                ">
                Reset Password
                </a>

                <p style="margin-top: 25px; font-size: 12px; color: #666666; line-height: 1.4;">
                This link will expire in 10 minutes. If you did not request this, please ignore this email.
                </p>
                
            </div>
            </div>
        `;

        const options = {
            to: user.email,
            from: `Fly-To-Heavens Support <${process.env.EMAIL_USER}>`,
            subject: 'Password Reset Request',
            html: html
        }

        await sendEmail(options);

        res.status(200).send({
            status: 'success',
            message: 'token sent to email'
        });
    } catch(err){
        if(user){
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
        }
        next(err);
    }
}