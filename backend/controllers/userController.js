const User = require('../models/userModel');
const AppError = require('../utils/appError');
const multer = require('multer');
const sharp = require('sharp');

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

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else{
        cb(new AppError('not an image', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async(req, res, next) => {
    if(!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    
    try{
        await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`${__dirname}/../../frontend/assets/users_img/${req.file.filename}`); 
    } catch(err){
        next(err);
    }

    next();
}

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

        if(req.file) filteredBody.photo = `../assets/users_img/${req.file.filename}`;

        await User.findByIdAndUpdate(req.user.id, filteredBody);

        res.status(200).send({
            status: 'success',
            message: 'data updated successfully'
        });
    } catch(err){
        next(err);
    } 
}